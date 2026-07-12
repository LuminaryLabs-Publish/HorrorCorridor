# HorrorCorridor PLAYING to COMPLETED HUD Reachability Loop

**Timestamp:** `2026-07-12T02-49-19-04-00`

## Goal

Document how the current screen branching makes an implemented gameplay aid unreachable during the phase in which players need it.

## Current loop

```txt
player starts run
  -> screen = PLAYING
  -> GameCanvas begins active simulation and rendering
  -> HUDOverlay returns only settings and debug surfaces
  -> Minimap is not mounted
  -> player navigates without the implemented minimap
  -> victory commits
  -> screen = COMPLETED
  -> completed HUD mounts Minimap
  -> minimap becomes visible after navigation and puzzle play have ended
```

## Gameplay consequence

The current product behavior does not match the kit inventory:

```txt
corridor-minimap-kit promises:
  maze projection
  cube projection
  remote player projection
  ooze projection
  local heading

active gameplay receives:
  none of those services

completed state receives:
  the minimap surface
```

This is not a missing renderer implementation. It is a composition and screen-policy reachability failure.

## Silent failure path

```txt
active RAF
  -> query minimap canvas
  -> canvas missing
  -> renderer returns
  -> no warning
  -> no typed no-consumer result
  -> no gameplay fallback
```

The absence of an explicit result makes the runtime appear healthy while a declared gameplay service is unavailable.

## Required gameplay policy

```txt
PLAYING
  mandatory:
    world
    post-processing
    active HUD shell
    minimap when enabled by product policy
  optional:
    settings overlay
    admitted debug tier

PAUSED
  mandatory:
    frozen world frame or declared background policy
    pause UI
  explicit:
    minimap visible or hidden by named policy

COMPLETED
  mandatory:
    terminal outcome UI
  explicit:
    minimap retained or retired by named policy
```

## Required results

```txt
HudProjectionResult
MinimapProjectionResult
PresentationConsumerUnavailableResult
PresentationConsumerSkippedResult
CommittedPresentationFrameReceipt
```

## Acceptance criteria

```txt
active gameplay mounts every mandatory consumer
active minimap draw succeeds before terminal state
missing mandatory consumer blocks readiness or returns a visible fault
screen transitions do not accidentally create the first surface lease
world, minimap and HUD cite one frame identity
```

## Validation state

```txt
runtime change: no
active gameplay repaired: no
gameplay fixture implemented: no
browser proof run: no
```
