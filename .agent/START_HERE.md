# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T11-39-11-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, client prediction, host snapshots, cube interactions, ordered anomaly completion, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded runtime debug readback.

This pass isolates the next unresolved multiplayer boundary: the host start callback commits locally after asynchronous loading, then emits independent START_GAME and SYNC broadcasts without one transaction, run session, epoch, roster seal, acknowledgement or first-frame proof.

## Plan ledger

**Goal:** make lobby-to-run transition one host-authoritative transaction so every admitted peer starts from the same sealed roster, bootstrap, run identity and epoch exactly once.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Skip active same-window writes in `TheOpenAbove`.
- [x] Select only `HorrorCorridor` as the oldest stable fallback.
- [x] Trace lobby UI, session stores, loading, bootstrap, protocol publication and client projection.
- [x] Identify interaction loop, domains, kits and services.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` state.
- [x] Push documentation directly to `main`.
- [ ] Runtime implementation and executable fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-11T11-39-11-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
```

Then read:

```txt
.agent/turn-ledger/2026-07-11T11-39-11-04-00.md
.agent/architecture-audit/2026-07-11T11-39-11-04-00-lobby-start-transaction-dsk-map.md
.agent/render-audit/2026-07-11T11-39-11-04-00-first-run-frame-start-correlation-gap.md
.agent/gameplay-audit/2026-07-11T11-39-11-04-00-loading-roster-bootstrap-divergence-loop.md
.agent/interaction-audit/2026-07-11T11-39-11-04-00-start-command-admission-map.md
.agent/lobby-start-audit/2026-07-11T11-39-11-04-00-correlated-start-commit-contract.md
.agent/deploy-audit/2026-07-11T11-39-11-04-00-lobby-start-fixture-gate.md
```

## Active interaction loop

```txt
title
  -> solo, host or client lobby/run admission
  -> room, roster, peer identity and connection projection
  -> host Start run click
  -> asynchronous loading frames and timers
  -> deterministic bootstrap from captured room/roster values
  -> host local active-state commit
  -> independent START_GAME broadcast
  -> independent initial SYNC broadcast
  -> client applies each message independently
  -> client enters PLAYING from SYNC
  -> GameCanvas mounts and renders
```

## Current finding

```txt
host actor admission: incomplete
transport connected requirement: absent
all-ready admission: absent
start-in-progress lock: absent
room/roster revision seal: absent
post-loading revalidation: absent
startTransactionId: absent
runSessionId: absent
sessionEpoch: absent
START_GAME/SYNC correlation: absent
per-peer publication result: discarded
client acknowledgement: absent
retry/dedupe policy: absent
first-frame start correlation: absent
```

Concrete divergence paths:

```txt
roster changes while loading
  -> bootstrap uses captured stale roster

host broadcasts to zero peers
  -> host already entered PLAYING

client receives START_GAME only
  -> active room projection but remains in lobby

client receives SYNC only
  -> enters PLAYING without correlated start admission
```

## Domains in use

```txt
application and screen routing
UI loading pause completion and settings projection
session room roster peer identity readiness and connection state
lobby identity peer binding reserved slots readiness and start admission
start transaction roster seal run session epoch and bootstrap commit
PeerJS and BroadcastChannel transport
connection registry event bus actor binding and message admission
protocol construction serialization correlation acknowledgement and retry
seeded maze gameplay bootstrap and replicated snapshot
input movement collision camera and prediction
cube interaction anomaly completion and ooze pressure
authoritative publication acceptance and replay
Three.js world post-processing minimap HUD first-frame projection
RAF resize resource ownership debug cleanup validation and deployment
```

## Implemented kits

```txt
corridor-application-shell-kit
corridor-session-domain-kit
runtime-store-snapshot-kit
ui-pause-projection-kit
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
horror-corridor-lobby-start-authority-domain
  -> lobby-start-command-kit
  -> lobby-start-admission-policy-kit
  -> lobby-start-roster-seal-kit
  -> lobby-start-transaction-id-kit
  -> run-session-identity-kit
  -> run-session-epoch-kit
  -> lobby-start-bootstrap-plan-kit
  -> lobby-start-commit-kit
  -> lobby-start-publication-bundle-kit
  -> lobby-start-client-admission-kit
  -> lobby-start-acknowledgement-kit
  -> lobby-start-retry-and-dedupe-kit
  -> lobby-start-result-kit
  -> lobby-start-transition-journal-kit
  -> lobby-start-debug-projection-kit
  -> lobby-start-fixture-kit
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding + Placeholder Admission Fixture Gate
2. Transport Actor Binding + Sender/Payload Admission Fixture Gate
3. Lobby Start Transaction Authority + Correlated START_GAME/SYNC/Ack Fixture Gate
4. Run Exit Commit + Session Epoch Message Admission Fixture Gate
4a. Runtime Readiness Lease + Generation-Fenced Cleanup Fixture Gate
5. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
6. Host Movement Admission + Client Reconciliation Fixture Gate
7. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not bootstrap from an unsealed roster.
Do not let loading-time state changes commit through stale closures.
Do not treat either START_GAME or SYNC alone as a complete start.
Do not claim multiplayer start correctness without loss, reorder, retry and multi-peer fixtures.
```
