export type CorridorLampPartDomain =
  | "foundation"
  | "pole"
  | "armature"
  | "lamp-head"
  | "cable-conduit"
  | "fastener"
  | "material"
  | "light"
  | "validation";

export type CorridorLampPartTransform = Readonly<{
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  scale: readonly [number, number, number];
}>;

export type CorridorLampPartDescriptor = Readonly<{
  id: string;
  domain: CorridorLampPartDomain;
  shape: string;
  transform: CorridorLampPartTransform;
  materialProfile: string;
  tags: readonly string[];
}>;

export type CorridorLampPartProfileConfig = Readonly<{
  enabled: boolean;
  referenceTraits: readonly string[];
  descriptors: readonly CorridorLampPartDescriptor[];
  validation: Readonly<{
    minOrbitScore: number;
    requiredViews: readonly string[];
    firstFailureHint: string;
  }>;
}>;

