import {
  BoxGeometry,
  BufferGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  DataTexture,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  RGBAFormat,
  RepeatWrapping,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  UnsignedByteType,
  Vector3,
  type Material,
  type Object3D,
} from "three";

import type { HorrorCorridorPreset } from "@/protokits";

import type { ScenePropDescriptor, SceneTextureDescriptor } from "./sceneDressingDescriptors";
import { applyPropShader } from "./proceduralShaders";

export type ScenePropRenderable = Readonly<{
  object: Object3D;
  pulseTargets: readonly Mesh[];
  materials: readonly Material[];
}>;

export type SceneTextureRenderable = Readonly<{
  object: Mesh;
  pulseTargets: readonly Mesh[];
  materials: readonly Material[];
}>;

const hashString = (value: string): number => {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const createRandom = (seed: string): (() => number) => {
  let state = hashString(seed) || 1;

  return () => {
    state += 0x6d2b79f5;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
};

const createAlphaClipTexture = (
  seed: string,
  size: number,
): DataTexture => {
  const random = createRandom(seed);
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const edgeWear = x < 2 || y < 2 || x > size - 3 || y > size - 3;
      const scratch = random() > 0.94 || (x + y + Math.floor(random() * 7)) % 29 === 0;
      const value = edgeWear || scratch ? 40 + random() * 54 : 218 + random() * 37;
      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
      data[index + 3] = 255;
    }
  }

  const texture = new DataTexture(data, size, size, RGBAFormat, UnsignedByteType);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true;
  return texture;
};

type VegetationAlphaProfile = "grass-blades" | "vine-leaf";

const createVegetationAlphaTexture = (
  seed: string,
  size: number,
  profile: VegetationAlphaProfile,
): DataTexture => {
  const random = createRandom(seed);
  const data = new Uint8Array(size * size * 4);
  const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));
  const blades = Array.from({ length: 8 }, (_, index) => ({
    base: 0.08 + (index / 7) * 0.84 + (random() - 0.5) * 0.075,
    bend: (random() - 0.5) * 0.34,
    height: 0.58 + random() * 0.4,
    width: 0.045 + random() * 0.035,
    phase: random() * Math.PI * 2,
  }));
  const leafBend = (random() - 0.5) * 0.12;
  const leafPhase = random() * Math.PI * 2;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const u = x / Math.max(1, size - 1);
      const v = y / Math.max(1, size - 1);
      let field = 0;

      if (profile === "grass-blades") {
        for (const blade of blades) {
          if (v > blade.height) continue;
          const progress = v / blade.height;
          const center =
            blade.base +
            blade.bend * progress * progress +
            Math.sin(progress * Math.PI * 1.35 + blade.phase) * 0.012;
          const halfWidth =
            blade.width * Math.pow(Math.max(0, 1 - progress), 0.62) + 0.002;
          const edgeDistance = halfWidth - Math.abs(u - center);
          field = Math.max(field, clamp01(edgeDistance * size * 0.38 + 0.42));
        }

        const mossBase = clamp01((0.13 - v) * 12) * clamp01(1 - Math.abs(u - 0.5) * 1.75);
        field = Math.max(field, mossBase * 0.86);
      } else {
        const progress = clamp01(v);
        const center =
          0.5 +
          leafBend * Math.sin(progress * Math.PI) +
          Math.sin(progress * Math.PI * 2 + leafPhase) * 0.008;
        const pointedWidth =
          Math.pow(Math.max(0, Math.sin(progress * Math.PI)), 0.74) *
          (0.38 + Math.sin(progress * Math.PI * 5 + leafPhase) * 0.018);
        const edgeDistance = pointedWidth - Math.abs(u - center);
        const blade = clamp01(edgeDistance * size * 0.18 + 0.38);
        const stem = clamp01((0.018 - Math.abs(u - 0.5)) * size * 0.32 + 0.24);
        field = Math.max(blade, stem * clamp01((v - 0.02) * 16));
      }

      const grain = 0.9 + random() * 0.1;
      const value = Math.round(clamp01(field * grain) * 255);
      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
      data[index + 3] = 255;
    }
  }

  const texture = new DataTexture(data, size, size, RGBAFormat, UnsignedByteType);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;
  return texture;
};

const createProjectionAlphaTexture = (
  seed: string,
  size: number,
  kind: SceneTextureDescriptor["kind"],
): DataTexture => {
  const random = createRandom(seed);
  const data = new Uint8Array(size * size * 4);
  const phase = random() * Math.PI * 2;
  const lobes = Array.from({ length: 5 }, (_, index) => ({
    centerX: 0.22 + random() * 0.56,
    centerY: 0.18 + random() * 0.64,
    radiusX: 0.2 + random() * 0.22,
    radiusY: 0.16 + random() * 0.28,
    phase: phase + index * 1.37,
  }));
  const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const u = x / Math.max(1, size - 1);
      const v = y / Math.max(1, size - 1);
      let organicField = 0;

      for (const lobe of lobes) {
        const nx = (u - lobe.centerX) / lobe.radiusX;
        const ny = (v - lobe.centerY) / lobe.radiusY;
        const angle = Math.atan2(ny, nx);
        const wobble =
          Math.sin(angle * 3 + lobe.phase) * 0.13 +
          Math.sin(angle * 7 - lobe.phase * 0.7) * 0.06;
        const distance = Math.sqrt(nx * nx + ny * ny) - wobble;
        organicField = Math.max(
          organicField,
          clamp01((1 - distance) * 1.55),
        );
      }

      const lowFrequencyNoise =
        Math.sin(u * 11.7 + v * 7.1 + phase) * 0.06 +
        Math.sin(u * 4.3 - v * 13.9 - phase * 0.6) * 0.04;
      let value = clamp01(organicField + lowFrequencyNoise - 0.08);

      if (kind === "rust-streak" || kind === "rust") {
        const streak =
          0.34 +
          0.66 * Math.pow(
            Math.max(0, Math.sin((u * 7.5 + Math.sin(v * 4 + phase) * 0.35) * Math.PI)),
            3,
          );
        value *= streak * (0.72 + v * 0.28);
      } else if (kind === "crack") {
        const crack = 1 - Math.min(1, Math.abs(Math.sin((u * 2.8 + v * 4.6 + phase) * Math.PI)) * 9);
        value *= crack;
      } else if (kind === "brick-course") {
        const course = 0.55 + 0.45 * Math.pow(Math.abs(Math.sin(v * 11 * Math.PI)), 5);
        value *= course;
      } else if (kind === "moss-grime" || kind === "moss") {
        value *= 0.72 + 0.28 * clamp01(1 - v + Math.sin(u * 8 + phase) * 0.12);
      }

      const grain = 0.88 + random() * 0.12;
      value = clamp01(value * grain);
      const byte = Math.round(value * 255);
      data[index] = byte;
      data[index + 1] = byte;
      data[index + 2] = byte;
      data[index + 3] = 255;
    }
  }

  const texture = new DataTexture(data, size, size, RGBAFormat, UnsignedByteType);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;
  return texture;
};

