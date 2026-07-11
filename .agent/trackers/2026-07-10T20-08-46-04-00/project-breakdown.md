# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Run:** `2026-07-10T20-08-46-04-00`

## Goal

Define the smallest source-backed correction that makes multiplayer lobby readiness authoritative and makes host start admission deterministic before any active corridor state is created.

## Plan ledger

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory against `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select one repository using the oldest documented-selection rule.
- [x] Inspect `GameShell`, `LobbyScreen`, `sessionStore`, protocol message types, sync constructors, network rules, bootstrap, and package scripts.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all source-backed kits and their services.
- [x] Identify the readiness and start-admission authority gap.
- [x] Define the next DSK cuts and fixture gate.
- [x] Keep runtime source, dependencies, scripts, routes, and render output unchanged.
- [x] Create no branch or pull request.
- [x] Push only to `main`.
- [x] Synchronize the central repo ledger and internal change log.

## Selection

The accessible organization inventory contains ten repositories. All nine eligible non-Cavalry repositories were already tracked and had root `.agent` state. `HorrorCorridor` was the oldest eligible documented fallback at the beginning of this run.

```txt
HorrorCorridor       selected / 2026-07-10T18-31-21-04-00
PhantomCommand       tracked  / 2026-07-10T18-40-13-04-00
ZombieOrchard        tracked  / 2026-07-10T18-49-54-04-00
TheUnmappedHouse     tracked  / 2026-07-10T19-00-19-04-00
MyCozyIsland         tracked  / 2026-07-10T19-11-19-04-00
PrehistoricRush      tracked  / 2026-07-10T19-30-36-04-00
AetherVale           tracked  / 2026-07-10T19-38-41-04-00
IntoTheMeadow        tracked  / 2026-07-10T19-48-39-04-00
TheOpenAbove         tracked  / 2026-07-10T19-58-34-04-00
TheCavalryOfRome     excluded by rule
```

## Interaction loop

```txt
start menu
  -> host creates room or client joins by code
  -> host records peer joins and broadcasts player-joined/player-left lobby events
  -> lobby renders each player's ready flag
  -> client presses Enter run or Toggle ready
  -> GameShell toggles only the client's local Zustand lobby row
  -> no ready intent is sent to the host
  -> host presses Start run
  -> startPlay checks only host mode and room existence
  -> createInitialGameState turns the current host-side roster into active player entities
  -> host broadcasts START_GAME and initial SYNC
  -> clients enter the active corridor from the host snapshot
```

## Source findings

1. `LobbyScreen` says the run begins once the room is ready, but `Start run` is always enabled and receives no admission state or rejection reason.
2. Client primary and secondary lobby actions both call `toggleReady()`.
3. `toggleReady()` changes only the local `sessionStore`; it does not send `TRY_INTERACT`, `LOBBY_EVENT`, or a dedicated ready message.
4. Protocol unions already name `toggle-ready`, `player-ready`, and `player-unready`, but no lobby producer routes those intents to host authority.
5. `applyNetworkInteractionRequest()` treats `toggle-ready` as a no-op because gameplay interaction rules are not the lobby authority boundary.
6. `shared.ts` also defines a separate legacy `ClientReadyMessage`, creating a second unused readiness vocabulary.
7. `startPlay()` does not require connected non-host players to be ready and does not return a typed admission result.
8. Host-added guest placeholders can remain unready and still become active player entities during bootstrap.
9. The room has a `starting` phase, but start admission does not use it as an atomic transition before maze generation and publication.
10. Runtime debug has no readiness intent, authoritative roster, start admission, or rejection ledger.

## Main finding

The lobby is visually modeled as ready-gated but behaviorally modeled as host-immediate. Readiness is local presentation state, not host-owned session state. The host can bootstrap and publish an active run from a roster that is stale, unready, disconnected, or populated with placeholders.

## Required authority boundary

```txt
client ready intent
  -> protocol preflight
  -> host lobby command reducer
  -> authoritative roster mutation
  -> lobby event publication
  -> every peer projects one authoritative roster
  -> host start request
  -> deterministic start admission policy
  -> accepted or rejected result
  -> atomic lobby -> starting -> active transition
  -> immutable admitted roster passed to bootstrap
```

## Candidate kits

```txt
lobby-readiness-command-kit
lobby-readiness-authority-kit
lobby-roster-snapshot-kit
lobby-start-admission-policy-kit
lobby-phase-transition-kit
lobby-result-ledger-kit
lobby-debug-projection-kit
lobby-admission-fixture-kit
legacy-lobby-readiness-compatibility-kit
```

## Next safe ledge

```txt
HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
```

## Validation

Documentation only. Runtime source, package scripts, dependencies, routes, rendering behavior, deployment, and network behavior were not changed. Existing checks were not run because `fixture:lobby-admission` does not exist yet. Changes were pushed directly to `main`.