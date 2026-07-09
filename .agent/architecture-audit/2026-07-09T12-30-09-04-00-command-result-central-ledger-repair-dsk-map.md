# HorrorCorridor Architecture Audit: Command Result Central Ledger Repair DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-30-09-04-00`

## Selection read

`HorrorCorridor` was selected after comparing the accessible `LuminaryLabs-Publish` repo list against central ledger state and sampled root `.agent` state.

No checked non-Cavalry repo was new, ledger-absent, missing root `.agent`, recently added but undocumented, or otherwise undocumented. `TheCavalryOfRome` was excluded. Central `HorrorCorridor` tracking was the oldest eligible stale ledger pointer.

## Current architecture

```txt
Next app shell
  -> session/ui/runtime Zustand stores
  -> solo/host/client mode selection
  -> PeerJS room transport
  -> initial replicated snapshot bootstrap
  -> GameCanvas runtime
  -> Three renderer / scene / camera / post-processing
  -> maze world builder and minimap renderer
  -> player input / look / movement / collision
  -> networkRules and interactionRules mutate GameState
  -> buildReplicatedSnapshot publishes host/local authority state
  -> runtime debug frames/events export snapshot, cadence, input, and scene dressing facts
```

## Domain map

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
first-person-input
pointer-lock-control
player-movement-integration
maze-collision-resolution
cube-carry-interaction
ordered-sequence-validation
ooze-cadence
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
command-replay-fixture
three-renderer
minimap-rendering
central-ledger-synchronization
```

## Implemented kits

```txt
corridor-session-domain-kit: mode, room identity, readiness, pause/completion routing
peer-room-sync-domain-kit: host/client transport, full sync, player update, try interact
maze-snapshot-bootstrap-kit: seed, maze, cell lookup, cube spawn, sequence slots
first-person-corridor-player-kit: input, pointer lock, look, movement, collision
corridor-interaction-domain-kit: pickup, drop, place, remove GameState mutations
ordered-anomaly-sequence-kit: slot validation and victory state
ooze-trail-domain-kit: ooze cadence and trail mutations
corridor-render-world-kit: Three world construction and snapshot consumption
corridor-minimap-kit: minimap draw from snapshot/player yaw
runtime-debug-frame-kit: runtime frame/event capture and export
```

## Next-cut kits

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
command-seed-state-fixture-kit
interaction-preflight-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-command-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
central-ledger-sync-kit
```

## Main architecture finding

The app already has good domain seams for session, networking, maze bootstrap, player movement, interaction mutations, rendering, minimap, and debug. The missing architecture seam is not another visual or transport extraction; it is a result-first command layer that makes every accepted, rejected, unchanged, skipped, recovery, publish-only, and victory branch visible to fixtures and consumers.

## Implementation ordering rule

```txt
1. source-owned command contracts
2. source-owned reason catalog
3. source-owned result envelopes
4. source-owned publish decisions
5. source-owned command journal
6. DOM-free fixture rows
7. runtime debug command projection
8. GameCanvas consumer splice
```

Do not wire `GameCanvas` to new behavior until the domain fixture proves parity with legacy `GameState` mutations.
