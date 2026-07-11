# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T05-28-29-04-00`

## Summary

HorrorCorridor is a cooperative first-person maze with solo, host and client modes, procedural bootstrap, cube interactions, ordered anomaly completion, ooze pressure, PeerJS networking, client prediction, Three.js rendering, bloom, minimap and debug readback.

This pass isolates the roster-identity defect that precedes the existing lobby-start transaction gate: `Add guest` creates a connected-looking synthetic player with no peer owner, real peer arrival creates a second row instead of claiming the slot, and bootstrap turns every roster row into an active replicated player.

## Plan ledger

**Goal:** establish one authoritative lobby roster with explicit member kind, peer binding, slot status, monotonic revision, stable fingerprint and bootstrap eligibility before readiness and run start can be sealed.

- [x] Compare the full accessible `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest stable eligible audit after the fresh `TheOpenAbove` Air Mail pass.
- [x] Trace placeholder creation, peer open/close, ready mutation, roster storage and bootstrap consumption.
- [x] Identify the interaction loop, domains, kits and offered services.
- [x] Add timestamped architecture, render, gameplay, interaction, roster, protocol and deploy audits.
- [x] Refresh the required root `.agent` documents.
- [x] Change no runtime source and create no branch or pull request.
- [x] Push documentation directly to `main`.

## Selection result

The accessible Publish inventory contains ten repositories. `TheCavalryOfRome` remained excluded. All nine eligible repositories were already tracked and had root audit state.

`TheOpenAbove` received a fresh repo-local audit at `2026-07-11T05-25-29-04-00`. `HorrorCorridor`, last aligned at `2026-07-11T03-18-44-04-00`, was therefore the oldest stable eligible selection. Only `LuminaryLabs-Publish/HorrorCorridor` was changed in the Publish organization.

## Current interaction loop

```txt
host enters lobby
  -> Add guest creates guest-player-* with connectionState=connected
  -> synthetic row has no peerId, member kind or slot identity
  -> real peer opens a connection
  -> exact remotePeerId lookup misses the synthetic row
  -> a second real-peer roster row is created
  -> host starts the run
  -> live lobbyPlayers is passed directly to bootstrap
  -> every row becomes an active replicated player
  -> world, minimap and debug output project the placeholder as a participant
```

## Main finding

`LobbyPlayer` cannot distinguish `host-local`, `peer` and `reserved-slot` membership. Placeholder rows are indistinguishable from connected participants, peer events cannot claim or release them, and `createInitialGameState()` maps every row into gameplay state.

The current start-transaction plan cannot truthfully seal a roster until peer/player binding, slot reservation, roster revision/fingerprint and bootstrap admission are authoritative.

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding + Placeholder Admission Fixture Gate
2. Lobby Start Transaction Authority + Correlated START_GAME/SYNC Fixture Gate
3. Run Exit Commit + Session Epoch Message Admission Fixture Gate
4. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
5. Host Movement Admission + Client Reconciliation Fixture Gate
6. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Read first

```txt
.agent/trackers/2026-07-11T05-28-29-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/turn-ledger/2026-07-11T05-28-29-04-00.md
.agent/architecture-audit/2026-07-11T05-28-29-04-00-lobby-roster-identity-dsk-map.md
.agent/render-audit/2026-07-11T05-28-29-04-00-placeholder-player-projection-gap.md
.agent/gameplay-audit/2026-07-11T05-28-29-04-00-placeholder-bootstrap-player-loop.md
.agent/interaction-audit/2026-07-11T05-28-29-04-00-add-guest-ready-roster-command-map.md
.agent/roster-authority-audit/2026-07-11T05-28-29-04-00-peer-placeholder-binding-contract.md
.agent/protocol-audit/2026-07-11T05-28-29-04-00-roster-revision-membership-correlation.md
.agent/deploy-audit/2026-07-11T05-28-29-04-00-roster-admission-fixture-gate.md
```

## Guardrails

```txt
push only to main
create no branches or pull requests
do not work on TheCavalryOfRome
keep browser callbacks as intent adapters, not authority
reserved slots never enter gameplay bootstrap
bind each real peer to one member and one player identity
seal one immutable roster revision before start bootstrap
keep proof deterministic, bounded, detached and JSON-safe
do not claim runtime success without executable evidence
```