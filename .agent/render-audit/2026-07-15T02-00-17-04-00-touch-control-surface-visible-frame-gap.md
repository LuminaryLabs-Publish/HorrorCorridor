# Render Audit: Touch Control Surface Visible-Frame Gap

**Timestamp:** `2026-07-15T02-00-17-04-00`

## Summary

The active PLAYING overlay mounts settings and debug surfaces but no movement, look, interact or pause controls for touch. There is no frame receipt binding a selected device profile to a visible, usable control surface.

## Plan ledger

**Goal:** require visible control projection and first-action effect evidence for non-desktop profiles.

- [x] Inspect playing HUD composition.
- [x] Inspect pointer-lock gate.
- [x] Inspect frame-loop input consumption.
- [x] Define control-surface and action-effect acknowledgements.
- [ ] Implement and prove on touch and hybrid viewports.

## Current frame path

```txt
PLAYING
  -> GameCanvas renders Three.js world
  -> HUD mounts SettingsOverlay and FrameDebugPanel
  -> PointerLockGate presents mouse capture and WASD instructions
  -> no touch gameplay control DOM is mounted
  -> no control-surface frame identity exists
```

## Required evidence

```txt
ControlProfileRevision
ControlSurfaceRevision
ViewportRevision
InputMapRevision
FirstDeviceControlSurfaceFrameAck
FirstDeviceActionEffectFrameAck
```

## Required visible checks

```txt
movement control is present and unobscured
look region is present and gesture-owned
interact control is present
pause control is present
settings/debug surfaces do not steal gameplay gestures
safe-area and viewport bounds are honored
surface revision matches the active input generation
```

## Failure cases

```txt
control visible but not wired
control wired but covered by overlay
gesture starts on one generation and ends on another
touch and mouse both emit the same action
route retires while a movement pointer remains held
action accepted but no matching world frame appears
```
