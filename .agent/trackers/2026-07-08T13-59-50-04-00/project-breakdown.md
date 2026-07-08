# Project Breakdown — HorrorCorridor

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T13:59:50-04:00`

## Plan ledger

**Goal:** Compare the current `LuminaryLabs-Publish` repo set against central tracking, select one eligible repo, refresh repo-local `.agent` docs, and narrow the next implementation handoff to exact GameCanvas command-consumer wiring.

**Checklist**

- [x] Read the current accessible `LuminaryLabs-Publish` repository list.
- [x] Compare Publish repos against `LuminaryLabs-Dev/LuminaryLabs` central ledger/recent change state.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select exactly one repo.
- [x] Read repo-local `.agent` state.
- [x] Read package/runtime/domain/debug source seams.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify services that the kits offer.
- [x] Identify implemented, candidate, and next-cut kits.
- [x] Add timestamped architecture, render, gameplay, command-authority, tracker, and turn-ledger entries.
- [x] Refresh root `.agent` docs.
- [x] Refresh `.agent/kit-registry.json`.
- [x] Update the central repo ledger.
- [x] Add a central internal change-log entry.
- [ ] Runtime source changed.
- [ ] Build/browser/local validation run.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      selected fallback follow-up
LuminaryLabs-Publish/IntoTheMeadow       tracked; latest central commit observed this hour
LuminaryLabs-Publish/AetherVale          tracked; latest central commit observed this hour
LuminaryLabs-Publish/TheOpenAbove        tracked; latest central commit observed this hour
LuminaryLabs-Publish/PhantomCommand      tracked; latest central commit observed this hour
LuminaryLabs-Publish/PrehistoricRush     tracked; latest central commit observed this hour
LuminaryLabs-Publish/ZombieOrchard       tracked; latest central commit observed this hour
LuminaryLabs-Publish/MyCozyIsland        tracked; latest central commit observed this hour
LuminaryLabs-Publish/TheUnmappedHouse    tracked; latest central commit observed this hour
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
```

No non-Cavalry Publish repo was found that was fully new, central-ledger absent, undocumented, or missing root `.agent` state.

`HorrorCorridor` was selected because the most recent observed central sequence had refreshed every eligible publish repo, making HorrorCorridor the oldest high-value command authority fallback at this point in the cycle.

## Evidence read

```txt
LuminaryLabs-Publish repository search list
LuminaryLabs-Dev/LuminaryLabs recent central commits
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Publish/HorrorCorridor:.agent/START_HERE.md
LuminaryLabs-Publish/HorrorCorridor:.agent/current-audit.md
LuminaryLabs-Publish/HorrorCorridor:.agent/known-gaps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/next-steps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/validation.md
LuminaryLabs-Publish/HorrorCorridor:.agent/kit-registry.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/package.json
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/components/game/GameCanvas.tsx
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
LuminaryLabs-Publish/HorrorCorridor:HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create room, join room, or run solo
-> mount GameCanvas runtime
-> initialize renderer, camera, post-processing, maze world, minimap, runtime stores, local pose, transport, and debug store
-> pointer-lock first-person navigation
-> interact key derives pickup/drop/place/remove from distance-to-end and carry state
-> local authority applies GameState-returning rules directly, or client sends TRY_INTERACT
-> host applies PLAYER_UPDATE / TRY_INTERACT through networkRules
-> interactionRules may return unchanged GameState silently
-> GameCanvas decides publish or return by object identity and action path
-> host/local cadence advances ooze and publishes replicated snapshots
-> renderer, minimap, HUD, completion UI, and runtime debug consume latest snapshot
```

## Target command-consumer loop

```txt
local input or peer message
-> CommandEnvelope
-> interaction/network preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
-> RuntimeDebugCommandProjection
-> publishAuthoritativeState only from explicit decision
-> DOM-free fixture replay
-> browser/live validation after fixture proof
```

## Domains in use

