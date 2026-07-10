# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Tracker timestamp:** `2026-07-09T22-50-53-04-00`

**Slice:** `HorrorCorridor Command Result Debug Readback + Result-First Fixture Gate`

## Selection result

The current public `LuminaryLabs-Publish` repository list was checked and compared against `LuminaryLabs-Dev/LuminaryLabs` central ledger state.

No checked public non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected as the oldest eligible documented fallback. The central ledger for `HorrorCorridor` was at `2026-07-09T18-30-30-04-00`, older than the other checked eligible public entries.

## Public Publish repos checked

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T19-09-44-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T19-00-15-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T18-49-13-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T18-41-55-04-00
LuminaryLabs-Publish/HorrorCorridor       selected / oldest eligible documented fallback / central latest 2026-07-09T18-30-30-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T19-29-23-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T22-40-25-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T19-21-19-04-00
```

## Evidence read

```txt
LuminaryLabs-Publish public repository list
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/*.md sampled by direct file reads
LuminaryLabs-Publish/HorrorCorridor:.agent/START_HERE.md
LuminaryLabs-Publish/HorrorCorridor:.agent/current-audit.md
LuminaryLabs-Publish/HorrorCorridor:.agent/known-gaps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/next-steps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/validation.md
LuminaryLabs-Publish/HorrorCorridor:.agent/kit-registry.json
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/features/networking/protocol/syncSnapshot.ts
```

## Product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The active app is a Next/React client with Three.js rendering, pointer-lock movement, PeerJS host/client sync, Zustand runtime stores, minimap drawing, runtime debug capture, and validation scripts.

The runtime already plays, renders, syncs, and can complete. The blocker is not visuals or networking extraction. The blocker is command-result readback.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, and debug state
  -> pointer-lock first-person navigation
  -> keyboard/mouse input updates local pose and view angles
  -> interact key derives pickup/drop/place/remove from carried cube state and anomaly distance
  -> local solo/host calls applyNetworkInteractionRequest directly
  -> unchanged nextState returns silently
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default paths collapse to unchanged state
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot through implicit reason strings
  -> update Three world, minimap, HUD, completion route, and runtime debug frame
```

## Current authority loop

```txt
local solo/host interaction
  -> GameCanvas derives action from distance and carried state
  -> applyNetworkInteractionRequest returns GameState only
  -> object identity decides whether to publish
  -> no result row explains rejection or no-op

host TRY_INTERACT
  -> networkRules dispatches to interactionRules
  -> invalid branches return original GameState
  -> host publishes resync or recovery based on input action
  -> no CommandResult or PublishDecision explains the broadcast

runtime debug
  -> records frame, snapshot, cube, anomaly, cadence, input, scene dressing
  -> records freeform events
  -> exposes window.__HORROR_CORRIDOR_DEBUG__
  -> lacks latestCommandResult, latestPublishDecision, commandJournal, and fixture parity
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
ui-screen-routing
session-lifecycle
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
ooze-decay-and-spawn
runtime-debug-frame-store
runtime-debug-event-store
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
command-envelope-contract-next
command-reason-catalog-next
command-result-envelope-next
publish-decision-snapshot-next
command-result-journal-next
interaction-preflight-next
local-authority-command-consumer-next
host-authority-command-consumer-next
runtime-debug-command-projection-next
command-result-fixture-matrix-next
command-replay-fixture-next
central-ledger-synchronization
```

## Kit services

```txt
app-session service: mode selection, room identity, join code, player identity, readiness, pause/resume, completion route
peer-sync service: host/client transport, full sync, player update, try interact, request-sync recovery path
maze-bootstrap service: seed hash, maze generation, cell lookup, path build, cube spawn, sequence slots, initial snapshot
first-person-player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
legacy-interaction service: pickup, drop, place, remove, ordered completion, GameState-only return
legacy-network service: player update, held cube sync, interaction dispatch, request-sync/toggle-ready/cancel/default no-op, GameState-only return
ooze service: decay, spawn, spacing guard, max ooze, GameState-only return
runtime-debug service: event capture, frame capture, cadence readback, snapshot readback, debug window export
render service: renderer, scene, camera, post-processing, maze world, minimap, scene dressing, disposal
validation service: lint, proto-kit smoke, headless harness, live-player harness, object-kit review
planned command-result service: command envelope, status, reason, before/after facts, changed flag, events, diagnostics, legacy adapter
planned publish-decision service: publish, skip, recovery, no-op, victory, broadcast flag, completion flag
planned debug projection service: latest result, latest decision, journal counts, fixture parity
central-ledger service: root .agent docs, timestamped tracker, repo ledger, internal change log
```

## Kits identified

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
mesh-object-kit-catalog
procedural-texture-kit-family
command-envelope-contract-kit
command-source-policy-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
command-seed-state-fixture-kit
interaction-preflight-kit
network-command-preflight-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-command-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
central-ledger-sync-kit
```

## Main finding

`interactionRules.ts` and `networkRules.ts` still return `GameState` only. Rejected and skipped command paths collapse into unchanged state without status or reason metadata. `GameCanvas.tsx` uses object identity and implicit reason strings as the publish gate. `runtimeDebugStore.ts` exposes frame/event snapshots but has no command result or publish-decision projection.

## Next safe ledge

```txt
HorrorCorridor Command Result Debug Readback + Result-First Fixture Gate
```

Build this before renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion.

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
npm run validate:live-player:dev: not run
node scripts/horror-corridor-command-fixture.mjs: not run because fixture does not exist yet
browser smoke: not run
pushed to main: yes, documentation only
```
