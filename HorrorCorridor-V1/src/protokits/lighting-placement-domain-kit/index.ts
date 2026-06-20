import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type LightingPlacementDomainKitConfig = Readonly<{
  maxLights: number;
  coverageSamples: number;
  readabilityTarget: number;
  intensity: number;
  range: number;
  bezierPaths: {
    enabled: boolean;
    sampleCount: number;
    sag: number;
    color: number;
    intensity: number;
    range: number;
  };
  allowedKinds: readonly ("fill" | "accent" | "anomaly" | "prop")[];
}>;

export const createLightingPlacementDomainKit = (
  config: LightingPlacementDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "lighting-placement",
    services: ["coverage-lights", "visibility-samples", "mood-light-descriptors", "bezier-path-lights"],
    requires: [
      createHorrorDomainToken("raymarch-sampling"),
      createHorrorDomainToken("lighting-descriptor"),
    ],
    resources: {
      LightingPlacementState: "lightingPlacement.state",
      LightingPlacementDescriptors: "lightingPlacement.descriptors",
    },
    metadata: {
      purpose:
        "Generic scene-aware light placement from raymarch visibility and readability samples.",
      config,
    },
  });
