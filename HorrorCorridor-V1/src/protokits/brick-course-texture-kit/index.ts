import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type BrickCourseTextureKitConfig = Readonly<{
  enabled: boolean;
  palette: readonly number[];
  mortarContrast: number;
}>;

export const createBrickCourseTextureKit = (
  config: BrickCourseTextureKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "brick-course-texture",
    services: ["brick-course-projection", "mortar-line-texture-profile"],
    requires: [createHorrorDomainToken("texture-placement"), createHorrorDomainToken("broken-city-wall")],
    resources: {
      BrickCourseTextureDescriptors: "brickCourseTexture.descriptors",
    },
    metadata: {
      purpose: "Generic procedural texture kit for brick courses, mortar, and broken masonry relief.",
      config,
    },
  });
