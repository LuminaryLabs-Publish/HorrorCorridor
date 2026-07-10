# HorrorCorridor Interaction Audit: Silent No-op Reason Ledger

**Timestamp:** `2026-07-10T03-49-48-04-00`

## Current silent no-op sources

```txt
interactionRules.ts
  -> not playing
  -> missing player
  -> already carrying
  -> no carried cube
  -> no nearby cube
  -> too far from anomaly
  -> no free slot
  -> wrong remove slot
  -> no occupied slot
  -> missing cube or slot during update

networkRules.ts
  -> missing player update target
  -> held cube already synced
  -> request-sync returns unchanged state
  -> toggle-ready returns unchanged state
  -> cancel returns unchanged state
  -> default action returns unchanged state

oozeRules.ts
  -> decay window has not elapsed
  -> ooze spacing prevents spawn
  -> max ooze prevents spawn
  -> decay/spawn can produce equivalent state

winRules.ts
  -> sequence incomplete
  -> slot evaluation updates only unlock/solved facts
  -> victory rollback when slots become invalid
```

## Required ledger fields

```txt
commandId
source
action
playerId
status
reason
changed
consumer: local | host | fixture | cadence
publishDecision
beforeSummary
afterSummary
```

## Why this matters

`GameCanvas.tsx` currently treats unchanged object identity as the proof that nothing should publish. That is too little information for debugging host/client interactions because rejected input, lobby-only control messages, missing players, and already-synced state all look the same.

## Next fixture rows

```txt
local rejected no publish
host rejected TRY_INTERACT no broadcast
host request-sync recovery publish
host toggle-ready skipped until lobby policy exists
host cancel skipped until lobby policy exists
unknown action skipped
unchanged player update no broadcast after fixture decision
held cube already synced no broadcast after fixture decision
```
