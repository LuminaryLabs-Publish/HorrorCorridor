# Session, Runtime and UI Atomic Commit Contract

**Timestamp:** `2026-07-13T07-00-29-04-00`

## Summary

The current system owns three independent Zustand stores but no aggregate transition contract. This audit defines the coordinator boundary without collapsing the bounded domains.

## Plan ledger

**Goal:** make session, runtime and UI adoption all-or-nothing, revisioned, observable and recoverable.

- [x] Identify participant-owned state.
- [x] Define prepare, invariant and commit phases.
- [x] Define rollback and terminal results.
- [x] Define visible-frame correlation.
- [ ] Implement with immutable candidate snapshots and fixture proof.

## Invariants

```txt
room.players fingerprint == lobbyPlayers fingerprint
snapshot.room identity/revision == session room identity/revision
peerIdentity.playerId belongs to accepted roster/snapshot when gameplay is active
PLAYING requires an accepted gameplay snapshot and simulation/render/input readiness
LOBBY requires simulation/render/input readiness false
COMPLETED requires terminal snapshot/result correlation
networking readiness derives from an admitted connection/session result
```

## Two-phase protocol

```txt
Prepare
  -> read expected participant revisions
  -> build detached candidates
  -> validate cross-domain invariants
  -> return participant prepare receipts

Commit
  -> install session/runtime/UI revisions under one TransitionId
  -> publish one terminal transition result
  -> reject duplicate or stale work

Presentation
  -> construct coherent frame envelope
  -> acknowledge first matching visible frame
```

## Failure policy

```txt
prepare failure: zero participant mutation
stale predecessor: zero participant mutation
commit failure before publication: rollback every participant
commit failure after partial publication: classified fatal transition and last-coherent-state recovery
late START_GAME/SYNC from retired generation: quarantine
```

Direct external references to individual transition setters should be replaced by bounded commands.