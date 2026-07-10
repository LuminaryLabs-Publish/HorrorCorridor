# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T13-58-16-04-00`

## Available commands

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

## Missing required command

```txt
npm run fixture:commands
```

The package script cannot exist meaningfully until the command contracts, canonical seeds, fixture rows, and DOM-free runner exist.

## Documentation evidence sampled

```txt
[done] full accessible LuminaryLabs-Publish repository inventory
[done] central HorrorCorridor ledger and repo-local .agent state
[done] HorrorCorridor-V1/package.json scripts
[done] interactionRules.ts unchanged-state branches
[done] networkRules.ts GameState-only result seam
[done] oozeRules.ts cadence, decay, spawn, spacing, and capacity paths
[done] current command-outcome, gameplay, interaction, render, and deploy audit state
[done] latest repository commits verified as documentation-only after the prior audit
```

## Required implementation validation matrix

```txt
interaction accepted/rejected/unchanged rows
network accepted/skipped/recovery/unknown rows
ooze spawn/decay/not-due/spacing/cap rows
victory completion/rollback rows
local consumer publish/skip rows
host consumer publish/skip/recovery rows
journal order and counters
runtime-debug projection rows
legacy GameState final snapshot parity
volatile field normalization only
```

## Validation order for the next source pass

```txt
1. npm run fixture:commands
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
6. npm run review:object-kit
7. browser solo smoke
8. browser host/client smoke
```

## Not run in this documentation pass

```txt
npm install
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
npm run fixture:commands
browser route smoke
live host/client multiplayer smoke
runtime source validation
```

## Pass status

```txt
runtime source changed: no
branch created: no
pull request created: no
dependencies changed: no
routes changed: no
deployment changed: no
command fixture: unavailable
repo-local documentation pushed to main: yes
central ledger sync: pending until repo-local audit set completes
```
