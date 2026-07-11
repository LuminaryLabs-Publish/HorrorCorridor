# HorrorCorridor Next Steps

**Updated:** `2026-07-11T16-38-10-04-00`

## Plan ledger

**Goal:** establish canonical actor and run identity, preserve the active-run disconnect transaction, then separate inbound movement traffic from fixed authoritative simulation and bounded snapshot publication before movement reconciliation or pause depends on it.

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
- [ ] Remove retired actors from movement, interaction, ooze, input queues and publication inputs.
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
- [ ] Multi-peer browser and Pages disconnect smoke.

### Gate 5c: terminal outcome authority

- [ ] Make victory/failure monotonic under one terminal outcome revision.
- [ ] Consume admitted interaction and snapshot results rather than raw mutable state.
- [ ] Correlate terminal publication, acknowledgement and first visible frame.

### Gate 6: host network cadence and fixed simulation authority

- [ ] Add an inbound update envelope carrying connection, actor, player, room, run and epoch identities.
- [ ] Consume and validate `payload.input.sequence` per admitted player.
- [ ] Track last accepted, duplicate, stale, gap and retired sequence results.
- [ ] Add a bounded per-player movement input queue.
- [ ] Define deterministic latest-input coalescing for multiple updates before one simulation step.
- [ ] Add one fixed simulation clock independent of packet arrival and publication time.
- [ ] Add monotonic `simulationStepSequence` and committed state revision.
- [ ] Select at most one admitted input per player per fixed step.
- [ ] Advance movement, collision, held cubes, ooze and scheduled gameplay systems from the same step.
- [ ] Remove `lastNetworkTickAtMs` as a shared input, simulation and publication clock.
- [ ] Define snapshot tick semantics separately from simulation-step identity.
- [ ] Add bounded normal publication cadence and explicit high-priority event policy.
- [ ] Coalesce dirty state instead of publishing a full snapshot for every packet.
- [ ] Capture per-peer attempted, sent, closed, failed and backpressured delivery rows.
- [ ] Add slow-peer isolation, pending-byte and retry/disconnect policy.
- [ ] Add bounded cadence journal and per-peer observations.
- [ ] Correlate committed simulation revision, snapshot publication and first visible frame.

### Gate 6 fixture set

- [ ] `fixture:host-cadence-baseline`
- [ ] `fixture:host-cadence-one-client`
- [ ] `fixture:host-cadence-multi-client`
- [ ] `fixture:host-cadence-burst-coalescing`
- [ ] `fixture:host-cadence-duplicate-reorder`
- [ ] `fixture:host-cadence-flood-budget`
- [ ] `fixture:host-cadence-ooze-starvation`
- [ ] `fixture:snapshot-publication-budget`
- [ ] `fixture:partial-delivery-result`
- [ ] `fixture:cadence-frame-correlation`
- [ ] Browser host plus multi-peer normal/flood smoke.

### Gate 6a: host movement admission and client reconciliation

- [ ] Validate displacement, speed, acceleration, collision and timestamp skew after cadence admission.
- [ ] Apply one accepted movement candidate at the fixed step boundary.
- [ ] Return movement result tied to input sequence and simulation step.
- [ ] Reconcile client prediction against accepted host result.

### Gate 7: pause and resume

- [ ] Add replicated pause/resume authority.
- [ ] Suspend input selection, simulation and publication atomically under explicit policy.
- [ ] Require host/client pause-state convergence.

## Recommended network cadence DSKs

```txt
inbound-player-update-envelope-kit
per-peer-input-sequence-kit
player-update-admission-kit
movement-input-queue-kit
latest-input-coalescing-kit
fixed-simulation-clock-kit
simulation-step-sequence-kit
authoritative-system-tick-kit
snapshot-publication-cadence-kit
snapshot-publication-plan-kit
per-peer-delivery-result-kit
transport-backpressure-policy-kit
network-cadence-journal-kit
network-cadence-observation-kit
host-network-cadence-fixture-kit
multi-peer-flood-smoke-kit
```

## Required cadence proof

```txt
same admitted input stream produces the same fixed-step results
peer count and packet frequency do not change authoritative step frequency
continuous movement traffic does not starve ooze
stale and duplicate sequences reject before queue insertion
multiple inputs before one step coalesce deterministically
one flood peer cannot create unbounded queue, publication or fanout work
snapshot publication cites one committed state revision
partial delivery is observed per peer
world, minimap, HUD and debug acknowledge the same revision
```

## Do not start with

```txt
increasing NETWORK_TICK_RATE
publishing fewer packets through an arbitrary timeout only
moving ooze to another shared timestamp
client-side flood suppression as the only guard
UI-only network metrics
unbounded per-player packet queues
new gameplay content
```

Those changes would mask the clock aliasing without establishing authoritative input admission, fixed simulation or bounded publication.
