export type ConcreteIdentityConfig = Readonly<{
  slabScale: number;
  slabJointWidth: number;
  crackScale: number;
  crackWidth: number;
  crackDensity: number;
  aggregateScale: number;
  aggregateExposure: number;
  repairStrength: number;
  surfaceRelief: number;
}>;

export type ConcretePavingState = Readonly<{
  schema: "horror-corridor.concrete-paving/1";
  seed: string;
  concreteAreas: Readonly<{
    basis: "walkable-cells";
    cellCount: number;
    estimatedArea: number;
  }>;
  aggregateExposure: number;
  moisture: number;
  slabMembership: Readonly<{
    mode: "settled-pour-field";
    estimatedCount: number;
  }>;
  slabAlignment: Readonly<{
    mode: "settled-pour-field";
    scale: number;
    jointWidth: number;
    seedPhase: number;
  }>;
  slab: Readonly<{
    body: Readonly<{
      material: "weathered-concrete";
      thickness: number;
      repairStrength: number;
    }>;
    cracks: Readonly<{
      network: "settlement-branching";
      scale: number;
      width: number;
      density: number;
      seedPhase: number;
    }>;
    displacement: Readonly<{
      profile: "settled-irregular";
      maximum: number;
      surfaceRelief: number;
    }>;
    wetness: number;
  }>;
  aggregateScale: number;
}>;

type ConcretePavingInput = Readonly<{
  seed: string | number;
  walkableCellCount: number;
  cellSize: number;
  surfaceThickness: number;
  maximumDisplacement: number;
  moisture: number;
  identity: ConcreteIdentityConfig;
}>;

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : minimum));

const hashSeed = (seed: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const createConcretePavingState = (
  input: ConcretePavingInput,
): ConcretePavingState => {
  const seed = String(input.seed);
  const walkableCellCount = Math.max(0, Math.floor(input.walkableCellCount));
  const cellSize = Math.max(0.01, input.cellSize);
  const identity = input.identity;
  const slabScale = clamp(identity.slabScale, 0.05, 4);
  const slabsPerCell = Math.max(1, Math.round((cellSize * slabScale) ** 2));
  const seedPhase = hashSeed(seed) / 0xffffffff;

  return Object.freeze({
    schema: "horror-corridor.concrete-paving/1",
    seed,
    concreteAreas: Object.freeze({
      basis: "walkable-cells",
      cellCount: walkableCellCount,
      estimatedArea: Number((walkableCellCount * cellSize * cellSize).toFixed(3)),
    }),
    aggregateExposure: clamp(identity.aggregateExposure, 0, 1),
    moisture: clamp(input.moisture, 0, 1),
    slabMembership: Object.freeze({
      mode: "settled-pour-field",
      estimatedCount: walkableCellCount * slabsPerCell,
    }),
    slabAlignment: Object.freeze({
      mode: "settled-pour-field",
      scale: slabScale,
      jointWidth: clamp(identity.slabJointWidth, 0.005, 0.24),
      seedPhase,
    }),
    slab: Object.freeze({
      body: Object.freeze({
        material: "weathered-concrete",
        thickness: Math.max(0.01, input.surfaceThickness),
        repairStrength: clamp(identity.repairStrength, 0, 1),
      }),
      cracks: Object.freeze({
        network: "settlement-branching",
        scale: clamp(identity.crackScale, 0.05, 4),
        width: clamp(identity.crackWidth, 0.005, 0.25),
        density: clamp(identity.crackDensity, 0, 1),
        seedPhase,
      }),
      displacement: Object.freeze({
        profile: "settled-irregular",
        maximum: Math.max(0, input.maximumDisplacement),
        surfaceRelief: clamp(identity.surfaceRelief, 0, 2),
      }),
      wetness: clamp(input.moisture, 0, 1),
    }),
    aggregateScale: clamp(identity.aggregateScale, 0.25, 32),
  });
};
