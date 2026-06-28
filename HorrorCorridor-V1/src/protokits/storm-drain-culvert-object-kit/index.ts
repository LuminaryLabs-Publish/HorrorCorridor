import { type HorrorDomainKit } from "../domainKit";
import {
  createMeshGeneratingObjectKit,
  createMeshGeneratingObjectKitConfig,
  createMeshObjectDescriptor,
  type MeshGeneratingObjectKitConfig,
  type MeshObjectProfile,
} from "../mesh-object-kit";

export const stormDrainCulvertObjectProfile = {
  kitId: "storm-drain-culvert-object-kit",
  title: "Storm Drain Culvert Object Kit",
  domain: "storm-drain-culvert-object",
  services: ["culvert-mouth-mesh", "grate-profile"],
  propKind: "storm-drain-culvert",
  materialFamilies: ["wet-concrete", "rusted-metal", "rubber-cable"],
  shaderProfile: "concrete-slab",
  palette: [0x23221f, 0x555145, 0x8f774f],
  maxVisible: 8,
  purpose: "Wall/floor-edge culvert object kit for muddy drainage mouths and grate landmarks.",
  targetTraits: ["arched concrete mouth", "rusted grate bars", "muddy rim", "water stain"],
  placementTags: ["wall-floor-edge", "terrain-drainage", "non-blocking"],
  parts: [
    { id: "culvert-shell", label: "arched culvert shell block", shape: "trapezoid", size: { x: 1.28, y: 0.82, z: 0.58 }, center: { x: 0, y: 0.45, z: 0 }, topScale: 0.72, materialFamily: "wet-concrete" },
    { id: "dark-mouth", label: "dark recessed drain mouth", shape: "box", size: { x: 0.82, y: 0.42, z: 0.08 }, center: { x: 0, y: 0.42, z: 0.32 }, materialFamily: "rubber-cable" },
    { id: "grate-a", label: "vertical grate bar", shape: "box", size: { x: 0.05, y: 0.48, z: 0.06 }, center: { x: -0.24, y: 0.42, z: 0.38 }, materialFamily: "rusted-metal" },
    { id: "grate-b", label: "vertical grate bar", shape: "box", size: { x: 0.05, y: 0.48, z: 0.06 }, center: { x: 0, y: 0.42, z: 0.38 }, materialFamily: "rusted-metal" },
    { id: "grate-c", label: "vertical grate bar", shape: "box", size: { x: 0.05, y: 0.48, z: 0.06 }, center: { x: 0.24, y: 0.42, z: 0.38 }, materialFamily: "rusted-metal" },
    { id: "mud-lip", label: "muddy lower lip", shape: "trapezoid", size: { x: 1.12, y: 0.14, z: 0.28 }, center: { x: 0, y: 0.08, z: 0.26 }, topScale: 0.88, materialFamily: "wet-concrete" },
  ],
} satisfies MeshObjectProfile;

export type StormDrainCulvertObjectKitConfig = MeshGeneratingObjectKitConfig;

export const stormDrainCulvertObjectKitConfig = createMeshGeneratingObjectKitConfig(stormDrainCulvertObjectProfile);

export const generateStormDrainCulvertMesh = () => createMeshObjectDescriptor(stormDrainCulvertObjectProfile);

export const createStormDrainCulvertObjectKit = (
  config: StormDrainCulvertObjectKitConfig = stormDrainCulvertObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(stormDrainCulvertObjectProfile, config);
