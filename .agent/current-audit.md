# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T20-08-46-04-00`

## Status

```txt
status: lobby-readiness-authority-start-admission-fixture-gate-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: internal-change-log/2026-07-10T20-08-46-04-00-horror-corridor-lobby-readiness-start-admission.md
```

## Selection

No eligible repository was new, absent from the central ledger, missing root `.agent` state, or otherwise undocumented. `HorrorCorridor` was selected as the oldest eligible documented fallback. `TheCavalryOfRome` remained excluded.

## Interaction loop

```txt
select host or join
  -> create or join lobby
  -> host tracks peer membership
  -> render roster and readiness badges
  -> client presses Enter run or Toggle ready
  -> local sessionStore row changes only on that client
  -> host receives no readiness command
  -> host presses Start run
  -> startPlay checks host mode and room presence only
  -> createInitialGameState converts host roster into active room and players
  -> host publishes START_GAME and initial SYNC
  -> active first-person corridor loop begins
```

## Domains in use

```txt
application shell and session lifecycle
lobby presentation and controls
session room and roster projection
PeerJS host/client transport
protocol envelopes and message construction
lobby membership and connection-state tracking
partial readiness vocabulary and local readiness presentation
inline host start orchestration
seeded maze, cube, anomaly, room, and player bootstrap
first-person input, movement, collision, camera, and prediction
interaction, network, ooze, and victory rules
authoritative active-game publication
Three.js world, post-processing, minimap, HUD, and scene dressing
runtime debug frame and event storage
package-level build, lint, harness, visual, and live-player validation
planned lobby command, host readiness authority, roster fingerprint, start admission, phase transaction, result ledger, debug projection, compatibility, and fixture domains
```

## Kits and services

```txt
corridor-session-domain-kit
  mode selection, identity, room lifecycle, session entry/exit
lobby-screen-presentation-kit
  room metadata, roster, ready badges, lobby controls
session-store-room-projection-kit
  room/roster storage, upsert/remove, local reset
peer-room-sync-domain-kit
  PeerJS host/client transport, send, broadcast, transport events
protocol-message-construction-kit
  versioned START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT envelopes
maze-snapshot-bootstrap-kit
  deterministic maze, cubes, anomaly, active room, players, initial snapshot
first-person-corridor-player-kit
  pointer lock, input, movement, collision, camera, prediction
corridor-interaction-domain-kit
  pickup, drop, place, remove, carried-cube synchronization
ordered-anomaly-sequence-kit
  ordered validation, rollback, completion, victory
ooze-trail-domain-kit
  cadence, decay, spawn, spacing and capacity guards
corridor-authoritative-publication-kit
  tick, snapshot, broadcast, publication reasons and cadence
corridor-render-world-kit
  Three.js world, maze, cubes, players, anomaly, ooze, dressing, post
corridor-minimap-kit
  maze and object top-down projection
runtime-debug-frame-kit
  bounded active-game frames/events and JSON-safe export
```

## Source findings

```txt
LobbyScreen renders ready/waiting and says to start when the room is ready.
Client primary and secondary lobby actions both call local toggleReady().
toggleReady() mutates only local Zustand state and sends no network message.
messageTypes names toggle-ready plus player-ready/player-unready.
shared.ts separately defines client/ready and client/action toggle-ready.
networkRules treats toggle-ready as an unchanged active-game state.
Host startPlay has no all-ready, connection, placeholder, revision, or phase admission checks.
addGuestPlaceholder can create a connected row that bootstrap turns into an active player.
createInitialGameState consumes the current roster and immediately creates an active room.
No lobby command result, roster fingerprint, admission result, debug row, or fixture exists.
```

## Main finding

The lobby is not authoritative. A client can appear ready locally while the host remains unaware, and the host can begin the run from an unready, disconnected, stale, or placeholder-containing roster. Readiness must become a host-owned lobby command domain before bootstrap.

## Next safe ledge

```txt
HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
existing checks run: no
lobby admission fixture: unavailable
repo-local docs pushed to main: yes
central ledger updated: yes
central change log added: yes
```