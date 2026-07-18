import type {
  EndlessExpeditionSnapshot,
  MonsterCueKind,
  MonsterIndexEntrySnapshot,
  MonsterKnowledge,
  RoomOfferKind,
  RoomOfferSnapshot,
  StalkerEncounterSnapshot,
} from "@/types/shared";

const INTRO_DISTANCE_METERS = 12;
const FIRST_ENCOUNTER_DISTANCE_METERS = 7;
const BLACKOUT_DISTANCE_METERS = 2.2;
const FORCED_BLACKOUT_MS = 3_000;
const JUMPSCARE_IMPACT_MS = 2_400;
const BASE_BEAM_HALF_ANGLE_RADIANS = 0.24;
const BASE_REPEL_SPEED_METERS_PER_SECOND = 9.5;
const MAX_FRAME_DELTA_MS = 100;
const TWO_PI = Math.PI * 2;

export type MonsterProfile = Readonly<{
  id: string;
  name: string;
  sign: string;
  scare: string;
  response: string;
  cueKind: MonsterCueKind;
  initialDistance: number;
  approachSpeed: number;
  beamHoldMs: number;
  lastChanceMs: number;
  blackoutTurnRadians: number;
}>;

export const HORROR_CORRIDOR_MONSTERS: readonly MonsterProfile[] = Object.freeze([
  Object.freeze({
    id: "still-guest",
    name: "The Still Guest",
    sign: "One wet footstep repeats from the place you are not looking.",
    scare: "It reaches the shoulder, swallows the flashlight for three seconds, then waits just outside the returning beam.",
    response: "Turn toward the footstep and hold the flashlight on its face before the final breath ends.",
    cueKind: "footstep",
    initialDistance: 18,
    approachSpeed: 1.05,
    beamHoldMs: 900,
    lastChanceMs: 7_800,
    blackoutTurnRadians: 0.58,
  }),
  Object.freeze({
    id: "wall-knocker",
    name: "The Wall Knocker",
    sign: "Three hollow knocks trade sides whenever it crosses a doorway.",
    scare: "It kills the light, moves to the opposite wall, and begins a faster answer of knocks.",
    response: "Follow the new side after the blackout and pin the knocking shape in the beam.",
    cueKind: "knock",
    initialDistance: 20,
    approachSpeed: 1.16,
    beamHoldMs: 1_050,
    lastChanceMs: 7_200,
    blackoutTurnRadians: -1.1,
  }),
  Object.freeze({
    id: "rust-mother",
    name: "The Rust Mother",
    sign: "A long metal scrape circles low around the room.",
    scare: "Her scrape becomes a green pulse before every stolen second of light.",
    response: "Keep the restored beam steady through the scrape until she unfolds away from it.",
    cueKind: "scrape",
    initialDistance: 17,
    approachSpeed: 0.92,
    beamHoldMs: 1_250,
    lastChanceMs: 8_400,
    blackoutTurnRadians: 0.82,
  }),
  Object.freeze({
    id: "breath-thief",
    name: "The Breath Thief",
    sign: "Breathing arrives in the wrong ear, closer than the corridor should allow.",
    scare: "It breathes through the blackout and leaves only a short silence when the light returns.",
    response: "Use the final breath to choose a side and reveal it before the silence closes.",
    cueKind: "breath",
    initialDistance: 21,
    approachSpeed: 1.24,
    beamHoldMs: 1_100,
    lastChanceMs: 6_800,
    blackoutTurnRadians: -0.72,
  }),
]);

export type AdvanceEndlessExpeditionInput = Readonly<{
  deltaMs: number;
  travelledMeters: number;
  playerYaw: number;
}>;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const normalizeAngle = (value: number): number => {
  let angle = value % TWO_PI;
  if (angle > Math.PI) angle -= TWO_PI;
  if (angle < -Math.PI) angle += TWO_PI;
  return angle;
};

const hashUnit = (seed: number, salt: number): number => {
  let value = Math.imul((seed ^ salt) >>> 0, 2246822519);
  value = Math.imul(value ^ (value >>> 13), 3266489917);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
};

const knowledgeRank: Readonly<Record<MonsterKnowledge, number>> = Object.freeze({
  unknown: 0,
  seen: 1,
  studied: 2,
  collected: 3,
});

