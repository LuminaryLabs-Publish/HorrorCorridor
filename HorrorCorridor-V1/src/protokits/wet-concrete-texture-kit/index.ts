import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type WetConcreteTextureKitConfig = Readonly<{
  enabled: boolean;
  palette: readonly number[];
  crackDensity: number;
}>;

export const createWetConcreteTextureKit = (
  config: WetConcreteTextureKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "wet-concrete-texture",
    services: ["wet-concrete-projection", "cracked-concrete-texture-profile"],
    requires: [createHorrorDomainToken("texture-placement"), createHorrorDomainToken("procedural-pbr-material")],
    resources: {
      WetConcreteTextureDescriptors: "wetConcreteTexture.descriptors",
    },
    metadata: {
      purpose: "Generic procedural texture kit for wet concrete, cracks, and stained slab surfaces.",
      config,
    },
  });
