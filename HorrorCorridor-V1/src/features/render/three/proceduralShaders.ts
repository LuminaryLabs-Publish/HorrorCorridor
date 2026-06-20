import { Color, MeshStandardMaterial } from "three";

import type { HorrorCorridorPreset } from "@/protokits";

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
type PropShaderConfig = HorrorCorridorPreset["proceduralPbrMaterial"];
type PropFidelityConfig = HorrorCorridorPreset["propMaterialFidelity"];

const TERRAIN_VARIANT_TUNING: Readonly<Record<TerrainVariant, Readonly<{
  grassBias: number;
  concreteBias: number;
  brickBias: number;
  wetBias: number;
  emissiveStrength: number;
}>>> = {
  "main-floor": { grassBias: 0.16, concreteBias: 0.48, brickBias: 0.08, wetBias: 0.42, emissiveStrength: 0 },
  "branch-floor": { grassBias: 0.32, concreteBias: 0.22, brickBias: 0.05, wetBias: 0.54, emissiveStrength: 0 },
  wall: { grassBias: 0.08, concreteBias: 0.42, brickBias: 0.52, wetBias: 0.14, emissiveStrength: 0 },
  ceiling: { grassBias: 0.02, concreteBias: 0.52, brickBias: 0.18, wetBias: 0.1, emissiveStrength: 0 },
  trim: { grassBias: 0.01, concreteBias: 0.24, brickBias: 0.12, wetBias: 0.06, emissiveStrength: 0 },
  "end-wall": { grassBias: 0.04, concreteBias: 0.36, brickBias: 0.2, wetBias: 0.18, emissiveStrength: 0.08 },
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

  return base;
}

float terrainRoughness() {
  vec3 n = normalize(vProcLocalNormal);
  float macro = procTriplanarFbm(vProcWorldPosition + vec3(7.0, 0.0, 5.0), n, uTerrainMacroScale);
  float puddle = procTriplanarFbm(vProcWorldPosition + vec3(1.0, 0.0, 23.0), n, uTerrainPuddleScale);
  float concrete = procTriplanarFbm(vProcWorldPosition + vec3(0.0, 5.0, 0.0), n, uTerrainConcreteScale);
  float wetness = smoothstep(0.45, 0.94, puddle + macro * 0.28 + uTerrainWetBias);
  float detail = smoothstep(0.18, 0.92, concrete * 0.65 + macro * 0.22);
  return mix(uTerrainRoughnessRange.x, uTerrainRoughnessRange.y, clamp(detail - wetness * 0.34 + 0.36, 0.0, 1.0));
}

float terrainMetalness() {
  vec3 n = normalize(vProcLocalNormal);
  float concrete = procTriplanarFbm(vProcWorldPosition + vec3(-6.0, 3.0, 4.0), n, uTerrainConcreteScale);
  return clamp(concrete * 0.06 + uTerrainConcreteBias * 0.02, 0.0, 0.12);
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
  } else {
    darkened = mix(darkened, uPropAccentColor, detail * 0.12);
    darkened = mix(darkened, uPropDarkColor, edge * 0.4 + grime * 0.46);
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
};

export const applyTerrainShader = (
  material: MeshStandardMaterial,
  terrainShader: TerrainShaderConfig,
  variant: TerrainVariant,
): void => {
  const tuning = TERRAIN_VARIANT_TUNING[variant];
  applyShaderPatch(material, `terrain:${variant}`, (shader) => {
    shader.uniforms.uTerrainSoilA = { value: createColor(terrainShader.soilPalette[0]) };
    shader.uniforms.uTerrainSoilB = { value: createColor(terrainShader.soilPalette[1]) };
    shader.uniforms.uTerrainSoilC = { value: createColor(terrainShader.soilPalette[2]) };
    shader.uniforms.uTerrainGrassA = { value: createColor(terrainShader.grassPalette[0]) };
    shader.uniforms.uTerrainGrassB = { value: createColor(terrainShader.grassPalette[1]) };
    shader.uniforms.uTerrainGrassC = { value: createColor(terrainShader.grassPalette[2]) };
    shader.uniforms.uTerrainConcreteA = { value: createColor(terrainShader.concretePalette[0]) };
    shader.uniforms.uTerrainConcreteB = { value: createColor(terrainShader.concretePalette[1]) };
    shader.uniforms.uTerrainConcreteC = { value: createColor(terrainShader.concretePalette[2]) };
    shader.uniforms.uTerrainAccent = { value: createColor(clampColor(terrainShader.grassPalette[2], 0.92)) };
    shader.uniforms.uTerrainMacroScale = { value: terrainShader.layerScales.macro };
    shader.uniforms.uTerrainDetailScale = { value: terrainShader.layerScales.detail };
    shader.uniforms.uTerrainGrassScale = { value: terrainShader.layerScales.grass };
    shader.uniforms.uTerrainConcreteScale = { value: terrainShader.layerScales.concrete };
    shader.uniforms.uTerrainPuddleScale = { value: terrainShader.layerScales.puddle };
    shader.uniforms.uTerrainWetnessResponse = { value: terrainShader.wetnessResponse };
    shader.uniforms.uTerrainRoughnessRange = { value: terrainShader.roughnessRange };
    shader.uniforms.uTerrainBlendSharpness = { value: terrainShader.blendSharpness };
    shader.uniforms.uTerrainPuddleStrength = { value: terrainShader.puddleStrength };
    shader.uniforms.uTerrainMossStrength = { value: terrainShader.mossStrength };
    shader.uniforms.uTerrainGrassBias = { value: tuning.grassBias };
    shader.uniforms.uTerrainConcreteBias = { value: tuning.concreteBias };
    shader.uniforms.uTerrainBrickBias = { value: tuning.brickBias };
    shader.uniforms.uTerrainWetBias = { value: tuning.wetBias };
    shader.uniforms.uTerrainEmissiveStrength = { value: tuning.emissiveStrength };

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
      "vec3 totalEmissiveRadiance = emissive;",
      "vec3 totalEmissiveRadiance = emissive + propEmissive();",
    );
  });
};
