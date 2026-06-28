import { type HorrorDomainKit } from "../domainKit";
import {
  createMeshGeneratingObjectKit,
  createMeshGeneratingObjectKitConfig,
  createMeshObjectDescriptor,
  type MeshGeneratingObjectKitConfig,
  type MeshObjectProfile,
} from "../mesh-object-kit";

export const rustedServiceDoorObjectProfile = {
  kitId: "rusted-service-door-object-kit",
  title: "Rusted Service Door Object Kit",
  domain: "rusted-service-door-object",
  services: ["service-door-mesh", "wall-door-profile"],
  propKind: "rusted-service-door",
  materialFamilies: ["painted-metal", "rusted-metal"],
  shaderProfile: "painted-panel",
  palette: [0x32291f, 0x5e4631, 0x8b5b35],
  maxVisible: 10,
  purpose: "Wall-mounted rusted service door mesh kit for broken utility corridor landmarks.",
  targetTraits: ["warped metal slab", "heavy frame", "hinges", "latch", "warning plate"],
  placementTags: ["wall-mounted", "route-landmark", "non-blocking"],
  parts: [
    { id: "outer-frame", label: "thick wound door frame", shape: "box", size: { x: 1.42, y: 2.28, z: 0.16 }, center: { x: 0, y: 1.14, z: 0 }, materialFamily: "rusted-metal" },
    { id: "recessed-slab", label: "warped central door slab", shape: "trapezoid", size: { x: 1.12, y: 1.88, z: 0.1 }, center: { x: 0, y: 1.12, z: 0.08 }, topScale: 0.96, materialFamily: "painted-metal" },
    { id: "left-hinge-a", label: "upper hinge block", shape: "box", size: { x: 0.12, y: 0.26, z: 0.13 }, center: { x: -0.66, y: 1.72, z: 0.16 }, materialFamily: "rusted-metal" },
    { id: "left-hinge-b", label: "lower hinge block", shape: "box", size: { x: 0.12, y: 0.26, z: 0.13 }, center: { x: -0.66, y: 0.62, z: 0.16 }, materialFamily: "rusted-metal" },
    { id: "latch", label: "small latch plate", shape: "box", size: { x: 0.16, y: 0.24, z: 0.08 }, center: { x: 0.46, y: 1.18, z: 0.18 }, materialFamily: "rusted-metal" },
    { id: "warning-plate", label: "faded warning plate", shape: "box", size: { x: 0.48, y: 0.22, z: 0.035 }, center: { x: 0.08, y: 1.52, z: 0.2 }, materialFamily: "painted-metal" },
  ],
} satisfies MeshObjectProfile;

export type RustedServiceDoorObjectKitConfig = MeshGeneratingObjectKitConfig;

export const rustedServiceDoorObjectKitConfig = createMeshGeneratingObjectKitConfig(rustedServiceDoorObjectProfile);

export const generateRustedServiceDoorMesh = () => createMeshObjectDescriptor(rustedServiceDoorObjectProfile);

export const createRustedServiceDoorObjectKit = (
  config: RustedServiceDoorObjectKitConfig = rustedServiceDoorObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(rustedServiceDoorObjectProfile, config);
