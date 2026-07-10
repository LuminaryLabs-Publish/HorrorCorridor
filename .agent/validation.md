# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T09-40-13-04-00`

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
1. npm run fixture:commands
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
victory rollback if slots become invalid
local consumer skips rejected/no-op broadcast
local consumer publishes accepted changed/victory
host consumer skips rejected TRY_INTERACT broadcast
host consumer publishes request-sync recovery
runtime debug projects latest command result
runtime debug projects latest publish decision
runtime debug projects latest command reason
runtime debug projects command journal counts
GameCanvas consumer splice preserves legacy snapshot shape
final snapshot summary parity
central ledger is updated after implementation lands
```

## Validation performed in this documentation pass

```txt
[done] Current public Publish repo list read.
[done] Central LuminaryLabs-Dev/LuminaryLabs Publish ledger context read.
[done] HorrorCorridor repo-local agent state read.
[done] interactionRules GameState-only command seam sampled.
[done] networkRules GameState-only command seam sampled.
[done] oozeRules GameState-only command seam sampled.
[done] runtimeDebugStore current debug export shape sampled.
[done] Documentation-only .agent audit files written to main.
[done] Central LuminaryLabs ledger and change log written to main after repo-local pass.
```

## Validation not performed

```txt
[not-run] npm install
[not-run] npm run lint
[not-run] npm run smoke:protokits
[not-run] npm run harness:horror-corridor
[not-run] npm run fixture:commands, because the fixture does not exist yet
[not-run] npm run validate:live-player:dev
[not-run] browser route check
[not-run] live host/client multiplayer check
[not-run] runtime source edit
```

## This pass status

```txt
runtime source changed: no
branch created: no
pull request created: no
browser smoke: not run
command fixture: not run because proof files do not exist yet
pushed to main: yes
```
