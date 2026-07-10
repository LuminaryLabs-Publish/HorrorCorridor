# Gameplay Audit: Local Host Command Debug Loop

## Current gameplay loop

```txt
solo/local host
  -> derive interaction action from carried cube + anomaly distance
  -> applyNetworkInteractionRequest(state, input)
  -> if nextState === state, return silently
  -> otherwise publish replicated snapshot

client
  -> send TRY_INTERACT
  -> host applies applyNetworkInteractionRequest
  -> host publishes full sync or recovery by implicit branch

ooze/victory
  -> advanceOozeTrail returns GameState
  -> validateOrderedSequenceCompletion returns GameState
```

## Gap

The loop has gameplay behavior but no command proof.

Missing rows:

```txt
accepted pickup/drop/place/remove
rejected not-ready / missing-player / already-carrying / too-far / no-slot / wrong-slot
skipped request-sync / toggle-ready / cancel / unknown action
publish-only recovery
accepted player update
unchanged held cube sync
ooze spawn / decay / no-state-diff
victory completion / rollback
```

## Next loop

```txt
CommandEnvelope
  -> preflight/result wrapper
  -> PublishDecision
  -> CommandJournal
  -> RuntimeDebugCommandProjection
  -> fixture row assertion
  -> GameCanvas consumer splice
```
