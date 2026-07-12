# HorrorCorridor Privileged Debug Overlay / Frame Gap

**Timestamp:** `2026-07-12T01-08-06-04-00`

## Goal

Document the mismatch between the public visible frame and the privileged state projected by the runtime debug overlay.

## Current render path

```txt
GameCanvas RAF
  -> world.update
  -> minimap draw
  -> captureFrame before postProcessing.render
  -> recordRuntimeDebugFrame when enabled
  -> postProcessing.render

HUDOverlay
  -> mounts FrameDebugPanel during PLAYING
  -> mounts FrameDebugPanel during COMPLETED
  -> panel reads latest captured frame
  -> panel prints anomaly order and all cube positions
```

## Finding

The overlay is not a player-safe diagnostics surface. It renders gameplay-privileged state:

```txt
ordered anomaly colors and occupied slots
cube IDs, colors, states, owners and exact world positions
local position, velocity, view and carried cube
input state and pointer-lock state
snapshot state and cadence
recent runtime events
```

Any public user can activate this view with Backquote after runtime initialization. Query parameters and persisted preferences can also make it appear automatically.

## Frame-correlation gap

The logger captures the frame record before `postProcessing.render()`. The record has a synthetic debug frame number, but no render-frame ID, surface ID/revision or visible-frame acknowledgement. Therefore:

```txt
captured privileged state
  -> may describe the candidate frame being prepared
  -> overlay appears in a separately committed React frame
  -> no receipt proves the overlay state and 3D pixels share one committed frame identity
```

The preceding render-surface audit already requires surface/frame correlation. Debug authority must consume that identity rather than invent another uncorrelated frame sequence.

## Required render projection

```txt
committed RenderFrameReceipt
  -> frameId
  -> runtimeGeneration
  -> sessionEpoch
  -> surfaceId and surfaceRevision
  -> authoritativeSnapshotRevision
  -> admitted DebugSessionLease
  -> tier-specific DebugFrameProjection
  -> overlay/export result citing the same identities
```

## Public-safe overlay baseline

```txt
allowed:
  FPS or frame-time aggregate
  network cadence aggregate
  coarse readiness
  surface revision and fallback tier
  non-identifying validation flags

forbidden:
  anomaly order and slot contents
  cube identities, owners and positions
  room/player identifiers
  exact pose and input history
  raw event payloads
```

## Required proof

```txt
public build overlay cannot display privileged fields
QA/developer overlay requires a valid lease
capture, 3D frame and overlay cite one frame/surface/session identity
stale debug frames cannot replace a newer projection
revocation removes privileged overlay before acknowledgement
completed and paused screens follow the same capability policy
```