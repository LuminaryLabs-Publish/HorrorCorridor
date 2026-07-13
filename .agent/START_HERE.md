# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-13T17-40-04-04-00`  
**Status:** `host-start-barrier-loading-generation-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, PeerJS and local transport, deterministic maze bootstrap, movement, interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates multiplayer start admission. The host checks only host mode and room existence, waits through an uncancellable loading sequence, commits local playable state, then broadcasts independent `START_GAME` and `SYNC` messages. No sealed roster, all-ready/connected gate, start identity, loading generation, client preparation acknowledgement, rollback result or first coherent multiplayer-frame acknowledgement exists.

## Plan ledger

**Goal:** make lobby-to-run transition one generation-bound transaction that either converges the sealed roster on one initial snapshot and visible frame or restores the predecessor lobby everywhere.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only HorrorCorridor as the oldest eligible repository.
- [x] Preserve the complete interaction loop, domain map and 29-kit inventory.
- [x] Add the timestamped host-start audit family.
- [x] Refresh root docs and machine registry.
- [ ] Implement and execute start-admission and convergence fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-13T17-40-04-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-13T17-40-04-04-00-host-start-barrier-loading-generation-dsk-map.md`
7. `.agent/lobby-start-audit/2026-07-13T17-40-04-04-00-sealed-roster-loading-generation-contract.md`
8. `.agent/deploy-audit/2026-07-13T17-40-04-04-00-host-start-barrier-fixture-gate.md`
9. `.agent/central-sync-audit/2026-07-13T17-40-04-04-00-repo-ledger-host-start-reconciliation.md`

## Current authority boundary

```txt
corridor-host-start-barrier-loading-generation-authority-domain
```

## Required transaction

```txt
HostStartCommand
  -> bind room roster transport and policy revisions
  -> seal connected ready membership
  -> allocate a cancellable loading generation
  -> prepare one detached deterministic initial snapshot
  -> collect client preparation results
  -> atomically commit host and client participants
  -> correlate start messages under one attempt
  -> quarantine stale and duplicate work
  -> publish first coherent participant frame acknowledgements
  -> return HostStartResult or restore the predecessor lobby
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, dependencies, package scripts and deployment were not changed. No sealed lobby, atomic multiplayer start, rollback, visible convergence or production-readiness claim is made.