# HorrorCorridor Command Result Source Wire Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T11:09:38-04:00`

## Purpose

Convert the documented command-result fixture boundary into a source wire map with exact files, contracts, wrapper order, and stop lines for the next implementation pass.

## Current source seam

```txt
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
  pickUpCube(state, input) -> GameState
  dropCube(state, input) -> GameState
  placeCubeAtEndAnomaly(state, input) -> GameState
  removeCubeFromEndAnomaly(state, input) -> GameState

HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
  syncHeldCubesToPlayers(state) -> GameState
  applyNetworkPlayerUpdate(state, input) -> GameState
  applyNetworkInteractionRequest(state, input) -> GameState

HorrorCorridor-V1/src/components/game/GameCanvas.tsx
  local applyInteraction() derives action
  local authority checks nextState === currentGameState
  host handler applies TRY_INTERACT then publishes resync or recovery
  render/debug loop records frames but not command result metadata
```

## Source files to add

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Source files to edit after headless fixture exists

```txt
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/package.json
```

## Step 1: commandTypes.ts

Define these pure TypeScript contracts:

```ts
type CommandSource = "local" | "host" | "client" | "fixture";
type CommandStatus = "accepted" | "rejected" | "unchanged" | "publish-only" | "skipped" | "victory";
type PublishDecisionKind = "publish" | "skip" | "recovery" | "no-op" | "victory";

type CommandEnvelope = Readonly<{
  id: string;
  source: CommandSource;
  type: string;
  playerId?: string;
  cubeId?: string;
  slotId?: string;
  issuedAtMs?: number;
}>;

type CommandSnapshotSummary = Readonly<{
  tick: number;
  gameState: string;
  cubeHeldCount: number;
  cubePlacedCount: number;
  slotsFilled: number;
  oozeCount: number;
}>;

type CommandResult = Readonly<{
  envelope: CommandEnvelope;
  status: CommandStatus;
  reason: string;
  state: GameState;
  before: CommandSnapshotSummary;
  after: CommandSnapshotSummary;
  changed: boolean;
  events: readonly CommandEvent[];
  diagnostics: Record<string, unknown>;
}>;

type PublishDecision = Readonly<{
  decision: PublishDecisionKind;
  reason: string;
  shouldBroadcast: boolean;
  shouldCommitVictory: boolean;
  snapshotReason: "initial" | "join" | "resync" | "reconnect" | "recovery";
}>;
```

## Step 2: commandReasons.ts

Reason values must be stable string constants.

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

## Step 3: commandResults.ts

Add constructors:

```txt
createCommandEnvelope(input)
createCommandSnapshotSummary(state)
createAcceptedResult(envelope, beforeState, afterState, reason, events?, diagnostics?)
createRejectedResult(envelope, state, reason, diagnostics?)
createUnchangedResult(envelope, state, reason, diagnostics?)
createPublishOnlyResult(envelope, state, reason, diagnostics?)
createSkippedResult(envelope, state, reason, diagnostics?)
createVictoryResult(envelope, beforeState, afterState, reason, events?, diagnostics?)
```

Rules:

```txt
- changed should be true only when afterState !== beforeState or explicit changed override is passed.
- before/after summaries should be deterministic and small.
- constructors must not touch DOM, React, PeerJS, canvas, or Three.js.
- legacy functions should continue to return result.state.
```

## Step 4: publishDecisions.ts

Map command result to publish behavior:

```txt
accepted + changed -> publish / resync / shouldBroadcast true
accepted + unchanged -> no-op / resync / shouldBroadcast false
rejected -> skip / resync / shouldBroadcast false
unchanged -> skip or no-op / resync / shouldBroadcast false
publish-only -> recovery / recovery / shouldBroadcast true
skipped -> skip / resync / shouldBroadcast false
victory -> victory / resync / shouldBroadcast true / shouldCommitVictory true
```

## Step 5: commandJournal.ts

Expose:

