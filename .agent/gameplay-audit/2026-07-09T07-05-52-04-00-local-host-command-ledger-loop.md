# HorrorCorridor Local/Host Command Ledger Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T07-05-52-04-00`

## Current gameplay loop

```txt
player enters PLAYING screen
-> pointer lock / keyboard / mouse look update input state
-> movement integration resolves against maze collision
-> interact key derives action from distance-to-end and carried-cube state
-> applyNetworkInteractionRequest dispatches pickup/drop/place/remove/request-sync/toggle-ready/cancel/default
-> interactionRules mutates cubes and sequence slots or returns the same GameState
-> validateOrderedSequenceCompletion can move gameState to victory
-> host/local tick advances ooze cadence and publishes authoritative snapshot
-> renderer/minimap/HUD consume replicated snapshot
```

## Gameplay authority issue

The current loop is playable but not auditable enough for deterministic command replay.

`GameCanvas` treats object identity as a publish gate on local interaction.

`networkRules` treats request-sync, toggle-ready, cancel, and unknown/default actions as unchanged state.

`interactionRules` returns unchanged state for not-playing, missing player, already-carrying, missing cube, missing anomaly cell, too-far, no-slot, wrong-slot, and no-occupied-slot cases.

## Required command ledger loop

```txt
local input or peer message
-> CommandEnvelope
-> CommandReasonCatalog
-> result-returning interaction/network wrapper
-> CommandResult
-> PublishDecision
-> CommandJournal append
-> local/host consumer action
-> optional authoritative snapshot publish
-> runtime debug command projection
-> replay fixture row assertion
```

## Required gameplay rows

```txt
accepted pickup near loose cube
rejected pickup while carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly
accepted final place as victory
rejected place too far
rejected place no free slot
accepted remove last occupied slot
rejected remove wrong slot
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged missing-player update
accepted held-cube sync
unchanged held-cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
victory ordered sequence completion
```

## Consumer acceptance

```txt
[ ] local consumer journals rejected/no-op commands without publishing.
[ ] local consumer publishes accepted changed commands.
[ ] local consumer commits explicit victory decisions.
[ ] host consumer skips rejected TRY_INTERACT broadcast.
[ ] host consumer publishes request-sync recovery.
[ ] host consumer keeps legacy snapshot compatibility.
[ ] GameCanvas splice waits until the DOM-free fixture passes.
```
