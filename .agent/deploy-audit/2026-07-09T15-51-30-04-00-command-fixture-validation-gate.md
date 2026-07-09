# HorrorCorridor Deploy Audit: Command Fixture Validation Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T15-51-30-04-00`

## Current available scripts

From `HorrorCorridor-V1/package.json`:

```txt
npm run dev
npm run build
npm run start
npm run lint
npm run harness:horror-corridor
npm run live-agent
npm run live-agent:sample
npm run review:live-agent
npm run review:object-kit
npm run smoke:protokits
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
```

## Missing deploy/validation gate

There is no command fixture script yet.

Required next script:

```txt
node scripts/horror-corridor-command-fixture.mjs
```

Recommended package alias after the script exists:

```txt
"fixture:commands": "node scripts/horror-corridor-command-fixture.mjs"
```

## Gate order for next implementation

```txt
1. node scripts/horror-corridor-command-fixture.mjs
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
6. npm run review:object-kit
```

## Fixture must prove

```txt
accepted, rejected, unchanged, skipped, publish-only, and victory command rows
local consumer publish/skip decisions
host consumer publish/skip/recovery decisions
runtime debug command projection serialization
legacy snapshot shape preservation
volatile field normalization only where allowed
final replicated snapshot parity
```

## Build/deploy rule

Do not rely on a browser-only smoke to validate the command seam. The first proof must be DOM-free and source-owned.

Do not change deployment, routes, or visual assets before the command fixture gate exists.

## Validation in this pass

```txt
runtime source changed: no
local npm commands run: no
browser route checked: no
live-player harness run: no
multiplayer host/client check run: no
repo-local docs pushed to main: yes
central ledger update required: yes
```
