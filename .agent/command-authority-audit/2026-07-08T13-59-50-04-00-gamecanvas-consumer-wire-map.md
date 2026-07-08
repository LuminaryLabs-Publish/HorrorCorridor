# HorrorCorridor GameCanvas Command Consumer Wire Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T13:59:50-04:00`

## Goal

Move the next implementation handoff from broad command-result planning into the exact `GameCanvas.tsx` consumer splice points.

The runtime source should still be changed additively: result-returning domain wrappers first, DOM-free fixture proof second, then `GameCanvas.tsx` consumption third.

## Evidence read

```txt
LuminaryLabs-Publish full repo search result through GitHub connector
LuminaryLabs-Dev/LuminaryLabs recent central commits
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Publish/HorrorCorridor .agent root docs
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Current consumer seams

### Local interaction seam

```txt
GameCanvas.tsx
  applyInteraction()
  -> derive action from distanceToEnd and hasCarriedCube
  -> applyNetworkInteractionRequest(currentGameState, { playerId, action })
  -> if nextState === currentGameState return silently
  -> syncHeldCubesToPlayers(nextState)
  -> publishAuthoritativeState("resync")
  -> commitVictory when gameState === "victory"
```

Problem: the local branch cannot tell the difference between rejected, unchanged, skipped, and no-op outcomes.

### Host message seam

```txt
GameCanvas.tsx
  host transport message handler
  -> PLAYER_UPDATE calls applyNetworkPlayerUpdate
  -> TRY_INTERACT calls applyNetworkInteractionRequest
  -> request-sync uses recovery/full-sync behavior
  -> publishAuthoritativeState is still reason-string based
```

Problem: the host branch still needs a result consumer that decides `publish`, `skip`, `recovery`, `no-op`, or `victory` from the same command result contract used by local authority.

### Runtime debug seam

```txt
runtimeDebugStore.ts
  RuntimeDebugFrameRecord
  RuntimeDebugEventRecord
  RuntimeDebugExport
```

Problem: debug export captures frames/events/snapshot/cadence/scene dressing, but it does not yet expose latest command result, publish decision, rejection reason, consumer action, journal counts, or fixture parity.

## Required source module order

```txt
1. commandTypes.ts
2. commandReasons.ts
3. commandResults.ts
4. publishDecisions.ts
5. commandJournal.ts
6. interactionPreflight.ts
7. interactionResultRules.ts
8. networkResultRules.ts
9. localAuthorityCommandConsumer.ts
10. hostAuthorityCommandConsumer.ts
11. scripts/horror-corridor-command-fixture.mjs
12. runtimeDebugStore.ts additive result projection
13. GameCanvas.tsx consumer splice
```

Do not edit `GameCanvas.tsx` before the fixture script can prove the domain contracts without a browser.

## Required local consumer contract

```txt
consumeLocalInteractionCommand(input): LocalAuthorityCommandConsumption

Input:
  state
  playerId
  action
  cubeId optional
  slotId optional
  nowMs optional

Output:
  result: CommandResult
  decision: PublishDecision
  nextState
  journal
  shouldPublish
  shouldCommitVictory
  debugProjection
```

Rules:

```txt
accepted + changed -> publish resync
accepted + unchanged -> no-op / do not publish
rejected -> skip / do not publish
skipped -> skip / do not publish
publish-only -> recovery / publish only for request-sync path
victory -> publish victory and commit completion
```

## Required host consumer contract

```txt
consumeHostCommand(input): HostAuthorityCommandConsumption

Input:
  state
  messageType
  playerId
  action or pose payload
  roomId
  nowMs optional

Output:
  result: CommandResult
  decision: PublishDecision
  nextState
  journal
  shouldBroadcast
  syncReason
  recoveryPayloadRequired
  shouldCommitVictory
  debugProjection
```

Rules:

```txt
PLAYER_UPDATE accepted changed -> publish resync
PLAYER_UPDATE unchanged/missing player -> skip or no-op with reason
TRY_INTERACT accepted changed -> publish resync
TRY_INTERACT rejected -> skip broadcast with reason
request-sync -> publish recovery/full-sync without pretending a mutation happened
toggle-ready/cancel/default -> skipped with explicit reason
victory -> publish victory and commit completion
```

## Fixture rows that must exist before GameCanvas consumption

```txt
local:pickup:accepted-publish
local:pickup:rejected-no-nearby-skip
local:drop:accepted-publish
local:drop:rejected-no-carried-cube-skip
local:place:accepted-publish
local:place:victory-publish-commit
local:place:rejected-too-far-skip
local:remove:accepted-publish
local:remove:rejected-wrong-slot-skip
host:player-update:accepted-publish
host:player-update:missing-player-skip
host:try-interact:accepted-publish
host:try-interact:rejected-skip
host:request-sync:recovery-publish
host:toggle-ready:skipped
host:cancel:skipped
host:unknown:skipped
runtime-debug:latest-command-result-projected
runtime-debug:journal-counts-projected
```

## Additive GameCanvas wire target

Only after the fixture passes, `GameCanvas.tsx` should change from:

```txt
nextState = applyNetworkInteractionRequest(...)
if nextState === currentGameState return
publishAuthoritativeState("resync")
```

to:

```txt
consumption = consumeLocalInteractionCommand(...)
currentGameState = consumption.nextState
projectRuntimeCommandDebug(consumption.debugProjection)
if consumption.shouldPublish publishAuthoritativeState(consumption.decision.syncReason)
if consumption.shouldCommitVictory commitVictory()
```

The host branch should follow the same pattern with `consumeHostCommand(...)`.

## Stop conditions

```txt
[ ] headless fixture proves local accepted/rejected/no-op/victory rows
[ ] headless fixture proves host accepted/rejected/recovery/skipped rows
[ ] runtime debug projection shape exists
[ ] GameCanvas source edit is still pending until the fixture passes
[ ] no PeerJS extraction
[ ] no renderer extraction
[ ] no minimap extraction
[ ] no new visual content
```

## Next safe ledge

```txt
HorrorCorridor GameCanvas Command Consumer Wire Map + Fixture Gate
```
