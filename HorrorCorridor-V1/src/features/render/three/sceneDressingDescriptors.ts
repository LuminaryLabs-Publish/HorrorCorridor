import type { MazeResult } from "@/features/maze/domain/mazeTypes";
import type { ConcretePavingState } from "@/features/corridor/domain/concretePaving";
import type { CeilingCollapseState } from "@/features/corridor/domain/ceilingCollapse";
import type { HorrorCorridorPreset } from "@/protokits";

import { createTerrainSurface, type TerrainSurface } from "./terrainSurface";

type SurfaceKind = "wall" | "floor" | "ceiling" | "anomaly";
export type ScenePropKind =
  | "weathered-surface"
  | "wall-box"
  | "pipe"
  | "floor-pipe"
  | "cable"
  | "vent"
  | "ceiling-duct"
  | "building-facade"
  | "utility-crate-stack"
  | "brick-rubble-pile"
  | "loose-floor-slab"
  | "ceiling-service-strip"
  | "debris"
  | "grass-clump"
  | "root-strip"
  | "hanging-vine"
  | "rubble"
  | "rock-cluster"
  | "table"
  | "crate"
  | "lamp-post"
  | "pedestal-dressing";
export type SceneTextureKind =
  | "grime"
  | "stain"
  | "wear"
  | "mud"
  | "moss"
  | "rust"
  | "crack"
  | "brick-course"
  | "damp-mud"
  | "rust-streak"
  | "moss-grime"
  | "wet-concrete"
  | "anomaly-residue";
export type SceneLightKind = "fill" | "accent" | "prop" | "anomaly";

export type SceneDressingVector = Readonly<{
  x: number;
  y: number;
  z: number;
}>;

export type ScenePropDescriptor = Readonly<{
  id: string;
  kind: ScenePropKind;
  position: SceneDressingVector;
  rotationY: number;
  scale: SceneDressingVector;
  surface: SurfaceKind;
  materialFamily: string;
  tags: readonly string[];
}>;

export type SceneTextureDescriptor = Readonly<{
  id: string;
  kind: SceneTextureKind;
  position: SceneDressingVector;
  rotation: SceneDressingVector;
  scale: SceneDressingVector;
  surface: SurfaceKind;
  color: number;
  opacity: number;
}>;

export type SceneLightDescriptor = Readonly<{
  id: string;
  kind: SceneLightKind;
  position: SceneDressingVector;
  color: number;
  intensity: number;
  range: number;
  decay: number;
}>;

export type SceneWalkthroughCheckpoint = Readonly<{
  id: string;
  label: string;
  position: SceneDressingVector;
}>;

export type SceneDressingSummary = Readonly<{
  propCount: number;
  textureCount: number;
  lightCount: number;
  walkthroughCheckpointCount: number;
  anchorCount: number;
  socketCount: number;
  layoutCount: number;
  bundleCount: number;
  concretePaving?: ConcretePavingState;
  ceilingCollapse?: CeilingCollapseState;
  validation: {
    meetsPropThreshold: boolean;
    meetsTextureThreshold: boolean;
    meetsLightThreshold: boolean;
    readableSpawnView: boolean;
  };
  referenceRoom?: Readonly<{
    kitId?: string;
    targetId: string;
    architecturalPieceCount: number;
    propCount: number;
    textureCount?: number;
    meshObjectCount: number;
    lightCount: number;
    masonryReliefPatchCount?: number;
    masonryReliefBrickCount?: number;
    collapsedCeilingPartCount?: number;
    collapsedCeilingFractureCount?: number;
    collapsedCeilingEdgeFragmentCount?: number;
    collapseRubbleClusterCount?: number;
    industrialShelvingObjectCount?: number;
    industrialShelvingPartCount?: number;
    industrialShelvingStoredPartCount?: number;
    industrialShelvingTriangleCount?: number;
    standingWaterPatchCount?: number;
    wetGroundPatchCount?: number;
    waterSurfaceCount?: number;
    brokenReflectionLayerCount?: number;
    streamedBuildingNumber?: number;
    streamedOrigin?: SceneDressingVector;
    entryYaw?: number;
  }>;
}>;

export type SceneDressingManifest = Readonly<{
  props: readonly ScenePropDescriptor[];
  textures: readonly SceneTextureDescriptor[];
  lights: readonly SceneLightDescriptor[];
  walkthrough: readonly SceneWalkthroughCheckpoint[];
  summary: SceneDressingSummary;
}>;

type WalkableCell = Readonly<{
  x: number;
  y: number;
  value: number;
}>;

type SurfaceHit = Readonly<{
  cell: WalkableCell;
  surface: SurfaceKind;
  position: SceneDressingVector;
  normal: SceneDressingVector;
  rotationY: number;
  openness: number;
}>;

type SurfaceAnchorKind = "wall-band" | "floor-pocket" | "ceiling-hang" | "facade-base";

type SurfaceAnchor = Readonly<{
  id: string;
  kind: SurfaceAnchorKind;
  surface: SurfaceKind;
  position: SceneDressingVector;
  normal: SceneDressingVector;
  rotationY: number;
  openness: number;
  score: number;
  triangle: readonly [SceneDressingVector, SceneDressingVector, SceneDressingVector];
  tags: readonly string[];
}>;

type SocketKind = "wall-utility" | "floor-cluster" | "ceiling-run" | "landmark";

type SocketNode = Readonly<{
  id: string;
  kind: SocketKind;
  position: SceneDressingVector;
  normal: SceneDressingVector;
  rotationY: number;
  score: number;
  anchorId: string;
  neighbors: readonly string[];
}>;

type LayoutKind = "utility-bay" | "collapse-cluster" | "ceiling-service-run" | "spawn-landmark";

type FootprintLayout = Readonly<{
  id: string;
  kind: LayoutKind;
  socketId: string;
  position: SceneDressingVector;
  rotationY: number;
  width: number;
  depth: number;
  score: number;
}>;

type SceneBundle = Readonly<{
  id: string;
  kind: LayoutKind;
  layoutId: string;
  props: readonly ScenePropDescriptor[];
}>;

