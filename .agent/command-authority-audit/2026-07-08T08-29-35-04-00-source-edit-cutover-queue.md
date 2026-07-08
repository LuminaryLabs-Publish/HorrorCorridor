# HorrorCorridor Source Edit Cutover Queue

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T08:29:35-04:00`

## Goal

Convert the already documented command-result fixture gate into an implementation queue that can be executed without destabilizing the current solo, host, client, renderer, minimap, debug overlay, or PeerJS behavior.

## Source facts checked

`interactionRules.ts` currently has pure mutation functions for:

```txt
pickUpCube
dropCube
placeCubeAtEndAnomaly
removeCubeFromEndAnomaly
```

Each function returns `GameState` and silently returns the input state for invalid branches.

`networkRules.ts` currently has:

```txt
syncHeldCubesToPlayers
applyNetworkPlayerUpdate
applyNetworkInteractionRequest
```

`applyNetworkInteractionRequest` routes pickup/drop/place/remove to interaction rules, but `request-sync`, `toggle-ready`, `cancel`, and default all return unchanged state without command metadata.

## Cutover principle

Do not replace the existing rule exports first.

Add result-returning wrappers beside the current rule functions, then keep legacy exports returning `result.state`.

This preserves the current game while adding a fixture-readable authority layer.

## Step 1 — command contract files

Create:

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
```

Required contracts:

```txt
CommandEnvelope
CommandSource
CommandStatus
CommandReason
CommandResult
PublishDecision
CommandEvent
CommandSnapshotSummary
CommandJournalSummary
```

Required status values:

```txt
accepted
rejected
unchanged
publish-only
skipped
victory
```

Required publish decision values:

```txt
publish
skip
recovery
no-op
victory
```

## Step 2 — interaction preflight split

Create:

```txt
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
```

Move only read-only helpers or duplicate read-only helper logic first:

```txt
isInteractionStateReady
findPlayer
findCarriedCube
findNearestLooseCube
getEndAnomalyCell
resolveEndAnomalyDistance
resolveTargetSlot
resolveLastOccupiedSlot
```

Preflight outputs must not mutate state.

Required preflight result families:

```txt
pickup: accepted / rejected:not-playing / rejected:missing-player / rejected:already-carrying / rejected:no-nearby-cube
drop: accepted / rejected:not-playing / rejected:missing-player / rejected:no-carried-cube
place: accepted / rejected:not-playing / rejected:missing-player / rejected:no-carried-cube / rejected:missing-anomaly-cell / rejected:too-far-from-anomaly / rejected:no-free-slot
remove: accepted / rejected:not-playing / rejected:missing-player / rejected:already-carrying / rejected:missing-anomaly-cell / rejected:too-far-from-anomaly / rejected:no-occupied-slot / rejected:wrong-slot / rejected:missing-cube-id
```

## Step 3 — interaction result wrappers

Create:

```txt
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
```

Required exports:

```txt
pickUpCubeResult(state, envelope)
dropCubeResult(state, envelope)
placeCubeAtEndAnomalyResult(state, envelope)
removeCubeFromEndAnomalyResult(state, envelope)
```

Implementation pattern:

```txt
preflight
-> rejected result if preflight fails
-> call existing interactionRules function if preflight accepts
-> compare nextState === state
-> accepted changed / accepted unchanged / victory result
```

Do not change current `interactionRules.ts` behavior in the first source pass.

## Step 4 — network result wrappers

Create:

```txt
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
```

Required exports:

```txt
syncHeldCubesToPlayersResult(state, envelope)
applyNetworkPlayerUpdateResult(state, envelope)
applyNetworkInteractionRequestResult(state, envelope)
```

Required mapping:

```txt
pickup-cube -> pickUpCubeResult
drop-cube -> dropCubeResult
place-cube-at-anomaly -> placeCubeAtEndAnomalyResult
remove-cube-from-anomaly -> removeCubeFromEndAnomalyResult
request-sync -> publish-only:request-sync
toggle-ready -> skipped:toggle-ready-policy-not-implemented
cancel -> skipped:cancel-policy-not-implemented
default -> skipped:unknown-action
```

Existing `networkRules.ts` should remain source-compatible during the first pass.

## Step 5 — publish decision helper

`publishDecisions.ts` must map:

```txt
accepted + changed -> publish
accepted + unchanged -> no-op
rejected -> skip
unchanged -> skip
publish-only:request-sync -> recovery
skipped -> skip
victory -> victory
```

Publish decisions must include:

```txt
decision
reason
shouldBroadcast
shouldJournal
shouldUpdateRuntimeStore
shouldEmitDebugEvent
```

## Step 6 — command journal

`commandJournal.ts` must track:

```txt
total
accepted
rejected
unchanged
publishOnly
skipped
victory
lastCommandId
lastReason
lastPublishDecision
```

Journal records must be serializable for fixture replay.

## Step 7 — DOM-free fixture script

Create:

```txt
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

The fixture must not import React, DOM, canvas, PeerJS, or browser-only APIs.

Required cases:

```txt
accepted pickup near loose cube
rejected pickup while already carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly with carried cube
accepted place final anomaly slot as victory
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
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
victory ordered-sequence completion
```

## Step 8 — runtime debug projection

Only after the fixture passes, wire:

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
commandJournalCounts
latestFixtureParity
```

into:

```txt
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

Do not change render behavior while doing this.

## Step 9 — GameCanvas consumer boundary

Only after fixture and debug projection pass, change `GameCanvas.tsx` to consume result metadata for local/host publish behavior.

Allowed behavior changes:

```txt
skip publish after rejected TRY_INTERACT
publish recovery after request-sync
publish victory after ordered sequence completion
journal local rejected commands
```

Forbidden in same pass:

```txt
PeerJS extraction
renderer extraction
minimap extraction
postprocess extraction
new objects
new levels
new scene dressing
route/deploy changes
```

## Acceptance command order

```txt
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
node scripts/horror-corridor-command-fixture.mjs
npm run validate:live-player:dev
npm run review:object-kit
```

## Stop line

Stop when source can prove:

```txt
accepted command -> result + publish decision
rejected command -> result + skip decision
unchanged command -> result + skip/no-op decision
request-sync -> publish-only result + recovery decision
toggle-ready/cancel/unknown -> skipped result + skip decision
victory -> victory result + victory decision
fixture replay -> parity pass/fail output
```

Do not continue into visual upgrade work during the command authority implementation pass.
