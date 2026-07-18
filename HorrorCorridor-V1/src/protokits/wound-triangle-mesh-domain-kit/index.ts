import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type WoundMeshVector3 = Readonly<{
  x: number;
  y: number;
  z: number;
}>;

export type WoundMeshVector2 = Readonly<{
  u: number;
  v: number;
}>;

export type WoundMeshAxis = "x" | "y" | "z";

export type WoundMeshMaterialSlot = Readonly<{
  id: string;
  family: string;
  startIndex: number;
  indexCount: number;
}>;

export type WoundMeshPartDescriptor = Readonly<{
  id: string;
  label: string;
  positions: readonly number[];
  indices: readonly number[];
  normals: readonly number[];
  uvs: readonly number[];
  materialSlots: readonly WoundMeshMaterialSlot[];
  bounds: {
    min: WoundMeshVector3;
    max: WoundMeshVector3;
  };
  tags: readonly string[];
}>;

export type WoundMeshObjectDescriptor = Readonly<{
  id: string;
  kitId: string;
  propKind: string;
  triangleWinding: "outward-ccw";
  parts: readonly WoundMeshPartDescriptor[];
  sockets: readonly Readonly<{
    id: string;
    position: WoundMeshVector3;
    normal: WoundMeshVector3;
    tags: readonly string[];
  }>[];
  tags: readonly string[];
}>;

export type WoundTriangleMeshDomainKitConfig = Readonly<{
  enabled: boolean;
  winding: "outward-ccw";
  requiredAttributes: readonly ("positions" | "indices" | "normals" | "uvs" | "materialSlots")[];
  validation: {
    requireIndexedTriangles: boolean;
    requireBounds: boolean;
    maxPartsPerObject: number;
  };
}>;

export const woundTriangleMeshDomainKitConfig: WoundTriangleMeshDomainKitConfig = {
  enabled: true,
  winding: "outward-ccw",
  requiredAttributes: ["positions", "indices", "normals", "uvs", "materialSlots"],
  validation: {
    requireBounds: true,
    requireIndexedTriangles: true,
    maxPartsPerObject: 48,
  },
};

const vector = (x: number, y: number, z: number): WoundMeshVector3 => ({ x, y, z });

const computeBounds = (positions: readonly number[]) => {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let minZ = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  let maxZ = Number.NEGATIVE_INFINITY;

  for (let index = 0; index < positions.length; index += 3) {
    const x = positions[index] ?? 0;
    const y = positions[index + 1] ?? 0;
    const z = positions[index + 2] ?? 0;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }

  return {
    min: vector(minX, minY, minZ),
    max: vector(maxX, maxY, maxZ),
  };
};

const withFlatNormals = (
  positions: readonly number[],
  indices: readonly number[],
): readonly number[] => {
  const normals = Array.from({ length: positions.length }, () => 0);

  for (let index = 0; index < indices.length; index += 3) {
    const a = indices[index] * 3;
    const b = indices[index + 1] * 3;
    const c = indices[index + 2] * 3;
    const ax = positions[a];
    const ay = positions[a + 1];
    const az = positions[a + 2];
    const bx = positions[b];
    const by = positions[b + 1];
    const bz = positions[b + 2];
    const cx = positions[c];
    const cy = positions[c + 1];
    const cz = positions[c + 2];
    const abx = bx - ax;
    const aby = by - ay;
    const abz = bz - az;
    const acx = cx - ax;
    const acy = cy - ay;
    const acz = cz - az;
    const nx = aby * acz - abz * acy;
    const ny = abz * acx - abx * acz;
    const nz = abx * acy - aby * acx;
    const length = Math.hypot(nx, ny, nz) || 1;

    for (const offset of [a, b, c]) {
      normals[offset] += nx / length;
      normals[offset + 1] += ny / length;
      normals[offset + 2] += nz / length;
    }
  }

  for (let index = 0; index < normals.length; index += 3) {
    const length = Math.hypot(normals[index], normals[index + 1], normals[index + 2]) || 1;
    normals[index] /= length;
    normals[index + 1] /= length;
    normals[index + 2] /= length;
  }

  return normals;
};

const defaultUvs = (vertexCount: number): readonly number[] => {
  const uvs: number[] = [];
  for (let index = 0; index < vertexCount; index += 1) {
    uvs.push(index % 2, Math.floor(index / 2) % 2);
  }
  return uvs;
};

const createPart = (
  id: string,
  label: string,
  positions: readonly number[],
  indices: readonly number[],
  materialFamily: string,
  tags: readonly string[],
): WoundMeshPartDescriptor => ({
  id,
  label,
  positions,
  indices,
  normals: withFlatNormals(positions, indices),
  uvs: defaultUvs(positions.length / 3),
  materialSlots: [
    {
      id: `${id}-material`,
      family: materialFamily,
      startIndex: 0,
      indexCount: indices.length,
    },
  ],
  bounds: computeBounds(positions),
  tags,
});

