# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T01-01-32-04-00`

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
returnToLobby changes local UI/readiness only
no RunExitCommand or RunExitResult exists
no exit request id, actor, role, scope, reason, or authority source exists
room.phase remains active or ending
authoritative snapshot remains active
completion state has no archive/reset policy
host/client lifecycle state is not published
solo restart routes through client-lobby presentation
client leave and host room-close are not distinct transactions
```

## Session identity and admission gaps

```txt
no runSessionId exists
no monotonic sessionEpoch exists
NetworkEnvelope has roomId but no gameId/epoch
START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, and LOBBY_EVENT have no epoch fence
GameShell accepts START_GAME and SYNC without current phase/epoch preflight
late old-run SYNC can restore PLAYING after local lobby return
late active commands can cross into the next bootstrap
no duplicate/stale lifecycle command ledger exists
```

## Transport quarantine gaps

```txt
lobby return preserves transport but does not change its admission generation
GameShell transport callback remains live after GameCanvas unmount
GameCanvas transport listener unsubscribes, but shell-level message handling remains
transport destroy returns no typed result
no callback generation or lease identity exists
no terminal lifecycle acknowledgement is sent before room close/title exit
no explicit preserve-versus-destroy policy result exists
no proof that destroy/disconnect is exactly once
```

## Runtime commit gaps

```txt
GameCanvas cleanup disposes local RAF/listeners/world/composer/renderer
cleanup is not correlated with a RunExitResult
cleanup leaves networking readiness true
snapshot archive/reset is outside cleanup and absent from lobby return
UI, room phase, snapshot, readiness, transport policy, and teardown do not commit atomically
publishAuthoritativeState forces room.phase active
no first-lobby-frame acknowledgement references the terminal exit result
```

## Dependent pause gaps

```txt
pause remains local presentation state
host remote gameplay consumption continues during local pause
client pause can be overwritten by active SYNC
input flags are not atomically suspended
pause authority must reuse runSessionId/sessionEpoch and stale-message admission
```

## Missing source files

```txt
HorrorCorridor-V1/src/features/session/domain/runSessionTypes.ts
HorrorCorridor-V1/src/features/session/domain/runSessionIdentity.ts
HorrorCorridor-V1/src/features/session/domain/runExitReducer.ts
HorrorCorridor-V1/src/features/session/domain/runExitPolicy.ts
HorrorCorridor-V1/src/features/session/domain/sessionMessageAdmission.ts
HorrorCorridor-V1/src/features/session/domain/transportQuarantine.ts
HorrorCorridor-V1/src/features/session/domain/snapshotArchive.ts
HorrorCorridor-V1/src/features/session/domain/runtimeTeardownResult.ts
HorrorCorridor-V1/src/features/session/domain/sessionLifecycleLedger.ts
HorrorCorridor-V1/src/features/debug/domain/sessionLifecycleDebugProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-session-lifecycle-fixture.mjs
```

## Validation gaps

```txt
package.json has no fixture:session-lifecycle script
no DOM-free solo/host/client exit replay
no transport preserve/destroy policy proof
no late callback quarantine proof
no old-epoch START_GAME/SYNC rejection proof
no old-epoch PLAYER_UPDATE/TRY_INTERACT rejection proof
no duplicate exit replay proof
no exactly-once cleanup proof
no clean re-entry epoch proof
no first-lobby-frame/result correlation proof
```

## Planned candidate kits

```txt
run-session-identity-kit
run-exit-command-kit
run-exit-authority-kit
run-exit-commit-kit
session-message-admission-kit
transport-quarantine-kit
lifecycle-publication-kit
runtime-teardown-result-kit
snapshot-archive-kit
run-exit-debug-projection-kit
run-exit-fixture-kit
```

## Ordered boundaries

```txt
lobby readiness/start admission
  -> stable initial run identity
  -> run-exit command/result authority
  -> lifecycle publication and atomic projection commit
  -> transport preserve/destroy policy
  -> old-epoch callback quarantine
  -> exactly-once teardown and snapshot archive/reset
  -> clean re-entry
  -> pause/resume authority
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
pause menu redesign
host migration
```
