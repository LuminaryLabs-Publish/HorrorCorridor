# Deploy Audit: Command Fixture Validation Wire Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-11-35-04-00`

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

## Missing validation wire

There is not yet a command replay fixture script.

```txt
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

There is not yet a package script for that fixture.

## Required next validation command

Add after the fixture exists:

```json
{
  "scripts": {
    "fixture:commands": "node scripts/horror-corridor-command-fixture.mjs"
  }
}
```

## Required validation order after implementation

```txt
1. npm run fixture:commands
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
```

## Fixture output requirements

```txt
fixture id
seed id
command id
command source
command type
status
reason
changed flag
publish decision
shouldBroadcast
shouldCommitVictory
snapshot reason
local consumer action
host consumer action
runtime debug projection summary
final snapshot summary
parity passed
```

## Deploy guardrail

Do not wire this into broader deploy behavior until it passes locally.

Do not modify Pages/deploy configuration in the same pass as the first command fixture implementation.

This audit is a validation wire map only.
