# HorrorCorridor Ooze Random Draw Command Result Map

**Timestamp:** `2026-07-16T02-40-29-04-00`

## Summary

The current ooze update is a direct function call with optional RNG injection, not a versioned command/result boundary. Random draws and the resulting state mutation therefore have no admission, rejection, receipt or replay identity.

## Plan ledger

**Goal:** settle every ooze step and random draw through typed results tied to expected run, stream, trail and host-tick revisions.

- [x] Map current call and mutation surfaces.
- [x] Define command identity and expected revisions.
- [x] Define accepted and rejected terminal results.
- [x] Define visible-frame acknowledgement.
- [ ] Implement and validate the result chain.

## Current map

```txt
GameCanvas
  -> advanceOozeTrail(state, { nowMs, playerPositions })
  -> decayOozeTrail
  -> resolveRng(undefined)
  -> Math.random
  -> spawnOozeTrail
  -> Math.random
  -> direct next GameState
  -> publishAuthoritativeState
```

## Target command map

```txt
OozeSimulationStepCommand
  commandId
  runGeneration
  seedValue
  rngAlgorithmVersion
  oozeStreamId
  expectedRngRevision
  expectedTrailRevision
  expectedHostTickRevision
  admittedTimeRevision
  playerPositionRevision

  -> OozeRandomDrawCommand[]
       drawId
       purpose: decay-survival | spawn-height | spawn-rotation
       expectedCursor

  -> OozeRandomDrawResult
       accepted | stale | exhausted | retired | algorithm-mismatch
       value
       priorCursor
       nextCursor
       nextRngRevision

  -> OozeSimulationStepResult
       accepted | stale | generation-mismatch | trail-mismatch |
       tick-mismatch | retired | failed
       nextTrailRevision
       nextRngRevision
       nextCursor
       drawCount
       canonicalOozeHash
```

## Replay map

```txt
OozeReplayCommand
  -> bind saved run seed algorithm stream cursor and command log
  -> re-execute accepted steps in order
  -> compare checkpoint hashes
  -> publish OozeReplayResult
       equivalent | divergent | incomplete | incompatible | failed
```

## Frame settlement

```txt
accepted OozeSimulationStepResult
  -> authoritative snapshot publication
  -> world and minimap projection
  -> FirstSeedBoundOozeFrameAck
```

## Required rejection behavior

```txt
stale stream cursor: do not mutate
stale trail revision: do not mutate
wrong run generation: do not mutate
retired run: do not mutate
algorithm mismatch on restore: reject or migrate explicitly
duplicate commandId: return prior result without drawing again
```

No command/result implementation or executable fixture exists in the current source.