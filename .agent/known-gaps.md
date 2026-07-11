# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T21-39-22-04-00`

## Selection state

```txt
full accessible LuminaryLabs-Publish list compared with central ledger
all nine eligible non-Cavalry repos tracked
root .agent state present for every eligible repo
TheCavalryOfRome excluded
HorrorCorridor selected as oldest eligible documented fallback
```

## Run-exit authority gaps

```txt
returnToLobby changes local UI only
no host-owned run-exit command exists
no typed exit accepted/rejected/no-change result exists
no exit request id or duplicate-result replay exists
no authority check separates host reset, client request, and solo exit
no room/game/session identity preflight exists for exit
no authoritative active/ending -> lobby transaction exists
no rollback result exists if teardown or projection fails
```

## Phase and state convergence gaps

```txt
RoomPhase defines idle/lobby/starting/active/ending/closed but exit paths do not use a reducer
returnToLobby leaves room.phase active or ending
runtimeStore retains the previous authoritativeSnapshot
sessionStore retains the previous room and roster without a new revision/epoch
UI screen can say lobby while replicated room/snapshot still say active or victory
client SYNC handling can force a locally returned client back to PLAYING
host can return locally while clients remain active
host ignores client PLAYER_UPDATE traffic after GameCanvas unmounts
```

## Solo re-entry gaps

```txt
returnToLobby maps every non-host mode to LOBBY_CLIENT
solo therefore returns to LOBBY_CLIENT
LOBBY_CLIENT primary action calls startPlay
startPlay routes every non-host mode to toggleReady
solo restart cannot cleanly create a new solo run from that path
cleanup patches networking true even for solo
no solo-specific lobby or restart authority exists
```

## Session identity and stale-message gaps

```txt
active messages use roomId but no run/session epoch
PLAYER_UPDATE has no game id or session epoch
TRY_INTERACT has no game id or session epoch
START_GAME has no monotonic session epoch
SYNC contains gameId only inside snapshot and has no exit/re-entry admission boundary
late old-run messages can cross into a new bootstrap
no accepted epoch ledger exists
no stale-epoch rejection result exists
no per-run message quarantine exists during ending/lobby transitions
```

## Runtime teardown proof gaps

```txt
GameCanvas cleanup calls loop.stop, unsubscribe, observer disconnect, listener removal, world.dispose, postProcessing.dispose, and renderer.dispose
no typed teardown result records which resources were actually released
no exactly-once disposal counters exist
no teardown epoch or runtime instance id exists
no proof that pointer lock is released before teardown completion
no proof that renderer canvas removal and GPU resource disposal are idempotent
no proof that repeated return/re-entry creates only one RAF and one listener set
runtime debug has no lifecycle/teardown rows
```

## Protocol gaps

```txt
no RUN_EXIT message
no RUN_EXIT_RESULT message
no SESSION_STATE message
LOBBY_EVENT state-reset is defined but has no producer
no canonical lifecycle compatibility adapter
no session epoch on existing active-game messages
no lifecycle reason vocabulary for pause-return, victory-restart, client-leave, host-reset, room-close, or title-exit
```

## Projection gaps

```txt
PauseMenu and CompleteScreen call local callbacks with no pending/accepted/rejected state
no host/client convergence indicator exists
no lifecycle transaction id is visible
no previous/current phase pair is exposed
no session epoch is visible
no stale-message rejection count is visible
no teardown result is visible
no restart blocked reason exists
```

## Missing source files

```txt
HorrorCorridor-V1/src/features/session/domain/runSessionTypes.ts
HorrorCorridor-V1/src/features/session/domain/sessionEpoch.ts
HorrorCorridor-V1/src/features/session/domain/runExitPolicy.ts
HorrorCorridor-V1/src/features/session/domain/sessionPhaseReducer.ts
HorrorCorridor-V1/src/features/session/domain/runtimeTeardownResult.ts
HorrorCorridor-V1/src/features/session/domain/sessionLifecycleLedger.ts
HorrorCorridor-V1/src/features/session/domain/sessionMessageAdmission.ts
HorrorCorridor-V1/src/features/session/domain/sessionFixtureSeeds.ts
HorrorCorridor-V1/src/features/session/domain/sessionFixtureRows.ts
HorrorCorridor-V1/src/features/debug/domain/sessionLifecycleDebugProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-session-lifecycle-fixture.mjs
```

## Validation gaps

```txt
package.json has no fixture:session-lifecycle script
no DOM-free active/ending/lobby transition replay
no solo restart routing proof
no host/client return-to-lobby convergence proof
no transport preserve-vs-destroy proof
no exactly-once runtime teardown proof
no stale old-epoch message rejection rows
no re-entry epoch increment proof
no runtime-debug lifecycle projection proof
no browser multi-peer lifecycle smoke contract
```

## Existing prerequisite gaps retained

```txt
lobby readiness/start admission authority is still missing
authoritative SYNC snapshot acceptance is still missing
request identity and acknowledgement are still missing
protocol source validation and monotonic snapshot projection are still missing
```

These are separate but ordered boundaries. Start admission should seal the initial roster/session identity. Run-exit authority should then own phase change, teardown, epoch advancement, and re-entry admission without being folded into render or interaction reducers.

## Deferred work

```txt
PeerJS extraction
renderer extraction
minimap extraction
post-processing extraction
route restructuring
new maze content
scene-dressing expansion
visual object-kit expansion
network cadence retuning
gameplay balance changes
```