# HorrorCorridor Agent Start

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Last aligned:** `2026-07-09T07-05-52-04-00`

## Purpose

This root `.agent/` folder is the operating memory for scheduled and manual breakdown work on `HorrorCorridor`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` organization repo list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local root `.agent` state.

No checked non-Cavalry repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected because central tracking was stale relative to repo-local command-result docs and the command-result fixture gate is still unresolved.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present
LuminaryLabs-Publish/HorrorCorridor       selected / tracked / root .agent present / central ledger catch-up target
LuminaryLabs-Publish/AetherVale           tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
```

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The active runtime is a Next/React client surface that mounts `GameCanvas`, creates a Three.js maze world, uses pointer-lock movement, routes cube interactions through `GameState`-returning rules, publishes authoritative snapshots for solo/host modes, accepts peer messages in host mode, and exposes runtime debug frames/events.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> build renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, and debug state
  -> enter pointer-lock first-person navigation
  -> derive action from carried cube plus distance to anomaly
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> local path silently returns when nextState === currentGameState
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default paths collapse to unchanged GameState
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot by implicit reason string
  -> update Three world, minimap, HUD, completion routing, and runtime debug frames
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
.agent/architecture-audit/2026-07-09T07-05-52-04-00-command-ledger-central-sync-dsk-map.md
.agent/render-audit/2026-07-09T07-05-52-04-00-debug-command-consumer-readback.md
.agent/gameplay-audit/2026-07-09T07-05-52-04-00-local-host-command-ledger-loop.md
.agent/command-authority-audit/2026-07-09T07-05-52-04-00-command-result-fixture-contract.md
.agent/interaction-audit/2026-07-09T07-05-52-04-00-silent-noop-reason-freeze.md
.agent/deploy-audit/2026-07-09T07-05-52-04-00-fixture-script-validation-gate.md
.agent/trackers/2026-07-09T07-05-52-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T07-05-52-04-00.md
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
HorrorCorridor Command Result Ledger Central Sync + Runtime Debug Consumer Fixture Gate
```

Build this before touching renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion.
