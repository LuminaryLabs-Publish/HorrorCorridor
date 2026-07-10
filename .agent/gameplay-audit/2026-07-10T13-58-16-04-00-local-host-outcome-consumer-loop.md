# HorrorCorridor Gameplay Audit: Local and Host Outcome Consumer Loop

**Timestamp:** `2026-07-10T13-58-16-04-00`

## Player-facing loop

```txt
navigate maze
  -> find colored cubes
  -> pick up or drop cube
  -> carry cube to end anomaly
  -> place cubes in ordered slots
  -> remove incorrect last slot when needed
  -> manage growing ooze pressure
  -> complete ordered sequence
  -> reach victory route
```

## Current local authority loop

```txt
interact key
  -> derive action from carried cube and anomaly distance
  -> applyNetworkInteractionRequest(state, input)
  -> compare nextState identity with state
  -> changed: publish/update
  -> unchanged: return silently
```

## Current host authority loop

```txt
peer message
  -> PLAYER_UPDATE or TRY_INTERACT
  -> apply GameState-returning network/interaction rule
  -> infer publication from state and message path
  -> publish authoritative state with reason string
```

## Current cadence loops

```txt
ooze tick
  -> decay if interval elapsed
  -> spawn if spacing and capacity permit
  -> return GameState

sequence update
  -> validate ordered occupied slots
  -> set completion/victory or rollback
  -> return GameState
```

## Gameplay ambiguity

A returned original state currently means several different gameplay outcomes:

```txt
player not found
not in playing state
already carrying
no nearby cube
not carrying
outside anomaly distance
no available slot
wrong removal slot
decay interval not elapsed
ooze spacing guard
ooze capacity guard
skipped lobby action
unknown action
```

The player experience may be correct, but the host and diagnostics cannot distinguish these outcomes reliably.

## Target local consumer

```txt
CommandResult
  -> journal result
  -> rejected/skipped/no-op: keep state and do not broadcast
  -> accepted changed: apply and publish
  -> victory: apply, publish, route completion
  -> recovery/publish-only: publish without pretending gameplay mutation
```

## Target host consumer

```txt
CommandResult
  -> journal result
  -> rejected TRY_INTERACT: skip authoritative broadcast
  -> accepted changed: publish new snapshot
  -> accepted unchanged: explicit no-op
  -> request-sync: publish-only recovery
  -> skipped toggle-ready/cancel/unknown: retain reason
  -> victory: publish and preserve completion semantics
```

## Acceptance rule

No gameplay tuning belongs in this slice. Movement, collision, interaction distance, anomaly distance, cube ordering, ooze constants, and victory requirements must remain unchanged while command outcomes become observable.
