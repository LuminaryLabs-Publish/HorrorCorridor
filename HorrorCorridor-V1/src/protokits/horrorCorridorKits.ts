import { createGridMazeDomainKit } from "./grid-maze-domain-kit";
import { createGridFieldDomainKit } from "./grid-field-domain-kit";
import { createBrokenCityWallDomainKit } from "./broken-city-wall-kit";
import { createBuildingFacadeObjectKit } from "./building-facade-object-kit";
import { createBrickCourseTextureKit } from "./brick-course-texture-kit";
import { createBrickRubbleObjectKit } from "./brick-rubble-object-kit";
import { createCableRunObjectKit } from "./cable-run-object-kit";
import { createCeilingServiceStripObjectKit } from "./ceiling-service-strip-object-kit";
import { createCorrodedTableObjectKit } from "./corroded-table-object-kit";
import {
  createCorridorLampArmatureProfileKit,
  createCorridorLampCableConduitProfileKit,
  createCorridorLampFastenerProfileKit,
  createCorridorLampFoundationProfileKit,
  createCorridorLampHeadProfileKit,
  createCorridorLampLightProfileKit,
  createCorridorLampMaterialProfileKit,
  createCorridorLampObjectKit,
  createCorridorLampPoleProfileKit,
  createCorridorLampValidationProfileKit,
} from "./corridor-lamp-object-kit";
import { createCorridorTileDomainKit } from "./corridor-tile-domain-kit";
import { createDampMudTextureKit } from "./damp-mud-texture-kit";
import { createDebrisScatterObjectKit } from "./debris-scatter-object-kit";
import { createFlashlightDomainKit } from "./flashlight-domain-kit";
import { createGrassObjectSpawnDomainKit } from "./grass-object-spawn-kit";
import { createInventoryDomainKit } from "./inventory-domain-kit";
import { createLightingDescriptorDomainKit } from "./lighting-descriptor-domain-kit";
import { createLightingPlacementDomainKit } from "./lighting-placement-domain-kit";
import { createLooseFloorSlabObjectKit } from "./loose-floor-slab-object-kit";
import { createMossGrimeTextureKit } from "./moss-grime-texture-kit";
import { createObjectPlacementDomainKit } from "./object-placement-domain-kit";
import { createOvergrowthObjectKit } from "./overgrowth-object-kit";
import { createPedestalDressingObjectKit } from "./pedestal-dressing-object-kit";
import { createOpenSkyProjectionDomainKit } from "./open-sky-projection-domain-kit";
import { createPipeRunObjectKit } from "./pipe-run-object-kit";
import { createProceduralPbrMaterialDomainKit } from "./procedural-pbr-material-domain-kit";
import { createPropDescriptorDomainKit } from "./prop-descriptor-domain-kit";
import { createPropMaterialFidelityDomainKit } from "./prop-material-fidelity-domain-kit";
import { createRaymarchSamplingDomainKit } from "./raymarch-sampling-domain-kit";
import { createRenderValidationDomainKit } from "./render-validation-domain-kit";
import { createRockClusterObjectKit } from "./rock-cluster-object-kit";
import { createRustStreakTextureKit } from "./rust-streak-texture-kit";
import { createSceneDressingDomainKit } from "./scene-dressing-domain-kit";
import { createSceneGenerationDomainKit } from "./scene-generation-domain-kit";
import { createSequenceObjectiveDomainKit } from "./sequence-objective-domain-kit";
import { createSpatialInteractionDomainKit } from "./spatial-interaction-domain-kit";
import { createTexturePlacementDomainKit } from "./texture-placement-domain-kit";
import { createTerrainFieldDomainKit } from "./terrain-field-domain-kit";
import { createTerrainShaderDomainKit } from "./terrain-shader-domain-kit";
import { createTriangleSurfaceSamplerDomainKit } from "./triangle-surface-sampler-domain-kit";
import { createTrailDecalDomainKit } from "./trail-decal-domain-kit";
import { createStorageCrateObjectKit } from "./storage-crate-object-kit";
import { createUtilityCrateObjectKit } from "./utility-crate-object-kit";
import { createVentObjectKit } from "./vent-object-kit";
import { createWalkthroughDomainKit } from "./walkthrough-domain-kit";
import { createWallPanelObjectKit } from "./wall-panel-object-kit";
import { createWetConcreteTextureKit } from "./wet-concrete-texture-kit";
import { createSocketGraphDomainKit } from "./socket-graph-domain-kit";
import { createFootprintLayoutDomainKit } from "./footprint-layout-domain-kit";
import { createSceneBundleDomainKit } from "./scene-bundle-domain-kit";
import { createHorrorDomainManifest } from "./domainKit";
import {
  createHorrorCorridorContentPacks,
  createHorrorCorridorPreset,
  type HorrorCorridorPreset,
  type HorrorCorridorPresetInput,
} from "./presets/horror-corridor-preset";

