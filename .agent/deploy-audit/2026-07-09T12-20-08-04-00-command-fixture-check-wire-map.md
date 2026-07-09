# HorrorCorridor Deploy / Validation Wire Audit

**Timestamp:** `2026-07-09T12-20-08-04-00`

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

## Missing fixture script

```txt
node scripts/horror-corridor-command-fixture.mjs
```

## Required package script after fixture exists

```txt
"fixture:commands": "node scripts/horror-corridor-command-fixture.mjs"
```

## Recommended check order after implementation

```txt
npm run fixture:commands
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
```

## Deployment note

This pass changed only `.agent` and central ledger documentation.

No runtime source, package script, workflow, build artifact, or Pages configuration was changed.

## Next safe ledge

```txt
HorrorCorridor Result-First Command Readback Ledger Refresh + Fixture Gate
```
