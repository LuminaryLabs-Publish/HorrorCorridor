# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T12-29-26-04-00`

## Selection result

`HorrorCorridor` was selected as the oldest eligible documented fallback after comparing the current public `LuminaryLabs-Publish` repository list against central ledger state and excluding `TheCavalryOfRome`.

## Interaction loop

```txt
open app -> start menu -> solo/host/join -> room/lobby/readiness -> GameCanvas runtime -> pointer-lock movement and look -> interact derives pickup/drop/place/remove -> local or host GameState-returning rules apply -> publish/skip inferred -> render/minimap/HUD/runtime debug consume snapshot
```

## Domains in use

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
command-result-envelope-next
publish-decision-snapshot-next
command-result-journal-next
runtime-debug-command-projection-next
command-fixture-matrix-next
command-replay-fixture-next
central-ledger-synchronization
```

## Kits and services

Implemented kits provide session selection/readiness, peer room sync, seeded maze bootstrap, first-person movement, cube pickup/drop/place/remove, anomaly sequence validation, ooze cadence, Three.js world rendering, minimap projection, and runtime debug frame/event export.

Legacy adapters still return `GameState` only for interaction, network, ooze, and win rules.

Next-cut kits should provide command envelopes, reason catalog, result envelope, publish decision snapshots, command journal, local/host command consumers, runtime debug command projection, command fixture matrix, replay fixture, and central ledger sync.

## Main finding

`HorrorCorridor` should not start next with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, route rewrites, new maze content, or visual object-kit expansion.

The blocker is command-result readback and fixture proof. `interactionRules.ts`, `networkRules.ts`, `oozeRules.ts`, and `winRules.ts` return `GameState` only. Rejected, skipped, no-op, recovery, ooze, victory, and publish-only paths collapse into unchanged state or implicit strings.

## Next safe ledge

```txt
HorrorCorridor Command Result Readback Fixture Refresh + Runtime Debug Projection Gate
```

## Files added in this tracker set

```txt
.agent/turn-ledger/2026-07-10T12-29-26-04-00.md
.agent/architecture-audit/2026-07-10T12-29-26-04-00-command-result-readback-fixture-dsk-map.md
.agent/render-audit/2026-07-10T12-29-26-04-00-runtime-debug-command-result-gap.md
.agent/gameplay-audit/2026-07-10T12-29-26-04-00-local-host-command-result-loop.md
.agent/command-authority-audit/2026-07-10T12-29-26-04-00-command-result-publish-decision-contract.md
.agent/interaction-audit/2026-07-10T12-29-26-04-00-noop-rejection-command-reason-map.md
.agent/deploy-audit/2026-07-10T12-29-26-04-00-command-result-fixture-gate.md
```

## Validation

Docs-only pass. Runtime source was not changed; no branch or pull request was created; fixture and npm/browser checks were not run because the required command-result fixture files do not exist yet.
