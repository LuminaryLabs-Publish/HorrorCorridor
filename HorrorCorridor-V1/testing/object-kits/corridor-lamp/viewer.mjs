import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  Float32BufferAttribute,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "/node_modules/three/build/three.module.js";

const canvas = document.querySelector("#lamp-canvas");
const modeLabel = document.querySelector("#mode-label");
const buttons = [...document.querySelectorAll("[data-mode]")];

const scene = new Scene();
scene.background = null;

const camera = new PerspectiveCamera(52, 900 / 620, 0.1, 100);
const renderer = new WebGLRenderer({ antialias: true, canvas, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(900, 620, false);
renderer.shadowMap.enabled = true;

const rustMaterial = new MeshStandardMaterial({
  color: 0x6a4328,
  roughness: 0.86,
  metalness: 0.28,
  emissive: 0x17100a,
  emissiveIntensity: 0.1,
});

const darkMaterial = new MeshStandardMaterial({
  color: 0x17130f,
  roughness: 0.9,
  metalness: 0.18,
});

const lensMaterial = new MeshBasicMaterial({
  color: 0xe7ad66,
  transparent: true,
  opacity: 0.92,
  toneMapped: false,
});

const floorMaterial = new MeshStandardMaterial({
  color: 0x846544,
  roughness: 0.94,
  metalness: 0.02,
});

const wallMaterial = new MeshStandardMaterial({
  color: 0x7a6046,
  roughness: 0.9,
  metalness: 0.04,
});

const addBox = (name, size, position, material) => {
  const mesh = new Mesh(new BoxGeometry(size.x, size.y, size.z), material);
  mesh.name = name;
  mesh.position.set(position.x, position.y, position.z);
  scene.add(mesh);
  return mesh;
};

const createWoundPlateGeometry = (size, topScale = 0.92) => {
  const bottomX = size.x * 0.5;
  const bottomY = size.y * 0.5;
  const bottomZ = size.z * 0.5;
  const topX = bottomX * topScale;
  const topZ = bottomZ * topScale;
  const geometry = new BufferGeometry();
  geometry.setAttribute(
    "position",
    new Float32BufferAttribute(
      [
        -bottomX, -bottomY, -bottomZ,
        bottomX, -bottomY, -bottomZ,
        bottomX, -bottomY, bottomZ,
        -bottomX, -bottomY, bottomZ,
        -topX, bottomY, -topZ,
        topX, bottomY, -topZ,
        topX, bottomY, topZ,
        -topX, bottomY, topZ,
      ],
      3,
    ),
  );
  geometry.setIndex([
    0, 1, 2, 0, 2, 3,
    4, 7, 6, 4, 6, 5,
    3, 2, 6, 3, 6, 7,
    0, 4, 5, 0, 5, 1,
    1, 5, 6, 1, 6, 2,
    0, 3, 7, 0, 7, 4,
  ]);
  geometry.computeVertexNormals();
  geometry.userData.triangleWinding = "outward-ccw";
  return geometry;
};

const addWoundPlate = (name, size, position, material, topScale = 0.92) => {
  const mesh = new Mesh(createWoundPlateGeometry(size, topScale), material);
  mesh.name = name;
  mesh.position.set(position.x, position.y, position.z);
  mesh.userData.geometrySource = "explicit-wound-triangles";
  scene.add(mesh);
  return mesh;
};

const createLamp = () => {
  const group = [];
  const poleRadius = 0.16;
  const poleHeight = 3.25;

  const add = (mesh) => {
    group.push(mesh);
    scene.add(mesh);
    return mesh;
  };

  add(new Mesh(new CylinderGeometry(poleRadius * 0.52, poleRadius * 0.82, poleHeight, 16), rustMaterial))
    .position.y = poleHeight * 0.5;

  for (const y of [poleHeight * 0.18, poleHeight * 0.48, poleHeight * 0.78]) {
    const band = add(new Mesh(new TorusGeometry(poleRadius * 0.62, poleRadius * 0.08, 6, 18), darkMaterial));
    band.position.y = y;
    band.rotation.x = Math.PI / 2;
  }

  const bracket = addBox(
    "lamp-wall-bracket",
    { x: poleRadius * 1.9, y: poleRadius * 3.2, z: poleRadius * 0.52 },
    { x: -poleRadius * 0.72, y: poleHeight * 0.58, z: -poleRadius * 0.48 },
    darkMaterial,
  );
  group.push(bracket);

  const arm = add(new Mesh(new CylinderGeometry(poleRadius * 0.28, poleRadius * 0.34, poleHeight * 0.36, 12), darkMaterial));
  arm.position.set(poleRadius * 0.98, poleHeight * 0.9, 0);
  arm.rotation.z = Math.PI / 2.15;

  const head = addBox(
    "lamp-head",
    { x: poleRadius * 1.78, y: poleRadius * 0.82, z: poleRadius * 1.28 },
    { x: poleRadius * 1.82, y: poleHeight * 0.84, z: 0 },
    rustMaterial,
  );
  head.rotation.z = -0.14;
  group.push(head);

  const cap = addBox(
    "lamp-head-cap",
    { x: poleRadius * 2.05, y: poleRadius * 0.24, z: poleRadius * 1.48 },
    { x: poleRadius * 1.7, y: poleHeight * 0.98, z: 0 },
    darkMaterial,
  );
  cap.rotation.z = -0.12;
  group.push(cap);

  for (const z of [-poleRadius * 0.48, 0, poleRadius * 0.48]) {
    const cage = add(new Mesh(new CylinderGeometry(poleRadius * 0.045, poleRadius * 0.045, poleRadius * 1.42, 5), darkMaterial));
    cage.position.set(poleRadius * 2.1, poleHeight * 0.77, z);
    cage.rotation.x = Math.PI / 2;
    cage.rotation.z = -0.14;
  }

  const lens = addBox(
    "lamp-warm-lens",
    { x: poleRadius * 0.72, y: poleRadius * 0.18, z: poleRadius * 0.94 },
    { x: poleRadius * 2.34, y: poleHeight * 0.75, z: 0 },
    lensMaterial,
  );
  lens.rotation.z = -0.14;
  group.push(lens);

  add(new Mesh(new SphereGeometry(poleRadius * 0.28, 16, 10), lensMaterial))
    .position.set(poleRadius * 2.08, poleHeight * 0.76, 0);

  const basePlate = addWoundPlate(
    "lamp-base-plate-wound",
    { x: poleRadius * 3.32, y: poleRadius * 0.34, z: poleRadius * 2.72 },
    { x: 0, y: poleRadius * 0.17, z: 0 },
    darkMaterial,
    0.86,
  );
  basePlate.rotation.y = Math.PI / 4;

  const base = addWoundPlate(
    "lamp-base-wound",
    { x: poleRadius * 2.45, y: poleRadius * 0.24, z: poleRadius * 2.45 },
    { x: 0, y: poleRadius * 0.39, z: 0 },
    darkMaterial,
    0.9,
  );
  base.rotation.y = Math.PI / 4;
  group.push(base);

  for (const x of [-poleRadius * 0.76, poleRadius * 0.76]) {
    for (const z of [-poleRadius * 0.76, poleRadius * 0.76]) {
      add(new Mesh(new SphereGeometry(poleRadius * 0.11, 8, 6), rustMaterial))
        .position.set(x, poleRadius * 0.56, z);
    }
  }

  const cable = add(new Mesh(
    new TubeGeometry(
      new CatmullRomCurve3([
        new Vector3(-poleRadius * 0.44, poleHeight * 0.72, -poleRadius * 0.52),
        new Vector3(poleRadius * 0.25, poleHeight * 0.96, -poleRadius * 0.72),
        new Vector3(poleRadius * 1.64, poleHeight * 0.98, -poleRadius * 0.42),
        new Vector3(poleRadius * 2.03, poleHeight * 0.84, -poleRadius * 0.2),
      ]),
      18,
      poleRadius * 0.055,
      5,
      false,
    ),
    darkMaterial,
  ));
  group.push(cable);

  return group;
};

const floor = new Mesh(new PlaneGeometry(7, 6), floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.01;
scene.add(floor);

const wall = new Mesh(new PlaneGeometry(7, 4.2), wallMaterial);
wall.position.set(0, 2.1, -1.85);
scene.add(wall);

createLamp();

const ambient = new AmbientLight(0xb59672, 0.18);
scene.add(ambient);

const practical = new PointLight(0xe2a463, 2.2, 8, 1.8);
practical.position.set(0.38, 2.45, 0);
scene.add(practical);

const fill = new PointLight(0x98775b, 0.8, 7, 2);
fill.position.set(-3, 3.2, 4);
scene.add(fill);

const modes = {
  front: {
    camera: [0, 1.85, 5.35],
    lookAt: [0, 1.55, 0],
    lighting: "neutral-studio",
  },
  side: {
    camera: [5.5, 1.9, 0.2],
    lookAt: [0.2, 1.65, 0],
    lighting: "neutral-studio",
  },
  "three-quarter": {
    camera: [4.2, 2.35, 5.05],
    lookAt: [0.25, 1.7, 0],
    lighting: "corridor-dark",
  },
  "top-detail": {
    camera: [2.5, 5.3, 3.2],
    lookAt: [0.28, 2.55, 0],
    lighting: "lamp-emissive",
  },
  "player-distance": {
    camera: [0.2, 1.75, 7.4],
    lookAt: [0.2, 1.55, 0],
    lighting: "low-ambient",
  },
  "corridor-dark": {
    camera: [2.35, 1.95, 6.15],
    lookAt: [0.35, 1.65, -0.1],
    lighting: "corridor-dark",
  },
};

const orbitAngles = [0, 45, 90, 135, 180, 225, 270, 315];
for (const angle of orbitAngles) {
  const radians = (angle * Math.PI) / 180;
  const radius = 6.1;
  const key = `orbit-${String(angle).padStart(3, "0")}`;
  modes[key] = {
    camera: [Math.sin(radians) * radius, 2.05, Math.cos(radians) * radius],
    lookAt: [0.24, 1.65, 0],
    lighting: angle === 0 || angle === 45 || angle === 315 ? "corridor-dark" : "neutral-studio",
    orbitAngle: angle,
  };
}

const lightingPresets = {
  "neutral-studio": { ambient: 0.52, practical: 1.3, fill: 1.2 },
  "corridor-dark": { ambient: 0.48, practical: 4.2, fill: 1.45 },
  "flashlight-only": { ambient: 0.04, practical: 0.45, fill: 2.2 },
  "lamp-emissive": { ambient: 0.1, practical: 3.2, fill: 0.18 },
  "low-ambient": { ambient: 0.22, practical: 2.8, fill: 0.7 },
};

const applyMode = (modeName) => {
  const mode = modes[modeName] ?? modes["three-quarter"];
  const lighting = lightingPresets[mode.lighting];
  camera.position.set(...mode.camera);
  camera.lookAt(new Vector3(...mode.lookAt));
  ambient.intensity = lighting.ambient;
  practical.intensity = lighting.practical;
  fill.intensity = lighting.fill;
  modeLabel.textContent = `angle: ${modeName} / lighting: ${mode.lighting}`;
  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.mode === modeName));
  });
  window.__corridorLampReviewRoom.state = {
    mode: modeName,
    lighting: mode.lighting,
    orbitAngle: mode.orbitAngle ?? null,
  };
};

buttons.forEach((button) => {
  button.addEventListener("click", () => applyMode(button.dataset.mode));
});

window.__corridorLampReviewRoom = {
  setMode: applyMode,
  state: {
    mode: "three-quarter",
    lighting: "corridor-dark",
  },
};

const url = new URL(window.location.href);
applyMode(url.searchParams.get("mode") ?? "three-quarter");

const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
