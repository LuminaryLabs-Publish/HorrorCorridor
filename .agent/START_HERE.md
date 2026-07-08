# HorrorCorridor Agent Start

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Last aligned:** `2026-07-08T06:28:31-04:00`

## Purpose

This root `.agent/` folder is the operating memory for scheduled and manual breakdown work on `HorrorCorridor`.

Read this folder before changing implementation code.

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The current runtime uses Next, React, Three.js, Zustand, PeerJS, and TypeScript.

The player starts from a menu, enters solo/host/client mode, moves through a seeded corridor maze, manipulates colored cubes, solves an ordered anomaly sequence, avoids growing ooze pressure, and reaches a victory/completion screen.

## Current selection reason

The full accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

No new untracked eligible repo was found, and eligible non-Cavalry repos already had root `.agent/START_HERE.md` state.

This pass selected `LuminaryLabs-Publish/HorrorCorridor` as an oldest/high-value follow-up because the central ledger was stale relative to repo-local `.agent` state and the command-result fixture gate still needs a precise acceptance ledger before source work.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/render-surface-audit.md
.agent/gameplay-audit/authority-loop-audit.md
.agent/command-authority-audit/result-reason-matrix.md
.agent/command-authority-audit/fixture-gate-implementation-map.md
.agent/command-authority-audit/command-result-fixture-acceptance-ledger.md
.agent/trackers/2026-07-08T06-28-31-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T06-28-31-04-00.md
.agent/kit-registry.json
```

Earlier high-value entries:

```txt
.agent/trackers/2026-07-08T05-00-17-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T05-00-17-04-00.md
.agent/trackers/2026-07-08T03-50-37-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T03-50-37-04-00.md
```

## Source files to inspect next

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Main rule

Do not let `GameCanvas.tsx`, PeerJS event handlers, DOM input, renderer code, or object identity checks own command authority long term.

Move command legality into result-returning domain kits, then let local authority, host authority, runtime debug, renderer, and replay fixtures consume those command results.

## Current next safe ledge

Build the **HorrorCorridor Command Result Fixture Gate**.

Preserve the existing solo, host, client, renderer, minimap, debug overlay, and PeerJS behavior while adding result-returning wrappers beside the current `GameState`-returning rule functions.

Start with the implementation map and acceptance ledger:

```txt
.agent/command-authority-audit/fixture-gate-implementation-map.md
.agent/command-authority-audit/command-result-fixture-acceptance-ledger.md
```
