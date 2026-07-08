# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-08T06:28:31-04:00`

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
1. npm run lint
2. npm run smoke:protokits
3. npm run harness:horror-corridor
4. node scripts/horror-corridor-command-fixture.mjs
5. npm run validate:live-player:dev
6. npm run review:object-kit
```

## Required command fixture matrix

```txt
accepted pickup near loose cube
rejected pickup while already carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly with carried cube
rejected place too far from anomaly
rejected place with no free slot
accepted remove last anomaly cube
rejected remove wrong slot
publish-only request-sync
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged player update for missing player
accepted or unchanged ooze tick with reason
victory ordered-sequence completion
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
events
journal counts
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
```

## Fields not allowed to normalize

```txt
command status
command reason
publish decision
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
[done] GitHub connector read of central LuminaryLabs-Dev/LuminaryLabs Publish ledger search results.
[done] GitHub connector read of HorrorCorridor repo-local agent state.
[done] GitHub connector read of package scripts.
[done] GitHub connector read of networkRules authority seam.
[done] GitHub connector read of interactionRules silent no-op branches.
[done] GitHub connector read of command fixture implementation map.
[done] Documentation-only .agent audit files written to main.
[done] Central LuminaryLabs internal change-log and HorrorCorridor ledger pointers written to main.
```

## Validation not performed in this documentation pass

```txt
[not-run] local checkout
[not-run] npm install
[not-run] npm run lint
[not-run] npm run smoke:protokits
[not-run] npm run harness:horror-corridor
[not-run] node scripts/horror-corridor-command-fixture.mjs
[not-run] npm run validate:live-player:dev
[not-run] browser route check
[not-run] live host/client multiplayer check
[not-run] GitHub Actions rerun
[not-run] runtime implementation edit
```

## Current validation risk

Current runtime may be functionally playable, but the next implementation pass cannot safely claim command authority correctness until the command result fixture matrix exists and passes.

The next proof should be headless first. Browser and live multiplayer validation should follow only after the command result fixture proves local and host authority decisions.

## Current proof blocker

```txt
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

That script is documented as the next acceptance command but has not been implemented yet.
