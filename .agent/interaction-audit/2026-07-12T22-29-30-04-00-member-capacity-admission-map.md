# Interaction Audit: Member Capacity Admission Map

**Timestamp:** `2026-07-12T22-29-30-04-00`

## Summary

Three independent interaction paths can add members: PeerJS connection-open, local `client-connect`, and the host `Add guest` button. They converge only after the candidate has already been treated as admissible; none obtains a slot reservation or typed capacity result.

## Plan ledger

**Goal:** route every member-creating interaction through one command and make rejection a zero-mutation result.

- [x] Map network and UI member-intake paths.
- [x] Identify missing admission evidence.
- [ ] Implement shared command routing and fixtures.

## Current map

```txt
PeerJS DataConnection
  -> peer/connection-open
  -> GameShell upsertLobbyPlayer

BroadcastChannel client-connect
  -> emitLocalConnectionOpen
  -> peer/connection-open
  -> GameShell upsertLobbyPlayer

Host Add guest click
  -> addGuestPlaceholder
  -> makeId guest-player
  -> upsertLobbyPlayer
```

## Required map

```txt
raw interaction
  -> LobbyMemberCandidate
  -> source classification
  -> room/transport generation binding
  -> identity and lease validation
  -> LobbySlotReservation
  -> LobbyCapacityResult

Accepted
  -> one roster commit
  -> one UI/protocol observation

Full / Duplicate / Stale / Rejected
  -> zero roster mutation
  -> bounded visible rejection
  -> transport candidate retired when applicable
```

## Required command envelope

```txt
LobbyMemberAdmissionCommand {
  commandId
  roomId
  roomGeneration
  expectedRosterRevision
  source
  candidateMemberId
  connectionId?
  connectionGeneration?
  requestedAtMs
}
```

## Interaction fixtures

```txt
fifth remote connection rejected
fifth local connection rejected
fifth Add guest rejected
rapid repeated Add guest admits only available slots
duplicate connection-open consumes one slot
concurrent final-slot network/UI requests produce one accepted result
stale room-generation candidate rejected
```

## Validation boundary

Documentation only. Transport events, button handlers and Zustand actions were unchanged.
