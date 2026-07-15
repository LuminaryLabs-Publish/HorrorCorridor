# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Timestamp:** `2026-07-15T11-39-04-04-00`  
**Status:** `minimap-backing-store-dpr-resize-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, deterministic maze bootstrap, PeerJS and BroadcastChannel transport, local movement prediction, host snapshots, cube/anomaly interactions, ooze, Three.js rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

This audit isolates the minimap backing-store boundary. `drawMinimapFrame()` runs from every active render frame, reacquires the canvas and 2D context, multiplies the fixed logical map size by the current raw device-pixel ratio, compares integer canvas dimensions against those floating-point products and rewrites both dimensions when they differ. When `168 * devicePixelRatio` is non-integral, the canvas properties coerce the assigned values to integers, so the next frame can observe the same mismatch and reset the backing store again.

## Plan ledger

**Goal:** give the minimap one revisioned, integer-quantized render-surface owner that changes its backing store only when the accepted CSS size or DPR policy changes, while preserving snapshot, player-pose and visual ownership.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central-ledger entries.
- [x] Confirm ten eligible root `.agent` states.
- [x] Compare every eligible repository head with its documented repo-local head.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead repositories.
- [x] Select only HorrorCorridor by the oldest synchronized central timestamp.
- [x] Inspect `GameCanvas.tsx`, `Minimap.tsx`, animation ownership, package scripts and the existing kit registry.
- [x] Identify the complete interaction loop, all domains, all kits and every offered service.
- [x] Preserve the existing 29 implemented kits and two browser-proof adapters.
- [x] Define one minimap backing-store authority and 18 coordinating surfaces.
- [x] Add a new timestamped tracker and focused audit family.
- [x] Keep runtime, networking, gameplay, rendering, packages, tests, workflows and deployment unchanged.
- [x] Create no branch and no pull request.
- [ ] Implement and execute fractional-DPR, context-generation, resize and visible-frame fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/HorrorCorridor
selection rule: oldest synchronized central timestamp
prior central timestamp: 2026-07-15T07-00-28-04-00
next oldest: LuminaryLabs-Publish/TheOpenAbove at 2026-07-15T07-39-52-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
solo, host or client route
  -> establish deterministic maze and session snapshot
  -> GameCanvas creates renderer, scene, camera, post-processing, world and input
  -> active RAF advances local or authoritative simulation
  -> host publishes snapshots or client sends player updates
  -> accepted snapshot and local pose reach world presentation

renderFrame
  -> derive camera position and camera shake
  -> update Three.js world from accepted snapshot and local pose
  -> locate #runtime-minimap through document.getElementById
  -> call drawMinimapFrame
  -> obtain CanvasRenderingContext2D
  -> read raw window.devicePixelRatio
  -> compute 168 * DPR floating-point dimensions
  -> compare integer canvas.width/height with floating-point products
  -> rewrite both backing-store dimensions when unequal
  -> restore DPR transform after any reset
  -> clear and redraw maze, ooze, cubes, remote players and local heading
  -> capture debug frame
  -> render post-processing output
```

## Current minimap surface path

```txt
logical map size: 168 x 168 CSS pixels
DPR source: window.devicePixelRatio || 1
physical width expression: 168 * DPR
physical height expression: 168 * DPR
physical-dimension quantization policy: implicit platform coercion
accepted surface descriptor: absent
context generation: absent
surface revision: absent
snapshot revision bound to frame result: absent
first resized minimap frame acknowledgement: absent
```

### Stable case

```txt
DPR 1.00 -> 168.0 -> integer property 168 -> later comparison stable
DPR 1.25 -> 210.0 -> integer property 210 -> later comparison stable
DPR 1.50 -> 252.0 -> integer property 252 -> later comparison stable
```

### Mismatch-permitted case

```txt
DPR 1.10 -> 184.8 -> canvas property becomes an integer
next frame -> integer property !== 184.8
           -> width and height are assigned again
           -> backing store and drawing state are reset again
```

The same risk exists for browser zoom and device combinations whose effective DPR does not make `168 * DPR` integral. This is a source-permitted lifecycle path, not a measured claim about a particular device or browser session.

## Domains in use

