import {
  BoxGeometry,
  Color,
  DataTexture,
  DoubleSide,
  FrontSide,
  Group,
  InstancedMesh,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  OctahedronGeometry,
  PlaneGeometry,
  PointLight,
  RepeatWrapping,
  RGBAFormat,
  UnsignedByteType,
  type Material,
} from "three";

import type { MazeResult } from "@/features/maze/domain/mazeTypes";
import {
  createFurnishedChamberManifest,
  createMeshObjectDescriptorCatalog,
  type FurnishedChamberSurfaceDescriptor,
  type HorrorCorridorPreset,
} from "@/protokits";

import type { TerrainSurface } from "./terrainSurface";
import {
  createScenePropRenderable,
  createSceneTextureRenderable,
  type ScenePropRenderable,
} from "./sceneDressingRenderer";
import type {
  ScenePropDescriptor,
  ScenePropKind,
  SceneTextureDescriptor,
  SceneTextureKind,
} from "./sceneDressingDescriptors";
import { applyPropShader, applyTerrainShader } from "./proceduralShaders";
import { createWoundMeshObjectRenderable } from "./woundMeshObjectRenderer";

export type FurnishedChamberSummary = Readonly<{
  kitId: "furnish-chamber-kit";
  targetId: string;
  architecturalPieceCount: number;
  propCount: number;
  textureCount: number;
  meshObjectCount: number;
  lightCount: number;
  masonryReliefPatchCount: number;
  masonryReliefBrickCount: number;
  collapsedCeilingPartCount: number;
  collapsedCeilingFractureCount: number;
  collapsedCeilingEdgeFragmentCount: number;
  collapseRubbleClusterCount: number;
  industrialShelvingObjectCount: number;
  industrialShelvingPartCount: number;
  industrialShelvingStoredPartCount: number;
  industrialShelvingTriangleCount: number;
  ceilingMaterialSurfaceCount: number;
  ceilingMaterialTextureCount: number;
  ceilingMaterialRelief: number;
  standingWaterPatchCount: number;
  wetGroundPatchCount: number;
  waterSurfaceCount: number;
  brokenReflectionLayerCount: number;
}>;

export type FurnishedChamberLayer = Group &
  Readonly<{
    summary: FurnishedChamberSummary;
    update: (elapsedMs: number) => void;
    dispose: () => void;
  }>;

type SurfaceMaterialProfile = Readonly<{
  color: number;
  emissive: number;
  emissiveIntensity: number;
  metalness: number;
  roughness: number;
  opacity?: number;
  depthWrite?: boolean;
}>;

const surfaceMaterialProfiles: Readonly<Record<string, SurfaceMaterialProfile>> =
  Object.freeze({
    "aged-concrete": {
      color: 0x353e3a,
      emissive: 0x101710,
      emissiveIntensity: 0.08,
      metalness: 0.02,
      roughness: 0.9,
    },
    "ceiling-concrete": {
      color: 0x465049,
      emissive: 0x152219,
      emissiveIntensity: 0.14,
      metalness: 0.01,
      roughness: 0.92,
    },
    "broken-brick": {
      color: 0x49352d,
      emissive: 0x180a06,
      emissiveIntensity: 0.09,
      metalness: 0.01,
      roughness: 0.93,
    },
    "dark-metal": {
      color: 0x30271f,
      emissive: 0x0d0805,
      emissiveIntensity: 0.06,
      metalness: 0.36,
      roughness: 0.78,
    },
    "standing-water": {
      color: 0x263a36,
      emissive: 0x07110e,
      emissiveIntensity: 0.08,
      metalness: 0.1,
      roughness: 0.12,
      opacity: 0.72,
      depthWrite: false,
    },
    "wet-ground": {
      color: 0x2d3832,
      emissive: 0x08100d,
      emissiveIntensity: 0.06,
      metalness: 0.05,
      roughness: 0.28,
      opacity: 0.58,
      depthWrite: false,
    },
    "route-stone": {
      color: 0x5b574d,
      emissive: 0x10110f,
      emissiveIntensity: 0.06,
      metalness: 0.02,
      roughness: 0.82,
    },
    "cold-sky": {
      color: 0x35483f,
      emissive: 0x14281d,
      emissiveIntensity: 0.5,
      metalness: 0,
      roughness: 1,
    },
  });

const terrainBoundSurfaceRoles = new Set<
  FurnishedChamberSurfaceDescriptor["role"]
>(["route-paving", "standing-water", "wet-ground"]);

const terrainBoundPropKinds = new Set<ScenePropKind>([
  "grass-clump",
  "root-strip",
]);

const terrainClearanceForSurface = (
  descriptor: FurnishedChamberSurfaceDescriptor,
): number =>
  descriptor.role === "route-paving"
    ? descriptor.size.y * 0.5 + 0.012
    : descriptor.position.y;

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

