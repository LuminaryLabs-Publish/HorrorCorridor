import { Color, MeshStandardMaterial } from "three";

import type { HorrorCorridorPreset } from "@/protokits";
import type { ConcretePavingState } from "@/features/corridor/domain/concretePaving";

import type { ScenePropDescriptor } from "./sceneDressingDescriptors";

type CompiledShader = {
  uniforms: Record<string, { value: unknown }>;
  vertexShader: string;
  fragmentShader: string;
};

type TerrainVariant = "main-floor" | "branch-floor" | "wall" | "ceiling" | "trim" | "end-wall";

type PropFamilyProfile = Readonly<{
  shaderProfile: string;
  accentColor: number;
  roughnessBias: number;
  metalnessBias: number;
  emissiveBoost: number;
}>;

type PropObjectProfile = Readonly<{
  shaderProfile: string;
  detailScale: number;
  edgeWear: number;
  grimeBoost: number;
  accentColor: number;
}>;

type TerrainShaderConfig = HorrorCorridorPreset["terrainShader"];
type CeilingSurfaceConfig =
  HorrorCorridorPreset["chamberFurnishing"]["ceilingSurface"];
type PropShaderConfig = HorrorCorridorPreset["proceduralPbrMaterial"];
type PropFidelityConfig = HorrorCorridorPreset["propMaterialFidelity"];

const TERRAIN_VARIANT_TUNING: Readonly<Record<TerrainVariant, Readonly<{
  grassBias: number;
  concreteBias: number;
  brickBias: number;
  wetBias: number;
  emissiveStrength: number;
  concreteIdentityStrength: number;
}>>> = {
  "main-floor": { grassBias: 0.12, concreteBias: 0.56, brickBias: 0.08, wetBias: 0.42, emissiveStrength: 0, concreteIdentityStrength: 1 },
  "branch-floor": { grassBias: 0.26, concreteBias: 0.3, brickBias: 0.05, wetBias: 0.54, emissiveStrength: 0, concreteIdentityStrength: 0.82 },
  wall: { grassBias: 0.08, concreteBias: 0.42, brickBias: 0.52, wetBias: 0.14, emissiveStrength: 0, concreteIdentityStrength: 0 },
  ceiling: { grassBias: 0.06, concreteBias: 0.62, brickBias: 0.24, wetBias: 0.2, emissiveStrength: 0, concreteIdentityStrength: 0.86 },
  trim: { grassBias: 0.01, concreteBias: 0.24, brickBias: 0.12, wetBias: 0.06, emissiveStrength: 0, concreteIdentityStrength: 0 },
  "end-wall": { grassBias: 0.04, concreteBias: 0.36, brickBias: 0.2, wetBias: 0.18, emissiveStrength: 0.08, concreteIdentityStrength: 0 },
};

const clampColor = (hex: number, multiplier: number): number => {
  const r = Math.max(0, Math.min(255, Math.round(((hex >> 16) & 255) * multiplier)));
  const g = Math.max(0, Math.min(255, Math.round(((hex >> 8) & 255) * multiplier)));
  const b = Math.max(0, Math.min(255, Math.round((hex & 255) * multiplier)));
  return (r << 16) | (g << 8) | b;
};

const injectSharedVaryings = (shader: CompiledShader): void => {
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `#include <common>
varying vec3 vProcWorldPosition;
varying vec3 vProcLocalPosition;
varying vec3 vProcLocalNormal;
varying vec2 vProcUv;`,
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `#include <begin_vertex>
vProcLocalPosition = transformed;
vProcLocalNormal = normal;
vProcUv = uv;`,
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <worldpos_vertex>",
    `#include <worldpos_vertex>
#ifdef USE_INSTANCING
vec4 procWorldPosition = instanceMatrix * vec4(transformed, 1.0);
#else
vec4 procWorldPosition = vec4(transformed, 1.0);
#endif
procWorldPosition = modelMatrix * procWorldPosition;
vProcWorldPosition = procWorldPosition.xyz;`,
  );
};

const applyShaderPatch = (
  material: MeshStandardMaterial,
  cacheKey: string,
  patcher: (shader: CompiledShader) => void,
): void => {
  material.customProgramCacheKey = () => cacheKey;
  material.onBeforeCompile = (shader) => {
    const compiled = shader as CompiledShader;
    injectSharedVaryings(compiled);
    patcher(compiled);
  };
};

