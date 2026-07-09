# Architecture Audit: Command Consumer Readback DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T18-30-30-04-00`

## Current architecture

```txt
HorrorCorridor-V1
  -> Next/React app shell
  -> session/runtime stores
  -> GameCanvas runtime host
  -> game-state domain rules
  -> networking protocol/messages
  -> peer host/client adapters
  -> Three.js render world and minimap
  -> runtime debug store/window export
```

## Authority boundary today

```txt
GameCanvas.tsx
  -> derives local action string
  -> applyNetworkInteractionRequest(state, input)
  -> receives GameState only
  -> object identity decides publish/no-op
  -> gameState === victory decides completion

Host network handler
  -> PLAYER_UPDATE uses applyNetworkPlayerUpdate()
  -> TRY_INTERACT uses applyNetworkInteractionRequest()
  -> request-sync/toggle-ready/cancel/default collapse into unchanged state
  -> publishes through implicit reason strings
```

## DSK/domain breakdown

```txt
session domain: solo/host/client, room identity, local player identity, readiness, completion routing
network domain: protocol messages, host/client transport, full sync, player update, try interact, request-sync
maze domain: seeded maze, cell lookup, cube spawn, anomaly sequence slots
player domain: pointer lock, keyboard input, mouse look, movement, collision, camera pose, local carry state
interaction domain: pickup, drop, place, remove, ordered anomaly completion
network rule domain: player update, held-cube sync, network interaction dispatch, no-op fallback
ooze domain: spawn, decay, spacing, max trail, no-state-diff candidate
render domain: Three renderer, scene, camera, post-process, maze world, minimap, scene dressing
debug domain: runtime frame/events, cadence, snapshot facts, window export
next command domain: command envelope, reason catalog, result envelope, publish decision, journal, consumer, fixture
```

## Required next architecture seam

```txt
CommandEnvelope
  -> PreflightResult
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityCommandConsumer
  -> HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> GameCanvas splice after fixture proof
```

## Non-goals

```txt
renderer extraction
PeerJS extraction
minimap extraction
post-processing extraction
scene dressing
new maze content
visual object-kit expansion
whole GameCanvas rewrite
```
