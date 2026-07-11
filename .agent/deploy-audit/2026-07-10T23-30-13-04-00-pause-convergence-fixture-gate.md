# HorrorCorridor Pause Convergence Fixture Gate

**Timestamp:** `2026-07-10T23-30-13-04-00`

## Current package gates

```txt
npm run build
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

These commands do not prove pause authority, simulation admission, input suspension, or host/client projection convergence.

## Missing gate

```txt
npm run fixture:pause-convergence
```

Proposed command:

```json
{
  "fixture:pause-convergence": "node scripts/horror-corridor-pause-convergence-fixture.mjs"
}
```

## Required pure modules

```txt
features/pause/domain/pauseTypes.ts
features/pause/domain/pausePolicy.ts
features/pause/domain/pauseReducer.ts
features/pause/domain/simulationAdmission.ts
features/pause/domain/inputSuspension.ts
features/pause/domain/pauseLedger.ts
features/pause/domain/pauseFixtureSeeds.ts
features/pause/domain/pauseFixtureRows.ts
```

The fixture must run without React, DOM, PeerJS, Three.js, WebGL, or a Next server.

## Fixture groups

### Solo policy

```txt
playing -> paused accepted
paused -> playing accepted
paused -> paused no-change
pause stops movement, interaction, and ooze
resume requires fresh input edges
```

### Host-global policy

```txt
host pause accepted
client global-pause mutation rejected
host paused state publishes once
remote PLAYER_UPDATE rejected while globally paused
remote TRY_INTERACT rejected while globally paused
host resume accepted and published
```

### Client-local overlay policy

```txt
client local pause accepted
client prediction/input publication stops
active host snapshot updates world but does not clear local overlay
client local resume accepted
local pause never claims host-global authority
```

### Pointer lock and browser intent

```txt
unexpected lock loss emits one pause command
blur plus lock loss deduplicates
expected release after accepted pause emits no new command
repeated release while paused returns no-change
capture failure records stable browser-effect result
```

### Input suspension

```txt
movement flags clear
interact flag clears
look deltas clear
new gameplay input rejects while paused
menu/debug controls remain available
resume starts with neutral input
```

### Identity and idempotency

```txt
wrong room rejected
wrong game rejected
stale session epoch rejected
stale pause revision rejected
duplicate command replays terminal result
```

### Projection parity

```txt
UI pause flag
UI screen and game screen
overlay
replicated game state for global pause
simulation readiness
input readiness
pointer-lock expectation
pause revision
authority source
```

### Render observation

```txt
first paused frame references accepted pause result
paused frames identify policy and revision
first resumed frame references accepted resume result
no silent PLAYING projection from unrelated SYNC
```

## Browser smoke after fixture

```txt
solo Escape pause/resume
solo pointer-lock loss pause
host-global pause with one client
client-local overlay pause while host continues
interaction key while paused
held movement key across pause/resume
repeated pause/resume cycles
runtime debug export inspection
```

## Validation order

```txt
1. npm run fixture:session-lifecycle
2. npm run fixture:pause-convergence
3. npm run lint
4. npm run smoke:protokits
5. npm run harness:horror-corridor
6. npm run build
7. npm run validate:live-player:dev
8. browser pause matrix
```

## Deployment rule

Do not treat build, visual, or single-player smoke success as pause-safe. Multiplayer pause behavior is acceptable only after deterministic command/result, simulation-admission, input-suspension, and projection-parity rows pass.

## Current status

```txt
fixture file: absent
package script: absent
runtime source changed by audit: no
existing commands run: no
branch created: no
pull request created: no
push target: main
```