import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type TexturePlacementDomainKitConfig = Readonly<{
  maxTextures: number;
  grimeDensity: number;
  stainDensity: number;
  projectionOffset: number;
  allowedSurfaces: readonly ("wall" | "floor" | "ceiling" | "anomaly")[];
}>;

export const createTexturePlacementDomainKit = (
  config: TexturePlacementDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "texture-placement",
    services: ["projected-decals", "surface-wear", "texture-anchors"],
    requires: [
      createHorrorDomainToken("raymarch-sampling"),
      createHorrorDomainToken("procedural-pbr-material"),
    ],
    resources: {
      TexturePlacementState: "texturePlacement.state",
      TexturePlacementDescriptors: "texturePlacement.descriptors",
    },
    metadata: {
      purpose:
        "Generic seeded placement of projected texture and decal anchors onto sampled surfaces.",
      config,
    },
  });
