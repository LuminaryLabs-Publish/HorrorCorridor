# Deploy Audit: Command Result Fixture Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T09-40-13-04-00`

## Current deploy posture

This pass changed documentation only. Runtime source, package scripts, browser route behavior, and deployment settings were not changed.

## Available checks

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

## Required new gate

```txt
npm run fixture:commands
```

The fixture command does not exist yet. It should be added only after deterministic command fixture rows exist.

## Gate matrix

```txt
[ ] contracts compile
[ ] accepted pickup/drop/place/remove rows pass
[ ] rejected pickup/drop/place/remove rows pass
[ ] publish-only request-sync row passes
[ ] skipped toggle-ready/cancel/unknown rows pass
[ ] player update changed/no-op rows pass
[ ] held cube sync changed/no-op rows pass
[ ] ooze spawn/decay/no-state-diff rows pass
[ ] victory and rollback rows pass
[ ] local consumer publish/skip rows pass
[ ] host consumer publish/skip/recovery rows pass
[ ] runtime debug projection rows pass
[ ] command journal counter rows pass
[ ] legacy GameState snapshot parity passes
[ ] npm run lint passes
[ ] npm run smoke:protokits passes
[ ] npm run harness:horror-corridor passes
[ ] npm run validate:live-player:dev passes
```

## Release note

Do not deploy a behavior-changing command authority refactor until the command fixture proves legacy snapshot compatibility and runtime debug projection can explain command result and publish decision rows.

## Validation performed this pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
npm run validate:live-player:dev: not run
browser smoke: not run
command fixture: not run because proof files do not exist yet
```
