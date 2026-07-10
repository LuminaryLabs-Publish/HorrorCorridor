# Interaction Audit: No-op Rejection Reason Map

## Current silent branches

`interactionRules.ts` returns unchanged state for many different reasons:

```txt
not playing
missing player
already carrying while pickup
no nearby cube
not carrying while drop
missing end anomaly
too far from anomaly
no free slot
wrong slot
empty slot
missing cube
```

`networkRules.ts`, `oozeRules.ts`, and `winRules.ts` add more unchanged or implicit branches:

```txt
missing player update target
held cube already synced
request-sync
toggle-ready
cancel
unknown action
ooze decay interval not reached
ooze spacing guard
ooze max reached
sequence not complete
victory rollback
```

## Needed reason catalog

```txt
interaction:not-playing
interaction:missing-player
interaction:already-carrying
interaction:no-nearby-cube
interaction:not-carrying
interaction:missing-anomaly
interaction:too-far-from-anomaly
interaction:no-free-slot
interaction:wrong-slot
interaction:empty-slot
interaction:missing-cube
network:missing-player
network:held-cube-already-synced
network:request-sync-publish-only
network:toggle-ready-skipped
network:cancel-skipped
network:unknown-action
 ooze:decay-interval-not-reached
ooze:spacing-guard
ooze:max-reached
win:sequence-incomplete
win:victory-complete
win:victory-rollback
```

## Fixture rule

Each reason should have at least one deterministic fixture row before GameCanvas consumes command results.
