# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-16T16-00-12-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `remote-actor-snapshot-interpolation-projection-authority-audited`

## Summary

HorrorCorridor was selected after the complete 11-repository `LuminaryLabs-Publish` inventory was compared with the ten eligible central ledgers and root `.agent` states. `TheCavalryOfRome` remained excluded. No eligible repository was new, ledger-missing, root-agent-missing, undocumented or runtime-ahead. HorrorCorridor had the oldest synchronized central timestamp.

The focused finding is remote-player presentation. Accepted snapshots are stored as one current value. Three.js meshes and minimap markers copy remote pose values directly from that snapshot. The repository has no bounded pose history, interpolation timeline, teleport policy, bounded extrapolation or shared cross-surface projection result.

## Intent

Preserve host authority, local prediction and protocol semantics while making remote actors visually coherent under normal snapshot cadence, jitter, loss, reordering and teleports.

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
prior central timestamp: 2026-07-16T07-03-14-04-00
next oldest: LuminaryLabs-Publish/ZombieOrchard at 2026-07-16T09-02-09-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
route admission
  -> solo, host or client session
  -> deterministic maze and initial snapshot

local frame
  -> normalized keyboard, pointer-lock and mouse input
  -> local movement and collision prediction
  -> interaction request or local authoritative interaction

client networking
  -> send PLAYER_UPDATE at NETWORK_TICK_RATE = 50 ms
  -> include sequence, pose, yaw, pitch and velocity

host authority
  -> accept player update
  -> update authoritative GameState
  -> publish SYNC snapshot with tick and timestamp

client receive
  -> GameShell handles SYNC
  -> runtimeStore replaces authoritativeSnapshot

presentation frame
  -> GameCanvas reads latest snapshot
  -> worldBuilder copies each remote position and rotation into a mesh
  -> Minimap copies each remote position into a marker
  -> post-processing presents the frame

missing settlement
  -> no per-actor sample history
  -> no interpolation clock or delay
  -> no stale/reordered presentation admission
  -> no teleport/history-reset policy
  -> no bounded extrapolation
  -> no shared Three.js/minimap RemoteActorPoseSet
