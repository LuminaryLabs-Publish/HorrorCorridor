# HorrorCorridor Next Steps

**Updated:** `2026-07-12T18-38-51-04-00`

## Summary

Introduce a room-identity allocation authority before further lobby and protocol work. The host must reserve and acquire its advertised identity before room, readiness, start, or visible hosting state can treat it as current.

## Plan ledger

**Goal:** convert Host Game into one collision-safe, generation-bound transaction with bounded retry, cleanup, predecessor fencing, and visible proof.

### Documentation

- [x] Reconcile the room/join-code allocation audit family.
- [x] Preserve the 29-kit inventory and domain map.
- [x] Refresh root docs and machine registry.
- [x] Prepare central ledger and internal change-log synchronization.

### Gate 1: canonical room identity

- [ ] Define `RoomIdentityManifest` with runtime session, session epoch, generation, room ID, join code, host player ID, requested/admitted host peer ID, transport mode, policy revision, and fingerprint.
- [ ] Normalize and validate join codes before use.
- [ ] Keep candidate identity outside live stores until accepted.

### Gate 2: reservation and ownership

- [ ] Add candidate reservation before UI advertisement.
- [ ] Require PeerJS `open` ownership evidence for PeerJS hosting.
- [ ] Bind the local bridge to the same accepted generation.
- [ ] Return typed acquisition and binding receipts.

### Gate 3: collision, retry, and rollback

- [ ] Classify unavailable-ID, collision, timeout, cancellation, and generic failures.
- [ ] Add bounded retry with a strictly newer generation.
- [ ] Retire Peer and BroadcastChannel resources exactly once.
- [ ] Preserve the accepted predecessor until successor commit.
- [ ] Reject late open/error/message events from superseded attempts.

### Gate 4: UI and gameplay admission

- [ ] Project Pending, Accepted, and Failed host identity states explicitly.
- [ ] Do not expose the room as joinable before Accepted.
- [ ] Block roster, readiness, loading, start, and bootstrap against unaccepted identity.
- [ ] Bind START_GAME and SYNC to the accepted manifest fingerprint.
- [ ] Acknowledge the first frame carrying the accepted fingerprint.

### Gate 5: fixtures

- [ ] First candidate accepted.
- [ ] Collision then retry accepted.
- [ ] Retry budget exhausted.
- [ ] Allocation timeout and cancellation.
- [ ] Late predecessor open/error/message.
- [ ] Partial resource rollback.
- [ ] Local bridge available while PeerJS ID is unavailable.
- [ ] Source, production build, browser, and deployed parity.

## Dependency order

```txt
room identity allocation
  -> transport reachability and channel admission
  -> actor and roster authority
  -> host-message source admission
  -> sealed start and visible multiplayer proof
```

## Completion boundary

Do not claim a room is globally joinable or collision-safe until identity admission and the fixture matrix pass on `main`.