# HorrorCorridor Architecture Audit: Command Result Publish Decision DSK Map

**Timestamp:** `2026-07-10T03-49-48-04-00`

## Current DSK map

```txt
Next app shell
  -> session/domain stores
  -> GameCanvas runtime host
  -> maze snapshot bootstrap
  -> player input and movement domain
  -> GameState interaction/network/ooze/win rule functions
  -> replicated snapshot protocol
  -> Three.js world renderer and minimap
  -> runtime debug frame/event store
```

## Current domain seams

```txt
interactionRules.ts
  -> pickUpCube
  -> dropCube
  -> placeCubeAtEndAnomaly
  -> removeCubeFromEndAnomaly
  -> returns GameState only
  -> invalid/precondition-failed paths return unchanged state

networkRules.ts
  -> syncHeldCubesToPlayers
  -> applyNetworkPlayerUpdate
  -> applyNetworkInteractionRequest
  -> request-sync/toggle-ready/cancel/default return unchanged state
  -> returns GameState only

oozeRules.ts
  -> decayOozeTrail
  -> spawnOozeTrail
  -> advanceOozeTrail
  -> returns GameState only
  -> spacing/max/no-decay/no-state-diff paths have no reason rows

winRules.ts
  -> validateOrderedSequenceCompletion
  -> exact order victory or rollback
  -> returns GameState only
```

## Target DSK map

```txt
commandTypes.ts
  -> CommandEnvelope
  -> CommandSource
  -> CommandStatus
  -> CommandSnapshotSummary

commandReasons.ts
  -> stable accepted/rejected/skipped/no-op/recovery/victory reason catalog

commandResults.ts
  -> CommandResult constructors
  -> before/after summaries
  -> changed flag
  -> events and diagnostics
  -> legacy state-returning adapter

publishDecisions.ts
  -> publish / skip / recovery / no-op / victory decision rows
  -> full-sync reason bridge
  -> broadcast/completion booleans

commandJournal.ts
  -> latest result
  -> latest decision
  -> accepted/rejected/skipped counters
  -> fixture parity summary

interactionResultRules.ts
  -> result-first pickup/drop/place/remove wrappers
  -> legacy interactionRules exports remain compatible

networkResultRules.ts
  -> result-first player update, held cube sync, interaction request wrappers
  -> legacy networkRules exports remain compatible

oozeResultRules.ts and winResultRules.ts
  -> result-first cadence and victory wrappers
  -> existing game-state output remains compatible

localAuthorityCommandConsumer.ts
  -> local publish decision
  -> rejected/no-op skip
  -> local victory commit flag

hostAuthorityCommandConsumer.ts
  -> host publish decision
  -> rejected TRY_INTERACT skip
  -> request-sync recovery publish

runtimeDebugCommandProjection.ts
  -> latestCommandResult
  -> latestPublishDecision
  -> latestRejectionReason
  -> commandJournal
  -> latestFixtureParity
```

## Domains covered

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
command-envelope-contract
command-reason-catalog
command-result-contract
publish-decision-snapshot
command-result-journal
interaction-preflight-diagnostics
network-command-preflight-diagnostics
ooze-result-diagnostics
win-result-diagnostics
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-result-fixture-matrix
command-replay-fixture
central-ledger-synchronization
```

## Main architecture risk

`GameCanvas.tsx` currently consumes `GameState`-returning rule functions directly. That makes rejected commands, unchanged updates, recovery publishes, and victory transitions hard to distinguish in tests or runtime debug.

Do not splice `GameCanvas.tsx` until the domain-level fixture can prove legacy snapshot parity and expected publish decisions.
