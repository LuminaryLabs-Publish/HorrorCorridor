# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-07T10-41-32-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Selected repo:** `HorrorCorridor`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Selection reason

The central tracking ledger most recently completed `LuminaryLabs-Publish/IntoTheMeadow`, so this run selected the next eligible tracked Publish repo in the rotation: `LuminaryLabs-Publish/HorrorCorridor`. Cavalry remains excluded by rule.

The previous HorrorCorridor pass identified command result metadata and replay fixtures as the next useful boundary. This pass narrows that into the first implementation slice: normalize every authoritative local, host, client, and fixture mutation into a host command envelope, then make snapshot publishing consume the command result instead of inferring publish behavior inside `GameCanvas.tsx`.

## Repository read

`HorrorCorridor` is a cooperative first-person maze horror game under `HorrorCorridor-V1`. It uses Next, React, Three.js, Zustand, PeerJS, seeded maze bootstrap, first-person pointer-lock movement, anomaly cube interaction, ordered-sequence objective logic, ooze trail pressure, replicated snapshots, runtime debug capture, live-player validation scripts, and ProtoKit/object-kit smoke surfaces.

The main implementation concentration remains `HorrorCorridor-V1/src/components/game/GameCanvas.tsx`. That file imports and coordinates debug state, ooze rules, replicated snapshot protocol, Peer transport types, pathing helpers, network rules, win rules, player input, player movement, collision, render loop, Three renderer creation, world builder, minimap drawing, and React/Zustand runtime stores. The next slice should not pull apart rendering yet. It should put one command boundary in front of state mutation and snapshot publishing.

## Current interaction loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> generate room ID, join code, player identity, and lobby state
-> create host/client PeerJS transport or solo session
-> run loading readiness steps
-> create seeded maze and initial GameState
-> create replicated snapshot
-> mount GameCanvas
-> initialize renderer, scene, camera, post-processing, and maze world
-> enter pointer-lock first-person navigation
-> DOM input mutates local input state
-> local pose advances through movement/collision helpers
-> local authoritative session mutates currentGameState directly
-> client sends PLAYER_UPDATE and TRY_INTERACT messages
-> host receives transport messages inside GameCanvas
-> host applies applyNetworkPlayerUpdate or applyNetworkInteractionRequest directly
-> interactionRules mutate cube, carry, slot, and sequence state
-> winRules validates ordered anomaly sequence
-> oozeRules advances ooze on host cadence
-> publishAuthoritativeState increments tick and builds replicated snapshot
-> host broadcasts full sync when transport role is host
-> render world, HUD, minimap, and debug frames consume local pose and snapshot
-> victory commits completion screen or player returns to lobby/title
```

## Target interaction loop

```txt
session lifecycle service creates room/session mode
-> peer sync service maps network messages to command envelopes
-> local simulation also emits command envelopes for pose and ooze cadence
-> maze bootstrap service creates deterministic initial GameState
-> host-command-envelope-adapter-kit normalizes commandId, type, actorId, source, sequence, requestId, timestampMs, and payload
-> host-authority-command-kit validates and applies PLAYER_POSE_UPDATE / TRY_INTERACT / ADVANCE_OOZE / REQUEST_SYNC
-> command-result-contract-kit returns state, changed, rejected, reason, events, publishReason, journalEntry, diagnostics
-> snapshot-publish-fixture-kit applies command result publish policy
-> snapshot-publish-contract-kit builds a replicated snapshot from accepted command results
-> runtime-debug-frame-kit records command and publish metadata
-> command-journal-replay-kit replays accepted command envelopes against the same seed/context
-> smoke fixtures compare command result metadata and final normalized snapshots
```

## Recommended service loop

```txt
network event / local pose step / local interact / ooze cadence / smoke fixture
-> host-command-envelope-adapter-kit builds canonical envelope
-> command-acceptance-policy-kit checks room, actor, session source, app state, and command type
-> host-authority-command-kit calls existing domain effects
-> command-result-contract-kit annotates changed / rejected / events / publishReason
-> command-result-journal-kit stores accepted and rejected outcomes separately
-> snapshot-publish-fixture-kit decides whether to publish, broadcast, recover, or skip
-> runtime-debug-frame-kit adds lastCommandType, lastCommandId, rejectedCommandCount, journalLength, lastPublishReason, and replayParityStatus
-> replay-parity-smoke-kit rebuilds state from command fixtures and compares normalized snapshots
```

## Domains identified

```txt
application-shell
session-lifecycle
peer-networking
network-message-protocol
host-message-ingress
client-message-egress
local-authoritative-simulation
maze-bootstrap
maze-cell-lookup
first-person-input
pointer-lock-control
player-look-and-movement
maze-collision
local-pose-prediction
host-authority
host-command-envelope-adapter
command-acceptance-policy
command-result-contract
command-result-journal
command-journal-replay
cube-carry-interaction
end-anomaly-sequence
ordered-slot-state
objective-completion
victory-completion
reverse-correction
ooze-navigation
ooze-seeded-rng
ooze-decay-and-spawn
replicated-snapshot-build
snapshot-publish-contract
snapshot-publish-fixture
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
  target: translate transport messages to host command envelopes

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
  target: emit PLAYER_POSE_UPDATE envelope instead of mutating directly

