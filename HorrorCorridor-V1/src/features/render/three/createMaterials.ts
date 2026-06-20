import {
  DoubleSide,
  MeshBasicMaterial,
  MeshStandardMaterial,
  type Material,
} from "three";

import {
  createHorrorCorridorPreset,
  type HorrorCorridorPreset,
} from "@/protokits/presets/horror-corridor-preset";

import { applyTerrainShader } from "./proceduralShaders";

export type CorridorMaterials = Readonly<{
  floor: MeshStandardMaterial;
  branchFloor: MeshStandardMaterial;
  ceiling: MeshStandardMaterial;
  wall: MeshStandardMaterial;
  trim: MeshStandardMaterial;
  endWall: MeshStandardMaterial;
  glow: MeshBasicMaterial;
  pedestal: MeshStandardMaterial;
  cube: MeshStandardMaterial;
  player: MeshStandardMaterial;
  guide: MeshBasicMaterial;
  ooze: MeshBasicMaterial;
  dispose: () => void;
}>;

export const createMaterials = (
  preset: HorrorCorridorPreset = createHorrorCorridorPreset(),
): CorridorMaterials => {
  const floor = new MeshStandardMaterial({
    color: 0x3f3325,
    roughness: 0.84,
    metalness: 0.02,
    emissive: 0x110d09,
    emissiveIntensity: 0.08,
  });
  applyTerrainShader(floor, preset.terrainShader, "main-floor");

  const branchFloor = new MeshStandardMaterial({
    color: 0x352a1d,
    roughness: 0.88,
    metalness: 0.01,
    emissive: 0x0e0b08,
    emissiveIntensity: 0.06,
  });
  applyTerrainShader(branchFloor, preset.terrainShader, "branch-floor");

  const ceiling = new MeshStandardMaterial({
    color: 0x4a443b,
    roughness: 0.8,
    metalness: 0.14,
    emissive: 0x0d0a08,
    emissiveIntensity: 0.05,
  });
  applyTerrainShader(ceiling, preset.terrainShader, "ceiling");

  const wall = new MeshStandardMaterial({
    color: 0x5a4a3e,
    roughness: 0.86,
    metalness: 0.04,
    emissive: 0x120d09,
    emissiveIntensity: 0.08,
  });
  applyTerrainShader(wall, preset.terrainShader, "wall");

  const trim = new MeshStandardMaterial({
    color: 0x4e4338,
    roughness: 0.72,
    metalness: 0.24,
    emissive: 0x100c08,
    emissiveIntensity: 0.05,
  });
  applyTerrainShader(trim, preset.terrainShader, "trim");

  const endWall = new MeshStandardMaterial({
    color: 0x25241d,
    roughness: 0.76,
    metalness: 0.04,
    emissive: 0x1d2110,
    emissiveIntensity: 0.12,
  });
  applyTerrainShader(endWall, preset.terrainShader, "end-wall");

  const glow = new MeshBasicMaterial({
    color: 0xc2b97d,
    transparent: true,
    opacity: 0.9,
    toneMapped: false,
  });

  const pedestal = new MeshStandardMaterial({
    color: 0x53473a,
    roughness: 0.74,
    metalness: 0.22,
    emissive: 0x0f0b07,
    emissiveIntensity: 0.04,
  });
  applyTerrainShader(pedestal, preset.terrainShader, "trim");

  const cube = new MeshStandardMaterial({
    color: 0x2b3c2f,
    emissive: 0x19331f,
    emissiveIntensity: 0.6,
    roughness: 0.38,
    metalness: 0.06,
  });

  const player = new MeshStandardMaterial({
    color: 0x3d4439,
    emissive: 0x223626,
    emissiveIntensity: 0.32,
    roughness: 0.6,
    metalness: 0.08,
  });

  const guide = new MeshBasicMaterial({
    color: 0xb7b06d,
    transparent: true,
    opacity: 0.84,
    toneMapped: false,
  });

  const ooze = new MeshBasicMaterial({
    color: 0x738048,
    transparent: true,
    opacity: 0.44,
    side: DoubleSide,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    toneMapped: false,
  });

  const dispose = (): void => {
    const materials: readonly Material[] = [
      floor,
      branchFloor,
      ceiling,
      wall,
      trim,
      endWall,
      glow,
      pedestal,
      cube,
      player,
      guide,
      ooze,
    ];

    for (const material of materials) {
      material.dispose();
    }
  };

  return {
    floor,
    branchFloor,
    ceiling,
    wall,
    trim,
    endWall,
    glow,
    pedestal,
    cube,
    player,
    guide,
    ooze,
    dispose,
  };
};
