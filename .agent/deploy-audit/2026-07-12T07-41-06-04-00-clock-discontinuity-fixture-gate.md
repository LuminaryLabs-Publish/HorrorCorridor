# Clock Discontinuity Fixture Gate

**Timestamp:** `2026-07-12T07-41-06-04-00`

## Existing validation

The repository exposes build, lint, ProtoKit smoke, harness, visual-match, live-player and object-review commands. None currently proves runtime behavior under clock regression, forward jumps, hidden-tab stalls, pause/resume or snapshot restore.

## Required fixtures

```txt
monotonic sample sequence
  produces strictly increasing clock revisions and bounded steps

backward Date.now adjustment
  does not stall publication, UI cadence or ooze simulation

forward Date.now adjustment
  does not trigger gameplay catch-up or immediate decay

large RAF/performance delta
  obeys step-count and CPU-time budgets
  reports simulated, deferred and dropped time

pause interval
  freezes simulation time and random consumption

resume interval
  allocates a new resume generation
  avoids catch-up burst
  acknowledges the first resumed frame

reset interval
  allocates a new clock generation
  rejects predecessor callbacks and snapshots

snapshot roundtrip
  preserves simulation step and elapsed time
  treats UTC as observation only

render parity
  camera, world, minimap, debug and snapshot cite one clock revision

browser smoke
  monkey-patched wall clock cannot change gameplay cadence
```

## Deployment gate

Do not claim deterministic timing, pause safety, replay continuity or cross-device temporal parity until the fixtures run in Node where possible and in a real browser for RAF, visibility, wall-clock adjustment and visible-frame correlation.

## Current result

```txt
runtime source changed: no
package scripts changed: no
workflow changed: no
clock fixtures available: no
browser clock smoke run: no
Pages smoke run: no
```
