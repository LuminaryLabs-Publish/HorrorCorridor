# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-07T09-28-43-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Selected repo:** `HorrorCorridor`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Selection reason

The tracked Publish rotation most recently completed `LuminaryLabs-Publish/IntoTheMeadow`, so this run selected the next eligible tracked repo: `LuminaryLabs-Publish/HorrorCorridor`. Cavalry remained excluded by rule.

This pass focuses on the next useful cut after the prior command-application boundary: make command results structurally rich enough for replay, publishing, diagnostics, and smoke tests before moving more code out of `GameCanvas.tsx`.

## Repository read

`HorrorCorridor` is a cooperative first-person maze horror game under `HorrorCorridor-V1`. It uses Next, React, Three.js, Zustand, and PeerJS. It already supports solo play, host/client lobby paths, seeded maze bootstrap, first-person movement, anomaly cube interactions, ordered-sequence completion, ooze trail simulation, replicated snapshots, runtime debug frames, live-player validation, and ProtoKit/object-kit smoke scripts.

The main implementation concentration is still `HorrorCorridor-V1/src/components/game/GameCanvas.tsx`. That file imports render, input, movement, networking, replicated snapshots, interaction rules, win rules, ooze rules, runtime debug state, and Zustand stores, then owns the live mutation/publish/render loop.

## Current interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> generate room ID, join code, player identity, lobby state
-> create host/client PeerJS transport or solo session
-> run loading readiness steps
-> create seeded maze and initial GameState
-> create replicated snapshot
-> mount GameCanvas
-> initialize renderer, scene, camera, post-processing, and maze world
-> enter pointer-lock first-person navigation
-> DOM input mutates local input state
-> local pose advances through movement/collision helpers
-> local authoritative session applies networkRules directly
-> client sends PLAYER_UPDATE and TRY_INTERACT messages
-> host handles transport messages directly in GameCanvas
-> interactionRules mutate cube and sequence state
-> winRules validates ordered anomaly sequence
-> oozeRules advances ooze on host cadence
-> publishAuthoritativeState increments tick and builds replicated snapshot
-> host broadcasts full sync
-> render world, HUD, minimap, and debug frames consume local pose and snapshot
-> victory commits completion screen or player returns to lobby/title
```

## Target interaction loop

```txt
session lifecycle service creates room/session mode
-> peer sync service maps network messages to commands
-> maze bootstrap service creates deterministic GameState
-> first-person player service emits local pose intent
-> host-authority-command-kit applies every authoritative mutation
-> command result metadata records changed, rejected, reason, events, publishReason, and journalEntry
-> cube interaction, sequence objective, and ooze navigation run only through command application
-> snapshot-publish-contract-kit builds snapshots from command results
-> runtime-debug-frame-kit records command-level and publish-level diagnostics
-> command-journal-replay-kit replays accepted command journals against the same seed/context
-> smoke fixtures compare final snapshots and command result metadata
```

## Recommended service loop

```txt
input / network event
-> command-envelope-kit normalizes command identity, source, sequence, timestamp, actor, and payload
-> host-authority-command-kit validates command and applies domain services
-> command-result-contract-kit returns the canonical result envelope
-> command-journal-replay-kit serializes accepted and rejected command outcomes
-> snapshot-publish-contract-kit decides whether a snapshot should publish
-> runtime-debug-frame-kit stores last command, rejected counts, journal length, publish reason, and replay parity
-> snapshot-contract-smoke-kit verifies result and snapshot shape
```

## Domains identified

```txt
application-shell
session-lifecycle
peer-networking
network-message-protocol
maze-bootstrap
maze-cell-lookup
first-person-input
pointer-lock-control
player-look-and-movement
maze-collision
local-pose-prediction
host-authority
command-envelope-contract
command-result-contract
command-journal-replay
cube-carry-interaction
end-anomaly-sequence
objective-completion
victory-completion
reverse-correction
ordered-slot-state
ooze-navigation
ooze-seeded-rng
ooze-decay-and-spawn
replicated-snapshot-build
snapshot-publish-contract
full-sync-message-output
runtime-debug-event-log
runtime-debug-frame-log
cadence-diagnostics
render-world-snapshot-consumption
minimap-rendering
scene-dressing-descriptors
mesh-object-kit-catalog
procedural-texture-kit-family
static-smoke-validation
live-player-validation
replay-parity-validation
```

## Services identified

```txt
session service:
  create room id
  create join code
  create player identity
  create room state
  run loading readiness
  enter solo mode
  enter host lobby
  enter client lobby
  start play
  pause / resume
  commit completion
  return to lobby / title

