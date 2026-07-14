# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-13T23-38-39-04-00`  
**Status:** `loading-progress-readiness-evidence-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, transport, deterministic bootstrap, interaction gameplay and a Three.js presentation stack.

The current audit isolates loading truth. The five visible loading rows advance through fixed RAF/timer delays without executing or observing their named work. Maze bootstrap happens after those rows, while renderer and world construction begin only after `PLAYING` and rendering readiness have already been committed.

## Plan ledger

**Goal:** make displayed progress, readiness and playable entry derive from accepted subsystem results and one matching first visible frame.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only HorrorCorridor under the oldest eligible rule.
- [x] Preserve the complete interaction loop, domains, 29-kit inventory and services.
- [x] Add the timestamped loading-evidence audit family.
- [x] Refresh root docs and machine registry.
- [ ] Implement and execute loading, cancellation, readiness and visible-frame fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-13T23-38-39-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-13T23-38-39-04-00-loading-progress-readiness-evidence-dsk-map.md`
7. `.agent/loading-audit/2026-07-13T23-38-39-04-00-work-plan-progress-readiness-contract.md`
8. `.agent/deploy-audit/2026-07-13T23-38-39-04-00-loading-truth-fixture-gate.md`
9. `.agent/central-sync-audit/2026-07-13T23-38-39-04-00-repo-ledger-loading-evidence-reconciliation.md`

## Current authority boundary

```txt
corridor-loading-progress-readiness-evidence-authority-domain
```

## Required transaction

```txt
CorridorLoadCommand
  -> bind route, session, room, roster and provider revisions
  -> allocate attempt and generation
  -> execute an immutable real-work plan
  -> derive progress from accepted step results
  -> cancel or supersede stale continuations
  -> prepare bootstrap and visual resources before adoption
  -> atomically commit route, state and readiness evidence
  -> acknowledge the matching first visible frame
  -> return a typed terminal result or restore the predecessor
```

## Validation boundary

Documentation only. No truthful loading-progress, cancellation, readiness-evidence, first-frame or production-readiness claim is made.