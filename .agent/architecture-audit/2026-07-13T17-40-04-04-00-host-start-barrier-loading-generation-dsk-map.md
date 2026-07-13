# Host Start Barrier and Loading Generation DSK Map

## Summary

The host-start path spans session, UI, deterministic bootstrap and transport ownership but has no parent transaction. The missing parent is `corridor-host-start-barrier-loading-generation-authority-domain`.

## Plan ledger

**Goal:** separate participant services while joining them under one typed start command and result.

- [x] Preserve existing kit ownership.
- [x] Identify missing command, generation, preparation, commit, rollback and proof surfaces.
- [ ] Implement only after contracts and fixtures are accepted.

## Current composition

```txt
GameShell
  -> corridor-session-domain-kit
  -> lobby-screen-presentation-kit
  -> maze-snapshot-bootstrap-kit
  -> peer-host-transport-kit
  -> protocol-message-construction-kit
  -> runtime-store-snapshot-kit
  -> UI stores
```

## Missing parent domain

```txt
corridor-host-start-barrier-loading-generation-authority-domain
```

## Candidate DSK family

```txt
command: host-start-command-kit start-attempt-id-kit
preconditions: lobby-revision-kit sealed-roster-kit member-connection-policy-kit member-readiness-policy-kit
loading: loading-generation-kit loading-cancellation-kit loading-timeout-kit
preparation: initial-snapshot-candidate-kit client-prepare-request-kit client-prepare-result-kit
correlation: start-envelope-correlation-kit start-message-source-admission-kit
commit: host-start-commit-kit client-start-commit-kit multiplayer-readiness-derivation-kit
failure: start-rollback-kit late-start-message-quarantine-kit
proof: host-start-result-kit first-multiplayer-frame-ack-kit start-participant-journal-kit
fixtures: unready disconnect roster-change reorder duplicate source-build-pages
```

## Ownership rule

The parent owns admission and terminal settlement. Session, runtime, UI, transport and rendering remain participants and return typed preparation, commit, rollback and visible-frame receipts. No participant may independently declare the start complete.