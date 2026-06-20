import { defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type PropMaterialFidelityDomainKitConfig = Readonly<{
  geometryDetail: "low" | "medium" | "high";
  materialTextureSize: number;
  clipTextureSize: number;
  projectionTextureSize: number;
  surfaceBreakupIntensity: number;
  emissiveCueStrength: number;
  visibleSpawnPropTarget: number;
  objectProfiles: Record<string, Readonly<{
    shaderProfile: string;
    detailScale: number;
    edgeWear: number;
    grimeBoost: number;
    accentColor: number;
  }>>;
}>;

export const createPropMaterialFidelityDomainKit = (
  config: PropMaterialFidelityDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "prop-material-fidelity",
    services: ["mesh-profiles", "material-profiles", "visible-content-thresholds"],
    resources: {
      PropMaterialFidelityState: "propMaterialFidelity.state",
      PropMaterialProfileLibrary: "propMaterialFidelity.materialProfiles",
      PropMeshProfileLibrary: "propMaterialFidelity.meshProfiles",
    },
    metadata: {
      purpose:
        "Generic prop mesh and material fidelity descriptors for renderer-owned scene dressing.",
      config,
    },
  });
