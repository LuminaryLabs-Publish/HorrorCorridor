# Architecture Audit: Command Debug Projection DSK Map

## Current architecture

```txt
GameCanvas
  -> local input / peer messages
  -> networkRules.applyNetworkPlayerUpdate
  -> networkRules.applyNetworkInteractionRequest
  -> interactionRules pickup/drop/place/remove
  -> oozeRules advanceOozeTrail
  -> winRules validateOrderedSequenceCompletion
  -> buildReplicatedSnapshot
  -> publishAuthoritativeState implicit reason string
  -> recordRuntimeDebugFrame / recordRuntimeDebugEvent
```

## Current rule boundary

The core rule files return `GameState` only:

```txt
interactionRules.ts
networkRules.ts
oozeRules.ts
winRules.ts
```

That preserves behavior, but it erases command reason, status, before/after summary, event list, publish decision, and fixture row identity.

## Domains mapped

```txt
command source: local input, client TRY_INTERACT, host PLAYER_UPDATE, host request-sync, ooze cadence, ordered sequence validation
legacy rules: interaction/network/ooze/win GameState-only functions
authority consumers: local solo/host path, client send path, host receive path
publish policy: implicit object identity and reason strings
runtime debug: frame/event store without command fields
fixture target: deterministic command rows for accepted/rejected/skipped/no-op/publish-only/ooze/victory
```

## Next architecture

```txt
CommandEnvelope
  -> CommandReasonCatalog
  -> CommandResultEnvelope
  -> PublishDecisionSnapshot
  -> CommandJournal
  -> LocalAuthorityCommandConsumer
  -> HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> CommandFixtureMatrix
  -> legacy GameState adapters preserved
```

## Main finding

Add result and debug rows around existing rules first. Do not rewrite rendering, minimap, PeerJS, post-processing, or scene dressing in this cut.
