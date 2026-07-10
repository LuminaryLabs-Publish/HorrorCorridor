# HorrorCorridor Architecture Audit: Command Result Readback Fixture DSK Map

**Timestamp:** `2026-07-10T12-29-26-04-00`

## Architecture read

The route is already decomposed enough to identify session, networking, maze, player, interaction, ooze, sequence, render, minimap, and debug domains. The missing architecture layer is a result-bearing command contract between domain rules and `GameCanvas` consumers.

## DSK/domain map

```txt
corridor-session-domain-kit
  -> mode selection, room identity, readiness state, host/client/solo entry

peer-room-sync-domain-kit
  -> host/client transport, full sync, player updates, TRY_INTERACT, room lifecycle

maze-snapshot-bootstrap-kit
  -> deterministic maze snapshot, cell lookup, cube spawns, anomaly slots

first-person-corridor-player-kit
  -> pointer lock, movement, collision, camera pose, local prediction

corridor-interaction-domain-kit
  -> pickup, drop, place, remove, carried cube synchronization

ordered-anomaly-sequence-kit
  -> slot state, ordered color validation, completion, victory

ooze-trail-domain-kit
  -> host cadence, spawn, decay, spacing guard, trail transitions

corridor-render-world-kit
  -> Three.js world, maze surfaces, cubes, anomalies, player and scene dressing descriptors

corridor-minimap-kit
  -> minimap projection, player markers, object markers

runtime-debug-frame-kit
  -> frame capture, event capture, debug export

command-envelope-contract-kit next
  -> command id, source, target, action, snapshot summary

command-reason-catalog-kit next
  -> accepted, rejected, skipped, no-op, recovery, victory, ooze, publish-only reasons

command-result-envelope-kit next
  -> status, reason, events, changed flag, diagnostics, source metadata

publish-decision-snapshot-kit next
  -> publish, skip, recovery, victory, no-op, publish-only decisions

command-result-journal-kit next
  -> ordered command rows and summary counters

runtime-debug-command-projection-kit next
  -> latest command result, latest publish decision, latest reason, journal counts, fixture parity

command-fixture-matrix-kit next
  -> deterministic accepted/rejected/unchanged/skipped/victory/ooze/publish-only proof rows
```

## Critical seam

```txt
GameCanvas
  -> applyNetworkInteractionRequest / applyNetworkPlayerUpdate / syncHeldCubesToPlayers
  -> interactionRules / networkRules / oozeRules / winRules
  -> GameState only
  -> object identity and implicit reason strings decide publish/skip
  -> runtimeDebugStore only records frame/event state
```

## Architectural recommendation

Add command-result wrappers beside the current rules, keep legacy exports returning `result.state`, and fixture-prove every command class before wiring `GameCanvas` to consume publish decisions or debug projection.

## Non-goals

```txt
renderer extraction
PeerJS extraction
minimap extraction
post-processing extraction
scene dressing expansion
route rewrite
new maze content
visual object-kit expansion
```