const promoteKnowledge = (
  current: MonsterKnowledge,
  next: MonsterKnowledge,
): MonsterKnowledge => (knowledgeRank[next] > knowledgeRank[current] ? next : current);

const initialMonsterIndex = (): readonly MonsterIndexEntrySnapshot[] =>
  HORROR_CORRIDOR_MONSTERS.map((monster) => ({
    id: monster.id,
    name: monster.name,
    sign: monster.sign,
    scare: monster.scare,
    response: monster.response,
    knowledge: "unknown",
    encounters: 0,
    scaresSurvived: 0,
    firstSeenAtEncounter: null,
    collectedAtEncounter: null,
  }));

export const createInitialEndlessExpedition = (
  seed: number,
): EndlessExpeditionSnapshot => ({
  phase: "intro",
  elapsedMs: 0,
  distanceTravelled: 0,
  introDistanceTravelled: 0,
  buildingNumber: 0,
  buildingsCrossed: 0,
  encountersSurvived: 0,
  distanceSinceEncounter: 0,
  nextEncounterInMeters: FIRST_ENCOUNTER_DISTANCE_METERS,
  activeEncounter: null,
  roomOffer: null,
  flashlight: {
    mode: "steady",
    intensity: 1,
    flickerRemainingMs: 0,
    nextFlickerInMs: 3_600 + hashUnit(seed, 11) * 3_600,
  },
  boons: {
    beamWidthBonusRadians: 0,
    cueFrequencyBonus: 0,
    lastChanceBonusMs: 0,
    approachSlowMultiplier: 1,
  },
  monsterIndex: initialMonsterIndex(),
  lastEvent: "The entrance is holding its breath.",
  eventSerial: 0,
});

const monsterForEncounter = (seed: number, encounterNumber: number): MonsterProfile => {
  if (encounterNumber === 1) return HORROR_CORRIDOR_MONSTERS[0];
  const index = Math.floor(hashUnit(seed, encounterNumber * 7919) * HORROR_CORRIDOR_MONSTERS.length);
  return HORROR_CORRIDOR_MONSTERS[index] ?? HORROR_CORRIDOR_MONSTERS[0];
};

const profileFor = (monsterId: string): MonsterProfile =>
  HORROR_CORRIDOR_MONSTERS.find((monster) => monster.id === monsterId) ??
  HORROR_CORRIDOR_MONSTERS[0];

const markMonsterSeen = (
  index: readonly MonsterIndexEntrySnapshot[],
  monsterId: string,
  encounterNumber: number,
): readonly MonsterIndexEntrySnapshot[] =>
  index.map((entry) =>
    entry.id === monsterId
      ? {
          ...entry,
          knowledge: promoteKnowledge(entry.knowledge, "seen"),
          encounters: entry.encounters + 1,
          firstSeenAtEncounter: entry.firstSeenAtEncounter ?? encounterNumber,
        }
      : entry,
  );

const markMonsterSurvived = (
  index: readonly MonsterIndexEntrySnapshot[],
  monsterId: string,
  encounterNumber: number,
  fullScareWitnessed: boolean,
): readonly MonsterIndexEntrySnapshot[] =>
  index.map((entry) => {
    if (entry.id !== monsterId) return entry;
    const knowledge = fullScareWitnessed ? "collected" : "studied";
    return {
      ...entry,
      knowledge: promoteKnowledge(entry.knowledge, knowledge),
      scaresSurvived: entry.scaresSurvived + (fullScareWitnessed ? 1 : 0),
      collectedAtEncounter:
        fullScareWitnessed && entry.collectedAtEncounter === null
          ? encounterNumber
          : entry.collectedAtEncounter,
    };
  });

const cueIntervalMs = (
  seed: number,
  encounter: StalkerEncounterSnapshot,
  cueFrequencyBonus: number,
): number => {
  const distanceFactor = clamp(encounter.distance / 20, 0, 1);
  const irregularity = hashUnit(seed, encounter.audioCue.serial * 3571 + encounter.encounterNumber * 101);
  const base = 650 + distanceFactor * 1_850 + irregularity * 420;
  return Math.max(420, base * (1 - clamp(cueFrequencyBonus, 0, 0.45)));
};

