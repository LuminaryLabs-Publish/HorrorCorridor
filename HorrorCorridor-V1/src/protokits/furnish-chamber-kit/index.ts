import {
  createHorrorDomainToken,
  defineHorrorDomainKit,
  type HorrorDomainKit,
} from "../domainKit";

export type FurnishedChamberVector = Readonly<{
  x: number;
  y: number;
  z: number;
}>;

export type FurnishedChamberSurfaceDescriptor = Readonly<{
  id: string;
  role:
    | "boundary"
    | "shelter"
    | "service-rib"
    | "threshold"
    | "daylight-breach"
    | "route-pedestal"
    | "route-paving"
    | "standing-water"
    | "wet-ground"
    | "masonry-detail";
  shape: "box" | "plane";
  size: FurnishedChamberVector;
  position: FurnishedChamberVector;
  rotation: FurnishedChamberVector;
  materialFamily: string;
  tags: readonly string[];
}>;

export type FurnishedChamberPropDescriptor = Readonly<{
  id: string;
  kind: string;
  position: FurnishedChamberVector;
  rotationY: number;
  scale: FurnishedChamberVector;
  surface: "wall" | "floor" | "ceiling" | "anomaly";
  materialFamily: string;
  tags: readonly string[];
}>;

export type FurnishedChamberTextureDescriptor = Readonly<{
  id: string;
  kind: string;
  position: FurnishedChamberVector;
  rotation: FurnishedChamberVector;
  scale: FurnishedChamberVector;
  surface: "wall" | "floor" | "ceiling" | "anomaly";
  color: number;
  opacity: number;
}>;

export type FurnishedChamberMeshObjectDescriptor = Readonly<{
  id: string;
  objectKitId: string;
  position: FurnishedChamberVector;
  rotation: FurnishedChamberVector;
  scale: FurnishedChamberVector;
  tags: readonly string[];
}>;

export type FurnishedChamberRelicDescriptor = Readonly<{
  id: string;
  position: FurnishedChamberVector;
  scale: FurnishedChamberVector;
  color: number;
  opacity: number;
  floatDistance: number;
  floatFrequency: number;
  spinSpeed: number;
  tags: readonly string[];
}>;

export type FurnishedChamberLightDescriptor = Readonly<{
  id: string;
  role: "warm-landmark" | "daylight-breach" | "route-relic";
  position: FurnishedChamberVector;
  color: number;
  intensity: number;
  range: number;
  decay: number;
  flickerAmount: number;
  flickerFrequency: number;
}>;

export type FurnishChamberKitConfig = Readonly<{
  enabled: boolean;
  targetId: string;
  bounds: Readonly<{
    length: number;
    width: number;
    height: number;
  }>;
  thresholdDepth: number;
  daylightBreach: Readonly<{
    start: number;
    length: number;
    color: number;
    intensity: number;
  }>;
  wetGround: Readonly<{
    coverage: number;
    puddleCount: number;
  }>;
  serviceBay: Readonly<{
    position: FurnishedChamberVector;
    warmColor: number;
    intensity: number;
  }>;
  routeRelic: Readonly<{
    position: FurnishedChamberVector;
    color: number;
    intensity: number;
  }>;
  overgrowth: Readonly<{
    density: number;
    reach: number;
  }>;
  ceilingSurface: Readonly<{
    construction: "reinforced-concrete-and-brick";
    condition: "damp-spalled-masonry";
    concretePalette: readonly [number, number, number];
    decayPalette: readonly [number, number, number];
    mossPalette: readonly [number, number, number];
    roughnessRange: readonly [number, number];
    seamScale: number;
    seamWidth: number;
    aggregateScale: number;
    aggregateExposure: number;
    dampness: number;
    mineralBloom: number;
    mossStrength: number;
    surfaceRelief: number;
  }>;
  collapseDamage: Readonly<{
    fracturePathCount: number;
    edgeFragmentCount: number;
    rubbleClusterCount: number;
    estimatedRubblePieceCount: number;
    maximumPileHeight: number;
    routeClearance: number;
    skyExposure: number;
  }>;
}>;

export type FurnishedChamberManifest = Readonly<{
  kitId: "furnish-chamber-kit";
  targetId: string;
  enabled: boolean;
  surfaces: readonly FurnishedChamberSurfaceDescriptor[];
  props: readonly FurnishedChamberPropDescriptor[];
  textures: readonly FurnishedChamberTextureDescriptor[];
  meshObjects: readonly FurnishedChamberMeshObjectDescriptor[];
  relics: readonly FurnishedChamberRelicDescriptor[];
  lights: readonly FurnishedChamberLightDescriptor[];
}>;

const ZERO_ROTATION = Object.freeze({ x: 0, y: 0, z: 0 });
const FLOOR_ROTATION = Object.freeze({ x: -Math.PI / 2, y: 0, z: 0 });

const vector = (x: number, y: number, z: number): FurnishedChamberVector =>
  Object.freeze({ x, y, z });

const tagsFor = (targetId: string, ...tags: string[]): readonly string[] =>
  Object.freeze(["furnished-chamber", `visual-target:${targetId}`, ...tags]);

