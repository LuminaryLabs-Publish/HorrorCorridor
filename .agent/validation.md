# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-08T22-51-43-04-00`

## Available validation commands

From `HorrorCorridor-V1/package.json`:

```txt
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run live-agent:sample
npm run review:live-agent
npm run review:object-kit
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
```

## Validation target for the next implementation pass

```txt
1. node scripts/horror-corridor-command-fixture.mjs
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
6. npm run review:object-kit
```

## Required command decision fixture matrix

```txt
accepted pickup near loose cube
rejected pickup while already carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly with carried cube
accepted place final anomaly slot as victory
rejected place too far from anomaly
rejected place with no free slot
accepted remove last anomaly cube
rejected remove wrong slot
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged player update for missing player
accepted held cube sync
unchanged held cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
victory ordered-sequence completion
local consumer skips rejected/no-op broadcast
local consumer publishes accepted changed/victory
host consumer skips rejected TRY_INTERACT broadcast
host consumer publishes request-sync recovery
runtime debug projects latest command result
runtime debug projects latest publish decision
runtime debug projects journal counts
final snapshot summary parity
```

## Required fixture fields

```txt
fixture id
seed id
seed description
command id
command source
command type
player id
input action
before state summary
expected status
expected reason
expected changed flag
expected publish decision
expected shouldBroadcast
expected shouldCommitVictory
expected snapshot reason
expected events
expected cube facts
expected slot facts
expected local consumer action
expected host consumer action
expected debug projection
final state summary
non-normalized assertions
volatile fields normalized
parity passed or failed
```

## Required publish-decision matrix

```txt
accepted changed -> publish
accepted unchanged -> no-op
rejected -> skip
unchanged -> skip or no-op by helper type
publish-only -> recovery
skipped -> skip
victory -> victory
```

## Expected proof output

```txt
fixture id
command id
command source
command type
status
reason
before tick
after tick
changed flag
publish decision
publish reason
shouldBroadcast
shouldCommitVictory
snapshot reason
events
journal counts
local consumer action
host consumer action
runtime debug projection
final snapshot summary
volatile fields normalized
replay parity passed or failed
```

## Volatile fields allowed to normalize

```txt
timestampMs
room.updatedAtMs
runtime frame counters
randomized debug ids
network cadence ages
command id suffixes when fixture seed proves stable command type/source/reason
```

## Fields not allowed to normalize

```txt
command status
command reason
publish decision
shouldBroadcast
shouldCommitVictory
snapshot reason
local consumer action
host consumer action
sequence slots
cube ownership
cube visibility
held cube state
player pose
victory state
final snapshot facts
```

## Validation performed in this documentation pass

```txt
[done] GitHub connector read of current Publish repo list.
[done] GitHub connector read of central LuminaryLabs-Dev/LuminaryLabs Publish ledger context.
[done] GitHub connector read of sampled repo-local .agent/START_HERE timestamps.
[done] GitHub connector read of HorrorCorridor repo-local agent state.
[done] GitHub connector read of package validation scripts.
[done] GitHub connector read of GameCanvas runtime/publish/render loop.
[done] GitHub connector read of networkRules authority seam.
[done] GitHub connector read of interactionRules silent no-op branches.
[done] Documentation-only .agent audit files written to main.
[done] Central LuminaryLabs ledger and change log written to main.
```

## Validation not performed

```txt
[not-run] npm install
[not-run] npm run lint
[not-run] npm run smoke:protokits
[not-run] npm run harness:horror-corridor
[not-run] node scripts/horror-corridor-command-fixture.mjs, because the fixture does not exist yet
[not-run] npm run validate:live-player:dev
[not-run] browser route check
[not-run] live host/client multiplayer check
```
