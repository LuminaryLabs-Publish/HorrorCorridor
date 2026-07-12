# Interaction Audit: Connection-Open to Member-Admission Map

**Timestamp:** `2026-07-12T14-22-01-04-00`

## Summary

The current event boundary uses `peer/connection-open` as both a low-level transport notification and a high-level lobby admission command. The event contains peer and connection IDs but no actual open proof, attempt/generation identity, actor claim, expected roster revision or typed admission result.

## Plan ledger

**Goal:** replace direct event-driven roster mutation with explicit commands, admission checks and results.

- [x] Map transport callbacks and event payloads.
- [x] Map `GameShell` command effects.
- [x] Map session-store mutations and lobby publication.
- [x] Define command/result boundaries and stale rejection.
- [ ] Implement after canonical identity and transport-mode authority.

## Current map

```txt
PeerJS peer.on("connection")
  -> setConnectionRecord
  -> emit peer/connection-open

peer/connection-open payload
  peerId
  remotePeerId
  connectionId
  timestampMs

GameShell handler
  -> find/create LobbyPlayer
  -> upsertLobbyPlayer(connected)
  -> mutate room.players
  -> broadcast LOBBY_EVENT player-joined
```

## Missing command context

```txt
connection candidate ID
data-channel open observation ID
connection generation
transport mode and revision
session epoch
room ID expectation
remote identity claim
actor/member ID claim
expected roster revision
idempotency key
admission policy
```

## Missing result context

```txt
accepted or rejected status
rejection reason
admitted member ID
connection-to-actor binding ID
predecessor and committed roster revisions
roster fingerprint
lobby publication delivery result
retirement action
first visible roster-frame acknowledgement
```

## Required command map

```txt
ObserveDataChannelOpen
  -> DataChannelOpenObservation

AdmitConnectionCommand
  -> validate candidate, generation and mode
  -> ConnectionOpenAdmissionResult

BindConnectionActorCommand
  -> validate identity claim and uniqueness
  -> ConnectionActorBindingResult

AdmitLobbyMemberCommand
  -> validate room and predecessor roster revision
  -> commit room/lobby membership
  -> LobbyMemberAdmissionResult

PublishLobbyRevisionCommand
  -> send committed room state
  -> LobbyPublicationResult

EvaluateStartEligibilityCommand
  -> verify all members and readiness
  -> StartEligibilityResult
```

## Idempotency

The same PeerJS `open` callback or duplicated local-bridge handshake must not create more than one member. Idempotency should use:

```txt
sessionEpoch
transportRevision
connectionGeneration
connectionId
remoteIdentityClaim
```

## Stale rejection

Reject observations from:

```txt
retired connection candidates
predecessor transport modes
previous room/session epochs
connections replaced by reconnect
members already bound to another active connection
```

## Error and close map

```txt
connection error before admission
  -> retire candidate only

connection close after admission
  -> retire binding
  -> commit member disconnected/removal under named policy
  -> publish new roster revision

error without close
  -> terminal result must still remove candidate or admitted binding
```

No interaction behavior was changed.