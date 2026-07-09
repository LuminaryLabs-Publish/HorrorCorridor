# HorrorCorridor Command Fixture Script Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-19-00-04-00`

## Current scripts

`HorrorCorridor-V1/package.json` currently exposes validation and harness scripts such as:

```txt
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run live-agent:sample
npm run review:object-kit
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
```

## Missing script

The command authority fixture script does not exist yet.

Required next script:

```txt
node scripts/horror-corridor-command-fixture.mjs
```

Required package alias after the script exists:

```txt
npm run fixture:commands
```

## Deploy / validation rule

The fixture must run before any live browser or multiplayer validation is trusted.

Recommended order:

```txt
1. node scripts/horror-corridor-command-fixture.mjs
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
```

## Non-goals

```txt
- do not alter GitHub Pages/deploy first
- do not add a new branch
- do not create a PR
- do not rewrite runtime source before fixture source files exist
- do not treat browser smoke as sufficient command authority proof
```

## Pass validation status

This was a documentation-only audit pass.

No local install, npm command, browser smoke, live host/client smoke, or runtime source edit was performed.
