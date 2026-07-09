# Deploy Audit — Command Fixture Check Wire Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T10-10-32-04-00`

## Current validation scripts

`HorrorCorridor-V1/package.json` currently exposes:

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

There is not yet a command-result fixture script.

## Required next script

```txt
node scripts/horror-corridor-command-fixture.mjs
```

After the file exists and passes, add a package script:

```json
{
  "scripts": {
    "fixture:commands": "node scripts/horror-corridor-command-fixture.mjs"
  }
}
```

## Recommended validation order

```txt
1. node scripts/horror-corridor-command-fixture.mjs
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
6. npm run review:object-kit
```

## Deploy gate intent

The fixture should run before any static/deploy validation because it protects the authority seam that drives local, host, client, debug, and victory behavior.

The gate should fail if:

```txt
- any expected CommandReason is missing
- legacy adapter final state diverges from existing rule output
- request-sync does not classify as recovery/publish-only
- rejected local command would broadcast
- rejected host TRY_INTERACT would broadcast
- victory completion lacks shouldCommitVictory
- runtime debug command projection is not serializable
- final snapshot facts differ after volatile normalization
```

## Validation performed in this documentation pass

```txt
GitHub connector read of package.json: done
GitHub connector read of GameCanvas local/host authority seam: done
GitHub connector read of interactionRules.ts: done
GitHub connector read of networkRules.ts: done
GitHub connector read of runtimeDebugStore.ts: done
runtime source changed: no
local commands run: no
branch created: no
pull request created: no
```
