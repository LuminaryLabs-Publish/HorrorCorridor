# Architecture Audit: Command Authority Replay Fixture DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-11-35-04-00`

## Architecture read

`HorrorCorridor` already has useful domain boundaries, but command authority still crosses too many boundaries inside `GameCanvas.tsx`.

The current runtime is playable and network-capable, but its command contract is implicit.

## Current DSK/domain stack

```txt
app-shell-domain
  owns app entry, shell routing, user-visible mode start

session-domain
  owns solo / host / join state, peer identity, readiness, pause, completion

peer-room-sync-domain
  owns PeerJS transport adapters, host/client events, full sync, PLAYER_UPDATE, TRY_INTERACT

replicated-snapshot-domain
  owns buildReplicatedSnapshot and protocol snapshots

maze-bootstrap-domain
  owns seeded maze, cell lookup, pathing, cube spawns, anomaly target sequence

first-person-player-domain
  owns keyboard state, pointer lock, look deltas, view angles, player movement, collision, camera pose

interaction-rule-domain
  owns pickup, drop, place at anomaly, remove from anomaly

ordered-anomaly-domain
  owns sequence slot validation and victory mutation

ooze-trail-domain
  owns ooze cadence, trail advance, decay, and authority-side mutation

render-world-domain
  owns Three.js renderer, scene, camera, post-processing, maze render world, minimap, scene dressing

runtime-debug-domain
  owns frame records, debug event records, cadence readback, exportable runtime diagnostics

command-authority-domain
  planned owner of CommandEnvelope, CommandReason, CommandResult, PublishDecision, CommandJournal, fixture replay, local/host consumers

central-ledger-domain
  documentation owner of repo-local .agent and central LuminaryLabs ledger/change-log sync
```

## Current service boundaries

```txt
GameCanvas service:
  currently orchestrates source, renderer, input, authority, PeerJS, publish, debug, minimap, and victory side effects

interactionRules service:
  currently mutates GameState for cube/anomaly actions and silently returns unchanged GameState on rejection

networkRules service:
  currently maps network actions to GameState mutators and silently returns unchanged GameState for request-sync/toggle-ready/cancel/default

runtimeDebug service:
  currently captures frame/snapshot/cadence/scene facts but has no command-result projection

publish service:
  currently exists as publishAuthoritativeState(reason) inside GameCanvas, not as a reusable DSK service
```

## Target DSK decomposition

```txt
command-envelope-contract-kit
  provides CommandEnvelope, CommandSource, CommandPayload, CommandId, actor metadata

command-reason-catalog-kit
  provides stable accepted/rejected/unchanged/skipped/publish-only/victory reason values

command-result-envelope-kit
  provides CommandResult, before/after summaries, changed flag, events, diagnostics, legacy adapter helper

publish-decision-snapshot-kit
  provides result-to-decision mapping, broadcast flag, recovery flag, victory flag, snapshot reason

command-result-journal-kit
  provides latest result, counters, fixture replay journal, exported summary

command-seed-state-fixture-kit
  provides canonical GameState seeds for near-cube, carry-conflict, anomaly-near, anomaly-far, full-slot, request-sync, player-update, ooze, victory rows

interaction-preflight-kit
  provides deterministic rejection reason selection before mutating pickup/drop/place/remove

interaction-result-rules-kit
  provides result-returning wrappers and keeps existing legacy GameState exports stable

network-result-rules-kit
  provides result-returning wrappers for PLAYER_UPDATE, TRY_INTERACT, request-sync, toggle-ready, cancel, unknown action, held-cube sync

local-authority-result-consumer-kit
  provides local accepted/rejected/no-op/victory publish behavior from PublishDecision

host-authority-result-consumer-kit
  provides host PLAYER_UPDATE, TRY_INTERACT, recovery, skip, and victory behavior from PublishDecision

runtime-debug-command-projection-kit
  provides latest command status, reason, publish decision, journal counters, and fixture parity to runtime debug

command-result-fixture-matrix-kit
  provides DOM-free row execution and parity reporting

command-replay-fixture-kit
  provides command replay ordering and normalized snapshot comparison
```

## Dependency order

```txt
1. command types and reasons
2. result envelope and state summaries
3. publish decision helper
4. journal helper
5. seed states and fixture rows
6. interaction preflight
7. result-returning interaction wrappers
8. result-returning network wrappers
9. local and host consumers
10. DOM-free fixture runner
11. package script
12. runtime debug projection
13. additive GameCanvas consumer splice
```

## Implementation guardrail

Do not rewrite `GameCanvas.tsx` first.

Do not extract renderer, PeerJS, or minimap first.

The command replay fixture must exist before browser integration changes authority behavior.
