import type { LobbyPlayer } from "@/types/shared";

import {
  createInitialGameState,
  type InitialGameStateResult,
} from "./createInitialGameState";

export type BeginSoloExpeditionInput = Readonly<{
  attemptId: string;
  playerName: string;
}>;

export type SoloExpeditionDeparture = Readonly<{
  attemptId: string;
  playerId: string;
  playerName: string;
  bootstrap: InitialGameStateResult;
}>;

const normalizePlayerName = (value: string): string =>
  value.trim() || "Wanderer";

/**
 * Owns the complete solo departure transaction behind begin-expedition-kit.
 * Hosts provide only an opaque attempt identity, then adapt the returned
 * authoritative bootstrap into their local session and presentation stores.
 */
export const beginSoloExpedition = (
  input: BeginSoloExpeditionInput,
): SoloExpeditionDeparture => {
  const attemptId = input.attemptId.trim();

  if (!attemptId) {
    throw new Error("A solo expedition requires a non-empty attempt identity.");
  }

  const playerName = normalizePlayerName(input.playerName);
  const roomId = `solo-corridor-${attemptId}`;
  const playerId = `solo-player-${attemptId}`;
  const player: LobbyPlayer = {
    id: playerId,
    name: playerName,
    isHost: true,
    ready: true,
    connectionState: "connected",
  };

  return Object.freeze({
    attemptId,
    playerId,
    playerName,
    bootstrap: createInitialGameState({
      roomId,
      joinCode: "SOLO",
      hostId: playerId,
      players: [player],
      localPlayerId: playerId,
      localPlayerName: playerName,
      seedSource: `${roomId}:procedural-solo`,
    }),
  });
};
