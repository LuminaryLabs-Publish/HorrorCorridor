# HorrorCorridor GameCanvas Command Consumer DSK Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T13:59:50-04:00`

## Architecture read

`HorrorCorridor` already has a rich runtime composition: Next application shell, React canvas mount, Three.js renderer, Zustand runtime/session/debug stores, PeerJS transport, maze/cube/anomaly domain rules, and validation scripts.

The next architectural ledge is not a renderer split. It is a command-consumer split between pure domain results and the browser runtime.

## Current loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> room/player/session identity
-> mount GameCanvas
-> initialize renderer, camera, world, minimap, stores, input, transport, debug
-> pointer-lock movement
-> local or client interact key derives action
-> networkRules / interactionRules return GameState
-> GameCanvas chooses publish or silent return
-> snapshot feeds renderer, minimap, HUD, completion UI, debug frames
```

## Target loop

```txt
input or peer message
-> CommandEnvelope
-> interaction/network preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
-> RuntimeDebugCommandProjection
-> publishAuthoritativeState only when decision allows it
-> DOM-free command fixture replay
-> browser/live validation after fixture proof
```

## Domains in use

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
peer-networking
host-transport
client-transport
network-message-protocol
host-message-ingress
client-message-egress
replicated-snapshot-protocol
full-sync-output
request-sync-recovery
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
publish-decision-snapshot
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
mesh-object-kit-catalog
procedural-texture-kit-family
static-smoke-validation
live-player-validation
replay-parity-validation
```

## Service map

```txt
app-session-service:
  mode selection, room identity, player identity, readiness, pause/resume, completion routing

peer-sync-service:
  host/client transport, player update, try interact, request sync, full sync recovery

maze-bootstrap-service:
  seed hash, maze grid, cell lookup, cube spawn, target sequence, initial replicated snapshot

first-person-player-service:
  pointer lock, keyboard input, mouse look, movement integration, collision, camera sync

interaction-preflight-service:
  playing-state check, player lookup, carried-cube lookup, nearest-cube lookup, anomaly distance, slot lookup

command-result-envelope-service:
  status, reason, before/after state, changed flag, events, diagnostics, legacy return adapter

publish-decision-service:
  publish, skip, no-op, recovery, victory, snapshot reason, broadcast flag, victory commit flag

local-authority-command-consumer-service:
  consume local interaction results, journal outcomes, skip rejected/no-op publishes, commit victory

host-authority-command-consumer-service:
  consume player update, interaction request, request sync, skipped lobby actions, publish or skip consistently

runtime-debug-command-projection-service:
  latest result, latest decision, latest reason, local/host consumer action, command journal counts, fixture parity

fixture-replay-service:
  headless accepted/rejected/unchanged/publish-only/skipped/victory row proof

render-service:
  renderer, scene, camera, post-processing, world update, minimap draw, frame capture
```

## Kits identified

```txt
implemented-source:
  corridor-render-world-kit
  corridor-minimap-kit
  runtime-debug-frame-kit
  ooze-trail-domain-kit
  ordered-anomaly-sequence-kit
  mesh-object-kit-catalog
  procedural-texture-kit-family

candidate-extract:
  corridor-session-domain-kit
  peer-room-sync-domain-kit
  maze-snapshot-bootstrap-kit
  first-person-corridor-player-kit

planned-next:
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

## DSK boundary decision

Do not let `GameCanvas.tsx` own command legality.

Do let `GameCanvas.tsx` keep renderer/mount/event wiring until the command fixture passes.

The immediate DSK boundary is:

```txt
GameCanvas input / peer message
  -> pure command consumer
  -> decision and projection
  -> GameCanvas applies side effects only from the decision
```
