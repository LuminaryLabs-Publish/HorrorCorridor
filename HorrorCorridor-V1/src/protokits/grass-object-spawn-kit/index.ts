import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type GrassObjectSpawnDomainKitConfig = Readonly<{
  maxGrassClumps: number;
  maxRootStrips: number;
  maxRubbleProps: number;
  cardStyles: readonly string[];
  maxVisibleDensity: number;
}>;

export const createGrassObjectSpawnDomainKit = (
  config: GrassObjectSpawnDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "grass-object-spawn",
    services: ["vegetation-descriptors", "root-descriptors", "terrain-rubble-descriptors"],
    requires: [
      createHorrorDomainToken("terrain-field"),
      createHorrorDomainToken("raymarch-sampling"),
      createHorrorDomainToken("prop-descriptor"),
    ],
    resources: {
      GrassObjectSpawnState: "grassObjectSpawn.state",
      VegetationDescriptors: "grassObjectSpawn.vegetationDescriptors",
    },
    metadata: {
      purpose: "Generic terrain object spawning for grass cards, roots, vines, and rubble props.",
      config,
    },
  });
