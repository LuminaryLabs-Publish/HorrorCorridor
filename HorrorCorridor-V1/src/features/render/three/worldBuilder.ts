import {
  BoxGeometry,
  Color,
  CylinderGeometry,
  Group,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  Mesh,
  Object3D,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereGeometry,
  SpotLight,
  MeshStandardMaterial,
  Vector3,
  type Material,
  type PerspectiveCamera,
} from "three";

import { createHorrorCorridorPreset } from "@/protokits/presets/horror-corridor-preset";
import { CELL_SIZE, WALL_HEIGHT } from "@/lib/constants";
import { CUBE_COLORS, type CubeColorHex } from "@/lib/colors";
import type { MazeResult, MazeCube } from "@/features/maze/domain/mazeTypes";
import { createConcretePavingState } from "@/features/corridor/domain/concretePaving";
import { createCeilingCollapseState } from "@/features/corridor/domain/ceilingCollapse";
import type { ReplicatedGameSnapshot, WorldPosition } from "@/types/shared";

import { createLights } from "./createLights";
import { createMaterials } from "./createMaterials";
import {
  createSceneDressingManifest,
  type SceneDressingSummary,
} from "./sceneDressingDescriptors";
import {
  createScenePropRenderable,
  createSceneTextureRenderable,
} from "./sceneDressingRenderer";
import { createTerrainSurface, type TerrainSurface } from "./terrainSurface";
import { buildFurnishedChamberLayer } from "./furnishedChamberLayer";

export type MazeWorldFrame = Readonly<{
  snapshot: ReplicatedGameSnapshot | null;
  localPlayerId: string | null;
  localPlayerPosition: WorldPosition | null;
  localViewAngles?: Readonly<{
    yaw: number;
    pitch: number;
  }> | null;
  localCamera?: PerspectiveCamera | null;
}>;

export type MazeWorld = Readonly<{
  root: Group;
  attach: (scene: Scene) => void;
  update: (elapsedMs: number, frame?: MazeWorldFrame) => void;
  getSceneDressingSummary: () => SceneDressingSummary;
  getTerrainEyePosition: (position: WorldPosition) => WorldPosition;
  dispose: () => void;
}>;

type MazeStaticLayer = Group &
  Readonly<{
    update: (elapsedMs: number) => void;
    dispose: () => void;
  }>;

type MazeSceneDressingLayer = Group &
  Readonly<{
    summary: SceneDressingSummary;
    update: (elapsedMs: number) => void;
    dispose: () => void;
  }>;

const toWorldCellPosition = (gridX: number, gridY: number): Vector3 =>
  new Vector3(gridX * CELL_SIZE + CELL_SIZE / 2, 0, gridY * CELL_SIZE + CELL_SIZE / 2);

const cubeHexByName: ReadonlyMap<string, CubeColorHex> = new Map(
  CUBE_COLORS.map((color) => [color.name, color.hex] as const),
);
const defaultCubeHex: CubeColorHex = CUBE_COLORS[1].hex;
const pedestalOffsets = [
  [-CELL_SIZE * 0.55, 0],
  [CELL_SIZE * 0.55, 0],
  [0, CELL_SIZE * 0.55],
] as const;

const disposeObject = (object: Object3D, skipMaterials: ReadonlySet<Material> = new Set()): void => {
  const disposedMaterials = new Set<Material>();

  object.traverse((child) => {
    const mesh = child as Mesh & {
      geometry?: { dispose: () => void };
      material?: Material | Material[];
    };

    if (mesh.geometry && typeof mesh.geometry.dispose === "function") {
      mesh.geometry.dispose();
    }

    const material = mesh.material;
    if (Array.isArray(material)) {
      for (const entry of material) {
        if (
          typeof entry.dispose === "function" &&
          !disposedMaterials.has(entry) &&
          !skipMaterials.has(entry)
        ) {
          disposedMaterials.add(entry);
          entry.dispose();
        }
      }
    } else if (
      material &&
      typeof material.dispose === "function" &&
      !disposedMaterials.has(material) &&
      !skipMaterials.has(material)
    ) {
      disposedMaterials.add(material);
      material.dispose();
    }
  });
};

