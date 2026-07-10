# Deploy Audit: Command Decision Fixture Gate

**Timestamp:** `2026-07-10T10-58-54-04-00`

## Current validation commands

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

## Validation not run this pass

```txt
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
npm run validate:live-player:dev: not run
browser smoke: not run
command fixture: not run because proof files do not exist yet
```

## Next gate

Add and run the command fixture before runtime rewiring:

```txt
npm run fixture:commands
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
```

## Deployment stance

No branch or PR. Push documentation directly to `main` only.