type PlacementGraph = Readonly<{
  anchors: readonly SurfaceAnchor[];
  sockets: readonly SocketNode[];
  layouts: readonly FootprintLayout[];
  bundles: readonly SceneBundle[];
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

const toWorld = (
  cell: Readonly<{ x: number; y: number }>,
  cellSize: number,
): SceneDressingVector => ({
  x: cell.x * cellSize + cellSize / 2,
  y: 0,
  z: cell.y * cellSize + cellSize / 2,
});

const distance2d = (
  a: Readonly<{ x: number; z: number }>,
  b: Readonly<{ x: number; z: number }>,
): number => Math.hypot(a.x - b.x, a.z - b.z);

const mix = (a: number, b: number, t: number): number => a + (b - a) * t;

const sampleCubicBezier = (
  a: SceneDressingVector,
  b: SceneDressingVector,
  c: SceneDressingVector,
  d: SceneDressingVector,
  t: number,
): SceneDressingVector => {
  const ab = { x: mix(a.x, b.x, t), y: mix(a.y, b.y, t), z: mix(a.z, b.z, t) };
  const bc = { x: mix(b.x, c.x, t), y: mix(b.y, c.y, t), z: mix(b.z, c.z, t) };
  const cd = { x: mix(c.x, d.x, t), y: mix(c.y, d.y, t), z: mix(c.z, d.z, t) };
  const abbc = { x: mix(ab.x, bc.x, t), y: mix(ab.y, bc.y, t), z: mix(ab.z, bc.z, t) };
  const bccd = { x: mix(bc.x, cd.x, t), y: mix(bc.y, cd.y, t), z: mix(bc.z, cd.z, t) };

  return {
    x: mix(abbc.x, bccd.x, t),
    y: mix(abbc.y, bccd.y, t),
    z: mix(abbc.z, bccd.z, t),
  };
};

const tangentFromNormal = (normal: Readonly<{ x: number; z: number }>): Readonly<{ x: number; z: number }> => ({
  x: normal.z,
  z: -normal.x,
});

const chooseWeighted = <T,>(
  random: () => number,
  entries: readonly Readonly<{ value: T; weight: number }>[],
): T => {
  const total = entries.reduce((sum, entry) => sum + Math.max(0, entry.weight), 0);

  if (total <= 0) {
    return entries[0].value;
  }

  let cursor = random() * total;
  for (const entry of entries) {
    cursor -= Math.max(0, entry.weight);
    if (cursor <= 0) {
      return entry.value;
    }
  }

  return entries[entries.length - 1].value;
};

const isWalkable = (maze: MazeResult, x: number, y: number): boolean =>
  maze.grid[y]?.[x] !== undefined && maze.grid[y][x] !== 0;

const readCell = (maze: MazeResult, x: number, y: number): number =>
  maze.grid[y]?.[x] ?? 0;

const collectWalkableCells = (maze: MazeResult): readonly WalkableCell[] => {
  const cells: WalkableCell[] = [];

  for (let y = 0; y < maze.grid.length; y += 1) {
    for (let x = 0; x < maze.grid[y].length; x += 1) {
      const value = maze.grid[y][x];
      if (value !== 0) {
        cells.push({ x, y, value });
      }
    }
  }

  return cells;
};

const hasWallNeighbor = (maze: MazeResult, cell: WalkableCell): boolean =>
  readCell(maze, cell.x - 1, cell.y) === 0 ||
  readCell(maze, cell.x + 1, cell.y) === 0 ||
  readCell(maze, cell.x, cell.y - 1) === 0 ||
  readCell(maze, cell.x, cell.y + 1) === 0;

const getWallNeighborNormal = (
  maze: MazeResult,
  cell: WalkableCell,
): Readonly<{ x: number; z: number }> | null => {
  if (readCell(maze, cell.x - 1, cell.y) === 0) {
    return { x: -1, z: 0 };
  }
  if (readCell(maze, cell.x + 1, cell.y) === 0) {
    return { x: 1, z: 0 };
  }
  if (readCell(maze, cell.x, cell.y - 1) === 0) {
    return { x: 0, z: -1 };
  }
  if (readCell(maze, cell.x, cell.y + 1) === 0) {
    return { x: 0, z: 1 };
  }
  return null;
};

const marchToWall = (
  maze: MazeResult,
  cell: WalkableCell,
  direction: Readonly<{ x: number; y: number }>,
  preset: HorrorCorridorPreset,
  terrain: TerrainSurface,
): SurfaceHit | null => {
  const cellSize = preset.maze.cellSize;
  const start = toWorld(cell, cellSize);
  const stepSize = preset.raymarchSampling.stepSize;
  let distance = 0;
  let sampleX = start.x;
  let sampleZ = start.z;

  for (let step = 0; step < preset.raymarchSampling.maxSteps; step += 1) {
    sampleX += direction.x * stepSize;
    sampleZ += direction.y * stepSize;
    distance += stepSize;

    const gridX = Math.floor(sampleX / cellSize);
    const gridY = Math.floor(sampleZ / cellSize);

    if (distance > preset.raymarchSampling.maxDistance) {
      return null;
    }

    if (!isWalkable(maze, gridX, gridY)) {
      const hitX = direction.x < 0 ? cell.x * cellSize : (cell.x + 1) * cellSize;
      const hitZ = direction.y < 0 ? cell.y * cellSize : (cell.y + 1) * cellSize;
      const normal = { x: -direction.x, y: 0, z: -direction.y };
      const rotationY =
        direction.x !== 0 ? (direction.x > 0 ? -Math.PI / 2 : Math.PI / 2) : direction.y > 0 ? 0 : Math.PI;
      const worldX = direction.x === 0 ? start.x : hitX + normal.x * preset.objectPlacement.wallOffset;
      const worldZ = direction.y === 0 ? start.z : hitZ + normal.z * preset.objectPlacement.wallOffset;

      return {
        cell,
        surface: "wall",
        position: {
          x: worldX,
          y: terrain.raycastDown(worldX, worldZ).position.y + 1.3,
          z: worldZ,
        },
        normal,
        rotationY,
        openness: distance / preset.raymarchSampling.maxDistance,
      };
    }
  }

  return null;
};

const collectSurfaceHits = (
  maze: MazeResult,
  cells: readonly WalkableCell[],
  preset: HorrorCorridorPreset,
  terrain: TerrainSurface,
): readonly SurfaceHit[] => {
  const hits: SurfaceHit[] = [];
  const stride = preset.sceneDressing.density === "high" ? 2 : preset.sceneDressing.density === "low" ? 5 : 3;
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ] as const;

  for (let index = 0; index < cells.length; index += stride) {
    const cell = cells[index];
    if (!hasWallNeighbor(maze, cell)) {
      continue;
    }

    for (const direction of directions) {
      const hit = marchToWall(maze, cell, direction, preset, terrain);
      if (hit) {
        hits.push(hit);
      }
    }
  }

  return hits;
};

const shuffle = <T,>(items: readonly T[], random: () => number): readonly T[] => {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
};

const createSeed = (maze: MazeResult, preset: HorrorCorridorPreset): string =>
  [
    preset.sceneGeneration.seed,
    maze.grid.length,
    maze.start.x,
    maze.start.y,
    maze.end.x,
    maze.end.y,
    maze.cubes.map((cube) => `${cube.colorName}:${Math.round(cube.x)}:${Math.round(cube.z)}`).join("|"),
  ].join(":");

const isNearProtectedArea = (
  point: Readonly<{ x: number; z: number }>,
  maze: MazeResult,
  preset: HorrorCorridorPreset,
): boolean => {
  const protectedPoints = [
    toWorld(maze.start, preset.maze.cellSize),
    toWorld(maze.end, preset.maze.cellSize),
    ...maze.cubes.map((cube) => ({ x: cube.x, y: 0, z: cube.z })),
  ];

  return protectedPoints.some((protectedPoint) => distance2d(point, protectedPoint) < preset.objectPlacement.safeRadius);
};

const isInSpawnForwardLane = (
  point: Readonly<{ x: number; z: number }>,
  startWorld: Readonly<{ x: number; z: number }>,
  preset: HorrorCorridorPreset,
): boolean => {
  const deltaX = Math.abs(point.x - startWorld.x);
  const deltaZ = Math.abs(point.z - startWorld.z);

  return (
    (deltaX > preset.maze.cellSize * 0.6 &&
      deltaX < preset.maze.cellSize * 8 &&
      deltaZ < preset.maze.cellSize * 1.65) ||
    (deltaZ > preset.maze.cellSize * 0.6 &&
      deltaZ < preset.maze.cellSize * 8 &&
      deltaX < preset.maze.cellSize * 1.65)
  );
};

const createWallTriangle = (
  hit: SurfaceHit,
  preset: HorrorCorridorPreset,
  terrain: TerrainSurface,
): readonly [SceneDressingVector, SceneDressingVector, SceneDressingVector] => {
  const tangent = tangentFromNormal(hit.normal);
  const inset = preset.triangleSurfaceSampler.inset;
  const baseY = terrain.wallBaseYAt(hit.position.x, hit.position.z) + 0.18;
  const topY = baseY + 1.38;

  return [
    {
      x: hit.position.x - tangent.x * inset,
      y: baseY,
      z: hit.position.z - tangent.z * inset,
    },
    {
      x: hit.position.x + tangent.x * inset,
      y: baseY,
      z: hit.position.z + tangent.z * inset,
    },
    {
      x: hit.position.x,
      y: topY,
      z: hit.position.z,
    },
  ];
};

const createFloorTriangle = (
  center: SceneDressingVector,
  preset: HorrorCorridorPreset,
  terrain: TerrainSurface,
): readonly [SceneDressingVector, SceneDressingVector, SceneDressingVector] => {
  const inset = preset.triangleSurfaceSampler.inset;
  return [
    {
      x: center.x - inset,
      y: terrain.floorYAt(center.x - inset, center.z - inset, 0.02),
      z: center.z - inset,
    },
    {
      x: center.x + inset,
      y: terrain.floorYAt(center.x + inset, center.z - inset, 0.02),
      z: center.z - inset,
    },
    {
      x: center.x,
      y: terrain.floorYAt(center.x, center.z + inset, 0.02),
      z: center.z + inset,
    },
  ];
};

const createCeilingTriangle = (
  center: SceneDressingVector,
  preset: HorrorCorridorPreset,
  terrain: TerrainSurface,
): readonly [SceneDressingVector, SceneDressingVector, SceneDressingVector] => {
  const inset = preset.triangleSurfaceSampler.inset;
  const top = terrain.raycastDown(center.x, center.z).position.y + 3.42;
  return [
    { x: center.x - inset, y: top, z: center.z - inset },
    { x: center.x + inset, y: top, z: center.z - inset },
    { x: center.x, y: top, z: center.z + inset },
  ];
};

