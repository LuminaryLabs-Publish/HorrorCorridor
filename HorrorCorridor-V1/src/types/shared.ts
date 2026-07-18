import type { CubeColorKey } from "@/lib/colors";

export type CellGridPosition = Readonly<{
  x: number;
  y: number;
}>;

export type WorldPosition = Readonly<{
  x: number;
  y: number;
  z: number;
}>;

export type MazeCellSnapshot = Readonly<{
  id: string;
  grid: CellGridPosition;
  value: 0 | 1 | 2 | 3 | 4;
}>;

export type CubeStateId = string;
export type PlayerId = string;

export type ReplicatedCubeState = "ground" | "held" | "placed";

export type ReplicatedCubeSnapshot = Readonly<{
  id: CubeStateId;
  color: CubeColorKey;
  position: WorldPosition;
  state: ReplicatedCubeState;
  ownerId: PlayerId | null;
}>;

export type ConnectionState = "connecting" | "connected" | "reconnecting" | "disconnected";

export type PlayerSnapshot = Readonly<{
  id: PlayerId;
  color: string;
  position: WorldPosition;
  rotationY: number;
  pitch: number;
}>;

export type LobbyPlayer = Readonly<{
  id: PlayerId;
  name: string;
  isHost: boolean;
  ready: boolean;
  connectionState: ConnectionState;
}>;

export type RoomPhase = "idle" | "lobby" | "starting" | "active" | "ending" | "closed";

export type RoomState = Readonly<{
  roomId: string;
  joinCode: string | null;
  hostId: PlayerId | null;
  phase: RoomPhase;
  maxPlayers: number;
  players: readonly LobbyPlayer[];
  createdAt: number;
  updatedAt: number;
}>;

export type ReplicatedAnomalySnapshot = Readonly<{
  sequence: readonly CubeColorKey[];
  slots: readonly (CubeStateId | null)[];
}>;

export type OozeTrailItem = Readonly<{
  x: number;
  z: number;
  y: number;
  rotY: number;
  scale: number;
}>;

export type ExpeditionPhase = "intro" | "exploring" | "jumpscare" | "caught";

export type FlashlightMode = "steady" | "flickering" | "blackout";

export type MonsterKnowledge = "unknown" | "seen" | "studied" | "collected";

export type MonsterCueKind = "footstep" | "knock" | "scrape" | "breath";

export type MonsterIndexEntrySnapshot = Readonly<{
  id: string;
  name: string;
  sign: string;
  scare: string;
  response: string;
  knowledge: MonsterKnowledge;
  encounters: number;
  scaresSurvived: number;
  firstSeenAtEncounter: number | null;
  collectedAtEncounter: number | null;
}>;

export type MonsterAudioCueSnapshot = Readonly<{
  serial: number;
  kind: MonsterCueKind;
  pan: number;
  intensity: number;
  nextInMs: number;
}>;

export type StalkerEncounterState =
  | "approaching"
  | "repelling"
  | "blackout"
  | "last-chance"
  | "jumpscare";

export type StalkerEncounterSnapshot = Readonly<{
  id: string;
  encounterNumber: number;
  buildingNumber: number;
  monsterId: string;
  state: StalkerEncounterState;
  worldAngle: number;
  bearingRadians: number;
  distance: number;
  closestDistance: number;
  beamContact: boolean;
  beamHoldMs: number;
  fullScareWitnessed: boolean;
  blackoutRemainingMs: number;
  lastChanceRemainingMs: number;
  jumpscareRemainingMs: number;
  audioCue: MonsterAudioCueSnapshot;
}>;

export type RoomOfferKind = "fresh-cell" | "silver-bell" | "red-thread" | "salt-chalk";

export type RoomOfferSnapshot = Readonly<{
  id: string;
  kind: RoomOfferKind;
  title: string;
  description: string;
  claimed: boolean;
}>;

export type ExpeditionBoonsSnapshot = Readonly<{
  beamWidthBonusRadians: number;
  cueFrequencyBonus: number;
  lastChanceBonusMs: number;
  approachSlowMultiplier: number;
}>;

