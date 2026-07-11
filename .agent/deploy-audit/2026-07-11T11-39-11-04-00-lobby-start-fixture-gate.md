# Lobby Start Fixture Gate

**Timestamp:** `2026-07-11T11-39-11-04-00`

## Summary

Current package commands build, lint and exercise broader harnesses, but no deterministic fixture isolates start admission, roster changes during loading, correlated publication, partial delivery, acknowledgement, retry or stale-epoch rejection.

## Plan ledger

**Goal:** prevent deployment of a multiplayer start path that can leave host and clients in different room, roster, snapshot or render states.

- [x] Inventory current scripts.
- [x] Identify missing start-transaction proof.
- [x] Define Node and browser fixture matrices.
- [x] Define deployment admission.
- [ ] Implement scripts and execute them.

## Existing commands

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
npm run review:object-kit
```

None is documented as a focused distributed lobby-start transaction fixture.

## Required Node fixtures

```txt
fixture:lobby-start-admission
fixture:lobby-start-roster-seal
fixture:lobby-start-loading-race
fixture:lobby-start-publication
fixture:lobby-start-partial-delivery
fixture:lobby-start-reorder
fixture:lobby-start-duplicate
fixture:lobby-start-retry
fixture:lobby-start-acknowledgement
fixture:lobby-start-stale-epoch
fixture:lobby-start-first-frame
```

## Required matrix

```txt
host disconnected -> rejected
member not ready -> rejected
reserved slot present -> excluded or rejected by explicit policy
roster changes during loading -> stale/rejected
connection closes during loading -> stale/rejected
all admitted members stable -> accepted
START_GAME only -> incomplete/no gameplay commit
SYNC only -> incomplete/no gameplay commit
reversed pair -> one accepted commit after complete correlation
duplicate pair -> duplicate/no-change
conflicting pair -> rejected conflict
zero recipients -> host result records publication failure
one peer missing ack -> explicit quorum policy result
late prior-epoch start -> stale/rejected before store mutation
first frame -> carries accepted start/run/epoch identity
```

## Browser multiplayer smoke

```txt
open host and two clients
connect and bind identities
ready admitted clients
start run
verify one roster fingerprint on all peers
verify one runSessionId and epoch on all peers
verify one initial snapshot fingerprint
verify first-frame correlation on all peers
drop and reorder start packets through test adapter
verify no half-started gameplay screen
return to lobby and reject old start packet
```

## Deployment admission

```txt
build passes
lint passes
existing harnesses pass
start admission fixtures pass
loading race fixtures pass
partial delivery and reorder fixtures pass
ack/retry/dedupe fixtures pass
stale epoch fixture passes
browser multi-peer smoke passes
first-frame correlation proof is captured
```

## Failure policy

Any half-started peer, stale roster bootstrap, uncorrelated first frame, ignored zero-recipient publication, duplicate runtime mount or old-epoch activation must fail the gate rather than produce a warning.
