import type { HorrorCorridorPreset } from "./presets/horror-corridor-preset";
import { corridorLampPartProfileKitIds } from "./corridor-lamp-object-kit";
import { meshObjectCatalog } from "./mesh-object-kit-catalog";

export type SceneObjectKitReviewEntry = Readonly<{
  kitId: string;
  title: string;
  propKinds: readonly string[];
  materialFamilies: readonly string[];
  partKitIds?: readonly string[];
  shaderProfiles: readonly string[];
}>;

type ReviewedProp = Readonly<{
  kind: string;
  materialFamily: string;
}>;

const objectProfile = (
  preset: HorrorCorridorPreset,
  key: string,
): string => preset.propMaterialFidelity.objectProfiles[key]?.shaderProfile ?? "painted-panel";

export const createSceneObjectKitReview = (
  preset: HorrorCorridorPreset,
): readonly SceneObjectKitReviewEntry[] => [
  {
    kitId: "broken-city-wall-kit",
    title: "Broken City Wall Kit",
    propKinds: ["building-facade"],
    materialFamilies: ["broken-brick", "damp-concrete"],
    shaderProfiles: [objectProfile(preset, "building-facade")],
  },
  {
    kitId: "wall-panel-object-kit",
    title: "Wall Panel Object Kit",
    propKinds: ["wall-box"],
    materialFamilies: ["painted-metal"],
    shaderProfiles: [objectProfile(preset, "wall-box")],
  },
  {
    kitId: "pipe-run-object-kit",
    title: "Pipe Run Object Kit",
    propKinds: ["pipe", "floor-pipe"],
    materialFamilies: ["rusted-metal", "painted-metal"],
    shaderProfiles: [objectProfile(preset, "pipe"), objectProfile(preset, "floor-pipe")],
  },
  {
    kitId: "cable-run-object-kit",
    title: "Cable Run Object Kit",
    propKinds: ["cable"],
    materialFamilies: ["rubber-cable"],
    shaderProfiles: [objectProfile(preset, "cable")],
  },
  {
    kitId: "vent-object-kit",
    title: "Vent Object Kit",
    propKinds: ["vent", "ceiling-duct"],
    materialFamilies: ["painted-metal", "rusted-metal"],
    shaderProfiles: [objectProfile(preset, "vent"), objectProfile(preset, "ceiling-duct")],
  },
  {
    kitId: "utility-crate-object-kit",
    title: "Utility Crate Stack Kit",
    propKinds: ["utility-crate-stack"],
    materialFamilies: ["painted-utility"],
    shaderProfiles: [objectProfile(preset, "utility-crate-stack")],
  },
  {
    kitId: "storage-crate-object-kit",
    title: "Storage Crate Kit",
    propKinds: ["crate"],
    materialFamilies: ["painted-metal"],
    shaderProfiles: [objectProfile(preset, "crate")],
  },
  {
    kitId: "corroded-table-object-kit",
    title: "Corroded Table Kit",
    propKinds: ["table"],
    materialFamilies: ["painted-metal"],
    shaderProfiles: [objectProfile(preset, "table")],
  },
  {
    kitId: "corridor-lamp-object-kit",
    title: "Corridor Lamp Object Kit",
    propKinds: ["lamp-post"],
    materialFamilies: ["rusted-metal"],
    partKitIds: corridorLampPartProfileKitIds,
    shaderProfiles: [objectProfile(preset, "lamp-post")],
  },
  {
    kitId: "brick-rubble-object-kit",
    title: "Brick Rubble Kit",
    propKinds: ["brick-rubble-pile"],
    materialFamilies: ["broken-brick"],
    shaderProfiles: [objectProfile(preset, "brick-rubble-pile")],
  },
  {
    kitId: "loose-floor-slab-object-kit",
    title: "Loose Floor Slab Kit",
    propKinds: ["loose-floor-slab"],
    materialFamilies: ["wet-concrete"],
    shaderProfiles: [objectProfile(preset, "loose-floor-slab")],
  },
  {
    kitId: "ceiling-service-strip-object-kit",
    title: "Ceiling Service Strip Kit",
    propKinds: ["ceiling-service-strip"],
    materialFamilies: ["rusted-metal"],
    shaderProfiles: [objectProfile(preset, "ceiling-service-strip")],
  },
  {
    kitId: "debris-scatter-object-kit",
    title: "Debris Scatter Kit",
    propKinds: ["debris", "rubble"],
    materialFamilies: ["broken-rubble", "damp-concrete"],
    shaderProfiles: [objectProfile(preset, "debris"), objectProfile(preset, "rubble")],
  },
  {
    kitId: "rock-cluster-object-kit",
    title: "Rock Cluster Object Kit",
    propKinds: ["rock-cluster"],
    materialFamilies: ["broken-rubble"],
    shaderProfiles: [objectProfile(preset, "rock-cluster")],
  },
  {
    kitId: "pedestal-dressing-object-kit",
    title: "Pedestal Dressing Kit",
    propKinds: ["pedestal-dressing"],
    materialFamilies: ["painted-utility"],
    shaderProfiles: [objectProfile(preset, "pedestal-dressing")],
  },
  {
    kitId: "overgrowth-object-kit",
    title: "Overgrowth Object Kit",
    propKinds: ["grass-clump", "root-strip", "hanging-vine"],
    materialFamilies: ["muddy-grass", "root-fiber"],
    shaderProfiles: [
      objectProfile(preset, "grass-clump"),
      objectProfile(preset, "root-strip"),
      objectProfile(preset, "hanging-vine"),
    ],
  },
  ...meshObjectCatalog.map((entry) => ({
    kitId: entry.profile.kitId,
    title: entry.profile.title,
    propKinds: [entry.profile.propKind],
    materialFamilies: entry.profile.materialFamilies,
    shaderProfiles: [objectProfile(preset, entry.profile.propKind)],
  })),
];

export const reviewSceneObjectKitCoverage = (
  props: readonly ReviewedProp[],
  preset: HorrorCorridorPreset,
): Readonly<{
  coverage: readonly SceneObjectKitReviewEntry[];
  uncoveredPropKinds: readonly string[];
  uncoveredMaterialFamilies: readonly string[];
  missingMaterialFamilies: readonly string[];
  missingShaderProfiles: readonly string[];
}> => {
  const coverage = createSceneObjectKitReview(preset);
  const coveredKinds = new Set(coverage.flatMap((entry) => entry.propKinds));
  const availableFamilies = new Set(preset.proceduralPbrMaterial.materialFamilies);
  const availableProfiles = new Set(
    Object.values(preset.propMaterialFidelity.objectProfiles).map((profile) => profile.shaderProfile),
  );
  const propKinds = Array.from(new Set(props.map((prop) => prop.kind)));
  const uncoveredMaterialFamilies = props.flatMap((prop) => {
    const match = coverage.find((entry) => entry.propKinds.includes(prop.kind));
    if (!match) {
      return [];
    }
    return match.materialFamilies.includes(prop.materialFamily) ? [] : [prop.materialFamily];
  });

  return {
    coverage,
    uncoveredPropKinds: propKinds.filter((kind) => !coveredKinds.has(kind)),
    uncoveredMaterialFamilies,
    missingMaterialFamilies: coverage.flatMap((entry) =>
      entry.materialFamilies.filter((family) => !availableFamilies.has(family)),
    ),
    missingShaderProfiles: coverage.flatMap((entry) =>
      entry.shaderProfiles.filter((profile) => !availableProfiles.has(profile)),
    ),
  };
};
