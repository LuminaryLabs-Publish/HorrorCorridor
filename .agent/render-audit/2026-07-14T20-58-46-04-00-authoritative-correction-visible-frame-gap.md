# Render audit: authoritative correction visible-frame gap

**Timestamp:** `2026-07-14T20-58-46-04-00`

## Summary

World and minimap rendering consume snapshots, while the active client camera continues from local predicted `poseRef`. The host publishes no movement admission result or correction revision, and the client publishes no acknowledgement that world, camera, minimap and debug surfaces converged on one accepted movement revision.

## Plan ledger

**Goal:** prove that an accepted or corrected client movement revision reaches every visible surface coherently.

- [x] Trace host pose mutation to authoritative snapshot publication.
- [x] Trace client predicted pose and snapshot rendering.
- [x] Identify missing correction and frame receipts.
- [ ] Implement and capture visible convergence fixtures.

## Current projection

```txt
client predicted pose -> local camera
host accepted payload pose -> SYNC snapshot
SYNC snapshot -> remote actors, cubes, ooze and minimap
held cube -> follows host-selected player pose
no shared PlayerMovementRevision binds all projections
```

## Required proof

```txt
ClientMovementUpdateResult
  -> PlayerMovementRevision
  -> authoritative pose/correction
  -> local prediction reconciliation
  -> world actor revision
  -> camera revision
  -> minimap revision
  -> debug-frame revision
  -> FirstAuthoritativeMovementFrameAck
```

## Failure fixtures

```txt
large host correction
wall-crossing rejection
reordered update correction
held-cube rollback
camera/world disagreement
minimap/world disagreement
first corrected frame screenshot and debug receipt
```

No visible correction convergence is claimed.