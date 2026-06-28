import {
  AmbientLight,
  BufferGeometry,
  Float32BufferAttribute,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  Vector3,
  WebGLRenderer,
} from "/node_modules/three/build/three.module.js";

const profiles = {
  "rusted-service-door": {
    title: "Rusted Service Door Object Review",
    traits: ["warped slab", "heavy frame", "hinges", "latch", "warning plate"],
    parts: [
      ["outer-frame", "box", [1.42, 2.28, 0.16], [0, 1.14, 0], "rusted-metal"],
      ["recessed-slab", "trapezoid", [1.12, 1.88, 0.1], [0, 1.12, 0.08], "painted-metal", 0.96],
      ["hinge-a", "box", [0.12, 0.26, 0.13], [-0.66, 1.72, 0.16], "rusted-metal"],
      ["hinge-b", "box", [0.12, 0.26, 0.13], [-0.66, 0.62, 0.16], "rusted-metal"],
      ["latch", "box", [0.16, 0.24, 0.08], [0.46, 1.18, 0.18], "rusted-metal"],
      ["warning-plate", "box", [0.48, 0.22, 0.035], [0.08, 1.52, 0.2], "painted-metal"],
    ],
  },
  "chain-link-fence": {
    title: "Chain Link Fence Object Review",
    traits: ["posts", "rail frame", "diamond mesh", "torn edge"],
    parts: [
      ["left-post", "box", [0.1, 1.9, 0.1], [-1.15, 0.95, 0], "rusted-metal"],
      ["right-post", "box", [0.1, 1.72, 0.1], [1.15, 0.86, 0], "rusted-metal"],
      ["top-rail", "box", [2.38, 0.08, 0.08], [0, 1.72, 0], "rusted-metal"],
      ["bottom-rail", "box", [2.22, 0.07, 0.08], [0, 0.18, 0], "rusted-metal"],
      ["mesh-a", "box", [2.12, 0.035, 0.035], [0, 0.96, 0.02], "rusted-metal"],
      ["mesh-b", "box", [2.12, 0.035, 0.035], [0, 0.82, -0.02], "rusted-metal"],
      ["torn-strip", "box", [0.08, 0.78, 0.04], [0.62, 0.62, 0.04], "rusted-metal"],
    ],
  },
  "broken-generator": {
    title: "Broken Generator Object Review",
    traits: ["engine body", "vent slats", "socket panel", "feet", "loose cable"],
    parts: [
      ["engine-body", "trapezoid", [1.32, 0.82, 0.78], [0, 0.48, 0], "painted-metal", 0.94],
      ["top-cap", "box", [0.72, 0.16, 0.48], [-0.14, 0.98, 0.02], "rusted-metal"],
      ["vent-a", "box", [0.62, 0.05, 0.04], [0, 0.58, 0.42], "rusted-metal"],
      ["vent-b", "box", [0.62, 0.05, 0.04], [0, 0.42, 0.42], "rusted-metal"],
      ["socket-panel", "box", [0.36, 0.28, 0.05], [0.46, 0.5, 0.43], "rusted-metal"],
      ["left-foot", "box", [0.26, 0.12, 0.2], [-0.42, 0.08, 0.28], "rusted-metal"],
      ["right-foot", "box", [0.26, 0.12, 0.2], [0.42, 0.08, 0.28], "rusted-metal"],
      ["loose-cable", "box", [0.12, 0.1, 0.7], [0.68, 0.18, -0.22], "rubber-cable"],
    ],
  },
  "concrete-jersey-barrier": {
    title: "Concrete Jersey Barrier Object Review",
    traits: ["sloped body", "chipped caps", "paint stripe", "rebar"],
    parts: [
      ["body", "trapezoid", [2.2, 0.86, 0.46], [0, 0.43, 0], "wet-concrete", 0.58],
      ["left-chip", "trapezoid", [0.3, 0.2, 0.48], [-0.9, 0.82, 0], "wet-concrete", 0.72],
      ["right-chip", "trapezoid", [0.34, 0.18, 0.48], [0.84, 0.78, 0], "wet-concrete", 0.66],
      ["stripe", "box", [1.62, 0.07, 0.04], [0, 0.56, 0.26], "painted-metal"],
      ["rebar-a", "box", [0.56, 0.045, 0.045], [-0.66, 0.92, 0.04], "rusted-metal"],
      ["rebar-b", "box", [0.42, 0.045, 0.045], [0.7, 0.9, -0.04], "rusted-metal"],
    ],
  },
  "storm-drain-culvert": {
    title: "Storm Drain Culvert Object Review",
    traits: ["arched mouth", "grate bars", "mud lip", "dark recess"],
    parts: [
      ["shell", "trapezoid", [1.28, 0.82, 0.58], [0, 0.45, 0], "wet-concrete", 0.72],
      ["mouth", "box", [0.82, 0.42, 0.08], [0, 0.42, 0.32], "rubber-cable"],
      ["grate-a", "box", [0.05, 0.48, 0.06], [-0.24, 0.42, 0.38], "rusted-metal"],
      ["grate-b", "box", [0.05, 0.48, 0.06], [0, 0.42, 0.38], "rusted-metal"],
      ["grate-c", "box", [0.05, 0.48, 0.06], [0.24, 0.42, 0.38], "rusted-metal"],
      ["mud-lip", "trapezoid", [1.12, 0.14, 0.28], [0, 0.08, 0.26], "wet-concrete", 0.88],
    ],
  },
  "collapsed-signpost": {
    title: "Collapsed Signpost Object Review",
    traits: ["bent pole", "cracked sign", "bolts", "rust bands"],
    parts: [
      ["base", "trapezoid", [0.42, 0.18, 0.36], [0, 0.09, 0], "rusted-metal", 0.8],
      ["pole-low", "box", [0.09, 1.18, 0.09], [-0.08, 0.68, 0], "rusted-metal"],
      ["pole-high", "box", [0.08, 0.84, 0.08], [0.18, 1.42, 0], "rusted-metal"],
      ["plate", "trapezoid", [0.94, 0.48, 0.055], [0.44, 1.68, 0], "painted-metal", 0.9],
      ["crack", "box", [0.38, 0.035, 0.04], [0.42, 1.68, 0.05], "rusted-metal"],
      ["bolt-a", "box", [0.06, 0.06, 0.04], [0.1, 1.82, 0.06], "rusted-metal"],
      ["bolt-b", "box", [0.06, 0.06, 0.04], [0.75, 1.54, 0.06], "rusted-metal"],
    ],
  },
  "industrial-shelving": {
    title: "Industrial Shelving Object Review",
    traits: ["open frame", "warped shelves", "loose boxes", "brackets"],
    parts: [
      ["post-lf", "box", [0.08, 1.72, 0.08], [-0.62, 0.86, 0.32], "rusted-metal"],
      ["post-rf", "box", [0.08, 1.62, 0.08], [0.62, 0.81, 0.32], "rusted-metal"],
      ["post-lb", "box", [0.08, 1.62, 0.08], [-0.62, 0.81, -0.32], "rusted-metal"],
      ["post-rb", "box", [0.08, 1.72, 0.08], [0.62, 0.86, -0.32], "rusted-metal"],
      ["shelf-low", "trapezoid", [1.42, 0.08, 0.74], [0, 0.52, 0], "rusted-metal", 0.96],
      ["shelf-high", "trapezoid", [1.36, 0.08, 0.7], [0, 1.18, 0], "rusted-metal", 0.92],
      ["box-a", "box", [0.42, 0.34, 0.36], [-0.28, 0.75, 0.06], "painted-utility"],
      ["box-b", "trapezoid", [0.36, 0.28, 0.32], [0.34, 1.38, -0.06], "painted-utility", 0.86],
    ],
  },
  "hanging-chain-hook": {
    title: "Hanging Chain Hook Object Review",
    traits: ["anchor plate", "separate chain links", "hook", "overhead silhouette"],
    parts: [
      ["anchor", "box", [0.42, 0.08, 0.32], [0, 2.12, 0], "rusted-metal"],
      ["link-a", "trapezoid", [0.16, 0.28, 0.06], [0, 1.88, 0], "rusted-metal", 0.72],
      ["link-b", "trapezoid", [0.06, 0.28, 0.16], [0, 1.62, 0], "rusted-metal", 0.72],
      ["link-c", "trapezoid", [0.16, 0.28, 0.06], [0, 1.36, 0], "rusted-metal", 0.72],
      ["stem", "box", [0.06, 0.42, 0.06], [0, 1.08, 0], "rusted-metal"],
      ["crook", "trapezoid", [0.28, 0.22, 0.06], [0.08, 0.82, 0], "rusted-metal", 0.55],
    ],
  },
  "barrel-cluster": {
    title: "Barrel Cluster Object Review",
    traits: ["dented barrels", "rib bands", "lids", "leaking stain"],
    parts: [
      ["barrel-a", "trapezoid", [0.48, 0.92, 0.48], [-0.28, 0.46, 0], "painted-metal", 0.86],
      ["rib-a-top", "box", [0.54, 0.06, 0.54], [-0.28, 0.78, 0], "rusted-metal"],
      ["rib-a-low", "box", [0.54, 0.06, 0.54], [-0.28, 0.22, 0], "rusted-metal"],
      ["barrel-b", "trapezoid", [0.42, 0.72, 0.42], [0.32, 0.36, 0.12], "painted-metal", 0.8],
      ["lid-b", "trapezoid", [0.5, 0.08, 0.44], [0.32, 0.76, 0.12], "rusted-metal", 0.7],
      ["leak", "trapezoid", [0.78, 0.035, 0.46], [0.08, 0.02, 0.36], "wet-concrete", 0.76],
    ],
  },
  "broken-concrete-stair": {
    title: "Broken Concrete Stair Object Review",
    traits: ["step fragments", "chipped edges", "fractured side", "rebar"],
    parts: [
      ["lower", "trapezoid", [1.28, 0.24, 0.58], [0, 0.12, 0.2], "wet-concrete", 0.88],
      ["middle", "trapezoid", [1.04, 0.24, 0.52], [-0.08, 0.36, -0.02], "wet-concrete", 0.82],
      ["upper", "trapezoid", [0.78, 0.22, 0.46], [0.08, 0.59, -0.22], "wet-concrete", 0.74],
      ["side", "trapezoid", [0.18, 0.62, 0.72], [-0.58, 0.32, -0.02], "wet-concrete", 0.66],
      ["rebar-a", "box", [0.48, 0.035, 0.035], [-0.28, 0.72, -0.12], "rusted-metal"],
      ["rebar-b", "box", [0.38, 0.035, 0.035], [0.36, 0.28, 0.18], "rusted-metal"],
    ],
  },
};

