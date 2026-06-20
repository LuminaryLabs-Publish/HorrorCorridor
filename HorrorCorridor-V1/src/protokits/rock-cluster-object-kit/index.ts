import { type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type RockClusterObjectKitConfig = SceneObjectDomainKitConfig;

export const createRockClusterObjectKit = (
  config: RockClusterObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "rock-cluster-object",
      services: ["rock-cluster-descriptors", "corridor-rock-profile"],
      resources: {
        RockClusterDescriptors: "rockClusterObject.descriptors",
      },
      purpose: "Generic rock cluster object kit for corridor-side stone piles, terrain breakup, and grounded route clutter.",
    },
    config,
  );
