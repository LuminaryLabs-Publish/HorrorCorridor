# Cross-Store Transition Fixture Gate

**Timestamp:** `2026-07-13T07-00-29-04-00`

## Summary

Current build and browser checks do not prove that session, runtime and UI revisions commit atomically or that the visible frame cites one coherent transition.

## Plan ledger

**Goal:** block production-readiness claims until source, build, browser and deployed-origin fixtures prove zero partial adoption and correct visible-state correlation.

- [x] Identify missing transition fixtures.
- [x] Define source/build/browser/Pages parity requirements.
- [ ] Implement fixtures.
- [ ] Run them on `main` after the authority exists.

## Required fixtures

```txt
host-start atomic participant commit
host-start stale roster rejection during loading
START_GAME without SYNC remains pending and non-playing
SYNC without accepted START_GAME is rejected or explicitly self-contained
START_GAME/SYNC reordering and duplication
late predecessor generation quarantine
setRoom/setLobbyPlayers duplicate revision detection
room/roster fingerprint mismatch rejection
snapshot/room mismatch rejection
identity absent from snapshot rejection
PLAYING without readiness rejection
COMPLETED with nonterminal snapshot rejection
participant prepare failure with zero mutation
participant commit failure rollback
first coherent lobby frame
first coherent playing frame
first coherent completion frame
source, production build and deployed-origin parity
```

## Gate

```txt
npm run lint
npm run build
npm run harness:horror-corridor
focused cross-store unit fixtures
browser transition smoke
production-server smoke
GitHub Pages transition smoke
```

No cross-store atomicity or visible-coherence claim is valid until the complete matrix passes.