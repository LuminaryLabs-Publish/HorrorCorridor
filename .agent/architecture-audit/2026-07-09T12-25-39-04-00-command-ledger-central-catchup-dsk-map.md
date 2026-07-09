# Architecture Audit: Command Ledger Central Catch-up DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-25-39-04-00`

## Current architecture

```txt
HorrorCorridor-V1
  -> Next / React app shell
  -> session store, runtime store, UI store
  -> PeerJS host/client transport
  -> replicated snapshot protocol
  -> seeded maze bootstrap
  -> GameCanvas runtime
  -> first-person player input/movement/collision
  -> legacy GameState interaction and network rules
  -> Three.js world renderer, post-processing, minimap
  -> runtime debug frames/events
```

## Current authority seam

```txt
GameCanvas.tsx
  -> derives action string
  -> applyNetworkInteractionRequest(state, input)
  -> receives GameState only
  -> compares object identity or publishes by implicit reason string
  -> commitVictory by post-mutation state check
```

## DSK/domain breakdown

```txt
application-shell-domain
session-lifecycle-domain
peer-networking-domain
replicated-snapshot-domain
maze-bootstrap-domain
first-person-player-domain
cube-interaction-domain
sequence-validation-domain
ooze-cadence-domain
render-world-domain
minimap-domain
runtime-debug-domain
command-envelope-domain
command-reason-catalog-domain
command-result-domain
publish-decision-domain
command-journal-domain
fixture-replay-domain
central-ledger-sync-domain
```

## Implemented kits

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
```

## Planned next-cut kits

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
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

## Required source cut

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
```

## Blocked until fixture exists

```txt
- GameCanvas publish-decision rewrite
- runtime debug command projection splice
- PeerJS extraction
- renderer extraction
- minimap extraction
- new scene art/object-kit expansion
```
