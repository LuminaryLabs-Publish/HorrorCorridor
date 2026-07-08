# HorrorCorridor Command Authority Result Reason Matrix

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T03:50:37-04:00`

## Purpose

This file is the implementation handoff for the next authority slice.

The repo is playable, but command handling still returns `GameState` only. Invalid, skipped, and publish-only command paths are therefore hard to distinguish in host sync, runtime debug, and replay fixtures.

## Source evidence

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Current command surfaces

```txt
local key input
-> GameCanvas.applyInteraction
-> action derived from distance-to-end and carried-cube state
-> applyNetworkInteractionRequest
-> interactionRules mutation helpers
-> identity check decides whether local authority publishes

client key input
-> GameCanvas.sendInteractionRequest
-> TRY_INTERACT peer message
-> host transport event handler
-> applyNetworkInteractionRequest
-> host publishes resync after TRY_INTERACT even when state is unchanged

client pose input
-> GameCanvas.sendPlayerUpdate
-> PLAYER_UPDATE peer message
-> host transport event handler
-> applyNetworkPlayerUpdate
-> host publishes resync

runtime debug
-> records frames and events
-> exports latest frame, frames, and events
-> does not yet export latest command result, reason, publish decision, journal counts, or fixture parity
```

## Required command result contract

```txt
CommandEnvelope
├─ commandId
├─ source: local | host-peer | client-peer | system
├─ playerId
├─ roomId
├─ action
├─ payload
└─ issuedAtMs

CommandResult
├─ commandId
├─ action
├─ status: accepted | rejected | unchanged | publish-only | skipped | victory
├─ reason
├─ changed: boolean
├─ beforeTick
├─ afterTick
├─ state
├─ events[]
├─ diagnostics
└─ publishDecision

PublishDecision
├─ mode: publish | skip | recovery | victory | no-op
├─ reason
├─ snapshotReason: initial | join | resync | reconnect | recovery
└─ shouldBroadcast
```

## Stable reason catalog

```txt
accepted:pickup
accepted:drop
accepted:place
accepted:remove
accepted:player-update
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

## Current silent no-op branches to classify

### `networkRules.ts`

```txt
applyNetworkPlayerUpdate
├─ missing player -> unchanged:player-missing
└─ accepted update -> accepted:player-update

applyNetworkInteractionRequest
├─ pickup-cube -> pickup result wrapper
├─ drop-cube -> drop result wrapper
├─ place-cube-at-anomaly -> place result wrapper
├─ remove-cube-from-anomaly -> remove result wrapper
├─ request-sync -> publish-only:request-sync
├─ toggle-ready -> skipped:toggle-ready-policy-not-implemented
├─ cancel -> skipped:cancel-policy-not-implemented
└─ default -> skipped:unknown-action
```

### `interactionRules.ts`

```txt
pickUpCube
├─ not playing -> rejected:not-playing
├─ missing player -> rejected:missing-player
├─ already carrying -> rejected:already-carrying
├─ no nearby loose cube -> rejected:no-nearby-cube
└─ accepted -> accepted:pickup

dropCube
├─ not playing -> rejected:not-playing
├─ missing player -> rejected:missing-player
├─ no carried cube -> rejected:no-carried-cube
└─ accepted -> accepted:drop

placeCubeAtEndAnomaly
├─ not playing -> rejected:not-playing
├─ missing player -> rejected:missing-player
├─ no carried cube -> rejected:no-carried-cube
├─ missing anomaly cell -> rejected:missing-anomaly-cell
├─ too far from anomaly -> rejected:too-far-from-anomaly
├─ no free requested/default slot -> rejected:no-free-slot
├─ accepted but sequence incomplete -> accepted:place
└─ accepted and sequence complete -> victory:ordered-sequence-complete

removeCubeFromEndAnomaly
├─ not playing -> rejected:not-playing
├─ missing player -> rejected:missing-player
├─ already carrying -> rejected:already-carrying
├─ missing anomaly cell -> rejected:missing-anomaly-cell
├─ too far from anomaly -> rejected:too-far-from-anomaly
├─ no occupied slot -> rejected:no-occupied-slot
├─ requested slot is not last occupied slot -> rejected:wrong-slot
├─ occupied slot missing cube id -> rejected:missing-cube-id
└─ accepted -> accepted:remove
```

## Consumer behavior matrix

```txt
accepted + changed
-> journal result
-> publish resync
-> update runtime debug latestCommandResult

rejected
-> journal result
-> skip publish
-> update runtime debug latestCommandResult and latestRejectionReason

unchanged
-> journal result
-> skip publish unless caller explicitly asks for recovery
-> update runtime debug latestCommandResult

publish-only:request-sync
-> journal result
-> publish recovery snapshot
-> expose latestPublishDecision

skipped:toggle-ready/cancel/unknown
-> journal result
-> skip publish
-> expose skipped policy reason

victory
-> journal result
-> publish resync or victory snapshot
-> preserve current completion routing
```

## Fixture matrix

```txt
[ ] accepted pickup near loose cube
[ ] rejected pickup while already carrying
[ ] rejected pickup with no nearby cube
[ ] accepted drop while carrying
[ ] rejected drop without carried cube
[ ] accepted place near anomaly with carried cube
[ ] rejected place too far from anomaly
[ ] rejected place with no free slot
[ ] accepted remove last anomaly cube
[ ] rejected remove wrong slot
[ ] publish-only request-sync
[ ] skipped toggle-ready
[ ] skipped cancel
[ ] skipped unknown action
[ ] accepted player update
[ ] unchanged player update for missing player
[ ] accepted ooze tick
[ ] victory ordered-sequence completion
```

## Implementation boundary

Do this before PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, object-kit visual expansion, or new level content.

Keep the current public gameplay and existing legacy `GameState`-returning exports stable while adding result-returning wrappers beside them.