const TERRAIN_FRAGMENT_COMMON = `
varying vec3 vProcWorldPosition;
varying vec3 vProcLocalPosition;
varying vec3 vProcLocalNormal;
varying vec2 vProcUv;
uniform vec3 uTerrainSoilA;
uniform vec3 uTerrainSoilB;
uniform vec3 uTerrainSoilC;
uniform vec3 uTerrainGrassA;
uniform vec3 uTerrainGrassB;
uniform vec3 uTerrainGrassC;
uniform vec3 uTerrainConcreteA;
uniform vec3 uTerrainConcreteB;
uniform vec3 uTerrainConcreteC;
uniform vec3 uTerrainAccent;
uniform float uTerrainMacroScale;
uniform float uTerrainDetailScale;
uniform float uTerrainGrassScale;
uniform float uTerrainConcreteScale;
uniform float uTerrainPuddleScale;
uniform float uTerrainWetnessResponse;
uniform vec2 uTerrainRoughnessRange;
uniform float uTerrainBlendSharpness;
uniform float uTerrainPuddleStrength;
uniform float uTerrainMossStrength;
uniform float uTerrainGrassBias;
uniform float uTerrainConcreteBias;
uniform float uTerrainBrickBias;
uniform float uTerrainWetBias;
uniform float uTerrainEmissiveStrength;
uniform float uTerrainConcreteIdentityStrength;
uniform float uTerrainIdentitySeed;
uniform float uTerrainSlabScale;
uniform float uTerrainSlabJointWidth;
uniform float uTerrainCrackScale;
uniform float uTerrainCrackWidth;
uniform float uTerrainCrackDensity;
uniform float uTerrainAggregateScale;
uniform float uTerrainAggregateExposure;
uniform float uTerrainRepairStrength;
uniform float uTerrainSurfaceRelief;
uniform float uTerrainCeilingMode;

float procHash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float procNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = procHash12(i);
  float b = procHash12(i + vec2(1.0, 0.0));
  float c = procHash12(i + vec2(0.0, 1.0));
  float d = procHash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float procFbm(vec2 p) {
  float total = 0.0;
  float amplitude = 0.5;
  for (int octave = 0; octave < 5; octave += 1) {
    total += procNoise(p) * amplitude;
    p = p * 2.07 + vec2(13.1, 7.7);
    amplitude *= 0.52;
  }
  return total;
}

vec2 procHash22(vec2 p) {
  vec2 q = vec2(
    dot(p, vec2(127.1, 311.7)),
    dot(p, vec2(269.5, 183.3))
  );
  return fract(sin(q) * 43758.5453123);
}

float concreteSlabJoint(vec2 worldPosition) {
  vec2 warpSample = worldPosition * 0.11 + vec2(uTerrainIdentitySeed * 7.0, 3.1);
  vec2 warped = worldPosition + vec2(
    procNoise(warpSample) - 0.5,
    procNoise(warpSample + vec2(9.2, 4.7)) - 0.5
  ) * 0.52;
  vec2 slabUv = warped * uTerrainSlabScale;
  float row = floor(slabUv.y);
  slabUv.x += mod(row, 2.0) * 0.47;
  slabUv.x += (procHash12(vec2(row, uTerrainIdentitySeed * 13.0)) - 0.5) * 0.15;
  vec2 cell = fract(slabUv);
  vec2 edgeDistance = min(cell, 1.0 - cell);
  float nearestEdge = min(edgeDistance.x, edgeDistance.y);
  float chippedWidth = uTerrainSlabJointWidth * mix(
    0.62,
    1.24,
    procNoise(worldPosition * 1.7 + uTerrainIdentitySeed * 5.0)
  );
  float wornEdge = 1.0 - smoothstep(chippedWidth, chippedWidth * 2.8, nearestEdge);
  float continuity = smoothstep(
    0.22,
    0.68,
    procNoise(worldPosition * 0.31 + floor(slabUv) * 0.13 + uTerrainIdentitySeed * 9.0)
  );
  return wornEdge * mix(0.32, 1.0, continuity);
}

float concreteCrackMask(vec2 worldPosition) {
  vec2 crackUv = worldPosition * uTerrainCrackScale + uTerrainIdentitySeed * 17.0;
  float warp = procNoise(crackUv * 0.61 + vec2(2.3, 8.1)) - 0.5;
  float primary = abs(procNoise(crackUv * 1.37 + warp * 1.8) - 0.5);
  float secondary = abs(
    procNoise(crackUv.yx * 2.11 + vec2(11.7, 1.9) - warp * 1.4) - 0.5
  );
  float lineDistance = min(primary, secondary * 1.22);
  float lineWidth = 0.005 + uTerrainCrackWidth * 0.2;
  float line = 1.0 - smoothstep(lineWidth, lineWidth * 2.7, lineDistance);
  float fractureShadow = 1.0 - smoothstep(lineWidth * 2.2, lineWidth * 6.4, lineDistance);
  float activity = smoothstep(
    1.0 - uTerrainCrackDensity,
    min(1.0, 1.18 - uTerrainCrackDensity * 0.18),
    procNoise(worldPosition * 0.19 + vec2(19.0, 7.0) + uTerrainIdentitySeed)
  );
  return clamp((line + fractureShadow * 0.16) * activity, 0.0, 1.0);
}

float concreteAggregateMask(vec2 worldPosition) {
  vec2 aggregateUv = worldPosition * uTerrainAggregateScale;
  vec2 cell = floor(aggregateUv);
  vec2 local = fract(aggregateUv);
  vec2 center = 0.2 + procHash22(cell + uTerrainIdentitySeed * 23.0) * 0.6;
  float grain = procHash12(cell + uTerrainIdentitySeed * 29.0);
  float pebble = 1.0 - smoothstep(0.018, 0.06, distance(local, center));
  return pebble * smoothstep(1.0 - uTerrainAggregateExposure, 1.0, grain);
}

float concreteRepairMask(vec2 worldPosition) {
  float repairField = procNoise(worldPosition * 0.2 + vec2(31.0, 17.0) + uTerrainIdentitySeed * 4.0);
  float cut = procNoise(worldPosition * 0.47 + vec2(6.0, 14.0));
  return smoothstep(0.58, 0.78, repairField + cut * 0.12) * uTerrainRepairStrength;
}

float concreteSurfaceHeight(vec2 worldPosition) {
  if (uTerrainConcreteIdentityStrength <= 0.0) {
    return 0.0;
  }
  float joint = concreteSlabJoint(worldPosition);
  if (uTerrainCeilingMode > 0.5) {
    float mineralGrain = procFbm(
      worldPosition * (uTerrainAggregateScale * 0.045) +
      vec2(uTerrainIdentitySeed * 11.0, 4.7)
    );
    float pitting = smoothstep(
      0.68,
      0.9,
      procNoise(worldPosition * 2.8 + vec2(17.0, 31.0))
    );
    float spall = smoothstep(
      0.62,
      0.86,
      procFbm(worldPosition * 0.42 + vec2(9.0, 23.0))
    );
    return (
      (mineralGrain - 0.5) * 0.052 -
      joint * 0.022 -
      pitting * 0.022 -
      spall * 0.034
    ) * uTerrainConcreteIdentityStrength;
  }
  float crack = concreteCrackMask(worldPosition);
  float aggregate = concreteAggregateMask(worldPosition);
  float repair = concreteRepairMask(worldPosition);
  return (
    aggregate * 0.012 +
    repair * 0.035 -
    joint * 0.045 -
    crack * 0.2
  ) * uTerrainConcreteIdentityStrength;
}

vec3 terrainSurfaceNormal(vec3 baseNormal) {
  if (uTerrainConcreteIdentityStrength <= 0.0) {
    return baseNormal;
  }
  float height = concreteSurfaceHeight(vProcWorldPosition.xz);
  vec3 positionDx = dFdx(vProcWorldPosition);
  vec3 positionDy = dFdy(vProcWorldPosition);
  float heightDx = dFdx(height);
  float heightDy = dFdy(height);
  vec3 tangentX = cross(positionDy, baseNormal);
  vec3 tangentY = cross(baseNormal, positionDx);
  float determinant = dot(positionDx, tangentX);
  vec3 gradient = sign(determinant) * (heightDx * tangentX + heightDy * tangentY);
  return normalize(
    abs(determinant) * baseNormal - gradient * uTerrainSurfaceRelief
  );
}

vec3 procBlendWeights(vec3 n) {
  vec3 w = pow(abs(normalize(n)), vec3(max(1.0, uTerrainBlendSharpness)));
  return w / max(dot(w, vec3(1.0)), 0.0001);
}

float procTriplanarFbm(vec3 wp, vec3 n, float scale) {
  vec3 w = procBlendWeights(n);
  float yz = procFbm(wp.yz * scale);
  float xz = procFbm(wp.xz * scale);
  float xy = procFbm(wp.xy * scale);
  return yz * w.x + xz * w.y + xy * w.z;
}

float procBrickMask(vec3 wp, vec3 n, float scale) {
  vec3 w = procBlendWeights(n);
  vec2 uv = wp.yz * scale;
  vec2 brickUv = vec2(uv.x * 0.55 + floor(uv.y) * 0.5, uv.y * 1.65);
  vec2 cell = fract(brickUv);
  float mortar = step(cell.x, 0.06) + step(cell.y, 0.08);
  float vertical = step(0.94, cell.x);
  float horizontal = step(0.92, cell.y);
  float course = clamp(mortar + vertical + horizontal, 0.0, 1.0);
  return course * max(w.x, max(w.z, w.y * 0.18));
}

vec3 terrainAlbedo() {
  vec3 n = normalize(vProcLocalNormal);
  float macro = procTriplanarFbm(vProcWorldPosition, n, uTerrainMacroScale);
  float detail = procTriplanarFbm(vProcWorldPosition + vec3(17.0, 0.0, 11.0), n, uTerrainDetailScale);
  float moss = procTriplanarFbm(vProcWorldPosition + vec3(-9.0, 5.0, 13.0), n, uTerrainGrassScale);
  float puddle = procTriplanarFbm(vProcWorldPosition + vec3(0.0, 0.0, 19.0), n, uTerrainPuddleScale);
  float concreteDetail = procTriplanarFbm(vProcWorldPosition + vec3(4.0, 7.0, -5.0), n, uTerrainConcreteScale);
  float brickMask = procBrickMask(vProcWorldPosition, n, uTerrainConcreteScale * 0.42);

  float wetness = smoothstep(0.38, 0.94, puddle + macro * 0.35 + uTerrainWetnessResponse * 0.45 + uTerrainWetBias);
  float grass = smoothstep(0.44, 0.86, moss * 0.72 + macro * 0.28 + uTerrainGrassBias - concreteDetail * 0.18);
  float concrete = smoothstep(0.42, 0.88, concreteDetail * 0.75 + macro * 0.22 + uTerrainConcreteBias + brickMask * 0.12);
  float brokenBrick = smoothstep(0.48, 0.86, brickMask * 0.82 + uTerrainBrickBias);

  vec3 soil = mix(uTerrainSoilA, uTerrainSoilB, detail);
  soil = mix(soil, uTerrainSoilC, smoothstep(0.55, 0.92, macro));

  vec3 grassColor = mix(uTerrainGrassA, uTerrainGrassB, moss);
  grassColor = mix(grassColor, uTerrainGrassC, smoothstep(0.58, 0.94, detail));

  vec3 concreteColor = mix(uTerrainConcreteA, uTerrainConcreteB, concreteDetail);
  concreteColor = mix(concreteColor, uTerrainConcreteC, smoothstep(0.54, 0.88, macro));

  vec3 base = mix(soil, grassColor, grass);
  base = mix(base, concreteColor, concrete);
  base = mix(base, mix(uTerrainSoilC, uTerrainConcreteA, 0.45), brokenBrick * 0.4);
  base = mix(base, base * 0.58 + uTerrainAccent * 0.42, wetness * uTerrainPuddleStrength);
  base *= 0.62 + detail * 0.24;
  base = mix(base, base * 0.82 + uTerrainGrassB * 0.18, moss * uTerrainMossStrength * (1.0 - concrete * 0.55));

  if (uTerrainConcreteIdentityStrength > 0.0) {
    vec2 floorPosition = vProcWorldPosition.xz;
    float joint = concreteSlabJoint(floorPosition);
    float aggregate = concreteAggregateMask(floorPosition);
    float repair = concreteRepairMask(floorPosition);
    if (uTerrainCeilingMode > 0.5) {
      float spall = smoothstep(
        0.58,
        0.86,
        procFbm(floorPosition * 0.38 + vec2(13.0, 29.0)) + macro * 0.14
      );
      float mineral = smoothstep(
        0.5,
        0.88,
        detail * 0.7 + macro * 0.32 + repair * 0.2
      );
      float dampPatch = smoothstep(
        0.45,
        0.9,
        puddle * 0.68 + macro * 0.34 + uTerrainWetnessResponse * 0.3
      );
      vec3 ceilingConcrete = mix(uTerrainConcreteA, uTerrainConcreteB, detail);
      ceilingConcrete = mix(
        ceilingConcrete,
        uTerrainConcreteC,
        mineral * uTerrainRepairStrength * 0.52 + aggregate * 0.2
      );
      ceilingConcrete = mix(
        ceilingConcrete,
        mix(uTerrainSoilB, uTerrainConcreteA, 0.34),
        dampPatch * 0.36
      );
      ceilingConcrete = mix(
        ceilingConcrete,
        uTerrainSoilC,
        spall * 0.2
      );
      ceilingConcrete = mix(
        ceilingConcrete,
        mix(uTerrainGrassA, uTerrainGrassB, moss),
        moss * uTerrainMossStrength * 0.22
      );
      ceilingConcrete *= 0.64 + detail * 0.27;
      base = mix(base, ceilingConcrete, uTerrainConcreteIdentityStrength);
      base = mix(
        base,
        uTerrainSoilA * 0.62,
        joint * uTerrainConcreteIdentityStrength * 0.12
      );
    } else {
      float crack = concreteCrackMask(floorPosition);
      vec3 repairColor = mix(uTerrainConcreteA, uTerrainConcreteB, 0.42);
      vec3 wornConcrete = mix(concreteColor, repairColor, repair * 0.58);
      wornConcrete = mix(wornConcrete, uTerrainConcreteC, aggregate * 0.42);
      wornConcrete *= 0.82 + detail * 0.34 + max(n.y, 0.0) * 0.08;
      float concreteIdentity = uTerrainConcreteIdentityStrength * (0.68 + concrete * 0.18);
      base = mix(base, wornConcrete, concreteIdentity);
      base = mix(base, uTerrainSoilA * 0.7, joint * uTerrainConcreteIdentityStrength * 0.17);
      base = mix(base, uTerrainSoilA * 0.42, crack * uTerrainConcreteIdentityStrength * 0.7);
      base = mix(base, uTerrainConcreteC * 1.05, aggregate * uTerrainConcreteIdentityStrength * 0.07);
      base = mix(
        base,
        base * 0.7 + uTerrainAccent * 0.08,
        wetness * uTerrainConcreteIdentityStrength * uTerrainPuddleStrength * 0.46
      );
    }
  }

  return base;
}

float terrainRoughness() {
  vec3 n = normalize(vProcLocalNormal);
  float macro = procTriplanarFbm(vProcWorldPosition + vec3(7.0, 0.0, 5.0), n, uTerrainMacroScale);
  float puddle = procTriplanarFbm(vProcWorldPosition + vec3(1.0, 0.0, 23.0), n, uTerrainPuddleScale);
  float concrete = procTriplanarFbm(vProcWorldPosition + vec3(0.0, 5.0, 0.0), n, uTerrainConcreteScale);
  float wetness = smoothstep(0.45, 0.94, puddle + macro * 0.28 + uTerrainWetBias);
  float detail = smoothstep(0.18, 0.92, concrete * 0.65 + macro * 0.22);
  float baseRoughness = mix(uTerrainRoughnessRange.x, uTerrainRoughnessRange.y, clamp(detail - wetness * 0.34 + 0.36, 0.0, 1.0));
  if (uTerrainConcreteIdentityStrength <= 0.0) {
    return baseRoughness;
  }
  float roughVariation = procNoise(vProcWorldPosition.xz * 0.44 + uTerrainIdentitySeed * 5.0);
  if (uTerrainCeilingMode > 0.5) {
    float dampPatch = smoothstep(
      0.46,
      0.9,
      puddle * 0.7 + macro * 0.3 + uTerrainWetnessResponse * 0.28
    );
    return clamp(
      mix(
        uTerrainRoughnessRange.x,
        uTerrainRoughnessRange.y,
        0.4 + roughVariation * 0.52
      ) - dampPatch * 0.12,
      0.18,
      1.0
    );
  }
  float concreteRoughness = clamp(
    0.72 + roughVariation * 0.14 - wetness * 0.42,
    0.16,
    0.96
  );
  return mix(baseRoughness, concreteRoughness, uTerrainConcreteIdentityStrength);
}

float terrainMetalness() {
  vec3 n = normalize(vProcLocalNormal);
  float concrete = procTriplanarFbm(vProcWorldPosition + vec3(-6.0, 3.0, 4.0), n, uTerrainConcreteScale);
  float baseMetalness = clamp(concrete * 0.06 + uTerrainConcreteBias * 0.02, 0.0, 0.12);
  return mix(baseMetalness, 0.012, uTerrainConcreteIdentityStrength);
}

vec3 terrainEmissive() {
  if (uTerrainEmissiveStrength <= 0.0) {
    return vec3(0.0);
  }
  vec3 n = normalize(vProcLocalNormal);
  float flow = procTriplanarFbm(vProcWorldPosition + vec3(0.0, 0.0, 29.0), n, uTerrainPuddleScale * 0.7);
  return uTerrainAccent * smoothstep(0.72, 0.96, flow) * uTerrainEmissiveStrength;
}
`;