export const createWoundBoxMeshPart = (
  id: string,
  label: string,
  size: WoundMeshVector3,
  center: WoundMeshVector3,
  materialFamily: string,
  tags: readonly string[] = [],
): WoundMeshPartDescriptor => {
  const x = size.x * 0.5;
  const y = size.y * 0.5;
  const z = size.z * 0.5;
  const positions = [
    center.x - x, center.y - y, center.z - z,
    center.x + x, center.y - y, center.z - z,
    center.x + x, center.y - y, center.z + z,
    center.x - x, center.y - y, center.z + z,
    center.x - x, center.y + y, center.z - z,
    center.x + x, center.y + y, center.z - z,
    center.x + x, center.y + y, center.z + z,
    center.x - x, center.y + y, center.z + z,
  ];
  const indices = [
    0, 2, 1, 0, 3, 2,
    4, 5, 6, 4, 6, 7,
    3, 7, 6, 3, 6, 2,
    0, 1, 5, 0, 5, 4,
    1, 2, 6, 1, 6, 5,
    0, 4, 7, 0, 7, 3,
  ];

  return createPart(id, label, positions, indices, materialFamily, ["wound-box", ...tags]);
};

export const createWoundTrapezoidMeshPart = (
  id: string,
  label: string,
  size: WoundMeshVector3,
  center: WoundMeshVector3,
  topScale: number,
  materialFamily: string,
  tags: readonly string[] = [],
): WoundMeshPartDescriptor => {
  const bottomX = size.x * 0.5;
  const bottomY = size.y * 0.5;
  const bottomZ = size.z * 0.5;
  const topX = bottomX * topScale;
  const topZ = bottomZ * topScale;
  const positions = [
    center.x - bottomX, center.y - bottomY, center.z - bottomZ,
    center.x + bottomX, center.y - bottomY, center.z - bottomZ,
    center.x + bottomX, center.y - bottomY, center.z + bottomZ,
    center.x - bottomX, center.y - bottomY, center.z + bottomZ,
    center.x - topX, center.y + bottomY, center.z - topZ,
    center.x + topX, center.y + bottomY, center.z - topZ,
    center.x + topX, center.y + bottomY, center.z + topZ,
    center.x - topX, center.y + bottomY, center.z + topZ,
  ];
  const indices = [
    0, 2, 1, 0, 3, 2,
    4, 5, 6, 4, 6, 7,
    3, 7, 6, 3, 6, 2,
    0, 1, 5, 0, 5, 4,
    1, 2, 6, 1, 6, 5,
    0, 4, 7, 0, 7, 3,
  ];

  return createPart(id, label, positions, indices, materialFamily, ["wound-trapezoid", ...tags]);
};

export const createWoundConvexSlabMeshPart = (
  id: string,
  label: string,
  topFace: readonly WoundMeshVector3[],
  thickness: number,
  materialFamily: string,
  tags: readonly string[] = [],
): WoundMeshPartDescriptor => {
  if (topFace.length < 3) {
    throw new Error(`Wound convex slab ${id} requires at least three top-face points.`);
  }
  if (!Number.isFinite(thickness) || thickness <= 0) {
    throw new Error(`Wound convex slab ${id} thickness must be positive.`);
  }

  const positions = [
    ...topFace.flatMap((point) => [point.x, point.y, point.z]),
    ...topFace.flatMap((point) => [point.x, point.y - thickness, point.z]),
  ];
  const count = topFace.length;
  const indices: number[] = [];

  // Top-face points are clockwise when viewed from above so the top normal is
  // +Y. The reversed lower fan faces the room below, and every side is closed.
  for (let index = 1; index < count - 1; index += 1) {
    indices.push(0, index, index + 1);
    indices.push(count, count + index + 1, count + index);
  }
  for (let index = 0; index < count; index += 1) {
    const next = (index + 1) % count;
    indices.push(index, count + next, next);
    indices.push(index, count + index, count + next);
  }

  return createPart(id, label, positions, indices, materialFamily, [
    "wound-convex-slab",
    ...tags,
  ]);
};

const cylinderDimensions = (
  size: WoundMeshVector3,
  axis: WoundMeshAxis,
) => {
  if (axis === "x") {
    return {
      halfLength: size.x * 0.5,
      radiusA: size.y * 0.5,
      radiusB: size.z * 0.5,
    };
  }
  if (axis === "z") {
    return {
      halfLength: size.z * 0.5,
      radiusA: size.x * 0.5,
      radiusB: size.y * 0.5,
    };
  }
  return {
    halfLength: size.y * 0.5,
    radiusA: size.x * 0.5,
    radiusB: size.z * 0.5,
  };
};

const cylinderPoint = (
  center: WoundMeshVector3,
  axis: WoundMeshAxis,
  axial: number,
  radialA: number,
  radialB: number,
): WoundMeshVector3 => {
  if (axis === "x") {
    return vector(
      center.x + axial,
      center.y - radialA,
      center.z + radialB,
    );
  }
  if (axis === "z") {
    return vector(
      center.x + radialA,
      center.y - radialB,
      center.z + axial,
    );
  }
  return vector(
    center.x + radialA,
    center.y + axial,
    center.z + radialB,
  );
};

