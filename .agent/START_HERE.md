# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T22-29-30-04-00`  
**Status:** `lobby-capacity-admission-authority-audited`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic bootstrap, authoritative snapshots, interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates lobby-capacity admission. Every room declares `maxPlayers: 4`, but PeerJS and local-bridge connection admission, the host `Add guest` control, Zustand roster mutation, protocol decoding and run bootstrap all accept arbitrarily large player arrays. The visible lobby can therefore exceed its declared capacity and the host can materialize and publish an over-capacity gameplay roster.

## Plan ledger

**Goal:** place one revisioned capacity authority between connection candidates, placeholder requests, roster mutation, run bootstrap and visible lobby/game state.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only HorrorCorridor as the oldest eligible entry.
- [x] Preserve the complete interaction loop, active domains, 29 implemented kits and services.
- [x] Add the timestamped lobby-capacity audit family.
- [x] Refresh required root documentation and machine registry.
- [ ] Implement reservation, capacity admission, typed rejection and executable fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-12T22-29-30-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-12T22-29-30-04-00-lobby-capacity-admission-dsk-map.md`
7. `.agent/lobby-capacity-audit/2026-07-12T22-29-30-04-00-max-player-reservation-commit-contract.md`

## Current authority boundary

```txt
corridor-lobby-capacity-admission-authority-domain
```

## Source finding

```txt
room maxPlayers declaration: 4
connection-open capacity check: absent
local client-connect capacity check: absent
Add guest capacity check: absent
session-store roster capacity invariant: absent
protocol players.length <= maxPlayers validation: absent
bootstrap capacity check: absent
visible full/capacity state: absent
first capacity-consistent frame acknowledgement: absent
```

## Required transaction

```txt
LobbyMemberAdmissionCommand
  -> bind room, roster revision and transport generation
  -> classify remote connection, placeholder or restore source
  -> reserve one slot without mutating the live roster
  -> validate maxPlayers, identity uniqueness and live ownership
  -> return Accepted, Full, Duplicate, Stale or Rejected
  -> commit one canonical roster revision
  -> release or consume the reservation exactly once
  -> allow bootstrap only from a capacity-valid sealed roster
  -> publish the first matching visible lobby or gameplay frame
```

## Validation boundary

Documentation only. Runtime source, networking, gameplay, rendering, dependencies, package scripts and deployment were not changed. No capacity enforcement, reservation, over-capacity rejection, rollback or visible-frame claim is made until focused fixtures pass on `main`.
