# Terminal Frame Outcome Projection Gap

**Timestamp:** `2026-07-11T13-20-45-04-00`

## Summary

GameCanvas continues to render while the shell is on `COMPLETED`, but rendered debug frames carry only screen, snapshot state, pose and cadence. No frame proves which terminal result, run session, session epoch or outcome revision produced the completion presentation.

## Plan ledger

**Goal:** define the render evidence required to prove that the first visible terminal frame corresponds to one admitted victory or failure result.

- [x] Trace the completed-screen render path.
- [x] Inspect debug-frame fields.
- [x] Compare victory and failure projection behavior.
- [x] Define the minimum terminal-frame receipt.
- [ ] Add executable frame-correlation fixtures later.

## Current render path

```txt
terminal state reaches UI store
  -> screen becomes COMPLETED
  -> GameCanvas remains mounted
  -> pointer lock is released
  -> simulation advancement stops
  -> latest snapshot is replayed
  -> world, minimap and post-processing render
  -> CompleteScreen overlays the canvas
```

## Current evidence gap

```txt
frameNumber: present
screen: present
snapshot tick: present
snapshot gameState: present
runSessionId: absent
sessionEpoch: absent
terminalOutcomeId: absent
terminal revision: absent
terminal reason: absent
terminal result fingerprint: absent
first terminal frame marker: absent
CompleteScreen acknowledgement: absent
```

A `failure` snapshot is also routed to `PLAYING` by the shell instead of `COMPLETED`, so the failure rendering path cannot currently be reached through authoritative replication.

## Required terminal frame receipt

```txt
frameId
recordedAtMs
runSessionId
sessionEpoch
roomId
snapshotTick
terminalOutcomeId
terminalRevision
outcomeKind: victory | failure
outcomeReason
outcomeProofFingerprint
screen: COMPLETED
gameScreen: victory | failure
worldRenderCommitted
completionOverlayCommitted
```

## Required guarantees

```txt
first terminal frame is emitted only after terminal commit
frame identity matches the admitted terminal result
victory and failure use the same projection contract
late playing snapshots cannot replace a terminal frame
restart and title exit retire the terminal frame generation
```
