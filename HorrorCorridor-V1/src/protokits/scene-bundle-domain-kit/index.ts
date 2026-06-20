import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type SceneBundleDomainKitConfig = Readonly<{
  enabled: boolean;
  maxBundles: number;
  bundleKinds: readonly string[];
}>;

export const createSceneBundleDomainKit = (
  config: SceneBundleDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "scene-bundle",
    services: ["scene-bundles", "clustered-prop-layouts", "bundle-variation"],
    requires: [
      createHorrorDomainToken("footprint-layout"),
      createHorrorDomainToken("prop-descriptor"),
      createHorrorDomainToken("procedural-pbr-material"),
    ],
    resources: {
      SceneBundleState: "sceneBundle.state",
      SceneBundleDescriptors: "sceneBundle.descriptors",
    },
    metadata: {
      purpose:
        "Generic clustered scene-bundle generation so props appear as related environmental stories instead of isolated random placements.",
      config,
    },
  });
