# HorrorCorridor Architecture Audit: Command Result Ledger Refresh DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T15-51-30-04-00`

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

## Current runtime composition

```txt
app/session state
  -> replicated GameState snapshot
  -> GameCanvas host/client/local authority logic
  -> interactionRules/networkRules GameState-returning helpers
  -> ooze/win/snapshot rules
  -> Three render + minimap + debug readback
```

## DSK/domain breakdown

```txt
application-shell
  -> next-client-runtime
  -> react-game-surface
  -> ui-screen-routing

session-domain
  -> corridor-session-domain-kit
  -> room identity
  -> player identity
  -> readiness and completion routing

network-domain
  -> peer-room-sync-domain-kit
  -> network-message-protocol
  -> replicated-snapshot-protocol
  -> host/client transport

maze-domain
  -> maze-snapshot-bootstrap-kit
  -> maze-cell-lookup
  -> cube-spawn-bootstrap
  -> anomaly-sequence-bootstrap

player-domain
  -> first-person-corridor-player-kit
  -> pointer-lock-control
  -> keyboard-input
  -> mouse-look-input
  -> movement integration
  -> maze collision resolution

interaction-domain
  -> corridor-interaction-domain-kit
  -> pickup/drop/place/remove
  -> sequence slot authority
  -> ordered anomaly validation

threat-domain
  -> ooze-trail-domain-kit
  -> ooze cadence
  -> ooze spawn/decay

render-domain
  -> corridor-render-world-kit
  -> corridor-minimap-kit
  -> Three.js renderer
  -> post-processing
  -> scene dressing descriptors

debug-domain
  -> runtime-debug-frame-kit
  -> frame capture
  -> event capture
  -> debug window export

ledger-domain
  -> central-ledger-sync-kit
  -> root .agent docs
  -> timestamped trackers
  -> central repo ledger
```

## Missing command-result DSK layer

The next architecture cut should add a source-owned command-result layer between `GameCanvas.tsx` and legacy GameState-returning rule modules.

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
  owns: command id, command source, player id, action, payload, timestamp normalization

command-reason-catalog-kit
  owns: accepted, rejected, unchanged, skipped, publish-only, victory reason strings

command-result-envelope-kit
  owns: status, reason, changed flag, before/after summaries, events, diagnostics, legacy state adapter

publish-decision-snapshot-kit
  owns: publish/skip/no-op/recovery/victory policy, broadcast flag, snapshot reason, completion flag

command-result-journal-kit
  owns: append-only result records, summary counters, latest reason/decision

interaction-preflight-kit
  owns: not-playing, missing-player, carrying conflict, cube distance, anomaly distance, slot/cube lookup reasons

network-command-preflight-kit
  owns: player update diff, request-sync policy, toggle-ready/cancel deferral, unknown-action skip

interaction-result-rules-kit
  owns: result-returning pickup/drop/place/remove wrappers while preserving legacy exports

network-result-rules-kit
  owns: result-returning player update, held-cube sync, interaction request, request-sync, toggle-ready/cancel/default wrappers

local-authority-result-consumer-kit
  owns: local rejected/no-op skip, accepted changed publish, victory commit, journal write

host-authority-result-consumer-kit
  owns: host PLAYER_UPDATE, TRY_INTERACT, request-sync recovery, skipped/rejected publish policy, victory commit

runtime-debug-command-projection-kit
  owns: serializable latest command result, latest publish decision, latest rejection reason, journal counts, fixture parity

command-result-fixture-matrix-kit
  owns: accepted/rejected/unchanged/skipped/publish-only/victory rows and final snapshot parity
```

## Boundary rule

Do not rewrite `GameCanvas.tsx` first.

The safe order is:

```txt
1. add result contracts
2. add reason catalog
3. add result-returning wrappers beside legacy rules
4. add fixture seeds and rows
5. add DOM-free fixture script
6. add debug projection helper
7. then splice GameCanvas onto consumers
```

## Main architectural risk

The game currently has authoritative behavior, but not authoritative explanation. Rejected, unchanged, skipped, recovery, and victory paths are not first-class records, so local/host publishing and debug readback cannot be proven without browser behavior.
