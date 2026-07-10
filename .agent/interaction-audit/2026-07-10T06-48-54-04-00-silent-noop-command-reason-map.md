# Interaction Audit — Silent No-op Command Reason Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T06-48-54-04-00`

## Why this map exists

Many live rule paths return the original `GameState`. The user experience can remain unchanged, but the repo needs proof rows that say whether that unchanged state was rejected, skipped, no-op, recovery, or expected unchanged sync.

## Silent branches to classify

```txt
interactionRules.ts
  pickup while not playing -> rejected:not-playing
  pickup missing player -> rejected:missing-player
  pickup already carrying -> rejected:already-carrying
  pickup no nearby cube -> rejected:no-nearby-cube
  drop without carried cube -> rejected:no-carried-cube
  place no anomaly -> rejected:no-anomaly
  place too far -> rejected:too-far-from-anomaly
  place no free slot -> rejected:no-free-slot
  remove wrong slot or no occupied slot -> rejected:wrong-slot

networkRules.ts
  missing player update -> noop:missing-player-update
  request-sync -> publish-only:request-sync-recovery
  toggle-ready -> skipped:toggle-ready-in-game
  cancel -> skipped:cancel-in-game
  default -> skipped:unknown-action
  held cubes already synced -> noop:held-cube-already-synced

oozeRules.ts
  no decay interval -> ooze:no-decay-window
  no spawn gap -> ooze:no-spawn-spacing
  max ooze reached -> ooze:max-ooze

winRules.ts
  no slot change -> noop:sequence-unchanged
  ordered sequence complete -> victory:sequence-complete
  invalid after victory -> victory:rollback-invalid-sequence
```

## Fixture expectations

Every row should include:

```txt
command source
action
before summary
after summary
status
reason
changed boolean
publish decision
journal count delta
legacy state compatibility
```

## Browser adapter implication

`GameCanvas` should not infer command success from object identity long term. It should consume `PublishDecision` once result wrappers and the DOM-free fixture pass.
