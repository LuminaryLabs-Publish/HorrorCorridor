import { type HorrorDomainKit } from "../domainKit";
import {
  createMeshGeneratingObjectKit,
  createMeshGeneratingObjectKitConfig,
  createMeshObjectDescriptor,
  type MeshGeneratingObjectKitConfig,
  type MeshObjectProfile,
} from "../mesh-object-kit";

export const industrialShelvingObjectProfile = {
  kitId: "industrial-shelving-object-kit",
  title: "Industrial Shelving Object Kit",
  domain: "industrial-shelving-object",
  services: ["shelf-frame-mesh", "wall-side-storage-profile"],
  propKind: "industrial-shelving",
  materialFamilies: ["rusted-metal", "painted-utility"],
  shaderProfile: "utility-crate",
  palette: [0x26241d, 0x52442f, 0x7f6b45],
  maxVisible: 10,
  purpose: "Wall-side shelf kit with vertical posts, warped shelves, brackets, and loose boxes.",
  targetTraits: ["open shelf frame", "warped shelves", "loose boxes", "broken brackets"],
  placementTags: ["wall-side", "storage-landmark", "non-blocking"],
  parts: [
    { id: "post-left-front", label: "left front shelf post", shape: "box", size: { x: 0.08, y: 1.72, z: 0.08 }, center: { x: -0.62, y: 0.86, z: 0.32 }, materialFamily: "rusted-metal" },
    { id: "post-right-front", label: "right front shelf post", shape: "box", size: { x: 0.08, y: 1.62, z: 0.08 }, center: { x: 0.62, y: 0.81, z: 0.32 }, materialFamily: "rusted-metal" },
    { id: "post-left-back", label: "left rear shelf post", shape: "box", size: { x: 0.08, y: 1.62, z: 0.08 }, center: { x: -0.62, y: 0.81, z: -0.32 }, materialFamily: "rusted-metal" },
    { id: "post-right-back", label: "right rear shelf post", shape: "box", size: { x: 0.08, y: 1.72, z: 0.08 }, center: { x: 0.62, y: 0.86, z: -0.32 }, materialFamily: "rusted-metal" },
    { id: "shelf-low", label: "warped lower shelf", shape: "trapezoid", size: { x: 1.42, y: 0.08, z: 0.74 }, center: { x: 0, y: 0.52, z: 0 }, topScale: 0.96, materialFamily: "rusted-metal" },
    { id: "shelf-high", label: "warped upper shelf", shape: "trapezoid", size: { x: 1.36, y: 0.08, z: 0.7 }, center: { x: 0, y: 1.18, z: 0 }, topScale: 0.92, materialFamily: "rusted-metal" },
    { id: "loose-box-a", label: "small utility box", shape: "box", size: { x: 0.42, y: 0.34, z: 0.36 }, center: { x: -0.28, y: 0.75, z: 0.06 }, materialFamily: "painted-utility" },
    { id: "loose-box-b", label: "tilted utility box", shape: "trapezoid", size: { x: 0.36, y: 0.28, z: 0.32 }, center: { x: 0.34, y: 1.38, z: -0.06 }, topScale: 0.86, materialFamily: "painted-utility" },
  ],
} satisfies MeshObjectProfile;

export type IndustrialShelvingObjectKitConfig = MeshGeneratingObjectKitConfig;

export const industrialShelvingObjectKitConfig = createMeshGeneratingObjectKitConfig(industrialShelvingObjectProfile);

export const generateIndustrialShelvingMesh = () => createMeshObjectDescriptor(industrialShelvingObjectProfile);

export const createIndustrialShelvingObjectKit = (
  config: IndustrialShelvingObjectKitConfig = industrialShelvingObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(industrialShelvingObjectProfile, config);
