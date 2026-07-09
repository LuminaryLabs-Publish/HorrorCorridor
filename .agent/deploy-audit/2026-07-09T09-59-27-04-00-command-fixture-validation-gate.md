# Deploy Audit: Command Fixture Validation Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T09-59-27-04-00`

## Current package scripts

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

## Missing validation command

```txt
node scripts/horror-corridor-command-fixture.mjs
```

The script does not exist yet.

`package.json` should not be updated with a command fixture script until the source file exists.

## Required validation order for next implementation

```txt
1. Add command/result source modules.
2. Add command fixture seeds and rows.
3. Add scripts/horror-corridor-command-fixture.mjs.
4. Run node scripts/horror-corridor-command-fixture.mjs.
5. Add package.json script only after direct script run succeeds.
6. Run npm run lint.
7. Run npm run smoke:protokits.
8. Run npm run harness:horror-corridor.
9. Run npm run validate:live-player:dev.
10. Only then splice GameCanvas consumer logic.
```

## Fixture pass requirements

```txt
[ ] deterministic seed ids
[ ] deterministic command ids or normalized command id suffixes
[ ] before/after state summaries
[ ] accepted rows
[ ] rejected rows
[ ] unchanged rows
[ ] skipped rows
[ ] publish-only recovery row
[ ] ooze rows
[ ] victory row
[ ] local consumer rows
[ ] host consumer rows
[ ] runtime debug command projection row
[ ] final replicated snapshot facts
[ ] non-normalized assertions for status/reason/decision/broadcast/victory/cube/slot/player facts
```

## Deploy risk

No deploy configuration changed in this docs pass.

The highest current deploy risk is adding runtime consumer logic before the headless command fixture proves parity.

## Non-goals

```txt
- do not change deployment route first
- do not add CI workflow first
- do not edit package scripts before fixture script exists
- do not run live multiplayer validation as a replacement for command fixture proof
```
