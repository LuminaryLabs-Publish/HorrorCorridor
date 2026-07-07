# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-07T16:25:00-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Branch target:** `main`

**Tracker path:** `.agent/trackers/2026-07-07T16-25-00-04-00/project-breakdown.md`

## Selection

`HorrorCorridor` was selected from `LuminaryLabs-Publish` because it is the oldest accessible repository in the organization listing and was not already covered by the central Publish breakdown logs found in `LuminaryLabs-Dev/LuminaryLabs`. `TheCavalryOfRome` was explicitly excluded.

## Publish Organization Repos Observed

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome   # excluded by rule
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard       # previously documented
LuminaryLabs-Publish/IntoTheMeadow
```

## Current Product Read

`HorrorCorridor` is a cooperative first-person maze horror game. The current repo is a Next/React app using Three.js for first-person presentation, Zustand for runtime/session/UI stores, PeerJS for multiplayer transport, and local game-state domain modules for maze, player, interaction, networking, ooze trail, anomaly sequence, and win-state logic.

Current game promise:

```txt
Players enter a hostile overgrown broken-city corridor, leave physical traces, recover anomaly cubes, and complete an ordered anomaly sequence before the space overwhelms them.
```

The strongest current direction is not combat. The repo direction frames the game around orientation, memory, traces, cooperative communication, anomaly object recovery, minimal UI, and cumulative domain/content kits.

## Interaction Loop

### Product Loop

```txt
Host or join expedition
  -> enter generated corridor maze
  -> navigate in first person with limited visibility
  -> leave / read ooze trail evidence
  -> discover colored anomaly cubes
  -> carry cubes through the maze
  -> reach the end anomaly room
  -> place cubes into ordered sequence slots
  -> validate sequence state
  -> win or continue searching / correcting
```

### Runtime Loop

```txt
GameShell starts session / room / transport
  -> createInitialGameState builds seeded maze, players, cubes, slots, room
  -> GameCanvas owns frame loop and input bridge
  -> player input advances first-person pose
  -> collision resolves against maze
  -> host publishes authoritative snapshots
  -> clients send player updates / interaction requests
  -> game-state domain rules mutate state
  -> Three renderer presents maze, props, cubes, lighting, fog, camera
  -> HUD/debug/minimap read runtime snapshots
```

### Interaction Command Loop

```txt
Player presses interact
  -> local or network interaction request
  -> pickup / drop / place / remove action resolves through game-state rules
  -> state updates cube ownership, slot occupancy, sequence progress
  -> validateOrderedSequenceCompletion checks victory
  -> snapshot syncs to UI/renderer/peers
