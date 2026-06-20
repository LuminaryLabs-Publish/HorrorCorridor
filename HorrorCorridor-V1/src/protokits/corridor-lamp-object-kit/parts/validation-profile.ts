import { createHorrorDomainToken } from "../../domainKit";
import { defineCorridorLampPartProfileKit } from "./defineLampPartProfileKit";
import type { CorridorLampPartProfileConfig } from "./types";

export const corridorLampValidationProfileConfig: CorridorLampPartProfileConfig = {
  enabled: true,
  referenceTraits: [
    "all parts visible in human review room",
    "8-angle orbit score",
    "player-distance readability",
    "corridor-dark readability",
  ],
  descriptors: [
    {
      id: "validation-eight-angle-orbit",
      domain: "validation",
      shape: "review-gate",
      transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
      materialProfile: "not-rendered",
      tags: ["validation", "orbit", "score-90", "human-view"],
    },
    {
      id: "validation-reference-delta",
      domain: "validation",
      shape: "reference-comparison-gate",
      transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
      materialProfile: "not-rendered",
      tags: ["validation", "generated-reference", "semantic-delta"],
    },
  ],
  validation: {
    minOrbitScore: 90,
    requiredViews: [
      "front",
      "side",
      "three-quarter",
      "player-distance",
      "corridor-dark",
      "orbit-000",
      "orbit-045",
      "orbit-090",
      "orbit-135",
      "orbit-180",
      "orbit-225",
      "orbit-270",
      "orbit-315",
    ],
    firstFailureHint: "Lamp cannot promote until primary review views and every orbit view score at least 90.",
  },
};

export const createCorridorLampValidationProfileKit = (
  config: CorridorLampPartProfileConfig = corridorLampValidationProfileConfig,
) =>
  defineCorridorLampPartProfileKit({
    apiName: "corridorLampValidationProfile",
    config,
    domain: "corridor-lamp-validation-profile",
    services: ["validation-descriptors", "orbit-review-profile", "reference-delta-profile"],
    resources: { ValidationProfile: "corridorLamp.parts.validation" },
    requires: [createHorrorDomainToken("render-validation")],
    purpose: "Scoped corridor lamp validation kit for human-review-room gates, 8-angle orbit scoring, and reference-delta promotion rules.",
  });

