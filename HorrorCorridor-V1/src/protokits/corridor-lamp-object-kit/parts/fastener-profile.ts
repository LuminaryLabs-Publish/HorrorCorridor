import { defineCorridorLampPartProfileKit } from "./defineLampPartProfileKit";
import type { CorridorLampPartProfileConfig } from "./types";

export const corridorLampFastenerProfileConfig: CorridorLampPartProfileConfig = {
  enabled: true,
  referenceTraits: [
    "base bolts",
    "hinge pins",
    "plate rivets",
    "small scale detail",
  ],
  descriptors: [
    {
      id: "fastener-base-bolt-grid",
      domain: "fastener",
      shape: "bolt-grid",
      transform: { position: [0, 0.18, 0], rotation: [0, 0, 0], scale: [1.08, 0.08, 0.86] },
      materialProfile: "dark-oiled-metal",
      tags: ["bolts", "base", "scale-detail"],
    },
    {
      id: "fastener-armature-rivets",
      domain: "fastener",
      shape: "rivet-array",
      transform: { position: [1.15, 3.2, 0.26], rotation: [0, 0, 0], scale: [1, 0.08, 0.08] },
      materialProfile: "dark-oiled-metal",
      tags: ["rivets", "hinge", "armature"],
    },
  ],
  validation: {
    minOrbitScore: 90,
    requiredViews: ["top-detail", "three-quarter", "orbit-045", "orbit-315"],
    firstFailureHint: "Fasteners must break up plates and show scale; flat boxes alone are not enough.",
  },
};

export const createCorridorLampFastenerProfileKit = (
  config: CorridorLampPartProfileConfig = corridorLampFastenerProfileConfig,
) =>
  defineCorridorLampPartProfileKit({
    apiName: "corridorLampFastenerProfile",
    config,
    domain: "corridor-lamp-fastener-profile",
    services: ["fastener-descriptors", "bolt-grid-profile", "rivet-array-profile"],
    resources: { FastenerProfile: "corridorLamp.parts.fastener" },
    purpose: "Scoped corridor lamp fastener kit for bolts, rivets, washers, hinge pins, and scale detail.",
  });

