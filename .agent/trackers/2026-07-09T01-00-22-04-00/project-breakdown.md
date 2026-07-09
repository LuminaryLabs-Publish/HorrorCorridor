# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T01-00-22-04-00`

## Goal

Refresh the repo-local `.agent` docs for one eligible `LuminaryLabs-Publish` repo, identify the active loop/domains/services/kits, and centralize the findings in `LuminaryLabs-Dev/LuminaryLabs`.

## Selection ledger

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor      selected / oldest eligible central alignment 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central 2026-07-08T23-19-33-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-09T00-09-22-04-00
```

No checked non-Cavalry Publish repo was new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

## Current route and runtime

```txt
HorrorCorridor-V1
  -> Next 16 / React 19 app
  -> GameCanvas client runtime
  -> Three.js renderer, scene, camera, post-processing, maze world, minimap
  -> Zustand runtime/session/ui/debug stores
  -> PeerJS host/client transport
  -> domain rules under src/features/game-state/domain
  -> runtime debug export via window.__HORROR_CORRIDOR_DEBUG__
```

## Interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room / join room / solo identity
  -> lobby/loading/readiness gates
  -> mount GameCanvas
  -> build renderer/camera/postprocess/maze world/minimap/debug state
  -> pointer-lock first-person movement
  -> interact key derives pickup/drop/place/remove from distance-to-end plus carry state
  -> local authority uses applyNetworkInteractionRequest and nextState identity
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through networkRules
  -> request-sync/toggle-ready/cancel/default return unchanged state
  -> host/local publishes snapshots through publishAuthoritativeState reason strings
  -> renderer, minimap, HUD, completion UI, and runtime debug consume the latest snapshot
```

## Target authority loop

```txt
CommandEnvelope
  -> InteractionPreflightResult
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityCommandConsumer / HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> GameCanvas result-first splice
  -> DOM-free fixture replay
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
legacy-game-state-interaction-rules
legacy-game-state-network-rules
command-envelope-contract
command-source-normalization
command-reason-catalog
command-result-contract
command-decision-contract
publish-decision-snapshot
command-result-journal
interaction-preflight-diagnostics
player-pose-command-result
interaction-command-result
ooze-command-result
request-sync-command-result
ready-cancel-command-result
victory-command-result
command-seed-state-fixture
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

## Services the kits offer

```txt
app/session service:
  mode selection, room identity, join code, player identity, readiness, pause/resume, completion routing

peer sync service:
  host/client transport, full sync, player update, try interact, request-sync recovery

maze bootstrap service:
  seed hash, maze generation, cell lookup, path build, cube spawns, sequence slots, initial snapshot

first-person player service:
  keyboard input, pointer lock, look delta, movement integration, collision, camera sync, local carry sync

legacy interaction service:
  pickup, drop, place, remove, ordered sequence completion

legacy network service:
  player update, held cube sync, network interaction dispatch, request-sync/toggle-ready/cancel/default no-op

planned command authority service:
  command envelope, reason catalog, result envelope, publish decision, command journal, local/host consumers

planned replay service:
  command fixture seeds, fixture rows, volatile normalization, snapshot parity, proof output

runtime debug service:
  frame capture, event capture, debug export, planned command projection

render service:
  renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
```

## Kits

```txt
implemented:
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

planned next:
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
  runtime-debug-command-projection-kit
  command-result-fixture-matrix-kit
  command-replay-fixture-kit
```

## Main finding

`HorrorCorridor` should not start next with visual expansion, renderer extraction, PeerJS extraction, or minimap extraction.

The highest-value next pass is a result-first command authority splice: add source-backed `CommandResult` and `PublishDecision` helpers, prove them in a DOM-free fixture, then consume them additively in `GameCanvas` and runtime debug projection.

## Next safe ledge

```txt
HorrorCorridor Result-First GameCanvas Command Splice + Runtime Debug Projection Fixture Gate
```
