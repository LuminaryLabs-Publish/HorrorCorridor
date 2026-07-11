# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T07-30-40-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, client prediction, host snapshot publication, cube interactions, ordered anomaly completion, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded runtime debug readback.

This pass isolates a transport actor-identity defect. Inbound host events already identify the real connection through `remotePeerId` and `connectionId`, but gameplay dispatch ignores that provenance and trusts the protocol `senderId` and payload `playerId` supplied by the message.

## Plan ledger

**Goal:** require one authoritative connection-to-member-to-player binding and one typed inbound admission result before any network command can mutate gameplay state.

- [x] Compare the full accessible Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` under the oldest eligible fallback rule.
- [x] Read prior roster, start, session, snapshot, movement and pause audits.
- [x] Trace transport provenance, protocol identities, host dispatch, mutation and render projection.
- [x] Identify all active domains, kits and services.
- [x] Add timestamped architecture, render, gameplay, interaction, transport, protocol and deploy audits.
- [x] Refresh all required root `.agent` documents.
- [x] Change no runtime source and create no branch or pull request.
- [x] Push documentation directly to `main`.

## Selection result

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0
selected: HorrorCorridor
excluded: TheCavalryOfRome
```

`HorrorCorridor` had the oldest eligible central ledger timestamp at selection. Only `LuminaryLabs-Publish/HorrorCorridor` was changed in the Publish organization.

## Current interaction loop

```txt
client predicts movement or derives interaction
  -> sends PLAYER_UPDATE or TRY_INTERACT
  -> host event exposes remotePeerId + connectionId
  -> message separately claims senderId + payload.playerId
  -> structural decoder checks shape only
  -> host ignores transport actor identity
  -> payload.playerId selects the gameplay actor
  -> state mutates and host publishes SYNC
  -> world, minimap, HUD and debug project the result
```

## Main finding

The host cannot prove that the connection sending a command owns the claimed sender or player identity. A stale, drifting or crafted client message can target another existing player, and the host can then publish that mutation as authoritative state.

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding + Placeholder Admission Fixture Gate
2. Transport Actor Binding + Sender/Payload Admission Fixture Gate
3. Lobby Start Transaction Authority + Correlated START_GAME/SYNC Fixture Gate
4. Run Exit Commit + Session Epoch Message Admission Fixture Gate
5. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
6. Host Movement Admission + Client Reconciliation Fixture Gate
7. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Read first

```txt
.agent/trackers/2026-07-11T07-30-40-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/turn-ledger/2026-07-11T07-30-40-04-00.md
.agent/architecture-audit/2026-07-11T07-30-40-04-00-transport-actor-binding-dsk-map.md
.agent/render-audit/2026-07-11T07-30-40-04-00-unbound-actor-projection-gap.md
.agent/gameplay-audit/2026-07-11T07-30-40-04-00-peer-impersonation-mutation-loop.md
.agent/interaction-audit/2026-07-11T07-30-40-04-00-connection-message-actor-admission-map.md
.agent/transport-identity-audit/2026-07-11T07-30-40-04-00-connection-peer-player-binding-contract.md
.agent/protocol-audit/2026-07-11T07-30-40-04-00-transport-envelope-identity-consistency.md
.agent/deploy-audit/2026-07-11T07-30-40-04-00-transport-actor-fixture-gate.md
```

## Guardrails

```txt
push only to main
create no branches or pull requests
do not work on TheCavalryOfRome
keep browser callbacks as intent adapters
bind each live connection to one admitted member and player
reject identity mismatches before gameplay mutation
publish only accepted state changes
keep proof deterministic, bounded, detached and JSON-safe
do not claim runtime success without executable evidence
```