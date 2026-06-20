import { CUBE_COLORS } from "@/lib/colors";
import {
  CELL_SIZE,
  GRID_SIZE,
  INTERACTION_DISTANCE,
  MAX_OOZE,
  OOZE_SPACING,
} from "@/lib/constants";

import { createHorrorContentPackManifest, defineHorrorContentPack } from "../contentPack";

export type HorrorCorridorPreset = Readonly<{
  maze: {
    gridSize: number;
    cellSize: number;
    generatorId: string;
    cellValues: Record<string, number>;
  };
  sequenceObjective: {
    colors: readonly string[];
    slotCount: number;
    completionMode: "ordered" | "unordered";
  };
  inventory: {
    capacity: number;
    acceptedItemKinds: readonly string[];
  };
  spatialInteraction: {
    interactionDistance: number;
    targetKinds: readonly string[];
  };
  trailDecal: {
    spacing: number;
    maxDecals: number;
    decayIntervalMs: number;
    decalKind: string;
    material: {
      color: number;
      opacity: number;
    };
  };
  gridField: {
    cellValues: Record<string, number>;
    safeZoneCellRadius: number;
    surfaces: readonly ("wall" | "floor" | "ceiling" | "anomaly")[];
  };
  raymarchSampling: {
    stepSize: number;
    maxDistance: number;
    maxSteps: number;
    surfaceEpsilon: number;
    sampleSurfaces: readonly ("wall" | "floor" | "ceiling" | "anomaly")[];
  };
  triangleSurfaceSampler: {
    enabled: boolean;
    maxAnchors: number;
    wallAnchorStride: number;
    floorAnchorStride: number;
    inset: number;
  };
  socketGraph: {
    enabled: boolean;
    maxSockets: number;
    connectionRadius: number;
    maxNeighborsPerSocket: number;
  };
  propDescriptor: {
    propKinds: readonly string[];
    maxProps: number;
  };
  terrainField: {
    grassDensity: number;
    mudDensity: number;
    wetness: number;
    rubbleDensity: number;
    safeRadius: number;
    heightAmplitude: number;
    heightScale: number;
  };
  terrainShader: {
    soilPalette: readonly number[];
    grassPalette: readonly number[];
    concretePalette: readonly number[];
    wetnessResponse: number;
    roughnessRange: readonly [number, number];
    layerScales: {
      macro: number;
      detail: number;
      grass: number;
      concrete: number;
      puddle: number;
    };
    blendSharpness: number;
    puddleStrength: number;
    mossStrength: number;
  };
  grassObjectSpawn: {
    maxGrassClumps: number;
    maxRootStrips: number;
    maxRubbleProps: number;
    cardStyles: readonly string[];
    maxVisibleDensity: number;
  };
  corridorTile: {
    tileSet: readonly string[];
    variantWeights: Record<string, number>;
    regionThemes: readonly string[];
  };
  brokenCityWall: {
    brickPalette: readonly number[];
    concretePalette: readonly number[];
    damageDensity: number;
    mossDensity: number;
  };
  smallObjectKits: {
    utilityCrateStack: {
      enabled: boolean;
      maxVisible: number;
      palette: readonly number[];
    };
    brickRubblePile: {
      enabled: boolean;
      maxVisible: number;
      palette: readonly number[];
    };
    looseFloorSlab: {
      enabled: boolean;
      maxVisible: number;
      palette: readonly number[];
    };
    ceilingServiceStrip: {
      enabled: boolean;
      maxVisible: number;
      palette: readonly number[];
    };
  };
  proceduralTextureKits: {
    brickCourse: {
      enabled: boolean;
      palette: readonly number[];
      mortarContrast: number;
    };
    dampMud: {
      enabled: boolean;
      palette: readonly number[];
      wetness: number;
    };
    rustStreak: {
      enabled: boolean;
      palette: readonly number[];
      streakDensity: number;
    };
    mossGrime: {
      enabled: boolean;
      palette: readonly number[];
      coverage: number;
    };
    wetConcrete: {
      enabled: boolean;
      palette: readonly number[];
      crackDensity: number;
    };
  };
  openSkyProjection: {
    enabled: boolean;
    projectionMode: "top-down-terrain";
    buildingDensity: number;
    maxBuildingFacades: number;
    heightRange: readonly [number, number];
    rooflessCorridors: boolean;
    skyCellResolution: number;
  };
  objectPlacement: {
    maxObjects: number;
    density: "low" | "medium" | "high";
    safeRadius: number;
    wallOffset: number;
    floorOffset: number;
    allowedSurfaces: readonly ("wall" | "floor" | "ceiling" | "anomaly")[];
    nonBlocking: boolean;
  };
  footprintLayout: {
    enabled: boolean;
    maxLayouts: number;
    clearance: number;
    bundlePadding: number;
  };
  proceduralPbrMaterial: {
    seed: string;
    grimeIntensity: number;
    normalStrength: number;
    emissiveAccent: number;
    textureSize: number;
    materialFamilies: readonly string[];
    shaderFamilyProfiles: Record<string, Readonly<{
      shaderProfile: string;
      accentColor: number;
      roughnessBias: number;
      metalnessBias: number;
      emissiveBoost: number;
    }>>;
  };
  propMaterialFidelity: {
    geometryDetail: "low" | "medium" | "high";
    materialTextureSize: number;
    clipTextureSize: number;
    projectionTextureSize: number;
    surfaceBreakupIntensity: number;
    emissiveCueStrength: number;
    visibleSpawnPropTarget: number;
    objectProfiles: Record<string, Readonly<{
      shaderProfile: string;
      detailScale: number;
      edgeWear: number;
      grimeBoost: number;
      accentColor: number;
    }>>;
  };
  sceneBundles: {
    enabled: boolean;
    maxBundles: number;
    bundleKinds: readonly string[];
  };
  texturePlacement: {
    maxTextures: number;
    grimeDensity: number;
    stainDensity: number;
    projectionOffset: number;
    allowedSurfaces: readonly ("wall" | "floor" | "ceiling" | "anomaly")[];
  };
  sceneDressing: {
    density: "low" | "medium" | "high";
    seedMode: "maze-seed" | "content-pack";
    placementRules: readonly string[];
  };
  lightingDescriptor: {
    mood: string;
    ambientColor: number;
    playerFollowLight: boolean;
    flickerEnabled: boolean;
  };
  lightingPlacement: {
    maxLights: number;
    coverageSamples: number;
    readabilityTarget: number;
    intensity: number;
    range: number;
    bezierPaths: {
      enabled: boolean;
      sampleCount: number;
      sag: number;
      color: number;
      intensity: number;
      range: number;
    };
    allowedKinds: readonly ("fill" | "accent" | "anomaly" | "prop")[];
  };
  flashlight: {
    enabled: boolean;
    color: number;
    intensity: number;
    range: number;
    angle: number;
    penumbra: number;
    decay: number;
    floatOffset: {
      x: number;
      y: number;
      z: number;
    };
  };
  walkthrough: {
    enabled: boolean;
    checkpointCount: number;
    routeSampleSpacing: number;
    checks: readonly ("spawn-readability" | "first-branch" | "cube-route" | "anomaly-route")[];
  };
  sceneGeneration: {
    enabled: boolean;
    seed: string;
    maxDecorations: number;
    descriptorOnly: boolean;
  };
  renderValidation: {
    noHudDuringPlaying: boolean;
    requireNonBlankCanvas: boolean;
    minimumPropCount: number;
    minimumDecalCount: number;
    minimumTextureCount: number;
    minimumLightCount: number;
    readableSpawnView: boolean;
  };
}>;

