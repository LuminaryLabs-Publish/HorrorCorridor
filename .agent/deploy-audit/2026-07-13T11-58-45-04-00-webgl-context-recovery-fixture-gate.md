# WebGL Context Recovery Fixture Gate

**Timestamp:** `2026-07-13T11-58-45-04-00`

## Summary

The current package exposes build, lint, harness, visual and live-player commands but no deterministic WebGL context-loss fixture. Production readiness requires source, development, production-build and deployed-origin proof.

## Plan ledger

**Goal:** fail validation unless context loss, restoration, failed restoration and repeated loss produce bounded typed results and a proven recovered frame.

- [x] Inspect available package scripts.
- [x] Confirm no `WEBGL_lose_context` source fixture exists.
- [x] Define required fixture matrix.
- [ ] Add deterministic extension-driven context loss.
- [ ] Run in local dev, production build and deployed origin.
- [ ] Record artifacts and terminal results.

## Required fixture matrix

```txt
loss before first visible frame
loss during solo simulation
loss during host authoritative publication
loss during client snapshot replay
loss while paused
loss after completion
restore at unchanged viewport
restore after resize
restore after DPR change
restore with renderer preparation failure
restore with composer/render-target failure
restore with world-resource preparation failure
second loss during recovery
unmount during recovery
cold restart after failed recovery
```

## Assertions

```txt
one accepted ContextLossResult
no stale render submission after loss
rendering readiness becomes false
fallback becomes visible without WebGL
simulation/network policy matches session mode
no duplicate gameplay/network mutation
one recovery candidate generation
failed candidate never becomes active
accepted candidate owns all resource participants
one successor RAF generation
one FirstRecoveredFrameAck
fallback retires only after acknowledgement
cleanup is idempotent
```

## Test mechanism

Use `WEBGL_lose_context` when available through a test-only capability. The harness must not expose the extension as a production gameplay API. A no-extension environment must return a typed `Unsupported` fixture result rather than silently passing.

## Required environments

```txt
Next development server
static/production build output
Chromium software GPU path
Chromium hardware GPU path when available
GitHub Pages deployed origin
```

## Required artifacts

```txt
context lifecycle journal
resource manifest before and after recovery
readiness transitions
fallback screenshots
probe result
first recovered frame screenshot and receipt
RAF generation count
runtime/network mutation counts
cleanup result
```

## Current status

```txt
fixture implementation: absent
fixture command: absent
source run: not run
production build run: not run
deployed-origin run: not run
```

No deployment or production-readiness claim is made.