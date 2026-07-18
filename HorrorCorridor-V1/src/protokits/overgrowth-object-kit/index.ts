import { createHorrorDomainToken, type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type OvergrowthObjectKitConfig = SceneObjectDomainKitConfig;

export const createOvergrowthObjectKit = (
  config: OvergrowthObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "overgrowth-object",
      services: [
        "grass-clump-descriptors",
        "root-strip-descriptors",
        "hanging-vine-descriptors",
        "alpha-clipped-overgrowth-profile",
      ],
      resources: {
        OvergrowthObjectDescriptors: "overgrowthObject.descriptors",
      },
      requires: [createHorrorDomainToken("terrain-field")],
      purpose: "Generic overgrowth object kit for grass blades, roots, hanging vines, and terrain-edge organic breakup.",
    },
    config,
  );
