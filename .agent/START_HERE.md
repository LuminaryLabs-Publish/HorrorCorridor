# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T21-39-22-04-00`

## Current safe ledge

```txt
HorrorCorridor Run Exit Authority + Session Epoch Re-entry Fixture Gate
```

## Selection result

The complete accessible `LuminaryLabs-Publish` inventory was compared against the central repo ledger and root `.agent` state. All nine eligible non-Cavalry repositories were tracked and documented. `HorrorCorridor` had the oldest eligible central review timestamp and was the only product repository changed. `TheCavalryOfRome` remained excluded.

```txt
HorrorCorridor       selected / 2026-07-10T20-08-46-04-00
PhantomCommand       tracked  / 2026-07-10T20-19-35-04-00
ZombieOrchard        tracked  / 2026-07-10T20-30-23-04-00
TheUnmappedHouse     tracked  / 2026-07-10T20-38-24-04-00
MyCozyIsland         tracked  / 2026-07-10T20-48-55-04-00
PrehistoricRush      tracked  / 2026-07-10T21-00-16-04-00
AetherVale           tracked  / 2026-07-10T21-08-52-04-00
IntoTheMeadow        tracked  / 2026-07-10T21-19-36-04-00
TheOpenAbove         tracked  / 2026-07-10T21-31-01-04-00
TheCavalryOfRome     excluded by rule
```

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T21-39-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T21-39-22-04-00.md
.agent/architecture-audit/2026-07-10T21-39-22-04-00-run-exit-session-epoch-dsk-map.md
.agent/render-audit/2026-07-10T21-39-22-04-00-runtime-teardown-readback-gap.md
.agent/gameplay-audit/2026-07-10T21-39-22-04-00-active-ending-lobby-reentry-loop.md
.agent/interaction-audit/2026-07-10T21-39-22-04-00-return-command-admission-map.md
.agent/session-lifecycle-audit/2026-07-10T21-39-22-04-00-run-exit-reentry-authority-contract.md
.agent/deploy-audit/2026-07-10T21-39-22-04-00-session-lifecycle-fixture-gate.md
```

## Current interaction loop

```txt
solo, host, or client enters active corridor
  -> GameCanvas owns input, animation, simulation, networking consumer, world, post, and minimap
  -> pause or victory exposes Return to lobby / Restart
  -> GameShell.returnToLobby changes only local UI and readiness flags
  -> GameCanvas unmount cleanup stops RAF, listeners, world, composer, and renderer
  -> room phase remains active or ending
  -> authoritative snapshot remains attached to runtimeStore
  -> no host-owned exit command or lobby-reset publication occurs
  -> remote peers can remain active and later SYNC can force a client back to PLAYING
  -> solo is routed to LOBBY_CLIENT, where the primary action toggles readiness instead of starting a new solo run
```

## Main finding

The render teardown path exists, but the **run lifecycle has no authority boundary**.

```txt
returnToLobby is a local screen change, not a session transition
room phases idle/lobby/starting/active/ending/closed have no authoritative exit reducer
protocol has START_GAME and SYNC but no run-exit or session-reset command/result
active messages carry roomId but no run/session epoch
old PLAYER_UPDATE, TRY_INTERACT, or SYNC traffic can cross a re-entry boundary
solo return-to-lobby routes to the client lobby and cannot cleanly restart
runtime cleanup has no bounded result ledger proving exactly-once teardown
```

The next source pass should keep current rendering and gameplay intact while adding host-owned run exit, a monotonic session epoch, stale-message rejection, deterministic store reset, and a DOM-free exit/re-entry fixture.

## Dependency note

Lobby readiness/start admission remains the required entry gate. Run exit authority is the next independent lifecycle boundary and should consume the sealed roster/session identity created by that work rather than inventing a second authority model.

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, rendering behavior, networking behavior, and deployment configuration did not change. No branch or pull request was created. Repo-local and central documentation were pushed directly to `main`.