# Active Gameplay HUD Projection DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-15T16-39-06-04-00`

## Summary

The runtime has accepted gameplay state, a route-aware HUD component and a complete minimap draw executor, but active-run surface selection is controlled by an early React return. This audit defines a composed DSK that owns which HUD surfaces exist for each accepted route revision and proves the first matching frame.

## Plan ledger

**Goal:** separate HUD state derivation, route policy, surface mounting, minimap binding and frame acknowledgement into explicit cooperating kits.

- [x] Map current state and render ownership.
- [x] Preserve existing gameplay, renderer and minimap services.
- [x] Define the parent authority and child surfaces.
- [ ] Implement and prove the DSK.

## Current topology

```txt
useUiStore.screen
useSessionStore room and peer identity
useRuntimeStore authoritative snapshot
  -> HUDOverlay
       -> PLAYING early return
            -> SettingsOverlay
            -> FrameDebugPanel
       -> COMPLETED branch
            -> objective
            -> anomaly sequence
            -> held item
            -> player status
            -> Minimap canvas

GameCanvas RAF
  -> query runtime-minimap
  -> drawMinimapFrame(canvas or null)
  -> post-processing render
```

## Required parent domain

```txt
corridor-active-gameplay-hud-projection-mount-authority-domain
```

## Candidate kit map

```txt
Gameplay HUD State
  gameplay-hud-state-kit
  gameplay-hud-route-policy-kit

Surface Identity and Mounting
  hud-surface-identity-kit
  hud-mount-generation-kit
  minimap-mount-admission-kit
  hud-pointer-event-policy-kit

Semantic Projection
  objective-projection-kit
  anomaly-sequence-progress-kit
  held-item-projection-kit
  local-player-status-projection-kit

Composition
  settings-control-surface-kit
  debug-overlay-composition-kit
  minimap-frame-binding-kit

Results and Lifecycle
  gameplay-hud-projection-result-kit
  first-playing-hud-frame-ack-kit
  hud-route-retirement-kit

Proof
  playing-hud-browser-fixture-kit
  source-build-pages-hud-parity-fixture-kit
```

## Command path

```txt
GameplayHudProjectionCommand
  -> require accepted PLAYING route and screen revision
  -> read accepted snapshot, local player and policy revisions
  -> derive immutable GameplayHudReadModel
  -> admit required PLAYING surface set
  -> adopt HudMountGeneration
  -> mount objective, anomaly sequence, held item, player status and minimap
  -> compose settings and debug as additive overlays
  -> bind minimap frame execution to the active canvas generation
  -> publish GameplayHudProjectionResult
  -> publish FirstPlayingHudFrameAck
```

## Retirement path

```txt
route or screen transition
  -> close active HudMountGeneration
  -> remove route-owned surfaces
  -> invalidate minimap canvas lease
  -> reject later draw work for the retired generation
  -> publish HudRouteRetirementReceipt
```

## Invariants

```txt
PLAYING owns one complete gameplay HUD surface set
COMPLETED presentation does not define PLAYING availability
settings and debug overlays are additive rather than replacing the HUD
one active minimap canvas belongs to one HudMountGeneration
minimap draw results reference the active canvas generation
route retirement rejects late frame work
first-frame acknowledgement binds route, snapshot and mount revisions
```

## Validation boundary

No runtime DSK was implemented. The map records the required ownership and evidence boundary only.