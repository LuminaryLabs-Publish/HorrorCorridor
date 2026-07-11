# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T13-20-45-04-00`

## Queue-head identity gaps

- Lobby members do not yet distinguish every real peer, gameplay player and reserved slot through one canonical binding.
- Transport connection identity and protocol sender identity are not fully converged.
- Room, roster, run-session, epoch, request and sequence admission remain incomplete.
- Terminal outcome work depends on those identities and must not create a parallel authority.

## Lobby start and run identity gaps

- Host start does not seal one immutable roster revision and fingerprint.
- Loading can complete from stale callback-captured room and roster values.
- START_GAME and SYNC do not share a mandatory transaction identity.
- Run-session ID, session epoch, per-peer acknowledgement and first-frame proof are absent.
- Run exit does not commit one epoch transition before old messages and resources retire.

## Snapshot admission gaps

- Snapshot acceptance lacks authoritative sender, room, run, epoch, sequence and revision admission.
- Duplicate, stale, conflicting and reordered snapshots can mutate stores without typed results.
- Older snapshots can rewind projected gameplay or terminal state.
- Snapshot acceptance is not correlated with one projection and rendered-frame receipt.

## Terminal outcome gaps

- The executable has an ordered-sequence victory predicate but no defeat predicate.
- `GameScreenState`, `UiCompletionState` and `CompleteScreen` support `failure`, but gameplay cannot produce it.
- Ooze state spawns, decays, spaces and caps trail entries but never evaluates a failure threshold.
- No versioned product policy defines what defeat means.
- `GameShell` routes an inbound `failure` snapshot through its generic fallback to `PLAYING`.
- Victory has no terminal outcome ID, revision, result or proof fingerprint.
- Victory is not monotonic: later incomplete sequence evaluation can change it back to playing and return the room to active.
- No actor, run-session, epoch, snapshot revision or command result is admitted before outcome mutation.
- Victory and failure do not share one transaction or publication contract.
- Terminal publication has no per-peer delivery result, retry policy or acknowledgement.
- Late playing snapshots are not quarantined after a terminal commit.
- Restart and title exit do not consume a typed committed terminal result.

## Render and presentation gaps

- GameCanvas remains mounted on `COMPLETED`, but debug frames contain no terminal outcome ID or revision.
- The first visible completion frame has no run-session or session-epoch correlation.
- Failure cannot reach authoritative completion projection through the current SYNC route.
- CompleteScreen is a projection surface but currently appears to be the only failure-capable user-facing boundary.
- No frame receipt proves that world, HUD and completion overlay correspond to the same terminal result.

## Runtime readiness gaps

- `RuntimeReadiness` remains four mutable booleans without provider leases or revision proof.
- Shell and inbound SYNC can mark providers ready before resource and first-frame evidence exists.
- Old-generation setup or cleanup can still write readiness after a reset or exit.

## Dependent authority gaps

- Remote movement lacks complete speed, collision and temporal validation.
- Active clients do not reconcile predicted pose to host pose.
- Pause and resume remain primarily local projection rather than replicated authority.
- These systems must admit the current run/session/epoch and reject terminal or retired generations.

## Validation gap

Current package commands do not prove:

```txt
victory policy determinism
failure policy execution
simultaneous victory/failure precedence
terminal monotonicity
failure client projection
late playing snapshot rejection
duplicate or conflicting outcome handling
loss/reorder/retry convergence
per-peer terminal acknowledgement
first terminal-frame correlation
restart to a new admitted run epoch
title exit idempotency
```

## Required guarantees

```txt
one versioned policy defines all terminal predicates
one admitted authority evaluates outcomes
one run session and epoch accepts at most one terminal result
victory and failure share one typed contract
failure projects explicitly to COMPLETED
terminal state cannot return to active
late snapshots are rejected before mutation
clients commit and acknowledge exactly once
first terminal frame proves the accepted result
restart and exit consume the committed terminal result
```
