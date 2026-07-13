# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-13T07-00-29-04-00`  
**Status:** `cross-store-session-transition-authority-central-reconciled`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic maze bootstrap, movement, interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates cross-store transition coherence. `GameShell` mutates independent session, runtime and UI Zustand stores in ordered setter sequences. `GameCanvas`, `HUDOverlay`, lobby surfaces and diagnostics independently observe those stores, but no transition identity, participant revision set, atomic commit result, rollback or coherent-frame acknowledgement proves they adopted one state together.

## Plan ledger

**Goal:** make each route, lobby, gameplay, sync, pause, completion and exit transition an all-or-nothing commit across session, runtime and UI ownership.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm no higher-priority new, missing or unsynchronized repository exists.
- [x] Select only HorrorCorridor as the oldest eligible central entry.
- [x] Preserve the complete interaction loop, active domains and 29-kit service inventory.
- [x] Add the timestamped cross-store transition audit family.
- [x] Refresh root `.agent` documents and machine registry.
- [x] Keep all writes on `main`; create no branch or pull request.
- [ ] Implement and prove cross-store transition authority.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-13T07-00-29-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-13T07-00-29-04-00-cross-store-session-transition-authority-dsk-map.md`
7. `.agent/state-transition-audit/2026-07-13T07-00-29-04-00-session-runtime-ui-atomic-commit-contract.md`
8. `.agent/deploy-audit/2026-07-13T07-00-29-04-00-cross-store-transition-fixture-gate.md`
9. `.agent/central-sync-audit/2026-07-13T07-00-29-04-00-repo-ledger-cross-store-transition-reconciliation.md`

## Current authority boundary

```txt
corridor-cross-store-session-transition-authority-domain
```

## Source finding

```txt
cross-store transition ID/generation: absent
expected session/runtime/UI revisions: absent
participant prepare/commit/rollback results: absent
setRoom already updates lobbyPlayers: yes
GameShell often calls setLobbyPlayers again: yes
START_GAME and SYNC correlated atomically: no
host commits local state before separate START_GAME and SYNC broadcasts: yes
GameCanvas combines runtime snapshot with fresh session read: yes
HUDOverlay independently combines three stores: yes
readiness derived from committed aggregate result: no
first coherent visible-frame acknowledgement: absent
```

## Required transaction

```txt
SessionTransitionCommand
  -> validate predecessor revisions
  -> prepare detached session/runtime/UI candidates
  -> validate cross-domain invariants
  -> commit every participant or none
  -> publish CrossStoreTransitionResult
  -> bind network messages to the transition generation
  -> derive readiness
  -> publish CoherentFrameEnvelope and FirstCoherentFrameAck
```

## Validation boundary

Documentation only. Runtime source, networking, gameplay, rendering, dependencies, package scripts and deployment were not changed. No atomic transition, rollback, frame-coherence or production-readiness claim is made until focused fixtures pass on `main`.