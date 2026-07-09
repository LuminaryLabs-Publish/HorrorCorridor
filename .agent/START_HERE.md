# HorrorCorridor Agent Start

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Last aligned:** `2026-07-09T12-20-08-04-00`

## Purpose

This root `.agent/` folder is the operating memory for scheduled and manual breakdown work on `HorrorCorridor`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repository list was compared against sampled repo-local `.agent/START_HERE.md` state and the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked non-Cavalry repo was fully new, absent from central tracking, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected as the oldest eligible documented fallback because its sampled repo-local `.agent` alignment was `2026-07-09T10-10-32-04-00`, older than the other checked non-Cavalry repos.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / latest sampled 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / latest sampled 2026-07-09T10-10-32-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / latest sampled 2026-07-09T11-30-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / latest sampled 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / latest sampled 2026-07-09T11-00-39-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / latest sampled 2026-07-09T11-39-50-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / latest sampled 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / latest sampled 2026-07-09T10-29-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / latest sampled 2026-07-09T12-00-36-04-00
```

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The active runtime is a Next/React client surface that mounts `GameCanvas`, creates a Three.js maze world, uses pointer-lock movement, routes cube interactions through `GameState`-returning rules, publishes authoritative snapshots for solo/host modes, accepts peer messages in host mode, and exposes runtime debug frames/events.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> build renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, and debug state
  -> pointer-lock first-person navigation
  -> keyboard/mouse input updates local pose and view angles
  -> interact key derives pickup/drop/place/remove from carried-cube state and distance to anomaly
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> unchanged state returns silently on local path
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default collapse to unchanged state
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot through implicit reason string
  -> update Three world, minimap, HUD, completion route, and runtime debug frame
```

## Target authority loop

```txt
CommandFixtureSeed
  -> CommandEnvelope
  -> CommandReasonCatalog
  -> InteractionPreflightResult or NetworkCommandPreflightResult
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityResultConsumer or HostAuthorityResultConsumer
  -> RuntimeDebugCommandProjection
  -> ReplayMatrixRow
  -> GameCanvas consumer splice after proof
```

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T12-20-08-04-00-result-first-command-readback-ledger-dsk-map.md
.agent/render-audit/2026-07-09T12-20-08-04-00-debug-command-readback-ledger.md
.agent/gameplay-audit/2026-07-09T12-20-08-04-00-command-result-consumer-loop.md
.agent/command-authority-audit/2026-07-09T12-20-08-04-00-command-result-fixture-gate-refresh.md
.agent/interaction-audit/2026-07-09T12-20-08-04-00-rejection-reason-coverage-map.md
.agent/deploy-audit/2026-07-09T12-20-08-04-00-command-fixture-check-wire-map.md
.agent/trackers/2026-07-09T12-20-08-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T12-20-08-04-00.md
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

## Source files to add next

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureRows.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Current next safe ledge

```txt
HorrorCorridor Result-First Command Readback Ledger Refresh + Fixture Gate
```

Build this before touching renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion.
