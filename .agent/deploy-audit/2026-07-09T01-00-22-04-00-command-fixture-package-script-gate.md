# HorrorCorridor Command Fixture Package Script Gate

**Timestamp:** `2026-07-09T01-00-22-04-00`

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

## Missing validation script

```txt
node scripts/horror-corridor-command-fixture.mjs
```

This script does not exist yet and should be added before browser/runtime integration.

## Package script to add after fixture exists

```json
{
  "scripts": {
    "fixture:commands": "node scripts/horror-corridor-command-fixture.mjs"
  }
}
```

## Deployment/check order for implementation pass

```txt
1. Add pure command authority modules.
2. Add command fixture script.
3. Add fixture package script.
4. Run node scripts/horror-corridor-command-fixture.mjs.
5. Run npm run lint.
6. Run npm run smoke:protokits.
7. Run npm run harness:horror-corridor.
8. Only then wire runtimeDebugStore and GameCanvas.
9. Run npm run validate:live-player:dev when browser/CDP is available.
```

## Non-goals

```txt
- no workflow/deploy changes before source fixture exists
- no GitHub Pages or hosting change in this pass
- no branch creation
- no PR flow
- push only to main when implementing
```

## Documentation-run validation status

```txt
runtime source changed: no
package.json changed: no
fixture script added: no
local npm install: no
local npm run lint: no
local harness: no
browser/CDP validation: no
```
