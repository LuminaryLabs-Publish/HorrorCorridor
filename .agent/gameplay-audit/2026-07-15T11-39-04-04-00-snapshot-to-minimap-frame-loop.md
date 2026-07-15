# HorrorCorridor Snapshot-to-Minimap Frame Loop

**Timestamp:** `2026-07-15T11-39-04-04-00`

## Summary

The minimap is a presentation consumer of accepted maze, ooze, cube, player and local-pose state. Its content loop is coherent at a semantic level, but the canvas surface is not bound to a stable revisioned descriptor, so frame content and surface lifecycle cannot be proven as one result.

## Plan ledger

**Goal:** preserve all gameplay authority while binding each minimap draw to one accepted surface, snapshot and local-pose revision.

- [x] Identify authoritative and client snapshot sources.
- [x] Identify local pose and heading sources.
- [x] Identify all minimap content categories.
- [x] Identify the surface-lifecycle gap.
- [ ] Add immutable frame plans and matching visible acknowledgements.

## Interaction loop

```txt
host or solo
  -> advance local pose
  -> update authoritative game state
  -> periodically advance ooze and publish snapshot

client
  -> advance predicted local pose
  -> send player update
  -> consume latest accepted host snapshot

render frame
  -> select latest host or accepted client snapshot
  -> update world from snapshot and local pose
  -> draw minimap from:
       maze cells
       ooze trail
       ground cubes
       remote player positions
       local player position
       local yaw
  -> render world post-processing
```

## Authority boundaries to preserve

```txt
maze topology and cube state: authoritative snapshot
remote players: authoritative snapshot
local player marker position: local accepted/predicted pose
local heading: local accepted view angles
canvas dimensions and DPR: presentation authority only
```

The minimap authority must not mutate game state, transport state or movement state. It should consume immutable revisions and publish only presentation results.

## Missing coherence tuple

```txt
MinimapFrameId
MinimapSurfaceId
BackingStoreDescriptorFingerprint
ContextGeneration
SnapshotRevision
LocalPoseRevision
HeadingRevision
DrawReceipt
VisibleCandidateId
FirstMinimapResizeFrameAck
```

## Failure loop

```txt
unchanged gameplay and viewport state
  -> frame calls minimap draw
  -> raw DPR product remains non-integral
  -> integer canvas property remains unequal to float target
  -> backing store may reset again
  -> content is redrawn
  -> no result records whether a resize was intended or repeated
```

## Required gameplay-facing guarantee

```txt
accepted gameplay revisions
  -> produce one immutable MinimapFramePlan
  -> execute on one accepted surface descriptor
  -> never cause canvas resize through gameplay data changes alone
  -> never emit gameplay commands from draw code
  -> publish a matching presentation result
```

## Validation boundary

No gameplay behavior changed. No minimap content correctness or performance claim is made.