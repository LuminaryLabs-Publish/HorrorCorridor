# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T15-31-03-04-00`

## Current safe ledge

```txt
HorrorCorridor Authority Command Correlation Ledger + Publish Parity Fixture Gate
```

## Selection result

The full accessible `LuminaryLabs-Publish` repository inventory was compared against the central ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent` state.

All nine eligible non-Cavalry repositories remain centrally tracked and have root audit state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule. `HorrorCorridor` was the oldest eligible documented fallback at selection time.

```txt
HorrorCorridor       selected / prior central latest 2026-07-10T13-58-16-04-00
PhantomCommand       tracked / 2026-07-10T14-11-51-04-00
ZombieOrchard        tracked / 2026-07-10T14-21-28-04-00
TheUnmappedHouse     tracked / 2026-07-10T14-28-47-04-00
MyCozyIsland         tracked / 2026-07-10T14-42-01-04-00
TheOpenAbove         tracked / 2026-07-10T14-50-38-04-00
PrehistoricRush      tracked / 2026-07-10T14-59-00-04-00
AetherVale           tracked / 2026-07-10T15-09-26-04-00
IntoTheMeadow        tracked / 2026-07-10T15-18-29-04-00
TheCavalryOfRome     excluded by rule
```

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T15-31-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T15-31-03-04-00.md
.agent/architecture-audit/2026-07-10T15-31-03-04-00-authority-command-correlation-dsk-map.md
.agent/render-audit/2026-07-10T15-31-03-04-00-runtime-debug-publish-correlation-gap.md
.agent/gameplay-audit/2026-07-10T15-31-03-04-00-local-host-authority-parity-loop.md
.agent/interaction-audit/2026-07-10T15-31-03-04-00-interaction-publish-asymmetry-map.md
.agent/network-authority-audit/2026-07-10T15-31-03-04-00-command-to-snapshot-correlation-contract.md
.agent/deploy-audit/2026-07-10T15-31-03-04-00-publish-parity-fixture-gate.md
```

## Current interaction loop

```txt
start menu
  -> solo, host, or join
  -> room identity, readiness, seeded maze, cubes, anomaly, and players
  -> GameCanvas initializes Three.js, post-processing, minimap, input, transport, cadence, and debug
  -> pointer-lock movement and mouse look update local pose
  -> interact derives pickup, drop, place, or remove
  -> local authority applies the rule and skips publication when object identity is unchanged
  -> host TRY_INTERACT applies the same rule but publishes an authoritative snapshot unconditionally
  -> periodic host/solo cadence advances ooze and publishes regardless of semantic command mutation
  -> snapshots feed renderer, minimap, HUD, completion routing, and runtime debug
```

## Main finding

The missing boundary is now more precise than a generic command-result contract: the game cannot correlate one command across authority mode, result, publication decision, and emitted snapshot tick.

```txt
local rejected/no-op interaction -> no publish
host rejected/no-op TRY_INTERACT -> publish resync snapshot
request-sync -> recovery publish without a typed command result
periodic ooze cadence -> publish even when no trail element was added or removed
runtime debug -> separate free-form events and aggregate frames with no shared command correlation id
```

The next source pass should preserve the existing cadence and networking behavior while making these differences explicit and fixture-proven. Do not begin with renderer, PeerJS, minimap, post-processing, maze content, or scene-dressing expansion.

## First implementation targets

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandCorrelation.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/authorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/scripts/horror-corridor-authority-parity-fixture.mjs
```

## Validation state

Documentation only. Runtime source, package scripts, dependencies, branches, pull requests, routes, and deployment configuration were not changed. Existing checks were not run because this pass only refreshed internal documentation.