# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T22-44-30-04-00`  
**Status:** `lobby-capacity-admission-authority-central-reconciled`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic bootstrap, authoritative snapshots, interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates lobby-capacity admission. Rooms declare `maxPlayers: 4`, but remote connection, local bridge, placeholder, store, protocol and bootstrap paths can all accept more members. This reconciliation promotes the completed repo-local audit into central tracking without changing runtime behavior.

## Plan ledger

**Goal:** keep the repo-local and central records aligned around one revisioned capacity authority between member candidates, roster mutation, run bootstrap, protocol publication and visible state.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only HorrorCorridor because its repo-local capacity audit was newer than central tracking.
- [x] Preserve the complete interaction loop, active domains, 29 implemented kits and services.
- [x] Add a new timestamped reconciliation tracker and audit family.
- [x] Keep all repo-local writes on `main`.
- [ ] Implement reservation, capacity admission, typed rejection and executable fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-12T22-44-30-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-12T22-44-30-04-00-lobby-capacity-central-reconciliation-dsk-map.md`
7. `.agent/lobby-capacity-audit/2026-07-12T22-44-30-04-00-reservation-policy-central-reconciliation-contract.md`
8. `.agent/central-sync-audit/2026-07-12T22-44-30-04-00-repo-ledger-capacity-reconciliation.md`

## Current authority boundary

```txt
corridor-lobby-capacity-admission-authority-domain
```

## Source finding

```txt
room maxPlayers declaration: 4
remote connection-open capacity check: absent
local client-connect capacity check: absent
Add guest capacity check: absent
session-store roster capacity invariant: absent
protocol players.length <= maxPlayers validation: absent
bootstrap capacity check: absent
visible count/max/full state: incomplete
first capacity-consistent frame acknowledgement: absent
```

## Required transaction

```txt
LobbyMemberAdmissionCommand
  -> bind room, roster revision and transport generation
  -> classify remote connection, local bridge, placeholder or restore source
  -> reserve one slot without mutating live state
  -> validate maxPlayers, identity uniqueness and connection ownership
  -> return Accepted, Full, Duplicate, Stale, Cancelled, Invalid or Failed
  -> commit one canonical roster revision atomically
  -> consume or release the reservation exactly once
  -> reject over-capacity store and protocol payloads
  -> allow bootstrap only from a sealed capacity-valid roster
  -> publish the first matching visible lobby or gameplay frame
```

## Validation boundary

Documentation only. Runtime source, networking, gameplay, rendering, dependencies, package scripts and deployment were not changed. No capacity enforcement, reservation, final-slot race, over-capacity rejection, rollback or visible-frame claim is made until focused fixtures pass on `main`.