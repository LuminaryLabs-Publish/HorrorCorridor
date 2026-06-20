import { defineCorridorLampPartProfileKit } from "./defineLampPartProfileKit";
import type { CorridorLampPartProfileConfig } from "./types";

export const corridorLampFoundationProfileConfig: CorridorLampPartProfileConfig = {
  enabled: true,
  referenceTraits: [
    "heavy stacked floor plates",
    "visible floor contact",
    "triangular stabilizer fins",
    "large corner bolts",
  ],
  descriptors: [
    {
      id: "foundation-stacked-base-plate",
      domain: "foundation",
      shape: "stacked-rect-plate",
      transform: { position: [0, 0.06, 0], rotation: [0, 0, 0], scale: [1.15, 0.12, 0.92] },
      materialProfile: "rusted-metal",
      tags: ["base", "floor-contact", "heavy"],
    },
    {
      id: "foundation-upright-fins",
      domain: "foundation",
      shape: "triangular-gusset-array",
      transform: { position: [0, 0.42, 0], rotation: [0, 0, 0], scale: [0.72, 0.72, 0.72] },
      materialProfile: "rusted-metal",
      tags: ["gusset", "bolted", "stability"],
    },
  ],
  validation: {
    minOrbitScore: 90,
    requiredViews: ["orbit-000", "orbit-090", "orbit-180", "orbit-270", "player-distance"],
    firstFailureHint: "Base must read as a heavy bolted foundation, not a thin disk.",
  },
};

export const createCorridorLampFoundationProfileKit = (
  config: CorridorLampPartProfileConfig = corridorLampFoundationProfileConfig,
) =>
  defineCorridorLampPartProfileKit({
    apiName: "corridorLampFoundationProfile",
    config,
    domain: "corridor-lamp-foundation-profile",
    services: ["foundation-descriptors", "base-plate-profile", "stabilizer-fin-profile"],
    resources: { FoundationProfile: "corridorLamp.parts.foundation" },
    purpose: "Scoped corridor lamp foundation kit for base plates, floor contact, stabilizer fins, and bolted mass.",
  });

