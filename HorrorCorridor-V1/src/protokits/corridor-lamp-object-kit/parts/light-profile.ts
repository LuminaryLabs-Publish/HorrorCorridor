import { createHorrorDomainToken } from "../../domainKit";
import { defineCorridorLampPartProfileKit } from "./defineLampPartProfileKit";
import type { CorridorLampPartProfileConfig } from "./types";

export const corridorLampLightProfileConfig: CorridorLampPartProfileConfig = {
  enabled: true,
  referenceTraits: [
    "warm bulb glow",
    "light origin inside cage",
    "local falloff",
    "low ambient compatibility",
  ],
  descriptors: [
    {
      id: "light-head-practical-anchor",
      domain: "light",
      shape: "point-light-anchor",
      transform: { position: [1.95, 2.84, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
      materialProfile: "warm-practical-light",
      tags: ["light", "lamp-head", "warm", "falloff"],
    },
    {
      id: "light-lens-emissive-card",
      domain: "light",
      shape: "emissive-lens-anchor",
      transform: { position: [1.92, 2.82, 0], rotation: [0, 0, 0], scale: [0.45, 0.32, 0.42] },
      materialProfile: "warm-emissive-lens",
      tags: ["emissive", "lens", "source-readable"],
    },
  ],
  validation: {
    minOrbitScore: 90,
    requiredViews: ["corridor-dark", "player-distance", "orbit-000", "orbit-045", "orbit-315"],
    firstFailureHint: "Light must visibly originate from the caged lamp head, not the pole center.",
  },
};

export const createCorridorLampLightProfileKit = (
  config: CorridorLampPartProfileConfig = corridorLampLightProfileConfig,
) =>
  defineCorridorLampPartProfileKit({
    apiName: "corridorLampLightProfile",
    config,
    domain: "corridor-lamp-light-profile",
    services: ["light-anchor-descriptors", "warm-practical-profile", "lens-emission-profile"],
    resources: { LightProfile: "corridorLamp.parts.light" },
    requires: [createHorrorDomainToken("lighting-descriptor"), createHorrorDomainToken("lighting-placement")],
    purpose: "Scoped corridor lamp light kit for warm practical light anchors, lens emission, and readable head-origin glow.",
  });

