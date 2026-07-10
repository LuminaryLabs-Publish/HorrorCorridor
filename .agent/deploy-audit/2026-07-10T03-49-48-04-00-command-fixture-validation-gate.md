# HorrorCorridor Deploy Audit: Command Fixture Validation Gate

**Timestamp:** `2026-07-10T03-49-48-04-00`

## Deploy stance

This pass is documentation-only. No runtime deploy, package script, build, or browser route check was performed.

## Existing validation commands

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

## Missing first gate

```txt
node scripts/horror-corridor-command-fixture.mjs
```

The script does not exist yet and should be added before GameCanvas publish logic changes.

## Fixture acceptance gate

```txt
[ ] accepted/rejected/skipped/no-op/publish-only/victory statuses emitted
[ ] stable command reasons emitted
[ ] before/after summaries normalized
[ ] legacy GameState output preserved
[ ] publish decisions derived without browser DOM
[ ] runtime debug command projection snapshot emitted
[ ] final fixture output is deterministic
```

## After fixture passes

```txt
[ ] npm run lint
[ ] npm run smoke:protokits
[ ] npm run harness:horror-corridor
[ ] npm run validate:live-player:dev
[ ] browser route smoke
[ ] live host/client multiplayer smoke if GameCanvas consumer path changes
```

## Do not deploy or rewrite first

Do not begin with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, route changes, or object-kit visual expansion.
