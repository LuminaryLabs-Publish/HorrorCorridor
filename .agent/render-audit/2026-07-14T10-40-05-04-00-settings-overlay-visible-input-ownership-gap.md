# Settings Overlay Visible Input Ownership Gap

**Timestamp:** `2026-07-14T10-40-05-04-00`

## Summary

The overlay can become visible while the rendered world and input loop remain live. The frame does not identify a settings revision, input-suspension state, pointer-lock transfer, or accepted preference artifact.

## Plan ledger

**Goal:** require the visible settings frame to prove the same transaction that suspended gameplay input and adopted preferences.

- [x] Inspect HUD and settings projection.
- [x] Inspect render-loop and pointer-lock behavior.
- [x] Record the frame-coherence gap.
- [ ] Add frame-bound settings evidence.

## Current projection

```txt
Q
  -> overlay.visible=true and kind=settings
  -> screen remains PLAYING
  -> world continues rendering
  -> simulation or client prediction continues
  -> pointer lock can remain active
  -> no SettingsRevision is shown or captured
```

The normal PLAYING HUD returns only `SettingsOverlay` and `FrameDebugPanel`; its clickable Settings button is in the completed-screen branch. During active play, Settings is therefore keyboard-discoverable but not visibly discoverable.

## Required render evidence

```txt
SettingsFrameDescriptor
  SettingsRevision
  OverlayGeneration
  InputSuspensionRevision
  PointerLockOwnership
  Viewport and DPR
  RenderFrameId

FirstVisibleSettingsFrameAck
  -> cites the accepted SettingsOpenResult or SettingsApplyResult
  -> proves the overlay is visible
  -> proves gameplay input is suspended
  -> proves the displayed controls equal the accepted revision
```

## Validation boundary

No browser frame was captured and no visual or accessibility claim is made.