const pbrProfileByFamily = {
  "painted-metal": { roughness: 0.66, metalness: 0.34, roughnessRange: [0.34, 0.86], metalnessRange: [0.1, 0.54] },
  "rusted-metal": { roughness: 0.82, metalness: 0.24, roughnessRange: [0.56, 0.98], metalnessRange: [0.08, 0.4] },
  "rubber-cable": { roughness: 0.94, metalness: 0.01, roughnessRange: [0.78, 1], metalnessRange: [0, 0.03] },
  "damp-concrete": { roughness: 0.9, metalness: 0.03, roughnessRange: [0.64, 0.98], metalnessRange: [0, 0.08] },
  "broken-brick": { roughness: 0.92, metalness: 0.02, roughnessRange: [0.68, 1], metalnessRange: [0, 0.06] },
  "painted-utility": { roughness: 0.78, metalness: 0.18, roughnessRange: [0.54, 0.94], metalnessRange: [0.04, 0.3] },
  "wet-concrete": { roughness: 0.64, metalness: 0.03, roughnessRange: [0.38, 0.86], metalnessRange: [0, 0.08] },
  "muddy-grass": { roughness: 0.97, metalness: 0, roughnessRange: [0.82, 1], metalnessRange: [0, 0.01] },
  "wet-soil": { roughness: 0.7, metalness: 0, roughnessRange: [0.46, 0.88], metalnessRange: [0, 0.02] },
  "root-fiber": { roughness: 0.96, metalness: 0, roughnessRange: [0.82, 1], metalnessRange: [0, 0.01] },
  "broken-rubble": { roughness: 0.88, metalness: 0.04, roughnessRange: [0.58, 0.98], metalnessRange: [0, 0.1] },
  "anomaly-residue": { roughness: 0.58, metalness: 0.02, roughnessRange: [0.34, 0.76], metalnessRange: [0, 0.06] },
} as const;

const materialColorByFamily = {
  "painted-metal": 0x5a5144,
  "rusted-metal": 0x5f3d26,
  "rubber-cable": 0x171612,
  "damp-concrete": 0x4b4740,
  "broken-brick": 0x5a3424,
  "painted-utility": 0x425237,
  "wet-concrete": 0x5d594f,
  "muddy-grass": 0x2f3b22,
  "wet-soil": 0x2c2419,
  "root-fiber": 0x3b2b1f,
  "broken-rubble": 0x55483b,
  "anomaly-residue": 0x777944,
} as const;

const createPropMaterial = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materialRole = "body",
  alphaMode: "auto" | "none" | VegetationAlphaProfile = "auto",
): MeshStandardMaterial => {
  const baseColor =
    materialColorByFamily[descriptor.materialFamily as keyof typeof materialColorByFamily] ?? 0x34453b;
  const profile =
    pbrProfileByFamily[descriptor.materialFamily as keyof typeof pbrProfileByFamily] ??
    pbrProfileByFamily["damp-concrete"];
  const isCable = descriptor.kind === "cable";
  const isDebris = descriptor.kind === "debris" || descriptor.kind === "rubble";
  const isVegetation =
    descriptor.kind === "grass-clump" ||
    descriptor.kind === "root-strip" ||
    descriptor.kind === "hanging-vine";
  const isTableObject = descriptor.kind === "table" || descriptor.kind === "crate";
  const isFacade = descriptor.kind === "building-facade";
  const isSmallKitObject =
    descriptor.kind === "utility-crate-stack" ||
    descriptor.kind === "brick-rubble-pile" ||
    descriptor.kind === "loose-floor-slab" ||
    descriptor.kind === "ceiling-service-strip";
  const isResidue = descriptor.materialFamily === "anomaly-residue";
  const usesAlphaClip =
    alphaMode === "none"
      ? false
      : alphaMode === "grass-blades" || alphaMode === "vine-leaf"
        ? true
        : isVegetation || isFacade;
  const alphaTexture = usesAlphaClip
    ? alphaMode === "grass-blades" || alphaMode === "vine-leaf"
      ? createVegetationAlphaTexture(
          `${preset.proceduralPbrMaterial.seed}:${descriptor.id}:${materialRole}:alpha`,
          preset.propMaterialFidelity.clipTextureSize,
          alphaMode,
        )
      : createAlphaClipTexture(
          `${preset.proceduralPbrMaterial.seed}:${descriptor.id}:${materialRole}:alpha`,
          preset.propMaterialFidelity.clipTextureSize,
        )
    : null;
  const material = new MeshStandardMaterial({
    color: baseColor,
    alphaMap: alphaTexture ?? null,
    alphaTest: usesAlphaClip
      ? alphaMode === "grass-blades" || alphaMode === "vine-leaf"
        ? 0.3
        : isVegetation
          ? 0.36
          : 0.18
      : 0,
    transparent: usesAlphaClip,
    roughness:
      isCable || isVegetation
        ? Math.max(0.94, profile.roughness)
        : isDebris
          ? Math.max(0.86, profile.roughness)
          : profile.roughness,
    metalness: profile.metalness,
    bumpScale:
      preset.proceduralPbrMaterial.normalStrength *
      (isCable ? 0.04 : isFacade ? 0.12 : isSmallKitObject ? 0.1 : isTableObject ? 0.085 : 0.08),
    emissive: isResidue ? 0x4e5528 : isVegetation ? 0x10170d : isCable ? 0x11110d : isDebris ? 0x16120d : isFacade ? 0x1e1008 : isSmallKitObject ? 0x181008 : 0x1d160f,
    emissiveIntensity:
      (isResidue ? 0.22 : isVegetation ? 0.08 : isCable ? 0.1 : isDebris ? 0.09 : isFacade ? 0.1 : isSmallKitObject ? 0.1 : 0.12) *
      (1 + preset.propMaterialFidelity.emissiveCueStrength),
  });
  applyPropShader(material, descriptor, preset, baseColor);
  if (alphaTexture) {
    material.userData.generatedAlphaTexture = alphaTexture;
  }
  return material;
};

const createDarkMaterial = (descriptor: ScenePropDescriptor): MeshStandardMaterial =>
  new MeshStandardMaterial({
    color: descriptor.kind === "vent" ? 0x191611 : 0x211b14,
    roughness: 0.86,
    metalness: 0.16,
    emissive: 0x100c08,
    emissiveIntensity: 0.06,
  });

const createIndicatorMaterial = (descriptor: ScenePropDescriptor): MeshBasicMaterial =>
  new MeshBasicMaterial({
    color: descriptor.kind === "wall-box" ? 0xe0a161 : 0xb18a51,
    transparent: true,
    opacity: 0.78,
    toneMapped: false,
  });

const addBox = (
  group: Group,
  name: string,
  size: Readonly<{ x: number; y: number; z: number }>,
  position: Readonly<{ x: number; y: number; z: number }>,
  material: Material,
): Mesh => {
  const mesh = new Mesh(new BoxGeometry(size.x, size.y, size.z), material);
  mesh.name = name;
  mesh.position.set(position.x, position.y, position.z);
  group.add(mesh);
  return mesh;
};

