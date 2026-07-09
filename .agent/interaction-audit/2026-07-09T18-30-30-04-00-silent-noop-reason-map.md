# Interaction Audit: Silent No-Op Reason Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T18-30-30-04-00`

## Current silent no-op map

`interactionRules.ts` currently returns the original state for these branches:

```txt
not playing
missing player
already carrying cube
no nearby loose cube
no carried cube
missing end anomaly cell
too far from anomaly
no free sequence slot
player already carrying when removing
no occupied slot
wrong slot requested
missing cube id from occupied slot
updateCube no-op
updateSequenceSlot no-op
```

`networkRules.ts` currently returns unchanged state for:

```txt
missing player update target
held cube already synced
request-sync
toggle-ready
cancel
unknown/default action
```

## Required reason families

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
unchanged:no-state-diff
unchanged:player-missing
unchanged:held-cube-already-synced
publish-only:request-sync
skipped:toggle-ready-policy-not-implemented
skipped:cancel-policy-not-implemented
skipped:unknown-action
victory:ordered-sequence-complete
```

## Next interaction target

Add preflight helpers beside the legacy rules. Keep old exports returning `result.state` until the fixture rows prove parity.
