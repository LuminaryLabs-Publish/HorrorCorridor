# Interaction Audit: Preflight Reason Row Freeze

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-11-35-04-00`

## Current interaction entrypoint

`GameCanvas` derives the interaction action from distance to the end anomaly and whether the local player is carrying a cube.

```txt
near anomaly + carrying -> place-cube-at-anomaly
near anomaly + not carrying -> remove-cube-from-anomaly
far from anomaly + carrying -> drop-cube
far from anomaly + not carrying -> pickup-cube
```

## Current problem

The interaction rules already contain the correct rejection checks, but those checks do not produce first-class results.

Every rejection returns unchanged `GameState`.

That makes runtime behavior hard to debug and impossible to fixture-prove through explicit reason rows.

## Preflight rows needed

```txt
not playing
missing player
already carrying
no nearby cube
no carried cube
missing anomaly cell
too far from anomaly
no free slot
no occupied slot
wrong slot
missing cube id
```

## Accepted rows needed

```txt
pickup near loose cube
drop carried cube
place carried cube into first open anomaly slot
place final anomaly slot and trigger victory
remove last occupied anomaly slot
player update for known player
held cube sync when cube is out of sync with holder pose
ooze spawn
ooze decay
```

## Skipped / unchanged rows needed

```txt
request-sync as publish-only recovery
toggle-ready skipped until lobby policy exists
cancel skipped until lobby policy exists
unknown action skipped with stable reason
missing player update unchanged
held cube already synced unchanged
ooze tick no-state-diff unchanged
```

## Preflight service target

```txt
interactionPreflight.ts
  -> inspect current state and command input
  -> select stable preflight status/reason
  -> return preflight facts without mutating state

interactionResultRules.ts
  -> call preflight
  -> call legacy mutation only for accepted rows
  -> wrap before/after summary and changed flag
  -> preserve legacy exports by returning result.state
```

## Acceptance guardrail

A fixture row is not complete unless it proves:

```txt
fixture id
seed id
command id
command source
command type
expected reason
expected changed flag
expected publish decision
expected slot facts
expected cube ownership
expected held cube state
expected final victory state
```
