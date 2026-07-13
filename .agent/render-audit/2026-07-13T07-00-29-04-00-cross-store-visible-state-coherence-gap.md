# Cross-Store Visible-State Coherence Gap

**Timestamp:** `2026-07-13T07-00-29-04-00`

## Summary

Visible state is assembled from independent store revisions. `GameCanvas` initializes from an authoritative runtime snapshot while separately reading session identity and mode. `HUDOverlay` independently subscribes to UI, session and runtime stores. No common transition or frame revision proves that the world, HUD, lobby and overlays describe the same committed state.

## Plan ledger

**Goal:** require every presented world/HUD/lobby combination to cite one committed cross-store transition result.

- [x] Trace GameShell route projection.
- [x] Trace GameCanvas initialization and runtime snapshot use.
- [x] Trace HUDOverlay subscriptions.
- [x] Identify missing frame identity and acknowledgement.
- [ ] Add executable visible-state fixtures after implementation.

## Current projection

```txt
UI screen revision
Session room/identity revision
Runtime snapshot/readiness revision
  -> independently notify subscribers
  -> React render combines whichever revisions are current
  -> Three.js and HUD project the combination
```

## Risks

```txt
START_GAME room + prior/null runtime snapshot
new snapshot + stale route screen
PLAYING screen + readiness not yet committed
COMPLETED screen + room/identity from another transition
GameCanvas local player binding from session revision A and snapshot revision B
HUD room code from session revision A and objective/cubes from runtime revision B
```

## Required frame envelope

```txt
CoherentFrameEnvelope
  transitionId
  transitionGeneration
  sessionRevision
  runtimeRevision
  uiRevision
  roomRevision
  snapshotTick
  screen
  readinessRevision
  producedAt
```

The first frame after a transition must publish `FirstCoherentFrameAck` citing the exact envelope. Partial combinations must be rejected or remain invisible.