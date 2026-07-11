# HorrorCorridor Exit Command and Transport Callback Map

**Timestamp:** `2026-07-11T01-01-32-04-00`

## Current input origins

```txt
PauseMenu Return to lobby
PauseMenu Quit to title
CompleteScreen Restart
CompleteScreen Quit to title
Lobby Back to title
component unmount
peer connection close
remote START_GAME
remote SYNC
remote LOBBY_EVENT
```

## Current routing

```txt
return/restart
  -> direct GameShell callback
  -> local store mutations

quit/title
  -> destroyTransport
  -> clearSession
  -> resetRuntime
  -> resetUi

remote message
  -> handleTransportEvent
  -> direct store/UI projection
```

## Missing identity

```txt
exit command id
request id
actor/role
runSessionId
sessionEpoch
exit scope
terminal reason
authority source
transport callback generation
projection commit id
teardown result id
```

## Callback admission rule

Every callback must be checked against:

```txt
transport lease id
room id
game id
runSessionId
sessionEpoch
current lifecycle phase
sender membership/role
message type allowed in phase
request/sequence monotonicity
```

## Required rejection reasons

```txt
stale-transport-generation
wrong-room
wrong-game
wrong-run-session
stale-epoch
terminal-phase
sender-not-in-roster
message-not-allowed-in-lobby
duplicate-request
transport-closing
transport-closed
```

## Adapter boundary

Menu and component callbacks should not mutate stores directly. They should create commands and project terminal results. Peer callbacks should not mutate stores until session-message admission returns accepted.
