# Runtime Readiness Fixture Gate

**Timestamp:** `2026-07-11T09-29-07-04-00`

## Gate

```txt
HorrorCorridor Runtime Readiness Lease
+ Generation-Fenced Commit/Revocation Fixture Gate
```

## Proposed commands

```txt
npm run fixture:runtime-readiness
npm run fixture:runtime-readiness-stale-cleanup
npm run fixture:runtime-readiness-rollback
npm run fixture:runtime-readiness-strict-mode
```

## Required deterministic cases

```txt
shell request does not equal provider-ready
solo initialization commits simulation/rendering/input only
host initialization commits networking from host adapter proof
client initialization commits networking after connection proof
renderer failure never leaves rendering ready
listener failure never leaves input ready
return-to-title resets all capabilities
return-to-lobby retains networking only with a live transport lease
old cleanup after reset is rejected stale
old cleanup after new mount is rejected stale
double cleanup is idempotent
strict-mode mount/unmount/remount leaves one current provider
```

## Required assertions

```txt
one monotonic runtime generation
one monotonic readiness revision
one provider owner per ready capability
one proof row per accepted ready transition
no stale-generation write changes current readiness
no solo networking false-positive
no readiness claim before resource proof
final capability state equals live resource inventory
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

These existing commands do not prove readiness ownership, stale cleanup rejection, rollback or React remount safety.

## Current status

```txt
runtime source changed: no
fixture commands added: no
existing commands run: no
browser lifecycle smoke run: no
branch created: no
pull request created: no
```

No readiness correctness claim is made until the proposed fixtures pass.