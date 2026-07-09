# Interaction Audit — Silent No-op Preflight Row Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T16-00-13-04-00`

## Current silent no-op classes

```txt
not playing
missing player
already carrying
no nearby cube
no carried cube
missing anomaly cell
too far from anomaly
no free anomaly slot
no occupied anomaly slot
wrong slot
missing cube id
request-sync returns unchanged state
toggle-ready returns unchanged state
cancel returns unchanged state
unknown/default returns unchanged state
missing player update returns unchanged state
held cube already synced returns unchanged state
```

## Required preflight outputs

```txt
status: accepted | rejected | unchanged | skipped | publish-only | victory
reason: stable CommandReason
changed: boolean
publishHint: publish | skip | recovery | no-op | victory
state: current or next GameState
events: serializable event list
diagnostics: serializable detail for debug/readback
```

## Row map

```txt
pickup near loose cube -> accepted:pickup -> publish
pickup while carrying -> rejected:already-carrying -> skip
pickup no nearby cube -> rejected:no-nearby-cube -> skip
drop while carrying -> accepted:drop -> publish
drop without carried cube -> rejected:no-carried-cube -> skip
place near anomaly -> accepted:place -> publish
place final solved slot -> victory:ordered-sequence-complete -> victory
place too far -> rejected:too-far-from-anomaly -> skip
place no free slot -> rejected:no-free-slot -> skip
remove last occupied slot -> accepted:remove -> publish
remove wrong slot -> rejected:wrong-slot -> skip
request-sync -> publish-only:request-sync -> recovery
toggle-ready -> skipped:toggle-ready-policy-not-implemented -> skip
cancel -> skipped:cancel-policy-not-implemented -> skip
unknown action -> skipped:unknown-action -> skip
player update known player -> accepted:player-update -> publish
player update missing player -> unchanged:player-missing -> no-op
held cube sync changed -> accepted:held-cube-sync -> publish
held cube sync unchanged -> unchanged:held-cube-already-synced -> no-op
```

## Consumer note

Local and host consumers should share this classification through helper functions.

`GameCanvas.tsx` should stop treating unchanged object identity as the only rejected/no-op signal after fixture proof exists.
