# HorrorCorridor Command Result Consumer Readback DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-30-54-04-00`

## Selection context

The current accessible `LuminaryLabs-Publish` organization list was compared against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state.

No checked non-Cavalry repo was new, absent from the central ledger, missing sampled root `.agent` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected because central tracking for the repo was still the oldest sampled Publish ledger alignment while the repo-local `.agent` state had already advanced to command authority source-cut documentation.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> build renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, and debug state
  -> enter pointer-lock first-person navigation
  -> derive action from carried cube plus distance to anomaly
  -> local solo/host runs applyNetworkInteractionRequest directly
  -> local path compares nextState === currentGameState to decide silent skip
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default paths collapse to unchanged GameState
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot by implicit reason string
  -> update Three world, minimap, HUD, completion routing, and runtime debug frames
```

## Target DSK authority loop

```txt
CommandEnvelope
  -> CommandReasonCatalog
  -> InteractionPreflightResult or NetworkCommandPreflightResult
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityResultConsumer or HostAuthorityResultConsumer
  -> RuntimeDebugCommandProjection
  -> optional snapshot publish
  -> optional victory commit
  -> DOM-free command replay fixture
  -> GameCanvas consumer splice
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
central-ledger-synchronization
```

## Current services

```txt
app/session service:
  mode, room, readiness, pause, completion

peer sync service:
  host/client transport, full sync, player update, try interact

maze bootstrap service:
  seed, maze generation, cell lookup, path build, cube spawn, sequence slots

first-person player service:
  keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync

legacy GameState interaction service:
  pickup, drop, place, remove, ordered completion

legacy GameState network service:
  player update, held-cube sync, interaction dispatch, request-sync no-op

command fixture seed service:
  planned canonical GameState seeds and expected row facts

command result envelope service:
  planned command id, source, status, reason, changed flag, events, diagnostics, legacy adapters

publish decision service:
  planned publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag

local authority result consumer service:
  planned local result journal and publish/skip behavior

host authority result consumer service:
  planned host result journal, request-sync recovery, rejected TRY_INTERACT skip, and accepted/victory publish behavior

diagnostics and replay service:
  runtime events, runtime frames, cadence, planned command readback, fixture parity

render service:
  renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
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
central-ledger-sync-kit
```

## DSK split map

```txt
legacy GameState rules
  -> interaction-preflight-kit
  -> interaction-result-rules-kit
  -> network-result-rules-kit
  -> command-result-envelope-kit
  -> legacy adapter exports that still return result.state

GameCanvas local/host authority
  -> command-envelope-contract-kit
  -> publish-decision-snapshot-kit
  -> local-authority-result-consumer-kit
  -> host-authority-result-consumer-kit
  -> runtime-debug-command-projection-kit

validation surface
  -> command-seed-state-fixture-kit
  -> command-result-fixture-matrix-kit
  -> command-replay-fixture-kit
```

## Next safe ledge

```txt
HorrorCorridor Command Result Consumer Readback + Seeded Replay Fixture Gate
```
