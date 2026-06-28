import { type HorrorDomainKit } from "../domainKit";
import {
  createMeshGeneratingObjectKit,
  createMeshGeneratingObjectKitConfig,
  createMeshObjectDescriptor,
  type MeshGeneratingObjectKitConfig,
  type MeshObjectProfile,
} from "../mesh-object-kit";

export const hangingChainHookObjectProfile = {
  kitId: "hanging-chain-hook-object-kit",
  title: "Hanging Chain Hook Object Kit",
  domain: "hanging-chain-hook-object",
  services: ["chain-link-mesh", "ceiling-hanger-profile"],
  propKind: "hanging-chain-hook",
  materialFamilies: ["rusted-metal"],
  shaderProfile: "oxidized-pipe",
  palette: [0x201b15, 0x5a3824, 0x9a673a],
  maxVisible: 12,
  purpose: "Ceiling/wall hanging chain kit with repeated wound links, hook, and anchor plate.",
  targetTraits: ["anchor plate", "separate chain links", "rusted hook", "overhead silhouette"],
  placementTags: ["ceiling-mounted", "overhead-detail", "non-blocking"],
  parts: [
    { id: "anchor-plate", label: "ceiling anchor plate", shape: "box", size: { x: 0.42, y: 0.08, z: 0.32 }, center: { x: 0, y: 2.12, z: 0 }, materialFamily: "rusted-metal" },
    { id: "link-a", label: "chain link a", shape: "trapezoid", size: { x: 0.16, y: 0.28, z: 0.06 }, center: { x: 0, y: 1.88, z: 0 }, topScale: 0.72, materialFamily: "rusted-metal" },
    { id: "link-b", label: "chain link b", shape: "trapezoid", size: { x: 0.06, y: 0.28, z: 0.16 }, center: { x: 0, y: 1.62, z: 0 }, topScale: 0.72, materialFamily: "rusted-metal" },
    { id: "link-c", label: "chain link c", shape: "trapezoid", size: { x: 0.16, y: 0.28, z: 0.06 }, center: { x: 0, y: 1.36, z: 0 }, topScale: 0.72, materialFamily: "rusted-metal" },
    { id: "hook-stem", label: "hook stem", shape: "box", size: { x: 0.06, y: 0.42, z: 0.06 }, center: { x: 0, y: 1.08, z: 0 }, materialFamily: "rusted-metal" },
    { id: "hook-crook", label: "angular hook crook", shape: "trapezoid", size: { x: 0.28, y: 0.22, z: 0.06 }, center: { x: 0.08, y: 0.82, z: 0 }, topScale: 0.55, materialFamily: "rusted-metal" },
  ],
} satisfies MeshObjectProfile;

export type HangingChainHookObjectKitConfig = MeshGeneratingObjectKitConfig;

export const hangingChainHookObjectKitConfig = createMeshGeneratingObjectKitConfig(hangingChainHookObjectProfile);

export const generateHangingChainHookMesh = () => createMeshObjectDescriptor(hangingChainHookObjectProfile);

export const createHangingChainHookObjectKit = (
  config: HangingChainHookObjectKitConfig = hangingChainHookObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(hangingChainHookObjectProfile, config);