const nextAudioCue = (
  seed: number,
  encounter: StalkerEncounterSnapshot,
  bearingRadians: number,
  distance: number,
  cueFrequencyBonus: number,
): StalkerEncounterSnapshot["audioCue"] => ({
  serial: encounter.audioCue.serial + 1,
  kind: profileFor(encounter.monsterId).cueKind,
  pan: clamp(bearingRadians / (Math.PI * 0.5), -1, 1),
  intensity: clamp(1.08 - distance / 22, 0.18, 1),
  nextInMs: cueIntervalMs(
    seed,
    {
      ...encounter,
      distance,
      bearingRadians,
      audioCue: {
        ...encounter.audioCue,
        serial: encounter.audioCue.serial + 1,
      },
    },
    cueFrequencyBonus,
  ),
});

const startEncounter = (
  state: EndlessExpeditionSnapshot,
  seed: number,
  playerYaw: number,
): EndlessExpeditionSnapshot => {
  const encounterNumber = state.encountersSurvived + 1;
  const buildingNumber = state.buildingsCrossed + 1;
  const monster = monsterForEncounter(seed, encounterNumber);
  const sideOffset = (hashUnit(seed, encounterNumber * 1543) - 0.5) * 1.1;
  const worldAngle = normalizeAngle(playerYaw + Math.PI + sideOffset);
  const bearingRadians = normalizeAngle(playerYaw - worldAngle);
  const encounter: StalkerEncounterSnapshot = {
    id: `encounter-${encounterNumber}-${monster.id}`,
    encounterNumber,
    buildingNumber,
    monsterId: monster.id,
    state: "approaching",
    worldAngle,
    bearingRadians,
    distance: monster.initialDistance,
    closestDistance: monster.initialDistance,
    beamContact: false,
    beamHoldMs: 0,
    fullScareWitnessed: false,
    blackoutRemainingMs: 0,
    lastChanceRemainingMs: 0,
    jumpscareRemainingMs: 0,
    audioCue: {
      serial: 1,
      kind: monster.cueKind,
      pan: clamp(bearingRadians / (Math.PI * 0.5), -1, 1),
      intensity: 0.24,
      nextInMs: 1_100,
    },
  };

  return {
    ...state,
    buildingNumber,
    distanceSinceEncounter: 0,
    activeEncounter: encounter,
    monsterIndex: markMonsterSeen(state.monsterIndex, monster.id, encounterNumber),
    lastEvent: `${monster.name} entered Building ${buildingNumber}. Listen before you look.`,
    eventSerial: state.eventSerial + 1,
  };
};

const offerCatalog: Readonly<Record<RoomOfferKind, Omit<RoomOfferSnapshot, "id" | "kind" | "claimed">>> =
  Object.freeze({
    "fresh-cell": Object.freeze({
      title: "Fresh Cell",
      description: "The flashlight beam widens slightly.",
    }),
    "silver-bell": Object.freeze({
      title: "Silver Bell",
      description: "Monster signs repeat more often.",
    }),
    "red-thread": Object.freeze({
      title: "Red Thread",
      description: "The final response window holds a little longer.",
    }),
    "salt-chalk": Object.freeze({
      title: "Salt Chalk",
      description: "Approaching monsters lose a little speed.",
    }),
  });

const createRoomOffer = (seed: number, encounterNumber: number): RoomOfferSnapshot => {
  const kinds = Object.keys(offerCatalog) as RoomOfferKind[];
  const kind = kinds[Math.floor(hashUnit(seed, encounterNumber * 6211) * kinds.length)] ?? "fresh-cell";
  return {
    id: `offer-${encounterNumber}-${kind}`,
    kind,
    ...offerCatalog[kind],
    claimed: false,
  };
};

const resolveEncounter = (
  state: EndlessExpeditionSnapshot,
  seed: number,
  encounter: StalkerEncounterSnapshot,
): EndlessExpeditionSnapshot => {
  const monster = profileFor(encounter.monsterId);
  const encountersSurvived = state.encountersSurvived + 1;
  const collected = encounter.fullScareWitnessed;
  return {
    ...state,
    encountersSurvived,
    buildingsCrossed: Math.max(state.buildingsCrossed, encounter.buildingNumber),
    distanceSinceEncounter: 0,
    nextEncounterInMeters: 15 + hashUnit(seed, encountersSurvived * 3253) * 10,
    activeEncounter: null,
    roomOffer: createRoomOffer(seed, encounter.encounterNumber),
    flashlight: {
      ...state.flashlight,
      mode: "steady",
      intensity: 1,
      flickerRemainingMs: 0,
      nextFlickerInMs: 3_600 + hashUnit(seed, encountersSurvived * 4409) * 4_200,
    },
    monsterIndex: markMonsterSurvived(
      state.monsterIndex,
      encounter.monsterId,
      encounter.encounterNumber,
      collected,
    ),
    lastEvent: collected
      ? `${monster.name} was collected after its full scare. Building ${encounter.buildingNumber} was survived.`
      : `${monster.name} was repelled early. Its Index record is still incomplete.`,
    eventSerial: state.eventSerial + 1,
  };
};