peer sync service:
  create host transport
  create client transport
  map connection status
  send lobby events
  send START_GAME
  send SYNC
  send PLAYER_UPDATE
  send TRY_INTERACT
  receive host messages
  target: translate messages to commands

maze bootstrap service:
  hash seed
  generate maze
  build cell lookup
  create player spawns
  create cube spawns
  initialize anomaly sequence slots
  create initial GameState
  create initial replicated snapshot

first-person player service:
  map keyboard codes to buttons
  capture pointer lock
  accumulate mouse look
  apply yaw / pitch
  advance local movement
  resolve maze collision
  emit local pose snapshot
  sync camera bob

network rule service:
  apply player update
  apply interaction request
  sync held cubes to players
  no-op unsupported actions
  gap: returns only GameState, not command metadata

interaction service:
  check interaction state readiness
  find player
  find carried cube
  find nearest legal loose cube
  check anomaly distance
  assign sequence slot
  pickup cube
  drop cube
  place cube at anomaly
  remove cube from anomaly
  sync sequence progress

sequence objective service:
  evaluate slot solution state
  count solved slots
  validate exact order
  transition to victory
  reverse victory on correction

ooze service:
  resolve rng
  decay ooze trail
  spawn ooze trail
  enforce ooze spacing
  enforce max ooze cap
  update ooze level
  target: advance only from deterministic command context

snapshot publish service:
  increment authoritative tick
  attach room phase and updatedAt
  build replicated snapshot
  attach publish reason
  set authoritative snapshot in runtime store
  broadcast full sync to host clients
  target: consume command result envelope

diagnostics service:
  initialize debug store
  clear debug state
  record runtime event
  record runtime frame
  record cadence summary
  record scene dressing summary
  target: record command result metadata

replay service:
  target: serialize commands
  target: serialize command results
  target: replay command journal
  target: normalize volatile fields
  target: compare final snapshot
  target: emit parity report
```

## Kits identified

### Current / candidate service kits

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
cube-carry-interaction-kit
end-anomaly-sequence-kit
ooze-trail-navigation-kit
maze-world-render-kit
runtime-debug-frame-kit
```

### Target authority / replay kits

```txt
host-authority-command-kit
command-envelope-contract-kit
command-result-contract-kit
snapshot-publish-contract-kit
command-journal-replay-kit
command-result-fixture-kit
snapshot-contract-smoke-kit
replay-parity-smoke-kit
```

### Implemented ProtoKit / catalog surfaces

```txt
wound-triangle-mesh-domain-kit
mesh-object-kit-catalog
horror-corridor-preset-kit
procedural-texture-kit-family
```

### Mesh object kits tracked through catalog

```txt
rusted-service-door-object-kit
chain-link-fence-object-kit
broken-generator-object-kit
concrete-jersey-barrier-object-kit
storm-drain-culvert-object-kit
collapsed-signpost-object-kit
industrial-shelving-object-kit
hanging-chain-hook-object-kit
barrel-cluster-object-kit
broken-concrete-stair-object-kit
```

### Texture kits tracked through procedural family

```txt
brick-course-texture-kit
damp-mud-texture-kit
rust-streak-texture-kit
moss-grime-texture-kit
wet-concrete-texture-kit
```

## Key findings

