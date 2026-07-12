# Connection Admission Audit: Channel-Open, Binding and Roster Contract

**Timestamp:** `2026-07-12T14-22-01-04-00`

## Summary

A transport candidate is currently promoted to an authoritative lobby member before actual PeerJS channel-open evidence exists. This audit defines the state machine, invariants, results and failure behavior required to make channel admission reliable.

## Plan ledger

**Goal:** establish one monotonic connection-admission state machine that cannot create ghost members or suppress the true open transition.

- [x] Identify current candidate, callback and roster states.
- [x] Define candidate and admitted state machines.
- [x] Define command/result schemas.
- [x] Define error, close, reconnect and start barriers.
- [x] Define fixture requirements.
- [ ] Implement and prove the contract later.

## Current defect

```txt
candidate-created
  -> event named connection-open emitted
  -> member committed
  -> actual channel open may happen later or never
```

The `connectionOpenEmitted` guard records event emission, not channel state. It can permanently consume the true open transition.

## Required candidate state machine

```txt
created
  -> opening
  -> open-observed
  -> identity-validated
  -> actor-bound
  -> roster-admitted
  -> active

terminal alternatives
  -> rejected
  -> timed-out
  -> errored
  -> closed
  -> superseded
  -> retired
```

No state may skip directly from `created` to `roster-admitted`.

## Required identities

```txt
sessionEpoch
roomId
transportModeId
transportRevision
connectionCandidateId
connectionGeneration
peerConnectionId
remotePeerId
identityClaimId
actorBindingId
memberId
rosterRevision
```

## Required open observation

```txt
DataChannelOpenObservation
  observationId
  connectionCandidateId
  connectionGeneration
  peerConnectionId
  remotePeerId
  observedOpen
  observedAtMs
  transportRevision
```

The observation is accepted only when `observedOpen === true` and all generations are current.

## Required admission result

```txt
LobbyMemberAdmissionResult
  commandId
  status: accepted | rejected | stale | duplicate | failed
  reason
  connectionCandidateId
  actorBindingId
  memberId
  predecessorRosterRevision
  committedRosterRevision
  rosterFingerprint
  publicationResultId
  timestampMs
```

## Invariants

```txt
one active connection candidate binds to at most one actor
one actor has at most one active connection binding per session epoch
one member ID appears at most once in the roster
connected member state requires an active admitted binding
roster revision increases exactly once per accepted membership mutation
true open observation is never suppressed by a prior candidate-created event
error, close, timeout and supersession always reach a terminal result
start bootstrap accepts only a sealed eligible roster revision
```

## Error policy

### Error before admission

```txt
mark candidate errored
remove from candidate registry
close channel if needed
remove handlers
publish terminal result
leave roster unchanged
```

### Error after admission

```txt
retire active binding
apply named disconnected/remove policy
commit new roster revision
publish lobby update
acknowledge visible revision
```

### Error without close callback

The error result itself must be terminal. Cleanup and roster reconciliation cannot depend on a later close callback.

## Reconnect policy

```txt
new connection candidate gets new generation
old binding remains predecessor until replacement admission succeeds
replacement commits atomically
old binding then retires
stale events from old generation are rejected
```

## Start barrier

Start eligibility must require:

```txt
sealed roster revision
all remote members have active admitted bindings
all required players ready
no candidate-only members counted as connected
initial publication policy satisfied
```

## Fixtures

```txt
candidate arrives with open=false
open event delayed by 500 ms
connection never opens
connection errors without close
connection closes before admission
open callback fires twice
connection reconnect replaces predecessor
host starts during opening candidate
host starts after admitted roster seal
client and host render same roster revision
```

No runtime source was changed.