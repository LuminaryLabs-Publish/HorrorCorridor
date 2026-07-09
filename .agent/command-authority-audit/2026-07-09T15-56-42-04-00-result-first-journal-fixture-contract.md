# HorrorCorridor Command Authority Audit: Result First Journal Fixture Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T15-56-42-04-00`

## Current blocker

`interactionRules.ts` and `networkRules.ts` return `GameState` only. They preserve legacy playability, but they do not expose command status, reason, publish policy, or debug-safe result metadata.

## Current silent branches

```txt
interactionRules.ts:
- not playing
- missing player
- already carrying
- no nearby cube
- no carried cube
- missing anomaly cell
- too far from anomaly
- no free slot
- no occupied slot
- wrong slot
- missing cube id

networkRules.ts:
- missing player update
- held cube already synced
- request-sync
- toggle-ready
- cancel
- default/unknown action
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
CommandResult
  -> command
  -> status
  -> reason
  -> changed
  -> before summary
  -> after summary
  -> state
  -> events
  -> diagnostics
```

## Required publish decision

```txt
PublishDecision
  -> publish | skip | no-op | recovery | victory
  -> snapshotReason
  -> shouldBroadcast
  -> shouldCommitVictory
  -> shouldJournal
```

## Journal contract

The command journal must summarize:

```txt
total commands
accepted count
rejected count
unchanged count
skipped count
publish-only count
victory count
latest reason
latest publish decision
latest consumer action
```

## Legacy compatibility rule

Keep the existing exported GameState-returning functions working. Add result-returning wrappers beside them and make legacy functions return `result.state` only after fixture proof.

## Fixture rule

No GameCanvas splice should happen until `scripts/horror-corridor-command-fixture.mjs` proves accepted, rejected, unchanged, skipped, publish-only, and victory rows.
