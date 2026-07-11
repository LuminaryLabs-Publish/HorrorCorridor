# HorrorCorridor Local Pause / Host Simulation Loop

**Timestamp:** `2026-07-10T23-30-13-04-00`

## Current gameplay loop

```txt
host presses Escape or loses pointer lock
  -> local UI enters PAUSED
  -> host local movement and local ooze cadence stop in RAF branch
  -> host transport subscription remains active
  -> remote PLAYER_UPDATE still mutates currentGameState
  -> remote TRY_INTERACT still mutates cubes/anomaly
  -> host publishes active SYNC after those messages
  -> host world can change while pause menu is visible
```

```txt
client presses Escape or loses pointer lock
  -> local UI enters PAUSED
  -> client prediction and PLAYER_UPDATE publication stop temporarily
  -> host continues active simulation and SYNC publication
  -> GameShell consumes SYNC
  -> snapshot.gameState is playing
  -> client UI returns to PLAYING without a resume command
```

```txt
solo presses Escape
  -> local UI enters PAUSED
  -> local simulation stops
  -> replicated snapshot remains playing/active
  -> resume changes local UI only
```

## Gameplay authority gaps

```txt
no explicit pause policy for solo, host, or client
no host-global pause command
no client-local-overlay pause contract
no client request for global pause
no distinction between rendering continuation and gameplay mutation
no remote-command admission rule while host is paused
no interaction suspension result
no ooze/cadence pause result
no accepted resume transaction
no pause revision or duplicate replay
```

## Input and interaction leakage

The keyboard listeners stay active during pause. `interact` invokes `applyInteraction()` before the input flag update, and `applyInteraction()` checks only `currentGameState.gameState`. Because local pause does not change that replicated game state, an interaction can still be admitted while the pause menu is visible.

Movement flags and look deltas are also not cleared as one pause transaction. This can retain pre-pause intent until key-up or resume.

## Required gameplay policy matrix

```txt
solo manual pause
  simulation: stop
  interaction: stop
  ooze/cadence: stop
  render: continue
  network: none

host global pause
  host simulation: stop
  client updates: reject or journal without mutation
  interactions: reject
  authoritative snapshots: paused heartbeat only
  render: continue for every peer

client local-overlay pause
  local prediction/input send: stop
  host simulation: continue
  inbound active snapshots: may update world but must not silently clear overlay
  resume: explicit local result

connection/system pause
  policy: explicit and separate from manual pause
  authority: deterministic
  result: observable
```

## Required result reasons

```txt
accepted-solo-pause
accepted-host-global-pause
accepted-client-local-pause
accepted-resume
already-paused
already-playing
wrong-role
wrong-phase
wrong-room
wrong-game
stale-epoch
duplicate-request
connection-policy-denied
```

## Fixture rows

```txt
solo pause stops movement, interaction, and ooze
solo resume restarts once
host global pause rejects remote movement mutation
host global pause rejects remote interaction mutation
host paused publication stays paused
client local pause is not overwritten by active SYNC
client local pause still renders host world changes under explicit local-overlay policy
pointer-lock loss emits one pause intent
repeated pointer-lock events return no-change
interaction key while paused produces rejected result
movement flags clear on accepted pause
look deltas clear on accepted pause
accepted resume does not replay stale movement
all result rows are JSON-safe
```

## Ordered dependency

This gameplay gate follows stable lobby/start and run-session identity work. It should reuse the same command envelope, epoch, terminal-result, stale-message, and debug conventions.