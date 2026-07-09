# Architecture Audit: Result-First Authority Consumer DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T09-59-27-04-00`

## Source read

Current implementation sources read for this pass:

```txt
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
.agent/START_HERE.md
.agent/current-audit.md
LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
```

## Current runtime architecture

```txt
Next app / React UI
  -> session store / runtime store / UI store
  -> peer host/client transport
  -> replicated snapshot protocol
  -> GameCanvas runtime
      -> Three renderer / camera / post-processing / world builder
      -> pointer-lock input and local pose prediction
      -> GameState rebuilt from latest replicated snapshot
      -> interactionRules and networkRules mutate GameState
      -> publishAuthoritativeState builds and broadcasts snapshots
      -> runtime debug frames consume frame/snapshot/cadence state
```

## Current authority seams

```txt
GameCanvas.tsx
  owns local action derivation from distance/carry state
  owns local nextState identity gate
  owns host peer message handling
  owns publish reason selection
  owns victory commit decision
  owns runtime debug frame creation

networkRules.ts
  owns NetworkInteractionAction union
  dispatches pickup/drop/place/remove/request-sync/toggle-ready/cancel/default
  returns GameState only
  collapses unsupported policy to unchanged state

interactionRules.ts
  owns cube and anomaly mutation rules
  returns GameState only
  silently returns unchanged state for all rejection/no-op branches
```

## DSK/domain breakdown

```txt
horror-corridor-domain
├─ shell-domain
│  ├─ next-client-runtime-kit
│  ├─ react-game-surface-kit
│  └─ ui-screen-routing-kit
├─ session-domain
│  ├─ session-lifecycle-kit
│  ├─ room-readiness-kit
│  └─ completion-routing-kit
├─ networking-domain
│  ├─ peer-room-sync-domain-kit
│  ├─ host-transport-kit
│  ├─ client-transport-kit
│  ├─ network-message-protocol-kit
│  └─ replicated-snapshot-protocol-kit
├─ maze-domain
│  ├─ seeded-maze-bootstrap-kit
│  ├─ maze-cell-lookup-kit
│  ├─ cube-spawn-bootstrap-kit
│  └─ anomaly-sequence-bootstrap-kit
├─ player-domain
│  ├─ first-person-input-kit
│  ├─ pointer-lock-control-kit
│  ├─ player-view-angle-kit
│  ├─ movement-integration-kit
│  └─ maze-collision-resolution-kit
├─ interaction-domain
│  ├─ corridor-interaction-domain-kit
│  ├─ ordered-anomaly-sequence-kit
│  └─ ooze-trail-domain-kit
├─ authority-domain
│  ├─ command-envelope-contract-kit                 planned-next
│  ├─ command-reason-catalog-kit                    planned-next
│  ├─ command-result-envelope-kit                   planned-next
│  ├─ publish-decision-snapshot-kit                 planned-next
│  ├─ command-result-journal-kit                    planned-next
│  ├─ interaction-preflight-kit                     planned-next
│  ├─ interaction-result-rules-kit                  planned-next
│  ├─ network-result-rules-kit                      planned-next
│  ├─ local-authority-result-consumer-kit           planned-next
│  └─ host-authority-result-consumer-kit            planned-next
├─ render-domain
│  ├─ corridor-render-world-kit
│  ├─ corridor-minimap-kit
│  ├─ post-processing-kit
│  └─ scene-dressing-descriptor-kit
├─ diagnostics-domain
│  ├─ runtime-debug-frame-kit
│  ├─ runtime-debug-command-projection-kit          planned-next
│  └─ command-result-fixture-matrix-kit             planned-next
└─ validation-domain
   ├─ command-replay-fixture-kit                    planned-next
   ├─ static-smoke-validation-kit
   └─ live-player-validation-kit
```

## Current services

```txt
session service: mode, room, player identity, pause, readiness, completion
network service: full sync, player update, try interact, request-sync recovery transport
maze service: seed, grid, cell lookup, path map, cube spawn, anomaly slots
player service: pointer lock, keyboard, mouse look, movement, collision, camera pose
interaction service: pickup, drop, place, remove, sequence validation
network rule service: player update, held-cube sync, interaction dispatch
render service: renderer, scene, camera, post-processing, maze world, minimap
debug service: frame record, event record, snapshot/cadence readback
ledger service: timestamped .agent docs, central repo-ledger, internal change log
```

## Planned result-first services

```txt
command envelope service: normalize local input and peer messages into typed command records
reason catalog service: classify every silent no-op branch into stable reason ids
interaction preflight service: separate validation from mutation for pickup/drop/place/remove
command result service: return state, status, reason, changed flag, events, diagnostics
publish decision service: derive publish, skip, recovery, no-op, victory, broadcast, completion flags
local authority consumer service: apply local command result and publish only explicit decisions
host authority consumer service: apply peer command result and publish/recover/skip from explicit decisions
runtime debug projection service: expose latest command result and publish decision in frame/debug export
fixture replay service: prove accepted, rejected, unchanged, skipped, publish-only, ooze, and victory rows without DOM
```

## Implementation boundary

Next implementation should add source-only authority modules under `HorrorCorridor-V1/src/features/game-state/domain` before editing `GameCanvas.tsx`.

Only after the fixture script passes should `GameCanvas.tsx` consume `localAuthorityCommandConsumer` and `hostAuthorityCommandConsumer`.

## Non-goals

```txt
- no renderer extraction first
- no PeerJS extraction first
- no minimap extraction first
- no post-processing extraction first
- no new maze content first
- no visual object-kit expansion first
- no GameCanvas rewrite before fixture proof
```
