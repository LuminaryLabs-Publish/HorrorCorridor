# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-07T08:20:44-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Selected repo:** `HorrorCorridor`

**Rule check:** `LuminaryLabs-Publish/TheCavalryOfRome` was excluded.

## Selection reason

The tracked Publish rotation most recently completed `LuminaryLabs-Publish/IntoTheMeadow`, so this run returned to the next eligible repo in the cycle: `LuminaryLabs-Publish/HorrorCorridor`.

The repo remains a strong candidate for follow-up because the game is already playable, but authority and replay are still spread between React, Three, networking, and rule helpers.

## Current repo read

`HorrorCorridor` is a cooperative first-person maze horror game implemented under `HorrorCorridor-V1` as a Next/React/Three/Zustand project with PeerJS networking.

Current scripts include Next build/start, lint, a static harness, a live agent, live-player validation, object-kit review, ProtoKit smoke, and visual matching.

Important current source seams:

```txt
HorrorCorridor-V1/src/components/game/GameShell.tsx
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/createInitialGameState.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/player/domain
HorrorCorridor-V1/src/features/render/three
HorrorCorridor-V1/src/features/networking
HorrorCorridor-V1/src/protokits
HorrorCorridor-V1/scripts
```

## Interaction loop

### Current loop

```txt
open app
-> start menu
-> choose solo, host, or join
-> generate room ID, join code, player identity, and lobby state
-> host creates PeerJS transport or client connects to host code
-> run loading readiness steps
-> create seeded maze from room or solo seed
-> create initial GameState and replicated snapshot
-> mount GameCanvas
-> create renderer, scene, camera, post-processing, and maze world
-> enter pointer-lock first-person navigation
-> DOM input drives local pose and view angles
-> local authoritative session mutates currentGameState directly
-> client sends PLAYER_UPDATE and TRY_INTERACT messages
-> host receives messages and applies network rules directly
-> cube interaction picks up, drops, places, or removes cubes
-> ordered sequence validation can set victory or reverse victory
-> ooze trail advances on host cadence
-> host publishes replicated snapshots
-> HUD, minimap, debug frames, and render world consume snapshot and local pose
-> victory opens completion screen or player returns to lobby/title
```

### Target loop

```txt
corridor-session-domain-kit creates room/session state
-> peer-room-sync-domain-kit translates transport messages into commands
-> maze-snapshot-bootstrap-kit creates deterministic GameState and snapshot
-> first-person-corridor-player-kit emits pose/action frames
-> host-authority-command-kit validates and applies every gameplay mutation
-> cube-carry-interaction-kit applies legal cube effects through command results
-> end-anomaly-sequence-kit evaluates objective state through command results
-> ooze-trail-navigation-kit advances only through seeded ADVANCE_OOZE commands
-> snapshot-publish-contract-kit builds and publishes reasoned snapshots
-> maze-world-render-kit consumes snapshots and descriptor feeds only
-> runtime-debug-frame-kit records command, cadence, and snapshot diagnostics
-> command-journal-replay-kit replays the same command list against the same seed
```

## Domains in use

- **Application shell:** Next app, client route, React shell, package scripts, menu screens, HUD overlay, and clean play surface.
- **Session lifecycle:** start, host lobby, client lobby, solo bootstrap, loading steps, pause, completion, return-to-lobby, return-to-title, room ID, join code, peer identity, player identity, readiness flags.
- **Peer networking:** PeerJS host/client transport, connection status mapping, lobby events, start-game messages, full-sync snapshots, player-update messages, interaction-request messages, host broadcast cadence.
- **Maze bootstrap:** seed hashing, maze generation, maze cell snapshots, maze lookup, cube spawn snapshots, sequence slot initialization, player spawn initialization, replicated snapshot creation.
- **First-person player:** keyboard mapping, pointer lock, mouse look, yaw/pitch, movement integration, maze collision, local pose, camera bob, local carry state.
- **Host authority:** current direct local/remote state mutation, target command validation, target command application, rejected command reporting, publish reason output, journal entry creation.
- **Cube interaction:** nearest cube selection, pickup, drop, end anomaly placement, end anomaly removal, held-cube sync, slot assignment, legal distance checks.
- **Sequence objective:** ordered color sequence, slot evaluation, solved count, exact-order validation, victory transition, correction reversal.
- **Ooze navigation:** ooze spawn, decay, spacing guard, max cap, seeded RNG injection, trail scaling, ooze level, decal feed.
- **Rendering:** Three renderer, camera, post-processing, terrain projection, maze world, cube/player sync, flashlight, ooze decals, scene dressing, minimap, disposal.
- **Content and ProtoKits:** horror preset, mesh object kits, procedural texture kits, scene dressing descriptors, validation descriptors, object-kit review.
- **Diagnostics and validation:** runtime debug store, debug events, debug frames, cadence summaries, live-agent scripts, live-player harness, smoke scripts, target replay parity reports.

## Services the kits offer

### Current services