const PROP_FRAGMENT_COMMON = `
varying vec3 vProcWorldPosition;
varying vec3 vProcLocalPosition;
varying vec3 vProcLocalNormal;
varying vec2 vProcUv;
uniform vec3 uPropBaseColor;
uniform vec3 uPropAccentColor;
uniform vec3 uPropDarkColor;
uniform float uPropSeed;
uniform float uPropDetailScale;
uniform float uPropEdgeWear;
uniform float uPropGrimeBoost;
uniform float uPropRoughnessBias;
uniform float uPropMetalnessBias;
uniform float uPropEmissiveBoost;
uniform float uPropPatternMode;

float propHash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z + uPropSeed);
}

float propNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = propHash12(i);
  float b = propHash12(i + vec2(1.0, 0.0));
  float c = propHash12(i + vec2(0.0, 1.0));
  float d = propHash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float propFbm(vec2 p) {
  float total = 0.0;
  float amplitude = 0.5;
  for (int octave = 0; octave < 5; octave += 1) {
    total += propNoise(p) * amplitude;
    p = p * 2.11 + vec2(9.7, 13.1);
    amplitude *= 0.5;
  }
  return total;
}

vec3 propBlendWeights(vec3 n) {
  vec3 w = pow(abs(normalize(n)), vec3(3.2));
  return w / max(dot(w, vec3(1.0)), 0.0001);
}

float propTriplanarFbm(vec3 p, vec3 n, float scale) {
  vec3 w = propBlendWeights(n);
  float yz = propFbm(p.yz * scale);
  float xz = propFbm(p.xz * scale);
  float xy = propFbm(p.xy * scale);
  return yz * w.x + xz * w.y + xy * w.z;
}

float propTriplanarBrick(vec3 p, vec3 n, float scale) {
  vec3 w = propBlendWeights(n);
  vec2 uv = p.yz * scale;
  vec2 brickUv = vec2(uv.x * 0.62 + floor(uv.y * 1.2) * 0.5, uv.y * 1.74);
  vec2 cell = fract(brickUv);
  float mortar = step(cell.x, 0.08) + step(cell.y, 0.1);
  return clamp(mortar, 0.0, 1.0) * max(w.x, max(w.z, w.y * 0.24));
}

float propEdgeMask(vec2 uv, float width) {
  vec2 edge = min(uv, 1.0 - uv);
  return 1.0 - smoothstep(0.0, width, min(edge.x, edge.y));
}

float propStripe(vec2 uv, float scale, float width) {
  vec2 cell = abs(fract(uv * scale) - 0.5);
  return 1.0 - smoothstep(width, width + 0.02, min(cell.x, cell.y));
}

float propPipeRib(vec2 uv, float scale) {
  float rib = sin(uv.y * scale * 6.28318530718) * 0.5 + 0.5;
  return smoothstep(0.55, 0.94, rib);
}

float propBrickCourses(vec2 uv, float scale) {
  vec2 brickUv = vec2(uv.x * scale * 1.1 + floor(uv.y * scale * 0.58) * 0.5, uv.y * scale * 0.72);
  vec2 cell = fract(brickUv);
  float mortar = step(cell.x, 0.08) + step(cell.y, 0.1);
  return clamp(mortar, 0.0, 1.0);
}

vec3 propAlbedo() {
  vec2 uv = vProcUv;
  vec3 localNormal = normalize(vProcLocalNormal);
  vec2 detailUv = uv * uPropDetailScale + vProcLocalPosition.xz * 0.08;
  float macro = mix(
    propFbm(detailUv),
    propTriplanarFbm(vProcLocalPosition + vec3(uPropSeed), localNormal, uPropDetailScale * 0.18),
    0.48
  );
  float detail = mix(
    propFbm(detailUv * 2.3 + vec2(3.0, 7.0)),
    propTriplanarFbm(vProcLocalPosition + vec3(3.0, 7.0, uPropSeed), localNormal, uPropDetailScale * 0.34),
    0.42
  );
  float edge = propEdgeMask(uv, mix(0.03, 0.18, uPropEdgeWear));
  float grime = smoothstep(0.42, 0.96, macro + detail * 0.35 + uPropGrimeBoost * 0.22);
  float seam = propStripe(uv + vec2(uPropSeed * 0.13, uPropSeed * 0.07), 4.0 + uPropDetailScale * 0.35, 0.05);
  float brick = mix(
    propBrickCourses(uv + vec2(0.0, uPropSeed * 0.09), 6.0 + uPropDetailScale * 0.2),
    propTriplanarBrick(vProcLocalPosition + vec3(0.0, uPropSeed, 0.0), localNormal, uPropDetailScale * 0.22),
    0.72
  );
  float ribs = propPipeRib(uv, 2.5 + uPropDetailScale * 0.08);
  float scratch = smoothstep(0.82, 0.98, abs(sin((uv.x + uv.y + uPropSeed) * 24.0))) * 0.3;
  vec3 base = mix(uPropBaseColor, uPropAccentColor, detail * 0.34);
  vec3 darkened = mix(base, uPropDarkColor, grime * 0.46 + edge * 0.28);

  if (uPropPatternMode < 1.5) {
    darkened = mix(darkened, uPropAccentColor, seam * 0.16);
    darkened = mix(darkened, uPropDarkColor, edge * 0.62 + grime * 0.28);
  } else if (uPropPatternMode < 2.5) {
    darkened = mix(darkened, uPropAccentColor, ribs * 0.22);
    darkened = mix(darkened, uPropDarkColor, grime * 0.58 + scratch * 0.35);
  } else if (uPropPatternMode < 3.5) {
    darkened = mix(darkened, uPropAccentColor, 0.08 + detail * 0.18);
    darkened = mix(darkened, uPropDarkColor, brick * 0.58 + grime * 0.18);
  } else if (uPropPatternMode < 4.5) {
    darkened = mix(darkened, uPropAccentColor, detail * 0.12);
    darkened = mix(darkened, uPropDarkColor, seam * 0.22 + grime * 0.42 + scratch * 0.2);
  } else if (uPropPatternMode < 5.5) {
    darkened = mix(darkened, uPropAccentColor, ribs * 0.08);
    darkened = mix(darkened, uPropDarkColor, grime * 0.34);
  } else if (uPropPatternMode < 6.5) {
    float blade = smoothstep(0.0, 0.72, uv.y);
    darkened = mix(uPropDarkColor, mix(uPropBaseColor, uPropAccentColor, blade), 0.82);
    darkened = mix(darkened, uPropDarkColor, edge * 0.52 + (1.0 - blade) * 0.18);
  } else if (uPropPatternMode < 7.5) {
    darkened = mix(darkened, uPropAccentColor, seam * 0.28);
    darkened = mix(darkened, uPropDarkColor, edge * 0.72 + grime * 0.22);
  } else if (uPropPatternMode < 8.5) {
    darkened = mix(darkened, uPropAccentColor, detail * 0.16);
    darkened = mix(darkened, uPropDarkColor, seam * 0.34 + edge * 0.46);
  } else if (uPropPatternMode < 9.5) {
    darkened = mix(darkened, uPropAccentColor, detail * 0.12);
    darkened = mix(darkened, uPropDarkColor, edge * 0.4 + grime * 0.46);
  } else if (uPropPatternMode < 10.5) {
    float dampRise = (1.0 - smoothstep(0.05, 0.78, uv.y)) * (0.24 + macro * 0.28);
    float mineralBloom = smoothstep(0.58, 0.9, detail + macro * 0.32);
    darkened = mix(darkened, uPropAccentColor, mineralBloom * 0.13);
    darkened = mix(
      darkened,
      uPropDarkColor,
      grime * 0.52 + dampRise * 0.34 + edge * 0.12
    );
  } else {
    float mineralBloom = smoothstep(
      0.48,
      0.88,
      detail * 0.7 + macro * 0.38
    );
    float exposedAggregate = smoothstep(
      0.84,
      0.97,
      propNoise(
        vProcLocalPosition.xz * (uPropDetailScale * 0.72) +
        vec2(uPropSeed * 5.0, 17.0)
      )
    );
    float shallowSpall = smoothstep(
      0.58,
      0.88,
      propTriplanarFbm(
        vProcLocalPosition + vec3(9.0, uPropSeed, 23.0),
        localNormal,
        uPropDetailScale * 0.12
      ) + macro * 0.2
    );
    darkened = mix(
      darkened,
      uPropAccentColor,
      mineralBloom * 0.24 + exposedAggregate * 0.3
    );
    darkened = mix(
      darkened,
      uPropDarkColor,
      grime * 0.44 + shallowSpall * 0.22 + edge * 0.2
    );
  }

  darkened *= 0.68 + detail * 0.18 + max(localNormal.y, 0.0) * 0.04;
  return darkened;
}

float propRoughness() {
  vec2 detailUv = vProcUv * uPropDetailScale + vProcLocalPosition.xy * 0.08;
  float detail = propFbm(detailUv);
  float edge = propEdgeMask(vProcUv, mix(0.03, 0.12, uPropEdgeWear));
  return clamp(0.58 + detail * 0.24 + uPropRoughnessBias + edge * 0.1, 0.08, 1.0);
}

float propMetalness() {
  vec2 detailUv = vProcUv * uPropDetailScale + vProcLocalPosition.zy * 0.08;
  float detail = propFbm(detailUv);
  return clamp(0.08 + uPropMetalnessBias + detail * 0.08, 0.0, 0.92);
}

float propSurfaceHeight() {
  if (uPropPatternMode < 10.5) {
    return 0.0;
  }
  vec3 localNormal = normalize(vProcLocalNormal);
  float wornBody = propTriplanarFbm(
    vProcLocalPosition + vec3(uPropSeed, 7.0, 13.0),
    localNormal,
    uPropDetailScale * 0.18
  );
  float pitting = smoothstep(
    0.68,
    0.92,
    propTriplanarFbm(
      vProcLocalPosition + vec3(19.0, uPropSeed, 3.0),
      localNormal,
      uPropDetailScale * 0.42
    )
  );
  return (wornBody - 0.5) * 0.055 - pitting * 0.03;
}

vec3 propSurfaceNormal(vec3 baseNormal) {
  if (uPropPatternMode < 10.5) {
    return baseNormal;
  }
  float height = propSurfaceHeight();
  vec3 positionDx = dFdx(vProcWorldPosition);
  vec3 positionDy = dFdy(vProcWorldPosition);
  float heightDx = dFdx(height);
  float heightDy = dFdy(height);
  vec3 tangentX = cross(positionDy, baseNormal);
  vec3 tangentY = cross(baseNormal, positionDx);
  float determinant = dot(positionDx, tangentX);
  vec3 gradient = sign(determinant) *
    (heightDx * tangentX + heightDy * tangentY);
  return normalize(abs(determinant) * baseNormal - gradient * 0.42);
}

vec3 propEmissive() {
  if (uPropEmissiveBoost <= 0.0) {
    return vec3(0.0);
  }
  float blink = smoothstep(0.82, 0.96, propFbm(vProcUv * (uPropDetailScale * 1.2) + vec2(11.0, 3.0)));
  return uPropAccentColor * blink * uPropEmissiveBoost;
}
`;

