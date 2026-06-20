import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type BrokenCityWallDomainKitConfig = Readonly<{
  brickPalette: readonly number[];
  concretePalette: readonly number[];
  damageDensity: number;
  mossDensity: number;
}>;

export const createBrokenCityWallDomainKit = (
  config: BrokenCityWallDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "broken-city-wall",
    services: ["wall-modules", "damage-decals", "moss-and-brick-profiles"],
    requires: [
      createHorrorDomainToken("corridor-tile"),
      createHorrorDomainToken("raymarch-sampling"),
    ],
    resources: {
      BrokenCityWallState: "brokenCityWall.state",
      WallModuleDescriptors: "brokenCityWall.moduleDescriptors",
    },
    metadata: {
      purpose: "Generic broken-city wall module descriptors for brick, concrete, moss, and damage.",
      config,
    },
  });
