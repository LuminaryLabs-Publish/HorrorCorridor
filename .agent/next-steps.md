# HorrorCorridor Next Steps

**Updated:** `2026-07-13T23-38-39-04-00`

## Summary

Replace timer-driven loading rows with an immutable work plan whose visible progress is derived from accepted subsystem results. Commit `PLAYING` and readiness only after bootstrap, render preparation and the first matching visible frame settle.

## Plan ledger

**Goal:** turn loading from a cosmetic delay into one cancellable, evidence-backed transaction.

### Documentation

- [x] Audit the loading rows, bootstrap order and render mount order.
- [x] Preserve the 29-kit inventory and complete domain map.
- [x] Define the parent DSK and candidate surfaces.
- [x] Add the timestamped audit family.
- [x] Refresh root docs and registry.

### Gate 1: command and generation

- [ ] Add `CorridorLoadCommand`, `LoadAttemptId` and `LoadGeneration`.
- [ ] Bind route, session, room, roster and provider revisions.
- [ ] Reject duplicate or stale starts without mutation.

### Gate 2: real work plan

- [ ] Replace authored timer labels with subsystem step descriptors.
- [ ] Give every step a command, expected revision and typed result.
- [ ] Derive progress from accepted weighted receipts.
- [ ] Expose failed and degraded states explicitly.

### Gate 3: cancellation and rollback

- [ ] Cancel after route, session, room, roster or provider replacement.
- [ ] Revalidate after every asynchronous boundary.
- [ ] Retire timers, partial bootstrap and visual resources exactly once.
- [ ] Restore the predecessor route after failure or cancellation.

### Gate 4: readiness settlement

- [ ] Prepare the deterministic bootstrap artifact before adoption.
- [ ] Prepare renderer, scene, post-processing and world resources before `PLAYING`.
- [ ] Derive simulation, rendering, networking and input readiness from evidence.
- [ ] Revoke readiness when its provider generation retires.

### Gate 5: visible completion

- [ ] Submit the first render under the accepted load generation.
- [ ] Publish `FirstVisibleFrameAck`.
- [ ] Commit `PLAYING` only with the matching acknowledgement.
- [ ] Publish a terminal `CorridorLoadResult`.

### Gate 6: fixtures

- [ ] Timer-only false progress rejection.
- [ ] Route replacement during every step.
- [ ] Bootstrap and renderer failure.
- [ ] Zero-sized mount and first-frame timeout.
- [ ] Solo, host and client readiness parity.
- [ ] Source, production-build and deployed-origin parity.

## Dependency order

```txt
command and generation
  -> immutable real-work plan
  -> typed step results and progress
  -> cancellation and rollback
  -> readiness evidence
  -> first visible frame
  -> source/build/deployed fixtures
```

## Completion boundary

Do not claim truthful loading, complete readiness or playable visual entry until the authority and fixtures pass on `main`.