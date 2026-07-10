# HorrorCorridor Command Fixture Check Gate

**Timestamp:** `2026-07-09T22-50-53-04-00`

## Summary

Deployment and validation should wait for a command fixture gate before runtime behavior changes.

The repo already has useful validation scripts, but no command-result fixture script exists yet.

## Current scripts

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

## Missing script

```txt
node scripts/horror-corridor-command-fixture.mjs
```

## Required next validation order

```txt
1. node scripts/horror-corridor-command-fixture.mjs
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
6. npm run review:object-kit
```

## Fixture gate must prove

```txt
accepted interaction rows
rejected interaction rows
unchanged player update rows
held-cube sync rows
request-sync recovery row
toggle-ready skipped row
cancel skipped row
unknown-action skipped row
ooze spawn/decay/no-diff rows
ordered victory row
local consumer publish/skip decisions
host consumer publish/skip/recovery decisions
runtime debug command projection rows
final snapshot parity
```

## Validation status for this pass

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm install: not run
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
npm run validate:live-player:dev: not run
browser smoke: not run
DOM-free command fixture: not run because fixture does not exist yet
pushed to main: yes, documentation only
```
