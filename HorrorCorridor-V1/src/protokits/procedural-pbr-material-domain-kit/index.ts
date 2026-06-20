import { defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type ProceduralPbrMaterialDomainKitConfig = Readonly<{
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
}>;

export const createProceduralPbrMaterialDomainKit = (
  config: ProceduralPbrMaterialDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "procedural-pbr-material",
    services: ["material-descriptors", "local-texture-generation", "grime-masks"],
    resources: {
      ProceduralPbrMaterialState: "proceduralPbrMaterial.state",
      ProceduralPbrMaterialLibrary: "proceduralPbrMaterial.library",
    },
    metadata: {
      purpose:
        "Generic deterministic local PBR-style material descriptor and texture-map generation.",
      config,
    },
  });
