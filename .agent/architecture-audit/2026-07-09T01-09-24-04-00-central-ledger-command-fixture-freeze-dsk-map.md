# HorrorCorridor Architecture Audit: Central Ledger Command Fixture Freeze DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T01-09-24-04-00`

## Architecture read

`HorrorCorridor` has a usable source layout, but the command authority architecture is still half implicit.

The implemented architecture already has session, networking, maze bootstrap, first-person movement, interaction mutation, snapshot replication, render, minimap, and runtime debug kits.

The missing architecture seam is the command boundary between user/peer intent and authoritative state mutation.

## Current architecture flow

```txt
Next app shell
  -> session and UI stores
  -> GameCanvas runtime
  -> Three renderer, camera, post-processing, maze world, minimap
  -> local input and pointer lock
  -> peer transport message ingress/egress
  -> networkRules and interactionRules return GameState
  -> buildReplicatedSnapshot
  -> runtimeDebugStore records frame/event history
```

## DSK/domain breakdown

```txt
horror-corridor-domain
├─ app-session-domain
│  ├─ corridor-session-domain-kit
│  ├─ room-identity-kit
│  └─ readiness-state-kit
├─ peer-sync-domain
│  ├─ peer-room-sync-domain-kit
│  ├─ host-transport-kit
│  ├─ client-transport-kit
│  └─ replicated-snapshot-protocol-kit
├─ maze-state-domain
│  ├─ maze-snapshot-bootstrap-kit
│  ├─ maze-cell-lookup-kit
│  ├─ cube-spawn-bootstrap-kit
│  └─ anomaly-sequence-bootstrap-kit
├─ first-person-player-domain
│  ├─ first-person-corridor-player-kit
│  ├─ pointer-lock-input-kit
│  ├─ player-movement-integration-kit
│  └─ maze-collision-resolution-kit
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
│  ├─ runtime-debug-command-projection-kit
│  ├─ command-result-fixture-matrix-kit
│  └─ command-replay-fixture-kit
├─ render-domain
│  ├─ corridor-render-world-kit
│  ├─ corridor-minimap-kit
│  ├─ post-processing-kit
│  └─ scene-dressing-descriptor-kit
├─ diagnostics-domain
│  ├─ runtime-debug-frame-kit
│  ├─ runtime-debug-event-kit
│  └─ runtime-debug-window-api-kit
└─ documentation-ledger-domain
   ├─ root-agent-doc-kit
   ├─ timestamped-tracker-kit
   ├─ central-ledger-sync-kit
   └─ internal-change-log-kit
```

## Current services

```txt
session service: screen state, session mode, room identity, pause and completion flow
peer service: PeerJS host/client transport and protocol messages
maze service: deterministic maze, cubes, anomaly target sequence, path facts
input service: keyboard, mouse look, pointer lock, movement and collision
interaction service: cube pickup/drop/place/remove and anomaly sequence validation
network rule service: player update, held-cube sync, network interaction dispatch
snapshot service: replicated GameState projection for host/client sync
render service: Three world, post-processing, minimap, camera update, disposal
debug service: runtime frames, runtime events, window debug API
ledger service: repo-local .agent docs and central LuminaryLabs repo tracking
```

## Missing next services

```txt
command envelope service: normalize local and network commands before mutation
reason catalog service: classify every accepted, rejected, skipped, unchanged, publish-only, and victory result
preflight service: return stable diagnostics before each interaction mutation
command result service: wrap legacy GameState mutation with status, reason, changed, events, and before/after summaries
publish decision service: derive publish/skip/recovery/victory/no-op behavior from result metadata
local consumer service: drive solo/host local interactions without object-identity gates
host consumer service: drive PLAYER_UPDATE, TRY_INTERACT, request-sync, skipped, rejected, and victory behavior
fixture service: prove command rows with no DOM, canvas, Three.js, PeerJS, or React runtime
debug projection service: expose latest result, latest publish decision, latest rejection reason, latest consumer action, journal counts, and fixture parity
central sync service: keep LuminaryLabs central ledger aligned with repo-local .agent state
```

## Architecture finding

Do not expand renderer, scene dressing, PeerJS, or minimap architecture first.

The next architecture cut must preserve existing runtime behavior while adding pure, fixture-readable command authority files that legacy exports can wrap.

## Source order

```txt
1. commandTypes.ts
2. commandReasons.ts
3. commandResults.ts
4. publishDecisions.ts
5. commandJournal.ts
6. commandFixtureSeeds.ts
7. commandFixtureRows.ts
8. interactionPreflight.ts
9. interactionResultRules.ts
10. networkResultRules.ts
11. localAuthorityCommandConsumer.ts
12. hostAuthorityCommandConsumer.ts
13. scripts/horror-corridor-command-fixture.mjs
14. package.json fixture script
15. runtimeDebugCommandProjection.ts
16. runtimeDebugStore.ts additive fields
17. GameCanvas.tsx consumer splice
```

## Acceptance freeze

No runtime file should be edited until the command fixture can prove at least the seed-state, preflight, result, decision, journal, local consumer, and host consumer rows outside the browser.
