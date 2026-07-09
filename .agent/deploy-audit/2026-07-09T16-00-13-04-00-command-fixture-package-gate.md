# Deploy Audit — Command Fixture Package Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T16-00-13-04-00`

## Existing package commands

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

## Missing package command

```txt
npm run fixture:command-result
```

Suggested package script after the fixture file exists:

```json
"fixture:command-result": "node scripts/horror-corridor-command-fixture.mjs"
```

## Gate order

```txt
1. add source-only command contracts
2. add fixture seeds and fixture rows
3. add scripts/horror-corridor-command-fixture.mjs
4. add package script
5. run command fixture
6. run npm run lint
7. run npm run smoke:protokits
8. run npm run harness:horror-corridor
9. only then splice GameCanvas consumer behavior
10. run browser/live validation
```

## Deployment risk

Runtime deployment should remain untouched until command fixture parity proves result-first authority does not change legacy snapshot shape.

## Validation state for this pass

```txt
runtime source edit: not run
npm install: not run
npm run lint: not run
npm run build: not run
node scripts/horror-corridor-command-fixture.mjs: not run / file missing
browser route validation: not run
live host/client validation: not run
```
