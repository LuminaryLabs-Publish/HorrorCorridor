# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-09T06-59-46-04-00`

## Selection gap handled in this pass

```txt
- the full accessible LuminaryLabs-Publish repo list was checked.
- TheCavalryOfRome was excluded.
- all checked non-Cavalry repos were tracked in the central repo ledger.
- sampled root .agent state existed for the checked non-Cavalry repos.
- HorrorCorridor was selected because central tracking lagged repo-local .agent state and command authority remains unresolved.
```

## Authority gaps

```txt
- interactionRules returns GameState only.
- networkRules returns GameState only.
- invalid player, invalid cube, invalid slot, wrong distance, wrong state, and already-carrying paths all collapse to unchanged state.
- request-sync, toggle-ready, cancel, and unknown defaults return unchanged state without structured reason data.
- GameCanvas local authority treats nextState === currentGameState as the rejection signal.
- host TRY_INTERACT always publishes after applyNetworkInteractionRequest, except recovery reason changes for request-sync.
- no stable CommandResult exists for fixtures, consumers, runtime debug, or future multiplayer diagnostics.
```

## Runtime debug gaps

```txt
- runtime debug frames expose pose, input, snapshot counts, cube records, anomaly slots, cadence, and scene dressing.
- runtime debug frames do not expose latest command result.
- runtime debug frames do not expose latest publish decision.
- runtime debug frames do not expose command journal counters.
- runtime debug events contain free-form payloads, not stable reason/catalog rows.
```

## Gameplay proof gaps

```txt
- no DOM-free command-result fixture exists.
- no canonical fixture seed states exist.
- no rejected/no-mutation parity table exists.
- no accepted changed-state parity table exists.
- no request-sync publish-only/recovery proof exists.
- no victory transition fixture exists.
```

## Rendering gaps

```txt
- render shell is good enough for the next source pass.
- minimap is good enough for the next source pass.
- scene dressing is already summarized in runtime debug.
- do not spend the next pass on art, lighting, or renderer extraction.
```

## Deployment gaps

```txt
- package.json has validation scripts, but no command-result fixture script yet.
- no local validation was run in this documentation pass.
- browser multiplayer validation was not run in this documentation pass.
```
