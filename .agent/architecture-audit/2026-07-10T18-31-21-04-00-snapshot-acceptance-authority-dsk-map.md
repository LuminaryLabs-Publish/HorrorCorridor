# HorrorCorridor Snapshot Acceptance Authority DSK Map

**Timestamp:** `2026-07-10T18-31-21-04-00`

## Current authority flow

```txt
host GameCanvas
  -> publishAuthoritativeState
  -> tick + 1
  -> buildReplicatedSnapshot
  -> createFullSyncMessage
  -> PeerJS broadcast
  -> client GameShell handleTransportEvent
  -> setRoom
  -> setLobbyPlayers
  -> setAuthoritativeSnapshot
  -> set UI and readiness
```

## Current ownership problem

The publication side owns tick creation, but no domain owns snapshot acceptance. `GameShell` acts as transport consumer, validator, commit coordinator, UI reducer, and readiness writer at once. `runtimeStore` exposes only an unconditional setter.

## Required DSK boundary

```txt
inbound SYNC envelope
  -> protocol-envelope-preflight-kit
  -> authority-source-identity-kit
  -> snapshot-acceptance-policy-kit
  -> SnapshotAcceptanceResult
  -> snapshot-acceptance-ledger-kit
  -> snapshot-projection-transaction-kit when accepted
  -> runtime-debug-snapshot-projection-kit
```

## Domain contracts

### Protocol envelope preflight

```txt
input:
  ProtocolMessage
  expected protocol version
  active room identity

output:
  valid FullSync candidate
  or rejected result with reason
```

### Authority source identity

```txt
input:
  senderId
  envelope roomId
  payload room
  snapshot room
  active host identity
  active gameId and seed
  current authority epoch

output:
  accepted source identity
  or wrong-host / wrong-room / wrong-game / wrong-seed result
```

### Snapshot acceptance policy

```txt
input:
  previous accepted snapshot record
  candidate authoritativeTick
  candidate snapshot.tick
  candidate fingerprint
  full-sync reason
  authority epoch

output:
  accepted
  duplicate
  rejected-stale
  rejected-conflicting-duplicate
  rejected-tick-mismatch
  accepted-epoch-reset
```

### Projection transaction

```txt
input:
  accepted snapshot record

commit together:
  session room
  lobby players
  runtime authoritativeSnapshot
  completion
  screen and gameScreen
  pause state
  readiness

output:
  typed projection result
```

## Kit map

```txt
protocol-envelope-preflight-kit
  version, message type, room agreement, structural checks

authority-source-identity-kit
  expected host, room authority, game/seed continuity, epoch

snapshot-acceptance-policy-kit
  monotonic tick, duplicate, stale, conflict, recovery reset

snapshot-acceptance-ledger-kit
  last accepted row, fingerprint, bounded rejects, counters

snapshot-projection-transaction-kit
  atomic session/runtime/UI commit and regression guards

runtime-debug-snapshot-projection-kit
  acceptance rows, source/tick evidence, commit result

snapshot-acceptance-fixture-kit
  deterministic DOM-free delivery permutations
```

## Compatibility rule

The rollout must remain additive for protocol version 1. A valid current `SYNC` must still produce the same final accepted snapshot and visible state. The new boundary changes only whether invalid, stale, duplicate, or conflicting snapshots are committed.

## Main finding

Snapshot authority is currently asserted by the producer but not verified by the consumer. The next source change should introduce one pure acceptance function and one projection transaction before adding more networking behavior.