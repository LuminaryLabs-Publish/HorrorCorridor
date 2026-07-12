# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T18-38-51-04-00`  
**Status:** `room-join-code-allocation-central-reconciled`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host, and client routes, PeerJS and same-origin transport, deterministic bootstrap, authoritative snapshots, interactions, ooze pressure, Three.js rendering, bloom, minimap, and diagnostics.

The current reconciliation preserves the room-identity audit completed through repo head `add973ebd44067648d75f7b5eab157559b3acdc1`. A four-character random code is still advertised as a joinable room and requested as the PeerJS host ID before reservation, ownership admission, collision classification, bounded retry, rollback, or visible-hosting proof.

## Plan ledger

**Goal:** keep room identity allocation as the first multiplayer authority gate and synchronize the final repo-local audit state with central tracking.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Detect HorrorCorridor completion commits newer than the prior central write.
- [x] Select only HorrorCorridor.
- [x] Preserve the complete interaction loop, domain map, and 29-kit service census.
- [x] Add a new timestamped reconciliation audit family.
- [x] Refresh root documentation and machine registry.
- [ ] Implement reservation, ownership, retry, rollback, and fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-12T18-38-51-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-12T18-38-51-04-00-room-identity-central-reconciliation-dsk-map.md`
7. `.agent/room-identity-audit/2026-07-12T18-38-51-04-00-manifest-reservation-retry-reconciliation-contract.md`

## Current authority boundary

```txt
corridor-room-join-code-allocation-authority-domain
```

## Source finding

```txt
join code: four Math.random base-36 characters
requested PeerJS host ID: join code
room and lobby committed before peer/open: yes
same-code BroadcastChannel created: yes
candidate reservation: no
collision-specific result: no
bounded retry generation: no
canonical room identity manifest: no
late predecessor event quarantine: no
first accepted-hosting frame acknowledgement: no
```

## Latest audit family

```txt
.agent/trackers/2026-07-12T18-38-51-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T18-38-51-04-00.md
.agent/architecture-audit/2026-07-12T18-38-51-04-00-room-identity-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-12T18-38-51-04-00-accepted-room-identity-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T18-38-51-04-00-advertised-unowned-room-reconciliation-loop.md
.agent/interaction-audit/2026-07-12T18-38-51-04-00-host-identity-command-result-reconciliation-map.md
.agent/room-identity-audit/2026-07-12T18-38-51-04-00-manifest-reservation-retry-reconciliation-contract.md
.agent/deploy-audit/2026-07-12T18-38-51-04-00-room-identity-fixture-central-gate.md
```

## Validation boundary

Documentation only. Runtime, network, gameplay, rendering, dependencies, package scripts, and deployment were not changed.