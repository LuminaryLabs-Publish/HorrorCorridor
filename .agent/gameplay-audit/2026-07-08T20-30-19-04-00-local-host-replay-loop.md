# HorrorCorridor Local Host Replay Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T20-30-19-04-00`

## Purpose

This gameplay audit isolates the current player loop and the target replay loop for the next command authority pass.

## Current player loop

```txt
start session
  -> initialize authoritative snapshot
  -> mount GameCanvas
  -> player enters pointer-lock first-person control
  -> WASD/arrow movement advances local pose through collision
  -> interact key derives one of pickup/drop/place/remove from position + carry state
  -> cube state mutates through interactionRules
  -> sequence slots validate with winRules
  -> ooze advances on authoritative cadence
  -> host/local publishes full replicated snapshot
  -> render, minimap, HUD, and debug consume snapshot
```

## Current host loop

```txt
host receives PLAYER_UPDATE
  -> applyNetworkPlayerUpdate
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState("resync")

host receives TRY_INTERACT
  -> applyNetworkInteractionRequest
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState("resync" or "recovery")
  -> commitVictory if gameState is victory
```

## Current gameplay gap

The gameplay loop has real mechanics, but the reasons behind a failed or skipped command are invisible.

For example:

```txt
pickup while carrying -> unchanged GameState only
pickup far from cube -> unchanged GameState only
place too far from anomaly -> unchanged GameState only
request-sync -> unchanged GameState but should be recovery publish-only
unknown action -> unchanged GameState but should be skipped:unknown-action
```

## Target replay loop

```txt
FixtureSeedState
  -> CommandEnvelope
  -> apply result-returning rule
  -> CommandResult
  -> PublishDecision
  -> CommandJournal append
  -> local or host consumer decision
  -> optional RuntimeDebugCommandProjection
  -> final snapshot summary
  -> deterministic fixture parity assertion
```

## Required seed rows

```txt
seed:near-loose-cube
seed:already-carrying
seed:no-nearby-cube
seed:carrying-near-anomaly
seed:carrying-far-from-anomaly
seed:anomaly-full
seed:anomaly-with-last-slot
seed:wrong-slot
seed:missing-player
seed:request-sync
seed:toggle-ready
seed:cancel
seed:unknown-action
seed:held-cube-synced
seed:held-cube-unsynced
seed:ooze-tick-spawn
seed:ooze-tick-decay
seed:victory-ready-sequence
```

## Acceptance rule

Each row must assert gameplay facts, not just object identity.

Required assertions:

```txt
cube holder
cube visible/active/locked flags
sequence slot occupancy
player pose facts
snapshot tick behavior
victory state
publish decision
consumer action
journal count
```

## Stop line

Stop after gameplay command replay is fixture-safe.

Do not add new mechanics, enemies, visual dressing, map features, or UI complexity before this proof exists.