const createSurfaceAnchors = (
  maze: MazeResult,
  hits: readonly SurfaceHit[],
  cells: readonly WalkableCell[],
  preset: HorrorCorridorPreset,
  terrain: TerrainSurface,
  random: () => number,
): readonly SurfaceAnchor[] => {
  if (!preset.triangleSurfaceSampler.enabled) {
    return [];
  }

  const anchors: SurfaceAnchor[] = [];
  const startWorld = toWorld(maze.start, preset.maze.cellSize);
  const wallStride = Math.max(1, preset.triangleSurfaceSampler.wallAnchorStride);
  const floorStride = Math.max(1, preset.triangleSurfaceSampler.floorAnchorStride);
  const wallHits = hits
    .filter((hit) => hit.surface === "wall")
    .sort((a, b) => distance2d(a.position, startWorld) - distance2d(b.position, startWorld));

  for (let index = 0; index < wallHits.length && anchors.length < preset.triangleSurfaceSampler.maxAnchors; index += wallStride) {
    const hit = wallHits[index];
    const distanceToSpawn = distance2d(hit.position, startWorld);
    const isSpawnVisible = distanceToSpawn < preset.maze.cellSize * 7;
    anchors.push({
      id: `anchor-${anchors.length.toString(36)}`,
      kind: isSpawnVisible ? "facade-base" : "wall-band",
      surface: hit.surface,
      position: hit.position,
      normal: hit.normal,
      rotationY: hit.rotationY,
      openness: hit.openness,
      score: (1 - Math.min(1, distanceToSpawn / (preset.maze.cellSize * 12))) + hit.openness * 0.35,
      triangle: createWallTriangle(hit, preset, terrain),
      tags: isSpawnVisible ? ["spawn-visible", "wall-anchor"] : ["wall-anchor"],
    });
  }

  const floorCells = cells
    .filter((cell) => !isNearProtectedArea(toWorld(cell, preset.maze.cellSize), maze, preset))
    .sort(
      (a, b) =>
        distance2d(toWorld(a, preset.maze.cellSize), startWorld) -
        distance2d(toWorld(b, preset.maze.cellSize), startWorld),
    );

  for (let index = 0; index < floorCells.length && anchors.length < preset.triangleSurfaceSampler.maxAnchors; index += floorStride) {
    const cell = floorCells[index];
    const center = toWorld(cell, preset.maze.cellSize);
    const terrainHit = terrain.raycastDown(center.x, center.z);
    const nearSpawn = distance2d(center, startWorld) < preset.maze.cellSize * 7;
    anchors.push({
      id: `anchor-${anchors.length.toString(36)}`,
      kind: nearSpawn ? "floor-pocket" : "floor-pocket",
      surface: cell.value === 4 ? "anomaly" : "floor",
      position: { x: center.x, y: terrainHit.position.y + 0.02, z: center.z },
      normal: terrainHit.normal,
      rotationY: random() * Math.PI * 2,
      openness: 0.5,
      score: nearSpawn ? 0.88 : 0.54,
      triangle: createFloorTriangle(center, preset, terrain),
      tags: nearSpawn ? ["spawn-visible", "floor-anchor"] : ["floor-anchor"],
    });
  }

  const ceilingCells = floorCells.slice(0, Math.min(24, floorCells.length));
  for (let index = 0; index < ceilingCells.length && anchors.length < preset.triangleSurfaceSampler.maxAnchors; index += floorStride) {
    const cell = ceilingCells[index];
    const center = toWorld(cell, preset.maze.cellSize);
    anchors.push({
      id: `anchor-${anchors.length.toString(36)}`,
      kind: "ceiling-hang",
      surface: "ceiling",
      position: { x: center.x, y: terrain.raycastDown(center.x, center.z).position.y + 3.42, z: center.z },
      normal: { x: 0, y: -1, z: 0 },
      rotationY: random() > 0.5 ? Math.PI / 2 : 0,
      openness: 0.42,
      score: 0.42,
      triangle: createCeilingTriangle(center, preset, terrain),
      tags: ["ceiling-anchor"],
    });
  }

  return anchors.slice(0, preset.triangleSurfaceSampler.maxAnchors);
};

const toSocketKind = (anchor: SurfaceAnchor): SocketKind =>
  anchor.kind === "wall-band"
    ? "wall-utility"
    : anchor.kind === "ceiling-hang"
      ? "ceiling-run"
      : anchor.kind === "facade-base"
        ? "landmark"
        : "floor-cluster";

const createSocketGraph = (
  anchors: readonly SurfaceAnchor[],
  preset: HorrorCorridorPreset,
): readonly SocketNode[] => {
  if (!preset.socketGraph.enabled) {
    return [];
  }

  const sockets = anchors.slice(0, preset.socketGraph.maxSockets).map<SocketNode>((anchor, index, list) => {
    const kind = toSocketKind(anchor);
    const neighbors = list
      .filter((candidate) => candidate.id !== anchor.id)
      .map((candidate) => ({
        id: candidate.id,
        distance: distance2d(anchor.position, candidate.position),
        surfaceMatch: candidate.surface === anchor.surface,
      }))
      .filter(
        (candidate) =>
          candidate.distance <= preset.socketGraph.connectionRadius &&
          (candidate.surfaceMatch || kind === "floor-cluster" || kind === "landmark"),
      )
      .sort((a, b) => a.distance - b.distance)
      .slice(0, preset.socketGraph.maxNeighborsPerSocket)
      .map((candidate) => candidate.id);

    return {
      id: `socket-${index.toString(36)}`,
      kind,
      position: anchor.position,
      normal: anchor.normal,
      rotationY: anchor.rotationY,
      score: anchor.score,
      anchorId: anchor.id,
      neighbors,
    };
  });

  return sockets;
};

const layoutsOverlap = (
  a: FootprintLayout,
  b: FootprintLayout,
  padding: number,
): boolean =>
  Math.abs(a.position.x - b.position.x) < (a.width + b.width) * 0.5 + padding &&
  Math.abs(a.position.z - b.position.z) < (a.depth + b.depth) * 0.5 + padding;

const createFootprintLayouts = (
  sockets: readonly SocketNode[],
  maze: MazeResult,
  preset: HorrorCorridorPreset,
  random: () => number,
): readonly FootprintLayout[] => {
  if (!preset.footprintLayout.enabled) {
    return [];
  }

  const layouts: FootprintLayout[] = [];
  const startWorld = toWorld(maze.start, preset.maze.cellSize);
  const orderedSockets = [...sockets].sort((a, b) => distance2d(a.position, startWorld) - distance2d(b.position, startWorld));

  for (const socket of orderedSockets) {
    if (layouts.length >= preset.footprintLayout.maxLayouts) {
      break;
    }

    const kind =
      socket.kind === "wall-utility"
        ? "utility-bay"
        : socket.kind === "ceiling-run"
          ? "ceiling-service-run"
          : socket.kind === "landmark"
            ? "spawn-landmark"
            : "collapse-cluster";
    const width =
      kind === "utility-bay"
        ? 2.2
        : kind === "ceiling-service-run"
          ? 1.8
          : kind === "spawn-landmark"
            ? 2.6
            : 2.4;
    const depth = kind === "ceiling-service-run" ? 1.4 : kind === "spawn-landmark" ? 2.1 : 1.8;
    const layout: FootprintLayout = {
      id: `layout-${layouts.length.toString(36)}`,
      kind,
      socketId: socket.id,
      position: socket.position,
      rotationY: socket.rotationY,
      width,
      depth,
      score: socket.score + random() * 0.12,
    };

    if (layouts.some((existing) => layoutsOverlap(existing, layout, preset.footprintLayout.bundlePadding))) {
      continue;
    }

    layouts.push(layout);
  }

  return layouts;
};

const pushBundledProp = (
  props: ScenePropDescriptor[],
  bundleKind: LayoutKind,
  descriptor: Omit<ScenePropDescriptor, "id" | "tags"> & Partial<Pick<ScenePropDescriptor, "tags">>,
): void => {
  props.push({
    ...descriptor,
    id: `scene-prop-${props.length.toString(36)}`,
    tags: [...(descriptor.tags ?? []), `bundle:${bundleKind}`, "surface-aware-placement"],
  });
};

