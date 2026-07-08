# HorrorCorridor DSK Domain Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T12-29-17-04:00`

## Goal

Record the current domain/service/kit map and narrow the next source change to the command-result consumer seam.

## Interaction loop

```txt
start menu
-> solo / host / join
-> room identity and readiness
-> GameCanvas runtime initialization
-> seeded maze and replicated snapshot bootstrap
-> pointer-lock movement and look
-> interact action derived from distance-to-end and carried-cube state
-> interactionRules/networkRules mutate or silently return GameState
-> publishAuthoritativeState emits replicated snapshot
-> render world / minimap / HUD / completion / debug consume snapshot
```

## Target loop

```txt
local input or peer message
-> CommandEnvelope
-> preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> local or host command consumer
-> publish / skip / recovery / no-op / victory
-> runtime debug projection
-> fixture replay proof
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
command-result-fixture-matrix
command-replay-fixture
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
snapshot-build
snapshot-publish-contract
snapshot-publish-metadata
publish-decision-snapshot
snapshot-publish-fixture
runtime-debug-event-log
runtime-debug-frame-log
runtime-debug-result-projection
cadence-diagnostics
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

## Services that kits offer

```txt
app-session-service:
  room identity, join code, player identity, mode selection, readiness, pause/resume, completion routing

peer-sync-service:
  host transport, client transport, full sync, player update, try interact, request sync recovery

maze-bootstrap-service:
  seed hash, maze generation, cell lookup, path build, cube spawn, sequence slots, initial snapshot

first-person-player-service:
  keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync

interaction-preflight-service:
  playing-state validation, player lookup, carried-cube lookup, nearest-cube lookup, anomaly distance, slot resolution, stable rejection reason

command-result-envelope-service:
  command id, command source, status, reason, changed flag, events, diagnostics, legacy GameState return adapter

publish-decision-service:
  publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag, completion flag

local-authority-result-consumer-service:
  consume local interaction result, journal rejection, skip local rejected/no-op publish, publish accepted changed/victory

host-authority-result-consumer-service:
  consume host player update result, consume host interaction result, skip rejected TRY_INTERACT broadcast, publish request-sync recovery, publish accepted changed/victory

diagnostics-service:
  runtime events, runtime frames, cadence, latest command result, latest publish decision, journal counts, fixture parity

replay-service:
  fixture matrix, journal replay, volatile normalization, snapshot parity, proof output

render-service:
  renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
```

## Implemented kits

```txt
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
ooze-trail-domain-kit
ordered-anomaly-sequence-kit
mesh-object-kit-catalog
procedural-texture-kit-family
```

## Candidate extract kits

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
```

## Planned next kits

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

## Source-backed seam

`networkRules.ts` still returns `GameState` only for `syncHeldCubesToPlayers`, `applyNetworkPlayerUpdate`, and `applyNetworkInteractionRequest`.

`interactionRules.ts` still returns `GameState` only for pickup, drop, place, and remove.

`GameCanvas.tsx` still decides local and host publish behavior around object identity and action strings instead of command-result metadata.

## Next safe ledge

```txt
HorrorCorridor Command Result Consumer Acceptance Map + Fixture Gate
```

Do not extract renderer, PeerJS, minimap, postprocessing, session lobby, object kits, texture kits, or new content before this ledge passes.