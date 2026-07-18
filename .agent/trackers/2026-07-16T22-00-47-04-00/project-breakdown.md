# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-16T22-00-47-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `runtime-frame-fault-containment-retirement-authority-audited`

## Summary

The complete accessible `LuminaryLabs-Publish` inventory contains 11 repositories. Ten remain eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten retain central ledger records, root `.agent` state and synchronized documented heads. HorrorCorridor had the oldest eligible timestamp and was the only selected project.

The focused finding is runtime frame-fault containment. `createAnimationLoop` calls the complete frame callback before scheduling its successor. A thrown simulation, world, minimap or post-processing error therefore ends visible advancement without producing a typed fault result, retiring the runtime generation, releasing pointer lock, clearing input, stopping network publication, unsubscribing transport, disposing GPU resources or presenting one terminal fault frame.

## Plan ledger

**Goal:** make every frame either settle all admitted phases or retire the active runtime generation exactly once before any further input, network, world or presentation work can occur.

- [x] Compare the full 11-repository Publish inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm zero new, missing, undocumented or runtime-ahead priority repositories.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop and every active domain.
- [x] Preserve all 29 implemented kits, two adapters and offered services.
- [x] Inspect animation scheduling, simulation, network publication, world update, minimap, post-processing and cleanup ownership.
- [x] Define one parent frame-fault authority and 20 coordinating surfaces.
- [x] Add the timestamped tracker and focused audit family.
- [ ] Implement phase receipts, fault latching, generation retirement and explicit restart admission.
- [ ] Execute injected-failure, build and deployed-origin fixtures.

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
prior central timestamp: 2026-07-16T16-00-12-04-00
next oldest: LuminaryLabs-Publish/ZombieOrchard at 2026-07-16T16-40-45-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
route admission
  -> solo, host or client session
  -> deterministic maze and initial authoritative snapshot

runtime initialization
  -> create renderer, scene, camera and post-processing
  -> build maze world
  -> bind transport, input, pointer-lock, resize and blur listeners
  -> start RAF controller

playing frame
  -> read UI, runtime and debug state
  -> consume keyboard and mouse input
  -> advance local movement and resolve collision
  -> host mutates authoritative state or client predicts locally
  -> publish or send network work at the 50 ms cadence
  -> synchronize UI stores
  -> project camera and world
  -> draw Canvas2D minimap
  -> record optional debug frame
  -> render post-processing output
  -> schedule the successor RAF

fault path today
  -> any phase throws
  -> successor RAF is not scheduled
  -> loop.running remains true
  -> no phase receipt or RuntimeFrameFaultResult exists
  -> cleanupRuntime is not invoked
  -> input, transport subscriptions, pointer lock and GPU ownership can remain live
  -> no terminal fault surface or restart transaction is published
```

## Domains in use

1. Application routing and browser lifecycle.
2. Session identity, room, roster, connection, readiness and reset.
3. Deterministic maze bootstrap and seeded maze generation.
4. PeerJS and BroadcastChannel transport.
5. Versioned message construction, serialization and validation.
6. Authoritative snapshot publication and client receipt state.
7. Keyboard, pointer-lock, mouse and normalized input.
8. Local prediction, movement, collision, camera and interaction.
9. Cube pickup/drop/place/remove and held-cube synchronization.
10. Ordered anomaly sequence and victory settlement.
11. Ooze spawn, decay, variation, spacing and pressure.
12. Pause, settings, completion and route projection.
13. RAF scheduling, frame admission and phase execution.
14. Three.js world, actor, lighting and post-processing projection.
15. Canvas2D minimap and HUD projection.
16. Runtime fault classification, generation retirement and restart admission.
17. Diagnostics, cleanup, package validation, browser proof and deployment.

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

`createAnimationLoop.step` checks `running`, calculates `deltaMs`, calls `onFrame(deltaMs, timeMs)`, and only then requests the next RAF. It has no `try`, fault latch or generation identity. `GameCanvas` performs simulation, authoritative publication, world update, minimap drawing, debug capture and post-processing inside that callback. Cleanup is owned by React effect teardown and is not invoked by a thrown frame phase.

```txt
phase mutation succeeds
  -> later phase throws
  -> no successor RAF
  -> partial frame state can remain committed
  -> listeners and transport subscription remain active
  -> loop reports running even though no callback is pending
  -> no visible explanation or bounded restart path exists
```

This is a source-backed containment gap. No production crash was reproduced.

## Required parent authority

```txt
corridor-runtime-frame-fault-containment-retirement-authority-domain
```

## Planned coordinating surfaces

1. `runtime-frame-execution-admission-kit`
2. `runtime-frame-generation-identity-kit`
3. `named-frame-phase-receipt-kit`
4. `frame-exception-classification-kit`
5. `terminal-runtime-fault-latch-kit`
6. `stale-raf-callback-rejection-kit`
7. `partial-frame-mutation-settlement-kit`
8. `held-input-retirement-on-fault-kit`
9. `pointer-lock-release-on-fault-kit`
10. `network-publication-suspension-kit`
11. `transport-subscription-retirement-kit`
12. `world-update-retirement-kit`
13. `minimap-projection-retirement-kit`
14. `post-processing-retirement-kit`
15. `gpu-resource-fault-settlement-kit`
16. `runtime-readiness-fault-projection-kit`
17. `runtime-frame-fault-result-kit`
18. `first-fault-frame-ack-kit`
19. `runtime-restart-admission-kit`
20. `phase-failure-source-build-pages-fixture-kit`

## Required command/result chain

```txt
RuntimeFrameExecutionCommand
  -> named phase receipts
  -> accepted frame or RuntimeFrameFaultCommand

RuntimeFrameFaultCommand
  -> latch one terminal fault
  -> retire the scheduler generation
  -> clear input and release pointer lock
  -> suspend publication and retire subscriptions
  -> dispose or quarantine world and GPU ownership
  -> publish RuntimeFrameFaultResult
  -> present one terminal fault frame
  -> publish FirstFaultFrameAck

RuntimeRestartAdmissionCommand
  -> require explicit user action
  -> create fresh session/runtime/frame generations
```

## Validation boundary

Documentation changed. Runtime, networking, input, gameplay, Three.js, Canvas2D, packages, tests, workflows and deployment were not changed. No failure-injection fixture was executed and no crash-containment or production-readiness claim is made.