const buildSceneDressingLayer = (
  maze: MazeResult,
  preset: ReturnType<typeof createHorrorCorridorPreset>,
): MazeSceneDressingLayer => {
  const manifest = createSceneDressingManifest(maze, preset);
  const protectedOrigin = toWorldCellPosition(maze.start.x, maze.start.y);
  const protectedRadius = CELL_SIZE * 3.2;
  const isOutsideReferenceRoom = (
    descriptor: Readonly<{ position: Readonly<{ x: number; z: number }> }>,
  ): boolean =>
    Math.hypot(
      descriptor.position.x - protectedOrigin.x,
      descriptor.position.z - protectedOrigin.z,
    ) >= protectedRadius;
  const props = manifest.props.filter(isOutsideReferenceRoom);
  const textures = manifest.textures.filter(isOutsideReferenceRoom);
  const lightDescriptors = manifest.lights.filter(isOutsideReferenceRoom);
  const summary: SceneDressingSummary = {
    ...manifest.summary,
    propCount: props.length,
    textureCount: textures.length,
    lightCount: lightDescriptors.length,
    validation: {
      ...manifest.summary.validation,
      meetsPropThreshold:
        props.length >= preset.renderValidation.minimumPropCount,
      meetsTextureThreshold:
        textures.length >= preset.renderValidation.minimumTextureCount,
      meetsLightThreshold:
        lightDescriptors.length >= preset.renderValidation.minimumLightCount,
    },
  };
  const group = new Group();
  group.name = "maze-scene-dressing";
  group.userData.sceneDressingSummary = summary;

  const materials: Material[] = [];
  const propPulseTargets: Mesh[] = [];
  const texturePulseTargets: Mesh[] = [];

  for (const descriptor of props) {
    const renderable = createScenePropRenderable(descriptor, preset);
    materials.push(...renderable.materials);
    propPulseTargets.push(...renderable.pulseTargets);
    group.add(renderable.object);
  }

  for (const descriptor of textures) {
    const renderable = createSceneTextureRenderable(descriptor, preset);
    materials.push(...renderable.materials);
    texturePulseTargets.push(...renderable.pulseTargets);
    group.add(renderable.object);
  }

  for (const descriptor of lightDescriptors) {
    const light = new PointLight(
      descriptor.color,
      descriptor.intensity,
      descriptor.range,
      descriptor.decay,
    );
    light.name = descriptor.id;
    light.position.set(descriptor.position.x, descriptor.position.y, descriptor.position.z);
    light.userData.baseIntensity = descriptor.intensity;
    group.add(light);
  }

  return Object.assign(group, {
    summary,
    update: (elapsedMs: number) => {
      for (const target of propPulseTargets) {
        const material = target.material;
        if (material instanceof MeshStandardMaterial) {
          material.emissiveIntensity =
            0.14 + Math.sin(elapsedMs * 0.0018 + target.position.x) * 0.04;
        } else if (material instanceof MeshBasicMaterial) {
          material.opacity = 0.56 + Math.sin(elapsedMs * 0.002 + target.position.z) * 0.08;
        }
      }
      for (const target of texturePulseTargets) {
        const material = target.material as MeshBasicMaterial;
        const baseOpacity = typeof material.userData.baseOpacity === "number" ? material.userData.baseOpacity : 0.18;
        material.opacity = Math.max(0.04, baseOpacity + Math.sin(elapsedMs * 0.002 + target.position.z) * 0.025);
      }
    },
    dispose: () => {
      disposeObject(group);
      for (const material of materials) {
        const generatedAlphaTexture = material.userData.generatedAlphaTexture as { dispose: () => void } | undefined;
        const generatedProjectionAlphaTexture = material.userData.generatedProjectionAlphaTexture as { dispose: () => void } | undefined;
        generatedAlphaTexture?.dispose();
        generatedProjectionAlphaTexture?.dispose();
      }
    },
  });
};

const countCells = (maze: MazeResult, predicate: (value: number) => boolean): number => {
  let total = 0;

  for (const row of maze.grid) {
    for (const cell of row) {
      if (predicate(cell)) {
        total += 1;
      }
    }
  }

  return total;
};

const projectedCellNoise = (x: number, y: number): number => {
  let value = Math.imul(x + 1013, 374761393) ^ Math.imul(y + 9176, 668265263);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
};

const buildInstancedLayer = (
  geometry: BoxGeometry,
  count: number,
  material: Material,
  name: string,
): InstancedMesh => {
  const mesh = new InstancedMesh(geometry, material, Math.max(count, 1));
  mesh.instanceMatrix.setUsage(35044);
  mesh.name = name;
  return mesh;
};

const setInstanceMatrix = (
  mesh: InstancedMesh,
  index: number,
  position: Readonly<{ x: number; y: number; z: number }>,
  scale: number | Readonly<{ x: number; y: number; z: number }> = 1,
): void => {
  const matrix = new Matrix4();
  const scaleVector =
    typeof scale === "number"
      ? new Vector3(scale, scale, scale)
      : new Vector3(scale.x, scale.y, scale.z);
  matrix.compose(
    position as Vector3,
    new Object3D().quaternion,
    scaleVector,
  );
  mesh.setMatrixAt(index, matrix);
};