const createSceneBundles = (
  layouts: readonly FootprintLayout[],
  sockets: readonly SocketNode[],
  preset: HorrorCorridorPreset,
  terrain: TerrainSurface,
): readonly SceneBundle[] => {
  if (!preset.sceneBundles.enabled) {
    return [];
  }

  const bundles: SceneBundle[] = [];

  for (const layout of layouts) {
    if (bundles.length >= preset.sceneBundles.maxBundles) {
      break;
    }

    const socket = sockets.find((candidate) => candidate.id === layout.socketId);
    if (!socket) {
      continue;
    }

    const tangent = tangentFromNormal(socket.normal);
    const right = tangent;
    const forward = { x: -socket.normal.x, z: -socket.normal.z };
    const props: ScenePropDescriptor[] = [];
    const groundY = terrain.raycastDown(layout.position.x, layout.position.z).position.y;

    if (layout.kind === "utility-bay" || layout.kind === "spawn-landmark") {
      pushBundledProp(props, layout.kind, {
        kind: "wall-box",
        position: {
          x: layout.position.x,
          y: groundY + 1.54,
          z: layout.position.z,
        },
        rotationY: layout.rotationY,
        scale: { x: 0.84, y: 0.88, z: 0.24 },
        surface: "wall",
        materialFamily: "painted-metal",
      });
      pushBundledProp(props, layout.kind, {
        kind: "cable",
        position: {
          x: layout.position.x + right.x * 0.28,
          y: groundY + 2.4,
          z: layout.position.z + right.z * 0.28,
        },
        rotationY: layout.rotationY,
        scale: { x: 0.08, y: 0.08, z: 2.2 },
        surface: "wall",
        materialFamily: "rubber-cable",
      });
      pushBundledProp(props, layout.kind, {
        kind: "utility-crate-stack",
        position: {
          x: layout.position.x + forward.x * 0.72 + right.x * 0.42,
          y: terrain.raycastDown(
            layout.position.x + forward.x * 0.72 + right.x * 0.42,
            layout.position.z + forward.z * 0.72 + right.z * 0.42,
          ).position.y + preset.objectPlacement.floorOffset,
          z: layout.position.z + forward.z * 0.72 + right.z * 0.42,
        },
        rotationY: layout.rotationY + Math.PI * 0.08,
        scale: { x: 0.74, y: 0.58, z: 0.68 },
        surface: "floor",
        materialFamily: "painted-utility",
      });
      pushBundledProp(props, layout.kind, {
        kind: "floor-pipe",
        position: {
          x: layout.position.x + forward.x * 0.6 - right.x * 0.5,
          y: terrain.raycastDown(
            layout.position.x + forward.x * 0.6 - right.x * 0.5,
            layout.position.z + forward.z * 0.6 - right.z * 0.5,
          ).position.y + preset.objectPlacement.floorOffset,
          z: layout.position.z + forward.z * 0.6 - right.z * 0.5,
        },
        rotationY: layout.rotationY + Math.PI / 2,
        scale: { x: 0.11, y: 0.11, z: 2.05 },
        surface: "floor",
        materialFamily: "rusted-metal",
      });
      if (layout.kind === "spawn-landmark") {
        pushBundledProp(props, layout.kind, {
          kind: "brick-rubble-pile",
          position: {
            x: layout.position.x - right.x * 0.62 + forward.x * 0.44,
            y:
              terrain.raycastDown(
                layout.position.x - right.x * 0.62 + forward.x * 0.44,
                layout.position.z - right.z * 0.62 + forward.z * 0.44,
              ).position.y + preset.objectPlacement.floorOffset,
            z: layout.position.z - right.z * 0.62 + forward.z * 0.44,
          },
          rotationY: layout.rotationY + Math.PI * 0.12,
          scale: { x: 0.9, y: 0.24, z: 0.78 },
          surface: "floor",
          materialFamily: "broken-brick",
        });
        pushBundledProp(props, layout.kind, {
          kind: "loose-floor-slab",
          position: {
            x: layout.position.x + right.x * 0.56 + forward.x * 0.28,
            y:
              terrain.raycastDown(
                layout.position.x + right.x * 0.56 + forward.x * 0.28,
                layout.position.z + right.z * 0.56 + forward.z * 0.28,
              ).position.y + preset.objectPlacement.floorOffset,
            z: layout.position.z + right.z * 0.56 + forward.z * 0.28,
          },
          rotationY: layout.rotationY + Math.PI * 0.24,
          scale: { x: 1.02, y: 0.08, z: 0.66 },
          surface: "floor",
          materialFamily: "wet-concrete",
        });
      }
    } else if (layout.kind === "collapse-cluster") {
      pushBundledProp(props, layout.kind, {
        kind: "brick-rubble-pile",
        position: { x: layout.position.x, y: groundY + preset.objectPlacement.floorOffset, z: layout.position.z },
        rotationY: layout.rotationY,
        scale: { x: 1.02, y: 0.28, z: 0.94 },
        surface: "floor",
        materialFamily: "broken-brick",
      });
      pushBundledProp(props, layout.kind, {
        kind: "loose-floor-slab",
        position: {
          x: layout.position.x + right.x * 0.48,
          y: terrain.raycastDown(layout.position.x + right.x * 0.48, layout.position.z + right.z * 0.48).position.y +
            preset.objectPlacement.floorOffset,
          z: layout.position.z + right.z * 0.48,
        },
        rotationY: layout.rotationY + Math.PI * 0.2,
        scale: { x: 1.15, y: 0.08, z: 0.72 },
        surface: "floor",
        materialFamily: "wet-concrete",
      });
      pushBundledProp(props, layout.kind, {
        kind: "root-strip",
        position: {
          x: layout.position.x - right.x * 0.36,
          y: terrain.raycastDown(layout.position.x - right.x * 0.36, layout.position.z - right.z * 0.36).position.y +
            preset.objectPlacement.floorOffset,
          z: layout.position.z - right.z * 0.36,
        },
        rotationY: layout.rotationY,
        scale: { x: 0.11, y: 0.09, z: 1.9 },
        surface: "floor",
        materialFamily: "root-fiber",
      });
      pushBundledProp(props, layout.kind, {
        kind: "debris",
        position: {
          x: layout.position.x + forward.x * 0.34,
          y: terrain.raycastDown(layout.position.x + forward.x * 0.34, layout.position.z + forward.z * 0.34).position.y +
            preset.objectPlacement.floorOffset,
          z: layout.position.z + forward.z * 0.34,
        },
        rotationY: layout.rotationY + Math.PI * 0.32,
        scale: { x: 0.5, y: 0.18, z: 0.58 },
        surface: "floor",
        materialFamily: "broken-rubble",
      });
    } else if (layout.kind === "ceiling-service-run") {
      pushBundledProp(props, layout.kind, {
        kind: "ceiling-service-strip",
        position: { x: layout.position.x, y: groundY + 3.48, z: layout.position.z },
        rotationY: layout.rotationY,
        scale: { x: 0.44, y: 0.24, z: 2.2 },
        surface: "ceiling",
        materialFamily: "rusted-metal",
      });
      pushBundledProp(props, layout.kind, {
        kind: "cable",
        position: { x: layout.position.x + right.x * 0.22, y: groundY + 3.18, z: layout.position.z + right.z * 0.22 },
        rotationY: layout.rotationY,
        scale: { x: 0.06, y: 0.06, z: 1.95 },
        surface: "ceiling",
        materialFamily: "rubber-cable",
      });
      pushBundledProp(props, layout.kind, {
        kind: "vent",
        position: { x: layout.position.x, y: groundY + 2.58, z: layout.position.z },
        rotationY: layout.rotationY,
        scale: { x: 1.05, y: 0.1, z: 0.46 },
        surface: "wall",
        materialFamily: "rusted-metal",
      });
    }

    bundles.push({
      id: `bundle-${bundles.length.toString(36)}`,
      kind: layout.kind,
      layoutId: layout.id,
      props,
    });
  }

  return bundles;
};

