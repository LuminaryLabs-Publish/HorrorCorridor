# HorrorCorridor Architecture Audit: Command Result Journal Readback DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T15-56-42-04-00`

## Current architecture read

`HorrorCorridor` is organized around a browser/runtime shell plus domain helpers. It has enough source separation to add a result-first command seam without rewriting the game surface.

```txt
HorrorCorridor-V1/
  package.json
  src/components/game/GameCanvas.tsx
  src/features/game-state/domain/interactionRules.ts
  src/features/game-state/domain/networkRules.ts
  src/features/game-state/domain/oozeRules.ts
  src/features/game-state/domain/winRules.ts
  src/features/debug/store/runtimeDebugStore.ts
  src/features/networking/protocol/syncSnapshot.ts
  src/features/render/three/*
```

## DSK/domain map

```txt
application-shell -> next-client-runtime -> react-game-surface
session-domain -> corridor-session-domain-kit
network-domain -> peer-room-sync-domain-kit -> replicated-snapshot-protocol
maze-domain -> maze-snapshot-bootstrap-kit -> cube-spawn-bootstrap -> anomaly-sequence-bootstrap
player-domain -> first-person-corridor-player-kit -> pointer-lock/input/look/movement/collision
interaction-domain -> corridor-interaction-domain-kit -> pickup/drop/place/remove
sequence-domain -> ordered-anomaly-sequence-kit -> victory-completion
threat-domain -> ooze-trail-domain-kit -> cadence/spawn/decay
render-domain -> corridor-render-world-kit + corridor-minimap-kit -> Three.js/postprocess/minimap/debug snapshot consumption
debug-domain -> runtime-debug-frame-kit -> frame/event/window export
ledger-domain -> central-ledger-sync-kit -> root docs/tracker/central ledger/change log
```

## Missing result-first layer

```txt
GameCanvas command derivation / peer message
  -> CommandEnvelope
  -> CommandPreflight
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> legacy snapshot publish / skip / recovery / victory action
```

## Required next-cut kits

```txt
command-envelope-contract-kit
command-source-policy-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
command-seed-state-fixture-kit
interaction-preflight-kit
network-command-preflight-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-command-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
central-ledger-sync-kit
```

## Boundary rule

Do not rewrite `GameCanvas.tsx` first.

The safe order is:

```txt
1. add command/result/reason contracts
2. add result-returning wrappers beside legacy rules
3. add fixture seeds and rows
4. add DOM-free fixture script
5. add local/host consumers
6. add runtime debug command projection
7. then splice GameCanvas onto result-first consumers
```

## Main architectural risk

The game currently has authoritative behavior, but not authoritative explanation. Rejected, unchanged, skipped, recovery, and victory paths are not first-class records, so local/host publishing and debug readback cannot be proven without browser behavior.
