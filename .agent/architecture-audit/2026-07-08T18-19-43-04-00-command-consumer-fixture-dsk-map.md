# HorrorCorridor Command Consumer Fixture DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T18-19-43-04-00`

## Scope

Documentation-only architecture readback for the command consumer fixture runner and legacy adapter source cut.

No runtime/source files were edited in this pass.

## Current runtime architecture

```txt
Next app route
  -> session stores and UI stores
  -> GameCanvas runtime
  -> seeded maze snapshot -> GameState reconstruction
  -> Three renderer / post-process / maze world / minimap
  -> pointer-lock and first-person movement
  -> networkRules / interactionRules
  -> buildReplicatedSnapshot
  -> publishAuthoritativeState(reason)
  -> runtime debug frame/event capture
```

## Current interaction loop

```txt
menu route
  -> solo / host / client session
  -> readiness gates
  -> GameCanvas mount
  -> pointer lock movement
  -> distance + carried-cube interaction inference
  -> pickup / drop / place / remove command branch
  -> ordered anomaly sequence validation
  -> ooze cadence
  -> snapshot publish
  -> render / minimap / HUD / runtime debug
```

## Current DSK/domain breakdown

```txt
application-shell-domain
  -> Next app shell
  -> screen state
  -> settings overlay
  -> completion routing

session-domain
  -> solo session
  -> host session
  -> client session
  -> room identity
  -> peer identity
  -> readiness state

network-domain
  -> PeerJS transport
  -> host transport
  -> client transport
  -> full sync messages
  -> player update messages
  -> interaction request messages
  -> request-sync recovery path

maze-domain
  -> seeded maze bootstrap
  -> cell lookup
  -> pathing
  -> start/end cell projection
  -> cube spawn projection

interaction-domain
  -> cube pickup
  -> cube drop
  -> cube placement
  -> cube removal
  -> anomaly slot occupancy
  -> ordered sequence validation

player-domain
  -> keyboard input
  -> pointer-lock state
  -> mouse look
  -> player movement
  -> collision resolution
  -> local pose prediction
  -> carry state sync

authority-domain
  -> local solo authority
  -> host authority
  -> client authoritative snapshot consumption
  -> publish cadence
  -> current GameState mutation

render-domain
  -> Three renderer
  -> camera
  -> post-processing
  -> maze world
  -> scene dressing summary
  -> minimap drawing

debug-domain
  -> runtime debug frame capture
  -> runtime debug event capture
  -> window debug export
```

## Planned command DSK cut

```txt
command-envelope-contract-kit
  -> CommandEnvelope
  -> CommandSource
  -> command id
  -> player id
  -> action
  -> payload

command-reason-catalog-kit
  -> accepted reasons
  -> rejected reasons
  -> unchanged reasons
  -> skipped reasons
  -> publish-only reasons
  -> victory reasons

interaction-preflight-kit
  -> playing-state validation
  -> player lookup
  -> carried cube lookup
  -> nearest loose cube lookup
  -> anomaly distance check
  -> free slot check
  -> occupied slot check

command-result-envelope-kit
  -> CommandResult
  -> before/after snapshot summary
  -> changed flag
  -> result events
  -> diagnostics
  -> legacy state-returning adapter

network-result-rules-kit
  -> applyNetworkPlayerUpdateResult
  -> syncHeldCubesToPlayersResult
  -> applyNetworkInteractionRequestResult
  -> request-sync publish-only result
  -> skipped ready/cancel/default results

publish-decision-snapshot-kit
  -> publish decision
  -> recovery decision
  -> no-op decision
  -> skip decision
  -> victory decision

command-result-journal-kit
  -> latest result
  -> accepted/rejected/unchanged/skipped/publish-only/victory counts
  -> latest publish decision
  -> replay rows

local-authority-result-consumer-kit
  -> local interaction consumer
  -> local skipped/no-op handling
  -> local accepted publish handling
  -> local victory commit handling

host-authority-result-consumer-kit
  -> host player update consumer
  -> host interaction consumer
  -> request-sync recovery handling
  -> rejected TRY_INTERACT skip handling

runtime-debug-result-projection-kit
  -> latestCommandResult
  -> latestPublishDecision
  -> latestRejectionReason
  -> latestConsumerAction
  -> commandJournalSummary
  -> fixtureParity

command-result-fixture-matrix-kit
  -> DOM-free command rows
  -> volatile normalization
  -> snapshot parity
  -> local/host consumer parity
```

## Source-backed service list

```txt
app/session service
peer sync service
maze bootstrap service
first-person player service
legacy GameState interaction service
legacy GameState network service
command result envelope service
publish decision service
local authority result consumer service
host authority result consumer service
diagnostics and replay service
render service
minimap service
validation/harness service
object/texture kit catalog service
```

## Main architecture gap

`GameCanvas.tsx` still owns runtime orchestration, local command derivation, host message application, publish cadence, render invocation, minimap draw, debug capture, and object-identity publish decisions.

The next source pass should not rewrite `GameCanvas.tsx` first.

It should add result-returning domain modules, prove them through a DOM-free fixture, then wire `GameCanvas.tsx` to the consumers.
