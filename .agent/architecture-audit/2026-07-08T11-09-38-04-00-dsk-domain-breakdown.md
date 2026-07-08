# HorrorCorridor DSK Domain Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T11:09:38-04:00`

## Purpose

Map the current HorrorCorridor runtime into Nexus-style domains and kits before source changes. This is an implementation-facing breakdown, not a request to rewrite the app.

## Current architecture read

`HorrorCorridor` is implemented as a Next/React/Three/PeerJS browser game under `HorrorCorridor-V1`.

Current runtime authority is concentrated in:

```txt
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Interaction loop

```txt
app shell
  -> session mode selection
  -> room identity and readiness
  -> authoritative snapshot creation
  -> GameCanvas runtime init
  -> player input and pointer lock
  -> movement and collision
  -> interaction action derivation
  -> network or local command route
  -> GameState mutation
  -> publish authoritative snapshot
  -> render world, minimap, HUD, debug frame
```

## Domain breakdown

### Shell and session domains

```txt
application-shell
next-client-runtime
react-game-surface
ui-screen-routing
settings-overlay
completion-routing
pause-state
readiness-state
session-lifecycle
room-identity
join-code-routing
peer-identity
```

### Networking domains

```txt
peer-networking
host-transport
client-transport
network-message-protocol
host-message-ingress
client-message-egress
replicated-snapshot-protocol
full-sync-output
request-sync-recovery
```

### Maze and source-state domains

```txt
seeded-maze-bootstrap
maze-cell-lookup
maze-pathing
cube-spawn-bootstrap
anomaly-sequence-bootstrap
sequence-slot-authority
ordered-sequence-validation
victory-completion
snapshot-build
snapshot-publish-contract
snapshot-publish-metadata
```

### Player domains

```txt
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
```

### Command authority domains

```txt
host-authority
local-authoritative-simulation
remote-authoritative-ingress
command-envelope-contract
command-source-normalization
command-reason-catalog
command-result-contract
command-result-envelope
command-result-status-policy
command-result-rejection-policy
interaction-preflight-diagnostics
player-pose-command-result
interaction-command-result
ooze-command-result
request-sync-command-result
ready-cancel-command-result
victory-command-result
command-result-journal
command-result-fixture-matrix
command-replay-fixture
publish-decision-snapshot
snapshot-publish-fixture
```

### Interaction domains

```txt
cube-carry-interaction
nearest-cube-selection
carried-cube-state
end-anomaly-distance-check
slot-assignment
pickup-preflight
drop-preflight
place-preflight
remove-preflight
correction-reversal
```

### Ooze domains

```txt
ooze-trail-navigation
ooze-decay
ooze-spawn
ooze-spacing-guard
ooze-max-cap
ooze-seeded-rng
```

### Diagnostics and replay domains

```txt
runtime-debug-event-log
runtime-debug-frame-log
runtime-debug-result-projection
cadence-diagnostics
local-authority-result-consumer
host-authority-result-consumer
static-smoke-validation
live-player-validation
replay-parity-validation
```

### Render domains

```txt
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
mesh-object-kit-catalog
procedural-texture-kit-family
```

## Kit inventory

### Implemented source kits

```txt
corridor-render-world-kit:
  creates renderer, scene, camera, post-processing, maze world, scene dressing summary, and world disposal.

corridor-minimap-kit:
  projects snapshot, local pose, and yaw into minimap canvas frame drawing.

runtime-debug-frame-kit:
  records frame/event logs, cadence, snapshot counts, local pose, input, and scene dressing.

ooze-trail-domain-kit:
  advances ooze trail decay/spawn/spacing/max-cap/seeded-rng behavior.

ordered-anomaly-sequence-kit:
  validates slot sequence, solved flags, and victory state.

mesh-object-kit-catalog:
  describes props, sockets, anchors, scene dressing, and object-kit direction.

procedural-texture-kit-family:
  describes procedural material variants and future texture kit direction.
```

### Candidate extraction kits

```txt
corridor-session-domain-kit:
  owns room identity, lobby state, readiness, screen transitions, pause/resume, and completion routing.

peer-room-sync-domain-kit:
  owns host/client transport, full-sync, player update, try-interact, and request-sync recovery routing.

maze-snapshot-bootstrap-kit:
  owns seed hash, maze generation, cube spawns, sequence slots, and initial replicated snapshots.

first-person-corridor-player-kit:
  owns input, pointer lock, look delta, movement, collision, and camera sync.
```

### Planned next command kits

```txt
command-envelope-contract-kit
command-source-normalization-kit
command-reason-catalog-kit
command-result-contract-kit
command-result-envelope-kit
interaction-preflight-reason-catalog-kit
pickup-command-result-kit
drop-command-result-kit
place-command-result-kit
remove-command-result-kit
player-pose-command-result-kit
ooze-command-result-kit
request-sync-command-result-kit
ready-cancel-command-result-kit
victory-command-result-kit
publish-decision-snapshot-kit
command-result-journal-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
```

## Services offered by planned command kits

```txt
command-envelope-contract-kit:
  command id, command source, command type, player id, payload, issued timestamp.

command-reason-catalog-kit:
  stable accepted, rejected, unchanged, publish-only, skipped, and victory reason values.

command-result-envelope-kit:
  before summary, after summary, changed flag, status, reason, diagnostics, events, output state.

interaction-preflight-reason-catalog-kit:
  named rejection reasons for every current silent interaction return.

publish-decision-snapshot-kit:
  maps command results into publish, skip, recovery, no-op, or victory decisions.

command-result-journal-kit:
  appends result records and exposes counts by status and reason.

runtime-debug-result-projection-kit:
  exposes latestCommandResult, latestPublishDecision, latestRejectionReason, commandJournalCounts, and fixture parity.

command-result-fixture-matrix-kit:
  runs deterministic accepted, rejected, unchanged, publish-only, skipped, ooze, and victory rows without DOM or browser dependencies.
```

## Current blocker

The most important architectural blocker is not rendering. It is command source authority.

`interactionRules.ts` and `networkRules.ts` already encode enough business rules to classify commands, but they currently return only `GameState`. The app needs result-returning wrappers beside the existing functions so legacy runtime behavior stays stable while fixtures and runtime debug gain command visibility.

## Next safe source ledge

```txt
HorrorCorridor Command Result Source Wire Map
```

Implementation should create the result contracts and headless command fixture before editing `GameCanvas.tsx` publish decisions.
