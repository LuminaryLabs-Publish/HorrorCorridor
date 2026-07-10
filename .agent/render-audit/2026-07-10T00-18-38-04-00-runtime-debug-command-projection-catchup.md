# Render Audit: Runtime Debug Command Projection Catch-up

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T00-18-38-04-00`

## Render/debug surface today

`GameCanvas.tsx` records runtime debug frames from the same loop that updates the Three world, minimap, HUD, and authoritative snapshot.

`runtimeDebugStore.ts` exports:

```txt
enabled
overlayVisible
latestFrame
frames
events
```

Current frame data includes pose, input, snapshot summary, cubes, anomaly, cadence, and scene dressing.

## Projection gap

The debug export still does not expose command authority facts.

Missing fields:

```txt
latestCommandResult
latestPublishDecision
latestRejectionReason
latestConsumerAction
commandJournalCounters
latestFixtureParity
latestHostCommandOutcome
latestLocalCommandOutcome
```

## Why this matters

The visual/runtime loop can show where the player is and what the snapshot contains.

It cannot yet explain why a local interaction did nothing, why the host skipped or published, why request-sync recovered, or why victory committed.

## Next projection kit

```txt
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
```

Required projection rows:

```txt
accepted changed command -> publish decision
accepted unchanged command -> no-op decision
rejected command -> skip decision and reason
request-sync -> recovery publish-only decision
toggle-ready/cancel -> skipped decision
unknown action -> skipped unknown-action decision
victory -> victory publish decision
fixture parity -> latest passing/failing row summary
```

## Deferrals

```txt
renderer extraction
post-processing changes
minimap extraction
scene dressing changes
object-kit visual expansion
HUD redesign
```
