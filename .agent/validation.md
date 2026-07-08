# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-08T02:19:36-04:00`

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

## Required fixture matrix

```txt
accepted pickup
rejected pickup, no nearby cube
accepted drop
rejected drop, no carried cube
accepted place at anomaly
rejected place, too far from anomaly
rejected place, no free slot
accepted remove from anomaly
rejected remove, wrong slot
network player update accepted
network player update missing player unchanged
request-sync publish-only recovery
toggle-ready skipped
cancel skipped
unknown action skipped
ooze tick accepted or unchanged with reason
victory completion accepted
```

## Expected proof output

```txt
- command id
- command source
- command type
- status
- reason
- before tick
- after tick
- changed flag
- publish decision
- publish reason
- final snapshot summary
- volatile fields normalized
- replay parity passed or failed
```

## Validation performed in this documentation pass

```txt
[done] GitHub connector read of current Publish repo list.
[done] GitHub connector read of central LuminaryLabs-Dev/LuminaryLabs Publish ledger search results.
[done] GitHub connector read of HorrorCorridor repo-local agent tracker state.
[done] GitHub connector read of package scripts.
[done] GitHub connector read of GameCanvas runtime loop.
[done] GitHub connector read of networkRules authority seam.
[done] GitHub connector read of interactionRules silent no-op branches.
[done] Documentation-only .agent audit files written to main.
```

## Validation not performed in this documentation pass

```txt
[not-run] local checkout
[not-run] npm install
[not-run] npm run lint
[not-run] npm run smoke:protokits
[not-run] npm run harness:horror-corridor
[not-run] npm run validate:live-player:dev
[not-run] browser route check
[not-run] live host/client multiplayer check
[not-run] GitHub Actions rerun
[not-run] runtime implementation edit
```

## Current validation risk

Current runtime may be functionally playable, but the next implementation pass cannot safely claim command authority correctness until the command result fixture matrix exists and passes.