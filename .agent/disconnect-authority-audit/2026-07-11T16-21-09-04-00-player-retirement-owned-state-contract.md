# Disconnect Authority Audit: Player Retirement and Owned-State Contract

**Timestamp:** `2026-07-11T16-21-09-04-00`

## Goal

Define the exact state that must commit together when an active peer disconnects.

## Transaction inputs

```txt
transport connection binding
canonical actor identity
run session and epoch
current active-membership revision
player gameplay state
held cube and interaction claims
room/session rows
connection cause and policy
```

## Preflight

```txt
resolve connection to one actor
reject stale/duplicate/cross-epoch observations
classify transient loss, timeout, explicit leave or kick
collect every actor-owned cube and claim
compute suspension or retirement plan without mutation
```

## Atomic commit set

```txt
sessionStore.room.players
sessionStore.lobbyPlayers
GameState.room.players
GameState.players
cube heldByPlayerId and position/state
interaction claims
movement admission
 ooze player-position membership
active/suspended/retired actor sets
membership revision and fingerprint
```

## Owned-cube policies

One policy must be selected and versioned per disconnect class:

```txt
drop at last admitted player position
return to canonical spawn
reserve during reconnect grace period
transfer through an explicit host command
```

Silent ownership retention is not an accepted result.

## Result

```txt
DisconnectResult
  resultId
  commandId
  status
  reason
  actorId
  previousConnectionId
  classification
  beforeMembershipRevision
  afterMembershipRevision
  playerDisposition
  cubeRecoveryResults[]
  snapshotRevision
  publicationStatus
  frameAcknowledgements
  resultFingerprint
```

## Reconnect

```txt
new connection claim
  -> prove suspended actor identity
  -> validate run/epoch/grace window
  -> replace connection binding
  -> restore admitted actor capabilities
  -> resolve reserved ownership
  -> publish reconnect result and frame
```

## Invariants

```txt
no player exists in gameplay but not authoritative membership
no held cube references an absent owner
no retired actor can submit movement or interaction
no duplicate connection can claim one actor
no reconnect can substitute another actor
all consumers acknowledge the same membership revision
```
