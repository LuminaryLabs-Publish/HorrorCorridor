# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T23-30-13-04-00`

## Selection state

```txt
full accessible LuminaryLabs-Publish list compared with central ledger
all nine eligible non-Cavalry repos tracked
root .agent state present for every eligible repo
TheCavalryOfRome excluded
HorrorCorridor selected as oldest eligible documented fallback
```

## Existing lifecycle gaps retained

```txt
lobby readiness is local instead of host-authoritative
host start admission does not require a sealed connected/ready roster
returnToLobby changes local UI only
room phase and authoritative snapshot remain active or ending after local exit
no run-exit command/result or lifecycle publication exists
no monotonic session epoch exists
late PLAYER_UPDATE, TRY_INTERACT, START_GAME, or SYNC can cross a run boundary
solo return routes through LOBBY_CLIENT and cannot cleanly restart
runtime teardown has no exactly-once result ledger
```

## Pause authority gaps

```txt
uiStore pause is local presentation state only
no PauseCommand or PauseResult exists
no request id, actor role, room/game/epoch identity, scope, or pause revision exists
no explicit solo, host-global, client-local-overlay, or connection policy exists
no authoritative host-global pause publication exists
no client global-pause request/response contract exists
resume is a local screen change with no terminal result
```

## Simulation and command-admission gaps

```txt
local animation admission reads uiState.screen
host transport consumption does not read pause state
host can process remote PLAYER_UPDATE while its own UI is paused
host can process remote TRY_INTERACT while its own UI is paused
publishAuthoritativeState forces room.phase active
normal active publication can continue during host UI pause
interaction admission checks currentGameState.gameState, which stays playing
no simulation-admission or interaction-admission result exists
no paused heartbeat versus gameplay publication policy exists
```

## Client projection gaps

```txt
GameShell maps SYNC to PAUSED only when snapshot.gameState is paused
local pause never changes snapshot.gameState
next host SYNC can force a paused client back to PLAYING
client-local overlay pause has no explicit policy
snapshot.appState and local screen can disagree
no pause revision or authority source is projected
no pending/accepted/rejected/no-change UI state exists
```

## Input-suspension gaps

```txt
global keyboard listeners remain active during pause
movement/sprint/interact flags are not cleared atomically
look deltas are not cleared through a pause transaction
interact can execute while local pause UI is visible
stale held-key state can survive into resume
resume does not require fresh input edges
pointer-lock release is not correlated with a pause result
blur plus pointer-lock events have no deduplication identity
capture failure has no stable browser-effect result
```

## Render/readback gaps

```txt
RAF and rendering continue during pause without a pause revision
paused frame has no authority source or result id
world/minimap/HUD/overlay can consume different pause notions
first paused frame and first resumed frame have no acknowledgement
runtime debug records screen/pointer lock but not pause policy or projection parity
no detached pause-frame observation exists
```

## Missing source files

```txt
HorrorCorridor-V1/src/features/pause/domain/pauseTypes.ts
HorrorCorridor-V1/src/features/pause/domain/pausePolicy.ts
HorrorCorridor-V1/src/features/pause/domain/pauseReducer.ts
HorrorCorridor-V1/src/features/pause/domain/simulationAdmission.ts
HorrorCorridor-V1/src/features/pause/domain/inputSuspension.ts
HorrorCorridor-V1/src/features/pause/domain/pauseLedger.ts
HorrorCorridor-V1/src/features/pause/domain/pauseFixtureSeeds.ts
HorrorCorridor-V1/src/features/pause/domain/pauseFixtureRows.ts
HorrorCorridor-V1/src/features/debug/domain/pauseDebugProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-pause-convergence-fixture.mjs
```

## Validation gaps

```txt
package.json has no fixture:session-lifecycle script
package.json has no fixture:pause-convergence script
no DOM-free solo/host/client pause policy replay
no host paused remote-command rejection proof
no client local-overlay pause persistence proof
no input clearing and neutral resume proof
no pointer-lock event deduplication proof
no duplicate/stale pause command proof
no pause frame projection parity proof
no browser multi-peer pause smoke contract
```

## Planned candidate kits

```txt
pause-command-kit
pause-authority-policy-kit
pause-transition-result-kit
simulation-admission-kit
input-suspension-kit
pointer-lock-pause-adapter-kit
pause-publication-policy-kit
pause-projection-transaction-kit
pause-convergence-ledger-kit
pause-debug-projection-kit
pause-resume-fixture-kit
legacy-local-pause-compatibility-kit
```

## Ordered boundaries

```txt
lobby readiness/start admission
  -> stable initial run identity
  -> run exit/session epoch authority
  -> pause/resume authority
  -> simulation and input admission
  -> projection convergence and fixture
```

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
pause menu visual redesign
host migration
```