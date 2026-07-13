# Cross-Store Session Transition Authority DSK Map

**Timestamp:** `2026-07-13T07-00-29-04-00`

## Summary

Session, runtime and UI are valid bounded domains, but their transitions are currently orchestrated by ad hoc setter order in `GameShell`. The missing parent domain coordinates atomic adoption without absorbing participant ownership.

## Plan ledger

**Goal:** define the minimum DSK composition needed to prepare, validate, commit, reject, roll back and visibly acknowledge one coherent multi-store transition.

- [x] Preserve session ownership of room, roster, identity and connection.
- [x] Preserve runtime ownership of snapshot, pose, input and readiness.
- [x] Preserve UI ownership of screens, overlays, pause and completion.
- [x] Add only coordination identities, candidates, results and proof.
- [ ] Implement after fixture contracts are accepted.

## Parent domain

```txt
corridor-cross-store-session-transition-authority-domain
```

## Composition

```txt
Identity
  transition-id-kit
  transition-generation-kit
  participant-revision-kit

Command and admission
  session-transition-command-kit
  transition-precondition-kit
  transition-late-event-quarantine-kit

Detached candidates
  session-transition-candidate-kit
  runtime-transition-candidate-kit
  ui-transition-candidate-kit

Cross-domain invariants
  room-roster-coherence-kit
  snapshot-room-coherence-kit
  identity-snapshot-binding-kit
  screen-snapshot-coherence-kit
  readiness-derivation-kit
  start-sync-correlation-kit

Two-phase result
  participant-prepare-result-kit
  participant-commit-result-kit
  participant-rollback-kit
  cross-store-transition-result-kit

Observation and presentation
  transition-journal-kit
  transition-observation-kit
  coherent-frame-envelope-kit
  first-coherent-frame-ack-kit

Proof
  cross-store-zero-partial-fixture-kit
  start-sync-order-fixture-kit
  completion-transition-fixture-kit
```

## Ownership boundary

```txt
Session domain owns:
  room, roster, peer identity, mode, connection

Runtime domain owns:
  authoritative snapshot, local pose, input, readiness

UI domain owns:
  route screen, game screen, overlay, pause, completion

Transition authority owns:
  command identity, expected revisions, participant candidates,
  cross-domain validation, atomic commit result and frame correlation
```

## Required contract

```txt
SessionTransitionCommand
  -> validate predecessor revisions
  -> prepare detached participant candidates
  -> validate cross-domain invariants
  -> commit all revisions or none
  -> publish terminal result
  -> render cited coherent frame
```

No participant should expose a partially adopted successor revision.