# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T15-01-33-04-00`

## Queue-head identity gaps

- Lobby members do not yet distinguish every real peer, gameplay player and reserved slot through one canonical binding.
- Transport connection identity and protocol sender identity are not fully converged.
- Room, roster, run-session, epoch, request and sequence admission remain incomplete.
- Interaction commands depend on those identities and must not create a parallel actor authority.

## Lobby start and run identity gaps

- Host start does not seal one immutable roster revision and fingerprint.
- START_GAME and SYNC do not share a mandatory transaction identity.
- Run-session ID, session epoch, per-peer acknowledgement and first-frame proof are absent.
- Run exit does not commit one epoch transition before old messages and resources retire.

## Snapshot admission gaps

- Snapshot acceptance lacks authoritative sender, room, run, epoch, sequence and revision admission.
- Duplicate, stale, conflicting and reordered snapshots can mutate stores without typed results.
- Older snapshots can rewind interaction ownership, anomaly progress or terminal state.
- Snapshot acceptance is not correlated with one projection and rendered-frame receipt.

## Interaction target gaps

- The interaction message schema supports `cubeId`, `slotId` and `targetCellId`, but the active client caller supplies none of them.
- Local authoritative interaction also omits explicit cube and slot targets.
- Pickup without `cubeId` selects the nearest eligible cube at host execution time.
- Place without `slotId` selects the first empty slot at host execution time.
- Remove without `slotId` selects the last occupied slot at host execution time.
- Client intent carries no observed snapshot tick, target revision, ownership revision or claim fingerprint.
- A stale or contended request can mutate a different cube or slot instead of rejecting.
- Optional protocol `requestId` is not generated for interaction requests in the active path.
- Interaction rules return only a new or unchanged `GameState`; no typed result or rejection reason exists.
- Remote host handling publishes a full snapshot after every request, including silent no-change outcomes.
- Local host handling suppresses no-change publication, so local and remote outcome semantics differ.
- No command-result cache makes duplicate retry idempotent.
- Held cube ownership has no revision, lease or exactly-once claim result.
- No first interaction-frame receipt proves world, minimap, HUD and debug state consumed the same result.

## Concrete substitution risks

```txt
pickup contention -> second request may select another nearby cube
place contention  -> second request may fill the next empty slot
remove contention -> second request may remove the new last occupied slot
```

## Terminal outcome gaps

- The executable has an ordered-sequence victory predicate but no defeat predicate.
- `GameScreenState`, `UiCompletionState` and `CompleteScreen` support `failure`, but gameplay cannot produce it.
- Victory is not monotonic and can return to playing under later incomplete evaluation.
- Terminal work must consume accepted interaction and snapshot results rather than raw mutable state.

## Render and presentation gaps

- Render/debug frames contain cube state but no interaction command ID, target claim revision or result ID.
- The first visible pickup, placement or removal frame has no run-session or epoch correlation.
- No frame receipt proves world, minimap and HUD correspond to the accepted interaction result.
- Clients infer interaction success from later snapshots rather than receiving explicit acknowledgement.

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
explicit cube and slot target admission
stale target rejection without substitution
pickup, place and remove contention
interaction duplicate idempotency
reorder handling
ownership conflict handling
result-to-snapshot correlation
first interaction-frame acknowledgement
cross-epoch interaction rejection
local/remote result parity
```

## Required guarantees

```txt
every interaction carries one command identity and observed state revision
interaction actor is bound to the admitted transport connection
every mutating action identifies one target
stale targets reject before mutation
no host-side replacement target is silently selected
one claim accepts and all competing claims receive typed results
duplicate retry returns the first result
cube, slot, ownership and sequence state commit atomically
published snapshots cite the interaction result
clients acknowledge the same result and visible frame
```
