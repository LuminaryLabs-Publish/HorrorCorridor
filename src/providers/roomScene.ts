import * as THREE from "three";
import { Reflector } from "three/addons/objects/Reflector.js";
import type { RoomSnapshot } from "../game/domains/room/contracts";
import type { PartySnapshot } from "../game/contracts";

/** Realizes Room-owned descriptors; never checks a puzzle solution or opens a lock. */
export function createRoomScene(scene: THREE.Scene) {
  const group = new THREE.Group(); group.name = "room-puzzle"; scene.add(group);
  let identity = "", gate: THREE.Group | null = null;
  let carried: THREE.Mesh | null = null;
  const interactables = new Map<string, THREE.MeshStandardMaterial>();
  const label = (text: string, width: number, position: THREE.Vector3) => {
    const canvas = document.createElement("canvas"); canvas.width = 768; canvas.height = 128;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#1b241f"; context.fillRect(0, 0, 768, 128);
    context.strokeStyle = "#8d9a80"; context.strokeRect(6, 6, 756, 116);
    context.fillStyle = "#eee1b5"; context.font = "bold 27px monospace"; context.textAlign = "center"; context.textBaseline = "middle";
    context.fillText(text, 384, 64, 730);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, width / 6), new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }));
    mesh.position.copy(position); group.add(mesh);
    return mesh;
  };
  const box = (parent: THREE.Group, size: number[], position: number[], color: number, metalness = 0.25) => {
    const material = new THREE.MeshStandardMaterial({ color, metalness, roughness: 0.62 });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size as [number, number, number]), material);
    mesh.position.set(...position as [number, number, number]); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const clear = () => {
    group.traverse(object => {
      if (object instanceof Reflector) object.getRenderTarget().dispose();
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
          if ("map" in material && material.map instanceof THREE.Texture) material.map.dispose(); material.dispose();
        }
      }
    });
    group.clear(); interactables.clear(); gate = null; carried = null;
  };
  return {
    update(room: RoomSnapshot | null | undefined, party: PartySnapshot) {
      if (!room) { if (identity) clear(); identity = ""; return; }
      const nextIdentity = `${room.index}:${room.revision}`;
      if (identity !== nextIdentity) {
        clear(); identity = nextIdentity;
        gate = new THREE.Group(); gate.position.set(0, 0, room.exitZ + 0.12); group.add(gate);
        const gateColor = room.family === "boiler" ? 0x87654c : room.family === "mortuary" ? 0x6a8284 : room.family === "roots" ? 0x485d35 : 0x516659;
        box(gate, [2.98, 3.8, 0.16], [0, 1.9, 0], gateColor, 0.65);
        for (const x of [-1.3, 1.3]) box(gate, [0.13, 3.6, 0.13], [x, 1.8, 0.13], 0xa19972, 0.8);
        for (let y = 0.4; y < 3.6; y += 0.6) box(gate, [2.8, 0.08, 0.06], [0, y, 0.12], 0x758778);
        label(room.title.toUpperCase(), 2.7, new THREE.Vector3(0, 3.45, room.exitZ + 0.24));
        const indicator = box(group, [0.12, 0.2, 0.08], [1.62, 1.55, room.exitZ + 0.3], room.phase === "locked" ? 0x993c25 : 0x65c781);
        indicator.material.emissive.setHex(room.phase === "locked" ? 0x662619 : 0x47b66c); indicator.material.emissiveIntensity = 1.2;
        const fixturePosition = new THREE.Vector3(0, 3.28, room.entryZ - 6);
        const fixtureHousing = new THREE.Mesh(
          new THREE.BoxGeometry(0.82, 0.11, 0.34),
          new THREE.MeshStandardMaterial({ color: 0x252b27, roughness: 0.82, metalness: 0.48 }),
        );
        fixtureHousing.position.copy(fixturePosition);
        fixtureHousing.castShadow = true;
        group.add(fixtureHousing);
        const fixtureLens = new THREE.Mesh(
          new THREE.BoxGeometry(0.64, 0.035, 0.2),
          new THREE.MeshStandardMaterial({ color: 0xc9d4b5, emissive: 0x9fb58c, emissiveIntensity: 0.8, roughness: 0.32 }),
        );
        fixtureLens.position.copy(fixturePosition).y -= 0.075;
        group.add(fixtureLens);
        const lighting = new THREE.SpotLight(0xd4c9a7, 500, 8.5, 0.72, 0.72, 2);
        lighting.position.copy(fixturePosition).y -= 0.08;
        lighting.target.position.set(0, 0.02, room.entryZ - 6);
        lighting.castShadow = true;
        lighting.shadow.mapSize.set(256, 256);
        lighting.shadow.bias = -0.00025;
        lighting.shadow.camera.near = 0.1;
        lighting.shadow.camera.far = 8.5;
        group.add(lighting, lighting.target);
        if (room.carried) carried = box(group, [0.1, 0.32, 0.1], [0, 0, 0], 0xc7dfbd);
        for (const object of room.objects) {
          const { x, y, z } = object.position;
          const station = new THREE.Group(); station.position.set(x, y, z); group.add(station);
          const stand = box(station, [0.7, 0.8, 0.58], [0, -y + 0.4, 0], 0x424c46, 0.6);
          stand.receiveShadow = true;
          const body = box(station, [0.56, 0.38, 0.38], [0, 0, 0], object.color);
          body.material.color.multiplyScalar(0.42);
          body.material.roughness = 0.85;
          interactables.set(object.id, body.material);
          if (["valve", "dial", "clock", "bell"].includes(object.shape)) {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.035, 6, 24), body.material);
            ring.position.z = 0.25; station.add(ring);
            const pointer = box(station, [0.035, 0.2, 0.035], [0, 0, 0.29], 0xeee1b5);
            pointer.rotation.z = -object.value * Math.PI / 2;
            pointer.position.x = Math.sin(object.value * Math.PI / 2) * 0.1;
            pointer.position.y = Math.cos(object.value * Math.PI / 2) * 0.1;
            if (object.targetMark !== undefined) {
              const angle = object.targetMark * Math.PI / 2;
              box(station, [0.05, 0.05, 0.04], [Math.sin(angle) * 0.3, Math.cos(angle) * 0.3, 0.28], 0xd5b777);
            }
          }
          if (object.shape === "fuse") {
            body.scale.set(0.38, 1.4, 0.45);
            for (const dy of [-0.23, 0.23]) box(station, [0.23, 0.1, 0.22], [0, dy, 0], 0xaba98f, 0.9);
          }
          if (["portrait", "mirror"].includes(object.shape)) {
            body.scale.set(1.3, 2.2, 0.2);
            const surface = box(station, [0.57, 0.68, 0.025], [0, 0, 0.08], object.shape === "mirror" ? 0x9baea4 : 0x736751, 0.85);
            surface.rotation.z = object.value * Math.PI / 2;
            if (object.shape === "mirror" && room.family === "mirror") {
              const reflection = new Reflector(new THREE.PlaneGeometry(0.56, 0.66), { textureWidth: 256, textureHeight: 256, color: 0x9baea4 });
              reflection.position.set(0, 0, 0.11); reflection.rotation.y = object.value * Math.PI / 8; station.add(reflection);
            }
          }
          if (room.family === "shadow" && object.shape === "dial") {
            const board = box(station, [0.85, 0.85, 0.04], [0, 0.15, -0.35], 0xb2ad8a, 0);
            board.receiveShadow = true;
            const shadow = new THREE.Mesh(new THREE.RingGeometry(0.19, 0.28, 32, 1, 0, Math.PI * 1.5), new THREE.MeshBasicMaterial({ color: 0x17221b, side: THREE.DoubleSide }));
            shadow.position.set(0, 0.15, -0.32); shadow.rotation.z = -object.value * Math.PI / 2; station.add(shadow);
            const missing = new THREE.Mesh(new THREE.RingGeometry(0.19, 0.28, 16, 1, -(object.targetMark ?? 0) * Math.PI / 2 + Math.PI * 1.5, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x17221b, side: THREE.DoubleSide }));
            missing.position.set(0, 0.15, -0.315); station.add(missing);
          }
          if (object.shape === "plant") {
            for (let branch = 0; branch < 4; branch++) {
              const root = box(station, [0.08, 0.65 + object.value * 0.28, 0.08], [(branch - 1.5) * 0.15, 0.2, 0], 0x728c4d, 0);
              root.rotation.z = (branch - 1.5) * 0.25;
            }
          }
          if (object.shape === "drawer") body.position.z += object.value * 0.08;
          if (object.shape === "weight") body.scale.y = 0.8 + Math.min(object.value, 8) * 0.1;
          // Physical nameplates sit on the cabinet, not in the player's sightline.
          label(object.label, 0.66, new THREE.Vector3(x, 0.64, z + 0.31));
          if (object.markings) label(object.markings, 0.7, new THREE.Vector3(x, 0.43, z + 0.32));
          if (room.family === "fuse" && object.id === "socket") {
            body.scale.set(0.65, 1.5, 0.65);
            box(station, [0.17, 0.36, 0.02], [0, 0, 0.145], object.value ? 0xb8d3af : 0x111a13);
            for (const dy of [-0.2, 0.2]) box(station, [0.24, 0.055, 0.055], [0, dy, 0.18], 0xb4aa77, 0.8);
            box(group, [0.055, 0.055, Math.abs(room.exitZ - z)], [x, 0.2, (room.exitZ + z) / 2], object.value ? 0x78c895 : 0x9a794d);
          }
        }
      }
      for (const [id, material] of interactables) {
        material.emissive.setHex(id === room.focus ? 0x8b9d66 : 0x000000);
        material.emissiveIntensity = id === room.focus ? 0.12 : 0;
      }
      if (gate) gate.position.y = room.openingMs / 1000 * 4;
      if (carried) carried.position.set(party.position.x - Math.sin(party.yaw) * 0.5 + Math.cos(party.yaw) * 0.28, party.position.y - 0.35, party.position.z - Math.cos(party.yaw) * 0.5 - Math.sin(party.yaw) * 0.28);
    },
    dispose() { clear(); scene.remove(group); },
  };
}
