# Architecture Audit: Command Decision Debug Readback DSK Map

**Timestamp:** `2026-07-10T10-58-54-04-00`

## Current authority map

```txt
GameCanvas.tsx
  -> imports GameState-returning domain rules
  -> derives local interaction action from distance and carry state
  -> applies network/interaction requests
  -> infers changed/unchanged from object identity
  -> publishes authoritative snapshots through implicit reason strings
  -> records runtime debug frames/events without command result rows
```

## Current authoritative files

```txt
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/package.json
```

## DSK/domain flow

```txt
session-lifecycle
  -> peer-room-sync
  -> seeded-maze-bootstrap
  -> first-person-corridor-player
  -> interaction/network/ooze/win GameState rules
  -> host/local authority publish decision inferred inline
  -> replicated snapshot protocol
  -> render/minimap/HUD/debug consumers
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
session-lifecycle
peer-networking
host-transport
client-transport
network-message-protocol
replicated-snapshot-protocol
seeded-maze-bootstrap
maze-cell-lookup
cube-spawn-bootstrap
anomaly-sequence-bootstrap
sequence-slot-authority
ordered-sequence-validation
victory-completion
first-person-input
pointer-lock-control
keyboard-input
mouse-look-input
player-view-angles
player-movement-integration
maze-collision-resolution
camera-bob
local-pose-prediction
local-carry-state-sync
host-authority
local-authoritative-simulation
legacy-game-state-interaction-rules
legacy-game-state-network-rules
legacy-game-state-ooze-rules
legacy-game-state-win-rules
ooze-cadence
ooze-decay-and-spawn
runtime-debug-frame-store
runtime-debug-event-store
runtime-debug-command-projection-next
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
command-envelope-contract-next
command-reason-catalog-next
command-result-envelope-next
publish-decision-snapshot-next
command-result-journal-next
command-fixture-matrix-next
command-replay-fixture-next
```

## Current services and kits

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
legacy-interaction-rules-adapter
legacy-network-rules-adapter
legacy-ooze-rules-adapter
legacy-win-rules-adapter
```

## Next-cut services and kits

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
local-authority-command-consumer-kit
host-authority-command-consumer-kit
runtime-debug-command-projection-kit
command-fixture-matrix-kit
command-replay-fixture-kit
central-ledger-sync-kit
```

## Architectural gap

The command boundary is still below the debug and fixture layer. Add command result/readback rows first, preserve legacy GameState-returning exports, and only then replace inline GameCanvas publish/skip inference.
