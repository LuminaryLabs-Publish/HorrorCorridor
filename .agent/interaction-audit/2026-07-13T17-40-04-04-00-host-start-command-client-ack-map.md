# Host Start Command and Client Acknowledgement Map

## Summary

The protocol has `START_GAME` and `SYNC` but no preparation request, start acknowledgement, commit acknowledgement or aggregate terminal result.

## Plan ledger

**Goal:** make every host and client transition observable under one start attempt.

- [x] Map current message and store actions.
- [x] Identify missing acknowledgements and source checks.
- [ ] Implement typed command/result envelopes.

## Current map

```txt
Host Start click
  -> local async loading
  -> local snapshot/UI/readiness commit
  -> START_GAME broadcast
  -> SYNC broadcast

Client START_GAME
  -> room roster host identity connection update

Client SYNC
  -> room roster snapshot screen pause readiness update
```

## Required map

```txt
HostStartCommand
  -> StartPrepareRequest(StartAttemptId, RoomRevision, RosterFingerprint)
  -> ClientPrepareResult per required client
  -> HostStartCommit
  -> ClientStartCommitResult per required client
  -> FirstParticipantFrameAck per required participant
  -> HostStartResult
```

## Admission rules

Reject wrong room, wrong transport generation, unknown sender, stale attempt, duplicate message, mismatched roster, mismatched snapshot, late predecessor message and post-cancellation acknowledgement with zero mutation.