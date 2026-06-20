import { createHorrorDomainToken } from "../../domainKit";
import { defineCorridorLampPartProfileKit } from "./defineLampPartProfileKit";
import type { CorridorLampPartProfileConfig } from "./types";

export const corridorLampMaterialProfileConfig: CorridorLampPartProfileConfig = {
  enabled: true,
  referenceTraits: [
    "rusted rough metal",
    "chipped paint",
    "dark grime in seams",
    "warm lens material",
  ],
  descriptors: [
    {
      id: "material-rusted-painted-metal",
      domain: "material",
      shape: "shader-profile",
      transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
      materialProfile: "rusted-painted-metal-triplanar",
      tags: ["material", "rust", "chipped-paint", "roughness"],
    },
    {
      id: "material-warm-glass-lens",
      domain: "material",
      shape: "emissive-material-profile",
      transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
      materialProfile: "warm-emissive-lens",
      tags: ["material", "emissive", "lens", "warm"],
    },
  ],
  validation: {
    minOrbitScore: 90,
    requiredViews: ["three-quarter", "corridor-dark", "orbit-045", "orbit-135"],
    firstFailureHint: "Material must read as rusted/chipped/grimy metal, not flat brown primitives.",
  },
};

export const createCorridorLampMaterialProfileKit = (
  config: CorridorLampPartProfileConfig = corridorLampMaterialProfileConfig,
) =>
  defineCorridorLampPartProfileKit({
    apiName: "corridorLampMaterialProfile",
    config,
    domain: "corridor-lamp-material-profile",
    services: ["material-descriptors", "rusted-metal-profile", "warm-lens-profile"],
    resources: { MaterialProfile: "corridorLamp.parts.material" },
    requires: [createHorrorDomainToken("procedural-pbr-material")],
    purpose: "Scoped corridor lamp material kit for rust, chipped paint, grime, rough PBR metal, and warm lens material.",
  });

