# HorrorCorridor Deploy Audit: Fixture Command Central Sync

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T01-09-24-04-00`

## Current package scripts

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

## Missing validation script

```txt
npm run fixture:commands
```

The script should be added only after this file exists:

```txt
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

## Proposed package script

```json
"fixture:commands": "node scripts/horror-corridor-command-fixture.mjs"
```

## Required validation order for the next runtime pass

```txt
1. npm run fixture:commands
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
6. npm run review:object-kit
```

## Deployment risk

No deployment or Pages behavior should change during the command fixture cut.

The source change must stay additive until the command fixture, lint, harness, and live-player checks pass.

## Central ledger sync requirement

After runtime command-source work lands, update:

```txt
LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
LuminaryLabs-Dev/LuminaryLabs/internal-change-log/<timestamp>-horror-corridor-command-fixture-implementation.md
```

## This pass validation

```txt
runtime source changed: no
package.json changed: no
branch created: no
pull request created: no
local npm install: no
local npm run lint: no
local fixture command: no, fixture file does not exist yet
browser smoke: no
pushed docs to main: yes
central ledger sync planned and written in this run: yes
```
