# Architecture Audit: Data-Channel Roster Admission DSK Map

**Timestamp:** `2026-07-12T14-22-01-04-00`

## Summary

The current architecture lets `peer-host-transport-kit` emit a semantic connection-open event before the underlying PeerJS `DataConnection` is open. `corridor-session-domain-kit` then commits roster membership directly from that event. Transport candidate lifecycle, actor binding, roster mutation and start eligibility are therefore fused across adapters and React handlers.

## Plan ledger

**Goal:** introduce one composed authority that keeps connection candidates detached until open-state, identity and session-generation admission succeeds.

- [x] Map current transport, session, lobby and bootstrap owners.
- [x] Identify the premature event boundary.
- [x] Separate observation, admission, commit, retirement and proof responsibilities.
- [x] Define candidate kits and transaction invariants.
- [ ] Implement only after transport-mode and canonical-identity prerequisites are defined.

## Current ownership map

```txt
peer-host-transport-kit
  owns PeerJS instance
  owns DataConnection map
  emits connection-open, message, close and error events

peer-event-bus-kit
  forwards transport events without admission context

corridor-application-shell-kit / GameShell
  translates connection-open directly into lobby membership
  mutates room roster
  broadcasts lobby event
  starts run from current lobbyPlayers

corridor-session-domain-kit
  stores room and lobbyPlayers
  has no roster revision, predecessor check or actor-binding receipt

lobby-screen-presentation-kit
  renders player count and ready labels
  exposes Start run without admitted-channel eligibility

maze-snapshot-bootstrap-kit
  consumes current lobbyPlayers as gameplay participants
```

## Architectural defect

```txt
connection candidate creation
  is treated as
open data channel
  is treated as
connected lobby member
  is treated as
eligible gameplay participant
```

These are four distinct bounded meanings and must not share one untyped event.

## Required parent domain

```txt
corridor-data-channel-roster-admission-authority-domain
```

## Subdomain boundaries

### Connection candidate domain

```txt
connection-candidate-id-kit
connection-generation-kit
data-channel-state-kit
data-channel-open-observation-kit
connection-error-retirement-kit
connection-close-retirement-kit
```

Owns raw transport candidate identity, lifecycle observations and terminal retirement.

### Connection admission domain

```txt
connection-open-admission-kit
connection-open-result-kit
actor-identity-claim-kit
connection-actor-binding-kit
```

Converts actual channel-open evidence and identity claims into an admitted connection result.

### Lobby membership domain

```txt
lobby-member-admission-kit
lobby-member-admission-result-kit
roster-revision-kit
roster-fingerprint-kit
room-membership-commit-kit
lobby-broadcast-result-kit
```

Owns atomic member insertion/removal, monotonic room revisions and publication results.

### Start eligibility domain

```txt
start-eligibility-kit
ghost-member-reconciliation-kit
```

Requires every non-host participant to have a current admitted connection, actor binding and readiness record before bootstrap.

### Observation and proof domain

```txt
connection-observation-kit
connection-journal-kit
first-lobby-roster-frame-ack-kit
```

Projects detached evidence without granting authority.

## Required invariant

```txt
No LobbyPlayer may have connectionState=connected unless:
  actual data channel open was observed
  connection generation is current
  remote identity was admitted
  one connection-to-actor binding exists
  room membership commit succeeded
  committed roster revision is visible
```

## Required transaction

```txt
AdmitLobbyMemberCommand
  -> validate session and transport generations
  -> observe actual channel-open state
  -> validate remote identity claim
  -> bind connection to actor/member
  -> derive candidate roster revision and fingerprint
  -> commit room and lobbyPlayers atomically
  -> publish LobbyMemberAdmissionResult
  -> publish lobby update with delivery results
  -> acknowledge first visible lobby frame
```

## Rollback and retirement

```txt
failed or stale admission
  -> do not mutate room or lobbyPlayers
  -> close and remove candidate connection
  -> unregister candidate handlers
  -> journal rejection

error or close after admission
  -> retire connection binding
  -> commit member removal or disconnected state under one policy
  -> publish roster revision and visible acknowledgement
```

## Dependency order

```txt
1. canonical peer/member/player identity
2. explicit transport-mode authority
3. data-channel-open admission
4. atomic roster membership
5. sealed start eligibility
6. loading/run generation
7. first remote gameplay frame proof
```

No runtime implementation was changed in this audit.