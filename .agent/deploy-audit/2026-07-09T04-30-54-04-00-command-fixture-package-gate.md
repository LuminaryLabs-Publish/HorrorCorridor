# HorrorCorridor Command Fixture Package Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-30-54-04-00`

## Current package scripts

`HorrorCorridor-V1/package.json` currently exposes:

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

There is no command-result replay fixture script yet.

The next source implementation should add:

```txt
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
```

Then add a package script such as:

```txt
"fixture:command": "node scripts/horror-corridor-command-fixture.mjs"
```

## Required fixture properties

```txt
DOM-free
canvas-free
PeerJS-free
Three.js-free
seeded GameState input
stable command ids or normalized command id suffixes
stable status/reason/decision fields
non-normalized final snapshot facts
explicit pass/fail row output
non-zero exit on failed parity
```

## Suggested validation order after implementation

```txt
npm run fixture:command
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run validate:live-player:dev
```

## Deployment note

This pass changed docs only.

No deploy workflow, runtime route, package script, or source implementation was changed.
