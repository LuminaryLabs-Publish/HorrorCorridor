# HorrorCorridor Ready and Start Command Admission Map

**Timestamp:** `2026-07-11T03-18-44-04-00`

## Ready command

```txt
actor
desiredReady
roomId
expectedRosterRevision
requestId
```

Reject when actor is unknown, disconnected, in the wrong room, not bound to the sender, stale, or the room is not in lobby phase. Repeating the same desired state is `no-change`.

## Start command

```txt
actor
roomId
expectedPhase
expectedRosterRevision
requestId
```

Reject when actor is not host, room is missing, phase is not lobby, revision is stale, a transaction is already starting, a real participant is disconnected or unready, or a placeholder is present.

## Consumer rule

UI buttons consume typed results. They must show stable rejection reasons and never infer success from local mutation or screen changes.