host command envelope adapter service:
  normalize local pose updates
  normalize client PLAYER_UPDATE messages
  normalize local and client TRY_INTERACT requests
  normalize ADVANCE_OOZE cadence events
  normalize REQUEST_SYNC events
  attach commandId
  attach actorId
  attach source: solo / host-local / host-remote / client / fixture
  attach source sequence
  attach timestampMs
  attach requestId
  attach payload

command acceptance policy service:
  reject unknown command type
  reject missing actor
  reject room mismatch
  reject stale non-authoritative source
  reject interaction when gameState is not playing
  accept no-op REQUEST_SYNC as publish-only recovery command
  classify changed vs unchanged result

network rule service:
  apply player update
  apply interaction request
  sync held cubes to players
  current gap: returns only GameState
  target: effects are called by command application and wrapped in command result metadata

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
  target: emit rejection reasons and interaction events instead of silent no-op only

sequence objective service:
  evaluate slot solution state
  count solved slots
  validate exact order
  transition to victory
  reverse victory on correction
  target: emit sequence-progress, victory, and correction-reversal events through command result

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
  target: consume command result envelope and publish policy

diagnostics service:
  initialize debug store
  clear debug state
  record runtime event
  record runtime frame
  record cadence summary
  record scene dressing summary
  target: record command envelope, command result, publish decision, and replay status

replay service:
  serialize command envelopes
  serialize command results
  replay command journal
  normalize volatile fields
  compare final snapshot
  emit parity report
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

### Target authority / publish / replay kits

