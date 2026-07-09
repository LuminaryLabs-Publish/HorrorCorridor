# HorrorCorridor Agent Start

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Last aligned:** `2026-07-08T20-30-19-04-00`

## Purpose

This root `.agent/` folder is the operating memory for scheduled and manual breakdown work on `HorrorCorridor`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local `.agent/START_HERE.md` timestamps.

No checked non-Cavalry repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected as the oldest sampled eligible fallback because its root `.agent` timestamp was older than the other checked non-excluded repos and its command fixture source boundary remains unresolved.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      selected / tracked / root .agent present / oldest sampled alignment / command fixture seed-state seam unresolved
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / recently refreshed
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / recently refreshed
```

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The active runtime is a Next/React client surface that mounts `GameCanvas`, creates a Three.js maze world, uses pointer-lock movement, routes cube interactions through GameState-returning rules, publishes authoritative snapshots for solo/host modes, accepts peer messages in host mode, and exposes runtime debug frames/events.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> build renderer, camera, post-processing, maze world, minimap, pose refs, input refs, and debug state
  -> enter pointer-lock first-person navigation
  -> derive action from carried cube + distance to anomaly
  -> route local interaction through applyNetworkInteractionRequest
  -> route peer TRY_INTERACT through host applyNetworkInteractionRequest
  -> route peer PLAYER_UPDATE through host applyNetworkPlayerUpdate
  -> silently collapse invalid/no-op paths to unchanged GameState
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> build and publish replicated snapshot when current gates say so
  -> update Three.js world, minimap, HUD, completion state, and runtime debug frames
```

## Next safe implementation ledge

```txt
HorrorCorridor Command Fixture Seed State Contract + Consumer Replay Gate
```

Build this before touching renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion.

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T20-30-19-04-00-command-fixture-seed-state-dsk-map.md
.agent/render-audit/2026-07-08T20-30-19-04-00-debug-command-readback-contract.md
.agent/gameplay-audit/2026-07-08T20-30-19-04-00-local-host-replay-loop.md
.agent/command-authority-audit/2026-07-08T20-30-19-04-00-seed-state-consumer-fixture-contract.md
.agent/trackers/2026-07-08T20-30-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T20-30-19-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/features/networking/protocol/syncSnapshot.ts
```
