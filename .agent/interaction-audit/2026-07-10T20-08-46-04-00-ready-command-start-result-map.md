# HorrorCorridor Ready Command and Start Result Map

**Timestamp:** `2026-07-10T20-08-46-04-00`

## Current interaction map

| Surface | User action | Current source behavior | Authority result |
|---|---|---|---|
| Client lobby primary | `Enter run` | calls `startPlay()`, which calls local `toggleReady()` | none |
| Client lobby secondary | `Toggle ready` | calls local `toggleReady()` | none |
| Host lobby primary | `Start run` | checks host mode and room presence, then bootstraps | none |
| Host lobby secondary | `Add guest` | inserts local connected placeholder | none |
| Protocol action | `TRY_INTERACT toggle-ready` | gameplay reducer returns unchanged state | silent no-op |
| Protocol lobby event | `player-ready` / `player-unready` | type and constructor exist | no producer |
| Legacy shared type | `client/ready` | type exists | no active route |

## Core interaction defect

The same user-facing intent has multiple vocabularies and no authoritative reducer. Presentation state mutates without a command request, host decision, result status, or replicated revision.

## Canonical command proposal

```ts
type LobbyReadyCommand = Readonly<{
  commandId: string;
  roomId: string;
  rosterRevision: number;
  actorPlayerId: string;
  desiredReady: boolean;
  issuedAtMs: number;
}>;
```

## Canonical result proposal

```ts
type LobbyCommandResult = Readonly<{
  commandId: string;
  kind: "ready" | "start";
  status: "accepted" | "rejected" | "no-change";
  reason: string;
  roomId: string;
  rosterRevisionBefore: number;
  rosterRevisionAfter: number;
  rosterFingerprintBefore: string;
  rosterFingerprintAfter: string;
  phaseBefore: string;
  phaseAfter: string;
  actorPlayerId: string;
  recordedAtMs: number;
}>;
```

## Routing rule

```txt
lobby commands
  -> GameShell/session authority adapter
  -> host lobby reducer

active-game interactions
  -> GameCanvas/networkRules
  -> game-state authority reducer
```

`toggle-ready` should not remain a silent branch in active gameplay interaction rules.

## Result consumption

```txt
accepted readiness
  -> publish authoritative LOBBY_EVENT
  -> project roster revision on every peer
  -> clear matching optimistic pending state

rejected readiness
  -> preserve authoritative roster
  -> clear pending state
  -> expose stable reason to UI and debug ledger

accepted start
  -> seal roster
  -> transition to starting
  -> bootstrap exactly once

rejected start
  -> keep lobby phase
  -> render blocked reason
  -> do not generate maze or publish START_GAME/SYNC
```

## Required proof

```txt
one command id produces one terminal result
same command replay is idempotent
wrong-room and non-member commands reject
stale roster revision rejects
accepted ready result changes one player row only
accepted start result and active snapshot share roster fingerprint
no rejected command changes roster, phase, screen, or active game state
```

## Next safe ledge

```txt
HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
```