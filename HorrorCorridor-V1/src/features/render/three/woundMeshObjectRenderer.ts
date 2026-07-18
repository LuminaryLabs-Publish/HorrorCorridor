import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshStandardMaterial,
  type Material,
} from "three";

import type { WoundMeshObjectDescriptor } from "@/protokits";

export type WoundMeshObjectRenderable = Readonly<{
  object: Group;
  materials: readonly Material[];
}>;

const materialProfileByFamily: Readonly<
  Record<
    string,
    Readonly<{
      color: number;
      emissive: number;
      emissiveIntensity: number;
      metalness: number;
      roughness: number;
    }>
  >
> = Object.freeze({
  "painted-metal": {
    color: 0x554a3c,
    emissive: 0x160f0a,
    emissiveIntensity: 0.08,
    metalness: 0.34,
    roughness: 0.64,
  },
  "painted-utility": {
    color: 0x4f583d,
    emissive: 0x111409,
    emissiveIntensity: 0.08,
    metalness: 0.18,
    roughness: 0.82,
  },
  "rusted-metal": {
    color: 0x633c25,
    emissive: 0x170b05,
    emissiveIntensity: 0.08,
    metalness: 0.25,
    roughness: 0.82,
  },
  "rubber-cable": {
    color: 0x171612,
    emissive: 0x080705,
    emissiveIntensity: 0.04,
    metalness: 0.01,
    roughness: 0.96,
  },
  "wet-concrete": {
    color: 0x5c5a54,
    emissive: 0x111210,
    emissiveIntensity: 0.05,
    metalness: 0.03,
    roughness: 0.62,
  },
  "damp-concrete": {
    color: 0x343a36,
    emissive: 0x0d120f,
    emissiveIntensity: 0.055,
    metalness: 0.01,
    roughness: 0.94,
  },
  "broken-brick": {
    color: 0x4c342a,
    emissive: 0x150906,
    emissiveIntensity: 0.06,
    metalness: 0.01,
    roughness: 0.96,
  },
  "fracture-shadow": {
    color: 0x0b0d0c,
    emissive: 0x000000,
    emissiveIntensity: 0,
    metalness: 0,
    roughness: 1,
  },
});

const createMaterial = (family: string): MeshStandardMaterial => {
  const profile =
    materialProfileByFamily[family] ??
    materialProfileByFamily["painted-metal"];

  const material = new MeshStandardMaterial({
    color: profile.color,
    emissive: profile.emissive,
    emissiveIntensity: profile.emissiveIntensity,
    metalness: profile.metalness,
    roughness: profile.roughness,
  });
  material.name = "wound-mesh-" + family;
  return material;
};

export const createWoundMeshObjectRenderable = (
  descriptor: WoundMeshObjectDescriptor,
): WoundMeshObjectRenderable => {
  const object = new Group();
  object.name = descriptor.id;
  object.userData.kitId = descriptor.kitId;
  object.userData.propKind = descriptor.propKind;
  object.userData.triangleWinding = descriptor.triangleWinding;

  const materialByFamily = new Map<string, MeshStandardMaterial>();

  const materialFor = (family: string): MeshStandardMaterial => {
    const existing = materialByFamily.get(family);
    if (existing) return existing;
    const material = createMaterial(family);
    materialByFamily.set(family, material);
    return material;
  };

  for (const part of descriptor.parts) {
    const geometry = new BufferGeometry();
    geometry.setAttribute(
      "position",
      new Float32BufferAttribute(part.positions, 3),
    );
    geometry.setAttribute(
      "normal",
      new Float32BufferAttribute(part.normals, 3),
    );
    geometry.setAttribute("uv", new Float32BufferAttribute(part.uvs, 2));
    geometry.setIndex([...part.indices]);
    geometry.computeBoundingSphere();
    geometry.userData.bounds = part.bounds;
    geometry.userData.triangleWinding = descriptor.triangleWinding;

    const family = part.materialSlots[0]?.family ?? "painted-metal";
    const mesh = new Mesh(geometry, materialFor(family));
    mesh.name = part.id;
    mesh.userData.label = part.label;
    mesh.userData.tags = part.tags;
    object.add(mesh);
  }

  return {
    object,
    materials: [...materialByFamily.values()],
  };
};
