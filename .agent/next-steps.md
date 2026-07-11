# HorrorCorridor Next Steps

**Updated:** `2026-07-11T09-29-07-04-00`

## Plan ledger

**Goal:** establish canonical roster and transport identity first, then make runtime readiness a generation-fenced provider lease before downstream snapshot, movement and pause work.

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
- [ ] Admit room, run session, epoch, request and sequence before mutation.
- [ ] Return typed accepted, rejected, duplicate, stale and no-change results.
- [ ] Publish no gameplay snapshot for a rejected command.
- [ ] Add bounded admission and rejection observations.
- [ ] Add transport actor, sender/payload, sequence, dedupe and retirement fixtures.

### Gate 3: lobby start transaction

- [ ] Route readiness through host actor admission.
- [ ] Seal one roster revision and fingerprint before bootstrap.
- [ ] Introduce start transaction ID, run session ID and epoch.
- [ ] Correlate START_GAME and initial SYNC.
- [ ] Commit or roll back exactly once.

### Gate 4: run exit and session epoch

- [ ] Add one typed run-exit command and terminal result.
- [ ] Advance the session epoch before old runtime disposal begins.
- [ ] Quarantine late messages and snapshots from prior epochs.
- [ ] Correlate lobby/title projection with the committed exit result.

### Gate 4a: runtime readiness lease and generation fencing

- [ ] Add `runtimeSessionId`, monotonic `runtimeGeneration` and readiness `revision`.
- [ ] Treat shell writes as capability requests, not ready commits.
- [ ] Add one provider lease per simulation, rendering, networking and input capability.
- [ ] Require a concrete resource proof before a provider can commit ready.
- [ ] Derive networking readiness from the actual transport role and status.
- [ ] Require renderer, world, composer, canvas, RAF and first-frame proof for rendering readiness.
- [ ] Require installed listener ownership for input readiness.
- [ ] Advance runtime generation before old resources are disposed.
- [ ] Reject old-generation setup and cleanup writes.
- [ ] Make partial initialization rollback reverse-ordered and typed.
- [ ] Make revocation and cleanup idempotent.
- [ ] Add bounded readiness transition, failure and stale-write journals.
- [ ] Project generation, revision, provider and proof through debug readback.
- [ ] Add `fixture:runtime-readiness`.
- [ ] Add `fixture:runtime-readiness-stale-cleanup`.
- [ ] Add `fixture:runtime-readiness-rollback`.
- [ ] Add `fixture:runtime-readiness-strict-mode`.

### Gate 5: dependent runtime authority

- [ ] Add snapshot duplicate, stale, ordering and conflict policy.
- [ ] Add host movement validation and active client reconciliation.
- [ ] Add replicated pause/resume authority and atomic input suspension.

## Recommended readiness DSKs

```txt
runtime-session-identity-kit
runtime-generation-kit
readiness-capability-descriptor-kit
readiness-provider-lease-kit
resource-readiness-proof-kit
readiness-commit-transaction-kit
readiness-revocation-kit
simulation-readiness-adapter-kit
rendering-readiness-adapter-kit
networking-readiness-adapter-kit
input-readiness-adapter-kit
stale-cleanup-fence-kit
readiness-transition-journal-kit
readiness-debug-projection-kit
runtime-readiness-fixture-kit
```

## Required readiness proof

```txt
shell intent alone never marks rendering or input ready
solo runtime never reports networking ready
networking ready requires a live transport lease
rendering ready requires live resources and first committed frame
input ready requires installed listener ownership
reset advances runtime generation before cleanup
old cleanup cannot mutate the current generation
failed initialization leaves no partial ready capability
cleanup is idempotent
final readiness equals the live resource inventory
```

## Do not start with

```txt
movement rewrite
renderer replacement
new maze content
visual fidelity work
save system
pause convergence
```

Those depend on canonical roster, actor, run-session and runtime-generation identity.