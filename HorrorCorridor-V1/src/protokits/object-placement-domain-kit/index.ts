import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type ObjectPlacementDomainKitConfig = Readonly<{
  maxObjects: number;
  density: "low" | "medium" | "high";
  safeRadius: number;
  wallOffset: number;
  floorOffset: number;
  allowedSurfaces: readonly ("wall" | "floor" | "ceiling" | "anomaly")[];
  nonBlocking: boolean;
}>;

export const createObjectPlacementDomainKit = (
  config: ObjectPlacementDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "object-placement",
    services: ["seeded-placement", "non-blocking-descriptors", "placement-rules"],
    requires: [
      createHorrorDomainToken("raymarch-sampling"),
      createHorrorDomainToken("prop-descriptor"),
    ],
    resources: {
      ObjectPlacementState: "objectPlacement.state",
      ObjectPlacementDescriptors: "objectPlacement.descriptors",
    },
    metadata: {
      purpose:
        "Generic seeded prop placement from raymarch surface hits into non-blocking render descriptors.",
      config,
    },
  });