const createProps = (
  maze: MazeResult,
  hits: readonly SurfaceHit[],
  cells: readonly WalkableCell[],
  placementGraph: PlacementGraph,
  random: () => number,
  preset: HorrorCorridorPreset,
  terrain: TerrainSurface,
): readonly ScenePropDescriptor[] => {
  const props: ScenePropDescriptor[] = [];
  const maxProps = Math.min(preset.objectPlacement.maxObjects, preset.propDescriptor.maxProps);
  const startWorld = toWorld(maze.start, preset.maze.cellSize);
  const isNearLayout = (point: Readonly<{ x: number; z: number }>): boolean =>
    placementGraph.layouts.some(
      (layout) =>
        Math.abs(layout.position.x - point.x) < layout.width * 0.5 + preset.footprintLayout.clearance &&
        Math.abs(layout.position.z - point.z) < layout.depth * 0.5 + preset.footprintLayout.clearance,
    );

  for (const bundle of placementGraph.bundles) {
    for (const bundleProp of bundle.props) {
      if (props.length >= Math.floor(maxProps * 0.42)) {
        break;
      }

      props.push({
        ...bundleProp,
        id: `scene-prop-${props.length.toString(36)}`,
      });
    }
  }

  const spawnWallHits = hits
    .filter(
      (hit) =>
        hit.surface === "wall" &&
        distance2d(hit.position, startWorld) < preset.maze.cellSize * 7 &&
        !isInSpawnForwardLane(hit.position, startWorld, preset),
    )
    .sort((a, b) => distance2d(a.position, startWorld) - distance2d(b.position, startWorld))
    .slice(0, 24);
  const wallHits = shuffle(
    hits.filter(
      (hit) =>
        hit.surface === "wall" &&
        !isNearProtectedArea(hit.position, maze, preset) &&
        !isInSpawnForwardLane(hit.position, startWorld, preset) &&
        !spawnWallHits.includes(hit),
    ),
    random,
  );
  const orderedWallHits = [...spawnWallHits, ...wallHits];
  const buildingFacadeAnchors = preset.openSkyProjection.enabled
    ? (() => {
        const facadeCandidates = placementGraph.anchors.filter(
          (anchor) => anchor.surface === "wall" && (anchor.kind === "facade-base" || anchor.kind === "wall-band"),
        );
        const prioritized = facadeCandidates.filter(
          (anchor) => anchor.kind === "facade-base" || distance2d(anchor.position, startWorld) < preset.maze.cellSize * 7,
        );
        const weighted = prioritized.filter(
          (anchor, index) =>
            index < 8 ||
            anchor.kind === "facade-base" ||
            random() < preset.openSkyProjection.buildingDensity,
        );
        return weighted.slice(0, preset.openSkyProjection.maxBuildingFacades);
      })()
    : [];
  let utilityCrateStackCount = 0;
  let brickRubblePileCount = 0;
  let looseFloorSlabCount = 0;
  let ceilingServiceStripCount = 0;

  for (const anchor of buildingFacadeAnchors) {
    if (props.length >= maxProps) {
      break;
    }

    const isSpawnVisible = distance2d(anchor.position, startWorld) < preset.maze.cellSize * 7;
    const heightFactor =
      preset.openSkyProjection.heightRange[0] +
      random() * (preset.openSkyProjection.heightRange[1] - preset.openSkyProjection.heightRange[0]);
    const height = preset.maze.cellSize * (isSpawnVisible ? 0.62 : 0.52) * heightFactor;
    props.push({
      id: `scene-prop-${props.length.toString(36)}`,
      kind: "building-facade",
      position: {
        x: anchor.position.x,
        y:
          terrain.raycastDown(anchor.position.x, anchor.position.z).position.y +
          Math.max(1.2, height * 0.5),
        z: anchor.position.z,
      },
      rotationY: anchor.rotationY,
      scale: {
        x: (isSpawnVisible ? 1.55 : 1.18) + random() * 0.62,
        y: height,
        z: 0.16 + random() * 0.08,
      },
      surface: anchor.surface,
      materialFamily: random() > 0.44 ? "broken-brick" : "damp-concrete",
      tags: isSpawnVisible
        ? ["non-blocking", "top-down-projected-building", "spawn-visible", "open-sky"]
        : ["non-blocking", "top-down-projected-building", "open-sky"],
    });
  }

  for (const hit of orderedWallHits) {
    if (props.length >= Math.floor(maxProps * 0.72)) {
      break;
    }

    if (isNearLayout(hit.position) || isNearProtectedArea(hit.position, maze, preset)) {
      continue;
    }

    const kind = chooseWeighted(random, [
      { value: "pipe" as const, weight: hit.openness < 0.45 ? 0.42 : 0.26 },
      { value: "cable" as const, weight: 0.3 },
      { value: "wall-box" as const, weight: 0.2 + (hit.openness > 0.45 ? 0.08 : 0) },
      { value: "vent" as const, weight: 0.16 },
    ]);
    const isSpawnVisible = distance2d(hit.position, startWorld) < preset.maze.cellSize * 7;
    const height =
      kind === "pipe" || kind === "cable"
        ? isSpawnVisible
          ? 2.35 + random() * 0.95
          : 2.65 + random() * 0.55
        : isSpawnVisible
          ? 0.95 + random() * 1.65
          : 1.15 + random() * 1.25;
    props.push({
      id: `scene-prop-${props.length.toString(36)}`,
      kind,
      position: { ...hit.position, y: terrain.raycastDown(hit.position.x, hit.position.z).position.y + height },
      rotationY: hit.rotationY,
      scale:
        kind === "pipe"
          ? {
              x: isSpawnVisible ? 0.22 : 0.18,
              y: isSpawnVisible ? 0.22 : 0.18,
              z: (isSpawnVisible ? 2.15 : 1.6) + random() * 1.65,
            }
          : kind === "cable"
            ? {
                x: isSpawnVisible ? 0.095 : 0.07,
                y: isSpawnVisible ? 0.095 : 0.07,
                z: (isSpawnVisible ? 2.0 : 1.25) + random() * 1.9,
              }
            : kind === "vent"
              ? {
                  x: isSpawnVisible ? 1.55 : 1.15,
                  y: 0.1,
                  z: isSpawnVisible ? 0.62 : 0.48,
                }
              : {
                  x: isSpawnVisible ? 0.92 : 0.72,
                  y: (isSpawnVisible ? 0.62 : 0.46) + random() * 0.42,
                  z: isSpawnVisible ? 0.24 : 0.18,
                },
      surface: hit.surface,
      materialFamily:
        kind === "cable"
          ? "rubber-cable"
          : kind === "pipe" || kind === "vent"
            ? "rusted-metal"
            : "painted-metal",
      tags: isSpawnVisible
        ? ["non-blocking", "raymarch-wall-hit", "spawn-visible"]
        : ["non-blocking", "raymarch-wall-hit"],
    });
  }

  const ceilingCells = cells
    .filter((cell) => {
      const center = toWorld(cell, preset.maze.cellSize);
      const distanceToSpawn = distance2d(center, startWorld);
      return (
        distanceToSpawn > preset.maze.cellSize * 1.3 &&
        distanceToSpawn < preset.maze.cellSize * 9 &&
        !isInSpawnForwardLane(center, startWorld, preset)
      );
    })
    .sort((a, b) => distance2d(toWorld(a, preset.maze.cellSize), startWorld) - distance2d(toWorld(b, preset.maze.cellSize), startWorld))
    .slice(0, Math.max(8, Math.floor(preset.propMaterialFidelity.visibleSpawnPropTarget * 0.75)));

  for (const cell of ceilingCells) {
    if (props.length >= Math.floor(maxProps * 0.84)) {
      break;
    }

    const center = toWorld(cell, preset.maze.cellSize);
    if (isNearLayout(center)) {
      continue;
    }
    const useServiceStrip =
      preset.smallObjectKits.ceilingServiceStrip.enabled &&
      ceilingServiceStripCount < preset.smallObjectKits.ceilingServiceStrip.maxVisible &&
      (ceilingServiceStripCount < 4 || random() > 0.35);
    if (useServiceStrip) {
      ceilingServiceStripCount += 1;
    }
    props.push({
      id: `scene-prop-${props.length.toString(36)}`,
      kind: useServiceStrip ? "ceiling-service-strip" : "ceiling-duct",
      position: {
        x: center.x + (random() - 0.5) * preset.maze.cellSize * 0.34,
        y: terrain.raycastDown(center.x, center.z).position.y + 3.48,
        z: center.z + (random() - 0.5) * preset.maze.cellSize * 0.34,
      },
      rotationY: random() > 0.5 ? Math.PI / 2 : 0,
      scale: {
        x: 0.42 + random() * 0.18,
        y: 0.22 + random() * 0.08,
        z: 1.7 + random() * 1.4,
      },
      surface: "ceiling",
      materialFamily: useServiceStrip ? "rusted-metal" : "painted-metal",
      tags: ["non-blocking", "ceiling-dressing", "spawn-silhouette"],
    });
  }

  const corridorLampCells = cells
    .filter((cell) => {
      const center = toWorld(cell, preset.maze.cellSize);
      const distanceToSpawn = distance2d(center, startWorld);
      return (
        (cell.value === 2 || cell.value === 3) &&
        distanceToSpawn > preset.maze.cellSize * 2.4 &&
        distanceToSpawn < preset.maze.cellSize * 18 &&
        hasWallNeighbor(maze, cell) &&
        !isNearLayout(center)
      );
    })
    .filter((cell, index) => index % 9 === 0)
    .slice(0, 10);

  for (const cell of corridorLampCells) {
    if (props.length >= Math.floor(maxProps * 0.9)) {
      break;
    }

    const center = toWorld(cell, preset.maze.cellSize);
    const normal = getWallNeighborNormal(maze, cell);
    if (!normal) {
      continue;
    }
    const position = {
      x: center.x - normal.x * preset.maze.cellSize * 0.32,
      z: center.z - normal.z * preset.maze.cellSize * 0.32,
    };
    const terrainHit = terrain.raycastDown(position.x, position.z);
    const tangent = tangentFromNormal(normal);
    props.push({
      id: `scene-prop-${props.length.toString(36)}`,
      kind: "lamp-post",
      position: {
        x: position.x,
        y: terrainHit.position.y + preset.objectPlacement.floorOffset,
        z: position.z,
      },
      rotationY: Math.atan2(tangent.x, tangent.z),
      scale: {
        x: 0.14 + random() * 0.04,
        y: 2.85 + random() * 0.45,
        z: 0.14 + random() * 0.04,
      },
      surface: "floor",
      materialFamily: "rusted-metal",
      tags: ["non-blocking", "corridor-lamp", "route-landmark", "spawn-silhouette"],
    });
  }

  const corridorRockCells = cells
    .filter((cell) => {
      const center = toWorld(cell, preset.maze.cellSize);
      const distanceToSpawn = distance2d(center, startWorld);
      return (
        distanceToSpawn > preset.maze.cellSize * 1.6 &&
        distanceToSpawn < preset.maze.cellSize * 16 &&
        hasWallNeighbor(maze, cell) &&
        !isNearLayout(center) &&
        !isInSpawnForwardLane(center, startWorld, preset)
      );
    })
    .filter((cell, index) => index % 7 === 0)
    .slice(0, 8);

  for (const cell of corridorRockCells) {
    if (props.length >= Math.floor(maxProps * 0.94)) {
      break;
    }

    const center = toWorld(cell, preset.maze.cellSize);
    const terrainHit = terrain.raycastDown(center.x, center.z);
    props.push({
      id: `scene-prop-${props.length.toString(36)}`,
      kind: "rock-cluster",
      position: {
        x: center.x + (random() - 0.5) * preset.maze.cellSize * 0.26,
        y: terrainHit.position.y + preset.objectPlacement.floorOffset,
        z: center.z + (random() - 0.5) * preset.maze.cellSize * 0.26,
      },
      rotationY: random() * Math.PI * 2,
      scale: {
        x: 0.72 + random() * 0.62,
        y: 0.28 + random() * 0.34,
        z: 0.66 + random() * 0.58,
      },
      surface: "floor",
      materialFamily: "broken-rubble",
      tags: ["non-blocking", "corridor-rock", "terrain-dressing", "spawn-silhouette"],
    });
  }

  const spawnFloorCells = cells
    .filter((cell) => {
      const center = toWorld(cell, preset.maze.cellSize);
      const distanceToSpawn = distance2d(center, startWorld);
      return (
        distanceToSpawn > preset.maze.cellSize * 1.1 &&
        distanceToSpawn < preset.maze.cellSize * 6
      );
    })
    .sort((a, b) => distance2d(toWorld(a, preset.maze.cellSize), startWorld) - distance2d(toWorld(b, preset.maze.cellSize), startWorld))
    .slice(0, preset.propMaterialFidelity.visibleSpawnPropTarget);
  const floorCells = [
    ...spawnFloorCells,
    ...shuffle(
      cells.filter((cell) => {
        const center = toWorld(cell, preset.maze.cellSize);
        return (
          cell.value === 1 &&
          !isNearProtectedArea(center, maze, preset) &&
          !isInSpawnForwardLane(center, startWorld, preset)
        );
      }),
      random,
    ),
  ];

  let terrainObjectCount = 0;

  for (const cell of floorCells) {
    if (props.length >= maxProps) {
      break;
    }

    const center = toWorld(cell, preset.maze.cellSize);
    if (isNearLayout(center)) {
      continue;
    }
    const terrainHit = terrain.raycastDown(center.x, center.z);
    const isSpawnFloor = distance2d(center, startWorld) < preset.maze.cellSize * 6;
    const isSpawnForward = isInSpawnForwardLane(center, startWorld, preset);
    const shouldSpawnTerrainObject =
      terrainObjectCount <
      preset.grassObjectSpawn.maxGrassClumps +
        preset.grassObjectSpawn.maxRootStrips +
        preset.grassObjectSpawn.maxRubbleProps;
    if (shouldSpawnTerrainObject && (isSpawnFloor || random() < preset.terrainField.grassDensity)) {
      const selector = random();
      const grassLimit = preset.grassObjectSpawn.maxGrassClumps;
      const rootLimit = grassLimit + preset.grassObjectSpawn.maxRootStrips;
      const kind: ScenePropKind =
        terrainObjectCount < grassLimit && selector < 0.58
          ? "grass-clump"
          : terrainObjectCount < rootLimit && selector < 0.86
            ? "root-strip"
            : "rubble";
      terrainObjectCount += 1;
      props.push({
        id: `scene-prop-${props.length.toString(36)}`,
        kind,
        position: {
          x: center.x + (random() - 0.5) * preset.maze.cellSize * 0.62,
          y: terrainHit.position.y + preset.objectPlacement.floorOffset + 0.01,
          z: center.z + (random() - 0.5) * preset.maze.cellSize * 0.62,
        },
        rotationY: random() * Math.PI * 2,
        scale:
          kind === "grass-clump"
            ? {
                x: 0.56 + random() * 0.56,
                y: 0.42 + random() * 0.48,
                z: 0.54 + random() * 0.58,
              }
            : kind === "root-strip"
              ? {
                  x: 0.11 + random() * 0.1,
                  y: 0.08 + random() * 0.05,
                  z: 1.8 + random() * 2.2,
                }
              : {
                  x: 0.44 + random() * 0.72,
                  y: 0.16 + random() * 0.42,
                  z: 0.42 + random() * 0.76,
                },
        surface: "floor",
        materialFamily:
          kind === "grass-clump"
            ? "muddy-grass"
            : kind === "root-strip"
              ? "root-fiber"
              : "broken-rubble",
        tags: isSpawnFloor
          ? ["non-blocking", "terrain-dressing", "spawn-visible", "overgrown"]
          : ["non-blocking", "terrain-dressing", "overgrown"],
      });

      if (props.length >= maxProps) {
        break;
      }
    }

    const specialKinds: ReadonlyArray<Readonly<{ value: ScenePropKind; weight: number }>> = [
      {
        value: "utility-crate-stack",
        weight:
          isSpawnFloor &&
          preset.smallObjectKits.utilityCrateStack.enabled &&
          utilityCrateStackCount < preset.smallObjectKits.utilityCrateStack.maxVisible
            ? 0.24
            : 0,
      },
      {
        value: "brick-rubble-pile",
        weight:
          isSpawnFloor &&
          preset.smallObjectKits.brickRubblePile.enabled &&
          brickRubblePileCount < preset.smallObjectKits.brickRubblePile.maxVisible
            ? 0.28
            : 0,
      },
      {
        value: "loose-floor-slab",
        weight:
          isSpawnFloor &&
          preset.smallObjectKits.looseFloorSlab.enabled &&
          looseFloorSlabCount < preset.smallObjectKits.looseFloorSlab.maxVisible
            ? 0.22
            : 0,
      },
    ];

    const floorKind = chooseWeighted(random, [
      ...specialKinds,
      { value: "root-strip" as const, weight: isSpawnForward ? 0.28 : 0.08 },
      { value: "debris" as const, weight: isSpawnForward ? 0.26 : 0.22 },
      { value: "rock-cluster" as const, weight: isSpawnFloor ? 0.18 : 0.22 },
      { value: "table" as const, weight: isSpawnFloor ? 0.12 : 0.04 },
      { value: "floor-pipe" as const, weight: isSpawnFloor ? 0.16 : 0.18 },
      { value: "crate" as const, weight: isSpawnFloor ? 0.12 : 0.1 },
      { value: "pedestal-dressing" as const, weight: cell.value === 4 ? 0.14 : 0.05 },
      { value: "rubble" as const, weight: !isSpawnFloor ? 0.1 : 0.04 },
    ]);
    if (floorKind === "utility-crate-stack") {
      utilityCrateStackCount += 1;
    } else if (floorKind === "brick-rubble-pile") {
      brickRubblePileCount += 1;
    } else if (floorKind === "loose-floor-slab") {
      looseFloorSlabCount += 1;
    }

    props.push({
      id: `scene-prop-${props.length.toString(36)}`,
      kind: floorKind,
      position: {
        x: center.x + (random() - 0.5) * preset.maze.cellSize * 0.42,
        y: terrainHit.position.y + preset.objectPlacement.floorOffset,
        z: center.z + (random() - 0.5) * preset.maze.cellSize * 0.42,
      },
      rotationY: random() * Math.PI * 2,
      scale:
        floorKind === "floor-pipe"
          ? {
              x: 0.12 + random() * 0.12,
              y: 0.12 + random() * 0.12,
              z: 1.6 + random() * 2.6,
            }
          : floorKind === "utility-crate-stack"
          ? {
              x: 0.58 + random() * 0.32,
              y: 0.46 + random() * 0.28,
              z: 0.52 + random() * 0.36,
            }
          : floorKind === "brick-rubble-pile"
            ? {
                x: 0.7 + random() * 0.65,
                y: 0.18 + random() * 0.34,
                z: 0.58 + random() * 0.7,
              }
          : floorKind === "loose-floor-slab"
            ? {
                x: 0.82 + random() * 0.8,
                y: 0.06 + random() * 0.05,
                z: 0.46 + random() * 0.56,
              }
          : floorKind === "root-strip"
          ? {
              x: 0.1 + random() * 0.09,
              y: 0.08 + random() * 0.05,
              z: 1.4 + random() * 1.8,
            }
          : floorKind === "rock-cluster"
          ? {
              x: 0.52 + random() * 0.78,
              y: 0.22 + random() * 0.34,
              z: 0.48 + random() * 0.72,
            }
          : floorKind === "table"
          ? {
              x: 1.35 + random() * 0.55,
              y: 0.9 + random() * 0.28,
              z: 0.72 + random() * 0.4,
            }
          : floorKind === "crate"
            ? {
                x: 0.65 + random() * 0.42,
                y: 0.58 + random() * 0.5,
                z: 0.56 + random() * 0.38,
              }
            : {
                x: 0.36 + random() * 0.56,
                y: 0.12 + random() * 0.28,
                z: 0.32 + random() * 0.62,
              },
      surface: "floor",
      materialFamily:
        floorKind === "floor-pipe"
          ? random() > 0.35
            ? "rusted-metal"
            : "painted-metal"
          : floorKind === "utility-crate-stack"
          ? "painted-utility"
          : floorKind === "brick-rubble-pile"
          ? "broken-brick"
          : floorKind === "loose-floor-slab"
          ? "wet-concrete"
          : floorKind === "root-strip"
          ? "root-fiber"
          : floorKind === "rock-cluster"
          ? "broken-rubble"
          : floorKind === "table" || floorKind === "crate"
          ? "painted-metal"
          : floorKind === "pedestal-dressing"
            ? "painted-utility"
          : random() < preset.terrainField.rubbleDensity
            ? "broken-rubble"
            : "damp-concrete",
      tags: isSpawnFloor
        ? ["non-blocking", "floor-dressing", "spawn-visible"]
        : ["non-blocking", "floor-dressing"],
    });
  }

  return props;
};