const kitId = document.body.dataset.kitId || "rusted-service-door";
const profile = profiles[kitId] || profiles["rusted-service-door"];
const canvas = document.querySelector("#object-canvas");
const modeLabel = document.querySelector("#mode-label");
const buttons = [...document.querySelectorAll("[data-mode]")];
const title = document.querySelector("[data-object-title]");
const traits = document.querySelector("[data-target-traits]");
const status = document.querySelector("#render-status");

if (title) title.textContent = profile.title;
if (status) status.textContent = `${kitId} / wound mesh`;
if (traits) {
  traits.innerHTML = "";
  for (const trait of profile.traits) {
    const item = document.createElement("li");
    item.textContent = trait;
    traits.appendChild(item);
  }
}

const scene = new Scene();
const camera = new PerspectiveCamera(52, 900 / 620, 0.1, 100);
const renderer = new WebGLRenderer({ antialias: true, canvas, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(900, 620, false);
renderer.shadowMap.enabled = true;

const materialByFamily = {
  "painted-metal": new MeshStandardMaterial({ color: 0x574636, roughness: 0.78, metalness: 0.28, emissive: 0x140f0a, emissiveIntensity: 0.08 }),
  "rusted-metal": new MeshStandardMaterial({ color: 0x6a3f25, roughness: 0.88, metalness: 0.22, emissive: 0x160e08, emissiveIntensity: 0.1 }),
  "rubber-cable": new MeshStandardMaterial({ color: 0x17130f, roughness: 0.96, metalness: 0.02, emissive: 0x090705, emissiveIntensity: 0.06 }),
  "painted-utility": new MeshStandardMaterial({ color: 0x4f583d, roughness: 0.82, metalness: 0.18, emissive: 0x111409, emissiveIntensity: 0.08 }),
  "wet-concrete": new MeshStandardMaterial({ color: 0x625d51, roughness: 0.68, metalness: 0.03, emissive: 0x11100d, emissiveIntensity: 0.08 }),
};
const fallbackMaterial = materialByFamily["rusted-metal"];

const createGeometry = (shape, size, center, topScale = 0.86) => {
  const [sx, sy, sz] = size;
  const [cx, cy, cz] = center;
  const bx = sx * 0.5;
  const by = sy * 0.5;
  const bz = sz * 0.5;
  const tx = shape === "trapezoid" ? bx * topScale : bx;
  const tz = shape === "trapezoid" ? bz * topScale : bz;
  const positions = [
    cx - bx, cy - by, cz - bz,
    cx + bx, cy - by, cz - bz,
    cx + bx, cy - by, cz + bz,
    cx - bx, cy - by, cz + bz,
    cx - tx, cy + by, cz - tz,
    cx + tx, cy + by, cz - tz,
    cx + tx, cy + by, cz + tz,
    cx - tx, cy + by, cz + tz,
  ];
  const indices = [
    0, 2, 1, 0, 3, 2,
    4, 5, 6, 4, 6, 7,
    3, 7, 6, 3, 6, 2,
    0, 1, 5, 0, 5, 4,
    1, 2, 6, 1, 6, 5,
    0, 4, 7, 0, 7, 3,
  ];
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1], 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.userData.triangleWinding = "outward-ccw";
  return geometry;
};

for (const [name, shape, size, center, family, topScale] of profile.parts) {
  const mesh = new Mesh(createGeometry(shape, size, center, topScale), materialByFamily[family] || fallbackMaterial);
  mesh.name = `${kitId}-${name}`;
  mesh.userData.geometrySource = "explicit-wound-triangles";
  scene.add(mesh);
}

const floor = new Mesh(new PlaneGeometry(7, 6), new MeshStandardMaterial({ color: 0x6a543b, roughness: 0.94, metalness: 0.02 }));
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.01;
scene.add(floor);

const wall = new Mesh(new PlaneGeometry(7, 4.2), new MeshStandardMaterial({ color: 0x604a35, roughness: 0.92, metalness: 0.04 }));
wall.position.set(0, 2.1, -1.85);
scene.add(wall);

const ambient = new AmbientLight(0xb59672, 0.2);
scene.add(ambient);
const practical = new PointLight(0xe2a463, 2.4, 8, 1.8);
practical.position.set(1.8, 2.2, 2.2);
scene.add(practical);
const fill = new PointLight(0x98775b, 0.85, 7, 2);
fill.position.set(-3, 3.2, 4);
scene.add(fill);

const modes = {
  front: { camera: [0, 1.55, 5.35], lookAt: [0, 1.05, 0], lighting: "neutral-studio" },
  side: { camera: [5.5, 1.55, 0.2], lookAt: [0, 1.05, 0], lighting: "neutral-studio" },
  "three-quarter": { camera: [4.2, 2.0, 5.05], lookAt: [0.1, 1.05, 0], lighting: "corridor-dark" },
  "top-detail": { camera: [2.5, 4.5, 3.2], lookAt: [0, 1.1, 0], lighting: "lamp-emissive" },
  "player-distance": { camera: [0.2, 1.6, 7.4], lookAt: [0, 1.0, 0], lighting: "low-ambient" },
  "corridor-dark": { camera: [2.35, 1.75, 6.15], lookAt: [0.1, 1.0, -0.1], lighting: "corridor-dark" },
};

for (const angle of [0, 45, 90, 135, 180, 225, 270, 315]) {
  const radians = (angle * Math.PI) / 180;
  const radius = 6.1;
  modes[`orbit-${String(angle).padStart(3, "0")}`] = {
    camera: [Math.sin(radians) * radius, 1.85, Math.cos(radians) * radius],
    lookAt: [0, 1.05, 0],
    lighting: angle === 0 || angle === 45 || angle === 315 ? "corridor-dark" : "neutral-studio",
    orbitAngle: angle,
  };
}

const lightingPresets = {
  "neutral-studio": { ambient: 0.5, practical: 1.35, fill: 1.2 },
  "corridor-dark": { ambient: 0.36, practical: 3.0, fill: 1.1 },
  "lamp-emissive": { ambient: 0.12, practical: 3.2, fill: 0.18 },
  "low-ambient": { ambient: 0.2, practical: 2.4, fill: 0.62 },
};

const applyMode = (modeName) => {
  const mode = modes[modeName] || modes["three-quarter"];
  const lighting = lightingPresets[mode.lighting];
  camera.position.set(...mode.camera);
  camera.lookAt(new Vector3(...mode.lookAt));
  ambient.intensity = lighting.ambient;
  practical.intensity = lighting.practical;
  fill.intensity = lighting.fill;
  modeLabel.textContent = `angle: ${modeName} / lighting: ${mode.lighting}`;
  buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mode === modeName)));
  window.__objectKitReviewRoom.state = {
    kitId,
    lighting: mode.lighting,
    mode: modeName,
    orbitAngle: mode.orbitAngle ?? null,
  };
};

buttons.forEach((button) => {
  button.addEventListener("click", () => applyMode(button.dataset.mode));
});

window.__objectKitReviewRoom = {
  setMode: applyMode,
  state: {
    kitId,
    lighting: "corridor-dark",
    mode: "three-quarter",
  },
};

const url = new URL(window.location.href);
applyMode(url.searchParams.get("mode") || "three-quarter");

const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
