import { createHorrorDomainToken, type HorrorDomainKit } from "../domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "../scene-object-kit";

export type PipeRunObjectKitConfig = SceneObjectDomainKitConfig;

export const createPipeRunObjectKit = (
  config: PipeRunObjectKitConfig,
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: "pipe-run-object",
      services: ["pipe-run-descriptors", "floor-pipe-descriptors", "oxidized-pipe-profile"],
      resources: {
        PipeRunDescriptors: "pipeRunObject.descriptors",
      },
      requires: [createHorrorDomainToken("corridor-tile")],
      purpose: "Generic pipe-run object kit for wall pipes and floor pipe clutter with shared oxidized profiles.",
    },
    config,
  );
