# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T15-31-03-04-00`

## Goal

Introduce an authority-neutral command correlation ledger that preserves current solo, host, client, cadence, and snapshot behavior while making every domain result and every publish, skip, recovery, victory, or cadence decision explicit and replayable.

## Current next build slice

```txt
HorrorCorridor Authority Command Correlation Ledger + Publish Parity Fixture Gate
```

## Plan ledger

```txt
[ ] Preserve current solo, host, client, PeerJS, renderer, minimap, HUD, completion, and runtime-debug behavior.
[ ] Define stable CommandId, CorrelationId, CommandSource, AuthorityMode, CommandKind, CommandStatus, and CommandReason values.
[ ] Define CommandResult with before/after summaries, semantic changed flag, events, and legacy GameState.
[ ] Define PublishDecision independently from CommandResult.
[ ] Support publish-command-result, publish-recovery, publish-victory, publish-cadence, skip-rejected, skip-noop, and skip-client-only decisions.
[ ] Define CommandCorrelationRecord linking requestId, commandId, result, consumer, publication reason, and published snapshot tick.
[ ] Add result-returning interaction wrappers while retaining current GameState exports.
[ ] Add result-returning network wrappers while retaining current GameState exports.
[ ] Add result-returning ooze wrappers that distinguish no spawned/decayed entries from semantic mutation.
[ ] Add result-returning ordered-sequence wrappers for completion and rollback.
[ ] Create one authority-command consumer shared by local and host paths.
[ ] Keep transport cadence publication as a separate source category rather than manufacturing a command acceptance result.
[ ] Record every consumed command in an ordered bounded journal.
[ ] Add counters by source, authority mode, status, reason, publish decision, and correlation completeness.
[ ] Add canonical fixture seeds before modifying GameCanvas.
[ ] Prove local and host parity for accepted pickup, rejected pickup, accepted place, rejected place, victory, and remove.
[ ] Prove deliberate divergence for request-sync recovery and cadence publication.
[ ] Prove no-op ooze rows without relying on object identity.
[ ] Prove published snapshot tick and publication reason are attached to the originating correlation record.
[ ] Prove legacy final GameState and replicated snapshot parity.
[ ] Add runtime-debug projection only after domain fixtures pass.
[ ] Expose latest correlation, result, reason, publish decision, published tick, consumer, journal counters, and fixture parity additively.
[ ] Replace GameCanvas local/host publication inference only after fixture proof.
[ ] Keep all changes on main and synchronize the central ledger after implementation.
```

## Suggested source order

```txt
1. commandTypes.ts
2. commandReasons.ts
3. commandResults.ts
4. publishDecisions.ts
5. commandCorrelation.ts
6. commandJournal.ts
7. commandFixtureSeeds.ts
8. interactionResultRules.ts
9. networkResultRules.ts
10. oozeResultRules.ts
11. winResultRules.ts
12. authorityCommandConsumer.ts
13. authorityParityFixtureRows.ts
14. horror-corridor-authority-parity-fixture.mjs
15. package.json fixture:authority-parity
16. runtimeDebugCommandProjection.ts
17. runtimeDebugStore.ts additive projection
18. GameCanvas.tsx consumer splice
```

## Required fixture rows

```txt
local accepted pickup -> publish command result
host accepted pickup -> publish command result
local rejected pickup while carrying -> skip rejected
host rejected pickup while carrying -> skip rejected after consumer migration
local no nearby cube -> skip rejected
host no nearby cube -> skip rejected after consumer migration
accepted drop parity
accepted place parity
final place victory parity
rejected place too far parity
accepted remove parity
wrong-slot remove parity
missing-player update result
already-synchronized held cube no-op result
request-sync recovery publish with no fake mutation
cancel/toggle-ready explicit skip
unknown action explicit skip
ooze spawn result
ooze decay result
ooze decay-not-due no-op
ooze spacing/cap no-op
cadence publish with no command result
published correlation includes snapshot tick
runtime-debug correlation projection
legacy GameState parity
replicated snapshot parity
journal order and bounded retention
```

## Acceptance checks

```txt
[ ] npm run fixture:authority-parity
[ ] npm run lint
[ ] npm run smoke:protokits
[ ] npm run harness:horror-corridor
[ ] npm run validate:live-player:dev
[ ] npm run review:object-kit
[ ] browser solo smoke
[ ] browser host/client smoke
```

## Explicit non-goals

```txt
PeerJS extraction
renderer extraction
minimap extraction
post-processing extraction
new routes
new maze content
scene-dressing expansion
visual object-kit expansion
wholesale GameCanvas rewrite
changing network tick frequency
changing gameplay balance
```