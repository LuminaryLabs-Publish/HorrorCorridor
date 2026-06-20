import { defineHorrorDomainKit, createHorrorDomainToken, type HorrorDomainKit } from "../domainKit";

export type SceneDressingDomainKitConfig = Readonly<{
  density: "low" | "medium" | "high";
  seedMode: "maze-seed" | "content-pack";
  placementRules: readonly string[];
}>;

export const createSceneDressingDomainKit = (
  config: SceneDressingDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "scene-dressing",
    services: ["placement-rules", "seeded-distribution"],
    requires: [createHorrorDomainToken("grid-maze"), createHorrorDomainToken("prop-descriptor")],
    resources: {
      SceneDressingState: "sceneDressing.state",
    },
    metadata: {
      purpose: "Generic seeded scene dressing placement from grid/domain descriptors.",
      config,
    },
  });
