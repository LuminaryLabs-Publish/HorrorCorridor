import { createHorrorDomainToken, type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type VentObjectKitConfig = SceneObjectDomainKitConfig;

export const createVentObjectKit = (
  config: VentObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "vent-object",
      services: ["vent-grille-descriptors", "ceiling-duct-descriptors", "ventilation-prop-profile"],
      resources: {
        VentObjectDescriptors: "ventObject.descriptors",
      },
      requires: [createHorrorDomainToken("corridor-tile")],
      purpose: "Generic ventilation object kit for wall vents and ceiling ducts with shared panel shading.",
    },
    config,
  );
