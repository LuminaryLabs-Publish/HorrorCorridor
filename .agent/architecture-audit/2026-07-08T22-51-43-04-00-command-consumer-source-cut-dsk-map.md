# HorrorCorridor Command Consumer Source Cut DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T22-51-43-04-00`

## Goal

Document the current DSK/domain map and the next source cut required to turn implicit `GameState` mutations into typed command results and authority consumers.

## Interaction loop

```txt
app start
  -> menu/lobby/session mode
  -> GameCanvas runtime mount
  -> seeded maze snapshot
  -> Three renderer, camera, postprocess, world, minimap, debug stores
  -> pointer-lock movement
  -> action derivation from carried cube plus anomaly distance
  -> local host/solo command or client TRY_INTERACT
  -> networkRules / interactionRules mutate or silently return GameState
  -> sync held cubes
  -> advance ooze on cadence
  -> build replicated snapshot
  -> publish / broadcast / render / minimap / debug frame
```

## Current architecture read

`HorrorCorridor-V1/package.json` exposes a Next/React app with validation, harness, live-agent, protokit smoke, visual match, and live-player scripts.

`GameCanvas.tsx` owns runtime composition: renderer creation, scene/camera/postprocessing, world building, pointer lock, input, player movement, collision, host/client transport handling, command derivation, local and host command application, authoritative snapshot publication, minimap drawing, debug frame capture, and cleanup.

`interactionRules.ts` owns cube pickup, drop, place, and remove behavior, but every invalid branch returns the original `GameState` without status, reason, diagnostics, or event metadata.

`networkRules.ts` owns player updates, held-cube sync, and network interaction dispatch, but `request-sync`, `toggle-ready`, `cancel`, and default actions return state unchanged without policy metadata.

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
session-lifecycle
room-identity
readiness-state
peer-networking
host-transport
client-transport
network-message-protocol
replicated-snapshot-protocol
seeded-maze-bootstrap
maze-cell-lookup
maze-pathing
cube-spawn-bootstrap
anomaly-sequence-bootstrap
first-person-input
pointer-lock-control
player-view-angles
player-movement-integration
maze-collision-resolution
camera-bob
local-pose-prediction
local-carry-state-sync
cube-carry-interaction
sequence-slot-authority
ordered-sequence-validation
victory-completion
ooze-trail-navigation
host-authority
local-authoritative-simulation
remote-authoritative-ingress
legacy-game-state-interaction-rules
legacy-game-state-network-rules
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
runtime-debug-frame-capture
scene-dressing-descriptors
validation-harnesses
```

## Target DSK split

```txt
command-envelope-contract-kit
  owns: command id, source, actor, action, payload, source mode

command-reason-catalog-kit
  owns: accepted, rejected, unchanged, skipped, publish-only, victory reason values

interaction-preflight-kit
  owns: playing-state check, player lookup, carried cube lookup, nearest cube lookup, anomaly distance, free-slot lookup, occupied-slot lookup

interaction-result-rules-kit
  owns: pickup/drop/place/remove result wrappers and legacy adapters

network-result-rules-kit
  owns: player update result, held cube sync result, interaction dispatch result, request-sync/toggle-ready/cancel/default classification

publish-decision-snapshot-kit
  owns: publish, skip, no-op, recovery, victory decisions and snapshot reason mapping

command-result-journal-kit
  owns: serializable command journal entries, counts, latest status, latest reason, latest decision

local-authority-result-consumer-kit
  owns: local solo/host publish behavior, rejected/no-op skip behavior, victory commit intent

host-authority-result-consumer-kit
  owns: host PLAYER_UPDATE and TRY_INTERACT consumption, request-sync recovery, rejected TRY_INTERACT skip behavior

runtime-debug-command-projection-kit
  owns: latest command result, latest publish decision, journal counters, fixture parity projection

command-replay-fixture-kit
  owns: DOM-free seed rows, command replay, volatile normalization, final snapshot parity
```

## Services the kits offer

```txt
app/session service
peer sync service
maze bootstrap service
first-person player service
legacy interaction mutation service
legacy network mutation service
interaction preflight service
command result envelope service
publish decision service
local authority result consumer service
host authority result consumer service
runtime debug projection service
fixture seed and replay service
render/minimap/debug frame service
validation harness service
```

## Implemented kits

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
```

## Next-cut kits

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
command-decision-contract-kit
publish-decision-snapshot-kit
command-result-journal-kit
command-seed-state-fixture-kit
interaction-preflight-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
```

## Critical cutline

Do not rewrite `GameCanvas.tsx` first.

Add pure domain files and a DOM-free fixture first.

Only after fixture proof should `GameCanvas.tsx` switch from object identity checks to explicit `PublishDecision` consumption.