const createWoundPlateGeometry = (
  size: Readonly<{ x: number; y: number; z: number }>,
  topScale = 0.92,
): BufferGeometry => {
  const bottomX = size.x * 0.5;
  const bottomY = size.y * 0.5;
  const bottomZ = size.z * 0.5;
  const topX = bottomX * topScale;
  const topZ = bottomZ * topScale;
  const geometry = new BufferGeometry();
  const vertices = [
    -bottomX, -bottomY, -bottomZ,
    bottomX, -bottomY, -bottomZ,
    bottomX, -bottomY, bottomZ,
    -bottomX, -bottomY, bottomZ,
    -topX, bottomY, -topZ,
    topX, bottomY, -topZ,
    topX, bottomY, topZ,
    -topX, bottomY, topZ,
  ];
  const indices = [
    0, 1, 2, 0, 2, 3,
    4, 7, 6, 4, 6, 5,
    3, 2, 6, 3, 6, 7,
    0, 4, 5, 0, 5, 1,
    1, 5, 6, 1, 6, 2,
    0, 3, 7, 0, 7, 4,
  ];
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.userData.triangleWinding = "outward-ccw";
  return geometry;
};

const addWoundPlate = (
  group: Group,
  name: string,
  size: Readonly<{ x: number; y: number; z: number }>,
  position: Readonly<{ x: number; y: number; z: number }>,
  material: Material,
  topScale = 0.92,
): Mesh => {
  const mesh = new Mesh(createWoundPlateGeometry(size, topScale), material);
  mesh.name = name;
  mesh.position.set(position.x, position.y, position.z);
  mesh.userData.geometrySource = "explicit-wound-triangles";
  group.add(mesh);
  return mesh;
};

const buildPipe = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const bodyMaterial = createPropMaterial(descriptor, preset, "pipe-body");
  const clampMaterial = createDarkMaterial(descriptor);
  materials.push(bodyMaterial, clampMaterial);

  const radius = descriptor.scale.x;
  const length = descriptor.scale.z;
  const pipe = new Mesh(new CylinderGeometry(radius, radius, length, 16), bodyMaterial);
  pipe.name = `${descriptor.id}-pipe-body`;
  pipe.rotation.x = Math.PI / 2;
  group.add(pipe);

  for (const z of [-length * 0.36, length * 0.36]) {
    const clamp = new Mesh(new TorusGeometry(radius * 1.08, radius * 0.16, 6, 16), clampMaterial);
    clamp.name = `${descriptor.id}-pipe-clamp`;
    clamp.position.z = z;
    group.add(clamp);

    addBox(
      group,
      `${descriptor.id}-pipe-bracket`,
      { x: radius * 2.7, y: radius * 0.5, z: radius * 0.9 },
      { x: 0, y: -radius * 1.55, z },
      clampMaterial,
    );
  }

  const seamMaterial = createDarkMaterial(descriptor);
  materials.push(seamMaterial);
  for (const z of [-length * 0.12, length * 0.12]) {
    addBox(
      group,
      `${descriptor.id}-pipe-serial-band`,
      { x: radius * 2.25, y: radius * 0.32, z: radius * 0.22 },
      { x: 0, y: radius * 1.2, z },
      seamMaterial,
    );
  }

  return group;
};

const buildCableBundle = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
  pulseTargets: Mesh[],
): Group => {
  const group = new Group();
  const cableMaterial = createPropMaterial(descriptor, preset, "cable-bundle");
  const tieMaterial = createDarkMaterial(descriptor);
  materials.push(cableMaterial, tieMaterial);

  const random = createRandom(descriptor.id);
  const length = descriptor.scale.z;
  const radius = Math.max(0.025, descriptor.scale.x * 0.48);

  for (let index = 0; index < 4; index += 1) {
    const xOffset = (index - 1.5) * radius * 1.7;
    const yOffset = (random() - 0.5) * radius * 1.8;
    const curve = new CatmullRomCurve3([
      new Vector3(xOffset, yOffset, -length / 2),
      new Vector3(xOffset + (random() - 0.5) * radius * 3, yOffset + radius * 0.9, -length * 0.15),
      new Vector3(xOffset + (random() - 0.5) * radius * 3, yOffset - radius * 0.7, length * 0.18),
      new Vector3(xOffset + (random() - 0.5) * radius * 2, yOffset, length / 2),
    ]);
    const cable = new Mesh(new TubeGeometry(curve, 14, radius, 5, false), cableMaterial);
    cable.name = `${descriptor.id}-cable-${index}`;
    group.add(cable);
    pulseTargets.push(cable);
  }

  for (const z of [-length * 0.3, length * 0.28]) {
    addBox(
      group,
      `${descriptor.id}-cable-tie`,
      { x: radius * 8, y: radius * 2.2, z: radius * 1.5 },
      { x: 0, y: 0, z },
      tieMaterial,
    );
  }

  return group;
};

const buildWallBox = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
  pulseTargets: Mesh[],
): Group => {
  const group = new Group();
  const bodyMaterial = createPropMaterial(descriptor, preset, "panel-body");
  const darkMaterial = createDarkMaterial(descriptor);
  const indicatorMaterial = createIndicatorMaterial(descriptor);
  materials.push(bodyMaterial, darkMaterial, indicatorMaterial);

  addBox(group, `${descriptor.id}-panel-body`, descriptor.scale, { x: 0, y: 0, z: 0 }, bodyMaterial);
  addBox(
    group,
    `${descriptor.id}-panel-top-rail`,
    { x: descriptor.scale.x * 1.18, y: descriptor.scale.y * 0.08, z: descriptor.scale.z * 1.28 },
    { x: 0, y: descriptor.scale.y * 0.58, z: -descriptor.scale.z * 0.18 },
    darkMaterial,
  );
  addBox(
    group,
    `${descriptor.id}-panel-bottom-rail`,
    { x: descriptor.scale.x * 1.18, y: descriptor.scale.y * 0.08, z: descriptor.scale.z * 1.28 },
    { x: 0, y: -descriptor.scale.y * 0.58, z: -descriptor.scale.z * 0.18 },
    darkMaterial,
  );
  addBox(
    group,
    `${descriptor.id}-panel-left-rail`,
    { x: descriptor.scale.x * 0.08, y: descriptor.scale.y * 1.16, z: descriptor.scale.z * 1.28 },
    { x: -descriptor.scale.x * 0.58, y: 0, z: -descriptor.scale.z * 0.18 },
    darkMaterial,
  );
  addBox(
    group,
    `${descriptor.id}-panel-right-rail`,
    { x: descriptor.scale.x * 0.08, y: descriptor.scale.y * 1.16, z: descriptor.scale.z * 1.28 },
    { x: descriptor.scale.x * 0.58, y: 0, z: -descriptor.scale.z * 0.18 },
    darkMaterial,
  );
  addBox(
    group,
    `${descriptor.id}-panel-face`,
    { x: descriptor.scale.x * 0.72, y: descriptor.scale.y * 0.14, z: descriptor.scale.z * 1.18 },
    { x: 0, y: descriptor.scale.y * 0.18, z: -descriptor.scale.z * 0.08 },
    darkMaterial,
  );
  const indicator = addBox(
    group,
    `${descriptor.id}-indicator`,
    { x: descriptor.scale.x * 0.12, y: descriptor.scale.y * 0.74, z: descriptor.scale.z * 1.24 },
    { x: descriptor.scale.x * 0.42, y: 0, z: -descriptor.scale.z * 0.12 },
    indicatorMaterial,
  );
  pulseTargets.push(indicator);

  for (const x of [-descriptor.scale.x * 0.34, descriptor.scale.x * 0.08]) {
    const trace = addBox(
      group,
      `${descriptor.id}-panel-trace`,
      { x: descriptor.scale.x * 0.18, y: descriptor.scale.y * 0.055, z: descriptor.scale.z * 1.3 },
      { x, y: -descriptor.scale.y * 0.28, z: -descriptor.scale.z * 0.22 },
      indicatorMaterial,
    );
    (trace.material as MeshBasicMaterial).opacity = 0.44;
    pulseTargets.push(trace);
  }

  return group;
};

