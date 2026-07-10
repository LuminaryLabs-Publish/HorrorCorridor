# HorrorCorridor Publish Parity Fixture Gate

**Timestamp:** `2026-07-10T15-31-03-04-00`

## Required new command

```txt
npm run fixture:authority-parity
```

## Gate ownership

```txt
HorrorCorridor-V1/scripts/horror-corridor-authority-parity-fixture.mjs
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/authorityParityFixtureRows.ts
HorrorCorridor-V1/src/features/game-state/domain/authorityCommandConsumer.ts
HorrorCorridor-V1/package.json
```

## Required proof

```txt
canonical deterministic source states
accepted/rejected/no-op command result rows
identical local/host domain results
explicit local/host publish decisions
request-sync recovery publication
cadence publication without fake command success
command correlation to published snapshot tick
journal order and bounded retention
legacy GameState parity
replicated snapshot parity
JSON-safe runtime-debug projection
```

## Failure conditions

```txt
fixture depends on DOM, WebGL, PeerJS, or browser timing
fixture infers semantic mutation from object identity
fixture treats every publication as an accepted command
fixture cannot explain a host publication for an unchanged command
fixture omits published snapshot tick correlation
fixture changes gameplay constants to make rows pass
```

## Validation order

```txt
npm run fixture:authority-parity
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
npm run review:object-kit
browser solo smoke
browser host/client smoke
runtime-debug export inspection
```

## Current status

The fixture files and package script do not exist. No runtime or deployment validation was run during this documentation-only pass.