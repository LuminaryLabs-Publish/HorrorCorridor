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
    traits: ["open frame", "circular flywheel", "fuel tank", "exhaust stack", "loose cable"],
    parts: [
      ["runner-near", "box", [1.72, 0.12, 0.12], [0, 0.08, 0.34], "rusted-metal"],
      ["runner-far", "box", [1.72, 0.12, 0.12], [0, 0.08, -0.34], "rusted-metal"],
      ["cross-left", "box", [0.12, 0.14, 0.78], [-0.68, 0.13, 0], "rusted-metal"],
      ["cross-right", "box", [0.12, 0.14, 0.78], [0.68, 0.13, 0], "rusted-metal"],
      ["post-left", "box", [0.09, 0.9, 0.09], [-0.72, 0.56, -0.31], "rusted-metal"],
      ["post-right", "box", [0.09, 0.94, 0.09], [0.72, 0.58, -0.31], "rusted-metal"],
      ["frame-top", "box", [1.5, 0.09, 0.09], [0, 1.02, -0.31], "rusted-metal"],
      ["engine-drum", "cylinder", [0.82, 0.82, 0.64], [-0.3, 0.57, 0.02], "painted-metal", "z", 16],
      ["flywheel-rim", "cylinder", [0.92, 0.92, 0.08], [-0.3, 0.57, 0.37], "rusted-metal", "z", 16],
      ["flywheel-face", "cylinder", [0.68, 0.68, 0.065], [-0.3, 0.57, 0.425], "rubber-cable", "z", 16],
      ["rotor-hub", "cylinder", [0.2, 0.2, 0.14], [-0.3, 0.57, 0.49], "rusted-metal", "z", 12],
      ["spoke-horizontal", "box", [0.56, 0.065, 0.045], [-0.3, 0.57, 0.475], "rusted-metal"],
      ["spoke-vertical", "box", [0.065, 0.56, 0.045], [-0.3, 0.57, 0.48], "rusted-metal"],
      ["engine-block", "trapezoid", [0.58, 0.66, 0.6], [0.43, 0.55, -0.02], "painted-metal", 0.82],
      ["fin-high", "box", [0.42, 0.055, 0.07], [0.43, 0.7, 0.31], "rusted-metal"],
      ["fin-mid", "box", [0.46, 0.055, 0.07], [0.43, 0.56, 0.32], "rusted-metal"],
      ["fin-low", "box", [0.34, 0.055, 0.07], [0.38, 0.42, 0.31], "rusted-metal"],
      ["fuel-tank", "cylinder", [0.84, 0.26, 0.26], [0.02, 1.05, -0.09], "painted-metal", "x", 12],
      ["fuel-band-left", "cylinder", [0.07, 0.31, 0.31], [-0.27, 1.05, -0.09], "rusted-metal", "x", 12],
      ["fuel-band-right", "cylinder", [0.07, 0.31, 0.31], [0.3, 1.05, -0.09], "rusted-metal", "x", 12],
      ["exhaust-stack", "cylinder", [0.16, 0.62, 0.16], [0.57, 1.22, -0.23], "rusted-metal", "y", 10],
      ["exhaust-cap", "cylinder", [0.24, 0.08, 0.24], [0.57, 1.56, -0.23], "rusted-metal", "y", 10],
      ["control-panel", "trapezoid", [0.3, 0.26, 0.06], [0.49, 0.75, 0.35], "painted-metal", 0.74],
      ["socket-panel", "box", [0.19, 0.14, 0.05], [0.49, 0.71, 0.405], "rubber-cable"],
      ["cable-socket", "cylinder", [0.14, 0.14, 0.08], [0.61, 0.31, 0.32], "rubber-cable", "z", 10],
      ["loose-cable", "box", [0.1, 0.1, 0.48], [0.76, 0.16, -0.04], "rubber-cable"],
      ["loose-cable-tail", "box", [0.38, 0.08, 0.1], [0.9, 0.06, -0.32], "rubber-cable"],
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
    traits: ["two-bay frame", "repeated shelves", "loaded machine storage", "open negative space"],
    parts: [
      ["post-lf", "box", [0.14, 2.32, 0.14], [-1.08, 1.16, 0.38], "rusted-metal"],
      ["post-cf", "box", [0.14, 2.24, 0.14], [0, 1.12, 0.38], "rusted-metal"],
      ["post-rf", "box", [0.14, 2.34, 0.14], [1.08, 1.17, 0.38], "rusted-metal"],
      ["post-lb", "box", [0.13, 2.24, 0.13], [-1.08, 1.12, -0.38], "rusted-metal"],
      ["post-cb", "box", [0.13, 2.3, 0.13], [0, 1.15, -0.38], "rusted-metal"],
      ["post-rb", "box", [0.13, 2.28, 0.13], [1.08, 1.14, -0.38], "rusted-metal"],
      ["foot-left", "box", [0.32, 0.1, 0.92], [-1.08, 0.05, 0], "rusted-metal"],
      ["foot-center", "box", [0.32, 0.1, 0.92], [0, 0.05, 0], "rusted-metal"],
      ["foot-right", "box", [0.32, 0.1, 0.92], [1.08, 0.05, 0], "rusted-metal"],
      ["shelf-base", "trapezoid", [2.28, 0.11, 0.82], [0, 0.27, 0], "rusted-metal", 0.97],
      ["shelf-low", "trapezoid", [2.28, 0.11, 0.82], [0, 0.85, 0], "rusted-metal", 0.95],
      ["shelf-mid", "trapezoid", [2.24, 0.11, 0.8], [-0.02, 1.43, 0], "rusted-metal", 0.93],
      ["shelf-high", "trapezoid", [2.28, 0.11, 0.82], [0, 2.01, 0], "rusted-metal", 0.96],
      ["lip-base", "box", [2.3, 0.14, 0.1], [0, 0.34, 0.39], "rusted-metal"],
      ["lip-low", "box", [2.3, 0.14, 0.1], [0, 0.92, 0.39], "rusted-metal"],
      ["lip-mid", "box", [2.26, 0.14, 0.1], [-0.02, 1.5, 0.39], "rusted-metal"],
      ["lip-high", "box", [2.3, 0.14, 0.1], [0, 2.08, 0.39], "rusted-metal"],
      ["rear-rail-low", "box", [2.3, 0.11, 0.1], [0, 0.55, -0.38], "rusted-metal"],
      ["rear-rail-mid", "box", [2.3, 0.11, 0.1], [0, 1.13, -0.38], "rusted-metal"],
      ["rear-rail-high", "box", [2.3, 0.11, 0.1], [0, 1.71, -0.38], "rusted-metal"],
      ["rear-header", "box", [2.3, 0.12, 0.1], [0, 2.28, -0.38], "rusted-metal"],
      ["front-header", "box", [2.3, 0.12, 0.1], [0, 2.28, 0.38], "rusted-metal"],
      ["lower-crate", "trapezoid", [0.86, 0.42, 0.56], [-0.55, 0.54, 0.02], "painted-utility", 0.91],
      ["lower-crate-band", "box", [0.72, 0.1, 0.06], [-0.55, 0.56, 0.32], "rusted-metal"],
      ["canister-a", "cylinder", [0.3, 0.46, 0.3], [0.4, 0.56, 0.02], "painted-utility", "y", 10],
      ["canister-a-cap", "cylinder", [0.34, 0.06, 0.34], [0.4, 0.82, 0.02], "rusted-metal", "y", 8],
      ["canister-b", "cylinder", [0.34, 0.5, 0.34], [0.78, 0.54, -0.04], "painted-utility", "y", 10],
      ["canister-b-cap", "cylinder", [0.38, 0.06, 0.38], [0.78, 0.82, -0.04], "rusted-metal", "y", 8],
      ["tool-case", "trapezoid", [0.82, 0.34, 0.52], [-0.56, 1.08, 0.02], "painted-utility", 0.93],
      ["tool-handle", "box", [0.42, 0.07, 0.08], [-0.56, 1.31, 0.02], "rusted-metal"],
      ["tool-handle-left", "box", [0.06, 0.16, 0.08], [-0.74, 1.25, 0.02], "rusted-metal"],
      ["tool-handle-right", "box", [0.06, 0.16, 0.08], [-0.38, 1.25, 0.02], "rusted-metal"],
      ["mid-bin", "trapezoid", [0.78, 0.4, 0.58], [0.56, 1.1, 0], "painted-utility", 0.86],
      ["mid-bin-label", "box", [0.32, 0.13, 0.05], [0.56, 1.12, 0.31], "rusted-metal"],
      ["upper-bin-left", "box", [0.48, 0.3, 0.48], [-0.78, 1.64, 0.01], "painted-utility"],
      ["upper-bin-center", "trapezoid", [0.38, 0.38, 0.5], [-0.24, 1.68, -0.03], "painted-utility", 0.84],
      ["upper-drum", "cylinder", [0.7, 0.32, 0.32], [0.58, 1.65, 0.02], "painted-utility", "x", 12],
      ["upper-drum-band-left", "cylinder", [0.08, 0.38, 0.38], [0.32, 1.65, 0.02], "rusted-metal", "x", 10],
      ["upper-drum-band-right", "cylinder", [0.08, 0.38, 0.38], [0.84, 1.65, 0.02], "rusted-metal", "x", 10],
      ["top-tray", "trapezoid", [0.9, 0.16, 0.52], [-0.5, 2.15, 0], "painted-utility", 0.9],
      ["top-box", "box", [0.48, 0.2, 0.42], [0.7, 2.17, -0.02], "painted-utility"],
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

const createCylinderGeometry = (size, center, axis = "y", radialSegments = 12) => {
  const [sx, sy, sz] = size;
  const [cx, cy, cz] = center;
  const segments = Math.max(6, Math.min(32, Math.floor(radialSegments)));
  const halfLength = axis === "x" ? sx * 0.5 : axis === "z" ? sz * 0.5 : sy * 0.5;
  const radiusA = axis === "x" ? sy * 0.5 : sx * 0.5;
  const radiusB = axis === "z" ? sy * 0.5 : sz * 0.5;
  const positions = [];
  const indices = [];
  const point = (axial, radialAValue, radialBValue) => {
    if (axis === "x") return [cx + axial, cy - radialAValue, cz + radialBValue];
    if (axis === "z") return [cx + radialAValue, cy - radialBValue, cz + axial];
    return [cx + radialAValue, cy + axial, cz + radialBValue];
  };
  const push = (value) => positions.push(...value);

  for (let index = 0; index < segments; index += 1) {
    const radians = (index / segments) * Math.PI * 2;
    const radialAValue = Math.cos(radians) * radiusA;
    const radialBValue = Math.sin(radians) * radiusB;
    push(point(-halfLength, radialAValue, radialBValue));
    push(point(halfLength, radialAValue, radialBValue));
  }
  const bottomCapStart = positions.length / 3;
  for (let index = 0; index < segments; index += 1) {
    const radians = (index / segments) * Math.PI * 2;
    push(point(-halfLength, Math.cos(radians) * radiusA, Math.sin(radians) * radiusB));
  }
  const topCapStart = positions.length / 3;
  for (let index = 0; index < segments; index += 1) {
    const radians = (index / segments) * Math.PI * 2;
    push(point(halfLength, Math.cos(radians) * radiusA, Math.sin(radians) * radiusB));
  }
  const bottomCenter = positions.length / 3;
  push(point(-halfLength, 0, 0));
  const topCenter = positions.length / 3;
  push(point(halfLength, 0, 0));

  for (let index = 0; index < segments; index += 1) {
    const next = (index + 1) % segments;
    const bottom = index * 2;
    const top = bottom + 1;
    const nextBottom = next * 2;
    const nextTop = nextBottom + 1;
    indices.push(bottom, nextTop, nextBottom, bottom, top, nextTop);
    indices.push(bottomCenter, bottomCapStart + index, bottomCapStart + next);
    indices.push(topCenter, topCapStart + next, topCapStart + index);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(Array.from({ length: (positions.length / 3) * 2 }, (_, index) => index % 2), 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.userData.triangleWinding = "outward-ccw";
  return geometry;
};

const createGeometry = (shape, size, center, shapeDetail = 0.86, radialSegments = 12) => {
  if (shape === "cylinder") {
    return createCylinderGeometry(
      size,
      center,
      typeof shapeDetail === "string" ? shapeDetail : "y",
      radialSegments,
    );
  }
  const topScale = typeof shapeDetail === "number" ? shapeDetail : 0.86;
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

for (const [name, shape, size, center, family, shapeDetail, radialSegments] of profile.parts) {
  const mesh = new Mesh(createGeometry(shape, size, center, shapeDetail, radialSegments), materialByFamily[family] || fallbackMaterial);
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
