import {
  createHorrorDomainToken,
  defineHorrorDomainKit,
  type HorrorDomainKit,
} from "../domainKit";

export type WaterSurfaceDomainKitConfig = Readonly<{
  palette: readonly [number, number, number];
  opacityRange: readonly [number, number];
  roughnessRange: readonly [number, number];
  rippleTextureSize: number;
  rippleScale: number;
  rippleStrength: number;
  driftSpeed: number;
  reflectionStrength: number;
  warmReflectionColor: number;
  coldReflectionColor: number;
}>;

export const createWaterSurfaceDomainKit = (
  config: WaterSurfaceDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "water-surface",
    services: [
      "standing-water-material-profile",
      "puddle-ripple-profile",
      "broken-reflection-profile",
    ],
    requires: [createHorrorDomainToken("terrain-shader")],
    resources: {
      WaterSurfaceProfiles: "waterSurface.profiles",
    },
    metadata: {
      purpose:
        "Generic standing-water material, ripple, and broken-light reflection profiles for terrain-bound puddles.",
      config,
    },
  });
