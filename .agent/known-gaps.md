# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T20-08-46-04-00`

## Selection state

```txt
full accessible LuminaryLabs-Publish list compared with central ledger
all nine eligible non-Cavalry repos tracked
root .agent state present for every eligible repo
TheCavalryOfRome excluded
HorrorCorridor selected as oldest eligible documented fallback
```

## Readiness authority gaps

```txt
client readiness mutates only local sessionStore state
no ready command is sent to host authority
no host readiness reducer exists
no authoritative roster revision exists
no roster fingerprint exists
no pending-local versus host-accepted readiness distinction exists
no stable ready accepted/rejected/no-change result exists
no membership, room, connection, or stale-revision ready validation exists
```

## Start admission gaps

```txt
host start checks only host mode and room presence
no all-required-ready policy
no disconnected-player rejection
no placeholder-player rejection
no minimum/maximum participant admission result
no immutable admitted roster
no start request id or duplicate-start guard
no authoritative lobby -> starting -> active transaction
no bootstrap rollback contract
no proof that evaluated roster equals bootstrapped roster
```

## Protocol gaps

```txt
readiness has multiple competing vocabularies
TRY_INTERACT toggle-ready is routed to active-game rules and becomes a no-op
LOBBY_EVENT player-ready/player-unready has no producer
shared ClientReadyMessage is not part of the active protocol union
shared ClientActionMessage toggle-ready is not routed
no canonical readiness compatibility adapter
no LOBBY_COMMAND, LOBBY_RESULT, or versioned roster state contract
```

## Roster and bootstrap gaps

```txt
host placeholder guests are marked connected
placeholder rows can become active player entities
createInitialGameState accepts any roster row without admission metadata
active snapshot has no admitted-roster fingerprint
room starting phase is not used before asynchronous loading/bootstrap
room and lobby state have no monotonic revision
```

## Projection gaps

```txt
Start run is always enabled
lobby receives no canStart or blocked reasons
client Enter run label does not describe local ready toggle behavior
client can render ready while host still renders waiting
placeholder and real participants are not visually distinguished
no starting, rejected, or rollback projection
no admission result correlation in runtime debug
```

## Missing source files

```txt
HorrorCorridor-V1/src/features/lobby/domain/lobbyCommandTypes.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyReadinessReducer.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyRosterSnapshot.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyStartAdmissionPolicy.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyPhaseTransition.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyResultLedger.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyCompatibilityAdapter.ts
HorrorCorridor-V1/src/features/debug/domain/lobbyDebugProjection.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyFixtureSeeds.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyFixtureRows.ts
HorrorCorridor-V1/scripts/horror-corridor-lobby-admission-fixture.mjs
```

## Validation gaps

```txt
package.json has no fixture:lobby-admission script
no DOM-free authoritative readiness replay
no ready accepted/rejected/no-change rows
no stale revision or duplicate command rows
no disconnected or placeholder admission rows
no double-start or bootstrap rollback rows
no admitted-roster to active-snapshot parity proof
no host/client browser readiness smoke contract
no runtime-debug lobby result projection proof
```

## Existing prerequisite gaps retained

```txt
authoritative SYNC snapshot acceptance is still missing
request identity and acknowledgement are still missing
protocol source validation and monotonic snapshot projection are still missing
```

These remain separate boundaries. Lobby authority should reuse common envelope preflight and result-ledger conventions but should not be merged into active-game interaction or snapshot acceptance reducers.

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