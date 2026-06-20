import { createHorrorDomainToken, type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type BrickRubbleObjectKitConfig = SceneObjectDomainKitConfig;

export const createBrickRubbleObjectKit = (
  config: BrickRubbleObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "brick-rubble-object",
      services: ["brick-pile-descriptors", "fragmented-rubble-prop-profile"],
      requires: [createHorrorDomainToken("broken-city-wall")],
      resources: {
        BrickRubblePileDescriptors: "brickRubbleObject.pileDescriptors",
      },
      purpose: "Generic small-object kit for broken brick, concrete chunks, and rubble piles.",
    },
    config,
  );
