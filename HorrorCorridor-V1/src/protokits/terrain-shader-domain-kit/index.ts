import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type TerrainShaderDomainKitConfig = Readonly<{
  soilPalette: readonly number[];
  grassPalette: readonly number[];
  concretePalette: readonly number[];
  wetnessResponse: number;
  roughnessRange: readonly [number, number];
  layerScales: Readonly<{
    macro: number;
    detail: number;
    grass: number;
    concrete: number;
    puddle: number;
  }>;
  blendSharpness: number;
  puddleStrength: number;
  mossStrength: number;
  concreteIdentity: Readonly<{
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
}>;

export const createTerrainShaderDomainKit = (
  config: TerrainShaderDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "terrain-shader",
    services: ["triplanar-terrain-materials", "layered-surface-shaders"],
    requires: [createHorrorDomainToken("terrain-field")],
    resources: {
      TerrainShaderProfiles: "terrainShader.profiles",
    },
    metadata: {
      purpose: "Generic terrain shader profile descriptors for soil, grass, weathered concrete identity, and wetness layers.",
      config,
    },
  });
