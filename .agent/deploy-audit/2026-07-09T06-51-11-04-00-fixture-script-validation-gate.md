# Deploy Audit: Fixture Script Validation Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-51-11-04-00`

## Current package scripts

`HorrorCorridor-V1/package.json` currently exposes:

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

## Missing fixture gate

There is not yet a command-result fixture script.

The next implementation should add:

```txt
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

Then add a package script such as:

```json
"fixture:commands": "node scripts/horror-corridor-command-fixture.mjs"
```

## Gate order

```txt
1. Add command contracts and result wrappers.
2. Add seed-state fixture helpers.
3. Add command fixture runner.
4. Run command fixture script.
5. Run npm run lint.
6. Run npm run smoke:protokits.
7. Run npm run harness:horror-corridor.
8. Run npm run validate:live-player:dev when browser/CDP is available.
9. Only then wire GameCanvas to result consumers.
10. Update central ledger after implementation lands.
```

## Main-branch rule

```txt
branch created: no
pull request required: no
push target: main only
```

## Validation in this pass

```txt
runtime source changed: no
local npm install: no
local npm run lint: no
local npm run build: no
browser smoke: no
fixture run: no, fixture does not exist yet
```
