# Interaction Audit: Member Capacity Central Reconciliation Map

**Timestamp:** `2026-07-12T22-44-30-04-00`

## Summary

PeerJS connection-open, local bridge client-connect, Add guest, restore and migration must all produce the same typed capacity command and result. Current paths mutate roster state independently.

## Plan ledger

**Goal:** route every member candidate through one reservation and admission command before any visible or authoritative state mutation.

- [x] Reconcile all member-intake paths.
- [x] Define command and result flow.
- [ ] Implement shared admission and lifecycle fixtures.

## Current interaction paths

```txt
PeerJS connection-open
  -> create connected guest
  -> upsert roster

local client-connect
  -> create connected guest
  -> upsert roster

Add guest
  -> generate placeholder identity
  -> append roster

restore or protocol payload
  -> accept structurally valid player arrays
  -> replace state
```

## Required command map

```txt
candidate event
  -> LobbyMemberAdmissionCommand {
       commandId
       roomId
       roomGeneration
       expectedRosterRevision
       source
       candidateIdentity
       connectionLeaseId?
     }
  -> reserve slot
  -> validate capacity, uniqueness and ownership
  -> Accepted | Full | Duplicate | Stale | Cancelled | Invalid | Failed
```

## Result handling

```txt
Accepted
  -> commit one canonical member
  -> publish successor roster and capacity revision

Full / Duplicate / Stale / Invalid / Failed
  -> zero roster mutation
  -> retire or preserve transport candidate as policy requires
  -> publish bounded reason observation

Cancelled
  -> release reservation exactly once
```

## Interaction invariants

```txt
all sources use the same authority
one command produces one terminal result
one accepted identity creates one visible member
rejections do not change room, roster, readiness or actor state
disconnect retirement releases capacity through a revisioned transaction
```

## Validation boundary

No interaction source or transport behavior changed. No multi-client admission fixture was run.