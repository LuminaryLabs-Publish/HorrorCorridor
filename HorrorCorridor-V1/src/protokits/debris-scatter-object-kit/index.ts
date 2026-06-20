import { type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type DebrisScatterObjectKitConfig = SceneObjectDomainKitConfig;

export const createDebrisScatterObjectKit = (
  config: DebrisScatterObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "debris-scatter-object",
      services: ["debris-cluster-descriptors", "rubble-scatter-descriptors", "fragmented-ground-clutter-profile"],
      resources: {
        DebrisScatterDescriptors: "debrisScatterObject.descriptors",
      },
      purpose: "Generic debris-scatter object kit for broken chunks, rubble, and floor clutter clusters.",
    },
    config,
  );
