# HorrorCorridor Deploy Audit: Command Fixture Check Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-30-09-04-00`

## Current package checks

`HorrorCorridor-V1/package.json` currently exposes:

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

## Missing gate

```txt
node scripts/horror-corridor-command-fixture.mjs
```

The script does not exist yet and should be added before `GameCanvas.tsx` consumes result-first command decisions.

## Required deploy/check wire

```txt
scripts/horror-corridor-command-fixture.mjs
  -> imports canonical command fixture rows
  -> runs accepted/rejected/unchanged/skipped/publish-only/victory matrix
  -> prints deterministic row results
  -> exits non-zero on parity failure

package.json
  -> add a script such as command:fixture or fixture:commands
  -> include the command fixture in the preferred check chain only after it exists
```

## Safe validation sequence after implementation

```txt
node scripts/horror-corridor-command-fixture.mjs
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
```

## This pass

```txt
runtime source changed: no
branch created: no
pull request created: no
fixture script exists: no
local validation run: no
browser validation run: no
pushed docs to main: yes
```
