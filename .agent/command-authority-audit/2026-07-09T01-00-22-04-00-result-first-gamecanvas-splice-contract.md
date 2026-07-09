# HorrorCorridor Result-First GameCanvas Splice Contract

**Timestamp:** `2026-07-09T01-00-22-04-00`

## Problem statement

`GameCanvas.tsx` is currently the consumer and partial authority of command outcomes. It derives an action string, invokes GameState-returning rules, infers publish/no-op from object identity or action strings, then publishes snapshots and commits victory from follow-up checks.

That makes rejected, unchanged, skipped, publish-only, and victory cases invisible to fixtures and runtime debug.

## Result-first contract

Every command path must produce this shape before GameCanvas decides anything:

```txt
CommandEnvelope
  id
  source
  type
  playerId
  payload
  requestedAtMs

CommandResult
  command
  status
  reason
  beforeSummary
  afterSummary
  changed
  state
  events
  diagnostics

PublishDecision
  kind
  shouldPublish
  shouldBroadcast
  shouldCommitVictory
  snapshotReason
  debugMessage

CommandJournalEntry
  result summary
  decision summary
  consumer action
```

## Source splice order

```txt
1. Add CommandEnvelope/CommandSource/CommandType definitions.
2. Add CommandReason constants before any wrappers.
3. Add CommandResult constructors and snapshot summaries.
4. Add PublishDecision helper.
5. Add CommandJournal helpers.
6. Add fixture seed states and fixture row expectations.
7. Add interaction preflight checks.
8. Add result-returning pickup/drop/place/remove wrappers.
9. Keep legacy pickup/drop/place/remove exports returning result.state.
10. Add result-returning player update, held sync, and network interaction wrappers.
11. Keep legacy network exports returning result.state.
12. Add local and host authority consumers.
13. Add command fixture script.
14. Add runtime debug projection helper.
15. Integrate GameCanvas by replacing object-identity publish checks with consumer decisions.
```

## Legacy compatibility rule

Existing imports should continue to work:

```txt
pickUpCube(state, input) -> GameState
dropCube(state, input) -> GameState
placeCubeAtEndAnomaly(state, input) -> GameState
removeCubeFromEndAnomaly(state, input) -> GameState
applyNetworkPlayerUpdate(state, input) -> GameState
applyNetworkInteractionRequest(state, input) -> GameState
syncHeldCubesToPlayers(state) -> GameState
```

Add result-returning variants beside them:

```txt
pickUpCubeWithResult
dropCubeWithResult
placeCubeAtEndAnomalyWithResult
removeCubeFromEndAnomalyWithResult
applyNetworkPlayerUpdateWithResult
applyNetworkInteractionRequestWithResult
syncHeldCubesToPlayersWithResult
```

## GameCanvas splice contract

```txt
local path:
  action derived as today
  -> createLocalInteractionCommand
  -> consumeLocalAuthorityCommand
  -> update currentGameState from consumer.result.state
  -> sync local carry only if consumer says state changed or carry sync changed
  -> publish only if consumer.decision.shouldPublish
  -> commitVictory only if consumer.decision.shouldCommitVictory
  -> recordRuntimeDebugEvent with command projection

host path:
  peer message normalized into CommandEnvelope
  -> consumeHostAuthorityCommand
  -> update currentGameState from consumer.result.state
  -> publish/recover/skip only from PublishDecision
  -> commitVictory only from decision
  -> recordRuntimeDebugEvent with command projection
```

## Required command reasons

```txt
accepted:pickup
accepted:drop
accepted:place
accepted:remove
accepted:player-update
accepted:held-cube-sync
accepted:ooze-tick
victory:ordered-sequence-complete
rejected:not-playing
rejected:missing-player
rejected:already-carrying
rejected:no-nearby-cube
rejected:no-carried-cube
rejected:missing-anomaly-cell
rejected:too-far-from-anomaly
rejected:no-free-slot
rejected:no-occupied-slot
rejected:wrong-slot
rejected:missing-cube-id
unchanged:player-missing
unchanged:held-cube-already-synced
unchanged:no-state-diff
publish-only:request-sync
skipped:toggle-ready-policy-not-implemented
skipped:cancel-policy-not-implemented
skipped:unknown-action
```

## Fixture stop gate

Do not edit `GameCanvas.tsx` until `node scripts/horror-corridor-command-fixture.mjs` can prove the command result rows with no DOM, no canvas, no PeerJS, and no Three.js dependency.
