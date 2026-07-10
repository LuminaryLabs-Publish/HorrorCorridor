# HorrorCorridor Command Fixture Validation Gate

**Timestamp:** `2026-07-10T01-49-13-04-00`

## Package scripts observed

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

## Missing validation gate

```txt
node scripts/horror-corridor-command-fixture.mjs
```

The command fixture script does not exist yet.

## Next validation sequence

After adding command result wrappers and fixture rows:

```txt
cd HorrorCorridor-V1
node scripts/horror-corridor-command-fixture.mjs
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
```

## Deploy risk

Do not use browser or live multiplayer smoke as the first proof.

The bug class is command authority and publish decision metadata. It should be proven with deterministic domain rows before route-level validation.

## Gate requirement

```txt
- command fixture exists
- accepted/rejected/unchanged/skipped/publish-only/ooze/victory rows pass
- legacy GameState exports are preserved
- runtime debug command projection is additive
- GameCanvas publish behavior is changed only after fixture proof
```

## This pass validation

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
command fixture: not run because it does not exist yet
pushed to main: yes, documentation only
```
