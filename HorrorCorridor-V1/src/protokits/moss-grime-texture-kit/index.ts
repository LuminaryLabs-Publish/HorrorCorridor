import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type MossGrimeTextureKitConfig = Readonly<{
  enabled: boolean;
  palette: readonly number[];
  coverage: number;
}>;

export const createMossGrimeTextureKit = (
  config: MossGrimeTextureKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "moss-grime-texture",
    services: ["moss-grime-projection", "organic-edge-dirt-profile"],
    requires: [createHorrorDomainToken("texture-placement"), createHorrorDomainToken("terrain-shader")],
    resources: {
      MossGrimeTextureDescriptors: "mossGrimeTexture.descriptors",
    },
    metadata: {
      purpose: "Generic procedural texture kit for moss, grime, and organic dirt buildup.",
      config,
    },
  });
