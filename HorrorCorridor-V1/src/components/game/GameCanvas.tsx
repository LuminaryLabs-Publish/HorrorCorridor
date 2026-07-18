"use client";

import { useEffect, useRef, useState } from "react";
import type { PerspectiveCamera, WebGLRenderer } from "three";

import { CUBE_COLORS } from "@/lib/colors";
import { CELL_SIZE, GRID_SIZE, MAX_PITCH, NETWORK_TICK_RATE } from "@/lib/constants";
import { useRuntimeStore } from "@/features/game-state/store/runtimeStore";
import { createStalkerAudio } from "@/features/audio/stalkerAudio";
import { useSessionStore } from "@/features/game-state/store/sessionStore";
import { useUiStore } from "@/features/game-state/store/uiStore";
import {
  clearRuntimeDebug,
  initializeRuntimeDebug,
  recordRuntimeDebugEvent,
  recordRuntimeDebugFrame,
  useRuntimeDebugStore,
  type RuntimeDebugFrameMode,
} from "@/features/debug/store/runtimeDebugStore";

import { advanceOozeTrail } from "@/features/game-state/domain/oozeRules";
import { advanceEndlessExpedition } from "@/features/game-state/domain/endlessExpedition";
import {
  buildReplicatedSnapshot,
  createFullSyncMessage,
  createInteractionRequestMessage,
  createPlayerUpdateMessage,
} from "@/features/networking/protocol/syncSnapshot";
import { PROTOCOL_MESSAGE_TYPES } from "@/features/networking/protocol/messageTypes";
import type { ClientTransportAdapter, HostTransportAdapter } from "@/features/networking/peer/peerTypes";
import { buildPathsFromEndToCubeSpawns, cellKey } from "@/features/maze/domain/mazePathing";
import {
  applyNetworkInteractionRequest,
  applyNetworkPlayerUpdate,
  syncHeldCubesToPlayers,
} from "@/features/game-state/domain/networkRules";
import { validateOrderedSequenceCompletion } from "@/features/game-state/domain/winRules";
import type {
  MazeCube,
  MazeCubeColorHex,
  MazeCubeColorName,
  MazeResult,
  MazeTargetSequence,
} from "@/features/maze/domain/mazeTypes";
import type { GameCellLookup, GameState } from "@/features/game-state/domain/gameTypes";
import type { ReplicatedGameSnapshot, WorldPosition } from "@/types/shared";

import { applyPlayerLookDelta, createPlayerViewAngles } from "@/features/player/domain/cameraLook";
import { resolveMazeCollision } from "@/features/player/domain/collision";
import {
  accumulatePlayerLookDelta,
  clearPlayerLookDelta,
  createPlayerInputState,
  keyboardCodeToPlayerInputButton,
  setPlayerInputButton,
  setPlayerPointerLocked,
  toPlayerInputSnapshot,
} from "@/features/player/domain/input";
import {
  advancePlayerMovement,
  PLAYER_EYE_HEIGHT,
  type PlayerPose,
} from "@/features/player/domain/movement";

import { createAnimationLoop } from "@/features/render/three/animationLoop";
import { createCamera } from "@/features/render/three/createCamera";
import type { CorridorPostProcessing } from "@/features/render/three/createPostProcessing";
import { createPostProcessing } from "@/features/render/three/createPostProcessing";
import { createRenderer } from "@/features/render/three/createRenderer";
import { createScene } from "@/features/render/three/createScene";
import { buildMazeWorld } from "@/features/render/three/worldBuilder";
import type { SceneDressingSummary } from "@/features/render/three/sceneDressingDescriptors";
import { MINIMAP_CANVAS_ID, drawMinimapFrame } from "@/components/hud/Minimap";
import {
  createHorrorCorridorNexusRuntime,
  proveHorrorCorridorNexusResetReplay,
  type HorrorCorridorNexusFrame,
  type HorrorCorridorNexusPerformance,
  type HorrorCorridorNexusResetReplayProof,
  type HorrorCorridorNexusRuntimeSnapshot,
} from "@/engine/horrorCorridorNexusRuntime";

import PointerLockGate from "./PointerLockGate";

const MAX_PIXEL_RATIO = 1;
const UI_SYNC_INTERVAL_MS = 100;
const CADENCE_WINDOW_MS = 1000;
const NEXUS_DOMAIN_SYNC_INTERVAL_MS = 250;
const CAMERA_WALK_SHAKE_FREQUENCY = 0.012;
const CAMERA_WALK_SHAKE_Y = 0.035;
const CAMERA_WALK_SHAKE_X = 0.014;
const CAMERA_WALK_ROLL = 0.006;

type HorrorCorridorNexusDebugSurface = Readonly<{
  snapshot: () => HorrorCorridorNexusRuntimeSnapshot;
  performance: () => HorrorCorridorNexusPerformance;
  proveResetReplay: () => HorrorCorridorNexusResetReplayProof;
}>;

type HorrorCorridorLiveControl = Readonly<{
  hold: () => void;
  resume: () => void;
  isHeld: () => boolean;
  turnByRadians: (deltaYaw: number) => void;
  lookByRadians: (deltaYaw: number, deltaPitch: number) => void;
}>;

type HorrorCorridorWindow = Window &
  typeof globalThis & {
    __HORROR_CORRIDOR_NEXUS__?: HorrorCorridorNexusDebugSurface;
    __HORROR_CORRIDOR_LIVE_CONTROL__?: HorrorCorridorLiveControl;
    __HORROR_CORRIDOR_LIVE_SESSION_ID__?: string;
  };
const cubeHexByName = new Map<MazeCubeColorName, MazeCubeColorHex>(
  CUBE_COLORS.map((color) => [color.name, color.hex] as const),
);

const resizeRenderer = (
  renderer: WebGLRenderer,
  camera: PerspectiveCamera,
  mount: HTMLDivElement,
  postProcessing?: CorridorPostProcessing,
): void => {
  const width = mount.clientWidth;
  const height = mount.clientHeight;

  if (width <= 0 || height <= 0) {
    return;
  }

  const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  postProcessing?.resize(width, height, pixelRatio);
};

