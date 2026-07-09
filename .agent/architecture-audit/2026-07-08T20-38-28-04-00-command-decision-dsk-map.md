# HorrorCorridor Command Decision DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T20-38-28-04-00`

## Architecture read

`HorrorCorridor` is currently a Next/React/Three runtime where `GameCanvas.tsx` is the composition point for session mode, network ingress, player movement, interaction derivation, command application, snapshot publication, render consumption, minimap, and runtime debug capture.

The active command rules are still legacy `GameState` reducers:

```txt
interactionRules.ts
  pickUpCube(state, input) -> GameState
  dropCube(state, input) -> GameState
  placeCubeAtEndAnomaly(state, input) -> GameState
  removeCubeFromEndAnomaly(state, input) -> GameState

networkRules.ts
  syncHeldCubesToPlayers(state) -> GameState
  applyNetworkPlayerUpdate(state, input) -> GameState
  applyNetworkInteractionRequest(state, input) -> GameState
```

## Problem boundary

The architecture cannot yet distinguish:

```txt
accepted changed command
accepted unchanged command
rejected command
skipped command
publish-only recovery command
victory command
silent no-op
```

Those cases currently collapse into `GameState` identity checks or unchanged state returns.

## Current domain map

```txt
app-shell-domain
  owns Next client surface and screen transitions

session-domain
  owns solo/host/join mode, peer identity, room identity, readiness

network-protocol-domain
  owns PeerJS message ingress/egress, full-sync, player-update, try-interact

snapshot-domain
  owns replicated game snapshot build/consume path

maze-bootstrap-domain
  owns maze result, cell lookup, cube spawn, end anomaly, sequence slots

player-domain
  owns pointer-lock, keyboard input, mouse look, movement, collision, camera pose

interaction-domain
  owns cube pickup/drop/place/remove and anomaly slot mutation

sequence-domain
  owns ordered color validation and victory transition

ooze-domain
  owns host/local cadence, ooze trail spawn, decay, and route pressure

render-domain
  owns renderer, scene, camera, post-processing, world update, minimap

debug-domain
  owns runtime debug frames/events and overlay export

command-decision-domain (next)
  owns command envelope, status, reason, result, publish decision, journal, consumer action, fixture replay
```

## DSK split

```txt
horror-corridor-command-domain
├─ command-envelope-contract-kit
│  ├─ command id
│  ├─ source
│  ├─ player id
│  ├─ action
│  └─ payload
├─ command-reason-catalog-kit
│  ├─ accepted reasons
│  ├─ rejected reasons
│  ├─ skipped reasons
│  ├─ unchanged reasons
│  ├─ publish-only reasons
│  └─ victory reasons
├─ command-result-envelope-kit
│  ├─ before summary
│  ├─ after summary
│  ├─ changed flag
│  ├─ status
│  ├─ reason
│  ├─ events
│  └─ diagnostics
├─ publish-decision-snapshot-kit
│  ├─ publish
│  ├─ skip
│  ├─ recovery
│  ├─ no-op
│  ├─ victory
│  ├─ snapshot reason
│  └─ broadcast flag
├─ command-journal-kit
│  ├─ append result
│  ├─ latest result
│  ├─ latest decision
│  ├─ status counts
│  └─ rejection counts
├─ interaction-result-rules-kit
│  ├─ pickup result
│  ├─ drop result
│  ├─ place result
│  ├─ remove result
│  └─ legacy GameState adapter
├─ network-result-rules-kit
│  ├─ player update result
│  ├─ held cube sync result
│  ├─ interaction request result
│  ├─ request-sync result
│  ├─ skipped lobby-policy result
│  └─ legacy GameState adapter
├─ local-authority-result-consumer-kit
│  ├─ consume local command
│  ├─ journal result
│  ├─ skip rejected/no-op
│  ├─ publish accepted changed
│  └─ commit victory
├─ host-authority-result-consumer-kit
│  ├─ consume peer PLAYER_UPDATE
│  ├─ consume peer TRY_INTERACT
│  ├─ publish request-sync recovery
│  ├─ skip rejected TRY_INTERACT
│  └─ commit victory
└─ command-replay-fixture-kit
   ├─ seed state rows
   ├─ fixture commands
   ├─ expected decisions
   ├─ final snapshot summary
   └─ parity report
```

## Required source module order

```txt
1. commandTypes.ts
2. commandReasons.ts
3. commandResults.ts
4. publishDecisions.ts
5. commandJournal.ts
6. commandFixtureSeeds.ts
7. commandFixtureRows.ts
8. interactionPreflight.ts
9. interactionResultRules.ts
10. networkResultRules.ts
11. localAuthorityCommandConsumer.ts
12. hostAuthorityCommandConsumer.ts
13. scripts/horror-corridor-command-fixture.mjs
14. package.json fixture script
15. runtimeDebugStore command projection
16. GameCanvas consumer swap
```

## Non-goals

```txt
do not extract PeerJS first
do not extract renderer first
do not extract minimap first
do not rewrite GameCanvas wholesale
do not add maze content first
do not expand visual object kits first
```
