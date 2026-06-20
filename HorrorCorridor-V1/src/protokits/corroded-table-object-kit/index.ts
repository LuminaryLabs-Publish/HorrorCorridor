import { type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type CorrodedTableObjectKitConfig = SceneObjectDomainKitConfig;

export const createCorrodedTableObjectKit = (
  config: CorrodedTableObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "corroded-table-object",
      services: ["table-descriptors", "corroded-worksurface-profile"],
      resources: {
        CorrodedTableDescriptors: "corrodedTableObject.descriptors",
      },
      purpose: "Generic corroded table object kit for improvised work surfaces and corridor staging props.",
    },
    config,
  );
