# Architecture Audit: Active-Run Disconnect Authority DSK Map

**Timestamp:** `2026-07-11T16-21-09-04-00`

## Current split

```txt
peer-host-transport-kit
  -> emits connection close

GameShell/session domain
  -> removes lobby player
  -> updates session room
  -> broadcasts lobby event

GameCanvas/runtime domain
  -> owns separate currentGameState
  -> continues simulation/publication
  -> does not consume roster removal
```

## Required composed domain

```txt
horror-corridor-active-run-disconnect-authority-domain
  -> transport-actor-connection-binding-kit
  -> peer-disconnect-observation-kit
  -> disconnect-command-envelope-kit
  -> disconnect-classification-kit
  -> active-membership-revision-kit
  -> player-suspension-kit
  -> player-retirement-kit
  -> owned-cube-recovery-kit
  -> gameplay-roster-transaction-kit
  -> disconnect-result-kit
  -> disconnect-publication-kit
  -> reconnect-claim-kit
  -> disconnect-frame-correlation-kit
  -> disconnect-journal-kit
  -> active-run-disconnect-fixture-kit
```

## Required transaction

```txt
observe connection close
  -> resolve canonical actor binding
  -> validate run/epoch/membership revision
  -> classify transient/timeout/leave/kick
  -> plan suspension or retirement
  -> resolve cubes and interaction claims
  -> atomically update session room, GameState room and players
  -> remove simulation inputs
  -> commit membership revision
  -> publish typed result and snapshot
  -> acknowledge world/minimap/HUD/debug frame
  -> optionally admit reconnect claim
```

## Invariants

```txt
one live connection binding per active actor
one canonical active membership revision
session and gameplay rosters converge
no cube owner missing from active or suspended membership
retired actor contributes no movement, ooze, interaction or render input
reconnect cannot duplicate or substitute actor identity
```
