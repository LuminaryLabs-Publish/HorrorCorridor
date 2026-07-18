"use client";

import { useEffect, useRef, useState } from "react";

import type { LobbyPlayer, PlayerSnapshot, RoomState } from "@/types/shared";

import { beginSoloExpedition } from "@/features/game-state/domain/beginExpedition";
import { createInitialGameState } from "@/features/game-state/domain/createInitialGameState";
import { useRuntimeStore } from "@/features/game-state/store/runtimeStore";
import { useSessionStore } from "@/features/game-state/store/sessionStore";
import { useUiStore } from "@/features/game-state/store/uiStore";
import { createClient } from "@/features/networking/peer/createClient";
import { createHost } from "@/features/networking/peer/createHost";
import type { PeerTransportEvent } from "@/features/networking/peer/peerEvents";
import type {
  ClientTransportAdapter,
  HostTransportAdapter,
  PeerTransportStatus,
} from "@/features/networking/peer/peerTypes";
import { PROTOCOL_MESSAGE_TYPES } from "@/features/networking/protocol/messageTypes";
import {
  createFullSyncMessage,
  createHostStartMessage,
  createInteractionRequestMessage,
  createLobbyEventMessage,
} from "@/features/networking/protocol/syncSnapshot";

import CompleteScreen from "@/components/menus/CompleteScreen";
import GameCanvas from "./GameCanvas";
import HUDOverlay from "@/components/hud/HUDOverlay";
import JoinMenu from "@/components/menus/JoinMenu";
import LoadingScreen from "@/components/menus/LoadingScreen";
import LobbyScreen from "@/components/menus/LobbyScreen";
import PauseMenu from "@/components/menus/PauseMenu";
import RecoveryScreen from "@/components/menus/RecoveryScreen";
import StartMenu from "@/components/menus/StartMenu";

const makeId = (prefix: string): string =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;

const makeJoinCode = (): string =>
  Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "X");

const makeRoomId = (): string => `room-${makeId("corridor")}`;
const RECOVERY_STATUS_MIN_MS = 240;

type HorrorCorridorSessionControl = Readonly<{
  disconnectClient: () => boolean;
  snapshot: () => Readonly<{
    screen: ReturnType<typeof useUiStore.getState>["screen"];
    connectionStatus: ReturnType<typeof useSessionStore.getState>["connectionStatus"];
    recovery: ReturnType<typeof useSessionStore.getState>["recovery"];
    sessionMode: ReturnType<typeof useSessionStore.getState>["sessionMode"];
    playerId: string | null;
    hostPeerId: string | null;
    roomId: string | null;
    gameId: string | null;
    seed: number | null;
    tick: number | null;
    gameState: string | null;
    buildingNumber: number | null;
    encountersSurvived: number | null;
    players: readonly PlayerSnapshot[];
  }>;
}>;

type HorrorCorridorSessionWindow = Window &
  typeof globalThis & {
    __HORROR_CORRIDOR_SESSION_CONTROL__?: HorrorCorridorSessionControl;
  };

const makePlayer = (
  id: string,
  name: string,
  isHost: boolean,
  ready: boolean,
  connectionState: LobbyPlayer["connectionState"] = "connected",
): LobbyPlayer => ({
  id,
  name,
  isHost,
  ready,
  connectionState,
});

const LOADING_STEPS = [
  "Maze field",
  "Terrain raycast",
  "Object kits",
  "PBR materials",
  "Lighting pass",
] as const;

const waitFrame = (): Promise<void> =>
  new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });

