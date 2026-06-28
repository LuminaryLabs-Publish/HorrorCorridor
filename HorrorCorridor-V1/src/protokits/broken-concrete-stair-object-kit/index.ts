import { type HorrorDomainKit } from "../domainKit";
import {
  createMeshGeneratingObjectKit,
  createMeshGeneratingObjectKitConfig,
  createMeshObjectDescriptor,
  type MeshGeneratingObjectKitConfig,
  type MeshObjectProfile,
} from "../mesh-object-kit";

export const brokenConcreteStairObjectProfile = {
  kitId: "broken-concrete-stair-object-kit",
  title: "Broken Concrete Stair Object Kit",
  domain: "broken-concrete-stair-object",
  services: ["stair-fragment-mesh", "chipped-step-profile"],
  propKind: "broken-concrete-stair",
  materialFamilies: ["wet-concrete", "rusted-metal"],
  shaderProfile: "concrete-slab",
  palette: [0x302f2b, 0x5d584d, 0x8a806c],
  maxVisible: 8,
  purpose: "Broken stair fragment kit with chipped step blocks, fractured side plates, and exposed rebar.",
  targetTraits: ["stacked step fragments", "chipped edges", "fractured side", "exposed rebar"],
  placementTags: ["floor-mounted", "elevation-cue", "non-blocking"],
  parts: [
    { id: "lower-step", label: "lower broken step", shape: "trapezoid", size: { x: 1.28, y: 0.24, z: 0.58 }, center: { x: 0, y: 0.12, z: 0.2 }, topScale: 0.88, materialFamily: "wet-concrete" },
    { id: "middle-step", label: "middle chipped step", shape: "trapezoid", size: { x: 1.04, y: 0.24, z: 0.52 }, center: { x: -0.08, y: 0.36, z: -0.02 }, topScale: 0.82, materialFamily: "wet-concrete" },
    { id: "upper-step", label: "upper fractured step", shape: "trapezoid", size: { x: 0.78, y: 0.22, z: 0.46 }, center: { x: 0.08, y: 0.59, z: -0.22 }, topScale: 0.74, materialFamily: "wet-concrete" },
    { id: "side-fracture", label: "fractured side slab", shape: "trapezoid", size: { x: 0.18, y: 0.62, z: 0.72 }, center: { x: -0.58, y: 0.32, z: -0.02 }, topScale: 0.66, materialFamily: "wet-concrete" },
    { id: "rebar-left", label: "exposed stair rebar", shape: "box", size: { x: 0.48, y: 0.035, z: 0.035 }, center: { x: -0.28, y: 0.72, z: -0.12 }, materialFamily: "rusted-metal" },
    { id: "rebar-right", label: "exposed stair rebar", shape: "box", size: { x: 0.38, y: 0.035, z: 0.035 }, center: { x: 0.36, y: 0.28, z: 0.18 }, materialFamily: "rusted-metal" },
  ],
} satisfies MeshObjectProfile;

export type BrokenConcreteStairObjectKitConfig = MeshGeneratingObjectKitConfig;

export const brokenConcreteStairObjectKitConfig = createMeshGeneratingObjectKitConfig(brokenConcreteStairObjectProfile);

export const generateBrokenConcreteStairMesh = () => createMeshObjectDescriptor(brokenConcreteStairObjectProfile);

export const createBrokenConcreteStairObjectKit = (
  config: BrokenConcreteStairObjectKitConfig = brokenConcreteStairObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(brokenConcreteStairObjectProfile, config);
