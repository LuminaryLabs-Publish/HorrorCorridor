# HorrorCorridor Next Steps

**Updated:** `2026-07-12T18-31-01-04-00`

## Summary

Introduce a room-identity allocation authority before further lobby and protocol work. The host must reserve and acquire its advertised identity before room, readiness, start or visible hosting state can treat it as current.

## Plan ledger

**Goal:** convert Host Game into one collision-safe, generation-bound transaction with bounded retry, cleanup and visible proof.

### Documentation

- [x] Add the room/join-code allocation audit family.
- [x] Preserve the 29-kit inventory and domain map.
- [x] Refresh root docs and machine registry.
- [ ] Synchronize central ledger and internal change log.

### Gate 1: canonical room identity

- [ ] Define `RoomIdentityManifest` with session epoch, generation, room ID, join code, host player ID, requested/admitted host peer ID and transport mode.
- [ ] Normalize and validate join codes before use.
- [ ] Fingerprint the committed manifest.

### Gate 2: reservation and ownership

- [ ] Add candidate reservation before UI advertisement.
- [ ] Require PeerJS `open` ownership evidence for PeerJS hosting.
- [ ] Bind the local bridge to the same accepted generation.
- [ ] Keep partial resources outside current session ownership.

### Gate 3: collision and retry

- [ ] Classify unavailable-ID and collision failures.
- [ ] Add bounded retry with a strictly newer generation.
- [ ] Retire Peer and BroadcastChannel resources exactly once.
- [ ] Reject late open/error events from superseded attempts.

### Gate 4: UI and gameplay admission

- [ ] Project Pending, Accepted and Failed host identity states explicitly.
- [ ] Do not expose the room as joinable before Accepted.
- [ ] Block roster, readiness, start and bootstrap against unaccepted identity.
- [ ] Acknowledge the first frame carrying the accepted manifest fingerprint.

### Gate 5: fixtures

- [ ] First candidate accepted.
- [ ] Collision then retry accepted.
- [ ] Retry budget exhausted.
- [ ] Late predecessor open/error.
- [ ] Local bridge available while PeerJS ID is unavailable.
- [ ] Rapid cancellation and restart.
- [ ] Source, production build and deployed parity.

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