const buildMazeStaticLayer = (
  maze: MazeResult,
  materials: ReturnType<typeof createMaterials>,
  lights: ReturnType<typeof createLights>,
  terrain: TerrainSurface,
  preset: ReturnType<typeof createHorrorCorridorPreset>,
): MazeStaticLayer => {
  const staticGroup = new Group();
  staticGroup.name = "maze-static";
  const wallGeometry = new BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE);
  const floorGeometry = new BoxGeometry(CELL_SIZE, 0.08, CELL_SIZE);
  const ceilingGeometry = new BoxGeometry(CELL_SIZE, 0.08, CELL_SIZE);

  const mainFloorCount = countCells(maze, (value) => value === 2 || value === 3 || value === 4);
  const branchFloorCount = countCells(maze, (value) => value === 1);
  const walkableCount = mainFloorCount + branchFloorCount;
  const wallCount = countCells(maze, (value) => value === 0);
  const usesRooflessOpenSky = preset.openSkyProjection.enabled && preset.openSkyProjection.rooflessCorridors;

  const mainFloorLayer = buildInstancedLayer(
    floorGeometry,
    mainFloorCount,
    materials.floor,
    "maze-main-floor",
  );
  const branchFloorLayer = buildInstancedLayer(
    floorGeometry,
    branchFloorCount,
    materials.branchFloor,
    "maze-branch-floor",
  );
  const ceilingLayer = buildInstancedLayer(
    ceilingGeometry,
    usesRooflessOpenSky ? 0 : walkableCount,
    materials.ceiling,
    "maze-ceiling",
  );
  const wallLayer = buildInstancedLayer(wallGeometry, wallCount, materials.wall, "maze-walls");

  let mainFloorIndex = 0;
  let branchFloorIndex = 0;
  let ceilingIndex = 0;
  let wallIndex = 0;

  for (let y = 0; y < maze.grid.length; y += 1) {
    for (let x = 0; x < maze.grid[y].length; x += 1) {
      const cell = maze.grid[y][x];
      const position = toWorldCellPosition(x, y);

      if (cell === 0) {
        const baseY = terrain.wallBaseYAt(position.x, position.z);
        const heightFactor = preset.openSkyProjection.enabled
          ? preset.openSkyProjection.heightRange[0] +
            projectedCellNoise(x, y) *
              (preset.openSkyProjection.heightRange[1] - preset.openSkyProjection.heightRange[0])
          : 1;
        const projectedHeight = WALL_HEIGHT * heightFactor;
        setInstanceMatrix(wallLayer, wallIndex, {
          x: position.x,
          y: baseY + projectedHeight / 2,
          z: position.z,
        }, { x: 1, y: projectedHeight / WALL_HEIGHT, z: 1 });
        wallIndex += 1;
        continue;
      }

      if (cell === 1) {
        const floorY = terrain.floorYAt(position.x, position.z, 0.035);
        setInstanceMatrix(branchFloorLayer, branchFloorIndex, {
          x: position.x,
          y: floorY,
          z: position.z,
        });
        branchFloorIndex += 1;
      } else {
        const floorY = terrain.floorYAt(position.x, position.z, 0.04);
        setInstanceMatrix(mainFloorLayer, mainFloorIndex, {
          x: position.x,
          y: floorY,
          z: position.z,
        });
        mainFloorIndex += 1;
      }

      if (!usesRooflessOpenSky) {
        const ceilingBaseY = terrain.floorYAt(position.x, position.z, WALL_HEIGHT - 0.04);
        setInstanceMatrix(ceilingLayer, ceilingIndex, {
          x: position.x,
          y: ceilingBaseY,
          z: position.z,
        });
        ceilingIndex += 1;
      }
    }
  }

  mainFloorLayer.count = mainFloorIndex;
  branchFloorLayer.count = branchFloorIndex;
  ceilingLayer.count = ceilingIndex;
  wallLayer.count = wallIndex;
  mainFloorLayer.instanceMatrix.needsUpdate = true;
  branchFloorLayer.instanceMatrix.needsUpdate = true;
  ceilingLayer.instanceMatrix.needsUpdate = true;
  wallLayer.instanceMatrix.needsUpdate = true;

  const startCell = toWorldCellPosition(maze.start.x, maze.start.y);
  const endCell = toWorldCellPosition(maze.end.x, maze.end.y);
  const startY = terrain.floorYAt(startCell.x, startCell.z);
  const endY = terrain.floorYAt(endCell.x, endCell.z);

  const endGlowMaterial = materials.glow.clone();

  const startLight = new PointLight(0xd7ad79, 3.1, 30, 1.55);
  startLight.position.set(startCell.x, startY + WALL_HEIGHT * 0.7, startCell.z);

  const endOrb = new Mesh(new SphereGeometry(CELL_SIZE * 0.16, 14, 14), materials.glow.clone());
  endOrb.name = "maze-end-orb";
  endOrb.position.set(endCell.x, endY + WALL_HEIGHT * 0.62, endCell.z);

  const endLight = new PointLight(0xa6af70, 2.7, 24, 1.75);
  endLight.position.set(endCell.x, endY + WALL_HEIGHT * 0.7, endCell.z);

  const pedestalGroup = new Group();
  pedestalGroup.name = "maze-pedestals";

  for (const [offsetX, offsetZ] of pedestalOffsets) {
    const pedestal = new Mesh(
      new BoxGeometry(CELL_SIZE * 0.24, WALL_HEIGHT * 0.42, CELL_SIZE * 0.24),
      materials.pedestal,
    );
    const pedestalY = terrain.floorYAt(endCell.x + offsetX, endCell.z + offsetZ);
    pedestal.position.set(endCell.x + offsetX, pedestalY + WALL_HEIGHT * 0.21, endCell.z + offsetZ);
    pedestalGroup.add(pedestal);
  }

  const guideGroup = new Group();
  guideGroup.name = "maze-guide-paths";
  const guideSampleSpacing = 6;

  for (const path of Object.values(maze.paths)) {
    for (let index = 0; index < path.length; index += guideSampleSpacing) {
      const node = path[index];
      const guideNode = new Mesh(
        new SphereGeometry(CELL_SIZE * 0.06, 6, 6),
        materials.guide,
      );
      guideNode.position.set(
        node.x * CELL_SIZE + CELL_SIZE / 2,
        terrain.floorYAt(node.x * CELL_SIZE + CELL_SIZE / 2, node.y * CELL_SIZE + CELL_SIZE / 2, 0.22) +
          Math.sin(index * 0.2) * 0.02,
        node.y * CELL_SIZE + CELL_SIZE / 2,
      );
      guideGroup.add(guideNode);
    }
  }

  const endHalo = new Mesh(new SphereGeometry(CELL_SIZE * 0.28, 16, 16), endGlowMaterial);
  endHalo.position.set(endCell.x, endY + WALL_HEIGHT * 0.56, endCell.z);

  staticGroup.add(mainFloorLayer);
  staticGroup.add(branchFloorLayer);
  staticGroup.add(ceilingLayer);
  staticGroup.add(wallLayer);
  staticGroup.add(startLight);
  staticGroup.add(endOrb);
  staticGroup.add(endLight);
  staticGroup.add(endHalo);
  staticGroup.add(pedestalGroup);
  staticGroup.add(guideGroup);

  const extraMaterials: Material[] = [endGlowMaterial];

  return Object.assign(staticGroup, {
    dispose: () => {
      disposeObject(staticGroup);
      for (const material of extraMaterials) {
        material.dispose();
      }
      materials.dispose();
    },
    update: (elapsedMs: number) => {
      lights.update(elapsedMs);
      endLight.intensity = 2.8 + Math.sin(elapsedMs * 0.0023) * 0.28;
      endGlowMaterial.opacity = 0.55 + Math.sin(elapsedMs * 0.0031) * 0.08;
    },
  });
};

