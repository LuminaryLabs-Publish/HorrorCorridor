# HorrorCorridor Oldest-Selection Minimap Reconciliation

**Timestamp:** `2026-07-15T11-39-04-04-00`

## Summary

All ten eligible Publish repositories retained central ledgers, root `.agent` state and synchronized repo-local documentation heads. HorrorCorridor had the oldest eligible central timestamp and was selected alone. Cavalry of Rome remained excluded.

## Plan ledger

**Goal:** record the selection proof and provide the exact central reconciliation payload for the minimap backing-store audit.

- [x] Enumerate the full 11-repository Publish inventory.
- [x] Exclude Cavalry of Rome.
- [x] Confirm ten central ledger entries.
- [x] Confirm ten root `.agent` states.
- [x] Compare current heads with documented heads.
- [x] Confirm no higher-priority new, missing, undocumented or runtime-ahead repository.
- [x] Select only HorrorCorridor.
- [x] Prepare repo-local audit state.
- [ ] Bind the final repo-local documentation head in the central ledger.
- [ ] Create the central internal change-log entry.

## Selection table

```txt
HorrorCorridor      2026-07-15T07-00-28-04-00 selected
TheOpenAbove        2026-07-15T07-39-52-04-00
ZombieOrchard       2026-07-15T08-26-01-04-00
TheUnmappedHouse    2026-07-15T08-28-25-04-00
PhantomCommand      2026-07-15T08-41-37-04-00
AetherVale          2026-07-15T09-00-08-04-00
TheLongHaul         2026-07-15T09-40-51-04-00
MyCozyIsland        2026-07-15T10-01-08-04-00
IntoTheMeadow       2026-07-15T10-40-17-04-00
PrehistoricRush     2026-07-15T10-58-45-04-00
TheCavalryOfRome    excluded
```

## Central payload

```txt
repository: LuminaryLabs-Publish/HorrorCorridor
status: minimap-backing-store-dpr-resize-authority-central-reconciled
technical status: minimap-backing-store-dpr-resize-authority-audited
retained current status: audio-event-projection-authority-central-reconciled
implemented kits: 29
browser-proof adapters: 2
total implemented surfaces: 31
planned minimap authority surfaces: 18
```

## Main finding

The minimap compares integer `canvas.width` and `canvas.height` properties with raw floating-point `168 * devicePixelRatio` products. Effective DPR values that produce non-integral dimensions can keep the condition true after implicit integer conversion, permitting repeated backing-store and context-state resets on unchanged frames.

## Central files

```txt
repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
internal-change-log/2026-07-15T11-39-04-04-00-horror-corridor-minimap-backing-store-dpr.md
```

## Validation boundary

No central reconciliation is complete until the central files are committed and the final repo-local documentation head is recorded.