export type HorrorCorridorDomainKitInput = Readonly<{
  preset?: HorrorCorridorPreset | HorrorCorridorPresetInput;
}>;

const resolvePreset = (
  input: HorrorCorridorPreset | HorrorCorridorPresetInput | undefined,
): HorrorCorridorPreset => {
  if (input && "trailDecal" in input && "sequenceObjective" in input && "renderValidation" in input) {
    return input as HorrorCorridorPreset;
  }

  return createHorrorCorridorPreset(input as HorrorCorridorPresetInput | undefined);
};

const objectKitConfig = (
  preset: HorrorCorridorPreset,
  propKinds: readonly string[],
  materialFamilies: readonly string[],
  palette: readonly number[],
  maxVisible: number,
) => ({
  enabled: true,
  maxVisible,
  palette,
  propKinds,
  materialFamilies,
  shaderProfiles: propKinds.map((kind) => preset.propMaterialFidelity.objectProfiles[kind]?.shaderProfile ?? "painted-panel"),
});

export const createHorrorCorridorDomainKits = (input: HorrorCorridorDomainKitInput = {}) => {
  const preset = resolvePreset(input.preset);
  const kits = [
    createGridMazeDomainKit(preset.maze),
    createGridFieldDomainKit(preset.gridField),
    createCorridorTileDomainKit(preset.corridorTile),
    createTerrainFieldDomainKit(preset.terrainField),
    createTerrainShaderDomainKit(preset.terrainShader),
    createRaymarchSamplingDomainKit(preset.raymarchSampling),
    createTriangleSurfaceSamplerDomainKit(preset.triangleSurfaceSampler),
    createSocketGraphDomainKit(preset.socketGraph),
    createBrokenCityWallDomainKit(preset.brokenCityWall),
    createOpenSkyProjectionDomainKit(preset.openSkyProjection),
    createWallPanelObjectKit(
      objectKitConfig(preset, ["wall-box"], ["painted-metal"], preset.smallObjectKits.ceilingServiceStrip.palette, 18),
    ),
    createPipeRunObjectKit(
      objectKitConfig(preset, ["pipe", "floor-pipe"], ["rusted-metal", "painted-metal"], preset.proceduralTextureKits.rustStreak.palette, 28),
    ),
    createCableRunObjectKit(
      objectKitConfig(preset, ["cable"], ["rubber-cable"], preset.smallObjectKits.ceilingServiceStrip.palette, 18),
    ),
    createVentObjectKit(
      objectKitConfig(preset, ["vent", "ceiling-duct"], ["painted-metal", "rusted-metal"], preset.smallObjectKits.ceilingServiceStrip.palette, 18),
    ),
    createBuildingFacadeObjectKit(
      objectKitConfig(preset, ["building-facade"], ["broken-brick", "damp-concrete"], preset.brokenCityWall.brickPalette, preset.openSkyProjection.maxBuildingFacades),
    ),
    createUtilityCrateObjectKit(
      objectKitConfig(preset, ["utility-crate-stack"], ["painted-utility"], preset.smallObjectKits.utilityCrateStack.palette, preset.smallObjectKits.utilityCrateStack.maxVisible),
    ),
    createStorageCrateObjectKit(
      objectKitConfig(preset, ["crate"], ["painted-metal"], preset.smallObjectKits.utilityCrateStack.palette, 18),
    ),
    createCorrodedTableObjectKit(
      objectKitConfig(preset, ["table"], ["painted-metal"], preset.smallObjectKits.ceilingServiceStrip.palette, 14),
    ),
    createCorridorLampFoundationProfileKit(),
    createCorridorLampPoleProfileKit(),
    createCorridorLampArmatureProfileKit(),
    createCorridorLampHeadProfileKit(),
    createCorridorLampCableConduitProfileKit(),
    createCorridorLampFastenerProfileKit(),
    createCorridorLampMaterialProfileKit(),
    createCorridorLampLightProfileKit(),
    createCorridorLampValidationProfileKit(),
    createCorridorLampObjectKit(
      objectKitConfig(preset, ["lamp-post"], ["rusted-metal"], preset.proceduralTextureKits.rustStreak.palette, 12),
    ),
    createBrickRubbleObjectKit(
      objectKitConfig(preset, ["brick-rubble-pile"], ["broken-brick"], preset.smallObjectKits.brickRubblePile.palette, preset.smallObjectKits.brickRubblePile.maxVisible),
    ),
    createLooseFloorSlabObjectKit(
      objectKitConfig(preset, ["loose-floor-slab"], ["wet-concrete"], preset.smallObjectKits.looseFloorSlab.palette, preset.smallObjectKits.looseFloorSlab.maxVisible),
    ),
    createCeilingServiceStripObjectKit(
      objectKitConfig(preset, ["ceiling-service-strip"], ["rusted-metal"], preset.smallObjectKits.ceilingServiceStrip.palette, preset.smallObjectKits.ceilingServiceStrip.maxVisible),
    ),
    createDebrisScatterObjectKit(
      objectKitConfig(preset, ["debris", "rubble"], ["broken-rubble", "damp-concrete"], preset.smallObjectKits.looseFloorSlab.palette, 34),
    ),
    createRockClusterObjectKit(
      objectKitConfig(preset, ["rock-cluster"], ["broken-rubble"], preset.smallObjectKits.looseFloorSlab.palette, 28),
    ),
    createOvergrowthObjectKit(
      objectKitConfig(preset, ["grass-clump", "root-strip"], ["muddy-grass", "root-fiber"], preset.terrainShader.grassPalette, 40),
    ),
    createPedestalDressingObjectKit(
      objectKitConfig(preset, ["pedestal-dressing"], ["painted-utility"], preset.smallObjectKits.utilityCrateStack.palette, 6),
    ),
    createBrickCourseTextureKit(preset.proceduralTextureKits.brickCourse),
    createDampMudTextureKit(preset.proceduralTextureKits.dampMud),
    createRustStreakTextureKit(preset.proceduralTextureKits.rustStreak),
    createMossGrimeTextureKit(preset.proceduralTextureKits.mossGrime),
    createWetConcreteTextureKit(preset.proceduralTextureKits.wetConcrete),
    createInventoryDomainKit(preset.inventory),
    createSpatialInteractionDomainKit(preset.spatialInteraction),
    createSequenceObjectiveDomainKit({
      slotCount: preset.sequenceObjective.slotCount,
      requiredValues: preset.sequenceObjective.colors,
      completionMode: preset.sequenceObjective.completionMode,
    }),
    createTrailDecalDomainKit(preset.trailDecal),
    createPropDescriptorDomainKit(preset.propDescriptor),
    createGrassObjectSpawnDomainKit(preset.grassObjectSpawn),
    createObjectPlacementDomainKit(preset.objectPlacement),
    createFootprintLayoutDomainKit(preset.footprintLayout),
    createProceduralPbrMaterialDomainKit(preset.proceduralPbrMaterial),
    createPropMaterialFidelityDomainKit(preset.propMaterialFidelity),
    createSceneBundleDomainKit(preset.sceneBundles),
    createTexturePlacementDomainKit(preset.texturePlacement),
    createSceneDressingDomainKit(preset.sceneDressing),
    createLightingDescriptorDomainKit(preset.lightingDescriptor),
    createLightingPlacementDomainKit(preset.lightingPlacement),
    createFlashlightDomainKit(preset.flashlight),
    createWalkthroughDomainKit(preset.walkthrough),
    createRenderValidationDomainKit(preset.renderValidation),
    createSceneGenerationDomainKit(preset.sceneGeneration),
  ];

  return Object.freeze({
    preset,
    domainManifest: createHorrorDomainManifest(kits),
    contentPackManifest: createHorrorCorridorContentPacks(preset),
  });
};
