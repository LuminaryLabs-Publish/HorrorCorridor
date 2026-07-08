# Project Breakdown — HorrorCorridor

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T12-29-17-04:00`

## Plan ledger

**Goal:** Compare the current `LuminaryLabs-Publish` repo set against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, select one eligible repo, refresh repo-local `.agent` docs, and log the next source-safe implementation seam.

**Checklist**

- [x] Read the current accessible `LuminaryLabs-Publish` repository list from the GitHub App installation.
- [x] Compare Publish repos against central ledger/status-summary state in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select exactly one repo.
- [x] Read repo-local `.agent` state.
- [x] Read source files around the current interaction loop, authority loop, render/debug loop, and command seam.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify services that the kits offer.
- [x] Identify implemented, candidate, and planned kits.
- [x] Update root `.agent` docs.
- [x] Add timestamped architecture, render, gameplay, command-authority, tracker, and turn-ledger entries.
- [x] Update the repo-local kit registry.
- [x] Update the central repo ledger.
- [x] Add a central internal change-log entry.
- [ ] Runtime source was not changed.
- [ ] Build/browser/local validation was not run.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      selected fallback follow-up
LuminaryLabs-Publish/AetherVale          tracked; root .agent represented centrally
LuminaryLabs-Publish/TheOpenAbove        tracked; root .agent represented centrally
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked; root .agent represented centrally
LuminaryLabs-Publish/PrehistoricRush     tracked; root .agent represented centrally
LuminaryLabs-Publish/ZombieOrchard       tracked; root .agent observed directly this run
LuminaryLabs-Publish/IntoTheMeadow       tracked; root .agent represented centrally
LuminaryLabs-Publish/MyCozyIsland        tracked; root .agent represented centrally
LuminaryLabs-Publish/TheUnmappedHouse    tracked; root .agent represented centrally
```

No non-Cavalry Publish repo was found that was fully new, central-ledger absent, undocumented, or missing root `.agent` state.

`HorrorCorridor` was selected as a fallback follow-up because its previous docs already identified the command-result source wire map, but the next implementation still needed a consumer acceptance map for local authority, host authority, debug projection, and fixtures.

## Evidence read

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-checks/reports/latest-summary.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/ZombieOrchard.md
LuminaryLabs-Publish/HorrorCorridor:.agent/START_HERE.md
LuminaryLabs-Publish/HorrorCorridor:.agent/current-audit.md
LuminaryLabs-Publish/HorrorCorridor:.agent/known-gaps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/next-steps.md
LuminaryLabs-Publish/HorrorCorridor:.agent/validation.md
LuminaryLabs-Publish/HorrorCorridor:.agent/kit-registry.json
LuminaryLabs-Publish/HorrorCorridor:.agent/command-authority-audit/2026-07-08T11-09-38-04-00-command-result-source-wire-map.md
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
-> create or join room identity
-> complete loading/readiness gates
-> mount GameCanvas runtime
-> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, and debug state
-> enter pointer-lock first-person navigation
-> derive interact action from distance-to-end and carried-cube state
-> pickup, drop, place, or remove cube
-> ordered sequence validates anomaly completion
-> ooze cadence advances on host/local authority ticks
-> authoritative snapshot is built and published or skipped
-> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Target authority loop

```txt
local input or peer message
-> CommandEnvelope
-> interaction/network preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> local-authority-result-consumer or host-authority-result-consumer
-> publish / skip / recovery / no-op / victory
-> runtime debug projection
-> DOM-free fixture replay
-> browser/live validation after fixture proof
```

## Domains in use

```txt
application-shell, next-client-runtime, react-game-surface, ui-screen-routing, settings-overlay, completion-routing, pause-state, readiness-state, session-lifecycle, room-identity, join-code-routing, peer-identity, peer-networking, host-transport, client-transport, network-message-protocol, host-message-ingress, client-message-egress, replicated-snapshot-protocol, full-sync-output, request-sync-recovery, seeded-maze-bootstrap, maze-cell-lookup, maze-pathing, cube-spawn-bootstrap, anomaly-sequence-bootstrap, sequence-slot-authority, ordered-sequence-validation, victory-completion, first-person-input, pointer-lock-control, keyboard-input, mouse-look-input, player-view-angles, player-movement-integration, maze-collision-resolution, camera-bob, local-pose-prediction, local-carry-state-sync, host-authority, local-authoritative-simulation, remote-authoritative-ingress, command-envelope-contract, command-source-normalization, command-reason-catalog, command-result-contract, command-result-envelope, command-result-status-policy, command-result-rejection-policy, interaction-preflight-diagnostics, player-pose-command-result, interaction-command-result, ooze-command-result, request-sync-command-result, ready-cancel-command-result, victory-command-result, command-result-journal, command-result-fixture-matrix, command-replay-fixture, local-authority-command-consumer, host-authority-command-consumer, runtime-debug-command-projection, snapshot-build, snapshot-publish-contract, snapshot-publish-metadata, publish-decision-snapshot, snapshot-publish-fixture, runtime-debug-event-log, runtime-debug-frame-log, runtime-debug-result-projection, cadence-diagnostics, render-world-snapshot-consumption, three-renderer, post-processing, maze-world-rendering, minimap-rendering, scene-dressing-descriptors, mesh-object-kit-catalog, procedural-texture-kit-family, static-smoke-validation, live-player-validation, replay-parity-validation
```

## Kit services

```txt
app-session-service:
  room identity, join code, player identity, mode selection, readiness, pause/resume, completion routing

peer-sync-service:
  host transport, client transport, full sync, player update, try interact, request sync recovery

maze-bootstrap-service:
  seed hash, maze generation, cell lookup, path build, cube spawn, sequence slots, initial snapshot

first-person-player-service:
  keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync

interaction-preflight-service:
  playing-state validation, player lookup, carried-cube lookup, nearest-cube lookup, anomaly distance, slot resolution, stable rejection reason

command-result-envelope-service:
  command id, command source, status, reason, changed flag, events, diagnostics, legacy GameState return adapter

publish-decision-service:
  publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag, completion flag

local-authority-result-consumer-service:
  consume local interaction result, journal rejection, skip rejected/no-op publish, publish accepted changed/victory

host-authority-result-consumer-service:
  consume host player update result, consume host interaction result, skip rejected TRY_INTERACT broadcast, publish request-sync recovery, publish accepted changed/victory

diagnostics-service:
  runtime events, runtime frames, cadence, latest command result, latest publish decision, journal counts, fixture parity

replay-service:
  fixture matrix, journal replay, volatile normalization, snapshot parity, proof output

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
.agent/architecture-audit/2026-07-08T12-29-17-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T12-29-17-04-00-command-debug-readback-map.md
.agent/gameplay-audit/2026-07-08T12-29-17-04-00-local-host-authority-loop.md
.agent/command-authority-audit/2026-07-08T12-29-17-04-00-consumer-acceptance-map.md
.agent/trackers/2026-07-08T12-29-17-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T12-29-17-04-00.md
```

## Main finding

`HorrorCorridor` should not move into renderer extraction, PeerJS extraction, minimap extraction, post-processing work, scene dressing, object-kit visual expansion, or new content next.

The next source pass should build result-returning command contracts and local/host consumer fixtures so `GameCanvas.tsx` stops using object identity and action-string checks as authority.

## Next safe ledge

```txt
HorrorCorridor Command Result Consumer Acceptance Map + Fixture Gate
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