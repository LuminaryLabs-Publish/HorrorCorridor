# Project Breakdown: HorrorCorridor

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-25-39-04-00`

## Selection

The full accessible `LuminaryLabs-Publish` repository list was read from the GitHub installation. The checked list was compared against the `LuminaryLabs-Dev/LuminaryLabs` central ledger and sampled repo-local `.agent` state.

No checked non-Cavalry repo was new, absent from the ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented. `TheCavalryOfRome` remains excluded by rule.

`HorrorCorridor` was selected as the oldest eligible central-ledger catch-up target because the central ledger still pointed at `2026-07-09T10-10-32-04-00`, while repo-local `.agent` state had already advanced to `2026-07-09T12-20-08-04-00`.

## Repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / central latest 2026-07-09T10-10-32-04-00 / repo-local latest 2026-07-09T12-20-08-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T10-29-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

## Interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, cadence, and debug state
  -> enter pointer-lock first-person navigation
  -> derive interact action from distance-to-end and carried-cube state
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> sync held cubes to players
  -> ooze cadence advances on host/local authority ticks
  -> publish authoritative snapshot by implicit reason string
  -> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
session-lifecycle
peer-networking
network-message-protocol
replicated-snapshot-protocol
seeded-maze-bootstrap
maze-cell-lookup
cube-spawn-bootstrap
anomaly-sequence-bootstrap
ordered-sequence-validation
victory-completion
first-person-input
pointer-lock-control
player-view-angles
player-movement-integration
maze-collision-resolution
local-carry-state-sync
host-authority
local-authoritative-simulation
legacy-game-state-interaction-rules
legacy-game-state-network-rules
ooze-cadence
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
runtime-debug-frame-export
command-envelope-contract
command-reason-catalog
command-result-contract
publish-decision-snapshot
command-result-journal
interaction-preflight-diagnostics
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-result-fixture-matrix
command-replay-fixture
central-ledger-synchronization
```

## Services the kits offer

```txt
corridor-session-domain-kit: mode, room, readiness, pause, completion routing
peer-room-sync-domain-kit: host/client transport, full sync, player update, try interact
maze-snapshot-bootstrap-kit: seed, maze generation, cell lookup, path build, cube spawn, sequence slots
first-person-corridor-player-kit: keyboard input, pointer lock, look delta, movement, collision, camera sync, carry sync
corridor-interaction-domain-kit: pickup, drop, place, remove through GameState-returning legacy rules
ordered-anomaly-sequence-kit: slot validation, ordered color completion, victory state
ooze-trail-domain-kit: authoritative cadence, ooze spawn, decay, spacing guard
corridor-render-world-kit: Three.js scene, renderer, camera, post-processing, maze world, scene dressing
corridor-minimap-kit: minimap canvas projection from replicated snapshots
runtime-debug-frame-kit: frame capture, event capture, extractState debug export
command-envelope-contract-kit: planned command id/source/player/action/payload contract
command-reason-catalog-kit: planned stable rejected/skipped/unchanged/publish-only/victory reasons
command-result-envelope-kit: planned before/after state, changed flag, status, reason, events, diagnostics, legacy adapter
publish-decision-snapshot-kit: planned publish/skip/recovery/no-op/victory decision surface
local-authority-result-consumer-kit: planned local command journal and publish/skip routing
host-authority-result-consumer-kit: planned host PLAYER_UPDATE and TRY_INTERACT consumer routing
runtime-debug-command-projection-kit: planned latest command result, publish decision, reason, and journal counters
command-result-fixture-matrix-kit: planned DOM-free accepted/rejected/unchanged/skipped/publish-only/victory rows
central-ledger-sync-kit: repo-local tracker plus central ledger/change-log synchronization
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

## Main finding

The runtime is already playable and visually active. The durable blocker is still command authority: `interactionRules.ts` and `networkRules.ts` return `GameState` only, invalid branches silently return unchanged state, and `GameCanvas.tsx` uses object identity plus implicit reason strings to decide local/host publish behavior.

## Next safe ledge

```txt
HorrorCorridor Command Ledger Central Catch-up + Result-First Consumer Fixture Gate
```

## Files updated in this run

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-09T12-25-39-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T12-25-39-04-00.md
.agent/architecture-audit/2026-07-09T12-25-39-04-00-command-ledger-central-catchup-dsk-map.md
.agent/render-audit/2026-07-09T12-25-39-04-00-debug-command-projection-readback.md
.agent/gameplay-audit/2026-07-09T12-25-39-04-00-command-result-replay-loop.md
.agent/command-authority-audit/2026-07-09T12-25-39-04-00-result-first-consumer-fixture-contract.md
.agent/interaction-audit/2026-07-09T12-25-39-04-00-rejection-reason-preflight-map.md
.agent/deploy-audit/2026-07-09T12-25-39-04-00-command-fixture-validation-gate.md
```

## Validation

No runtime source changed. No local install, lint, fixture, harness, browser route check, or live host/client multiplayer validation was run.
