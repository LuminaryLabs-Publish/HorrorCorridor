# HorrorCorridor Command Fixture Script Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-40-50-04-00`

## Existing package scripts

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

## Missing gate

`node scripts/horror-corridor-command-fixture.mjs` does not exist yet.

`package.json` does not yet expose a command fixture script.

## Deploy/build rule

The next implementation should add a DOM-free command fixture before wiring `GameCanvas.tsx` to result-first consumers.

After the fixture exists, add a package script such as:

```txt
"fixture:commands": "node scripts/horror-corridor-command-fixture.mjs"
```

## Validation order

```txt
1. node scripts/horror-corridor-command-fixture.mjs
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
```

## Non-goals

```txt
- no branch creation
- no PR-only workflow
- no deploy workflow change during fixture source cut
- no visual route replacement
- no multiplayer protocol breaking change before fixture proof
```
