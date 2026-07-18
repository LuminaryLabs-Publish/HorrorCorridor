import type { ReplicatedGameSnapshot, WorldPosition } from "@/types/shared";

export type SharedConnectionState =
  | "idle"
  | "connected"
  | "disconnected"
  | "reconnecting"
  | "restored";

export type SharedRestoredPlace = Readonly<{
  roomId: string;
  gameId: string;
  authoritativeTick: number;
  buildingNumber: number;
  encountersSurvived: number;
  playerPosition: WorldPosition | null;
  recordedAtMs: number;
}>;

export type SharedDisconnection = Readonly<{
  reason: string;
  disconnectedAtMs: number;
  lastKnownPlace: SharedRestoredPlace | null;
}>;

export type SharedRecoveryAttempt = Readonly<{
  requestId: string;
  hostPeerId: string;
  requestedAtMs: number;
  completedAtMs: number | null;
  authoritativeTick: number | null;
}>;

export type SharedRecoveryHistoryEntry = Readonly<{
  kind: "disconnected" | "reconnecting" | "restored";
  atMs: number;
  requestId: string | null;
  authoritativeTick: number | null;
}>;

export type SharedRecoveryState = Readonly<{
  connection: SharedConnectionState;
  disconnection: SharedDisconnection | null;
  recovery: SharedRecoveryAttempt | null;
  restoredPlace: SharedRestoredPlace | null;
  recoveryHistory: readonly SharedRecoveryHistoryEntry[];
}>;

export type RecordSharedDisconnectionInput = Readonly<{
  reason: string;
  disconnectedAtMs: number;
  playerId: string | null;
  snapshot: ReplicatedGameSnapshot | null;
}>;

export type BeginSharedRecoveryInput = Readonly<{
  requestId: string;
  hostPeerId: string;
  requestedAtMs: number;
}>;

export type CompleteSharedRecoveryInput = Readonly<{
  requestId: string;
  recoveredAtMs: number;
  playerId: string | null;
  snapshot: ReplicatedGameSnapshot;
}>;

const MAX_RECOVERY_HISTORY = 12;

const appendHistory = (
  history: readonly SharedRecoveryHistoryEntry[],
  entry: SharedRecoveryHistoryEntry,
): readonly SharedRecoveryHistoryEntry[] =>
  Object.freeze([...history, Object.freeze(entry)].slice(-MAX_RECOVERY_HISTORY));

const clonePosition = (position: WorldPosition): WorldPosition => ({
  x: position.x,
  y: position.y,
  z: position.z,
});

const placeFromSnapshot = (
  snapshot: ReplicatedGameSnapshot,
  playerId: string | null,
  recordedAtMs: number,
): SharedRestoredPlace => {
  const player =
    snapshot.players.find((entry) => entry.id === playerId) ?? null;

  return Object.freeze({
    roomId: snapshot.room.roomId,
    gameId: snapshot.gameId,
    authoritativeTick: snapshot.tick,
    buildingNumber: snapshot.expedition.buildingNumber,
    encountersSurvived: snapshot.expedition.encountersSurvived,
    playerPosition: player ? clonePosition(player.position) : null,
    recordedAtMs,
  });
};

export const createSharedRecoveryState = (): SharedRecoveryState =>
  Object.freeze({
    connection: "idle",
    disconnection: null,
    recovery: null,
    restoredPlace: null,
    recoveryHistory: Object.freeze([]),
  });

export const markSharedConnection = (
  state: SharedRecoveryState,
  connection: Extract<SharedConnectionState, "idle" | "connected">,
): SharedRecoveryState =>
  Object.freeze({
    ...state,
    connection,
  });

export const recordSharedDisconnection = (
  state: SharedRecoveryState,
  input: RecordSharedDisconnectionInput,
): SharedRecoveryState => {
  if (state.connection === "disconnected") {
    return state;
  }

  const lastKnownPlace = input.snapshot
    ? placeFromSnapshot(input.snapshot, input.playerId, input.disconnectedAtMs)
    : state.restoredPlace;

  return Object.freeze({
    connection: "disconnected",
    disconnection: Object.freeze({
      reason: input.reason,
      disconnectedAtMs: input.disconnectedAtMs,
      lastKnownPlace,
    }),
    recovery: null,
    restoredPlace: state.restoredPlace,
    recoveryHistory: appendHistory(state.recoveryHistory, {
      kind: "disconnected",
      atMs: input.disconnectedAtMs,
      requestId: null,
      authoritativeTick: lastKnownPlace?.authoritativeTick ?? null,
    }),
  });
};

export const beginSharedRecovery = (
  state: SharedRecoveryState,
  input: BeginSharedRecoveryInput,
): SharedRecoveryState => {
  if (!input.requestId.trim() || !input.hostPeerId.trim()) {
    throw new Error("Shared recovery requires request and host identities.");
  }

  return Object.freeze({
    ...state,
    connection: "reconnecting",
    recovery: Object.freeze({
      requestId: input.requestId,
      hostPeerId: input.hostPeerId,
      requestedAtMs: input.requestedAtMs,
      completedAtMs: null,
      authoritativeTick: null,
    }),
    recoveryHistory: appendHistory(state.recoveryHistory, {
      kind: "reconnecting",
      atMs: input.requestedAtMs,
      requestId: input.requestId,
      authoritativeTick:
        state.disconnection?.lastKnownPlace?.authoritativeTick ?? null,
    }),
  });
};

export const completeSharedRecovery = (
  state: SharedRecoveryState,
  input: CompleteSharedRecoveryInput,
): SharedRecoveryState => {
  const activeRequestId = state.recovery?.requestId ?? input.requestId;
  const restoredPlace = placeFromSnapshot(
    input.snapshot,
    input.playerId,
    input.recoveredAtMs,
  );

  return Object.freeze({
    connection: "restored",
    disconnection: state.disconnection,
    recovery: Object.freeze({
      requestId: activeRequestId,
      hostPeerId: state.recovery?.hostPeerId ?? input.snapshot.room.hostId ?? "host",
      requestedAtMs: state.recovery?.requestedAtMs ?? input.recoveredAtMs,
      completedAtMs: input.recoveredAtMs,
      authoritativeTick: input.snapshot.tick,
    }),
    restoredPlace,
    recoveryHistory: appendHistory(state.recoveryHistory, {
      kind: "restored",
      atMs: input.recoveredAtMs,
      requestId: activeRequestId,
      authoritativeTick: input.snapshot.tick,
    }),
  });
};