const makeRoomState = (input: {
  roomId: string;
  joinCode: string;
  hostId: string | null;
  players: readonly LobbyPlayer[];
}): RoomState => ({
  roomId: input.roomId,
  joinCode: input.joinCode,
  hostId: input.hostId,
  phase: "lobby",
  maxPlayers: 4,
  players: input.players,
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

export default function GameShell() {
  const transportRef = useRef<HostTransportAdapter | ClientTransportAdapter | null>(null);
  const [transport, setTransport] = useState<HostTransportAdapter | ClientTransportAdapter | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const screen = useUiStore((state) => state.screen);
  const completion = useUiStore((state) => state.completion);
  const setScreen = useUiStore((state) => state.setScreen);
  const setGameScreen = useUiStore((state) => state.setGameScreen);
  const setOverlay = useUiStore((state) => state.setOverlay);
  const setPaused = useUiStore((state) => state.setPaused);
  const setCompletion = useUiStore((state) => state.setCompletion);
  const resetUi = useUiStore((state) => state.resetUi);

  const room = useSessionStore((state) => state.room);
  const sessionMode = useSessionStore((state) => state.sessionMode);
  const connectionStatus = useSessionStore((state) => state.connectionStatus);
  const lobbyPlayers = useSessionStore((state) => state.lobbyPlayers);
  const peerIdentity = useSessionStore((state) => state.peerIdentity);
  const recovery = useSessionStore((state) => state.recovery);
  const setRoom = useSessionStore((state) => state.setRoom);
  const setPeerIdentity = useSessionStore((state) => state.setPeerIdentity);
  const setSessionMode = useSessionStore((state) => state.setSessionMode);
  const setConnectionStatus = useSessionStore((state) => state.setConnectionStatus);
  const setLobbyPlayers = useSessionStore((state) => state.setLobbyPlayers);
  const upsertLobbyPlayer = useSessionStore((state) => state.upsertLobbyPlayer);
  const removeLobbyPlayer = useSessionStore((state) => state.removeLobbyPlayer);
  const markRecoveryConnection = useSessionStore((state) => state.markRecoveryConnection);
  const beginRecovery = useSessionStore((state) => state.beginRecovery);
  const resetRecovery = useSessionStore((state) => state.resetRecovery);
  const clearSession = useSessionStore((state) => state.clearSession);

  const setAuthoritativeSnapshot = useRuntimeStore((state) => state.setAuthoritativeSnapshot);
  const setReadiness = useRuntimeStore((state) => state.setReadiness);
  const resetRuntime = useRuntimeStore((state) => state.resetRuntime);

  const toSessionConnectionStatus = (status: PeerTransportStatus) => {
    switch (status) {
      case "opening":
      case "connecting":
        return "connecting";
      case "connected":
        return "connected";
      case "reconnecting":
        return "reconnecting";
      case "closed":
        return "disconnected";
      case "error":
        return "error";
      case "idle":
      default:
        return "idle";
    }
  };

  const destroyTransport = (): void => {
    transportRef.current?.destroy();
    transportRef.current = null;
    setTransport(null);
  };

  const showRecovery = (reason: string, disconnectedAtMs: number): void => {
    const liveSession = useSessionStore.getState();
    const liveUi = useUiStore.getState();

    if (
      liveSession.sessionMode !== "client" ||
      (liveUi.screen !== "PLAYING" && liveUi.screen !== "RECOVERING")
    ) {
      return;
    }

    liveSession.recordRecoveryDisconnection({
      reason,
      disconnectedAtMs,
      playerId: liveSession.peerIdentity.playerId,
      snapshot: useRuntimeStore.getState().authoritativeSnapshot,
    });
    liveSession.setConnectionStatus("disconnected");
    liveUi.setPaused(true, "connection");
    liveUi.setScreen("RECOVERING");
    liveUi.setGameScreen("paused");
    liveUi.setOverlay({
      kind: "recovery",
      message: "Connection lost. Your last place is preserved.",
      visible: true,
    });
    useRuntimeStore.getState().setReadiness({
      simulation: true,
      rendering: true,
      networking: false,
      input: false,
    });
  };

  const handleTransportEvent = (event: PeerTransportEvent): void => {
    if (event.type === "peer/status") {
      const nextStatus = toSessionConnectionStatus(event.status);
      const liveTransport = transportRef.current;
      const hasOpenClientConnection =
        liveTransport?.role === "client" &&
        liveTransport.connections.some((connection) => connection.open);

      setConnectionStatus(nextStatus);

      if (
        event.role === "client" &&
        (event.status === "closed" || event.status === "error" || event.status === "reconnecting") &&
        !hasOpenClientConnection
      ) {
        showRecovery(event.detail ?? event.status, event.timestampMs);
      } else if (event.role === "client" && event.status === "connected") {
        const liveUi = useUiStore.getState();
        const liveRecovery = useSessionStore.getState().recovery;

        if (
          liveUi.screen !== "RECOVERING" &&
          (liveRecovery.connection === "idle" || liveRecovery.connection === "connected")
        ) {
          useSessionStore.getState().markRecoveryConnection("connected");
        }
      }
      return;
    }

    if (event.type === "peer/connection-close" && event.role === "client") {
      showRecovery(event.reason ?? "host connection closed", event.timestampMs);
      return;
    }

    if (event.type === "peer/connection-open" && event.role === "client") {
      const liveSession = useSessionStore.getState();
      const liveUi = useUiStore.getState();

      if (liveUi.screen === "RECOVERING" && liveSession.recovery.connection === "reconnecting") {
        const requestId = liveSession.recovery.recovery?.requestId ?? makeId("recovery");
        const playerId = liveSession.peerIdentity.playerId;
        const roomId = liveSession.room?.roomId;
        const clientTransport = transportRef.current;

        liveSession.setConnectionStatus("reconnecting");
        liveUi.setOverlay({
          kind: "recovery",
          message: "Host found. Restoring authoritative corridor truth.",
          visible: true,
        });

        if (playerId && roomId && clientTransport?.role === "client") {
          clientTransport.send(
            createInteractionRequestMessage({
              senderId: playerId,
              roomId,
              playerId,
              action: "request-sync",
              requestId,
              timestampMs: event.timestampMs,
            }),
          );
        }
      } else {
        if (
          liveSession.recovery.connection === "idle" ||
          liveSession.recovery.connection === "connected"
        ) {
          liveSession.markRecoveryConnection("connected");
        }
      }

      return;
    }

    if (event.type === "peer/connection-open" && event.role === "host") {
      const roomState = useSessionStore.getState().room;
      const currentPlayers = useSessionStore.getState().lobbyPlayers;
      const existingPlayer = currentPlayers.find((player) => player.id === event.remotePeerId);
      const guestCount = currentPlayers.filter((player) => !player.isHost).length;
      const nextPlayer =
        existingPlayer ??
        makePlayer(
          event.remotePeerId,
          `Guest ${guestCount + 1}`,
          false,
          false,
          "connected",
        );

      upsertLobbyPlayer({
        ...nextPlayer,
        connectionState: "connected",
      });

      const nextRoom = useSessionStore.getState().room;

      if (roomState && nextRoom && transportRef.current?.role === "host") {
        transportRef.current.broadcast(
          createLobbyEventMessage({
            senderId: nextRoom.hostId ?? nextRoom.roomId,
            roomId: nextRoom.roomId,
            room: nextRoom,
            event: "player-joined",
            player: nextPlayer,
            message: `${nextPlayer.name} joined the lobby`,
          }),
        );
      }

      return;
    }

    if (event.type === "peer/connection-close" && event.role === "host") {
      const roomState = useSessionStore.getState().room;
      const playerToRemove = useSessionStore.getState().lobbyPlayers.find(
        (player) => player.id === event.remotePeerId,
      );

      if (playerToRemove) {
        removeLobbyPlayer(playerToRemove.id);
      }

      const nextRoom = useSessionStore.getState().room;

      if (roomState && nextRoom && transportRef.current?.role === "host") {
        transportRef.current.broadcast(
          createLobbyEventMessage({
            senderId: nextRoom.hostId ?? nextRoom.roomId,
            roomId: nextRoom.roomId,
            room: nextRoom,
            event: "player-left",
            player: playerToRemove ?? undefined,
            message: `${playerToRemove?.name ?? "A player"} left the lobby`,
          }),
        );
      }

      return;
    }

    if (event.type !== "peer/message") {
      return;
    }

    if (event.message.type === PROTOCOL_MESSAGE_TYPES.START_GAME) {
      setRoom(event.message.payload.room);
      setLobbyPlayers(event.message.payload.room.players);
      updatePeerIdentityIfNeeded(event.message.payload.hostPeerId);
      setConnectionStatus("connected");
      return;
    }

    if (event.message.type === PROTOCOL_MESSAGE_TYPES.SYNC) {
      const liveSession = useSessionStore.getState();
      const liveUi = useUiStore.getState();
      const wasRecovering =
        liveUi.screen === "RECOVERING" ||
        liveSession.recovery.connection === "disconnected" ||
        liveSession.recovery.connection === "reconnecting";

      setRoom(event.message.payload.room);
      setLobbyPlayers(event.message.payload.room.players);
      setAuthoritativeSnapshot(event.message.payload.snapshot);

      if (wasRecovering && event.message.payload.snapshot.gameState === "playing") {
        const requestId =
          event.message.requestId ??
          liveSession.recovery.recovery?.requestId ??
          makeId("recovery");

        liveSession.completeRecovery({
          requestId,
          recoveredAtMs: event.timestampMs,
          playerId: liveSession.peerIdentity.playerId,
          snapshot: event.message.payload.snapshot,
        });
        liveSession.setConnectionStatus("connected");
        liveUi.setScreen("PLAYING");
        liveUi.setGameScreen("playing");
        liveUi.setPaused(false, "none");
        liveUi.setOverlay({
          kind: "none",
          message: null,
          visible: false,
        });
        setReadiness({
          simulation: true,
          rendering: true,
          networking: true,
          input: true,
        });
        return;
      }

      if (event.message.payload.snapshot.gameState === "victory") {
        setCompletion({
          status: "victory",
          message: "The corridor accepted the run.",
          atMs: event.timestampMs,
        });
        setScreen("COMPLETED");
        setGameScreen("victory");
        setPaused(false, "none");
      } else if (event.message.payload.snapshot.gameState === "failure") {
        const expedition = event.message.payload.snapshot.expedition;
        const monsterId = expedition.activeEncounter?.monsterId;
        const monster = expedition.monsterIndex.find((entry) => entry.id === monsterId);
        setCompletion({
          status: "failure",
          message: `${monster?.name ?? "Something in the dark"} caught you after ${expedition.encountersSurvived} survived encounters.`,
          atMs: event.timestampMs,
        });
        setScreen("COMPLETED");
        setGameScreen("failure");
        setPaused(false, "none");
      } else if (event.message.payload.snapshot.gameState === "paused") {
        setScreen("PAUSED");
        setGameScreen("paused");
        setPaused(true, "system");
      } else {
        setScreen("PLAYING");
        setGameScreen("playing");
        setPaused(false, "none");
      }

      setReadiness({
        simulation: true,
        rendering: true,
        networking: true,
        input: true,
      });
      return;
    }

    if (event.message.type === PROTOCOL_MESSAGE_TYPES.LOBBY_EVENT) {
      setRoom(event.message.payload.room);
      setLobbyPlayers(event.message.payload.players);
      setConnectionStatus("connected");

      const liveRecovery = useSessionStore.getState().recovery;
      if (
        useUiStore.getState().screen !== "RECOVERING" &&
        (liveRecovery.connection === "idle" || liveRecovery.connection === "connected")
      ) {
        markRecoveryConnection("connected");
      }
    }
  };

  const updatePeerIdentityIfNeeded = (hostPeerId: string): void => {
    const liveSession = useSessionStore.getState();

    if (liveSession.peerIdentity.hostPeerId === hostPeerId) {
      return;
    }

    liveSession.updatePeerIdentity({
      hostPeerId,
    });
  };

  const [joinCode, setJoinCode] = useState("HRC-1");
  const [playerName, setPlayerName] = useState("Wanderer");

  const returnToStart = (): void => {
    destroyTransport();
    clearSession();
    resetRuntime();
    resetUi();
    setScreen("START");
    setGameScreen("loading");
  };

  const enterHostLobby = (): void => {
    destroyTransport();
    resetUi();
    resetRecovery();
    const normalizedName = playerName.trim() || "Host";
    const nextRoomId = makeRoomId();
    const nextJoinCode = makeJoinCode();
    const hostPlayerId = makeId("host-player");
    const hostPeerId = nextJoinCode;
    const hostPlayer = makePlayer(hostPlayerId, normalizedName, true, false);
    const roomState = makeRoomState({
      roomId: nextRoomId,
      joinCode: nextJoinCode,
      hostId: hostPlayerId,
      players: [hostPlayer],
    });

    setSessionMode("host");
    setPeerIdentity({
      peerId: hostPeerId,
      playerId: hostPlayerId,
      displayName: normalizedName,
      hostPeerId,
    });
    setRoom(roomState);
    setLobbyPlayers(roomState.players);
    setScreen("LOBBY_HOST");
    setGameScreen("lobby");
    setOverlay({
      kind: "lobby",
      message: `Hosting room ${nextJoinCode}`,
      visible: true,
    });
    setAuthoritativeSnapshot(null);
    setReadiness({
      simulation: false,
      rendering: false,
      networking: true,
      input: false,
    });

    transportRef.current = createHost({
      roomId: nextRoomId,
      joinCode: nextJoinCode,
      peerId: nextJoinCode,
      onEvent: handleTransportEvent,
    });
    setTransport(transportRef.current);
    setConnectionStatus("connecting");
  };

  const enterClientLobby = (): void => {
    destroyTransport();
    resetUi();
    resetRecovery();
    const normalizedName = playerName.trim() || "Client";
    const normalizedJoinCode = joinCode.trim().toUpperCase() || makeJoinCode();
    const clientPlayerId = makeId("client-player");
    const clientPeerId = clientPlayerId;
    const clientPlayer = makePlayer(clientPlayerId, normalizedName, false, false);
    const roomState = makeRoomState({
      roomId: `room-${normalizedJoinCode.toLowerCase()}`,
      joinCode: normalizedJoinCode,
      hostId: null,
      players: [clientPlayer],
    });

    setSessionMode("client");
    setPeerIdentity({
      peerId: clientPeerId,
      playerId: clientPlayerId,
      displayName: normalizedName,
      hostPeerId: normalizedJoinCode,
    });
    setRoom(roomState);
    setLobbyPlayers(roomState.players);
    setScreen("LOBBY_CLIENT");
    setGameScreen("lobby");
    setOverlay({
      kind: "lobby",
      message: `Joined room ${normalizedJoinCode}`,
      visible: true,
    });
    setAuthoritativeSnapshot(null);
    setReadiness({
      simulation: false,
      rendering: false,
      networking: true,
      input: false,
    });

    const clientTransport = createClient({
      roomId: roomState.roomId,
      hostPeerId: normalizedJoinCode,
      peerId: clientPeerId,
      onEvent: handleTransportEvent,
    });
    transportRef.current = clientTransport;
    setTransport(clientTransport);
    clientTransport.connectToHost(normalizedJoinCode);
    setConnectionStatus("connecting");
  };

  const runLoadingSteps = async (): Promise<void> => {
    setScreen("LOADING");
    setGameScreen("loading");
    setOverlay({
      kind: "loading",
      message: "Generating corridor kits.",
      visible: true,
    });

    for (let index = 0; index < LOADING_STEPS.length; index += 1) {
      setLoadingStep(index);
      await waitFrame();
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
  };

  const enterSoloRun = async (): Promise<void> => {
    destroyTransport();
    resetRuntime();
    resetUi();
    resetRecovery();
    await runLoadingSteps();
    const departure = beginSoloExpedition({
      attemptId: makeId("attempt"),
      playerName,
    });
    const { bootstrap, playerId: soloPlayerId, playerName: normalizedName } = departure;

    setSessionMode("solo");
    setPeerIdentity({
      peerId: soloPlayerId,
      playerId: soloPlayerId,
      displayName: normalizedName,
      hostPeerId: null,
    });
    setConnectionStatus("connected");
    setRoom(bootstrap.gameState.room);
    setLobbyPlayers(bootstrap.gameState.room.players);
    setAuthoritativeSnapshot(bootstrap.snapshot);
    setScreen("PLAYING");
    setGameScreen("playing");
    setPaused(false, "none");
    setOverlay({
      kind: "loading",
      message: "Generated solo procedural corridor.",
      visible: false,
    });
    setReadiness({
      simulation: true,
      rendering: true,
      networking: false,
      input: true,
    });
  };

  const startPlay = async (): Promise<void> => {
    if (sessionMode !== "host") {
      toggleReady();
      return;
    }

    if (!room) {
      return;
    }

    const localPlayerId = peerIdentity.playerId ?? room.hostId ?? `${sessionMode}-player`;
    const localPlayerName = peerIdentity.displayName || "Host";
    await runLoadingSteps();
    const bootstrap = createInitialGameState({
      roomId: room.roomId,
      joinCode: room.joinCode,
      hostId: room.hostId ?? localPlayerId,
      players: lobbyPlayers,
      localPlayerId,
      localPlayerName,
      seedSource: room.roomId ?? room.joinCode ?? "horror-corridor",
    });

    setRoom(bootstrap.gameState.room);
    setLobbyPlayers(bootstrap.gameState.room.players);
    setAuthoritativeSnapshot(bootstrap.snapshot);
    resetUi();
    setScreen("PLAYING");
    setGameScreen("playing");
    setPaused(false, "none");
    setOverlay({
      kind: "none",
      message: null,
      visible: false,
    });
    setReadiness({
      simulation: true,
      rendering: true,
      networking: connectionStatus === "connected",
      input: true,
    });

    if (transportRef.current?.role === "host") {
      const senderId = peerIdentity.playerId ?? bootstrap.gameState.room.hostId ?? localPlayerId;
      transportRef.current.broadcast(
        createHostStartMessage({
          senderId,
          roomId: bootstrap.gameState.room.roomId,
          room: bootstrap.gameState.room,
          hostPeerId: transportRef.current.peerId ?? bootstrap.gameState.room.joinCode ?? senderId,
          hostPlayerId: localPlayerId,
          seed: bootstrap.gameState.seed,
          startedAtMs: bootstrap.gameState.timestampMs,
        }),
      );
      transportRef.current.broadcast(
        createFullSyncMessage({
          senderId,
          state: bootstrap.gameState,
          roomId: bootstrap.gameState.room.roomId,
          reason: "initial",
          timestampMs: bootstrap.gameState.timestampMs,
        }),
      );
    }
  };

  const resumePlay = (): void => {
    setPaused(false, "none");
    setScreen("PLAYING");
    setGameScreen("playing");
  };

  const reconnectToExpedition = (): void => {
    const liveSession = useSessionStore.getState();
    const clientTransport = transportRef.current;
    const hostPeerId = liveSession.peerIdentity.hostPeerId;

    if (clientTransport?.role !== "client" || !hostPeerId || !liveSession.room) {
      return;
    }

    const requestId = makeId("recovery");
    const requestedAtMs = Date.now();

    beginRecovery({
      requestId,
      hostPeerId,
      requestedAtMs,
    });
    setConnectionStatus("reconnecting");
    setOverlay({
      kind: "recovery",
      message: "Finding the host and restoring your place.",
      visible: true,
    });

    requestAnimationFrame(() => {
      window.setTimeout(() => {
        const activeTransport = transportRef.current;
        const accepted =
          activeTransport?.role === "client" &&
          activeTransport.connectToHost(hostPeerId);

        if (!accepted) {
          const failedAtMs = Date.now();
          const failedSession = useSessionStore.getState();

          failedSession.recordRecoveryDisconnection({
            reason: "The host could not be reached.",
            disconnectedAtMs: failedAtMs,
            playerId: failedSession.peerIdentity.playerId,
            snapshot: useRuntimeStore.getState().authoritativeSnapshot,
          });
          failedSession.setConnectionStatus("error");
          useUiStore.getState().setOverlay({
            kind: "recovery",
            message: "The host could not be reached. Try again.",
            visible: true,
          });
        }
      }, RECOVERY_STATUS_MIN_MS);
    });
  };

  const returnToLobby = (): void => {
    resetUi();
    if (!room) {
      setScreen("START");
      setGameScreen("loading");
      return;
    }

    const nextScreen = sessionMode === "host" ? "LOBBY_HOST" : "LOBBY_CLIENT";
    setScreen(nextScreen);
    setGameScreen("lobby");
    setPaused(false, "none");
    setOverlay({
      kind: "lobby",
      message: room.joinCode ? `Room ${room.joinCode}` : "Lobby",
      visible: true,
    });
    setReadiness({
      simulation: false,
      rendering: false,
      networking: true,
      input: false,
    });
  };

  const restartAfterCompletion = (): void => {
    if (sessionMode === "solo") {
      void enterSoloRun();
      return;
    }

    returnToLobby();
  };

  const addGuestPlaceholder = (): void => {
    const nextGuestIndex = lobbyPlayers.filter((player) => !player.isHost).length + 1;
    upsertLobbyPlayer(
      makePlayer(makeId("guest-player"), `Guest ${nextGuestIndex}`, false, false),
    );
  };

  const toggleReady = (): void => {
    const localPlayer = lobbyPlayers.find((player) => player.id === peerIdentity.playerId);

    if (!localPlayer) {
      return;
    }

    upsertLobbyPlayer({
      ...localPlayer,
      ready: !localPlayer.ready,
    });
  };

  useEffect(
    () => () => {
      destroyTransport();
    },
    [],
  );

  useEffect(() => {
    const sessionWindow = window as HorrorCorridorSessionWindow;
    const control: HorrorCorridorSessionControl = Object.freeze({
      disconnectClient: () => {
        const activeTransport = transportRef.current;

        if (activeTransport?.role !== "client") {
          return false;
        }

        activeTransport.disconnect();
        return true;
      },
      snapshot: () => {
        const liveSession = useSessionStore.getState();
        const liveUi = useUiStore.getState();
        const snapshot = useRuntimeStore.getState().authoritativeSnapshot;

        return Object.freeze({
          screen: liveUi.screen,
          connectionStatus: liveSession.connectionStatus,
          recovery: liveSession.recovery,
          sessionMode: liveSession.sessionMode,
          playerId: liveSession.peerIdentity.playerId,
          hostPeerId: liveSession.peerIdentity.hostPeerId,
          roomId: snapshot?.room.roomId ?? liveSession.room?.roomId ?? null,
          gameId: snapshot?.gameId ?? null,
          seed: snapshot?.seed ?? null,
          tick: snapshot?.tick ?? null,
          gameState: snapshot?.gameState ?? null,
          buildingNumber: snapshot?.expedition.buildingNumber ?? null,
          encountersSurvived: snapshot?.expedition.encountersSurvived ?? null,
          players: snapshot?.players ?? [],
        });
      },
    });

    sessionWindow.__HORROR_CORRIDOR_SESSION_CONTROL__ = control;

    return () => {
      if (sessionWindow.__HORROR_CORRIDOR_SESSION_CONTROL__ === control) {
        delete sessionWindow.__HORROR_CORRIDOR_SESSION_CONTROL__;
      }
    };
  }, []);

  const currentPlayers = room?.players ?? lobbyPlayers;
  const isCleanPlayScreen = screen === "PLAYING" || screen === "RECOVERING";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050403] text-lime-100">
      <div className="relative flex min-h-screen flex-col">
        {!isCleanPlayScreen ? (
          <header className="flex items-center justify-between gap-4 border-b border-lime-400/10 bg-black/50 px-5 py-4 backdrop-blur-sm">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-lime-300/70">
                Horror Corridor
              </p>
              <h1 className="mt-1 text-xl font-semibold uppercase tracking-[0.28em] text-white">
                Prototype Port
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-lime-200/80">
              <span className="rounded-full border border-lime-400/20 bg-lime-400/5 px-3 py-1">
                Room: {room?.joinCode ?? peerIdentity.hostPeerId ?? "----"}
              </span>
              <span className="rounded-full border border-lime-400/20 bg-lime-400/5 px-3 py-1">
                Mode: {sessionMode}
              </span>
              <span className="rounded-full border border-lime-400/20 bg-lime-400/5 px-3 py-1">
                Status: {connectionStatus}
              </span>
            </div>
          </header>
        ) : null}

        <main className="relative flex flex-1">
          {screen === "LOADING" ? (
            <LoadingScreen steps={LOADING_STEPS} activeStep={loadingStep} />
          ) : null}

          {screen === "START" ? (
            <StartMenu
              sessionMode={sessionMode}
              connectionStatus={connectionStatus}
              onSoloRun={enterSoloRun}
              onHostGame={enterHostLobby}
              onJoinGame={() => setScreen("JOIN_MENU")}
            />
          ) : null}

          {screen === "JOIN_MENU" ? (
            <JoinMenu
              joinCode={joinCode}
              playerName={playerName}
              connectionStatus={connectionStatus}
              onJoinCodeChange={setJoinCode}
              onPlayerNameChange={setPlayerName}
              onSubmit={enterClientLobby}
              onBack={() => setScreen("START")}
            />
          ) : null}

          {screen === "LOBBY_HOST" || screen === "LOBBY_CLIENT" ? (
            <LobbyScreen
              mode={sessionMode}
              connectionStatus={connectionStatus}
              room={room}
              players={currentPlayers}
              onPrimaryAction={startPlay}
              onSecondaryAction={sessionMode === "host" ? addGuestPlaceholder : toggleReady}
              onBackToTitle={returnToStart}
            />
          ) : null}

          {screen === "PLAYING" || screen === "RECOVERING" || screen === "PAUSED" || screen === "COMPLETED" ? (
            <div className="absolute inset-0">
              <GameCanvas transport={transport} />
              <HUDOverlay />
            </div>
          ) : null}

          {screen === "RECOVERING" ? (
            <RecoveryScreen
              connectionStatus={connectionStatus}
              recovery={recovery}
              onReconnect={reconnectToExpedition}
              onQuitToTitle={returnToStart}
            />
          ) : null}

          {screen === "PAUSED" ? (
            <PauseMenu
              onResume={resumePlay}
              onReturnToLobby={returnToLobby}
              onQuitToTitle={returnToStart}
            />
          ) : null}

          {screen === "COMPLETED" ? (
            <CompleteScreen
              outcome={completion.status === "victory" ? "victory" : "failure"}
              message={completion.message}
              restartLabel={
                sessionMode === "solo"
                  ? "Begin another expedition"
                  : "Return to lobby"
              }
              onRestart={restartAfterCompletion}
              onQuitToTitle={returnToStart}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}
