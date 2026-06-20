import { type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type WallPanelObjectKitConfig = SceneObjectDomainKitConfig;

export const createWallPanelObjectKit = (
  config: WallPanelObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "wall-panel-object",
      services: ["panel-box-descriptors", "mounted-utility-panel-profile"],
      resources: {
        WallPanelDescriptors: "wallPanelObject.descriptors",
      },
      purpose: "Generic wall-mounted panel and utility box object kit for corridor side dressing.",
    },
    config,
  );
