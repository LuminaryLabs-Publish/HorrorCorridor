# HorrorCorridor Fixture Script Validation Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T07-05-52-04-00`

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

The script should be added only after the pure source modules exist.

## Validation order

```txt
1. node scripts/horror-corridor-command-fixture.mjs
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
```

## Deploy guard

The fixture should be wired as a local/package validation gate before a wider deployment or visual pass.

Do not use a new branch.

Only push to `main`.

## Non-goals

```txt
- do not add a branch workflow.
- do not create a PR.
- do not change Pages/deploy behavior in this documentation pass.
- do not run browser automation until source fixture files exist.
```
