# HorrorCorridor Command Result Host Debug Readback DSK Map

**Timestamp:** `2026-07-10T01-49-13-04-00`

## Architecture read

`HorrorCorridor` is a Next/React client game under `HorrorCorridor-V1`.

The route is already playable and visually wired. The weak seam is not rendering. It is the command authority boundary between domain rules, host/local consumers, publish decisions, and runtime debug projection.

## Current DSK/domain flow

```txt
session/domain kits
  -> start menu, room identity, host/client/solo mode

maze/bootstrap kits
  -> seeded maze, cells, cube spawns, anomaly sequence slots

player/input kits
  -> keyboard, pointer lock, mouse look, movement, collision, local pose

legacy rule kits
  -> interactionRules.ts returns GameState only
  -> networkRules.ts returns GameState only
  -> oozeRules.ts returns GameState only
  -> winRules.ts returns GameState only

GameCanvas consumer
  -> derives local interaction action
  -> applies network/interaction rules directly
  -> decides no-op by object identity
  -> decides publish by implicit resync/recovery reason
  -> decides victory by currentGameState.gameState

render/debug kits
  -> Three.js world, postprocessing, minimap, runtime debug frames/events
  -> no command-result projection yet
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
command-result-contract-next
publish-decision-snapshot-next
command-result-journal-next
interaction-preflight-diagnostics-next
network-command-preflight-diagnostics-next
ooze-result-diagnostics-next
win-result-diagnostics-next
local-authority-command-consumer-next
host-authority-command-consumer-next
runtime-debug-command-projection-next
command-result-fixture-matrix-next
command-replay-fixture-next
central-ledger-synchronization
```

## Services

```txt
corridor-session-domain-kit
  -> mode selection, room identity, join code, readiness, completion routing

peer-room-sync-domain-kit
  -> host/client transport, full sync, player updates, interaction requests

maze-snapshot-bootstrap-kit
  -> maze, cell lookup, path build, cube spawns, target sequence, initial snapshot

first-person-corridor-player-kit
  -> input, look, movement, collision, camera pose, local carry sync

corridor-interaction-domain-kit
  -> pickup, drop, place, remove through GameState-only functions

ordered-anomaly-sequence-kit
  -> sequence slots, solved flags, victory state, rollback to playing

ooze-trail-domain-kit
  -> decay, spawn, spacing guard, max guard, level update

corridor-render-world-kit
  -> Three.js world rendering, snapshot consumption, scene dressing

corridor-minimap-kit
  -> minimap draw and local player projection

runtime-debug-frame-kit
  -> frame capture, event capture, browser debug API

planned command kits
  -> envelope, reasons, results, publish decisions, journal, fixture matrix, runtime debug projection
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

planned next:
  command-envelope-contract-kit
  command-reason-catalog-kit
  command-result-envelope-kit
  publish-decision-snapshot-kit
  command-result-journal-kit
  interaction-preflight-kit
  network-command-preflight-kit
  ooze-result-rules-kit
  win-result-rules-kit
  interaction-result-rules-kit
  network-result-rules-kit
  local-authority-result-consumer-kit
  host-authority-result-consumer-kit
  runtime-debug-command-projection-kit
  command-result-fixture-matrix-kit
  command-replay-fixture-kit
```

## Architecture finding

Keep the current renderer, minimap, PeerJS transport, and route shell stable.

The next architecture cut should source-own the command result boundary and prove it in a DOM-free fixture before splicing `GameCanvas` publish logic.