const createCubeMesh = (
  cube: MazeCube,
  materials = createMaterials(createHorrorCorridorPreset()),
  terrain?: TerrainSurface,
): Mesh => {
  const cubeMaterial = materials.cube.clone();
  cubeMaterial.color.setHex(cube.colorHex);
  cubeMaterial.emissive.setHex(cube.colorHex);
  cubeMaterial.emissiveIntensity = 0.55;

  const mesh = new Mesh(
    new BoxGeometry(CELL_SIZE * 0.42, CELL_SIZE * 0.42, CELL_SIZE * 0.42),
    cubeMaterial,
  );
  mesh.name = cube.id;
  mesh.position.set(cube.x, (terrain?.floorYAt(cube.x, cube.z) ?? 0) + CELL_SIZE * 0.28, cube.z);
  mesh.userData.cubeId = cube.id;
  return mesh;
};

export const buildMazeWorld = (maze: MazeResult): MazeWorld => {
  const root = new Group();
  root.name = "maze-world";
  const preset = createHorrorCorridorPreset();
  const terrain = createTerrainSurface(maze, preset);
  const endCell = toWorldCellPosition(maze.end.x, maze.end.y);
  const startCell = toWorldCellPosition(maze.start.x, maze.start.y);

  const walkableCellCount = countCells(maze, (value) => value !== 0);
  const concretePaving = createConcretePavingState({
    seed: preset.sceneGeneration.seed,
    walkableCellCount,
    cellSize: CELL_SIZE,
    surfaceThickness: 0.08,
    maximumDisplacement: preset.terrainField.heightAmplitude,
    moisture: preset.terrainField.wetness,
    identity: preset.terrainShader.concreteIdentity,
  });
  const ceilingCollapse = createCeilingCollapseState({
    seed: preset.sceneGeneration.seed,
    chamberLength: preset.chamberFurnishing.bounds.length,
    chamberWidth: preset.chamberFurnishing.bounds.width,
    chamberHeight: preset.chamberFurnishing.bounds.height,
    openingStart: preset.chamberFurnishing.daylightBreach.start,
    openingLength: preset.chamberFurnishing.daylightBreach.length,
    openingWidth: preset.chamberFurnishing.bounds.width * 0.42,
    surface: preset.chamberFurnishing.ceilingSurface,
    config: preset.chamberFurnishing.collapseDamage,
  });
  const materials = createMaterials(preset, concretePaving);
  const lights = createLights();
  const staticLayer = buildMazeStaticLayer(maze, materials, lights, terrain, preset);
  const sceneDressingLayer = buildSceneDressingLayer(maze, preset);
  const furnishedChamberLayer = buildFurnishedChamberLayer({
    maze,
    preset,
    terrain,
  });
  const sceneDressingSummary: SceneDressingSummary = Object.freeze({
    ...sceneDressingLayer.summary,
    concretePaving,
    ceilingCollapse,
    propCount:
      sceneDressingLayer.summary.propCount + furnishedChamberLayer.summary.propCount,
    textureCount:
      sceneDressingLayer.summary.textureCount + furnishedChamberLayer.summary.textureCount,
    lightCount:
      sceneDressingLayer.summary.lightCount + furnishedChamberLayer.summary.lightCount,
    referenceRoom: furnishedChamberLayer.summary,
  });
  let streamedBuildingNumber = 0;
  let streamedChamberOrigin: WorldPosition = {
    x: startCell.x,
    y: terrain.floorYAt(startCell.x, startCell.z),
    z: startCell.z,
  };
  let streamedEntryYaw = -Math.PI / 2;

  const cubeGroup = new Group();
  cubeGroup.name = "maze-cubes";
  const cubeLightGroup = new Group();
  cubeLightGroup.name = "maze-cube-lights";

  const playerGroup = new Group();
  playerGroup.name = "maze-players";
  const playerFollowLight = new PointLight(0xffddb0, 0.82, 21, 1.22);
  playerFollowLight.name = "maze-player-near-fill";
  playerFollowLight.position.set(startCell.x, terrain.floorYAt(startCell.x, startCell.z, 2), startCell.z);
  const flashlightGroup = new Group();
  flashlightGroup.name = "maze-floating-flashlight";
  const flashlightBody = new Mesh(
    new BoxGeometry(CELL_SIZE * 0.14, CELL_SIZE * 0.08, CELL_SIZE * 0.28),
    materials.trim.clone(),
  );
  flashlightBody.name = "maze-floating-flashlight-body";
  const flashlightLens = new Mesh(new SphereGeometry(CELL_SIZE * 0.055, 8, 8), materials.glow.clone());
  flashlightLens.name = "maze-floating-flashlight-lens";
  flashlightLens.position.z = -CELL_SIZE * 0.16;
  const flashlight = new SpotLight(
    preset.flashlight.color,
    preset.flashlight.intensity,
    preset.flashlight.range,
    preset.flashlight.angle,
    preset.flashlight.penumbra,
    preset.flashlight.decay,
  );
  flashlight.name = "maze-floating-flashlight-spot";
  flashlight.target.name = "maze-floating-flashlight-target";
  flashlightGroup.add(flashlightBody);
  flashlightGroup.add(flashlightLens);
  flashlightGroup.add(flashlight);
  flashlightGroup.add(flashlight.target);

  const monsterGroup = new Group();
  monsterGroup.name = "maze-stalker-encounter";
  monsterGroup.visible = false;
  const monsterMaterial = new MeshStandardMaterial({
    color: 0x071008,
    emissive: 0x071c0d,
    emissiveIntensity: 0.08,
    roughness: 0.94,
    metalness: 0.02,
  });
  const monsterTorso = new Mesh(
    new CylinderGeometry(0.34, 0.62, 2.3, 7),
    monsterMaterial,
  );
  monsterTorso.position.y = 1.35;
  const monsterHead = new Mesh(
    new SphereGeometry(0.39, 10, 8),
    monsterMaterial,
  );
  monsterHead.position.set(0, 2.72, 0.04);
  monsterHead.scale.set(0.78, 1.24, 0.7);
  const monsterArmGeometry = new BoxGeometry(0.16, 2.15, 0.18);
  const monsterLeftArm = new Mesh(monsterArmGeometry, monsterMaterial);
  const monsterRightArm = new Mesh(monsterArmGeometry, monsterMaterial);
  monsterLeftArm.position.set(-0.53, 1.22, 0.02);
  monsterRightArm.position.set(0.53, 1.22, 0.02);
  monsterLeftArm.rotation.z = -0.12;
  monsterRightArm.rotation.z = 0.12;
  const monsterEyeMaterial = new MeshBasicMaterial({ color: 0xb3ffc2 });
  const monsterEyeGeometry = new SphereGeometry(0.03, 7, 6);
  const monsterLeftEye = new Mesh(monsterEyeGeometry, monsterEyeMaterial);
  const monsterRightEye = new Mesh(monsterEyeGeometry, monsterEyeMaterial);
  monsterLeftEye.position.set(-0.12, 2.79, -0.26);
  monsterRightEye.position.set(0.12, 2.79, -0.26);
  monsterLeftEye.scale.set(0.76, 1.08, 0.72);
  monsterRightEye.scale.set(1.08, 0.72, 0.72);
  const monsterMouthMaterial = new MeshBasicMaterial({ color: 0x010302 });
  const monsterMouth = new Mesh(
    new BoxGeometry(0.2, 0.026, 0.022),
    monsterMouthMaterial,
  );
  monsterMouth.name = "maze-stalker-mouth";
  monsterMouth.position.set(0.025, 2.57, -0.265);
  monsterMouth.rotation.z = -0.08;
  const monsterLight = new PointLight(0x4dff79, 0, 5.5, 1.8);
  monsterLight.position.set(0, 2.05, -0.42);
  monsterGroup.add(
    monsterTorso,
    monsterHead,
    monsterLeftArm,
    monsterRightArm,
    monsterLeftEye,
    monsterRightEye,
    monsterMouth,
    monsterLight,
  );
  let attachedScene: Scene | null = null;
  const calmSky = new Color(0x0b0c0a);
  const huntedSky = new Color(0x06170c);
  const jumpscareSky = new Color(0x0b2813);
  const calmFog = new Color(0x0d0f0c);
  const huntedFog = new Color(0x082411);

  const oozeGeometry = new PlaneGeometry(CELL_SIZE * 0.28, CELL_SIZE * 0.28);
  oozeGeometry.rotateX(-Math.PI / 2);
  const oozeMesh = new InstancedMesh(oozeGeometry, materials.ooze, Math.max(maze.cubes.length, 800));
  oozeMesh.name = "maze-ooze-decals";
  oozeMesh.count = 0;
  oozeMesh.frustumCulled = false;

  const cubeMeshes = new Map<string, Mesh>();
  const cubeLights = new Map<string, PointLight>();
  const playerMeshes = new Map<string, Mesh>();

  for (const cube of maze.cubes) {
    const mesh = createCubeMesh(cube, materials, terrain);
    cubeMeshes.set(cube.id, mesh);
    cubeGroup.add(mesh);

    const light = new PointLight(cube.colorHex, 0.34, 6.5, 2.2);
    light.name = `${cube.id}-light`;
    light.position.set(cube.x, CELL_SIZE * 0.6, cube.z);
    cubeLights.set(cube.id, light);
    cubeLightGroup.add(light);
  }

  root.add(staticLayer);
  root.add(furnishedChamberLayer);
  root.add(sceneDressingLayer);
  root.add(cubeGroup);
  root.add(cubeLightGroup);
  root.add(playerGroup);
  root.add(oozeMesh);
  root.add(playerFollowLight);
  root.add(flashlightGroup);
  root.add(monsterGroup);
  root.add(lights.group);

  const syncCubeMeshes = (
    snapshot: ReplicatedGameSnapshot["cubes"],
    anomalySlots: ReplicatedGameSnapshot["anomaly"]["slots"],
  ): void => {
    const slotIndexByCubeId = new Map(
      anomalySlots.flatMap((cubeId, index) =>
        cubeId ? ([[cubeId, index]] as const) : [],
      ),
    );

    for (const cube of snapshot) {
      const cubeHex = cubeHexByName.get(cube.color) ?? defaultCubeHex;
      let mesh = cubeMeshes.get(cube.id);

      if (!mesh) {
        mesh = createCubeMesh(
          {
            id: cube.id,
            colorName: cube.color,
            colorHex: cubeHex,
            x: cube.position.x,
            z: cube.position.z,
            state: "ground",
            ownerId: null,
          },
          materials,
          terrain,
        );
        cubeMeshes.set(cube.id, mesh);
        cubeGroup.add(mesh);
      }

      let light = cubeLights.get(cube.id);
      if (!light) {
        light = new PointLight(cubeHex, 0.34, 6.5, 2.2);
        light.name = `${cube.id}-light`;
        cubeLights.set(cube.id, light);
        cubeLightGroup.add(light);
      }

      const isHeld = cube.state === "held";
      const isPlaced = cube.state === "placed";
      const slotIndex = slotIndexByCubeId.get(cube.id) ?? 0;
      const [offsetX, offsetZ] = pedestalOffsets[slotIndex] ?? [0, 0];
      const position = isPlaced
        ? {
            x: endCell.x + offsetX,
            y: terrain.floorYAt(endCell.x + offsetX, endCell.z + offsetZ, WALL_HEIGHT * 0.46),
            z: endCell.z + offsetZ,
          }
        : {
            x: cube.position.x,
            y: terrain.floorYAt(cube.position.x, cube.position.z, CELL_SIZE * 0.28),
            z: cube.position.z,
          };

      mesh.visible = !isHeld;
      mesh.position.set(position.x, position.y, position.z);
      mesh.rotation.y = isPlaced ? Math.PI * 0.25 : 0;
      mesh.scale.setScalar(isHeld ? 0.001 : 1);

      light.visible = !isHeld;
      light.color.setHex(cubeHex);
      light.position.set(position.x, position.y + CELL_SIZE * 0.22, position.z);
      light.intensity = isHeld ? 0.02 : isPlaced ? 1.25 : 0.92;
    }

    for (const [cubeId, mesh] of cubeMeshes) {
      if (snapshot.some((cube) => cube.id === cubeId)) {
        continue;
      }

      mesh.visible = false;
      mesh.scale.setScalar(0.001);

      const light = cubeLights.get(cubeId);
      if (light) {
        light.visible = false;
        light.intensity = 0;
      }
    }
  };

  const syncPlayerMeshes = (
    snapshot: ReplicatedGameSnapshot["players"],
    localPlayerId: string | null,
  ): void => {
    const activeIds = new Set<string>();

    for (const player of snapshot) {
      if (player.id === localPlayerId) {
        continue;
      }

      activeIds.add(player.id);
      let mesh = playerMeshes.get(player.id);

      if (!mesh) {
        mesh = new Mesh(
          new BoxGeometry(CELL_SIZE * 0.28, 1.65, CELL_SIZE * 0.28),
          materials.player.clone(),
        );
        mesh.name = `player-${player.id}`;
        playerMeshes.set(player.id, mesh);
        playerGroup.add(mesh);
      }

      const playerMaterial = mesh.material as MeshStandardMaterial;
      playerMaterial.color.set(player.color);
      playerMaterial.emissive.set(player.color);
      playerMaterial.emissiveIntensity = 0.18;

      mesh.visible = true;
      mesh.position.set(player.position.x, terrain.floorYAt(player.position.x, player.position.z, 0.82), player.position.z);
      mesh.rotation.y = player.rotationY;
      mesh.scale.setScalar(1);
    }

    for (const [playerId, mesh] of playerMeshes) {
      if (activeIds.has(playerId)) {
        continue;
      }

      mesh.visible = false;
      mesh.scale.setScalar(0.001);
    }
  };

  const syncOozeTrail = (snapshot: ReplicatedGameSnapshot["oozeTrail"]): void => {
    let index = 0;
    const decal = new Object3D();

    for (const ooze of snapshot) {
      decal.position.set(ooze.x, terrain.floorYAt(ooze.x, ooze.z, Math.max(0.012, ooze.y)), ooze.z);
      decal.rotation.set(0, ooze.rotY, 0);
      decal.scale.set(ooze.scale, ooze.scale, ooze.scale);
      decal.updateMatrix();
      oozeMesh.setMatrixAt(index, decal.matrix);
      index += 1;
    }

    oozeMesh.count = index;
    oozeMesh.instanceMatrix.needsUpdate = true;
  };

  return {
    root,
    attach: (scene) => {
      attachedScene = scene;
      scene.add(root);
    },
    update: (elapsedMs, frame) => {
      staticLayer.update(elapsedMs);
      furnishedChamberLayer.update(elapsedMs);
      sceneDressingLayer.update(elapsedMs);
      const localPlayerPosition = frame?.localPlayerPosition;

      if (localPlayerPosition) {
        const viewAngles = frame?.localViewAngles ?? { yaw: 0, pitch: 0 };
        const horizontal = Math.cos(viewAngles.pitch);
        const forward = new Vector3(
          -Math.sin(viewAngles.yaw) * horizontal,
          -Math.sin(viewAngles.pitch),
          -Math.cos(viewAngles.yaw) * horizontal,
        ).normalize();
        const right = new Vector3(Math.cos(viewAngles.yaw), 0, -Math.sin(viewAngles.yaw)).normalize();
        const flashlightPosition = new Vector3(
          localPlayerPosition.x,
          terrain.floorYAt(localPlayerPosition.x, localPlayerPosition.z, localPlayerPosition.y),
          localPlayerPosition.z,
        )
          .add(right.multiplyScalar(preset.flashlight.floatOffset.x))
          .add(new Vector3(0, preset.flashlight.floatOffset.y, 0))
          .add(forward.clone().multiplyScalar(preset.flashlight.floatOffset.z));
        playerFollowLight.position.set(
          localPlayerPosition.x,
          terrain.floorYAt(localPlayerPosition.x, localPlayerPosition.z, localPlayerPosition.y + 0.75),
          localPlayerPosition.z,
        );
        const flashlightState = frame?.snapshot?.expedition.flashlight;
        const flashlightPower = flashlightState?.intensity ?? 1;
        flashlightGroup.visible = preset.flashlight.enabled && flashlightPower > 0.01;
        flashlightGroup.position.copy(flashlightPosition);
        flashlightGroup.rotation.order = "YXZ";
        flashlightGroup.rotation.y = viewAngles.yaw;
        flashlightGroup.rotation.x = viewAngles.pitch;
        flashlight.position.set(0, 0, 0);
        flashlight.target.position.set(0, 0, -preset.flashlight.range * 0.55);
        flashlight.intensity =
          (preset.flashlight.intensity + Math.sin(elapsedMs * 0.018) * 0.14) *
          flashlightPower;
        const lensMaterial = flashlightLens.material;
        if (lensMaterial instanceof MeshStandardMaterial) {
          lensMaterial.emissiveIntensity = 0.25 + flashlightPower * 1.75;
        } else if (lensMaterial instanceof MeshBasicMaterial) {
          lensMaterial.opacity = 0.2 + flashlightPower * 0.8;
        }
      }
      const flashlightPower = frame?.snapshot?.expedition.flashlight.intensity ?? 1;
      playerFollowLight.intensity =
        (0.82 + Math.sin(elapsedMs * 0.0025) * 0.05) *
        Math.max(0.03, flashlightPower);

      const snapshot = frame?.snapshot;
      if (snapshot) {
        const nextBuildingNumber = snapshot.expedition.buildingNumber;
        if (
          localPlayerPosition &&
          nextBuildingNumber > 0 &&
          nextBuildingNumber !== streamedBuildingNumber
        ) {
          const entryYaw = frame?.localViewAngles?.yaw ?? streamedEntryYaw;
          const floorY = terrain.floorYAt(
            localPlayerPosition.x,
            localPlayerPosition.z,
          );
          furnishedChamberLayer.position.set(
            localPlayerPosition.x,
            floorY,
            localPlayerPosition.z,
          );
          furnishedChamberLayer.rotation.y = entryYaw + Math.PI / 2;
          furnishedChamberLayer.userData.streamedBuildingNumber =
            nextBuildingNumber;
          furnishedChamberLayer.userData.streamedOrigin = {
            x: localPlayerPosition.x,
            y: floorY,
            z: localPlayerPosition.z,
          };
          furnishedChamberLayer.userData.entryYaw = entryYaw;
          streamedBuildingNumber = nextBuildingNumber;
          streamedChamberOrigin = {
            x: localPlayerPosition.x,
            y: floorY,
            z: localPlayerPosition.z,
          };
          streamedEntryYaw = entryYaw;
        }
        syncCubeMeshes(snapshot.cubes, snapshot.anomaly.slots);
        syncPlayerMeshes(snapshot.players, frame?.localPlayerId ?? null);
        syncOozeTrail(snapshot.oozeTrail);

        const encounter = snapshot.expedition.activeEncounter;
        if (encounter && localPlayerPosition) {
          const isJumpscare = snapshot.expedition.phase === "jumpscare";
          const presentedDistance = Math.min(encounter.distance, 18);
          const monsterX = localPlayerPosition.x -
            Math.sin(encounter.worldAngle) * presentedDistance;
          const monsterZ = localPlayerPosition.z -
            Math.cos(encounter.worldAngle) * presentedDistance;
          monsterGroup.visible = true;
          if (isJumpscare && frame.localCamera) {
            const cameraForward = new Vector3(0, 0, -1)
              .applyQuaternion(frame.localCamera.quaternion);
            monsterGroup.quaternion.copy(frame.localCamera.quaternion);
            monsterGroup.rotateY(Math.PI);
            const headOffset = monsterHead.position.clone()
              .applyQuaternion(monsterGroup.quaternion);
            monsterGroup.position.copy(frame.localCamera.position)
              .addScaledVector(cameraForward, 1.32)
              .sub(headOffset);
          } else {
            monsterGroup.position.set(
              monsterX,
              terrain.floorYAt(monsterX, monsterZ),
              monsterZ,
            );
            monsterGroup.lookAt(localPlayerPosition.x, localPlayerPosition.y, localPlayerPosition.z);
            monsterGroup.rotation.y += Math.PI;
          }
          const jumpscarePulse = encounter.state === "jumpscare"
            ? 1.2 + Math.sin(elapsedMs * 0.05) * 0.12
            : 1;
          monsterGroup.scale.setScalar(jumpscarePulse);
          monsterMaterial.depthTest = !isJumpscare;
          monsterMaterial.depthWrite = !isJumpscare;
          monsterEyeMaterial.depthTest = !isJumpscare;
          monsterEyeMaterial.depthWrite = !isJumpscare;
          monsterMouthMaterial.depthTest = !isJumpscare;
          monsterMouthMaterial.depthWrite = !isJumpscare;
          monsterTorso.renderOrder = isJumpscare ? 100 : 0;
          monsterHead.renderOrder = isJumpscare ? 100 : 0;
          monsterLeftArm.renderOrder = isJumpscare ? 100 : 0;
          monsterRightArm.renderOrder = isJumpscare ? 100 : 0;
          monsterLeftEye.renderOrder = isJumpscare ? 101 : 0;
          monsterRightEye.renderOrder = isJumpscare ? 101 : 0;
          monsterMouth.renderOrder = isJumpscare ? 101 : 0;
          monsterMaterial.emissiveIntensity = encounter.beamContact
            ? 0.72 + Math.sin(elapsedMs * 0.025) * 0.24
            : encounter.state === "jumpscare"
              ? 0.34
              : 0.08;
          monsterMaterial.emissive.setHex(
            encounter.state === "jumpscare" ? 0x0a3116 : 0x071c0d,
          );
          monsterLight.intensity = encounter.state === "jumpscare"
            ? 0.62 + Math.sin(elapsedMs * 0.04) * 0.12
            : encounter.beamContact
              ? 0.8
              : 0;
          monsterEyeMaterial.color.setHex(
            encounter.beamContact || encounter.state === "jumpscare" ? 0x74ff92 : 0x193e22,
          );
        } else {
          monsterGroup.visible = false;
        }

        const proximity = encounter
          ? Math.max(0, Math.min(1, 1 - encounter.distance / 18))
          : 0;
        const blackoutPressure = snapshot.expedition.flashlight.mode === "blackout" ? 0.58 : 0;
        const jumpscarePressure = snapshot.expedition.phase === "jumpscare" ? 0.78 : 0;
        const greenPressure = Math.max(proximity * 0.72, blackoutPressure, jumpscarePressure);
        if (attachedScene?.background instanceof Color) {
          attachedScene.background.copy(calmSky).lerp(
            jumpscarePressure > 0 ? jumpscareSky : huntedSky,
            greenPressure,
          );
        }
        if (attachedScene?.fog && "color" in attachedScene.fog) {
          attachedScene.fog.color.copy(calmFog).lerp(huntedFog, greenPressure);
        }
      }
    },
    getSceneDressingSummary: () => ({
      ...sceneDressingSummary,
      referenceRoom: sceneDressingSummary.referenceRoom
        ? {
            ...sceneDressingSummary.referenceRoom,
            streamedBuildingNumber,
            streamedOrigin: streamedChamberOrigin,
            entryYaw: streamedEntryYaw,
          }
        : undefined,
    }),
    getTerrainEyePosition: (position) => ({
      x: position.x,
      y: terrain.floorYAt(position.x, position.z, position.y),
      z: position.z,
    }),
    dispose: () => {
      if (root.parent) {
        root.parent.remove(root);
      }
      attachedScene = null;

      sceneDressingLayer.dispose();
      root.remove(sceneDressingLayer);
      furnishedChamberLayer.dispose();
      root.remove(furnishedChamberLayer);

      disposeObject(
        root,
        new Set<Material>([
          materials.floor,
          materials.branchFloor,
          materials.ceiling,
          materials.wall,
          materials.trim,
          materials.endWall,
          materials.glow,
          materials.pedestal,
          materials.cube,
          materials.player,
          materials.guide,
          materials.ooze,
        ]),
      );
      materials.dispose();
    },
  };
};
