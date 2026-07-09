# HorrorCorridor Command Ledger Central Sync DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T07-05-52-04-00`

## Selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against central ledger and sampled root `.agent` state.

No checked non-Cavalry repo was new, central-ledger absent, recently added but undocumented, or missing sampled root `.agent` state.

`HorrorCorridor` was selected as the central-ledger catch-up target because repo-local command-result docs were ahead of the central `LuminaryLabs-Dev/LuminaryLabs` ledger and the command-result fixture gate remains unresolved.

## Interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> create or join room identity
-> complete loading/readiness gates
-> mount GameCanvas runtime
-> build renderer, camera, post-processing, maze world, minimap, input, pose, cadence, and debug state
-> pointer-lock movement advances local pose
-> interaction action derives from carried cube + distance to anomaly
-> GameState-returning interaction/network rule applies
-> held cubes sync to players
-> ooze advances on authoritative cadence
-> authoritative snapshot publishes by implicit reason string
-> Three world, minimap, HUD, completion routing, and runtime debug consume snapshot
```

## Current domain stack

```txt
application-shell
next-client-runtime
react-game-surface
ui-screen-routing
session-lifecycle
peer-networking
network-message-protocol
replicated-snapshot-protocol
seeded-maze-bootstrap
maze-cell-lookup
cube-spawn-bootstrap
sequence-slot-authority
ordered-sequence-validation
victory-completion
first-person-input
pointer-lock-control
player-movement-integration
maze-collision-resolution
host-authority
local-authoritative-simulation
legacy-game-state-interaction-rules
legacy-game-state-network-rules
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
post-processing
maze-world-rendering
minimap-rendering
central-ledger-synchronization
```

## Services that kits offer

```txt
corridor-session-domain-kit: room identity, mode selection, readiness, pause/completion routing
peer-room-sync-domain-kit: host/client transport, full-sync, player update, try-interact, recovery sync
maze-snapshot-bootstrap-kit: maze generation, lookup, cube spawns, sequence slots, initial snapshot
first-person-corridor-player-kit: keyboard input, pointer lock, look, movement, collision, camera pose
corridor-interaction-domain-kit: pickup, drop, place, remove, ordered sequence state mutation
ordered-anomaly-sequence-kit: sequence slot validation, solved state, victory transition
ooze-trail-domain-kit: ooze cadence, spacing, decay, navigation pressure
corridor-render-world-kit: Three maze world objects, cube/anomaly/ooze consumption, scene disposal
corridor-minimap-kit: minimap projection and canvas draw from replicated snapshots
runtime-debug-frame-kit: runtime event/frame capture, cadence, snapshot, input, scene dressing readback
command-envelope-contract-kit: normalized command id/source/player/action/payload records
command-reason-catalog-kit: accepted/rejected/unchanged/skipped/publish-only/victory reason ids
command-result-envelope-kit: before/after summaries, changed flag, events, diagnostics, legacy adapters
publish-decision-snapshot-kit: publish/skip/recovery/no-op/victory decision records
local-authority-result-consumer-kit: local journal, publish/skip selection, victory intent
host-authority-result-consumer-kit: host player/interaction/recovery routing and broadcast decision
runtime-debug-command-projection-kit: latest command result, publish decision, journal counts, fixture parity
command-result-fixture-matrix-kit: DOM-free accepted/rejected/unchanged/skipped/recovery/victory row proof
central-ledger-sync-kit: repo-local tracker, central repo-ledger, internal change-log entry
```

## Current kits

```txt
implemented-source:
- corridor-session-domain-kit
- peer-room-sync-domain-kit
- maze-snapshot-bootstrap-kit
- first-person-corridor-player-kit
- corridor-interaction-domain-kit
- ordered-anomaly-sequence-kit
- ooze-trail-domain-kit
- corridor-render-world-kit
- corridor-minimap-kit
- runtime-debug-frame-kit
- mesh-object-kit-catalog
- procedural-texture-kit-family

planned-next:
- command-envelope-contract-kit
- command-reason-catalog-kit
- command-result-envelope-kit
- publish-decision-snapshot-kit
- command-result-journal-kit
- command-seed-state-fixture-kit
- interaction-preflight-kit
- interaction-result-rules-kit
- network-result-rules-kit
- local-authority-result-consumer-kit
- host-authority-result-consumer-kit
- runtime-debug-command-projection-kit
- command-result-fixture-matrix-kit
- command-replay-fixture-kit
- central-ledger-sync-kit
```

## DSK boundary rule

The next implementation must prove the result ledger in domain/source files before `GameCanvas.tsx` consumes it.

Do not extract renderer, PeerJS, minimap, post-processing, scene dressing, or new object kits before the command-result replay matrix passes.
