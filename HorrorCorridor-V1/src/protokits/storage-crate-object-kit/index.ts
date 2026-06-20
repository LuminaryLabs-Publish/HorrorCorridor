import { type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type StorageCrateObjectKitConfig = SceneObjectDomainKitConfig;

export const createStorageCrateObjectKit = (
  config: StorageCrateObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "storage-crate-object",
      services: ["storage-crate-descriptors", "single-crate-profile"],
      resources: {
        StorageCrateDescriptors: "storageCrateObject.descriptors",
      },
      purpose: "Generic storage crate object kit for loose containers and floor-level cache props.",
    },
    config,
  );
