# HorrorCorridor Render Audit: Runtime Debug Outcome Projection Gap

**Timestamp:** `2026-07-10T13-58-16-04-00`

## Render surface

The visual route already has a complete consumer chain:

```txt
authoritative GameState snapshot
  -> Three.js maze/cube/player/anomaly world
  -> post-processing
  -> minimap
  -> HUD and completion state
  -> runtime debug frame/event export
```

## What is working

```txt
- the renderer can consume the current authoritative snapshot.
- the minimap can project player and object markers.
- HUD and completion routing can read game state.
- runtime debug can retain frame and event observations.
```

## Missing readback

The render/debug surface cannot attribute state to the command that produced it.

```txt
latestCommandResult: missing
latestCommandReason: missing
latestPublishDecision: missing
latestConsumerAction: missing
commandJournalCounts: missing
latestFixtureParity: missing
```

That means a visually unchanged frame cannot distinguish:

```txt
rejected interaction
skipped command
accepted no-op
recovery-only publication
publish-only synchronization
unchanged ooze cadence
victory rollback
transport duplication
```

## Required additive projection

```txt
RuntimeDebugCommandProjection {
  commandId
  source
  kind
  status
  reason
  changed
  eventTypes
  publishDecision
  consumerAction
  journalSequence
  journalCounts
  fixtureParity
}
```

The projection should be JSON-safe and additive. Existing frame/event fields must remain stable.

## Render gate

Do not change visual output to solve this gap. First prove the command/result rows headlessly, then expose them through runtime debug. Renderer, minimap, HUD, or overlay changes should consume the additive projection only after the fixture passes.

## Deferred render work

```txt
renderer extraction
post-processing extraction
minimap extraction
new materials
new scene dressing
new visual object kits
visual fidelity expansion
```