const createCeilingSurfaceTexture = (
  seed: string,
  repeatX: number,
  repeatY: number,
): DataTexture => {
  const size = 128;
  const coarseSize = 16;
  const random = createRandom(`${seed}:ceiling-surface`);
  const coarse = Array.from(
    { length: coarseSize * coarseSize },
    () => random(),
  );
  const data = new Uint8Array(size * size * 4);
  const sampleCoarse = (x: number, y: number): number => {
    const scaledX = x / size * coarseSize;
    const scaledY = y / size * coarseSize;
    const x0 = Math.floor(scaledX) % coarseSize;
    const y0 = Math.floor(scaledY) % coarseSize;
    const x1 = (x0 + 1) % coarseSize;
    const y1 = (y0 + 1) % coarseSize;
    const tx = scaledX - Math.floor(scaledX);
    const ty = scaledY - Math.floor(scaledY);
    const top = coarse[y0 * coarseSize + x0] * (1 - tx) +
      coarse[y0 * coarseSize + x1] * tx;
    const bottom = coarse[y1 * coarseSize + x0] * (1 - tx) +
      coarse[y1 * coarseSize + x1] * tx;
    return top * (1 - ty) + bottom * ty;
  };

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const offset = (y * size + x) * 4;
      const macro = sampleCoarse(x, y);
      const grain = random();
      const aggregate = grain > 0.965 ? (grain - 0.965) * 5.6 : 0;
      const damp = Math.max(0, 0.38 - macro) * 0.42;
      const mineral = Math.max(0, macro - 0.68) * 0.62;
      const value = Math.max(
        0.34,
        Math.min(
          1,
          0.7 + (macro - 0.5) * 0.38 + (grain - 0.5) * 0.12 +
            aggregate + mineral - damp,
        ),
      );
      data[offset] = Math.round(255 * Math.min(1, value * (1 + mineral * 0.08)));
      data[offset + 1] = Math.round(255 * Math.min(1, value * (1 + macro * 0.035)));
      data[offset + 2] = Math.round(255 * Math.max(0, value * (0.94 - damp * 0.08)));
      data[offset + 3] = 255;
    }
  }

  const texture = new DataTexture(
    data,
    size,
    size,
    RGBAFormat,
    UnsignedByteType,
  );
  texture.name = `${seed}-ceiling-surface`;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(Math.max(1, repeatX), Math.max(1, repeatY));
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
};

const createWaterRippleTexture = (
  seed: string,
  size: number,
  repeat: number,
): DataTexture => {
  const data = new Uint8Array(size * size * 4);
  const phase = (hashString(seed) % 10000) / 10000 * Math.PI * 2;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const u = x / Math.max(1, size - 1);
      const v = y / Math.max(1, size - 1);
      const broad = Math.sin((u * 4.2 + v * 1.7) * Math.PI * 2 + phase);
      const crossing = Math.sin((u * -2.4 + v * 5.1) * Math.PI * 2 - phase * 0.7);
      const ring = Math.sin(
        Math.hypot(u - 0.38, v - 0.62) * Math.PI * 18 - phase,
      );
      const value = Math.round(
        Math.max(0, Math.min(255, 128 + broad * 38 + crossing * 24 + ring * 15)),
      );
      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
      data[index + 3] = 255;
    }
  }

  const texture = new DataTexture(data, size, size, RGBAFormat, UnsignedByteType);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(repeat, repeat);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
};

type WaterBoundaryLobe = Readonly<{
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  phase: number;
}>;

const createWaterBoundaryLobes = (seed: string): readonly WaterBoundaryLobe[] => {
  const random = createRandom(`${seed}:water-boundary`);
  return Array.from({ length: 7 }, () => ({
    x: 0.12 + random() * 0.76,
    y: 0.14 + random() * 0.72,
    radiusX: 0.22 + random() * 0.3,
    radiusY: 0.18 + random() * 0.28,
    phase: random() * Math.PI * 2,
  }));
};

const sampleWaterBoundary = (
  lobes: readonly WaterBoundaryLobe[],
  u: number,
  v: number,
): number => {
  let field = 0;
  for (const lobe of lobes) {
    const dx = (u - lobe.x) / lobe.radiusX;
    const dy = (v - lobe.y) / lobe.radiusY;
    const angle = Math.atan2(dy, dx);
    const edgeWobble =
      Math.sin(angle * 3 + lobe.phase) * 0.11 +
      Math.sin(angle * 7 - lobe.phase * 0.6) * 0.045;
    const distance = Math.hypot(dx, dy) - edgeWobble;
    field = Math.max(field, Math.max(0, Math.min(1, (1 - distance) * 1.8)));
  }
  return field;
};

const createWaterGlintTexture = (
  seed: string,
  boundarySeed: string,
  size = 128,
  broadness = 1,
): DataTexture => {
  const random = createRandom(`${seed}:water-glint`);
  const data = new Uint8Array(size * size * 4);
  const boundaryLobes = createWaterBoundaryLobes(boundarySeed);
  const fragments = Array.from({ length: 5 }, () => ({
    x: 0.1 + random() * 0.8,
    y: 0.12 + random() * 0.76,
    radiusX: 0.14 + random() * 0.28,
    radiusY: (0.055 + random() * 0.085) * broadness,
    bend: (random() - 0.5) * 0.14,
  }));

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const u = x / Math.max(1, size - 1);
      const v = y / Math.max(1, size - 1);
      let field = 0;
      for (const fragment of fragments) {
        const curve = fragment.bend * Math.sin((u - fragment.x) * Math.PI * 2);
        const dx = (u - fragment.x) / fragment.radiusX;
        const dy = (v - fragment.y - curve) / fragment.radiusY;
        const radial = Math.max(0, Math.min(1, 1 - Math.hypot(dx, dy)));
        const softened = radial * radial * (3 - 2 * radial);
        field = Math.max(field, softened);
      }
      field *= Math.min(1, sampleWaterBoundary(boundaryLobes, u, v) * 1.16);
      const grain = 0.86 + random() * 0.14;
      const value = Math.round(field * grain * 255);
      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
      data[index + 3] = 255;
    }
  }

  const texture = new DataTexture(data, size, size, RGBAFormat, UnsignedByteType);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
};

