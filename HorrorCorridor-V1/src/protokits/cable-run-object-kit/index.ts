import { createHorrorDomainToken, type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type CableRunObjectKitConfig = SceneObjectDomainKitConfig;

export const createCableRunObjectKit = (
  config: CableRunObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "cable-run-object",
      services: ["cable-bundle-descriptors", "ribbed-cable-profile"],
      resources: {
        CableRunDescriptors: "cableRunObject.descriptors",
      },
      requires: [createHorrorDomainToken("corridor-tile")],
      purpose: "Generic cable-run object kit for hanging bundles and corridor service runs.",
    },
    config,
  );
