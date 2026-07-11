# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T20-08-46-04-00`

## Goal

Make lobby readiness a host-owned, versioned command domain and make `Start run` pass a deterministic admission policy before any active maze state or player entity is created.

## Current next build slice

```txt
HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
```

## Plan ledger

```txt
[ ] Preserve current solo, host, client, active gameplay, rendering, minimap, HUD, completion, and cadence behavior.
[ ] Define LobbyReadyCommand, LobbyStartCommand, LobbyCommandResult, and stable reason types.
[ ] Add command ids and roster revisions.
[ ] Define one canonical readiness wire contract.
[ ] Add compatibility translation for client/ready, client/action toggle-ready, and TRY_INTERACT toggle-ready.
[ ] Route lobby commands before active-game interaction rules.
[ ] Validate protocol version, room, sender, actor membership, connection state, phase, and roster revision.
[ ] Make the host the only readiness and roster authority.
[ ] Classify same-value readiness as no-change.
[ ] Increment roster revision exactly once per accepted mutation.
[ ] Publish one authoritative roster state after accepted mutations.
[ ] Distinguish pending-local readiness from host-accepted readiness in UI state.
[ ] Classify placeholder/debug participants separately from real peers.
[ ] Define LobbyStartAdmissionInput and LobbyStartAdmissionResult.
[ ] Require host authority and lobby phase.
[ ] Require all real connected clients to satisfy the explicit readiness policy.
[ ] Reject disconnected, stale, over-capacity, and placeholder-containing rosters.
[ ] Seal an immutable admitted roster and fingerprint.
[ ] Transition lobby -> starting before async loading/bootstrap.
[ ] Prevent duplicate start transactions.
[ ] Pass the sealed roster directly to createInitialGameState.
[ ] Record the admitted roster fingerprint in active session diagnostics.
[ ] Roll back starting -> lobby atomically if bootstrap fails.
[ ] Add bounded ready/start command and result ledgers.
[ ] Add JSON-safe lobby debug projection.
[ ] Add deterministic fixture seeds and rows before changing GameShell consumers.
[ ] Add package script fixture:lobby-admission.
[ ] Prove ready replication and authoritative roster parity.
[ ] Prove invalid start requests create no runtime state and publish no START_GAME/SYNC.
[ ] Prove accepted admission and active snapshot use the same roster fingerprint.
[ ] Run existing validation only after the fixture passes.
```

## Suggested source order

```txt
1. features/lobby/domain/lobbyCommandTypes.ts
2. features/lobby/domain/lobbyRosterSnapshot.ts
3. features/lobby/domain/lobbyReadinessReducer.ts
4. features/lobby/domain/lobbyStartAdmissionPolicy.ts
5. features/lobby/domain/lobbyPhaseTransition.ts
6. features/lobby/domain/lobbyResultLedger.ts
7. features/lobby/domain/lobbyCompatibilityAdapter.ts
8. features/lobby/domain/lobbyFixtureSeeds.ts
9. features/lobby/domain/lobbyFixtureRows.ts
10. scripts/horror-corridor-lobby-admission-fixture.mjs
11. package.json fixture:lobby-admission
12. networking protocol additive LOBBY_COMMAND/RESULT/STATE support
13. sessionStore authoritative roster revision projection
14. debug lobby projection
15. GameShell lobby command routing and start transaction
16. LobbyScreen authoritative view state and blocked reasons
17. createInitialGameState admitted-roster fingerprint input
```

## Required fixture rows

```txt
solo host admission accepted
host plus ready client admission accepted
host plus unready client rejected
client ready accepted and replicated to host/client projections
client unready accepted and replicated
same-value ready returns no-change
unknown player rejected
wrong room rejected
disconnected player ready rejected
stale roster revision rejected
duplicate command id replays terminal result
non-host start rejected
placeholder participant start rejected
capacity overflow rejected
double start accepts exactly once
bootstrap failure rolls phase back to lobby
rejected start emits no START_GAME or SYNC
accepted roster fingerprint equals active snapshot roster fingerprint
legacy readiness vocabularies translate to canonical commands
all result and debug rows are JSON-safe
```

## Acceptance checks

```txt
[ ] npm run fixture:lobby-admission
[ ] npm run lint
[ ] npm run smoke:protokits
[ ] npm run harness:horror-corridor
[ ] npm run build
[ ] npm run validate:live-player:dev
[ ] npm run review:object-kit
[ ] browser solo lobby/start smoke
[ ] browser host/client ready/unready smoke
[ ] browser blocked-start reason smoke
[ ] browser accepted-start roster parity smoke
[ ] runtime-debug lobby export inspection
```

## Explicit non-goals

```txt
PeerJS extraction
renderer extraction
minimap extraction
post-processing extraction
new routes
new maze content
scene-dressing expansion
visual object-kit expansion
network tick retuning
gameplay balance changes
snapshot acceptance implementation beyond preserving its boundary
request acknowledgement implementation beyond preserving its boundary
```