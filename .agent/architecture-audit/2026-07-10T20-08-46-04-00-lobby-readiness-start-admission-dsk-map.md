# HorrorCorridor Lobby Readiness and Start Admission DSK Map

**Timestamp:** `2026-07-10T20-08-46-04-00`

## Architecture statement

The current lobby surface spans React presentation, Zustand state, PeerJS transport, protocol envelopes, session bootstrap, and active-game initialization. The types describe readiness, but no single domain owns readiness intent, authoritative mutation, replication, start admission, or audit results.

## Active domains

| Domain | Source boundary | Current responsibility |
|---|---|---|
| Application shell | `GameShell.tsx` | session mode, screen transitions, lobby actions, bootstrap orchestration |
| Lobby presentation | `LobbyScreen.tsx` | room code, players, ready labels, start/toggle controls |
| Session state | `sessionStore.ts` | room, local peer identity, connection status, lobby-player projection |
| Peer transport | `features/networking/peer/*` | host/client connection, send, broadcast, transport events |
| Protocol vocabulary | `messageTypes.ts`, `syncSnapshot.ts` | START_GAME, TRY_INTERACT, SYNC, LOBBY_EVENT, message constructors |
| Lobby membership | `GameShell.tsx`, `sessionStore.ts` | joined/left players and placeholder guests |
| Readiness intent | partial only | local toggle plus unused protocol/type vocabulary |
| Start admission | inline in `GameShell.startPlay()` | currently checks only host mode and room presence |
| Active bootstrap | `createInitialGameState.ts` | deterministic maze, active room, player entities, initial snapshot |
| Runtime authority | `GameCanvas.tsx`, `networkRules.ts` | player updates, interactions, state publication |
| UI projection | `GameShell.tsx`, Zustand stores | lobby, playing, paused, completed views |
| Rendering | Three.js render modules | world, post-processing, minimap, HUD |
| Diagnostics | runtime debug store | gameplay frames/events; no lobby result rows |
| Validation | package scripts | build, lint, harness, visual and live-player checks |

## Implemented kits and services

### `corridor-session-domain-kit`

Services: solo/host/client selection, peer identity, room identity, session entry, return-to-lobby and return-to-title lifecycle.

### `lobby-screen-presentation-kit`

Services: room metadata, roster display, ready/waiting labels, primary/secondary controls, connection-status projection.

### `session-store-room-projection-kit`

Services: local room storage, roster upsert/remove, room-player synchronization, local timestamp refresh, session reset.

### `peer-room-sync-domain-kit`

Services: host/client transport adapters, connection events, generic protocol delivery, host broadcast, client send.

### `protocol-message-construction-kit`

Services: versioned envelopes and constructors for host start, player update, interaction request, full sync, and lobby event messages.

### `maze-snapshot-bootstrap-kit`

Services: deterministic seed hash, maze generation, cube and anomaly creation, room activation, player spawn descriptors, initial replicated snapshot.

### `first-person-corridor-player-kit`

Services: pointer lock, keyboard/mouse input, camera look, movement, collision, local prediction, player-update publication.

### `corridor-interaction-domain-kit`

Services: pickup, drop, anomaly placement/removal, held-cube synchronization, network interaction consumption.

### `ordered-anomaly-sequence-kit`

Services: ordered slot validation, rollback, completion, victory transition.

### `ooze-trail-domain-kit`

Services: ooze cadence, decay, placement, spacing and capacity guards.

### `corridor-authoritative-publication-kit`

Services: tick advancement, snapshot construction, host broadcast, publication cadence and reasons.

### `corridor-render-world-kit`

Services: Three.js scene, maze geometry, cubes, players, anomaly, ooze, scene dressing, post-processing.

### `corridor-minimap-kit`

Services: top-down maze projection, player markers, cube/anomaly markers.

### `runtime-debug-frame-kit`

Services: bounded frame/event history, overlay preferences, JSON-safe browser export for active gameplay.

## Split and duplicated readiness vocabulary

```txt
messageTypes.ts
  InteractionRequestAction: toggle-ready
  LobbyEventKind: player-ready | player-unready

shared.ts
  ClientReadyMessage: client/ready { ready }
  ClientActionMessage: client/action { action: toggle-ready }

GameShell.tsx
  toggleReady(): local sessionStore mutation only

networkRules.ts
  toggle-ready: returns state unchanged
```

These are declarations without one authoritative command path.

## Required candidate kits

### `lobby-readiness-command-kit`

Services: immutable ready intent, request identity, actor identity, desired ready value, preflight result.

### `lobby-readiness-authority-kit`

Services: host-only roster mutation, membership check, connection-state check, idempotent same-value handling, authoritative result.

### `lobby-roster-snapshot-kit`

Services: immutable roster revision, stable roster fingerprint, connected-player counts, ready-player counts, placeholder classification.

### `lobby-start-admission-policy-kit`

Services: host authorization, room phase validation, minimum/maximum player checks, connected-participant check, all-required-ready check, placeholder rejection, typed start result.

### `lobby-phase-transition-kit`

Services: atomic `lobby -> starting -> active` transition, transition revision, rollback on bootstrap failure, final admitted roster sealing.

### `lobby-result-ledger-kit`

Services: bounded ready/start request rows, accepted/rejected/no-change status, stable reasons, roster before/after fingerprints.

### `lobby-debug-projection-kit`

Services: JSON-safe roster, revision, phase, pending start, last command, last admission result, counters.

### `lobby-admission-fixture-kit`

Services: DOM-free reducer replay, readiness replication, stale/duplicate requests, disconnected players, placeholders, start acceptance/rejection and bootstrap roster parity.

### `legacy-lobby-readiness-compatibility-kit`

Services: temporary translation from legacy `client/ready`, `client/action toggle-ready`, and `TRY_INTERACT toggle-ready` into one canonical command.

## Ownership rule

```txt
Lobby authority owns readiness and admission.
Gameplay interaction rules do not own lobby commands.
Presentation stores project authoritative lobby state but do not decide it.
Bootstrap consumes an immutable admitted roster and does not re-evaluate readiness.
```

## Recommended composition

```txt
client UI
  -> lobby-readiness-command-kit
  -> peer-room-sync-domain-kit
  -> protocol preflight
  -> lobby-readiness-authority-kit
  -> lobby-roster-snapshot-kit
  -> LOBBY_EVENT publication
  -> session-store-room-projection-kit

host Start run
  -> lobby-start-admission-policy-kit
  -> lobby-phase-transition-kit
  -> maze-snapshot-bootstrap-kit
  -> START_GAME + initial SYNC
  -> lobby-result-ledger-kit
  -> lobby-debug-projection-kit
```

## Next safe ledge

```txt
HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
```