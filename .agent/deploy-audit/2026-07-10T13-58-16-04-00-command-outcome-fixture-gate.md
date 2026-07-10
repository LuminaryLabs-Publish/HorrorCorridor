# HorrorCorridor Deploy Audit: Command Outcome Fixture Gate

**Timestamp:** `2026-07-10T13-58-16-04-00`

## Deployment posture

This pass changes documentation only. Runtime TypeScript, package scripts, dependencies, Next.js routes, deployment settings, branches, and pull requests remain unchanged.

## Existing commands

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

## Required new gate

```txt
npm run fixture:commands
```

The command must run without a browser or live peer connection and prove deterministic source-domain rows.

## Fixture gate checklist

```txt
[ ] canonical seed states are source-owned
[ ] command envelopes are serializable
[ ] statuses and reasons are stable strings
[ ] before/after summaries are deterministic
[ ] accepted interaction rows pass
[ ] rejected interaction rows pass
[ ] skipped network rows pass
[ ] request-sync recovery/publish-only row passes
[ ] ooze changed and unchanged rows pass
[ ] victory completion and rollback rows pass
[ ] local consumer publish/skip rows pass
[ ] host consumer publish/skip/recovery rows pass
[ ] command journal ordering and counters pass
[ ] runtime-debug projection rows pass
[ ] legacy final GameState parity passes
[ ] only volatile fields are normalized
```

## Post-fixture validation order

```txt
npm run fixture:commands
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
npm run review:object-kit
browser solo smoke
browser host/client smoke
```

## Safe deployment sequence

```txt
source contracts
  -> legacy-compatible result wrappers
  -> fixture seed and rows
  -> DOM-free fixture passes
  -> publication consumers
  -> runtime debug projection
  -> GameCanvas additive splice
  -> existing validation suite
  -> deploy
```

## Blocked deployment changes

Do not use a deployment or visual change to conceal missing command attribution. Renderer, minimap, PeerJS, route, content, and visual expansion remain outside this gate.