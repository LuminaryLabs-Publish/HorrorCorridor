# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T03-08-43-04-00`

## Goal

Make remote movement host-authoritative and make active clients converge to acknowledged host poses without discarding responsive local prediction.

## Ordered build slices

```txt
1. HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
2. HorrorCorridor Run Exit Commit + Session Epoch Message Admission Fixture Gate
3. HorrorCorridor Snapshot Acceptance Authority + Projection Transaction Fixture Gate
4. HorrorCorridor Host Movement Admission + Client Reconciliation Fixture Gate
5. HorrorCorridor Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Current documented source slice

```txt
HorrorCorridor Host Movement Admission + Client Reconciliation Fixture Gate
```

This slice should be implemented only after stable run identity, message admission and snapshot acceptance exist, because movement sequence and correction rows must be scoped to one accepted run epoch.

## Plan ledger

- [ ] Preserve current maze generation, local movement feel, camera response, interaction rules, rendering and visual output.
- [ ] Define `PlayerUpdateCommand` with sender, player, room, game, run session, epoch, client sequence, sampled input, claimed pose and timestamps.
- [ ] Bind each transport connection and sender identity to exactly one admitted player id.
- [ ] Reject sender/player mismatch before reading pose or input.
- [ ] Track the last accepted player-update sequence per player and run epoch.
- [ ] Reject stale, duplicate, skipped-policy and post-exit updates with stable reasons.
- [ ] Compute allowed movement from previous authoritative pose, elapsed admitted time and movement constants.
- [ ] Resolve host movement against the same maze collision domain used by local prediction.
- [ ] Prefer host re-simulation from input; retain claimed pose only as comparison/telemetry during compatibility rollout.
- [ ] Emit `AuthoritativePoseResult` with accepted/rejected/no-change, previous/next pose, accepted sequence, correction distance and reason.
- [ ] Include last accepted client sequence in the player snapshot or an additive acknowledgement map.
- [ ] Keep a bounded client prediction history keyed by input sequence.
- [ ] On accepted snapshot, drop acknowledged history and replay only later unacknowledged inputs.
- [ ] Classify correction as none, smooth or snap using explicit thresholds.
- [ ] Clear prediction history on epoch change, reconnect, death, lobby return or hard reset.
- [ ] Expose movement-admission and reconciliation rows through JSON-safe runtime debug state.
- [ ] Add `scripts/horror-corridor-movement-authority-fixture.mjs`.
- [ ] Add `scripts/horror-corridor-client-reconciliation-fixture.mjs`.
- [ ] Add `npm run fixture:movement-authority` and `npm run fixture:client-reconciliation`.
- [ ] Prove sender binding, sequence ordering, collision rejection, speed budget, host correction, smooth convergence and hard snap behavior.
- [ ] Run browser host/client smoke only after deterministic fixtures pass.

## Suggested source order

```txt
1. features/player/domain/playerUpdateCommand.ts
2. features/player/domain/connectionPlayerIdentity.ts
3. features/player/domain/playerUpdateSequenceAdmission.ts
4. features/player/domain/hostMovementBudget.ts
5. features/player/domain/hostMovementSimulation.ts
6. features/player/domain/authoritativePoseResult.ts
7. features/player/domain/movementAdmissionLedger.ts
8. features/player/domain/clientPredictionHistory.ts
9. features/player/domain/clientPoseReconciliation.ts
10. features/player/domain/correctionSmoothingPolicy.ts
11. features/debug/domain/movementAuthorityDebugProjection.ts
12. protocol additive run identity and accepted-sequence acknowledgement
13. GameCanvas client publication, host consumption and reconciliation adapters
14. runtime-store movement ledger/readback adapter
15. scripts/horror-corridor-movement-authority-fixture.mjs
16. scripts/horror-corridor-client-reconciliation-fixture.mjs
17. package.json fixture commands
```

## Required fixture rows

```txt
matching sender/player/room/run/epoch accepted
sender/player mismatch rejected without mutation
unknown player rejected
stale sequence rejected
exact duplicate returns no-change
sequence reset accepted only after new epoch or reconnect policy
zero-input impossible displacement rejected
speed-budget violation rejected
wall-crossing claimed pose rejected or corrected
valid movement input produces deterministic host pose
host snapshot acknowledges accepted client sequence
active client drops acknowledged inputs
active client replays only later unacknowledged inputs
small correction smooths to host pose
large correction snaps to host pose
pause or exit clears movement admission and prediction buffers
all commands, results, ledgers and snapshots remain JSON-safe
```

## Acceptance checks

```txt
[ ] npm run fixture:session-lifecycle
[ ] npm run fixture:session-message-admission
[ ] npm run fixture:snapshot-acceptance
[ ] npm run fixture:movement-authority
[ ] npm run fixture:client-reconciliation
[ ] npm run fixture:pause-convergence
[ ] npm run lint
[ ] npm run smoke:protokits
[ ] npm run harness:horror-corridor
[ ] npm run build
[ ] npm run validate:live-player:dev
[ ] browser host/client correction smoke
[ ] runtime-debug movement admission/reconciliation export inspection
```

## Explicit non-goals

```txt
renderer replacement
PeerJS extraction
minimap extraction
post-processing extraction
new maze content
scene-dressing expansion
visual object-kit expansion
network tick-rate tuning before correctness proof
movement balance tuning before authority proof
host migration
```
