# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-13T03-38-31-04-00`  
**Status:** `client-join-attempt-admission-central-reconciled`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic maze bootstrap, movement, interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current reconciliation isolates client join-attempt admission. The join form accepts unconstrained room-code and display-name strings. The client then commits a provisional room and roster, displays `Joined room`, marks networking readiness true and enters the client lobby before host presence or member admission is acknowledged. PeerJS has no bounded attempt timeout or typed result, while the local bridge reports connected immediately after a one-way `client-connect` post.

## Plan ledger

**Goal:** make every client join a validated, revisioned and cancellable attempt that commits canonical lobby state only after a source-admitted host acknowledgement.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Detect HorrorCorridor repo-local documentation newer than central tracking.
- [x] Select only HorrorCorridor.
- [x] Preserve the complete interaction loop, active domains and 29-kit service inventory.
- [x] Add the timestamped reconciliation audit family.
- [x] Refresh root `.agent` documents and the machine registry.
- [x] Keep all writes on `main`; create no branch or pull request.
- [ ] Implement and prove client-join admission.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-13T03-38-31-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-13T03-38-31-04-00-client-join-central-reconciliation-dsk-map.md`
7. `.agent/join-attempt-audit/2026-07-13T03-38-31-04-00-attempt-generation-ack-central-reconciliation-contract.md`
8. `.agent/deploy-audit/2026-07-13T03-38-31-04-00-client-join-central-fixture-gate.md`
9. `.agent/central-sync-audit/2026-07-13T03-38-31-04-00-repo-ledger-client-join-reconciliation.md`

## Current authority boundary

```txt
corridor-client-join-attempt-admission-authority-domain
```

## Source finding

```txt
join-code schema shared by host and client: absent
input length and character policy: absent
provisional room/roster committed before acknowledgement: yes
Joined room projection before acknowledgement: yes
networking readiness true before acceptance: yes
join attempt ID and generation: absent
bounded transport/ack timeout: absent
host-presence and room-admission acknowledgement: absent
local bridge one-way post reports connected: yes
typed join result and cancellation receipt: absent
late predecessor acknowledgement quarantine: absent
first accepted-lobby visible-frame acknowledgement: absent
```

## Required transaction

```txt
ClientJoinCommand
  -> allocate attempt identity and generation
  -> normalize and validate code and display name
  -> connect without canonical room mutation
  -> challenge host presence
  -> validate canonical HostJoinAck and room admission
  -> Accepted or typed non-accepted result
  -> atomic session commit or complete rollback
  -> late predecessor quarantine
  -> bounded evidence
  -> first accepted-lobby frame acknowledgement
```

## Validation boundary

Documentation only. Runtime source, networking, gameplay, rendering, dependencies, package scripts and deployment were not changed. No input-safety, room-membership, host-presence, timeout, cancellation, retry-isolation, transport-parity or visible-frame claim is made until focused fixtures pass on `main`.