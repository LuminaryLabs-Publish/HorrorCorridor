# Simulation and Render Clock Provenance Gap

**Timestamp:** `2026-07-12T07-41-06-04-00`

## Finding

`createAnimationLoop()` supplies requestAnimationFrame `timeMs` as render elapsed time and derives `deltaMs` from successive RAF timestamps. `GameCanvas` separately calls `Date.now()` for cadence, authoritative timestamps, room updates, completion and ooze advancement.

```txt
camera shake and world animation
  -> RAF elapsedMs

authoritative snapshot and ooze state
  -> Date.now()
```

No frame receipt records the temporal authority used by each consumer.

## Visible divergence paths

```txt
wall clock moves backward
  -> snapshot publication and ooze cadence can stall
  -> RAF camera/world animation continues
  -> visible environment advances around stale authoritative state

wall clock moves forward
  -> cadence and decay become immediately eligible
  -> authoritative state can jump
  -> render elapsed remains on the RAF timeline

pause or hidden-tab interval
  -> simulation admission follows route policy
  -> RAF origin and wall-clock age follow different continuity rules
  -> resumed frame has no shared clock revision
```

## Missing evidence

```txt
runtime clock ID
clock revision
simulation step ID
simulation elapsed time
render time projection
wall-clock observation separated from authority
clock discontinuity result
pause/reset generation
frame-to-clock receipt
```

## Required render contract

Every camera, world, minimap, debug and post-processing frame must receive one immutable render-time projection derived from the committed runtime clock. The visible frame acknowledgement must cite the same clock revision and simulation step as the snapshot it represents.
