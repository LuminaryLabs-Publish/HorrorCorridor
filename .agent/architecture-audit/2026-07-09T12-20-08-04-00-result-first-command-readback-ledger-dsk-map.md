# HorrorCorridor DSK / Domain Architecture Audit

**Timestamp:** `2026-07-09T12-20-08-04-00`

**Selected repo:** `LuminaryLabs-Publish/HorrorCorridor`

**Scope:** documentation-only breakdown and central-ledger refresh.

## Selection result

No checked non-Cavalry Publish repo was new, ledger-absent, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`HorrorCorridor` was selected as the oldest eligible sampled fallback.

## DSK architecture read

```txt
HorrorCorridor
├─ application-shell
│  ├─ next-client-runtime
│  ├─ react-game-surface
│  └─ ui-screen-routing
├─ session-domain
│  ├─ corridor-session-domain-kit
│  ├─ peer-room-sync-domain-kit
│  ├─ host-transport
│  ├─ client-transport
│  └─ replicated-snapshot-protocol
├─ world-bootstrap-domain
│  ├─ maze-snapshot-bootstrap-kit
│  ├─ maze-cell-lookup
│  ├─ cube-spawn-bootstrap
│  └─ anomaly-sequence-bootstrap
├─ player-domain
│  ├─ first-person-corridor-player-kit
│  ├─ pointer-lock-control
│  ├─ keyboard-input
│  ├─ mouse-look-input
│  ├─ player-view-angles
│  ├─ player-movement-integration
│  └─ maze-collision-resolution
├─ gameplay-domain
│  ├─ corridor-interaction-domain-kit
│  ├─ ordered-anomaly-sequence-kit
│  ├─ ooze-trail-domain-kit
│  ├─ legacy-game-state-interaction-rules
│  └─ legacy-game-state-network-rules
├─ planned-command-authority-domain
│  ├─ command-envelope-contract-kit
│  ├─ command-reason-catalog-kit
│  ├─ command-result-envelope-kit
│  ├─ publish-decision-snapshot-kit
│  ├─ command-result-journal-kit
│  ├─ interaction-preflight-kit
│  ├─ interaction-result-rules-kit
│  ├─ network-result-rules-kit
│  ├─ local-authority-result-consumer-kit
│  ├─ host-authority-result-consumer-kit
│  ├─ runtime-debug-command-projection-kit
│  ├─ command-result-fixture-matrix-kit
│  └─ command-replay-fixture-kit
├─ render-domain
│  ├─ corridor-render-world-kit
│  ├─ corridor-minimap-kit
│  ├─ three-renderer
│  ├─ post-processing
│  └─ scene-dressing-descriptors
└─ documentation-domain
   └─ central-ledger-sync-kit
```

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create room, join room, or solo identity
  -> lobby/loading/readiness gates
  -> mount GameCanvas runtime
  -> renderer/world/minimap/debug/player/session initialization
  -> pointer-lock first-person movement
  -> interact derives pickup/drop/place/remove from local carry state and anomaly distance
  -> local/host path applies applyNetworkInteractionRequest directly
  -> client path sends TRY_INTERACT
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning rules
  -> unchanged/rejected paths are not result records
  -> publishAuthoritativeState emits implicit reason strings
  -> render, minimap, HUD, completion routing, and runtime debug consume latest snapshot
```

## Source boundary finding

`GameCanvas.tsx` is still the authority consumer bottleneck. It imports `applyNetworkInteractionRequest`, `applyNetworkPlayerUpdate`, and `syncHeldCubesToPlayers` directly, owns snapshot publication, records runtime events, and commits victory after checking the mutated `GameState`.

`interactionRules.ts` and `networkRules.ts` remain useful legacy rule sources, but they need result-returning wrappers before GameCanvas or host transport consumes decisions.

## Required first-class result path

```txt
CommandEnvelope
  -> preflight
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> local/host authority consumer
  -> RuntimeDebugCommandProjection
  -> DOM-free fixture replay
  -> GameCanvas splice
```

## Do not start with

```txt
renderer extraction
PeerJS extraction
minimap extraction
postprocess extraction
new scene dressing
new maze content
visual object-kit expansion
wholesale GameCanvas rewrite
```

## Next safe ledge

```txt
HorrorCorridor Result-First Command Readback Ledger Refresh + Fixture Gate
```
