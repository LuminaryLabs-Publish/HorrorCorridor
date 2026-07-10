# Deploy Audit — Command Fixture Validation Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T06-48-54-04-00`

## Current deploy/validation posture

The repo has validation scripts in `HorrorCorridor-V1/package.json`, including lint, protokit smoke, horror-corridor harness, live-agent review, object-kit review, visual match, and live-player validation.

The missing validation gate is a DOM-free command fixture that proves command result rows before browser/runtime consumers change.

## Required next fixture

```txt
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

Expected package script after the file exists:

```txt
"fixture:commands": "node scripts/horror-corridor-command-fixture.mjs"
```

## Fixture should prove

```txt
accepted/rejected interaction rows
publish-only request-sync row
skipped toggle-ready/cancel/default rows
accepted/unchanged player-update rows
ooze spawn/decay/no-diff rows
victory complete/rollback rows
local consumer publish/skip choices
host consumer publish/skip/recovery choices
runtime debug projection shape
legacy snapshot compatibility
```

## Validation order after implementation

```txt
npm run fixture:commands
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
npm run review:object-kit
```

## This pass validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
npm run validate:live-player:dev: not run
browser smoke: not run
command fixture: not run because it does not exist yet
pushed to main: yes, documentation only
```
