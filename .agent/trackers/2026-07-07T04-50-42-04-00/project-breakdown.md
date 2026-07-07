# HorrorCorridor Project Breakdown

**Run timestamp:** `2026-07-07T04:50:42-04:00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Default branch:** `main`

**Selected because:** `HorrorCorridor` was the oldest eligible canonical Publish ledger in the tracked set after the most recent follow-up cycle, and `TheCavalryOfRome` remains excluded by rule.

## Current Read

`HorrorCorridor` is a cooperative first-person corridor horror prototype built as a Next/React app with Three.js rendering, Zustand state stores, and PeerJS networking.

The current runtime is already a playable loop, but its highest-risk architecture issue is concentration of orchestration inside `GameShell.tsx` and `GameCanvas.tsx`.

`GameShell.tsx` owns start/join/host/solo selection, lobby setup, PeerJS host/client lifecycle, loading steps, UI phase transitions, bootstrap state creation, and network snapshot broadcast.

`GameCanvas.tsx` owns renderer setup, scene creation, post-processing, maze world construction, pointer lock, keyboard/mouse input, local movement, collision, host/client sync, interaction requests, ooze advancement, minimap drawing, debug frame capture, and runtime disposal.

The local ProtoKit/content-pack layer is broad enough to justify a canonical kit registry. This run adds that registry in `.agent/kit-registry.json`.

## Interaction Loop

```txt
START
  -> choose Solo, Host, or Join
  -> build room, peer identity, lobby players, and join code
  -> run loading sequence
       Maze field
       Terrain raycast
       Object kits
       PBR materials
       Lighting pass
  -> create seeded maze snapshot
  -> spawn local player into first-person maze
  -> navigate with WASD / pointer look
  -> follow lights, props, guide paths, and ooze trails
  -> find colored anomaly cubes
  -> pick up, carry, drop, or place cubes
  -> reach end anomaly
  -> fill ordered anomaly sequence slots
  -> validate exact color order
  -> victory screen or continue correcting sequence
  -> return to lobby/title
