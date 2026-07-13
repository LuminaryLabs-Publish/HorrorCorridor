# Sealed Roster and Loading Generation Contract

## Summary

A multiplayer start must bind one immutable roster and one cancellable loading generation before deterministic bootstrap begins.

## Plan ledger

**Goal:** prevent a stale asynchronous continuation from starting a different lobby than the one the host approved.

- [x] Define identities and revisions.
- [x] Define participant states and terminal results.
- [ ] Implement and fixture the contract.

## Command

```txt
HostStartCommand {
  commandId
  startAttemptId
  roomId
  expectedRoomRevision
  sealedRosterFingerprint
  expectedTransportGeneration
  policyRevision
}
```

## Participant preparation

```txt
host session candidate
host runtime candidate
host UI candidate
initial snapshot candidate
transport candidate
client preparation result per sealed member
```

## Terminal results

```txt
Started
RejectedUnready
RejectedDisconnected
RejectedRosterChanged
Stale
Cancelled
TimedOut
PrepareFailed
CommitFailed
RolledBack
```

## Rules

A roster is sealed only for the attempt, not globally. Join/leave/ready changes either supersede the attempt or are rejected according to explicit policy. Loading callbacks must revalidate the generation after every await. No local store or transport message becomes authoritative before the aggregate commit. Rollback must restore the predecessor lobby and retire candidate work exactly once.