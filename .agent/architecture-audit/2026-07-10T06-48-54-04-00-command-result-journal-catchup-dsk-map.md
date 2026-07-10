# Architecture Audit — Command Result Journal Catch-up DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T06-48-54-04-00`

## Current architecture

`HorrorCorridor-V1` is a Next/React client app. `GameCanvas.tsx` is still the convergence point for runtime setup, local input, host/client transport, command dispatch, authoritative publishing, render submission, minimap, completion routing, and runtime debug capture.

The domain rule layer is useful but currently returns `GameState` only:

```txt
interactionRules.ts -> pickup/drop/place/remove -> GameState
networkRules.ts -> player update / TRY_INTERACT / request-sync / toggle-ready / cancel -> GameState
oozeRules.ts -> decay/spawn/no-diff -> GameState
winRules.ts -> sequence complete / rollback / no-diff -> GameState
```

## DSK/domain breakdown

```txt
Session DSK
  domains: mode, room identity, readiness, lobby transition
  current services: create solo/host/join route state
  gap: no command scope metadata on session actions

Network DSK
  domains: PeerJS transport, protocol envelope, full sync, player update, TRY_INTERACT
  current services: send/broadcast/apply messages
  gap: TRY_INTERACT and PLAYER_UPDATE do not return result envelopes

Maze Bootstrap DSK
  domains: seeded maze, cube spawns, sequence slots, anomaly state
  current services: deterministic setup and snapshot facts
  gap: fixture seeds need stable before/after summaries

Interaction DSK
  domains: pickup, drop, place, remove, carry sync
  current services: GameState mutation or unchanged state
  gap: invalid/no-op paths need reason-coded CommandResult rows

Ooze DSK
  domains: cadence, spawn, decay, spacing
  current services: GameState mutation or unchanged state
  gap: spawn/decay/no-diff rows need explicit result status and diagnostics

Victory DSK
  domains: ordered sequence, victory route, rollback
  current services: GameState mutation or unchanged state
  gap: completion and rollback need result and publish decisions

Runtime Debug DSK
  domains: frame capture, event capture, export
  current services: frame facts and snapshot diagnostics
  gap: no latest command result, publish decision, journal counters, or fixture parity

Render DSK
  domains: Three scene, post-process, minimap, HUD
  current services: snapshot consumption and visual presentation
  gap: renderer should remain downstream of proven command state
```

## Target DSK flow

```txt
CommandEnvelope
  -> CommandReasonCatalog
  -> Interaction/Network/Ooze/Win result wrappers
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> DOM-free fixture matrix
  -> GameCanvas splice only after proof
```

## Services the kits should offer next

```txt
command-envelope-contract-kit: normalize action, player, source, payload, request id, and timestamp
command-reason-catalog-kit: stable accepted/rejected/skipped/no-op/recovery/victory reasons
command-result-envelope-kit: status, reason, before/after summaries, changed flag, events, diagnostics
publish-decision-snapshot-kit: publish, skip, recovery, no-op, victory classification
command-result-journal-kit: append rows and summarize accepted/rejected/skipped/latest facts
runtime-debug-command-projection-kit: JSON-safe debug readback for latest result and decision
command-fixture-matrix-kit: deterministic accepted/rejected/unchanged/skipped/publish-only/ooze/victory rows
```

## Implementation order

1. Add source-owned command types and reason catalog.
2. Add result wrappers beside existing GameState-only rules.
3. Preserve legacy exports as `result.state` adapters.
4. Add DOM-free command fixture before touching `GameCanvas` behavior.
5. Add runtime debug projection additively.
6. Replace object-identity publish checks only after fixture proof.
