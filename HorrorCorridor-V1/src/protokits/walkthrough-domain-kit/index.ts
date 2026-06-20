import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type WalkthroughDomainKitConfig = Readonly<{
  enabled: boolean;
  checkpointCount: number;
  routeSampleSpacing: number;
  checks: readonly ("spawn-readability" | "first-branch" | "cube-route" | "anomaly-route")[];
}>;

export const createWalkthroughDomainKit = (config: WalkthroughDomainKitConfig): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "walkthrough",
    services: ["checkpoints", "route-validation", "objective-flow"],
    requires: [
      createHorrorDomainToken("grid-maze"),
      createHorrorDomainToken("raymarch-sampling"),
      createHorrorDomainToken("sequence-objective"),
    ],
    resources: {
      WalkthroughState: "walkthrough.state",
      WalkthroughCheckpoints: "walkthrough.checkpoints",
    },
    metadata: {
      purpose:
        "Generic optional walkthrough and readability validation descriptors for generated scenes.",
      config,
    },
  });
