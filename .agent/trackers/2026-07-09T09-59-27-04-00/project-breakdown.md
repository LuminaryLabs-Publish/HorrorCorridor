# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T09-59-27-04-00`

## Selection result

The full accessible `LuminaryLabs-Publish` repository list was checked through the GitHub installation list and compared against the tracked `LuminaryLabs-Dev/LuminaryLabs` Publish ledger.

No checked non-Cavalry repo was new, absent from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected as the oldest eligible documented fallback after `IntoTheMeadow` was refreshed at `2026-07-09T09-41-24-04-00`.

## Publish repos observed

```txt
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / oldest eligible central latest 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T08-40-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T09-18-29-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T07-19-41-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T09-10-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T09-41-24-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T08-29-38-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T08-02-33-04-00
```

## Current product read

`HorrorCorridor` is a Next/React cooperative first-person horror maze under `HorrorCorridor-V1`.

It has solo, host, and join flows, PeerJS transport, seeded maze state, pointer-lock movement, cube pickup/drop/place/remove interactions, ordered anomaly completion, ooze cadence, replicated snapshots, minimap rendering, Three.js world rendering, post-processing, and runtime debug frames/events.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> build renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, and debug state
  -> pointer-lock first-person navigation
  -> keyboard/mouse input updates local pose and view angles
  -> interact key derives pickup/drop/place/remove from carried cube plus distance to anomaly
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> unchanged state returns silently on local path
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default collapse to unchanged state
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot through implicit reason string
  -> update Three world, minimap, HUD, completion route, and runtime debug frame
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
session-lifecycle
room-readiness
peer-networking
host-transport
client-transport
network-message-protocol
replicated-snapshot-protocol
seeded-maze-bootstrap
maze-cell-lookup
cube-spawn-bootstrap
anomaly-sequence-bootstrap
sequence-slot-authority
ordered-sequence-validation
victory-completion
first-person-input
pointer-lock-control
keyboard-input
mouse-look-input
player-view-angles
player-movement-integration
maze-collision-resolution
camera-bob
local-pose-prediction
local-carry-state-sync
host-authority
local-authoritative-simulation
legacy-game-state-interaction-rules
legacy-game-state-network-rules
ooze-cadence
command-envelope-contract
command-reason-catalog
command-result-contract
publish-decision-snapshot
command-result-journal
interaction-preflight-diagnostics
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-result-fixture-matrix
command-replay-fixture
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
static-smoke-validation
live-player-validation
replay-parity-validation
central-ledger-synchronization
```

## Kit services

```txt
corridor-session-domain-kit: mode selection, room identity, readiness, pause, completion
peer-room-sync-domain-kit: host/client transport, full sync, player update, try interact, request sync
maze-snapshot-bootstrap-kit: seed, grid, cell lookup, paths, cube spawns, anomaly target sequence
first-person-corridor-player-kit: keyboard input, pointer lock, look deltas, movement, collision, camera pose
corridor-interaction-domain-kit: pickup, drop, place, remove cube behavior
ordered-anomaly-sequence-kit: slot occupancy, required color validation, victory state
interaction-preflight-kit: not-playing, missing-player, already-carrying, no-nearby-cube, no-carried-cube, anomaly-distance, slot availability reasons
network-result-rules-kit: player update, held-cube sync, interaction dispatch, request-sync, toggle-ready, cancel, unknown action classification
ooze-trail-domain-kit: ooze tick, decay, spawn, spacing guard
publish-decision-snapshot-kit: publish, skip, recovery, no-op, victory, broadcast flag, completion flag
command-result-journal-kit: latest result, latest decision, accepted/rejected/skipped counters, replay summaries
runtime-debug-frame-kit: frame capture, event capture, snapshot/cadence/readback export
runtime-debug-command-projection-kit: planned additive command result and publish decision readback
corridor-render-world-kit: Three.js scene, maze world, scene dressing summary, disposal
corridor-minimap-kit: snapshot minimap projection and draw
command-result-fixture-matrix-kit: deterministic accepted/rejected/unchanged/skipped/publish-only/victory rows
command-replay-fixture-kit: DOM-free replay, volatile normalization, final snapshot proof
central-ledger-sync-kit: root .agent pointers, repo ledger, internal change log
```

## Kits identified

```txt
Implemented/source-backed:
- corridor-session-domain-kit
- peer-room-sync-domain-kit
- maze-snapshot-bootstrap-kit
- first-person-corridor-player-kit
- corridor-interaction-domain-kit
- ordered-anomaly-sequence-kit
- ooze-trail-domain-kit
- corridor-render-world-kit
- corridor-minimap-kit
- runtime-debug-frame-kit
- mesh-object-kit-catalog
- procedural-texture-kit-family

Next-cut/source-planned:
- command-envelope-contract-kit
- command-reason-catalog-kit
- command-result-envelope-kit
- command-decision-contract-kit
- publish-decision-snapshot-kit
- command-result-journal-kit
- command-seed-state-fixture-kit
- interaction-preflight-kit
- interaction-result-rules-kit
- network-result-rules-kit
- local-authority-result-consumer-kit
- host-authority-result-consumer-kit
- runtime-debug-command-projection-kit
- command-result-fixture-matrix-kit
- command-replay-fixture-kit
- central-ledger-sync-kit
```

## Main finding

The runtime is playable and already has useful modular source boundaries, but command authority still does not produce first-class result records.

`interactionRules.ts` and `networkRules.ts` return `GameState` only, while `GameCanvas.tsx` decides publish/no-op/victory behavior through object identity checks, action strings, and implicit publish reason strings.

The next implementation should not expand visuals or extract PeerJS/rendering first. It should build source-only command result records, consumer decisions, runtime debug command projection, and a DOM-free fixture matrix before splicing the consumer into `GameCanvas.tsx`.

## Next safe ledge

```txt
HorrorCorridor Result-First Authority Consumer Handoff + Command Fixture Gate
```

## Validation status

This was a documentation-only breakdown.

No runtime source changed.

No local `npm` commands, browser route checks, or live host/client multiplayer checks were run.
