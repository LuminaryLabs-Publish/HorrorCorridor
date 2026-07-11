# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T01-01-32-04-00`

## Goal

Make every run exit a terminal authority transaction that freezes gameplay admission, publishes a lifecycle result, commits UI/runtime/snapshot state, applies an explicit transport policy, and rejects all old-epoch traffic before any new run can bootstrap.

## Ordered build slices

```txt
1. HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
2. HorrorCorridor Run Exit Commit + Session Epoch Transport Quarantine Fixture Gate
3. HorrorCorridor Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Current source slice

```txt
HorrorCorridor Run Exit Commit + Session Epoch Transport Quarantine Fixture Gate
```

## Plan ledger

```txt
[ ] Preserve current maze generation, movement, interaction, rendering, minimap, HUD, post-processing, and visual output.
[ ] Reuse or complete lobby readiness/start admission and the sealed-roster contract.
[ ] Define RunSessionIdentity with runSessionId, sessionEpoch, roomId, gameId, rosterRevision, and source fingerprint.
[ ] Add sessionEpoch to START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT, and lifecycle messages.
[ ] Define RunExitCommand for pause-return, victory-restart, client-leave, host-return, room-close, and title-exit.
[ ] Define RunExitResult with accepted/rejected/no-change, stable reason, previous/next phase, epoch, and authority source.
[ ] Make host authoritative for multiplayer run exit and solo host authoritative for local exit.
[ ] Freeze movement, interaction, ooze, client send, host remote-command consumption, and active publication after accepted exit.
[ ] Publish a terminal lifecycle message before projection or transport teardown.
[ ] Commit room phase, game/app state, readiness, UI screen, snapshot archive/reset, and completion state coherently.
[ ] Preserve transport for lobby return and destroy it for room close/title exit.
[ ] Add a quarantine generation to every transport callback and reject callbacks from closed/old epochs.
[ ] Make GameCanvas cleanup and transport teardown return exactly-once results.
[ ] Increment sessionEpoch exactly once before a fresh bootstrap.
[ ] Prevent old START_GAME/SYNC/PLAYER_UPDATE/TRY_INTERACT/LOBBY_EVENT traffic from crossing re-entry.
[ ] Add bounded lifecycle command/result/publication/quarantine/teardown ledgers.
[ ] Add JSON-safe runtime-debug projection.
[ ] Add scripts/horror-corridor-session-lifecycle-fixture.mjs.
[ ] Add npm run fixture:session-lifecycle.
[ ] Prove solo restart, host/client convergence, transport preservation, transport destruction, late-callback rejection, duplicate exit replay, and clean re-entry.
[ ] Run browser smoke only after deterministic fixtures pass.
```

## Suggested source order

```txt
1. features/session/domain/runSessionTypes.ts
2. features/session/domain/runSessionIdentity.ts
3. features/session/domain/runExitReducer.ts
4. features/session/domain/runExitPolicy.ts
5. features/session/domain/sessionMessageAdmission.ts
6. features/session/domain/transportQuarantine.ts
7. features/session/domain/snapshotArchive.ts
8. features/session/domain/runtimeTeardownResult.ts
9. features/session/domain/sessionLifecycleLedger.ts
10. features/debug/domain/sessionLifecycleDebugProjection.ts
11. protocol additive epoch and lifecycle-message support
12. GameShell exit, transport, and projection adapters
13. GameCanvas simulation/publication admission and cleanup adapter
14. sessionStore/runtimeStore lifecycle transaction adapter
15. scripts/horror-corridor-session-lifecycle-fixture.mjs
16. package.json fixture:session-lifecycle
```

## Required fixture rows

```txt
solo pause-return accepted
solo victory-restart accepted
solo repeated exit returns no-change
host return-to-lobby accepted and published
client receives lifecycle lobby state
client local leave accepted without closing host room
host room close accepted and transport destroyed
title exit destroys transport exactly once
lobby return preserves transport
accepted exit freezes simulation before projection
accepted exit rejects late PLAYER_UPDATE
accepted exit rejects late TRY_INTERACT
accepted exit rejects late START_GAME
accepted exit rejects late SYNC
accepted exit rejects late LOBBY_EVENT from old epoch
wrong room/game/epoch/actor rejected
duplicate request replays one terminal result
active snapshot archived or cleared by policy
new run increments epoch exactly once
new run accepts only new-epoch traffic
all result, ledger, snapshot, and debug rows remain JSON-safe
```

## Acceptance checks

```txt
[ ] npm run fixture:session-lifecycle
[ ] npm run lint
[ ] npm run smoke:protokits
[ ] npm run harness:horror-corridor
[ ] npm run build
[ ] npm run validate:live-player:dev
[ ] npm run review:object-kit
[ ] browser solo return/restart smoke
[ ] browser host return with connected client smoke
[ ] browser client leave/rejoin smoke
[ ] browser title exit and transport disposal smoke
[ ] runtime-debug lifecycle export inspection
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
pause menu redesign
host migration
```
