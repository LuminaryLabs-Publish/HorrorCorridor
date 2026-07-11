# HorrorCorridor Next Steps

**Updated:** `2026-07-11T16-21-09-04-00`

## Plan ledger

**Goal:** establish canonical identity and run authority, then make interaction, disconnect, terminal, movement and pause transitions typed, monotonic and visibly correlated.

### Gate 1: roster identity and peer binding
- [ ] Define canonical member, peer, player and slot identities.
- [ ] Bind every connection ID to one admitted actor.
- [ ] Add monotonic roster revision and fingerprint.
- [ ] Distinguish live peers from placeholders and reserved slots.

### Gate 2: transport actor and message admission
- [ ] Require connection, envelope sender and payload actor convergence.
- [ ] Admit room, run, epoch, request ID and sequence before mutation.
- [ ] Add typed accepted, rejected, duplicate, stale and no-change results.

### Gate 3: lobby start transaction
- [ ] Seal one roster revision and fingerprint.
- [ ] Allocate start transaction, run session and session epoch IDs.
- [ ] Correlate bootstrap, START_GAME, SYNC, acknowledgements and first frame.

### Gate 4: run exit and runtime readiness
- [ ] Advance epoch before old runtime disposal.
- [ ] Quarantine prior-run messages and snapshots.
- [ ] Require provider leases and first-frame proof before runtime readiness.

### Gate 5: snapshot and interaction authority
- [ ] Enforce monotonic snapshot sender, run, epoch, sequence and revision admission.
- [ ] Require explicit cube/slot target identities and observed revisions.
- [ ] Add atomic interaction results, idempotency and frame acknowledgement.

### Gate 5b: active-run disconnect and reconnect authority
- [ ] Add `PeerDisconnectObservation` with connection, peer, actor, room, run and epoch identity.
- [ ] Classify transient disconnect, timeout, explicit leave and kick.
- [ ] Add monotonic active-membership revision.
- [ ] Choose suspension and final-retirement policies.
- [ ] Atomically update session room, GameState room and GameState players.
- [ ] Remove retired actors from movement, interaction, ooze and publication inputs.
- [ ] Resolve every held cube through drop, return, reserve or transfer policy.
- [ ] Reject any state where a cube owner is absent from active/suspended membership.
- [ ] Publish typed disconnect result and correlated snapshot.
- [ ] Require world, minimap, HUD and debug first-frame acknowledgement.
- [ ] Add reconnect claims tied to suspended actor, run, epoch and membership revision.
- [ ] Reject duplicate live connections, wrong actors and stale claims.
- [ ] Keep a bounded disconnect/reconnect journal.

### Gate 5b fixture set
- [ ] `fixture:disconnect-actor-binding`
- [ ] `fixture:disconnect-active-player-retirement`
- [ ] `fixture:disconnect-held-cube-recovery`
- [ ] `fixture:disconnect-no-orphan-owner`
- [ ] `fixture:disconnect-ooze-input-removal`
- [ ] `fixture:disconnect-snapshot-convergence`
- [ ] `fixture:disconnect-duplicate-close`
- [ ] `fixture:disconnect-cross-epoch-close`
- [ ] `fixture:reconnect-suspended-actor`
- [ ] `fixture:reconnect-wrong-actor`
- [ ] `fixture:disconnect-first-frame`
- [ ] multi-peer browser and Pages disconnect smoke.

### Later gates
- [ ] Add monotonic victory/failure outcome authority.
- [ ] Add host movement admission and client reconciliation.
- [ ] Add replicated pause/resume convergence.

## Recommended disconnect DSKs

```txt
transport-actor-connection-binding-kit
peer-disconnect-observation-kit
disconnect-command-envelope-kit
disconnect-classification-kit
active-membership-revision-kit
player-suspension-kit
player-retirement-kit
owned-cube-recovery-kit
gameplay-roster-transaction-kit
disconnect-result-kit
disconnect-publication-kit
reconnect-claim-kit
disconnect-frame-correlation-kit
disconnect-journal-kit
active-run-disconnect-fixture-kit
```

## Do not start with

```txt
UI-only disconnected badges
silent player array filtering
cube deletion
unversioned reconnect by display name
client-owned retirement
new gameplay content
```

Those would preserve split authority or destroy owned state without a transaction receipt.