const syncCameraFromPlayer = (
  camera: PerspectiveCamera,
  position: Readonly<{ x: number; y: number; z: number }>,
  viewAngles: Readonly<{ yaw: number; pitch: number }>,
  elapsedMs = 0,
  movementSpeed = 0,
): void => {
  const shakeAmount = Math.min(1, Math.max(0, movementSpeed / 9));
  const step = elapsedMs * CAMERA_WALK_SHAKE_FREQUENCY;
  const sideBob = Math.sin(step) * CAMERA_WALK_SHAKE_X * shakeAmount;
  const verticalBob = Math.abs(Math.cos(step * 0.5)) * CAMERA_WALK_SHAKE_Y * shakeAmount;
  const roll = Math.sin(step * 0.72) * CAMERA_WALK_ROLL * shakeAmount;

  camera.rotation.order = "YXZ";
  camera.position.set(position.x + sideBob, position.y + verticalBob, position.z);
  camera.rotation.y = viewAngles.yaw;
  camera.rotation.x = viewAngles.pitch;
  camera.rotation.z = roll;
};

const mazeCellToWorld = (x: number, y: number): Readonly<{ x: number; y: number; z: number }> => ({
  x: x * CELL_SIZE + CELL_SIZE / 2,
  y: PLAYER_EYE_HEIGHT,
  z: y * CELL_SIZE + CELL_SIZE / 2,
});

const zeroWorldVelocity = (): WorldPosition => ({
  x: 0,
  y: 0,
  z: 0,
});

type RuntimeCadenceState = {
  lastNetworkTickAtMs: number;
  lastUiSyncAtMs: number;
  cadenceWindowStartedAtMs: number;
  publishesThisWindow: number;
  clientUpdatesThisWindow: number;
  uiSyncsThisWindow: number;
  publishesPerSecond: number;
  clientUpdatesPerSecond: number;
  uiSyncsPerSecond: number;
};

const createRuntimeDebugFrameRecord = (input: Readonly<{
  frameNumber: number;
  deltaMs: number;
  elapsedMs: number;
  recordedAtMs: number;
  mode: RuntimeDebugFrameMode;
  screen: ReplicatedGameSnapshot["appState"];
  pointerLocked: boolean;
  roomId: string | null;
  localPlayerId: string | null;
  snapshot: ReplicatedGameSnapshot | null;
  pose: PlayerPose;
  viewAngles: Readonly<{ yaw: number; pitch: number }>;
  inputSnapshot: ReturnType<typeof toPlayerInputSnapshot>;
  cadence: RuntimeCadenceState;
  sceneDressing: SceneDressingSummary | null;
}>): Parameters<typeof recordRuntimeDebugFrame>[0] => {
  const localSnapshotPlayer =
    input.snapshot?.players.find((player) => player.id === input.localPlayerId) ?? null;
  const cubeStates = {
    ground: input.snapshot?.cubes.filter((cube) => cube.state === "ground").length ?? 0,
    held: input.snapshot?.cubes.filter((cube) => cube.state === "held").length ?? 0,
    placed: input.snapshot?.cubes.filter((cube) => cube.state === "placed").length ?? 0,
  };

  return {
    frameNumber: input.frameNumber,
    deltaMs: input.deltaMs,
    elapsedMs: input.elapsedMs,
    recordedAtMs: input.recordedAtMs,
    mode: input.mode,
    screen: input.screen,
    pointerLocked: input.pointerLocked,
    roomId: input.roomId,
    localPlayerId: input.localPlayerId,
    localPose: {
      position: input.pose.position,
      rotationY: input.viewAngles.yaw,
      pitch: input.viewAngles.pitch,
      velocity: input.pose.velocity,
      carryingCubeId: input.pose.carryingCubeId,
    },
    input: input.inputSnapshot,
    snapshot: {
      tick: input.snapshot?.tick ?? null,
      timestampMs: input.snapshot?.timestampMs ?? null,
      appState: input.snapshot?.appState ?? null,
      gameState: input.snapshot?.gameState ?? null,
      playerCount: input.snapshot?.players.length ?? 0,
      cubeCount: input.snapshot?.cubes.length ?? 0,
      oozeCount: input.snapshot?.oozeTrail.length ?? 0,
      decalCount: input.snapshot?.oozeTrail.length ?? 0,
      slotsFilled: input.snapshot?.anomaly.slots.filter((slot) => slot !== null).length ?? 0,
      cubeStates,
      localPlayer: localSnapshotPlayer
        ? {
            id: localSnapshotPlayer.id,
            color: localSnapshotPlayer.color,
            position: localSnapshotPlayer.position,
            rotationY: localSnapshotPlayer.rotationY,
            pitch: localSnapshotPlayer.pitch,
          }
        : null,
    },
    cubes:
      input.snapshot?.cubes.map((cube) => ({
        id: cube.id,
        color: cube.color,
        state: cube.state,
        ownerId: cube.ownerId,
        position: cube.position,
      })) ?? [],
    anomaly: input.snapshot
      ? {
          sequence: [...input.snapshot.anomaly.sequence],
          slots: [...input.snapshot.anomaly.slots],
        }
      : {
          sequence: [],
          slots: [],
        },
    expedition: input.snapshot?.expedition ?? null,
    cadence: {
      networkTickAgeMs: Math.max(0, input.recordedAtMs - input.cadence.lastNetworkTickAtMs),
      authoritativePublishesPerSecond: input.cadence.publishesPerSecond,
      clientUpdatesPerSecond: input.cadence.clientUpdatesPerSecond,
      uiSyncsPerSecond: input.cadence.uiSyncsPerSecond,
    },
    sceneDressing: input.sceneDressing,
  };
};

type GameCanvasProps = Readonly<{
  transport: HostTransportAdapter | ClientTransportAdapter | null;
}>;

const buildMazeResultFromSnapshot = (snapshot: ReplicatedGameSnapshot): MazeResult => {
  const grid = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => 0 as 0 | 1 | 2 | 3 | 4),
  );

  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };

  for (const cell of snapshot.maze) {
    const value = cell.value;
    grid[cell.grid.y][cell.grid.x] = value;

    if (value === 3) {
      start = { x: cell.grid.x, y: cell.grid.y };
    } else if (value === 4) {
      end = { x: cell.grid.x, y: cell.grid.y };
    }
  }

  const cubes: readonly MazeCube[] = snapshot.cubes.map((cube) => ({
    id: cube.id,
    colorName: cube.color,
    colorHex: cubeHexByName.get(cube.color) ?? CUBE_COLORS[0].hex,
    x: cube.position.x,
    z: cube.position.z,
    state: "ground",
    ownerId: null,
  }));

  const targetSequence = [...snapshot.anomaly.sequence] as MazeTargetSequence;

  const paths = buildPathsFromEndToCubeSpawns({
    grid,
    end,
    cubes,
    cellSize: CELL_SIZE,
  });

  return {
    grid,
    start,
    end,
    cubes,
    targetSequence,
    paths,
  };
};

