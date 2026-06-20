export {
  createCorridorLampArmatureProfileKit,
  corridorLampArmatureProfileConfig,
} from "./armature-profile";
export {
  createCorridorLampCableConduitProfileKit,
  corridorLampCableConduitProfileConfig,
} from "./cable-conduit-profile";
export {
  createCorridorLampFastenerProfileKit,
  corridorLampFastenerProfileConfig,
} from "./fastener-profile";
export {
  createCorridorLampFoundationProfileKit,
  corridorLampFoundationProfileConfig,
} from "./foundation-profile";
export {
  createCorridorLampHeadProfileKit,
  corridorLampHeadProfileConfig,
} from "./lamp-head-profile";
export {
  createCorridorLampLightProfileKit,
  corridorLampLightProfileConfig,
} from "./light-profile";
export {
  createCorridorLampMaterialProfileKit,
  corridorLampMaterialProfileConfig,
} from "./material-profile";
export {
  createCorridorLampPoleProfileKit,
  corridorLampPoleProfileConfig,
} from "./pole-profile";
export {
  createCorridorLampValidationProfileKit,
  corridorLampValidationProfileConfig,
} from "./validation-profile";
export type {
  CorridorLampPartDescriptor,
  CorridorLampPartDomain,
  CorridorLampPartProfileConfig,
  CorridorLampPartTransform,
} from "./types";

export const corridorLampPartProfileKitIds = [
  "corridor-lamp-foundation-profile-kit",
  "corridor-lamp-pole-profile-kit",
  "corridor-lamp-armature-profile-kit",
  "corridor-lamp-head-profile-kit",
  "corridor-lamp-cable-conduit-profile-kit",
  "corridor-lamp-fastener-profile-kit",
  "corridor-lamp-material-profile-kit",
  "corridor-lamp-light-profile-kit",
  "corridor-lamp-validation-profile-kit",
] as const;

