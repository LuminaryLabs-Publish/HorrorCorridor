# Deploy Audit: Deterministic Ooze Replay Fixture Gate

**Timestamp:** `2026-07-11T19-38-14-04-00`

## Summary

Current build, lint, ProtoKit, harness, visual and live-player commands do not prove deterministic ongoing gameplay randomness, checkpoint restore or host-migration continuation.

## Plan ledger

**Goal:** define the pure, simulation, browser and deployed evidence required before deterministic replay is considered complete.

- [x] Record existing package checks.
- [x] Define focused pure fixtures.
- [x] Define checkpoint and migration fixtures.
- [x] Define browser and Pages evidence.
- [ ] Implement and run the gate.

## Existing checks

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
npm run review:object-kit
```

## Required pure gate

```txt
stream-seed-derivation-stability
algorithm-version-stability
same-seed-value-parity
stream-isolation
draw-index-monotonicity
duplicate-step-idempotency
failed-transaction-checkpoint-preservation
checkpoint-fingerprint
checkpoint-roundtrip
```

## Required simulation gate

```txt
same-seed same-input ooze-spawn parity
same-seed same-input ooze-decay parity
pause consumes zero values
cadence-independent fixed-step result
snapshot restore next-value parity
replay final-state parity
host migration next-value parity
```

## Required browser gate

```txt
solo deterministic replay
host/client visible ooze convergence
reconnect from checkpoint
host migration or simulated transfer
debug checkpoint/frame correlation
repeated run comparison
```

## Required Pages evidence

```txt
commit SHA and route
run seed and session epoch
algorithm and stream IDs
input/fixed-step transcript fingerprint
checkpoint revisions and draw indexes
snapshot fingerprints
frame fingerprints
replay/restore/migration comparison
bounded logs or artifact references
```

## Completion boundary

Do not claim deterministic gameplay replay or migration correctness until independent runs produce matching ooze snapshots and next-value checkpoints from the same authoritative transcript.
