# Interaction Audit - Preflight Reason Matrix

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`
**Timestamp:** `2026-07-09T03-59-03-04-00`

## Current interaction sources

```txt
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
```

## Interaction commands

```txt
pickup-cube
drop-cube
place-cube-at-anomaly
remove-cube-from-anomaly
request-sync
toggle-ready
cancel
unknown/default
```

## Reason matrix

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

## Next action

Build `interactionPreflight.ts` and result-returning interaction wrappers while preserving the current legacy functions as adapters returning `result.state`.
