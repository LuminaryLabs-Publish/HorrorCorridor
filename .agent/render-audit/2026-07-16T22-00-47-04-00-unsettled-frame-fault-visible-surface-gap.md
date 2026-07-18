# Unsettled Frame-Fault Visible Surface Gap

**Timestamp:** `2026-07-16T22-00-47-04-00`

## Summary

The Three.js world, Canvas2D minimap and post-processing composer are updated sequentially inside one unguarded RAF callback. A failure can leave some visual surfaces mutated and others unpresented, with the previous frame frozen onscreen and no terminal fault projection.

## Plan ledger

**Goal:** ensure every failed render generation presents one explicit terminal state and prevents any later surface from consuming stale or partially applied frame evidence.

- [x] Inspect camera, world, minimap, debug and post-processing ordering.
- [x] Confirm no phase receipt or matching-frame result exists.
- [x] Confirm cleanup is not called by the frame callback.
- [ ] Add revision-bound surface settlement.
- [ ] Prove fault-frame convergence in browser fixtures.

## Current order

```txt
syncCameraFromPlayer
  -> world.update
  -> drawMinimapFrame
  -> recordRuntimeDebugFrame when enabled
  -> postProcessing.render
```

## Failure examples

```txt
world.update throws
  -> camera has changed
  -> world/minimap/post-processing do not settle

minimap draw throws
  -> Three.js world state has changed
  -> post-processing present is skipped

postProcessing.render throws
  -> world and minimap may reflect the new frame
  -> WebGL present does not settle
```

## Missing projection evidence

```txt
FrameRevision
WorldProjectionReceipt
MinimapProjectionReceipt
PostProcessingReceipt
RuntimeFrameFaultResult
FaultSurfaceRevision
FirstFaultFrameAck
```

## Required render contract

```txt
accepted frame generation
  -> phase receipts bind all surface work
  -> successful present publishes one frame result

failed frame generation
  -> stop remaining phases
  -> retire the generation
  -> freeze or replace affected surfaces by policy
  -> present one DOM-owned terminal fault surface
  -> acknowledge the fault surface revision
```

## Claim boundary

This is a source-backed partial-frame and frozen-surface risk. No render exception or player-facing failure was reproduced.