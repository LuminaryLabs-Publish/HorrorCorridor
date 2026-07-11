# Gameplay Audit: Full SYNC Fanout and Slow-Peer Loop

**Timestamp:** `2026-07-11T18-11-21-04-00`

## Summary

Gameplay mutations can trigger a complete state publication immediately. The publication cost includes two full snapshot builds, complete JSON serialization and one send attempt per open peer. No gameplay policy limits the resulting payload or isolates a slow recipient.

## Plan ledger

**Goal:** show how normal movement and interaction traffic enters the full-state fanout path and define the gameplay guarantees required under slow or failing peers.

- [x] Trace movement-update publication.
- [x] Trace interaction-update publication.
- [x] Trace complete snapshot contents.
- [x] Trace all-peer fanout.
- [x] Identify slow-peer and partial-failure gaps.
- [ ] Prove bounded gameplay behavior with multi-peer fixtures.

## Current loop

```txt
client movement or interaction
  -> host mutates gameplay state
  -> tick increments
  -> maze/room/player/cube/anomaly/ooze snapshot cloned
  -> same state cloned again into SYNC
  -> complete payload serialized
  -> send attempted to every open peer
  -> sent count discarded
  -> gameplay loop continues without delivery result
```

## Gameplay risks

```txt
movement frequency can multiply complete-state serialization
peer count can multiply send attempts
one send exception has no typed containment contract
one slow peer has no isolation state
partial delivery has no authoritative result
client views can diverge without explicit peer rows
ooze and objective changes share the same unbounded publication surface
```

## Required gameplay contract

```txt
committed gameplay revision
  -> bounded publication intent
  -> canonical payload
  -> complete per-peer result set
  -> healthy-peer continuation
  -> slow-peer isolation/recovery
  -> client acceptance and first frame
```

## Required proof

```txt
normal movement does not create unbounded full-state work
interaction and terminal events can use explicit priority without bypassing budgets
healthy peers continue receiving state when one peer is slow or failing
partial delivery is observable and does not rewrite gameplay state
slow-peer policy cannot starve fixed simulation or ooze advancement
```
