import type {
  SceneDressingVector,
  ScenePropDescriptor,
  SceneTextureDescriptor,
} from "./sceneDressingDescriptors";

export type KitPreviewMode = "prop" | "texture" | "terrain" | "flashlight";
export type KitPreviewCategory = "object-kit" | "texture-kit" | "domain-kit";

export type KitPreviewEntry = Readonly<{
  id: string;
  title: string;
  summary: string;
  category: KitPreviewCategory;
  mode: KitPreviewMode;
  cameraPosition: SceneDressingVector;
  lookAt: SceneDressingVector;
  props: readonly ScenePropDescriptor[];
  textures: readonly SceneTextureDescriptor[];
}>;

export type KitPreviewSummary = Readonly<{
  id: string;
  title: string;
  summary: string;
  category: KitPreviewCategory;
  mode: KitPreviewMode;
  routePath: string;
  htmlPath: string;
}>;

const vector = (x: number, y: number, z: number): SceneDressingVector => ({ x, y, z });

const prop = (descriptor: ScenePropDescriptor): ScenePropDescriptor => descriptor;
const texture = (descriptor: SceneTextureDescriptor): SceneTextureDescriptor => descriptor;

export const KIT_PREVIEW_ENTRIES: readonly KitPreviewEntry[] = [
  {
    id: "broken-city-wall-kit",
    title: "Broken City Wall Kit",
    summary: "Facade silhouette, broken brick response, and overgrowth breakup on a vertical landmark wall.",
    category: "domain-kit",
    mode: "prop",
    cameraPosition: vector(7.4, 4.6, 9.1),
    lookAt: vector(0, 2.8, 0),
    props: [
      prop({
        id: "preview-broken-city-wall",
        kind: "building-facade",
        position: vector(0, 3.2, 0),
        rotationY: 0,
        scale: vector(6.6, 6.4, 0.58),
        surface: "wall",
        materialFamily: "broken-brick",
        tags: ["preview", "broken-city-wall-kit"],
      }),
    ],
    textures: [],
  },
  {
    id: "utility-crate-object-kit",
    title: "Utility Crate Object Kit",
    summary: "Clustered crate stack for corridor clutter, readable from a standing player view.",
    category: "object-kit",
    mode: "prop",
    cameraPosition: vector(5.8, 3.6, 6.8),
    lookAt: vector(0, 1.45, 0),
    props: [
      prop({
        id: "preview-utility-crate",
        kind: "utility-crate-stack",
        position: vector(0, 1.05, 0),
        rotationY: Math.PI / 6,
        scale: vector(2.1, 2.1, 2.2),
        surface: "floor",
        materialFamily: "painted-utility",
        tags: ["preview", "utility-crate-object-kit"],
      }),
    ],
    textures: [],
  },
  {
    id: "brick-rubble-object-kit",
    title: "Brick Rubble Object Kit",
    summary: "Collapsed brick pile used to break up floor edges and dead-end pockets.",
    category: "object-kit",
    mode: "prop",
    cameraPosition: vector(4.9, 2.7, 5.9),
    lookAt: vector(0, 0.65, 0),
    props: [
      prop({
        id: "preview-brick-rubble",
        kind: "brick-rubble-pile",
        position: vector(0, 0.42, 0),
        rotationY: Math.PI / 8,
        scale: vector(2.4, 1.05, 2.2),
        surface: "floor",
        materialFamily: "broken-rubble",
        tags: ["preview", "brick-rubble-object-kit"],
      }),
    ],
    textures: [],
  },
  {
    id: "loose-floor-slab-object-kit",
    title: "Loose Floor Slab Object Kit",
    summary: "Broken floor plate for path wear, floor breakup, and grounding texture scale.",
    category: "object-kit",
    mode: "prop",
    cameraPosition: vector(5.5, 2.5, 6.6),
    lookAt: vector(0, 0.28, 0),
    props: [
      prop({
        id: "preview-loose-floor-slab",
        kind: "loose-floor-slab",
        position: vector(0, 0.18, 0),
        rotationY: -Math.PI / 7,
        scale: vector(3.2, 0.38, 2.6),
        surface: "floor",
        materialFamily: "damp-concrete",
        tags: ["preview", "loose-floor-slab-object-kit"],
      }),
    ],
    textures: [],
  },
  {
    id: "ceiling-service-strip-object-kit",
    title: "Ceiling Service Strip Object Kit",
    summary: "Suspended ceiling services for overhead interest and corridor direction cues.",
    category: "object-kit",
    mode: "prop",
    cameraPosition: vector(4.8, 4.9, 8.8),
    lookAt: vector(0, 5.6, -0.5),
    props: [
      prop({
        id: "preview-ceiling-service-strip",
        kind: "ceiling-service-strip",
        position: vector(0, 6.1, -0.5),
        rotationY: 0,
        scale: vector(5.4, 0.52, 1.2),
        surface: "ceiling",
        materialFamily: "painted-metal",
        tags: ["preview", "ceiling-service-strip-object-kit"],
      }),
    ],
    textures: [],
  },
  {
    id: "grass-object-spawn-kit",
    title: "Grass Object Spawn Kit",
    summary: "Alpha-clipped grass and root strips for dirty overgrowth around corridor seams.",
    category: "domain-kit",
    mode: "prop",
    cameraPosition: vector(4.8, 2.4, 5.8),
    lookAt: vector(0, 0.44, 0),
    props: [
      prop({
        id: "preview-grass-clump",
        kind: "grass-clump",
        position: vector(-0.8, 0.22, 0.2),
        rotationY: Math.PI / 4,
        scale: vector(1.45, 1.1, 1.1),
        surface: "floor",
        materialFamily: "muddy-grass",
        tags: ["preview", "grass-object-spawn-kit"],
      }),
      prop({
        id: "preview-root-strip",
        kind: "root-strip",
        position: vector(0.9, 0.08, -0.2),
        rotationY: -Math.PI / 5,
        scale: vector(2.1, 0.34, 1.2),
        surface: "floor",
        materialFamily: "root-fiber",
        tags: ["preview", "grass-object-spawn-kit"],
      }),
    ],
    textures: [],
  },
  {
    id: "rock-cluster-object-kit",
    title: "Rock Cluster Object Kit",
    summary: "Grounded corridor-side stone breakup for muddy floor edges and collapsed route pockets.",
    category: "object-kit",
    mode: "prop",
    cameraPosition: vector(4.8, 2.7, 6.2),
    lookAt: vector(0, 0.7, 0),
    props: [
      prop({
        id: "preview-rock-cluster",
        kind: "rock-cluster",
        position: vector(0, 0.18, 0),
        rotationY: Math.PI / 5,
        scale: vector(2.1, 1.05, 1.9),
        surface: "floor",
        materialFamily: "broken-rubble",
        tags: ["preview", "rock-cluster-object-kit"],
      }),
    ],
    textures: [],
  },
  {
    id: "corridor-lamp-object-kit",
    title: "Corridor Lamp Object Kit",
    summary: "Route-defining practical lamp for long corridor spacing and warm readable light anchors.",
    category: "object-kit",
    mode: "prop",
    cameraPosition: vector(6.2, 4.8, 8.8),
    lookAt: vector(0, 2.2, 0),
    props: [
      prop({
        id: "preview-corridor-lamp",
        kind: "lamp-post",
        position: vector(0, 0.02, 0),
        rotationY: Math.PI / 8,
        scale: vector(0.22, 3.2, 0.22),
        surface: "floor",
        materialFamily: "rusted-metal",
        tags: ["preview", "corridor-lamp-object-kit"],
      }),
    ],
    textures: [],
  },
  {
    id: "brick-course-texture-kit",
    title: "Brick Course Texture Kit",
    summary: "Projected brick-course breakup for vertical wall rhythm and facade wear.",
    category: "texture-kit",
    mode: "texture",
    cameraPosition: vector(5.9, 3.8, 8.2),
    lookAt: vector(0, 3.1, -6),
    props: [],
    textures: [
      texture({
        id: "preview-brick-course-texture",
        kind: "brick-course",
        position: vector(0, 3.2, -5.98),
        rotation: vector(0, 0, 0),
        scale: vector(7.1, 5.4, 1),
        surface: "wall",
        color: 0x73523d,
        opacity: 0.18,
      }),
    ],
  },
  {
    id: "damp-mud-texture-kit",
    title: "Damp Mud Texture Kit",
    summary: "Wet soil buildup for floor pockets and corridor edges.",
    category: "texture-kit",
    mode: "texture",
    cameraPosition: vector(4.9, 3, 6.2),
    lookAt: vector(0, 0.15, 0),
    props: [],
    textures: [
      texture({
        id: "preview-damp-mud-texture",
        kind: "damp-mud",
        position: vector(0, 0.03, 0),
        rotation: vector(-Math.PI / 2, 0, 0),
        scale: vector(6.4, 4.4, 1),
        surface: "floor",
        color: 0x4c3a26,
        opacity: 0.18,
      }),
    ],
  },
  {
    id: "rust-streak-texture-kit",
    title: "Rust Streak Texture Kit",
    summary: "Vertical corrosion streaking for metal trims, wall seams, and service runs.",
    category: "texture-kit",
    mode: "texture",
    cameraPosition: vector(5.7, 3.7, 8.3),
    lookAt: vector(0, 3.2, -6),
    props: [],
    textures: [
      texture({
        id: "preview-rust-streak-texture",
        kind: "rust-streak",
        position: vector(0, 3.05, -5.97),
        rotation: vector(0, 0, 0),
        scale: vector(6.4, 5.2, 1),
        surface: "wall",
        color: 0x6a4327,
        opacity: 0.16,
      }),
    ],
  },
  {
    id: "moss-grime-texture-kit",
    title: "Moss Grime Texture Kit",
    summary: "Grimy moss bloom for damp walls and neglected corners.",
    category: "texture-kit",
    mode: "texture",
    cameraPosition: vector(5.7, 3.7, 8.3),
    lookAt: vector(0, 3.2, -6),
    props: [],
    textures: [
      texture({
        id: "preview-moss-grime-texture",
        kind: "moss-grime",
        position: vector(0, 3.05, -5.96),
        rotation: vector(0, 0, 0),
        scale: vector(6.3, 5.1, 1),
        surface: "wall",
        color: 0x40512c,
        opacity: 0.16,
      }),
    ],
  },
  {
    id: "wet-concrete-texture-kit",
    title: "Wet Concrete Texture Kit",
    summary: "Darkened concrete wear for slabs, floor plates, and path scarring.",
    category: "texture-kit",
    mode: "texture",
    cameraPosition: vector(5.2, 2.9, 6.6),
    lookAt: vector(0, 0.12, 0),
    props: [],
    textures: [
      texture({
        id: "preview-wet-concrete-texture",
        kind: "wet-concrete",
        position: vector(0, 0.04, 0),
        rotation: vector(-Math.PI / 2, 0, 0),
        scale: vector(5.8, 4.2, 1),
        surface: "floor",
        color: 0x585248,
        opacity: 0.18,
      }),
    ],
  },
  {
    id: "terrain-shader-domain-kit",
    title: "Terrain Shader Domain Kit",
    summary: "Triplanar muddy grass, concrete, and wetness breakup on room surfaces and modular blocks.",
    category: "domain-kit",
    mode: "terrain",
    cameraPosition: vector(8.2, 5.4, 9.4),
    lookAt: vector(0, 1.2, 0),
    props: [],
    textures: [],
  },
  {
    id: "flashlight-domain-kit",
    title: "Flashlight Domain Kit",
    summary: "Floating flashlight rig with subtle ambient fill, tested against grime-friendly props.",
    category: "domain-kit",
    mode: "flashlight",
    cameraPosition: vector(6.2, 4.1, 8.8),
    lookAt: vector(0, 1.5, -0.4),
    props: [
      prop({
        id: "preview-flashlight-crate",
        kind: "utility-crate-stack",
        position: vector(-1.3, 1.05, -1.2),
        rotationY: Math.PI / 7,
        scale: vector(1.9, 2, 2),
        surface: "floor",
        materialFamily: "painted-utility",
        tags: ["preview", "flashlight-domain-kit"],
      }),
      prop({
        id: "preview-flashlight-wall-box",
        kind: "wall-box",
        position: vector(2.2, 2.2, -5.35),
        rotationY: 0,
        scale: vector(1.35, 1.2, 0.28),
        surface: "wall",
        materialFamily: "painted-metal",
        tags: ["preview", "flashlight-domain-kit"],
      }),
    ],
    textures: [
      texture({
        id: "preview-flashlight-rust",
        kind: "rust-streak",
        position: vector(0.5, 2.8, -5.97),
        rotation: vector(0, 0, 0),
        scale: vector(5.8, 4.4, 1),
        surface: "wall",
        color: 0x6b4227,
        opacity: 0.14,
      }),
    ],
  },
] as const;

export const KIT_PREVIEW_IDS = KIT_PREVIEW_ENTRIES.map((entry) => entry.id);

export const getKitPreviewEntry = (id: string): KitPreviewEntry | null =>
  KIT_PREVIEW_ENTRIES.find((entry) => entry.id === id) ?? null;

export const getKitPreviewSummaries = (): readonly KitPreviewSummary[] =>
  KIT_PREVIEW_ENTRIES.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    category: entry.category,
    mode: entry.mode,
    routePath: `/testing/kits/${entry.id}`,
    htmlPath: `/testing/kits/${entry.id}.html`,
  }));
