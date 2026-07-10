# HorrorCorridor Agent Start

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Last aligned:** `2026-07-10T08-11-35-04-00`

## Purpose

This root `.agent/` folder is the operating memory for breakdown and implementation work on `HorrorCorridor`.

Read this folder before changing implementation code.

## Current selection result

The current public `LuminaryLabs-Publish` repository list was compared against sampled repo-local `.agent` state and the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked public non-Cavalry repo was new, absent from central tracking, missing root `.agent` state, recently added, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected as the oldest eligible documented fallback.

## Public Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       selected / prior central latest 2026-07-10T06-48-54-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T06-59-18-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T07-08-10-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T07-20-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T07-29-12-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T07-41-42-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T07-50-29-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T07-59-27-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The active runtime is a Next/React client surface that mounts `GameCanvas`, creates a Three.js maze world, uses pointer-lock movement, routes cube interactions through `GameState`-returning rules, publishes authoritative snapshots for solo/host modes, accepts peer messages in host mode, advances ooze/victory through `GameState` rules, and exposes runtime debug frames/events.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> complete lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> initialize renderer, camera, post-processing, maze world, minimap, input refs, pose refs, cadence state, transport listener, and debug state
  -> pointer-lock first-person navigation
  -> key/mouse input updates local pose and view angles
  -> interact key derives pickup/drop/place/remove from carried cube and anomaly distance
  -> local solo/host applies applyNetworkInteractionRequest directly
  -> unchanged nextState returns silently without result metadata
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> request-sync/toggle-ready/cancel/default return unchanged or recovery-only state
  -> ooze cadence advances through GameState-returning rules
  -> ordered sequence completion validates victory through GameState-returning rules
  -> publishAuthoritativeState emits implicit reason strings
  -> renderer, minimap, HUD, completion route, and runtime debug consume latest snapshot
```

## Target authority loop

```txt
CommandEnvelope
  -> CommandReasonCatalog
  -> CommandResultEnvelope
  -> PublishDecisionSnapshot
  -> CommandJournal
  -> LocalAuthorityCommandConsumer
  -> HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> CommandFixtureMatrix
  -> GameCanvas consumer splice after proof
```

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T08-11-35-04-00-command-debug-projection-dsk-map.md
.agent/render-audit/2026-07-10T08-11-35-04-00-runtime-debug-command-projection-gap.md
.agent/gameplay-audit/2026-07-10T08-11-35-04-00-local-host-command-debug-loop.md
.agent/command-authority-audit/2026-07-10T08-11-35-04-00-result-publish-decision-contract.md
.agent/interaction-audit/2026-07-10T08-11-35-04-00-noop-rejection-reason-map.md
.agent/deploy-audit/2026-07-10T08-11-35-04-00-command-debug-fixture-gate.md
.agent/trackers/2026-07-10T08-11-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T08-11-35-04-00.md
.agent/kit-registry.json
```

## Source files to inspect before implementation

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/oozeRules.ts
HorrorCorridor-V1/src/features/game-state/domain/winRules.ts
HorrorCorridor-V1/src/features/game-state/domain/gameTypes.ts
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/features/networking/protocol/messageTypes.ts
HorrorCorridor-V1/src/features/networking/protocol/syncSnapshot.ts
```

## Current next safe ledge

```txt
HorrorCorridor Command Debug Projection Ledger Refresh + Result Fixture Gate
```

Build this before touching renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, scene dressing, new maze content, or visual object-kit expansion.