const createTextures = (
  maze: MazeResult,
  hits: readonly SurfaceHit[],
  random: () => number,
  preset: HorrorCorridorPreset,
  terrain: TerrainSurface,
): readonly SceneTextureDescriptor[] => {
  const textures: SceneTextureDescriptor[] = [];
  const maxTextures = Math.min(preset.texturePlacement.maxTextures, preset.sceneGeneration.maxDecorations);
  const startWorld = toWorld(maze.start, preset.maze.cellSize);
  const spawnWallHits = hits
    .filter((hit) => hit.surface === "wall" && distance2d(hit.position, startWorld) < preset.maze.cellSize * 7)
    .sort((a, b) => distance2d(a.position, startWorld) - distance2d(b.position, startWorld))
    .slice(0, 32);
  const wallHits = [
    ...spawnWallHits,
    ...shuffle(
      hits.filter((hit) => !isNearProtectedArea(hit.position, maze, preset) && !spawnWallHits.includes(hit)),
      random,
    ),
  ];
  const spawnFloorCells = collectWalkableCells(maze)
    .filter((cell) => {
      const center = toWorld(cell, preset.maze.cellSize);
      const distanceToSpawn = distance2d(center, startWorld);
      return distanceToSpawn > preset.maze.cellSize * 0.8 && distanceToSpawn < preset.maze.cellSize * 7;
    })
    .sort(
      (a, b) =>
        distance2d(toWorld(a, preset.maze.cellSize), startWorld) -
        distance2d(toWorld(b, preset.maze.cellSize), startWorld),
    )
    .slice(0, 38);
  const spawnFloorCellKeys = new Set(spawnFloorCells.map((cell) => `${cell.x}:${cell.y}`));
  const floorCells = [
    ...spawnFloorCells,
    ...shuffle(
      collectWalkableCells(maze).filter((cell) => !spawnFloorCellKeys.has(`${cell.x}:${cell.y}`)),
      random,
    ),
  ];

  for (const hit of wallHits) {
    if (textures.length >= Math.floor(maxTextures * 0.48)) {
      break;
    }

    const isSpawnVisible = distance2d(hit.position, startWorld) < preset.maze.cellSize * 7;
    const isResidue = hit.cell.value === 4 || random() < (isSpawnVisible ? 0.035 : 0.02);
    const surfaceY = terrain.raycastDown(hit.position.x, hit.position.z).position.y;
    const wallTextureKind: SceneTextureKind = isResidue
      ? "anomaly-residue"
      : preset.proceduralTextureKits.brickCourse.enabled && random() < 0.28
        ? "brick-course"
        : preset.proceduralTextureKits.rustStreak.enabled && random() < 0.42
          ? "rust-streak"
          : preset.proceduralTextureKits.mossGrime.enabled && random() < 0.5
            ? "moss-grime"
            : preset.proceduralTextureKits.wetConcrete.enabled && random() < 0.58
              ? "wet-concrete"
              : random() > 0.58 ? "rust" : random() > 0.42 ? "crack" : "grime";
    textures.push({
      id: `scene-texture-${textures.length.toString(36)}`,
      kind: wallTextureKind,
      position: {
        x: hit.position.x + hit.normal.x * preset.texturePlacement.projectionOffset,
        y: surfaceY + (isSpawnVisible ? 0.55 + random() * 2.7 : 0.8 + random() * 2.1),
        z: hit.position.z + hit.normal.z * preset.texturePlacement.projectionOffset,
      },
      rotation: { x: 0, y: hit.rotationY, z: random() * 0.08 - 0.04 },
      scale: {
        x: (isSpawnVisible ? 0.78 : 0.62) + random() * (isResidue ? 0.8 : 1.15),
        y: (isSpawnVisible ? 0.36 : 0.28) + random() * (isResidue ? 0.8 : 0.95),
        z: 1,
      },
      surface: "wall",
      color:
        wallTextureKind === "anomaly-residue"
          ? 0x737844
          : wallTextureKind === "brick-course"
            ? preset.proceduralTextureKits.brickCourse.palette[1]
            : wallTextureKind === "rust-streak"
              ? preset.proceduralTextureKits.rustStreak.palette[1]
              : wallTextureKind === "moss-grime"
                ? preset.proceduralTextureKits.mossGrime.palette[1]
                : wallTextureKind === "wet-concrete"
                  ? preset.proceduralTextureKits.wetConcrete.palette[1]
                  : isSpawnVisible ? 0x5e4834 : 0x3d3328,
      opacity:
        wallTextureKind === "anomaly-residue"
          ? 0.3
          : (isSpawnVisible ? 0.24 : 0.18) +
            random() * 0.1 +
            (wallTextureKind === "brick-course" || wallTextureKind === "rust-streak" ? 0.04 : 0),
    });
  }

  for (const [floorIndex, cell] of floorCells.entries()) {
    if (textures.length >= maxTextures) {
      break;
    }

    const isSpawnVisible = floorIndex < spawnFloorCells.length;

    if (
      !isSpawnVisible &&
      isNearProtectedArea(toWorld(cell, preset.maze.cellSize), maze, preset) &&
      random() > 0.22
    ) {
      continue;
    }

    const center = toWorld(cell, preset.maze.cellSize);
    const terrainHit = terrain.raycastDown(center.x, center.z);
    const isEnd = cell.value === 4;
    const floorTextureKind: SceneTextureKind = isEnd
      ? "anomaly-residue"
      : preset.proceduralTextureKits.dampMud.enabled && random() < 0.42
        ? "damp-mud"
        : preset.proceduralTextureKits.wetConcrete.enabled && random() < 0.5
          ? "wet-concrete"
          : preset.proceduralTextureKits.mossGrime.enabled && random() < 0.52
            ? "moss-grime"
            : random() > 0.7
              ? "moss"
              : random() > preset.texturePlacement.stainDensity
                ? "mud"
                : "stain";
    textures.push({
      id: `scene-texture-${textures.length.toString(36)}`,
      kind: floorTextureKind,
      position: {
        x: center.x + (random() - 0.5) * preset.maze.cellSize * 0.5,
        y: terrainHit.position.y + preset.texturePlacement.projectionOffset,
        z: center.z + (random() - 0.5) * preset.maze.cellSize * 0.5,
      },
      rotation: { x: -Math.PI / 2, y: 0, z: random() * Math.PI * 2 },
      scale: {
        x: (isSpawnVisible ? 0.88 : 0.5) + random() * (isSpawnVisible ? 1.4 : 1.15),
        y: (isSpawnVisible ? 0.88 : 0.5) + random() * (isSpawnVisible ? 1.4 : 1.15),
        z: 1,
      },
      surface: isEnd ? "anomaly" : "floor",
      color:
        floorTextureKind === "anomaly-residue"
          ? 0x737844
          : floorTextureKind === "damp-mud"
            ? preset.proceduralTextureKits.dampMud.palette[1]
            : floorTextureKind === "wet-concrete"
              ? preset.proceduralTextureKits.wetConcrete.palette[1]
              : floorTextureKind === "moss-grime"
                ? preset.proceduralTextureKits.mossGrime.palette[1]
                : isSpawnVisible ? 0x49331f : 0x2c2318,
      opacity:
        floorTextureKind === "anomaly-residue"
          ? 0.28
          : (isSpawnVisible ? 0.22 : 0.16) +
            random() * 0.08 +
            (floorTextureKind === "damp-mud" || floorTextureKind === "wet-concrete" ? 0.04 : 0),
    });
  }

  return textures;
};

