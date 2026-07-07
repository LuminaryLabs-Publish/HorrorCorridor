# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-07T03:38:41-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Default branch:** `main`

**Selection reason:** `HorrorCorridor` is the oldest eligible `LuminaryLabs-Publish` repo observed in the current publish organization scan. `TheCavalryOfRome` remains excluded by rule. This pass updates the existing root `.agent` tracker with a fresh, timestamped follow-up entry instead of switching projects mid-run.

## Current Read

`HorrorCorridor` is a cooperative first-person corridor horror prototype implemented as a Next/React/Three/Zustand app with PeerJS networking. The project already contains a playable solo/host/client shell, seeded maze generation, first-person pointer-lock movement, ordered anomaly cube interaction, ooze-trail navigation traces, runtime debug capture, procedural scene dressing, and a substantial local domain-kit/protokit workspace.

The strongest product identity is not generic maze horror. It is a cooperative trace-reading expedition where players navigate a generated liminal/industrial corridor, leave readable ooze evidence, find colored anomaly cubes, carry and place cubes into an ordered end anomaly, and validate completion through the corridor accepting the run.

## Interaction Loop

```txt
Start screen
  -> choose solo, host, or join
  -> enter lobby / generated solo setup
  -> run loading steps for maze field, terrain, object kits, materials, and lighting
  -> spawn into generated first-person maze
  -> move with WASD / arrows and pointer-lock look
  -> follow path memory, lights, props, and ooze traces
  -> find colored anomaly cubes
  -> pick up / carry / drop cubes
  -> reach end anomaly
  -> place cubes into ordered slots
  -> validate sequence
  -> complete run or remove/correct cubes
  -> return to lobby/title for another run
```

## Domains In Use

### Application/session domains

- Start/menu flow domain.
- Loading/readiness domain.
- Room/lobby domain.
- Solo session domain.
- Host session domain.
- Client session domain.
- Completion/pause UI domain.

### Network domains

- PeerJS host/client transport domain.
- Room join-code domain.
- Lobby event domain.
- Start-game broadcast domain.
- Full-sync snapshot domain.
- Player-update message domain.
- Interaction-request message domain.
- Host-authoritative reconciliation domain.

### Simulation/gameplay domains

- Seeded maze generation domain.
- Maze cell/snapshot domain.
- Maze pathing/domain lookup.
- First-person input domain.
- Pointer-lock domain.
- Player movement domain.
- Player camera-look domain.
- Maze collision domain.
- Cube ownership/carry/drop domain.
- End anomaly placement domain.
- Ordered sequence objective domain.
- Victory validation domain.
- Ooze trail spawn/decay domain.

### Rendering/scene domains

- Three renderer domain.
- Camera domain.
- Post-processing domain.
- Static maze instancing domain.
- Terrain surface projection domain.
- Lighting domain.
- Scene dressing descriptor domain.
- Scene dressing renderer domain.
- Cube render sync domain.
- Player representation domain.
- Flashlight/follow-light domain.
- Ooze decal instancing domain.
- Minimap draw domain.

### Diagnostics/tooling domains

- Runtime debug-event domain.
- Runtime debug-frame domain.
- Readiness tracking domain.
- Harness domain.
- Live-agent domain.
- Visual-match review domain.
- Procedural-kit smoke domain.
- Object-kit review domain.

## Services That Existing Runtime/Kits Offer

### Game shell services

- Create host lobby.
- Create client lobby.
- Create solo run.
- Generate room IDs and join codes.
- Maintain room/session state.
- Run staged loading sequence.
- Start host game and broadcast start/sync messages.
- Return to lobby/title.
- Track screen, overlay, readiness, pause, and completion state.

### Runtime canvas services

- Initialize Three renderer, scene, camera, post-processing, and maze world.
- Convert authoritative snapshots into local maze/game state.
- Step local player pose.
- Apply player look deltas.
- Resolve maze collision.
- Publish authoritative snapshots.
- Send client player updates.
- Send client interaction requests.
- Apply local authoritative interactions.
- Commit victory.
- Sync React/Zustand runtime stores on a fixed UI cadence.
- Record runtime debug events and frame captures.
- Render minimap frames.
- Dispose renderer/world resources cleanly.

