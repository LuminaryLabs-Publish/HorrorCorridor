# HorrorCorridor Pause/Resume Authority DSK Map

**Timestamp:** `2026-07-10T23-30-13-04-00`

## Current ownership map

```txt
GameCanvas onKeyDown / pointerlockchange
  -> uiStore.setPaused
  -> local screen and overlay mutation
  -> animation loop checks local screen

GameCanvas transport subscription
  -> continues receiving PLAYER_UPDATE and TRY_INTERACT
  -> mutates host GameState
  -> publishAuthoritativeState
  -> room.phase forced active
  -> SYNC broadcast

GameShell SYNC consumer
  -> replaces room, roster, and snapshot
  -> chooses PAUSED only when snapshot.gameState === paused
  -> otherwise chooses PLAYING
```

No single domain owns pause intent, policy, simulation admission, network publication, input suspension, UI projection, and terminal result.

## Current domain boundaries

### UI pause projection

Owned by `uiStore`.

Services:

```txt
isPaused flag
manual/system/connection reason
pause overlay
PLAYING <-> PAUSED local screen projection
```

It does not own replicated state or authority.

### Runtime simulation admission

Owned inline by the GameCanvas animation loop.

Services:

```txt
uiState.screen === PLAYING check
local host/solo movement step
client prediction step
snapshot replay while not advancing
```

It does not produce an admission result.

### Network command consumption

Owned inline by the GameCanvas host transport subscription.

Services:

```txt
consume PLAYER_UPDATE
consume TRY_INTERACT
mutate currentGameState
publish SYNC
```

It does not consult local pause state.

### Client projection

Owned by the GameShell SYNC handler.

Services:

```txt
replace room and roster
replace authoritative snapshot
map snapshot.gameState to local screen
set readiness
```

It does not recognize a pause transaction or local-pause policy.

### Input lifecycle

Owned inline by GameCanvas listeners and first-person input helpers.

Services:

```txt
keyboard flags
pointer-lock state
mouse look accumulation
interaction invocation
blur release
```

It does not atomically clear or suspend state during pause.

## Required parent domain

```txt
corridor-pause-authority-domain
```

Responsibilities:

```txt
accept pause/resume intents
select policy by session mode and actor role
validate room, game, session epoch, phase, and current pause state
coordinate simulation, interaction, input, publication, and UI projection
return accepted/rejected/no-change results
retain bounded command/result/convergence rows
```

## Candidate nested kits

### pause-command-kit

```txt
commandId
requestId
actorId
actorRole
roomId
gameId
sessionEpoch
desiredState
reason
requestedAtMs
```

### pause-authority-policy-kit

```txt
solo local authority
host global authority
client local-overlay policy
client global-pause request policy
host-only resume rules
connection-loss policy
phase admission
```

### pause-transition-result-kit

```txt
accepted
rejected
no-change
previous and next pause state
previous and next room/game state
stable reason
publication required
input suspension required
```

### simulation-admission-kit

```txt
movement admission
interaction admission
ooze/cadence admission
client-update admission
host remote-command admission
render-always versus simulation-stop policy
```

### input-suspension-kit

```txt
clear movement flags
clear interact flag
clear look deltas
release pointer lock
suspend new gameplay input
resume only after accepted result
```

### pointer-lock-pause-adapter-kit

```txt
translate pointer-lock loss to pause intent
separate expected release from unexpected loss
avoid duplicate pause commands
record browser outcome
```

### pause-publication-policy-kit

```txt
publish global pause state
publish global resume state
suppress normal active-state publication while globally paused
allow heartbeat/liveness without gameplay mutation
```

### pause-projection-transaction-kit

```txt
room phase/game state
snapshot gameState/appState
UI screen/game screen/overlay
runtime readiness
pointer-lock expectation
input suspension state
atomic projection result
```

### pause-convergence-ledger-kit

```txt
command rows
result rows
peer acknowledgement rows
last accepted pause revision
stale/duplicate counts
projection parity rows
```

### pause-debug-projection-kit

```txt
current policy
current authority source
pause revision
pending command
last result
simulation admission
input suspension
peer convergence
JSON-safe export
```

### pause-resume-fixture-kit

```txt
DOM-free commands
solo/host/client matrices
remote-update rejection/admission
SYNC projection rows
input-clear rows
duplicate replay
JSON-safe assertions
```

### legacy-local-pause-compatibility-kit

```txt
adapt current uiStore calls
preserve current menu presentation
route old callbacks through the new command boundary
remove after all callers migrate
```

## Composition order

```txt
run-session identity and epoch
  -> pause command envelope
  -> pause authority policy
  -> transition result
  -> simulation and input admission
  -> publication policy
  -> atomic projection
  -> convergence/debug ledgers
  -> DOM-free fixture
  -> GameCanvas and GameShell adapters
```

## Non-goals

```txt
renderer replacement
PeerJS extraction
maze redesign
network cadence retuning
visual changes
new pause menu art
```

## Dependency note

This domain should consume the session identity and message-admission conventions created by lobby-start and run-exit work. It should not invent a second request-id, epoch, result, or projection framework.