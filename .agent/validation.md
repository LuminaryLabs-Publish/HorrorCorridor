# HorrorCorridor Validation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-09T06-59-46-04-00`

## Available validation commands

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
npm run build
```

## Required next validation gate

Add this before changing `GameCanvas.tsx` behavior:

```txt
npm run fixture:command-results
```

Target implementation:

```txt
HorrorCorridor-V1/scripts/horror-corridor-command-result-fixture.mjs
```

## Fixture rows that must pass

```txt
- pickup accepted changed state
- pickup rejected not playing
- pickup rejected missing player
- pickup rejected already carrying
- pickup rejected no nearby loose cube
- drop accepted changed state
- drop rejected no carried cube
- place accepted changed state
- place rejected too far from anomaly
- place rejected no empty slot
- remove accepted changed state
- remove rejected no occupied slot
- request-sync produces recovery publish decision
- toggle-ready produces no-op or lobby-only decision
- cancel produces no-op decision
- player update accepted changed pose
- player update rejected missing player
- victory transition publishes completion decision
```

## This pass validation status

```txt
runtime source changed: no
local checkout: no
npm install: no
npm run lint: no
npm run build: no
npm run smoke:protokits: no
npm run harness:horror-corridor: no
npm run validate:live-player: no
browser smoke: no
live host/client multiplayer validation: no
branch created: no
pull request created: no
pushed to main: yes
```

## Notes

This was a documentation and operating-memory run. The next implementation run should add the fixture first, then wire package validation, then splice command-result consumers.
