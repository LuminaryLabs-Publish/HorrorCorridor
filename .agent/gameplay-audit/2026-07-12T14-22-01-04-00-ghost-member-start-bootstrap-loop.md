# Gameplay Audit: Ghost-Member Start Bootstrap Loop

**Timestamp:** `2026-07-12T14-22-01-04-00`

## Summary

A premature host connection-open event can add a remote peer to `lobbyPlayers` before the data channel is usable. Host start then passes the full current roster into `createInitialGameState`, while START_GAME and SYNC publication skip unopened connections. The authoritative run can therefore contain a participant who never received the run transition or initial state.

## Plan ledger

**Goal:** prevent any gameplay participant from entering bootstrap unless its lobby membership, channel binding and readiness are committed under one sealed roster revision.

- [x] Trace connection event to lobby mutation.
- [x] Trace lobbyPlayers into host bootstrap.
- [x] Trace broadcast filtering by `connection.open`.
- [x] Identify ghost-member and divergent-start outcomes.
- [x] Define start-eligibility and rollback requirements.
- [ ] Implement and run ghost-member fixtures later.

## Current loop

```txt
PeerJS connection candidate arrives
  -> host emits connection-open immediately
  -> guest enters lobbyPlayers as connected
  -> player-joined broadcast can send to 0 channels
  -> connection remains unopened

host clicks Start run
  -> no all-ready or admitted-channel gate
  -> createInitialGameState(players = lobbyPlayers)
  -> snapshot contains ghost participant
  -> host enters PLAYING
  -> START_GAME and SYNC skip unopened connection
```

## Gameplay consequences

```txt
host room and client room diverge
host run contains actor absent from client
client remains in lobby while host starts
spawn, collision, minimap and outcome logic can include ghost actor
reconnect can collide with an already-consumed identity or slot
host victory/failure evidence can cite a roster never shared by clients
```

## Missing start authority

```txt
sealed roster revision
roster fingerprint
all-member channel admission result
connection-to-actor binding result
all-ready result
start eligibility result
initial publication delivery result
client start acknowledgement
bootstrap roster provenance
first shared gameplay frame acknowledgement
```

## Required start transaction

```txt
StartRunCommand
  -> validate host role and current room phase
  -> seal roster revision and fingerprint
  -> require current admitted channel for every remote member
  -> require canonical actor binding for every participant
  -> require named readiness policy
  -> build candidate initial state from sealed roster
  -> publish START_GAME and initial SYNC
  -> require delivery or acknowledgement policy
  -> atomically commit run phase and snapshot
  -> acknowledge first shared gameplay frame

failure
  -> remain in lobby
  -> preserve predecessor room and runtime state
  -> publish typed ineligible or delivery-failed result
```

## Required fixtures

```txt
never-open guest cannot make start eligible
delayed-open guest becomes eligible only after admission
guest error before start removes or disconnects member
host cannot bootstrap from placeholder guest unless policy explicitly allows bots
initial START_GAME/SYNC delivery failure blocks shared-run claim
host and client first frames cite the same sealed roster revision
```

No gameplay runtime source was changed.