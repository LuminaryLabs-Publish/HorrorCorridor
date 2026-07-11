# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T23-30-13-04-00`

## Goal

Establish one authoritative run/session identity first, then make pause and resume explicit command/result transactions that suspend simulation, interaction, and input coherently across solo, host, and client modes.

## Ordered build slices

```txt
1. HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
2. HorrorCorridor Run Exit Authority + Session Epoch Re-entry Fixture Gate
3. HorrorCorridor Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Current source slice

```txt
HorrorCorridor Run Exit Authority + Session Epoch Re-entry Fixture Gate
```

### Plan ledger

```txt
[ ] Preserve current maze generation, movement, interaction, rendering, minimap, HUD, post-processing, and visual output.
[ ] Complete or reuse lobby readiness/start admission and its sealed roster contract.
[ ] Define RunSessionId and monotonic sessionEpoch.
[ ] Add sessionEpoch to START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, and lifecycle messages.
[ ] Define typed run-exit command/result and stable reasons.
[ ] Make the host the multiplayer run-exit authority and define explicit solo exit authority.
[ ] Publish one authoritative lifecycle state after accepted exit.
[ ] Clear/archive snapshots only after a terminal exit result.
[ ] Preserve transport for lobby return and destroy it for title/room close.
[ ] Add idempotent runtime teardown results.
[ ] Reject stale old-epoch messages after re-entry.
[ ] Add JSON-safe lifecycle command/result/debug rows.
[ ] Add fixture:session-lifecycle.
[ ] Prove solo restart, host/client lobby convergence, transport policy, teardown, and stale-message rejection.
```

## Dependent pause/resume slice

```txt
HorrorCorridor Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

### Plan ledger

```txt
[ ] Reuse RunSessionId, sessionEpoch, request ids, result status, and reason conventions from lifecycle work.
[ ] Define PauseCommand with actor, role, room, game, epoch, desired state, scope, reason, and request id.
[ ] Define PauseResult with accepted/rejected/no-change status and monotonic pauseRevision.
[ ] Define explicit solo, host-global, client-local-overlay, client-global-request, and connection/system policies.
[ ] Make simulation admission independent from local UI screen strings.
[ ] Make interaction admission consume the resolved pause policy.
[ ] Stop host remote PLAYER_UPDATE and TRY_INTERACT mutation during accepted global pause.
[ ] Prevent normal active SYNC from silently clearing client-local overlay pause.
[ ] Publish authoritative paused/resumed state for host-global policy.
[ ] Clear movement, sprint, interact, and look-delta state on accepted pause.
[ ] Require fresh input edges after resume.
[ ] Correlate pointer-lock loss, blur, expected release, and capture failure with command/result rows.
[ ] Project UI pause, screen, game screen, overlay, readiness, input suspension, pointer-lock expectation, and replicated game state atomically.
[ ] Add bounded pause command/result/convergence ledgers.
[ ] Add JSON-safe pause debug projection.
[ ] Add deterministic fixture seeds and rows.
[ ] Add package script fixture:pause-convergence.
[ ] Prove solo pause/resume, host-global pause, client-local overlay pause, duplicate replay, stale epoch rejection, input clearing, and frame projection parity.
[ ] Run browser pause smoke only after the DOM-free fixture passes.
```

## Suggested source order

```txt
1. features/session/domain run identity and epoch work
2. features/pause/domain/pauseTypes.ts
3. features/pause/domain/pausePolicy.ts
4. features/pause/domain/pauseReducer.ts
5. features/pause/domain/simulationAdmission.ts
6. features/pause/domain/inputSuspension.ts
7. features/pause/domain/pauseLedger.ts
8. features/pause/domain/pauseFixtureSeeds.ts
9. features/pause/domain/pauseFixtureRows.ts
10. features/debug/domain/pauseDebugProjection.ts
11. scripts/horror-corridor-pause-convergence-fixture.mjs
12. package.json fixture:pause-convergence
13. protocol additive pause request/result/session-state support
14. GameCanvas simulation, interaction, input, pointer-lock, and transport adapters
15. GameShell SYNC and pause/resume projection adapter
16. PauseMenu pending/result presentation
```

## Required pause fixture rows

```txt
solo playing -> paused accepted
solo paused -> playing accepted
solo repeated pause returns no-change
solo pause stops movement, interaction, and ooze
host global pause accepted and published
host paused rejects remote PLAYER_UPDATE mutation
host paused rejects remote TRY_INTERACT mutation
host resume accepted and published
client local-overlay pause is not overwritten by active SYNC
client local pause stops prediction and outbound gameplay commands
client local resume accepted
wrong role/room/game/epoch/revision rejected
duplicate request replays one result
movement and interact flags clear on pause
look deltas clear on pause
resume begins with neutral input
unexpected pointer-lock loss emits one command
blur plus pointer-lock loss deduplicates
first paused and first resumed frames reference terminal results
all rows remain JSON-safe
```

## Acceptance checks

```txt
[ ] npm run fixture:session-lifecycle
[ ] npm run fixture:pause-convergence
[ ] npm run lint
[ ] npm run smoke:protokits
[ ] npm run harness:horror-corridor
[ ] npm run build
[ ] npm run validate:live-player:dev
[ ] npm run review:object-kit
[ ] browser solo Escape/pointer-lock pause smoke
[ ] browser host-global pause with client smoke
[ ] browser client-local overlay pause smoke
[ ] browser held-input pause/resume smoke
[ ] runtime-debug pause export inspection
```

## Explicit non-goals

```txt
renderer replacement
PeerJS extraction
minimap extraction
post-processing extraction
new maze content
scene-dressing expansion
visual object-kit expansion
network cadence retuning
gameplay balance changes
pause menu visual redesign
host migration
```