const TERRAIN_PATTERN_FRAGMENT = `
${TERRAIN_FRAGMENT_COMMON}
`;

const PROP_PATTERN_FRAGMENT = `
${PROP_FRAGMENT_COMMON}
`;

const createColor = (hex: number): Color => new Color(hex);

const patternModeByProfile: Readonly<Record<string, number>> = {
  "painted-panel": 1,
  "oxidized-pipe": 2,
  "brick-facade": 3,
  "concrete-slab": 4,
  "cable-rib": 5,
  "grass-card": 6,
  "utility-crate": 7,
  "corroded-table": 8,
  "root-fiber": 9,
  "weathered-surface": 10,
  "ceiling-ruin": 11,
};

export const applyTerrainShader = (
  material: MeshStandardMaterial,
  terrainShader: TerrainShaderConfig,
  variant: TerrainVariant,
  concretePaving: ConcretePavingState | null = null,
  ceilingSurface: CeilingSurfaceConfig | null = null,
): void => {
  const tuning = TERRAIN_VARIANT_TUNING[variant];
  const ceilingIdentity = variant === "ceiling" ? ceilingSurface : null;
  const soilPalette = ceilingIdentity?.decayPalette ?? terrainShader.soilPalette;
  const grassPalette = ceilingIdentity?.mossPalette ?? terrainShader.grassPalette;
  const concretePalette =
    ceilingIdentity?.concretePalette ?? terrainShader.concretePalette;
  applyShaderPatch(material, `terrain:${variant}`, (shader) => {
    shader.uniforms.uTerrainSoilA = { value: createColor(soilPalette[0]) };
    shader.uniforms.uTerrainSoilB = { value: createColor(soilPalette[1]) };
    shader.uniforms.uTerrainSoilC = { value: createColor(soilPalette[2]) };
    shader.uniforms.uTerrainGrassA = { value: createColor(grassPalette[0]) };
    shader.uniforms.uTerrainGrassB = { value: createColor(grassPalette[1]) };
    shader.uniforms.uTerrainGrassC = { value: createColor(grassPalette[2]) };
    shader.uniforms.uTerrainConcreteA = { value: createColor(concretePalette[0]) };
    shader.uniforms.uTerrainConcreteB = { value: createColor(concretePalette[1]) };
    shader.uniforms.uTerrainConcreteC = { value: createColor(concretePalette[2]) };
    shader.uniforms.uTerrainAccent = {
      value: createColor(
        clampColor(
          ceilingIdentity ? concretePalette[2] : grassPalette[2],
          0.92,
        ),
      ),
    };
    shader.uniforms.uTerrainMacroScale = {
      value: terrainShader.layerScales.macro * (ceilingIdentity ? 1.3 : 1),
    };
    shader.uniforms.uTerrainDetailScale = {
      value: terrainShader.layerScales.detail * (ceilingIdentity ? 1.55 : 1),
    };
    shader.uniforms.uTerrainGrassScale = {
      value: terrainShader.layerScales.grass * (ceilingIdentity ? 0.76 : 1),
    };
    shader.uniforms.uTerrainConcreteScale = {
      value: terrainShader.layerScales.concrete * (ceilingIdentity ? 1.24 : 1),
    };
    shader.uniforms.uTerrainPuddleScale = {
      value: terrainShader.layerScales.puddle * (ceilingIdentity ? 0.82 : 1),
    };
    shader.uniforms.uTerrainWetnessResponse = {
      value: ceilingIdentity?.dampness ?? terrainShader.wetnessResponse,
    };
    shader.uniforms.uTerrainRoughnessRange = {
      value: ceilingIdentity?.roughnessRange ?? terrainShader.roughnessRange,
    };
    shader.uniforms.uTerrainBlendSharpness = { value: terrainShader.blendSharpness };
    shader.uniforms.uTerrainPuddleStrength = {
      value: ceilingIdentity
        ? Math.min(1, 0.18 + ceilingIdentity.dampness * 0.52)
        : terrainShader.puddleStrength,
    };
    shader.uniforms.uTerrainMossStrength = {
      value: ceilingIdentity?.mossStrength ?? terrainShader.mossStrength,
    };
    shader.uniforms.uTerrainGrassBias = { value: tuning.grassBias };
    shader.uniforms.uTerrainConcreteBias = { value: tuning.concreteBias };
    shader.uniforms.uTerrainBrickBias = { value: tuning.brickBias };
    shader.uniforms.uTerrainWetBias = { value: tuning.wetBias };
    shader.uniforms.uTerrainEmissiveStrength = { value: tuning.emissiveStrength };
    shader.uniforms.uTerrainConcreteIdentityStrength = {
      value: ceilingIdentity
        ? Math.min(
            1,
            tuning.concreteIdentityStrength *
              (0.78 + ceilingIdentity.surfaceRelief * 0.36),
          )
        : tuning.concreteIdentityStrength,
    };
    shader.uniforms.uTerrainIdentitySeed = {
      value: concretePaving?.slab.cracks.seedPhase ?? 0,
    };
    shader.uniforms.uTerrainSlabScale = {
      value:
        ceilingIdentity?.seamScale ??
        concretePaving?.slabAlignment.scale ??
        terrainShader.concreteIdentity.slabScale,
    };
    shader.uniforms.uTerrainSlabJointWidth = {
      value:
        ceilingIdentity?.seamWidth ??
        concretePaving?.slabAlignment.jointWidth ??
        terrainShader.concreteIdentity.slabJointWidth,
    };
    shader.uniforms.uTerrainCrackScale = {
      value:
        concretePaving?.slab.cracks.scale ??
        terrainShader.concreteIdentity.crackScale,
    };
    shader.uniforms.uTerrainCrackWidth = {
      value:
        concretePaving?.slab.cracks.width ??
        terrainShader.concreteIdentity.crackWidth,
    };
    shader.uniforms.uTerrainCrackDensity = {
      value:
        concretePaving?.slab.cracks.density ??
        terrainShader.concreteIdentity.crackDensity,
    };
    shader.uniforms.uTerrainAggregateScale = {
      value:
        ceilingIdentity?.aggregateScale ??
        concretePaving?.aggregateScale ??
        terrainShader.concreteIdentity.aggregateScale,
    };
    shader.uniforms.uTerrainAggregateExposure = {
      value:
        ceilingIdentity?.aggregateExposure ??
        concretePaving?.aggregateExposure ??
        terrainShader.concreteIdentity.aggregateExposure,
    };
    shader.uniforms.uTerrainRepairStrength = {
      value:
        ceilingIdentity?.mineralBloom ??
        concretePaving?.slab.body.repairStrength ??
        terrainShader.concreteIdentity.repairStrength,
    };
    shader.uniforms.uTerrainSurfaceRelief = {
      value:
        ceilingIdentity?.surfaceRelief ??
        concretePaving?.slab.displacement.surfaceRelief ??
        terrainShader.concreteIdentity.surfaceRelief,
    };
    shader.uniforms.uTerrainCeilingMode = {
      value: ceilingIdentity ? 1 : 0,
    };

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `#include <common>\n${TERRAIN_PATTERN_FRAGMENT}`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 diffuseColor = vec4( diffuse, opacity );",
      "vec4 diffuseColor = vec4(terrainAlbedo(), opacity);",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "float roughnessFactor = roughness;",
      "float roughnessFactor = terrainRoughness();",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "float metalnessFactor = metalness;",
      "float metalnessFactor = terrainMetalness();",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <normal_fragment_maps>",
      "#include <normal_fragment_maps>\nnormal = terrainSurfaceNormal(normal);",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "vec3 totalEmissiveRadiance = emissive;",
      "vec3 totalEmissiveRadiance = emissive + terrainEmissive();",
    );
  });
};

