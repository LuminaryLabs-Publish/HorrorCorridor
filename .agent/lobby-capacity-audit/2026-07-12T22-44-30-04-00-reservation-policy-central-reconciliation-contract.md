# Lobby Capacity Audit: Reservation Policy Central Reconciliation Contract

**Timestamp:** `2026-07-12T22-44-30-04-00`

## Summary

This record reconciles the repo-local max-player reservation contract with central tracking. Capacity is a room invariant that must serialize the final-slot race and protect stores, protocol payloads, bootstrap and visible state.

## Plan ledger

**Goal:** preserve one canonical reservation, commit, release and rejection contract for the declared four-player room.

- [x] Reconcile the completed repo-local contract.
- [x] Preserve policy, reservation, result and consumer obligations.
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

`maxPlayers` must be a finite positive integer. Policy changes require a new revision and cannot silently invalidate committed members.

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

```txt
Pending -> Committed
Pending -> Released
Pending -> Expired
Pending -> Cancelled
```

Every reservation reaches exactly one terminal state.

## Capacity calculation

```txt
available = maxPlayers - committedUniqueMembers - liveReservations
```

Duplicates consume no additional slot.

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

## Consumer obligations

```txt
transport kits expose candidates and leases
GameShell dispatches commands and consumes typed results
session store accepts only capacity-valid roster commits
LobbyScreen displays count/max/full and rejection state
serializers reject players.length > maxPlayers
startPlay requires a sealed capacity-valid roster
bootstrap requires the same sealed artifact
START_GAME, SYNC and LOBBY_EVENT preserve capacity evidence
render surfaces acknowledge the matching visible frame
```

## Fixture matrix

```txt
sequential first-through-fourth acceptance
fifth-member Full result
PeerJS/local/placeholder parity
concurrent final-slot winner
reservation expiry and cancellation
duplicate identity and duplicate connection event
room restart fences predecessor reservations
over-capacity protocol and restore rejection
capacity-valid bootstrap and visible frame
```

## Validation boundary

Contract reconciliation only. No runtime capacity service, reservation, result or fixture exists.