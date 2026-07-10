# HorrorCorridor Command to Snapshot Correlation Contract

**Timestamp:** `2026-07-10T15-31-03-04-00`

## Current network chain

```txt
client input
  -> protocol message with optional requestId
  -> host GameCanvas event handler
  -> GameState-returning network rule
  -> publishAuthoritativeState(reason)
  -> tick increment
  -> ReplicatedGameSnapshot
  -> full-sync broadcast
```

## Lost facts

```txt
requestId is not promoted into a domain command identity
no command result survives rule execution
no explicit publish decision exists
publication reason is a GameCanvas string union
published tick is not joined back to the request
rejected/no-op host interactions still publish
cadence publications are indistinguishable from command publications in aggregate debug
```

## Required correlation row

```txt
correlationId
requestId | null
commandId
commandSource
commandKind
authorityMode
resultStatus
resultReason
semanticChanged
consumerAction
publishDecision
publicationReason | null
publishedSnapshotTick | null
issuedAtMs
resolvedAtMs
publishedAtMs | null
```

## Protocol rule

The correlation row is a local diagnostic/domain record. It does not need to expand the multiplayer wire protocol in the first cut. Existing request IDs should be reused when available, while local and cadence sources receive deterministic IDs from the authority host.

## Publication categories

```txt
command-result
recovery
victory
cadence
initial
join
reconnect
```

The category must not imply semantic mutation. `cadence`, `initial`, `join`, `reconnect`, and `recovery` may publish valid snapshots without an accepted gameplay command.

## Acceptance

For any published host snapshot, diagnostics must either identify the originating command correlation or classify the publication as a non-command lifecycle/cadence publication.