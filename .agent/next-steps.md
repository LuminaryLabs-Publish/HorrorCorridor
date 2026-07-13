# HorrorCorridor Next Steps

**Updated:** `2026-07-13T01-08-28-04-00`

## Summary

Insert a transport-independent semantic-admission authority after structural decoding and before every lobby, runtime, simulation or presentation consumer. A decoded message must prove exact enum membership, valid ranges, canonical identities and consistent room, snapshot, actor and tick relations before it can commit any effect.

## Plan ledger

**Goal:** replace direct consumption of structurally valid messages with typed semantic admission, atomic effect commit, zero-mutation rejection and visible-frame proof.

### Documentation

- [x] Audit protocol types, structural decoder, host/client transports and GameShell consumers.
- [x] Preserve the 29-kit inventory and complete domain map.
- [x] Define the parent DSK and candidate kits.
- [x] Add architecture, render, gameplay, interaction, protocol-semantic and deploy audits.
- [x] Refresh root docs and machine registry.

### Gate 1: exact runtime schemas

- [ ] Enforce every declared enum at runtime.
- [ ] Validate optional `requestId` and action-specific optional fields.
- [ ] Reject unknown keys where strict canonical payloads are required.
- [ ] Return a structural result distinct from semantic admission.

### Gate 2: numeric and collection invariants

- [ ] Require integer, nonnegative and bounded tick, sequence and capacity values.
- [ ] Enforce admitted movement, rotation, pitch, velocity and ooze ranges.
- [ ] Bound player, cube, maze, anomaly and ooze collections.
- [ ] Reject duplicate player, cube and cell identities.
- [ ] Reject references to unknown actors, cubes, cells or slots.

### Gate 3: cross-field relations

- [ ] Require envelope `roomId` to match all nested room IDs.
- [ ] Require SYNC payload room and snapshot room to describe one canonical room.
- [ ] Require `authoritativeTick === snapshot.tick`.
- [ ] Require START_GAME host and capacity fields to match the room.
- [ ] Require LOBBY_EVENT roster projection to match `room.players`.
- [ ] Bind sender ID, payload player ID and transport connection lease.

### Gate 4: admission and commit

- [ ] Allocate one protocol candidate/admission ID.
- [ ] Bind admission to room generation and expected state revision.
- [ ] Return `Accepted`, `InvalidSchema`, `InvalidSemantic`, `Stale`, `Duplicate`, `Unauthorized` or `Failed`.
- [ ] Commit one canonical effect atomically or perform zero mutation.
- [ ] Publish bounded acceptance and rejection observations.

### Gate 5: presentation

- [ ] Project rejection state without replacing room, snapshot or route state.
- [ ] Carry the admission ID and canonical revision into render snapshots.
- [ ] Acknowledge the first visible lobby or gameplay frame citing the accepted result.
- [ ] Keep debug output redacted and bounded.

### Gate 6: fixtures

- [ ] Valid fixtures for all five message types.
- [ ] Invalid enum and optional-field fixtures.
- [ ] Negative, fractional and out-of-range numeric fixtures.
- [ ] Envelope, room and snapshot identity-mismatch fixtures.
- [ ] Tick and host-identity mismatch fixtures.
- [ ] Duplicate identity and unknown-reference fixtures.
- [ ] Rejected-message zero-mutation fixtures.
- [ ] PeerJS and local-bridge semantic-parity fixtures.
- [ ] First admitted visible-frame fixture.
- [ ] Source, production-build and deployed-browser parity.

## Dependency order

```txt
structural decode
  -> exact enum and optional-field schema
  -> numeric and collection invariants
  -> cross-field identity and revision relations
  -> source and generation admission
  -> atomic effect result
  -> presentation acknowledgement
```

## Completion boundary

Do not claim protocol semantic integrity, canonical state convergence, zero-mutation rejection or visible-frame correlation until the authority and fixture matrix pass on `main`.