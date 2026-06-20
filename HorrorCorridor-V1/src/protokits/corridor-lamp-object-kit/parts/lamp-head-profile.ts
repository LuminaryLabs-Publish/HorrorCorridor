import { defineCorridorLampPartProfileKit } from "./defineLampPartProfileKit";
import type { CorridorLampPartProfileConfig } from "./types";

export const corridorLampHeadProfileConfig: CorridorLampPartProfileConfig = {
  enabled: true,
  referenceTraits: [
    "boxy upper housing",
    "caged lower lamp",
    "visible warm lens",
    "protective wire grid",
  ],
  descriptors: [
    {
      id: "lamp-head-box-housing",
      domain: "lamp-head",
      shape: "box-housing",
      transform: { position: [1.95, 3.18, 0], rotation: [0, 0, -0.06], scale: [0.78, 0.38, 0.48] },
      materialProfile: "rusted-metal",
      tags: ["lamp-head", "housing", "box"],
    },
    {
      id: "lamp-head-caged-lens",
      domain: "lamp-head",
      shape: "caged-lens-box",
      transform: { position: [1.93, 2.84, 0], rotation: [0, 0, 0], scale: [0.62, 0.5, 0.52] },
      materialProfile: "warm-emissive-lens",
      tags: ["lamp-head", "cage", "bulb", "emissive"],
    },
  ],
  validation: {
    minOrbitScore: 90,
    requiredViews: ["front", "side", "three-quarter", "corridor-dark", "orbit-090"],
    firstFailureHint: "Lamp head must read as a caged warm fixture from front and side views.",
  },
};

export const createCorridorLampHeadProfileKit = (
  config: CorridorLampPartProfileConfig = corridorLampHeadProfileConfig,
) =>
  defineCorridorLampPartProfileKit({
    apiName: "corridorLampHeadProfile",
    config,
    domain: "corridor-lamp-head-profile",
    services: ["lamp-head-descriptors", "cage-profile", "lens-profile", "bulb-profile"],
    resources: { LampHeadProfile: "corridorLamp.parts.lampHead" },
    purpose: "Scoped corridor lamp head kit for box housing, cage grid, lens, bulb, and head silhouette.",
  });

