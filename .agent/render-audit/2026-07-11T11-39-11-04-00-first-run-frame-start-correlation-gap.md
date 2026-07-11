# First Run Frame Start Correlation Gap

**Timestamp:** `2026-07-11T11-39-11-04-00`

## Summary

Host and client routes mount `GameCanvas` from local screen state, but no rendered frame proves which start transaction, roster revision, run session or epoch it represents. The host can mount before any client publication succeeds, while a client can mount from an uncorrelated SYNC.

## Plan ledger

**Goal:** require the first gameplay frame to consume one committed start result and expose the same start/run identity as session, snapshot and runtime readiness state.

- [x] Trace host and client PLAYING transitions.
- [x] Trace GameCanvas mount admission.
- [x] Identify missing frame correlation.
- [x] Define the render proof row.
- [ ] Implement first-frame acknowledgement and fixture coverage.

## Current render admission

```txt
host
  local bootstrap
  -> set snapshot
  -> set screen PLAYING
  -> GameCanvas mounts
  -> broadcasts happen afterward

client
  START_GAME may update room only
  SYNC may independently set snapshot and screen PLAYING
  -> GameCanvas mounts
```

## Missing frame identity

```txt
startTransactionId: absent
runSessionId: absent
sessionEpoch: absent
sealedRosterRevision: absent
sealedRosterFingerprint: absent
bootstrapFingerprint: absent
snapshotRevision: absent
runtimeGeneration: absent
firstFrameId: absent
render-consumption result: absent
```

## Consequences

- The host can render an active run even when zero peers received the start publication.
- Different clients can render different admitted rosters or no correlated START_GAME state.
- A client can enter PLAYING from SYNC without proving that it accepted the same start transaction as the host.
- A late prior-run SYNC can mount a runtime because no epoch is carried through render admission.
- Debug frames cannot prove which start transaction produced a visible frame.

## Required frame row

```txt
StartCommittedFrame {
  frameId
  startTransactionId
  runSessionId
  sessionEpoch
  roomId
  rosterRevision
  rosterFingerprint
  bootstrapFingerprint
  snapshotTick
  snapshotFingerprint
  runtimeGeneration
  renderResult
  timestampMs
}
```

## Render admission rule

`GameCanvas` should mount or begin rendering only after the local peer has an accepted `LobbyStartResult` for the current run session and epoch. The first successful render should publish a typed acknowledgement back to start authority and runtime readiness.

## Fixture requirements

```txt
host publication failure -> no false distributed-start frame claim
client START_GAME only -> no gameplay frame
client SYNC only without accepted transaction -> no gameplay frame
correlated bundle -> one first frame
stale epoch bundle -> rejected before mount
duplicate bundle -> no second runtime generation
first-frame failure -> start/runtime result reports failure or degraded policy
```