export type HorrorCorridorPresetInput = Partial<{
  maze: Partial<HorrorCorridorPreset["maze"]>;
  sequenceObjective: Partial<HorrorCorridorPreset["sequenceObjective"]>;
  inventory: Partial<HorrorCorridorPreset["inventory"]>;
  spatialInteraction: Partial<HorrorCorridorPreset["spatialInteraction"]>;
  trailDecal: Partial<HorrorCorridorPreset["trailDecal"]>;
  gridField: Partial<HorrorCorridorPreset["gridField"]>;
  raymarchSampling: Partial<HorrorCorridorPreset["raymarchSampling"]>;
  triangleSurfaceSampler: Partial<HorrorCorridorPreset["triangleSurfaceSampler"]>;
  socketGraph: Partial<HorrorCorridorPreset["socketGraph"]>;
  propDescriptor: Partial<HorrorCorridorPreset["propDescriptor"]>;
  objectPlacement: Partial<HorrorCorridorPreset["objectPlacement"]>;
  footprintLayout: Partial<HorrorCorridorPreset["footprintLayout"]>;
  proceduralPbrMaterial: Partial<HorrorCorridorPreset["proceduralPbrMaterial"]>;
  propMaterialFidelity: Partial<HorrorCorridorPreset["propMaterialFidelity"]>;
  sceneBundles: Partial<HorrorCorridorPreset["sceneBundles"]>;
  texturePlacement: Partial<HorrorCorridorPreset["texturePlacement"]>;
  sceneDressing: Partial<HorrorCorridorPreset["sceneDressing"]>;
  lightingDescriptor: Partial<HorrorCorridorPreset["lightingDescriptor"]>;
  lightingPlacement: Partial<HorrorCorridorPreset["lightingPlacement"]>;
  flashlight: Partial<HorrorCorridorPreset["flashlight"]>;
  walkthrough: Partial<HorrorCorridorPreset["walkthrough"]>;
  sceneGeneration: Partial<HorrorCorridorPreset["sceneGeneration"]>;
  terrainField: Partial<HorrorCorridorPreset["terrainField"]>;
  terrainShader: Partial<HorrorCorridorPreset["terrainShader"]>;
  grassObjectSpawn: Partial<HorrorCorridorPreset["grassObjectSpawn"]>;
  corridorTile: Partial<HorrorCorridorPreset["corridorTile"]>;
  brokenCityWall: Partial<HorrorCorridorPreset["brokenCityWall"]>;
  smallObjectKits: Partial<HorrorCorridorPreset["smallObjectKits"]>;
  proceduralTextureKits: Partial<HorrorCorridorPreset["proceduralTextureKits"]>;
  openSkyProjection: Partial<HorrorCorridorPreset["openSkyProjection"]>;
  renderValidation: Partial<HorrorCorridorPreset["renderValidation"]>;
}>;

