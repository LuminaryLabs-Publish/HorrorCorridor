# Project Breakdown: HorrorCorridor Active-Run Disconnect Authority

**Timestamp:** `2026-07-11T16-21-09-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Branch:** `main`

## Summary

All eligible Publish repositories were tracked and had root `.agent` state. `TheOpenAbove` began a concurrent same-window documentation sequence, so this run avoided a collision and selected `HorrorCorridor`, the next stable oldest eligible repository.

The active-run disconnect path updates the session/lobby roster only. The authoritative gameplay closure retains the disconnected player, room row, ooze participation and held-cube ownership, and subsequent full snapshots can continue projecting a ghost actor.

## Plan ledger

**Goal:** document all domains, kits and services and define a single host-authoritative disconnect/reconnect transaction.

- [x] Compare ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify nine central ledger records and nine root `.agent` entrypoints.
- [x] Avoid a repository under concurrent write.
- [x] Select only `HorrorCorridor`.
- [x] Read transport, shell, session, runtime, interaction, ooze and snapshot paths.
- [x] Identify the interaction loop.
- [x] Identify all domains.
- [x] Identify all implemented kits and services.
- [x] Trace disconnect and owned-state effects.
- [x] Define DSKs and fixture gates.
- [x] Refresh root `.agent` state and add timestamped audits.
- [x] Push to `main` only; create no branch or pull request.
- [x] Synchronize central tracking.
- [ ] Runtime implementation remains future work.

## Selection

```txt
accessible: 10
eligible: 9
new/ledger missing: 0
root .agent missing: 0
TheCavalryOfRome: excluded
TheOpenAbove: active concurrent audit, avoided
HorrorCorridor: selected next stable oldest
```

## Interaction loop

```txt
host receives connection close
  -> removes lobby row
  -> broadcasts player-left lobby event
  -> gameplay currentGameState unchanged
  -> player remains in simulation and snapshots
  -> held cube remains owned
  -> clients render retained player/cube state
```

## Domain inventory

```txt
application and UI routing
session room roster peer identity readiness and reset
lobby actor binding start and bootstrap
run session epoch exit readiness disconnect and reconnect
PeerJS and BroadcastChannel transport
protocol envelopes serializers and message admission
maze/player/cube/anomaly/ooze bootstrap
snapshot construction publication acceptance and replay
input movement collision camera and prediction
interaction targeting cube/slot ownership and synchronization
active membership suspension retirement and owned-state recovery
anomaly sequence and terminal outcomes
ooze pressure and player-position input
Three.js world bloom minimap HUD debug and frame projection
runtime resource lifecycle validation build and deployment
```

## Implemented kit census

```txt
implemented kit surfaces: 28
planned disconnect-authority kits: 15
```

Implemented names and services are recorded in `.agent/kit-registry.json` and `.agent/current-audit.md`.

## Source-backed findings

```txt
GameShell connection-close handler:
  removeLobbyPlayer(remotePeerId)
  broadcast LOBBY_EVENT

GameCanvas:
  owns currentGameState closure
  no roster-change subscription
  no disconnect command consumer

publishAuthoritativeState:
  snapshots currentGameState

buildReplicatedSnapshot:
  clones retained room players
  maps retained gameplay players
  maps cube ownerId
```

## Required parent domain

```txt
horror-corridor-active-run-disconnect-authority-domain
  -> transport-actor-connection-binding-kit
  -> peer-disconnect-observation-kit
  -> disconnect-command-envelope-kit
  -> disconnect-classification-kit
  -> active-membership-revision-kit
  -> player-suspension-kit
  -> player-retirement-kit
  -> owned-cube-recovery-kit
  -> gameplay-roster-transaction-kit
  -> disconnect-result-kit
  -> disconnect-publication-kit
  -> reconnect-claim-kit
  -> disconnect-frame-correlation-kit
  -> disconnect-journal-kit
  -> active-run-disconnect-fixture-kit
```

## Validation

```txt
runtime changed: no
network changed: no
render changed: no
deployment changed: no
commands run: no
branch created: no
pull request created: no
```
