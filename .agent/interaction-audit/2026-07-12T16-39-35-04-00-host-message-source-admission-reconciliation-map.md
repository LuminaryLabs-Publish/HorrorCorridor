# Host Message Source Admission Reconciliation Map

**Timestamp:** `2026-07-12T16-39-35-04-00`

## Summary

Transport events expose useful source evidence, but the interaction boundary does not convert that evidence into a typed admission decision before store mutation.

## Plan ledger

**Goal:** route every host-class message through one explicit command and result surface.

- [x] Map transport event, protocol envelope and client consumer inputs.
- [x] Define admission checks and result classes.
- [x] Define atomic commit and zero-mutation rejection.
- [ ] Implement command routing and fixtures.

## Command map

```txt
HostMessageAdmissionCommand
  messageId
  messageType
  remotePeerId
  connectionId
  connectionGeneration
  senderId
  envelopeRoomId
  payloadRoomId
  sessionEpoch
  transportRevision
  authorityRevision
  payload
```

## Admission sequence

```txt
validate current runtime and session
  -> classify message as host-only
  -> compare remote peer with admitted host peer
  -> compare sender with admitted host player
  -> compare connection ID and generation
  -> compare envelope, payload and active room
  -> compare message ID and authority revision
  -> return typed result
```

## Commit sequence

```txt
Accepted
  -> construct immutable mutation plan
  -> validate predecessor revisions
  -> atomically commit room, roster, snapshot, route and readiness
  -> publish successor fingerprint and visible-frame target

Rejected, Stale or Duplicate
  -> commit nothing
  -> publish bounded reason observation
```
