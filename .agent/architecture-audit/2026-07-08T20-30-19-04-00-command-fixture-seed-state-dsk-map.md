# HorrorCorridor Command Fixture Seed State DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T20-30-19-04-00`

## Purpose

This audit pins the DSK/domain map for the next command-authority pass.

The next implementation should build a deterministic command fixture layer before changing `GameCanvas.tsx` publish behavior.

## Current runtime composition

```txt
HorrorCorridor-V1
  -> Next app shell
  -> session store + runtime store + UI store
  -> GameCanvas React runtime
  -> seeded maze and replicated snapshot bootstrap
  -> player input / pointer lock / movement / collision
  -> interactionRules and networkRules mutate GameState directly
  -> oozeRules advances host/local pressure cadence
  -> winRules validates ordered anomaly sequence
  -> syncSnapshot builds full snapshots and peer messages
  -> Three.js world builder / renderer / postprocessing / minimap
  -> runtime debug frames and events
```

## Current interaction authority seam

```txt
GameCanvas derives action string
  -> applyNetworkInteractionRequest(state, input)
  -> GameState only
  -> GameCanvas compares object identity or action string
  -> publishAuthoritativeState("resync" | "recovery")
  -> optional commitVictory()
```

This is not enough for replay because rejected, unchanged, skipped, publish-only, and victory paths are not represented as first-class results.

## Target command fixture architecture

```txt
command-fixture-seed-state-domain
  -> command-envelope-contract-kit
  -> command-reason-catalog-kit
  -> interaction-preflight-kit
  -> interaction-result-rules-kit
  -> network-result-rules-kit
  -> command-result-envelope-kit
  -> publish-decision-snapshot-kit
  -> command-result-journal-kit
  -> local-authority-result-consumer-kit
  -> host-authority-result-consumer-kit
  -> runtime-debug-result-projection-kit
  -> command-result-fixture-matrix-kit
  -> command-replay-fixture-kit
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
command-seed-state-fixture
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

## Services the kits offer

| Service | Owner | Offers |
|---|---|---|
| App/session service | session + UI domains | mode selection, room identity, readiness, pause, completion |
| Peer sync service | networking domains | host/client transport, player updates, try-interact, full sync, recovery |
| Maze bootstrap service | maze domains | seeded grid, start/end cells, cubes, target sequence, pathing |
| First-person player service | player domains | keyboard input, pointer lock, view angles, movement, collision, carry sync |
| Legacy interaction service | `interactionRules.ts` | pickup, drop, place, remove as `GameState` only |
| Legacy network service | `networkRules.ts` | player update, network interaction, held-cube sync as `GameState` only |
| Seed fixture service | planned command fixture domain | canonical states, fixture rows, expected facts, normalization rules |
| Command result service | planned command result domain | status, reason, before/after summaries, events, diagnostics |
| Publish decision service | planned policy domain | publish, skip, recovery, no-op, victory decisions |
| Local consumer service | planned local authority domain | local command journaling, skip/publish choice, victory commit signal |
| Host consumer service | planned host authority domain | peer command handling, skipped/rejected publish avoidance, recovery publish |
| Debug projection service | debug domain | latest command result, decision, journal, fixture parity |
| Render service | render domains | renderer, scene, camera, post-processing, minimap, scene dressing |

## Kits identified

```txt
implemented-source:
  corridor-render-world-kit
  corridor-minimap-kit
  runtime-debug-frame-kit
  ooze-trail-domain-kit
  ordered-anomaly-sequence-kit

planned-next:
  command-envelope-contract-kit
  command-reason-catalog-kit
  command-result-envelope-kit
  command-seed-state-fixture-kit
  publish-decision-snapshot-kit
  command-result-journal-kit
  interaction-preflight-kit
  network-result-rules-kit
  local-authority-result-consumer-kit
  host-authority-result-consumer-kit
  runtime-debug-result-projection-kit
  command-result-fixture-matrix-kit
  command-replay-fixture-kit
```

## Source cut boundary

The first source edit should add pure domain files only.

Do not modify `GameCanvas.tsx` until the fixture can prove that legacy adapters still return the same final `GameState` facts.

## Stop line

Stop after the DOM-free fixture proves canonical seed rows and after runtime debug projection has an additive contract.

Renderer extraction, PeerJS extraction, minimap extraction, scene-dressing expansion, and new content remain blocked behind this command authority proof.
