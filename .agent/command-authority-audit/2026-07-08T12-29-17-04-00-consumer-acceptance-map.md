# HorrorCorridor Command Result Consumer Acceptance Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T12-29-17-04:00`

## Purpose

Narrow the previous source wire map into the exact consumer acceptance seam for local authority, host authority, runtime debug, and headless fixtures.

The prior map identified the files and contracts. This map defines what each consumer must do with `CommandResult` and `PublishDecision` before `GameCanvas.tsx` should be changed.

## Source-backed problem

```txt
interactionRules.ts:
  pickUpCube / dropCube / placeCubeAtEndAnomaly / removeCubeFromEndAnomaly return GameState only.
  rejected paths return the original state without a reason.

networkRules.ts:
  syncHeldCubesToPlayers / applyNetworkPlayerUpdate / applyNetworkInteractionRequest return GameState only.
  request-sync / toggle-ready / cancel / default return the original state without command status.

GameCanvas.tsx:
  local authority publishes based on object identity.
  host authority publishes after PLAYER_UPDATE and TRY_INTERACT without command-result metadata.
  request-sync recovery is derived from action string instead of publish-decision metadata.

runtimeDebugStore.ts:
  debug exports frame/event data but not latest command result, publish decision, rejection reason, consumer action, or fixture parity.
```

## Required contract chain

```txt
CommandEnvelope
-> CommandResult
-> PublishDecision
-> CommandJournal
-> LocalAuthorityCommandConsumerResult or HostAuthorityCommandConsumerResult
-> RuntimeDebugCommandProjection
-> DOM-free fixture row
```

## Required new source files

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Local authority consumer acceptance

```txt
local accepted changed:
  result.status = accepted
  decision.decision = publish
  shouldBroadcast = true for host mode, false for solo transport broadcast but still commit local snapshot
  currentGameState = result.state
  publishAuthoritativeState(decision.snapshotReason)

local accepted unchanged:
  result.status = accepted
  decision.decision = no-op
  shouldBroadcast = false
  currentGameState may remain unchanged
  command is journaled

local rejected:
  result.status = rejected
  decision.decision = skip
  shouldBroadcast = false
  currentGameState remains unchanged
  rejection reason is visible in debug

local skipped:
  result.status = skipped
  decision.decision = skip
  shouldBroadcast = false
  command is journaled as policy/unknown action

local victory:
  result.status = victory
  decision.decision = victory
  shouldCommitVictory = true
  currentGameState = result.state
  publishAuthoritativeState(decision.snapshotReason)
  commitVictory()
```

## Host authority consumer acceptance

```txt
host accepted PLAYER_UPDATE:
  applyNetworkPlayerUpdateResult returns accepted when pose/carry sync changes state
  publish decision is publish/resync
  host broadcasts full-sync snapshot

host unchanged PLAYER_UPDATE:
  missing player or no meaningful diff returns unchanged
  publish decision is skip or no-op
  host does not broadcast an unnecessary resync

host accepted TRY_INTERACT:
  applyNetworkInteractionRequestResult returns accepted or victory
  host syncs carried cubes through result-aware helper
  publish decision controls resync/victory broadcast

host rejected TRY_INTERACT:
  command is journaled
  host does not broadcast a normal resync
  debug/export explains reason

host request-sync:
  result.status = publish-only
  result.reason = publish-only:request-sync
  decision.decision = recovery
  shouldBroadcast = true
  snapshotReason = recovery

host skipped action:
  toggle-ready / cancel / unknown return skipped
  decision.decision = skip
  shouldBroadcast = false
  state is not mutated
```

## Runtime debug projection acceptance

```txt
latestCommandResult:
  id, source, type, status, reason, changed, before, after

latestPublishDecision:
  decision, reason, shouldBroadcast, shouldCommitVictory, snapshotReason

latestCommandConsumer:
  authority: local | host | fixture
  action: publish | skip | recovery | no-op | victory
  committedState: boolean
  broadcastRequested: boolean

commandJournalCounts:
  acceptedCount, rejectedCount, unchangedCount, publishOnlyCount, skippedCount, victoryCount

latestFixtureParity:
  fixtureId, passed, volatileFieldsNormalized, mismatchCount
```

## Fixture rows that prove the consumer layer

```txt
[ ] local accepted pickup publishes local snapshot and records accepted:pickup.
[ ] local rejected pickup while carrying skips publish and records rejected:already-carrying.
[ ] local rejected no nearby cube skips publish and records rejected:no-nearby-cube.
[ ] local accepted final place records victory and requests commitVictory.
[ ] host accepted PLAYER_UPDATE publishes resync.
[ ] host missing-player PLAYER_UPDATE records unchanged:player-missing and skips broadcast.
[ ] host rejected TRY_INTERACT skips broadcast and records rejection reason.
[ ] host request-sync records publish-only:request-sync and publishes recovery.
[ ] host toggle-ready records skipped:toggle-ready-policy-not-implemented and skips broadcast.
[ ] host cancel records skipped:cancel-policy-not-implemented and skips broadcast.
[ ] host unknown action records skipped:unknown-action and skips broadcast.
```

## Output shape

```txt
fixtureId
commandId
commandSource
commandType
status
reason
changed
publishDecision
publishReason
shouldBroadcast
shouldCommitVictory
snapshotReason
consumerAuthority
consumerAction
committedState
broadcastRequested
beforeSummary
afterSummary
journalCounts
volatileFieldsNormalized
passed
```

## Stop line

Stop after the contracts, result wrappers, local/host consumers, debug projection, and headless fixture are implemented and fixture-readable.

Do not extract renderer, minimap, PeerJS, session lobby policy, object kits, texture kits, or new visual content in the same pass.