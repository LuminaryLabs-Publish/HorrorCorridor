# Authoritative Message Source Admission DSK Map

**Timestamp:** `2026-07-12T16-39-35-04-00`

## Summary

The protocol layer proves structural validity, not authority. A separate parent domain must decide whether a decoded host-class message belongs to the current host, room, session and connection generation before any client state changes.

## Plan ledger

**Goal:** define a fiction-neutral, typed authority boundary between transport decode and client state mutation.

- [x] Preserve existing transport, protocol, session and presentation boundaries.
- [x] Separate structural decoding from contextual authority admission.
- [x] Define source, room, generation, duplicate and stale-result contracts.
- [x] Define atomic state commit and visible-frame acknowledgement.
- [ ] Implement the kits and fixtures.

## Parent domain

```txt
corridor-authoritative-message-source-admission-authority-domain
```

## Coordinating kits

```txt
authoritative-message-class-kit
authoritative-message-id-kit
message-source-identity-kit
message-source-binding-kit
host-authority-capability-kit
message-room-binding-kit
session-epoch-kit
transport-mode-revision-kit
connection-generation-kit
sender-peer-consistency-kit
host-peer-consistency-kit
room-consistency-kit
host-message-admission-kit
stale-authority-message-rejection-kit
duplicate-authority-message-kit
message-authority-result-kit
authority-observation-kit
authority-journal-kit
first-authoritative-message-frame-ack-kit
```

## Fixture kits

```txt
current-host-message-acceptance-fixture-kit
forged-start-game-fixture-kit
forged-sync-fixture-kit
wrong-room-lobby-event-fixture-kit
sender-peer-mismatch-fixture-kit
stale-host-generation-fixture-kit
duplicate-authority-message-fixture-kit
older-authority-revision-fixture-kit
local-bridge-peerjs-parity-fixture-kit
first-authoritative-message-frame-fixture-kit
```

## Dependency map

```txt
canonical member, peer, player and room identity
  -> explicit transport mode and reachability
  -> data-channel-open admission
  -> connection generation and retirement
  -> actor binding
  -> authoritative message classification
  -> source, sender and room admission
  -> monotonic message and authority ordering
  -> atomic store commit
  -> visible-frame acknowledgement
```

## Admission result

```txt
Accepted
RejectedWrongSource
RejectedSenderMismatch
RejectedWrongRoom
StaleSession
StaleConnection
StaleAuthorityRevision
Duplicate
Malformed
```

Every non-Accepted result must guarantee zero room, roster, snapshot, route, readiness and presentation mutation.