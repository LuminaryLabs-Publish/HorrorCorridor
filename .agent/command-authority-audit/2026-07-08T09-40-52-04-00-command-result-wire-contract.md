# HorrorCorridor Command Result Wire Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T09:40:52-04:00`

## Why this exists

The previous source-edit queue says what to implement.

This wire contract says what shape the implementation needs to expose so every command can be fixture-read, journaled, and safely consumed by local authority, host authority, runtime debug, and future external GameHost diagnostics.

## Current source seam

```txt
interactionRules.ts
  pickUpCube(state, input) -> GameState
  dropCube(state, input) -> GameState
  placeCubeAtEndAnomaly(state, input) -> GameState
  removeCubeFromEndAnomaly(state, input) -> GameState

networkRules.ts
  syncHeldCubesToPlayers(state) -> GameState
  applyNetworkPlayerUpdate(state, input) -> GameState
  applyNetworkInteractionRequest(state, input) -> GameState

GameCanvas.tsx
  local applyInteraction() derives action
  local authority checks nextState === currentGameState
  host handler applies request and publishes resync
  request-sync is recovered through publishAuthoritativeState("recovery")
```

## Target command envelope

```ts
type CommandEnvelope = Readonly<{
  id: string;
  source: "local" | "host" | "client" | "fixture";
  type:
    | "pickup-cube"
    | "drop-cube"
    | "place-cube-at-anomaly"
    | "remove-cube-from-anomaly"
    | "player-update"
    | "held-cube-sync"
    | "ooze-tick"
    | "request-sync"
    | "toggle-ready"
    | "cancel"
    | "unknown";
  playerId?: string;
  cubeId?: string;
  slotId?: string;
  issuedAtMs?: number;
}>;
```

## Target command result

```ts
type CommandResult = Readonly<{
  envelope: CommandEnvelope;
  status: "accepted" | "rejected" | "unchanged" | "publish-only" | "skipped" | "victory";
  reason: string;
  state: GameState;
  before: CommandSnapshotSummary;
  after: CommandSnapshotSummary;
  changed: boolean;
  events: readonly CommandEvent[];
  diagnostics: Record<string, unknown>;
}>;
```

## Target publish decision

```ts
type PublishDecision = Readonly<{
  decision: "publish" | "skip" | "recovery" | "no-op" | "victory";
  reason: string;
  shouldBroadcast: boolean;
  shouldCommitVictory: boolean;
  snapshotReason: "initial" | "join" | "resync" | "reconnect" | "recovery";
}>;
```

## Required result classes

```txt
accepted:
  - changed command should publish
  - unchanged accepted command should no-op

rejected:
  - invalid interaction should skip publish and preserve state

unchanged:
  - no diff helper command should preserve state and skip/no-op

publish-only:
  - request-sync should publish recovery without mutating game state

skipped:
  - toggle-ready, cancel, and unknown commands should skip until policy exists

victory:
  - ordered sequence completion should publish and commit victory UI
```

## Wrapper contract

```txt
Existing exports remain compatibility wrappers.

New result exports should be introduced beside them:

pickUpCubeResult(state, input, envelope?) -> CommandResult
pickUpCube(state, input) -> pickUpCubeResult(...).state

dropCubeResult(state, input, envelope?) -> CommandResult
dropCube(state, input) -> dropCubeResult(...).state

placeCubeAtEndAnomalyResult(state, input, envelope?) -> CommandResult
placeCubeAtEndAnomaly(state, input) -> placeCubeAtEndAnomalyResult(...).state

removeCubeFromEndAnomalyResult(state, input, envelope?) -> CommandResult
removeCubeFromEndAnomaly(state, input) -> removeCubeFromEndAnomalyResult(...).state

applyNetworkInteractionRequestResult(state, input, envelope?) -> CommandResult
applyNetworkInteractionRequest(state, input) -> applyNetworkInteractionRequestResult(...).state
```

## Runtime debug projection

After the fixture passes, runtime debug frames should expose:

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
commandJournalCounts
latestFixtureParity
```

## DOM-free fixture rule

The fixture must not import `GameCanvas.tsx`, React, DOM, Three.js, PeerJS, canvas, or browser globals.

Allowed dependencies:

```txt
gameTypes.ts
interactionRules.ts
interactionResultRules.ts
networkRules.ts
networkResultRules.ts
commandTypes.ts
commandReasons.ts
commandResults.ts
publishDecisions.ts
commandJournal.ts
winRules.ts
oozeRules.ts
snapshot builders or minimal test builders
```

## Fixture acceptance output

```txt
fixture id
command type
command source
status
reason
changed flag
publish decision
before summary
after summary
journal counts
volatile normalized fields
pass/fail
```

## Stop line

Do not wire `GameCanvas.tsx` to the new publish decision helper until the headless fixture proves the wrappers preserve legacy state output and classify every accepted/rejected/unchanged/publish-only/skipped/victory case.