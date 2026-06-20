import { createHorrorDomainToken, type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type CeilingServiceStripObjectKitConfig = SceneObjectDomainKitConfig;

export const createCeilingServiceStripObjectKit = (
  config: CeilingServiceStripObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "ceiling-service-strip-object",
      services: ["overhead-service-strip-descriptors", "ceiling-rail-prop-profile"],
      requires: [createHorrorDomainToken("corridor-tile")],
      resources: {
        CeilingServiceStripDescriptors: "ceilingServiceStripObject.descriptors",
      },
      purpose: "Generic small-object kit for overhead rails, strips, conduits, and suspended service details.",
    },
    config,
  );
