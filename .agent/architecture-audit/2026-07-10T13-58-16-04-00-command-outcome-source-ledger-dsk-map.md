# HorrorCorridor Architecture Audit: Command Outcome Source Ledger DSK Map

**Timestamp:** `2026-07-10T13-58-16-04-00`

## Current composition

```txt
application shell
  -> session and peer transport
  -> seeded GameState bootstrap
  -> GameCanvas orchestration
     -> input and local pose
     -> interaction/network/ooze/win rules
     -> authoritative snapshot publication
     -> Three.js world, minimap, HUD, debug, completion
```

## Current DSK and domain ownership

| Kit/domain | Current ownership | Services | Boundary issue |
|---|---|---|---|
| `corridor-session-domain-kit` | session UI/store | solo/host/join, room identity, readiness | none for next slice |
| `peer-room-sync-domain-kit` | peer transport and GameCanvas | full sync, player update, interaction request | publication reason is implicit |
| `maze-snapshot-bootstrap-kit` | game-state bootstrap | deterministic maze, lookup, cubes, anomaly slots | none for next slice |
| `first-person-corridor-player-kit` | GameCanvas/input helpers | movement, collision, camera, prediction | none for next slice |
| `corridor-interaction-domain-kit` | `interactionRules.ts` | pickup, drop, place, remove | returns `GameState` only |
| `ordered-anomaly-sequence-kit` | slots and `winRules.ts` | order validation, victory/rollback | no explicit victory result |
| `ooze-trail-domain-kit` | `oozeRules.ts` | decay, spawn, spacing/cap guards | no outcome/reason rows |
| `corridor-render-world-kit` | GameCanvas/Three.js helpers | maze, cube, player, anomaly, dressing render | consumes snapshot only |
| `corridor-minimap-kit` | minimap helpers | map projection and markers | consumes snapshot only |
| `runtime-debug-frame-kit` | runtime debug store | frame/event capture and export | cannot explain command decisions |
| legacy rule adapters | interaction/network/ooze/win exports | preserve existing GameState callers | erase outcome semantics |

## Missing source-owned DSK layer

```txt
CommandEnvelope
  -> CommandSource
  -> CommandKind
  -> stable command identity and input metadata

CommandResult
  -> CommandStatus
  -> CommandReason
  -> changed flag
  -> before/after snapshot summaries
  -> domain events

PublishDecision
  -> publish
  -> skip
  -> recovery
  -> victory
  -> no-op
  -> publish-only

CommandJournal
  -> ordered bounded result rows
  -> counters by source/status/reason/decision

RuntimeDebugCommandProjection
  -> latest result/reason/decision/consumer action
  -> journal counts
  -> fixture parity
```

## Compatibility rule

The source cut must be additive first.

```txt
new result-returning function
  -> computes typed result
  -> legacy exported function returns result.state
  -> fixture proves legacy state parity
  -> consumer migrates only after proof
```

This avoids changing gameplay while the command/result contract is established.

## Consumer order

```txt
canonical fixture seeds
  -> result wrappers
  -> publication decision helper
  -> journal
  -> local authority consumer
  -> host authority consumer
  -> DOM-free fixture
  -> runtime debug projection
  -> GameCanvas splice
```

## Main architectural finding

`GameCanvas` currently acts as the composition root and the command-outcome interpreter. The next cut should not extract the whole host. It should move only outcome authority into small source-owned DSKs, preserve legacy state-returning exports, and let `GameCanvas` become a consumer of proven decisions.

## Deferred architecture work

```txt
PeerJS adapter extraction
renderer host extraction
minimap host extraction
post-processing host extraction
route composition rewrite
scene-dressing object-kit expansion
```
