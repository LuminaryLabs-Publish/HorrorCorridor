# HorrorCorridor Fixture Runner Acceptance Queue

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T15:49:18-04:00`

## Purpose

This audit narrows the next implementation to the first source-backed command proof.

The next pass should create a DOM-free fixture runner before changing `GameCanvas.tsx` behavior.

## Required source queue

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Legacy adapter rule

Keep the current `GameState`-returning exports stable until the fixture passes.

```txt
pickUpCube(state, input) -> GameState
pickUpCubeResult(state, input, envelope) -> CommandResult

applyNetworkInteractionRequest(state, input) -> GameState
applyNetworkInteractionRequestResult(state, input, envelope) -> CommandResult
```

The legacy exports should delegate to the result exports only when that can be done without changing existing behavior.

## Command result status set

```txt
accepted
rejected
unchanged
publish-only
skipped
victory
```

## Required reason families

```txt
accepted:pickup
accepted:drop
accepted:place
accepted:remove
accepted:player-update
accepted:held-cube-sync
accepted:ooze-tick
victory:ordered-sequence-complete
rejected:not-playing
rejected:missing-player
rejected:already-carrying
rejected:no-nearby-cube
rejected:no-carried-cube
rejected:missing-anomaly-cell
rejected:too-far-from-anomaly
rejected:no-free-slot
rejected:no-occupied-slot
rejected:wrong-slot
rejected:missing-cube-id
unchanged:player-missing
unchanged:held-cube-already-synced
unchanged:no-state-diff
publish-only:request-sync
skipped:toggle-ready-policy-not-implemented
skipped:cancel-policy-not-implemented
skipped:unknown-action
```

## Fixture runner acceptance matrix

```txt
[ ] accepted pickup near loose cube
[ ] rejected pickup while already carrying
[ ] rejected pickup with no nearby cube
[ ] accepted drop while carrying
[ ] rejected drop without carried cube
[ ] accepted place near anomaly with carried cube
[ ] accepted place final anomaly slot as victory
[ ] rejected place too far from anomaly
[ ] rejected place with no free slot
[ ] accepted remove last anomaly cube
[ ] rejected remove wrong slot
[ ] publish-only request-sync recovery
[ ] skipped toggle-ready
[ ] skipped cancel
[ ] skipped unknown action
[ ] accepted player update
[ ] unchanged player update for missing player
[ ] accepted held-cube sync
[ ] unchanged held-cube already synced
[ ] ooze tick spawn
[ ] ooze tick decay
[ ] ooze tick no-state-diff
[ ] victory ordered-sequence completion
[ ] local consumer skips rejected/no-op broadcast
[ ] local consumer publishes accepted changed/victory
[ ] host consumer skips rejected TRY_INTERACT broadcast
[ ] host consumer publishes request-sync recovery
```

## Fixture output contract

```txt
fixtureId
commandId
source
playerId
action
status
reason
changed
publishDecision
shouldBroadcast
shouldCommitVictory
snapshotReason
eventKinds
journalCounts
localConsumerAction
hostConsumerAction
beforeSummary
afterSummary
normalizedVolatileFields
passed
```

## Acceptance command

```txt
node scripts/horror-corridor-command-fixture.mjs
```

Only after this passes should `package.json`, `runtimeDebugStore.ts`, and `GameCanvas.tsx` be wired to consume the command result metadata.
