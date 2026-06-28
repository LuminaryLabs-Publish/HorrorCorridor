import {
  barrelClusterObjectProfile,
  generateBarrelClusterMesh,
} from "./barrel-cluster-object-kit";
import {
  brokenConcreteStairObjectProfile,
  generateBrokenConcreteStairMesh,
} from "./broken-concrete-stair-object-kit";
import {
  brokenGeneratorObjectProfile,
  generateBrokenGeneratorMesh,
} from "./broken-generator-object-kit";
import {
  chainLinkFenceObjectProfile,
  generateChainLinkFenceMesh,
} from "./chain-link-fence-object-kit";
import {
  collapsedSignpostObjectProfile,
  generateCollapsedSignpostMesh,
} from "./collapsed-signpost-object-kit";
import {
  concreteJerseyBarrierObjectProfile,
  generateConcreteJerseyBarrierMesh,
} from "./concrete-jersey-barrier-object-kit";
import {
  hangingChainHookObjectProfile,
  generateHangingChainHookMesh,
} from "./hanging-chain-hook-object-kit";
import {
  industrialShelvingObjectProfile,
  generateIndustrialShelvingMesh,
} from "./industrial-shelving-object-kit";
import {
  rustedServiceDoorObjectProfile,
  generateRustedServiceDoorMesh,
} from "./rusted-service-door-object-kit";
import {
  stormDrainCulvertObjectProfile,
  generateStormDrainCulvertMesh,
} from "./storm-drain-culvert-object-kit";
import {
  validateWoundMeshObjectDescriptor,
  type WoundMeshObjectDescriptor,
} from "./wound-triangle-mesh-domain-kit";
import type { MeshObjectProfile } from "./mesh-object-kit";

export type MeshObjectCatalogEntry = Readonly<{
  profile: MeshObjectProfile;
  generate: () => WoundMeshObjectDescriptor;
}>;

export const meshObjectCatalog = [
  { profile: rustedServiceDoorObjectProfile, generate: generateRustedServiceDoorMesh },
  { profile: chainLinkFenceObjectProfile, generate: generateChainLinkFenceMesh },
  { profile: brokenGeneratorObjectProfile, generate: generateBrokenGeneratorMesh },
  { profile: concreteJerseyBarrierObjectProfile, generate: generateConcreteJerseyBarrierMesh },
  { profile: stormDrainCulvertObjectProfile, generate: generateStormDrainCulvertMesh },
  { profile: collapsedSignpostObjectProfile, generate: generateCollapsedSignpostMesh },
  { profile: industrialShelvingObjectProfile, generate: generateIndustrialShelvingMesh },
  { profile: hangingChainHookObjectProfile, generate: generateHangingChainHookMesh },
  { profile: barrelClusterObjectProfile, generate: generateBarrelClusterMesh },
  { profile: brokenConcreteStairObjectProfile, generate: generateBrokenConcreteStairMesh },
] as const satisfies readonly MeshObjectCatalogEntry[];

export const meshGeneratingObjectKitIds = meshObjectCatalog.map((entry) => entry.profile.kitId);

export const meshGeneratingObjectDomainKitIds = meshObjectCatalog.map(
  (entry) => `${entry.profile.domain}-domain-kit`,
);

export const createMeshObjectDescriptorCatalog = (): readonly WoundMeshObjectDescriptor[] =>
  meshObjectCatalog.map((entry) => entry.generate());

export const validateMeshObjectDescriptorCatalog = (): readonly string[] =>
  createMeshObjectDescriptorCatalog().flatMap((descriptor) =>
    validateWoundMeshObjectDescriptor(descriptor),
  );
