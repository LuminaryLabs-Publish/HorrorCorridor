# HorrorCorridor Session Lifecycle Fixture Gate

**Timestamp:** `2026-07-10T21-39-22-04-00`

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

These gates exercise compilation, runtime behavior, procedural kits, visuals, and browser play. None prove authoritative exit, session epoch admission, peer convergence, or exactly-once teardown.

## Missing gate

```txt
npm run fixture:session-lifecycle
```

Proposed command:

```json
{
  "fixture:session-lifecycle": "node scripts/horror-corridor-session-lifecycle-fixture.mjs"
}
```

## Required pure modules

```txt
features/session/domain/runSessionTypes.ts
features/session/domain/sessionEpoch.ts
features/session/domain/runExitPolicy.ts
features/session/domain/sessionPhaseReducer.ts
features/session/domain/runtimeTeardownResult.ts
features/session/domain/sessionLifecycleLedger.ts
features/session/domain/sessionMessageAdmission.ts
features/session/domain/sessionFixtureSeeds.ts
features/session/domain/sessionFixtureRows.ts
```

The fixture must import domain modules without React, DOM, WebGL, PeerJS network access, or a running Next server.

## Fixture groups

### Phase authority

```txt
solo active -> lobby accepted
solo ending -> lobby accepted
host active -> lobby accepted
host ending -> lobby accepted
client room-reset rejected
invalid phase rejected
room close accepted only by host
```

### Identity and epoch

```txt
accepted bootstrap creates epoch N
accepted exit terminates epoch N
re-entry creates epoch N+1 exactly once
duplicate bootstrap does not increment twice
wrong-room and wrong-game requests reject
stale/future epoch requests reject
```

### Message admission

```txt
old-epoch PLAYER_UPDATE rejected
old-epoch TRY_INTERACT rejected
old-epoch SYNC rejected
new-epoch START_GAME accepted
new-epoch initial SYNC accepted
late old messages do not mutate new state
```

### Exit idempotency

```txt
first request produces terminal accepted result
duplicate request replays the same result
second local teardown returns no-change
rejected request performs no teardown
```

### Transport policy

```txt
return-to-lobby preserves transport
client leave destroys client transport
return-to-title destroys local transport
host close publishes closed state before destroy
```

### Projection parity

```txt
room phase
UI screen
game screen
runtime readiness
snapshot disposition
connection state
session epoch
```

All values must match the expected transaction result.

### Teardown ledger

```txt
RAF stopped exactly once
runtime transport subscription removed exactly once
ResizeObserver disconnected exactly once
DOM listener set removed exactly once
pointer lock release recorded
world disposed exactly once
composer disposed exactly once
renderer disposed exactly once
canvas removed exactly once
runtime store reset exactly once
```

## Browser smoke after fixture

```txt
solo pause -> lobby -> restart
solo victory -> restart
host/client active -> host return-to-lobby
client leave active room
host return-to-title / room close
repeated lobby/run cycles without duplicate canvas or RAF
stale message replay after re-entry
runtime debug lifecycle export
```

## Validation order

```txt
1. npm run fixture:session-lifecycle
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run build
6. npm run validate:live-player:dev
7. npm run review:object-kit
8. browser lifecycle smoke matrix
```

## Deployment rule

No deploy should be considered lifecycle-safe until the fixture proves phase, epoch, message admission, teardown, and re-entry invariants. Existing visual or build success cannot substitute for this gate.

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