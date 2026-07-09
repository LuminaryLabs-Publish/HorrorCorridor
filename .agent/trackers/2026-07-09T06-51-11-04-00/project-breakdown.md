# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-51-11-04-00`

**Runtime project:** Nexus Engine / Realtime ChatGPT

## Goal

Refresh the internal repo breakdown for one eligible `LuminaryLabs-Publish` project, keep repo-local `.agent` state current, and sync the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

## Selection checklist

```txt
[x] Full accessible LuminaryLabs-Publish repo list checked.
[x] Central LuminaryLabs-Dev/LuminaryLabs Publish ledger checked.
[x] Cavalry of Rome excluded.
[x] One repo selected only.
[x] Root .agent state inspected.
[x] Interaction loop identified.
[x] Domains identified.
[x] Kit services identified.
[x] Kits identified.
[x] New timestamped tracker and turn-ledger entries added.
[x] Architecture/render/gameplay/command/interaction/deploy audits added.
[x] Root .agent docs refreshed.
[x] Central ledger and internal change log queued for update.
[x] No branch created.
[x] Push target remains main only.
```

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / oldest central-ledger fallback before current repo-local catch-up
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T04-50-00-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T05-11-22-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
```

No eligible non-Cavalry Publish repo was found that was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`HorrorCorridor` was selected because it had repo-local command authority audit state ahead of central tracking and remains the oldest eligible fallback for the unresolved command-result proof seam.

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The runtime is a Next/React client game surface using Three.js rendering, peer host/client sync, pointer-lock movement, cube carry/place interactions, ordered anomaly sequence completion, ooze cadence, replicated snapshots, minimap rendering, and runtime debug frame capture.

## Current interaction loop

```txt
open app
  -> start menu
  -> select solo, host, or join
  -> create local session/room identity
  -> receive initial replicated snapshot
  -> mount GameCanvas
  -> build renderer, scene, camera, post-processing, maze world, minimap, pose refs, input refs, cadence, and debug state
  -> pointer-lock first-person movement updates pose and camera
  -> interact key derives action from carried cube state plus distance to anomaly
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> unchanged/rejected/skipped/request-sync paths collapse to state identity or implicit reason strings
  -> sync held cubes to players
  -> advance ooze on authority cadence
  -> publish authoritative snapshot when cadence/action path allows
  -> update world, minimap, HUD, completion state, and runtime debug frame
```

## Main source finding

The command seam is still implicit. `GameCanvas.tsx` derives action strings and uses object identity or implicit publish reasons as control flow. `networkRules.ts` dispatches interaction requests to `interactionRules.ts`, but returns `GameState` only. `interactionRules.ts` has many valid rejected/no-op branches that silently return the original state.

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
session-lifecycle
room-identity
peer-networking
host-transport
client-transport
network-message-protocol
replicated-snapshot-protocol
seeded-maze-bootstrap
maze-cell-lookup
maze-pathing
cube-spawn-bootstrap
anomaly-sequence-bootstrap
ordered-sequence-validation
victory-completion
first-person-input
pointer-lock-control
mouse-look-input
keyboard-input
player-movement-integration
maze-collision-resolution
local-pose-prediction
local-carry-state-sync
host-authority
local-authoritative-simulation
remote-authoritative-ingress
legacy-game-state-interaction-rules
legacy-game-state-network-rules
ooze-trail-navigation
runtime-debug-frame-capture
three-render-world
post-processing
minimap-rendering
scene-dressing-descriptors
mesh-object-kit-catalog
procedural-texture-kit-family
command-envelope-contract
command-reason-catalog
command-result-envelope
command-decision-contract
publish-decision-snapshot
command-result-journal
interaction-preflight
network-result-rules
local-authority-result-consumer
host-authority-result-consumer
runtime-debug-command-projection
command-result-fixture-matrix
command-replay-fixture
central-ledger-synchronization
```

## Services kits offer

```txt
corridor-session-domain-kit: mode selection, room identity, readiness, pause, completion routing.
peer-room-sync-domain-kit: host/client transport, full sync, player update, try-interact, recovery sync.
maze-snapshot-bootstrap-kit: seed, maze grid, cell lookup, cube spawns, target sequence, pathing.
first-person-corridor-player-kit: keyboard input, pointer lock, look delta, movement, collision, camera pose.
corridor-interaction-domain-kit: pickup, drop, place at anomaly, remove from anomaly.
ordered-anomaly-sequence-kit: slot occupancy, required color order, victory completion.
ooze-trail-domain-kit: authority cadence, ooze spawn/decay, player proximity response.
corridor-render-world-kit: Three.js world attachment, world update, terrain eye position, disposal.
corridor-minimap-kit: snapshot minimap projection and draw.
runtime-debug-frame-kit: runtime events, frame capture, cadence, snapshot summary, scene dressing readback.
command-envelope-contract-kit: command id/source/player/action/payload normalization.
command-reason-catalog-kit: stable accepted/rejected/unchanged/skipped/publish-only/victory reasons.
command-result-envelope-kit: before/after summaries, changed flag, reason, events, diagnostics, legacy adapter state.
command-decision-contract-kit: result-to-publish behavior, broadcast flag, recovery flag, victory flag.
command-result-journal-kit: latest result, counts by status, latest reason, latest publish decision.
command-seed-state-fixture-kit: canonical GameState seeds and expected row facts.
interaction-preflight-kit: player lookup, carried cube lookup, cube distance, anomaly distance, slot availability.
interaction-result-rules-kit: result-returning pickup/drop/place/remove wrappers with legacy adapters.
network-result-rules-kit: result-returning player update, held-cube sync, request-sync/toggle-ready/cancel handling.
local-authority-result-consumer-kit: local command journaling and publish/skip/victory behavior.
host-authority-result-consumer-kit: host PLAYER_UPDATE/TRY_INTERACT/recovery/victory behavior.
runtime-debug-command-projection-kit: additive command result readback for debug frames/export.
command-result-fixture-matrix-kit: DOM-free accepted/rejected/unchanged/skipped/recovery/victory proof rows.
command-replay-fixture-kit: snapshot parity and volatile-field normalization.
central-ledger-sync-kit: repo-local docs plus central ledger/change-log synchronization.
```

## Kits identified

```txt
Implemented/source-backed:
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

Planned next-cut:
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

## Next safe ledge

```txt
HorrorCorridor Command Result Ledger Consumer + Runtime Debug Projection Fixture Gate
```

## Validation

This was a documentation-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: no
local npm run lint: no
local npm run smoke:protokits: no
local npm run harness:horror-corridor: no
command fixture run: no, fixture does not exist yet
browser smoke: no
central ledger update required: yes
push target: main
```
