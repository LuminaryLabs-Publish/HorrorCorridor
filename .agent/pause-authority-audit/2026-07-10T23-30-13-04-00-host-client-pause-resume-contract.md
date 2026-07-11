# HorrorCorridor Host/Client Pause and Resume Contract

**Timestamp:** `2026-07-10T23-30-13-04-00`

## Problem statement

The runtime currently has one local UI pause flag and one replicated gameplay state, but no contract that explains how they interact across solo, host, and client modes.

```txt
local UI pause state
  isPaused
  reason
  overlay
  screen

replicated gameplay state
  room.phase
  snapshot.appState
  snapshot.gameState
  tick
```

These values are mutated by different consumers and are not committed through one result.

## Authority modes

### Solo

```txt
authority source: local solo runtime
pause scope: session-local
simulation: stopped
interaction: stopped
ooze/cadence: stopped
render: continues
network publication: none
resume authority: local solo runtime
```

### Host global pause

```txt
authority source: host
pause scope: all peers
host simulation: stopped
remote player updates: rejected or acknowledged without mutation
remote interactions: rejected
snapshot publication: paused state or heartbeat only
client projection: paused from accepted authoritative result
resume authority: host
```

### Client local-overlay pause

```txt
authority source: client-local adapter
pause scope: local input/presentation only
host simulation: continues
client prediction and outgoing gameplay commands: stopped
inbound host snapshots: may update world state
local pause overlay: retained until explicit local resume
host does not interpret this as global pause
```

### Client global-pause request

Optional future policy:

```txt
client sends request
host accepts or rejects
no local global-pause claim before host result
accepted result projects every peer
```

### Connection/system pause

```txt
reason and authority must be explicit
connection loss may suspend local input while host policy remains unknown
reconnection must not silently resume stale input
```

## Transition table

```txt
playing -> paused
  requires accepted policy result

paused -> playing
  requires accepted resume result

paused -> paused
  no-change, same revision

playing -> playing
  no-change, same revision

active -> global paused
  replicated gameState becomes paused
  room/session remains identifiable

local-overlay paused + active host snapshot
  world may update
  local overlay remains paused
  no silent UI resume
```

## Publication rules

```txt
normal active SYNC must not overwrite a client-local overlay pause
accepted host-global pause must publish a monotonic pauseRevision
host-global paused session must not apply gameplay mutations
resume publication must reference the prior pause revision
stale pause/resume commands reject by session epoch and revision
```

## Simulation admission rules

```txt
movement
interaction
ooze/cadence
player update send
player update consume
interaction request send
interaction request consume
victory mutation
```

Every service must receive one resolved `simulationAdmission` or `interactionAdmission` decision instead of reading unrelated UI and replicated fields independently.

## Projection transaction

An accepted result must project these values together:

```txt
ui.pause
ui.screen
ui.gameScreen
ui.overlay
runtime readiness.input
runtime readiness.simulation
input suspended state
pointer-lock expectation
snapshot.gameState when global
snapshot.appState when global
pause revision
authority source
last terminal result
```

## Debug and ledger contract

```txt
bounded command rows
bounded result rows
bounded peer acknowledgement rows
current pause policy
current pause revision
last accepted authority source
simulation and interaction admission
input suspension state
projection parity
JSON-safe export
```

## Required fixture command

```txt
npm run fixture:pause-convergence
```

The fixture should be DOM-free and should not require PeerJS, WebGL, React, or a running Next server.

## Dependency order

```txt
lobby readiness/start admission
  -> stable initial session identity
  -> run exit/session epoch authority
  -> pause/resume authority
  -> browser pointer-lock and menu adapters
```

## Non-goals

```txt
changing pause menu visuals
changing renderer output
changing network cadence
adding host migration
adding new gameplay content
```