const advanceFlicker = (
  state: EndlessExpeditionSnapshot,
  seed: number,
  deltaMs: number,
): EndlessExpeditionSnapshot["flashlight"] => {
  if (state.flashlight.mode === "blackout") return state.flashlight;

  if (state.activeEncounter?.state === "last-chance") {
    return {
      ...state.flashlight,
      mode: "steady",
      intensity: 1,
      flickerRemainingMs: 0,
    };
  }

  if (state.flashlight.flickerRemainingMs > 0) {
    const remaining = Math.max(0, state.flashlight.flickerRemainingMs - deltaMs);
    return {
      ...state.flashlight,
      mode: remaining > 0 ? "flickering" : "steady",
      intensity: remaining > 0 ? 0.32 : 1,
      flickerRemainingMs: remaining,
      nextFlickerInMs:
        remaining > 0
          ? state.flashlight.nextFlickerInMs
          : 3_800 + hashUnit(seed, state.eventSerial * 2017 + 83) * 4_600,
    };
  }

  const nextFlickerInMs = state.flashlight.nextFlickerInMs - deltaMs;
  if (nextFlickerInMs <= 0) {
    return {
      ...state.flashlight,
      mode: "flickering",
      intensity: 0.32,
      flickerRemainingMs: 240 + hashUnit(seed, state.eventSerial * 733 + 17) * 520,
      nextFlickerInMs: 0,
    };
  }

  return {
    ...state.flashlight,
    mode: "steady",
    intensity: 1,
    nextFlickerInMs,
  };
};

const beginBlackout = (
  state: EndlessExpeditionSnapshot,
  encounter: StalkerEncounterSnapshot,
): EndlessExpeditionSnapshot => {
  const monster = profileFor(encounter.monsterId);
  return {
    ...state,
    activeEncounter: {
      ...encounter,
      state: "blackout",
      distance: BLACKOUT_DISTANCE_METERS,
      closestDistance: Math.min(encounter.closestDistance, BLACKOUT_DISTANCE_METERS),
      beamContact: false,
      beamHoldMs: 0,
      fullScareWitnessed: true,
      blackoutRemainingMs: FORCED_BLACKOUT_MS,
      audioCue: {
        ...encounter.audioCue,
        serial: encounter.audioCue.serial + 1,
        intensity: 1,
        nextInMs: 520,
      },
    },
    flashlight: {
      ...state.flashlight,
      mode: "blackout",
      intensity: 0,
      flickerRemainingMs: 0,
    },
    lastEvent: `${monster.name} reached you. The flashlight is gone for three seconds.`,
    eventSerial: state.eventSerial + 1,
  };
};

const beginLastChance = (
  state: EndlessExpeditionSnapshot,
  seed: number,
  encounter: StalkerEncounterSnapshot,
  playerYaw: number,
): EndlessExpeditionSnapshot => {
  const monster = profileFor(encounter.monsterId);
  const worldAngle = normalizeAngle(encounter.worldAngle + monster.blackoutTurnRadians);
  const bearingRadians = normalizeAngle(playerYaw - worldAngle);
  return {
    ...state,
    activeEncounter: {
      ...encounter,
      state: "last-chance",
      worldAngle,
      bearingRadians,
      distance: 3.4,
      beamContact: false,
      beamHoldMs: 0,
      blackoutRemainingMs: 0,
      lastChanceRemainingMs: Math.min(9_500, monster.lastChanceMs + state.boons.lastChanceBonusMs),
      audioCue: nextAudioCue(
        seed,
        encounter,
        bearingRadians,
        3.4,
        state.boons.cueFrequencyBonus,
      ),
    },
    flashlight: {
      ...state.flashlight,
      mode: "steady",
      intensity: 1,
      flickerRemainingMs: 0,
    },
    lastEvent: `The beam returned. Find ${monster.name} before the last chance closes.`,
    eventSerial: state.eventSerial + 1,
  };
};

