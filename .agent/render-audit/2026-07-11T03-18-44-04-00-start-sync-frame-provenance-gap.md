# HorrorCorridor Start/SYNC Render Provenance Gap

**Timestamp:** `2026-07-11T03-18-44-04-00`

## Current projection

```txt
START_GAME received
  -> room and roster update
  -> no PLAYING projection

initial SYNC received
  -> authoritative snapshot update
  -> screen becomes PLAYING
  -> GameCanvas mounts
  -> world and HUD render
```

## Gap

The rendered first frame has no proof that the client accepted a matching `START_GAME`. The renderer, HUD and minimap receive the snapshot but no `startTransactionId`, admitted-roster fingerprint, run-session ID or client start-commit receipt.

## Required render-neutral observation

```txt
CommittedStartObservation
  startTransactionId
  runSessionId
  sessionEpoch
  roomId
  rosterRevision
  rosterFingerprint
  seed
  authoritativeTick
  acceptedMessageIds
  commitStatus
```

The first rendered frame should reference that observation. Rendering must not become the authority; it only consumes the committed start.