const createLights = (
  maze: MazeResult,
  cells: readonly WalkableCell[],
  props: readonly ScenePropDescriptor[],
  random: () => number,
  preset: HorrorCorridorPreset,
  terrain: TerrainSurface,
): readonly SceneLightDescriptor[] => {
  const lights: SceneLightDescriptor[] = [];
  const start = toWorld(maze.start, preset.maze.cellSize);
  const end = toWorld(maze.end, preset.maze.cellSize);
  const startY = terrain.raycastDown(start.x, start.z).position.y;
  const endY = terrain.raycastDown(end.x, end.z).position.y;
  lights.push(
    {
      id: "scene-light-spawn-left",
      kind: "fill",
      position: { x: start.x - preset.maze.cellSize * 1.7, y: startY + 2.65, z: start.z - preset.maze.cellSize * 0.9 },
      color: 0xd2aa73,
      intensity: preset.lightingPlacement.intensity * 1.25,
      range: preset.lightingPlacement.range * 1.05,
      decay: 1.85,
    },
    {
      id: "scene-light-spawn-right",
      kind: "accent",
      position: { x: start.x + preset.maze.cellSize * 1.7, y: startY + 2.45, z: start.z + preset.maze.cellSize * 0.9 },
      color: 0x9ca26f,
      intensity: preset.lightingPlacement.intensity * 1.1,
      range: preset.lightingPlacement.range,
      decay: 1.9,
    },
  );
  if (preset.lightingPlacement.bezierPaths.enabled) {
    const controlA = {
      x: start.x + preset.lightingPlacement.bezierPaths.sag,
      y: startY + 2.65,
      z: start.z + preset.maze.cellSize * 0.8,
    };
    const controlB = {
      x: end.x - preset.lightingPlacement.bezierPaths.sag * 0.65,
      y: endY + 2.25,
      z: end.z - preset.maze.cellSize * 0.8,
    };
    const sampleCount = Math.max(2, preset.lightingPlacement.bezierPaths.sampleCount);

    for (let index = 0; index < sampleCount && lights.length < preset.lightingPlacement.maxLights; index += 1) {
      const t = (index + 0.5) / sampleCount;
      const point = sampleCubicBezier(
        { x: start.x, y: startY + 2.55, z: start.z },
        controlA,
        controlB,
        { x: end.x, y: endY + 2.45, z: end.z },
        t,
      );
      const cellX = Math.floor(point.x / preset.maze.cellSize);
      const cellY = Math.floor(point.z / preset.maze.cellSize);

      if (!isWalkable(maze, cellX, cellY)) {
        continue;
      }

      lights.push({
        id: `scene-light-bezier-${index.toString(36)}`,
        kind: index % 3 === 0 ? "accent" : "fill",
        position: {
          x: point.x + (random() - 0.5) * preset.maze.cellSize * 0.5,
          y: point.y + (random() - 0.5) * 0.22,
          z: point.z + (random() - 0.5) * preset.maze.cellSize * 0.5,
        },
        color: index % 4 === 0 ? 0x7d6e47 : preset.lightingPlacement.bezierPaths.color,
        intensity: preset.lightingPlacement.bezierPaths.intensity * (0.82 + random() * 0.32),
        range: preset.lightingPlacement.bezierPaths.range * (0.85 + random() * 0.26),
        decay: 2.35,
      });
    }
  }
  const candidates = shuffle(
    cells.filter((cell) => hasWallNeighbor(maze, cell) && !isNearProtectedArea(toWorld(cell, preset.maze.cellSize), maze, preset)),
    random,
  );
  const step = Math.max(1, Math.floor(candidates.length / Math.max(1, preset.lightingPlacement.maxLights)));

  for (let index = 0; index < candidates.length; index += step) {
    if (lights.length >= preset.lightingPlacement.maxLights - 2) {
      break;
    }

    const position = toWorld(candidates[index], preset.maze.cellSize);
    const y = terrain.raycastDown(position.x, position.z).position.y;
    lights.push({
      id: `scene-light-${lights.length.toString(36)}`,
      kind: lights.length % 4 === 0 ? "accent" : "fill",
      position: { x: position.x, y: y + 2.35 + random() * 0.7, z: position.z },
      color: lights.length % 5 === 0 ? 0xc79356 : 0x6d7250,
      intensity: preset.lightingPlacement.intensity * (0.58 + random() * 0.44),
      range: preset.lightingPlacement.range * (0.7 + random() * 0.5),
      decay: 2.15,
    });
  }

  lights.push({
    id: "scene-light-anomaly",
    kind: "anomaly",
    position: { x: end.x, y: endY + 2.8, z: end.z },
    color: 0x9a9b5c,
    intensity: preset.lightingPlacement.intensity * 1.5,
    range: preset.lightingPlacement.range * 1.4,
    decay: 2,
  });

  for (const prop of props) {
    if (prop.kind !== "lamp-post" || lights.length >= preset.lightingPlacement.maxLights) {
      continue;
    }

    const headOffset = prop.scale.x * 2.15;
    const headX = Math.cos(prop.rotationY) * headOffset;
    const headZ = -Math.sin(prop.rotationY) * headOffset;

    lights.push({
      id: `scene-light-${prop.id}`,
      kind: "prop",
      position: {
        x: prop.position.x + headX,
        y: prop.position.y + prop.scale.y * 0.78,
        z: prop.position.z + headZ,
      },
      color: 0xd0b07a,
      intensity: preset.lightingPlacement.intensity * (0.72 + random() * 0.18),
      range: preset.lightingPlacement.range * 0.72,
      decay: 1.8,
    });
  }

  return lights;
};

