# HorrorCorridor Predicted/Authoritative Pose Render Gap

**Timestamp:** `2026-07-11T03-08-43-04-00`

## Current render sources

```txt
camera:
  local predicted poseRef + local viewAnglesRef

local minimap marker:
  local predicted position + local yaw

world snapshot:
  latest authoritative snapshot

remote player meshes:
  authoritative snapshot player rows

local carry state:
  authoritative snapshot cube ownership
```

## Divergence path

While a client is actively playing, `poseRef` advances locally every frame. The latest host snapshot is passed into `world.update()` and `drawMinimapFrame()`, but the host local-player row is not copied into `poseRef`. The camera and local minimap marker can therefore represent a different position than the host snapshot used for world state and remote projection.

```txt
host snapshot local player = H
client predicted poseRef = P
camera = P
local minimap marker = P
snapshot world/cube ownership = H-derived state
runtime debug = records both H and P but no correction classification
```

## Consequences

```txt
host correction is visually ignored during PLAYING
local camera can remain beyond a host collision correction
held-cube placement can render against a different local pose than the host player row
local minimap marker can disagree with replicated player state
spectator/debug review has no single committed pose source
rendered frame has no acknowledged input sequence
```

## Required render contract

Each active client frame should consume one committed reconciliation projection:

```txt
accepted authoritative snapshot
  + acknowledged client sequence
  + retained unacknowledged inputs
  -> reconciled pose projection
  -> camera pose
  -> local minimap marker
  -> local carry projection
  -> runtime debug frame
  -> render frame id
```

## Required readback

```txt
frameId
snapshotTick
acceptedClientSequence
latestPredictedSequence
hostPose
predictedPoseBeforeCorrection
projectedPose
reconciliationMode
correctionDistance
replayedInputCount
cameraPoseSource
minimapPoseSource
```

## Main finding

The renderer itself is not the primary defect. The defect is the absence of a committed pose projection between accepted snapshot state and camera/minimap/world consumers. Do not retune camera shake, minimap drawing or player mesh interpolation until this source contract exists.
