# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Branch:** `main`

**Updated:** `2026-07-11T18-11-21-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, replicated snapshots, cube interactions, ordered anomaly completion, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded debug readback.

The current audit isolates the publication-to-delivery boundary. Every remote `PLAYER_UPDATE` can trigger a complete authoritative snapshot. The host builds one full snapshot for local state, rebuilds the full snapshot again inside the SYNC envelope, serializes the complete maze/player/cube/anomaly/ooze payload, then attempts to send that string to every open connection.

The transport exposes only an aggregate sent count. It does not expose payload bytes, pending buffered bytes, send duration, exceptions, per-peer success/failure, queue depth, backpressure, coalescing, retry or slow-peer isolation. The publication caller discards even the aggregate count.

## Current ledge

```txt
HorrorCorridor Snapshot Delivery and Backpressure Authority
+ Payload Budget / Per-Peer Result / Slow-Peer Isolation Fixture Gate
```

## Plan ledger

**Goal:** turn each committed snapshot publication into one bounded payload plan and an observable per-peer delivery transaction so full-state fanout cannot grow silently or let one slow connection destabilize the host.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Detect a newer repo-local grass-culling audit in nominal-oldest `TheOpenAbove` and avoid overlapping it.
- [x] Select only `HorrorCorridor` as the oldest stable eligible fallback.
- [x] Trace full snapshot construction, SYNC construction, JSON serialization and host fanout.
- [x] Trace the host transport contract and per-connection send behavior.
- [x] Identify the complete interaction loop, domains, implemented kits and services.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` documents.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable delivery/backpressure fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-11T18-11-21-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T18-11-21-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T18-11-21-04-00-snapshot-delivery-backpressure-dsk-map.md
.agent/render-audit/2026-07-11T18-11-21-04-00-publication-delivery-frame-proof-gap.md
.agent/gameplay-audit/2026-07-11T18-11-21-04-00-full-sync-fanout-slow-peer-loop.md
.agent/interaction-audit/2026-07-11T18-11-21-04-00-publication-plan-delivery-result-map.md
.agent/transport-audit/2026-07-11T18-11-21-04-00-payload-budget-backpressure-contract.md
.agent/deploy-audit/2026-07-11T18-11-21-04-00-snapshot-delivery-backpressure-fixture-gate.md
```

Retained prerequisite audits:

```txt
.agent/network-cadence-audit/2026-07-11T16-38-10-04-00-input-simulation-publication-clock-contract.md
.agent/disconnect-authority-audit/2026-07-11T16-21-09-04-00-player-retirement-owned-state-contract.md
.agent/movement-authority-audit/2026-07-11T03-08-43-04-00-player-update-admission-correction-contract.md
.agent/pause-authority-audit/2026-07-10T23-30-13-04-00-host-client-pause-resume-contract.md
```

## Product interaction loop

```txt
title and mode selection
  -> lobby identity, readiness and deterministic start
  -> first-person input and client prediction
  -> client PLAYER_UPDATE stream
  -> host movement and gameplay mutation
  -> authoritative snapshot construction
  -> full SYNC envelope construction and JSON serialization
  -> host fanout to every open peer
  -> client snapshot admission and replay
  -> world, minimap, HUD, completion and debug projection
```

## Current publication and delivery loop

```txt
publishAuthoritativeState
  -> increment state tick
  -> buildReplicatedSnapshot for local runtime state
  -> createFullSyncMessage from GameState
       -> buildReplicatedSnapshot again
       -> clone room again
  -> JSON.stringify complete SYNC envelope
  -> for every connection
       -> check only connection.open
       -> connection.send(serialized payload)
       -> increment aggregate sent count
  -> discard aggregate sent count
```

## Main architecture split

```txt
committed state revision
  -> snapshot publication intent
  -> canonical payload construction
  -> byte/fingerprint budget admission
  -> per-peer send admission and backpressure policy
  -> per-peer delivery results
  -> retry, coalesce, isolate or disconnect policy
  -> accepted snapshot and first-visible-frame acknowledgement
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
6b. Snapshot Delivery and Backpressure Authority
7. Pause/Resume Authority
```

Documentation only. Runtime implementation and executable payload-budget, partial-delivery, backpressure, slow-peer and frame-correlation fixtures remain future work.
