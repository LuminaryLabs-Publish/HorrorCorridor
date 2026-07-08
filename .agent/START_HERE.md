# HorrorCorridor Agent Start

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Last aligned:** `2026-07-08T15:39:43-04:00`

## Purpose

This root `.agent/` folder is the operating memory for scheduled and manual breakdown work on `HorrorCorridor`.

Read this folder before changing implementation code.

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The current runtime uses Next, React, Three.js, Zustand, PeerJS, and TypeScript.

The player starts from a menu, enters solo/host/client mode, moves through a seeded corridor maze, manipulates colored cubes, solves an ordered anomaly sequence, avoids growing ooze pressure, and reaches a victory/completion screen.

## Current selection reason

The accessible `LuminaryLabs-Publish` repo list was read and compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger state.

```txt
LuminaryLabs-Publish/HorrorCorridor      selected fallback follow-up
LuminaryLabs-Publish/IntoTheMeadow       tracked / latest sampled alignment 2026-07-08T15-28-13-04-00
LuminaryLabs-Publish/AetherVale          tracked / latest sampled alignment 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / latest sampled alignment 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / latest sampled alignment 2026-07-08T14-08-24-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / latest sampled alignment 2026-07-08T14:51:11-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / latest sampled alignment 2026-07-08T14:18:45-04:00
LuminaryLabs-Publish/MyCozyIsland        tracked / latest sampled alignment 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / latest sampled alignment 2026-07-08T14-31-06-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
```

No non-Cavalry repo was found that was fully new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`TheCavalryOfRome` remains excluded by standing rule.

This pass selected `LuminaryLabs-Publish/HorrorCorridor` because it is the oldest current eligible fallback and because the command fixture source files still do not exist while `GameCanvas.tsx` continues to consume `GameState`-returning rule functions directly.

## Current route

```txt
HorrorCorridor-V1/package.json
  -> Next app scripts and validation harness scripts
  -> GameCanvas.tsx
  -> buildGameStateFromSnapshot()
  -> renderer/camera/postprocess/world/minimap/debug initialization
  -> pointer-lock input and local pose prediction
  -> networkRules.ts and interactionRules.ts
  -> publishAuthoritativeState(reason)
  -> runtime debug frames/events
```

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, stores, local pose, networking, and debug state
  -> enter pointer-lock first-person navigation
  -> derive interact action from distance-to-end and carried-cube state
  -> pickup, drop, place, or remove cube
  -> ordered sequence validates anomaly completion
  -> ooze cadence advances on host/local authority ticks
  -> authoritative snapshot is built and published or skipped
  -> renderer, minimap, HUD, completion screen, and runtime debug consume latest snapshot
```

## Target authority loop

```txt
local input or peer message
  -> CommandEnvelope
  -> interaction/network preflight
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> publishAuthoritativeState only when the decision allows it
  -> DOM-free fixture replay
  -> browser/live validation after fixture proof
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T15-39-43-04-00-command-fixture-source-manifest.md
.agent/render-audit/2026-07-08T15-39-43-04-00-debug-command-projection-readback.md
.agent/gameplay-audit/2026-07-08T15-39-43-04-00-local-host-command-fixture-boundary.md
.agent/command-authority-audit/2026-07-08T15-39-43-04-00-source-file-manifest-and-adapter-boundary.md
.agent/trackers/2026-07-08T15-39-43-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T15-39-43-04-00.md
```

## Source files to inspect next

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Source files to create before GameCanvas rewiring

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Main rule

Do not let `GameCanvas.tsx`, PeerJS event handlers, DOM input, renderer code, object identity checks, or silent unchanged-state returns own command authority long term.

Move command legality into result-returning domain kits, prove local/host consumer behavior with a DOM-free fixture, and only then wire `GameCanvas.tsx` to consume the decision metadata.

## Current next safe ledge

Build the **HorrorCorridor Command Fixture Source File Manifest + Legacy Adapter Boundary**.

Preserve existing solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior while adding result-returning wrappers and local/host command consumers beside the current `GameState`-returning rule functions.

Stop before renderer extraction, minimap extraction, PeerJS extraction, scene dressing expansion, new level content, or new visual object-kit work.
