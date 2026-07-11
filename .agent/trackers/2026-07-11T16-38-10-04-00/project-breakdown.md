# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-11T16-38-10-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Branch:** `main`

## Summary

HorrorCorridor has one client update cadence, one host simulation cadence and one authoritative snapshot publication path, but the active host combines them through the same mutable timestamp. Every accepted `PLAYER_UPDATE` immediately replaces the client pose, increments the authoritative snapshot tick, broadcasts a full snapshot and resets the timestamp that also gates ooze advancement.

The result is not only unbounded fanout. A sufficiently steady client update stream can continuously postpone the host's periodic `advanceOozeTrail()` branch, so network traffic can change whether an authoritative gameplay system advances.

## Plan ledger

**Goal:** separate inbound player-update admission, fixed-step gameplay advancement and bounded snapshot publication so client message frequency cannot control simulation timing, authoritative tick meaning or host fanout.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Detect the newer `TheOpenAbove` repo-local audit that had not yet reached its older central timestamp.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` as the oldest stable eligible fallback.
- [x] Read current repo guidance, source-backed audits and package commands.
- [x] Trace client input cadence, `PLAYER_UPDATE` construction, host event handling and authoritative publication.
- [x] Trace the shared `lastNetworkTickAtMs` through remote update publication and ooze advancement.
- [x] Trace broadcast results and current cadence diagnostics.
- [x] Identify the interaction loop, domains, implemented kits and kit services.
- [x] Define a host network cadence authority and its fixture gate.
- [x] Add timestamped architecture, render, gameplay, interaction, network-cadence and deploy audits.
- [x] Refresh required root `.agent` documents.
- [x] Change no runtime source, dependency, package script, network behavior, rendering or deployment configuration.
- [x] Push documentation directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable cadence/flood fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0
nominal oldest central entry: TheOpenAbove @ 2026-07-11T14-50-59-04-00
newer repo-local TheOpenAbove audit: 2026-07-11T16-30-25-04-00
selected stable fallback: HorrorCorridor @ 2026-07-11T15-01-33-04-00
other Publish repositories changed: none
```

## Product interaction loop

```txt
title and mode selection
  -> lobby identity, readiness and start
  -> deterministic maze/run bootstrap
  -> local pointer-lock input and client prediction
  -> client emits PLAYER_UPDATE at its local cadence
  -> host immediately applies client-supplied absolute pose
  -> host immediately publishes and broadcasts a full snapshot
  -> client accepts snapshot and replays world state
  -> world, minimap, HUD and debug surfaces render
  -> cube interactions, anomaly completion and ooze pressure continue
```

## Current host cadence path

```txt
client frame loop
  if now - lastNetworkTickAtMs >= NETWORK_TICK_RATE
    -> sequence += 1
    -> send PLAYER_UPDATE
    -> lastNetworkTickAtMs = now

host transport callback for every PLAYER_UPDATE
  -> ignore payload input.sequence
  -> ignore per-peer accepted sequence and queue budget
  -> apply absolute position, rotation, pitch and velocity
  -> publishAuthoritativeState("resync")
       -> tick += 1
       -> build full snapshot
       -> broadcast to every connection
       -> lastNetworkTickAtMs = publication time

host frame loop
  if now - lastNetworkTickAtMs >= NETWORK_TICK_RATE
    -> advanceOozeTrail
    -> publishAuthoritativeState("resync")
```

## Main finding

`lastNetworkTickAtMs` is simultaneously used as:

```txt
client outbound update cadence marker
host snapshot publication age marker
host periodic ooze/system advancement gate
cadence diagnostic age
```

A remote player update causes an immediate publication, and that publication resets the same timestamp used by the host frame loop. Under sustained remote traffic, the host can keep broadcasting snapshots while never reaching the periodic branch that advances ooze.

Snapshot `tick` then means publication count rather than one stable simulation-step sequence. More clients can make it advance faster even when the underlying system step did not run.

## Amplification path

For `P` clients each sending `U` updates per second:

```txt
inbound updates per second: P * U
full snapshot publications: approximately P * U
outbound peer sends: approximately P * P * U
```

