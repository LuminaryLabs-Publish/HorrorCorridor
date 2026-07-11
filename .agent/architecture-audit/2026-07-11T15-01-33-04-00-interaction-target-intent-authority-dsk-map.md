# Architecture Audit: Interaction Target Intent Authority DSK Map

**Timestamp:** `2026-07-11T15-01-33-04-00`

## Plan ledger

**Goal:** define one composed authority that converts an observed interaction target into an admitted, atomic and externally acknowledged cube/slot transaction.

- [x] Map current client, protocol, host, mutation, publication and projection boundaries.
- [x] Preserve existing interaction and rendering responsibilities.
- [x] Identify missing identity, claim, preflight, result and acknowledgement services.
- [x] Define a dependency-ordered DSK composition.
- [x] Keep implementation downstream of actor, run/epoch and snapshot authority.

## Current architecture

```txt
GameCanvas input
  -> local action inference
  -> createInteractionRequestMessage
  -> transport
  -> host GameCanvas event handler
  -> applyNetworkInteractionRequest
  -> interactionRules
  -> syncHeldCubesToPlayers
  -> publishAuthoritativeState
  -> full snapshot consumers
```

The protocol boundary can carry target IDs, but the active caller discards target identity before transport.

## Required composed domain

```txt
horror-corridor-interaction-target-authority-domain
  -> interaction-command-envelope-kit
  -> interaction-target-observation-kit
  -> cube-target-claim-kit
  -> anomaly-slot-claim-kit
  -> interaction-admission-kit
  -> interaction-preflight-kit
  -> interaction-transaction-kit
  -> interaction-result-kit
  -> interaction-idempotency-kit
  -> interaction-conflict-kit
  -> held-cube-ownership-revision-kit
  -> interaction-publication-kit
  -> interaction-client-acknowledgement-kit
  -> interaction-frame-correlation-kit
  -> interaction-journal-kit
  -> interaction-target-fixture-kit
```

## DSK service map

| Kit | Owns | Returns |
|---|---|---|
| `interaction-command-envelope-kit` | command, actor, room, run, epoch, sequence and action identity | immutable command envelope |
| `interaction-target-observation-kit` | observed snapshot, cube, slot, cell, distance and target fingerprint | target observation |
| `cube-target-claim-kit` | cube availability and ownership claim | cube claim result |
| `anomaly-slot-claim-kit` | slot occupancy and ordering claim | slot claim result |
| `interaction-admission-kit` | actor, transport, phase, run, epoch, sequence and retirement checks | admission result |
| `interaction-preflight-kit` | distance, target state, ownership and revision checks | detached mutation plan |
| `interaction-transaction-kit` | cube, slot, ownership and sequence atomic commit/rollback | transaction receipt |
| `interaction-result-kit` | accepted/rejected/duplicate/stale/conflict/no-change contract | typed public result |
| `interaction-idempotency-kit` | command-result cache and exactly-once mutation | replayed original result |
| `interaction-conflict-kit` | competing claims and declared winner policy | conflict evidence |
| `held-cube-ownership-revision-kit` | one-owner invariant and monotonic ownership revision | ownership receipt |
| `interaction-publication-kit` | result-linked snapshot and per-peer delivery | publication result |
| `interaction-client-acknowledgement-kit` | exactly-once result and snapshot admission | client acknowledgement |
| `interaction-frame-correlation-kit` | world, minimap, HUD and debug consumer evidence | first-frame receipt |
| `interaction-journal-kit` | bounded command-to-frame evidence | journal rows |
| `interaction-target-fixture-kit` | deterministic target, contention and frame cases | fixture report |

## Authority flow

```txt
InteractionCommand
  -> admit actor/run/epoch/sequence
  -> validate observed snapshot and target revision
  -> claim explicit cube or slot
  -> prepare detached mutation
  -> commit cube + slot + ownership + sequence atomically
  -> emit InteractionResult
  -> publish correlated snapshot
  -> admit result on clients
  -> acknowledge first visible frame
```

## Invariants

```txt
one command identifies one intended target
stale intent never selects a replacement target
one cube has at most one owner
one slot has at most one occupied cube
one command mutates at most once
accepted result names before/after revisions
rejected result changes no state
published snapshot cites the accepted result
visible consumers acknowledge one result/snapshot pair
```

## Dependency order

```txt
actor binding
  -> run session and epoch
  -> snapshot acceptance
  -> interaction target authority
  -> terminal outcome authority
  -> movement reconciliation
  -> pause authority
```

## Non-goals

```txt
new cube content
new anomaly presentation
renderer replacement
save persistence
client-authoritative interaction
```
