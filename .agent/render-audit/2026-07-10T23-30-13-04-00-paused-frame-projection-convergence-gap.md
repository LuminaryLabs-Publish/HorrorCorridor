# HorrorCorridor Paused Frame Projection Convergence Gap

**Timestamp:** `2026-07-10T23-30-13-04-00`

## Current render behavior

The animation loop continues running while the local UI is paused. It skips local simulation when `uiState.screen !== PLAYING`, but still renders the latest snapshot through the `snapshot-replay` path.

```txt
PAUSED local screen
  -> RAF continues
  -> latest snapshot selected
  -> local pose may be overwritten from snapshot
  -> world and minimap update
  -> post-processing renders
  -> no committed pause revision or source attribution exists
```

Rendering during pause is reasonable, but the renderer cannot prove whether the displayed frame corresponds to:

```txt
local UI pause
host-global pause
client-local overlay pause
stale pre-pause snapshot
new active snapshot that implicitly resumed the client
```

## Source-backed gaps

1. Paused frames have no `pauseRevision`, `pausePolicy`, `authoritySource`, or terminal transition result.
2. The frame debug row records local screen and pointer lock but not replicated pause state or projection parity.
3. Client SYNC handling can switch the UI back to PLAYING before the next frame without a visible resume result.
4. Host UI can remain paused while remote commands cause new active snapshots and world changes.
5. Minimap, world, HUD, and UI overlay can consume different notions of pause during the same browser interval.
6. The renderer has no first-frame acknowledgement for an accepted pause or resume transaction.
7. No fixture proves that the first paused frame, last paused frame, and first resumed frame share the expected command/result identity.

## Required render observation

```txt
frameId
renderedAtMs
snapshotTick
snapshotTimestampMs
roomId
gameId
sessionEpoch
pauseRevision
pausePolicy
pauseAuthoritySource
pauseResultId
localScreen
replicatedAppState
replicatedGameState
simulationAdmitted
inputSuspended
pointerLocked
projectionParity
```

## Required invariants

```txt
accepted global pause -> no later frame claims active simulation under the same revision
accepted local-overlay pause -> frame explicitly identifies local-only policy
client active SYNC cannot silently erase a local pause without a resume result
host paused frame cannot consume remote gameplay mutation unless policy allows it
first resumed frame references the accepted resume result
world, minimap, HUD, and overlay agree on the same pause projection
all render observations are JSON-safe and detached from Three.js objects
```

## Candidate services

```txt
paused-frame-observation-kit
pause-frame-ack-kit
render-source-attribution-kit
pause-projection-parity-kit
pause-render-debug-kit
```

## Validation gate

`fixture:pause-convergence` must emit deterministic frame-consumption rows. Browser smoke should then verify host-global pause, client-local pause policy, pointer-lock pause, and accepted resume without changing visual composition.