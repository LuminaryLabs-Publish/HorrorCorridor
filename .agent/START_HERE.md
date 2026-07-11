# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T03-18-44-04-00`

## Summary

HorrorCorridor is a cooperative first-person maze with solo, host and client modes, deterministic procedural bootstrap, cube interactions, ordered anomaly completion, ooze pressure, PeerJS networking, client prediction, Three.js rendering, bloom, minimap and debug readback. This pass isolates the queue-head lobby defect: readiness is local-only and run startup is split across uncorrelated START_GAME and initial SYNC messages, so there is no atomic, replayable start transaction.

## Plan ledger

**Goal:** preserve the current playable route while making lobby readiness, roster sealing, start admission, bootstrap commit and client projection one deterministic, fixture-backed transaction.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor` because its newer repo-local audit was not yet reflected by the central ledger.
- [x] Re-read `GameShell`, `LobbyScreen`, session storage and protocol message construction.
- [x] Identify the interaction loop, active domains, implemented kits and services.
- [x] Trace local ready mutation, host start, bootstrap, `START_GAME`, initial `SYNC` and client projection.
- [x] Record the missing roster revision, start transaction, message correlation and rollback boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, protocol and deployment audits.
- [x] Change no runtime source and create no branch or pull request.
- [x] Push documentation directly to `main`.

## Selection result

The accessible Publish inventory contains ten repositories. All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `HorrorCorridor` had a newer repo-local audit at `2026-07-11T03-08-43-04-00` while the central ledger still showed an older selection state, so it was prioritized as recently documented locally but not fully synchronized centrally.

## Current interaction loop

```txt
client presses Toggle ready
  -> client mutates its local Zustand roster only
  -> no ready command is sent to the host
  -> host roster remains unchanged

host presses Start run
  -> checks only sessionMode === host and room exists
  -> asynchronous loading begins without a starting-phase guard
  -> bootstrap consumes current host lobbyPlayers
  -> host commits PLAYING locally
  -> host broadcasts START_GAME
  -> host broadcasts initial SYNC
  -> client START_GAME handler updates room/identity only
  -> client SYNC handler independently enters PLAYING
```

## Main finding

`START_GAME` and the initial `SYNC` are two independent publications with optional request IDs left undefined. They carry no shared start transaction ID, roster revision, roster fingerprint, run-session ID or commit status. A client can therefore receive one without the other, receive them out of order, or accept an unrelated initial `SYNC` as sufficient authority to enter play.

## Ordered safe ledges

```txt
1. HorrorCorridor Lobby Start Transaction Authority + Correlated START_GAME/SYNC Fixture Gate
2. HorrorCorridor Run Exit Commit + Session Epoch Message Admission Fixture Gate
3. HorrorCorridor Snapshot Acceptance Authority + Projection Transaction Fixture Gate
4. HorrorCorridor Host Movement Admission + Client Reconciliation Fixture Gate
5. HorrorCorridor Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T03-18-44-04-00-lobby-start-transaction-dsk-map.md
.agent/protocol-audit/2026-07-11T03-18-44-04-00-start-game-sync-correlation-contract.md
```
