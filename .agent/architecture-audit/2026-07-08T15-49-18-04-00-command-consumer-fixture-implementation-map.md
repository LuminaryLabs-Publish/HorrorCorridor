# HorrorCorridor Command Consumer Fixture Implementation Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T15:49:18-04:00`

## Selection reason

The full accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected as the oldest eligible central-ledger fallback and because its repo-local `.agent` state already identified the missing command fixture source files, while the central ledger still needed a fresh catch-up pointer.

## Active route

```txt
HorrorCorridor-V1/package.json
  -> Next app scripts
  -> src/components/game/GameCanvas.tsx
  -> buildGameStateFromSnapshot()
  -> renderer/camera/postprocess/world/minimap/debug initialization
  -> pointer-lock input and local pose prediction
  -> networkRules.ts and interactionRules.ts
  -> publishAuthoritativeState(reason)
  -> runtime debug frames/events
```

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, and debug state
  -> enter pointer-lock first-person navigation
  -> derive interact action from distance-to-end and carried-cube state
  -> pickup, drop, place, or remove cube through GameState-returning rules
  -> ordered sequence validates anomaly completion
  -> ooze cadence advances on host/local authority ticks
  -> authoritative snapshot is built and published or skipped by inline policy
  -> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Target command authority loop

```txt
local input or peer message
  -> CommandEnvelope
  -> CommandReason catalog lookup
  -> interaction/network preflight
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> publishAuthoritativeState only when decision allows it
  -> DOM-free fixture replay
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

## Services that kits offer

```txt
app/session service:
  room identity, join code, peer identity, screen routing, pause/resume, completion state

peer sync service:
  host transport, client transport, player update messages, try-interact messages, full-sync output, request-sync recovery

maze bootstrap service:
  seed, grid, maze lookup, pathing, cube spawns, anomaly slots, initial replicated snapshot

first-person player service:
  keyboard state, pointer lock, look delta, movement, collision, pose projection, local carry sync

legacy interaction service:
  pickUpCube, dropCube, placeCubeAtEndAnomaly, removeCubeFromEndAnomaly returning GameState only

legacy network service:
  applyNetworkPlayerUpdate, applyNetworkInteractionRequest, syncHeldCubesToPlayers returning GameState only

command result service:
  next-cut source for accepted/rejected/unchanged/publish-only/skipped/victory records

publish decision service:
  next-cut source for publish, skip, recovery, no-op, and victory decisions

local authority consumer service:
  next-cut source for local publish gating and rejection journaling

host authority consumer service:
  next-cut source for host PLAYER_UPDATE / TRY_INTERACT / request-sync decisions

runtime debug service:
  current frame/event capture; next-cut command-result and publish-decision readback

fixture replay service:
  next-cut DOM-free command matrix and parity output

render service:
  Three renderer, scene, camera, postprocess, maze world, minimap, scene dressing summary, disposal
```

## Kits

Implemented / source-backed:

```txt
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
ooze-trail-domain-kit
ordered-anomaly-sequence-kit
maze-bootstrap-domain-kit
player-input-domain-kit
player-movement-domain-kit
collision-resolution-domain-kit
replicated-snapshot-protocol-kit
```

Planned / next-cut:

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
interaction-preflight-diagnostics-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-result-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
legacy-gamestate-adapter-kit
```

## Implementation map

```txt
1. Add commandTypes.ts.
2. Add commandReasons.ts.
3. Add commandResults.ts.
4. Add publishDecisions.ts.
5. Add commandJournal.ts.
6. Add interactionPreflight.ts.
7. Add interactionResultRules.ts.
8. Add networkResultRules.ts.
9. Add localAuthorityCommandConsumer.ts.
10. Add hostAuthorityCommandConsumer.ts.
11. Add scripts/horror-corridor-command-fixture.mjs.
12. Add package script only after the fixture exists.
13. Add runtime debug command projection after fixture proof.
14. Wire GameCanvas only after fixture proof.
```

## Stop line

Do not start with PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, scene dressing, new level content, or object-kit visual expansion.

The next source edit should only create contracts, result wrappers, consumers, and a headless command fixture, keeping current solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior stable.