const buildVent = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const bodyMaterial = createPropMaterial(descriptor, preset, "vent-body");
  const slatMaterial = createDarkMaterial(descriptor);
  materials.push(bodyMaterial, slatMaterial);

  addBox(group, `${descriptor.id}-vent-frame`, descriptor.scale, { x: 0, y: 0, z: 0 }, bodyMaterial);
  for (let index = 0; index < 5; index += 1) {
    const x = (index - 2) * descriptor.scale.x * 0.16;
    const slat = addBox(
      group,
      `${descriptor.id}-vent-slat-${index}`,
      { x: descriptor.scale.x * 0.055, y: descriptor.scale.y * 2.5, z: descriptor.scale.z * 1.12 },
      { x, y: 0, z: -descriptor.scale.z * 0.1 },
      slatMaterial,
    );
    slat.rotation.z = 0.18;
  }

  return group;
};

const buildCeilingDuct = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
  pulseTargets: Mesh[],
): Group => {
  const group = new Group();
  const bodyMaterial = createPropMaterial(descriptor, preset, "duct-body");
  const darkMaterial = createDarkMaterial(descriptor);
  const indicatorMaterial = createIndicatorMaterial(descriptor);
  materials.push(bodyMaterial, darkMaterial, indicatorMaterial);

  addBox(
    group,
    `${descriptor.id}-duct-body`,
    { x: descriptor.scale.x, y: descriptor.scale.y, z: descriptor.scale.z },
    { x: 0, y: 0, z: 0 },
    bodyMaterial,
  );

  for (const z of [-0.36, -0.12, 0.12, 0.36]) {
    addBox(
      group,
      `${descriptor.id}-duct-rib`,
      { x: descriptor.scale.x * 1.15, y: descriptor.scale.y * 1.18, z: descriptor.scale.z * 0.035 },
      { x: 0, y: 0, z: descriptor.scale.z * z },
      darkMaterial,
    );
  }

  for (const x of [-descriptor.scale.x * 0.42, descriptor.scale.x * 0.42]) {
    const conduit = new Mesh(
      new CylinderGeometry(descriptor.scale.y * 0.18, descriptor.scale.y * 0.18, descriptor.scale.z * 1.08, 8),
      darkMaterial,
    );
    conduit.name = `${descriptor.id}-ceiling-conduit`;
    conduit.position.set(x, -descriptor.scale.y * 0.85, 0);
    conduit.rotation.x = Math.PI / 2;
    group.add(conduit);
  }

  const indicator = addBox(
    group,
    `${descriptor.id}-duct-indicator`,
    { x: descriptor.scale.x * 0.16, y: descriptor.scale.y * 0.28, z: descriptor.scale.z * 0.18 },
    { x: descriptor.scale.x * 0.56, y: -descriptor.scale.y * 0.58, z: descriptor.scale.z * 0.22 },
    indicatorMaterial,
  );
  pulseTargets.push(indicator);

  return group;
};

const buildBuildingFacade = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
  pulseTargets: Mesh[],
): Group => {
  const group = new Group();
  const bodyMaterial = createPropMaterial(descriptor, preset, "projected-building-facade");
  const trimMaterial = createDarkMaterial(descriptor);
  const mossMaterial = createPropMaterial(
    {
      ...descriptor,
      materialFamily: "muddy-grass",
    },
    preset,
    "facade-moss",
  );
  const indicatorMaterial = createIndicatorMaterial(descriptor);
  materials.push(bodyMaterial, trimMaterial, mossMaterial, indicatorMaterial);

  addBox(
    group,
    `${descriptor.id}-facade-body`,
    { x: descriptor.scale.x, y: descriptor.scale.y, z: descriptor.scale.z },
    { x: 0, y: 0, z: 0 },
    bodyMaterial,
  );

  const rowCount = Math.max(3, Math.min(7, Math.floor(descriptor.scale.y / 0.55)));
  for (let row = 0; row < rowCount; row += 1) {
    const y = -descriptor.scale.y * 0.46 + (row / Math.max(1, rowCount - 1)) * descriptor.scale.y * 0.92;
    addBox(
      group,
      `${descriptor.id}-brick-course-${row}`,
      { x: descriptor.scale.x * 1.04, y: 0.035, z: descriptor.scale.z * 1.4 },
      { x: 0, y, z: -descriptor.scale.z * 0.2 },
      trimMaterial,
    );
  }

  for (const x of [-descriptor.scale.x * 0.26, descriptor.scale.x * 0.24]) {
    const window = addBox(
      group,
      `${descriptor.id}-black-window`,
      { x: descriptor.scale.x * 0.22, y: descriptor.scale.y * 0.2, z: descriptor.scale.z * 1.5 },
      { x, y: descriptor.scale.y * 0.12, z: -descriptor.scale.z * 0.24 },
      trimMaterial,
    );
    window.rotation.z = x < 0 ? 0.03 : -0.035;
  }

  addBox(
    group,
    `${descriptor.id}-facade-base-ledge`,
    { x: descriptor.scale.x * 1.14, y: 0.12, z: descriptor.scale.z * 2.15 },
    { x: 0, y: -descriptor.scale.y * 0.5, z: -descriptor.scale.z * 0.42 },
    trimMaterial,
  );
  addBox(
    group,
    `${descriptor.id}-facade-broken-cap`,
    { x: descriptor.scale.x * 0.76, y: 0.1, z: descriptor.scale.z * 1.65 },
    { x: descriptor.scale.x * 0.08, y: descriptor.scale.y * 0.5, z: -descriptor.scale.z * 0.36 },
    bodyMaterial,
  );

  for (const x of [-descriptor.scale.x * 0.42, descriptor.scale.x * 0.4]) {
    const vine = new Mesh(
      new CylinderGeometry(0.018, 0.026, descriptor.scale.y * 0.82, 5),
      mossMaterial,
    );
    vine.name = `${descriptor.id}-facade-vine`;
    vine.position.set(x, -descriptor.scale.y * 0.03, -descriptor.scale.z * 0.56);
    vine.rotation.z = x < 0 ? 0.12 : -0.16;
    group.add(vine);
  }

  const weakGlow = addBox(
    group,
    `${descriptor.id}-facade-weak-window-glow`,
    { x: descriptor.scale.x * 0.1, y: descriptor.scale.y * 0.1, z: descriptor.scale.z * 1.62 },
    { x: descriptor.scale.x * 0.36, y: descriptor.scale.y * 0.22, z: -descriptor.scale.z * 0.58 },
    indicatorMaterial,
  );
  (weakGlow.material as MeshBasicMaterial).opacity = 0.32;
  pulseTargets.push(weakGlow);

  return group;
};

