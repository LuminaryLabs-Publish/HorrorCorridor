# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T08:29:35-04:00`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, choose one eligible repo, update repo-local `.agent` docs, and log the result centrally.

**Checklist:**

- [x] List accessible `LuminaryLabs-Publish` repos through the installed GitHub app.
- [x] Compare Publish repos against central latest-summary / repo-ledger state.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Check fallback ordering against current visible repo-local alignments.
- [x] Select exactly one repo.
- [x] Update root `.agent` docs.
- [x] Add a timestamped tracker entry.
- [x] Add a timestamped turn-ledger entry.
- [x] Add architecture, render, and command-authority audit entries.
- [x] Update central repo ledger.
- [x] Add central internal change-log entry.
- [ ] Runtime source changes were not made.
- [ ] Runtime validation was not run.

## Publish repo list checked

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheUnmappedHouse
```

## Selection result

```txt
selected: LuminaryLabs-Publish/HorrorCorridor
excluded: LuminaryLabs-Publish/TheCavalryOfRome
reason: oldest eligible fallback follow-up after newer PrehistoricRush and TheUnmappedHouse alignments; unresolved command/result source-edit cutover queue
```

No checked eligible repo was fully new, central-ledger absent, root-agent missing, or recently added but undocumented.

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The current runtime uses Next, React, Three.js, Zustand, PeerJS, and TypeScript.

The player starts from a menu, enters solo/host/client mode, moves through a seeded corridor maze, manipulates colored cubes, solves an ordered anomaly sequence, avoids growing ooze pressure, and reaches a victory/completion screen.

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

## Authority loop gap

```txt
client PLAYER_UPDATE
-> host applyNetworkPlayerUpdate
-> GameState returned
-> host publishes resync snapshot

client TRY_INTERACT
-> host applyNetworkInteractionRequest
-> interaction rule returns GameState only
-> rejected/invalid commands often return unchanged state without reason metadata
-> host syncs carried cubes
-> host publishes resync or recovery snapshot

local solo/host interact
-> local applyNetworkInteractionRequest
-> if nextState identity equals currentGameState, return silently
-> otherwise publish resync snapshot
```

## Target authority loop

```txt
input or peer message
-> CommandEnvelope
-> interaction/network preflight
-> CommandResult
-> PublishDecision
-> CommandJournal
-> RuntimeDebug result projection
-> DOM-free fixture replay
-> final snapshot parity comparison
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

## Services offered by kits

```txt
app/session service:
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
  publish/skip/recovery/victory/no-op decision, snapshot reason, broadcast flag, final snapshot parity

diagnostics and replay service:
  event log, frame log, cadence summary, latest command result, latest publish decision, journal counts, fixture parity

render service:
  renderer, scene, camera, postprocess, maze world, minimap, scene dressing summary, disposal

validation service:
  lint, protokit smoke, horror corridor harness, live player validation, object-kit review, visual match
```

## Kits

### Source-backed / implemented kits

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

### Planned next command kits

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

## Files changed in this repo-local pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T08-29-35-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T08-29-35-04-00-render-authority-readback.md
.agent/command-authority-audit/2026-07-08T08-29-35-04-00-source-edit-cutover-queue.md
.agent/trackers/2026-07-08T08-29-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T08-29-35-04-00.md
```

## Next slice

```txt
HorrorCorridor Command Result Fixture Gate: Source Edit Cutover Queue
```

Build order:

```txt
preserve current solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior
  -> add command contract files
  -> add reason catalog
  -> add result constructors
  -> add publish decision helper
  -> add command journal
  -> add interaction preflight helpers
  -> add interaction result wrappers
  -> add network result wrappers
  -> add DOM-free command fixture script
  -> extend debug result projection after fixture passes
  -> let GameCanvas consume metadata after fixture/debug proof
```

## Acceptance target

```txt
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
node scripts/horror-corridor-command-fixture.mjs
npm run validate:live-player:dev
npm run review:object-kit
```

## Validation note

This was a documentation-only pass.

No runtime source files were changed.

No local checkout, install, lint, smoke test, harness, command fixture, browser route check, or live multiplayer check was run.