- `package.json` already exposes the needed validation surface: `lint`, `smoke:protokits`, live-agent scripts, object-kit review, visual matching, and live-player validation.
- `GameCanvas.tsx` still imports and coordinates the main runtime domains: debug store, ooze rules, replicated snapshot protocol, Peer transport types, network rules, win rules, player input, player movement, collision, render loop, Three renderer, world builder, and minimap.
- `publishAuthoritativeState()` still mutates room/tick/timestamp data, builds snapshots, updates runtime store, records sync debug events, and optionally broadcasts full-sync messages from inside `GameCanvas.tsx`.
- Host transport message handling still calls `applyNetworkPlayerUpdate()` and `applyNetworkInteractionRequest()` directly, then publishes snapshots directly.
- The authoritative simulation branch still mutates `currentGameState` directly on every frame, calls `applyNetworkPlayerUpdate()`, calls `syncHeldCubesToPlayers()`, and advances ooze before publishing.
- `networkRules.ts` is the narrowest current reducer seam, but it only returns `GameState`, which is not enough for replay, rejection reporting, diagnostics, or publish decisions.
- `interactionRules.ts` already contains useful legality checks. The next cut should wrap these effects in command results, not rewrite them.
- `oozeRules.ts` already accepts an optional RNG but falls back to `Math.random`, so the target command context must inject deterministic RNG for `ADVANCE_OOZE`.
- `syncSnapshot.ts` already has a stable replicated snapshot builder and full-sync message creator, making it the correct starting point for `snapshot-publish-contract-kit`.

## Main recommendation

Next slice:

```txt
HorrorCorridor Command Result Metadata + Replay Fixture Cutover
```

Build order:

```txt
1. Keep current solo, host, and client play working.
2. Add command-envelope-contract-kit with commandId, type, actorId, source, sequence, timestampMs, payload, and requestId.
3. Add command-result-contract-kit with state, changed, rejected, rejectionReason, events, publishReason, journalEntry, and diagnostics.
4. Implement host-authority-command-kit as a React-free / Three-free domain module.
5. Wrap applyNetworkPlayerUpdate as PLAYER_POSE_UPDATE command application.
6. Wrap applyNetworkInteractionRequest as TRY_INTERACT command application.
7. Wrap advanceOozeTrail as ADVANCE_OOZE command application with seeded RNG context.
8. Keep interactionRules legality logic as the effect layer under command application.
9. Move sequence validation into command application result events.
10. Make publishAuthoritativeState consume command results rather than infer publish reasons locally.
11. Add command-result-fixture-kit for legal pickup, illegal pickup, place correct cube, wrong-order correction, seeded ooze, and victory.
12. Add command-journal-replay-kit that replays command envelopes and compares normalized snapshots.
13. Extend runtime debug frames with lastCommandType, lastCommandId, rejectedCommandCount, journalLength, lastPublishReason, and replayParityStatus.
14. Add smoke fixtures that can run without DOM, React, Three, PeerJS, or pointer lock.
```

## Acceptance targets

```txt
npm run lint
npm run smoke:protokits
npm run validate:live-player:dev
host-authority-command-kit imports no React, Three, Zustand, or PeerJS
applyCommand returns command result metadata for PLAYER_POSE_UPDATE
applyCommand returns rejected=true for illegal TRY_INTERACT
ADVANCE_OOZE uses deterministic rng from command context
snapshot-publish-contract-kit accepts command result publishReason
command-result-fixture-kit covers legal and illegal interaction cases
command-journal-replay-kit reaches identical normalized final snapshot
runtime debug exposes command-result metadata
```

## Changed in this tracker

```txt
.agent/trackers/2026-07-07T09-28-43-04-00/project-breakdown.md
.agent/kit-registry.json
.agent/README.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-07T09-28-43-04-00-horror-corridor-command-result-replay-fixture-breakdown.md
```

## Notes

This pass changed internal documentation only. It did not modify runtime product code and did not run local builds or tests.