export type EndlessExpeditionSnapshot = Readonly<{
  phase: ExpeditionPhase;
  elapsedMs: number;
  distanceTravelled: number;
  introDistanceTravelled: number;
  buildingNumber: number;
  buildingsCrossed: number;
  encountersSurvived: number;
  distanceSinceEncounter: number;
  nextEncounterInMeters: number;
  activeEncounter: StalkerEncounterSnapshot | null;
  roomOffer: RoomOfferSnapshot | null;
  flashlight: Readonly<{
    mode: FlashlightMode;
    intensity: number;
    flickerRemainingMs: number;
    nextFlickerInMs: number;
  }>;
  boons: ExpeditionBoonsSnapshot;
  monsterIndex: readonly MonsterIndexEntrySnapshot[];
  lastEvent: string;
  eventSerial: number;
}>;

export type GameScreenState = "loading" | "lobby" | "playing" | "paused" | "victory" | "failure";

export type AppScreenState =
  | "START"
  | "LOADING"
  | "JOIN_MENU"
  | "LOBBY_HOST"
  | "LOBBY_CLIENT"
  | "PLAYING"
  | "RECOVERING"
  | "PAUSED"
  | "COMPLETED";

export type ReplicatedGameSnapshot = Readonly<{
  gameId: string;
  seed: number;
  room: RoomState;
  appState: AppScreenState;
  gameState: GameScreenState;
  tick: number;
  timestampMs: number;
  maze: readonly MazeCellSnapshot[];
  players: readonly PlayerSnapshot[];
  cubes: readonly ReplicatedCubeSnapshot[];
  anomaly: ReplicatedAnomalySnapshot;
  expedition: EndlessExpeditionSnapshot;
  oozeTrail: readonly OozeTrailItem[];
  oozeLevel: number;
}>;

export type NetworkProtocolVersion = 2;

export type NetworkEnvelope<TType extends string, TPayload> = Readonly<{
  type: TType;
  version: NetworkProtocolVersion;
  senderId: PlayerId;
  roomId: string;
  timestampMs: number;
  requestId?: string;
  payload: TPayload;
}>;

export type ClientHelloMessage = NetworkEnvelope<
  "client/hello",
  {
    name: string;
    preferredRole?: "host" | "client";
  }
>;

export type ClientJoinRoomMessage = NetworkEnvelope<
  "client/join-room",
  {
    joinCode: string;
  }
>;

export type ClientLeaveRoomMessage = NetworkEnvelope<"client/leave-room", Record<string, never>>;

export type ClientInputMessage = NetworkEnvelope<
  "client/input",
  {
    sequence: number;
    moveForward: number;
    moveStrafe: number;
    lookYaw: number;
    sprint: boolean;
    interact: boolean;
  }
>;

export type ClientReadyMessage = NetworkEnvelope<
  "client/ready",
  {
    ready: boolean;
  }
>;

export type ClientActionMessage = NetworkEnvelope<
  "client/action",
  {
    action:
      | "toggle-ready"
      | "request-respawn"
      | "request-sync"
      | "interact"
      | "cancel";
  }
>;

export type HostRoomStateMessage = NetworkEnvelope<
  "host/room-state",
  {
    room: RoomState;
  }
>;

export type HostSnapshotMessage = NetworkEnvelope<
  "host/snapshot",
  {
    snapshot: ReplicatedGameSnapshot;
  }
>;

export type HostKickMessage = NetworkEnvelope<
  "host/kick",
  {
    reason: string;
  }
>;

export type HostPingMessage = NetworkEnvelope<"host/ping", { nonce: string }>;

export type HostPongMessage = NetworkEnvelope<"host/pong", { nonce: string }>;

export type NetworkMessage =
  | ClientHelloMessage
  | ClientJoinRoomMessage
  | ClientLeaveRoomMessage
  | ClientInputMessage
  | ClientReadyMessage
  | ClientActionMessage
  | HostRoomStateMessage
  | HostSnapshotMessage
  | HostKickMessage
  | HostPingMessage
  | HostPongMessage;
