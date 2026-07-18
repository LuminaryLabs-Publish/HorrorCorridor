import { create } from "zustand";

import type { LobbyPlayer, PlayerId, RoomState } from "@/types/shared";
import {
  beginSharedRecovery,
  completeSharedRecovery,
  createSharedRecoveryState,
  markSharedConnection,
  recordSharedDisconnection,
  type BeginSharedRecoveryInput,
  type CompleteSharedRecoveryInput,
  type RecordSharedDisconnectionInput,
  type SharedRecoveryState,
} from "@/features/networking/domain/sharedRecovery";

export type SessionMode = "solo" | "host" | "client";

export type SessionConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected"
  | "error";

export type PeerIdentity = Readonly<{
  peerId: string | null;
  playerId: PlayerId | null;
  displayName: string;
  hostPeerId: string | null;
}>;

export type SessionState = Readonly<{
  room: RoomState | null;
  peerIdentity: PeerIdentity;
  sessionMode: SessionMode;
  connectionStatus: SessionConnectionStatus;
  lobbyPlayers: readonly LobbyPlayer[];
  recovery: SharedRecoveryState;
}>;

export type SessionActions = Readonly<{
  setRoom: (room: RoomState | null) => void;
  setPeerIdentity: (peerIdentity: PeerIdentity) => void;
  updatePeerIdentity: (patch: Partial<PeerIdentity>) => void;
  setSessionMode: (sessionMode: SessionMode) => void;
  setConnectionStatus: (connectionStatus: SessionConnectionStatus) => void;
  setLobbyPlayers: (lobbyPlayers: readonly LobbyPlayer[]) => void;
  upsertLobbyPlayer: (player: LobbyPlayer) => void;
  removeLobbyPlayer: (playerId: PlayerId) => void;
  markRecoveryConnection: (connection: "idle" | "connected") => void;
  recordRecoveryDisconnection: (input: RecordSharedDisconnectionInput) => void;
  beginRecovery: (input: BeginSharedRecoveryInput) => void;
  completeRecovery: (input: CompleteSharedRecoveryInput) => void;
  resetRecovery: () => void;
  clearSession: () => void;
}>;

export type SessionStore = SessionState & SessionActions;

const initialState: SessionState = {
  room: null,
  peerIdentity: {
    peerId: null,
    playerId: null,
    displayName: "",
    hostPeerId: null,
  },
  sessionMode: "client",
  connectionStatus: "idle",
  lobbyPlayers: [],
  recovery: createSharedRecoveryState(),
};

export const useSessionStore = create<SessionStore>((set) => ({
  ...initialState,
  setRoom: (room) =>
    set(() => ({
      room,
      lobbyPlayers: room?.players ?? [],
    })),
  setPeerIdentity: (peerIdentity) =>
    set(() => ({
      peerIdentity,
    })),
  updatePeerIdentity: (patch) =>
    set((state) => ({
      peerIdentity: {
        ...state.peerIdentity,
        ...patch,
      },
    })),
  setSessionMode: (sessionMode) =>
    set(() => ({
      sessionMode,
    })),
  setConnectionStatus: (connectionStatus) =>
    set(() => ({
      connectionStatus,
    })),
  setLobbyPlayers: (lobbyPlayers) =>
    set((state) => ({
      lobbyPlayers,
      room: state.room
        ? {
            ...state.room,
            players: lobbyPlayers,
            updatedAt: Date.now(),
          }
        : state.room,
    })),
  upsertLobbyPlayer: (player) =>
    set((state) => {
      const nextPlayers = state.lobbyPlayers.some((current) => current.id === player.id)
        ? state.lobbyPlayers.map((current) => (current.id === player.id ? player : current))
        : [...state.lobbyPlayers, player];

      return {
        lobbyPlayers: nextPlayers,
        room: state.room
          ? {
              ...state.room,
              players: nextPlayers,
              updatedAt: Date.now(),
            }
          : state.room,
      };
    }),
  removeLobbyPlayer: (playerId) =>
    set((state) => {
      const nextPlayers = state.lobbyPlayers.filter((player) => player.id !== playerId);

      return {
        lobbyPlayers: nextPlayers,
        room: state.room
          ? {
              ...state.room,
              players: nextPlayers,
              updatedAt: Date.now(),
            }
          : state.room,
      };
    }),
  markRecoveryConnection: (connection) =>
    set((state) => ({
      recovery: markSharedConnection(state.recovery, connection),
    })),
  recordRecoveryDisconnection: (input) =>
    set((state) => ({
      recovery: recordSharedDisconnection(state.recovery, input),
    })),
  beginRecovery: (input) =>
    set((state) => ({
      recovery: beginSharedRecovery(state.recovery, input),
    })),
  completeRecovery: (input) =>
    set((state) => ({
      recovery: completeSharedRecovery(state.recovery, input),
    })),
  resetRecovery: () =>
    set(() => ({
      recovery: createSharedRecoveryState(),
    })),
  clearSession: () =>
    set(() => ({
      ...initialState,
    })),
}));
