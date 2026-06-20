import { createHorrorDomainToken, type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type LooseFloorSlabObjectKitConfig = SceneObjectDomainKitConfig;

export const createLooseFloorSlabObjectKit = (
  config: LooseFloorSlabObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "loose-floor-slab-object",
      services: ["loose-slab-descriptors", "broken-floor-fragment-profile"],
      requires: [createHorrorDomainToken("terrain-field")],
      resources: {
        LooseFloorSlabDescriptors: "looseFloorSlabObject.descriptors",
      },
      purpose: "Generic small-object kit for loose cracked floor slabs projected onto terrain.",
    },
    config,
  );