const createWaterBoundaryTexture = (seed: string, size = 128): DataTexture => {
  const random = createRandom(`${seed}:water-boundary-grain`);
  const data = new Uint8Array(size * size * 4);
  const lobes = createWaterBoundaryLobes(seed);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const u = x / Math.max(1, size - 1);
      const v = y / Math.max(1, size - 1);
      const field = sampleWaterBoundary(lobes, u, v);

      const grain = 0.9 + random() * 0.1;
      const value = Math.round(Math.max(0, Math.min(1, field * grain)) * 255);
      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
      data[index + 3] = 255;
    }
  }

  const texture = new DataTexture(data, size, size, RGBAFormat, UnsignedByteType);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
};

const disposeObject = (object: Object3D): void => {
  const disposedMaterials = new Set<Material>();
  object.traverse((child) => {
    const mesh = child as Mesh & {
      geometry?: { dispose: () => void };
      material?: Material | Material[];
    };
    mesh.geometry?.dispose?.();
    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : mesh.material
        ? [mesh.material]
        : [];
    for (const material of materials) {
      if (!disposedMaterials.has(material)) {
        disposedMaterials.add(material);
        material.dispose();
      }
    }
  });
};

const createSurfaceMaterial = (
  descriptor: FurnishedChamberSurfaceDescriptor,
  preset: HorrorCorridorPreset,
): MeshStandardMaterial => {
  const profile =
    surfaceMaterialProfiles[descriptor.materialFamily] ??
    surfaceMaterialProfiles["aged-concrete"];
  const waterRippleTexture =
    descriptor.role === "standing-water" || descriptor.role === "wet-ground"
    ? createWaterRippleTexture(
        descriptor.id,
        preset.waterSurface.rippleTextureSize,
        preset.waterSurface.rippleScale *
          (descriptor.role === "standing-water" ? 1 : 1.4),
      )
    : null;
  const waterBoundaryTexture =
    descriptor.role === "standing-water" || descriptor.role === "wet-ground"
      ? createWaterBoundaryTexture(descriptor.id)
      : null;
  const materialParameters = {
    color: profile.color,
    emissive: profile.emissive,
    emissiveIntensity: profile.emissiveIntensity,
    metalness: profile.metalness,
    roughness: profile.roughness,
    opacity: profile.opacity ?? 1,
    transparent: (profile.opacity ?? 1) < 1,
    depthWrite: profile.depthWrite ?? true,
    side: descriptor.shape === "plane" ? DoubleSide : FrontSide,
    alphaMap: waterBoundaryTexture,
    alphaTest: waterBoundaryTexture ? 0.08 : 0,
    bumpMap: waterRippleTexture,
    bumpScale: waterRippleTexture
      ? preset.waterSurface.rippleStrength *
        (descriptor.role === "standing-water" ? 1 : 0.28)
      : 0,
    dithering: waterRippleTexture !== null,
    polygonOffset: descriptor.shape === "plane",
    polygonOffsetFactor: descriptor.shape === "plane" ? -3 : 0,
    polygonOffsetUnits: descriptor.shape === "plane" ? -3 : 0,
  };
  const material: MeshStandardMaterial = waterRippleTexture
    ? new MeshPhysicalMaterial({
        ...materialParameters,
        clearcoat: descriptor.role === "standing-water" ? 1 : 0.58,
        clearcoatRoughness:
          descriptor.role === "standing-water" ? 0.08 : 0.2,
        ior: 1.333,
        specularIntensity: descriptor.role === "standing-water" ? 1 : 0.45,
      })
    : new MeshStandardMaterial(materialParameters);
  if (descriptor.materialFamily === "ceiling-concrete") {
    const ceilingTexture = createCeilingSurfaceTexture(
      descriptor.id,
      descriptor.size.x * 0.52,
      Math.max(descriptor.size.x, descriptor.size.z) * 0.48,
    );
    material.map = ceilingTexture;
    material.bumpMap = ceilingTexture;
    material.bumpScale =
      preset.chamberFurnishing.ceilingSurface.surfaceRelief * 0.2;
    material.roughnessMap = ceilingTexture;
    material.userData.generatedCeilingSurfaceTexture = ceilingTexture;
    material.needsUpdate = true;
  }
  if (waterRippleTexture) {
    if (descriptor.role === "standing-water") {
      material.color.setHex(preset.waterSurface.palette[0]);
      material.emissive.setHex(preset.waterSurface.palette[1]);
    } else {
      material.color
        .setHex(profile.color)
        .lerp(new Color(preset.waterSurface.palette[0]), 0.56);
      material.emissive
        .setHex(profile.emissive)
        .lerp(new Color(preset.waterSurface.palette[1]), 0.28);
    }
    material.emissiveIntensity =
      descriptor.role === "standing-water" ? 0.025 : 0.01;
    material.opacity =
      descriptor.role === "standing-water"
        ? Math.min(0.84, preset.waterSurface.opacityRange[1] + 0.14)
        : Math.min(0.22, preset.waterSurface.opacityRange[0] * 0.65);
    material.roughness =
      descriptor.role === "standing-water"
        ? preset.waterSurface.roughnessRange[0]
        : Math.max(0.36, preset.waterSurface.roughnessRange[1]);
    material.metalness = 0.02;
    material.envMapIntensity = preset.waterSurface.reflectionStrength;
    material.userData.generatedWaterRippleTexture = waterRippleTexture;
    material.userData.waterSurfaceRole = descriptor.role;
  }
  if (waterBoundaryTexture) {
    material.userData.generatedWaterBoundaryTexture = waterBoundaryTexture;
  }
  if (descriptor.materialFamily === "broken-brick") {
    applyPropShader(
      material,
      {
        id: descriptor.id,
        kind: "building-facade",
        position: descriptor.position,
        rotationY: descriptor.rotation.y,
        scale: descriptor.size,
        surface: descriptor.role === "route-pedestal"
          ? "anomaly"
          : descriptor.role === "route-paving"
            ? "floor"
            : "wall",
        materialFamily: "broken-brick",
        tags: descriptor.tags,
      },
      preset,
      profile.color,
    );
  } else if (
    descriptor.materialFamily === "aged-concrete" ||
    descriptor.materialFamily === "route-stone"
  ) {
    applyPropShader(
      material,
      {
        id: descriptor.id,
        kind: "weathered-surface",
        position: descriptor.position,
        rotationY: descriptor.rotation.y,
        scale: descriptor.size,
        surface: descriptor.role === "route-pedestal"
          ? "anomaly"
          : descriptor.role === "route-paving"
            ? "floor"
            : "wall",
        materialFamily: "damp-concrete",
        tags: descriptor.tags,
      },
      preset,
      profile.color,
    );
  } else if (descriptor.materialFamily === "ceiling-concrete") {
    applyTerrainShader(
      material,
      preset.terrainShader,
      "ceiling",
      null,
      preset.chamberFurnishing.ceilingSurface,
    );
  } else if (descriptor.materialFamily === "dark-metal") {
    applyTerrainShader(material, preset.terrainShader, "trim");
  }
  return material;
};

