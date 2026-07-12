# HorrorCorridor Blur and Missed-Keyup Movement Loop

**Timestamp:** `2026-07-12T04-28-03-04-00`

## Summary

The gameplay loop supports movement before pointer lock, but its held controls depend on receiving a matching keyup. Focus loss while unlocked does not invalidate that assumption, allowing a movement command to outlive the physical key press.

## Reachable loop

```txt
1. Enter PLAYING.
2. Do not capture the pointer.
3. Hold W.
4. Alt-tab, click another window or otherwise blur the page before releasing W.
5. Release W outside the page.
6. Return to the game.
7. The local input state still reports forward = true.
8. Movement continues until another explicit reset or key cycle occurs.
```

## Solo and host consequence

```txt
screen remains PLAYING
  -> animation loop calls stepLocalPose
  -> advancePlayerMovement reads forward = 1
  -> collision resolves a new position
  -> authoritative game state is updated
  -> later snapshot publication commits the unintended pose
```

## Client consequence

```txt
client predicts forward movement
  -> cadence calls sendPlayerUpdate
  -> movement-derived pose is sent
  -> host consumes absolute pose under the existing movement path
  -> remote players can observe unintended movement
```

## Why pointer-locked mode behaves differently

```txt
blur while pointer locked
  -> onBlur calls document.exitPointerLock
  -> pointerlockchange runs
  -> setPlayerPointerLocked(false) returns a neutral state
  -> UI changes to PAUSED
```

The defect is specifically the unlocked path that the product advertises as immediately playable.

## Missing gameplay guarantees

```txt
movement requires a valid control lease: no
focus state is part of movement admission: no
visibility state is part of movement admission: no
retirement precedes simulation: no
client sends a terminal zero-input correction: no
host validates input lease/revision: no
```

## Required gameplay rule

```txt
movement may advance only when:
  screen = PLAYING
  runtime generation is current
  run identity is current
  page is focused and visible
  control lease is active
  input revision matches the admitted revision
```

All other states must resolve movement axes to zero.

## Fixture matrix

```txt
solo unlocked blur
host unlocked blur
client unlocked blur
hidden document
pagehide
manual pause while movement held
return to lobby while movement held
runtime replacement while movement held
pointer-lock loss followed by blur
focus regain without new keydown
```

## Validation boundary

This is a documentation-only gameplay audit. No movement, input or networking implementation changed.