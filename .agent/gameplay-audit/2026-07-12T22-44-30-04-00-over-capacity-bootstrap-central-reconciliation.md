# Gameplay Audit: Over-Capacity Bootstrap Central Reconciliation

**Timestamp:** `2026-07-12T22-44-30-04-00`

## Summary

Run bootstrap accepts the complete lobby array and creates gameplay actors for every supplied member even when the resulting room has more players than `maxPlayers`. The contradiction then becomes authoritative snapshot state.

## Plan ledger

**Goal:** prevent any over-capacity lobby state from crossing the start boundary or becoming a gameplay actor set.

- [x] Reconcile the source-backed gameplay failure loop.
- [x] Define the required sealed-roster gate.
- [ ] Implement the gate and focused bootstrap fixtures.

## Failure loop

```txt
room declares maxPlayers = 4
  -> member intake creates a fifth or later player
  -> lobbyPlayers accepts the member
  -> host presses Start run
  -> createInitialGameState maps every source player
  -> room still declares maxPlayers = 4
  -> START_GAME and SYNC publish all actors
  -> clients simulate and render contradictory state
```

## Required start artifact

```txt
SealedCapacityRoster {
  roomId
  roomGeneration
  rosterRevision
  capacityRevision
  capacityFingerprint
  maxPlayers
  canonicalMembers
  sealedAtMs
}
```

## Start admission

```txt
StartRunCommand
  -> require sealed roster artifact
  -> verify room and roster generations
  -> verify unique canonical identities
  -> verify member count <= maxPlayers
  -> verify every network member owns a live admitted lease
  -> build candidate gameplay state
  -> validate actor count and identities
  -> atomically commit or preserve predecessor
```

## Required fixtures

```txt
four-member bootstrap accepted
fifth-member bootstrap rejected
stale sealed roster rejected
duplicate identity rejected
disconnected lease rejected
START_GAME/SYNC preserve capacity evidence
first gameplay frame actor count matches sealed roster
```

## Validation boundary

Gameplay source was not changed and no bootstrap fixture was executed.