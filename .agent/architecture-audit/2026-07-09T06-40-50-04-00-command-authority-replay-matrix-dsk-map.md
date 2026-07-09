# HorrorCorridor Command Authority Replay Matrix DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-40-50-04-00`

## Selection outcome

`HorrorCorridor` was selected after comparing the accessible `LuminaryLabs-Publish` repository list against central repo-ledger state.

No eligible non-Cavalry repo was new, missing from the ledger, missing sampled root `.agent` state, or otherwise undocumented.

`TheCavalryOfRome` was excluded.

## Current interaction loop

```txt
open app
-> start menu
-> select solo / host / join
-> create room identity or join code
-> readiness/loading gate
-> mount GameCanvas
-> build Three renderer, camera, post-processing, maze world, minimap, runtime stores, transport adapters, local pose, and debug capture
-> pointer-lock movement and look update local pose
-> interact derives pickup/drop/place/remove from carried-cube state and distance to anomaly
-> solo/host path calls applyNetworkInteractionRequest directly
-> client path sends TRY_INTERACT
-> host path applies PLAYER_UPDATE and TRY_INTERACT through GameState-returning rules
-> invalid/request-sync/toggle-ready/cancel/default branches collapse to unchanged GameState
-> sync held cubes
-> advance ooze cadence
-> publish snapshot by implicit reason string
-> update renderer, minimap, HUD, completion routing, and runtime debug frames
```

## DSK/domain breakdown

```txt
horror-corridor-domain
├─ app-session-domain
│  ├─ corridor-session-domain-kit
│  ├─ ui-screen-routing-kit
│  └─ readiness-state-kit
├─ peer-sync-domain
│  ├─ peer-room-sync-domain-kit
│  ├─ full-sync-message-kit
│  ├─ player-update-message-kit
│  └─ try-interact-message-kit
├─ maze-state-domain
│  ├─ maze-snapshot-bootstrap-kit
│  ├─ maze-cell-lookup-kit
│  ├─ cube-spawn-bootstrap-kit
│  └─ anomaly-sequence-bootstrap-kit
├─ player-domain
│  ├─ first-person-corridor-player-kit
│  ├─ pointer-lock-input-kit
│  ├─ maze-collision-resolution-kit
│  └─ camera-pose-sync-kit
├─ legacy-interaction-domain
│  ├─ corridor-interaction-domain-kit
│  ├─ ordered-anomaly-sequence-kit
│  └─ ooze-trail-domain-kit
├─ command-authority-domain
│  ├─ command-envelope-contract-kit
│  ├─ command-reason-catalog-kit
│  ├─ command-result-envelope-kit
│  ├─ command-decision-contract-kit
│  ├─ publish-decision-snapshot-kit
│  ├─ command-result-journal-kit
│  ├─ command-seed-state-fixture-kit
│  ├─ interaction-preflight-kit
│  ├─ interaction-result-rules-kit
│  ├─ network-result-rules-kit
│  ├─ local-authority-result-consumer-kit
│  ├─ host-authority-result-consumer-kit
│  ├─ command-result-fixture-matrix-kit
│  └─ command-replay-fixture-kit
├─ render-domain
│  ├─ corridor-render-world-kit
│  ├─ corridor-minimap-kit
│  ├─ post-processing-kit
│  ├─ scene-dressing-descriptor-kit
│  ├─ mesh-object-kit-catalog
│  └─ procedural-texture-kit-family
└─ diagnostics-domain
   ├─ runtime-debug-frame-kit
   ├─ runtime-debug-command-projection-kit
   └─ central-ledger-sync-kit
```

## Services the kits offer

```txt
corridor-session-domain-kit: mode, room id, local player id, readiness, pause, completion route
peer-room-sync-domain-kit: host transport, client transport, full sync, player update, TRY_INTERACT send/receive
maze-snapshot-bootstrap-kit: seeded maze, cell lookup, start/end cell, cube spawn, anomaly sequence
first-person-corridor-player-kit: input state, look deltas, movement integration, collision, pose projection
corridor-interaction-domain-kit: pickup, drop, place, remove as legacy GameState transforms
ordered-anomaly-sequence-kit: sequence-slot validation, solved slot state, victory state
ooze-trail-domain-kit: cadence tick, ooze spawn, decay, spacing guard
corridor-render-world-kit: Three scene/camera/renderer/world object lifecycle
corridor-minimap-kit: minimap canvas projection from replicated snapshot
runtime-debug-frame-kit: frame/event/cadence/snapshot readback
command-envelope-contract-kit: normalized command id/source/action/payload shape
command-reason-catalog-kit: stable accepted/rejected/unchanged/skipped/publish-only/victory reasons
command-result-envelope-kit: before/after summaries, changed flag, events, diagnostics, legacy return adapter
publish-decision-snapshot-kit: publish/skip/no-op/recovery/victory decision fields
local-authority-result-consumer-kit: local journal, publish skip/publish/victory behavior
host-authority-result-consumer-kit: host journal, TRY_INTERACT skip, request-sync recovery, victory publish
runtime-debug-command-projection-kit: latest command result, publish decision, journal counters, fixture parity
command-replay-fixture-kit: DOM-free replay rows and parity output
```

## Current source-backed kits

```txt
corridor-session-domain-kit
peer-room-sync-domain-kit
maze-snapshot-bootstrap-kit
first-person-corridor-player-kit
corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
mesh-object-kit-catalog
procedural-texture-kit-family
```

## Planned next-cut kits

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
command-decision-contract-kit
publish-decision-snapshot-kit
command-result-journal-kit
command-seed-state-fixture-kit
interaction-preflight-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-command-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
```

## Main architecture finding

Do not extract rendering, minimap, PeerJS, or scene dressing first.

The highest-value architecture seam is command authority: every silent no-op path needs a typed reason, every state transition needs a CommandResult, and every publish/skip/recovery/victory branch should be derived from a PublishDecision before `GameCanvas.tsx` is rewired.
