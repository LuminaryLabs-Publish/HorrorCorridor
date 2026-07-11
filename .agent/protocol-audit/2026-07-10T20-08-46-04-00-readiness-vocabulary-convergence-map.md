# HorrorCorridor Readiness Protocol Vocabulary Convergence Map

**Timestamp:** `2026-07-10T20-08-46-04-00`

## Current vocabularies

### Active protocol module

```txt
TRY_INTERACT action: toggle-ready
LOBBY_EVENT kind: player-ready
LOBBY_EVENT kind: player-unready
```

### Shared legacy types

```txt
client/ready { ready }
client/action { action: toggle-ready }
host/room-state { room }
```

### Local UI behavior

```txt
toggleReady() -> local Zustand mutation
```

No one route connects these forms into host authority.

## Problems

1. Readiness is modeled as a gameplay interaction, a dedicated client message, a generic client action, two host events, and a local store mutation.
2. The active transport union does not include the legacy shared message union.
3. `TRY_INTERACT toggle-ready` reaches `networkRules` only after active gameplay starts and is a no-op there.
4. `LOBBY_EVENT player-ready/player-unready` has no source producer.
5. No readiness message carries a roster revision, desired value, terminal result, or stable reject reason.
6. No compatibility rule determines which vocabulary is canonical.

## Canonical wire proposal

```txt
LOBBY_COMMAND
  commandId
  commandKind: set-ready | request-start
  roomId
  actorPlayerId
  rosterRevision
  desiredReady?
  timestampMs

LOBBY_RESULT
  commandId
  commandKind
  status
  reason
  rosterRevisionBefore
  rosterRevisionAfter
  authoritativeRoom
  admittedRosterFingerprint?

LOBBY_STATE
  room
  rosterRevision
  rosterFingerprint
  phase
```

The exact message names may remain additive during rollout, but one canonical semantic contract must own translation and results.

## Compatibility plan

```txt
client/ready
  -> translate to set-ready command

client/action toggle-ready
  -> resolve desired value from authoritative actor row
  -> translate to set-ready command

TRY_INTERACT toggle-ready
  -> accept only during lobby compatibility window
  -> translate before active-game routing

LOBBY_EVENT player-ready/player-unready
  -> retire as command inputs
  -> optionally retain as compatibility projections of LOBBY_STATE
```

## Preflight rules

```txt
protocol version supported
room ids agree
sender owns actor player id
actor belongs to roster
host source owns LOBBY_RESULT and LOBBY_STATE
roster revision is present
command id is stable
payload shape is valid
phase permits command kind
```

## Ordering rules

Readiness mutation ordering is based on authoritative roster revision, not wall-clock timestamps. Duplicate command ids must replay the same terminal result. Stale revisions must reject without roster mutation.

## Fixture rows

```txt
canonical set-ready accepted
legacy client/ready translated
legacy client/action translated
TRY_INTERACT lobby compatibility translated
active-phase toggle-ready rejected
wrong-room rejected
spoofed actor rejected
stale revision rejected
duplicate command replays terminal result
host publishes one authoritative roster revision
```

## Next safe ledge

```txt
HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
```