const createWalkthrough = (
  maze: MazeResult,
  preset: HorrorCorridorPreset,
  terrain: TerrainSurface,
): readonly SceneWalkthroughCheckpoint[] => {
  if (!preset.walkthrough.enabled) {
    return [];
  }

  const mainPath = collectWalkableCells(maze).filter((cell) => cell.value === 2 || cell.value === 3 || cell.value === 4);
  const stride = Math.max(1, Math.floor(mainPath.length / Math.max(1, preset.walkthrough.checkpointCount)));
  const spawn = toWorld(maze.start, preset.maze.cellSize);
  const end = toWorld(maze.end, preset.maze.cellSize);
  const checkpoints: SceneWalkthroughCheckpoint[] = [
    {
      id: "walkthrough-spawn",
      label: "spawn-readability",
      position: { ...spawn, y: terrain.raycastDown(spawn.x, spawn.z).position.y + 0.12 },
    },
  ];

  for (let index = stride; index < mainPath.length && checkpoints.length < preset.walkthrough.checkpointCount - 1; index += stride) {
    const point = toWorld(mainPath[index], preset.maze.cellSize);
    checkpoints.push({
      id: `walkthrough-${checkpoints.length}`,
      label: "route-continuity",
      position: { ...point, y: terrain.raycastDown(point.x, point.z).position.y + 0.12 },
    });
  }

  checkpoints.push({
    id: "walkthrough-anomaly",
    label: "anomaly-route",
    position: { ...end, y: terrain.raycastDown(end.x, end.z).position.y + 0.12 },
  });

  return checkpoints.slice(0, preset.walkthrough.checkpointCount);
};

export const createSceneDressingManifest = (
  maze: MazeResult,
  preset: HorrorCorridorPreset,
): SceneDressingManifest => {
  if (!preset.sceneGeneration.enabled) {
    const summary: SceneDressingSummary = {
      propCount: 0,
      textureCount: 0,
      lightCount: 0,
      walkthroughCheckpointCount: 0,
      anchorCount: 0,
      socketCount: 0,
      layoutCount: 0,
      bundleCount: 0,
      validation: {
        meetsPropThreshold: false,
        meetsTextureThreshold: false,
        meetsLightThreshold: false,
        readableSpawnView: false,
      },
    };

    return {
      props: [],
      textures: [],
      lights: [],
      walkthrough: [],
      summary,
    };
  }

  const random = createRandom(createSeed(maze, preset));
  const terrain = createTerrainSurface(maze, preset);
  const cells = collectWalkableCells(maze);
  const hits = collectSurfaceHits(maze, cells, preset, terrain);
  const anchors = createSurfaceAnchors(maze, hits, cells, preset, terrain, random);
  const sockets = createSocketGraph(anchors, preset);
  const layouts = createFootprintLayouts(sockets, maze, preset, random);
  const bundles = createSceneBundles(layouts, sockets, preset, terrain);
  const placementGraph: PlacementGraph = {
    anchors,
    sockets,
    layouts,
    bundles,
  };
  const props = createProps(maze, hits, cells, placementGraph, random, preset, terrain);
  const textures = createTextures(maze, hits, random, preset, terrain);
  const lights = createLights(maze, cells, props, random, preset, terrain);
  const walkthrough = createWalkthrough(maze, preset, terrain);
  const readableSpawnView = hits.some(
    (hit) =>
      Math.abs(hit.cell.x - maze.start.x) <= preset.gridField.safeZoneCellRadius + 2 &&
      Math.abs(hit.cell.y - maze.start.y) <= preset.gridField.safeZoneCellRadius + 2,
  );

  return {
    props,
    textures,
    lights,
    walkthrough,
    summary: {
      propCount: props.length,
      textureCount: textures.length,
      lightCount: lights.length,
      walkthroughCheckpointCount: walkthrough.length,
      anchorCount: anchors.length,
      socketCount: sockets.length,
      layoutCount: layouts.length,
      bundleCount: bundles.length,
      validation: {
        meetsPropThreshold: props.length >= preset.renderValidation.minimumPropCount,
        meetsTextureThreshold: textures.length >= preset.renderValidation.minimumTextureCount,
        meetsLightThreshold: lights.length >= preset.renderValidation.minimumLightCount,
        readableSpawnView,
      },
    },
  };
};
