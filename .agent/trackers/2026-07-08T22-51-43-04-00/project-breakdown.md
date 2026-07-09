# HorrorCorridor Project Breakdown Tracker

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T22-51-43-04-00`

## Goal

Break down one eligible `LuminaryLabs-Publish` repo, update its root `.agent` docs, identify its interaction loop/domains/services/kits, and log the result in `LuminaryLabs-Dev/LuminaryLabs`.

## Checklist

```txt
[x] Compare accessible LuminaryLabs-Publish repo list.
[x] Compare against LuminaryLabs-Dev/LuminaryLabs central ledger.
[x] Exclude LuminaryLabs-Publish/TheCavalryOfRome.
[x] Select one repo only: LuminaryLabs-Publish/HorrorCorridor.
[x] Read repo-local .agent state.
[x] Read package validation scripts.
[x] Read GameCanvas runtime/publish/render loop.
[x] Read interactionRules silent no-op branches.
[x] Read networkRules authority seam.
[x] Identify interaction loop.
[x] Identify all domains in use.
[x] Identify services offered by kits.
[x] Identify implemented and next-cut kits.
[x] Update required root .agent files.
[x] Add architecture audit.
[x] Add render audit.
[x] Add gameplay audit.
[x] Add command-authority audit.
[x] Add deploy audit.
[x] Add timestamped turn ledger entry.
[x] Update central LuminaryLabs ledger.
[x] Add central internal change log.
[x] Push to main.
```

## Selected repo

```txt
LuminaryLabs-Publish/HorrorCorridor
```

## Selection reason

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`HorrorCorridor` was selected as the oldest eligible tracked fallback by central ledger timestamp.

## Publish repos compared

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/HorrorCorridor      selected / oldest eligible central alignment 2026-07-08T20-38-28-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-08T21-31-35-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central 2026-07-08T21-18-39-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central 2026-07-08T21-00-12-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central 2026-07-08T22-19-38-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central 2026-07-08T20-52-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-08T21-50-56-04-00
```

## Source anchors read

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
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
  -> local solo/host applies applyNetworkInteractionRequest
  -> client sends TRY_INTERACT
  -> host applies player updates and interaction requests
  -> silent unchanged GameState can hide rejected/no-op/skipped/recovery cases
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot according to implicit gates
  -> update Three world, minimap, HUD, completion routing, and runtime debug frames
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
maze-pathing
cube-spawn-bootstrap
anomaly-sequence-bootstrap
first-person-input
pointer-lock-control
player-view-angles
player-movement-integration
maze-collision-resolution
camera-bob
local-pose-prediction
local-carry-state-sync
cube-carry-interaction
sequence-slot-authority
ordered-sequence-validation
victory-completion
ooze-trail-navigation
host-authority
local-authoritative-simulation
remote-authoritative-ingress
legacy-game-state-interaction-rules
legacy-game-state-network-rules
command-envelope-contract
command-reason-catalog
command-result-envelope
command-decision-contract
publish-decision-snapshot
command-result-journal
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-replay-fixture
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
validation-harnesses
```

## Services offered by kits

```txt
app/session service
peer sync service
maze bootstrap service
first-person player service
legacy GameState interaction service
legacy GameState network service
interaction preflight service
command fixture seed service
command result envelope service
publish decision service
local authority result consumer service
host authority result consumer service
diagnostics/readback service
replay fixture service
render/minimap service
validation harness service
```

## Kits

```txt
implemented:
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

next-cut:
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
- runtime-debug-result-projection-kit
- command-result-fixture-matrix-kit
- command-replay-fixture-kit
```

## Main finding

`HorrorCorridor` should not begin with visual expansion, renderer extraction, or PeerJS extraction. The next safe cut is a source-backed command result and consumer layer that keeps the current `GameState` exports compatible while proving local/host publish behavior and runtime debug command readback in a DOM-free fixture.

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T22-51-43-04-00-command-consumer-source-cut-dsk-map.md
.agent/render-audit/2026-07-08T22-51-43-04-00-runtime-debug-command-readback-map.md
.agent/gameplay-audit/2026-07-08T22-51-43-04-00-local-host-command-consumer-loop.md
.agent/command-authority-audit/2026-07-08T22-51-43-04-00-source-cut-fixture-contract.md
.agent/deploy-audit/2026-07-08T22-51-43-04-00-command-fixture-validation-gate.md
.agent/trackers/2026-07-08T22-51-43-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T22-51-43-04-00.md
```

## Central files changed

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T22-51-43-04-00-horror-corridor-command-consumer-source-cut.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: no
local npm run lint: no
local npm run smoke:protokits: no
local npm run harness:horror-corridor: no
node command fixture: no, script does not exist yet
browser smoke: no
pushed to main: yes
```
