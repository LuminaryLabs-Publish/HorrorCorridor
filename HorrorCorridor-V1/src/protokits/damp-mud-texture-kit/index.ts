import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type DampMudTextureKitConfig = Readonly<{
  enabled: boolean;
  palette: readonly number[];
  wetness: number;
}>;

export const createDampMudTextureKit = (
  config: DampMudTextureKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "damp-mud-texture",
    services: ["mud-projection", "wetness-roughness-profile"],
    requires: [createHorrorDomainToken("texture-placement"), createHorrorDomainToken("terrain-shader")],
    resources: {
      DampMudTextureDescriptors: "dampMudTexture.descriptors",
    },
    metadata: {
      purpose: "Generic procedural texture kit for damp mud, wet floor patches, and dirty terrain projection.",
      config,
    },
  });
