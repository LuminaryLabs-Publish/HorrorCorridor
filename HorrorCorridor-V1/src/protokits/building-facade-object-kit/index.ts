import { createHorrorDomainToken, type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type BuildingFacadeObjectKitConfig = SceneObjectDomainKitConfig;

export const createBuildingFacadeObjectKit = (
  config: BuildingFacadeObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "building-facade-object",
      services: ["facade-descriptors", "broken-skyline-module-profile"],
      resources: {
        BuildingFacadeDescriptors: "buildingFacadeObject.descriptors",
      },
      requires: [
        createHorrorDomainToken("broken-city-wall"),
        createHorrorDomainToken("open-sky-projection"),
      ],
      purpose: "Generic building facade object kit for broken skyline walls, ledges, windows, and mossy vertical landmarks.",
    },
    config,
  );
