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
  purpose: "Floor landmark kit for dented utility generators with vents, sockets, feet, and cable detail.",
  targetTraits: ["boxy engine body", "vent panels", "cable sockets", "rusted feet", "service cap"],
  placementTags: ["floor-mounted", "large-landmark", "non-blocking"],
  parts: [
    { id: "engine-body", label: "dented generator body", shape: "trapezoid", size: { x: 1.32, y: 0.82, z: 0.78 }, center: { x: 0, y: 0.48, z: 0 }, topScale: 0.94, materialFamily: "painted-metal" },
    { id: "top-cap", label: "offset service cap", shape: "box", size: { x: 0.72, y: 0.16, z: 0.48 }, center: { x: -0.14, y: 0.98, z: 0.02 }, materialFamily: "rusted-metal" },
    { id: "front-vent-a", label: "front vent upper slat", shape: "box", size: { x: 0.62, y: 0.05, z: 0.04 }, center: { x: 0, y: 0.58, z: 0.42 }, materialFamily: "rusted-metal" },
    { id: "front-vent-b", label: "front vent lower slat", shape: "box", size: { x: 0.62, y: 0.05, z: 0.04 }, center: { x: 0, y: 0.42, z: 0.42 }, materialFamily: "rusted-metal" },
    { id: "socket-panel", label: "cable socket panel", shape: "box", size: { x: 0.36, y: 0.28, z: 0.05 }, center: { x: 0.46, y: 0.5, z: 0.43 }, materialFamily: "rusted-metal" },
    { id: "left-foot", label: "left rusted foot", shape: "box", size: { x: 0.26, y: 0.12, z: 0.2 }, center: { x: -0.42, y: 0.08, z: 0.28 }, materialFamily: "rusted-metal" },
    { id: "right-foot", label: "right rusted foot", shape: "box", size: { x: 0.26, y: 0.12, z: 0.2 }, center: { x: 0.42, y: 0.08, z: 0.28 }, materialFamily: "rusted-metal" },
    { id: "loose-cable", label: "loose cable block", shape: "box", size: { x: 0.12, y: 0.1, z: 0.7 }, center: { x: 0.68, y: 0.18, z: -0.22 }, materialFamily: "rubber-cable" },
  ],
} satisfies MeshObjectProfile;

export type BrokenGeneratorObjectKitConfig = MeshGeneratingObjectKitConfig;

export const brokenGeneratorObjectKitConfig = createMeshGeneratingObjectKitConfig(brokenGeneratorObjectProfile);

export const generateBrokenGeneratorMesh = () => createMeshObjectDescriptor(brokenGeneratorObjectProfile);

export const createBrokenGeneratorObjectKit = (
  config: BrokenGeneratorObjectKitConfig = brokenGeneratorObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(brokenGeneratorObjectProfile, config);
