# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T13-58-16-04-00`

## Current safe ledge

```txt
HorrorCorridor Command Outcome Source Ledger + Runtime Debug Fixture Gate
```

## Selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against the tracked ledger in `LuminaryLabs-Dev/LuminaryLabs` and repo-local root `.agent` state.

All nine eligible non-Cavalry repositories are tracked and have root audit state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

`HorrorCorridor` was selected as the oldest eligible documented fallback.

```txt
HorrorCorridor       selected / prior central latest 2026-07-10T12-29-26-04-00
PhantomCommand       tracked / central latest 2026-07-10T12-40-45-04-00
ZombieOrchard        tracked / central latest 2026-07-10T12-49-54-04-00
TheUnmappedHouse     tracked / central latest 2026-07-10T13-01-11-04-00
MyCozyIsland         tracked / central latest 2026-07-10T13-08-51-04-00
TheOpenAbove         tracked / central latest 2026-07-10T13-21-23-04-00
PrehistoricRush      tracked / central latest 2026-07-10T13-30-15-04-00
AetherVale           tracked / central latest 2026-07-10T13-41-21-04-00
IntoTheMeadow        tracked / central latest 2026-07-10T13-50-05-04-00
TheCavalryOfRome     excluded by rule
```

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T13-58-16-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T13-58-16-04-00.md
.agent/architecture-audit/2026-07-10T13-58-16-04-00-command-outcome-source-ledger-dsk-map.md
.agent/render-audit/2026-07-10T13-58-16-04-00-runtime-debug-outcome-projection-gap.md
.agent/gameplay-audit/2026-07-10T13-58-16-04-00-local-host-outcome-consumer-loop.md
.agent/command-authority-audit/2026-07-10T13-58-16-04-00-command-outcome-publish-contract.md
.agent/interaction-audit/2026-07-10T13-58-16-04-00-interaction-reason-attribution-map.md
.agent/deploy-audit/2026-07-10T13-58-16-04-00-command-outcome-fixture-gate.md
```

## Current interaction loop

```txt
start menu
  -> solo, host, or join
  -> room identity, lobby, loading, readiness
  -> GameCanvas runtime initialization
  -> pointer-lock movement and mouse look
  -> interact key derives pickup, drop, place, or remove
  -> local solo/host applies GameState-returning rules directly
  -> client sends PLAYER_UPDATE or TRY_INTERACT
  -> host applies network, interaction, ooze, and victory rules
  -> publish or skip is inferred from object identity and reason strings
  -> authoritative snapshot feeds renderer, minimap, HUD, completion route, and runtime debug
```

## Main finding

The live game is already playable. The next safe work is not renderer, PeerJS, minimap, post-processing, route, maze-content, or scene-dressing expansion.

The missing boundary is a source-owned command outcome ledger. `interactionRules.ts`, `networkRules.ts`, `oozeRules.ts`, and `winRules.ts` still return `GameState` only. Accepted, rejected, skipped, unchanged, recovery, ooze, victory, and publish-only decisions are therefore not first-class records, and `runtimeDebugStore.ts` cannot explain why state changed or why publication was skipped.

## First implementation targets

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureRows.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winResultRules.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Validation posture

Documentation only. Runtime source, branches, pull requests, dependencies, routes, and deployment configuration were not changed. Existing checks and the planned command fixture were not run.