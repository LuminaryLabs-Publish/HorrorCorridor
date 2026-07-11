# HorrorCorridor Return Command Admission Map

**Timestamp:** `2026-07-10T21-39-22-04-00`

## Current interaction map

| User intent | Current callback | Current authority | Current result |
|---|---|---|---|
| Pause, then Resume | `resumePlay()` | local UI | screen returns to PLAYING |
| Pause, then Return to lobby | `returnToLobby()` | local UI | local screen changes; session remains active |
| Pause, then Quit to title | `returnToStart()` | local shell | transport destroyed and stores reset |
| Victory, then Restart | `returnToLobby()` | local UI | local lobby screen; ending snapshot retained |
| Victory, then Quit to title | `returnToStart()` | local shell | transport destroyed and stores reset |
| Client leaves active run | no typed command | none | local-only callback or title teardown |
| Host resets active run | no typed command | none | local-only callback |

## Admission problem

The UI sends callbacks directly into store mutation. No command envelope states:

```txt
who requested the transition
which room/game/run it targets
which session epoch it belongs to
whether the sender has authority
which destination is requested
whether transport should survive
whether the request was accepted, rejected, or already applied
```

## Proposed commands

```txt
RunExitCommand {
  requestId
  senderId
  actorId
  role
  roomId
  gameId
  sessionEpoch
  destination: lobby | title | closed
  reason: pause-return | victory-restart | client-leave | host-reset | quit
  requestedAtMs
}
```

## Proposed terminal result

```txt
RunExitResult {
  requestId
  status: accepted | rejected | no-change
  reason
  authorityId
  previousPhase
  nextPhase
  previousEpoch
  nextEpoch
  preserveTransport
  runtimeTeardownRequired
  published
  completedAtMs
}
```

## Admission matrix

| Intent | Solo | Host | Client |
|---|---|---|---|
| Return to lobby | local authority accepts | host authority accepts and broadcasts | sends request or performs explicit leave; cannot reset room locally |
| Restart after victory | accept exit, then new solo admission | host accepts exit, then new multiplayer admission | waits for host session state or explicitly leaves |
| Quit to title | local teardown accepts | local host close or transfer policy required | local leave and transport destroy |
| Close room | not applicable | host-only | rejected |
| Force active peers to lobby | not applicable | host-only | rejected |

## Stable rejection reasons

```txt
wrong-protocol-version
wrong-room
wrong-game
stale-session-epoch
future-session-epoch
unknown-sender
sender-not-member
not-authority
invalid-phase
already-exited
duplicate-request
room-closing
teardown-in-progress
publication-failed
```

## UI projection requirements

```txt
pending exit state
accepted destination
blocked reason
connection preservation status
session epoch
phase transition
retry eligibility
```

## Interaction invariants

```txt
one click creates one request id
repeated clicks replay one terminal result
client UI cannot claim room reset before host acceptance
return-to-title is never mistaken for return-to-lobby
victory restart cannot mutate the completed epoch
no input command remains active after accepted exit
```

## Conclusion

Return, restart, leave, and quit should be commands with terminal results, not direct screen mutations. This keeps UI intent separate from multiplayer authority and runtime teardown.