# HorrorCorridor DSK / Domain Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T09:40:52-04:00`

## Selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against central tracking.

No new untracked eligible repo was found.

`TheCavalryOfRome` remains excluded.

`HorrorCorridor` was selected as the oldest accessible non-Cavalry fallback repo.

## Current runtime route

```txt
HorrorCorridor-V1/package.json
  -> next dev/build/start and validation scripts
  -> src/components/game/GameCanvas.tsx
  -> buildGameStateFromSnapshot()
  -> createRenderer/createScene/createCamera/createPostProcessing/buildMazeWorld
  -> input, pose, view angle, collision, minimap, debug, and network setup
  -> networkRules.ts / interactionRules.ts
  -> buildReplicatedSnapshot()
  -> runtime debug frame export
```

## Current interaction loop

```txt
start menu
  -> solo/host/client session
  -> replicated snapshot seed
  -> GameCanvas runtime mount
  -> pointer-lock movement
  -> distance/carried-cube action selection
  -> network/local interaction request
  -> cube pickup/drop/place/remove
  -> ordered sequence validation
  -> ooze cadence and authoritative publish
  -> renderer/minimap/HUD/debug frame consumption
  -> completion screen on victory
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
maze-pathing
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
remote-authoritative-ingress
cube-carry-interaction
nearest-cube-selection
end-anomaly-distance-check
slot-assignment
ooze-trail-navigation
snapshot-build
snapshot-publish-contract
runtime-debug-event-log
runtime-debug-frame-log
cadence-diagnostics
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
mesh-object-kit-catalog
procedural-texture-kit-family
```

## Planned command authority domains

```txt
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
publish-decision-routing
publish-decision-snapshot
command-result-journal
command-result-fixture-matrix
command-replay-fixture
runtime-debug-result-projection
local-authority-result-consumer
host-authority-result-consumer
replay-parity-validation
```

## Services that current kits offer

```txt
corridor-session-domain-kit:
  - solo/host/client session flow
  - room identity
  - join code flow
  - readiness and completion routing

peer-room-sync-domain-kit:
  - host/client transport
  - player update messages
  - interaction request messages
  - full-sync recovery

maze-snapshot-bootstrap-kit:
  - seed-to-maze bootstrap
  - maze lookup
  - cube spawn setup
  - anomaly sequence setup
  - replicated snapshot rebuild

first-person-corridor-player-kit:
  - keyboard input
  - pointer lock
  - mouse look
  - movement integration
  - collision resolution
  - camera pose sync

corridor-interaction-domain-kit:
  - find player
  - find carried cube
  - find nearest loose cube
  - pickup/drop/place/remove cube mutations
  - anomaly distance checks
  - sequence slot assignment

ordered-anomaly-sequence-kit:
  - ordered color-slot validation
  - victory state update
  - completion trigger source

ooze-trail-domain-kit:
  - cadence-gated ooze progression
  - spawn/decay behavior
  - max-cap and spacing guards

corridor-render-world-kit:
  - Three.js scene/camera/renderer/post-process setup
  - maze world mesh construction
  - scene dressing summary
  - dispose lifecycle

corridor-minimap-kit:
  - minimap canvas projection
  - snapshot/player/yaw projection

runtime-debug-frame-kit:
  - runtime events
  - frame records
  - cadence counters
  - snapshot/cube/anomaly/input/render summaries
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
publish-decision-routing-kit
publish-decision-snapshot-kit
command-result-journal-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
```

## Main architecture finding

The repo has enough modular source structure to add command authority without a rewrite.

The next implementation should add result-returning wrapper kits beside existing `GameState`-returning exports, then keep the legacy exports stable until fixtures prove parity.

## Do not do next

```txt
- do not extract PeerJS first
- do not extract renderer first
- do not rewrite GameCanvas wholesale
- do not change game routes first
- do not add new visual content first
```