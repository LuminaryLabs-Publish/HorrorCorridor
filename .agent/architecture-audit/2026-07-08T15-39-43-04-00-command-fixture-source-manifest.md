# HorrorCorridor Command Fixture Source Manifest

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T15:39:43-04:00`

## Purpose

This audit records the DSK/domain breakdown for the next safe `HorrorCorridor` implementation slice.

The implementation should not start by editing render, PeerJS, minimap, level content, or scene dressing. It should start by adding source-owned command result contracts and a DOM-free command fixture that proves the existing local and host authority behavior.

## Current source path

```txt
HorrorCorridor-V1/package.json
  -> Next app and validation scripts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
  -> renderer/camera/post-processing/world/minimap/debug setup
  -> local input and pointer-lock handling
  -> local interaction action derivation
  -> host/client transport message handling
  -> publishAuthoritativeState(reason)
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
  -> pickUpCube
  -> dropCube
  -> placeCubeAtEndAnomaly
  -> removeCubeFromEndAnomaly
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
  -> applyNetworkPlayerUpdate
  -> syncHeldCubesToPlayers
  -> applyNetworkInteractionRequest
```

## Current interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create or join room identity
-> complete loading/readiness gates
-> mount GameCanvas runtime
-> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, and debug state
-> enter pointer-lock first-person navigation
-> derive interact action from distance-to-end and carried-cube state
-> pickup, drop, place, or remove cube
-> ordered sequence validates anomaly completion
-> ooze cadence advances on host/local authority ticks
-> authoritative snapshot is built and published or skipped
-> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## DSK/domain breakdown

```txt
horror-corridor-domain
├─ app-shell-domain
│  ├─ start-menu-kit
│  ├─ pause-routing-kit
│  ├─ settings-overlay-kit
│  └─ completion-routing-kit
├─ session-domain
│  ├─ room-identity-kit
│  ├─ peer-identity-kit
│  ├─ readiness-state-kit
│  └─ join-code-routing-kit
├─ peer-sync-domain
│  ├─ host-transport-kit
│  ├─ client-transport-kit
│  ├─ full-sync-message-kit
│  ├─ player-update-message-kit
│  └─ try-interact-message-kit
├─ maze-state-domain
│  ├─ seeded-maze-bootstrap-kit
│  ├─ maze-cell-lookup-kit
│  ├─ cube-spawn-bootstrap-kit
│  ├─ sequence-slot-kit
│  └─ replicated-snapshot-kit
├─ player-domain
│  ├─ first-person-input-kit
│  ├─ pointer-lock-kit
│  ├─ view-angle-kit
│  ├─ movement-integration-kit
│  ├─ collision-resolution-kit
│  └─ local-carry-sync-kit
├─ interaction-domain
│  ├─ legacy-interaction-rules-kit
│  ├─ interaction-preflight-kit
│  ├─ cube-pickup-result-kit
│  ├─ cube-drop-result-kit
│  ├─ anomaly-place-result-kit
│  └─ anomaly-remove-result-kit
├─ command-authority-domain
│  ├─ command-envelope-contract-kit
│  ├─ command-reason-catalog-kit
│  ├─ command-result-envelope-kit
│  ├─ command-result-journal-kit
│  ├─ publish-decision-snapshot-kit
│  ├─ local-authority-result-consumer-kit
│  └─ host-authority-result-consumer-kit
├─ gameplay-domain
│  ├─ ordered-sequence-validation-kit
│  ├─ victory-command-result-kit
│  ├─ ooze-trail-domain-kit
│  └─ ooze-command-result-kit
├─ diagnostics-domain
│  ├─ runtime-debug-frame-kit
│  ├─ runtime-debug-event-kit
│  └─ runtime-debug-result-projection-kit
├─ render-domain
│  ├─ corridor-render-world-kit
│  ├─ corridor-minimap-kit
│  ├─ post-process-kit
│  └─ scene-dressing-descriptor-kit
└─ fixture-domain
   ├─ command-result-fixture-matrix-kit
   ├─ command-replay-fixture-kit
   ├─ volatile-normalization-kit
   └─ snapshot-parity-report-kit
```

## Source files to add first

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Current services

```txt
app/session service
peer sync service
maze bootstrap service
first-person player service
legacy interaction rule service
legacy network rule service
ordered-sequence validation service
ooze cadence service
render service
minimap service
runtime debug frame/event service
validation/harness service
```

## Next services

```txt
command envelope service
command reason catalog service
command result constructor service
snapshot summary service
publish decision service
command journal service
interaction preflight service
network result service
local authority consumer service
host authority consumer service
runtime debug command projection service
command fixture replay service
snapshot parity service
```

## Kit inventory

```txt
Implemented/source-backed:
- corridor-render-world-kit
- corridor-minimap-kit
- runtime-debug-frame-kit
- ooze-trail-domain-kit
- ordered-anomaly-sequence-kit
- procedural-texture-kit-family
- mesh-object-kit-catalog

Planned next:
- command-envelope-contract-kit
- command-reason-catalog-kit
- command-result-envelope-kit
- publish-decision-snapshot-kit
- command-result-journal-kit
- interaction-preflight-kit
- interaction-result-rule-kit
- network-result-rule-kit
- local-authority-result-consumer-kit
- host-authority-result-consumer-kit
- runtime-debug-result-projection-kit
- command-result-fixture-matrix-kit
- command-replay-fixture-kit
```

## Stop line

Stop after the source manifest, fixture script, and legacy adapters are implemented and proven.

Do not extract PeerJS, renderer, minimap, post-processing, scene dressing, object kits, or level content in the same implementation slice.
