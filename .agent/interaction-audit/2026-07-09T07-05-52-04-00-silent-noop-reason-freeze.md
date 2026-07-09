# HorrorCorridor Silent No-Op Reason Freeze

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T07-05-52-04-00`

## Why this audit exists

The next source cut needs stable reason ids for every branch that currently returns unchanged `GameState`.

Those reasons are required before fixture rows can prove rejected, skipped, unchanged, publish-only, and victory behavior.

## Interaction reason families

```txt
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
```

## Network reason families

```txt
accepted:player-update
accepted:held-cube-sync
unchanged:player-missing
unchanged:held-cube-already-synced
publish-only:request-sync
skipped:toggle-ready-policy-not-implemented
skipped:cancel-policy-not-implemented
skipped:unknown-action
```

## Gameplay result families

```txt
accepted:pickup
accepted:drop
accepted:place
accepted:remove
accepted:ooze-tick
victory:ordered-sequence-complete
unchanged:no-state-diff
```

## Fixture coverage order

```txt
1. rejected pickup with no nearby cube
2. rejected pickup while already carrying
3. accepted pickup
4. accepted drop
5. rejected drop with no carried cube
6. accepted place
7. rejected place too far
8. accepted remove
9. rejected remove wrong slot
10. request-sync recovery
11. toggle-ready skipped
12. cancel skipped
13. unknown action skipped
14. player update accepted / unchanged
15. held-cube sync accepted / unchanged
16. ooze tick changed / unchanged
17. victory final place
```
