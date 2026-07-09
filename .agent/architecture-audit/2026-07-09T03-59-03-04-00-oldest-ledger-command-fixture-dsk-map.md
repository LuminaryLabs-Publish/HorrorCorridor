# Architecture Audit - HorrorCorridor Command Fixture DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`
**Timestamp:** `2026-07-09T03-59-03-04-00`

## Current DSK shape

```txt
HorrorCorridor
  -> app/session domain
  -> peer room sync domain
  -> maze bootstrap domain
  -> first-person player domain
  -> interaction rules domain
  -> ordered anomaly sequence domain
  -> ooze trail domain
  -> render world domain
  -> minimap domain
  -> runtime debug domain
```

## Current loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> derive action from carried cube plus distance to anomaly
  -> local solo/host calls applyNetworkInteractionRequest
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT with GameState-returning network rules
  -> request-sync/toggle-ready/cancel/default paths collapse to unchanged GameState
  -> publish authoritative snapshot by implicit reason strings
  -> update Three world, minimap, HUD, completion routing, and runtime debug frames
```

## Target DSK shape

```txt
command-authority-domain
  -> command-envelope-contract-kit
  -> command-reason-catalog-kit
  -> command-result-envelope-kit
  -> publish-decision-snapshot-kit
  -> command-result-journal-kit

interaction-authority-domain
  -> interaction-preflight-kit
  -> interaction-result-rules-kit
  -> legacy-interaction-adapter-kit

network-authority-domain
  -> network-result-rules-kit
  -> local-authority-result-consumer-kit
  -> host-authority-result-consumer-kit

diagnostics-domain
  -> runtime-debug-command-projection-kit
  -> command-replay-fixture-kit
```

## Domains

```txt
application-shell
next-client-runtime
react-game-surface
session-lifecycle
peer-networking
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
command-decision-contract
command-seed-state-fixture
publish-decision-snapshot
command-result-journal
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-result-fixture-matrix
three-renderer
minimap-rendering
replay-parity-validation
central-ledger-synchronization
```

## Services

```txt
app/session service: mode, room, readiness, pause, completion
peer sync service: host/client transport, full sync, player update, try interact
maze bootstrap service: seed, maze generation, cell lookup, path build, cube spawn, sequence slots
first-person player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
legacy GameState interaction service: pickup, drop, place, remove, ordered completion
legacy GameState network service: player update, held-cube sync, interaction dispatch, request-sync no-op
command fixture seed service: canonical GameState seeds and expected row facts
command result envelope service: command id, source, status, reason, changed flag, events, diagnostics, legacy adapters
publish decision service: publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag
local authority result consumer service: local result journal and publish/skip behavior
host authority result consumer service: host result journal, request-sync recovery, rejected TRY_INTERACT skip, and accepted/victory publish behavior
runtime debug command projection service: latest result, decision, journal counters, fixture parity
```

## Architecture risk

`GameCanvas.tsx` is currently the consumer, publisher, renderer, debug projector, local authority, host authority, and input router.

The next source pass should not rewrite it. It should add result-producing domains first, prove them in a DOM-free fixture, then splice only the local and host authority consumers into `GameCanvas`.
