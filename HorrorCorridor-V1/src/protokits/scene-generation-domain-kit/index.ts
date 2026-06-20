import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type SceneGenerationDomainKitConfig = Readonly<{
  enabled: boolean;
  seed: string;
  maxDecorations: number;
  descriptorOnly: boolean;
}>;

export const createSceneGenerationDomainKit = (
  config: SceneGenerationDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "scene-generation",
    services: ["scene-manifest", "descriptor-composition", "content-pack-merge"],
    requires: [
      createHorrorDomainToken("grid-field"),
      createHorrorDomainToken("object-placement"),
      createHorrorDomainToken("texture-placement"),
      createHorrorDomainToken("lighting-placement"),
      createHorrorDomainToken("scene-dressing"),
      createHorrorDomainToken("walkthrough"),
      createHorrorDomainToken("render-validation"),
    ],
    resources: {
      SceneGenerationState: "sceneGeneration.state",
      SceneDressingManifest: "sceneGeneration.dressingManifest",
    },
    metadata: {
      purpose:
        "Generic scene-generation composition over props, textures, lights, walkthroughs, and validation descriptors.",
      config,
    },
  });
