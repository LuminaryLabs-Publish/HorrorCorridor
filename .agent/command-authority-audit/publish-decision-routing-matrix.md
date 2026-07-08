# HorrorCorridor Publish Decision Routing Matrix

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T07:01:54-04:00`

## Purpose

This matrix narrows the next command-authority source pass.

The prior acceptance ledger defines the command-result fixture gate. This file defines exactly how each result should route through local authority, host authority, request-sync recovery, runtime debug, and fixture replay.

The next implementation should not change visuals, routes, PeerJS topology, minimap, post-processing, level content, or object kits before this matrix is source-backed.

## Source evidence inspected

```txt
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
.agent/command-authority-audit/command-result-fixture-acceptance-ledger.md
.agent/current-audit.md
.agent/next-steps.md
.agent/validation.md
```

## Current source behavior

```txt
interactionRules.ts:
  pickUpCube(state, input) -> GameState
  dropCube(state, input) -> GameState
  placeCubeAtEndAnomaly(state, input) -> GameState
  removeCubeFromEndAnomaly(state, input) -> GameState

networkRules.ts:
  applyNetworkPlayerUpdate(state, input) -> GameState
  applyNetworkInteractionRequest(state, input) -> GameState
```

Silent return sites that need reason metadata:

```txt
not playing
missing player
already carrying
no carried cube
no nearby cube
missing anomaly cell
too far from anomaly
no free anomaly slot
no occupied anomaly slot
wrong requested slot
missing cube id
held cube already synced
request-sync
toggle-ready
cancel
unknown network action
```

## Required result-to-publish routing

| Result status | Required publish decision | Local authority behavior | Host authority behavior | Debug projection | Fixture proof |
|---|---|---|---|---|---|
| `accepted` with `changed=true` | `publish` | update state and publish snapshot | update state and publish snapshot | latest command + publish reason | final snapshot differs only in intended fields |
| `accepted` with `changed=false` | `no-op` | journal but skip publish | journal but skip publish | latest command + no-op reason | before/after stable |
| `rejected` | `skip` | journal rejection, no publish | journal rejection, no publish for TRY_INTERACT | latest rejection reason | state identity or stable snapshot equality |
| `unchanged` | `skip` | journal unchanged reason | journal unchanged reason | latest unchanged reason | no state mutation |
| `publish-only` | `recovery` | usually unused locally | publish recovery/full-sync snapshot | latest recovery reason | snapshot exists even without mutation |
| `skipped` | `skip` | journal policy skip | journal policy skip | latest skipped reason | state unchanged |
| `victory` | `victory` | update state, publish, show completion | update state, publish, show completion | victory result + sequence summary | ordered sequence complete |

## Interaction command routing

| Command path | Accepted decision | Rejected decision | Required source seam |
|---|---|---|---|
| pickup cube | `publish` | `skip` | `pickUpCubeResult()` beside `pickUpCube()` |
| drop cube | `publish` | `skip` | `dropCubeResult()` beside `dropCube()` |
| place cube | `publish` or `victory` | `skip` | `placeCubeAtEndAnomalyResult()` beside `placeCubeAtEndAnomaly()` |
| remove cube | `publish` | `skip` | `removeCubeFromEndAnomalyResult()` beside `removeCubeFromEndAnomaly()` |

## Network command routing

| Network action | Required status | Required publish decision | Notes |
|---|---|---|---|
| `pickup-cube` | accepted or rejected | publish or skip | delegate to pickup result wrapper |
| `drop-cube` | accepted or rejected | publish or skip | delegate to drop result wrapper |
| `place-cube-at-anomaly` | accepted, rejected, or victory | publish, skip, or victory | ordered sequence completion must become explicit |
| `remove-cube-from-anomaly` | accepted or rejected | publish or skip | wrong-slot must be explicit |
| `request-sync` | publish-only | recovery | no state mutation, but host should send recovery snapshot |
| `toggle-ready` | skipped | skip | policy not implemented in current runtime |
| `cancel` | skipped | skip | policy not implemented in current runtime |
| default action | skipped | skip | unknown action must not collapse into generic unchanged state |

## Minimal implementation boundary

```txt
1. Add pure command result types.
2. Add reason constants.
3. Add publish decision helper.
4. Add result-returning wrappers beside current rule functions.
5. Preserve existing GameState-returning exports by returning result.state.
6. Add a command journal projection.
7. Add a DOM-free fixture that proves this routing matrix.
8. Only after fixture proof, let GameCanvas and runtimeDebugStore consume the result metadata.
```

## Fixture ids required by this matrix

```txt
accepted-pickup-near-loose-cube
rejected-pickup-already-carrying
rejected-pickup-no-nearby-cube
accepted-drop-while-carrying
rejected-drop-no-carried-cube
accepted-place-near-anomaly
rejected-place-too-far
rejected-place-no-free-slot
accepted-place-final-slot-victory
accepted-remove-last-slot
rejected-remove-wrong-slot
publish-only-request-sync-recovery
skipped-toggle-ready
skipped-cancel
skipped-unknown-action
accepted-player-update
unchanged-player-update-missing-player
unchanged-held-cube-already-synced
ooze-tick-spawn
ooze-tick-decay
ooze-tick-no-state-diff
```

## Stop line

Stop when the fixture matrix can prove result status, reason, changed flag, publish decision, journal counts, and final snapshot parity for the cases above.

Do not continue into renderer extraction, PeerJS extraction, minimap extraction, post-processing, scene dressing, object-kit visuals, or content expansion in the same pass.