const buildDebris = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const material = createPropMaterial(descriptor, preset, "debris");
  materials.push(material);
  const random = createRandom(descriptor.id);

  for (let index = 0; index < 4; index += 1) {
    const size = {
      x: descriptor.scale.x * (0.45 + random() * 0.65),
      y: descriptor.scale.y * (0.35 + random() * 0.75),
      z: descriptor.scale.z * (0.4 + random() * 0.7),
    };
    const piece = addBox(
      group,
      `${descriptor.id}-debris-${index}`,
      size,
      {
        x: (random() - 0.5) * descriptor.scale.x * 1.2,
        y: size.y * 0.5,
        z: (random() - 0.5) * descriptor.scale.z * 1.2,
      },
      material,
    );
    piece.rotation.set(random() * 0.25, random() * Math.PI, random() * 0.18);
  }

  return group;
};

const buildRubble = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const material = createPropMaterial(descriptor, preset, "broken-rubble");
  const darkMaterial = createDarkMaterial(descriptor);
  materials.push(material, darkMaterial);
  const random = createRandom(descriptor.id);

  for (let index = 0; index < 7; index += 1) {
    const radius = Math.max(0.08, descriptor.scale.x * (0.22 + random() * 0.34));
    const piece =
      index % 3 === 0
        ? new Mesh(new SphereGeometry(radius, 5, 4), material)
        : new Mesh(
            new BoxGeometry(
              descriptor.scale.x * (0.22 + random() * 0.42),
              descriptor.scale.y * (0.25 + random() * 0.5),
              descriptor.scale.z * (0.2 + random() * 0.48),
            ),
            index % 2 === 0 ? material : darkMaterial,
          );
    piece.name = `${descriptor.id}-rubble-${index}`;
    piece.position.set(
      (random() - 0.5) * descriptor.scale.x * 1.65,
      radius * 0.55 + random() * descriptor.scale.y * 0.18,
      (random() - 0.5) * descriptor.scale.z * 1.65,
    );
    piece.rotation.set(random() * 0.5, random() * Math.PI, random() * 0.4);
    group.add(piece);
  }

  return group;
};

const buildRockCluster = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const stoneMaterial = createPropMaterial(descriptor, preset, "rock-cluster");
  const darkMaterial = createDarkMaterial(descriptor);
  materials.push(stoneMaterial, darkMaterial);
  const random = createRandom(descriptor.id);

  for (let index = 0; index < 6; index += 1) {
    const radius = Math.max(0.1, descriptor.scale.x * (0.18 + random() * 0.32));
    const stone = new Mesh(new SphereGeometry(radius, 7, 6), index % 3 === 0 ? darkMaterial : stoneMaterial);
    stone.name = `${descriptor.id}-rock-${index}`;
    stone.position.set(
      (random() - 0.5) * descriptor.scale.x * 1.45,
      radius * (0.8 + random() * 0.28),
      (random() - 0.5) * descriptor.scale.z * 1.4,
    );
    stone.scale.set(1, 0.78 + random() * 0.42, 0.84 + random() * 0.34);
    stone.rotation.set((random() - 0.5) * 0.24, random() * Math.PI, (random() - 0.5) * 0.18);
    group.add(stone);
  }

  return group;
};

const buildGrassClump = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const material = createPropMaterial(
    descriptor,
    preset,
    "grass-card",
    "grass-blades",
  );
  material.side = DoubleSide;
  materials.push(material);
  const random = createRandom(descriptor.id);

  for (let index = 0; index < 5; index += 1) {
    const card = new Mesh(
      new PlaneGeometry(
        descriptor.scale.x * (0.55 + random() * 0.55),
        descriptor.scale.y * (0.75 + random() * 0.6),
      ),
      material,
    );
    card.name = `${descriptor.id}-grass-card-${index}`;
    card.position.set(
      (random() - 0.5) * descriptor.scale.x,
      descriptor.scale.y * 0.38,
      (random() - 0.5) * descriptor.scale.z,
    );
    card.rotation.y = (Math.PI / 5) * index + random() * 0.28;
    card.rotation.x = -0.08 + random() * 0.16;
    group.add(card);
  }

  return group;
};

const buildRootStrip = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const material = createPropMaterial(descriptor, preset, "root-fiber", "none");
  materials.push(material);
  const random = createRandom(descriptor.id);

  for (let index = 0; index < 3; index += 1) {
    const width = descriptor.scale.x * (0.45 + random() * 0.8);
    const curve = new CatmullRomCurve3([
      new Vector3(-width, 0.04, -descriptor.scale.z * 0.48),
      new Vector3(width * (random() - 0.5), 0.055, -descriptor.scale.z * 0.18),
      new Vector3(width * (random() - 0.5), 0.045, descriptor.scale.z * 0.12),
      new Vector3(width, 0.035, descriptor.scale.z * 0.48),
    ]);
    const root = new Mesh(
      new TubeGeometry(curve, 10, descriptor.scale.x * (0.22 + random() * 0.22), 5, false),
      material,
    );
    root.name = `${descriptor.id}-root-${index}`;
    root.position.x = (random() - 0.5) * descriptor.scale.x * 2;
    root.rotation.y = (random() - 0.5) * 0.28;
    group.add(root);
  }

  return group;
};

const buildHangingVine = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const stemDescriptor: ScenePropDescriptor = {
    ...descriptor,
    materialFamily: "root-fiber",
  };
  const leafDescriptor: ScenePropDescriptor = {
    ...descriptor,
    materialFamily: "muddy-grass",
  };
  const stemMaterial = createPropMaterial(
    stemDescriptor,
    preset,
    "vine-stem",
    "none",
  );
  const leafMaterial = createPropMaterial(
    leafDescriptor,
    preset,
    "vine-leaf",
    "vine-leaf",
  );
  leafMaterial.side = DoubleSide;
  materials.push(stemMaterial, leafMaterial);

  const random = createRandom(descriptor.id);
  const spread = Math.max(0.35, descriptor.scale.x);
  const hangingLength = Math.max(0.7, descriptor.scale.y);
  const depth = Math.max(0.18, descriptor.scale.z);
  const vineCount = Math.max(3, Math.min(7, Math.round(3 + spread * 1.6)));
  const stemRadius = Math.max(0.012, Math.min(0.035, spread * 0.021));

  for (let vineIndex = 0; vineIndex < vineCount; vineIndex += 1) {
    const startX =
      ((vineIndex + 0.5) / vineCount - 0.5) * spread +
      (random() - 0.5) * spread * 0.12;
    const startZ = (random() - 0.5) * depth;
    const length = hangingLength * (0.62 + random() * 0.38);
    const sway = (random() - 0.5) * spread * 0.46;
    const curve = new CatmullRomCurve3([
      new Vector3(startX, 0, startZ),
      new Vector3(
        startX + sway * 0.28,
        -length * 0.3,
        startZ + (random() - 0.5) * depth * 0.42,
      ),
      new Vector3(
        startX - sway * 0.2,
        -length * 0.64,
        startZ + (random() - 0.5) * depth * 0.54,
      ),
      new Vector3(
        startX + sway,
        -length,
        startZ + (random() - 0.5) * depth * 0.7,
      ),
    ]);
    const stem = new Mesh(
      new TubeGeometry(
        curve,
        18,
        stemRadius * (0.72 + random() * 0.42),
        6,
        false,
      ),
      stemMaterial,
    );
    stem.name = `${descriptor.id}-vine-stem-${vineIndex}`;
    group.add(stem);

    const leafTierCount = 3 + Math.floor(random() * 3);
    for (let tier = 0; tier < leafTierCount; tier += 1) {
      const point = curve.getPoint((tier + 1) / (leafTierCount + 1.4));
      const leafWidth = Math.min(
        0.34,
        0.13 + spread * 0.075 + random() * 0.07,
      );
      const leafHeight = leafWidth * (1.55 + random() * 0.5);

      for (const side of [-1, 1]) {
        const leaf = new Mesh(
          new PlaneGeometry(leafWidth, leafHeight),
          leafMaterial,
        );
        leaf.name = `${descriptor.id}-vine-leaf-${vineIndex}-${tier}-${side}`;
        leaf.position.copy(point);
        leaf.position.x += side * leafWidth * (0.34 + random() * 0.18);
        leaf.position.y -= leafHeight * 0.08;
        leaf.position.z += (random() - 0.5) * depth * 0.18;
        leaf.rotation.y = random() * Math.PI;
        leaf.rotation.z = side * (0.58 + random() * 0.34);
        group.add(leaf);
      }
    }
  }

  return group;
};

