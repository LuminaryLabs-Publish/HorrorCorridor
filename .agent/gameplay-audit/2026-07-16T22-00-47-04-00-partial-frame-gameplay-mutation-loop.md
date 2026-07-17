# Partial-Frame Gameplay Mutation Loop

**Timestamp:** `2026-07-16T22-00-47-04-00`

## Summary

Gameplay mutation and presentation share one frame callback. Host movement, held-cube synchronization, ooze advancement and snapshot publication can complete before a later visual phase throws. The runtime has no transaction that records the partial commit and retires the frame generation before listeners or transport events continue.

## Plan ledger

**Goal:** keep authoritative gameplay truth intact while preventing a failed frame from continuing as an apparently healthy runtime.

- [x] Map host, solo and client frame branches.
- [x] Identify mutations that can precede world or render failure.
- [x] Confirm no terminal fault latch or frame settlement result exists.
- [ ] Bind gameplay mutations to frame-phase receipts.
- [ ] Suspend publication and input after terminal failure.

## Current playing-frame path

```txt
host or solo
  -> advance local pose
  -> resolve collision
  -> mutate currentGameState
  -> synchronize held cubes
  -> advance ooze when cadence is due
  -> publish authoritative snapshot
  -> update runtime stores
  -> update world/minimap/render

client
  -> advance predicted pose
  -> resolve collision
  -> send PLAYER_UPDATE when due
  -> update runtime stores
  -> update world/minimap/render
```

## Gap

A later `world.update`, `drawMinimapFrame`, debug capture or `postProcessing.render` failure does not roll back already accepted gameplay work and does not publish a receipt explaining which phase committed. This audit does not propose rolling back authoritative state blindly; it requires explicit partial-frame settlement followed by terminal retirement.

## Required gameplay policy

```txt
completed authoritative mutation
  -> retain the accepted state and receipt
  -> stop all later work after fault
  -> suspend further publication
  -> expose terminal fault state

uncommitted mutation
  -> reject or restore according to phase ownership

client prediction after fault
  -> stop input consumption and network sends
```

## Invariants

```txt
accepted authoritative state is never silently discarded
failed presentation never implies the runtime is still advancing
no second snapshot is published after terminal retirement
no input command is consumed by a retired runtime generation
restart begins from an explicit fresh or recovered state
```

Documentation only. No gameplay behavior changed.