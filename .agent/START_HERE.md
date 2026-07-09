# HorrorCorridor Agent Start

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Last aligned:** `2026-07-09T06-59-46-04-00`

## Purpose

This root `.agent/` folder is the operating memory for scheduled and manual breakdown work on `HorrorCorridor`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` organization repo list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry repo was fully new, absent from the central ledger, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`HorrorCorridor` was selected because central tracking still lagged behind repo-local `.agent` state and it remains the oldest high-value command-authority catch-up target in the checked set.

## Current source route

```txt
HorrorCorridor-V1/package.json
  -> Next 16 app
  -> src/components/game/GameShell.tsx
  -> solo / host / join lobby flow
  -> createInitialGameState
  -> GameCanvas
  -> Three.js maze world
  -> local or network authority loop
  -> runtime debug export
```

## Latest breakdown handoff

```txt
HorrorCorridor Result Envelope Source Splice + Runtime Debug Projection Fixture Gate
```

Start here:

```txt
.agent/trackers/2026-07-09T06-59-46-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-09T06-59-46-04-00-result-envelope-gamecanvas-dsk-map.md
.agent/command-authority-audit/2026-07-09T06-59-46-04-00-result-envelope-source-splice-contract.md
.agent/deploy-audit/2026-07-09T06-59-46-04-00-command-fixture-validation-gate.md
```

## Do next

Build the typed command result seam before visual expansion, PeerJS extraction, minimap work, or new multiplayer features.

The next code pass should add pure command/result source modules, fixture rows, and additive runtime debug readback, then splice `GameCanvas.tsx` to consume result and publish decisions without relying on object identity or silent no-op behavior.
