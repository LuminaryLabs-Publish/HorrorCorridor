import { type HorrorDomainKit } from "../domainKit";
import {
  createMeshGeneratingObjectKit,
  createMeshGeneratingObjectKitConfig,
  createMeshObjectDescriptor,
  type MeshGeneratingObjectKitConfig,
  type MeshObjectProfile,
} from "../mesh-object-kit";

export const barrelClusterObjectProfile = {
  kitId: "barrel-cluster-object-kit",
  title: "Barrel Cluster Object Kit",
  domain: "barrel-cluster-object",
  services: ["barrel-cluster-mesh", "leaking-container-profile"],
  propKind: "barrel-cluster",
  materialFamilies: ["painted-metal", "rusted-metal", "wet-concrete"],
  shaderProfile: "painted-panel",
  palette: [0x2a241d, 0x5d432b, 0x876038],
  maxVisible: 10,
  purpose: "Dented barrel cluster kit with rib bands, lids, leak patch, and varied silhouettes.",
  targetTraits: ["dented barrels", "rib bands", "lids", "leaking stain", "cluster variation"],
  placementTags: ["floor-mounted", "storage-clutter", "non-blocking"],
  parts: [
    { id: "barrel-a-body", label: "large dented barrel", shape: "trapezoid", size: { x: 0.48, y: 0.92, z: 0.48 }, center: { x: -0.28, y: 0.46, z: 0 }, topScale: 0.86, materialFamily: "painted-metal" },
    { id: "barrel-a-rib-top", label: "top rib band", shape: "box", size: { x: 0.54, y: 0.06, z: 0.54 }, center: { x: -0.28, y: 0.78, z: 0 }, materialFamily: "rusted-metal" },
    { id: "barrel-a-rib-low", label: "lower rib band", shape: "box", size: { x: 0.54, y: 0.06, z: 0.54 }, center: { x: -0.28, y: 0.22, z: 0 }, materialFamily: "rusted-metal" },
    { id: "barrel-b-body", label: "short dented barrel", shape: "trapezoid", size: { x: 0.42, y: 0.72, z: 0.42 }, center: { x: 0.32, y: 0.36, z: 0.12 }, topScale: 0.8, materialFamily: "painted-metal" },
    { id: "barrel-b-lid", label: "tilted lid", shape: "trapezoid", size: { x: 0.5, y: 0.08, z: 0.44 }, center: { x: 0.32, y: 0.76, z: 0.12 }, topScale: 0.7, materialFamily: "rusted-metal" },
    { id: "leak-patch", label: "floor leak patch", shape: "trapezoid", size: { x: 0.78, y: 0.035, z: 0.46 }, center: { x: 0.08, y: 0.02, z: 0.36 }, topScale: 0.76, materialFamily: "wet-concrete" },
  ],
} satisfies MeshObjectProfile;

export type BarrelClusterObjectKitConfig = MeshGeneratingObjectKitConfig;

export const barrelClusterObjectKitConfig = createMeshGeneratingObjectKitConfig(barrelClusterObjectProfile);

export const generateBarrelClusterMesh = () => createMeshObjectDescriptor(barrelClusterObjectProfile);

export const createBarrelClusterObjectKit = (
  config: BarrelClusterObjectKitConfig = barrelClusterObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(barrelClusterObjectProfile, config);
