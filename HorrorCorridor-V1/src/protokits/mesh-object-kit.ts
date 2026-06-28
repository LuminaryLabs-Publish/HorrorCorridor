import { createHorrorDomainToken, type HorrorDomainKit } from "./domainKit";
import { createSceneObjectDomainKit, type SceneObjectDomainKitConfig } from "./scene-object-kit";
import {
  createWoundBoxMeshPart,
  createWoundTrapezoidMeshPart,
  type WoundMeshObjectDescriptor,
  type WoundMeshPartDescriptor,
  type WoundMeshVector3,
} from "./wound-triangle-mesh-domain-kit";

export type MeshObjectPartShape = "box" | "trapezoid";

export type MeshObjectPartSpec = Readonly<{
  id: string;
  label: string;
  shape: MeshObjectPartShape;
  size: WoundMeshVector3;
  center: WoundMeshVector3;
  materialFamily?: string;
  topScale?: number;
  tags?: readonly string[];
}>;

export type MeshObjectProfile = Readonly<{
  kitId: string;
  title: string;
  domain: string;
  services: readonly string[];
  propKind: string;
  materialFamilies: readonly string[];
  shaderProfile: string;
  palette: readonly number[];
  maxVisible: number;
  purpose: string;
  targetTraits: readonly string[];
  placementTags: readonly string[];
  parts: readonly MeshObjectPartSpec[];
}>;

export type MeshGeneratingObjectKitConfig = SceneObjectDomainKitConfig & Readonly<{
  meshProfile: {
    explicitTriangles: true;
    winding: "outward-ccw";
    partCount: number;
    targetTraits: readonly string[];
  };
}>;

export const createMeshGeneratingObjectKitConfig = (
  profile: MeshObjectProfile,
): MeshGeneratingObjectKitConfig => ({
  enabled: true,
  maxVisible: profile.maxVisible,
  materialFamilies: profile.materialFamilies,
  palette: profile.palette,
  propKinds: [profile.propKind],
  shaderProfiles: [profile.shaderProfile],
  meshProfile: {
    explicitTriangles: true,
    partCount: profile.parts.length,
    targetTraits: profile.targetTraits,
    winding: "outward-ccw",
  },
});

const createMeshPart = (
  profile: MeshObjectProfile,
  part: MeshObjectPartSpec,
): WoundMeshPartDescriptor => {
  const materialFamily = part.materialFamily ?? profile.materialFamilies[0] ?? "rusted-metal";
  const tags = ["mesh-object-kit", profile.kitId, ...(part.tags ?? [])];

  if (part.shape === "trapezoid") {
    return createWoundTrapezoidMeshPart(
      `${profile.kitId}-${part.id}`,
      part.label,
      part.size,
      part.center,
      part.topScale ?? 0.82,
      materialFamily,
      tags,
    );
  }

  return createWoundBoxMeshPart(
    `${profile.kitId}-${part.id}`,
    part.label,
    part.size,
    part.center,
    materialFamily,
    tags,
  );
};

export const createMeshObjectDescriptor = (
  profile: MeshObjectProfile,
): WoundMeshObjectDescriptor => ({
  id: `${profile.kitId}-mesh-descriptor`,
  kitId: profile.kitId,
  propKind: profile.propKind,
  triangleWinding: "outward-ccw",
  parts: profile.parts.map((part) => createMeshPart(profile, part)),
  sockets: [
    {
      id: `${profile.kitId}-floor-contact`,
      normal: { x: 0, y: 1, z: 0 },
      position: { x: 0, y: 0, z: 0 },
      tags: ["placement", "floor-contact"],
    },
  ],
  tags: ["explicit-wound-triangles", ...profile.placementTags],
});

export const createMeshGeneratingObjectKit = (
  profile: MeshObjectProfile,
  config: MeshGeneratingObjectKitConfig = createMeshGeneratingObjectKitConfig(profile),
): HorrorDomainKit =>
  createSceneObjectDomainKit(
    {
      domain: profile.domain,
      services: profile.services,
      resources: {
        MeshDescriptor: `${profile.domain}.meshDescriptor`,
        MeshValidationProfile: `${profile.domain}.meshValidationProfile`,
      },
      requires: [createHorrorDomainToken("wound-triangle-mesh")],
      purpose: profile.purpose,
    },
    config,
  );