const isMasonryReliefSurface = (
  descriptor: FurnishedChamberSurfaceDescriptor,
): boolean =>
  descriptor.materialFamily === "broken-brick" &&
  (descriptor.role === "boundary" ||
    descriptor.role === "masonry-detail");

const createMasonryReliefRenderable = (
  descriptor: FurnishedChamberSurfaceDescriptor,
  preset: HorrorCorridorPreset,
): Readonly<{
  object: Object3D;
  materials: readonly Material[];
  detailCount: number;
}> => {
  const group = new Group();
  const backingMaterial = new MeshStandardMaterial({
    color: 0x171814,
    emissive: 0x070706,
    emissiveIntensity: 0.025,
    metalness: 0,
    roughness: 1,
  });
  const brickMaterial = createSurfaceMaterial(descriptor, preset);
  brickMaterial.vertexColors = true;
  const backing = new Mesh(
    new BoxGeometry(descriptor.size.x, descriptor.size.y, descriptor.size.z),
    backingMaterial,
  );
  backing.name = `${descriptor.id}-mortar-backing`;
  backing.userData.masonryReliefPart = "mortar-backing";
  group.add(backing);

  const random = createRandom(`${descriptor.id}:masonry-relief`);
  const courseStep = Math.min(0.245, Math.max(0.19, descriptor.size.y / 14));
  const courseCount = Math.max(2, Math.floor(descriptor.size.y / courseStep));
  const brickStep = Math.min(0.49, Math.max(0.34, descriptor.size.x / 8));
  const nominalColumnCount = Math.max(
    3,
    Math.ceil(descriptor.size.x / brickStep),
  );
  const brickWidth = (descriptor.size.x / nominalColumnCount) * 0.88;
  const brickHeight = (descriptor.size.y / courseCount) * 0.78;
  const brickDepth = Math.max(0.085, Math.min(0.18, descriptor.size.z * 0.72));
  const isRightFacing = descriptor.tags.some(
    (tag) => tag === "right-boundary" || tag === "right-pier",
  );
  const facingSign = isRightFacing ? -1 : 1;
  const instances: Array<Readonly<{
    x: number;
    y: number;
    z: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    width: number;
    height: number;
    depth: number;
  }>> = [];

  for (let course = 0; course < courseCount; course += 1) {
    const stagger = course % 2 === 0 ? 0 : brickWidth * 0.5;
    const localY =
      -descriptor.size.y * 0.5 +
      (course + 0.5) * (descriptor.size.y / courseCount);
    const topDamage = course / Math.max(1, courseCount - 1);

    for (
      let column = -1;
      column <= nominalColumnCount;
      column += 1
    ) {
      const localX =
        -descriptor.size.x * 0.5 +
        (column + 0.5) * (descriptor.size.x / nominalColumnCount) +
        stagger;
      if (Math.abs(localX) > descriptor.size.x * 0.5 - brickWidth * 0.28) {
        continue;
      }

      const edgeDistance =
        1 - Math.abs(localX) / Math.max(0.001, descriptor.size.x * 0.5);
      const omissionChance =
        0.035 +
        topDamage * topDamage * 0.2 +
        (edgeDistance < 0.18 ? 0.18 : 0);
      if (random() < omissionChance) continue;

      const widthVariation = 0.83 + random() * 0.2;
      const heightVariation = 0.9 + random() * 0.12;
      const depthVariation = 0.74 + random() * 0.42;
      instances.push({
        x: localX + (random() - 0.5) * 0.035,
        y: localY + (random() - 0.5) * 0.025,
        z:
          facingSign *
          (descriptor.size.z * 0.5 + brickDepth * 0.34 + random() * 0.045),
        rotationX: (random() - 0.5) * 0.025,
        rotationY: (random() - 0.5) * 0.045,
        rotationZ: (random() - 0.5) * (0.035 + topDamage * 0.065),
        width: brickWidth * widthVariation,
        height: brickHeight * heightVariation,
        depth: brickDepth * depthVariation,
      });
    }
  }

  const brickGeometry = new BoxGeometry(1, 1, 1);
  const bricks = new InstancedMesh(
    brickGeometry,
    brickMaterial,
    Math.max(1, instances.length),
  );
  const transform = new Object3D();
  const brickPalette = [0xf2c8aa, 0xd9aa90, 0xc18e78, 0xffdfba] as const;
  instances.forEach((instance, index) => {
    transform.position.set(instance.x, instance.y, instance.z);
    transform.rotation.set(
      instance.rotationX,
      instance.rotationY,
      instance.rotationZ,
    );
    transform.scale.set(instance.width, instance.height, instance.depth);
    transform.updateMatrix();
    bricks.setMatrixAt(index, transform.matrix);
    const tint = new Color(brickPalette[index % brickPalette.length]);
    tint.multiplyScalar(0.86 + ((index * 17) % 11) * 0.012);
    bricks.setColorAt(index, tint);
  });
  bricks.count = instances.length;
  bricks.instanceMatrix.needsUpdate = true;
  if (bricks.instanceColor) bricks.instanceColor.needsUpdate = true;
  bricks.name = `${descriptor.id}-brick-relief`;
  bricks.userData.masonryReliefPart = "staggered-bricks";
  bricks.userData.brickCount = instances.length;
  group.add(bricks);

  group.name = descriptor.id;
  group.position.set(
    descriptor.position.x,
    descriptor.position.y,
    descriptor.position.z,
  );
  group.rotation.set(
    descriptor.rotation.x,
    descriptor.rotation.y,
    descriptor.rotation.z,
  );
  group.userData.chamberSurfaceRole = descriptor.role;
  group.userData.materialFamily = descriptor.materialFamily;
  group.userData.tags = descriptor.tags;
  group.userData.masonryReliefBrickCount = instances.length;

  return {
    object: group,
    materials: [backingMaterial, brickMaterial],
    detailCount: instances.length,
  };
};

