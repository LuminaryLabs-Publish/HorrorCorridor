# Deploy Audit: Command Fixture Validation Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T05-11-51-04-00`

## Current scripts

`HorrorCorridor-V1/package.json` exposes:

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

## Missing fixture command

```txt
node scripts/horror-corridor-command-fixture.mjs
```

`package.json` should receive a named script only after that file exists and passes locally.

## Gate order for the next implementation

```txt
1. Add command domain modules with legacy adapter exports preserved.
2. Add DOM-free fixture seeds and rows.
3. Run node scripts/horror-corridor-command-fixture.mjs.
4. Add package script for the fixture.
5. Run npm run lint.
6. Run npm run smoke:protokits.
7. Run npm run harness:horror-corridor.
8. Run npm run validate:live-player:dev when browser/CDP validation is needed.
9. Only then splice GameCanvas and runtime debug consumers.
```

## Deploy finding

There is no deployment change needed for this docs pass. The next deploy gate is fixture-first validation, not hosting or route work.
