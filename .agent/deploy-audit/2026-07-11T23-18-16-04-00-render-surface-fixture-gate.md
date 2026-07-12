# HorrorCorridor Render Surface Fixture Gate

**Timestamp:** `2026-07-11T23-18-16-04-00`

## Plan ledger

**Goal:** define executable proof required before claiming responsive, DPR-correct and frame-correlated rendering.

- [x] Existing package commands retained.
- [x] Missing browser and readback fixtures identified.
- [x] Acceptance matrix defined.
- [ ] Fixtures are not implemented or run.

## Required fixture matrix

```txt
CSS sizes:
  0x0
  1x1
  640x360
  1280x720
  1920x1080
  tall mobile
  wide desktop

DPR values:
  0.75
  1
  1.25
  1.5
  2
  3

modes:
  solo
  host
  client

transitions:
  startup
  resize observer
  window resize
  rapid resize storm
  hidden/zero area
  restored surface
  device-scale change
  runtime stop/restart
```

## Required assertions

```txt
one observation produces at most one accepted commit revision
accepted physical pixels stay within product budget
actual WebGL drawing buffer matches commit result
composer and bloom targets match commit result
camera aspect matches accepted CSS size
minimap scale follows named policy
zero-area behavior matches declared lifecycle policy
stale callbacks cannot overwrite a newer revision
rendering readiness is false without a valid surface
first frame after resize cites the committed revision
debug export contains surface identity and actual sizes
main/minimap parity result is explicit
```

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

These commands do not currently prove physical surface size, DPR policy, zero-area behavior, resize ordering or frame correlation.

## Completion boundary

Do not claim responsive surface authority until the browser matrix passes and every accepted visible frame can be traced to one committed surface revision.
