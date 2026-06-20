import { defineCorridorLampPartProfileKit } from "./defineLampPartProfileKit";
import type { CorridorLampPartProfileConfig } from "./types";

export const corridorLampArmatureProfileConfig: CorridorLampPartProfileConfig = {
  enabled: true,
  referenceTraits: [
    "long horizontal beam",
    "diagonal support strut",
    "hinge plates",
    "boxy head mount",
  ],
  descriptors: [
    {
      id: "armature-horizontal-boom",
      domain: "armature",
      shape: "rectangular-beam",
      transform: { position: [0.92, 3.34, 0], rotation: [0, 0, -0.06], scale: [1.85, 0.18, 0.22] },
      materialProfile: "rusted-metal",
      tags: ["boom", "top-silhouette", "cantilever"],
    },
    {
      id: "armature-diagonal-brace",
      domain: "armature",
      shape: "angled-brace",
      transform: { position: [0.72, 2.74, 0], rotation: [0, 0, -0.72], scale: [1.32, 0.08, 0.1] },
      materialProfile: "rusted-metal",
      tags: ["brace", "triangulation", "load-bearing"],
    },
  ],
  validation: {
    minOrbitScore: 90,
    requiredViews: ["three-quarter", "orbit-045", "orbit-135", "orbit-315"],
    firstFailureHint: "Armature must show a beam plus brace, not just a small side peg.",
  },
};

export const createCorridorLampArmatureProfileKit = (
  config: CorridorLampPartProfileConfig = corridorLampArmatureProfileConfig,
) =>
  defineCorridorLampPartProfileKit({
    apiName: "corridorLampArmatureProfile",
    config,
    domain: "corridor-lamp-armature-profile",
    services: ["armature-descriptors", "horizontal-boom-profile", "diagonal-brace-profile"],
    resources: { ArmatureProfile: "corridorLamp.parts.armature" },
    purpose: "Scoped corridor lamp armature kit for horizontal beams, diagonal braces, hinge plates, and head mounts.",
  });

