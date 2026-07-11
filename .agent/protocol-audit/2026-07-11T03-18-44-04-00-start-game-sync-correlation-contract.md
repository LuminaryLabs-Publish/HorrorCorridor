# HorrorCorridor START_GAME and SYNC Correlation Contract

**Timestamp:** `2026-07-11T03-18-44-04-00`

## Current protocol

Both envelopes support optional `requestId`, but `startPlay()` supplies none. `START_GAME` contains room, host, seed and start time. `SYNC` contains snapshot, room, reason and tick. No shared transaction identity is required.

## Required fields

```txt
startTransactionId
runSessionId
sessionEpoch
rosterRevision
rosterFingerprint
bootstrapFingerprint
commitRevision
```

## Acceptance policy

- Accept either message first, but stage it until its correlated partner arrives.
- Reject conflicting room, seed, roster, session or epoch values.
- Ignore exact duplicates.
- Reject stale transactions after a newer committed session.
- Commit once when both required observations are valid.
- Expire or reject incomplete staged transactions by explicit policy.
- Never enter PLAYING from an unrelated initial `SYNC`.