- **Session service:** creates room ID, join code, player identity, lobby state, loading state, screen transitions, readiness flags, pause/completion routing.
- **Transport service:** creates host/client PeerJS adapters, maps status events, sends lobby events, sends start-game messages, sends full sync snapshots, sends player and interaction messages.
- **Bootstrap service:** hashes seed source, generates maze, creates cells, spawns cubes, initializes sequence slots, initializes players, emits initial snapshot.
- **Input service:** maps keys to player buttons, tracks pointer lock, accumulates mouse look, converts DOM input into input snapshots.
- **Movement service:** applies look delta, advances local motion, resolves maze collision, outputs pose snapshots.
- **Network rule service:** applies player pose updates, interaction requests, held-cube sync, and no-op handling for unsupported request actions.
- **Interaction service:** validates game state, player, carried cube, distance, slot, and cube availability before pickup/drop/place/remove effects.
- **Objective service:** evaluates slots, tracks solved count, detects exact order, marks victory, and reverses victory when the sequence becomes invalid.
- **Ooze service:** decays trail, spawns trail, advances trail, accepts optional RNG, tracks ooze count.
- **Render service:** creates and resizes renderer/camera/post stack, builds maze world, syncs dynamic entities, draws minimap, renders post-processing, disposes resources.
- **Diagnostics service:** initializes/clears debug, records events, records frames, counts publish/client/UI cadence, supports live validation scripts.

### Target services

- **Command reducer service:** accepts typed commands, validates authority, applies mutations, returns next state, events, rejected status, publish reason, and journal entry.
- **Command journal service:** serializes command input/output, appends ordered entries, replays commands from seed, compares final snapshots.
- **Snapshot publish contract service:** builds snapshots only from authoritative state, attaches publish reason and command metadata, supplies sync output for host/client/replay.
- **Client request service:** converts client messages into commands without directly mutating state.
- **Replay smoke service:** runs headless fixtures for solo start, pose update, cube roundtrip, wrong-order correction, ooze cap/decay, victory, and replay parity.

## Kits

### Current and target service kits

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
host-authority-command-kit
cube-carry-interaction-kit
end-anomaly-sequence-kit
ooze-trail-navigation-kit
snapshot-publish-contract-kit
maze-world-render-kit
runtime-debug-frame-kit
command-journal-replay-kit
snapshot-contract-smoke-kit
```

### Implemented ProtoKit/catalog surfaces

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

## Findings

- `GameShell.tsx` still owns room generation, host/client lobby entry, loading flow, start play, PeerJS transport setup, and sync message reaction.
- `GameCanvas.tsx` still owns runtime initialization, input listeners, pose stepping, client message sending, host message handling, direct rule calls, ooze cadence, snapshot publishing, render frame sync, minimap drawing, and debug frame capture.
- `networkRules.ts` is still the closest reducer seam because it centralizes player update and interaction request application, but it returns only `GameState`.
- `interactionRules.ts` has strong legality checks already, including interaction readiness, player lookup, carried cube state, nearest loose cube, end anomaly distance, slot assignment, and victory sync.
- `winRules.ts` already supports objective completion and correction reversal.
- `oozeRules.ts` already accepts RNG injection, so it is ready to move behind deterministic command ticks.
- The missing boundary is not another visual kit. The next useful cut is a command application contract that every solo, host, client, smoke, and replay path can share.

## Recommended next work

Next slice:

```txt
HorrorCorridor Command Application Contract + Snapshot Publish Cutover
```

Build order:

```txt
1. Keep current solo, host, and client play working.
2. Add host-authority-command-kit as a pure module under game-state/domain.
3. Define commands: PLAYER_POSE_UPDATE, TRY_INTERACT, ADVANCE_OOZE, PAUSE, RESUME, REQUEST_SYNC, COMPLETE_RUN.
4. Define applyCommand(state, command, context) -> result.
5. Return result fields: state, events, rejected, rejectionReason, publishReason, journalEntry.
6. Move applyNetworkPlayerUpdate behind PLAYER_POSE_UPDATE.
7. Move applyNetworkInteractionRequest plus syncHeldCubesToPlayers behind TRY_INTERACT.
8. Move validateOrderedSequenceCompletion calls behind command application.
9. Move advanceOozeTrail behind ADVANCE_OOZE with seeded RNG context.
10. Add snapshot-publish-contract-kit so publishAuthoritativeState becomes a thin caller.
11. Route local solo interactions through the command service.
12. Route host PLAYER_UPDATE and TRY_INTERACT messages through the command service.
13. Keep client prediction local, but ensure client network messages are request-only.
14. Add command-journal-replay-kit and snapshot-contract-smoke-kit scripts.
15. Extend debug frames with lastCommandType, rejectedCommandCount, journalLength, lastPublishReason, and replayParityStatus.
```

## Acceptance targets

```txt
npm run lint
npm run smoke:protokits
npm run validate:live-player:dev
host-authority-command-kit runs without React or Three
solo local interaction and host remote interaction use the same command path
PLAYER_UPDATE returns publishReason and journalEntry
TRY_INTERACT returns rejected status for illegal cube or slot requests
ADVANCE_OOZE accepts seeded RNG and is replayable
snapshot-publish-contract-kit produces stable snapshots from command results
command-journal-replay-kit reaches identical final snapshot for same seed and commands
runtime debug exposes command-level diagnostics
```

## Files updated by this run

```txt
.agent/trackers/2026-07-07T08-20-44-04-00/project-breakdown.md
.agent/kit-registry.json
.agent/README.md
```

## Central log target

```txt
LuminaryLabs-Dev/LuminaryLabs/internal-change-log/2026-07-07T08-20-44-04-00-horror-corridor-command-application-contract-breakdown.md
```

No runtime source code was changed in this pass. No local build or test run was executed.