```txt
createCommandJournal()
appendCommandResult(journal, result, decision?)
summarizeCommandJournal(journal)
getLatestCommandResult(journal)
getLatestPublishDecision(journal)
```

Minimum summary:

```txt
acceptedCount
rejectedCount
unchangedCount
publishOnlyCount
skippedCount
victoryCount
lastReason
lastDecision
```

## Step 6: interactionPreflight.ts

Move the current silent branch checks into named preflight helpers.

```txt
preflightPickup(state, input)
preflightDrop(state, input)
preflightPlace(state, input)
preflightRemove(state, input)
```

Each helper should return:

```txt
{ ok: true, player, carriedCube?, targetCube?, anomalyCell?, targetSlot? }
{ ok: false, reason, diagnostics }
```

## Step 7: interactionResultRules.ts

Add result-returning wrappers beside current interaction rules.

```txt
pickUpCubeResult(state, input, envelope?) -> CommandResult
dropCubeResult(state, input, envelope?) -> CommandResult
placeCubeAtEndAnomalyResult(state, input, envelope?) -> CommandResult
removeCubeFromEndAnomalyResult(state, input, envelope?) -> CommandResult
```

Then keep compatibility wrappers stable:

```txt
pickUpCube(state, input) -> pickUpCubeResult(...).state
dropCube(state, input) -> dropCubeResult(...).state
placeCubeAtEndAnomaly(state, input) -> placeCubeAtEndAnomalyResult(...).state
removeCubeFromEndAnomaly(state, input) -> removeCubeFromEndAnomalyResult(...).state
```

Do not change current gameplay output in this step.

## Step 8: networkResultRules.ts

Add result-returning network wrappers.

```txt
syncHeldCubesToPlayersResult(state, envelope?) -> CommandResult
applyNetworkPlayerUpdateResult(state, input, envelope?) -> CommandResult
applyNetworkInteractionRequestResult(state, input, envelope?) -> CommandResult
```

Rules:

```txt
- request-sync returns publish-only:request-sync.
- toggle-ready returns skipped:toggle-ready-policy-not-implemented.
- cancel returns skipped:cancel-policy-not-implemented.
- unknown/default returns skipped:unknown-action.
- compatibility exports in networkRules.ts keep returning result.state.
```

## Step 9: headless fixture

Add:

```txt
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

Fixture constraints:

```txt
- no DOM
- no React
- no PeerJS
- no Three.js
- no canvas
- no browser globals
- no Next route boot
```

Fixture rows:

```txt
accepted pickup near loose cube
rejected pickup while already carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly with carried cube
accepted place final anomaly slot as victory
rejected place too far from anomaly
rejected place with no free slot
accepted remove last anomaly cube
rejected remove wrong slot
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged player update for missing player
accepted held cube sync
unchanged held cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
victory ordered-sequence completion
```

Output shape:

```txt
fixtureId
commandId
commandSource
commandType
status
reason
changed
publishDecision
beforeSummary
afterSummary
journalCounts
volatileFieldsNormalized
passed
```

## Step 10: runtime debug projection

After the fixture passes, extend debug with:

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
commandJournalCounts
latestFixtureParity
```

## Step 11: GameCanvas consumer wiring

Only after fixture passes:

```txt
- local applyInteraction consumes applyNetworkInteractionRequestResult.
- host TRY_INTERACT consumes applyNetworkInteractionRequestResult.
- request-sync publishes recovery through publish decision metadata.
- rejected TRY_INTERACT skips host broadcast.
- accepted changed/victory publishes.
- rejected/skipped/no-op commands are journaled and visible in debug.
```

## Validation order

```txt
node scripts/horror-corridor-command-fixture.mjs
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
npm run review:object-kit
```

## Stop line

Do not extract renderer, minimap, PeerJS, session lobby policy, object kits, texture kits, or new visual content until the command-result fixture passes and runtime debug can show command outcomes.
