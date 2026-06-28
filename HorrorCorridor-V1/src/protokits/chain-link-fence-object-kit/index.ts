import { type HorrorDomainKit } from "../domainKit";
import {
  createMeshGeneratingObjectKit,
  createMeshGeneratingObjectKitConfig,
  createMeshObjectDescriptor,
  type MeshGeneratingObjectKitConfig,
  type MeshObjectProfile,
} from "../mesh-object-kit";

export const chainLinkFenceObjectProfile = {
  kitId: "chain-link-fence-object-kit",
  title: "Chain Link Fence Object Kit",
  domain: "chain-link-fence-object",
  services: ["fence-panel-mesh", "torn-chain-link-profile"],
  propKind: "chain-link-fence",
  materialFamilies: ["rusted-metal"],
  shaderProfile: "oxidized-pipe",
  palette: [0x2a251e, 0x5a432f, 0x9c6c3d],
  maxVisible: 12,
  purpose: "Non-blocking broken fence panel kit with explicit rail and diamond-link mesh descriptors.",
  targetTraits: ["upright posts", "rectangular rail frame", "diamond mesh", "torn edge strips"],
  placementTags: ["floor-mounted", "edge-divider", "non-blocking"],
  parts: [
    { id: "left-post", label: "left fence post", shape: "box", size: { x: 0.1, y: 1.9, z: 0.1 }, center: { x: -1.15, y: 0.95, z: 0 }, materialFamily: "rusted-metal" },
    { id: "right-post", label: "right fence post", shape: "box", size: { x: 0.1, y: 1.72, z: 0.1 }, center: { x: 1.15, y: 0.86, z: 0 }, materialFamily: "rusted-metal" },
    { id: "top-rail", label: "bent top rail", shape: "box", size: { x: 2.38, y: 0.08, z: 0.08 }, center: { x: 0, y: 1.72, z: 0 }, materialFamily: "rusted-metal" },
    { id: "bottom-rail", label: "bottom rail", shape: "box", size: { x: 2.22, y: 0.07, z: 0.08 }, center: { x: 0, y: 0.18, z: 0 }, materialFamily: "rusted-metal" },
    { id: "diamond-mesh-a", label: "diagonal chain links forward", shape: "box", size: { x: 2.12, y: 0.035, z: 0.035 }, center: { x: 0, y: 0.96, z: 0.02 }, materialFamily: "rusted-metal", tags: ["diamond-link"] },
    { id: "diamond-mesh-b", label: "diagonal chain links reverse", shape: "box", size: { x: 2.12, y: 0.035, z: 0.035 }, center: { x: 0, y: 0.82, z: -0.02 }, materialFamily: "rusted-metal", tags: ["diamond-link"] },
    { id: "torn-strip", label: "torn hanging mesh strip", shape: "box", size: { x: 0.08, y: 0.78, z: 0.04 }, center: { x: 0.62, y: 0.62, z: 0.04 }, materialFamily: "rusted-metal" },
  ],
} satisfies MeshObjectProfile;

export type ChainLinkFenceObjectKitConfig = MeshGeneratingObjectKitConfig;

export const chainLinkFenceObjectKitConfig = createMeshGeneratingObjectKitConfig(chainLinkFenceObjectProfile);

export const generateChainLinkFenceMesh = () => createMeshObjectDescriptor(chainLinkFenceObjectProfile);

export const createChainLinkFenceObjectKit = (
  config: ChainLinkFenceObjectKitConfig = chainLinkFenceObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(chainLinkFenceObjectProfile, config);
