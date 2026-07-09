# Deploy Audit: Command Fixture Validation Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T12-25-39-04-00`

## Current package validation commands

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

## Missing validation command

```txt
node scripts/horror-corridor-command-fixture.mjs
```

The script does not exist yet, so the next implementation pass must add it before package-level validation can include a command fixture script.

## Required deploy gate after implementation

```txt
1. node scripts/horror-corridor-command-fixture.mjs
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
```

## Main branch rule

All documentation updates in this run targeted `main`. No branch or PR was created.

## Runtime status

No runtime source changed in this documentation-only pass. Deployment behavior should be unchanged.
