import { type HorrorDomainKit } from "../domainKit";
import {
  createMeshGeneratingObjectKit,
  createMeshGeneratingObjectKitConfig,
  createMeshObjectDescriptor,
  type MeshGeneratingObjectKitConfig,
  type MeshObjectProfile,
} from "../mesh-object-kit";

export const industrialShelvingObjectProfile = {
  kitId: "industrial-shelving-object-kit",
  title: "Industrial Shelving Object Kit",
  domain: "industrial-shelving-object",
  services: ["shelf-frame-mesh", "wall-side-storage-profile"],
  propKind: "industrial-shelving",
  materialFamilies: ["rusted-metal", "painted-utility"],
  shaderProfile: "utility-crate",
  palette: [0x26241d, 0x52442f, 0x7f6b45],
  maxVisible: 10,
  purpose: "Wall-side two-bay storage rack with a readable frame rhythm, open bays, and varied former-use equipment.",
  targetTraits: [
    "two-bay industrial frame",
    "repeated shelf rhythm",
    "loaded machine storage",
    "open negative space",
  ],
  placementTags: ["wall-side", "storage-landmark", "non-blocking"],
  parts: [
    // The frame is deliberately thick enough to survive the corridor's dark,
    // oblique player views. Three post lines make two bays readable at a glance.
    { id: "post-left-front", label: "left front rack upright", shape: "box", size: { x: 0.14, y: 2.32, z: 0.14 }, center: { x: -1.08, y: 1.16, z: 0.38 }, materialFamily: "rusted-metal", tags: ["rack-frame", "upright"] },
    { id: "post-center-front", label: "center front rack upright", shape: "box", size: { x: 0.14, y: 2.24, z: 0.14 }, center: { x: 0, y: 1.12, z: 0.38 }, materialFamily: "rusted-metal", tags: ["rack-frame", "upright", "bay-divider"] },
    { id: "post-right-front", label: "right front rack upright", shape: "box", size: { x: 0.14, y: 2.34, z: 0.14 }, center: { x: 1.08, y: 1.17, z: 0.38 }, materialFamily: "rusted-metal", tags: ["rack-frame", "upright"] },
    { id: "post-left-back", label: "left rear rack upright", shape: "box", size: { x: 0.13, y: 2.24, z: 0.13 }, center: { x: -1.08, y: 1.12, z: -0.38 }, materialFamily: "rusted-metal", tags: ["rack-frame", "upright"] },
    { id: "post-center-back", label: "center rear rack upright", shape: "box", size: { x: 0.13, y: 2.3, z: 0.13 }, center: { x: 0, y: 1.15, z: -0.38 }, materialFamily: "rusted-metal", tags: ["rack-frame", "upright", "bay-divider"] },
    { id: "post-right-back", label: "right rear rack upright", shape: "box", size: { x: 0.13, y: 2.28, z: 0.13 }, center: { x: 1.08, y: 1.14, z: -0.38 }, materialFamily: "rusted-metal", tags: ["rack-frame", "upright"] },
    { id: "foot-left", label: "left floor foot", shape: "box", size: { x: 0.32, y: 0.1, z: 0.92 }, center: { x: -1.08, y: 0.05, z: 0 }, materialFamily: "rusted-metal", tags: ["rack-frame", "floor-foot"] },
    { id: "foot-center", label: "center floor foot", shape: "box", size: { x: 0.32, y: 0.1, z: 0.92 }, center: { x: 0, y: 0.05, z: 0 }, materialFamily: "rusted-metal", tags: ["rack-frame", "floor-foot", "bay-divider"] },
    { id: "foot-right", label: "right floor foot", shape: "box", size: { x: 0.32, y: 0.1, z: 0.92 }, center: { x: 1.08, y: 0.05, z: 0 }, materialFamily: "rusted-metal", tags: ["rack-frame", "floor-foot"] },
    { id: "shelf-base", label: "warped base shelf deck", shape: "trapezoid", size: { x: 2.28, y: 0.11, z: 0.82 }, center: { x: 0, y: 0.27, z: 0 }, topScale: 0.97, materialFamily: "rusted-metal", tags: ["rack-frame", "shelf-deck"] },
    { id: "shelf-low", label: "warped lower shelf deck", shape: "trapezoid", size: { x: 2.28, y: 0.11, z: 0.82 }, center: { x: 0, y: 0.85, z: 0 }, topScale: 0.95, materialFamily: "rusted-metal", tags: ["rack-frame", "shelf-deck"] },
    { id: "shelf-mid", label: "warped middle shelf deck", shape: "trapezoid", size: { x: 2.24, y: 0.11, z: 0.8 }, center: { x: -0.02, y: 1.43, z: 0 }, topScale: 0.93, materialFamily: "rusted-metal", tags: ["rack-frame", "shelf-deck"] },
    { id: "shelf-high", label: "warped upper shelf deck", shape: "trapezoid", size: { x: 2.28, y: 0.11, z: 0.82 }, center: { x: 0, y: 2.01, z: 0 }, topScale: 0.96, materialFamily: "rusted-metal", tags: ["rack-frame", "shelf-deck"] },
    { id: "lip-base", label: "base shelf front lip", shape: "box", size: { x: 2.3, y: 0.14, z: 0.1 }, center: { x: 0, y: 0.34, z: 0.39 }, materialFamily: "rusted-metal", tags: ["rack-frame", "shelf-lip"] },
    { id: "lip-low", label: "lower shelf front lip", shape: "box", size: { x: 2.3, y: 0.14, z: 0.1 }, center: { x: 0, y: 0.92, z: 0.39 }, materialFamily: "rusted-metal", tags: ["rack-frame", "shelf-lip"] },
    { id: "lip-mid", label: "middle shelf front lip", shape: "box", size: { x: 2.26, y: 0.14, z: 0.1 }, center: { x: -0.02, y: 1.5, z: 0.39 }, materialFamily: "rusted-metal", tags: ["rack-frame", "shelf-lip"] },
    { id: "lip-high", label: "upper shelf front lip", shape: "box", size: { x: 2.3, y: 0.14, z: 0.1 }, center: { x: 0, y: 2.08, z: 0.39 }, materialFamily: "rusted-metal", tags: ["rack-frame", "shelf-lip"] },
    { id: "rear-rail-low", label: "lower rear rack rail", shape: "box", size: { x: 2.3, y: 0.11, z: 0.1 }, center: { x: 0, y: 0.55, z: -0.38 }, materialFamily: "rusted-metal", tags: ["rack-frame", "rear-rail"] },
    { id: "rear-rail-mid", label: "middle rear rack rail", shape: "box", size: { x: 2.3, y: 0.11, z: 0.1 }, center: { x: 0, y: 1.13, z: -0.38 }, materialFamily: "rusted-metal", tags: ["rack-frame", "rear-rail"] },
    { id: "rear-rail-high", label: "upper rear rack rail", shape: "box", size: { x: 2.3, y: 0.11, z: 0.1 }, center: { x: 0, y: 1.71, z: -0.38 }, materialFamily: "rusted-metal", tags: ["rack-frame", "rear-rail"] },
    { id: "rear-header", label: "rear rack header", shape: "box", size: { x: 2.3, y: 0.12, z: 0.1 }, center: { x: 0, y: 2.28, z: -0.38 }, materialFamily: "rusted-metal", tags: ["rack-frame", "rear-rail", "header"] },
    { id: "front-header", label: "front rack header", shape: "box", size: { x: 2.3, y: 0.12, z: 0.1 }, center: { x: 0, y: 2.28, z: 0.38 }, materialFamily: "rusted-metal", tags: ["rack-frame", "header"] },

    // Stored forms remain asymmetric and leave breathing room between bays.
    { id: "lower-crate", label: "large lower utility crate", shape: "trapezoid", size: { x: 0.86, y: 0.42, z: 0.56 }, center: { x: -0.55, y: 0.54, z: 0.02 }, topScale: 0.91, materialFamily: "painted-utility", tags: ["stored-object", "utility-crate"] },
    { id: "lower-crate-band", label: "lower crate front band", shape: "box", size: { x: 0.72, y: 0.1, z: 0.06 }, center: { x: -0.55, y: 0.56, z: 0.32 }, materialFamily: "rusted-metal", tags: ["stored-object", "crate-detail"] },
    { id: "canister-a", label: "left upright machine canister", shape: "cylinder", size: { x: 0.3, y: 0.46, z: 0.3 }, center: { x: 0.4, y: 0.56, z: 0.02 }, axis: "y", radialSegments: 10, materialFamily: "painted-utility", tags: ["stored-object", "machine-canister"] },
    { id: "canister-a-cap", label: "left canister cap", shape: "cylinder", size: { x: 0.34, y: 0.06, z: 0.34 }, center: { x: 0.4, y: 0.82, z: 0.02 }, axis: "y", radialSegments: 8, materialFamily: "rusted-metal", tags: ["stored-object", "machine-canister"] },
    { id: "canister-b", label: "right upright machine canister", shape: "cylinder", size: { x: 0.34, y: 0.5, z: 0.34 }, center: { x: 0.78, y: 0.54, z: -0.04 }, axis: "y", radialSegments: 10, materialFamily: "painted-utility", tags: ["stored-object", "machine-canister"] },
    { id: "canister-b-cap", label: "right canister cap", shape: "cylinder", size: { x: 0.38, y: 0.06, z: 0.38 }, center: { x: 0.78, y: 0.82, z: -0.04 }, axis: "y", radialSegments: 8, materialFamily: "rusted-metal", tags: ["stored-object", "machine-canister"] },
    { id: "tool-case", label: "wide handled tool case", shape: "trapezoid", size: { x: 0.82, y: 0.34, z: 0.52 }, center: { x: -0.56, y: 1.08, z: 0.02 }, topScale: 0.93, materialFamily: "painted-utility", tags: ["stored-object", "tool-case"] },
    { id: "tool-handle", label: "tool case handle bar", shape: "box", size: { x: 0.42, y: 0.07, z: 0.08 }, center: { x: -0.56, y: 1.31, z: 0.02 }, materialFamily: "rusted-metal", tags: ["stored-object", "tool-case-detail"] },
    { id: "tool-handle-left", label: "left tool case handle support", shape: "box", size: { x: 0.06, y: 0.16, z: 0.08 }, center: { x: -0.74, y: 1.25, z: 0.02 }, materialFamily: "rusted-metal", tags: ["stored-object", "tool-case-detail"] },
    { id: "tool-handle-right", label: "right tool case handle support", shape: "box", size: { x: 0.06, y: 0.16, z: 0.08 }, center: { x: -0.38, y: 1.25, z: 0.02 }, materialFamily: "rusted-metal", tags: ["stored-object", "tool-case-detail"] },
    { id: "mid-bin", label: "deep middle utility bin", shape: "trapezoid", size: { x: 0.78, y: 0.4, z: 0.58 }, center: { x: 0.56, y: 1.1, z: 0 }, topScale: 0.86, materialFamily: "painted-utility", tags: ["stored-object", "utility-bin"] },
    { id: "mid-bin-label", label: "middle bin label plate", shape: "box", size: { x: 0.32, y: 0.13, z: 0.05 }, center: { x: 0.56, y: 1.12, z: 0.31 }, materialFamily: "rusted-metal", tags: ["stored-object", "bin-detail"] },
    { id: "upper-bin-left", label: "small upper left bin", shape: "box", size: { x: 0.48, y: 0.3, z: 0.48 }, center: { x: -0.78, y: 1.64, z: 0.01 }, materialFamily: "painted-utility", tags: ["stored-object", "utility-bin"] },
    { id: "upper-bin-center", label: "tall upper center bin", shape: "trapezoid", size: { x: 0.38, y: 0.38, z: 0.5 }, center: { x: -0.24, y: 1.68, z: -0.03 }, topScale: 0.84, materialFamily: "painted-utility", tags: ["stored-object", "utility-bin"] },
    { id: "upper-drum", label: "horizontal upper machine drum", shape: "cylinder", size: { x: 0.7, y: 0.32, z: 0.32 }, center: { x: 0.58, y: 1.65, z: 0.02 }, axis: "x", radialSegments: 12, materialFamily: "painted-utility", tags: ["stored-object", "machine-drum"] },
    { id: "upper-drum-band-left", label: "left machine drum band", shape: "cylinder", size: { x: 0.08, y: 0.38, z: 0.38 }, center: { x: 0.32, y: 1.65, z: 0.02 }, axis: "x", radialSegments: 10, materialFamily: "rusted-metal", tags: ["stored-object", "machine-drum"] },
    { id: "upper-drum-band-right", label: "right machine drum band", shape: "cylinder", size: { x: 0.08, y: 0.38, z: 0.38 }, center: { x: 0.84, y: 1.65, z: 0.02 }, axis: "x", radialSegments: 10, materialFamily: "rusted-metal", tags: ["stored-object", "machine-drum"] },
    { id: "top-tray", label: "flat upper storage tray", shape: "trapezoid", size: { x: 0.9, y: 0.16, z: 0.52 }, center: { x: -0.5, y: 2.15, z: 0 }, topScale: 0.9, materialFamily: "painted-utility", tags: ["stored-object", "storage-tray"] },
    { id: "top-box", label: "small upper utility box", shape: "box", size: { x: 0.48, y: 0.2, z: 0.42 }, center: { x: 0.7, y: 2.17, z: -0.02 }, materialFamily: "painted-utility", tags: ["stored-object", "utility-bin"] },
  ],
} satisfies MeshObjectProfile;

export type IndustrialShelvingObjectKitConfig = MeshGeneratingObjectKitConfig;

export const industrialShelvingObjectKitConfig = createMeshGeneratingObjectKitConfig(industrialShelvingObjectProfile);

export const generateIndustrialShelvingMesh = () => createMeshObjectDescriptor(industrialShelvingObjectProfile);

export const createIndustrialShelvingObjectKit = (
  config: IndustrialShelvingObjectKitConfig = industrialShelvingObjectKitConfig,
): HorrorDomainKit => createMeshGeneratingObjectKit(industrialShelvingObjectProfile, config);
