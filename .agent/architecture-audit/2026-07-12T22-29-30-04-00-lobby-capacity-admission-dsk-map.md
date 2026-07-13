# Architecture Audit: Lobby Capacity Admission DSK Map

**Timestamp:** `2026-07-12T22-29-30-04-00`  
**Status:** `lobby-capacity-admission-authority-audited`

## Summary

Capacity is currently duplicated as a numeric room field but is not owned by a domain transaction. Connection, placeholder, store, protocol and bootstrap code each bypass a shared admission boundary.

## Plan ledger

**Goal:** define a composable DSK that owns capacity policy, slot reservations, atomic roster commits, bootstrap admission and proof.

- [x] Map existing producers and consumers.
- [x] Identify missing authority and services.
- [x] Define candidate kits, transaction and invariants.
- [ ] Implement the DSK and fixtures.

## Existing architecture

```txt
RoomState.maxPlayers = 4

PeerJS connection-open -----------+
BroadcastChannel client-connect --+-> GameShell -> sessionStore -> room.players
Add guest ------------------------+

room.players -> createInitialGameState -> actors + active room
room/snapshot -> serializers -> START_GAME/SYNC/LOBBY_EVENT
room.players -> LobbyScreen -> visible player count
```

No edge performs an atomic capacity reservation or validates the roster/capacity relationship.

## Required parent domain

```txt
corridor-lobby-capacity-admission-authority-domain
```

### Domain responsibility

Own the meaning of room capacity and the lifecycle of each slot from candidate reservation through admission, cancellation, retirement, bootstrap and visible proof.

### Non-responsibilities

```txt
PeerJS signalling implementation
BroadcastChannel implementation
player naming and cosmetics
maze generation
movement simulation
Three.js renderer implementation
```

## Candidate kits and services

```txt
room-capacity-policy-kit
  normalize maxPlayers
  reject invalid policies
  publish immutable policy fingerprint

lobby-slot-id-kit
  allocate stable slot identity

lobby-slot-reservation-kit
  reserve against expected room/roster revision
  enforce available capacity atomically
  expire or cancel reservations

lobby-member-candidate-kit
  represent candidate identity, source and connection evidence

lobby-member-source-classification-kit
  classify PeerJS, local bridge, placeholder, restore and migration

lobby-capacity-revision-kit
  own monotonic capacity and roster revisions

lobby-capacity-fingerprint-kit
  fingerprint policy, committed members and reservations

lobby-member-identity-uniqueness-kit
  prevent duplicate members consuming multiple slots

lobby-connection-lease-capacity-kit
  bind accepted network members to live connection leases

placeholder-member-admission-kit
  route local placeholder requests through the same policy

lobby-capacity-result-kit
  Accepted, Full, Duplicate, Stale, Cancelled, Invalid, Failed

lobby-roster-commit-kit
  atomically commit one member and successor revision

lobby-slot-release-kit
  release cancelled, rejected and retired reservations exactly once

lobby-capacity-rejection-observation-kit
  publish bounded rejection evidence

lobby-capacity-journal-kit
  append immutable policy/reservation/commit records

bootstrap-roster-capacity-gate-kit
  seal and admit only capacity-valid start rosters

protocol-room-capacity-validation-kit
  reject room/player arrays whose count exceeds maxPlayers

first-capacity-consistent-frame-ack-kit
  correlate visible lobby/game frames with capacity revision
```

## Transaction

```txt
LobbyMemberAdmissionCommand
  -> read immutable RoomCapacityPolicy
  -> validate room generation and expected roster revision
  -> classify source and candidate
  -> validate identity uniqueness and connection ownership
  -> attempt atomic LobbySlotReservation
  -> Full/Duplicate/Stale/Invalid: release transient work, mutate nothing
  -> Accepted: commit member and successor roster revision
  -> consume reservation exactly once
  -> publish capacity result and fingerprint
  -> propagate revision through room/protocol/bootstrap
  -> acknowledge first matching visible frame
```

## Invariants

```txt
committedMembers.length <= maxPlayers
committedMembers + liveReservations <= maxPlayers
one member identity owns at most one committed slot
one connection lease owns at most one network-member slot
one reservation reaches exactly one terminal state
room.players and lobbyPlayers cannot diverge in revision
protocol and bootstrap reject over-capacity state
visible capacity counts cite the committed revision
```

## Dependency order

```txt
room identity
  -> capacity policy
  -> connection lease and candidate identity
  -> slot reservation
  -> roster commit
  -> start sealing
  -> protocol publication
  -> visible-frame acknowledgement
```

## Validation boundary

Architecture specification only. No DSK or runtime implementation was added.
