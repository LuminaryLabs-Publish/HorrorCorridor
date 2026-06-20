import type { MazeResult } from "@/features/maze/domain/mazeTypes";
import type { HorrorCorridorPreset } from "@/protokits";

export type TerrainSurfacePoint = Readonly<{
  x: number;
  y: number;
  z: number;
}>;

export type TerrainRaycastHit = Readonly<{
  position: TerrainSurfacePoint;
  normal: TerrainSurfacePoint;
}>;

export type TerrainSurface = Readonly<{
  heightAt: (x: number, z: number) => number;
  raycastDown: (x: number, z: number, fromY?: number) => TerrainRaycastHit;
  floorYAt: (x: number, z: number, offset?: number) => number;
  wallBaseYAt: (x: number, z: number) => number;
}>;

const hashString = (value: string): number => {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const randomFromGrid = (seed: number, x: number, z: number): number => {
  let value = seed ^ Math.imul(x, 374761393) ^ Math.imul(z, 668265263);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
};

const smoothstep = (value: number): number => value * value * (3 - 2 * value);

const sampleValueNoise = (
  seed: number,
  x: number,
  z: number,
  scale: number,
): number => {
  const scaledX = x / scale;
  const scaledZ = z / scale;
  const x0 = Math.floor(scaledX);
  const z0 = Math.floor(scaledZ);
  const tx = smoothstep(scaledX - x0);
  const tz = smoothstep(scaledZ - z0);

  const a = randomFromGrid(seed, x0, z0);
  const b = randomFromGrid(seed, x0 + 1, z0);
  const c = randomFromGrid(seed, x0, z0 + 1);
  const d = randomFromGrid(seed, x0 + 1, z0 + 1);
  const ab = a + (b - a) * tx;
  const cd = c + (d - c) * tx;

  return ab + (cd - ab) * tz;
};

const toHeight = (
  seed: number,
  x: number,
  z: number,
  preset: HorrorCorridorPreset,
): number => {
  const amplitude = preset.terrainField.heightAmplitude;
  const broad = sampleValueNoise(seed, x, z, preset.terrainField.heightScale);
  const detail = sampleValueNoise(seed ^ 0x9e3779b9, x, z, preset.terrainField.heightScale * 0.38);
  const rut = Math.sin((x + seed % 37) * 0.035) * Math.cos((z - seed % 53) * 0.028);
  const raw = (broad - 0.5) * amplitude + (detail - 0.5) * amplitude * 0.38 + rut * amplitude * 0.18;

  return Math.max(-amplitude * 0.82, Math.min(amplitude, raw));
};

const estimateNormal = (
  heightAt: (x: number, z: number) => number,
  x: number,
  z: number,
): TerrainSurfacePoint => {
  const sample = 0.5;
  const left = heightAt(x - sample, z);
  const right = heightAt(x + sample, z);
  const back = heightAt(x, z - sample);
  const forward = heightAt(x, z + sample);
  const normal = {
    x: left - right,
    y: sample * 2,
    z: back - forward,
  };
  const length = Math.hypot(normal.x, normal.y, normal.z) || 1;

  return {
    x: normal.x / length,
    y: normal.y / length,
    z: normal.z / length,
  };
};

export const createTerrainSurface = (
  maze: MazeResult,
  preset: HorrorCorridorPreset,
): TerrainSurface => {
  const seed = hashString(
    `${preset.sceneGeneration.seed}:terrain:${maze.start.x}:${maze.start.y}:${maze.end.x}:${maze.end.y}`,
  );
  const heightAt = (x: number, z: number): number => toHeight(seed, x, z, preset);

  return {
    heightAt,
    floorYAt: (x, z, offset = 0) => heightAt(x, z) + offset,
    wallBaseYAt: (x, z) => heightAt(x, z),
    raycastDown: (x, z) => {
      const y = heightAt(x, z);

      return {
        position: { x, y, z },
        normal: estimateNormal(heightAt, x, z),
      };
    },
  };
};
