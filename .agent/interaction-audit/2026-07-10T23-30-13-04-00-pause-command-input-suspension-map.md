# HorrorCorridor Pause Command and Input Suspension Map

**Timestamp:** `2026-07-10T23-30-13-04-00`

## Current event sources

```txt
Escape key
  -> keyboardCodeToPlayerInputButton("Escape")
  -> local uiStore.setPaused
  -> pointer-lock release

pointerlockchange to unlocked
  -> syncPointerLockState
  -> local uiStore.setPaused(system)

window blur
  -> exit pointer lock
  -> pointerlockchange
  -> local system pause

PauseMenu resume
  -> GameShell.resumePlay
  -> local uiStore state change
```

None create a command envelope or terminal result.

## Current admission gaps

```txt
no requestId
no actorId or actorRole
no roomId/gameId/sessionEpoch
no desired pause state field
no reason catalog beyond UI-only manual/system/connection
no authority policy
no duplicate detection
no phase preflight
no pending/result projection
no peer acknowledgement
```

## Current input-suspension gaps

```txt
global keyboard listeners remain attached
movement flags are not cleared atomically
interact can call applyInteraction while local screen is PAUSED
look deltas are not cleared as part of pause
pointer-lock release is not correlated with a pause result
resume can occur before pointer lock recapture
stale held-key state can survive into resume
```

## Proposed command

```ts
type PauseCommand = Readonly<{
  commandId: string;
  requestId: string;
  actorId: string;
  actorRole: "solo" | "host" | "client";
  roomId: string;
  gameId: string;
  sessionEpoch: number;
  desiredState: "paused" | "playing";
  scope: "local" | "session";
  reason: "manual" | "pointer-lock-loss" | "blur" | "connection" | "system";
  requestedAtMs: number;
}>;
```

## Proposed result

```ts
type PauseResult = Readonly<{
  commandId: string;
  requestId: string;
  status: "accepted" | "rejected" | "no-change";
  reason: string;
  authoritySource: "solo" | "host" | "local-overlay";
  previousState: "paused" | "playing";
  nextState: "paused" | "playing";
  pauseRevision: number;
  simulationAdmitted: boolean;
  interactionAdmitted: boolean;
  inputSuspended: boolean;
  publicationRequired: boolean;
  resolvedAtMs: number;
}>;
```

## Input suspension transaction

```txt
accepted pause
  -> clear forward/back/left/right/sprint/interact flags
  -> clear accumulated look deltas
  -> release pointer lock if held
  -> block new gameplay input while preserving menu/debug controls
  -> stop client PLAYER_UPDATE and interaction publication
  -> record input-suspension result

accepted resume
  -> keep movement flags clear
  -> require fresh keydown edges
  -> require explicit pointer-lock recapture for mouse look
  -> re-enable gameplay input after projection commits
  -> record resume result
```

## Pointer-lock adapter rules

```txt
expected release after accepted pause -> observation only
unexpected release while playing -> one pause intent
repeated pointerlockchange while already paused -> no-change
blur followed by pointerlockchange -> one correlated command
capture failure -> stable rejected browser-effect row
```

## Required UI projection

```txt
pending pause or resume
accepted/rejected/no-change status
local-only versus session-wide scope
stable reason
current pause revision
input suspended indicator
peer convergence indicator for global pause
```

## Validation

A DOM-free fixture should test command and input state transitions first. Browser smoke should then test Escape, pointer-lock loss, blur, resume, repeated events, and host/client convergence.