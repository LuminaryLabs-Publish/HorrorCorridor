# HorrorCorridor Known Gaps

**Updated:** `2026-07-14T20-58-46-04-00`

## Summary

The highest current product gap is client movement authority. The host accepts a caller-selected player identity and complete pose from `PLAYER_UPDATE`, copies it into authoritative state, moves any held cube with that player and republishes the result without ordered kinematic admission.

## Plan ledger

**Goal:** prioritize identity-bound, ordered and physically reachable client movement while retaining every previous lifecycle, settings, loading, session, transport, protocol, rendering, gameplay and proof finding.

- [x] Preserve previous audits.
- [x] Add and route the client movement gap.
- [ ] Implement and prove the complete authority chain.

## Primary ordered gaps

```txt
1. peer/sender/player canonical actor binding
2. movement update and session generation identity
3. per-player sequence ordering and deduplication
4. host-time movement interval and bounded catch-up policy
5. finite bounded position velocity yaw and pitch admission
6. speed acceleration and turn-rate constraints
7. swept maze collision and wall-crossing rejection
8. out-of-maze and unreachable pose rejection
9. atomic player and held-cube candidate settlement
10. typed ClientMovementUpdateResult and predicate receipts
11. authoritative correction revision to the originating client
12. local prediction reconciliation policy
13. world camera minimap and debug revision convergence
14. FirstAuthoritativeMovementFrameAck
15. source build and deployed-origin movement fixtures
16. page lifecycle suspension and BFCache restoration
17. settings and pause input command admission
18. loading readiness and host-start convergence
19. WebGL recovery and cross-store transitions
20. protocol semantic/source admission and snapshot ordering
21. interaction claim authority and terminal outcome convergence
```

## Current movement gap

```txt
senderId/playerId actor binding: no
input sequence transmitted: yes
sequence admitted: no
host reconstructs motion from input: no
supplied pose copied directly: yes
speed/acceleration limits: no
swept maze collision: no
wall-crossing rejection: no
atomic player/held-cube result: no
client correction receipt: no
first authoritative movement frame receipt: no
```

## Failure paths

### Player impersonation

```txt
connected client sends PLAYER_UPDATE
  -> envelope senderId identifies client A
  -> payload playerId names player B
  -> host reads payload playerId
  -> player B pose is replaced
```

### Teleport or wall crossing

```txt
client predicts locally
  -> submits a distant pose across blocked maze cells
  -> host copies the destination pose
  -> no swept collision or reachable-delta check runs
  -> authoritative SYNC publishes the accepted position
```

### Reordered movement

```txt
newer update arrives and commits
  -> older update arrives later
  -> sequence is present but unused
  -> older pose can overwrite the newer pose
```

### Held-cube propagation

```txt
player carries a cube
  -> supplied player pose is accepted
  -> syncHeldCubesToPlayers copies that position to the cube
  -> invalid movement propagates into interaction state
```

## Missing authority

```txt
MovementUpdateId
PlayerMovementRevision
CanonicalActorBinding
MovementSequenceAdmissionResult
KinematicPredicateReceipt
SweptCollisionResult
ClientMovementUpdateResult
PredictionCorrectionReceipt
FirstAuthoritativeMovementFrameAck
```

## Retained gaps

All previous page-lifecycle, settings, proof provenance, loading, host-start, WebGL recovery, cross-store transition, room identity, capacity, transport, protocol, runtime clock, snapshot, interaction, outcome, debug and deployment findings remain open.

## Do not claim

Do not claim host-authoritative movement, anti-teleport enforcement, actor safety, ordered updates, correction convergence or production parity until the authority and fixtures pass on `main`.