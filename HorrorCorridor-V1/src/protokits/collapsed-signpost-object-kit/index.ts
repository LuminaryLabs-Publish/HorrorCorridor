import { type HorrorDomainKit } from "../domainKit";
import {
  createMeshGeneratingObjectKit,
  createMeshGeneratingObjectKitConfig,
  createMeshObjectDescriptor,
  type MeshGeneratingObjectKitConfig,
  type MeshObjectProfile,
} from "../mesh-object-kit";

export const collapsedSignpostObjectProfile = {
  kitId: "collapsed-signpost-object-kit",
  title: "Collapsed Signpost Object Kit",
  domain: "collapsed-signpost-object",
  services: ["bent-signpost-mesh", "route-warning-sign-profile"],
  propKind: "collapsed-signpost",
  materialFamilies: ["painted-metal", "rusted-metal"],
  shaderProfile: "painted-panel",
  palette: [0x312a22, 0x6b5438, 0xa87a3e],
  maxVisible: 12,
  purpose: "Broken warning sign kit with bent pole, bolted plate, cracked face, and rust bands.",
  targetTraits: ["bent pole", "cracked sign plate", "bolts", "rust bands", "route cue"],
  placementTags: ["floor-mounted", "route-cue", "non-blocking"],
  parts: [
    { id: "base-spike", label: "tilted ground base", shape: "trapezoid", size: { x: 0.42, y: 0.18, z: 0.36 }, center: { x: 0, y: 0.09, z: 0 }, topScale: 0.8, materialFamily: "rusted-metal" },
    { id: "bent-pole-lower", label: "lower bent pole segment", shape: "box", size: { x: 0.09, y: 1.18, z: 0.09 }, center: { x: -0.08, y: 0.68, z: 0 }, materialFamily: "rusted-metal" },
    { id: "bent-pole-upper", label: "upper bent pole segment", shape: "box", size: { x: 0.08, y: 0.84, z: 0.08 }, center: { x: 0.18, y: 1.42, z: 0 }, materialFamily: "rusted-metal" },
    { id: "sign-plate", label: "cracked warning sign plate", shape: "trapezoid", size: { x: 0.94, y: 0.48, z: 0.055 }, center: { x: 0.44, y: 1.68, z: 0 }, topScale: 0.9, materialFamily: "painted-metal" },
    { id: "sign-crack", label: "raised crack strip", shape: "box", size: { x: 0.38, y: 0.035, z: 0.04 }, center: { x: 0.42, y: 1.68, z: 0.05 }, materialFamily: "rusted-metal" },
    { id: "bolt-a", label: "sign bolt", shape: "box", size: { x: 0.06, y: 0.06, z: 0.04 }, center: { x: 0.1, y: 1.82, z: 0.06 }, materialFamily: "rusted-metal" },
    { id: "bolt-b", label: "sign bolt", shape: "box", size: { x: 0.06, y: 0.06, z: 0.04 }, center: { x: 0.75, y: 1.54, z: 0.06 }, materialFamily: "rusted-metal" },
  ],
} satisfies MeshObjectProfile;

export type CollapsedSignpostObjectKitConfig = MeshGeneratingObjectKitConfig;

export const collapsedSignpostObjectKitConfig = createMeshGeneratingObjectKitConfig(collapsedSignpostObjectProfile);

export const generateCollapsedSignpostMesh = () => createMeshObjectDescriptor(collapsedSignpostObjectProfile);

export const createCollapsedSignpostObjectKit = (
  config: CollapsedSignpostObjectKitConfig = collapsedSignpostObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(collapsedSignpostObjectProfile, config);
