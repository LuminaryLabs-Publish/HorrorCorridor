# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-14T16-00-05-04-00`  
**Status:** `page-lifecycle-session-suspension-resume-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, deterministic bootstrap, PeerJS and BroadcastChannel transport, predictive movement, host snapshots, interaction gameplay, Three.js presentation, minimap and browser proof tooling.

The current audit isolates browser page lifecycle ownership. The active runtime handles `blur` but has no explicit visibility, pagehide, pageshow, freeze, resume or BFCache transaction. Input, RAF, transport, renderer, snapshot and debug participants therefore cross suspension boundaries without a suspension lease, resume result or first resumed-frame acknowledgement.

## Plan ledger

**Goal:** preserve accepted session truth while suspending local work and admitting exactly one coherent resumed runtime generation.

- [x] Compare all 11 accessible Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only HorrorCorridor under the oldest eligible rule.
- [x] Preserve the complete 29-kit, two-adapter inventory and offered services.
- [x] Add the timestamped page-lifecycle audit family.
- [x] Refresh root docs and machine registry.
- [ ] Implement and execute lifecycle, BFCache, transport and resumed-frame fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-14T16-00-05-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-14T16-00-05-04-00-page-lifecycle-suspension-resume-dsk-map.md`
7. `.agent/render-audit/2026-07-14T16-00-05-04-00-hidden-resume-runtime-frame-gap.md`
8. `.agent/gameplay-audit/2026-07-14T16-00-05-04-00-hidden-held-input-network-loop.md`
9. `.agent/interaction-audit/2026-07-14T16-00-05-04-00-page-lifecycle-command-result-map.md`
10. `.agent/page-lifecycle-audit/2026-07-14T16-00-05-04-00-document-runtime-transport-resume-contract.md`
11. `.agent/deploy-audit/2026-07-14T16-00-05-04-00-page-lifecycle-browser-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-14T16-00-05-04-00-repo-ledger-page-lifecycle-reconciliation.md`

## Current authority boundary

```txt
corridor-page-lifecycle-session-suspension-resume-authority-domain
```

## Required transaction

```txt
PageLifecycleEvent
  -> bind document, session, runtime and transport generations
  -> classify hidden, pagehide, freeze, persisted pageshow and normal resume
  -> retire held input and local command admission
  -> suspend one RAF and local network-send generation
  -> checkpoint accepted snapshot, pose, clock and participant ownership
  -> apply explicit transport liveness policy
  -> reject stale callbacks and superseded restores
  -> revalidate renderer, world, transport, listeners and viewport
  -> atomically adopt one resumed runtime generation
  -> publish PageLifecycleResult
  -> publish FirstResumedRuntimeFrameAck
```

## Validation boundary

Documentation only. No lifecycle suspension, BFCache safety, transport restoration, stale-input retirement, atomic resume, resumed-frame convergence or production-readiness claim is made.