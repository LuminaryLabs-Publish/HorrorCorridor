import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type OpenSkyProjectionDomainKitConfig = Readonly<{
  enabled: boolean;
  projectionMode: "top-down-terrain";
  buildingDensity: number;
  maxBuildingFacades: number;
  heightRange: readonly [number, number];
  rooflessCorridors: boolean;
  skyCellResolution: number;
}>;

export const createOpenSkyProjectionDomainKit = (
  config: OpenSkyProjectionDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "open-sky-projection",
    services: ["top-down-building-footprints", "terrain-projected-facades", "roofless-corridor-mask"],
    requires: [
      createHorrorDomainToken("terrain-field"),
      createHorrorDomainToken("grid-field"),
      createHorrorDomainToken("corridor-tile"),
    ],
    resources: {
      OpenSkyProjectionState: "openSkyProjection.state",
      BuildingFootprintDescriptors: "openSkyProjection.buildingFootprints",
      RooflessCorridorMask: "openSkyProjection.rooflessCorridorMask",
    },
    metadata: {
      purpose:
        "Generic top-down terrain projection descriptors for exterior building facades and roofless corridor masks.",
      config,
    },
  });
