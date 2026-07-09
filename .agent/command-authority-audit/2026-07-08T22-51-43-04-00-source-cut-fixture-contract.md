# HorrorCorridor Source Cut Fixture Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T22-51-43-04-00`

## Contract goal

Create a source-backed command authority seam before changing browser runtime behavior.

The browser should keep existing solo, host, client, renderer, minimap, and debug behavior until the fixture proves command result parity.

## Required source modules

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureRows.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## CommandEnvelope fields

```txt
commandId
source: local | host | client | fixture
messageType: player-update | try-interact | local-interact | sync-held-cubes | ooze-tick | request-sync | lobby-policy
action
playerId
cubeId
slotId
issuedAtMs
fixtureId
```

## CommandResult fields

```txt
command
status: accepted | rejected | unchanged | skipped | publish-only | victory
reason
beforeSummary
afterSummary
state
changed
events
diagnostics
legacyState
```

## PublishDecision fields

```txt
decision: publish | skip | no-op | recovery | victory
snapshotReason
shouldBroadcast
shouldCommitVictory
shouldUpdateLocalSnapshot
shouldRecordDebug
reason
```

## CommandJournalEntry fields

```txt
journalId
sequence
commandId
status
reason
publishDecision
changed
snapshotReason
consumer
recordedAtMs
summary
```

## RuntimeDebugCommandProjection fields

```txt
latestCommandResult
latestCommandReason
latestCommandStatus
latestPublishDecision
latestSnapshotReason
latestConsumerAction
journalCounts
latestFixtureParity
```

## Reason catalog minimum

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

## Consumer acceptance rules

```txt
local accepted changed -> publish
local victory -> publish + commit victory
local rejected -> skip publish
local unchanged -> no-op
host accepted player update -> publish
host accepted TRY_INTERACT -> publish
host rejected TRY_INTERACT -> skip publish
host request-sync -> recovery/full-sync
host skipped lobby policy -> skip publish
host unknown action -> skip publish
```

## Compatibility rule

Keep these legacy exports returning `GameState` while adding result-returning siblings:

```txt
pickUpCube
dropCube
placeCubeAtEndAnomaly
removeCubeFromEndAnomaly
syncHeldCubesToPlayers
applyNetworkPlayerUpdate
applyNetworkInteractionRequest
```

## Fixture proof requirement

The fixture must run without DOM, canvas, PeerJS, Three.js, pointer-lock, React, or browser storage.

It must prove accepted, rejected, unchanged, skipped, publish-only, recovery, and victory rows from canonical seed states.
