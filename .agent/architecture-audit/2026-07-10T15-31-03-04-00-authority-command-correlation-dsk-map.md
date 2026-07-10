# HorrorCorridor Authority Command Correlation DSK Map

**Timestamp:** `2026-07-10T15-31-03-04-00`

## Existing source-backed domains

| Domain | Current source | Service boundary |
|---|---|---|
| Session | session/UI stores and route components | mode, room, readiness, entry |
| Networking | peer adapters and sync protocol | host/client messages and full snapshots |
| Maze bootstrap | maze domain | deterministic cells, cubes, anomaly |
| Player | input, look, movement, collision | local pose and first-person control |
| Interaction | `interactionRules.ts` | pickup, drop, place, remove |
| Network rules | `networkRules.ts` | player updates, interaction dispatch, carry sync |
| Ooze | `oozeRules.ts` | decay, spawn, spacing, cap |
| Victory | `winRules.ts` | slot evaluation, victory, rollback |
| Publication | `GameCanvas.tsx` | tick, snapshot, store update, broadcast |
| Render | Three.js world/post/minimap | snapshot projection |
| Debug | `runtimeDebugStore.ts` | bounded frames/events and export |

## Current ownership collision

```txt
interaction/network/ooze/win rules
  -> return GameState only
GameCanvas local consumer
  -> infers no-op from object identity
GameCanvas host consumer
  -> publishes after TRY_INTERACT regardless of identity
GameCanvas cadence consumer
  -> publishes on timing boundary after player and ooze steps
runtimeDebugStore
  -> records unjoined events and frames
```

The publication decision is therefore owned implicitly by multiple consumers rather than by one reusable domain contract.

## Required next-cut DSKs

### `command-envelope-contract-kit`

Services:

```txt
commandId
correlationId
requestId
source
mode
kind
target
issuedAtMs
input metadata
```

### `command-result-envelope-kit`

Services:

```txt
status
reason
semantic changed flag
domain events
before/after summaries
legacy GameState compatibility
```

### `publish-decision-contract-kit`

Services:

```txt
publish-command-result
publish-recovery
publish-victory
publish-cadence
skip-rejected
skip-noop
skip-client-only
```

### `command-correlation-record-kit`

Services:

```txt
join request and command
join command and domain result
join result and authority consumer
join consumer and publication decision
join publication and snapshot tick
correlation completeness status
```

### `authority-command-consumer-kit`

Services:

```txt
shared local/host decision policy
journal append
publication request
transport-neutral output
legacy consumer adapter
```

### `authority-parity-fixture-kit`

Services:

```txt
canonical source states
identical local/host command rows
intentional recovery/cadence divergence rows
legacy state parity
replicated snapshot parity
DOM-free execution
```

## Boundary rule

Do not move renderer, transport, minimap, or maze construction into these kits. The new boundary ends at a serializable consumer decision and correlation record. Existing hosts remain responsible for actual store writes and transport broadcast.

## Recommended call shape

```txt
command envelope
  -> domain result
  -> authority consumer
  -> publish decision
  -> optional publish callback
  -> correlation record with published tick
  -> journal
  -> runtime debug projection
```

## Acceptance rule

The same accepted or rejected interaction must produce the same domain result in local and host modes. Any publication difference must be represented by an explicit decision and fixture row, never inferred from object identity or free-form reason text.