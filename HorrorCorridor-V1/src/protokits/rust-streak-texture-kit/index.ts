import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type RustStreakTextureKitConfig = Readonly<{
  enabled: boolean;
  palette: readonly number[];
  streakDensity: number;
}>;

export const createRustStreakTextureKit = (
  config: RustStreakTextureKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "rust-streak-texture",
    services: ["vertical-rust-streaks", "corrosion-projection-profile"],
    requires: [createHorrorDomainToken("texture-placement"), createHorrorDomainToken("procedural-pbr-material")],
    resources: {
      RustStreakTextureDescriptors: "rustStreakTexture.descriptors",
    },
    metadata: {
      purpose: "Generic procedural texture kit for vertical rust streaks and corrosion marks.",
      config,
    },
  });
