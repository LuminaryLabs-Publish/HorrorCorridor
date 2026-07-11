# HorrorCorridor Lobby Readiness and Admission Projection Gap

**Timestamp:** `2026-07-10T20-08-46-04-00`

## Visual surface

The lobby is a React-rendered visual surface and therefore requires a render audit even though this pass does not change Three.js gameplay rendering.

## Current projection

```txt
LobbyScreen receives mode, connectionStatus, room, and players
  -> shows room code, mode, status, player count, phase
  -> shows each player as ready or waiting
  -> host primary label: Start run
  -> client primary label: Enter run
  -> client secondary label: Toggle ready
```

## Projection gaps

1. `Start run` is always visually enabled; the component receives no `canStart`, admission status, blocked reason, pending state, or authoritative roster revision.
2. The copy says to move into the run once everyone is ready, but the rendered control does not enforce or explain that rule.
3. Client `Enter run` and `Toggle ready` both invoke the same local toggle behavior, so the primary label does not describe the actual effect.
4. A client can render itself as ready while the host still owns an unchanged waiting row.
5. The UI cannot distinguish local optimistic readiness from host-accepted readiness.
6. Placeholder guests render like connected participants and have no non-player or simulated marker.
7. The room exposes a `starting` phase, but the lobby never renders start admission, bootstrap pending, rejection, or rollback state.
8. No debug overlay row ties a displayed ready badge or enabled Start button to an authoritative roster fingerprint.

## Required projection contract

```txt
LobbyViewState
  roomId
  phase
  rosterRevision
  players[]
    id
    displayName
    role
    connectionState
    readinessState
    source: authoritative | pending-local
    participantKind: real | placeholder
  readyCount
  requiredReadyCount
  canLocalToggleReady
  canHostStart
  startBlockReasons[]
  pendingCommandId
  lastCommandResult
```

## Render acceptance checks

```txt
client pending-ready state is visually distinct from host-accepted ready
all peers project the same authoritative roster revision
Start run is disabled when admission would reject
blocked Start run explains stable reasons
placeholder guests cannot appear as admitted real participants
starting phase prevents duplicate start activation
rejected start leaves lobby projection unchanged
accepted start projects one immutable admitted roster
```

## Deferred render work

```txt
Three.js world extraction
post-processing extraction
minimap extraction
scene-dressing expansion
visual object-kit expansion
new maze art
```

## Next safe ledge

```txt
HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
```