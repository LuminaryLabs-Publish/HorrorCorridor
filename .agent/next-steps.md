# HorrorCorridor Next Steps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T13-58-16-04-00`

## Goal

Create a source-owned command outcome ledger that preserves current gameplay and network behavior while making every command result and publication decision deterministic, serializable, fixture-proven, and visible through runtime debug.

## Current next build slice

```txt
HorrorCorridor Command Outcome Source Ledger + Runtime Debug Fixture Gate
```

## Plan ledger

```txt
[ ] Preserve solo, host, client, PeerJS, renderer, minimap, HUD, completion, and runtime-debug behavior.
[ ] Define CommandSource, CommandKind, CommandStatus, CommandReason, CommandEvent, CommandSnapshotSummary, and CommandResult.
[ ] Define PublishDecision with publish, skip, recovery, victory, no-op, and publish-only outcomes.
[ ] Define stable reasons for every unchanged-state branch in interactionRules.ts.
[ ] Define stable reasons for missing-player, request-sync, toggle-ready, cancel, and unknown network paths.
[ ] Define stable reasons for ooze decay-not-due, spacing guard, capacity guard, spawn, decay, and unchanged paths.
[ ] Define stable reasons for ordered-sequence completion and rollback.
[ ] Add before/after snapshot summaries and changed-state calculation.
[ ] Add result-returning interaction wrappers while retaining legacy GameState exports.
[ ] Add result-returning network wrappers while retaining legacy GameState exports.
[ ] Add result-returning ooze wrappers while retaining legacy GameState exports.
[ ] Add result-returning victory wrappers while retaining legacy GameState exports.
[ ] Add an ordered bounded CommandJournal with counters by source, status, reason, and publication decision.
[ ] Add local-authority and host-authority command consumers.
[ ] Add canonical fixture seed states before touching GameCanvas.
[ ] Add deterministic fixture rows for accepted, rejected, skipped, unchanged, recovery, ooze, victory, and publish-only behavior.
[ ] Add DOM-free fixture runner and package script.
[ ] Prove legacy final GameState snapshot parity.
[ ] Add RuntimeDebugCommandProjection only after fixture rows pass.
[ ] Expose latest result, latest reason, latest publication decision, latest consumer action, journal counters, and fixture parity additively.
[ ] Replace GameCanvas state-identity inference only after domain and fixture proof.
[ ] Keep all changes on main and update central ledger after implementation.
```

## Suggested source order

```txt
1. commandTypes.ts
2. commandReasons.ts
3. commandResults.ts
4. publishDecisions.ts
5. commandJournal.ts
6. commandFixtureSeeds.ts
7. commandFixtureRows.ts
8. interactionPreflight.ts
9. interactionResultRules.ts
10. networkResultRules.ts
11. oozeResultRules.ts
12. winResultRules.ts
13. localAuthorityCommandConsumer.ts
14. hostAuthorityCommandConsumer.ts
15. horror-corridor-command-fixture.mjs
16. package.json fixture:commands
17. runtimeDebugCommandProjection.ts
18. runtimeDebugStore.ts additive projection
19. GameCanvas.tsx consumer splice
```

## Required fixture rows

```txt
accepted pickup near loose cube
rejected pickup while carrying
rejected pickup with no nearby cube
accepted drop
rejected drop without carried cube
accepted place
accepted final place with victory
rejected place too far
rejected place with no free slot
accepted remove last slot
rejected remove wrong slot
accepted player update
unchanged missing-player update
accepted held-cube synchronization
unchanged already-synchronized held cube
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
ooze spawn
ooze decay
ooze decay-not-due
ooze spacing/cap unchanged
ordered-sequence victory
victory rollback
local rejected/no-op skip
local changed/victory publish
host rejected TRY_INTERACT skip
host request-sync recovery publish
runtime-debug outcome projection
legacy snapshot parity
```

## Acceptance checks

```txt
[ ] npm run fixture:commands
[ ] npm run lint
[ ] npm run smoke:protokits
[ ] npm run harness:horror-corridor
[ ] npm run validate:live-player:dev
[ ] npm run review:object-kit
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
```
