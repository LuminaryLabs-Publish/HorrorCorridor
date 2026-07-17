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
  palette: [0x241d18, 0x563522, 0x9a542d],
  maxVisible: 10,
  purpose: "Wall-mounted rusted service door mesh kit for broken utility corridor landmarks.",
  targetTraits: [
    "warped recessed metal slab",
    "separate heavy frame rails",
    "corroded hinge blocks",
    "raised latch hardware",
    "faded warning plate",
    "seam and bolt detail",
  ],
  placementTags: ["wall-mounted", "route-landmark", "non-blocking"],
  parts: [
    { id: "backing-frame", label: "dark wound frame backing", shape: "box", size: { x: 1.42, y: 2.28, z: 0.1 }, center: { x: 0, y: 1.14, z: 0 }, materialFamily: "rusted-metal", tags: ["frame", "deep-grime"] },
    { id: "frame-top", label: "thick upper frame rail", shape: "box", size: { x: 1.46, y: 0.2, z: 0.18 }, center: { x: 0, y: 2.18, z: 0.1 }, materialFamily: "rusted-metal", tags: ["frame", "edge-wear"] },
    { id: "frame-bottom", label: "thick lower frame rail", shape: "box", size: { x: 1.46, y: 0.2, z: 0.18 }, center: { x: 0, y: 0.1, z: 0.1 }, materialFamily: "rusted-metal", tags: ["frame", "edge-wear"] },
    { id: "frame-left", label: "left frame stile", shape: "box", size: { x: 0.2, y: 1.9, z: 0.18 }, center: { x: -0.63, y: 1.14, z: 0.1 }, materialFamily: "rusted-metal", tags: ["frame", "edge-wear"] },
    { id: "frame-right", label: "right frame stile", shape: "box", size: { x: 0.2, y: 1.9, z: 0.18 }, center: { x: 0.63, y: 1.14, z: 0.1 }, materialFamily: "rusted-metal", tags: ["frame", "edge-wear"] },
    { id: "recessed-slab", label: "warped central door slab", shape: "trapezoid", size: { x: 1.1, y: 1.86, z: 0.1 }, center: { x: 0, y: 1.14, z: 0.16 }, topScale: 0.94, materialFamily: "painted-metal", tags: ["door-skin", "chipped-paint"] },
    { id: "inset-panel", label: "shallow inset service panel", shape: "trapezoid", size: { x: 0.88, y: 1.38, z: 0.045 }, center: { x: -0.03, y: 1.16, z: 0.225 }, topScale: 0.97, materialFamily: "painted-metal", tags: ["recess", "oil-stain"] },
    { id: "panel-seam", label: "vertical panel seam", shape: "box", size: { x: 0.035, y: 1.48, z: 0.035 }, center: { x: -0.04, y: 1.14, z: 0.255 }, materialFamily: "rusted-metal", tags: ["seam", "dark-grime"] },
    { id: "panel-brace", label: "offset reinforcement bar", shape: "box", size: { x: 0.72, y: 0.06, z: 0.045 }, center: { x: 0.09, y: 0.72, z: 0.26 }, materialFamily: "rusted-metal", tags: ["brace", "edge-wear"] },
    { id: "left-hinge-a", label: "upper corroded hinge block", shape: "box", size: { x: 0.15, y: 0.28, z: 0.16 }, center: { x: -0.73, y: 1.72, z: 0.22 }, materialFamily: "rusted-metal", tags: ["hinge", "corrosion"] },
    { id: "left-hinge-b", label: "lower corroded hinge block", shape: "box", size: { x: 0.15, y: 0.28, z: 0.16 }, center: { x: -0.73, y: 0.6, z: 0.22 }, materialFamily: "rusted-metal", tags: ["hinge", "corrosion"] },
    { id: "latch", label: "raised latch plate", shape: "box", size: { x: 0.2, y: 0.28, z: 0.1 }, center: { x: 0.47, y: 1.16, z: 0.27 }, materialFamily: "rusted-metal", tags: ["latch", "hand-contact"] },
    { id: "latch-handle", label: "short latch handle", shape: "box", size: { x: 0.28, y: 0.07, z: 0.07 }, center: { x: 0.42, y: 1.08, z: 0.34 }, materialFamily: "rusted-metal", tags: ["latch", "edge-wear"] },
    { id: "warning-plate", label: "faded warning plate", shape: "box", size: { x: 0.5, y: 0.24, z: 0.04 }, center: { x: 0.02, y: 1.64, z: 0.29 }, materialFamily: "painted-metal", tags: ["warning", "faded-paint"] },
    { id: "warning-rivet-left", label: "warning plate left rivet", shape: "box", size: { x: 0.045, y: 0.045, z: 0.045 }, center: { x: -0.2, y: 1.64, z: 0.34 }, materialFamily: "rusted-metal", tags: ["fastener", "corrosion"] },
    { id: "warning-rivet-right", label: "warning plate right rivet", shape: "box", size: { x: 0.045, y: 0.045, z: 0.045 }, center: { x: 0.24, y: 1.64, z: 0.34 }, materialFamily: "rusted-metal", tags: ["fastener", "corrosion"] },
  ],
} satisfies MeshObjectProfile;

export type RustedServiceDoorObjectKitConfig = MeshGeneratingObjectKitConfig;

export const rustedServiceDoorObjectKitConfig = createMeshGeneratingObjectKitConfig(rustedServiceDoorObjectProfile);

export const generateRustedServiceDoorMesh = () => createMeshObjectDescriptor(rustedServiceDoorObjectProfile);

export const createRustedServiceDoorObjectKit = (
  config: RustedServiceDoorObjectKitConfig = rustedServiceDoorObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(rustedServiceDoorObjectProfile, config);
