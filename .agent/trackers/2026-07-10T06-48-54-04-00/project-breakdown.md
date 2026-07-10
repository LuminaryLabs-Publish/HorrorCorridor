# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T06-48-54-04-00`

## Selection

The current public `LuminaryLabs-Publish` repository list was compared against central `LuminaryLabs-Dev/LuminaryLabs` tracking and sampled root `.agent` state.

No checked public non-Cavalry repo was new, central-ledger absent, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected as the oldest eligible documented fallback. Its prior central tracking was `2026-07-10T05-11-51-04-00`.

## Evidence read

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/features/networking/protocol/messageTypes.ts
HorrorCorridor-V1/src/features/networking/protocol/syncSnapshot.ts
central repo-ledger/LuminaryLabs-Publish/*.md
repo-local .agent root docs and latest audits
```

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, input refs, pose refs, cadence state, transport listener, and runtime debug
  -> pointer-lock WASD/mouse movement updates local pose and view angles
  -> interact derives pickup/drop/place/remove from carried cube plus anomaly distance
  -> solo/host applies applyNetworkInteractionRequest directly
  -> unchanged nextState returns silently without result metadata
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default collapse to unchanged or implicit recovery behavior
  -> ooze cadence advances through GameState-returning rules
  -> ordered sequence validates victory through GameState-returning rules
  -> publishAuthoritativeState emits full-sync reason strings
  -> renderer, minimap, HUD, completion route, and runtime debug consume latest snapshot
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
legacy-game-state-ooze-rules
legacy-game-state-win-rules
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
local-authority-command-consumer-next
host-authority-command-consumer-next
runtime-debug-command-projection-next
command-fixture-matrix-next
central-ledger-synchronization
```

## Services and kits

Implemented kits:

```txt
corridor-session-domain-kit: mode selection, room identity, readiness
peer-room-sync-domain-kit: host/client transport, full sync, player update, TRY_INTERACT
maze-snapshot-bootstrap-kit: seeded maze snapshot, cell lookup, cube spawns, sequence slots
first-person-corridor-player-kit: input, look, movement, collision, camera pose
corridor-interaction-domain-kit: pickup, drop, place, remove through GameState-only rules
ordered-anomaly-sequence-kit: sequence slots, ordered validation, victory state
ooze-trail-domain-kit: cadence, decay, spawn, spacing guard
corridor-render-world-kit: Three.js world rendering
corridor-minimap-kit: minimap projection
runtime-debug-frame-kit: frame/event capture and export
package-validation-script-kit: lint, harness, smoke, live-player validation commands
```

Next-cut kits:

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
interaction-preflight-diagnostics-kit
network-command-preflight-diagnostics-kit
ooze-result-diagnostics-kit
win-result-diagnostics-kit
local-authority-command-consumer-kit
host-authority-command-consumer-kit
runtime-debug-command-projection-kit
command-fixture-matrix-kit
command-replay-fixture-kit
central-ledger-readback-kit
```

## Main finding

Do not start next with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion.

The blocker is command result journal/readback. `interactionRules.ts`, `networkRules.ts`, `oozeRules.ts`, and `winRules.ts` still return `GameState` only. Rejected, skipped, no-op, recovery, ooze, and victory paths collapse into unchanged state or implicit reason strings. `runtimeDebugStore` cannot report latest command result, publish decision, rejection reason, journal counts, or fixture parity.

## Next safe ledge

```txt
HorrorCorridor Command Result Journal Catch-up + Runtime Debug Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
npm run validate:live-player:dev: not run
browser smoke: not run
command fixture: not run because it does not exist yet
pushed to main: yes, documentation only
```
