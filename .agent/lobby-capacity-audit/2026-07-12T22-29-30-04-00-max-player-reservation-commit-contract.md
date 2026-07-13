# Lobby Capacity Audit: Max-Player Reservation and Commit Contract

**Timestamp:** `2026-07-12T22-29-30-04-00`

## Summary

`maxPlayers` must become an enforced room invariant rather than descriptive metadata. Capacity needs one owner that serializes the final-slot race, binds network members to connection leases, routes placeholders through the same policy and prevents invalid state from entering stores, protocol payloads or bootstrap.

## Plan ledger

**Goal:** specify the authoritative reservation, commit, release and rejection contract for a four-player room.

- [x] Define command, result and lifecycle.
- [x] Define store, protocol, bootstrap and presentation obligations.
- [x] Define invariants and fixture matrix.
- [ ] Implement and prove the contract.

## Policy

```txt
RoomCapacityPolicy {
  roomId
  roomGeneration
  maxPlayers
  policyRevision
  policyFingerprint
}
```

`maxPlayers` must be a finite positive integer. A policy change requires a new revision and cannot silently invalidate committed members.

## Reservation

```txt
LobbySlotReservation {
  reservationId
  roomId
  roomGeneration
  expectedRosterRevision
  candidateMemberId
  source
  connectionLeaseId?
  status
  createdAtMs
  expiresAtMs
}
```

Reservation states:

```txt
Pending -> Committed
Pending -> Released
Pending -> Expired
Pending -> Cancelled
```

Every reservation reaches one terminal state exactly once.

## Capacity calculation

```txt
available = maxPlayers - committedUniqueMembers - liveReservations
```

Duplicates do not consume another slot. Retired members release committed capacity only through a revisioned roster transaction.

## Result

```txt
LobbyCapacityResult =
  Accepted { reservationId, memberId, rosterRevision, remainingSlots }
  Full { rosterRevision, committedCount, maxPlayers }
  Duplicate { canonicalMemberId, rosterRevision }
  Stale { expectedRosterRevision, actualRosterRevision }
  Cancelled { reservationId }
  Invalid { reason }
  Failed { reason }
```

## Atomic commit

```txt
reserve slot
  -> revalidate room generation
  -> revalidate expected roster revision
  -> revalidate identity uniqueness
  -> revalidate connection lease when network sourced
  -> append exactly one canonical member
  -> increment roster revision
  -> fingerprint policy + roster + live reservations
  -> mark reservation Committed
  -> publish result and observation
```

No consumer may see a committed member without the matching roster revision.

## Consumer obligations

```txt
createHost: expose candidates, do not mutate roster
GameShell: dispatch command, consume typed result
sessionStore: accept only capacity-valid roster commits
LobbyScreen: display count/max/full and typed rejection
serializers: reject players.length > maxPlayers
startPlay: require sealed capacity-valid roster
createInitialGameState: require sealed roster artifact
START_GAME/SYNC/LOBBY_EVENT: carry capacity revision/fingerprint
render/HUD/minimap: acknowledge matching visible frame
```

## Invariants

```txt
committed count never exceeds maxPlayers
committed + live reservations never exceeds maxPlayers
one canonical member occupies one slot
one live connection lease admits at most one member
Full, Duplicate, Stale and Invalid mutate nothing
room.players and lobbyPlayers use the same revision
protocol and bootstrap cannot create over-capacity state
```

## Fixture matrix

```txt
sequential 1..4 acceptance
fifth-member Full result
PeerJS/local/placeholder parity
final-slot concurrency
reservation expiry and cancellation
connection closes before commit
duplicate identity and duplicate connection event
room restart fences predecessor reservations
over-capacity restore and protocol payload rejection
capacity-valid start and visible frame
```

## Validation boundary

Contract documentation only. No capacity service or result type exists in runtime code.
