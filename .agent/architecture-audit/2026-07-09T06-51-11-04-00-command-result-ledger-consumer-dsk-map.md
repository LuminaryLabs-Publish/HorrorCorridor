# Architecture Audit: Command Result Ledger Consumer DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-51-11-04-00`

## Current runtime architecture

```txt
HorrorCorridor-V1
  -> Next app shell
  -> GameShell/session stores
  -> GameCanvas runtime
  -> Three renderer, scene, camera, post-processing, maze world, minimap
  -> player input, pointer lock, movement, collision, camera bob
  -> useRuntimeStore/useSessionStore/useUiStore
  -> peer transport host/client events
  -> network protocol messages
  -> networkRules.ts GameState-returning dispatch
  -> interactionRules.ts GameState-returning cube/anomaly rules
  -> winRules.ts ordered completion
  -> oozeRules.ts host cadence
  -> syncSnapshot.ts replicated snapshot output
  -> runtimeDebugStore.ts frame/event capture
```

## Boundary problem

The live route already has a workable game loop, renderer, networking path, and debug surface.

The architectural problem is that command authority is still embedded in `GameCanvas.tsx` and is represented by mutated `GameState`, state object identity, and string publish reasons.

A DSK-style result layer should preserve all existing behavior while making every accepted, rejected, unchanged, skipped, recovery, and victory path a serializable command result.

## DSK target map

```txt
command-envelope-contract-kit
  owns: command id, command source, player id, action, payload, receivedAtMs, source sequence
  outputs: CommandEnvelope

command-reason-catalog-kit
  owns: stable reason values
  outputs: accepted/rejected/unchanged/skipped/publish-only/victory reason catalog

interaction-preflight-kit
  owns: playing-state checks, player lookup, carried cube lookup, nearest cube lookup, anomaly distance, slot availability
  outputs: preflight accepted/rejected reason and normalized target metadata

interaction-result-rules-kit
  owns: result-returning pickup/drop/place/remove wrappers
  outputs: CommandResult plus legacy GameState adapter

network-result-rules-kit
  owns: result-returning player update, held-cube sync, request-sync, toggle-ready, cancel, unknown action
  outputs: CommandResult plus legacy GameState adapter

publish-decision-snapshot-kit
  owns: mapping result to publish/skip/recovery/no-op/victory
  outputs: PublishDecision

command-result-journal-kit
  owns: append-only result records and counters
  outputs: latest result, latest reason, counts by status, latest publish decision

local-authority-result-consumer-kit
  owns: solo/host local command consumption
  outputs: state, journal, publish decision, completion intent

host-authority-result-consumer-kit
  owns: host PLAYER_UPDATE and TRY_INTERACT message consumption
  outputs: state, journal, publish decision, recovery/victory behavior

runtime-debug-command-projection-kit
  owns: additive readback for command result and publish decision
  outputs: serializable debug frame fields

command-result-fixture-matrix-kit
  owns: DOM-free fixture rows and expected facts
  outputs: parity report

command-replay-fixture-kit
  owns: replay normalization and final snapshot fact comparison
  outputs: proof report usable by npm script and central ledger
```

## Current GameCanvas seams

```txt
initializeRuntime(snapshot)
  -> builds maze/world/renderer/input/pose/debug/cadence state
  -> starts transport listener
  -> creates local applyInteraction path
  -> creates animation loop

applyInteraction()
  -> derives action from distance/carry state
  -> local authority applies GameState-returning rule
  -> object identity decides whether to return silently
  -> changed state publishes resync
  -> victory checked after mutation

host transport listener
  -> PLAYER_UPDATE applies GameState-returning player update
  -> TRY_INTERACT applies GameState-returning interaction dispatch
  -> request-sync chooses recovery only by incoming action string
  -> victory checked after mutation
```

## Correct next architecture

```txt
GameCanvas event source
  -> CommandEnvelope
  -> AuthorityConsumer.consume(envelope, currentState, context)
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> RuntimeDebugCommandProjection
  -> legacy state/publish path
```

The consumer must be added only after the DOM-free fixture proves that legacy state facts and final replicated snapshot facts are preserved.

## Implementation deferrals

```txt
- do not extract renderer first
- do not extract PeerJS first
- do not rewrite GameCanvas wholesale
- do not remove existing GameState-returning exports
- do not add new visual object kits before command fixture proof
- do not change routes, hosting, or deployment first
```
