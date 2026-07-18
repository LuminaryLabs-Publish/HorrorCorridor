// Owns core game-state rules, events, and transitions.
// Keep state logic pure and independent of UI or transport.

export {
  beginSoloExpedition,
  type BeginSoloExpeditionInput,
  type SoloExpeditionDeparture,
} from "./beginExpedition";

export {
  HORROR_CORRIDOR_MONSTERS,
  advanceEndlessExpedition,
  claimRoomOffer,
  createInitialEndlessExpedition,
  describeMonsterBearing,
  type AdvanceEndlessExpeditionInput,
  type MonsterProfile,
} from "./endlessExpedition";
