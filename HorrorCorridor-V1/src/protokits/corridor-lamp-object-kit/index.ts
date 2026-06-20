import { createHorrorDomainToken, type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";
import { corridorLampPartProfileKitIds } from "./parts";

export type CorridorLampObjectKitConfig = SceneObjectDomainKitConfig;

export const createCorridorLampObjectKit = (
  config: CorridorLampObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "corridor-lamp-object",
      services: ["corridor-lamp-descriptors", "corridor-lamp-light-anchors", "corridor-lamp-profile"],
      resources: {
        CorridorLampDescriptors: "corridorLampObject.descriptors",
        CorridorLampPartProfiles: "corridorLampObject.partProfiles",
      },
      requires: [
        createHorrorDomainToken("lighting-placement"),
        createHorrorDomainToken("corridor-tile"),
        createHorrorDomainToken("corridor-lamp-foundation-profile"),
        createHorrorDomainToken("corridor-lamp-pole-profile"),
        createHorrorDomainToken("corridor-lamp-armature-profile"),
        createHorrorDomainToken("corridor-lamp-head-profile"),
        createHorrorDomainToken("corridor-lamp-cable-conduit-profile"),
        createHorrorDomainToken("corridor-lamp-fastener-profile"),
        createHorrorDomainToken("corridor-lamp-material-profile"),
        createHorrorDomainToken("corridor-lamp-light-profile"),
        createHorrorDomainToken("corridor-lamp-validation-profile"),
      ],
      purpose: `Generic corridor lamp object kit for long-route lamp posts that composes scoped part-profile kits (${corridorLampPartProfileKitIds.join(", ")}).`,
    },
    config,
  );

export * from "./parts";