const buildUtilityCrateStack = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const bodyMaterial = createPropMaterial(descriptor, preset, "utility-crate-body");
  const strapMaterial = createDarkMaterial(descriptor);
  materials.push(bodyMaterial, strapMaterial);
  const random = createRandom(descriptor.id);
  const crateCount = 3 + Math.floor(random() * 3);

  for (let index = 0; index < crateCount; index += 1) {
    const stackY = Math.floor(index / 2);
    const side = index % 2 === 0 ? -1 : 1;
    const size = {
      x: descriptor.scale.x * (0.62 + random() * 0.22),
      y: descriptor.scale.y * (0.5 + random() * 0.18),
      z: descriptor.scale.z * (0.62 + random() * 0.22),
    };
    const crate = addBox(
      group,
      `${descriptor.id}-utility-crate-${index}`,
      size,
      {
        x: side * descriptor.scale.x * 0.25 + (random() - 0.5) * descriptor.scale.x * 0.1,
        y: size.y * 0.5 + stackY * descriptor.scale.y * 0.42,
        z: (random() - 0.5) * descriptor.scale.z * 0.22,
      },
      bodyMaterial,
    );
    crate.rotation.y = (random() - 0.5) * 0.24;

    addBox(
      group,
      `${descriptor.id}-crate-strap-x-${index}`,
      { x: size.x * 1.08, y: size.y * 0.08, z: size.z * 1.1 },
      { x: crate.position.x, y: crate.position.y + size.y * 0.18, z: crate.position.z },
      strapMaterial,
    );
    addBox(
      group,
      `${descriptor.id}-crate-strap-z-${index}`,
      { x: size.x * 0.08, y: size.y * 1.05, z: size.z * 1.12 },
      { x: crate.position.x + size.x * 0.28, y: crate.position.y, z: crate.position.z },
      strapMaterial,
    );
  }

  return group;
};

const buildBrickRubblePile = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const brickMaterial = createPropMaterial(descriptor, preset, "brick-rubble");
  const darkMaterial = createDarkMaterial(descriptor);
  materials.push(brickMaterial, darkMaterial);
  const random = createRandom(descriptor.id);

  for (let index = 0; index < 10; index += 1) {
    const size = {
      x: descriptor.scale.x * (0.12 + random() * 0.22),
      y: descriptor.scale.y * (0.28 + random() * 0.68),
      z: descriptor.scale.z * (0.1 + random() * 0.22),
    };
    const brick = addBox(
      group,
      `${descriptor.id}-brick-${index}`,
      size,
      {
        x: (random() - 0.5) * descriptor.scale.x * 1.45,
        y: size.y * 0.5 + random() * descriptor.scale.y * 0.22,
        z: (random() - 0.5) * descriptor.scale.z * 1.35,
      },
      index % 4 === 0 ? darkMaterial : brickMaterial,
    );
    brick.rotation.set((random() - 0.5) * 0.4, random() * Math.PI, (random() - 0.5) * 0.32);
  }

  return group;
};

const buildLooseFloorSlab = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const slabMaterial = createPropMaterial(descriptor, preset, "loose-floor-slab");
  const crackMaterial = createDarkMaterial(descriptor);
  materials.push(slabMaterial, crackMaterial);
  const random = createRandom(descriptor.id);
  const slabCount = 2 + Math.floor(random() * 3);

  for (let index = 0; index < slabCount; index += 1) {
    const slab = addBox(
      group,
      `${descriptor.id}-loose-slab-${index}`,
      {
        x: descriptor.scale.x * (0.55 + random() * 0.4),
        y: descriptor.scale.y,
        z: descriptor.scale.z * (0.55 + random() * 0.48),
      },
      {
        x: (random() - 0.5) * descriptor.scale.x * 0.82,
        y: descriptor.scale.y * 0.5 + index * 0.012,
        z: (random() - 0.5) * descriptor.scale.z * 0.72,
      },
      slabMaterial,
    );
    slab.rotation.y = random() * Math.PI;
    slab.rotation.z = (random() - 0.5) * 0.08;

    addBox(
      group,
      `${descriptor.id}-slab-crack-${index}`,
      { x: descriptor.scale.x * (0.28 + random() * 0.28), y: descriptor.scale.y * 1.3, z: 0.018 },
      { x: slab.position.x, y: slab.position.y + descriptor.scale.y * 0.6, z: slab.position.z },
      crackMaterial,
    ).rotation.y = slab.rotation.y + (random() - 0.5) * 0.4;
  }

  return group;
};

const buildCeilingServiceStrip = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
  pulseTargets: Mesh[],
): Group => {
  const group = new Group();
  const railMaterial = createPropMaterial(descriptor, preset, "ceiling-service-rail");
  const cableMaterial = createPropMaterial(
    {
      ...descriptor,
      materialFamily: "rubber-cable",
    },
    preset,
    "ceiling-service-cable",
  );
  const indicatorMaterial = createIndicatorMaterial(descriptor);
  materials.push(railMaterial, cableMaterial, indicatorMaterial);

  addBox(
    group,
    `${descriptor.id}-service-rail`,
    { x: descriptor.scale.x * 1.25, y: descriptor.scale.y * 0.28, z: descriptor.scale.z },
    { x: 0, y: 0, z: 0 },
    railMaterial,
  );

  for (const x of [-descriptor.scale.x * 0.35, 0, descriptor.scale.x * 0.35]) {
    const conduit = new Mesh(
      new CylinderGeometry(descriptor.scale.y * 0.09, descriptor.scale.y * 0.09, descriptor.scale.z * 1.1, 6),
      cableMaterial,
    );
    conduit.name = `${descriptor.id}-service-conduit`;
    conduit.position.set(x, -descriptor.scale.y * 0.42, 0);
    conduit.rotation.x = Math.PI / 2;
    group.add(conduit);
  }

  for (const z of [-descriptor.scale.z * 0.42, -descriptor.scale.z * 0.12, descriptor.scale.z * 0.2, descriptor.scale.z * 0.45]) {
    addBox(
      group,
      `${descriptor.id}-service-hanger`,
      { x: descriptor.scale.x * 1.38, y: descriptor.scale.y * 0.12, z: descriptor.scale.y * 0.18 },
      { x: 0, y: -descriptor.scale.y * 0.68, z },
      railMaterial,
    );
  }

  const weakIndicator = addBox(
    group,
    `${descriptor.id}-service-weak-indicator`,
    { x: descriptor.scale.x * 0.22, y: descriptor.scale.y * 0.2, z: descriptor.scale.y * 0.22 },
    { x: descriptor.scale.x * 0.5, y: -descriptor.scale.y * 0.76, z: descriptor.scale.z * 0.32 },
    indicatorMaterial,
  );
  (weakIndicator.material as MeshBasicMaterial).opacity = 0.38;
  pulseTargets.push(weakIndicator);

  return group;
};