const DEFAULT_COLORS = CUBE_COLORS.map((color) => color.name);
const DEFAULT_PROP_KINDS = [
  "wall-box",
  "pipe",
  "floor-pipe",
  "cable",
  "vent",
  "ceiling-duct",
  "building-facade",
  "utility-crate-stack",
  "brick-rubble-pile",
  "loose-floor-slab",
  "ceiling-service-strip",
  "debris",
  "grass-clump",
  "root-strip",
  "rubble",
  "rock-cluster",
  "table",
  "crate",
  "lamp-post",
  "pedestal-dressing",
] as const;

export const createHorrorCorridorPreset = (
  input: HorrorCorridorPresetInput = {},
): HorrorCorridorPreset => ({
  maze: {
    gridSize: input.maze?.gridSize ?? GRID_SIZE,
    cellSize: input.maze?.cellSize ?? CELL_SIZE,
    generatorId: input.maze?.generatorId ?? "prototype-grid-maze",
    cellValues: input.maze?.cellValues ?? {
      wall: 0,
      branch: 1,
      main: 2,
      start: 3,
      end: 4,
    },
  },
  sequenceObjective: {
    colors: input.sequenceObjective?.colors ?? DEFAULT_COLORS,
    slotCount: input.sequenceObjective?.slotCount ?? DEFAULT_COLORS.length,
    completionMode: input.sequenceObjective?.completionMode ?? "ordered",
  },
  inventory: {
    capacity: input.inventory?.capacity ?? 1,
    acceptedItemKinds: input.inventory?.acceptedItemKinds ?? ["cube"],
  },
  spatialInteraction: {
    interactionDistance: input.spatialInteraction?.interactionDistance ?? INTERACTION_DISTANCE,
    targetKinds: input.spatialInteraction?.targetKinds ?? ["cube", "anomaly"],
  },
  trailDecal: {
    spacing: input.trailDecal?.spacing ?? OOZE_SPACING,
    maxDecals: input.trailDecal?.maxDecals ?? MAX_OOZE,
    decayIntervalMs: input.trailDecal?.decayIntervalMs ?? 10_000,
    decalKind: input.trailDecal?.decalKind ?? "ooze",
    material: {
      color: input.trailDecal?.material?.color ?? 0x75ff7b,
      opacity: input.trailDecal?.material?.opacity ?? 0.62,
    },
  },
  gridField: {
    cellValues: input.gridField?.cellValues ?? {
      wall: 0,
      branch: 1,
      main: 2,
      start: 3,
      end: 4,
    },
    safeZoneCellRadius: input.gridField?.safeZoneCellRadius ?? 2,
    surfaces: input.gridField?.surfaces ?? ["wall", "floor", "ceiling", "anomaly"],
  },
  raymarchSampling: {
    stepSize: input.raymarchSampling?.stepSize ?? CELL_SIZE * 0.25,
    maxDistance: input.raymarchSampling?.maxDistance ?? CELL_SIZE * 8,
    maxSteps: input.raymarchSampling?.maxSteps ?? 48,
    surfaceEpsilon: input.raymarchSampling?.surfaceEpsilon ?? 0.04,
    sampleSurfaces: input.raymarchSampling?.sampleSurfaces ?? [
      "wall",
      "floor",
      "ceiling",
      "anomaly",
    ],
  },
  triangleSurfaceSampler: {
    enabled: input.triangleSurfaceSampler?.enabled ?? true,
    maxAnchors: input.triangleSurfaceSampler?.maxAnchors ?? 160,
    wallAnchorStride: input.triangleSurfaceSampler?.wallAnchorStride ?? 2,
    floorAnchorStride: input.triangleSurfaceSampler?.floorAnchorStride ?? 3,
    inset: input.triangleSurfaceSampler?.inset ?? CELL_SIZE * 0.18,
  },
  socketGraph: {
    enabled: input.socketGraph?.enabled ?? true,
    maxSockets: input.socketGraph?.maxSockets ?? 110,
    connectionRadius: input.socketGraph?.connectionRadius ?? CELL_SIZE * 2.6,
    maxNeighborsPerSocket: input.socketGraph?.maxNeighborsPerSocket ?? 3,
  },
  propDescriptor: {
    propKinds: input.propDescriptor?.propKinds ?? DEFAULT_PROP_KINDS,
    maxProps: input.propDescriptor?.maxProps ?? 650,
  },
  terrainField: {
    grassDensity: input.terrainField?.grassDensity ?? 0.42,
    mudDensity: input.terrainField?.mudDensity ?? 0.58,
    wetness: input.terrainField?.wetness ?? 0.46,
    rubbleDensity: input.terrainField?.rubbleDensity ?? 0.28,
    safeRadius: input.terrainField?.safeRadius ?? CELL_SIZE * 0.9,
    heightAmplitude: input.terrainField?.heightAmplitude ?? 0.42,
    heightScale: input.terrainField?.heightScale ?? CELL_SIZE * 4.8,
  },
  terrainShader: {
    soilPalette: input.terrainShader?.soilPalette ?? [0x1f1a13, 0x302519, 0x483522],
    grassPalette: input.terrainShader?.grassPalette ?? [0x25351e, 0x35482a, 0x4c5b37],
    concretePalette: input.terrainShader?.concretePalette ?? [0x34342f, 0x4a463c, 0x5d584b],
    wetnessResponse: input.terrainShader?.wetnessResponse ?? 0.44,
    roughnessRange: input.terrainShader?.roughnessRange ?? [0.58, 0.92],
    layerScales: input.terrainShader?.layerScales ?? {
      macro: 0.018,
      detail: 0.11,
      grass: 0.16,
      concrete: 0.08,
      puddle: 0.045,
    },
    blendSharpness: input.terrainShader?.blendSharpness ?? 3.4,
    puddleStrength: input.terrainShader?.puddleStrength ?? 0.58,
    mossStrength: input.terrainShader?.mossStrength ?? 0.42,
  },
  grassObjectSpawn: {
    maxGrassClumps: input.grassObjectSpawn?.maxGrassClumps ?? 34,
    maxRootStrips: input.grassObjectSpawn?.maxRootStrips ?? 22,
    maxRubbleProps: input.grassObjectSpawn?.maxRubbleProps ?? 24,
    cardStyles: input.grassObjectSpawn?.cardStyles ?? ["short-weeds", "dead-grass", "moss-tuft"],
    maxVisibleDensity: input.grassObjectSpawn?.maxVisibleDensity ?? 0.36,
  },
  corridorTile: {
    tileSet: input.corridorTile?.tileSet ?? [
      "straight",
      "corner",
      "t-junction",
      "dead-end",
      "overgrown-pocket",
      "collapsed-side",
      "anomaly-approach",
    ],
    variantWeights: input.corridorTile?.variantWeights ?? {
      straight: 1,
      corner: 1,
      "t-junction": 0.8,
      "dead-end": 0.9,
      "overgrown-pocket": 0.7,
      "collapsed-side": 0.45,
      "anomaly-approach": 0.35,
    },
    regionThemes: input.corridorTile?.regionThemes ?? [
      "muddy-service-corridor",
      "broken-brick-underpass",
      "root-choked-utility-hall",
    ],
  },
  brokenCityWall: {
    brickPalette: input.brokenCityWall?.brickPalette ?? [0x3b2c24, 0x4d372b, 0x62503f],
    concretePalette: input.brokenCityWall?.concretePalette ?? [0x343631, 0x4b4b42, 0x625f52],
    damageDensity: input.brokenCityWall?.damageDensity ?? 0.5,
    mossDensity: input.brokenCityWall?.mossDensity ?? 0.38,
  },
  smallObjectKits: {
    utilityCrateStack: {
      enabled: input.smallObjectKits?.utilityCrateStack?.enabled ?? true,
      maxVisible: input.smallObjectKits?.utilityCrateStack?.maxVisible ?? 10,
      palette: input.smallObjectKits?.utilityCrateStack?.palette ?? [0x263827, 0x415842, 0x6b5b3c],
    },
    brickRubblePile: {
      enabled: input.smallObjectKits?.brickRubblePile?.enabled ?? true,
      maxVisible: input.smallObjectKits?.brickRubblePile?.maxVisible ?? 12,
      palette: input.smallObjectKits?.brickRubblePile?.palette ?? [0x3f241a, 0x673b27, 0x8b6644],
    },
    looseFloorSlab: {
      enabled: input.smallObjectKits?.looseFloorSlab?.enabled ?? true,
      maxVisible: input.smallObjectKits?.looseFloorSlab?.maxVisible ?? 12,
      palette: input.smallObjectKits?.looseFloorSlab?.palette ?? [0x49463d, 0x696457, 0x2f2c27],
    },
    ceilingServiceStrip: {
      enabled: input.smallObjectKits?.ceilingServiceStrip?.enabled ?? true,
      maxVisible: input.smallObjectKits?.ceilingServiceStrip?.maxVisible ?? 14,
      palette: input.smallObjectKits?.ceilingServiceStrip?.palette ?? [0x2f2b24, 0x61543b, 0x8b7145],
    },
  },
  proceduralTextureKits: {
    brickCourse: {
      enabled: input.proceduralTextureKits?.brickCourse?.enabled ?? true,
      palette: input.proceduralTextureKits?.brickCourse?.palette ?? [0x382017, 0x5d3726, 0x8a6042],
      mortarContrast: input.proceduralTextureKits?.brickCourse?.mortarContrast ?? 0.62,
    },
    dampMud: {
      enabled: input.proceduralTextureKits?.dampMud?.enabled ?? true,
      palette: input.proceduralTextureKits?.dampMud?.palette ?? [0x1c150f, 0x3f2b1a, 0x665035],
      wetness: input.proceduralTextureKits?.dampMud?.wetness ?? 0.68,
    },
    rustStreak: {
      enabled: input.proceduralTextureKits?.rustStreak?.enabled ?? true,
      palette: input.proceduralTextureKits?.rustStreak?.palette ?? [0x4a2314, 0x8b4a24, 0xd08a46],
      streakDensity: input.proceduralTextureKits?.rustStreak?.streakDensity ?? 0.58,
    },
    mossGrime: {
      enabled: input.proceduralTextureKits?.mossGrime?.enabled ?? true,
      palette: input.proceduralTextureKits?.mossGrime?.palette ?? [0x1f2b18, 0x314421, 0x58613a],
      coverage: input.proceduralTextureKits?.mossGrime?.coverage ?? 0.44,
    },
    wetConcrete: {
      enabled: input.proceduralTextureKits?.wetConcrete?.enabled ?? true,
      palette: input.proceduralTextureKits?.wetConcrete?.palette ?? [0x32312d, 0x57534a, 0x746e60],
      crackDensity: input.proceduralTextureKits?.wetConcrete?.crackDensity ?? 0.5,
    },
  },
  openSkyProjection: {
    enabled: input.openSkyProjection?.enabled ?? true,
    projectionMode: input.openSkyProjection?.projectionMode ?? "top-down-terrain",
    buildingDensity: input.openSkyProjection?.buildingDensity ?? 0.46,
    maxBuildingFacades: input.openSkyProjection?.maxBuildingFacades ?? 36,
    heightRange: input.openSkyProjection?.heightRange ?? [1.15, 2.35],
    rooflessCorridors: input.openSkyProjection?.rooflessCorridors ?? true,
    skyCellResolution: input.openSkyProjection?.skyCellResolution ?? 4,
  },
  objectPlacement: {
    maxObjects: input.objectPlacement?.maxObjects ?? 140,
    density: input.objectPlacement?.density ?? "medium",
    safeRadius: input.objectPlacement?.safeRadius ?? CELL_SIZE * 0.8,
    wallOffset: input.objectPlacement?.wallOffset ?? 0.08,
    floorOffset: input.objectPlacement?.floorOffset ?? 0.08,
    allowedSurfaces: input.objectPlacement?.allowedSurfaces ?? ["wall", "floor", "ceiling", "anomaly"],
    nonBlocking: input.objectPlacement?.nonBlocking ?? true,
  },
  footprintLayout: {
    enabled: input.footprintLayout?.enabled ?? true,
    maxLayouts: input.footprintLayout?.maxLayouts ?? 26,
    clearance: input.footprintLayout?.clearance ?? CELL_SIZE * 0.7,
    bundlePadding: input.footprintLayout?.bundlePadding ?? CELL_SIZE * 0.24,
  },
  proceduralPbrMaterial: {
    seed: input.proceduralPbrMaterial?.seed ?? "horror-corridor-local-pbr",
    grimeIntensity: input.proceduralPbrMaterial?.grimeIntensity ?? 0.64,
    normalStrength: input.proceduralPbrMaterial?.normalStrength ?? 0.35,
    emissiveAccent: input.proceduralPbrMaterial?.emissiveAccent ?? 0.18,
    textureSize: input.proceduralPbrMaterial?.textureSize ?? 128,
    materialFamilies: input.proceduralPbrMaterial?.materialFamilies ?? [
      "painted-metal",
      "rusted-metal",
      "rubber-cable",
      "damp-concrete",
      "broken-brick",
      "painted-utility",
      "wet-concrete",
      "muddy-grass",
      "wet-soil",
      "root-fiber",
      "broken-rubble",
      "anomaly-residue",
    ],
    shaderFamilyProfiles: input.proceduralPbrMaterial?.shaderFamilyProfiles ?? {
      "painted-metal": {
        shaderProfile: "painted-panel",
        accentColor: 0x7b6650,
        roughnessBias: 0.04,
        metalnessBias: 0.24,
        emissiveBoost: 0.04,
      },
      "rusted-metal": {
        shaderProfile: "oxidized-pipe",
        accentColor: 0xa16d38,
        roughnessBias: 0.12,
        metalnessBias: 0.14,
        emissiveBoost: 0.03,
      },
      "rubber-cable": {
        shaderProfile: "cable-rib",
        accentColor: 0x3a3124,
        roughnessBias: 0.18,
        metalnessBias: -0.06,
        emissiveBoost: 0,
      },
      "damp-concrete": {
        shaderProfile: "concrete-slab",
        accentColor: 0x6c6559,
        roughnessBias: 0.16,
        metalnessBias: -0.04,
        emissiveBoost: 0,
      },
      "broken-brick": {
        shaderProfile: "brick-facade",
        accentColor: 0x8a6042,
        roughnessBias: 0.12,
        metalnessBias: -0.06,
        emissiveBoost: 0,
      },
      "painted-utility": {
        shaderProfile: "utility-crate",
        accentColor: 0x7c8b6a,
        roughnessBias: 0.08,
        metalnessBias: 0.12,
        emissiveBoost: 0.04,
      },
      "wet-concrete": {
        shaderProfile: "concrete-slab",
        accentColor: 0x858176,
        roughnessBias: -0.06,
        metalnessBias: -0.04,
        emissiveBoost: 0,
      },
      "muddy-grass": {
        shaderProfile: "grass-card",
        accentColor: 0x6d7748,
        roughnessBias: 0.2,
        metalnessBias: -0.08,
        emissiveBoost: 0,
      },
      "wet-soil": {
        shaderProfile: "concrete-slab",
        accentColor: 0x5a4931,
        roughnessBias: 0.1,
        metalnessBias: -0.08,
        emissiveBoost: 0,
      },
      "root-fiber": {
        shaderProfile: "root-fiber",
        accentColor: 0x6a5136,
        roughnessBias: 0.18,
        metalnessBias: -0.08,
        emissiveBoost: 0,
      },
      "broken-rubble": {
        shaderProfile: "concrete-slab",
        accentColor: 0x75624f,
        roughnessBias: 0.1,
        metalnessBias: -0.03,
        emissiveBoost: 0,
      },
      "anomaly-residue": {
        shaderProfile: "painted-panel",
        accentColor: 0xaab267,
        roughnessBias: -0.08,
        metalnessBias: -0.08,
        emissiveBoost: 0.22,
      },
    },
  },
  propMaterialFidelity: {
    geometryDetail: input.propMaterialFidelity?.geometryDetail ?? "high",
    materialTextureSize: input.propMaterialFidelity?.materialTextureSize ?? 256,
    clipTextureSize: input.propMaterialFidelity?.clipTextureSize ?? 256,
    projectionTextureSize: input.propMaterialFidelity?.projectionTextureSize ?? 128,
    surfaceBreakupIntensity: input.propMaterialFidelity?.surfaceBreakupIntensity ?? 0.82,
    emissiveCueStrength: input.propMaterialFidelity?.emissiveCueStrength ?? 0.34,
    visibleSpawnPropTarget: input.propMaterialFidelity?.visibleSpawnPropTarget ?? 12,
    objectProfiles: input.propMaterialFidelity?.objectProfiles ?? {
      "wall-box": {
        shaderProfile: "painted-panel",
        detailScale: 11.5,
        edgeWear: 0.48,
        grimeBoost: 0.52,
        accentColor: 0xb7925a,
      },
      pipe: {
        shaderProfile: "oxidized-pipe",
        detailScale: 10.2,
        edgeWear: 0.42,
        grimeBoost: 0.44,
        accentColor: 0xb36f34,
      },
      "floor-pipe": {
        shaderProfile: "oxidized-pipe",
        detailScale: 9.4,
        edgeWear: 0.38,
        grimeBoost: 0.54,
        accentColor: 0xa76831,
      },
      cable: {
        shaderProfile: "cable-rib",
        detailScale: 14.5,
        edgeWear: 0.16,
        grimeBoost: 0.18,
        accentColor: 0x58462d,
      },
      vent: {
        shaderProfile: "painted-panel",
        detailScale: 13.2,
        edgeWear: 0.3,
        grimeBoost: 0.28,
        accentColor: 0x86735d,
      },
      "ceiling-duct": {
        shaderProfile: "painted-panel",
        detailScale: 12.6,
        edgeWear: 0.34,
        grimeBoost: 0.36,
        accentColor: 0x93795b,
      },
      "building-facade": {
        shaderProfile: "brick-facade",
        detailScale: 8.6,
        edgeWear: 0.58,
        grimeBoost: 0.62,
        accentColor: 0x9a6a42,
      },
      "utility-crate-stack": {
        shaderProfile: "utility-crate",
        detailScale: 11.8,
        edgeWear: 0.44,
        grimeBoost: 0.38,
        accentColor: 0x87946d,
      },
      "brick-rubble-pile": {
        shaderProfile: "brick-facade",
        detailScale: 7.8,
        edgeWear: 0.62,
        grimeBoost: 0.46,
        accentColor: 0xa27047,
      },
      "loose-floor-slab": {
        shaderProfile: "concrete-slab",
        detailScale: 8.2,
        edgeWear: 0.56,
        grimeBoost: 0.41,
        accentColor: 0x8c8777,
      },
      "ceiling-service-strip": {
        shaderProfile: "oxidized-pipe",
        detailScale: 13.4,
        edgeWear: 0.3,
        grimeBoost: 0.4,
        accentColor: 0xaa8450,
      },
      debris: {
        shaderProfile: "concrete-slab",
        detailScale: 9.2,
        edgeWear: 0.64,
        grimeBoost: 0.34,
        accentColor: 0x7b6853,
      },
      "grass-clump": {
        shaderProfile: "grass-card",
        detailScale: 16.5,
        edgeWear: 0.18,
        grimeBoost: 0.12,
        accentColor: 0x748553,
      },
      "root-strip": {
        shaderProfile: "root-fiber",
        detailScale: 14.2,
        edgeWear: 0.34,
        grimeBoost: 0.22,
        accentColor: 0x7d5d3b,
      },
      rubble: {
        shaderProfile: "concrete-slab",
        detailScale: 8.8,
        edgeWear: 0.64,
        grimeBoost: 0.36,
        accentColor: 0x8b745e,
      },
      "rock-cluster": {
        shaderProfile: "concrete-slab",
        detailScale: 7.9,
        edgeWear: 0.66,
        grimeBoost: 0.42,
        accentColor: 0x756652,
      },
      table: {
        shaderProfile: "corroded-table",
        detailScale: 10.4,
        edgeWear: 0.4,
        grimeBoost: 0.34,
        accentColor: 0xa28158,
      },
      crate: {
        shaderProfile: "utility-crate",
        detailScale: 10.6,
        edgeWear: 0.46,
        grimeBoost: 0.32,
        accentColor: 0x8fa07d,
      },
      "lamp-post": {
        shaderProfile: "oxidized-pipe",
        detailScale: 10.8,
        edgeWear: 0.48,
        grimeBoost: 0.46,
        accentColor: 0xc7a16a,
      },
      "pedestal-dressing": {
        shaderProfile: "painted-panel",
        detailScale: 11.2,
        edgeWear: 0.22,
        grimeBoost: 0.18,
        accentColor: 0xc0b07a,
      },
    },
  },
  sceneBundles: {
    enabled: input.sceneBundles?.enabled ?? true,
    maxBundles: input.sceneBundles?.maxBundles ?? 18,
    bundleKinds: input.sceneBundles?.bundleKinds ?? [
      "utility-bay",
      "collapse-cluster",
      "ceiling-service-run",
      "spawn-landmark",
    ],
  },
  texturePlacement: {
    maxTextures: input.texturePlacement?.maxTextures ?? 260,
    grimeDensity: input.texturePlacement?.grimeDensity ?? 0.54,
    stainDensity: input.texturePlacement?.stainDensity ?? 0.32,
    projectionOffset: input.texturePlacement?.projectionOffset ?? 0.035,
    allowedSurfaces: input.texturePlacement?.allowedSurfaces ?? ["wall", "floor", "ceiling", "anomaly"],
  },
  sceneDressing: {
    density: input.sceneDressing?.density ?? "medium",
    seedMode: input.sceneDressing?.seedMode ?? "maze-seed",
    placementRules: input.sceneDressing?.placementRules ?? [
      "walkable-cell-only",
      "wall-adjacent-props",
      "no-collision-blocking",
      "seeded-distribution",
    ],
  },
  lightingDescriptor: {
    mood: input.lightingDescriptor?.mood ?? "overgrown-broken-city-horror",
    ambientColor: input.lightingDescriptor?.ambientColor ?? 0x9a8a6d,
    playerFollowLight: input.lightingDescriptor?.playerFollowLight ?? true,
    flickerEnabled: input.lightingDescriptor?.flickerEnabled ?? false,
  },
  lightingPlacement: {
    maxLights: input.lightingPlacement?.maxLights ?? 28,
    coverageSamples: input.lightingPlacement?.coverageSamples ?? 96,
    readabilityTarget: input.lightingPlacement?.readabilityTarget ?? 0.58,
    intensity: input.lightingPlacement?.intensity ?? 1.55,
    range: input.lightingPlacement?.range ?? CELL_SIZE * 6.2,
    bezierPaths: {
      enabled: input.lightingPlacement?.bezierPaths?.enabled ?? true,
      sampleCount: input.lightingPlacement?.bezierPaths?.sampleCount ?? 7,
      sag: input.lightingPlacement?.bezierPaths?.sag ?? CELL_SIZE * 5.5,
      color: input.lightingPlacement?.bezierPaths?.color ?? 0xb48a55,
      intensity: input.lightingPlacement?.bezierPaths?.intensity ?? 1.05,
      range: input.lightingPlacement?.bezierPaths?.range ?? CELL_SIZE * 5.1,
    },
    allowedKinds: input.lightingPlacement?.allowedKinds ?? ["fill", "accent", "anomaly", "prop"],
  },
  flashlight: {
    enabled: input.flashlight?.enabled ?? true,
    color: input.flashlight?.color ?? 0xffddb0,
    intensity: input.flashlight?.intensity ?? 13.4,
    range: input.flashlight?.range ?? CELL_SIZE * 9.2,
    angle: input.flashlight?.angle ?? Math.PI / 4.9,
    penumbra: input.flashlight?.penumbra ?? 0.64,
    decay: input.flashlight?.decay ?? 1.35,
    floatOffset: {
      x: input.flashlight?.floatOffset?.x ?? CELL_SIZE * 0.24,
      y: input.flashlight?.floatOffset?.y ?? -0.2,
      z: input.flashlight?.floatOffset?.z ?? -0.42,
    },
  },
  walkthrough: {
    enabled: input.walkthrough?.enabled ?? true,
    checkpointCount: input.walkthrough?.checkpointCount ?? 8,
    routeSampleSpacing: input.walkthrough?.routeSampleSpacing ?? 16,
    checks: input.walkthrough?.checks ?? [
      "spawn-readability",
      "first-branch",
      "cube-route",
      "anomaly-route",
    ],
  },
  sceneGeneration: {
    enabled: input.sceneGeneration?.enabled ?? true,
    seed: input.sceneGeneration?.seed ?? "horror-corridor-industrial-dread",
    maxDecorations: input.sceneGeneration?.maxDecorations ?? 430,
    descriptorOnly: input.sceneGeneration?.descriptorOnly ?? true,
  },
  renderValidation: {
    noHudDuringPlaying: input.renderValidation?.noHudDuringPlaying ?? true,
    requireNonBlankCanvas: input.renderValidation?.requireNonBlankCanvas ?? true,
    minimumPropCount: input.renderValidation?.minimumPropCount ?? 48,
    minimumDecalCount: input.renderValidation?.minimumDecalCount ?? 1,
    minimumTextureCount: input.renderValidation?.minimumTextureCount ?? 96,
    minimumLightCount: input.renderValidation?.minimumLightCount ?? 8,
    readableSpawnView: input.renderValidation?.readableSpawnView ?? true,
  },
});

