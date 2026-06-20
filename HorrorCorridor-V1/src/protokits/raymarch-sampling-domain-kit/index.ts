import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type RaymarchSamplingDomainKitConfig = Readonly<{
  stepSize: number;
  maxDistance: number;
  maxSteps: number;
  surfaceEpsilon: number;
  sampleSurfaces: readonly ("wall" | "floor" | "ceiling" | "anomaly")[];
}>;

export const createRaymarchSamplingDomainKit = (
  config: RaymarchSamplingDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "raymarch-sampling",
    services: ["surface-hits", "sight-lines", "openness-samples"],
    requires: [createHorrorDomainToken("grid-field")],
    resources: {
      RaymarchSamplingState: "raymarchSampling.state",
      RaymarchSurfaceHits: "raymarchSampling.surfaceHits",
    },
    metadata: {
      purpose:
        "Generic CPU raymarch sampling over grid fields for surface hits, sight lines, and corridor openness.",
      config,
    },
  });
