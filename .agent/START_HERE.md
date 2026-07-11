# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T01-01-32-04-00`

## Current safe ledge

```txt
HorrorCorridor Run Exit Commit + Session Epoch Transport Quarantine Fixture Gate
```

## Selection result

The complete accessible `LuminaryLabs-Publish` inventory was compared against the central repo ledger and root `.agent` state. All nine eligible non-Cavalry repositories were tracked and documented. `HorrorCorridor` had the oldest current review timestamp and was the only product repository changed. `TheCavalryOfRome` remained excluded.

```txt
HorrorCorridor       selected / 2026-07-10T23-30-13-04-00
PhantomCommand       tracked  / 2026-07-10T23-40-35-04-00
ZombieOrchard        tracked  / 2026-07-10T23-50-53-04-00
TheUnmappedHouse     tracked  / 2026-07-11T00-00-26-04-00
MyCozyIsland         tracked  / 2026-07-11T00-10-28-04-00
AetherVale           tracked  / 2026-07-11T00-18-24-04-00
IntoTheMeadow        tracked  / 2026-07-11T00-30-48-04-00
PrehistoricRush      tracked  / 2026-07-11T00-39-25-04-00
TheOpenAbove         tracked  / 2026-07-11T00-49-45-04-00
TheCavalryOfRome     excluded by rule
```

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-11T01-01-32-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T01-01-32-04-00.md
.agent/architecture-audit/2026-07-11T01-01-32-04-00-run-exit-commit-dsk-map.md
.agent/render-audit/2026-07-11T01-01-32-04-00-post-exit-frame-projection-gap.md
.agent/gameplay-audit/2026-07-11T01-01-32-04-00-lobby-return-stale-sync-reentry-loop.md
.agent/interaction-audit/2026-07-11T01-01-32-04-00-exit-command-transport-callback-map.md
.agent/session-authority-audit/2026-07-11T01-01-32-04-00-epoch-transport-quarantine-contract.md
.agent/deploy-audit/2026-07-11T01-01-32-04-00-run-exit-epoch-fixture-gate.md
```

## Current interaction loop

```txt
solo, host, or client enters PLAYING
  -> GameCanvas owns simulation, input, transport consumption, publication, rendering, minimap, and debug
  -> pause-return or victory-restart calls GameShell.returnToLobby()
  -> local UI changes to a lobby and GameCanvas unmounts
  -> local RAF, listeners, world, composer, renderer, and canvas are disposed
  -> room phase and authoritative snapshot remain active or ending
  -> transport remains connected by design
  -> GameShell transport callbacks remain subscribed
  -> late START_GAME or SYNC is accepted without run/session epoch admission
  -> SYNC can project the local client back to PLAYING or COMPLETED
  -> a new start bootstraps another run without quarantining old-run traffic
```

## Main finding

The route has local component cleanup, but no authoritative **run-exit commit**. Lobby return does not produce a typed command/result, does not publish a terminal lifecycle state, does not advance a session epoch, does not archive/clear the active snapshot, and does not quarantine late transport callbacks.

```txt
returnToLobby changes presentation/readiness only
GameCanvas cleanup disposes local render/input ownership
transport and GameShell message handling remain live
START_GAME and SYNC have no epoch field
GameShell accepts those messages without phase/epoch preflight
old-run traffic can cross into lobby or the next bootstrap
```

## Ordered safe ledges

```txt
1. Lobby Readiness Authority + Start Admission Fixture Gate
2. Run Exit Commit + Session Epoch Transport Quarantine Fixture Gate
3. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, rendering behavior, networking behavior, and deployment configuration did not change. No branch or pull request was created. Repo-local and central documentation were pushed directly to `main`.
