# Session Epoch and Message Admission Fixture Gate

**Timestamp:** `2026-07-11T01-10-28-04-00`

## Current command surface

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
npm run review:object-kit
```

These commands validate compilation, static quality, existing kit/harness behavior, visuals, and live-player checks. They do not prove terminal run exit, message epoch admission, stale callback rejection, exactly-once teardown, or clean re-entry.

## Required additions

```txt
scripts/horror-corridor-session-lifecycle-fixture.mjs
scripts/horror-corridor-session-message-admission-fixture.mjs
npm run fixture:session-lifecycle
npm run fixture:session-message-admission
```

## Lifecycle fixture requirements

```txt
solo return and restart
host return with connected client
client leave without host close
host room close
title exit
duplicate exit request
transport preserve/destroy policy
exactly-once cleanup
snapshot archive/reset
session epoch increment
first lobby and re-entry projection correlation
```

## Message-admission fixture requirements

```txt
matching current identity accepted
wrong room rejected
wrong game rejected
wrong runSessionId rejected
old epoch rejected
future epoch rejected until bootstrap admitted
closed callback generation rejected
post-exit START_GAME rejected
post-exit SYNC rejected
post-exit LOBBY_EVENT rejected
post-exit PLAYER_UPDATE rejected
post-exit TRY_INTERACT rejected
duplicate request replayed without mutation
all rows JSON-safe
```

## Recommended gate order

```txt
fixture:session-lifecycle
  -> fixture:session-message-admission
  -> fixture:pause-convergence
  -> lint
  -> smoke:protokits
  -> harness:horror-corridor
  -> build
  -> validate:live-player:dev
  -> review:object-kit
  -> browser solo/host/client lifecycle smoke
```

## Deployment rule

Do not treat a successful build or Pages deployment as proof of session correctness. The deterministic lifecycle and message-admission fixtures must pass before browser smoke and deployment validation can close this ledge.

## Current state

```txt
runtime source changed: no
fixture scripts present: no
package commands present: no
fixtures run: no
browser smoke run: no
deployment changed: no
```