const beginJumpscare = (
  state: EndlessExpeditionSnapshot,
  encounter: StalkerEncounterSnapshot,
  playerYaw: number,
): EndlessExpeditionSnapshot => ({
  ...state,
  phase: "jumpscare",
  activeEncounter: {
    ...encounter,
    state: "jumpscare",
    worldAngle: playerYaw,
    bearingRadians: 0,
    distance: 0.72,
    beamContact: false,
    lastChanceRemainingMs: 0,
    jumpscareRemainingMs: JUMPSCARE_IMPACT_MS,
  },
  flashlight: {
    ...state.flashlight,
    mode: "blackout",
    intensity: 0,
    flickerRemainingMs: 0,
  },
  lastEvent: `${profileFor(encounter.monsterId).name} completed the capture.`,
  eventSerial: state.eventSerial + 1,
});

const advanceEncounter = (
  state: EndlessExpeditionSnapshot,
  seed: number,
  deltaMs: number,
  playerYaw: number,
): EndlessExpeditionSnapshot => {
  const encounter = state.activeEncounter;
  if (!encounter) return state;
  const monster = profileFor(encounter.monsterId);
  const deltaSeconds = deltaMs / 1000;

  if (encounter.state === "blackout") {
    const remaining = Math.max(0, encounter.blackoutRemainingMs - deltaMs);
    let audioCue = {
      ...encounter.audioCue,
      nextInMs: encounter.audioCue.nextInMs - deltaMs,
    };
    if (audioCue.nextInMs <= 0) {
      audioCue = nextAudioCue(
        seed,
        { ...encounter, audioCue },
        encounter.bearingRadians,
        encounter.distance,
        state.boons.cueFrequencyBonus,
      );
    }
    if (remaining <= 0) {
      return beginLastChance(state, seed, { ...encounter, audioCue }, playerYaw);
    }
    return {
      ...state,
      activeEncounter: {
        ...encounter,
        blackoutRemainingMs: remaining,
        audioCue,
      },
    };
  }

  if (encounter.state === "jumpscare") {
    const remaining = Math.max(0, encounter.jumpscareRemainingMs - deltaMs);
    if (remaining <= 0) {
      return {
        ...state,
        phase: "caught",
        activeEncounter: {
          ...encounter,
          jumpscareRemainingMs: 0,
        },
        lastEvent: `Caught by ${monster.name} after ${state.encountersSurvived} survived encounters.`,
        eventSerial: state.eventSerial + 1,
      };
    }
    return {
      ...state,
      activeEncounter: {
        ...encounter,
        jumpscareRemainingMs: remaining,
      },
    };
  }

  const orbitDirection = hashUnit(seed, encounter.encounterNumber * 1091) > 0.5 ? 1 : -1;
  const orbitSpeed = encounter.state === "last-chance" ? 0.16 : 0.035;
  const worldAngle = normalizeAngle(encounter.worldAngle + orbitDirection * orbitSpeed * deltaSeconds);
  const bearingRadians = normalizeAngle(playerYaw - worldAngle);
  const beamHalfAngle = BASE_BEAM_HALF_ANGLE_RADIANS + state.boons.beamWidthBonusRadians;
  const beamContact =
    state.flashlight.mode !== "blackout" &&
    Math.abs(bearingRadians) <= beamHalfAngle;
  const approachSpeed = monster.approachSpeed * state.boons.approachSlowMultiplier;
  const distance = beamContact
    ? encounter.distance + BASE_REPEL_SPEED_METERS_PER_SECOND * deltaSeconds
    : Math.max(0, encounter.distance - approachSpeed * deltaSeconds);
  const beamHoldMs = beamContact
    ? encounter.beamHoldMs + deltaMs
    : Math.max(0, encounter.beamHoldMs - deltaMs * 0.7);
  const closestDistance = Math.min(encounter.closestDistance, distance);
  let audioCue = {
    ...encounter.audioCue,
    pan: clamp(bearingRadians / (Math.PI * 0.5), -1, 1),
    intensity: clamp(1.08 - distance / 22, 0.18, 1),
    nextInMs: encounter.audioCue.nextInMs - deltaMs,
  };
  if (audioCue.nextInMs <= 0) {
    audioCue = nextAudioCue(
      seed,
      { ...encounter, audioCue },
      bearingRadians,
      distance,
      state.boons.cueFrequencyBonus,
    );
  }

  const nextEncounter: StalkerEncounterSnapshot = {
    ...encounter,
    state:
      encounter.state === "last-chance"
        ? "last-chance"
        : beamContact
          ? "repelling"
          : "approaching",
    worldAngle,
    bearingRadians,
    distance,
    closestDistance,
    beamContact,
    beamHoldMs,
    lastChanceRemainingMs:
      encounter.state === "last-chance"
        ? Math.max(0, encounter.lastChanceRemainingMs - deltaMs)
        : encounter.lastChanceRemainingMs,
    audioCue,
  };

  if (beamHoldMs >= monster.beamHoldMs) {
    return resolveEncounter(state, seed, nextEncounter);
  }
  if (encounter.state === "last-chance" && nextEncounter.lastChanceRemainingMs <= 0) {
    return beginJumpscare(state, nextEncounter, playerYaw);
  }
  if (encounter.state !== "last-chance" && distance <= BLACKOUT_DISTANCE_METERS) {
    return beginBlackout(state, nextEncounter);
  }

  return {
    ...state,
    activeEncounter: nextEncounter,
  };
};

