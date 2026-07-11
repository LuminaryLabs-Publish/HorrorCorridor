# HorrorCorridor Next Steps

**Updated:** `2026-07-11T15-01-33-04-00`

## Plan ledger

**Goal:** finish canonical actor, run and snapshot foundations, then make every cube interaction commit one explicit observed target with a typed result before terminal, movement or pause behavior depends on it.

### Gate 1: roster identity and peer binding

- [ ] Replace ambiguous roster rows with canonical member records.
- [ ] Distinguish `host-local`, `peer` and `reserved-slot` membership.
- [ ] Add explicit peer, member, player and slot identities.
- [ ] Add monotonic roster revision and stable fingerprint.
- [ ] Ensure reserved slots never enter gameplay bootstrap.
- [ ] Add placeholder, peer-claim and disconnect fixtures.

### Gate 2: transport actor binding and message admission

- [ ] Bind each live connection to one admitted member and gameplay player.
- [ ] Require transport, envelope sender and payload player identities to converge.
- [ ] Admit room, session, epoch, request and sequence before mutation.
- [ ] Return typed accepted, rejected, duplicate, stale and no-change results.
- [ ] Add transport actor, sender/payload, sequence, dedupe and retirement fixtures.

### Gate 3: lobby start transaction

- [ ] Add `StartRunCommand` with command ID and observed revisions.
- [ ] Validate host actor, transport role/status, lobby phase and readiness policy.
- [ ] Seal one immutable roster revision and fingerprint.
- [ ] Allocate `startTransactionId`, `runSessionId` and monotonic `sessionEpoch`.
- [ ] Build and commit one deterministic bootstrap plan.
- [ ] Correlate START_GAME, SYNC, per-peer acknowledgement and first frame.

### Gate 4: run exit and session epoch

- [ ] Add one typed run-exit command and terminal result.
- [ ] Advance the session epoch before old runtime disposal begins.
- [ ] Quarantine late messages and snapshots from prior epochs.
- [ ] Correlate lobby/title projection with the committed exit result.

### Gate 4a: runtime readiness and generation fencing

- [ ] Add `runtimeSessionId`, monotonic `runtimeGeneration` and readiness revision.
- [ ] Treat shell writes as capability requests, not ready commits.
- [ ] Add one provider lease per simulation, rendering, networking and input capability.
- [ ] Require concrete resource and first-frame proof before ready.
- [ ] Reject old-generation setup and cleanup writes.

### Gate 5: snapshot acceptance authority

- [ ] Add authoritative sender, room, run, epoch, sequence and revision admission.
- [ ] Reject stale, duplicate and conflicting snapshots before store mutation.
- [ ] Prevent older snapshots from rewinding interaction, progress or terminal state.
- [ ] Return typed snapshot-admission results.
- [ ] Correlate accepted snapshots with projection and frame receipts.

### Gate 5a: interaction target intent and claim authority

- [ ] Add `InteractionCommandId`, `actorId`, `runSessionId`, `sessionEpoch` and observed snapshot revision.
- [ ] Require pickup commands to name one `cubeId` or explicitly declare deterministic nearest-target policy.
- [ ] Require place and remove commands to name one `slotId`.
- [ ] Add cube and slot claim revisions.
- [ ] Preflight actor, phase, distance, ownership, target state and observed revision before mutation.
- [ ] Reject stale or conflicting targets without substituting another cube or slot.
- [ ] Commit cube, slot, ownership and sequence state atomically.
- [ ] Return accepted, rejected, duplicate, stale, conflict and no-change results.
- [ ] Cache the first result by command ID for idempotent retry.
- [ ] Publish a snapshot correlated to the accepted interaction result.
- [ ] Require client acknowledgement and first interaction-frame proof.
- [ ] Add a bounded interaction journal and detached debug observation.

### Gate 5a fixture set

- [ ] `fixture:interaction-explicit-cube-target`
- [ ] `fixture:interaction-explicit-slot-target`
- [ ] `fixture:interaction-stale-cube-claim`
- [ ] `fixture:interaction-stale-slot-claim`
- [ ] `fixture:interaction-pickup-contention`
- [ ] `fixture:interaction-place-contention`
- [ ] `fixture:interaction-remove-contention`
- [ ] `fixture:interaction-duplicate-idempotency`
- [ ] `fixture:interaction-reorder`
- [ ] `fixture:interaction-distance-rejection`
- [ ] `fixture:interaction-ownership-conflict`
- [ ] `fixture:interaction-result-snapshot-correlation`
- [ ] `fixture:interaction-first-frame`
- [ ] browser multi-peer cube/slot contention smoke.

### Gate 5b: terminal outcome authority

- [ ] Select and version explicit victory and defeat predicates.
- [ ] Build one deterministic outcome input from admitted interaction and snapshot results.
- [ ] Add terminal outcome ID, revision and monotonic latch.
- [ ] Make victory and failure update room, game, publication and projection coherently.
- [ ] Require per-peer acknowledgement and first terminal-frame proof.

### Gate 6: movement and reconciliation

- [ ] Add host movement validation and accepted movement results.
- [ ] Bind client prediction to admitted command sequences.
- [ ] Add active correction and reconciliation.

### Gate 7: pause and resume

- [ ] Add replicated pause/resume authority.
- [ ] Suspend simulation, input and publication atomically.
- [ ] Require host/client pause-state convergence.

## Recommended interaction DSKs

```txt
interaction-command-envelope-kit
interaction-target-observation-kit
cube-target-claim-kit
anomaly-slot-claim-kit
interaction-admission-kit
interaction-preflight-kit
interaction-transaction-kit
interaction-result-kit
interaction-idempotency-kit
interaction-conflict-kit
held-cube-ownership-revision-kit
interaction-publication-kit
interaction-client-acknowledgement-kit
interaction-frame-correlation-kit
interaction-journal-kit
interaction-target-fixture-kit
```

## Required interaction proof

```txt
same explicit target and revision produce the same decision
stale target rejects without choosing a replacement
contention yields one accepted claim and one explicit rejection
command retry returns the original result without another mutation
cube and slot state commit together
held ownership has exactly one owner and monotonic revision
accepted interaction result names the published snapshot revision
world, minimap, HUD and debug projection acknowledge the same result
cross-epoch and retired-run commands reject before mutation
```

## Do not start with

```txt
new cube types
new anomaly visuals
pickup animation polish
save system
client-side target substitution
UI-only success messages
```

Those depend on canonical actor, run/session/epoch, snapshot, explicit target and typed result authority.
