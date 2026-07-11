# Exit Command and Message Admission Map

**Timestamp:** `2026-07-11T01-10-28-04-00`

## Current interaction sources

```txt
PauseMenu Return to Lobby
CompleteScreen Restart
PauseMenu Quit to Title
Lobby Back to Title
Peer connection close
START_GAME message
SYNC message
LOBBY_EVENT message
PLAYER_UPDATE message
TRY_INTERACT message
```

## Current mapping

```txt
Return to Lobby / Restart
  -> GameShell.returnToLobby
  -> resetUi
  -> set lobby screen and readiness
  -> no authority command/result

Quit to Title
  -> returnToStart
  -> destroy transport and reset stores
  -> no typed teardown result

START_GAME / SYNC / LOBBY_EVENT
  -> shell callback
  -> direct store and screen mutation
  -> no run identity or epoch preflight

PLAYER_UPDATE / TRY_INTERACT
  -> active runtime consumer
  -> no old-run epoch fence
```

## Required command shape

```txt
RunExitCommand {
  requestId
  actorId
  actorRole
  reason
  scope
  expectedRoomId
  expectedGameId
  expectedRunSessionId
  expectedSessionEpoch
  requestedAtMs
}
```

## Required admission shape

```txt
MessageAdmissionResult {
  status: accepted | rejected | duplicate | stale
  reason
  messageType
  requestId
  senderId
  roomId
  gameId
  runSessionId
  sessionEpoch
  currentPhase
  mutationApplied
}
```

## Required interaction invariants

```txt
one user exit intent produces one terminal result
repeated clicks replay no-change/duplicate result
post-exit keyboard/mouse/interact input cannot mutate gameplay
old transport callbacks reject before store mutation
first new-run input requires the new run identity and epoch
```

## Debug projection

Expose the last exit command/result, last admitted/rejected message, counts by reason, current callback generation, current run identity, and first lobby/re-entry projection correlation as JSON-safe rows.
