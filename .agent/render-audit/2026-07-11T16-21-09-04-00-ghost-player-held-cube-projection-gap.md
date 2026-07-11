# Render Audit: Ghost Player and Held-Cube Projection Gap

**Timestamp:** `2026-07-11T16-21-09-04-00`

## Current projection path

```txt
currentGameState
  -> buildReplicatedSnapshot
  -> players[] and cubes[].ownerId
  -> world.update
  -> minimap
  -> HUD/debug
  -> post-processing render
```

Connection-close removes only the session-store row. The current gameplay snapshot remains unchanged, so world and minimap can continue displaying the disconnected player. A held cube remains owned and can continue following the retained player position.

## Missing render evidence

```txt
disconnectResultId
membershipRevision
retiredPlayerId
cubeRecoveryResult
snapshotRevision
worldAck
minimapAck
hudAck
debugAck
firstVisibleFrameId
```

## Required fixtures

```txt
ghost player disappears on the result-linked frame
held cube projects the declared recovered state
minimap and world use the same membership revision
no retired player marker returns from a stale snapshot
reconnect frame restores only the claimed suspended actor
```
