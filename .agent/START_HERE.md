# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T18-31-01-04-00`  
**Status:** `room-join-code-allocation-authority-audited`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, PeerJS and same-origin transport, deterministic bootstrap, authoritative snapshots, interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The latest audit isolates room and join-code allocation. A four-character random code becomes the visible join code and requested PeerJS host ID before reservation or ownership succeeds. Generic peer errors do not regenerate the code, roll back the advertised lobby or publish a typed failed-host result.

## Plan ledger

**Goal:** make the advertised room identity one accepted manifest before clients, readiness, start or visible hosting state can consume it.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have synchronized central and root `.agent` state.
- [x] Select only HorrorCorridor as the oldest eligible repository.
- [x] Preserve the complete interaction loop, domain map and 29-kit service census.
- [x] Add the timestamped room-identity audit family.
- [x] Refresh root documentation and machine registry.
- [ ] Implement reservation, ownership, retry and fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-12T18-31-01-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-12T18-31-01-04-00-room-join-code-allocation-dsk-map.md`
7. `.agent/room-identity-audit/2026-07-12T18-31-01-04-00-reservation-ownership-retry-contract.md`

## Current authority boundary

```txt
corridor-room-join-code-allocation-authority-domain
```

## Source finding

```txt
join code: four Math.random base-36 characters
PeerJS host ID: join code
room and lobby committed before peer/open: yes
candidate reservation: no
collision-specific result: no
bounded retry generation: no
roomId/joinCode/peerId manifest: no
local bridge and PeerJS identity parity proof: no
first accepted-hosting frame acknowledgement: no
```

## Latest audit family

```txt
.agent/trackers/2026-07-12T18-31-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T18-31-01-04-00.md
.agent/architecture-audit/2026-07-12T18-31-01-04-00-room-join-code-allocation-dsk-map.md
.agent/render-audit/2026-07-12T18-31-01-04-00-advertised-room-host-ownership-gap.md
.agent/gameplay-audit/2026-07-12T18-31-01-04-00-join-code-collision-hosting-loop.md
.agent/interaction-audit/2026-07-12T18-31-01-04-00-host-room-identity-admission-map.md
.agent/room-identity-audit/2026-07-12T18-31-01-04-00-reservation-ownership-retry-contract.md
.agent/deploy-audit/2026-07-12T18-31-01-04-00-room-identity-collision-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime, network, gameplay, rendering, dependencies, package scripts and deployment were not changed.