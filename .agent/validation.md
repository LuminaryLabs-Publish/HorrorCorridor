# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T15-31-03-04-00`

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
npm run fixture:authority-parity
```

The command cannot be added meaningfully until the command contracts, correlation record, canonical seeds, authority consumer, fixture rows, and DOM-free runner exist.

## Documentation evidence sampled

```txt
[done] full accessible LuminaryLabs-Publish repository inventory
[done] central HorrorCorridor ledger and repo-local .agent state
[done] latest HorrorCorridor commits verified as documentation-only
[done] interactionRules.ts unchanged-state branches
[done] networkRules.ts action dispatch and missing-player path
[done] oozeRules.ts decay cadence, spacing, capacity, and always-new spawn result
[done] winRules.ts completion, rollback, slot refresh, and unchanged paths
[done] GameCanvas local identity-based skip path
[done] GameCanvas host TRY_INTERACT unconditional publish path
[done] GameCanvas periodic authority cadence publication path
[done] runtimeDebugStore bounded frames/events and window export
[done] central repo ledger and internal change-log synchronized
```

## Required implementation validation matrix

```txt
interaction accepted/rejected/unchanged rows
network accepted/skipped/recovery/unknown rows
ooze spawn/decay/not-due/spacing/cap rows
victory completion/rollback rows
local consumer publish/skip rows
host consumer publish/skip/recovery rows
local-host parity for identical commands
cadence publication classified separately from command publication
command correlation includes requestId/commandId/result/decision/published tick
journal order, bounded retention, and counters
runtime-debug correlation projection
legacy GameState final snapshot parity
replicated snapshot parity
volatile timestamp/id normalization only
```

## Validation order for the next source pass

```txt
1. npm run fixture:authority-parity
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
6. npm run review:object-kit
7. browser solo smoke
8. browser host/client smoke
9. runtime-debug export inspection
```

## Not run in this documentation pass

```txt
npm install
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
npm run fixture:authority-parity
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
authority parity fixture: unavailable
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change-log added: yes
```