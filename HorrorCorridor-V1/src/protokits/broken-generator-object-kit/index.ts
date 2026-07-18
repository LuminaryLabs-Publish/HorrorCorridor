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
    "open grounded chassis frame",
    "large circular flywheel",
    "exposed engine block and cooling fins",
    "horizontal fuel tank",
    "crooked exhaust stack",
    "front controls and cable sockets",
    "rusted runners",
    "trailing cable",
  ],
  placementTags: ["floor-mounted", "large-landmark", "non-blocking"],
  parts: [
    { id: "runner-near", label: "near rusted chassis runner", shape: "box", size: { x: 1.72, y: 0.12, z: 0.12 }, center: { x: 0, y: 0.08, z: 0.34 }, materialFamily: "rusted-metal", tags: ["ground-contact", "base", "open-frame"] },
    { id: "runner-far", label: "far rusted chassis runner", shape: "box", size: { x: 1.72, y: 0.12, z: 0.12 }, center: { x: 0, y: 0.08, z: -0.34 }, materialFamily: "rusted-metal", tags: ["ground-contact", "base", "open-frame"] },
    { id: "frame-cross-left", label: "left chassis cross brace", shape: "box", size: { x: 0.12, y: 0.14, z: 0.78 }, center: { x: -0.68, y: 0.13, z: 0 }, materialFamily: "rusted-metal", tags: ["base", "open-frame"] },
    { id: "frame-cross-right", label: "right chassis cross brace", shape: "box", size: { x: 0.12, y: 0.14, z: 0.78 }, center: { x: 0.68, y: 0.13, z: 0 }, materialFamily: "rusted-metal", tags: ["base", "open-frame"] },
    { id: "frame-post-left", label: "left exposed frame post", shape: "box", size: { x: 0.09, y: 0.9, z: 0.09 }, center: { x: -0.72, y: 0.56, z: -0.31 }, materialFamily: "rusted-metal", tags: ["open-frame", "vertical-silhouette"] },
    { id: "frame-post-right", label: "right exposed frame post", shape: "box", size: { x: 0.09, y: 0.94, z: 0.09 }, center: { x: 0.72, y: 0.58, z: -0.31 }, materialFamily: "rusted-metal", tags: ["open-frame", "vertical-silhouette"] },
    { id: "frame-top", label: "bent upper frame rail", shape: "box", size: { x: 1.5, y: 0.09, z: 0.09 }, center: { x: 0, y: 1.02, z: -0.31 }, materialFamily: "rusted-metal", tags: ["open-frame", "broken"] },
    { id: "engine-drum", label: "exposed circular generator drum", shape: "cylinder", size: { x: 0.82, y: 0.82, z: 0.64 }, center: { x: -0.3, y: 0.57, z: 0.02 }, axis: "z", radialSegments: 16, materialFamily: "painted-metal", tags: ["primary-silhouette", "engine", "round-mass"] },
    { id: "flywheel-rim", label: "rusted outer flywheel rim", shape: "cylinder", size: { x: 0.92, y: 0.92, z: 0.08 }, center: { x: -0.3, y: 0.57, z: 0.37 }, axis: "z", radialSegments: 16, materialFamily: "rusted-metal", tags: ["primary-silhouette", "flywheel", "front-face"] },
    { id: "flywheel-face", label: "dark recessed flywheel face", shape: "cylinder", size: { x: 0.68, y: 0.68, z: 0.065 }, center: { x: -0.3, y: 0.57, z: 0.425 }, axis: "z", radialSegments: 16, materialFamily: "rubber-cable", tags: ["flywheel", "recess", "front-face"] },
    { id: "rotor-hub", label: "rusted flywheel hub", shape: "cylinder", size: { x: 0.2, y: 0.2, z: 0.14 }, center: { x: -0.3, y: 0.57, z: 0.49 }, axis: "z", radialSegments: 12, materialFamily: "rusted-metal", tags: ["flywheel", "hub", "front-face"] },
    { id: "flywheel-spoke-horizontal", label: "exposed horizontal flywheel spoke", shape: "box", size: { x: 0.56, y: 0.065, z: 0.045 }, center: { x: -0.3, y: 0.57, z: 0.475 }, materialFamily: "rusted-metal", tags: ["flywheel", "spoke", "front-face"] },
    { id: "flywheel-spoke-vertical", label: "exposed vertical flywheel spoke", shape: "box", size: { x: 0.065, y: 0.56, z: 0.045 }, center: { x: -0.3, y: 0.57, z: 0.48 }, materialFamily: "rusted-metal", tags: ["flywheel", "spoke", "front-face"] },
    { id: "engine-block", label: "offset exposed engine block", shape: "trapezoid", size: { x: 0.58, y: 0.66, z: 0.6 }, center: { x: 0.43, y: 0.55, z: -0.02 }, topScale: 0.82, materialFamily: "painted-metal", tags: ["engine", "offset-mass"] },
    { id: "cooling-fin-high", label: "upper cooling fin", shape: "box", size: { x: 0.42, y: 0.055, z: 0.07 }, center: { x: 0.43, y: 0.7, z: 0.31 }, materialFamily: "rusted-metal", tags: ["engine", "vent", "front-face"] },
    { id: "cooling-fin-mid", label: "middle cooling fin", shape: "box", size: { x: 0.46, y: 0.055, z: 0.07 }, center: { x: 0.43, y: 0.56, z: 0.32 }, materialFamily: "rusted-metal", tags: ["engine", "vent", "front-face"] },
    { id: "cooling-fin-low", label: "broken lower cooling fin", shape: "box", size: { x: 0.34, y: 0.055, z: 0.07 }, center: { x: 0.38, y: 0.42, z: 0.31 }, materialFamily: "rusted-metal", tags: ["engine", "vent", "broken", "front-face"] },
    { id: "fuel-tank", label: "horizontal dented fuel tank", shape: "cylinder", size: { x: 0.84, y: 0.26, z: 0.26 }, center: { x: 0.02, y: 1.05, z: -0.09 }, axis: "x", radialSegments: 12, materialFamily: "painted-metal", tags: ["tank", "top-silhouette"] },
    { id: "fuel-band-left", label: "left tank band", shape: "cylinder", size: { x: 0.07, y: 0.31, z: 0.31 }, center: { x: -0.27, y: 1.05, z: -0.09 }, axis: "x", radialSegments: 12, materialFamily: "rusted-metal", tags: ["tank", "band"] },
    { id: "fuel-band-right", label: "right tank band", shape: "cylinder", size: { x: 0.07, y: 0.31, z: 0.31 }, center: { x: 0.3, y: 1.05, z: -0.09 }, axis: "x", radialSegments: 12, materialFamily: "rusted-metal", tags: ["tank", "band"] },
    { id: "exhaust-stack", label: "crooked vertical exhaust stack", shape: "cylinder", size: { x: 0.16, y: 0.62, z: 0.16 }, center: { x: 0.57, y: 1.22, z: -0.23 }, axis: "y", radialSegments: 10, materialFamily: "rusted-metal", tags: ["exhaust", "vertical-silhouette"] },
    { id: "exhaust-cap", label: "oversized broken exhaust cap", shape: "cylinder", size: { x: 0.24, y: 0.08, z: 0.24 }, center: { x: 0.57, y: 1.56, z: -0.23 }, axis: "y", radialSegments: 10, materialFamily: "rusted-metal", tags: ["exhaust", "broken", "top-silhouette"] },
    { id: "control-panel", label: "tilted front control panel", shape: "trapezoid", size: { x: 0.3, y: 0.26, z: 0.06 }, center: { x: 0.49, y: 0.75, z: 0.35 }, topScale: 0.74, materialFamily: "painted-metal", tags: ["controls", "front-face"] },
    { id: "socket-panel", label: "recessed cable socket panel", shape: "box", size: { x: 0.19, y: 0.14, z: 0.05 }, center: { x: 0.49, y: 0.71, z: 0.405 }, materialFamily: "rubber-cable", tags: ["socket", "controls", "front-face"] },
    { id: "cable-socket", label: "low side cable socket", shape: "cylinder", size: { x: 0.14, y: 0.14, z: 0.08 }, center: { x: 0.61, y: 0.31, z: 0.32 }, axis: "z", radialSegments: 10, materialFamily: "rubber-cable", tags: ["socket", "cable"] },
    { id: "loose-cable", label: "trailing loose cable", shape: "box", size: { x: 0.1, y: 0.1, z: 0.48 }, center: { x: 0.76, y: 0.16, z: -0.04 }, materialFamily: "rubber-cable", tags: ["cable", "ground-contact"] },
    { id: "loose-cable-tail", label: "cable tail on floor", shape: "box", size: { x: 0.38, y: 0.08, z: 0.1 }, center: { x: 0.9, y: 0.06, z: -0.32 }, materialFamily: "rubber-cable", tags: ["cable", "ground-contact"] },
  ],
} satisfies MeshObjectProfile;

export type BrokenGeneratorObjectKitConfig = MeshGeneratingObjectKitConfig;

export const brokenGeneratorObjectKitConfig = createMeshGeneratingObjectKitConfig(brokenGeneratorObjectProfile);

export const generateBrokenGeneratorMesh = () => createMeshObjectDescriptor(brokenGeneratorObjectProfile);

export const createBrokenGeneratorObjectKit = (
  config: BrokenGeneratorObjectKitConfig = brokenGeneratorObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(brokenGeneratorObjectProfile, config);
