# Lobby Start Transaction DSK Map

**Timestamp:** `2026-07-11T11-39-11-04-00`

## Summary

The current host start flow mixes UI loading, deterministic bootstrap, local store mutation and two independent network publications. This audit defines one composed start-authority domain that seals identity before bootstrap and produces one correlated result consumed by host, clients, runtime providers and rendering.

## Plan ledger

**Goal:** place start ownership in one DSK boundary without creating a parallel lobby, networking or runtime framework.

- [x] Map current owners.
- [x] Identify cross-domain mutation points.
- [x] Separate command, admission, plan, commit, publication and observation responsibilities.
- [x] Define required kit services.
- [ ] Implement through existing session, protocol and runtime stores.

## Current ownership split

```txt
LobbyScreen
  owns visual start affordance

GameShell
  owns start callback, loading, bootstrap, local commit and publication order

sessionStore
  owns mutable room, roster, peer identity and connection projection

createInitialGameState
  owns deterministic run bootstrap

protocol builders
  own independent START_GAME and SYNC envelopes

host transport
  owns best-effort broadcast and recipient count

client GameShell handler
  owns independent message application and screen transition

GameCanvas
  owns runtime/provider mount after client or host projection enters PLAYING
```

## Missing parent domain

```txt
horror-corridor-lobby-start-authority-domain
```

This domain should compose existing lobby, session, protocol, bootstrap, runtime-readiness and rendering surfaces. It should not replace them.

## DSK breakdown

### `lobby-start-command-kit`

Services:

```txt
createStartRunCommand
normalizeStartRequest
assignCommandId
captureObservedRoomRevision
captureObservedRosterRevision
captureObservedSessionEpoch
```

### `lobby-start-admission-policy-kit`

Services:

```txt
validateHostActor
validateTransportRole
validateConnectionStatus
validateRoomPhase
validateRosterCapacity
validateRequiredReadiness
rejectDuplicateOrStaleCommand
return typed admission result
```

### `lobby-start-roster-seal-kit`

Services:

```txt
snapshot admitted members
exclude reserved slots and disconnected rows
freeze peer/member/player bindings
compute roster fingerprint
retain source room and roster revisions
```

### `lobby-start-transaction-id-kit`

Services:

```txt
allocate startTransactionId
bind command to transaction
provide idempotency key
correlate publication, acknowledgement and result rows
```

### `run-session-identity-kit`

Services:

```txt
allocate runSessionId
bind room, roster and seed
expose immutable run identity
```

### `run-session-epoch-kit`

Services:

```txt
advance epoch at accepted start
reject messages from prior epochs
bind later exit and restart operations
```

### `lobby-start-bootstrap-plan-kit`

Services:

```txt
build detached deterministic bootstrap
carry seed, maze, players, room and initial snapshot
validate sealed roster parity
compute bootstrap fingerprint
perform no live-store mutation
```

### `lobby-start-commit-kit`

Services:

```txt
compare expected revisions
commit room, snapshot and phase atomically
return accepted, rejected, stale, duplicate or failed result
prevent partial local activation
```

### `lobby-start-publication-bundle-kit`

Services:

```txt
create correlation-complete start payload
carry transaction, run, epoch, roster and bootstrap fingerprints
publish to admitted peers
return per-peer send results
```

The implementation may evolve START_GAME and SYNC into one message or retain two messages with mandatory shared correlation fields. Either form must be application-atomically admissible.

### `lobby-start-client-admission-kit`

Services:

```txt
validate room, host actor, transaction, run and epoch
buffer incomplete correlated message sets
reject stale, conflicting or malformed starts
commit exactly once
```

### `lobby-start-acknowledgement-kit`

Services:

```txt
publish accepted or rejected peer result
carry first-runtime-ready or first-frame proof when policy requires it
support explicit quorum policy
```

### `lobby-start-retry-and-dedupe-kit`

Services:

```txt
retry missing peer publications
preserve transaction identity
return duplicate/no-change results
bound retry attempts and deadlines
```

### `lobby-start-result-kit`

Services:

```txt
host result
per-peer result rows
committed roster/run/epoch identity
publication and acknowledgement summary
failure reason catalog
```

### `lobby-start-transition-journal-kit`

Services:

```txt
bounded command, admission, plan, publication, ack and commit rows
stale/duplicate/conflict evidence
JSON-safe export
```

### `lobby-start-debug-projection-kit`

Services:

```txt
current transaction identity
sealed roster fingerprint
peer publication/ack state
run session and epoch
first committed frame correlation
```

### `lobby-start-fixture-kit`

Services:

```txt
all-ready success
not-ready rejection
connection-loss during loading
roster mutation during loading
START_GAME-only delivery
SYNC-only delivery
reordered delivery
duplicate delivery
retry and acknowledgement
stale prior-epoch delivery
host local commit rollback
```

## Required authority flow

```txt
StartRunCommand
  -> admission against current room/roster/session revisions
  -> immutable roster seal
  -> startTransactionId + runSessionId + epoch
  -> detached bootstrap plan
  -> correlation-complete publication plan
  -> host/client commit policy
  -> runtime readiness acquisition
  -> first committed frame
  -> typed transaction result and journal
```

## Integration rule

Extend the existing `GameShell`, session store, protocol envelopes and bootstrap services. Do not add a second room store, second transport registry, second snapshot model or second render session.
