# Host Start Visible-Frame Convergence Gap

## Summary

Host and clients can enter playable state without one shared start revision or proof that every required participant rendered the same initial snapshot.

## Plan ledger

**Goal:** bind visible presentation to the accepted start attempt and sealed snapshot.

- [x] Trace host local commit and client SYNC handling.
- [x] Confirm readiness is set before a matching visible-frame acknowledgement.
- [ ] Add generation-bound frame receipts and convergence fixtures.

## Current path

```txt
host bootstrap
  -> host sets PLAYING and rendering ready
  -> START_GAME broadcast
  -> SYNC broadcast

client SYNC
  -> snapshot commit
  -> PLAYING
  -> rendering ready
```

## Missing evidence

```txt
StartAttemptId
InitialSnapshotRevision
sealed roster fingerprint
host frame submission receipt
client frame submission receipt
participant visible-frame acknowledgement
aggregate first-multiplayer-frame result
```

## Required gate

The host must not publish `Started` until every required participant either acknowledges the matching first visible frame or is removed under an explicit dropout policy. Partial or stale receipts must not satisfy the start attempt.