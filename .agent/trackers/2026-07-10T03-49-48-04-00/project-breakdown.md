# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T03-49-48-04-00`

## Plan ledger

```txt
[x] Read current public LuminaryLabs-Publish repo list.
[x] Excluded TheCavalryOfRome.
[x] Compared checked repos against central LuminaryLabs-Dev/LuminaryLabs tracking.
[x] Selected one repo only: HorrorCorridor.
[x] Read HorrorCorridor root .agent state.
[x] Read central HorrorCorridor repo ledger.
[x] Read package.json, GameCanvas, game-state rules, debug store, and snapshot protocol.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified kit services.
[x] Identified implemented and next-cut kits.
[x] Updated required root .agent docs.
[x] Added timestamped tracker and turn-ledger entries.
[x] Added architecture, render, gameplay, command-authority, interaction, and deploy audits.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[ ] Runtime source edit.
[ ] npm run lint.
[ ] Browser or multiplayer smoke.
[ ] DOM-free command fixture run.
```

## Repo selected

```txt
LuminaryLabs-Publish/HorrorCorridor
```

Reason: no checked public non-Cavalry repo was new, ledger-missing, missing root `.agent`, recently added but undocumented, or otherwise undocumented. `HorrorCorridor` was the oldest eligible documented fallback, with prior central tracking at `2026-07-10T01-49-13-04-00`.

## Files updated

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

## Files added

```txt
.agent/trackers/2026-07-10T03-49-48-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T03-49-48-04-00.md
.agent/architecture-audit/2026-07-10T03-49-48-04-00-command-result-publish-decision-dsk-map.md
.agent/render-audit/2026-07-10T03-49-48-04-00-runtime-debug-command-ledger-readback.md
.agent/gameplay-audit/2026-07-10T03-49-48-04-00-local-host-command-result-loop.md
.agent/command-authority-audit/2026-07-10T03-49-48-04-00-command-result-publish-decision-contract.md
.agent/interaction-audit/2026-07-10T03-49-48-04-00-silent-noop-reason-ledger.md
.agent/deploy-audit/2026-07-10T03-49-48-04-00-command-fixture-validation-gate.md
```

## Interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, debug state, and transport listener
  -> pointer-lock first-person navigation
  -> keyboard/mouse input updates local pose and view angles
  -> interact key derives pickup/drop/place/remove from carried-cube state and distance to anomaly
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> unchanged nextState returns silently
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default collapse to unchanged state
  -> sync held cubes to players
  -> ooze cadence advances through GameState-returning rules
  -> ordered sequence completion validates victory through GameState-returning rules
  -> publishAuthoritativeState emits implicit full-sync reasons
  -> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
ui-screen-routing
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

## Kit services

```txt
app-session-service: mode selection, room identity, join code, readiness, pause/resume, completion routing
peer-sync-service: host transport, client transport, full sync, player update, TRY_INTERACT, request-sync recovery
maze-bootstrap-service: seed hash, maze generation, cell lookup, path build, cube spawn, sequence slots, initial snapshot
first-person-player-service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
legacy-interaction-service: pickup, drop, place, remove, GameState-only return
legacy-network-service: player update, held cube sync, interaction dispatch, request-sync no-op, toggle-ready no-op, cancel no-op
legacy-ooze-service: decay, spawn, spacing guard, no-state-diff, GameState-only return
legacy-win-service: slot evaluation, victory, victory rollback, GameState-only return
runtime-debug-service: event capture, frame capture, cadence readback, snapshot readback, debug window export
render-service: renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
command-result-envelope-service: command id, source, status, reason, changed flag, events, diagnostics, legacy adapter
publish-decision-service: publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag, completion flag
debug-command-projection-service: latest command result, latest publish decision, latest rejection reason, journal counts, fixture parity
central-ledger-sync-service: repo-local tracker, root .agent pointer, central repo ledger, internal change log
```

## Kits

```txt
implemented-source: corridor-session-domain-kit
implemented-source: peer-room-sync-domain-kit
implemented-source: maze-snapshot-bootstrap-kit
implemented-source: first-person-corridor-player-kit
implemented-source: corridor-interaction-domain-kit
implemented-source: ordered-anomaly-sequence-kit
implemented-source: ooze-trail-domain-kit
implemented-source: corridor-render-world-kit
implemented-source: corridor-minimap-kit
implemented-source: runtime-debug-frame-kit
planned-next: command-envelope-contract-kit
planned-next: command-reason-catalog-kit
planned-next: command-result-envelope-kit
planned-next: publish-decision-snapshot-kit
planned-next: command-result-journal-kit
planned-next: interaction-preflight-kit
planned-next: network-command-preflight-kit
planned-next: ooze-result-rules-kit
planned-next: win-result-rules-kit
planned-next: interaction-result-rules-kit
planned-next: network-result-rules-kit
planned-next: local-authority-result-consumer-kit
planned-next: host-authority-result-consumer-kit
planned-next: runtime-debug-command-projection-kit
planned-next: command-result-fixture-matrix-kit
planned-next: command-replay-fixture-kit
documentation-source: central-ledger-sync-kit
```

## Main finding

`HorrorCorridor` should not start next with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion.

The blocker is result-first command authority. `interactionRules.ts`, `networkRules.ts`, `oozeRules.ts`, and `winRules.ts` still return only `GameState`; `GameCanvas.tsx` infers publish/no-op/victory behavior from object identity and implicit reason strings; and `runtimeDebugStore.ts` has no command-result or publish-decision projection.

## Next safe ledge

```txt
HorrorCorridor Command Result Publish Decision Ledger Refresh + Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
npm run validate:live-player:dev: not run
browser smoke: not run
command fixture: not run because it does not exist yet
pushed to main: yes, documentation only
central ledger updated: yes
```
