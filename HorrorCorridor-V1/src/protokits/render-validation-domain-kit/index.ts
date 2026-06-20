import { defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type RenderValidationDomainKitConfig = Readonly<{
  noHudDuringPlaying: boolean;
  requireNonBlankCanvas: boolean;
  minimumPropCount: number;
  minimumDecalCount: number;
  readableSpawnView: boolean;
}>;

export const createRenderValidationDomainKit = (
  config: RenderValidationDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "render-validation",
    services: ["assertions", "debug-summary"],
    resources: {
      RenderValidationState: "renderValidation.state",
    },
    events: {
      RenderValidationFailed: "renderValidation.failed",
      RenderValidationPassed: "renderValidation.passed",
    },
    metadata: {
      purpose: "Generic renderer assertions over debug state, descriptors, and visible output.",
      config,
    },
  });