```txt
application routing and browser lifecycle
session identity room roster connection readiness and reset
loading and deterministic maze bootstrap
PeerJS BroadcastChannel transport and protocol
keyboard mouse pointer-lock and normalized input
client prediction and authoritative publication
movement collision camera and interaction
cube anomaly ooze and victory
pause settings completion and route projection
Three.js renderer scene camera world post-processing RAF and viewport
Canvas2D minimap surface acquisition sizing transform and drawing
browser viewport CSS size device-pixel-ratio and zoom state
minimap snapshot player-pose and heading projection
render-surface descriptor quantization context generation and resize admission
visible-frame acknowledgement diagnostics fixtures build deployment and central tracking
```

## Implemented kits and offered services

### Application and session

```txt
corridor-application-shell-kit
  routing
  solo/host/client entry
  loading
  pause
  completion
  exit

corridor-session-domain-kit
  identity
  room
  roster
  connection
  readiness
  reset

runtime-store-snapshot-kit
  authoritative snapshot
  local pose
  view angles
  input flags
  readiness

ui-pause-projection-kit
  pause state
  pause reason
  pause overlay

ui-completion-projection-kit
  terminal state
  message
  timestamp
  route projection

complete-screen-presentation-kit
  outcome presentation
  restart
  title exit

lobby-screen-presentation-kit
  room projection
  roster projection
  ready state
  controls
```

### Networking and protocol

```txt
peer-host-transport-kit
  PeerJS host
  BroadcastChannel bridge
  connection ownership
  broadcast
  targeted send
  disconnect
  destroy

peer-client-transport-kit
  PeerJS client
  BroadcastChannel bridge
  connect
  send
  status
  disconnect
  destroy

peer-event-bus-kit
  typed transport events
  subscription
  cleanup

protocol-message-construction-kit
  START_GAME
  PLAYER_UPDATE
  TRY_INTERACT
  SYNC
  LOBBY_EVENT

protocol-serialization-kit
  encode
  decode
  protocol version
  structural validation
```

### Maze, player and gameplay

```txt
maze-snapshot-bootstrap-kit
  seed
  maze
  players
  cubes
  anomaly
  initial snapshot

seeded-maze-rng-kit
  topology
  placement
  target sequence

first-person-input-kit
  keyboard
  pointer lock
  mouse look
  normalized snapshots

movement-collision-camera-kit
  movement integration
  maze collision
  eye pose
  walk shake
  camera projection

network-player-update-kit
  sequence generation
  cadence
  pose envelope
  host consumption

corridor-interaction-domain-kit
  pickup
  drop
  place
  remove
  held-cube synchronization

ordered-anomaly-sequence-kit
  ordered slots
  validation
  rollback
  victory

ooze-trail-domain-kit
  spawn
  decay
  variation
  spacing
  capacity
  pressure

snapshot-outcome-routing-kit
  snapshot state to UI outcome

corridor-authoritative-publication-kit
  state tick
  snapshot clone
  SYNC construction
  broadcast
```

### Rendering, diagnostics and delivery

```txt
corridor-animation-loop-kit
  RAF start
  RAF stop
  measured delta
  elapsed time
  successor scheduling

corridor-render-world-kit
  terrain
  maze
  cubes
  remote players
  anomaly
  ooze
  lights
  frame update
  disposal

corridor-post-processing-kit
  composer
  bloom
  resize
  render
  disposal

corridor-minimap-kit
  canvas acquisition
  DPR-aware backing-store sizing
  logical transform
  maze projection
  ooze projection
  cube projection
  remote-player projection
  local heading projection

runtime-debug-frame-kit
  activation
  bounded frame capture
  bounded event capture
  overlay
  export

runtime-resource-cleanup-kit
  loop stop
  transport unsubscribe
  listener removal
  observer disconnect
  GPU cleanup

package-validation-kit
  build
  lint
  harness
  visual checks
  live-player checks
```

### Browser-proof adapters

```txt
live-agent-runner-adapter
  episode scheduling
  adaptive action selection
  child execution
  JSONL history
  latest summary

live-player-browser-proof-adapter
  server and browser admission
  route control
  debug readback
  screenshots
  image probes
  proof gates
```

## Inventory totals

```txt
implemented kits: 29
browser-proof adapters: 2
total implemented surfaces: 31
planned minimap authority surfaces: 18
```

## Source-backed finding

`Minimap.tsx` computes `scaledWidth` and `scaledHeight` directly from `MAP_SIZE * devicePixelRatio`. It compares those floating-point values with the integer `canvas.width` and `canvas.height` properties. Assigning either dimension recreates the canvas backing store and resets the context state. The code then restores the transform and redraws, but it has no integer descriptor that can remain equal across frames when the product is non-integral.

