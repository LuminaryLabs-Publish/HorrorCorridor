import { defineCorridorLampPartProfileKit } from "./defineLampPartProfileKit";
import type { CorridorLampPartProfileConfig } from "./types";

export const corridorLampPoleProfileConfig: CorridorLampPartProfileConfig = {
  enabled: true,
  referenceTraits: [
    "segmented corroded pipe",
    "collar rings",
    "top service cap",
    "vertical readable spine",
  ],
  descriptors: [
    {
      id: "pole-main-corroded-cylinder",
      domain: "pole",
      shape: "segmented-cylinder",
      transform: { position: [0, 1.82, 0], rotation: [0, 0, 0], scale: [0.22, 3.55, 0.22] },
      materialProfile: "rusted-metal",
      tags: ["pole", "primary-silhouette", "corroded"],
    },
    {
      id: "pole-collar-stack",
      domain: "pole",
      shape: "collar-ring-array",
      transform: { position: [0, 1.95, 0], rotation: [0, 0, 0], scale: [0.34, 2.8, 0.34] },
      materialProfile: "dark-oiled-metal",
      tags: ["collars", "pipe-segments", "edge-breakup"],
    },
  ],
  validation: {
    minOrbitScore: 90,
    requiredViews: ["front", "side", "orbit-180", "player-distance"],
    firstFailureHint: "Pole must read as segmented industrial pipe rather than one plain cylinder.",
  },
};

export const createCorridorLampPoleProfileKit = (
  config: CorridorLampPartProfileConfig = corridorLampPoleProfileConfig,
) =>
  defineCorridorLampPartProfileKit({
    apiName: "corridorLampPoleProfile",
    config,
    domain: "corridor-lamp-pole-profile",
    services: ["pole-descriptors", "pipe-segment-profile", "collar-ring-profile"],
    resources: { PoleProfile: "corridorLamp.parts.pole" },
    purpose: "Scoped corridor lamp pole kit for segmented vertical pipe, collar rings, and readable industrial spine.",
  });

