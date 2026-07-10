# Architecture Audit: Command Result Debug Readback Catch-up DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T00-18-38-04-00`

## Architecture read

`HorrorCorridor` is a cooperative first-person maze built from app/session, networking, game-state, player, render, minimap, and debug surfaces.

The current architecture is playable and render-stable.

The missing layer is result-first command authority.

## Current source-authority shape

```txt
GameCanvas.tsx
  -> derives local interact action
  -> calls applyNetworkInteractionRequest directly
  -> checks nextState === currentGameState for no-op
  -> syncs held cubes
  -> publishAuthoritativeState('resync' or 'recovery')
  -> commitVictory if currentGameState.gameState === 'victory'
```

```txt
interactionRules.ts
  -> pickup/drop/place/remove
  -> many rejected branches return state
  -> successful branches return GameState
  -> no reason/result envelope
```

```txt
networkRules.ts
  -> PLAYER_UPDATE changes or returns state
  -> TRY_INTERACT delegates to interactionRules
  -> request-sync/toggle-ready/cancel/default return state
  -> no publish decision metadata
```

```txt
oozeRules.ts and winRules.ts
  -> mutate or return GameState
  -> no changed/no-op/reason metadata
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
replicated-snapshot-protocol
seeded-maze-bootstrap
first-person-input
cube-carry-interaction
ordered-sequence-validation
ooze-trail-navigation
legacy-game-state-rule-adapters
command-envelope-contract
command-reason-catalog
command-result-envelope
publish-decision-snapshot
command-result-journal
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-result-fixture-matrix
three-renderer
minimap-rendering
central-ledger-synchronization
```

## Service map

```txt
app-session-service: room, mode, identity, readiness, pause, completion
peer-sync-service: host/client transport, player update, try interact, full sync, recovery
maze-bootstrap-service: seed, grid, cell lookup, cube spawn, sequence slots, initial state
first-person-player-service: input, pointer lock, camera, movement, collision, local carry sync
legacy-interaction-service: pickup/drop/place/remove as GameState-only rules
legacy-network-service: player update, held cube sync, request-sync/toggle-ready/cancel/default as GameState-only rules
ooze-service: decay/spawn/spacing as GameState-only rules
win-service: ordered sequence completion/victory as GameState-only rules
runtime-debug-service: frame/event export, currently without command projection
render-service: Three renderer, scene, camera, post-process, maze world, minimap
planned-command-service: envelope, reason catalog, result, publish decision, journal, fixture, consumers, debug projection
```

## Kit inventory

Implemented/runtime kits:

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
mesh-object-kit-catalog
procedural-texture-kit-family
```

Planned proof kits:

```txt
command-envelope-contract-kit
command-source-policy-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
command-seed-state-fixture-kit
interaction-preflight-kit
network-command-preflight-kit
ooze-result-rules-kit
win-result-rules-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-command-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
central-ledger-sync-kit
```

## Architecture finding

The next implementation should add result-returning wrappers and fixtures beside the existing GameState-returning exports.

Keep legacy exports intact until the fixture proves parity, then splice consumers into `GameCanvas.tsx` additively.