The transport returns a sent-recipient count, but the caller discards it. There is no queue depth, buffered-amount, partial-delivery, coalescing, drop or retry result.

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session mode peer identity room roster readiness and reset
lobby start bootstrap run identity and runtime readiness
PeerJS host/client transport and BroadcastChannel bridge
protocol envelopes serialization actor/request/sequence admission
client input prediction movement collision and camera
host movement application input sequencing and reconciliation
fixed-step gameplay timing ooze and held-cube synchronization
interaction target claims cube ownership and anomaly slots
snapshot construction publication admission and replay
Three.js world post-processing minimap HUD and debug projection
runtime cleanup validation harnesses and deployment
```

## Implemented kit inventory and services

```txt
corridor-application-shell-kit
  route and screen lifecycle, solo/host/client entry, loading, pause, completion and exits

corridor-session-domain-kit
  session mode, peer identity, room, roster, readiness and reset

runtime-store-snapshot-kit
  authoritative snapshot, local pose, view angles, inputs and readiness

ui-pause-projection-kit
ui-completion-projection-kit
complete-screen-presentation-kit
lobby-screen-presentation-kit
  UI state and presentation services

peer-host-transport-kit
peer-client-transport-kit
peer-event-bus-kit
  peer lifecycle, connections, send/broadcast, local bridge and events

protocol-message-construction-kit
protocol-serialization-kit
  versioned network envelopes, encode/decode and shape admission

maze-snapshot-bootstrap-kit
  deterministic maze, players, cubes, anomaly, room and initial snapshot

first-person-input-kit
movement-collision-camera-kit
network-player-update-kit
  input snapshots, local prediction, collision, camera and network update construction

corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
  cube actions, ordered objective and ooze gameplay systems

snapshot-outcome-routing-kit
corridor-authoritative-publication-kit
  snapshot projection, tick increment, clone and broadcast

corridor-animation-loop-kit
corridor-render-world-kit
corridor-post-processing-kit
corridor-minimap-kit
runtime-debug-frame-kit
runtime-resource-cleanup-kit
  frame scheduling, rendering, diagnostics and disposal

package-validation-kit
  build, lint, ProtoKit smoke, harness, visual and live-player checks
```

## Required parent domain

```txt
corridor-host-network-cadence-authority-domain
```

## Candidate kits

```txt
inbound-player-update-envelope-kit
per-peer-input-sequence-kit
player-update-admission-kit
movement-input-queue-kit
latest-input-coalescing-kit
fixed-simulation-clock-kit
simulation-step-sequence-kit
authoritative-system-tick-kit
snapshot-publication-cadence-kit
snapshot-publication-plan-kit
per-peer-delivery-result-kit
transport-backpressure-policy-kit
network-cadence-journal-kit
network-cadence-observation-kit
host-network-cadence-fixture-kit
multi-peer-flood-smoke-kit
```

## Required authority flow

```txt
inbound PLAYER_UPDATE
  -> bind connection, actor, room, run and epoch
  -> admit monotonic per-player sequence and timestamp window
  -> enqueue or coalesce within a bounded per-player budget
  -> select admitted input at the next fixed simulation step
  -> validate and apply movement/collision
  -> advance ooze, held cubes and other authoritative systems once
  -> commit one simulation-step sequence and state revision
  -> schedule bounded snapshot publication
  -> produce per-peer send/delivery results
  -> correlate accepted snapshot with world/minimap/HUD/debug frame
```

## Required guarantees

```txt
client packet frequency never changes simulation-step frequency
client packet frequency never suppresses ooze or other periodic systems
snapshot tick has one documented meaning
per-player input sequences are monotonic and bounded
stale, duplicate and future-skewed updates reject before mutation
one client cannot force unlimited full-snapshot broadcasts
publication is coalesced and bounded independently of input arrival
partial broadcast results are observed and classified
cadence diagnostics are per peer and per authority stage
accepted state and rendered frame cite the same simulation/publication revision
```

## Validation status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm run build: not run
npm run lint: not run
host cadence fixtures: unavailable
multi-peer flood smoke: unavailable
```
