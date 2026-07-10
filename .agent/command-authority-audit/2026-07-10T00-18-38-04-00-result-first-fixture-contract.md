# Command Authority Audit: Result-First Fixture Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T00-18-38-04-00`

## Contract objective

Add result-first command authority without breaking the current playable route.

The first implementation should add wrappers and fixtures beside the existing rules, not replace `GameCanvas` first.

## Required command contract

```txt
CommandEnvelope
  -> id
  -> source local | host | client | fixture
  -> playerId
  -> action
  -> cubeId
  -> slotId
  -> timestampMs
```

```txt
CommandResult
  -> command
  -> status accepted | rejected | skipped | publish-only
  -> reason
  -> before summary
  -> after summary
  -> changed
  -> events
  -> state
```

```txt
PublishDecision
  -> kind publish | skip | recovery | no-op | victory
  -> reason
  -> shouldBroadcast
  -> shouldCommitVictory
  -> syncReason
```

## Fixture matrix

```txt
pickup accepted
pickup rejected already-carrying
pickup rejected no-nearby-cube
drop accepted
drop rejected no-carried-cube
place accepted
place accepted victory
place rejected too-far
place rejected no-slot
remove accepted
remove rejected no-slot
remove rejected wrong-slot
player update accepted
player update missing-player unchanged
held cube sync accepted
held cube sync unchanged
request-sync recovery publish-only
toggle-ready skipped
cancel skipped
unknown action skipped
ooze spawn
ooze decay
ooze no-state-diff
win sequence complete
local consumer skip rejected/no-op
host consumer skip rejected TRY_INTERACT
runtime debug command projection row
```

## Next files

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
HorrorCorridor-V1/src/features/game-state/domain/oozeResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winResultRules.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Stop condition

Stop after DOM-free command fixture rows prove parity.

Do not continue into visual or network extraction in the same cut.
