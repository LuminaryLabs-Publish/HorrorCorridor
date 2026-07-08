# HorrorCorridor Authority Loop Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Audit timestamp:** `2026-07-08T02:19:36-04:00`

## Player loop

```txt
start menu
-> solo / host / join
-> room and readiness state
-> seeded maze snapshot
-> first-person movement
-> cube interaction
-> anomaly sequence placement
-> ooze pressure
-> victory completion
```

## Gameplay domains

```txt
session-lifecycle
readiness-state
first-person-input
pointer-lock-control
player-view-angles
player-movement-integration
maze-collision-resolution
cube-carry-interaction
nearest-cube-selection
carried-cube-state
end-anomaly-distance-check
slot-assignment
ordered-sequence-validation
victory-completion
ooze-trail-navigation
ooze-decay
ooze-spawn
ooze-spacing-guard
ooze-max-cap
ooze-seeded-rng
host-authority
local-authoritative-simulation
remote-authoritative-ingress
replicated-snapshot-protocol
```

## Current command sources

```txt
local keyboard/mouse input
client PLAYER_UPDATE messages
client TRY_INTERACT messages
host/local ooze cadence
request-sync recovery messages
lobby toggle-ready and cancel messages
```

## Authority issue

Gameplay rules currently answer only one question:

```txt
what is the next GameState?
```

They do not answer these required authority questions:

```txt
was the command accepted, rejected, unchanged, publish-only, skipped, or victory-producing?
why did the command produce that result?
should the host publish a snapshot?
should the local client journal a rejection?
should the debug export show this command?
can a DOM-free replay prove the same final snapshot?
```

## Required gameplay result contract

```txt
CommandEnvelope
├─ commandId
├─ source: local | client | host | system
├─ playerId
├─ action
├─ payload
└─ createdAtTick

CommandResult
├─ command
├─ status: accepted | rejected | unchanged | publish-only | skipped | victory
├─ reason
├─ beforeTick
├─ afterTick
├─ changed
├─ state
├─ events
├─ diagnostics
└─ snapshotSummary

PublishDecision
├─ decision: publish | skip | recovery | victory | no-op
├─ reason
├─ publishSequence
└─ snapshot
```

## Required fixture lock

```txt
accepted pickup
rejected pickup
accepted drop
rejected drop
accepted place
rejected place too far
rejected place no free slot
accepted remove
rejected remove wrong slot
network player update
request-sync recovery
toggle-ready skipped
cancel skipped
unknown action skipped
ooze tick
victory completion
```

## Next gameplay action

Implement authority metadata without changing the game loop feel.

Players should not experience a route, movement, or renderer regression while the underlying command authority becomes replayable and inspectable.