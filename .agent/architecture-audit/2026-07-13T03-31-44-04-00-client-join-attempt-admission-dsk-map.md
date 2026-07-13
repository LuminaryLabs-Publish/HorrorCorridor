# Client Join Attempt Admission DSK Map

**Timestamp:** `2026-07-13T03-31-44-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

## Summary

The client join path currently combines input normalization, provisional session mutation, transport construction, connection status and lobby presentation inside `GameShell`. It lacks a bounded domain transaction that distinguishes an attempted room from an accepted room.

## Plan ledger

**Goal:** place one reusable authority between join intent and committed session state so every transport mode produces the same typed join result.

- [x] Trace input, store, transport and presentation ownership.
- [x] Separate current implemented kits from planned authority kits.
- [x] Define command, result, rollback and visible-frame boundaries.
- [ ] Implement the DSK and fixture matrix.

## Current ownership

```txt
JoinMenu
  owns raw input controls and submit activation

GameShell
  trims and uppercases input
  creates fallback code and generated identities
  constructs provisional room and player
  mutates session, runtime readiness and UI stores
  creates client transport
  starts connection
  handles later transport and protocol events

peer-client-transport-kit
  creates PeerJS and optional BroadcastChannel
  reports transport status
  creates DataConnection or one-way local connection packet
  exposes connect/send/disconnect/destroy

lobby-screen-presentation-kit
  renders provisional room, status and roster
```

## Missing domain boundary

```txt
corridor-client-join-attempt-admission-authority-domain
```

It owns:

```txt
join attempt identity and generation
join-code and display-name policy
normalized join intent
candidate lifetime
transport selection and attempt binding
host-presence challenge
canonical host acknowledgement
room and member admission result
bounded timeout and cancellation
atomic session commit or rollback
late predecessor quarantine
observations and journal evidence
first accepted-lobby visible-frame acknowledgement
```

## Planned kit composition

```txt
client-join-command-kit
  create immutable ClientJoinCommand

join-attempt-id-kit
  allocate stable operation identity

join-attempt-generation-kit
  fence retries and predecessor callbacks

join-code-schema-kit
  normalize and validate the shared host/client code grammar

display-name-policy-kit
  normalize, bound and reject invalid player names

join-intent-normalization-kit
  return canonical inputs without store mutation

join-candidate-kit
  retain detached candidate identity and requested host

join-attempt-state-kit
  represent Created, Validating, Connecting, AwaitingAck,
  Accepted, Rejected, TimedOut, Cancelled and Failed

join-attempt-timeout-kit
  enforce bounded transport and acknowledgement deadlines

join-attempt-cancellation-kit
  retire active transport resources and publish a receipt

join-transport-selection-kit
  select PeerJS or local bridge under explicit policy

host-presence-challenge-kit
  issue challenge tied to attempt and client identity

host-join-ack-kit
  validate source-admitted host acknowledgement

canonical-room-manifest-kit
  bind room, join code, host peer, host player, capacity and roster revision

join-result-kit
  publish one typed terminal result

join-session-commit-kit
  atomically commit accepted identity, room and roster

join-rollback-kit
  clear provisional resources for every non-accepted result

join-late-event-quarantine-kit
  reject callbacks and messages from retired generations

join-observation-kit
  expose bounded status without pretending admission

join-journal-kit
  retain deterministic join evidence

first-joined-lobby-frame-ack-kit
  correlate accepted result with the first matching visible lobby frame
```

## Required transaction

```txt
ClientJoinCommand
  -> validate expected session generation
  -> allocate JoinAttemptId and generation
  -> normalize and validate code and name
  -> create detached candidate
  -> select explicit transport mode
  -> connect under the attempt generation
  -> challenge host presence
  -> validate HostJoinAck source and canonical room manifest
  -> validate member admission and capacity
  -> Accepted | InvalidInput | RoomUnavailable | Full |
     Rejected | TimedOut | Cancelled | Stale | Failed

Accepted
  -> atomically commit session, peer identity, room and roster
  -> publish accepted revision and fingerprint
  -> project client lobby
  -> acknowledge first matching visible frame

non-Accepted
  -> perform zero canonical session mutation
  -> retire attempt resources exactly once
  -> preserve or restore predecessor session
  -> publish bounded terminal evidence
```

## Dependency order

```txt
input policy
  -> attempt identity
  -> transport selection
  -> host presence
  -> room/member admission
  -> typed result
  -> atomic commit or rollback
  -> visible-frame acknowledgement
```
