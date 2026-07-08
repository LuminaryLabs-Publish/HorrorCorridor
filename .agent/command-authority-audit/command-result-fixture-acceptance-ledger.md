# HorrorCorridor Command Result Fixture Acceptance Ledger

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T06:28:31-04:00`

## Purpose

This ledger turns the next implementation target into an acceptance gate.

The next source pass should not start with rendering, PeerJS extraction, minimap extraction, scene dressing, or new content.

It should first prove that command authority can explain every accepted, rejected, unchanged, skipped, publish-only, and victory path without DOM, PeerJS, Three.js, pointer lock, browser audio, or live multiplayer.

## Source seams

```txt
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Current problem

```txt
interactionRules.ts returns GameState only.
networkRules.ts returns GameState only.
invalid branches often return unchanged state.
request-sync, toggle-ready, cancel, and default actions return state unchanged.
local authority uses state/object identity to decide publish behavior.
host authority can publish after TRY_INTERACT without a stable rejection reason.
runtime debug cannot project latest command result, publish decision, or fixture parity.
```

## Required contracts

```txt
CommandEnvelope
CommandStatus
CommandReason
CommandResult
PublishDecision
CommandJournal
FixtureParityReport
```

## Required reason families

```txt
accepted:pickup
accepted:drop
accepted:place
accepted:remove
accepted:player-update
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

## Fixture matrix

| Fixture id | Command path | Expected status | Expected publish decision | Required proof |
|---|---|---:|---:|---|
| `accepted-pickup-near-loose-cube` | pickup cube | accepted | publish | carried cube changes to player id |
| `rejected-pickup-already-carrying` | pickup cube | rejected | skip | reason is `rejected:already-carrying` |
| `rejected-pickup-no-nearby-cube` | pickup cube | rejected | skip | reason is `rejected:no-nearby-cube` |
| `accepted-drop-while-carrying` | drop cube | accepted | publish | held cube becomes loose and visible |
| `rejected-drop-no-carried-cube` | drop cube | rejected | skip | reason is `rejected:no-carried-cube` |
| `accepted-place-near-anomaly` | place cube | accepted | publish or victory | slot receives cube id |
| `rejected-place-too-far` | place cube | rejected | skip | reason is `rejected:too-far-from-anomaly` |
| `rejected-place-no-free-slot` | place cube | rejected | skip | reason is `rejected:no-free-slot` |
| `accepted-remove-last-slot` | remove cube | accepted | publish | last occupied slot clears and cube returns to player |
| `rejected-remove-wrong-slot` | remove cube | rejected | skip | reason is `rejected:wrong-slot` |
| `publish-only-request-sync` | request-sync | publish-only | recovery | recovery snapshot is classified, not mistaken for mutation |
| `skipped-toggle-ready` | toggle-ready | skipped | skip | reason is `skipped:toggle-ready-policy-not-implemented` |
| `skipped-cancel` | cancel | skipped | skip | reason is `skipped:cancel-policy-not-implemented` |
| `skipped-unknown-action` | default action | skipped | skip | reason is `skipped:unknown-action` |
| `accepted-player-update` | player update | accepted | publish | player pose changes and held cube syncs |
| `unchanged-player-update-missing-player` | player update | unchanged | skip | reason is `unchanged:player-missing` |
| `ooze-tick-classified` | ooze cadence | accepted or unchanged | publish or no-op | reason distinguishes spawn/decay/no-state-diff |
| `victory-ordered-sequence-complete` | final place cube | victory | victory | victory/completion state is explicit |

## Required fixture output

```txt
fixture id
command id
command source
command action
status
reason
changed flag
before tick
after tick
publish decision
publish reason
events
journal counts
final snapshot summary
volatile field normalization list
parity passed or failed
```

## Volatile fields allowed to normalize

```txt
timestampMs
room.updatedAtMs
runtime frame counters
randomized debug ids
network cadence ages
```

## Fields not allowed to normalize

```txt
command status
command reason
publish decision
sequence slot state
cube ownership
cube visibility
held cube state
player pose
victory state
final snapshot facts
```

## Implementation order

```txt
1. Add commandTypes.ts.
2. Add commandReasons.ts.
3. Add commandResults.ts.
4. Add publishDecisions.ts.
5. Add commandJournal.ts.
6. Add interactionPreflight.ts.
7. Add interactionResultRules.ts wrappers beside interactionRules.ts.
8. Add networkResultRules.ts wrappers beside networkRules.ts.
9. Preserve legacy GameState-returning exports by returning result.state.
10. Add script fixture that imports domain modules only.
11. Extend runtime debug projection after the fixture passes.
12. Wire GameCanvas consumers only after headless fixture output is stable.
```

## Stop line

The next implementation pass is complete when the fixture matrix can prove the command result gate headlessly.

Do not expand into renderer extraction, PeerJS extraction, minimap extraction, postprocess extraction, scene dressing, new route work, or new content in that same pass.