const createSurfaceRenderable = (
  descriptor: FurnishedChamberSurfaceDescriptor,
  preset: HorrorCorridorPreset,
): Readonly<{
  object: Object3D;
  materials: readonly Material[];
  waterMaterial?: MeshStandardMaterial;
  detailCount?: number;
  reflectionLayerCount?: number;
}> => {
  if (isMasonryReliefSurface(descriptor)) {
    return createMasonryReliefRenderable(descriptor, preset);
  }

  const geometry = descriptor.shape === "box"
    ? new BoxGeometry(descriptor.size.x, descriptor.size.y, descriptor.size.z)
    : new PlaneGeometry(descriptor.size.x, descriptor.size.z);
  const material = createSurfaceMaterial(descriptor, preset);
  const hasBrokenReflection =
    descriptor.role === "standing-water" || descriptor.role === "wet-ground";
  const object = hasBrokenReflection ? new Group() : new Mesh(geometry, material);
  object.name = descriptor.id;
  object.position.set(
    descriptor.position.x,
    descriptor.position.y,
    descriptor.position.z,
  );
  object.rotation.set(
    descriptor.rotation.x,
    descriptor.rotation.y,
    descriptor.rotation.z,
  );
  object.userData.chamberSurfaceRole = descriptor.role;
  object.userData.materialFamily = descriptor.materialFamily;
  object.userData.tags = descriptor.tags;

  if (object instanceof Group) {
    const water = new Mesh(geometry, material);
    water.name = `${descriptor.id}-body`;
    water.userData.chamberSurfaceRole = descriptor.role;
    object.add(water);

    const glintMaterials: Material[] = [];
    const reflectionLayerCount = 1;
    for (let index = 0; index < reflectionLayerCount; index += 1) {
      const glintTexture = createWaterGlintTexture(
        `${descriptor.id}:reflection-layer:${index}`,
        descriptor.id,
        preset.waterSurface.rippleTextureSize,
        descriptor.role === "standing-water" ? 1.2 : 1.9,
      );
      const isWarmReflection = descriptor.position.z < 0;
      const reflectionColor = new Color(
        isWarmReflection
          ? preset.waterSurface.warmReflectionColor
          : preset.waterSurface.coldReflectionColor,
      );
      const baseOpacity = descriptor.role === "standing-water"
        ? isWarmReflection
          ? 0.08
          : 0.05
        : isWarmReflection
          ? 0.016
          : 0.012;
      const glintMaterial = new MeshBasicMaterial({
        color: reflectionColor,
        alphaMap: glintTexture,
        alphaTest: 0,
        transparent: true,
        opacity: Math.min(
          0.22,
          baseOpacity * preset.waterSurface.reflectionStrength,
        ),
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -6 - index,
        polygonOffsetUnits: -6 - index,
        toneMapped: true,
      });
      glintMaterial.userData.generatedWaterGlintTexture = glintTexture;
      const glint = new Mesh(
        new PlaneGeometry(
          descriptor.size.x *
            (descriptor.role === "standing-water" ? 0.9 - index * 0.08 : 0.72),
          descriptor.size.z *
            (descriptor.role === "standing-water" ? 0.78 - index * 0.07 : 0.58),
        ),
        glintMaterial,
      );
      glint.name = `${descriptor.id}-broken-reflection-${index}`;
      glint.position.set(0, 0, 0.004 + index * 0.0015);
      glint.rotation.z = descriptor.role === "standing-water"
        ? index === 0
          ? -0.035
          : 0.04
        : 0.02;
      glint.userData.reflectionTone = isWarmReflection ? "warm" : "cold";
      glint.userData.waterSurfaceRole = descriptor.role;
      object.add(glint);
      glintMaterials.push(glintMaterial);
    }

    return {
      object,
      materials: [material, ...glintMaterials],
      waterMaterial: material,
      reflectionLayerCount,
    };
  }

  return {
    object,
    materials: [material],
    waterMaterial: material.bumpMap ? material : undefined,
  };
};

