export type CeilingCollapseConfig = Readonly<{
  fracturePathCount: number;
  edgeFragmentCount: number;
  rubbleClusterCount: number;
  estimatedRubblePieceCount: number;
  maximumPileHeight: number;
  routeClearance: number;
  skyExposure: number;
}>;

export type CeilingSurfaceConfig = Readonly<{
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

export type CeilingCollapseState = Readonly<{
  schema: "horror-corridor.ceiling-collapse/1";
  seed: string;
  ceiling: Readonly<{
    span: Readonly<{
      length: number;
      width: number;
    }>;
    height: number;
    stability: "localized-collapse";
    surface: Readonly<{
      body: Readonly<{
        construction: "reinforced-concrete-and-brick";
        primaryMaterial: "damp-concrete";
        exposedMaterial: "broken-brick";
      }>;
      condition: Readonly<{
        profile: "damp-spalled-masonry";
        dampness: number;
        mineralBloom: number;
        mossStrength: number;
      }>;
      pattern: Readonly<{
        seams: Readonly<{
          scale: number;
          width: number;
        }>;
        aggregate: Readonly<{
          scale: number;
          exposure: number;
        }>;
      }>;
      response: Readonly<{
        roughnessRange: readonly [number, number];
        surfaceRelief: number;
      }>;
    }>;
  }>;
  opening: Readonly<{
    openingBounds: Readonly<{
      start: number;
      length: number;
      width: number;
    }>;
    skyExposure: number;
    fallingDebris: "settled";
  }>;
  cracking: Readonly<{
    crackPaths: Readonly<{
      mode: "aperture-radial";
      count: number;
      edgeFragmentCount: number;
    }>;
    crackWidths: Readonly<{
      minimum: number;
      maximum: number;
    }>;
    activeMovement: false;
  }>;
  rubble: Readonly<{
    rubbleAreas: Readonly<{
      mode: "collapse-edge";
      clusterCount: number;
    }>;
    pileHeights: Readonly<{
      average: number;
      maximum: number;
    }>;
    passability: Readonly<{
      mode: "route-clear";
      clearance: number;
    }>;
  }>;
  fallenMasonry: Readonly<{
    fallenMasonry: Readonly<{
      estimatedPieceCount: number;
      materials: readonly ["broken-brick", "damp-concrete"];
    }>;
    sourceStructures: readonly ["collapsed-ceiling-aperture"];
    settlement: Readonly<{
      mode: "edge-settled";
      active: false;
    }>;
  }>;
}>;

type CeilingCollapseInput = Readonly<{
  seed: string | number;
  chamberLength: number;
  chamberWidth: number;
  chamberHeight: number;
  openingStart: number;
  openingLength: number;
  openingWidth: number;
  surface: CeilingSurfaceConfig;
  config: CeilingCollapseConfig;
}>;

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : minimum));

const positive = (value: number, minimum = 0.01): number =>
  Math.max(minimum, Number.isFinite(value) ? value : minimum);

const count = (value: number, minimum = 0): number =>
  Math.max(minimum, Math.floor(Number.isFinite(value) ? value : minimum));

export const createCeilingCollapseState = (
  input: CeilingCollapseInput,
): CeilingCollapseState => {
  const config = input.config;
  const rubbleClusterCount = count(config.rubbleClusterCount, 1);
  const maximumPileHeight = positive(config.maximumPileHeight);

  return Object.freeze({
    schema: "horror-corridor.ceiling-collapse/1",
    seed: String(input.seed),
    ceiling: Object.freeze({
      span: Object.freeze({
        length: positive(input.chamberLength),
        width: positive(input.chamberWidth),
      }),
      height: positive(input.chamberHeight),
      stability: "localized-collapse",
      surface: Object.freeze({
        body: Object.freeze({
          construction: input.surface.construction,
          primaryMaterial: "damp-concrete",
          exposedMaterial: "broken-brick",
        }),
        condition: Object.freeze({
          profile: input.surface.condition,
          dampness: clamp(input.surface.dampness, 0, 1),
          mineralBloom: clamp(input.surface.mineralBloom, 0, 1),
          mossStrength: clamp(input.surface.mossStrength, 0, 1),
        }),
        pattern: Object.freeze({
          seams: Object.freeze({
            scale: positive(input.surface.seamScale),
            width: positive(input.surface.seamWidth, 0.001),
          }),
          aggregate: Object.freeze({
            scale: positive(input.surface.aggregateScale),
            exposure: clamp(input.surface.aggregateExposure, 0, 1),
          }),
        }),
        response: Object.freeze({
          roughnessRange: Object.freeze([
            clamp(input.surface.roughnessRange[0], 0, 1),
            clamp(input.surface.roughnessRange[1], 0, 1),
          ] as const),
          surfaceRelief: clamp(input.surface.surfaceRelief, 0, 1),
        }),
      }),
    }),
    opening: Object.freeze({
      openingBounds: Object.freeze({
        start: Math.max(0, Number.isFinite(input.openingStart) ? input.openingStart : 0),
        length: positive(input.openingLength),
        width: positive(input.openingWidth),
      }),
      skyExposure: clamp(config.skyExposure, 0, 1),
      fallingDebris: "settled",
    }),
    cracking: Object.freeze({
      crackPaths: Object.freeze({
        mode: "aperture-radial",
        count: count(config.fracturePathCount, 1),
        edgeFragmentCount: count(config.edgeFragmentCount, 1),
      }),
      crackWidths: Object.freeze({
        minimum: 0.018,
        maximum: 0.072,
      }),
      activeMovement: false,
    }),
    rubble: Object.freeze({
      rubbleAreas: Object.freeze({
        mode: "collapse-edge",
        clusterCount: rubbleClusterCount,
      }),
      pileHeights: Object.freeze({
        average: Number((maximumPileHeight * 0.58).toFixed(3)),
        maximum: maximumPileHeight,
      }),
      passability: Object.freeze({
        mode: "route-clear",
        clearance: positive(config.routeClearance),
      }),
    }),
    fallenMasonry: Object.freeze({
      fallenMasonry: Object.freeze({
        estimatedPieceCount: count(config.estimatedRubblePieceCount, rubbleClusterCount),
        materials: Object.freeze(["broken-brick", "damp-concrete"] as const),
      }),
      sourceStructures: Object.freeze(["collapsed-ceiling-aperture"] as const),
      settlement: Object.freeze({
        mode: "edge-settled",
        active: false,
      }),
    }),
  });
};
