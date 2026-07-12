# Gameplay Audit: Error-Without-Close Ghost Participant Loop

**Timestamp:** `2026-07-12T14-30-36-04-00`

## Summary

A connection that errors without closing can remain represented as a lobby participant and later enter `createInitialGameState()`. The host can therefore generate an authoritative player actor for a peer that cannot receive `START_GAME` or `SYNC`.

## Plan ledger

**Goal:** ensure terminal transport failure removes or explicitly disconnects a participant before lobby start eligibility and run bootstrap are evaluated.

- [x] Trace host connection-error behavior.
- [x] Trace room and lobby player retention.
- [x] Trace Start-run admission.
- [x] Trace bootstrap and initial publication.
- [x] Define the required retirement and start gates.
- [ ] Implement and execute gameplay fixtures.

## Reachable loop

```txt
host receives connection candidate
  -> guest becomes visible/admitted
  -> DataConnection emits error
  -> no close event follows
  -> connection remains in host map
  -> guest remains in lobbyPlayers and room.players
  -> Start run button remains available
  -> startPlay consumes lobbyPlayers
  -> createInitialGameState creates guest actor
  -> host enters PLAYING
  -> broadcast skips non-open connection
  -> guest never receives START_GAME or initial SYNC
```

## Gameplay consequences

```txt
authoritative snapshot can contain unreachable actor
maze spawn allocation can reserve unreachable player slot
minimap and renderer can project ghost participant
interaction or anomaly policies can count stale membership
reconnect can collide with retained actor identity
terminal outcomes can cite a roster that was never shared
```

## Required gameplay admission

```txt
before bootstrap
  -> seal current roster revision
  -> require accepted active binding for every remote participant
  -> reject errored or retiring connection generations
  -> apply explicit disconnected-player policy
  -> require StartEligibilityResult=accepted
  -> construct bootstrap from sealed roster only
  -> publish initial delivery results
  -> acknowledge first shared gameplay frame
```

## Fixture requirements

```txt
host-error-without-close before start
host-error-without-close after ready
error during loading
replacement connection before start
late predecessor close after replacement
start attempt while retirement pending
first shared frame excludes retired participant
```

## Acceptance boundary

No ghost-free run-bootstrap, reliable initial delivery or shared multiplayer-frame claim is made until error-only retirement and sealed start eligibility are implemented and proven.