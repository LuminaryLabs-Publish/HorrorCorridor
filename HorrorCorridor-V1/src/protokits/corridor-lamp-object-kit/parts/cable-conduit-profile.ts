import { defineCorridorLampPartProfileKit } from "./defineLampPartProfileKit";
import type { CorridorLampPartProfileConfig } from "./types";

export const corridorLampCableConduitProfileConfig: CorridorLampPartProfileConfig = {
  enabled: true,
  referenceTraits: [
    "curved cable from pole to head",
    "vertical conduit line",
    "service box",
    "hanging wire detail",
  ],
  descriptors: [
    {
      id: "cable-top-service-loop",
      domain: "cable-conduit",
      shape: "curved-cable",
      transform: { position: [0.82, 3.48, -0.12], rotation: [0, 0, 0], scale: [1.8, 0.18, 0.18] },
      materialProfile: "rubber-cable",
      tags: ["cable", "service-loop", "head-connection"],
    },
    {
      id: "conduit-pole-drop",
      domain: "cable-conduit",
      shape: "vertical-conduit-with-box",
      transform: { position: [-0.16, 1.72, -0.2], rotation: [0, 0, 0], scale: [0.18, 2.6, 0.18] },
      materialProfile: "dark-oiled-metal",
      tags: ["conduit", "junction-box", "cable-drop"],
    },
  ],
  validation: {
    minOrbitScore: 90,
    requiredViews: ["side", "three-quarter", "orbit-135", "orbit-225"],
    firstFailureHint: "Cable/conduit must visibly route power to the head instead of being hidden or absent.",
  },
};

export const createCorridorLampCableConduitProfileKit = (
  config: CorridorLampPartProfileConfig = corridorLampCableConduitProfileConfig,
) =>
  defineCorridorLampPartProfileKit({
    apiName: "corridorLampCableConduitProfile",
    config,
    domain: "corridor-lamp-cable-conduit-profile",
    services: ["cable-conduit-descriptors", "service-loop-profile", "junction-box-profile"],
    resources: { CableConduitProfile: "corridorLamp.parts.cableConduit" },
    purpose: "Scoped corridor lamp cable/conduit kit for service loops, conduit drops, boxes, and hanging wire details.",
  });

