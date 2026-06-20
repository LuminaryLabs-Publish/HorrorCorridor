import { NextResponse } from "next/server";

import { generateMaze } from "@/features/maze/domain/generateMaze";
import { createSceneDressingManifest } from "@/features/render/three/sceneDressingDescriptors";
import {
  corridorLampPartProfileKitIds,
  createHorrorCorridorDomainKits,
  createHorrorCorridorPreset,
  reviewSceneObjectKitCoverage,
} from "@/protokits";

const countBy = <T,>(items: readonly T[], keyOf: (item: T) => string): Record<string, number> =>
  items.reduce<Record<string, number>>((counts, item) => {
    const key = keyOf(item);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});

export function GET(request: Request) {
  const url = new URL(request.url);
  const seed = url.searchParams.get("seed") ?? "protokit-smoke";
  const preset = createHorrorCorridorPreset({
    sceneGeneration: {
      seed,
    },
  });
  const domainKits = createHorrorCorridorDomainKits({ preset });
  const domainKitIds = domainKits.domainManifest.kits.map((kit) => kit.id);
  const missingLampPartKitIds = corridorLampPartProfileKitIds.filter((kitId) => !domainKitIds.includes(kitId));
  const maze = generateMaze({
    size: preset.maze.gridSize,
    seed,
  });
  const manifest = createSceneDressingManifest(maze, preset);
  const kitReview = reviewSceneObjectKitCoverage(manifest.props, preset);
  const propKinds = countBy(manifest.props, (prop) => prop.kind);
  const materialFamilies = countBy(manifest.props, (prop) => prop.materialFamily);
  const textureKinds = countBy(manifest.textures, (texture) => texture.kind);
  const failures = [
    manifest.summary.validation.meetsPropThreshold ? null : "prop-threshold",
    manifest.summary.validation.meetsTextureThreshold ? null : "texture-threshold",
    manifest.summary.validation.meetsLightThreshold ? null : "light-threshold",
    manifest.summary.validation.readableSpawnView ? null : "spawn-readability",
    manifest.summary.anchorCount >= 48 ? null : "surface-anchor-count",
    manifest.summary.socketCount >= 24 ? null : "socket-graph-count",
    manifest.summary.layoutCount >= 8 ? null : "footprint-layout-count",
    manifest.summary.bundleCount >= 4 ? null : "scene-bundle-count",
    (propKinds.pipe ?? 0) + (propKinds["floor-pipe"] ?? 0) >= 12 ? null : "pipe-variety",
    (propKinds["grass-clump"] ?? 0) + (propKinds["root-strip"] ?? 0) >= 10 ? null : "terrain-object-variety",
    (propKinds["building-facade"] ?? 0) >= 8 ? null : "projected-building-facade-variety",
    (propKinds["utility-crate-stack"] ?? 0) >= 2 ? null : "utility-crate-kit-output",
    (propKinds["brick-rubble-pile"] ?? 0) >= 2 ? null : "brick-rubble-kit-output",
    (propKinds["loose-floor-slab"] ?? 0) >= 2 ? null : "loose-floor-slab-kit-output",
    (propKinds["ceiling-service-strip"] ?? 0) >= 4 ? null : "ceiling-service-strip-kit-output",
    (propKinds["rock-cluster"] ?? 0) >= 4 ? null : "rock-cluster-kit-output",
    (propKinds["lamp-post"] ?? 0) >= 4 ? null : "corridor-lamp-kit-output",
    (textureKinds["brick-course"] ?? 0) >= 4 ? null : "brick-course-texture-output",
    (textureKinds["damp-mud"] ?? 0) >= 8 ? null : "damp-mud-texture-output",
    (textureKinds["rust-streak"] ?? 0) >= 8 ? null : "rust-streak-texture-output",
    (textureKinds["moss-grime"] ?? 0) >= 8 ? null : "moss-grime-texture-output",
    (textureKinds["wet-concrete"] ?? 0) >= 8 ? null : "wet-concrete-texture-output",
    Object.keys(materialFamilies).length >= 5 ? null : "material-family-variety",
    kitReview.uncoveredPropKinds.length === 0 ? null : "scene-object-kit-coverage",
    kitReview.uncoveredMaterialFamilies.length === 0 ? null : "scene-object-material-review-mismatch",
    kitReview.missingMaterialFamilies.length === 0 ? null : "scene-object-material-family-coverage",
    kitReview.missingShaderProfiles.length === 0 ? null : "scene-object-shader-profile-coverage",
    missingLampPartKitIds.length === 0 ? null : "corridor-lamp-part-kit-manifest-coverage",
  ].filter((failure): failure is string => failure !== null);

  return NextResponse.json(
    {
      ok: failures.length === 0,
      seed,
      summary: manifest.summary,
      propKinds,
      materialFamilies,
      textureKinds,
      sceneObjectKitReview: kitReview,
      domainManifest: {
        kitCount: domainKitIds.length,
        missingLampPartKitIds,
      },
      sample: {
        props: manifest.props.slice(0, 8),
        textures: manifest.textures.slice(0, 8),
        lights: manifest.lights.slice(0, 4),
      },
      failures,
    },
    {
      status: failures.length === 0 ? 200 : 500,
    },
  );
}