const buildTable = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const tabletopMaterial = createPropMaterial(descriptor, preset, "tabletop");
  const legMaterial = createPropMaterial(descriptor, preset, "table-legs");
  const darkMaterial = createDarkMaterial(descriptor);
  materials.push(tabletopMaterial, legMaterial, darkMaterial);

  addBox(
    group,
    `${descriptor.id}-tabletop`,
    { x: descriptor.scale.x, y: 0.12, z: descriptor.scale.z },
    { x: 0, y: descriptor.scale.y, z: 0 },
    tabletopMaterial,
  );

  for (const x of [-descriptor.scale.x * 0.42, descriptor.scale.x * 0.42]) {
    for (const z of [-descriptor.scale.z * 0.36, descriptor.scale.z * 0.36]) {
      addBox(
        group,
        `${descriptor.id}-table-leg`,
        { x: 0.08, y: descriptor.scale.y * 0.92, z: 0.08 },
        { x, y: descriptor.scale.y * 0.46, z },
        legMaterial,
      );
    }
  }

  addBox(
    group,
    `${descriptor.id}-table-crossbrace`,
    { x: descriptor.scale.x * 0.9, y: 0.055, z: 0.065 },
    { x: 0, y: descriptor.scale.y * 0.5, z: 0 },
    darkMaterial,
  );

  return group;
};

const buildCrate = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
): Group => {
  const group = new Group();
  const bodyMaterial = createPropMaterial(descriptor, preset, "crate-body");
  const edgeMaterial = createDarkMaterial(descriptor);
  materials.push(bodyMaterial, edgeMaterial);

  addBox(
    group,
    `${descriptor.id}-crate-body`,
    descriptor.scale,
    { x: 0, y: descriptor.scale.y * 0.5, z: 0 },
    bodyMaterial,
  );

  for (const x of [-descriptor.scale.x * 0.54, descriptor.scale.x * 0.54]) {
    addBox(
      group,
      `${descriptor.id}-crate-edge-x`,
      { x: descriptor.scale.x * 0.065, y: descriptor.scale.y * 1.08, z: descriptor.scale.z * 1.12 },
      { x, y: descriptor.scale.y * 0.5, z: 0 },
      edgeMaterial,
    );
  }

  for (const z of [-descriptor.scale.z * 0.54, descriptor.scale.z * 0.54]) {
    addBox(
      group,
      `${descriptor.id}-crate-edge-z`,
      { x: descriptor.scale.x * 1.12, y: descriptor.scale.y * 0.08, z: descriptor.scale.z * 0.065 },
      { x: 0, y: descriptor.scale.y * 0.92, z },
      edgeMaterial,
    );
  }

  return group;
};

const buildLampPost = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
  pulseTargets: Mesh[],
): Group => {
  const group = new Group();
  const poleMaterial = createPropMaterial(descriptor, preset, "lamp-pole");
  const darkMaterial = createDarkMaterial(descriptor);
  const glowMaterial = createIndicatorMaterial(descriptor);
  materials.push(poleMaterial, darkMaterial, glowMaterial);

  const poleHeight = descriptor.scale.y;
  const poleRadius = descriptor.scale.x;

  const pole = new Mesh(new CylinderGeometry(poleRadius * 0.52, poleRadius * 0.82, poleHeight, 12), poleMaterial);
  pole.name = `${descriptor.id}-lamp-pole`;
  pole.position.y = poleHeight * 0.5;
  group.add(pole);

  for (const y of [poleHeight * 0.18, poleHeight * 0.48, poleHeight * 0.78]) {
    const rustBand = new Mesh(new TorusGeometry(poleRadius * 0.62, poleRadius * 0.08, 6, 16), darkMaterial);
    rustBand.name = `${descriptor.id}-lamp-rust-band`;
    rustBand.position.y = y;
    rustBand.rotation.x = Math.PI / 2;
    group.add(rustBand);
  }

  const wallBracket = addBox(
    group,
    `${descriptor.id}-lamp-wall-bracket`,
    { x: poleRadius * 1.9, y: poleRadius * 3.2, z: poleRadius * 0.52 },
    { x: -poleRadius * 0.72, y: poleHeight * 0.58, z: -poleRadius * 0.48 },
    darkMaterial,
  );
  wallBracket.rotation.z = -0.03;

  const arm = new Mesh(new CylinderGeometry(poleRadius * 0.28, poleRadius * 0.34, poleHeight * 0.36, 10), darkMaterial);
  arm.name = `${descriptor.id}-lamp-arm`;
  arm.position.set(poleRadius * 0.98, poleHeight * 0.9, 0);
  arm.rotation.z = Math.PI / 2.15;
  group.add(arm);

  const head = addBox(
    group,
    `${descriptor.id}-lamp-head`,
    { x: poleRadius * 1.78, y: poleRadius * 0.82, z: poleRadius * 1.28 },
    { x: poleRadius * 1.82, y: poleHeight * 0.84, z: 0 },
    poleMaterial,
  );
  head.rotation.z = -0.14;

  addBox(
    group,
    `${descriptor.id}-lamp-head-cap`,
    { x: poleRadius * 2.05, y: poleRadius * 0.24, z: poleRadius * 1.48 },
    { x: poleRadius * 1.7, y: poleHeight * 0.98, z: 0 },
    darkMaterial,
  ).rotation.z = -0.12;

  for (const z of [-poleRadius * 0.48, 0, poleRadius * 0.48]) {
    const cage = new Mesh(new CylinderGeometry(poleRadius * 0.045, poleRadius * 0.045, poleRadius * 1.42, 5), darkMaterial);
    cage.name = `${descriptor.id}-lamp-cage-rib`;
    cage.position.set(poleRadius * 2.1, poleHeight * 0.77, z);
    cage.rotation.x = Math.PI / 2;
    cage.rotation.z = -0.14;
    group.add(cage);
  }

  const lens = addBox(
    group,
    `${descriptor.id}-lamp-warm-lens`,
    { x: poleRadius * 0.72, y: poleRadius * 0.18, z: poleRadius * 0.94 },
    { x: poleRadius * 2.34, y: poleHeight * 0.75, z: 0 },
    glowMaterial,
  );
  lens.rotation.z = -0.14;
  pulseTargets.push(lens);

  const bulb = new Mesh(new SphereGeometry(poleRadius * 0.28, 10, 8), glowMaterial);
  bulb.name = `${descriptor.id}-lamp-bulb`;
  bulb.position.set(poleRadius * 2.08, poleHeight * 0.76, 0);
  group.add(bulb);
  pulseTargets.push(bulb);

  const basePlate = addWoundPlate(
    group,
    `${descriptor.id}-lamp-base-plate-wound`,
    { x: poleRadius * 3.32, y: poleRadius * 0.34, z: poleRadius * 2.72 },
    { x: 0, y: poleRadius * 0.17, z: 0 },
    darkMaterial,
    0.86,
  );
  basePlate.rotation.y = Math.PI / 4;

  const baseBlock = addWoundPlate(
    group,
    `${descriptor.id}-lamp-base-wound`,
    { x: poleRadius * 2.45, y: poleRadius * 0.24, z: poleRadius * 2.45 },
    { x: 0, y: poleRadius * 0.39, z: 0 },
    darkMaterial,
    0.9,
  );
  baseBlock.rotation.y = Math.PI / 4;

  for (const x of [-poleRadius * 0.76, poleRadius * 0.76]) {
    for (const z of [-poleRadius * 0.76, poleRadius * 0.76]) {
      const bolt = new Mesh(new SphereGeometry(poleRadius * 0.11, 6, 5), poleMaterial);
      bolt.name = `${descriptor.id}-lamp-base-bolt`;
      bolt.position.set(x, poleRadius * 0.56, z);
      group.add(bolt);
    }
  }

  const cable = new Mesh(
    new TubeGeometry(
      new CatmullRomCurve3([
        new Vector3(-poleRadius * 0.44, poleHeight * 0.72, -poleRadius * 0.52),
        new Vector3(poleRadius * 0.25, poleHeight * 0.96, -poleRadius * 0.72),
        new Vector3(poleRadius * 1.64, poleHeight * 0.98, -poleRadius * 0.42),
        new Vector3(poleRadius * 2.03, poleHeight * 0.84, -poleRadius * 0.2),
      ]),
      18,
      poleRadius * 0.055,
      5,
      false,
    ),
    darkMaterial,
  );
  cable.name = `${descriptor.id}-lamp-service-cable`;
  group.add(cable);

  return group;
};

