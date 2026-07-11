# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T13-20-45-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, client prediction, host snapshots, cube interactions, ordered anomaly completion, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded runtime debug readback.

This pass isolates a terminal-outcome split: the runtime can commit and project victory, while failure exists only in shared types, UI state and presentation. No defeat predicate can produce failure, an incoming failure snapshot is routed to `PLAYING`, and a previously won state can return to playing if sequence validation is run after the anomaly no longer appears complete.

## Plan ledger

**Goal:** make victory and failure one monotonic host-authoritative transaction bound to a run session, epoch, snapshot revision, publication result, client admission and first terminal frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible entry.
- [x] Trace victory evaluation, ooze pressure, snapshot publication, client outcome routing and completion exits.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` state.
- [x] Push documentation directly to `main`.
- [ ] Runtime implementation and executable outcome fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-11T13-20-45-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
```

Then read:

```txt
.agent/turn-ledger/2026-07-11T13-20-45-04-00.md
.agent/architecture-audit/2026-07-11T13-20-45-04-00-terminal-outcome-authority-dsk-map.md
.agent/render-audit/2026-07-11T13-20-45-04-00-terminal-frame-outcome-projection-gap.md
.agent/gameplay-audit/2026-07-11T13-20-45-04-00-victory-failure-convergence-loop.md
.agent/interaction-audit/2026-07-11T13-20-45-04-00-terminal-result-exit-admission-map.md
.agent/outcome-authority-audit/2026-07-11T13-20-45-04-00-monotonic-victory-failure-contract.md
.agent/deploy-audit/2026-07-11T13-20-45-04-00-terminal-outcome-fixture-gate.md
```

## Active interaction loop

```txt
title
  -> solo, host or client admission
  -> lobby start and runtime bootstrap
  -> GameCanvas input, movement and interaction
  -> ordered anomaly sequence evaluation
  -> host or solo state may become victory
  -> authoritative snapshot publication
  -> local or client completion projection
  -> CompleteScreen restart or title action
```

## Current finding

```txt
victory predicate: implemented
failure type: declared
failure UI: implemented
failure predicate: absent
failure state transition: absent
failure snapshot routing: incorrect
terminal latch: absent
outcome transaction identity: absent
run-session and epoch correlation: absent
terminal acknowledgement: absent
first terminal frame proof: absent
```

Concrete divergence:

```txt
SYNC(gameState = failure)
  -> generic fallback branch
  -> screen = PLAYING
  -> gameScreen = playing

victory state with later incomplete sequence
  -> validateOrderedSequenceCompletion
  -> gameState = playing
  -> room.phase = active
```

## Domains in use

```txt
application and screen routing
UI loading pause completion settings and terminal projection
session room roster identity connection and readiness
lobby start and runtime readiness
PeerJS and BroadcastChannel transport
protocol envelopes and replicated snapshots
seeded maze bootstrap
first-person input movement collision and camera
cube interaction and held-cube synchronization
ordered anomaly sequence evaluation
victory state and room-ending projection
ooze trail spawn decay spacing capacity and level
terminal outcome policy admission latch publication and acknowledgement
snapshot outcome routing
Three.js world bloom minimap HUD and terminal-frame projection
runtime cleanup validation and deployment
```

## Implemented kits

```txt
corridor-application-shell-kit
corridor-session-domain-kit
runtime-store-snapshot-kit
ui-pause-projection-kit
ui-completion-projection-kit
complete-screen-presentation-kit
lobby-screen-presentation-kit
peer-host-transport-kit
peer-client-transport-kit
peer-event-bus-kit
protocol-message-construction-kit
protocol-serialization-kit
maze-snapshot-bootstrap-kit
first-person-input-kit
movement-collision-camera-kit
network-player-update-kit
corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
snapshot-outcome-routing-kit
corridor-authoritative-publication-kit
corridor-animation-loop-kit
corridor-render-world-kit
corridor-post-processing-kit
corridor-minimap-kit
runtime-debug-frame-kit
runtime-resource-cleanup-kit
package-validation-kit
```

## Required composed domain

```txt
horror-corridor-terminal-outcome-authority-domain
  -> terminal-outcome-policy-kit
  -> outcome-evaluation-input-kit
  -> victory-predicate-kit
  -> defeat-predicate-kit
  -> terminal-outcome-admission-kit
  -> terminal-outcome-latch-kit
  -> terminal-outcome-result-kit
  -> terminal-room-phase-kit
  -> terminal-publication-kit
  -> terminal-client-admission-kit
  -> terminal-ui-projection-kit
  -> terminal-frame-correlation-kit
  -> terminal-outcome-acknowledgement-kit
  -> terminal-outcome-journal-kit
  -> terminal-outcome-fixture-kit
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding + Placeholder Admission Fixture Gate
2. Transport Actor Binding + Sender/Payload Admission Fixture Gate
3. Lobby Start Transaction Authority + Correlated START_GAME/SYNC/Ack Fixture Gate
4. Run Exit Commit + Session Epoch Message Admission Fixture Gate
4a. Runtime Readiness Lease + Generation-Fenced Cleanup Fixture Gate
5. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
5a. Terminal Outcome Authority + Victory/Failure Convergence Fixture Gate
6. Host Movement Admission + Client Reconciliation Fixture Gate
7. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not treat UI completion state as outcome authority.
Do not infer defeat from oozeLevel without a versioned policy.
Do not route failure through the generic playing fallback.
Do not allow a terminal outcome to return to active within one run epoch.
Do not claim terminal convergence without victory, failure, loss, reorder, stale-epoch and first-frame fixtures.
```