const resolveFamilyProfile = (
  config: PropShaderConfig,
  family: string,
): PropFamilyProfile => {
  const fallback = config.shaderFamilyProfiles["damp-concrete"];
  return config.shaderFamilyProfiles[family] ?? fallback;
};

const resolveObjectProfile = (
  config: PropFidelityConfig,
  kind: string,
): PropObjectProfile => {
  const fallback = config.objectProfiles["wall-box"];
  return config.objectProfiles[kind] ?? fallback;
};

export const applyPropShader = (
  material: MeshStandardMaterial,
  descriptor: ScenePropDescriptor,
  preset: HorrorCorridorPreset,
  baseColor: number,
): void => {
  const familyProfile = resolveFamilyProfile(preset.proceduralPbrMaterial, descriptor.materialFamily);
  const objectProfile = resolveObjectProfile(preset.propMaterialFidelity, descriptor.kind);
  const shaderProfile = objectProfile.shaderProfile || familyProfile.shaderProfile;
  const patternMode = patternModeByProfile[shaderProfile] ?? patternModeByProfile["painted-panel"];
  const accentColor =
    objectProfile.accentColor !== 0 ? objectProfile.accentColor : familyProfile.accentColor;
  const darkColor = clampColor(baseColor, 0.52);

  applyShaderPatch(material, `prop:${descriptor.kind}:${descriptor.materialFamily}:${shaderProfile}`, (shader) => {
    shader.uniforms.uPropBaseColor = { value: createColor(baseColor) };
    shader.uniforms.uPropAccentColor = { value: createColor(accentColor) };
    shader.uniforms.uPropDarkColor = { value: createColor(darkColor) };
    shader.uniforms.uPropSeed = { value: (descriptor.id.length * 0.173) % 17 };
    shader.uniforms.uPropDetailScale = { value: objectProfile.detailScale };
    shader.uniforms.uPropEdgeWear = { value: objectProfile.edgeWear };
    shader.uniforms.uPropGrimeBoost = {
      value: objectProfile.grimeBoost + preset.proceduralPbrMaterial.grimeIntensity * 0.25,
    };
    shader.uniforms.uPropRoughnessBias = { value: familyProfile.roughnessBias };
    shader.uniforms.uPropMetalnessBias = { value: familyProfile.metalnessBias };
    shader.uniforms.uPropEmissiveBoost = {
      value: familyProfile.emissiveBoost * preset.proceduralPbrMaterial.emissiveAccent,
    };
    shader.uniforms.uPropPatternMode = { value: patternMode };

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `#include <common>\n${PROP_PATTERN_FRAGMENT}`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 diffuseColor = vec4( diffuse, opacity );",
      "vec4 diffuseColor = vec4(propAlbedo(), opacity);",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "float roughnessFactor = roughness;",
      "float roughnessFactor = propRoughness();",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "float metalnessFactor = metalness;",
      "float metalnessFactor = propMetalness();",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <normal_fragment_maps>",
      "#include <normal_fragment_maps>\nnormal = propSurfaceNormal(normal);",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "vec3 totalEmissiveRadiance = emissive;",
      "vec3 totalEmissiveRadiance = emissive + propEmissive();",
    );
  });
};
