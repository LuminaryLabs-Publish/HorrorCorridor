# Playing HUD Browser Fixture Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-15T16-39-06-04-00`

## Summary

Source inspection identifies an active-run HUD mount gap, but deployment and browser correctness require executable evidence. This gate defines the minimum source, development, production-build and deployed-origin rows required before claiming a repair.

## Plan ledger

**Goal:** prove that every accepted `PLAYING` route mounts a complete HUD and working minimap across all delivery surfaces.

- [x] Define fixture environments.
- [x] Define required assertions and receipts.
- [x] Define failure and retirement rows.
- [ ] Implement and run the fixtures.

## Fixture environments

```txt
source component test
Next.js development server
production Next.js build/start
published or deployed origin
solo session
host session
client session
```

## Required assertions

```txt
enter PLAYING successfully
objective surface exists
anomaly sequence surface exists
held-item surface exists
local player/session surface exists
runtime-minimap canvas exists before first admitted draw
minimap receives a non-null 2D context
minimap updates after accepted pose and snapshot changes
settings open/close preserves required surfaces
debug toggle preserves required surfaces
completion transition produces one terminal generation
lobby/title transition retires the PLAYING generation
late minimap draw after retirement is rejected
FirstPlayingHudFrameAck matches route, snapshot and world frame
```

## Required evidence

```txt
fixture command and exit code
source and build commit SHA
route and screen revisions
HudMountGeneration
required and mounted surface lists
minimap canvas/context generation
world and HUD frame receipts
screenshots for PLAYING and COMPLETED
console and page error capture
artifact or deployed URL identity
```

## Failure rows

```txt
missing minimap canvas
missing required HUD surface
settings replaces base HUD
debug replaces base HUD
stale snapshot projection
canvas replaced without mount revision
route retired during frame
production build differs from source
published origin differs from build
```

## Claim boundary

No fixture was run in this audit. Build, deployment and browser parity remain unproven.