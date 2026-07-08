# HorrorCorridor Agent Start

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Last aligned:** `2026-07-08T12-29-17-04:00`

## Purpose

This root `.agent/` folder is the operating memory for scheduled and manual breakdown work on `HorrorCorridor`.

Read this folder before changing implementation code.

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The current runtime uses Next, React, Three.js, Zustand, PeerJS, and TypeScript.

The player starts from a menu, enters solo/host/client mode, moves through a seeded corridor maze, manipulates colored cubes, solves an ordered anomaly sequence, avoids growing ooze pressure, and reaches a victory/completion screen.

## Current selection reason

The accessible `LuminaryLabs-Publish` repo list was read from the GitHub App installation and compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger/status-summary state.

```txt
LuminaryLabs-Publish/HorrorCorridor      selected fallback follow-up
LuminaryLabs-Publish/AetherVale          tracked; root .agent represented centrally
LuminaryLabs-Publish/TheOpenAbove        tracked; root .agent represented centrally
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked; root .agent represented centrally
LuminaryLabs-Publish/PrehistoricRush     tracked; root .agent represented centrally
LuminaryLabs-Publish/ZombieOrchard       tracked; root .agent observed directly this run
LuminaryLabs-Publish/IntoTheMeadow       tracked; root .agent represented centrally
LuminaryLabs-Publish/MyCozyIsland        tracked; root .agent represented centrally
LuminaryLabs-Publish/TheUnmappedHouse    tracked; root .agent represented centrally
```

No non-Cavalry repo was found that was fully new, absent from central tracking, undocumented, or missing root `.agent` state.

`TheCavalryOfRome` remains excluded by standing rule.

This pass selected `LuminaryLabs-Publish/HorrorCorridor` as the oldest eligible fallback among the sampled current ledger states. The remaining high-value seam is not more renderer detail; it is the command-authority consumer seam between result-returning rule wrappers and `GameCanvas.tsx` local/host publishing.

## Current route

```txt
HorrorCorridor-V1/package.json
  -> Next app scripts and validation harness scripts
  -> GameCanvas.tsx
  -> buildGameStateFromSnapshot()
  -> renderer/camera/postprocess/world/minimap/debug initialization
  -> pointer-lock input and local pose prediction
  -> networkRules.ts and interactionRules.ts
  -> publishAuthoritativeState()
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
  -> local-authority-result-consumer or host-authority-result-consumer
  -> publishAuthoritativeState only when the decision allows it
  -> RuntimeDebug command projection
  -> DOM-free fixture replay
  -> browser/live validation after fixture proof
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T12-29-17-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T12-29-17-04-00-command-debug-readback-map.md
.agent/gameplay-audit/2026-07-08T12-29-17-04-00-local-host-authority-loop.md
.agent/command-authority-audit/2026-07-08T12-29-17-04-00-consumer-acceptance-map.md
.agent/trackers/2026-07-08T12-29-17-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T12-29-17-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
```

## Main rule

Do not let `GameCanvas.tsx`, PeerJS event handlers, DOM input, renderer code, object identity checks, or silent unchanged-state returns own command authority long term.

Move command legality into result-returning domain kits, then let local authority, host authority, runtime debug, renderer debug overlay, replay fixtures, and future external GameHost diagnostics consume those command results.

## Current next safe ledge

Build the **HorrorCorridor Command Result Consumer Acceptance Map + Fixture Gate**.

Preserve existing solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior while adding result-returning wrappers beside the current `GameState`-returning rule functions.

Stop before renderer extraction, minimap extraction, PeerJS extraction, scene dressing expansion, new level content, or new visual object-kit work.