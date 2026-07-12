# Startup Failure-Injection Fixture Gate

**Timestamp:** `2026-07-11T21-21-12-04-00`

## Purpose

Prevent release claims that rely on successful-path startup only. The gate must prove rollback and retry at every fallible acquisition boundary.

## Required headless/unit fixtures

```txt
reject stale session/run/epoch/snapshot start commands
duplicate start does not allocate a second runtime
failure after renderer creation retires renderer/context
failure after post creation retires post then renderer
failure after world creation retires world, post and renderer
failure after DOM attachment removes canvas and world
failure after observer/listener install removes every callback
failure after RAF start stops the generation
first-frame throw rolls back all mandatory leases
rollback called twice is idempotent
retry rejected while unresolved mandatory leases remain
clean retry uses a new generation and commits one frame
readiness remains false until first-frame commit
```

## Required browser smoke

Run solo, host and client startup with injected failure points. After each failure verify:

```txt
no extra canvas
no active prior RAF
no duplicate resize or input callbacks
no retained world/post/renderer lease
readiness false
failure UI/result visible
retry succeeds once
one current canvas and one current RAF
first frame cites current snapshot and generation
```

## Package gate

Existing commands:

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
```

Add a deterministic startup fixture command and wire it into the repository validation path before claiming rollback-safe browser startup.

## Current result

```txt
fixture implemented: no
fixture executed: no
browser smoke executed: no
runtime source changed: no
release readiness claim: blocked
```