const buildGameStateFromSnapshot = (
  snapshot: ReplicatedGameSnapshot,
): GameState => {
  const mazeLookup = Object.fromEntries(
    snapshot.maze.map((cell) => [cellKey(cell.grid), cell] as const),
  ) as GameCellLookup;
  const exitCell =
    snapshot.maze.find((cell) => cell.value === 4)?.grid ?? { x: 0, y: 0 };
  const playerNames = new Map(snapshot.room.players.map((player) => [player.id, player.name] as const));
  const slotIdByCubeId = new Map(
    snapshot.anomaly.slots.flatMap((cubeId, index) =>
      cubeId ? ([[cubeId, `slot-${index}`]] as const) : [],
    ),
  );

  const baseState = {
    gameId: snapshot.gameId,
    seed: snapshot.seed,
    room: snapshot.room,
    appState: snapshot.appState,
    gameState: snapshot.gameState,
    tick: snapshot.tick,
    timestampMs: snapshot.timestampMs,
    maze: snapshot.maze,
    oozeLevel: snapshot.oozeLevel,
    players: snapshot.players.map((player) => ({
      ...player,
      name: playerNames.get(player.id) ?? "Player",
      velocity: zeroWorldVelocity(),
    })),
    cubes: snapshot.cubes.map((cube) => ({
      id: cube.id,
      color: cube.color,
      cell:
        cube.state === "ground"
          ? {
              x: Math.floor(cube.position.x / CELL_SIZE),
              y: Math.floor(cube.position.z / CELL_SIZE),
            }
          : null,
      position: cube.position,
      visible: cube.state !== "held",
      active: cube.state === "ground",
      locked: cube.state === "placed",
      highlighted: false,
      heldByPlayerId: cube.state === "held" ? cube.ownerId : null,
      assignedSlotId: slotIdByCubeId.get(cube.id) ?? null,
    })),
    sequenceSlots: snapshot.anomaly.sequence.map((color, index) => ({
      id: `slot-${index}`,
      index,
      requiredColor: color,
      occupiedCubeId: snapshot.anomaly.slots[index] ?? null,
      isUnlocked: index === 0,
      isSolved: false,
    })),
    expedition: {
      ...snapshot.expedition,
      flashlight: { ...snapshot.expedition.flashlight },
      boons: { ...snapshot.expedition.boons },
      activeEncounter: snapshot.expedition.activeEncounter
        ? {
            ...snapshot.expedition.activeEncounter,
            audioCue: { ...snapshot.expedition.activeEncounter.audioCue },
          }
        : null,
      roomOffer: snapshot.expedition.roomOffer
        ? { ...snapshot.expedition.roomOffer }
        : null,
      monsterIndex: snapshot.expedition.monsterIndex.map((entry) => ({ ...entry })),
    },
    mazeLookup,
    endAnomalyCellId: cellKey(exitCell),
    oozeTrail: snapshot.oozeTrail,
    lastOozeDecayTime: snapshot.timestampMs,
  } satisfies GameState;

  return validateOrderedSequenceCompletion(baseState);
};

const buildPlayerPoseFromSnapshot = (
  player: ReplicatedGameSnapshot["players"][number] | undefined,
  fallbackPosition: WorldPosition,
): PlayerPose => ({
  position: player
    ? {
        x: player.position.x,
        y: player.position.y,
        z: player.position.z,
      }
    : fallbackPosition,
  rotationY: player?.rotationY ?? 0,
  velocity: zeroWorldVelocity(),
  carryingCubeId: null,
});

