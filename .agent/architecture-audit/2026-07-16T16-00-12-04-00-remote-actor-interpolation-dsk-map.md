# Remote Actor Interpolation DSK Map

**Timestamp:** `2026-07-16T16-00-12-04-00`

## Summary

Remote actor presentation currently crosses transport, snapshot storage, RAF rendering, Three.js world projection and Canvas2D minimap projection without an intermediate presentation-time domain.

## Intent

Insert one renderer-neutral authority between accepted snapshots and visual consumers.

## Current domain map

```txt
peer-client-transport-kit
  -> peer-event-bus-kit
  -> protocol-serialization-kit
  -> GameShell SYNC handler
  -> runtime-store-snapshot-kit
  -> GameCanvas frame
     -> corridor-render-world-kit
     -> corridor-minimap-kit
```

## Ownership gap

```txt
simulation truth owner: host authoritative snapshot
client snapshot owner: runtime store
Three.js pose owner: worldBuilder direct copy
minimap pose owner: Minimap direct copy
presentation-time owner: absent
cross-surface projection revision: absent
```

## Required parent domain

```txt
corridor-remote-actor-snapshot-interpolation-projection-authority-domain
```

## Child DSK breakdown

| DSK | Responsibility | Inputs | Outputs |
|---|---|---|---|
| `authoritative-remote-sample-admission-kit` | Admit one ordered remote sample | session, snapshot tick, actor id, pose | admission result |
| `network-time-normalization-kit` | Relate host timestamp and client receive time | host time, receive time, clock revision | normalized sample time |
| `remote-player-pose-history-kit` | Retain bounded per-actor samples | admitted samples, capacity | immutable histories |
| `remote-actor-interpolation-clock-kit` | Resolve presentation time | frame time, accepted delay | interpolation time |
| `bounded-interpolation-delay-policy-kit` | Select stable delay | delivery cadence, jitter envelope | delay descriptor |
| `stale-sample-rejection-kit` | Reject older or duplicate evidence | tick, timestamp, sample revision | rejection result |
| `shortest-arc-rotation-kit` | Interpolate yaw without wrap jumps | previous/next yaw, alpha | projected yaw |
| `teleport-threshold-history-reset-kit` | Detect discontinuities and reset history | distance, tick gap, policy | teleport result |
| `bounded-extrapolation-kit` | Continue briefly after a late sample | latest pose, velocity, budget | projected pose |
| `missing-sample-freeze-policy-kit` | Stop invention after budget exhaustion | actor age, policy | freeze/retire decision |
| `remote-actor-retirement-kit` | Remove departed actor ownership | roster/snapshot generation | retirement result |
| `snapshot-projection-generation-kit` | Bind samples and frame to one generation | session, sample and frame revisions | projection generation |
| `remote-actor-pose-set-kit` | Build one immutable pose set | actor histories, interpolation time | `RemoteActorPoseSet` |
| `three-remote-player-projection-kit` | Apply pose set to meshes | pose set, scene generation | Three.js receipt |
| `minimap-remote-player-projection-kit` | Apply same pose set to markers | pose set, canvas generation | minimap receipt |
| `remote-actor-sample-admission-result-kit` | Publish typed admission outcome | admitted/rejected evidence | stable result |
| `remote-actor-projection-result-kit` | Publish typed frame projection | pose set and consumer receipts | stable result |
| `first-smoothed-multiplayer-frame-ack-kit` | Prove both surfaces presented one revision | render receipts | acknowledgement |
| `network-jitter-loss-reorder-fixture-kit` | Exercise delivery variation | deterministic packet schedule | fixture report |
| `source-build-pages-smoothing-parity-kit` | Compare runtime surfaces | source/build/Pages captures | parity result |

## Required invariants

```txt
host snapshot remains gameplay authority
interpolation mutates presentation only
local player prediction never enters the remote buffer
samples are monotonic per session and actor generation
teleports bypass smoothing and clear incompatible history
extrapolation is bounded by duration and distance
Three.js and minimap consume the same RemoteActorPoseSet
actor retirement clears history and all visible projections
```

## Proposed API

```txt
n:remoteActorProjection.admitSamples(command)
n:remoteActorProjection.project(command)
n:remoteActorProjection.retireActor(command)
n:remoteActorProjection.snapshot()
```

## Claim boundary

This is a proposed DSK boundary. No runtime domain, API, interpolation behavior or fixture exists yet.