# Interaction audit: host-message source admission map

**Timestamp:** `2026-07-12T16-29-56-04-00`

## Summary

Decoded messages currently cross directly from transport events into session and runtime stores. The interaction boundary must retain transport provenance and return a typed admission result before dispatching any host-authoritative effect.

## Plan ledger

**Goal:** make host-class message handling an explicit command-admission interaction rather than a message-type side effect.

- [x] Identify transport-event source fields.
- [x] Identify protocol-envelope identity fields.
- [x] Identify state-changing consumers.
- [x] Define admitted and rejected paths.
- [x] Define observation and frame correlation.
- [ ] Implement the interaction boundary.

## Current map

```txt
peer/message
  remotePeerId
  connectionId
  message
    senderId
    roomId
    type

  -> GameShell message.type branch
  -> direct store setters
```

## Required map

```txt
peer/message
  -> create AuthoritativeMessageCandidate
  -> classify message authority
  -> validate current session epoch
  -> validate transport mode and revision
  -> validate connection ID and generation
  -> validate remote peer against admitted host peer
  -> validate senderId against admitted host player
  -> validate envelope and payload room identity
  -> validate authority revision and duplicate identity
  -> MessageAuthorityResult

Accepted
  -> dispatch typed host-state command
  -> commit one room/roster/snapshot transition
  -> publish state fingerprint and visible-frame expectation

Rejected, Stale or Duplicate
  -> zero store mutation
  -> bounded rejection observation
```

## Required observations

```txt
candidate message ID and type
remote peer and sender identity
connection and session generations
active and candidate room IDs
admission status and reason
predecessor and successor state fingerprints
first matching visible frame ID
```

## Interaction invariants

- A client cannot infer host authority from `message.type`.
- A payload cannot self-assert its own trusted sender.
- A structurally valid message may still be unauthorized.
- A message from a retired connection generation is stale even when its payload is current-looking.
- Rejection performs no room, roster, snapshot, route, readiness or UI mutation.

## Non-claims

No interaction handler changed. The current client does not yet return source-admission results or correlate accepted messages with visible frames.