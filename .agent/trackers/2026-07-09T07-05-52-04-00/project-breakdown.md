# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T07-05-52-04-00`

**Pass type:** documentation-only repo breakdown and central ledger sync

## Selection

The accessible `LuminaryLabs-Publish` repo list was compared against central tracking in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent` state.

No non-Cavalry repo was new, absent from the ledger, recently added but undocumented, or missing sampled root `.agent` state.

`TheCavalryOfRome` was excluded.

`HorrorCorridor` was selected as the central-ledger catch-up target because repo-local command-result fixture docs had advanced while the central ledger still pointed to an older entry.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / central-ledger catch-up
LuminaryLabs-Publish/AetherVale           tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
```

## Current route/source read

```txt
HorrorCorridor-V1/package.json
  -> Next/React/Three/PeerJS/Zustand/TypeScript scripts and dependencies

HorrorCorridor-V1/src/components/game/GameCanvas.tsx
  -> initializes renderer, camera, post-processing, maze world, minimap, local pose, input, transport, cadence, and debug state
  -> derives interaction action from distance-to-end and carried-cube state
  -> applies GameState-returning rules locally or through host peer message flow
  -> publishes authoritative snapshot by implicit reason string
  -> updates world, minimap, HUD, completion, and runtime debug frames

HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
  -> pickup, drop, place, and remove mutate GameState or silently return unchanged GameState

HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
  -> player update, held-cube sync, and interaction dispatch mutate GameState or silently return unchanged GameState
```

## Interaction loop

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
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> local path silently returns when nextState === currentGameState
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default paths collapse to unchanged GameState
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot by implicit reason string
  -> update Three world, minimap, HUD, completion routing, and runtime debug frames
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

## Services that kits offer

```txt
app/session service: mode, room, readiness, pause, completion
peer sync service: host/client transport, full sync, player update, try interact
maze bootstrap service: seed, maze generation, cell lookup, path build, cube spawn, sequence slots
first-person player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
legacy GameState interaction service: pickup, drop, place, remove, ordered completion
legacy GameState network service: player update, held-cube sync, interaction dispatch, request-sync no-op
command fixture seed service: planned canonical GameState seeds and expected row facts
command result envelope service: planned command id, source, status, reason, changed flag, events, diagnostics, legacy adapters
publish decision service: planned publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag
local authority result consumer service: planned local result journal and publish/skip behavior
host authority result consumer service: planned host result journal, request-sync recovery, rejected TRY_INTERACT skip, and accepted/victory publish behavior
diagnostics and replay service: runtime events, runtime frames, cadence, planned command readback, fixture parity
render service: renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
central ledger sync service: repo-local tracker, root .agent pointer, central repo-ledger, internal change log
```

## Kits identified

```txt
implemented-source:
- corridor-session-domain-kit
- peer-room-sync-domain-kit
- maze-snapshot-bootstrap-kit
- first-person-corridor-player-kit
- corridor-interaction-domain-kit
- ordered-anomaly-sequence-kit
- ooze-trail-domain-kit
- corridor-render-world-kit
- corridor-minimap-kit
- runtime-debug-frame-kit
- mesh-object-kit-catalog
- procedural-texture-kit-family

planned-next:
- command-envelope-contract-kit
- command-reason-catalog-kit
- command-result-envelope-kit
- command-decision-contract-kit
- publish-decision-snapshot-kit
- command-result-journal-kit
- command-seed-state-fixture-kit
- interaction-preflight-kit
- interaction-result-rules-kit
- network-result-rules-kit
- local-authority-result-consumer-kit
- host-authority-result-consumer-kit
- runtime-debug-command-projection-kit
- command-result-fixture-matrix-kit
- command-replay-fixture-kit
- central-ledger-sync-kit
```

## Main finding

The runtime should not be rewritten next.

The durable cut is command-result authority: make every accepted, rejected, skipped, publish-only, unchanged, ooze, and victory path return an explicit result record, then prove local and host consumer behavior in a DOM-free fixture before `GameCanvas.tsx` consumes the new path.

## Files changed in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T07-05-52-04-00-command-ledger-central-sync-dsk-map.md
.agent/render-audit/2026-07-09T07-05-52-04-00-debug-command-consumer-readback.md
.agent/gameplay-audit/2026-07-09T07-05-52-04-00-local-host-command-ledger-loop.md
.agent/command-authority-audit/2026-07-09T07-05-52-04-00-command-result-fixture-contract.md
.agent/interaction-audit/2026-07-09T07-05-52-04-00-silent-noop-reason-freeze.md
.agent/deploy-audit/2026-07-09T07-05-52-04-00-fixture-script-validation-gate.md
.agent/trackers/2026-07-09T07-05-52-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T07-05-52-04-00.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
node scripts/horror-corridor-command-fixture.mjs: not run because fixture files do not exist yet
browser route check: not run
pushed to main: yes
```

## Next safe ledge

```txt
HorrorCorridor Command Result Ledger Central Sync + Runtime Debug Consumer Fixture Gate
```

Start with source-only command contracts and the fixture matrix.

Do not begin visual expansion, renderer extraction, PeerJS extraction, minimap extraction, or whole-GameCanvas rewrites before the fixture is green.
