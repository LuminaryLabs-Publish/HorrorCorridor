import { type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type UtilityCrateObjectKitConfig = SceneObjectDomainKitConfig;

export const createUtilityCrateObjectKit = (
  config: UtilityCrateObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "utility-crate-object",
      services: ["crate-stack-descriptors", "stacked-storage-prop-profile"],
      resources: {
        UtilityCrateStackDescriptors: "utilityCrateObject.stackDescriptors",
      },
      purpose: "Generic small-object kit for stacked utility crates and storage boxes.",
    },
    config,
  );
