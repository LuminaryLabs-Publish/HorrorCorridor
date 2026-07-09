# HorrorCorridor Command Result GameCanvas Splice DSK Map

**Timestamp:** `2026-07-09T01-00-22-04-00`

## Intent

Define the exact architecture boundary for the next source pass without changing runtime code in this documentation run.

## Current architecture read

```txt
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
  -> owns runtime orchestration
  -> derives local action strings from carried-cube and distance-to-end facts
  -> calls GameState-returning network/interaction rules
  -> publishes snapshots through publishAuthoritativeState(reason)
  -> records runtime debug frames/events

HorrorCorridor-V1/src/features/game-state/domain/interactionRules.ts
  -> owns pickup/drop/place/remove mutations
  -> returns GameState only
  -> rejected paths return unchanged state silently

HorrorCorridor-V1/src/features/game-state/domain/networkRules.ts
  -> owns player update, held-cube sync, and interaction dispatch
  -> request-sync/toggle-ready/cancel/default return unchanged state
  -> returns GameState only

HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
  -> owns runtime debug frame/event export
  -> has no command-result or publish-decision projection fields
```

## DSK/domain breakdown

```txt
application shell
  -> next-client-runtime
  -> react-game-surface
  -> session-lifecycle
  -> room-identity
  -> readiness-state

networking
  -> peer-room-sync-domain-kit
  -> host-transport
  -> client-transport
  -> network-message-protocol
  -> replicated-snapshot-protocol

maze/game state
  -> maze-snapshot-bootstrap-kit
  -> cube-spawn-bootstrap
  -> sequence-slot-authority
  -> ordered-anomaly-sequence-kit
  -> ooze-trail-domain-kit

player and input
  -> first-person-corridor-player-kit
  -> pointer-lock-control
  -> keyboard-input
  -> mouse-look-input
  -> player-movement-integration
  -> maze-collision-resolution

current interaction authority
  -> corridor-interaction-domain-kit
  -> legacy-game-state-interaction-rules
  -> legacy-game-state-network-rules

next command authority
  -> command-envelope-contract-kit
  -> command-reason-catalog-kit
  -> command-result-envelope-kit
  -> command-decision-contract-kit
  -> publish-decision-snapshot-kit
  -> command-result-journal-kit
  -> interaction-preflight-kit
  -> interaction-result-rules-kit
  -> network-result-rules-kit
  -> local-authority-result-consumer-kit
  -> host-authority-result-consumer-kit

render and diagnostics
  -> corridor-render-world-kit
  -> corridor-minimap-kit
  -> runtime-debug-frame-kit
  -> runtime-debug-command-projection-kit

validation
  -> command-seed-state-fixture-kit
  -> command-result-fixture-matrix-kit
  -> command-replay-fixture-kit
```

## Required source boundary

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
  owns serializable command envelope and source labels

HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
  owns stable reason strings for accepted/rejected/unchanged/skipped/publish-only/victory

HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
  owns CommandResult, before/after summaries, events, diagnostics, and legacy adapters

HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
  owns result-to-publish decision mapping

HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
  owns journal append/summarize helpers

HorrorCorridor-V1/src/features/game-state/domain/commandFixtureSeeds.ts
  owns canonical seed states for deterministic fixture rows

HorrorCorridor-V1/src/features/game-state/domain/commandFixtureRows.ts
  owns accepted/rejected/unchanged/skipped/publish-only/victory row expectations

HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
  owns reusable preflight checks and stable rejection facts

HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
  owns result-returning pickup/drop/place/remove wrappers

HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
  owns result-returning player update, held sync, and interaction dispatch wrappers

HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
  owns local publish/skip/journal/victory behavior

HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
  owns host publish/skip/recovery/victory behavior

HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
  owns serializable command projection for frames/events/debug API

HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
  owns DOM-free fixture execution and proof output
```

## Splice rules

```txt
1. Add pure domain modules first.
2. Keep legacy interactionRules.ts and networkRules.ts exports returning GameState for compatibility.
3. Add result-returning wrappers beside legacy exports.
4. Run command fixture before GameCanvas integration.
5. Add runtime debug command projection after fixture proof.
6. Change GameCanvas only by replacing implicit publish gates with result/decision consumers.
7. Do not rewrite renderer, minimap, PeerJS, session stores, or route structure in this pass.
```

## Acceptance outcome

The next implementation is complete only when a fixture can prove every command row and the browser path can consume the same decision shape without changing the existing snapshot/render/debug compatibility surface.
