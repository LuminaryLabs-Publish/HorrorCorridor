# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Branch:** `main`

**Updated:** `2026-07-11T16-21-09-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, replicated snapshots, cube interactions, ordered anomaly completion, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded debug readback.

The current audit isolates active-run disconnect authority. A host-side connection-close event removes a player only from the lobby/session store and broadcasts a lobby event. The authoritative `GameCanvas` closure retains the player in `currentGameState`, continues including that player in snapshots and ooze pressure input, and can retain a cube owned by that disconnected player indefinitely.

## Current ledge

```txt
HorrorCorridor Active-Run Disconnect Authority
+ Player Retirement, Held-Cube Recovery and Replicated Convergence Fixture Gate
```

## Plan ledger

**Goal:** make connection loss during an active run one host-authoritative transaction that retires or suspends the exact actor, resolves owned gameplay state, publishes one correlated snapshot and supports an explicit reconnect policy.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Avoid the actively changing `TheOpenAbove` documentation window.
- [x] Select only `HorrorCorridor` as the next stable oldest eligible repository.
- [x] Trace peer connection-close, session roster removal, live GameState ownership, held-cube synchronization, ooze input and snapshot publication.
- [x] Identify the interaction loop, all domains, all implemented kits and their services.
- [x] Record the lobby/game roster split and ghost-player path.
- [x] Define disconnect admission, actor retirement, owned-state recovery, reconnect and convergence kits.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` documents.
- [x] Push directly to `main`; create no branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Runtime implementation and executable disconnect fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-11T16-21-09-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T16-21-09-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T16-21-09-04-00-active-run-disconnect-authority-dsk-map.md
.agent/render-audit/2026-07-11T16-21-09-04-00-ghost-player-held-cube-projection-gap.md
.agent/gameplay-audit/2026-07-11T16-21-09-04-00-connection-close-ghost-actor-loop.md
.agent/interaction-audit/2026-07-11T16-21-09-04-00-disconnect-reconnect-command-admission-map.md
.agent/disconnect-authority-audit/2026-07-11T16-21-09-04-00-player-retirement-owned-state-contract.md
.agent/deploy-audit/2026-07-11T16-21-09-04-00-active-run-disconnect-fixture-gate.md
```

## Product interaction loop

```txt
title
  -> solo, host or client admission
  -> lobby and deterministic bootstrap
  -> first-person movement and interaction
  -> host mutation and snapshot publication
  -> world, minimap, HUD and terminal projection

active client connection closes
  -> host transport emits peer/connection-close
  -> GameShell removes lobby/session row
  -> GameShell broadcasts LOBBY_EVENT
  -> GameCanvas currentGameState is unchanged
  -> authoritative snapshots keep the disconnected player
  -> ooze continues sampling the ghost position
  -> held cube remains owned and follows the retained ghost player
```

## Main finding

```txt
sessionStore roster: disconnected player removed
GameState.room.players: unchanged
GameState.players: unchanged
held cube ownership: unchanged
ooze playerPositions: still includes disconnected player
replicated snapshot: still includes disconnected player and cube owner
reconnect identity/claim policy: absent
player retirement result: absent
```

`syncHeldCubesToPlayers()` also leaves a held cube unchanged when its owner is missing, so simply deleting a player later would still create an orphaned held cube unless retirement owns cube recovery.

## Required authority flow

```txt
PeerConnectionCloseObservation
  -> bind transport connection to admitted actor/run/epoch
  -> classify transient disconnect, timeout, leave or kick
  -> create DisconnectCommand and monotonic membership revision
  -> suspend or retire actor under explicit policy
  -> drop, return or reserve every owned cube
  -> update GameState players and room roster atomically
  -> remove actor from ooze and interaction authority
  -> publish DisconnectResult-linked snapshot
  -> world/minimap/HUD acknowledge the same revision
  -> admit or reject reconnect claim
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
6. Host Movement Admission and Client Reconciliation
7. Pause/Resume Authority
```

Documentation only. Runtime, network, rendering and deployment behavior are unchanged.