const buildPedestalDressing = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  materials: Material[],
  pulseTargets: Mesh[],
): Group => {
  const group = new Group();
  const baseMaterial = createPropMaterial(descriptor, preset, "pedestal");
  const indicatorMaterial = createIndicatorMaterial(descriptor);
  materials.push(baseMaterial, indicatorMaterial);

  const base = new Mesh(
    new CylinderGeometry(descriptor.scale.x * 0.75, descriptor.scale.x, descriptor.scale.y * 1.8, 8),
    baseMaterial,
  );
  base.name = `${descriptor.id}-pedestal-base`;
  base.position.y = descriptor.scale.y * 0.9;
  group.add(base);

  const bulb = new Mesh(new SphereGeometry(descriptor.scale.x * 0.32, 8, 8), indicatorMaterial);
  bulb.name = `${descriptor.id}-pedestal-glow`;
  bulb.position.y = descriptor.scale.y * 2.1;
  group.add(bulb);
  pulseTargets.push(bulb);

  return group;
};

export const createScenePropRenderable = (
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
): ScenePropRenderable => {
  const materials: Material[] = [];
  const pulseTargets: Mesh[] = [];
  const object =
    descriptor.kind === "pipe" || descriptor.kind === "floor-pipe"
      ? buildPipe(descriptor, preset, materials)
      : descriptor.kind === "cable"
        ? buildCableBundle(descriptor, preset, materials, pulseTargets)
        : descriptor.kind === "vent"
          ? buildVent(descriptor, preset, materials)
          : descriptor.kind === "ceiling-duct"
            ? buildCeilingDuct(descriptor, preset, materials, pulseTargets)
            : descriptor.kind === "building-facade"
              ? buildBuildingFacade(descriptor, preset, materials, pulseTargets)
              : descriptor.kind === "utility-crate-stack"
                ? buildUtilityCrateStack(descriptor, preset, materials)
                : descriptor.kind === "brick-rubble-pile"
                  ? buildBrickRubblePile(descriptor, preset, materials)
                  : descriptor.kind === "loose-floor-slab"
                    ? buildLooseFloorSlab(descriptor, preset, materials)
                    : descriptor.kind === "ceiling-service-strip"
                      ? buildCeilingServiceStrip(descriptor, preset, materials, pulseTargets)
              : descriptor.kind === "debris"
                ? buildDebris(descriptor, preset, materials)
                : descriptor.kind === "rubble"
                  ? buildRubble(descriptor, preset, materials)
                  : descriptor.kind === "rock-cluster"
                    ? buildRockCluster(descriptor, preset, materials)
                  : descriptor.kind === "grass-clump"
                    ? buildGrassClump(descriptor, preset, materials)
                  : descriptor.kind === "root-strip"
                    ? buildRootStrip(descriptor, preset, materials)
                    : descriptor.kind === "hanging-vine"
                      ? buildHangingVine(descriptor, preset, materials)
                      : descriptor.kind === "lamp-post"
                        ? buildLampPost(descriptor, preset, materials, pulseTargets)
                      : descriptor.kind === "table"
                        ? buildTable(descriptor, preset, materials)
                        : descriptor.kind === "crate"
                          ? buildCrate(descriptor, preset, materials)
                          : descriptor.kind === "pedestal-dressing"
                            ? buildPedestalDressing(descriptor, preset, materials, pulseTargets)
                            : buildWallBox(descriptor, preset, materials, pulseTargets);

  object.name = descriptor.id;
  object.position.set(descriptor.position.x, descriptor.position.y, descriptor.position.z);
  object.rotation.y = descriptor.rotationY;
  object.userData.scenePropKind = descriptor.kind;
  object.userData.tags = descriptor.tags;

  return { object, pulseTargets, materials };
};

export const createSceneTextureRenderable = (
  descriptor: SceneTextureDescriptor,
  preset: HorrorCorridorPreset,
): SceneTextureRenderable => {
  const isMoss = descriptor.kind === "moss" || descriptor.kind === "moss-grime";
  const geometry = new PlaneGeometry(descriptor.scale.x, descriptor.scale.y);
  const alphaMap = createProjectionAlphaTexture(
    `${descriptor.id}:${descriptor.kind}:projection-alpha`,
    preset.propMaterialFidelity.projectionTextureSize,
    descriptor.kind,
  );
  const opacity = Math.min(
    descriptor.opacity,
    descriptor.kind === "anomaly-residue" ? 0.22 : isMoss ? 0.12 : 0.18,
  );
  const material = new MeshBasicMaterial({
    color: descriptor.color,
    alphaMap,
    alphaTest: descriptor.kind === "anomaly-residue" ? 0.18 : isMoss ? 0.24 : 0.12,
    transparent: true,
    opacity,
    side: DoubleSide,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    polygonOffsetUnits: -4,
    toneMapped: true,
  });
  material.userData.baseOpacity = opacity;
  material.userData.generatedProjectionAlphaTexture = alphaMap;
  const mesh = new Mesh(geometry, material);
  mesh.name = descriptor.id;
  mesh.position.set(descriptor.position.x, descriptor.position.y, descriptor.position.z);
  mesh.rotation.set(descriptor.rotation.x, descriptor.rotation.y, descriptor.rotation.z);
  mesh.userData.sceneTextureKind = descriptor.kind;

  return {
    object: mesh,
    pulseTargets: descriptor.kind === "anomaly-residue" ? [mesh] : [],
    materials: [material],
  };
};
