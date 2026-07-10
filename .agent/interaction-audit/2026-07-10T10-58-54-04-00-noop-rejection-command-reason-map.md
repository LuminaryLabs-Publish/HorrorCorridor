# Interaction Audit: No-op Rejection Command Reason Map

**Timestamp:** `2026-07-10T10-58-54-04-00`

## Current interaction seam

`interactionRules.ts` returns unchanged state for many meaningful outcomes.

Examples:

```txt
not playing
missing player
already carrying
no nearby loose cube
no carried cube
not near anomaly
no free slot
wrong remove slot
missing cube or slot
```

## Current network seam

`networkRules.ts` returns unchanged state for:

```txt
missing player update
toggle-ready
cancel
unknown/default action
request-sync metadata-free recovery path
already synced held cube
```

## Missing reason map

The next pass should map every no-op, rejection, skip, recovery, and victory path to a stable `CommandReason` before GameCanvas behavior changes.

## Next fixture cases

```txt
accepted pickup near loose cube
rejected pickup while carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly with carried cube
accepted place final slot as victory
rejected place too far from anomaly
rejected place with no free slot
accepted remove last anomaly cube
rejected remove wrong slot
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged player update for missing player
accepted held cube sync
unchanged held cube already synced
ooze spawn / decay / no-state-diff
victory complete / rollback
```
