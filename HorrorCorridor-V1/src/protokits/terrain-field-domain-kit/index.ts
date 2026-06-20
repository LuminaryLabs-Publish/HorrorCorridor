import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type TerrainFieldDomainKitConfig = Readonly<{
  grassDensity: number;
  mudDensity: number;
  wetness: number;
  rubbleDensity: number;
  safeRadius: number;
  heightAmplitude: number;
  heightScale: number;
}>;

export const createTerrainFieldDomainKit = (
  config: TerrainFieldDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "terrain-field",
    services: ["terrain-patches", "density-fields", "height-field", "vertical-raycast", "safe-zones"],
    requires: [createHorrorDomainToken("grid-maze"), createHorrorDomainToken("grid-field")],
    resources: {
      TerrainFieldState: "terrainField.state",
      TerrainPatchDescriptors: "terrainField.patchDescriptors",
      TerrainHeightField: "terrainField.heightField",
      TerrainRaycastSurface: "terrainField.raycastSurface",
    },
    metadata: {
      purpose: "Generic terrain patch and density-field descriptors over grid walkable cells.",
      config,
    },
  });
