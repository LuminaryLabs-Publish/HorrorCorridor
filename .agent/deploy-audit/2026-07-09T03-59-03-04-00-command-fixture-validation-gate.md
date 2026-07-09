# Deploy Audit - Command Fixture Validation Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`
**Timestamp:** `2026-07-09T03-59-03-04-00`

## Current package scripts

```txt
dev: next dev
build: next build
start: next start
lint: eslint
harness:horror-corridor: node scripts/horror-corridor-harness.mjs
live-agent: node scripts/horror-corridor-live-agent.mjs --forever --start-server-once --launch-cdp-chrome --cdp-port 9224
live-agent:sample: node scripts/horror-corridor-live-agent.mjs --max-episodes 2 --start-server-once --launch-cdp-chrome --cdp-port 9224
review:live-agent: node scripts/review-live-agent-run.mjs
review:object-kit: node scripts/review-object-kit.mjs
smoke:protokits: node scripts/procedural-kit-smoke.mjs
visual:match: node scripts/horror-corridor-visual-match.mjs
validate:live-player: node scripts/horror-corridor-live-player-harness.mjs --launch-cdp-chrome --cdp-port 9224
validate:live-player:dev: node scripts/horror-corridor-live-player-harness.mjs --start-server --launch-cdp-chrome --cdp-port 9224
```

## Missing fixture gate

```txt
scripts/horror-corridor-command-fixture.mjs
npm script for command fixture
```

## Validation not run in this docs pass

```txt
npm install
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
node scripts/horror-corridor-command-fixture.mjs
npm run validate:live-player:dev
browser route check
live host/client multiplayer check
```

## Required gate before GameCanvas splice

The command fixture must exist and pass before `GameCanvas.tsx` stops using object identity for publish decisions.
