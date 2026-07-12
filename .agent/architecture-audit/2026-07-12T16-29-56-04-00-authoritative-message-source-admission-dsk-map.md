# Architecture audit: authoritative message-source admission DSK map

**Timestamp:** `2026-07-12T16-29-56-04-00`

## Summary

The protocol codec proves message shape, not authority. Host-class messages need a composed admission boundary that binds transport source, protocol identity, room, session and generation before state mutation.

## Plan ledger

**Goal:** define a fiction-neutral authority that converts a decoded transport message into an accepted, rejected, stale or duplicate authoritative-message result.

- [x] Identify source evidence already carried by transport events.
- [x] Identify protocol identity fields already carried by envelopes.
- [x] Classify host-only and client-originating message types.
- [x] Define source, room, session and generation checks.
- [x] Define zero-mutation rejection semantics.
- [x] Define visible-frame acknowledgement.
- [ ] Implement the composed authority.

## Parent domain

```txt
corridor-authoritative-message-source-admission-authority-domain
```

## Composition

```txt
corridor-authoritative-message-source-admission-authority-domain
  -> authoritative-message-class-kit
  -> authoritative-message-id-kit
  -> message-source-identity-kit
  -> message-source-binding-kit
  -> host-authority-capability-kit
  -> message-room-binding-kit
  -> session-epoch-kit
  -> transport-mode-revision-kit
  -> connection-generation-kit
  -> sender-peer-consistency-kit
  -> host-peer-consistency-kit
  -> room-consistency-kit
  -> host-message-admission-kit
  -> stale-authority-message-rejection-kit
  -> duplicate-authority-message-kit
  -> message-authority-result-kit
  -> authority-observation-kit
  -> authority-journal-kit
  -> first-authoritative-message-frame-ack-kit
```

## Message classes

```txt
host-only authority:
  START_GAME
  SYNC
  LOBBY_EVENT

client-originating request or observation:
  PLAYER_UPDATE
  TRY_INTERACT
```

Message type alone is not authority. The source must also match the current role, admitted connection and canonical actor binding.

## Required input

```txt
AuthoritativeMessageCandidate {
  messageId
  decodedMessage
  eventRole
  remotePeerId
  connectionId
  connectionGeneration
  transportModeId
  transportRevision
  sessionEpoch
  receivedAtMs
}
```

## Required checks

```txt
protocol version accepted
message type classified
active session exists
session epoch matches
transport mode and revision match
connection ID and generation are current
remotePeerId equals admitted host peer
message.senderId equals admitted host player
message.roomId equals active room
payload room identity equals envelope room identity
message is newer than accepted authority revision
message ID has not already committed
```

## Required result

```txt
MessageAuthorityResult {
  status: Accepted | Rejected | Stale | Duplicate
  reason
  messageId
  messageType
  sessionEpoch
  connectionGeneration
  authorityRevision
  roomRevision
  stateFingerprint?
}
```

Rejected, stale and duplicate results perform zero room, roster, snapshot, route, readiness or presentation mutation.

## Required transaction

```txt
peer/message
  -> decode structural envelope
  -> classify authority class
  -> bind current session and transport revisions
  -> bind source connection generation
  -> validate remote peer and sender identity
  -> validate room identity and authority revision
  -> return typed admission result

Accepted
  -> commit one state transition
  -> publish authority observation and bounded journal entry
  -> render first matching lobby or gameplay frame
  -> acknowledge message ID and authority revision

Rejected, stale or duplicate
  -> preserve predecessor state exactly
  -> publish typed non-mutating result
```

## Fixture kits

```txt
forged-start-game-fixture-kit
forged-sync-fixture-kit
wrong-room-lobby-event-fixture-kit
sender-peer-mismatch-fixture-kit
stale-host-generation-fixture-kit
duplicate-authority-message-fixture-kit
first-authoritative-message-frame-fixture-kit
```

## Dependency order

```txt
transport mode and reachability
  -> actual connection-open admission
  -> canonical peer/player/actor binding
  -> transport-error retirement and stale callback quarantine
  -> authoritative message-source admission
  -> snapshot ordering and state commit
  -> sealed lobby start and shared visible-frame proof
```