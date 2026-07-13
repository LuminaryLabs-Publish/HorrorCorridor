# HorrorCorridor Next Steps

**Updated:** `2026-07-12T22-29-30-04-00`

## Summary

Place a capacity-admission authority around every path that can add a lobby member. A declared four-player room must reserve and commit slots consistently across PeerJS, the local bridge, placeholders, Zustand stores, protocol payloads, bootstrap and visible UI.

## Plan ledger

**Goal:** replace unconstrained roster mutation with revisioned slot reservations, typed capacity results, capacity-valid bootstrap and visible-frame proof.

### Documentation

- [x] Audit room creation, connection intake, placeholders, store mutation, protocol validation and bootstrap.
- [x] Preserve the 29-kit inventory and complete domain map.
- [x] Define the parent DSK and candidate kits.
- [x] Add architecture, render, gameplay, interaction, lobby-capacity and deploy audits.
- [x] Refresh root docs and machine registry.

### Gate 1: canonical capacity policy

- [ ] Define `RoomCapacityPolicy` with normalized finite `maxPlayers`.
- [ ] Allocate a room generation, roster revision and capacity fingerprint.
- [ ] Require one authoritative roster projection rather than independent room and lobby arrays.
- [ ] Reject malformed policies, negative capacities and inconsistent restored state.

### Gate 2: slot reservation

- [ ] Create one `LobbySlotReservation` before member mutation.
- [ ] Bind reservation to room generation, candidate identity, source and connection lease.
- [ ] Make reservation acquisition atomic against the current roster revision.
- [ ] Return `Accepted`, `Full`, `Duplicate`, `Stale`, `Cancelled` or `Rejected`.
- [ ] Consume or release every reservation exactly once.

### Gate 3: shared admission paths

- [ ] Route PeerJS connection-open through capacity admission.
- [ ] Route local `client-connect` through the same authority.
- [ ] Route `Add guest`, restore and migration through the same authority.
- [ ] Ensure duplicate identity does not consume another slot.
- [ ] Retire rejected transport candidates without adding visible members.

### Gate 4: roster, protocol and bootstrap

- [ ] Enforce `players.length <= maxPlayers` in store commits.
- [ ] Validate the relationship during protocol decoding, not only number and array shape.
- [ ] Seal a capacity-valid roster before Start run.
- [ ] Reject bootstrap when the roster exceeds capacity or cites a stale revision.
- [ ] Carry capacity revision and fingerprint through START_GAME and SYNC.

### Gate 5: presentation

- [ ] Display `players.length / maxPlayers` and remaining slots.
- [ ] Disable or reject Add guest when full.
- [ ] Project typed full/rejection state without mutating the roster.
- [ ] Correlate the first lobby and gameplay frames with the committed capacity revision.

### Gate 6: fixtures

- [ ] First through fourth unique members accepted exactly once.
- [ ] Fifth PeerJS member rejected with no roster mutation.
- [ ] Fifth local-bridge member rejected with no roster mutation.
- [ ] Placeholder requests stop at capacity.
- [ ] Duplicate member consumes no new slot.
- [ ] Cancelled reservation releases capacity.
- [ ] Concurrent final-slot requests produce one winner.
- [ ] Over-capacity START_GAME, SYNC and LOBBY_EVENT rejected.
- [ ] Capacity-valid roster bootstraps and renders correctly.
- [ ] Source, production build and deployed-browser parity.

## Dependency order

```txt
room identity and generation
  -> capacity policy
  -> slot reservation
  -> identity and connection admission
  -> atomic roster commit
  -> protocol capacity validation
  -> sealed bootstrap
  -> visible-frame acknowledgement
```

## Completion boundary

Do not claim four-player capacity enforcement, race-safe admission, over-capacity protocol rejection or visible roster consistency until the authority and fixture matrix pass on `main`.
