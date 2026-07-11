# Loading Roster Bootstrap Divergence Loop

**Timestamp:** `2026-07-11T11-39-11-04-00`

## Summary

`startPlay()` captures `room` and `lobbyPlayers`, then yields through a multi-step loading sequence. Peer connection, disconnect and placeholder actions can mutate the session stores while loading, but bootstrap still consumes the older captured values and no revision check rejects the stale plan.

## Plan ledger

**Goal:** prevent a run from bootstrapping players who are disconnected, unready, placeholder-only or absent from the roster visible when the start commit completes.

- [x] Trace roster mutation sources.
- [x] Trace async loading yields.
- [x] Trace bootstrap inputs and room phase transition.
- [x] Identify stale closure and no-revision behavior.
- [ ] Implement sealed-roster bootstrap parity.

## Current gameplay sequence

```txt
host presses Start run
  -> captured room and lobbyPlayers from React render
  -> runLoadingSteps()
     -> requestAnimationFrame
     -> 90 ms timer
     -> repeated five times

while loading
  -> peer connection can open
  -> peer connection can close
  -> host can previously have reserved placeholder rows
  -> session store room/players can change

loading completes
  -> createInitialGameState(captured room, captured lobbyPlayers)
  -> room phase becomes active
  -> every captured row becomes a gameplay player
```

## Gameplay consequences

- A disconnected player can still be spawned into the active run.
- A peer joining during loading can be absent from the run bootstrap.
- A placeholder or unbound roster row can become a gameplay avatar.
- Readiness can change after the click but before bootstrap without blocking start.
- Player colors and spawn offsets are derived from a stale roster order.
- Host and clients can disagree about the member set associated with the deterministic seed.

## Required gameplay contract

```txt
sealedRoster {
  roomRevision
  rosterRevision
  rosterFingerprint
  admittedMembers[] {
    memberId
    peerId
    playerId
    role
    ready
    connectionState
  }
}

bootstrap plan must prove:
  source revisions still current
  every gameplay player maps to one admitted real member
  no reserved slot enters gameplay
  all required readiness conditions remain true
  player ordering and spawn assignment are deterministic from the seal
```

## Required result classes

```txt
accepted
rejected-not-host
rejected-room-not-lobby
rejected-transport-not-connected
rejected-member-not-ready
rejected-roster-changed
rejected-member-disconnected
rejected-placeholder-present
stale-session
stale-epoch
duplicate
failed-bootstrap
failed-publication
```

## Fixture matrix

```txt
all members ready and connected -> accepted
member disconnects during loading -> stale/rejected
member joins during loading -> stale/rejected or explicit deferred policy
readiness flips during loading -> stale/rejected
placeholder row present -> rejected or excluded by declared policy
same roster different ordering -> stable fingerprint/order rule
retry same command -> duplicate/no-change
```