export const advanceEndlessExpedition = (
  state: EndlessExpeditionSnapshot,
  seed: number,
  input: AdvanceEndlessExpeditionInput,
): EndlessExpeditionSnapshot => {
  if (state.phase === "caught") return state;
  const deltaMs = clamp(input.deltaMs, 0, MAX_FRAME_DELTA_MS);
  const travelledMeters = Math.max(0, input.travelledMeters);

  let next: EndlessExpeditionSnapshot = {
    ...state,
    elapsedMs: state.elapsedMs + deltaMs,
    distanceTravelled: state.distanceTravelled + travelledMeters,
    flashlight: advanceFlicker(state, seed, deltaMs),
  };

  if (state.phase === "jumpscare") {
    return advanceEncounter(next, seed, deltaMs, input.playerYaw);
  }

  if (state.phase === "intro") {
    const introDistanceTravelled = state.introDistanceTravelled + travelledMeters;
    next = {
      ...next,
      introDistanceTravelled,
    };
    if (introDistanceTravelled < INTRO_DISTANCE_METERS) return next;
    return {
      ...next,
      phase: "exploring",
      distanceSinceEncounter: 0,
      lastEvent: "The entrance fell behind. The endless delve has begun.",
      eventSerial: state.eventSerial + 1,
    };
  }

  next = {
    ...next,
    distanceSinceEncounter: state.distanceSinceEncounter + travelledMeters,
  };

  if (!next.activeEncounter && next.distanceSinceEncounter >= next.nextEncounterInMeters) {
    return startEncounter(next, seed, input.playerYaw);
  }

  return advanceEncounter(next, seed, deltaMs, input.playerYaw);
};

export const claimRoomOffer = (
  state: EndlessExpeditionSnapshot,
): EndlessExpeditionSnapshot => {
  const offer = state.roomOffer;
  if (!offer || offer.claimed || state.phase === "caught") return state;

  const boons = { ...state.boons };
  if (offer.kind === "fresh-cell") boons.beamWidthBonusRadians += 0.025;
  if (offer.kind === "silver-bell") boons.cueFrequencyBonus = Math.min(0.45, boons.cueFrequencyBonus + 0.08);
  if (offer.kind === "red-thread") boons.lastChanceBonusMs = Math.min(1_500, boons.lastChanceBonusMs + 300);
  if (offer.kind === "salt-chalk") boons.approachSlowMultiplier = Math.max(0.72, boons.approachSlowMultiplier * 0.94);

  return {
    ...state,
    roomOffer: {
      ...offer,
      claimed: true,
    },
    boons,
    lastEvent: `${offer.title} was taken from the room.`,
    eventSerial: state.eventSerial + 1,
  };
};

export const describeMonsterBearing = (bearingRadians: number): string => {
  const angle = normalizeAngle(bearingRadians);
  const absolute = Math.abs(angle);
  if (absolute <= Math.PI / 8) return "ahead";
  if (absolute >= (Math.PI * 7) / 8) return "behind";
  const side = angle > 0 ? "right" : "left";
  if (absolute <= (Math.PI * 3) / 8) return `ahead-${side}`;
  if (absolute <= (Math.PI * 5) / 8) return side;
  return `behind-${side}`;
};