const toScenePropDescriptor = (
  descriptor: ReturnType<typeof createFurnishedChamberManifest>["props"][number],
): ScenePropDescriptor => ({
  ...descriptor,
  kind: descriptor.kind as ScenePropKind,
});

const toSceneTextureDescriptor = (
  descriptor: ReturnType<typeof createFurnishedChamberManifest>["textures"][number],
): SceneTextureDescriptor => ({
  ...descriptor,
  kind: descriptor.kind as SceneTextureKind,
});

export const buildFurnishedChamberLayer = (input: Readonly<{
  maze: MazeResult;
  preset: HorrorCorridorPreset;
  terrain: TerrainSurface;
}>): FurnishedChamberLayer => {
  const manifest = createFurnishedChamberManifest(
    input.preset.chamberFurnishing,
  );
  const group = new Group();
  group.name = "corridor-furnished-chamber";
  group.userData.domainKitId = manifest.kitId;
  group.userData.visualTarget =
    `docs/visual-targets/${manifest.targetId}.png`;

  const startX =
    input.maze.start.x * input.preset.maze.cellSize +
    input.preset.maze.cellSize / 2;
  const startZ =
    input.maze.start.y * input.preset.maze.cellSize +
    input.preset.maze.cellSize / 2;
  group.position.set(
    startX,
    input.terrain.floorYAt(startX, startZ),
    startZ,
  );

  const materials: Material[] = [];
  const pulseTargets: Mesh[] = [];
  const texturePulseTargets: Mesh[] = [];
  const relicMeshes: Mesh[] = [];
  const animatedLights: PointLight[] = [];
  const waterMaterials: MeshStandardMaterial[] = [];
  let masonryReliefBrickCount = 0;
  let brokenReflectionLayerCount = 0;
  let collapsedCeilingPartCount = 0;
  let collapsedCeilingFractureCount = 0;
  let collapsedCeilingEdgeFragmentCount = 0;
  let industrialShelvingObjectCount = 0;
  let industrialShelvingPartCount = 0;
  let industrialShelvingStoredPartCount = 0;
  let industrialShelvingTriangleCount = 0;

  if (manifest.enabled) {
    for (const descriptor of manifest.surfaces) {
      const renderable = createSurfaceRenderable(descriptor, input.preset);
      if (terrainBoundSurfaceRoles.has(descriptor.role)) {
        renderable.object.position.y =
          input.terrain.floorYAt(
            startX + descriptor.position.x,
            startZ + descriptor.position.z,
            terrainClearanceForSurface(descriptor),
          ) - group.position.y;
        renderable.object.userData.terrainConformed = true;
      }
      materials.push(...renderable.materials);
      masonryReliefBrickCount += renderable.detailCount ?? 0;
      brokenReflectionLayerCount += renderable.reflectionLayerCount ?? 0;
      if (renderable.waterMaterial) {
        waterMaterials.push(renderable.waterMaterial);
      }
      group.add(renderable.object);
    }
  }

  const addProp = (
    descriptor: ScenePropDescriptor,
  ): ScenePropRenderable => {
    const renderable = createScenePropRenderable(descriptor, input.preset);
    if (
      descriptor.surface === "floor" &&
      terrainBoundPropKinds.has(descriptor.kind)
    ) {
      renderable.object.position.y =
        input.terrain.floorYAt(
          startX + descriptor.position.x,
          startZ + descriptor.position.z,
          descriptor.position.y,
        ) - group.position.y;
      renderable.object.userData.terrainConformed = true;
    }
    materials.push(...renderable.materials);
    pulseTargets.push(...renderable.pulseTargets);
    group.add(renderable.object);
    return renderable;
  };

  if (manifest.enabled) {
    for (const descriptor of manifest.props) {
      addProp(toScenePropDescriptor(descriptor));
    }
    for (const descriptor of manifest.textures) {
      const renderable = createSceneTextureRenderable(
        toSceneTextureDescriptor(descriptor),
        input.preset,
      );
      materials.push(...renderable.materials);
      texturePulseTargets.push(...renderable.pulseTargets);
      group.add(renderable.object);
    }
  }

  const meshObjectCatalog = new Map(
    createMeshObjectDescriptorCatalog().map((descriptor) => [
      descriptor.kitId,
      descriptor,
    ]),
  );

  if (manifest.enabled) {
    for (const placement of manifest.meshObjects) {
      const descriptor = meshObjectCatalog.get(placement.objectKitId);
      if (!descriptor) {
        throw new Error(
          `Furnished chamber cannot resolve object kit ${placement.objectKitId}.`,
        );
      }
      const renderable = createWoundMeshObjectRenderable(descriptor);
      if (placement.objectKitId === "collapsed-ceiling-object-kit") {
        collapsedCeilingPartCount += descriptor.parts.length;
        collapsedCeilingFractureCount += descriptor.parts.filter((part) =>
          part.tags.includes("fracture-seam"),
        ).length;
        collapsedCeilingEdgeFragmentCount += descriptor.parts.filter((part) =>
          part.tags.includes("edge-fragment"),
        ).length;
      }
      if (placement.objectKitId === "industrial-shelving-object-kit") {
        industrialShelvingObjectCount += 1;
        industrialShelvingPartCount += descriptor.parts.length;
        industrialShelvingStoredPartCount += descriptor.parts.filter((part) =>
          part.tags.includes("stored-object"),
        ).length;
        industrialShelvingTriangleCount += descriptor.parts.reduce(
          (count, part) => count + part.indices.length / 3,
          0,
        );
      }
      renderable.object.name = placement.id;
      renderable.object.position.set(
        placement.position.x,
        placement.position.y,
        placement.position.z,
      );
      renderable.object.rotation.set(
        placement.rotation.x,
        placement.rotation.y,
        placement.rotation.z,
      );
      renderable.object.scale.set(
        placement.scale.x,
        placement.scale.y,
        placement.scale.z,
      );
      renderable.object.userData.tags = placement.tags;
      group.add(renderable.object);
      materials.push(...renderable.materials);
    }

    for (const descriptor of manifest.relics) {
      const material = new MeshBasicMaterial({
        color: descriptor.color,
        transparent: true,
        opacity: descriptor.opacity,
        toneMapped: false,
      });
      const relic = new Mesh(new OctahedronGeometry(1, 0), material);
      relic.name = descriptor.id;
      relic.position.set(
        descriptor.position.x,
        descriptor.position.y,
        descriptor.position.z,
      );
      relic.scale.set(
        descriptor.scale.x,
        descriptor.scale.y,
        descriptor.scale.z,
      );
      relic.rotation.z = 0.18;
      relic.userData.baseY = descriptor.position.y;
      relic.userData.floatDistance = descriptor.floatDistance;
      relic.userData.floatFrequency = descriptor.floatFrequency;
      relic.userData.spinSpeed = descriptor.spinSpeed;
      relic.userData.tags = descriptor.tags;
      group.add(relic);
      relicMeshes.push(relic);
      pulseTargets.push(relic);
      materials.push(material);
    }

    for (const descriptor of manifest.lights) {
      const light = new PointLight(
        descriptor.color,
        descriptor.intensity,
        descriptor.range,
        descriptor.decay,
      );
      light.name = descriptor.id;
      light.position.set(
        descriptor.position.x,
        descriptor.position.y,
        descriptor.position.z,
      );
      light.userData.role = descriptor.role;
      light.userData.baseIntensity = descriptor.intensity;
      light.userData.flickerAmount = descriptor.flickerAmount;
      light.userData.flickerFrequency = descriptor.flickerFrequency;
      group.add(light);
      animatedLights.push(light);
    }
  }

  const summary: FurnishedChamberSummary = Object.freeze({
    kitId: manifest.kitId,
    targetId: manifest.targetId,
    architecturalPieceCount: manifest.enabled ? manifest.surfaces.length : 0,
    propCount: manifest.enabled
      ? manifest.props.length + manifest.meshObjects.length + manifest.relics.length
      : 0,
    textureCount: manifest.enabled ? manifest.textures.length : 0,
    meshObjectCount: manifest.enabled ? manifest.meshObjects.length : 0,
    lightCount: manifest.enabled ? manifest.lights.length : 0,
    masonryReliefPatchCount: manifest.enabled
      ? manifest.surfaces.filter(isMasonryReliefSurface).length
      : 0,
    masonryReliefBrickCount: manifest.enabled ? masonryReliefBrickCount : 0,
    collapsedCeilingPartCount: manifest.enabled ? collapsedCeilingPartCount : 0,
    collapsedCeilingFractureCount: manifest.enabled
      ? collapsedCeilingFractureCount
      : 0,
    collapsedCeilingEdgeFragmentCount: manifest.enabled
      ? collapsedCeilingEdgeFragmentCount
      : 0,
    collapseRubbleClusterCount: manifest.enabled
      ? manifest.props.filter((prop) =>
          prop.tags.includes("collapse-settlement"),
        ).length
      : 0,
    industrialShelvingObjectCount: manifest.enabled
      ? industrialShelvingObjectCount
      : 0,
    industrialShelvingPartCount: manifest.enabled
      ? industrialShelvingPartCount
      : 0,
    industrialShelvingStoredPartCount: manifest.enabled
      ? industrialShelvingStoredPartCount
      : 0,
    industrialShelvingTriangleCount: manifest.enabled
      ? industrialShelvingTriangleCount
      : 0,
    ceilingMaterialSurfaceCount: manifest.enabled
      ? manifest.surfaces.filter((surface) => surface.role === "shelter").length
      : 0,
    ceilingMaterialTextureCount: manifest.enabled
      ? manifest.surfaces.filter(
          (surface) => surface.materialFamily === "ceiling-concrete",
        ).length
      : 0,
    ceilingMaterialRelief: manifest.enabled
      ? input.preset.chamberFurnishing.ceilingSurface.surfaceRelief
      : 0,
    standingWaterPatchCount: manifest.enabled
      ? manifest.surfaces.filter((surface) => surface.role === "standing-water")
          .length
      : 0,
    wetGroundPatchCount: manifest.enabled
      ? manifest.surfaces.filter((surface) => surface.role === "wet-ground").length
      : 0,
    waterSurfaceCount: manifest.enabled
      ? manifest.surfaces.filter(
          (surface) =>
            surface.role === "standing-water" || surface.role === "wet-ground",
        ).length
      : 0,
    brokenReflectionLayerCount: manifest.enabled
      ? brokenReflectionLayerCount
      : 0,
  });
  group.userData.furnishedChamberSummary = summary;

  return Object.assign(group, {
    summary,
    update(elapsedMs: number) {
      for (const light of animatedLights) {
        light.intensity =
          Number(light.userData.baseIntensity) +
          Math.sin(
            elapsedMs * Number(light.userData.flickerFrequency) +
              light.position.x,
          ) *
            Number(light.userData.flickerAmount);
      }

      for (const relic of relicMeshes) {
        relic.rotation.y =
          elapsedMs * Number(relic.userData.spinSpeed);
        relic.position.y =
          Number(relic.userData.baseY) +
          Math.sin(
            elapsedMs * Number(relic.userData.floatFrequency),
          ) *
            Number(relic.userData.floatDistance);
        const routeLight = animatedLights.find(
          (light) => light.userData.role === "route-relic",
        );
        if (routeLight) routeLight.position.y = relic.position.y;
      }

      for (const target of pulseTargets) {
        const material = target.material;
        if (material instanceof MeshBasicMaterial) {
          material.opacity =
            0.72 +
            Math.sin(elapsedMs * 0.002 + target.position.x) * 0.1;
        }
      }
      for (const target of texturePulseTargets) {
        const material = target.material as MeshBasicMaterial;
        const baseOpacity = typeof material.userData.baseOpacity === "number"
          ? material.userData.baseOpacity
          : 0.18;
        material.opacity = Math.max(
          0.04,
          baseOpacity + Math.sin(elapsedMs * 0.002 + target.position.z) * 0.025,
        );
      }
      for (const material of waterMaterials) {
        if (!material.bumpMap) continue;
        const drift = elapsedMs * input.preset.waterSurface.driftSpeed;
        material.bumpMap.offset.set(drift, -drift * 0.72);
      }
    },
    dispose() {
      for (const material of materials) {
        const generatedAlphaTexture = material.userData
          .generatedAlphaTexture as { dispose: () => void } | undefined;
        const generatedProjectionAlphaTexture = material.userData
          .generatedProjectionAlphaTexture as { dispose: () => void } | undefined;
        const generatedWaterRippleTexture = material.userData
          .generatedWaterRippleTexture as { dispose: () => void } | undefined;
        const generatedWaterGlintTexture = material.userData
          .generatedWaterGlintTexture as { dispose: () => void } | undefined;
        const generatedWaterBoundaryTexture = material.userData
          .generatedWaterBoundaryTexture as { dispose: () => void } | undefined;
        const generatedCeilingSurfaceTexture = material.userData
          .generatedCeilingSurfaceTexture as { dispose: () => void } | undefined;
        generatedAlphaTexture?.dispose();
        generatedProjectionAlphaTexture?.dispose();
        generatedWaterRippleTexture?.dispose();
        generatedWaterGlintTexture?.dispose();
        generatedWaterBoundaryTexture?.dispose();
        generatedCeilingSurfaceTexture?.dispose();
      }
      disposeObject(group);
    },
  });
};