### Gameplay domain services

- Generate seeded maze with start/end/cube placements.
- Create initial replicated game state.
- Pick up nearest loose cube.
- Drop carried cube.
- Place carried cube at end anomaly.
- Remove last cube from anomaly.
- Sync held cube positions to player positions.
- Apply network player updates.
- Apply network interaction requests.
- Validate ordered sequence completion.
- Spawn ooze trail decals from player positions.
- Decay existing ooze trail marks.

### Render/scene services

- Build instanced maze floor, ceiling, and wall layers.
- Project terrain heights into maze floors/walls.
- Build start/end lights and anomaly orb/halo.
- Build pedestal and guide path visuals.
- Generate scene dressing descriptors from the horror-corridor preset.
- Render scene props, projected textures, and local lights.
- Pulse prop/texture emissive and opacity values.
- Sync cube meshes and cube lights from replicated snapshots.
- Render player markers and a floating flashlight/follow light.
- Render ooze decals through instancing.

### Harness/tool services

- `npm run harness:horror-corridor`
- `npm run live-agent`
- `npm run live-agent:sample`
- `npm run review:live-agent`
- `npm run review:object-kit`
- `npm run smoke:protokits`
- `npm run visual:match`
- `npm run validate:live-player`
- `npm run validate:live-player:dev`

## Kits Identified

### Generic/local domain kits

- `grid-maze-domain-kit`
- `grid-field-domain-kit`
- `raymarch-sampling-domain-kit`
- `inventory-domain-kit`
- `spatial-interaction-domain-kit`
- `sequence-objective-domain-kit`
- `trail-decal-domain-kit`
- `prop-descriptor-domain-kit`
- `object-placement-domain-kit`
- `procedural-pbr-material-domain-kit`
- `texture-placement-domain-kit`
- `lighting-descriptor-domain-kit`
- `lighting-placement-domain-kit`
- `scene-dressing-domain-kit`
- `walkthrough-domain-kit`
- `scene-generation-domain-kit`
- `render-validation-domain-kit`
- `wound-triangle-mesh-domain-kit`

### Object / mesh kits

- `corridor-lamp-object-kit`
- `rusted-service-door-object-kit`
- `chain-link-fence-object-kit`
- `broken-generator-object-kit`
- `concrete-jersey-barrier-object-kit`
- `storm-drain-culvert-object-kit`
- `collapsed-signpost-object-kit`
- `industrial-shelving-object-kit`
- `hanging-chain-hook-object-kit`
- `barrel-cluster-object-kit`
- `broken-concrete-stair-object-kit`

### Runtime extraction candidates that should become kits/services

- `corridor-session-domain-kit`
- `peer-room-sync-domain-kit`
- `first-person-corridor-player-kit`
- `pointer-lock-input-kit`
- `maze-collision-kit`
- `cube-carry-interaction-kit`
- `end-anomaly-sequence-kit`
- `ooze-trail-navigation-kit`
- `maze-world-render-kit`
- `runtime-debug-frame-kit`
- `live-player-validation-kit`

## Architectural Read

`GameShell` owns too much application/session orchestration. It creates and destroys transports, mutates session/UI/runtime stores, performs loading, creates solo/bootstrap state, starts host games, and broadcasts sync messages.

`GameCanvas` owns too much runtime orchestration. It initializes rendering, derives game state from snapshots, manages authoritative host simulation, steps client simulation, handles input, applies interactions, publishes sync, captures debug frames, updates minimap, and disposes render resources.

The underlying domain files are healthier than the host components. The rule modules already provide good extraction seams: `createInitialGameState`, `networkRules`, `interactionRules`, `winRules`, `oozeRules`, player input/movement/collision, and maze generation/pathing can be wrapped into clearer service kits without changing the player-facing loop.

## Current Strengths

- The first-person play loop exists and is not just a static scene.
- The solo/host/client shell is already wired.
- Host-authoritative sync exists through replicated snapshots.
- Interaction rules are deterministic and small enough to promote.
- Ordered anomaly completion is explicit and testable.
- Ooze trail behavior creates a distinctive navigation/readability mechanic.
- Local kit catalog is unusually broad for a publish repo.
- Tooling scripts already cover harnesses, live player validation, visual matching, and protokit smoke.