```txt
host-command-envelope-adapter-kit
command-envelope-contract-kit
command-acceptance-policy-kit
host-authority-command-kit
command-result-contract-kit
command-result-journal-kit
snapshot-publish-fixture-kit
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

- `package.json` already exposes the validation surface needed for this slice: `lint`, `smoke:protokits`, live-agent scripts, object-kit review, visual matching, and live-player validation.
- `GameCanvas.tsx` is still the runtime concentration point. It owns transport handling, input wiring, local pose stepping, authoritative mutation, publish cadence, render sync, minimap, and debug frame capture.
- `publishAuthoritativeState()` still mutates room phase, tick, timestamp, app state, builds a snapshot, writes to the runtime store, records a debug event, and broadcasts full sync from inside `GameCanvas.tsx`.
- Host transport handling still calls `applyNetworkPlayerUpdate()` and `applyNetworkInteractionRequest()` directly, then publishes snapshots directly.
- The local authoritative simulation branch still directly calls `applyNetworkPlayerUpdate()`, `syncHeldCubesToPlayers()`, and `advanceOozeTrail()` before publishing.
- `networkRules.ts` is the narrowest current reducer seam, but it returns only `GameState`, which is not enough for rejected commands, publish decisions, replay journals, or diagnostics.
- `interactionRules.ts` already has the legality logic the command layer needs, but its failure mode is silent no-op. The target wrapper should provide explicit rejection metadata without rewriting the legality checks first.
- `oozeRules.ts` already supports optional RNG injection, but falls back to `Math.random`. `ADVANCE_OOZE` must always pass deterministic RNG context in fixtures and host authority.
- `syncSnapshot.ts` already provides the stable snapshot builder and full-sync message creator, so the first publish kit should wrap this surface rather than duplicate snapshot serialization.

## Main recommendation

Next slice:

```txt
HorrorCorridor Host Command Envelope + Snapshot Publish Fixture Cutover
```

Build order:

```txt
1. Keep current solo, host, and client play working.
2. Add host-command-envelope-adapter-kit as a React-free / Three-free / Zustand-free / PeerJS-free domain module.
3. Define command types: PLAYER_POSE_UPDATE, TRY_INTERACT, ADVANCE_OOZE, REQUEST_SYNC, PAUSE, RESUME, COMPLETE_RUN.
4. Normalize local authoritative pose updates into PLAYER_POSE_UPDATE envelopes.
5. Normalize remote PLAYER_UPDATE messages into PLAYER_POSE_UPDATE envelopes.
6. Normalize local and remote interaction requests into TRY_INTERACT envelopes.
7. Normalize host cadence ooze updates into ADVANCE_OOZE envelopes with deterministic RNG context.
8. Add command-acceptance-policy-kit for room, actor, source, screen, and command-type checks.
9. Add command-result-contract-kit around existing networkRules, interactionRules, winRules, and oozeRules effects.
10. Add command-result-journal-kit that stores accepted and rejected results separately.
11. Add snapshot-publish-fixture-kit so publishAuthoritativeState consumes publishReason from command results.
12. Convert publishAuthoritativeState into a thin snapshot/write/broadcast caller.
13. Add command fixture JSON for pose update, illegal interact, legal pickup, place correct cube, wrong-order correction, seeded ooze, request-sync, and victory.
14. Add replay parity fixture that boots a seeded state, replays command envelopes, normalizes volatile fields, and compares final snapshot.
15. Extend runtime debug frames with lastCommandType, lastCommandId, rejectedCommandCount, journalLength, lastPublishReason, and replayParityStatus.
16. Defer render extraction until command envelope, publish fixture, and replay fixture pass.
```

## Acceptance targets

```txt
npm run lint
npm run smoke:protokits
npm run validate:live-player:dev
host-command-envelope-adapter-kit imports no React, Three, Zustand, or PeerJS
command envelope includes commandId, type, actorId, source, sequence, timestampMs, requestId, and payload
PLAYER_UPDATE and local pose steps both become PLAYER_POSE_UPDATE envelopes
TRY_INTERACT returns rejected=true with reason for illegal pickup / placement attempts
ADVANCE_OOZE always uses deterministic rng from command context in fixtures
publishAuthoritativeState consumes command result publishReason
snapshot-publish-fixture-kit covers resync, recovery, no-change, and victory publish decisions
command-result-journal-kit records accepted and rejected command outcomes
command-journal-replay-kit reaches identical normalized final snapshot
runtime debug exposes command and publish metadata
```

## Changed in this tracker

```txt
.agent/trackers/2026-07-07T10-41-32-04-00/project-breakdown.md
.agent/kit-registry.json
.agent/README.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-07T10-41-32-04-00-horror-corridor-host-command-envelope-publish-fixture-breakdown.md
```

## Notes

This pass changed internal documentation only. It did not modify runtime product code and did not run local builds or tests.
