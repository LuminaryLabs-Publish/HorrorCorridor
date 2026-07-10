# Deploy Audit: Command Fixture Check Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T00-18-38-04-00`

## Existing validation commands

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

## Current validation status

This pass was documentation-only.

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
npm run validate:live-player:dev: not run
browser smoke: not run
live host/client validation: not run
DOM-free command fixture: not run because it does not exist yet
```

## Required next gate

Add:

```txt
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

Then add a package script such as:

```txt
npm run fixture:commands
```

Then run:

```txt
node scripts/horror-corridor-command-fixture.mjs
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
```

## Deploy finding

The repo has strong existing validation commands, but no command-result fixture gate.

The next deploy-safe cut should land DOM-free command fixture rows before changing `GameCanvas` publish behavior.
