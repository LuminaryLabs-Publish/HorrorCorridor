# Runtime Startup Rollback DSK Map

**Timestamp:** `2026-07-11T21-21-12-04-00`

## Current composition

```txt
GameShell
  -> loading projection
  -> bootstrap snapshot
  -> readiness write
  -> PLAYING route

GameCanvas
  -> initializeRuntime(snapshot)
  -> renderer, scene, camera, post, world
  -> canvas/world attach
  -> ResizeObserver and DOM listeners
  -> animation loop
  -> cleanup after successful setup
```

## Architecture gap

No composed domain owns the complete start transaction. State readiness, resource creation, callback installation and first-frame success are independent mutations. `initialized` is a local Boolean rather than a committed lifecycle result, and partial acquisition is outside the eventual cleanup closure.

## Required parent domain

```txt
corridor-runtime-startup-rollback-authority-domain
```

## DSK breakdown

```txt
runtime-start-command-kit
  sessionId, runId, sessionEpoch, snapshotRevision, mountId, requestedGeneration

runtime-start-admission-kit
  validate identities, mount, snapshot, duplicate and stale requests

runtime-start-transaction-kit
  own preparing, committing, ready, rolling-back and failed phases

runtime-start-generation-kit
  monotonic generation and stale callback fencing

startup-acquisition-ledger-kit
  ordered resource/callback leases and dependency graph

renderer-acquisition-kit
  WebGLRenderer, canvas and context lease

post-processing-acquisition-kit
  composer, passes and render-target lease

world-acquisition-kit
  scene resources, attach result and disposal lease

callback-listener-lease-kit
  ResizeObserver, window/document listeners and RAF lease

first-frame-commit-kit
  frame ID, generation, snapshot revision and render result

startup-readiness-commit-kit
  atomically publish provider readiness after frame commit

startup-failure-result-kit
  failed phase, error classification, acquired leases and rollback plan

reverse-order-retirement-kit
  idempotent dependency-aware disposal receipts

retry-baseline-kit
  zero-live-lease gate and next generation

startup-observation-kit / startup-journal-kit
  clone-safe status and bounded acquisition/retirement history
```

## Dependency rule

```txt
start admission
  -> generation
  -> acquisition ledger
  -> renderer/scene/camera
  -> post-processing
  -> world
  -> canvas/world attachment
  -> observers/listeners
  -> RAF
  -> first frame
  -> readiness commit
```

Rollback traverses the exact graph in reverse. No later lease may retire before dependents are stopped, and failure must preserve unresolved-lease evidence rather than silently claiming cleanup.

## Integration point

Replace the local procedural body of `GameCanvas.initializeRuntime()` with a startup-domain adapter. GameShell may request startup and project status, but it must not set rendering/input readiness independently.