## Current Risks

- `GameShell` and `GameCanvas` are acting as runtime monoliths.
- Kit names exist, but some are still descriptor/catalog-first rather than live runtime services.
- Network interaction requests do not yet appear to carry enough explicit target context for every future interaction variant.
- The anomaly loop is mechanically viable, but the player-facing feedback layer needs stronger affordance, blocked-state, and correction messaging.
- The scene dressing is connected, but promotion state for each object kit needs a canonical registry with review status.
- Multiplayer may work technically but still needs deterministic replay / desync checks around carry/drop/place order.

## Recommended Next Slice

### `HorrorCorridor Runtime Service Cutover`

Goal: preserve the current playable loop while extracting service seams from `GameShell` and `GameCanvas`.

Checklist:

- [ ] Add `.agent/kit-registry.json` with each kit's status: `descriptor`, `smoke-tested`, `review-room-passed`, `live-wired`, or `blocked`.
- [ ] Extract session lifecycle from `GameShell` into `corridor-session-domain-kit`.
- [ ] Extract host/client sync from `GameShell` and `GameCanvas` into `peer-room-sync-domain-kit`.
- [ ] Extract interaction action selection into `cube-carry-interaction-kit` so UI/runtime only submits intents.
- [ ] Extract sequence slot validation into `end-anomaly-sequence-kit` with headless tests.
- [ ] Extract ooze trail spawn/decay/descriptor output into `ooze-trail-navigation-kit`.
- [ ] Move minimap draw inputs behind a diagnostics/minimap adapter.
- [ ] Keep `GameCanvas` as a thin host: initialize services, wire frame loop, render service outputs.
- [ ] Add smoke tests for: deterministic maze seed, cube pickup/drop, anomaly correct order, anomaly wrong order, ooze trail cap/decay, host snapshot publish cadence.

## Ideation: What This Project Should Become Next

### 1. Make ooze trails the signature co-op mechanic

The best next design move is to treat ooze not as decoration but as shared navigation language.

- Fresh trails glow softly.
- Old trails shrink and darken.
- Crossed trails imply backtracking.
- Dense trail clusters imply search zones.
- The end anomaly can pulse more strongly when the team has followed enough trace evidence.

### 2. Make anomaly cubes more legible

The cube sequence should feel like ritual evidence, not just color sorting.

- Each cube color should emit a unique sound/filter cue.
- Incorrect placement should produce blocked feedback without ending the run.
- Removed cubes should leave residue on the slot.
- The ordered sequence should be discoverable through corridor signs, lamps, wall stains, or prop clusters.

### 3. Promote object kits through review rooms

The object-kit catalog should not all be considered live-ready at once.

Promotion ladder:

```txt
descriptor exists
  -> smoke passes
  -> review room passes
  -> live placement budget added
  -> gameplay affordance assigned
  -> promoted to scene-generation preset
```

### 4. Split the runtime around hard service boundaries

Target shape:

```txt
GameShell
  -> session service
  -> room sync service
  -> loading/readiness service

GameCanvas
  -> input service
  -> player simulation service
  -> interaction service
  -> objective service
  -> world render service
  -> diagnostics service
```

### 5. Add replayable proof

Before adding new content, add deterministic replay proof for the core loop.

Minimum replay trace:

```txt
seed
player spawn
move path to cube
pickup
move path to anomaly
place cube
repeat for sequence
validate victory
```

## Immediate Build Order

1. Create kit registry.
2. Add headless tests for interaction/win/ooze rules.
3. Extract interaction intent selection.
4. Extract session lifecycle service.
5. Extract peer sync service.
6. Add blocked-feedback records for failed interactions.
7. Promote one object kit fully into live scene placement.
8. Add replay trace fixture for one successful run.

## Change Summary

This run adds a follow-up architecture breakdown for `HorrorCorridor`, focused on turning the already-playable cooperative maze prototype into a cleaner DSK/service architecture while preserving the current loop.