export const createWoundCylinderMeshPart = (
  id: string,
  label: string,
  size: WoundMeshVector3,
  center: WoundMeshVector3,
  axis: WoundMeshAxis,
  radialSegments: number,
  materialFamily: string,
  tags: readonly string[] = [],
): WoundMeshPartDescriptor => {
  const segments = Math.max(6, Math.min(32, Math.floor(radialSegments)));
  const { halfLength, radiusA, radiusB } = cylinderDimensions(size, axis);
  const positions: number[] = [];
  const indices: number[] = [];
  const pushPoint = (point: WoundMeshVector3) => {
    positions.push(point.x, point.y, point.z);
  };

  const sideBottomStart = positions.length / 3;
  for (let index = 0; index < segments; index += 1) {
    const radians = (index / segments) * Math.PI * 2;
    pushPoint(
      cylinderPoint(
        center,
        axis,
        -halfLength,
        Math.cos(radians) * radiusA,
        Math.sin(radians) * radiusB,
      ),
    );
    pushPoint(
      cylinderPoint(
        center,
        axis,
        halfLength,
        Math.cos(radians) * radiusA,
        Math.sin(radians) * radiusB,
      ),
    );
  }

  const bottomCapStart = positions.length / 3;
  for (let index = 0; index < segments; index += 1) {
    const radians = (index / segments) * Math.PI * 2;
    pushPoint(
      cylinderPoint(
        center,
        axis,
        -halfLength,
        Math.cos(radians) * radiusA,
        Math.sin(radians) * radiusB,
      ),
    );
  }

  const topCapStart = positions.length / 3;
  for (let index = 0; index < segments; index += 1) {
    const radians = (index / segments) * Math.PI * 2;
    pushPoint(
      cylinderPoint(
        center,
        axis,
        halfLength,
        Math.cos(radians) * radiusA,
        Math.sin(radians) * radiusB,
      ),
    );
  }

  const bottomCenter = positions.length / 3;
  pushPoint(cylinderPoint(center, axis, -halfLength, 0, 0));
  const topCenter = positions.length / 3;
  pushPoint(cylinderPoint(center, axis, halfLength, 0, 0));

  for (let index = 0; index < segments; index += 1) {
    const next = (index + 1) % segments;
    const bottom = sideBottomStart + index * 2;
    const top = bottom + 1;
    const nextBottom = sideBottomStart + next * 2;
    const nextTop = nextBottom + 1;
    indices.push(bottom, nextTop, nextBottom, bottom, top, nextTop);
    indices.push(
      bottomCenter,
      bottomCapStart + index,
      bottomCapStart + next,
    );
    indices.push(
      topCenter,
      topCapStart + next,
      topCapStart + index,
    );
  }

  return createPart(id, label, positions, indices, materialFamily, [
    "wound-cylinder",
    `axis:${axis}`,
    ...tags,
  ]);
};

export const validateWoundMeshObjectDescriptor = (
  descriptor: WoundMeshObjectDescriptor,
): readonly string[] => {
  const failures: string[] = [];

  if (descriptor.triangleWinding !== "outward-ccw") {
    failures.push(`${descriptor.kitId}: winding is not outward-ccw`);
  }
  if (descriptor.parts.length === 0) {
    failures.push(`${descriptor.kitId}: no mesh parts generated`);
  }

  for (const part of descriptor.parts) {
    if (part.positions.length % 3 !== 0) {
      failures.push(`${descriptor.kitId}/${part.id}: positions are not vec3 aligned`);
    }
    if (part.normals.length !== part.positions.length) {
      failures.push(`${descriptor.kitId}/${part.id}: normals do not match positions`);
    }
    if (part.uvs.length !== (part.positions.length / 3) * 2) {
      failures.push(`${descriptor.kitId}/${part.id}: uvs do not match vertex count`);
    }
    if (part.indices.length % 3 !== 0) {
      failures.push(`${descriptor.kitId}/${part.id}: indices are not triangles`);
    }
    const vertexCount = part.positions.length / 3;
    for (const index of part.indices) {
      if (index < 0 || index >= vertexCount) {
        failures.push(`${descriptor.kitId}/${part.id}: index ${index} is out of bounds`);
        break;
      }
    }
    if (part.materialSlots.length === 0) {
      failures.push(`${descriptor.kitId}/${part.id}: missing material slot`);
    }
  }

  return failures;
};

export const createWoundTriangleMeshDomainKit = (
  config: WoundTriangleMeshDomainKitConfig = woundTriangleMeshDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "wound-triangle-mesh",
    services: ["indexed-triangle-descriptors", "mesh-descriptor-validation", "buffer-geometry-contracts"],
    requires: [createHorrorDomainToken("prop-material-fidelity")],
    resources: {
      WoundMeshDescriptorContract: "woundTriangleMesh.descriptorContract",
      WoundMeshValidation: "woundTriangleMesh.validation",
    },
    metadata: {
      purpose: "Generic mesh-generation domain kit for explicit indexed, outward-wound triangle object descriptors.",
      config,
    },
  });
