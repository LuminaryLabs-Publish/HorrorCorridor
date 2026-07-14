# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-13T23-38-39-04-00`  
**Branch:** `main`  
**Status:** `loading-progress-readiness-evidence-authority-audited`

## Summary

The repository retains a 29-kit browser runtime spanning routing, sessions, PeerJS/local transport, deterministic maze bootstrap, movement, interactions, ooze, snapshot publication, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current boundary is loading-progress truth. `runLoadingSteps()` advances five authored labels through one RAF and a 90 ms timer each. It does not execute or observe the named maze, raycast, object, material or lighting work. Bootstrap happens afterward. The shell then enters `PLAYING` and marks rendering ready before `GameCanvas` constructs the renderer, scene, post-processing chain, maze world or first visible frame.

## Plan ledger

**Goal:** make one generation-bound work plan authoritative from load admission through real subsystem results, readiness settlement and visible completion.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select HorrorCorridor as the oldest eligible central entry.
- [x] Read loading, bootstrap, runtime and rendering source.
- [x] Preserve all 29 implemented kits and services.
- [x] Add the timestamped loading-evidence audit family.
- [x] Refresh root docs and registry.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
solo or host start
  -> set LOADING
  -> advance five rows by RAF plus 90 ms
  -> no named subsystem command or result
  -> create initial game state after rows finish
  -> commit session, snapshot, UI and readiness
  -> enter PLAYING
  -> mount GameCanvas
  -> create renderer, scene, post-processing and world
  -> start RAF
  -> no first visible frame acknowledgement

client SYNC
  -> replace room and snapshot
  -> mark all readiness true
  -> enter PLAYING without the same load plan
  -> mount visual provider afterward
```

## Domains in use

```txt
application shell and route lifecycle
session, room, roster, identity, connection and readiness
loading work plans, attempts, generations, progress and cancellation
maze bootstrap and deterministic world state preparation
PeerJS, BroadcastChannel and protocol handling
runtime snapshot, input, cadence and publication
first-person movement, collision, interaction, anomaly and ooze
React loading/lobby/pause/completion/HUD/minimap projection
Three.js renderer, scene, post-processing, world and frame scheduling
first-frame and visible readiness evidence
cleanup, validation, build, deployment and central tracking
```

## Implemented kits and offered services

The 29 implemented kits remain unchanged. They cover application routing, session state, runtime snapshots, UI projection, host/client transport, event bus, protocol construction/serialization, deterministic bootstrap, input, movement, network updates, interactions, anomaly and ooze rules, snapshot publication, animation, Three.js world/post-processing/minimap, diagnostics, cleanup and package validation. The complete per-kit service list is in the current tracker and machine registry.

## Source-backed findings

```txt
visible loading labels: 5
real work callbacks per row: 0
step result receipts: 0
progress source: array index plus elapsed delays
bootstrap during rows: no
bootstrap after rows: yes
render provider created before rendering-ready claim: no
first visible frame required before PLAYING: no
client/host load-plan parity: no
load attempt or generation: no
cancellation after awaits: no
rollback result: no
```

## Required parent domain

```txt
corridor-loading-progress-readiness-evidence-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-13T23-38-39-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T23-38-39-04-00.md
.agent/architecture-audit/2026-07-13T23-38-39-04-00-loading-progress-readiness-evidence-dsk-map.md
.agent/render-audit/2026-07-13T23-38-39-04-00-loading-to-first-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T23-38-39-04-00-timed-loading-before-bootstrap-loop.md
.agent/interaction-audit/2026-07-13T23-38-39-04-00-load-command-step-result-map.md
.agent/loading-audit/2026-07-13T23-38-39-04-00-work-plan-progress-readiness-contract.md
.agent/deploy-audit/2026-07-13T23-38-39-04-00-loading-truth-fixture-gate.md
.agent/central-sync-audit/2026-07-13T23-38-39-04-00-repo-ledger-loading-evidence-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, package, dependency or deployment behavior changed.