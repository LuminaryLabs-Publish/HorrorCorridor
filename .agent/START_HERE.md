# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-11T19-38-14-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, cube interactions, ordered anomaly completion, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded debug readback.

The current audit isolates authoritative randomness. Maze generation is seeded, but authoritative ooze spawn and decay fall back to ambient `Math.random()`. The host does not retain a random-stream identity, draw sequence or checkpoint in `GameState` or `ReplicatedGameSnapshot`, so replay, restore, host migration and deterministic fixtures cannot reproduce the same ooze evolution from the same run seed and input history.

## Current ledge

```txt
HorrorCorridor Authoritative Randomness and Replay Authority
+ Seeded Ooze Stream / RNG Checkpoint / Replay Parity Fixture Gate
```

## Plan ledger

**Goal:** make every gameplay-affecting random draw a deterministic, identified and checkpointed part of the authoritative simulation so the same run seed, accepted inputs and simulation steps reproduce the same ooze state.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Trace seeded maze generation and authoritative ooze random draws.
- [x] Confirm the host calls ooze advancement without an injected RNG.
- [x] Confirm the replicated snapshot carries ooze output but no RNG stream state.
- [x] Identify the interaction loop, domains, implemented kits and services.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` documents.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable deterministic replay fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-11T19-38-14-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T19-38-14-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T19-38-14-04-00-authoritative-randomness-replay-dsk-map.md
.agent/render-audit/2026-07-11T19-38-14-04-00-ooze-rng-state-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-11T19-38-14-04-00-unseeded-ooze-replay-divergence-loop.md
.agent/interaction-audit/2026-07-11T19-38-14-04-00-random-draw-step-admission-map.md
.agent/randomness-audit/2026-07-11T19-38-14-04-00-seeded-stream-checkpoint-contract.md
.agent/deploy-audit/2026-07-11T19-38-14-04-00-deterministic-ooze-replay-fixture-gate.md
```

Retained prerequisite audits:

```txt
.agent/network-cadence-audit/2026-07-11T16-38-10-04-00-input-simulation-publication-clock-contract.md
.agent/transport-audit/2026-07-11T18-11-21-04-00-payload-budget-backpressure-contract.md
.agent/disconnect-authority-audit/2026-07-11T16-21-09-04-00-player-retirement-owned-state-contract.md
.agent/movement-authority-audit/2026-07-11T03-08-43-04-00-player-update-admission-correction-contract.md
.agent/pause-authority-audit/2026-07-10T23-30-13-04-00-host-client-pause-resume-contract.md
```

## Product interaction loop

```txt
title and mode selection
  -> lobby identity, readiness and start
  -> seeded maze bootstrap
  -> first-person input and local prediction
  -> host fixed simulation and gameplay mutation
  -> ooze decay/spawn random draws
  -> authoritative snapshot publication and delivery
  -> client snapshot acceptance
  -> world, minimap, HUD, completion and debug projection
```

## Current randomness split

```txt
maze bootstrap
  -> hash run seed
  -> createSeededMazeRng(seed)
  -> deterministic maze, cube locations and target sequence

ooze simulation
  -> advanceOozeTrail(state, input)
  -> resolveRng(input.rng)
  -> input.rng missing in GameCanvas
  -> Math.random()
  -> untracked decay survival, height and rotation draws
```

## Main architecture split

```txt
run seed and session epoch
  -> named deterministic random streams
  -> simulation-step draw budget
  -> typed random draw receipts
  -> committed RNG checkpoint
  -> snapshot/save/replay checkpoint
  -> restored host or replay continuation
  -> frame carrying simulation and RNG revisions
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
6c. Authoritative Randomness and Replay Authority
7. Pause/Resume Authority
```

Documentation only. Runtime implementation and executable seeded-stream, checkpoint, replay, host-migration and frame-parity fixtures remain future work.
