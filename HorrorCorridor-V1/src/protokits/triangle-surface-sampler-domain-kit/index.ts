import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type TriangleSurfaceSamplerDomainKitConfig = Readonly<{
  enabled: boolean;
  maxAnchors: number;
  wallAnchorStride: number;
  floorAnchorStride: number;
  inset: number;
}>;

export const createTriangleSurfaceSamplerDomainKit = (
  config: TriangleSurfaceSamplerDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "triangle-surface-sampler",
    services: ["surface-anchors", "surface-triangles", "oriented-sample-frames"],
    requires: [
      createHorrorDomainToken("grid-field"),
      createHorrorDomainToken("raymarch-sampling"),
      createHorrorDomainToken("terrain-field"),
    ],
    resources: {
      TriangleSurfaceSamplerState: "triangleSurfaceSampler.state",
      SurfaceAnchorDescriptors: "triangleSurfaceSampler.anchors",
    },
    metadata: {
      purpose:
        "Generic surface-anchor generation over triangle-like floor, wall, and ceiling samples for geometry-aware placement.",
      config,
    },
  });