export const createHorrorCorridorContentPacks = (preset: HorrorCorridorPreset) =>
  createHorrorContentPackManifest([
    defineHorrorContentPack({
      id: "base-corridor-pack",
      version: "0.0.1",
      config: {
        maze: preset.maze,
        gridField: preset.gridField,
        raymarchSampling: preset.raymarchSampling,
        triangleSurfaceSampler: preset.triangleSurfaceSampler,
        socketGraph: preset.socketGraph,
        lightingDescriptor: preset.lightingDescriptor,
      },
    }),
    defineHorrorContentPack({
      id: "anomaly-sequence-pack",
      version: "0.0.1",
      dependsOn: ["base-corridor-pack"],
      config: {
        sequenceObjective: preset.sequenceObjective,
        spatialInteraction: preset.spatialInteraction,
        inventory: preset.inventory,
      },
    }),
    defineHorrorContentPack({
      id: "ooze-decal-pack",
      version: "0.0.1",
      dependsOn: ["base-corridor-pack"],
      config: {
        trailDecal: preset.trailDecal,
      },
    }),
    defineHorrorContentPack({
      id: "industrial-dread-props-pack",
      version: "0.0.1",
      dependsOn: ["base-corridor-pack"],
      config: {
        propDescriptor: preset.propDescriptor,
        terrainField: preset.terrainField,
        terrainShader: preset.terrainShader,
        grassObjectSpawn: preset.grassObjectSpawn,
        corridorTile: preset.corridorTile,
        brokenCityWall: preset.brokenCityWall,
        smallObjectKits: preset.smallObjectKits,
        proceduralTextureKits: preset.proceduralTextureKits,
        openSkyProjection: preset.openSkyProjection,
        sceneDressing: preset.sceneDressing,
        objectPlacement: preset.objectPlacement,
        footprintLayout: preset.footprintLayout,
        proceduralPbrMaterial: preset.proceduralPbrMaterial,
        propMaterialFidelity: preset.propMaterialFidelity,
        sceneBundles: preset.sceneBundles,
        texturePlacement: preset.texturePlacement,
        lightingPlacement: preset.lightingPlacement,
        flashlight: preset.flashlight,
        sceneGeneration: preset.sceneGeneration,
      },
    }),
    defineHorrorContentPack({
      id: "walkthrough-pack",
      version: "0.0.1",
      dependsOn: ["base-corridor-pack", "industrial-dread-props-pack"],
      config: {
        walkthrough: preset.walkthrough,
      },
    }),
    defineHorrorContentPack({
      id: "validation-pack",
      version: "0.0.1",
      dependsOn: [
        "base-corridor-pack",
        "anomaly-sequence-pack",
        "ooze-decal-pack",
        "industrial-dread-props-pack",
        "walkthrough-pack",
      ],
      config: {
        renderValidation: preset.renderValidation,
      },
    }),
  ]);