export default function GameCanvas({ transport }: GameCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [isRendererReady, setIsRendererReady] = useState(false);

  const setScreen = useUiStore((state) => state.setScreen);
  const setPaused = useUiStore((state) => state.setPaused);
  const setCompletion = useUiStore((state) => state.setCompletion);
  const toggleSettingsOverlay = useUiStore((state) => state.toggleSettingsOverlay);
  const toggleMonsterIndexOverlay = useUiStore((state) => state.toggleMonsterIndexOverlay);

  const setLocalPlayerPose = useRuntimeStore((state) => state.setLocalPlayerPose);
  const setViewAngles = useRuntimeStore((state) => state.setViewAngles);
  const setInputFlags = useRuntimeStore((state) => state.setInputFlags);
  const patchReadiness = useRuntimeStore((state) => state.patchReadiness);
  const setAuthoritativeSnapshot = useRuntimeStore((state) => state.setAuthoritativeSnapshot);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    let cleanupRuntime = (): void => {};
    let initialized = false;
    let unsubscribe: (() => void) | null = null;

    const initializeRuntime = (snapshot: ReplicatedGameSnapshot): void => {
      if (initialized) {
        return;
      }

      initialized = true;
      setIsRendererReady(false);
      initializeRuntimeDebug();
      clearRuntimeDebug();

      const maze = buildMazeResultFromSnapshot(snapshot);
      const renderer = createRenderer({
        pixelRatio: Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO),
      });
      const scene = createScene();
      const camera = createCamera({
        aspect: mount.clientWidth > 0 && mount.clientHeight > 0 ? mount.clientWidth / mount.clientHeight : 1,
      });
      const postProcessing = createPostProcessing(renderer, scene, camera);
      const world = buildMazeWorld(maze);
      const stalkerAudio = createStalkerAudio();
      const pointerLockTarget = mount;
      const session = useSessionStore.getState();
      const isHostSession = session.sessionMode === "host";
      const isSoloSession = session.sessionMode === "solo";
      const isAuthoritativeLocalSession = isHostSession || isSoloSession;
      const isHostTransport = transport?.role === "host";
      const isClientTransport = transport?.role === "client";
      const localPlayerId =
        session.peerIdentity.playerId ?? snapshot.room.hostId ?? snapshot.players[0]?.id ?? "local-player";
      const localPlayerSnapshot =
        snapshot.players.find((player) => player.id === localPlayerId) ?? snapshot.players[0];
      const fallbackStart = mazeCellToWorld(maze.start.x, maze.start.y);
      const localPose = buildPlayerPoseFromSnapshot(localPlayerSnapshot, fallbackStart);
      const localViewAngles = createPlayerViewAngles(
        localPose.rotationY,
        localPlayerSnapshot?.pitch ?? 0,
        Date.now(),
      );
      const inputState = createPlayerInputState();
      const poseRef = { current: localPose };
      const viewAnglesRef = { current: localViewAngles };
      const inputRef = { current: inputState };
      const pointerLockedRef = { current: false };
      const minimapCanvasRef = { current: null as HTMLCanvasElement | null };
      const liveAgentMode = new URLSearchParams(window.location.search).get("liveAgent") === "1";
      let liveAgentHeld = liveAgentMode;
      const commitLiveAgentView = (
        nextViewAngles: ReturnType<typeof createPlayerViewAngles>,
      ): void => {
        const committedAtMs = nowMs();
        viewAnglesRef.current = nextViewAngles;
        poseRef.current = {
          ...poseRef.current,
          rotationY: nextViewAngles.yaw,
        };

        if (isAuthoritativeLocalSession) {
          currentGameState = applyNetworkPlayerUpdate(currentGameState, {
            playerId: localPlayerId,
            position: poseRef.current.position,
            rotationY: nextViewAngles.yaw,
            pitch: nextViewAngles.pitch,
            velocity: poseRef.current.velocity,
          });
          latestHostSnapshot = publishAuthoritativeState(
            "resync",
            committedAtMs,
          );
        } else if (isClientTransport) {
          sendPlayerUpdate();
        }

        syncRuntimeStores(committedAtMs, true);
      };
      const liveAgentControl: HorrorCorridorLiveControl = Object.freeze({
        hold: () => {
          liveAgentHeld = true;
          inputRef.current = createPlayerInputState();
        },
        resume: () => {
          liveAgentHeld = false;
          const liveUi = useUiStore.getState();
          if (liveUi.screen === "PAUSED") {
            setPaused(false, "none");
            setScreen("PLAYING");
          }
        },
        isHeld: () => liveAgentHeld,
        turnByRadians: (deltaYaw) => {
          if (!Number.isFinite(deltaYaw)) return;
          commitLiveAgentView(createPlayerViewAngles(
            viewAnglesRef.current.yaw + deltaYaw,
            viewAnglesRef.current.pitch,
            viewAnglesRef.current.lastPitchInputAtMs,
          ));
        },
        lookByRadians: (deltaYaw, deltaPitch) => {
          if (!Number.isFinite(deltaYaw) || !Number.isFinite(deltaPitch)) return;
          const current = viewAnglesRef.current;
          commitLiveAgentView(createPlayerViewAngles(
            current.yaw + deltaYaw,
            Math.max(-MAX_PITCH, Math.min(MAX_PITCH, current.pitch + deltaPitch)),
            nowMs(),
          ));
        },
      });
      if (liveAgentMode) {
        (window as HorrorCorridorWindow).__HORROR_CORRIDOR_LIVE_CONTROL__ = liveAgentControl;
      }
      const nowMs = () => Date.now();
      const frameCadence: RuntimeCadenceState = {
        lastNetworkTickAtMs: nowMs(),
        lastUiSyncAtMs: 0,
        cadenceWindowStartedAtMs: nowMs(),
        publishesThisWindow: 0,
        clientUpdatesThisWindow: 0,
        uiSyncsThisWindow: 0,
        publishesPerSecond: 0,
        clientUpdatesPerSecond: 0,
        uiSyncsPerSecond: 0,
      };
      let networkUpdateSequence = 0;
      let debugFrameNumber = 0;
      let lastNexusSyncAtMs: number | null = null;
      const startingGameState = buildGameStateFromSnapshot(snapshot);
      let currentGameState = startingGameState;
      let latestHostSnapshot: ReplicatedGameSnapshot | null = snapshot;
      const nexusRuntimeOptions = Object.freeze({
        seed: snapshot.seed,
        roomId: snapshot.room.roomId,
        sessionMode: session.sessionMode,
      });
      let latestNexusFrame: HorrorCorridorNexusFrame = Object.freeze({
        snapshot,
        screen: useUiStore.getState().screen,
        localPlayerId,
        localPlayerPosition: poseRef.current.position,
        pointerLocked: pointerLockedRef.current,
        elapsedMs: 0,
        sharedRecovery: useSessionStore.getState().recovery,
        concretePaving:
          world.getSceneDressingSummary().concretePaving ?? null,
        ceilingCollapse:
          world.getSceneDressingSummary().ceilingCollapse ?? null,
      });
      const nexusRuntime = createHorrorCorridorNexusRuntime(nexusRuntimeOptions);
      const nexusDebugSurface: HorrorCorridorNexusDebugSurface = Object.freeze({
        snapshot: nexusRuntime.snapshot,
        performance: nexusRuntime.performance,
        proveResetReplay: () =>
          proveHorrorCorridorNexusResetReplay(
            nexusRuntimeOptions,
            latestNexusFrame,
          ),
      });
      (window as HorrorCorridorWindow).__HORROR_CORRIDOR_NEXUS__ = nexusDebugSurface;

      recordRuntimeDebugEvent({
        kind: "runtime",
        message: "Initialized maze runtime session with NexusEngine composition",
        payload: {
          roomId: snapshot.room.roomId,
          localPlayerId,
          mode: transport?.role ?? "local",
          players: snapshot.players.length,
          cubes: snapshot.cubes.length,
          nexusDomains: nexusRuntime.snapshot().domains.length,
          nexusInstallCount: nexusRuntime.snapshot().installOrder.length,
        },
      });

      const getReferenceGameState = (): GameState => {
        const latestSnapshot = useRuntimeStore.getState().authoritativeSnapshot;

        return latestSnapshot ? buildGameStateFromSnapshot(latestSnapshot) : currentGameState;
      };

      const syncLocalCarryStateFromGameState = (gameState: GameState = currentGameState): void => {
        const carriedCubeId =
          gameState.cubes.find((cube) => cube.heldByPlayerId === localPlayerId)?.id ?? null;

        poseRef.current = {
          ...poseRef.current,
          carryingCubeId: carriedCubeId,
        };
      };

      const syncLocalCarryStateFromSnapshot = (
        snapshotState: ReplicatedGameSnapshot | null,
      ): void => {
        const carriedCubeId =
          snapshotState?.cubes.find(
            (cube) => cube.state === "held" && cube.ownerId === localPlayerId,
          )?.id ?? null;

        poseRef.current = {
          ...poseRef.current,
          carryingCubeId: carriedCubeId,
        };
      };

      const updateCadenceWindow = (recordedAtMs: number): void => {
        if (recordedAtMs - frameCadence.cadenceWindowStartedAtMs < CADENCE_WINDOW_MS) {
          return;
        }

        frameCadence.publishesPerSecond = frameCadence.publishesThisWindow;
        frameCadence.clientUpdatesPerSecond = frameCadence.clientUpdatesThisWindow;
        frameCadence.uiSyncsPerSecond = frameCadence.uiSyncsThisWindow;
        frameCadence.publishesThisWindow = 0;
        frameCadence.clientUpdatesThisWindow = 0;
        frameCadence.uiSyncsThisWindow = 0;
        frameCadence.cadenceWindowStartedAtMs = recordedAtMs;
      };

      const syncRuntimeStores = (recordedAtMs: number, force = false): void => {
        if (!force && recordedAtMs - frameCadence.lastUiSyncAtMs < UI_SYNC_INTERVAL_MS) {
          return;
        }

        frameCadence.lastUiSyncAtMs = recordedAtMs;
        frameCadence.uiSyncsThisWindow += 1;
        setLocalPlayerPose(poseRef.current);
        setViewAngles(viewAnglesRef.current);
        setInputFlags(toPlayerInputSnapshot(inputRef.current));
      };

      const publishAuthoritativeState = (
        reason: "initial" | "join" | "resync" | "reconnect" | "recovery" = "resync",
        publishedAtMs = nowMs(),
        requestId?: string,
      ): ReplicatedGameSnapshot => {
        currentGameState = {
          ...currentGameState,
          room: {
            ...currentGameState.room,
            phase: "active",
            updatedAt: publishedAtMs,
          },
          appState: useUiStore.getState().screen,
          gameState: currentGameState.gameState,
          tick: currentGameState.tick + 1,
          timestampMs: publishedAtMs,
        };
        const nextSnapshot = buildReplicatedSnapshot(currentGameState);
        latestHostSnapshot = nextSnapshot;
        setAuthoritativeSnapshot(nextSnapshot);
        frameCadence.lastNetworkTickAtMs = publishedAtMs;
        frameCadence.publishesThisWindow += 1;
        recordRuntimeDebugEvent({
          kind: "sync",
          message: `Published authoritative snapshot (${reason})`,
          payload: {
            reason,
            tick: nextSnapshot.tick,
            gameState: nextSnapshot.gameState,
          },
        });

        if (isHostTransport) {
          transport?.broadcast(
            createFullSyncMessage({
              senderId: localPlayerId,
              roomId: currentGameState.room.roomId,
              state: currentGameState,
              reason,
              timestampMs: publishedAtMs,
              requestId,
            }),
          );
        }

        return nextSnapshot;
      };

      const stepLocalPose = (
        deltaMs: number,
      ): Readonly<{
        nextViewAngles: ReturnType<typeof createPlayerViewAngles>;
        resolvedPose: PlayerPose;
      }> => {
        const nextViewAngles = applyPlayerLookDelta(
          viewAnglesRef.current,
          inputRef.current.lookDeltaX,
          inputRef.current.lookDeltaY,
          nowMs(),
        );
        const nextMovement = advancePlayerMovement(
          poseRef.current,
          inputRef.current,
          nextViewAngles,
          deltaMs,
        );
        const collision = resolveMazeCollision(
          poseRef.current.position,
          nextMovement.pose.position,
          maze.grid,
        );

        return {
          nextViewAngles,
          resolvedPose: {
            ...nextMovement.pose,
            position: collision.position,
            velocity: {
              x: collision.blockedX ? 0 : nextMovement.pose.velocity.x,
              y: nextMovement.pose.velocity.y,
              z: collision.blockedZ ? 0 : nextMovement.pose.velocity.z,
            },
          },
        };
      };

      const sendPlayerUpdate = (): void => {
        if (!isClientTransport || !transport || !transport.send) {
          return;
        }

        const inputSnapshot = toPlayerInputSnapshot(inputRef.current);

        transport.send(
          createPlayerUpdateMessage({
            senderId: localPlayerId,
            roomId: currentGameState.room.roomId,
            playerId: localPlayerId,
            input: {
              sequence: networkUpdateSequence += 1,
              moveForward: inputSnapshot.moveForward,
              moveStrafe: inputSnapshot.moveStrafe,
              lookYaw: viewAnglesRef.current.yaw,
              interact: inputSnapshot.interact,
            },
            pose: {
              position: poseRef.current.position,
              rotationY: viewAnglesRef.current.yaw,
              pitch: viewAnglesRef.current.pitch,
              velocity: poseRef.current.velocity,
            },
          }),
        );
        frameCadence.lastNetworkTickAtMs = nowMs();
        frameCadence.clientUpdatesThisWindow += 1;
      };

      const sendInteractionRequest = (): void => {
        if (!isClientTransport || !transport || !transport.send) {
          return;
        }

        const referenceState = getReferenceGameState();
        const action =
          referenceState.expedition.roomOffer && !referenceState.expedition.roomOffer.claimed
            ? "claim-room-offer"
            : "cancel";

        transport.send(
          createInteractionRequestMessage({
            senderId: localPlayerId,
            roomId: currentGameState.room.roomId,
            playerId: localPlayerId,
            action,
          }),
        );
      };

      const commitVictory = (): void => {
        setCompletion({
          status: "victory",
          message: "The corridor accepted the run.",
          atMs: nowMs(),
        });
        setScreen("COMPLETED");
        setPaused(false, "none");
        releasePointerLock();
      };

      let caughtCommitted = false;
      const commitCaught = (): void => {
        if (caughtCommitted) return;
        caughtCommitted = true;
        const encounter = currentGameState.expedition.activeEncounter;
        const monster = currentGameState.expedition.monsterIndex.find(
          (entry) => entry.id === encounter?.monsterId,
        );
        setCompletion({
          status: "failure",
          message: `${monster?.name ?? "Something in the dark"} caught you after ${currentGameState.expedition.encountersSurvived} survived encounters.`,
          atMs: nowMs(),
        });
        setPaused(false, "none");
        releasePointerLock();
      };

      let unsubscribeTransport: (() => void) | null = null;

      if (transport) {
        unsubscribeTransport = transport.onEvent((event) => {
          if (event.type !== "peer/message" || event.role !== "host") {
            return;
          }

          if (event.message.type === PROTOCOL_MESSAGE_TYPES.PLAYER_UPDATE) {
            recordRuntimeDebugEvent({
              kind: "network",
              message: "Received player update on host",
              payload: {
                playerId: event.message.payload.playerId,
                requestId: event.message.requestId ?? null,
              },
          });
            currentGameState = applyNetworkPlayerUpdate(currentGameState, {
              playerId: event.message.payload.playerId,
              position: event.message.payload.pose.position,
              rotationY: event.message.payload.pose.rotationY,
              pitch: event.message.payload.pose.pitch,
              velocity: event.message.payload.pose.velocity,
            });
            syncLocalCarryStateFromGameState(currentGameState);
            publishAuthoritativeState("resync");
            return;
          }

          if (event.message.type === PROTOCOL_MESSAGE_TYPES.TRY_INTERACT) {
            recordRuntimeDebugEvent({
              kind: "network",
              message: "Received interaction request on host",
              payload: {
                playerId: event.message.payload.playerId,
                action: event.message.payload.action,
              },
            });
            currentGameState = applyNetworkInteractionRequest(currentGameState, {
              playerId: event.message.payload.playerId,
              action: event.message.payload.action,
              cubeId: event.message.payload.cubeId,
              slotId: event.message.payload.slotId,
            });
            currentGameState = syncHeldCubesToPlayers(currentGameState);
            syncLocalCarryStateFromGameState(currentGameState);
            publishAuthoritativeState(
              event.message.payload.action === "request-sync" ? "recovery" : "resync",
              nowMs(),
              event.message.requestId,
            );

            if (currentGameState.gameState === "victory") {
              commitVictory();
            }
          }
        });
      }

      const releasePointerLock = (): void => {
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
      };

      const applyInteraction = (): void => {
        if (currentGameState.gameState !== "playing") {
          return;
        }

        const referenceState = getReferenceGameState();
        const action =
          referenceState.expedition.roomOffer && !referenceState.expedition.roomOffer.claimed
            ? "claim-room-offer"
            : "cancel";

        recordRuntimeDebugEvent({
          kind: "interaction",
          message: "Local interaction requested",
          payload: {
            action,
            host: isAuthoritativeLocalSession,
          },
        });

        if (isAuthoritativeLocalSession) {
          const nextState = applyNetworkInteractionRequest(currentGameState, {
            playerId: localPlayerId,
            action,
          });

          if (nextState === currentGameState) {
            return;
          }

          currentGameState = syncHeldCubesToPlayers(nextState);
          syncLocalCarryStateFromGameState(currentGameState);
          publishAuthoritativeState("resync");

          if (currentGameState.gameState === "victory") {
            commitVictory();
          }

          return;
        }

        sendInteractionRequest();
      };

      const syncPointerLockState = (): void => {
        const locked = document.pointerLockElement === pointerLockTarget;

        if (pointerLockedRef.current === locked) {
          return;
        }

        pointerLockedRef.current = locked;
        inputRef.current = setPlayerPointerLocked(inputRef.current, locked);
        setIsPointerLocked(locked);
        setInputFlags(toPlayerInputSnapshot(inputRef.current));
        recordRuntimeDebugEvent({
          kind: "pointer-lock",
          message: locked ? "Pointer lock engaged" : "Pointer lock released",
          payload: {
            locked,
            screen: useUiStore.getState().screen,
          },
        });

        if (!locked && useUiStore.getState().screen === "PLAYING") {
          setPaused(true, "system");
          setScreen("PAUSED");
        }
      };

      const onKeyDown = (event: KeyboardEvent): void => {
        void stalkerAudio.resume();
        if (event.code === "Backquote") {
          initializeRuntimeDebug();
          const debugStore = useRuntimeDebugStore.getState();
          const nextVisible = !debugStore.overlayVisible;

          debugStore.setEnabled(true);
          debugStore.setOverlayVisible(nextVisible);
          recordRuntimeDebugEvent({
            kind: "debug",
            message: nextVisible ? "Frame debug overlay shown" : "Frame debug overlay hidden",
            payload: {
              overlayVisible: nextVisible,
            },
          });
          return;
        }

        if (event.code === "KeyQ" && !event.repeat) {
          toggleSettingsOverlay();
          return;
        }

        if (event.code === "KeyM" && !event.repeat) {
          toggleMonsterIndexOverlay();
          return;
        }

        const button = keyboardCodeToPlayerInputButton(event.code);

        if (!button || event.repeat) {
          return;
        }

        if (button === "pause") {
          const uiState = useUiStore.getState();

          if (uiState.screen === "PLAYING") {
            setPaused(true, "manual");
            setScreen("PAUSED");
            releasePointerLock();
          } else if (uiState.screen === "PAUSED") {
            setPaused(false, "none");
            setScreen("PLAYING");
          }
        }

        if (button === "interact") {
          applyInteraction();
        }

        inputRef.current = setPlayerInputButton(inputRef.current, button, true);
        syncRuntimeStores(nowMs(), true);
      };

      const onKeyUp = (event: KeyboardEvent): void => {
        const button = keyboardCodeToPlayerInputButton(event.code);

        if (!button) {
          return;
        }

        inputRef.current = setPlayerInputButton(inputRef.current, button, false);
        syncRuntimeStores(nowMs(), true);
      };

      const onMouseMove = (event: MouseEvent): void => {
        if (!pointerLockedRef.current) {
          return;
        }

        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        if (movementX === 0 && movementY === 0) {
          return;
        }

        inputRef.current = accumulatePlayerLookDelta(inputRef.current, movementX, movementY);
      };

      const onBlur = (): void => {
        if (pointerLockedRef.current) {
          releasePointerLock();
        }
      };

      const onPointerLockChange = (): void => {
        syncPointerLockState();
      };

      const onPointerDown = (): void => {
        void stalkerAudio.resume();
      };

      const resizeObserver =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(() => resizeRenderer(renderer, camera, mount, postProcessing))
          : null;

      const onResize = (): void => {
        resizeRenderer(renderer, camera, mount, postProcessing);
      };

      mount.appendChild(renderer.domElement);
      world.attach(scene);

      setLocalPlayerPose(poseRef.current);
      setViewAngles(viewAnglesRef.current);
      setInputFlags(toPlayerInputSnapshot(inputRef.current));
      setAuthoritativeSnapshot(latestHostSnapshot);
      patchReadiness({
        simulation: false,
        rendering: false,
        networking: !isSoloSession,
        input: false,
      });
      setPaused(false, "none");

      resizeObserver?.observe(mount);
      window.addEventListener("resize", onResize);
      document.addEventListener("pointerlockchange", onPointerLockChange);
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
      document.addEventListener("mousemove", onMouseMove);
      mount.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("blur", onBlur);
      onResize();

      const loop = createAnimationLoop((deltaMs, elapsedMs) => {
        const recordedAtMs = nowMs();
        const uiState = useUiStore.getState();
        const debugEnabled = useRuntimeDebugStore.getState().enabled;
        updateCadenceWindow(recordedAtMs);

        const captureFrame = (
          mode: RuntimeDebugFrameMode,
          snapshotForFrame: ReplicatedGameSnapshot | null,
        ): void => {
          if (!debugEnabled) {
            return;
          }

          debugFrameNumber += 1;
          recordRuntimeDebugFrame(
            createRuntimeDebugFrameRecord({
              frameNumber: debugFrameNumber,
              deltaMs,
              elapsedMs,
              recordedAtMs,
              mode,
              screen: uiState.screen,
              pointerLocked: pointerLockedRef.current,
              roomId: currentGameState.room.roomId,
              localPlayerId,
              snapshot: snapshotForFrame,
              pose: poseRef.current,
              viewAngles: viewAnglesRef.current,
              inputSnapshot: toPlayerInputSnapshot(inputRef.current),
              cadence: frameCadence,
              sceneDressing: world.getSceneDressingSummary(),
            }),
          );
        };

        const renderFrame = (
          mode: RuntimeDebugFrameMode,
          snapshotForFrame: ReplicatedGameSnapshot | null,
        ): void => {
          if (
            lastNexusSyncAtMs === null ||
            elapsedMs - lastNexusSyncAtMs >= NEXUS_DOMAIN_SYNC_INTERVAL_MS
          ) {
            const nexusDeltaSeconds =
              lastNexusSyncAtMs === null
                ? 0
                : Math.max(0, (elapsedMs - lastNexusSyncAtMs) / 1000);
            latestNexusFrame = Object.freeze({
              snapshot: snapshotForFrame,
              screen: uiState.screen,
              localPlayerId,
              localPlayerPosition: poseRef.current.position,
              pointerLocked: pointerLockedRef.current,
              elapsedMs,
              sharedRecovery: useSessionStore.getState().recovery,
              concretePaving:
                world.getSceneDressingSummary().concretePaving ?? null,
              ceilingCollapse:
                world.getSceneDressingSummary().ceilingCollapse ?? null,
            });
            nexusRuntime.syncHostFrame(latestNexusFrame);
            nexusRuntime.tick(
              uiState.screen === "PLAYING" ? nexusDeltaSeconds : 0,
            );
            lastNexusSyncAtMs = elapsedMs;
          }
          const cameraPosition = world.getTerrainEyePosition(poseRef.current.position);
          syncCameraFromPlayer(
            camera,
            cameraPosition,
            viewAnglesRef.current,
            elapsedMs,
            Math.hypot(poseRef.current.velocity.x, poseRef.current.velocity.z),
          );
          world.update(elapsedMs, {
            snapshot: snapshotForFrame,
            localPlayerId,
            localPlayerPosition: poseRef.current.position,
            localViewAngles: viewAnglesRef.current,
            localCamera: camera,
          });
          stalkerAudio.update(snapshotForFrame?.expedition ?? null);
          minimapCanvasRef.current = document.getElementById(MINIMAP_CANVAS_ID) as HTMLCanvasElement | null;
          drawMinimapFrame({
            canvas: minimapCanvasRef.current,
            snapshot: snapshotForFrame,
            localPlayerId,
            localPosition: poseRef.current.position,
            yaw: viewAnglesRef.current.yaw,
          });
          captureFrame(mode, snapshotForFrame);
          postProcessing.render();
        };

        if (
          (uiState.screen === "RECOVERING" ||
            uiState.screen === "PAUSED" ||
            uiState.screen === "COMPLETED") &&
          pointerLockedRef.current
        ) {
          releasePointerLock();
        }

        const latestSnapshot = isAuthoritativeLocalSession
          ? latestHostSnapshot
          : useRuntimeStore.getState().authoritativeSnapshot;
        const shouldAdvanceSimulation =
          uiState.screen === "PLAYING" &&
          (!liveAgentHeld || currentGameState.expedition.phase === "jumpscare");

        if (shouldAdvanceSimulation && isAuthoritativeLocalSession) {
          const previousPosition = poseRef.current.position;
          const { nextViewAngles, resolvedPose } = stepLocalPose(deltaMs);
          const travelledMeters = Math.hypot(
            resolvedPose.position.x - previousPosition.x,
            resolvedPose.position.z - previousPosition.z,
          );

          poseRef.current = resolvedPose;
          viewAnglesRef.current = nextViewAngles;
          inputRef.current = clearPlayerLookDelta(inputRef.current);

          currentGameState = {
            ...currentGameState,
            appState: uiState.screen,
            gameState: "playing",
          };
          currentGameState = applyNetworkPlayerUpdate(currentGameState, {
            playerId: localPlayerId,
            position: resolvedPose.position,
            rotationY: viewAnglesRef.current.yaw,
            pitch: viewAnglesRef.current.pitch,
            velocity: resolvedPose.velocity,
          });
          currentGameState = {
            ...currentGameState,
            expedition: advanceEndlessExpedition(
              currentGameState.expedition,
              currentGameState.seed,
              {
                deltaMs,
                travelledMeters,
                playerYaw: viewAnglesRef.current.yaw,
              },
            ),
          };
          if (currentGameState.expedition.phase === "caught") {
            currentGameState = {
              ...currentGameState,
              gameState: "failure",
            };
          }
          currentGameState = syncHeldCubesToPlayers(currentGameState);
          syncLocalCarryStateFromGameState(currentGameState);

          if (recordedAtMs - frameCadence.lastNetworkTickAtMs >= NETWORK_TICK_RATE) {
            currentGameState = advanceOozeTrail(currentGameState, {
              nowMs: recordedAtMs,
              playerPositions: currentGameState.players.map((player) => player.position),
            });
            latestHostSnapshot = publishAuthoritativeState("resync", recordedAtMs);
          }

          if (currentGameState.expedition.phase === "caught") {
            latestHostSnapshot = publishAuthoritativeState("resync", recordedAtMs);
            commitCaught();
          }

          syncRuntimeStores(recordedAtMs);
          renderFrame(isSoloSession ? "solo-sim" : "host-sim", latestHostSnapshot);
          return;
        }

        if (shouldAdvanceSimulation && isClientTransport) {
          const { nextViewAngles, resolvedPose } = stepLocalPose(deltaMs);

          poseRef.current = resolvedPose;
          viewAnglesRef.current = nextViewAngles;
          inputRef.current = clearPlayerLookDelta(inputRef.current);

          if (recordedAtMs - frameCadence.lastNetworkTickAtMs >= NETWORK_TICK_RATE) {
            sendPlayerUpdate();
          }

          syncLocalCarryStateFromSnapshot(latestSnapshot);
          syncRuntimeStores(recordedAtMs);
          renderFrame("client-sim", latestSnapshot);
          return;
        }

        if (latestSnapshot) {
          const latestLocalPlayer = latestSnapshot.players.find((player) => player.id === localPlayerId);

          if (latestLocalPlayer) {
            poseRef.current = {
              ...poseRef.current,
              position: latestLocalPlayer.position,
              rotationY: latestLocalPlayer.rotationY,
            };
            viewAnglesRef.current = createPlayerViewAngles(
              latestLocalPlayer.rotationY,
              latestLocalPlayer.pitch,
              viewAnglesRef.current.lastPitchInputAtMs,
            );
          }

          syncLocalCarryStateFromSnapshot(latestSnapshot);
          syncRuntimeStores(recordedAtMs);
          renderFrame("snapshot-replay", latestSnapshot);
          return;
        }

        syncRuntimeStores(recordedAtMs);
        renderFrame("idle", null);
      });

      let runtimeDisposed = false;
      const rendererWarmupStartedAtMs = performance.now();
      const waitForVisualFrame = (): Promise<void> =>
        new Promise((resolve) => {
          window.requestAnimationFrame(() => resolve());
        });
      const forceProgramLinkCompletion = (): number => {
        const gl = renderer.getContext();
        let linkedProgramCount = 0;

        for (const program of renderer.info.programs ?? []) {
          const linkableProgram = program as unknown as {
            program?: WebGLProgram;
          };
          if (!linkableProgram.program) continue;

          linkedProgramCount += 1;
          const linked = gl.getProgramParameter(
            linkableProgram.program,
            gl.LINK_STATUS,
          ) as boolean;
          if (!linked) {
            const details = gl.getProgramInfoLog(linkableProgram.program) ?? "unknown program link error";
            throw new Error(`Corridor renderer program failed to link: ${details}`);
          }
        }

        return linkedProgramCount;
      };
      const prepareWarmupFrame = (elapsedMs: number): void => {
        const cameraPosition = world.getTerrainEyePosition(poseRef.current.position);
        syncCameraFromPlayer(
          camera,
          cameraPosition,
          viewAnglesRef.current,
          elapsedMs,
          0,
        );
        world.update(elapsedMs, {
          snapshot,
          localPlayerId,
          localPlayerPosition: poseRef.current.position,
          localViewAngles: viewAnglesRef.current,
          localCamera: camera,
        });
      };

      const warmRenderer = async (): Promise<void> => {
        try {
          prepareWarmupFrame(rendererWarmupStartedAtMs);
          renderer.compile(scene, camera);
          let linkedProgramCount = forceProgramLinkCompletion();

          if (runtimeDisposed) return;
          postProcessing.render();
          linkedProgramCount = Math.max(
            linkedProgramCount,
            forceProgramLinkCompletion(),
          );
          await waitForVisualFrame();

          if (runtimeDisposed) return;
          prepareWarmupFrame(performance.now());
          postProcessing.render();
          linkedProgramCount = Math.max(
            linkedProgramCount,
            forceProgramLinkCompletion(),
          );
          await waitForVisualFrame();

          if (runtimeDisposed) return;
          postProcessing.render();
          loop.start();
          patchReadiness({
            simulation: isAuthoritativeLocalSession || isClientTransport,
            rendering: true,
            input: true,
          });
          setIsRendererReady(true);
          recordRuntimeDebugEvent({
            kind: "rendering",
            message: "Completed corridor renderer warm-up",
            payload: {
              durationMs: Math.round((performance.now() - rendererWarmupStartedAtMs) * 100) / 100,
              programs: renderer.info.programs?.length ?? 0,
              linkedProgramCount,
            },
          });
        } catch (error) {
          if (runtimeDisposed) return;
          console.error("Horror Corridor renderer warm-up failed", error);
          recordRuntimeDebugEvent({
            kind: "rendering",
            message: "Corridor renderer warm-up failed",
            payload: {
              error: error instanceof Error ? error.message : String(error),
            },
          });
        }
      };

      void warmRenderer();

      cleanupRuntime = (): void => {
        runtimeDisposed = true;
        loop.stop();
        if (
          (window as HorrorCorridorWindow).__HORROR_CORRIDOR_NEXUS__ ===
          nexusDebugSurface
        ) {
          delete (window as HorrorCorridorWindow).__HORROR_CORRIDOR_NEXUS__;
        }
        if (
          (window as HorrorCorridorWindow).__HORROR_CORRIDOR_LIVE_CONTROL__ ===
          liveAgentControl
        ) {
          delete (window as HorrorCorridorWindow).__HORROR_CORRIDOR_LIVE_CONTROL__;
        }
        unsubscribeTransport?.();
        resizeObserver?.disconnect();
        window.removeEventListener("resize", onResize);
        document.removeEventListener("pointerlockchange", onPointerLockChange);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
        document.removeEventListener("mousemove", onMouseMove);
        mount.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("blur", onBlur);
        world.dispose();
        stalkerAudio.dispose();
        postProcessing.dispose();
        renderer.dispose();

        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }

        patchReadiness({
          simulation: false,
          rendering: false,
          networking: true,
          input: false,
        });
      };
    };

    const currentSnapshot = useRuntimeStore.getState().authoritativeSnapshot;

    if (currentSnapshot) {
      initializeRuntime(currentSnapshot);
    }

    if (!initialized) {
      unsubscribe = useRuntimeStore.subscribe((state, previousState) => {
        if (
          !initialized &&
          state.authoritativeSnapshot !== null &&
          state.authoritativeSnapshot !== previousState.authoritativeSnapshot
        ) {
          initializeRuntime(state.authoritativeSnapshot);
        }
      });
    }

    return () => {
      unsubscribe?.();
      cleanupRuntime();
    };
  }, [patchReadiness, setAuthoritativeSnapshot, setCompletion, setInputFlags, setLocalPlayerPose, setPaused, setScreen, setViewAngles, toggleMonsterIndexOverlay, toggleSettingsOverlay, transport]);

  return (
    <PointerLockGate
      title="Maze runtime"
      description="A real maze world is active here. Move with WASD or arrow keys immediately, or capture the mouse to look around."
      isLocked={isPointerLocked}
      showChrome={false}
      onCapture={() => {
        mountRef.current?.requestPointerLock();
      }}
      onRelease={() => {
        document.exitPointerLock();
      }}
    >
      <div
        ref={mountRef}
        data-render-ready={isRendererReady ? "true" : "false"}
        className="absolute inset-0 h-full w-full"
      />
      {!isRendererReady ? (
        <div
          data-render-warmup="true"
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[#050705]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#9fbd8c]">
            Warming corridor materials
          </p>
        </div>
      ) : null}
    </PointerLockGate>
  );
}
