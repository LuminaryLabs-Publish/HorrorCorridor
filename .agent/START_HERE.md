# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T14-22-01-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, deterministic maze bootstrap, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates data-channel-open and roster-admission authority. On the PeerJS host path, a new connection is inserted into the candidate map and `peer/connection-open` is emitted unconditionally even when `connection.open` is false. `GameShell` treats that event as proof of a connected guest, mutates the authoritative room roster and attempts a lobby broadcast. The broadcast can reach zero clients, and the one-shot event guard prevents the true later open callback from performing admission again.

## Plan ledger

**Goal:** keep connection candidates detached from lobby and gameplay state until actual open evidence, current generations, identity binding and atomic roster commitment are proven.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify central-ledger and root `.agent` coverage for all nine eligible repositories.
- [x] Select only `HorrorCorridor` as the oldest eligible central entry.
- [x] Inspect PeerJS host/client adapters, event contracts, session mutations, lobby presentation and start bootstrap.
- [x] Identify the interaction loop, all domains, 29 implemented kits and offered services.
- [x] Add the data-channel roster-admission audit family.
- [x] Refresh root routing and machine registry.
- [x] Synchronize central tracking on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable admission fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-12T14-22-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T14-22-01-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T14-22-01-04-00-data-channel-roster-admission-dsk-map.md
.agent/render-audit/2026-07-12T14-22-01-04-00-premature-roster-visible-lobby-gap.md
.agent/gameplay-audit/2026-07-12T14-22-01-04-00-ghost-member-start-bootstrap-loop.md
.agent/interaction-audit/2026-07-12T14-22-01-04-00-connection-open-member-admission-map.md
.agent/connection-admission-audit/2026-07-12T14-22-01-04-00-channel-open-binding-roster-contract.md
.agent/deploy-audit/2026-07-12T14-22-01-04-00-peerjs-admission-fixture-gate.md
```

Retain the transport-mode audit family at `2026-07-12T12-21-38-04-00` and all preceding identity, actor-binding, lobby-start, loading, lifecycle, startup, readiness, render-surface, input, clock, snapshot, movement, interaction, outcome, randomness, delivery, pause and debug audits.

## Interaction loop

```txt
host lobby
  -> PeerJS connection candidate arrives
  -> candidate is inserted into connection map
  -> open/data/close/error handlers are installed
  -> connection-open event is emitted immediately
  -> GameShell admits connected guest into room roster
  -> lobby broadcast can send to zero because channel remains closed
  -> actual open callback is suppressed by one-shot guard

host start
  -> Start run has no admitted-channel or all-ready gate
  -> bootstrap consumes current lobbyPlayers
  -> START_GAME and SYNC skip unopened connections
  -> host can render a participant who never received the run
```

## Current finding

```txt
connection candidate creation is mislabeled as channel open
channel open event has no generation or actual-open proof
roster mutation occurs before connection admission
lobby publication can fail without rollback
true open transition can be consumed prematurely
error without close does not reconcile roster membership
host start can include ghost members
visible player count has no roster revision proof
```

## Required parent domain

```txt
corridor-data-channel-roster-admission-authority-domain
```

## Required flow

```txt
AdmitLobbyMemberCommand
  -> allocate candidate ID and connection generation
  -> observe actual DataConnection open state
  -> validate session and transport generations
  -> validate remote identity claim
  -> bind one connection to one actor/member
  -> commit room membership and roster revision atomically
  -> publish typed admission and lobby-delivery results
  -> seal start eligibility from the committed roster
  -> acknowledge the first visible lobby frame
```

## Census

```txt
source-backed kits: 29
planned connection-admission kits and fixtures: 26
```

The complete kit and service inventory is in `.agent/current-audit.md`, `.agent/kit-registry.json` and the current tracker.