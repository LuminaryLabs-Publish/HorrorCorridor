# HorrorCorridor Runtime Frame-Failure Fixture Gate

**Timestamp:** `2026-07-12T05-59-28-04-00`

## Summary

Existing build, lint, harness, visual and live-player commands do not inject faults into the recurring frame or prove containment, last-known-good retention, readiness revocation, cleanup or cold restart.

## Plan ledger

**Goal:** add deterministic stage-fault and real-browser proof before any deployment can claim the runtime survives or cleanly terminates after a frame exception.

- [x] Inventory existing package commands.
- [x] Identify missing stage-fault coverage.
- [x] Define DOM-free controller fixtures.
- [x] Define host, client and solo integration fixtures.
- [x] Define browser and deployment smoke requirements.
- [ ] Implement and run the fixture matrix.

## Existing commands

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

## Required new commands

```txt
npm run fixture:frame-controller-failure
npm run fixture:frame-stage-failure
npm run fixture:frame-quarantine
npm run fixture:frame-disposal
npm run fixture:frame-cold-restart
npm run smoke:frame-failure-browser
```

## Controller fixture

Must prove:

```txt
onFrame throw does not leave lifecycle = running
successor RAF is not admitted
failure result is cached and idempotent
stop after failure is safe
restart on the same damaged generation is rejected
```

## Stage matrix

Inject one deterministic failure at each stage:

```txt
local simulation
host publication
client send
runtime-store sync
camera sync
world update
minimap draw
debug capture
post-processing render
successor scheduling
disposal
```

Each row must assert:

```txt
exact failure stage
escaped mutation/publication receipts
one quarantine revision
readiness revoked
no later stage executes
no later frame executes
last-known-good frame retained
cleanup result recorded
```

## Session matrix

```txt
solo
host with one connected client
client connected to host
paused replay frame
completed replay frame
runtime with debug enabled
runtime with minimap lease present
runtime without minimap surface
```

## Browser smoke

```txt
1. Start an admitted run.
2. Wait for a committed visible frame.
3. Arm a one-shot post-processing fault.
4. Advance one frame.
5. Assert the prior canvas remains the last-known-good frame.
6. Assert the fatal overlay appears.
7. Assert movement and interaction stop.
8. Assert network mutation is fenced.
9. Assert readiness is revoked.
10. Request cold restart.
11. Assert a new runtime generation and first-frame acknowledgement.
12. Assert no predecessor listener, RAF or transport callback mutates state.
```

## Deployment rejection conditions

```txt
uncaught frame failure leaves lifecycle running
a later RAF executes after quarantine
host or client mutation continues after failure
readiness remains true
main canvas, minimap and debug claim incompatible committed frames
cleanup leaks listeners, observers, transport subscriptions or GPU resources
cold restart reuses predecessor generation
first replacement frame is not acknowledged
```

## Validation status

```txt
runtime implementation: absent
frame-controller fixture: absent
stage-fault fixture: absent
quarantine fixture: absent
disposal fixture: absent
cold-restart fixture: absent
browser smoke: not run
Pages smoke: not run
```

No runtime failure-containment or restart-safety claim is made until this gate exists and passes.