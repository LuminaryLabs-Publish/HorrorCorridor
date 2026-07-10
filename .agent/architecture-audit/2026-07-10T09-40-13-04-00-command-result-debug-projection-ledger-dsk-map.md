# Architecture Audit: Command Result Debug Projection Ledger DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T09-40-13-04-00`

## Architecture summary

`HorrorCorridor` is a Next/React cooperative first-person maze surface with host/client/solo authority, PeerJS-style transport, deterministic maze/cube/anomaly state, Three.js rendering, minimap projection, ooze cadence, ordered anomaly victory logic, and runtime debug export.

The current architecture has useful domain seams, but command outcomes are still expressed as `GameState` mutations. The next architecture cut should make commands and publish decisions first-class rows before changing renderer, PeerJS, or scene content.

## DSK map

```txt
Domain: session-lifecycle
Services: create solo/host/client identity, room code, loading/readiness state.
Kits: corridor-session-domain-kit.
Status: implemented.

Domain: peer-networking
Services: room messaging, host/client sync, request-sync, player update, interaction request.
Kits: peer-room-sync-domain-kit.
Status: implemented transport, result metadata missing.

Domain: seeded-maze-bootstrap
Services: deterministic maze, cell lookup, object placement, cube and anomaly bootstrap.
Kits: maze-snapshot-bootstrap-kit.
Status: implemented.

Domain: first-person-input
Services: pointer lock, keyboard movement, mouse look, camera pose, collision.
Kits: first-person-corridor-player-kit.
Status: implemented.

Domain: cube-carry-interaction
Services: pickup, drop, place, remove, carry sync.
Kits: corridor-interaction-domain-kit, legacy-interaction-rules-adapter.
Status: implemented with GameState-only return.

Domain: ordered-sequence-validation
Services: anomaly slot validation, ordered color sequence, completion, victory rollback.
Kits: ordered-anomaly-sequence-kit, legacy-win-rules-adapter.
Status: implemented with GameState-only return.

Domain: ooze-trail-navigation
Services: ooze cadence, decay, spawn, spacing guard, no-state-diff path.
Kits: ooze-trail-domain-kit, legacy-ooze-rules-adapter.
Status: implemented with GameState-only return.

Domain: render-world-snapshot-consumption
Services: Three.js world projection, post-processing, minimap, HUD, scene dressing.
Kits: corridor-render-world-kit, corridor-minimap-kit.
Status: implemented, should not be extracted before command proof.

Domain: runtime-debug
Services: frame capture, event capture, debug export.
Kits: runtime-debug-frame-kit.
Status: implemented frame/event export; command projection missing.

Domain: command-result-contract-next
Services: command envelope, reason catalog, result envelope, publish decision, journal.
Kits: command-envelope-contract-kit, command-reason-catalog-kit, command-result-envelope-kit, publish-decision-snapshot-kit, command-result-journal-kit.
Status: planned.

Domain: result-consumer-next
Services: local authority consumer, host authority consumer, publish/skip/recovery/victory decision row.
Kits: local-authority-command-consumer-kit, host-authority-command-consumer-kit.
Status: planned.

Domain: debug-projection-next
Services: latest command result, latest publish decision, latest rejection reason, command journal counters, fixture parity.
Kits: runtime-debug-command-projection-kit.
Status: planned.

Domain: fixture-proof-next
Services: deterministic accepted, rejected, no-op, skipped, publish-only, ooze, victory, recovery rows.
Kits: command-fixture-matrix-kit, command-replay-fixture-kit.
Status: planned.
```

## Command seam today

```txt
GameCanvas derives local action
  -> applyNetworkInteractionRequest/applyNetworkPlayerUpdate/applyOoze*/applyWin* returns GameState
  -> unchanged object identity or implicit reason decides publish/skip
  -> runtimeDebugStore records frame/event data only
  -> no stable command row explains status, reason, source, changed flag, events, or publish decision
```

## Required architecture cut

```txt
CommandEnvelope
  -> CommandReasonCatalog
  -> CommandResultEnvelope
  -> PublishDecisionSnapshot
  -> CommandResultJournal
  -> RuntimeDebugCommandProjection
  -> CommandFixtureMatrix
  -> GameCanvas consumes result decisions after fixture proof
```

## Non-goals

```txt
- renderer extraction
- PeerJS extraction
- minimap extraction
- scene dressing expansion
- route rewrite
- new maze content
- visual object-kit expansion
- GameCanvas wholesale rewrite before fixture proof
```
