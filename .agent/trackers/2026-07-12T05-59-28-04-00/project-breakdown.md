# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-12T05-59-28-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`

## Summary

This documentation-only pass isolates runtime frame-failure containment. The animation-loop controller schedules the successor RAF only after `onFrame` returns. Any simulation, world, minimap, debug or post-processing exception therefore stops future frames while `running` remains true and the runtime keeps input, networking, listeners, resources and readiness live.

## Plan ledger

**Goal:** make every frame-stage failure produce one typed terminal result, preserve a coherent last-known-good frame, revoke mutation capabilities, dispose or retire the damaged runtime and admit only a clean replacement session.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible repository.
- [x] Read current root `.agent` guidance and retained startup, readiness, render, input and network audits.
- [x] Read `GameCanvas.tsx`, `animationLoop.ts` and package validation commands.
- [x] Identify the complete interaction loop, all domains, all 29 implemented kits and their services.
- [x] Confirm successor RAF scheduling occurs after the frame callback.
- [x] Confirm a thrown frame leaves the loop marked running without another scheduled frame.
- [x] Confirm host publication and client movement transmission can occur before rendering.
- [x] Confirm no frame-level catch, failure state, readiness revocation, quarantine or ordered cleanup exists.
- [x] Define frame identity, stage results, last-known-good retention, quarantine, disposal and cold-restart contracts.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and kit registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable fault-injection fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     2026-07-12T04-28-03-04-00 selected oldest
ZombieOrchard      2026-07-12T04-38-12-04-00
TheUnmappedHouse   2026-07-12T04-44-36-04-00
AetherVale         2026-07-12T04-50-41-04-00
MyCozyIsland       2026-07-12T05-00-19-04-00
TheOpenAbove       2026-07-12T05-11-46-04-00
PrehistoricRush    2026-07-12T05-21-52-04-00
IntoTheMeadow      2026-07-12T05-39-42-04-00
PhantomCommand     2026-07-12T05-49-04-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` was modified in the Publish organization.

## Interaction loop

```txt
RAF callback
  -> verify running
  -> calculate delta
  -> invoke GameCanvas frame

host or solo frame
  -> advance local pose and view
  -> mutate current game state
  -> synchronize held cubes
  -> optionally advance ooze
  -> publish authoritative snapshot to stores and peers
  -> update runtime stores
  -> update camera and world
  -> draw minimap
  -> record optional debug frame
  -> render post-processing output
  -> return to animation-loop controller
  -> schedule successor RAF

client frame
  -> advance predicted pose and view
  -> optionally transmit player update
  -> update runtime stores
  -> update camera and world
  -> draw minimap
  -> record optional debug frame
  -> render post-processing output
  -> return and schedule successor RAF
```

## Source-backed failure path

```txt
host publishes snapshot
  -> world/minimap/post-processing stage throws
  -> successor RAF is never scheduled
  -> loop.running remains true
  -> readiness remains true
  -> listeners and transport subscription remain active
  -> peers may display newer state than the host canvas

client sends movement update
  -> render stage throws
  -> host may accept the movement
  -> client canvas remains stale
  -> local runtime appears live but no future frame executes
```

## Required parent domain

```txt
corridor-runtime-frame-failure-containment-authority-domain
```

## Required proof

```txt
fault in each frame stage returns a typed result
only one failure transaction is admitted
no successor mutation occurs after quarantine
last-known-good snapshot and visible frame remain correlated
readiness, input and network mutation capabilities are revoked
resources are disposed or explicitly retained by policy
loop state reports terminal instead of running
cold restart allocates a new runtime generation
first replacement frame acknowledges the new generation
host, client and solo fault paths are covered
```