import { type HorrorDomainKit } from "../domainKit";
import {
  createMeshGeneratingObjectKit,
  createMeshGeneratingObjectKitConfig,
  createMeshObjectDescriptor,
  type MeshGeneratingObjectKitConfig,
  type MeshObjectProfile,
} from "../mesh-object-kit";

export const brokenGeneratorObjectProfile = {
  kitId: "broken-generator-object-kit",
  title: "Broken Generator Object Kit",
  domain: "broken-generator-object",
  services: ["generator-body-mesh", "floor-machine-profile"],
  propKind: "broken-generator",
  materialFamilies: ["painted-metal", "rusted-metal", "rubber-cable"],
  shaderProfile: "utility-crate",
  palette: [0x24221c, 0x4d4634, 0x8a6038],
  maxVisible: 8,
  purpose: "Floor landmark kit for a grounded, dented utility generator with a broken service shell, readable front controls, vents, feet, and a trailing cable.",
  targetTraits: [
    "grounded chassis skid",
    "dented engine housing",
    "broken service shell",
    "front vent grille",
    "tilted control panel",
    "cable sockets",
    "rusted feet",
    "trailing cable",
  ],
  placementTags: ["floor-mounted", "large-landmark", "non-blocking"],
  parts: [
    { id: "chassis-skid", label: "grounded lower chassis skid", shape: "trapezoid", size: { x: 1.42, y: 0.18, z: 0.76 }, center: { x: 0, y: 0.1, z: 0 }, topScale: 0.9, materialFamily: "rusted-metal", tags: ["ground-contact", "base"] },
    { id: "engine-body", label: "dented generator engine housing", shape: "trapezoid", size: { x: 1.3, y: 0.78, z: 0.72 }, center: { x: 0, y: 0.55, z: 0 }, topScale: 0.86, materialFamily: "painted-metal", tags: ["primary-silhouette", "dented"] },
    { id: "rear-housing", label: "offset rear cooling housing", shape: "box", size: { x: 0.3, y: 0.56, z: 0.58 }, center: { x: -0.48, y: 0.52, z: -0.03 }, materialFamily: "rusted-metal", tags: ["rear-mass"] },
    { id: "top-cap", label: "offset service cap", shape: "trapezoid", size: { x: 0.76, y: 0.14, z: 0.48 }, center: { x: -0.14, y: 0.99, z: 0.01 }, topScale: 0.82, materialFamily: "rusted-metal", tags: ["service-access"] },
    { id: "broken-top-panel", label: "broken raised service panel", shape: "trapezoid", size: { x: 0.34, y: 0.06, z: 0.24 }, center: { x: 0.3, y: 1.07, z: 0.08 }, topScale: 0.55, materialFamily: "rusted-metal", tags: ["damage", "broken"] },
    { id: "front-vent-frame", label: "recessed front vent frame", shape: "box", size: { x: 0.7, y: 0.34, z: 0.045 }, center: { x: -0.08, y: 0.55, z: 0.37 }, materialFamily: "rubber-cable", tags: ["vent", "recess"] },
    { id: "front-vent-a", label: "front vent upper slat", shape: "box", size: { x: 0.58, y: 0.045, z: 0.045 }, center: { x: -0.08, y: 0.65, z: 0.4 }, materialFamily: "rusted-metal", tags: ["vent"] },
    { id: "front-vent-b", label: "front vent middle slat", shape: "box", size: { x: 0.62, y: 0.045, z: 0.045 }, center: { x: -0.08, y: 0.55, z: 0.4 }, materialFamily: "rusted-metal", tags: ["vent"] },
    { id: "front-vent-c", label: "front vent lower slat", shape: "box", size: { x: 0.5, y: 0.045, z: 0.045 }, center: { x: -0.08, y: 0.45, z: 0.4 }, materialFamily: "rusted-metal", tags: ["vent", "damaged"] },
    { id: "control-panel", label: "tilted front control panel", shape: "trapezoid", size: { x: 0.32, y: 0.28, z: 0.055 }, center: { x: 0.42, y: 0.58, z: 0.39 }, topScale: 0.78, materialFamily: "painted-metal", tags: ["controls", "front-face"] },
    { id: "socket-panel", label: "recessed cable socket panel", shape: "box", size: { x: 0.22, y: 0.16, z: 0.045 }, center: { x: 0.42, y: 0.58, z: 0.43 }, materialFamily: "rubber-cable", tags: ["socket", "controls"] },
    { id: "pull-handle", label: "upper pull handle", shape: "box", size: { x: 0.48, y: 0.06, z: 0.06 }, center: { x: 0.12, y: 0.98, z: 0.26 }, materialFamily: "rusted-metal", tags: ["handle"] },
    { id: "left-foot", label: "left rusted mounting foot", shape: "box", size: { x: 0.28, y: 0.12, z: 0.22 }, center: { x: -0.46, y: 0.08, z: 0.25 }, materialFamily: "rusted-metal", tags: ["mount"] },
    { id: "right-foot", label: "right rusted mounting foot", shape: "box", size: { x: 0.28, y: 0.12, z: 0.22 }, center: { x: 0.46, y: 0.08, z: 0.25 }, materialFamily: "rusted-metal", tags: ["mount"] },
    { id: "cable-socket", label: "low side cable socket", shape: "box", size: { x: 0.13, y: 0.13, z: 0.06 }, center: { x: 0.59, y: 0.3, z: 0.3 }, materialFamily: "rubber-cable", tags: ["socket", "cable"] },
    { id: "loose-cable", label: "trailing loose cable", shape: "box", size: { x: 0.1, y: 0.1, z: 0.46 }, center: { x: 0.72, y: 0.16, z: -0.03 }, materialFamily: "rubber-cable", tags: ["cable", "ground-contact"] },
    { id: "loose-cable-tail", label: "cable tail on floor", shape: "box", size: { x: 0.34, y: 0.08, z: 0.1 }, center: { x: 0.84, y: 0.06, z: -0.3 }, materialFamily: "rubber-cable", tags: ["cable", "ground-contact"] },
  ],
} satisfies MeshObjectProfile;

export type BrokenGeneratorObjectKitConfig = MeshGeneratingObjectKitConfig;

export const brokenGeneratorObjectKitConfig = createMeshGeneratingObjectKitConfig(brokenGeneratorObjectProfile);

export const generateBrokenGeneratorMesh = () => createMeshObjectDescriptor(brokenGeneratorObjectProfile);

export const createBrokenGeneratorObjectKit = (
  config: BrokenGeneratorObjectKitConfig = brokenGeneratorObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(brokenGeneratorObjectProfile, config);
