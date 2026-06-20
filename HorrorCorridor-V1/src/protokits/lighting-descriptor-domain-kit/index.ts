import { defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type LightingDescriptorDomainKitConfig = Readonly<{
  mood: string;
  ambientColor: number;
  playerFollowLight: boolean;
  flickerEnabled: boolean;
}>;

export const createLightingDescriptorDomainKit = (
  config: LightingDescriptorDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "lighting-descriptor",
    services: ["ambient", "point-lights", "follow-lights", "mood"],
    resources: {
      LightingDescriptorState: "lightingDescriptor.state",
    },
    metadata: {
      purpose: "Generic renderer-facing ambient, point, follow, flicker, and mood descriptors.",
      config,
    },
  });
