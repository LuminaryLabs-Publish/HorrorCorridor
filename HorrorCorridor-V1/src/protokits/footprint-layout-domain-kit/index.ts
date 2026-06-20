import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type FootprintLayoutDomainKitConfig = Readonly<{
  enabled: boolean;
  maxLayouts: number;
  clearance: number;
  bundlePadding: number;
}>;

export const createFootprintLayoutDomainKit = (
  config: FootprintLayoutDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "footprint-layout",
    services: ["footprint-layouts", "clearance-checks", "non-overlap-solves"],
    requires: [
      createHorrorDomainToken("socket-graph"),
      createHorrorDomainToken("object-placement"),
    ],
    resources: {
      FootprintLayoutState: "footprintLayout.state",
      FootprintLayoutDescriptors: "footprintLayout.layouts",
    },
    metadata: {
      purpose:
        "Generic footprint and clearance solving for clustered scene bundles and larger grounded placements.",
      config,
    },
  });
