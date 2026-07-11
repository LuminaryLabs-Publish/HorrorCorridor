# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T21-39-22-04-00`

## Goal

Make leaving and re-entering a run an authoritative, versioned session transition so solo, host, and client peers converge on one phase, one run identity, one teardown result, and one admissible message epoch.

## Current next build slice

```txt
HorrorCorridor Run Exit Authority + Session Epoch Re-entry Fixture Gate
```

## Plan ledger

```txt
[ ] Preserve current maze generation, movement, interaction, rendering, minimap, HUD, post-processing, and visual output.
[ ] Preserve the existing GameCanvas render-resource cleanup while making its result observable.
[ ] Complete lobby readiness/start admission first or reuse its sealed roster and start transaction contract.
[ ] Define RunSessionId and monotonic sessionEpoch.
[ ] Add sessionEpoch to START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, and lifecycle messages.
[ ] Define RunExitCommand, RunExitResult, SessionLifecycleState, and stable reason types.
[ ] Add exit request ids and duplicate-result replay.
[ ] Make the host the only multiplayer run-exit authority.
[ ] Define explicit solo exit authority without routing solo through the client lobby.
[ ] Validate protocol version, room, game id, session epoch, sender, role, and phase before accepting exit.
[ ] Support active -> ending -> lobby and active -> lobby transitions with explicit reasons.
[ ] Reject client-only local exit as an authority mutation; clients may request exit or leave the room.
[ ] Publish one authoritative SESSION_STATE or state-reset message after accepted exit.
[ ] Clear or archive the authoritative snapshot only after the terminal exit result is recorded.
[ ] Reset local pose, view, input, readiness, completion, and debug session state deterministically.
[ ] Keep transport alive only for return-to-lobby; destroy it for return-to-title or room close.
[ ] Mark client simulation/input inactive before accepting any later snapshot.
[ ] Increment sessionEpoch before a new run bootstrap.
[ ] Reject stale PLAYER_UPDATE and TRY_INTERACT messages from an earlier epoch.
[ ] Reject stale SYNC and START_GAME messages from an earlier epoch.
[ ] Ensure late old-epoch messages cannot mutate a new run.
[ ] Add an idempotent runtime teardown result covering RAF, listeners, subscriptions, world, composer, renderer, canvas, pointer lock, and store projection.
[ ] Correct readiness.networking after teardown for solo, disconnected, lobby-connected, and title states.
[ ] Keep room.phase, UI screen, gameScreen, snapshot state, and peer projection in one lifecycle transaction.
[ ] Add bounded lifecycle command/result and teardown ledgers.
[ ] Add JSON-safe session lifecycle debug projection.
[ ] Add deterministic fixture seeds and rows before changing UI consumers.
[ ] Add package script fixture:session-lifecycle.
[ ] Prove solo restart returns to a valid solo entry path.
[ ] Prove host return-to-lobby moves every client to the same lobby epoch.
[ ] Prove client local exit cannot be overwritten ambiguously by stale SYNC.
[ ] Prove return-to-title destroys transport and clears all stores exactly once.
[ ] Prove re-entry creates one new epoch and one runtime instance.
[ ] Run existing validation only after the lifecycle fixture passes.
```

## Suggested source order

```txt
1. features/session/domain/runSessionTypes.ts
2. features/session/domain/sessionEpoch.ts
3. features/session/domain/runExitPolicy.ts
4. features/session/domain/sessionPhaseReducer.ts
5. features/session/domain/runtimeTeardownResult.ts
6. features/session/domain/sessionLifecycleLedger.ts
7. features/session/domain/sessionMessageAdmission.ts
8. features/session/domain/sessionFixtureSeeds.ts
9. features/session/domain/sessionFixtureRows.ts
10. scripts/horror-corridor-session-lifecycle-fixture.mjs
11. package.json fixture:session-lifecycle
12. networking protocol additive RUN_EXIT / RUN_EXIT_RESULT / SESSION_STATE support
13. START_GAME / PLAYER_UPDATE / TRY_INTERACT / SYNC sessionEpoch fields
14. GameCanvas cleanup result projection
15. runtimeStore and sessionStore transactional reset helpers
16. runtime debug lifecycle projection
17. GameShell returnToLobby / returnToStart / restart routing
18. PauseMenu and CompleteScreen result presentation
```

## Required fixture rows

```txt
solo active -> lobby accepted
solo ending -> lobby accepted
solo lobby -> new solo run increments epoch once
solo restart never routes to LOBBY_CLIENT
host active -> lobby accepted and replicated to all clients
host ending -> lobby accepted and replicated
client exit request accepted by host policy
client local-only authority mutation rejected
non-host forced room reset rejected
wrong room exit rejected
wrong game id exit rejected
stale epoch exit rejected
duplicate exit request replays terminal result
return-to-title destroys host transport exactly once
return-to-title destroys client transport exactly once
return-to-lobby preserves connected transport
runtime teardown stops one RAF and removes every registered listener
world, composer, renderer, canvas, ResizeObserver, and transport subscription dispose once
second teardown returns no-change without double disposal
accepted exit clears or archives the previous authoritative snapshot
stale old-epoch PLAYER_UPDATE rejected after re-entry
stale old-epoch TRY_INTERACT rejected after re-entry
stale old-epoch SYNC rejected after re-entry
new-epoch START_GAME and initial SYNC accepted
room phase, UI screen, gameScreen, readiness, and epoch remain correlated
all lifecycle result and debug rows are JSON-safe
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
[ ] browser solo pause -> lobby -> restart smoke
[ ] browser solo victory -> restart smoke
[ ] browser host/client return-to-lobby convergence smoke
[ ] browser client leave-room smoke
[ ] browser return-to-title transport teardown smoke
[ ] browser stale-message-after-reentry smoke
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
lobby readiness implementation beyond preserving its dependency contract
snapshot acceptance implementation beyond the epoch admission needed for lifecycle safety
request acknowledgement implementation beyond lifecycle terminal results
```