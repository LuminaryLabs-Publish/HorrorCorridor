# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-14T16-00-05-04-00`  
**Branch:** `main`  
**Status:** `page-lifecycle-session-suspension-resume-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is browser page lifecycle ownership: global input, pointer lock, one RAF loop, transport subscriptions, mutable session state, renderer resources and debug capture have no explicit hide, freeze, pagehide, BFCache or restore transaction.

## Plan ledger

**Goal:** suspend local work without losing accepted multiplayer truth, then admit one coherent resumed runtime generation with visible proof.

- [x] Compare the full Publish inventory, central ledgers, root `.agent` states and current heads.
- [x] Select only HorrorCorridor by the oldest eligible timestamp.
- [x] Inspect `GameCanvas`, `animationLoop`, movement, transport, rendering and cleanup surfaces.
- [x] Preserve all 29 kits, two adapters and services.
- [x] Add and route the timestamped lifecycle audit family.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
start/lobby
  -> solo, host or client admission
  -> bootstrap snapshot
  -> GameCanvas initializes world, input, network and RAF
  -> PLAYING advances local authority or client prediction
  -> snapshots, world, minimap and debug project current state

hidden/frozen/pagehide
  -> no lifecycle command
  -> no held-input retirement
  -> no RAF or network-send suspension lease
  -> no snapshot/session checkpoint
  -> no BFCache classification

visible/resume/pageshow
  -> predecessor participants continue implicitly
  -> stale held input and callbacks are not generation-rejected
  -> transport and renderer are not jointly revalidated
  -> no first resumed runtime frame is acknowledged
```

## Domains in use

```txt
routing and browser document lifecycle
visibility pagehide pageshow freeze resume and BFCache
session room roster connection readiness and reset
loading and deterministic bootstrap
transport protocol snapshots and authoritative publication
keyboard pointer-lock focus blur and held-input state
pause settings completion and UI projection
movement collision camera and prediction
interaction anomaly ooze and victory
Three.js world post-processing minimap RAF and viewport
resource listener transport and renderer retirement
lifecycle checkpoint restoration and resumed-frame evidence
debug proof package build deployment and central tracking
```

## Implemented inventory

```txt
implemented kits: 29
proof adapters: 2
total implemented surfaces: 31
planned lifecycle coordinating surfaces: 22
```

The complete kit-by-kit service inventory is in `.agent/kit-registry.json` and the latest tracker.

## Source-backed findings

```txt
blur handler exists: yes
visibilitychange handler exists: no
pagehide/pageshow handlers exist: no
freeze/resume handlers exist: no
BFCache classification exists: no
held input lifecycle retirement exists: no
RAF suspension lease exists: no
transport liveness policy exists: no
session checkpoint/result exists: no
participant revalidation exists: no
stale lifecycle callback rejection exists: no
FirstResumedRuntimeFrameAck exists: no
```

## Required authority

```txt
corridor-page-lifecycle-session-suspension-resume-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-14T16-00-05-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T16-00-05-04-00.md
.agent/architecture-audit/2026-07-14T16-00-05-04-00-page-lifecycle-suspension-resume-dsk-map.md
.agent/render-audit/2026-07-14T16-00-05-04-00-hidden-resume-runtime-frame-gap.md
.agent/gameplay-audit/2026-07-14T16-00-05-04-00-hidden-held-input-network-loop.md
.agent/interaction-audit/2026-07-14T16-00-05-04-00-page-lifecycle-command-result-map.md
.agent/page-lifecycle-audit/2026-07-14T16-00-05-04-00-document-runtime-transport-resume-contract.md
.agent/deploy-audit/2026-07-14T16-00-05-04-00-page-lifecycle-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-14T16-00-05-04-00-repo-ledger-page-lifecycle-reconciliation.md
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, scripts, dependencies, tests, workflows and deployment are unchanged.