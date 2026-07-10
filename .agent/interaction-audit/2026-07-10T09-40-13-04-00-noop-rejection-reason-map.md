# Interaction Audit: No-op and Rejection Reason Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T09-40-13-04-00`

## Current interaction shape

```txt
Interact key
  -> determine pickup, drop, place, or remove
  -> apply interaction/network rule
  -> invalid branch returns unchanged GameState
  -> local/host logic infers skip from unchanged state
```

## Reasons that need stable catalog entries

```txt
pickup.accepted.near-loose-cube
pickup.rejected.already-carrying
pickup.rejected.no-nearby-cube
pickup.rejected.cube-not-found

drop.accepted.carrying
drop.rejected.not-carrying
drop.rejected.invalid-drop-cell

place.accepted.slot-filled
place.accepted.final-slot-victory
place.rejected.not-carrying
place.rejected.too-far-from-anomaly
place.rejected.no-free-slot
place.rejected.color-order-mismatch

remove.accepted.last-slot
remove.rejected.no-slot
remove.rejected.wrong-slot
remove.rejected.no-anomaly-nearby

network.accepted.player-update
network.noop.missing-player
network.publish-only.request-sync
network.skipped.toggle-ready
network.skipped.cancel
network.skipped.unknown-action

ooze.accepted.spawn
ooze.accepted.decay
ooze.noop.no-state-diff
ooze.skipped.no-eligible-cell

victory.accepted.sequence-complete
victory.recovery.rollback-invalid-slots

consumer.publish.accepted-changed
consumer.publish.victory
consumer.skip.rejected
consumer.skip.noop
consumer.skip.skipped
consumer.publish.recovery
```

## Required readback

Every command path should provide:

```txt
command id
actor id
source path
status
stable reason
changed flag
before summary
after summary
publish decision
journal entry id
runtime debug projection id
```

## Why this matters

Without stable no-op and rejection reasons, rejected player interactions and host/client recovery paths look identical to a true no-op. That makes multiplayer debugging, replay fixtures, runtime debug overlays, and future renderer/PeerJS refactors unsafe.
