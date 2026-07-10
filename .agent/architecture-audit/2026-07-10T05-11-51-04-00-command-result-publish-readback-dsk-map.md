# Architecture Audit: Command Result Publish Readback DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T05-11-51-04-00`

## DSK read

`HorrorCorridor` is a Next/React cooperative first-person maze. It has useful domain boundaries, but command authority still flows through legacy `GameState`-returning rule functions.

## Current DSK chain

```txt
Session / transport source
  -> GameCanvas runtime consumer
  -> derived local action or peer protocol action
  -> interactionRules / networkRules / oozeRules / winRules
  -> GameState only
  -> GameCanvas object-identity check or implicit sync reason
  -> replicated snapshot
  -> renderer / minimap / HUD / runtime debug
```

## Target DSK chain

```txt
CommandFixtureSeed
  -> CommandEnvelope
  -> CommandReasonCatalog
  -> InteractionPreflight or NetworkPreflight
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> ReplayFixtureRow
  -> GameCanvas splice after fixture proof
```

## Domains

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

## Source/consumer seam

```txt
interactionRules.ts:
  source owns pickup/drop/place/remove mutation but returns GameState only.

networkRules.ts:
  source owns player-update, held-cube sync, request-sync/toggle-ready/cancel/default handling but returns GameState only.

oozeRules.ts:
  source owns decay/spawn/no-state-diff, but result metadata is absent.

winRules.ts:
  source owns ordered-sequence victory and rollback, but result metadata is absent.

GameCanvas.tsx:
  consumer derives action, applies rules, silently returns for unchanged local interactions, publishes host TRY_INTERACT regardless of accepted/rejected result, and emits full-sync reason strings.

runtimeDebugStore.ts:
  consumer stores frame/event records but has no command-result, publish-decision, rejection reason, or journal readback.
```

## Main architecture finding

The architecture is ready for a result-first seam. Do not extract renderer, minimap, PeerJS, or post-processing first. Add command result records, publish decisions, and a DOM-free fixture before changing live browser consumers.