```txt
application-shell, next-client-runtime, react-game-surface, ui-screen-routing, settings-overlay, completion-routing, pause-state, readiness-state, session-lifecycle, room-identity, join-code-routing, peer-identity, peer-networking, host-transport, client-transport, network-message-protocol, host-message-ingress, client-message-egress, replicated-snapshot-protocol, full-sync-output, request-sync-recovery, seeded-maze-bootstrap, maze-cell-lookup, maze-pathing, cube-spawn-bootstrap, anomaly-sequence-bootstrap, sequence-slot-authority, ordered-sequence-validation, victory-completion, first-person-input, pointer-lock-control, keyboard-input, mouse-look-input, player-view-angles, player-movement-integration, maze-collision-resolution, camera-bob, local-pose-prediction, local-carry-state-sync, host-authority, local-authoritative-simulation, remote-authoritative-ingress, command-envelope-contract, command-source-normalization, command-reason-catalog, command-result-contract, command-result-envelope, command-result-status-policy, command-result-rejection-policy, interaction-preflight-diagnostics, player-pose-command-result, interaction-command-result, ooze-command-result, request-sync-command-result, ready-cancel-command-result, victory-command-result, command-result-journal, publish-decision-snapshot, local-authority-command-consumer, host-authority-command-consumer, runtime-debug-command-projection, command-result-fixture-matrix, command-replay-fixture, render-world-snapshot-consumption, three-renderer, post-processing, maze-world-rendering, minimap-rendering, scene-dressing-descriptors, mesh-object-kit-catalog, procedural-texture-kit-family, static-smoke-validation, live-player-validation, replay-parity-validation
```

## Kit services

```txt
app-session-service:
  room identity, join code, player identity, mode selection, readiness, pause/resume, completion routing

peer-sync-service:
  host/client transport, message protocol, full sync, player update, try interact, request-sync recovery

maze-bootstrap-service:
  seed hash, maze grid, cell lookup, path build, cube spawn, anomaly target sequence, initial snapshot

first-person-player-service:
  keyboard input, pointer lock, mouse look, movement, collision, camera sync, local carry sync

interaction-preflight-service:
  playing-state validation, player lookup, carried-cube lookup, nearest-cube lookup, anomaly distance, slot resolution, stable rejection reason

command-result-envelope-service:
  command id, command source, status, reason, changed flag, events, diagnostics, legacy GameState return adapter

publish-decision-service:
  publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag, completion flag

local-authority-result-consumer-service:
  local interaction result consumption, rejected/no-op skip, accepted/victory publish, journal write, debug projection

host-authority-result-consumer-service:
  host player update and interaction consumption, request-sync recovery, rejected TRY_INTERACT skip, accepted/victory publish, debug projection

diagnostics-service:
  runtime frames, runtime events, cadence, latest command result, latest publish decision, journal counts, fixture parity

replay-service:
  fixture matrix, result journal replay, volatile normalization, snapshot parity, proof output

render-service:
  renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
```

## Kits identified

```txt
implemented-source:
  corridor-render-world-kit
  corridor-minimap-kit
  runtime-debug-frame-kit
  ooze-trail-domain-kit
  ordered-anomaly-sequence-kit
  mesh-object-kit-catalog
  procedural-texture-kit-family

candidate-extract:
  corridor-session-domain-kit
  peer-room-sync-domain-kit
  maze-snapshot-bootstrap-kit
  first-person-corridor-player-kit

planned-next:
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

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T13-59-50-04-00-gamecanvas-command-consumer-dsk-breakdown.md
.agent/render-audit/2026-07-08T13-59-50-04-00-runtime-debug-publish-readback.md
.agent/gameplay-audit/2026-07-08T13-59-50-04-00-local-host-publish-gate.md
.agent/command-authority-audit/2026-07-08T13-59-50-04-00-gamecanvas-consumer-wire-map.md
.agent/trackers/2026-07-08T13-59-50-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T13-59-50-04-00.md
```

## Main finding

The next implementation should not start with PeerJS extraction, renderer extraction, minimap extraction, post-processing work, scene dressing, object-kit visual expansion, or new content.

The correct next ledge is to implement domain command results and local/host command consumers first, prove them through a DOM-free fixture, and only then splice the consumers into `GameCanvas.tsx`.

## Next safe ledge

```txt
HorrorCorridor GameCanvas Command Consumer Wire Map + Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: not run
local npm run lint: not run
local npm run smoke:protokits: not run
local npm run harness:horror-corridor: not run
node scripts/horror-corridor-command-fixture.mjs: not run / not implemented
browser route check: not run
live host/client multiplayer check: not run
```