const assertPositive = (value: number, label: string): void => {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Furnish chamber ${label} must be a positive finite number.`);
  }
};

const assertConfig = (config: FurnishChamberKitConfig): void => {
  if (config.targetId.trim().length === 0) {
    throw new Error("Furnish chamber targetId cannot be empty.");
  }
  assertPositive(config.bounds.length, "length");
  assertPositive(config.bounds.width, "width");
  assertPositive(config.bounds.height, "height");
  assertPositive(config.thresholdDepth, "thresholdDepth");
  assertPositive(config.daylightBreach.length, "daylight breach length");
  assertPositive(config.wetGround.puddleCount, "puddleCount");
  assertPositive(config.collapseDamage.fracturePathCount, "fracturePathCount");
  assertPositive(config.collapseDamage.edgeFragmentCount, "edgeFragmentCount");
  assertPositive(config.collapseDamage.rubbleClusterCount, "rubbleClusterCount");
  assertPositive(
    config.collapseDamage.estimatedRubblePieceCount,
    "estimatedRubblePieceCount",
  );
  assertPositive(config.collapseDamage.maximumPileHeight, "maximumPileHeight");
  assertPositive(config.collapseDamage.routeClearance, "routeClearance");
  assertPositive(config.ceilingSurface.seamScale, "ceiling seamScale");
  assertPositive(config.ceilingSurface.seamWidth, "ceiling seamWidth");
  assertPositive(config.ceilingSurface.aggregateScale, "ceiling aggregateScale");
  const ceilingSurfaceUnitValues = [
    config.ceilingSurface.aggregateExposure,
    config.ceilingSurface.dampness,
    config.ceilingSurface.mineralBloom,
    config.ceilingSurface.mossStrength,
    config.ceilingSurface.surfaceRelief,
  ];
  if (ceilingSurfaceUnitValues.some((value) => value < 0 || value > 1)) {
    throw new Error("Furnish chamber ceiling surface strengths must be between 0 and 1.");
  }
  if (
    config.ceilingSurface.roughnessRange[0] < 0 ||
    config.ceilingSurface.roughnessRange[1] > 1 ||
    config.ceilingSurface.roughnessRange[0] >
      config.ceilingSurface.roughnessRange[1]
  ) {
    throw new Error("Furnish chamber ceiling roughness range must be ordered between 0 and 1.");
  }
  if (
    config.collapseDamage.skyExposure < 0 ||
    config.collapseDamage.skyExposure > 1
  ) {
    throw new Error("Furnish chamber collapse skyExposure must be between 0 and 1.");
  }
  if (config.overgrowth.density < 0 || config.overgrowth.density > 1) {
    throw new Error("Furnish chamber overgrowth density must be between 0 and 1.");
  }
};

export const createFurnishedChamberManifest = (
  config: FurnishChamberKitConfig,
): FurnishedChamberManifest => {
  assertConfig(config);

  const { length, width, height } = config.bounds;
  const halfWidth = width * 0.5;
  const wallThickness = Math.max(0.18, width * 0.022);
  const wallCenters = [0.11, 0.31, 0.51, 0.71, 0.89].map(
    (fraction) => length * fraction,
  );
  const leftHeights = [0.86, 0.96, 0.82, 0.72, 0.88];
  const rightHeights = [0.8, 0.7, 0.91, 0.66, 0.84];
  const surfaces: FurnishedChamberSurfaceDescriptor[] = [];

  const addMasonryBoundary = (
    side: "left" | "right",
    x: number,
    index: number,
    segmentLength: number,
    totalHeight: number,
    primaryMaterial: string,
  ): void => {
    const sideSign = side === "left" ? -1 : 1;
    const lowerHeight = totalHeight * (0.52 + (index % 2) * 0.035);
    const crownAHeight = totalHeight * (0.34 + ((index + 1) % 2) * 0.045);
    const crownBHeight = totalHeight * (0.23 + (index % 3) * 0.035);
    const boundaryTags = tagsFor(
      config.targetId,
      `${side}-boundary`,
      "broken-silhouette",
      "masonry-body",
    );

    surfaces.push(
      {
        id: `chamber-${side}-boundary-${index}-lower`,
        role: "boundary",
        shape: "box",
        size: vector(segmentLength, lowerHeight, wallThickness),
        position: vector(x, lowerHeight * 0.5, sideSign * halfWidth),
        rotation: vector(0, 0, sideSign * (index - 2) * 0.006),
        materialFamily: primaryMaterial,
        tags: boundaryTags,
      },
      {
        id: `chamber-${side}-boundary-${index}-crown-a`,
        role: "boundary",
        shape: "box",
        size: vector(segmentLength * 0.58, crownAHeight, wallThickness * 1.04),
        position: vector(
          x - segmentLength * 0.18,
          lowerHeight + crownAHeight * 0.5 - totalHeight * 0.025,
          sideSign * halfWidth,
        ),
        rotation: vector(0, 0, sideSign * (index - 1) * 0.014),
        materialFamily: primaryMaterial,
        tags: boundaryTags,
      },
      {
        id: `chamber-${side}-boundary-${index}-crown-b`,
        role: "boundary",
        shape: "box",
        size: vector(segmentLength * 0.3, crownBHeight, wallThickness * 1.08),
        position: vector(
          x + segmentLength * 0.31,
          lowerHeight + crownBHeight * 0.5 - totalHeight * 0.015,
          sideSign * halfWidth,
        ),
        rotation: vector(0, 0, sideSign * (2 - index) * 0.018),
        materialFamily: index % 2 === 0 ? "aged-concrete" : "broken-brick",
        tags: boundaryTags,
      },
    );

    if (index === 1 || index === 3) {
      const buttressHeight = totalHeight * 0.72;
      surfaces.push({
        id: `chamber-${side}-boundary-${index}-buttress`,
        role: "boundary",
        shape: "box",
        size: vector(segmentLength * 0.16, buttressHeight, wallThickness * 3.2),
        position: vector(
          x - segmentLength * 0.32,
          buttressHeight * 0.5,
          sideSign * (halfWidth - wallThickness * 1.08),
        ),
        rotation: vector(0, sideSign * 0.035, sideSign * 0.012),
        materialFamily: "aged-concrete",
        tags: tagsFor(config.targetId, `${side}-boundary`, "buttress", "depth-break"),
      });
    }
  };

  wallCenters.forEach((x, index) => {
    const segmentLength = length * (index === wallCenters.length - 1 ? 0.17 : 0.18);
    addMasonryBoundary(
      "left",
      x,
      index,
      segmentLength,
      height * leftHeights[index],
      index < 3 ? "broken-brick" : "aged-concrete",
    );
    addMasonryBoundary(
      "right",
      x,
      index,
      segmentLength,
      height * rightHeights[index],
      index === 1 || index === 3 ? "broken-brick" : "aged-concrete",
    );
  });

  surfaces.push(
    {
      id: "chamber-near-shelter",
      role: "shelter",
      shape: "box",
      size: vector(length * 0.3, wallThickness * 1.2, width * 0.96),
      position: vector(length * 0.15, height * 0.88, 0),
      rotation: vector(0, 0, 0.008),
      materialFamily: "ceiling-concrete",
      tags: tagsFor(
        config.targetId,
        "near-shelter",
        "low-entry",
        "damp-spalled-masonry",
        "aggregate-exposed",
        "mineral-bloom",
      ),
    },
    {
      id: "chamber-open-sky",
      role: "daylight-breach",
      shape: "plane",
      size: vector(config.daylightBreach.length * 0.9, 0, width * 0.34),
      position: vector(
        config.daylightBreach.start + config.daylightBreach.length * 0.48,
        height * 1.04,
        -width * 0.015,
      ),
      rotation: FLOOR_ROTATION,
      materialFamily: "cold-sky",
      tags: tagsFor(config.targetId, "open-sky", "cold-depth"),
    },
  );

  const breachEnd = Math.min(
    length,
    config.daylightBreach.start + config.daylightBreach.length,
  );
  const farShelterLength = Math.max(0, length - breachEnd);
  if (farShelterLength > 0.4) {
    surfaces.push(
      {
        id: "chamber-far-shelter-left",
        role: "shelter",
        shape: "box",
        size: vector(farShelterLength, wallThickness * 1.18, width * 0.49),
        position: vector(
          breachEnd + farShelterLength * 0.5,
          height * 0.9,
          -width * 0.255,
        ),
        rotation: vector(0, 0, -0.014),
        materialFamily: "ceiling-concrete",
        tags: tagsFor(
          config.targetId,
          "far-shelter",
          "intact-roof",
          "left-shelter",
          "damp-spalled-masonry",
          "aggregate-exposed",
          "mineral-bloom",
        ),
      },
      {
        id: "chamber-far-shelter-right",
        role: "shelter",
        shape: "box",
        size: vector(farShelterLength * 0.94, wallThickness * 1.08, width * 0.47),
        position: vector(
          breachEnd + farShelterLength * 0.53,
          height * 0.885,
          width * 0.265,
        ),
        rotation: vector(0, Math.PI, 0.022),
        materialFamily: "broken-brick",
        tags: tagsFor(
          config.targetId,
          "far-shelter",
          "damaged-roof",
          "right-shelter",
          "damp-spalled-masonry",
          "exposed-brick",
          "mineral-bloom",
        ),
      },
    );
  }

  const serviceRibs: readonly Readonly<{
    id: string;
    size: FurnishedChamberVector;
    position: FurnishedChamberVector;
    rotation: FurnishedChamberVector;
    tags: readonly string[];
  }>[] = [
    {
      id: "chamber-service-rib-far",
      size: vector(wallThickness * 1.14, wallThickness * 1.28, width * 0.82),
      position: vector(breachEnd + 0.46, height * 0.845, -width * 0.04),
      rotation: vector(-0.018, 0.012, -0.025),
      tags: ["far-shelter", "weathered-span"],
    },
  ];
  for (const rib of serviceRibs) {
    surfaces.push({
      id: rib.id,
      role: "service-rib",
      shape: "box",
      size: rib.size,
      position: rib.position,
      rotation: rib.rotation,
      materialFamily: "dark-metal",
      tags: tagsFor(config.targetId, "overhead-rib", "service-remnant", ...rib.tags),
    });
  }

  const thresholdX = length - config.thresholdDepth * 0.5;
  surfaces.push(
    {
      id: "chamber-threshold-left",
      role: "threshold",
      shape: "box",
      size: vector(config.thresholdDepth, height * 0.82, width * 0.24),
      position: vector(thresholdX, height * 0.41, -width * 0.38),
      rotation: ZERO_ROTATION,
      materialFamily: "aged-concrete",
      tags: tagsFor(config.targetId, "far-threshold", "left-pier"),
    },
    {
      id: "chamber-threshold-right",
      role: "threshold",
      shape: "box",
      size: vector(config.thresholdDepth, height * 0.76, width * 0.21),
      position: vector(thresholdX, height * 0.38, width * 0.395),
      rotation: ZERO_ROTATION,
      materialFamily: "broken-brick",
      tags: tagsFor(config.targetId, "far-threshold", "right-pier"),
    },
    {
      id: "chamber-threshold-lintel",
      role: "threshold",
      shape: "box",
      size: vector(config.thresholdDepth * 0.9, height * 0.1, width * 0.72),
      position: vector(thresholdX, height * 0.78, -width * 0.08),
      rotation: vector(-0.035, 0, -0.055),
      materialFamily: "aged-concrete",
      tags: tagsFor(config.targetId, "far-threshold", "collapsed-lintel"),
    },
    {
      id: "chamber-route-pedestal-foot",
      role: "route-pedestal",
      shape: "box",
      size: vector(0.92, 0.18, 0.92),
      position: vector(
        config.routeRelic.position.x,
        0.09,
        config.routeRelic.position.z,
      ),
      rotation: vector(0, 0.1, 0),
      materialFamily: "dark-metal",
      tags: tagsFor(config.targetId, "route-relic", "pedestal-foot"),
    },
    {
      id: "chamber-route-pedestal-column",
      role: "route-pedestal",
      shape: "box",
      size: vector(0.54, 0.84, 0.54),
      position: vector(
        config.routeRelic.position.x,
        0.58,
        config.routeRelic.position.z,
      ),
      rotation: vector(0, -0.06, 0),
      materialFamily: "aged-concrete",
      tags: tagsFor(config.targetId, "route-relic", "pedestal-column"),
    },
    {
      id: "chamber-route-pedestal-cap",
      role: "route-pedestal",
      shape: "box",
      size: vector(0.78, 0.14, 0.78),
      position: vector(
        config.routeRelic.position.x,
        1.07,
        config.routeRelic.position.z,
      ),
      rotation: vector(0, 0.04, 0),
      materialFamily: "dark-metal",
      tags: tagsFor(config.targetId, "route-relic", "pedestal-cap"),
    },
  );

  const puddleCount = Math.max(1, Math.floor(config.wetGround.puddleCount));
  for (let index = 0; index < puddleCount; index += 1) {
    const fraction = (index + 1) / (puddleCount + 1);
    const side = index % 2 === 0 ? 1 : -1;
    surfaces.push({
      id: `chamber-standing-water-${index}`,
      role: "standing-water",
      shape: "plane",
      size: vector(
        length * (0.12 + (index % 3) * 0.025),
        0,
        width * (0.13 + ((index + 1) % 3) * 0.035),
      ),
      position: vector(length * fraction, 0.052 + index * 0.001, side * width * (0.08 + fraction * 0.16)),
      rotation: vector(FLOOR_ROTATION.x, side * (0.08 + index * 0.045), 0),
      materialFamily: "standing-water",
      tags: tagsFor(config.targetId, "wet-route", "broken-reflection"),
    });
  }

  surfaces.push(
    {
      id: "chamber-wet-ground-near",
      role: "wet-ground",
      shape: "plane",
      size: vector(length * config.wetGround.coverage * 0.45, 0, width * 0.62),
      position: vector(length * 0.24, 0.044, -width * 0.08),
      rotation: FLOOR_ROTATION,
      materialFamily: "wet-ground",
      tags: tagsFor(config.targetId, "wet-route", "near-ground"),
    },
    {
      id: "chamber-wet-ground-far",
      role: "wet-ground",
      shape: "plane",
      size: vector(length * config.wetGround.coverage * 0.38, 0, width * 0.5),
      position: vector(length * 0.7, 0.046, width * 0.1),
      rotation: vector(FLOOR_ROTATION.x, -0.12, 0),
      materialFamily: "wet-ground",
      tags: tagsFor(config.targetId, "wet-route", "far-ground"),
    },
  );

  for (let row = 0; row < 11; row += 1) {
    const routeX = length * (0.075 + row * 0.074);
    const laneCount = row % 3 === 0 ? 1 : 2;
    for (let lane = 0; lane < laneCount; lane += 1) {
      const laneSign = laneCount === 1 ? 0 : lane === 0 ? -1 : 1;
      const drift = Math.sin(row * 1.73 + lane * 0.8) * width * 0.055;
      const paverLength = length * (0.052 + ((row + lane) % 3) * 0.006);
      const paverWidth = width * (0.075 + ((row + lane + 1) % 3) * 0.01);
      surfaces.push({
        id: `chamber-route-paver-${row}-${lane}`,
        role: "route-paving",
        shape: "box",
        size: vector(paverLength * 1.08, 0.12 + (row % 2) * 0.014, paverWidth * 1.08),
        position: vector(
          routeX + laneSign * paverLength * 0.18,
          0.115 + (row % 2) * 0.009,
          drift + laneSign * width * 0.055,
        ),
        rotation: vector(
          (laneSign || 1) * 0.012,
          Math.sin(row * 2.1 + lane) * 0.16,
          Math.cos(row * 1.4 + lane) * 0.018,
        ),
        materialFamily: (row + lane) % 4 === 0 ? "broken-brick" : "route-stone",
        tags: tagsFor(
          config.targetId,
          "route-paving",
          "displaced-slab",
          row > 7 ? "far-route" : "near-route",
        ),
      });
    }
  }

  [0.08, 0.16, 0.24, 0.61, 0.69, 0.77].forEach((fraction, index) => {
    surfaces.push({
      id: `chamber-masonry-detail-${index}`,
      role: "masonry-detail",
      shape: "box",
      size: vector(length * 0.065, height * 0.075, wallThickness * 0.55),
      position: vector(length * fraction, height * (0.09 + (index % 2) * 0.045), -halfWidth + wallThickness * 0.8),
      rotation: vector(0, 0, (index - 2.5) * 0.008),
      materialFamily: "broken-brick",
      tags: tagsFor(config.targetId, "exposed-masonry", "left-boundary"),
    });
  });

  surfaces.push(
    {
      id: "chamber-threshold-masonry-left",
      role: "masonry-detail",
      shape: "box",
      size: vector(width * 0.2, height * 0.68, wallThickness * 0.78),
      position: vector(
        thresholdX - config.thresholdDepth * 0.54,
        height * 0.39,
        -width * 0.37,
      ),
      rotation: vector(0, -Math.PI / 2, -0.018),
      materialFamily: "broken-brick",
      tags: tagsFor(
        config.targetId,
        "far-threshold",
        "left-jamb",
        "exposed-masonry",
        "route-frame",
      ),
    },
    {
      id: "chamber-threshold-masonry-right",
      role: "masonry-detail",
      shape: "box",
      size: vector(width * 0.18, height * 0.62, wallThickness * 0.78),
      position: vector(
        thresholdX - config.thresholdDepth * 0.55,
        height * 0.35,
        width * 0.385,
      ),
      rotation: vector(0, -Math.PI / 2, 0.022),
      materialFamily: "broken-brick",
      tags: tagsFor(
        config.targetId,
        "far-threshold",
        "right-jamb",
        "exposed-masonry",
        "route-frame",
      ),
    },
  );

  const prop = (
    id: string,
    kind: string,
    position: FurnishedChamberVector,
    rotationY: number,
    scale: FurnishedChamberVector,
    surface: FurnishedChamberPropDescriptor["surface"],
    materialFamily: string,
    ...extraTags: string[]
  ): FurnishedChamberPropDescriptor => ({
    id,
    kind,
    position,
    rotationY,
    scale,
    surface,
    materialFamily,
    tags: tagsFor(config.targetId, ...extraTags),
  });

  const service = config.serviceBay.position;
  const relic = config.routeRelic.position;
  const textures: FurnishedChamberTextureDescriptor[] = [];

  wallCenters.forEach((x, index) => {
    const leftKind = index % 3 === 0
      ? "moss-grime"
      : index % 3 === 1
        ? "rust-streak"
        : "brick-course";
    textures.push(
      {
        id: `chamber-left-weathering-${index}`,
        kind: leftKind,
        position: vector(
          x,
          height * (0.38 + (index % 2) * 0.08),
          -halfWidth + wallThickness * 0.56,
        ),
        rotation: vector(0, 0, (index - 2) * 0.035),
        scale: vector(length * 0.145, height * 0.62, 1),
        surface: "wall",
        color: leftKind === "moss-grime" ? 0x31452a : leftKind === "rust-streak" ? 0x7b4228 : 0x5e3a2a,
        opacity: leftKind === "brick-course" ? 0.42 : 0.5,
      },
      {
        id: `chamber-right-weathering-${index}`,
        kind: index % 2 === 0 ? "moss-grime" : "stain",
        position: vector(
          x,
          height * (0.34 + ((index + 1) % 2) * 0.1),
          halfWidth - wallThickness * 0.56,
        ),
        rotation: vector(0, Math.PI, (2 - index) * 0.03),
        scale: vector(length * 0.14, height * 0.56, 1),
        surface: "wall",
        color: index % 2 === 0 ? 0x2e4329 : 0x241e18,
        opacity: 0.46,
      },
    );
  });

  [0.2, 0.42, 0.64, 0.82].forEach((fraction, index) => {
    textures.push({
      id: `chamber-ground-weathering-${index}`,
      kind: index % 2 === 0 ? "wet-concrete" : "damp-mud",
      position: vector(
        length * fraction,
        0.064 + index * 0.001,
        (index % 2 === 0 ? -1 : 1) * width * 0.12,
      ),
      rotation: vector(-Math.PI / 2, 0, index % 2 === 0 ? 0.12 : -0.16),
      scale: vector(length * 0.18, width * 0.32, 1),
      surface: "floor",
      color: index % 2 === 0 ? 0x353a35 : 0x2f251b,
      opacity: 0.4,
    });
  });

  textures.push(
    {
      id: "chamber-sky-cloud-breakup",
      kind: "stain",
      position: vector(
        config.daylightBreach.start + config.daylightBreach.length * 0.48,
        height * 1.035,
        width * 0.06,
      ),
      rotation: vector(Math.PI / 2, 0, -0.08),
      scale: vector(config.daylightBreach.length * 0.88, width * 0.46, 1),
      surface: "ceiling",
      color: 0x263b47,
      opacity: 0.38,
    },
    {
      id: "chamber-near-shelter-grime",
      kind: "moss-grime",
      position: vector(length * 0.12, height * 0.875, 0),
      rotation: vector(Math.PI / 2, 0, 0.04),
      scale: vector(length * 0.2, width * 0.74, 1),
      surface: "ceiling",
      color: 0x273924,
      opacity: 0.46,
    },
    {
      id: "chamber-service-rust",
      kind: "rust-streak",
      position: vector(service.x, height * 0.62, -halfWidth + wallThickness * 0.58),
      rotation: vector(0, 0, -0.04),
      scale: vector(length * 0.16, height * 0.5, 1),
      surface: "wall",
      color: 0x84472a,
      opacity: 0.52,
    },
  );

  const collapseCenter =
    config.daylightBreach.start + config.daylightBreach.length * 0.48;
  const collapseRubbleProps = [
    prop(
      "chamber-collapse-brick-settlement",
      "brick-rubble-pile",
      vector(collapseCenter - 0.68, 0.02, -width * 0.19),
      0.26,
      vector(0.92, 0.22, 0.62),
      "floor",
      "broken-brick",
      "rubble",
      "fallen-masonry",
      "collapse-settlement",
      "left-route-edge",
    ),
    prop(
      "chamber-collapse-concrete-settlement",
      "rubble",
      vector(collapseCenter + 0.56, 0.02, width * 0.2),
      -0.31,
      vector(0.76, 0.22, 0.56),
      "floor",
      "broken-rubble",
      "rubble",
      "fallen-masonry",
      "collapse-settlement",
      "right-route-edge",
    ),
    prop(
      "chamber-collapse-small-debris",
      "debris",
      vector(collapseCenter + 1.16, 0.02, -width * 0.16),
      0.12,
      vector(0.58, 0.16, 0.42),
      "floor",
      "broken-rubble",
      "rubble",
      "fallen-masonry",
      "collapse-settlement",
      "route-edge",
    ),
  ].slice(0, Math.floor(config.collapseDamage.rubbleClusterCount));

  const props: FurnishedChamberPropDescriptor[] = [
    prop("chamber-service-lamp", "lamp-post", vector(service.x - 0.7, 0, service.z - 0.25), -Math.PI / 2, vector(0.24, 3.1, 0.24), "floor", "rusted-metal", "warm-landmark", "service-bay"),
    prop("chamber-service-pipe", "pipe", vector(service.x - 1.3, height * 0.24, -halfWidth + 0.22), Math.PI / 2, vector(0.16, 0.16, length * 0.3), "wall", "rusted-metal", "service-bay", "wall-utility"),
    prop("chamber-service-cable", "cable", vector(service.x + 0.25, height * 0.58, -halfWidth + 0.2), Math.PI / 2, vector(0.1, 0.1, length * 0.34), "wall", "rubber-cable", "service-bay", "wall-utility"),
    prop("chamber-ceiling-service", "ceiling-service-strip", vector(length * 0.28, height * 0.82, -width * 0.16), Math.PI / 2, vector(1.1, 0.28, 2.5), "ceiling", "rusted-metal", "overhead-service"),
    prop("chamber-left-facade", "building-facade", vector(length * 0.42, 0.02, -halfWidth + 0.26), Math.PI / 2, vector(2.2, height * 0.68, 0.26), "wall", "broken-brick", "wall-breakup", "left-boundary"),
    prop("chamber-right-facade", "building-facade", vector(length * 0.69, 0.02, halfWidth - 0.26), -Math.PI / 2, vector(1.8, height * 0.58, 0.24), "wall", "damp-concrete", "wall-breakup", "right-boundary"),
    prop("chamber-root-near-left", "root-strip", vector(length * 0.16, 0.04, -halfWidth + 0.45), Math.PI / 2, vector(0.22, 0.16, config.overgrowth.reach), "floor", "root-fiber", "overgrowth", "left-edge"),
    prop("chamber-root-far-right", "root-strip", vector(length * 0.65, 0.04, halfWidth - 0.5), -Math.PI / 2, vector(0.2, 0.15, config.overgrowth.reach * 0.84), "floor", "root-fiber", "overgrowth", "right-edge"),
    prop("chamber-root-threshold", "root-strip", vector(length * 0.82, 0.04, -width * 0.18), 0.2, vector(0.18, 0.14, config.overgrowth.reach * 0.72), "floor", "root-fiber", "overgrowth", "threshold"),
    prop("chamber-grass-breach", "grass-clump", vector(config.daylightBreach.start + config.daylightBreach.length * 0.45, 0.02, -width * 0.08), 0.5, vector(1.15, 1.0, 0.9), "floor", "muddy-grass", "overgrowth", "daylight-breach"),
    prop("chamber-vines-near-left", "hanging-vine", vector(length * 0.27, height * 0.96, -halfWidth + 0.32), 0.14, vector(1.05, 2.35, 0.56), "ceiling", "root-fiber", "overgrowth", "left-boundary", "hanging-silhouette"),
    prop("chamber-vines-breach-left", "hanging-vine", vector(config.daylightBreach.start + 0.62, height * 1.01, -width * 0.29), -0.12, vector(1.4, 2.85, 0.68), "ceiling", "root-fiber", "overgrowth", "daylight-breach", "left-collapse-edge"),
    prop("chamber-vines-breach-right", "hanging-vine", vector(config.daylightBreach.start + config.daylightBreach.length * 0.43, height * 0.99, width * 0.26), 0.22, vector(1.22, 2.35, 0.6), "ceiling", "root-fiber", "overgrowth", "daylight-breach", "right-collapse-edge"),
    prop("chamber-vines-far-left", "hanging-vine", vector(config.daylightBreach.start + config.daylightBreach.length * 0.72, height * 0.93, -halfWidth + 0.38), -0.18, vector(1.18, 2.8, 0.58), "ceiling", "root-fiber", "overgrowth", "left-boundary", "far-landmark"),
    prop("chamber-vines-threshold-right", "hanging-vine", vector(length * 0.83, height * 0.88, halfWidth - 0.42), 0.08, vector(1.1, 2.2, 0.5), "ceiling", "root-fiber", "overgrowth", "threshold", "right-boundary"),
    prop("chamber-shelf-crates", "utility-crate-stack", vector(length * 0.2, 0.02, -halfWidth + 1.18), 0.08, vector(1.02, 0.92, 0.84), "floor", "painted-utility", "storage-alcove", "left-boundary"),
    prop("chamber-side-worktable", "table", vector(length * 0.63, 0.02, halfWidth - 0.82), -0.08, vector(1.7, 0.86, 0.78), "floor", "rusted-metal", "offering-alcove", "right-boundary"),
    prop("chamber-worktable-crate", "crate", vector(length * 0.67, 0.04, halfWidth - 1.08), 0.16, vector(0.62, 0.58, 0.56), "floor", "painted-utility", "offering-alcove", "right-boundary"),
    prop("chamber-offering-lamp", "lamp-post", vector(length * 0.65, 0, halfWidth - 0.72), Math.PI / 2, vector(0.2, 2.45, 0.2), "floor", "rusted-metal", "warm-landmark", "offering-alcove"),
    prop("chamber-generator-floor-cable", "floor-pipe", vector(length * 0.43, 0.07, -width * 0.06), 0.12, vector(0.12, 0.12, length * 0.24), "floor", "rubber-cable", "service-bay", "route-edge"),
    prop("chamber-brick-fall", "brick-rubble-pile", vector(length * 0.16, 0.02, -halfWidth + 0.9), 0.18, vector(1.9, 0.42, 1.25), "floor", "broken-brick", "rubble", "left-edge"),
    prop("chamber-threshold-rubble", "rubble", vector(length * 0.76, 0.02, halfWidth - 1.0), -0.25, vector(1.6, 0.48, 1.2), "floor", "broken-rubble", "rubble", "threshold"),
    prop("chamber-route-slabs", "loose-floor-slab", vector(length * 0.5, 0.03, width * 0.12), -0.25, vector(2.1, 0.12, 1.35), "floor", "wet-concrete", "route-breakup"),
    prop("chamber-relic-slabs", "loose-floor-slab", vector(relic.x - 1.3, 0.03, relic.z - 0.45), 0.18, vector(1.55, 0.1, 1.1), "floor", "wet-concrete", "route-relic"),
    ...collapseRubbleProps,
  ];

  const meshObjects: FurnishedChamberMeshObjectDescriptor[] = [
    {
      id: "chamber-collapsed-ceiling",
      objectKitId: "collapsed-ceiling-object-kit",
      position: vector(
        config.daylightBreach.start + config.daylightBreach.length * 0.48,
        height * 0.94,
        0,
      ),
      rotation: ZERO_ROTATION,
      scale: vector(1, 1, 1),
      tags: tagsFor(
        config.targetId,
        "daylight-breach",
        "collapsed-ceiling",
        "wall-rooted-aperture",
      ),
    },
    {
      id: "chamber-rusted-service-door",
      objectKitId: "rusted-service-door-object-kit",
      position: vector(service.x + 1.25, 0.02, -halfWidth + 0.18),
      rotation: ZERO_ROTATION,
      scale: vector(1.45, 1.45, 1.45),
      tags: tagsFor(config.targetId, "service-bay", "warm-landmark"),
    },
    {
      id: "chamber-broken-generator",
      objectKitId: "broken-generator-object-kit",
      position: vector(service.x + 0.45, 0.03, service.z + 0.62),
      rotation: vector(0, -0.12, 0),
      scale: vector(1.28, 1.28, 1.28),
      tags: tagsFor(config.targetId, "service-bay", "warm-landmark"),
    },
    {
      id: "chamber-industrial-shelving-near",
      objectKitId: "industrial-shelving-object-kit",
      position: vector(length * 0.16, 0.02, -halfWidth + 0.62),
      rotation: vector(0, 0.04, 0),
      scale: vector(1.34, 1.34, 1.34),
      tags: tagsFor(config.targetId, "storage-alcove", "left-boundary", "former-use"),
    },
    {
      id: "chamber-industrial-shelving-mid",
      objectKitId: "industrial-shelving-object-kit",
      position: vector(length * 0.3, 0.02, -halfWidth + 0.64),
      rotation: vector(0, -0.06, 0),
      scale: vector(1.18, 1.18, 1.18),
      tags: tagsFor(config.targetId, "storage-alcove", "left-boundary", "former-use"),
    },
    {
      id: "chamber-storm-drain",
      objectKitId: "storm-drain-culvert-object-kit",
      position: vector(length * 0.49, 0.02, width * 0.2),
      rotation: vector(0, -Math.PI / 2, 0),
      scale: vector(1.12, 1.12, 1.12),
      tags: tagsFor(config.targetId, "drainage", "wet-route", "right-edge"),
    },
    {
      id: "chamber-hanging-chain",
      objectKitId: "hanging-chain-hook-object-kit",
      position: vector(length * 0.7, height - 2.18, width * 0.3),
      rotation: vector(0, 0.18, -0.04),
      scale: vector(1.2, 1.2, 1.2),
      tags: tagsFor(config.targetId, "overhead-detail", "right-boundary", "silhouette"),
    },
    {
      id: "chamber-barrel-cluster",
      objectKitId: "barrel-cluster-object-kit",
      position: vector(length * 0.78, 0.02, halfWidth - 0.9),
      rotation: vector(0, -0.24, 0),
      scale: vector(1.08, 1.08, 1.08),
      tags: tagsFor(config.targetId, "storage-clutter", "right-boundary", "wet-route"),
    },
    {
      id: "chamber-threshold-fence",
      objectKitId: "chain-link-fence-object-kit",
      position: vector(length * 0.86, 0.02, halfWidth - 0.3),
      rotation: vector(0, -Math.PI / 2, 0),
      scale: vector(0.9, 0.9, 0.9),
      tags: tagsFor(config.targetId, "restricted-place", "right-boundary", "far-threshold"),
    },
  ];

  const relics: FurnishedChamberRelicDescriptor[] = [];

  const lights: FurnishedChamberLightDescriptor[] = [
    {
      id: "chamber-warm-service-light",
      role: "warm-landmark",
      position: vector(service.x, service.y, service.z),
      color: config.serviceBay.warmColor,
      intensity: config.serviceBay.intensity,
      range: width * 0.92,
      decay: 2.05,
      flickerAmount: 0.22,
      flickerFrequency: 0.0043,
    },
    {
      id: "chamber-cold-breach-light",
      role: "daylight-breach",
      position: vector(config.daylightBreach.start + config.daylightBreach.length * 0.55, height * 1.06, width * 0.08),
      color: config.daylightBreach.color,
      intensity: config.daylightBreach.intensity,
      range: width * 2.15,
      decay: 1.7,
      flickerAmount: 0.04,
      flickerFrequency: 0.0012,
    },
    {
      id: "chamber-warm-offering-light",
      role: "warm-landmark",
      position: vector(length * 0.65, height * 0.42, halfWidth - 0.88),
      color: 0xf0a45d,
      intensity: 2.35,
      range: width * 0.68,
      decay: 2.05,
      flickerAmount: 0.12,
      flickerFrequency: 0.0031,
    },
  ];

  return Object.freeze({
    kitId: "furnish-chamber-kit",
    targetId: config.targetId,
    enabled: config.enabled,
    surfaces: Object.freeze(surfaces),
    props: Object.freeze(props),
    textures: Object.freeze(textures),
    meshObjects: Object.freeze(meshObjects),
    relics: Object.freeze(relics),
    lights: Object.freeze(lights),
  });
};

export const createFurnishChamberKit = (
  config: FurnishChamberKitConfig,
): HorrorDomainKit => {
  createFurnishedChamberManifest(config);

  return defineHorrorDomainKit({
    id: "furnish-chamber-kit",
    domain: "chamber-furnishing",
    apiName: "furnishChamber",
    services: [
      "compose-boundaries",
      "place-landmarks",
      "break-wet-ground",
      "frame-route-relic",
    ],
    requires: [
      createHorrorDomainToken("grid-maze"),
      createHorrorDomainToken("prop-descriptor"),
      createHorrorDomainToken("wound-triangle-mesh"),
      createHorrorDomainToken("lighting-descriptor"),
      createHorrorDomainToken("water-surface"),
      createHorrorDomainToken("building-facade-object"),
      createHorrorDomainToken("pipe-run-object"),
      createHorrorDomainToken("cable-run-object"),
      createHorrorDomainToken("ceiling-service-strip-object"),
      createHorrorDomainToken("utility-crate-object"),
      createHorrorDomainToken("storage-crate-object"),
      createHorrorDomainToken("corroded-table-object"),
      createHorrorDomainToken("corridor-lamp-object"),
      createHorrorDomainToken("brick-rubble-object"),
      createHorrorDomainToken("loose-floor-slab-object"),
      createHorrorDomainToken("debris-scatter-object"),
      createHorrorDomainToken("overgrowth-object"),
      createHorrorDomainToken("rusted-service-door-object"),
      createHorrorDomainToken("broken-generator-object"),
      createHorrorDomainToken("industrial-shelving-object"),
      createHorrorDomainToken("storm-drain-culvert-object"),
      createHorrorDomainToken("hanging-chain-hook-object"),
      createHorrorDomainToken("barrel-cluster-object"),
      createHorrorDomainToken("chain-link-fence-object"),
      createHorrorDomainToken("brick-course-texture"),
      createHorrorDomainToken("damp-mud-texture"),
      createHorrorDomainToken("rust-streak-texture"),
      createHorrorDomainToken("moss-grime-texture"),
      createHorrorDomainToken("wet-concrete-texture"),
    ],
    resources: {
      FurnishedChamberManifest: "chamber.furnishingManifest",
    },
    metadata: {
      purpose: "Compose one readable chamber from natural bounds, shelter, wet ground, overgrowth, landmarks, and route intent before a render host realizes it.",
      targetContract: "furnish-chamber-kit",
      targetOwner:
        "n:horror-corridor:corridor:maze:places:buildings:building:chambers:chamber",
      config,
    },
  });
};
