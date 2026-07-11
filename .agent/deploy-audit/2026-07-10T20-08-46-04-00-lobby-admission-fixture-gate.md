# HorrorCorridor Lobby Admission Fixture Gate

**Timestamp:** `2026-07-10T20-08-46-04-00`

## Current validation surface

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run live-agent:sample
npm run review:live-agent
npm run review:object-kit
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
```

## Missing gate

```txt
npm run fixture:lobby-admission
```

The repository has no DOM-free proof that readiness reaches host authority, that every peer receives the same roster, or that start admission rejects invalid rosters before bootstrap.

## Proposed fixture modules

```txt
HorrorCorridor-V1/src/features/lobby/domain/lobbyCommandTypes.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyReadinessReducer.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyRosterSnapshot.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyStartAdmissionPolicy.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyPhaseTransition.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyResultLedger.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyFixtureSeeds.ts
HorrorCorridor-V1/src/features/lobby/domain/lobbyFixtureRows.ts
HorrorCorridor-V1/scripts/horror-corridor-lobby-admission-fixture.mjs
```

## Required deterministic rows

```txt
solo host admission accepted
host plus ready client admission accepted
host plus unready client rejected
ready intent changes authoritative client row
unready intent changes authoritative client row
same-value ready intent returns no-change
wrong room rejected
unknown actor rejected
disconnected actor ready rejected
stale roster revision rejected
duplicate command id replays terminal result
non-host start request rejected
placeholder participant start rejected
capacity overflow rejected
double start accepts exactly once
bootstrap failure returns to lobby
accepted roster fingerprint equals active snapshot roster fingerprint
rejected start emits no START_GAME or SYNC
all ledger rows remain JSON-safe
legacy readiness messages preserve compatibility through translation
```

## Validation order

```txt
1. npm run fixture:lobby-admission
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run build
6. npm run validate:live-player:dev
7. npm run review:object-kit
8. browser host/client readiness smoke
9. browser blocked-start reason smoke
10. browser accepted-start roster parity smoke
11. runtime-debug export inspection
```

## Deployment invariant

The static/runtime deployment path must remain unchanged until the domain fixture proves authority and parity. No PeerJS extraction, render rewrite, or route restructuring is required for this slice.

## Current pass status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
workflow changed: no
deployment changed: no
fixture:lobby-admission: unavailable
existing checks run: no
```

## Next safe ledge

```txt
HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
```