```

## Domains in Use

### Application and session domains

- Start/menu domain.
- Join-code domain.
- Host lobby domain.
- Client lobby domain.
- Solo run domain.
- Loading/readiness domain.
- Pause/completion UI domain.
- Room/player identity domain.

### Networking domains

- PeerJS host transport domain.
- PeerJS client transport domain.
- Lobby event domain.
- Start-game broadcast domain.
- Full-sync snapshot domain.
- Player-update domain.
- Interaction-request domain.
- Host-authoritative reconciliation domain.

### Simulation and gameplay domains

- Seeded maze generation domain.
- Maze snapshot/domain lookup domain.
- First-person input domain.
- Pointer-lock look domain.
- Player movement domain.
- Maze collision domain.
- Cube inventory/carry domain.
- Spatial interaction domain.
- End-anomaly ordered sequence domain.
- Victory validation domain.
- Ooze trail evidence domain.

### Render and scene domains

- Three renderer domain.
- Camera domain.
- Post-processing domain.
- Terrain projection domain.
- Static maze instancing domain.
- Start/end lighting domain.
- Cube mesh/light sync domain.
- Player representation domain.
- Flashlight domain.
- Ooze decal domain.
- Scene dressing descriptor domain.
- Scene dressing renderer domain.
- Minimap domain.

### Kit and tooling domains

- ProtoKit descriptor domain.
- Object-kit catalog domain.
- Procedural material/texture domain.
- Review room domain.
- Smoke-test domain.
- Live-agent domain.
- Runtime debug-frame domain.
- Visual-match validation domain.

## Service Surfaces

### Session shell service

Provides:

- `enterSoloRun`
- `enterHostLobby`
- `enterClientLobby`
- `startPlay`
- `returnToLobby`
- `returnToStart`
- `toggleReady`
- room creation
- join-code creation
- player identity creation
- loading-step playback
- UI screen transitions

Needs extraction into:

- `corridor-session-domain-kit`
- `corridor-loading-readiness-kit`
- `corridor-lobby-ui-kit`

### Peer sync service

Provides:

- host creation
- client creation
- peer status mapping
- lobby event broadcast
- start-game broadcast
- full-sync broadcast
- player-update handling
- interaction-request handling

Needs extraction into:

- `peer-room-sync-domain-kit`
- `host-authoritative-snapshot-kit`
- `client-predicted-input-kit`

### Seeded maze state service

Provides:

- seed hashing
- grid maze generation
- maze cell snapshots
- cube snapshots
- sequence slots
- player spawn positions
- replicated snapshot construction

Needs extraction into:

- `grid-maze-domain-kit`
- `maze-snapshot-bootstrap-kit`

### Player service

Provides:

- pointer-lock state
- keyboard-to-button mapping
- look delta accumulation
- yaw/pitch update
- camera-relative movement
- maze collision resolution
- local pose sync

Needs extraction into:

- `first-person-corridor-player-kit`
- `pointer-lock-input-kit`
- `maze-collision-kit`

### Interaction and objective service

Provides:

- nearest cube selection
- pickup/drop
- place cube at end anomaly
- remove cube from anomaly
- carry-state sync
- ordered slot validation
- victory state transition

Needs extraction into:

- `cube-carry-interaction-kit`
- `end-anomaly-sequence-kit`
- `single-item-inventory-kit`

### Ooze trail service

Provides:

- ooze decay interval
- ooze spawn spacing
- max ooze cap
- player-position-based trail generation
- scale decay
- decal count tracking

Needs extraction into:

- `ooze-trail-navigation-kit`
- `trail-decal-domain-kit`

### Render service

Provides:

- renderer/camera/post-processing creation
- maze static instancing
- terrain height projection
- scene dressing manifest rendering
- cube mesh/light sync
- player mesh sync
- flashlight sync
- ooze decal sync
- minimap drawing
- disposal

Needs extraction into:

- `maze-world-render-kit`
- `corridor-terrain-projection-kit`
- `scene-dressing-render-kit`
- `runtime-minimap-kit`

### Diagnostics and harness service

Provides:

- runtime debug initialization
- event logging
- frame recording
- cadence windows
- UI/input/snapshot summaries
- harness scripts
- visual match and object-kit review scripts

Needs extraction into:

- `runtime-debug-frame-kit`
- `live-player-validation-kit`
- `object-kit-review-kit`

## Kit Inventory

### Existing documented domain kits

```txt
grid-maze-domain-kit
grid-field-domain-kit
raymarch-sampling-domain-kit
inventory-domain-kit
spatial-interaction-domain-kit
sequence-objective-domain-kit
trail-decal-domain-kit
prop-descriptor-domain-kit
object-placement-domain-kit
procedural-pbr-material-domain-kit
texture-placement-domain-kit
lighting-descriptor-domain-kit
lighting-placement-domain-kit
scene-dressing-domain-kit
walkthrough-domain-kit
scene-generation-domain-kit
render-validation-domain-kit
wound-triangle-mesh-domain-kit
```

### Existing object kits from the mesh catalog

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

### Additional object/texture kits observed in source search

```txt
vent-object-kit
pipe-run-object-kit
cable-run-object-kit
overgrowth-object-kit
wall-panel-object-kit
rock-cluster-object-kit
brick-rubble-object-kit
utility-crate-object-kit
storage-crate-object-kit
debris-scatter-object-kit
corroded-table-object-kit
building-facade-object-kit
loose-floor-slab-object-kit
pedestal-dressing-object-kit
ceiling-service-strip-object-kit
brick-course-texture-kit
damp-mud-texture-kit
rust-streak-texture-kit
moss-grime-texture-kit
wet-concrete-texture-kit
```

### Runtime extraction kits

```txt
corridor-session-domain-kit
corridor-loading-readiness-kit
peer-room-sync-domain-kit
host-authoritative-snapshot-kit
client-predicted-input-kit
first-person-corridor-player-kit
pointer-lock-input-kit
maze-collision-kit
maze-snapshot-bootstrap-kit
cube-carry-interaction-kit
end-anomaly-sequence-kit
ooze-trail-navigation-kit
maze-world-render-kit
corridor-terrain-projection-kit
scene-dressing-render-kit
runtime-minimap-kit
runtime-debug-frame-kit
live-player-validation-kit
object-kit-review-kit
```

## Key Findings

- The game loop is playable and understandable, but the runtime is still too monolithic.
- The scene is already feature-rich: maze field, terrain projection, guide path cues, cube objective, anomaly sequence, ooze trail, flashlight, minimap, and debug capture are all present.
- The strongest immediate documentation gap was a canonical kit registry, now added as `.agent/kit-registry.json`.
- The strongest implementation gap is service extraction without regressing the current playable loop.
- The highest-value next slice is not new content. It is a service cutover that makes the existing loop easier to test and extend.

## Recommended Next Work

### `HorrorCorridor Service Registry Cutover`

```txt
1. Preserve the current playable loop exactly.
2. Move GameShell session/lobby/loading behavior behind corridor-session-domain-kit.
3. Move PeerJS host/client message handling behind peer-room-sync-domain-kit.
4. Move local input, pointer lock, movement, and collision behind first-person-corridor-player-kit.
5. Move pickup/drop/place/remove behavior behind cube-carry-interaction-kit.
6. Move ordered anomaly validation behind end-anomaly-sequence-kit.
7. Move ooze spawn/decay/decal descriptors behind ooze-trail-navigation-kit.
8. Move buildMazeWorld static/cube/player/ooze sync behind maze-world-render-kit.
9. Keep GameShell and GameCanvas as thin composition hosts.
10. Add smoke fixtures for solo start, cube pickup/drop, correct anomaly order, wrong-order correction, ooze cap/decay, and host snapshot cadence.
```

## Files Added or Updated This Run

```txt
.agent/trackers/2026-07-07T04-50-42-04-00/project-breakdown.md
.agent/kit-registry.json
.agent/README.md
```
