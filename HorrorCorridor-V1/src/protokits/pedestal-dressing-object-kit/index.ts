import { type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type PedestalDressingObjectKitConfig = SceneObjectDomainKitConfig;

export const createPedestalDressingObjectKit = (
  config: PedestalDressingObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "pedestal-dressing-object",
      services: ["pedestal-dressing-descriptors", "anomaly-pedestal-prop-profile"],
      resources: {
        PedestalDressingDescriptors: "pedestalDressingObject.descriptors",
      },
      purpose: "Generic pedestal dressing object kit for anomaly-end staging props and altar clutter.",
    },
    config,
  );
