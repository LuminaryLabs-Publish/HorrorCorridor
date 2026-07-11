# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Branch:** `main`

**Updated:** `2026-07-11T16-38-10-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, replicated snapshots, cube interactions, ordered anomaly completion, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded debug readback.

The current audit isolates a host cadence defect. Every remote `PLAYER_UPDATE` immediately mutates the authoritative pose, increments the snapshot tick, broadcasts a full snapshot and resets `lastNetworkTickAtMs`. The host frame loop uses that same timestamp to decide when to advance ooze, so sustained client traffic can keep publishing snapshots while starving an authoritative gameplay system.

The preceding active-run disconnect audit remains valid and retained: a disconnected actor can persist in live gameplay state, ooze inputs and held-cube ownership. Network cadence authority must consume the same canonical actor, membership, run and epoch identities rather than creating a parallel peer model.

## Current ledge

```txt
HorrorCorridor Host Network Cadence Authority
+ Input Queue / Fixed Simulation / Bounded Snapshot Publication Fixture Gate
```

## Plan ledger

**Goal:** separate player-update arrival, fixed authoritative simulation and snapshot publication so client traffic cannot control gameplay timing, snapshot tick meaning or host fanout.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Detect a newer repo-local audit in nominal-oldest `TheOpenAbove`.
- [x] Select only `HorrorCorridor` as the oldest stable eligible fallback.
- [x] Trace client sequence generation and update cadence.
- [x] Trace host packet application, snapshot publication and broadcast fanout.
- [x] Trace the shared timestamp into ooze advancement admission.
- [x] Identify the full interaction loop, domains, implemented kits and services.
- [x] Add timestamped cadence-focused architecture and system audits.
- [x] Preserve the active-run disconnect audit as a retained prerequisite.
- [x] Refresh required root `.agent` documents.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable cadence/flood fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-11T16-38-10-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T16-38-10-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T16-38-10-04-00-host-network-cadence-authority-dsk-map.md
.agent/render-audit/2026-07-11T16-38-10-04-00-simulation-publication-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-11T16-38-10-04-00-client-update-ooze-starvation-loop.md
.agent/interaction-audit/2026-07-11T16-38-10-04-00-player-update-queue-admission-map.md
.agent/network-cadence-audit/2026-07-11T16-38-10-04-00-input-simulation-publication-clock-contract.md
.agent/deploy-audit/2026-07-11T16-38-10-04-00-host-cadence-flood-fixture-gate.md
```

Retained prerequisite audit:

```txt
.agent/trackers/2026-07-11T16-21-09-04-00/project-breakdown.md
.agent/disconnect-authority-audit/2026-07-11T16-21-09-04-00-player-retirement-owned-state-contract.md
```

## Product interaction loop

```txt
title
  -> solo, host or client admission
  -> lobby roster, readiness and deterministic start
  -> first-person input and client prediction
  -> client PLAYER_UPDATE stream
  -> host movement application
  -> held-cube and ooze gameplay systems
  -> authoritative snapshot publication
  -> client snapshot acceptance/replay
  -> world, minimap, HUD, completion and debug projection
```

## Current cadence loop

```txt
client
  -> generate monotonic input.sequence
  -> send PLAYER_UPDATE when local network timer elapses

host message callback
  -> ignore input.sequence for application
  -> apply absolute client pose immediately
  -> publish full snapshot immediately
  -> snapshot tick += 1
  -> broadcast to every client
  -> lastNetworkTickAtMs = now

host RAF
  -> only advance ooze when now - lastNetworkTickAtMs reaches threshold
```

## Concrete starvation case

```txt
client updates arrive before each host threshold expires
  -> every packet causes publication
  -> every publication resets lastNetworkTickAtMs
  -> ooze branch never reaches its threshold
  -> snapshots and ticks continue advancing
  -> ooze remains unchanged
```

## Main architecture split

```txt
input arrival clock
  per-peer sequence and queue admission

fixed simulation clock
  movement, collision, held cubes, ooze and objective systems

snapshot publication clock
  bounded dirty-state dissemination and per-peer delivery results

presentation frame clock
  world/minimap/HUD/debug acknowledgement of one committed revision
```

## Required authority flow

```txt
PLAYER_UPDATE
  -> connection/actor/room/run/epoch admission
  -> monotonic per-player sequence admission
  -> bounded queue or deterministic coalescing
  -> fixed-step input selection
  -> movement/collision and all scheduled systems advance
  -> committed simulation revision
  -> bounded snapshot publication plan
  -> per-peer delivery result
  -> accepted snapshot and first-frame acknowledgement
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding
2. Transport Actor Binding and Message Admission
3. Lobby Start Transaction Authority
4. Run Exit Commit and Session Epoch
4a. Runtime Readiness Lease and Generation Fencing
5. Snapshot Acceptance Authority
5a. Interaction Target Intent and Cube/Slot Claim Authority
5b. Active-Run Disconnect and Reconnect Authority
5c. Terminal Outcome Authority
6. Host Network Cadence and Fixed Simulation Authority
6a. Host Movement Admission and Client Reconciliation
7. Pause/Resume Authority
```

Documentation only. Runtime implementation and executable cadence, flood, starvation and frame-correlation fixtures remain future work.