```

## Domains In Use

### Game Runtime Domains

- **Session / room domain** — room IDs, join codes, host IDs, lobby players, phases, ready state, peer identity, and connection status.
- **Peer networking domain** — host/client transport, PeerJS connections, protocol envelopes, sync messages, lobby events, player updates, and interaction requests.
- **Seeded maze generation domain** — grid creation, main corridor carving, branch expansion, cube spawn candidates, end cell, target sequence, and deterministic RNG.
- **First-person player domain** — input buttons, pointer lock, yaw/pitch camera look, movement, velocity, eye height, collision, and local pose.
- **Interaction domain** — pickup cube, drop cube, place cube at anomaly, remove cube from anomaly, range validation, carried-object state, and target selection.
- **Anomaly sequence / objective domain** — ordered color slot requirements, slot occupancy, solved/unlocked flags, completion evaluation, and room phase transition.
- **Ooze trail / trace domain** — player trail evidence, decal count, ooze level, decay timing, and trace-based navigation support.
- **Runtime debug domain** — frame records, cadence, snapshot summaries, debug panel, runtime events, and validation extraction.

### Presentation / Host Domains

- **Next app shell domain** — screen routing, loading, start/lobby/pause/completion menus, and client boot.
- **Three renderer domain** — camera, renderer, scene, lights, materials, post-processing, world builder, scene dressing, and procedural shaders.
- **HUD / overlay domain** — minimal overlay, minimap, frame debug panel, settings overlay, and completion screen.
- **Pointer-lock input adapter domain** — browser pointer lock, keyboard input, pointer delta accumulation, and state-scoped input snapshots.

### Kit / Content Domains

- **Local ProtoKit domain** — `src/protokits` contains local generic domain-service kit placeholders and content-pack structure.
- **Scene dressing descriptor domain** — descriptor-driven props, overgrowth, broken-city dressing, procedural materials, and render attach path.
- **Visual review / validation domain** — screenshot capture, reference prompts, visual match loop, live-player harness, live-agent run logs, and review artifacts.

## Services The Kits Offer

### Runtime / Game-State Services

- Seeded maze generation.
- Maze cell lookup and world-position mapping.
- Cube spawn creation and target sequence generation.
- Runtime player pose initialization.
- Carry/drop/place/remove cube interaction rules.
- Ordered anomaly sequence evaluation.
- Victory / room-phase transition logic.
- Ooze trail advancement and decay.
- Snapshot building for replicated game state.

### Networking Services

- Host room creation and peer identity setup.
- Join/lobby event handling.
- Protocol envelope definitions.
- Start-game broadcast.
- Player update messages.
- Interaction request messages.
- Full sync / resync / reconnect payloads.
- Authoritative tick tracking.

### Renderer / Presentation Services

- Three.js renderer/camera/scene/light setup.
- Player camera sync with walking bob/roll.
- Maze/world building.
- Scene dressing descriptors.
- Procedural shader/material support.
- Post-processing hook.
- Minimap and HUD rendering.
- Debug frame capture for inspection.

### Harness / Validation Services

- Static harness run.
- Live player validation harness.
- Live agent loop.
- Object-kit review script.
- Procedural kit smoke script.
- Visual match loop.
- Saved screenshots, reports, and review outputs.

## Kits Identified

### Explicit Local ProtoKit / Content Kit Names Found

- `domainKit`
- `contentPack`
- `content-packs`
- `horrorCorridorKits`
- `mesh-object-kit`
- `mesh-object-kit-catalog`
- `grid-field-domain-kit`
- `grid-maze-domain-kit`
- `corridor-tile-domain-kit`
- `footprint-layout-domain-kit`
- `flashlight-domain-kit`
- `inventory-domain-kit`
- `lighting-descriptor-domain-kit`
- `lighting-placement-domain-kit`
- `corridor-lamp-object-kit`
- `corridor-lamp-object-kit/parts/*`
- `brick-course-texture-kit`
- `moss-grime-texture-kit`
- `damp-mud-texture-kit`
- `grass-object-spawn-kit`
- `barrel-cluster-object-kit`
- `brick-rubble-object-kit`
- `broken-city-wall-kit`
- `broken-concrete-stair-object-kit`
- `broken-generator-object-kit`
- `building-facade-object-kit`
- `cable-run-object-kit`
- `ceiling-service-strip-object-kit`
- `chain-link-fence-object-kit`
- `collapsed-signpost-object-kit`
- `concrete-jersey-barrier-object-kit`
- `corroded-table-object-kit`
- `debris-scatter-object-kit`
- `hanging-chain-hook-object-kit`
- `industrial-shelving-object-kit`
- `loose-floor-slab-object-kit`

### Implemented Non-ProtoKit Runtime Modules That Behave Like Kits

- `generateMaze` / maze generation domain.
- `mazePathing` / route and path domain.
- `cubePlacement` / object placement domain.
- `createInitialGameState` / state bootstrap service.
- `interactionRules` / interaction domain service.
- `winRules` / sequence completion service.
- `oozeRules` / trace service.
- `networkRules` / authoritative sync application service.
- `syncSnapshot` / replicated snapshot service.
- `cameraLook`, `input`, `movement`, `collision` / first-person player stack.
- `runtimeDebugStore` / debug evidence service.
- `GameShell` / host/session shell.
- `GameCanvas` / browser input + Three render loop host.

## Current Architecture Assessment

### Strong Points

- The repo has a clear product direction: cooperative first-person horror, minimal UI, trace-based navigation, and anomaly solving.
- The game-state layer is already split into domain-like modules instead of only one monolithic component.
- Seeded maze generation and snapshot building provide a workable path toward deterministic runs.
- The protocol is explicit: `START_GAME`, `PLAYER_UPDATE`, `TRY_INTERACT`, `SYNC`, and `LOBBY_EVENT`.
- The harness and visual review layer is unusually strong for an early game repo.
- Local ProtoKit intent is documented, and the repo already distinguishes generic kits, presets, and content packs.

### Main Risks

- `GameCanvas` currently carries too much host/render/runtime coordination and should be reduced over time.
- Some runtime state still uses `Date.now()` and `Math.random()` in host/session setup paths. That is acceptable for room/player identity, but deterministic gameplay state should stay seeded and replay-safe.
- Many ProtoKit files appear placeholder-sized from commit metadata, so the kit catalog may be ahead of implementation.
- Renderer and scene dressing descriptors need clear boundaries: visual-only props should remain descriptors until collision/interaction is intentionally promoted.
- Multiplayer authority needs more explicit conflict rules for simultaneous cube interactions and anomaly placement.
- Sequence logic exists as ordered slots, but authored horror pacing is still thin.

## Recommended Next Work

### 1. Extract a Corridor Runtime Core Layer

Move the game tick / interaction / snapshot coordination currently concentrated around `GameCanvas` into a clearer runtime service boundary:

```txt
corridor-runtime-domain-kit
  owns:
    tick cadence
    local player action application
    authoritative snapshot production
    interaction dispatch
    debug trace emission
```

Keep Three.js scene mutation outside this kit.

### 2. Formalize Interaction Idempotency

Add stable interaction request IDs and ledgers for:

- cube pickup
- cube drop
- cube placement
- cube removal
- ready toggle
- sync request

This matters most in multiplayer because duplicate or delayed interaction messages should not double-apply state.

### 3. Turn Anomaly Sequence Into A Real Domain Kit

Create:

```txt
anomaly-sequence-domain-kit
```

It should own:

- sequence slots
- required colors
- slot occupancy
- solved/unlocked state
- rejection reasons
- completion events
- duplicate placement protection

### 4. Promote Maze Generation To A Documented Domain Kit

Create a README/manifest for:

```txt
grid-maze-domain-kit
```

It should document:

- seeded RNG contract
- grid values
- start/end cell selection
- branch generation rules
- cube spawn contract
- pathing requirements
- snapshot/debug output

### 5. Add Scene Dressing Manifest Proof

The repo has a large direction around descriptor-driven props and material kits. Add a single registry file:

```txt
src/protokits/protokit-registry.json
```

Minimum fields:

```txt
id
status
provides
requires
rendererCoupled
previewRoute
smokeCommand
promotionBlockers
```

### 6. Add Browser Route / Live Link Documentation

Add a root README or product handoff with:

- install
- build
- dev
- validation commands
- known routes
- multiplayer notes
- current status
- current limitations

The repo currently has deep documentation but no root README surfaced through the default repository view.

### 7. Add Thin Headless Tests Before More Visual Growth

Minimum smoke targets:

- seeded maze output is stable for same seed
- all cubes have reachable path candidates
- pickup/drop/place state transitions are valid
- wrong anomaly order does not complete
- correct order completes exactly once
- duplicate request IDs do not duplicate placement
- snapshot serialization round-trips

### 8. Keep Combat Out For Now

Do not add enemies or weapons next. The stronger path is:

```txt
orientation pressure
trace reading
cooperative split routes
environmental hazards
false anomaly sequences
moving darkness / fog pressure
```

## Best Next Vertical Slice

```txt
Anomaly Sequence Domain Kit + interaction request ledger + headless sequence smoke tests
```

Minimum implementation checklist:

- [ ] Add `anomaly-sequence-domain-kit` manifest/README.
- [ ] Move slot evaluation out of loose win rules into the kit boundary.
- [ ] Add request IDs to cube placement actions.
- [ ] Add duplicate placement rejection.
- [ ] Emit completion/rejection debug facts.
- [ ] Add headless smoke tests for correct order, wrong order, and duplicate placement.
- [ ] Leave renderer untouched except for reading the resulting descriptors/state.

## Status

This run was documentation-only. No runtime code was changed.
