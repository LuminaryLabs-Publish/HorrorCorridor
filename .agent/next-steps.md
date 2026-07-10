# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T18-31-21-04-00`

## Goal

Add one deterministic authoritative snapshot acceptance boundary so every inbound `SYNC` is validated, classified, committed or rejected, journaled, and correlated with UI/render projection before request acknowledgements depend on it.

## Current next build slice

```txt
HorrorCorridor Authoritative Snapshot Acceptance + Monotonic Replay Fixture Gate
```

## Plan ledger

```txt
[ ] Preserve current solo, host, client, rendering, minimap, HUD, completion, and cadence behavior.
[ ] Define SnapshotAcceptanceInput, SnapshotAcceptanceResult, SnapshotRejectReason, and AcceptedSnapshotRecord.
[ ] Validate protocol version before consuming payload state.
[ ] Validate sender identity against the active host authority.
[ ] Validate envelope roomId, payload room.roomId, and snapshot.room.roomId agreement.
[ ] Validate gameId and seed continuity after the first accepted snapshot.
[ ] Validate payload.authoritativeTick === payload.snapshot.tick.
[ ] Reject ticks lower than the last accepted authoritative tick.
[ ] Classify equal ticks as duplicate, idempotent replay, or conflicting duplicate.
[ ] Define whether reconnect/recovery may reset the acceptance epoch.
[ ] Add a session epoch or authority epoch so a new run can legitimately restart tick numbering.
[ ] Keep snapshot acceptance separate from command acknowledgement and publish decision.
[ ] Commit room, lobby players, runtime snapshot, readiness, and UI as one projection transaction.
[ ] Prevent stale snapshots from regressing COMPLETED to PLAYING.
[ ] Prevent stale snapshots from restoring removed cubes, old ooze, or earlier anomaly slots.
[ ] Record accepted, duplicate, stale, conflicting, wrong-room, wrong-source, wrong-version, and malformed rows.
[ ] Add bounded last-accepted and rejected-snapshot ledgers.
[ ] Add runtime-debug acceptance result, previous tick, candidate tick, source, reason, and commit status.
[ ] Keep version-1 wire compatibility during additive rollout.
[ ] Add deterministic fixture seeds before changing GameShell consumers.
[ ] Prove monotonic accepted delivery.
[ ] Prove duplicate idempotency.
[ ] Prove stale and out-of-order rejection.
[ ] Prove conflicting duplicate rejection.
[ ] Prove cross-room and wrong-host rejection.
[ ] Prove authoritativeTick and snapshot.tick mismatch rejection.
[ ] Prove recovery epoch reset behavior.
[ ] Prove victory cannot rewind to playing.
[ ] Prove accepted snapshot parity with the current final runtime state.
[ ] Add package script fixture:snapshot-acceptance.
[ ] Run existing validation only after the fixture passes.
```

## Suggested source order

```txt
1. snapshotAcceptanceTypes.ts
2. protocolEnvelopePreflight.ts
3. authoritySourceIdentity.ts
4. snapshotAcceptancePolicy.ts
5. snapshotAcceptanceLedger.ts
6. snapshotProjectionTransaction.ts
7. snapshotAcceptanceFixtureSeeds.ts
8. snapshotAcceptanceFixtureRows.ts
9. horror-corridor-snapshot-acceptance-fixture.mjs
10. package.json fixture:snapshot-acceptance
11. runtimeDebugSnapshotProjection.ts
12. runtimeDebugStore.ts additive projection
13. runtimeStore.ts accepted-snapshot metadata
14. GameShell.tsx preflight and atomic projection
15. GameCanvas.tsx accepted-snapshot readback only
```

## Required fixture rows

```txt
first initial snapshot accepted
higher tick accepted
same payload and same tick classified duplicate without re-projection
same tick with different payload rejected as conflicting duplicate
lower tick rejected stale
out-of-order sequence 10, 12, 11 leaves tick 12 committed
payload authoritativeTick mismatch rejected
wrong protocol version rejected
wrong room rejected
wrong host sender rejected
changed gameId or seed rejected inside one epoch
reconnect/recovery epoch reset explicitly accepted
victory snapshot followed by stale playing snapshot remains victory
accepted cube, ooze, player, anomaly, room, and UI parity
runtime debug acceptance and rejection rows remain JSON-safe
legacy version-1 valid snapshot still accepted
```

## Acceptance checks

```txt
[ ] npm run fixture:snapshot-acceptance
[ ] npm run lint
[ ] npm run smoke:protokits
[ ] npm run harness:horror-corridor
[ ] npm run validate:live-player:dev
[ ] npm run review:object-kit
[ ] browser solo smoke
[ ] browser host/client smoke
[ ] delayed-message and reconnect smoke
[ ] runtime-debug export inspection
```

## Explicit non-goals

```txt
PeerJS extraction
renderer extraction
minimap extraction
post-processing extraction
new routes
new maze content
scene-dressing expansion
visual object-kit expansion
network tick retuning
gameplay balance changes
request acknowledgement implementation beyond preserving its integration boundary
```