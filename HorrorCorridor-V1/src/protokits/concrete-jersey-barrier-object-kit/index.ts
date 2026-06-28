import { type HorrorDomainKit } from "../domainKit";
import {
  createMeshGeneratingObjectKit,
  createMeshGeneratingObjectKitConfig,
  createMeshObjectDescriptor,
  type MeshGeneratingObjectKitConfig,
  type MeshObjectProfile,
} from "../mesh-object-kit";

export const concreteJerseyBarrierObjectProfile = {
  kitId: "concrete-jersey-barrier-object-kit",
  title: "Concrete Jersey Barrier Object Kit",
  domain: "concrete-jersey-barrier-object",
  services: ["barrier-prism-mesh", "chipped-concrete-profile"],
  propKind: "concrete-jersey-barrier",
  materialFamilies: ["wet-concrete", "rusted-metal", "painted-metal"],
  shaderProfile: "concrete-slab",
  palette: [0x34322e, 0x5d584e, 0x857b67],
  maxVisible: 12,
  purpose: "Trapezoid concrete barrier kit with chipped caps, faded stripe, and exposed rebar.",
  targetTraits: ["sloped concrete body", "chipped corners", "faded stripe", "exposed rebar"],
  placementTags: ["floor-mounted", "route-edge", "non-blocking"],
  parts: [
    { id: "barrier-body", label: "sloped jersey barrier body", shape: "trapezoid", size: { x: 2.2, y: 0.86, z: 0.46 }, center: { x: 0, y: 0.43, z: 0 }, topScale: 0.58, materialFamily: "wet-concrete" },
    { id: "left-chip", label: "left chipped concrete cap", shape: "trapezoid", size: { x: 0.3, y: 0.2, z: 0.48 }, center: { x: -0.9, y: 0.82, z: 0 }, topScale: 0.72, materialFamily: "wet-concrete" },
    { id: "right-chip", label: "right chipped concrete cap", shape: "trapezoid", size: { x: 0.34, y: 0.18, z: 0.48 }, center: { x: 0.84, y: 0.78, z: 0 }, topScale: 0.66, materialFamily: "wet-concrete" },
    { id: "faded-stripe", label: "faded painted stripe", shape: "box", size: { x: 1.62, y: 0.07, z: 0.04 }, center: { x: 0, y: 0.56, z: 0.26 }, materialFamily: "painted-metal" },
    { id: "rebar-a", label: "exposed rebar strip", shape: "box", size: { x: 0.56, y: 0.045, z: 0.045 }, center: { x: -0.66, y: 0.92, z: 0.04 }, materialFamily: "rusted-metal" },
    { id: "rebar-b", label: "exposed rebar strip", shape: "box", size: { x: 0.42, y: 0.045, z: 0.045 }, center: { x: 0.7, y: 0.9, z: -0.04 }, materialFamily: "rusted-metal" },
  ],
} satisfies MeshObjectProfile;

export type ConcreteJerseyBarrierObjectKitConfig = MeshGeneratingObjectKitConfig;

export const concreteJerseyBarrierObjectKitConfig = createMeshGeneratingObjectKitConfig(concreteJerseyBarrierObjectProfile);

export const generateConcreteJerseyBarrierMesh = () => createMeshObjectDescriptor(concreteJerseyBarrierObjectProfile);

export const createConcreteJerseyBarrierObjectKit = (
  config: ConcreteJerseyBarrierObjectKitConfig = concreteJerseyBarrierObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(concreteJerseyBarrierObjectProfile, config);
