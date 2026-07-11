# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Run:** `2026-07-11T13-20-45-04-00`

## Summary

This documentation-only pass maps HorrorCorridor's terminal-outcome boundary. The executable has a source-backed victory path, a UI type for failure, and a failure-capable completion screen, but it has no defeat predicate or authoritative failure transition. A replicated `failure` snapshot is currently projected back to `PLAYING`, while victory is reversible if later sequence validation no longer sees a complete anomaly.

## Plan ledger

**Goal:** define one host-authoritative, monotonic terminal-outcome transaction so victory and failure are evaluated, committed, published, admitted, rendered, acknowledged and exited exactly once for one run session and epoch.

- [x] Enumerate the complete accessible `LuminaryLabs-Publish` inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with the central ledger.
- [x] Confirm no eligible repository is new or missing central tracking.
- [x] Confirm existing root `.agent` coverage and select the oldest eligible ledger entry.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor`.
- [x] Read the shell, canvas, UI store, shared snapshot types, ordered-sequence rules and ooze rules.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace victory evaluation, publication, client projection, completion UI and return actions.
- [x] Trace the absent failure path and the current failure-snapshot projection behavior.
- [x] Add architecture, render, gameplay, interaction, outcome-authority and deploy audits.
- [x] Refresh the required root `.agent` state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable terminal-outcome fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0

HorrorCorridor     2026-07-11T11-39-11-04-00 selected
PhantomCommand     2026-07-11T11-51-06-04-00
ZombieOrchard      2026-07-11T12-01-38-04-00
TheUnmappedHouse   2026-07-11T12-08-47-04-00
AetherVale         2026-07-11T12-18-42-04-00
IntoTheMeadow      2026-07-11T12-29-49-04-00
PrehistoricRush    2026-07-11T12-39-53-04-00
MyCozyIsland       2026-07-11T12-58-06-04-00
TheOpenAbove       2026-07-11T13-10-35-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` is changed in the Publish organization.

## Active interaction loop

```txt
title
  -> solo, host or client admission
  -> lobby start and runtime bootstrap
  -> GameCanvas input, movement and interaction
  -> ordered anomaly validation
  -> host/solo state may become victory
  -> authoritative snapshot publication
  -> host local completion projection
  -> client SYNC completion projection
  -> CompleteScreen restart or title action
```

## Outcome loop as implemented

```txt
place final correct cube
  -> applyNetworkInteractionRequest
  -> validateOrderedSequenceCompletion
  -> gameState = victory
  -> room.phase = ending
  -> publish authoritative SYNC
  -> commitVictory locally
  -> UI screen = COMPLETED

client receives SYNC(gameState = victory)
  -> set completion victory
  -> screen = COMPLETED

client receives SYNC(gameState = failure)
  -> falls through generic else branch
  -> screen = PLAYING
  -> gameScreen = playing
  -> failure is not projected
```

## Main finding

```txt
victory predicate: implemented
failure type: declared
failure presentation: implemented
failure predicate: absent
failure state transition: absent
failure publication contract: absent
failure client projection: incorrect
terminal latch: absent
outcome transaction identity: absent
runSessionId/sessionEpoch correlation: absent
terminal acknowledgement: absent
terminal-frame proof: absent
```

`oozeLevel` is the current pressure-like value, but the ooze domain only spawns, decays, spaces and caps trail items. It never evaluates a defeat threshold or returns a terminal result. The shared snapshot and UI store both allow `failure`, yet GameShell handles only `victory`, `paused`, and a generic fallback to `playing`.

The ordered-sequence validator also changes a prior `victory` state back to `playing` if the sequence is no longer complete. A terminal result is therefore not monotonic or latched.

## Domains in use

```txt
application and screen routing
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
completion UI and complete-screen presentation
snapshot outcome routing
Three.js world bloom minimap HUD and frame debug
runtime cleanup validation and deployment
```

## Implemented kit surfaces

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

## Required guarantees

```txt
one explicit policy defines all victory and failure predicates
only the authoritative host or solo authority commits outcomes
accepted terminal outcome is monotonic for one run session and epoch
victory and failure use the same typed result contract
room phase, game state, snapshot and UI projection commit coherently
client projection handles victory and failure explicitly
late playing snapshots cannot reopen a terminal run
terminal publication records per-peer results
clients admit and acknowledge one terminal result exactly once
first terminal frame carries outcome, run session and epoch identity
restart and title exit consume the committed terminal result
```

## Ordered implementation ledges

```txt
1. Lobby Roster Identity and Peer Binding
2. Transport Actor Binding and Message Admission
3. Lobby Start Transaction Authority
4. Run Session Epoch and Exit Commit
4a. Runtime Readiness Lease and Generation Fencing
5. Snapshot Acceptance Authority
5a. Terminal Outcome Authority and Victory/Failure Convergence
6. Host Movement Admission and Client Reconciliation
7. Pause/Resume Authority
```

## Validation scope

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
terminal outcome fixtures: unavailable
multi-peer browser outcome smoke: unavailable
```