```

## Domains in use

1. Application routing and browser lifecycle.
2. Session identity, room, roster, connection, readiness and reset.
3. Deterministic maze bootstrap and seeded maze generation.
4. PeerJS and BroadcastChannel transport.
5. Versioned message construction, serialization and structural validation.
6. Authoritative snapshot publication and client receive state.
7. Keyboard, pointer-lock, mouse and normalized input.
8. Client prediction, movement, collision, camera and interaction.
9. Cube pickup/drop/place/remove and held-cube synchronization.
10. Ordered anomaly sequence and victory settlement.
11. Ooze spawn, decay, variation, spacing and pressure.
12. Pause, settings, completion and route projection.
13. Three.js world, actor, lighting and post-processing projection.
14. Canvas2D minimap and HUD projection.
15. Remote-actor sample admission, interpolation time and cross-surface projection.
16. Runtime diagnostics, cleanup, package validation, browser proof and deployment.

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `corridor-application-shell-kit` | Routing; solo/host/client entry; loading; pause; completion; exit |
| `corridor-session-domain-kit` | Identity; room; roster; connection; readiness; reset |
| `runtime-store-snapshot-kit` | Snapshot; pose; view; input flags; readiness |
| `ui-pause-projection-kit` | Pause state; reason; overlay |
| `ui-completion-projection-kit` | Terminal state; message; timestamp; routing |
| `complete-screen-presentation-kit` | Outcome presentation; restart; title exit |
| `lobby-screen-presentation-kit` | Room; roster; ready state; controls |
| `peer-host-transport-kit` | PeerJS host; BroadcastChannel bridge; connections; broadcast; targeted send; disconnect; destroy |
| `peer-client-transport-kit` | PeerJS client; BroadcastChannel bridge; connect; send; status; disconnect; destroy |
| `peer-event-bus-kit` | Typed transport events; subscription; cleanup |
| `protocol-message-construction-kit` | START_GAME; PLAYER_UPDATE; TRY_INTERACT; SYNC; LOBBY_EVENT |
| `protocol-serialization-kit` | Encode; decode; protocol version; structural validation |
| `maze-snapshot-bootstrap-kit` | Seed; maze; players; cubes; anomaly; initial snapshot |
| `seeded-maze-rng-kit` | Topology; placement; target sequence |
| `first-person-input-kit` | Keyboard; pointer lock; look; snapshots |
| `movement-collision-camera-kit` | Movement; collision; eye pose; walk bob; roll; camera projection |
| `network-player-update-kit` | Sequence; cadence; pose envelope; host consume |
| `corridor-interaction-domain-kit` | Pickup; drop; place; remove; held-cube synchronization |
| `ordered-anomaly-sequence-kit` | Ordered slots; validation; victory |
| `ooze-trail-domain-kit` | Spawn; decay; variation; spacing; capacity; pressure |
| `snapshot-outcome-routing-kit` | Snapshot state to UI outcome |
| `corridor-authoritative-publication-kit` | Tick; clone; SYNC; broadcast |
| `corridor-animation-loop-kit` | RAF start; RAF stop; delta; elapsed; successor scheduling |
| `corridor-render-world-kit` | Terrain; maze; objects; actors; animated lights/materials; update; dispose |
| `corridor-post-processing-kit` | Composer; bloom; resize; render; dispose |
| `corridor-minimap-kit` | Canvas acquisition; DPR sizing; logical transform; maze; ooze; cubes; remote players; local heading |
| `runtime-debug-frame-kit` | Activation; bounded capture; overlay; export |
| `runtime-resource-cleanup-kit` | Loop; subscriptions; listeners; observers; GPU cleanup |
| `package-validation-kit` | Build; lint; harness; visual and live-player checks |

## Implemented adapters

| Adapter | Services |
|---|---|
| `live-agent-runner-adapter` | Episode scheduling; adaptive action selection; child execution; JSONL history; latest summary |
| `live-player-browser-proof-adapter` | Server/browser admission; route control; debug readback; screenshots; image probes; proof gates |

## Main source-backed finding

`NETWORK_TICK_RATE` is `50 ms`. `GameShell` replaces the runtime store's `authoritativeSnapshot` for every accepted SYNC message. `worldBuilder.syncPlayerMeshes` assigns `mesh.position` and `mesh.rotation.y` directly from the latest snapshot. `drawMinimapFrame` independently derives remote marker positions from the same latest snapshot. No source surface retains the previous and next accepted remote pose for interpolation.

```txt
snapshot N accepted
  -> render remote actor at pose N for every frame
snapshot N+1 accepted
  -> immediately render pose N+1
variable delivery spacing
  -> variable visible step duration
```

This is a source-backed presentation risk. No production jitter incident was reproduced.

## Required parent authority

```txt
corridor-remote-actor-snapshot-interpolation-projection-authority-domain
```

## Planned coordinating surfaces

1. `authoritative-remote-sample-admission-kit`
2. `network-time-normalization-kit`
3. `remote-player-pose-history-kit`
4. `remote-actor-interpolation-clock-kit`
5. `bounded-interpolation-delay-policy-kit`
6. `stale-sample-rejection-kit`
7. `shortest-arc-rotation-kit`
8. `teleport-threshold-history-reset-kit`
9. `bounded-extrapolation-kit`
10. `missing-sample-freeze-policy-kit`
11. `remote-actor-retirement-kit`
12. `snapshot-projection-generation-kit`
13. `remote-actor-pose-set-kit`
14. `three-remote-player-projection-kit`
15. `minimap-remote-player-projection-kit`
16. `remote-actor-sample-admission-result-kit`
17. `remote-actor-projection-result-kit`
18. `first-smoothed-multiplayer-frame-ack-kit`
19. `network-jitter-loss-reorder-fixture-kit`
20. `source-build-pages-smoothing-parity-kit`

## Required command/result chain

```txt
RemoteActorSampleAdmissionCommand
  -> RemoteActorSampleAdmissionResult
  -> RemoteActorProjectionCommand
  -> RemoteActorProjectionResult
  -> FirstSmoothedMultiplayerFrameAck
```

## Validation boundary

Documentation changed. Runtime, networking, input, gameplay, Three.js, Canvas2D, packages, tests, workflows and deployment were not changed. No browser fixture was executed and no smoothing or readiness claim is made.