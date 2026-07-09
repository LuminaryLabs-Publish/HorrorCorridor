# Deploy Audit: Command Fixture Package Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T18-30-30-04-00`

## Current scripts

`HorrorCorridor-V1/package.json` exposes:

```txt
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run live-agent:sample
npm run review:object-kit
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
```

## Missing fixture gate

The next implementation should add:

```txt
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

Then wire a package script after the file exists.

## Required validation after implementation

```txt
node scripts/horror-corridor-command-fixture.mjs
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
```

## Validation this pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run lint: not run
browser smoke: not run
command fixture: not run because fixture files do not exist yet
pushed to main: yes, docs only
```
