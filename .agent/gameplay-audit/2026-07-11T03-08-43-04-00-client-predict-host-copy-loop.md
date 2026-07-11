# HorrorCorridor Client Predict / Host Copy Gameplay Loop

**Timestamp:** `2026-07-11T03-08-43-04-00`

## Active loop

```txt
client keyboard/mouse input
  -> local movement integration
  -> local maze collision
  -> local predicted pose
  -> PLAYER_UPDATE every network interval
  -> host copies claimed pose
  -> held cubes follow copied player pose
  -> host publishes snapshot
  -> client continues predicting from its existing pose
```

## Gameplay authority defect

The host does not evaluate the movement command. It accepts the result that the client already calculated.

```txt
input.sequence: transmitted, not admitted
moveForward/moveStrafe: transmitted, not simulated by host
claimed pose: transmitted and copied
sender/player ownership: not proven
maze collision: local only for remote movement
speed/displacement budget: absent
host correction: not consumed during active client play
```

## Gameplay risks

```txt
remote wall traversal can enter authoritative state
remote speed or teleport can enter authoritative state
one sender can target another playerId if transport preflight does not block it elsewhere
stale or duplicate movement can overwrite newer movement
held cubes inherit an unvalidated pose
interaction distance decisions can be based on client-local state that does not converge
host and client can disagree about where the player is while both continue gameplay
```

## Correct loop

```txt
client input sample
  -> client prediction + sequence history
  -> host identity/epoch/sequence admission
  -> host movement simulation and collision
  -> authoritative pose result
  -> host snapshot with accepted sequence
  -> client prune acknowledged history
  -> replay later inputs
  -> smooth or snap correction
  -> gameplay and render consumers use reconciled pose
```

## Acceptance invariants

```txt
one connection controls one player
one update sequence mutates at most once
movement never exceeds admitted elapsed-time budget
host collision prevents wall crossing
host snapshot acknowledges the accepted sequence
client converges during PLAYING
held-cube and interaction state use the accepted pose
pause, exit and epoch change stop movement admission
```

## Main finding

The route currently combines responsive prediction with client-owned authority rather than responsive prediction with host reconciliation. The next gameplay work should replace host pose copying with a typed movement transaction before adding more mechanics, enemies or balance tuning.
