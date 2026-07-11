# Interaction Audit: Cube and Slot Claim Result Map

**Timestamp:** `2026-07-11T15-01-33-04-00`

## Plan ledger

**Goal:** map every interaction action from observed target through host decision, mutation, publication and user-visible result.

- [x] Map pickup, drop, place and remove inputs.
- [x] Identify current implicit target behavior.
- [x] Define explicit target claims and result reasons.
- [x] Define required publication and frame handoffs.

## Current map

| Action | Current client payload | Current host target | Current result |
|---|---|---|---|
| pickup | `playerId`, action | nearest loose cube | changed or unchanged state |
| drop | `playerId`, action | cube currently held by player | changed or unchanged state |
| place | `playerId`, action | first empty anomaly slot | changed or unchanged state |
| remove | `playerId`, action | last occupied anomaly slot | changed or unchanged state |

## Required map

| Action | Required target claim | Required admission | Required result |
|---|---|---|---|
| pickup | `cubeId`, cube revision, observed snapshot | actor, range, availability, ownership | accepted, stale, conflict, out-of-range, duplicate |
| drop | held `cubeId`, ownership revision | actor, current owner, phase | accepted, ownership-conflict, stale, duplicate |
| place | held `cubeId`, `slotId`, both revisions | actor, range, ownership, empty slot, ordering policy | accepted, slot-conflict, stale, wrong-owner, duplicate |
| remove | `slotId`, occupied cube ID, slot revision | actor, range, empty hands, removal policy | accepted, slot-conflict, stale, already-carrying, duplicate |

## Command envelope

```txt
interactionCommandId
requestId
senderId
playerId
roomId
runSessionId
sessionEpoch
sequence
observedSnapshotRevision
action
target.kind
target.id
target.revision
optional policy fingerprint
```

## Result envelope

```txt
interactionResultId
interactionCommandId
status
reason
actorId
target kind/id
observed and committed revisions
before/after ownership revision
before/after slot revision
published snapshot revision
first frame ID when acknowledged
```

## Admission sequence

```txt
transport actor binding
  -> room/run/epoch
  -> command sequence and dedupe
  -> gameplay phase
  -> observed snapshot revision
  -> explicit target identity
  -> target revision
  -> distance and ownership
  -> detached mutation plan
  -> atomic commit or typed rejection
```

## Client handoff

```txt
send command
  -> retain pending result row
  -> admit host result
  -> correlate authoritative snapshot
  -> project pending/accepted/rejected state
  -> acknowledge first visible frame
  -> retire pending row
```

## Guardrails

```txt
never replace a stale target with a current nearest target
never choose the next slot after a claimed slot changed
never infer acceptance solely from snapshot difference
never apply duplicate commands twice
never let local-host and remote-client paths use different result semantics
```
