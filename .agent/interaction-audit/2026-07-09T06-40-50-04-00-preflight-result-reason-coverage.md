# HorrorCorridor Interaction Preflight Result Reason Coverage

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-40-50-04-00`

## Current interaction source

`interactionRules.ts` owns pickup, drop, place-at-anomaly, and remove-from-anomaly as `GameState` transforms.

`networkRules.ts` dispatches interaction actions and returns unchanged state for request-sync, toggle-ready, cancel, and default actions.

## Preflight checks needed

```txt
shared interaction preflight
-> gameState === playing
-> player exists
-> carried cube exists or does not exist as required
-> loose cube candidates are active, unlocked, visible, and unheld
-> cube id, when provided, resolves to a reachable cube
-> anomaly cell exists
-> player is close enough to anomaly
-> free slot exists for place
-> occupied slot exists for remove
-> requested slot matches removable slot
```

## Current silent no-op branches

```txt
not playing
missing player
pickup while already carrying
pickup with no nearby cube
drop without carried cube
place without carried cube
place without anomaly cell
place too far from anomaly
place with no free slot
remove while carrying
remove without anomaly cell
remove too far from anomaly
remove with no occupied slot
remove wrong slot
missing cube id / unresolved cube id
request-sync
toggle-ready
cancel
unknown/default action
```

## Result reason coverage target

Every silent branch should become one of:

```txt
accepted:* -> state changed or accepted unchanged
rejected:* -> user/gameplay invalid command
unchanged:* -> valid command but no data changed
publish-only:* -> no state mutation but host should recover/sync
skipped:* -> intentionally ignored policy/action
victory:* -> accepted command completed the sequence
```

## Acceptance rules

```txt
[ ] interactionPreflight returns stable reason and normalized target ids.
[ ] interactionResultRules returns CommandResult and keeps legacy wrappers.
[ ] networkResultRules classifies request-sync, toggle-ready, cancel, and unknown action.
[ ] fixture rows prove no mutation for rejected/skipped cases.
[ ] fixture rows prove exact cube/slot mutation for accepted place/remove/drop/pickup.
```
