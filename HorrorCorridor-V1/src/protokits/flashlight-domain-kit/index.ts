import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type FlashlightDomainKitConfig = Readonly<{
  enabled: boolean;
  color: number;
  intensity: number;
  range: number;
  angle: number;
  penumbra: number;
  decay: number;
  floatOffset: Readonly<{
    x: number;
    y: number;
    z: number;
  }>;
}>;

export const createFlashlightDomainKit = (
  config: FlashlightDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "flashlight",
    services: ["view-following-light", "floating-light-source", "spotlight-cone"],
    requires: [createHorrorDomainToken("lighting-descriptor")],
    resources: {
      FlashlightDescriptor: "flashlight.descriptor",
      FlashlightPose: "flashlight.pose",
    },
    metadata: {
      purpose: "Generic view-following flashlight descriptor for player-owned scene illumination.",
      config,
    },
  });
