# Interaction Audit: Silent No-op Reason Fixture Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T00-18-38-04-00`

## Silent no-op branches confirmed

`interactionRules.ts` returns unchanged state for many branches that need explicit reasons.

## Pickup reasons needed

```txt
rejected.game-not-playing
rejected.player-missing
rejected.player-already-carrying
rejected.cube-missing
rejected.cube-too-far
accepted.pickup-cube
```

## Drop reasons needed

```txt
rejected.game-not-playing
rejected.player-missing
rejected.no-carried-cube
accepted.drop-cube
```

## Place reasons needed

```txt
rejected.game-not-playing
rejected.player-missing
rejected.no-carried-cube
rejected.anomaly-missing
rejected.too-far-from-anomaly
rejected.no-free-slot
accepted.place-cube
victory.sequence-complete
```

## Remove reasons needed

```txt
rejected.game-not-playing
rejected.player-missing
rejected.player-already-carrying
rejected.anomaly-missing
rejected.too-far-from-anomaly
rejected.no-occupied-slot
rejected.wrong-slot
accepted.remove-cube
```

## Network reasons needed

```txt
accepted.player-update
unchanged.player-missing
accepted.held-cube-sync
unchanged.held-cube-sync
publish-only.request-sync
skipped.toggle-ready
skipped.cancel
skipped.unknown-action
```

## Fixture rule

Every unchanged state returned by an interaction/network wrapper must carry a stable reason.

The legacy `GameState` exports can remain, but result-returning wrappers should be the source of truth for the next consumer splice.
