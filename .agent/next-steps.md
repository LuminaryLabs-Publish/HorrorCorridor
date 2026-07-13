# HorrorCorridor Next Steps

**Updated:** `2026-07-13T07-00-29-04-00`

## Summary

Insert a cross-store transition authority between route/network intents and direct session, runtime and UI mutation. Participant domains should prepare detached candidates, validate shared invariants and publish one terminal result before any successor revision becomes visible.

## Plan ledger

**Goal:** replace ordered setter sequences with revisioned all-or-nothing participant adoption, rollback and coherent-frame proof.

### Documentation

- [x] Audit `GameShell`, session/runtime/UI stores, `GameCanvas` and `HUDOverlay`.
- [x] Preserve the 29-kit inventory and complete domain map.
- [x] Define the parent DSK and candidate kits.
- [x] Add architecture, render, gameplay, interaction, state-transition, deploy and central-sync audits.
- [x] Refresh root docs and machine registry.
- [x] Synchronize the repo ledger and internal change log.

### Gate 1: identities and revisions

- [ ] Add `TransitionId` and monotonic transition generation.
- [ ] Add session, runtime and UI revision counters.
- [ ] Require expected predecessor revisions on every transition command.
- [ ] Reject stale and duplicate transition work with zero participant mutation.
- [ ] Bind START_GAME, SYNC and late transport events to transition generation.

### Gate 2: detached participant candidates

- [ ] Build session, runtime and UI candidates outside live stores.
- [ ] Remove redundant `setLobbyPlayers` calls after `setRoom` when one participant candidate already owns roster coherence.
- [ ] Preserve one room `updatedAt` and roster fingerprint per transition.
- [ ] Prevent asynchronous loading from committing a stale captured roster.
- [ ] Return typed prepare results from every participant.

### Gate 3: cross-domain invariants

- [ ] Require `room.players` and `lobbyPlayers` fingerprint equality.
- [ ] Require snapshot room identity/revision to match session room identity/revision.
- [ ] Require active peer identity to belong to the accepted roster/snapshot.
- [ ] Require PLAYING to cite an accepted gameplay snapshot and readiness result.
- [ ] Require COMPLETED to cite one terminal snapshot/result.
- [ ] Derive readiness from committed session/runtime capability results.

### Gate 4: atomic commit and rollback

- [ ] Commit session, runtime and UI revisions under one coordinator result.
- [ ] Publish no participant revision before all prepare checks succeed.
- [ ] Roll back every participant if commit cannot complete.
- [ ] Record `Accepted`, `RejectedStale`, `RejectedInvariant`, `Duplicate`, `Cancelled`, `RolledBack` or `Failed`.
- [ ] Keep a bounded transition journal and observation stream.

### Gate 5: presentation

- [ ] Build one `CoherentFrameEnvelope` from committed participant revisions.
- [ ] Initialize `GameCanvas` only from a coherent session/snapshot envelope.
- [ ] Make HUD, lobby, minimap and diagnostics cite the same transition revision.
- [ ] Keep START_GAME-only clients in a typed pending state until correlated state is available.
- [ ] Publish `FirstCoherentFrameAck` for lobby, playing, paused and completed transitions.

### Gate 6: fixtures

- [ ] Host-start atomic commit fixture.
- [ ] Roster mutation during loading stale-rejection fixture.
- [ ] START_GAME/SYNC reorder, duplicate and missing-message fixtures.
- [ ] Room/roster and snapshot/room mismatch fixtures.
- [ ] Identity-not-in-snapshot fixture.
- [ ] PLAYING-without-readiness zero-mutation fixture.
- [ ] Participant prepare failure fixture.
- [ ] Partial commit rollback fixture.
- [ ] First coherent lobby, playing and completion frame fixtures.
- [ ] Source, production build and deployed-origin parity.

## Dependency order

```txt
transition identity and participant revisions
  -> detached candidates
  -> cross-domain invariant validation
  -> participant prepare receipts
  -> atomic commit or rollback
  -> terminal transition result
  -> coherent frame envelope
  -> first coherent frame acknowledgement
```

## Completion boundary

Do not claim atomic state adoption, stale-transition rejection, rollback safety or visible-state coherence until the authority and fixture matrix pass on `main`. The retained client-join, transport, protocol, roster, simulation and presentation gaps remain open.