# Gameplay Audit: Local/Host Result Authority Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T00-18-38-04-00`

## Gameplay loop today

```txt
player presses interact
  -> GameCanvas derives action from distance-to-end and carried cube state
  -> local solo/host calls applyNetworkInteractionRequest
  -> client sends TRY_INTERACT
  -> host calls applyNetworkInteractionRequest
  -> pickup/drop/place/remove return GameState only
  -> unchanged state means silent rejection or no-op
  -> accepted changed state gets synced and published
  -> victory is inferred after state mutation
```

## Host network loop today

```txt
PLAYER_UPDATE
  -> applyNetworkPlayerUpdate
  -> missing player returns unchanged GameState
  -> changed player state publishes resync

TRY_INTERACT
  -> applyNetworkInteractionRequest
  -> request-sync returns unchanged GameState
  -> toggle-ready returns unchanged GameState
  -> cancel returns unchanged GameState
  -> default returns unchanged GameState
  -> host publishes recovery or resync by implicit action check
```

## Gameplay result gap

```txt
no CommandEnvelope
no CommandResult
no CommandReason
no PublishDecision
no command journal
no local-authority consumer
no host-authority consumer
no explicit victory result
no ooze result rows
no DOM-free fixture matrix
```

## Required result statuses

```txt
accepted.changed
accepted.unchanged
rejected.invalid-state
rejected.missing-player
rejected.already-carrying
rejected.no-nearby-cube
rejected.no-carried-cube
rejected.too-far-from-anomaly
rejected.no-free-slot
rejected.wrong-slot
skipped.request-policy-missing
publish-only.request-sync-recovery
victory.sequence-complete
```

## Next gameplay files

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
```

## Finding

Gameplay should not be expanded until accepted/rejected/unchanged/victory paths are explicit command results with fixture coverage.
