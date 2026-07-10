# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-10T10-58-54-04-00`

## Selected repo

`LuminaryLabs-Publish/HorrorCorridor`

## Selection reason

The public `LuminaryLabs-Publish` repo list was checked and compared with central ledger state. No checked non-Cavalry repo was new, missing from the central ledger, missing sampled root `.agent` state, recently added, or otherwise undocumented.

`TheCavalryOfRome` stayed excluded by rule. `HorrorCorridor` was the oldest eligible documented fallback after `IntoTheMeadow` advanced to `2026-07-10T10-49-23-04-00`.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates complete
  -> GameCanvas mounts
  -> renderer, camera, post-processing, maze world, minimap, input refs, pose refs, cadence state, transport listener, and runtime debug initialize
  -> pointer-lock first-person navigation updates pose and view angles
  -> interact key derives pickup, drop, place, or remove from carried cube and anomaly distance
  -> solo/host applies applyNetworkInteractionRequest directly
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync, toggle-ready, cancel, unknown action, ooze, and victory paths return GameState only
  -> publish or skip is inferred from changed state or implicit reason strings
  -> renderer, minimap, HUD, completion route, and runtime debug consume latest snapshot
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
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
runtime-debug-command-projection-next
command-fixture-matrix-next
command-replay-fixture-next
central-ledger-synchronization
```

## Services kits offer

```txt
corridor-session-domain-kit: mode selection, room identity, readiness, host/client/solo entry
peer-room-sync-domain-kit: host/client transport, full sync, player updates, interaction requests
maze-snapshot-bootstrap-kit: deterministic maze snapshot, cell lookup, cube spawns, anomaly slots
first-person-corridor-player-kit: pointer lock, movement integration, collision, camera pose, local prediction
corridor-interaction-domain-kit: pickup, drop, place, remove, carried cube synchronization
ordered-anomaly-sequence-kit: sequence slots, ordered color validation, completion, victory state
ooze-trail-domain-kit: ooze cadence, spawn, decay, spacing guard, trail transitions
corridor-render-world-kit: Three.js world rendering, maze surfaces, cubes, anomaly markers, scene dressing
corridor-minimap-kit: minimap projection, player markers, object markers
runtime-debug-frame-kit: frame capture, event capture, debug export
legacy rules adapters: interaction, network, ooze, and win rules returning GameState only
planned proof services: command envelope, reason catalog, result envelope, publish decision, journal, runtime debug command projection, command fixture matrix, replay fixture
```

## Kits

Current kits:

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
legacy-interaction-rules-adapter
legacy-network-rules-adapter
legacy-ooze-rules-adapter
legacy-win-rules-adapter
```

Next-cut kits:

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
local-authority-command-consumer-kit
host-authority-command-consumer-kit
runtime-debug-command-projection-kit
command-fixture-matrix-kit
command-replay-fixture-kit
central-ledger-sync-kit
```

## Main finding

`HorrorCorridor` should not start next with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, route rewrites, new maze content, or visual object-kit expansion.

The blocker remains command-decision readback. `interactionRules.ts` and `networkRules.ts` return `GameState` only, `GameCanvas.tsx` infers publish/skip from state identity or implicit reason strings, and `runtimeDebugStore.ts` exports frames/events but not command results, publish decisions, rejection reasons, or fixture parity.

## Next safe ledge

```txt
HorrorCorridor Command Decision Debug Readback Ledger Refresh + Fixture Gate
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
command fixture: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: pending in this pass
```
