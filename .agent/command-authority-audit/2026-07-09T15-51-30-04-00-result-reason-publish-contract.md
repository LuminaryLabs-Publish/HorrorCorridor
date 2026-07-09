# HorrorCorridor Command Authority Audit: Result Reason Publish Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T15-51-30-04-00`

## Current blocker

`interactionRules.ts` and `networkRules.ts` return `GameState` only. They preserve legacy playability, but they do not expose command status, reason, publish policy, or debug-safe result metadata.

## Current silent branches

```txt
interactionRules.ts
  -> not playing returns original state
  -> missing player returns original state
  -> already carrying returns original state
  -> no nearby cube returns original state
  -> no carried cube returns original state
  -> missing anomaly cell returns original state
  -> too far from anomaly returns original state
  -> no free slot returns original state
  -> no occupied slot returns original state
  -> wrong slot returns original state
  -> missing cube id returns original state

networkRules.ts
  -> missing player update returns original state
  -> held cube already synced returns original state
  -> request-sync returns original state
  -> toggle-ready returns original state
  -> cancel returns original state
  -> default returns original state
```

## Required reason catalog

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

## Required result envelope

```txt
type CommandResult = {
  command: CommandEnvelope;
  status: "accepted" | "rejected" | "unchanged" | "skipped" | "publish-only" | "victory";
  reason: CommandReason;
  changed: boolean;
  before: CommandSnapshotSummary;
  after: CommandSnapshotSummary;
  state: GameState;
  events: CommandEvent[];
  diagnostics: Record<string, unknown>;
};
```

## Required publish decision

```txt
type PublishDecision = {
  decision: "publish" | "skip" | "no-op" | "recovery" | "victory";
  snapshotReason: "resync" | "recovery" | "initial" | "join" | "reconnect";
  shouldBroadcast: boolean;
  shouldCommitVictory: boolean;
  shouldJournal: boolean;
};
```

## Legacy compatibility rule

Keep the existing exported functions working:

```txt
pickUpCube(...): GameState
dropCube(...): GameState
placeCubeAtEndAnomaly(...): GameState
removeCubeFromEndAnomaly(...): GameState
applyNetworkPlayerUpdate(...): GameState
applyNetworkInteractionRequest(...): GameState
syncHeldCubesToPlayers(...): GameState
```

Add result-returning wrappers beside them and make legacy functions return `result.state` only after fixture proof.

## Consumer rule

`GameCanvas.tsx` should not inspect `nextState === currentGameState` after the result seam exists. It should consume `PublishDecision` from the local or host authority consumer.

## Fixture rule

No GameCanvas splice should happen until `scripts/horror-corridor-command-fixture.mjs` proves accepted, rejected, unchanged, skipped, publish-only, and victory rows.