`GameCanvas.tsx` calls this path from every `renderFrame`, reacquires the element by ID and obtains the 2D context before each draw. The package exposes browser and visual harnesses, but there is no dedicated fractional-DPR minimap fixture, dimension-write trace, context-generation receipt or first matching minimap-frame acknowledgement.

## Required authority

```txt
corridor-minimap-backing-store-revision-authority-domain
```

```txt
MinimapSurfaceAdmissionCommand
  -> bind MinimapSurfaceId, ViewportRevision and DprPolicyRevision
  -> bind logical CSS dimensions and prior ContextGeneration
  -> normalize and clamp effective DPR
  -> quantize physical width and height once through an explicit integer policy
  -> compare the accepted integer descriptor with the current backing store
  -> resize only when that accepted descriptor changes
  -> acquire and retain one context for the active surface generation
  -> restore the logical-coordinate transform after an admitted resize
  -> bind SnapshotRevision, LocalPoseRevision and HeadingRevision
  -> create one immutable MinimapFramePlan
  -> execute maze, ooze, cube, remote-player and local-heading draws
  -> publish MinimapSurfaceResult and MinimapFrameResult
  -> acknowledge FirstMinimapResizeFrameAck
  -> retire the surface and context generation on unmount or replacement
```

## Planned authority surfaces

```txt
minimap-surface-identity-kit
minimap-logical-size-descriptor-kit
browser-dpr-capability-snapshot-kit
minimap-dpr-policy-revision-kit
physical-pixel-quantization-kit
minimap-backing-store-descriptor-kit
minimap-resize-admission-kit
canvas-context-generation-kit
minimap-logical-transform-kit
minimap-frame-plan-kit
minimap-snapshot-revision-kit
minimap-player-pose-revision-kit
minimap-draw-execution-kit
minimap-surface-result-kit
minimap-frame-result-kit
first-minimap-resize-frame-ack-kit
minimap-surface-retirement-kit
fractional-dpr-minimap-fixture-kit
```

## Required proof matrix

```txt
DPR 1.00
  -> 168 x 168 physical pixels
  -> one initial resize
  -> zero unchanged-frame dimension writes

DPR 1.10
  -> explicitly quantized integer dimensions
  -> one resize for the admitted descriptor
  -> zero unchanged-frame dimension writes

DPR 1.25 / 1.50 / 1.75 / 2.00
  -> deterministic integer descriptors
  -> stable context generation

browser zoom transition
  -> one new DprPolicyRevision
  -> one admitted resize
  -> first matching minimap frame acknowledgement

route unmount/remount
  -> old surface retired once
  -> new SurfaceId and ContextGeneration

source, production build and deployed origin
  -> matching surface descriptors and frame probes
```

## Repo-local output

Added:

```txt
.agent/trackers/2026-07-15T11-39-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T11-39-04-04-00.md
.agent/architecture-audit/2026-07-15T11-39-04-04-00-minimap-backing-store-dpr-dsk-map.md
.agent/render-audit/2026-07-15T11-39-04-04-00-fractional-dpr-canvas-reset-gap.md
.agent/gameplay-audit/2026-07-15T11-39-04-04-00-snapshot-to-minimap-frame-loop.md
.agent/interaction-audit/2026-07-15T11-39-04-04-00-minimap-surface-command-result-map.md
.agent/minimap-audit/2026-07-15T11-39-04-04-00-backing-store-quantization-context-contract.md
.agent/deploy-audit/2026-07-15T11-39-04-04-00-fractional-dpr-minimap-fixture-gate.md
.agent/central-sync-audit/2026-07-15T11-39-04-04-00-oldest-selection-minimap-reconciliation.md
```

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation boundary

```txt
documentation changed: yes
runtime TypeScript changed: no
network behavior changed: no
input behavior changed: no
gameplay changed: no
Three.js behavior changed: no
Canvas2D behavior changed: no
packages or dependencies changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm install/lint/build: not run
fractional-DPR browser fixture: unavailable
dimension-write trace: unavailable
context-generation trace: unavailable
source/build/deployed-origin parity: not run
```

No runtime repair, performance improvement, visual defect reproduction, stable context generation, browser parity or production readiness is claimed.