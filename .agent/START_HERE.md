# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-13T01-08-28-04-00`  
**Status:** `protocol-semantic-admission-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic maze bootstrap, movement, interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates protocol semantic admission. The decoder validates protocol version and broad runtime shape, but exact enum values, numeric ranges, unique identities and relationships between envelope, room, snapshot, actor and tick fields remain unvalidated. Structurally valid but contradictory messages can reach store, gameplay and presentation consumers.

## Plan ledger

**Goal:** keep one canonical semantic-admission result between structural decoding and every lobby, runtime or visible-state mutation.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only HorrorCorridor as the oldest eligible central entry.
- [x] Preserve the complete interaction loop, active domains and 29-kit service inventory.
- [x] Add the timestamped protocol-semantic audit family.
- [x] Keep all writes on `main`; create no branch or pull request.
- [ ] Implement semantic admission and executable fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-13T01-08-28-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-13T01-08-28-04-00-protocol-semantic-admission-dsk-map.md`
7. `.agent/protocol-semantic-audit/2026-07-13T01-08-28-04-00-enum-relation-range-contract.md`
8. `.agent/deploy-audit/2026-07-13T01-08-28-04-00-protocol-semantic-fixture-gate.md`

## Current authority boundary

```txt
corridor-protocol-semantic-admission-authority-domain
```

## Source finding

```txt
exact enum validation: incomplete
numeric integer/range policy: incomplete
optional requestId validation: absent
envelope/payload room relation: absent
room/snapshot consistency: absent
authoritativeTick/snapshot.tick relation: absent
sender/actor relation: absent
unique collection identities: absent
typed semantic admission result: absent
first semantically admitted visible frame acknowledgement: absent
```

## Required transaction

```txt
ProtocolMessageCandidate
  -> structural decode
  -> exact enum, optional-field, range and collection checks
  -> envelope/room/snapshot/actor/tick relation checks
  -> source, room generation and revision admission
  -> Accepted or typed rejection
  -> one atomic canonical effect or zero mutation
  -> bounded observation and journal
  -> first visible frame acknowledgement
```

## Validation boundary

Documentation only. Runtime source, networking, gameplay, rendering, dependencies, package scripts and deployment were not changed. No semantic-integrity or production-readiness claim is made until focused fixtures pass on `main`.