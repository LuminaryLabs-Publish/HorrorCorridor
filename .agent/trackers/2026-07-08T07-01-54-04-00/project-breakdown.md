# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T07:01:54-04:00`

## Selection result

The accessible `LuminaryLabs-Publish` repo list was checked against central `LuminaryLabs-Dev/LuminaryLabs` tracking.

```txt
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/TheUnmappedHouse
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PrehistoricRush
```

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule.

No checked non-Cavalry repo was found that was both new and missing central/root `.agent` state. `HorrorCorridor` was selected as a fallback high-value follow-up because its command-result gate has an acceptance ledger, but the publish-decision routing between result status, local authority, host authority, recovery snapshots, runtime debug, and fixture replay still needed to be made explicit.

## Interaction loop

```txt
open app
-> choose solo, host, or client join mode
-> create or join room identity
-> complete loading/readiness gates
-> mount GameCanvas
-> enter pointer-lock first-person maze navigation
-> move through the seeded corridor maze
-> derive interaction action from carried cube state and end-anomaly proximity
-> pickup, drop, place, or remove cube
-> ordered sequence validates anomaly completion
-> ooze cadence advances under local/host authority
-> authoritative snapshot is published or skipped
-> renderer, minimap, HUD, completion UI, and runtime debug consume latest state
```

## Current command loop

```txt
local input or peer message
-> applyNetworkPlayerUpdate or applyNetworkInteractionRequest
-> networkRules.ts delegates to interactionRules.ts
-> interactionRules.ts returns GameState only
-> invalid/rejected cases return the same state without reason metadata
-> local authority uses object identity to decide publish vs silent return
-> host authority can publish recovery/full-sync or resync without command-result metadata
-> runtime debug cannot yet explain latest command status, reason, or publish decision
```

## Target command loop

```txt
local input or peer message
-> CommandEnvelope
-> command preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> RuntimeDebug projection
-> DOM-free fixture replay
-> final snapshot parity report
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
ui-screen-routing
session-lifecycle
room-identity
join-code-routing
peer-identity
peer-networking
host-transport
client-transport
network-message-protocol
replicated-snapshot-protocol
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
publish-decision-routing
command-result-journal
command-result-fixture-matrix
command-replay-fixture
cube-carry-interaction
nearest-cube-selection
carried-cube-state
end-anomaly-distance-check
slot-assignment
pickup-preflight
drop-preflight
place-preflight
remove-preflight
correction-reversal
ooze-trail-navigation
ooze-decay
ooze-spawn
ooze-spacing-guard
ooze-max-cap
ooze-seeded-rng
snapshot-build
snapshot-publish-contract
snapshot-publish-metadata
publish-decision-snapshot
snapshot-publish-fixture
runtime-debug-event-log
runtime-debug-frame-log
runtime-debug-result-projection
cadence-diagnostics
local-authority-result-consumer
host-authority-result-consumer
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

## Services in use

```txt
session service:
  create room id, create join code, create player identity, enter solo/host/client, readiness, pause/resume, completion routing

peer sync service:
  host/client transport, connection status, lobby events, full sync, player update, try interact, request-sync recovery

maze bootstrap service:
  seed hash, maze generation, cell lookup, player spawns, cube spawns, sequence slots, initial GameState, snapshot rebuild

first-person player service:
  keyboard/mouse input, pointer lock, look delta, movement integration, collision, camera sync, local carried cube sync

interaction preflight service:
  validate playing state, find player, find carried cube, find nearest loose cube, resolve anomaly cell, resolve target slot, classify rejection reason

command result service:
  command envelope, command id, accepted/rejected/unchanged/publish-only/skipped/victory result, changed flag, events, diagnostics, before/after tick

publish decision service:
  publish, skip, recovery, victory, no-op routing from CommandResult metadata

diagnostics and replay service:
  event log, frame log, cadence summary, latest command result, latest publish decision, journal counts, fixture parity

render service:
  renderer, scene, camera, postprocess, maze world, minimap, scene dressing summary, disposal
```

## Kits identified

Source-backed / implemented kits:

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
ooze-trail-domain-kit
ordered-anomaly-sequence-kit
mesh-object-kit-catalog
procedural-texture-kit-family
```

Planned next command kits:

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

## Files changed in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/command-authority-audit/publish-decision-routing-matrix.md
.agent/trackers/2026-07-08T07-01-54-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T07-01-54-04-00.md
```

Central log updated in `LuminaryLabs-Dev/LuminaryLabs`:

```txt
repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
internal-change-log/2026-07-08T07-01-54-04-00-horror-corridor-publish-routing-matrix.md
```

## Main finding

The current code has the right pure source seam for command extraction: `interactionRules.ts` and `networkRules.ts` are already isolated enough to wrap without first rewriting `GameCanvas.tsx`, PeerJS, rendering, minimap, or scene content.

The dangerous gap is not that commands cannot be modeled. The dangerous gap is that rejected, skipped, unchanged, recovery, and victory paths still collapse into raw `GameState` returns, making publish behavior and debug proof ambiguous.

## Next safe ledge

```txt
HorrorCorridor Command Result Fixture Gate: Publish Decision Routing Matrix Implementation
```

Build order:

```txt
preserve solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior
-> add CommandEnvelope / CommandResult / PublishDecision contracts
-> add reason constants for every current silent return branch
-> add result-returning wrappers beside interactionRules.ts
-> add result-returning wrappers beside networkRules.ts
-> classify request-sync as publish-only recovery
-> classify toggle-ready, cancel, and unknown as skipped
-> classify victory as explicit victory result
-> add command journal projection
-> add DOM-free fixture matrix for publish routing
-> only then wire GameCanvas and runtimeDebugStore to consume result metadata
```

## Validation

This was a documentation and operating-memory pass only.

No runtime source files changed.

No local checkout, install, lint, smoke, browser route, live multiplayer, or GitHub Actions validation was run.
