# Architecture Audit — Command Result Ledger Readback Repair DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T16-00-13-04-00`

## Current architecture shape

```txt
HorrorCorridor-V1
  -> Next/React shell
  -> session stores
  -> PeerJS transport adapters
  -> replicated snapshot protocol
  -> GameCanvas runtime controller
  -> game-state domain rules
  -> player movement/input/collision domains
  -> Three render and minimap consumers
  -> runtime debug store
```

## Active DSK/domain breakdown

```txt
corridor-session-domain-kit
  owns: solo/host/join mode, room identity, lobby/readiness, pause/completion routing

peer-room-sync-domain-kit
  owns: host/client role, full sync, player update, try interact, request-sync recovery transport

maze-snapshot-bootstrap-kit
  owns: seed, maze grid, cell lookup, cube spawns, anomaly sequence slots

first-person-corridor-player-kit
  owns: pointer lock, keyboard buttons, mouse look, movement integration, collision resolution, camera pose

corridor-interaction-domain-kit
  owns: pickup, drop, place, remove legacy GameState mutations

ordered-anomaly-sequence-kit
  owns: slot order, color match, victory validation

ooze-trail-domain-kit
  owns: ooze cadence, spawn, decay, spacing rules

corridor-render-world-kit
  owns: Three world, camera, renderer, post-processing, scene object consumption

corridor-minimap-kit
  owns: minimap canvas projection

runtime-debug-frame-kit
  owns: frame/event capture, latest frame, exportable debug payload
```

## Next DSK cut

```txt
command-envelope-contract-kit
command-reason-catalog-kit
command-result-envelope-kit
publish-decision-snapshot-kit
command-result-journal-kit
interaction-preflight-kit
interaction-result-rules-kit
network-result-rules-kit
local-authority-result-consumer-kit
host-authority-result-consumer-kit
runtime-debug-command-projection-kit
command-result-fixture-matrix-kit
command-replay-fixture-kit
```

## Source seam

`interactionRules.ts` has the correct behavior surface but not the correct observability surface.

It should keep legacy exports that return `GameState`, but new wrappers should return `CommandResult` first and adapt to legacy return values only at the edge.

`networkRules.ts` should follow the same rule: `applyNetworkInteractionRequest`, `applyNetworkPlayerUpdate`, and `syncHeldCubesToPlayers` need result-returning equivalents before `GameCanvas` changes behavior.

## Desired dependency direction

```txt
commandTypes
  -> commandReasons
  -> commandResults
  -> publishDecisions
  -> commandJournal
  -> interactionPreflight
  -> interactionResultRules
  -> networkResultRules
  -> localAuthorityCommandConsumer / hostAuthorityCommandConsumer
  -> runtimeDebugCommandProjection
  -> GameCanvas splice
```

## Non-goals

```txt
- do not split renderer first
- do not split PeerJS first
- do not expand scene dressing first
- do not alter multiplayer behavior before fixture parity
- do not remove legacy GameState-returning exports until consumers are proven
```
