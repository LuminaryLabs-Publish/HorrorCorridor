# Project Breakdown - 2026-07-09T03-59-03-04-00

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Selected slice:** `HorrorCorridor Oldest Ledger Command Fixture Catch-Up + Result Projection Acceptance Map`

## Selection result

The accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry repo was fully new, absent from the ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

`HorrorCorridor` was selected because it had the oldest current central alignment among checked eligible Publish repos.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      selected / oldest current central alignment 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central latest 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central latest 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / central latest 2026-07-09T02-11-07-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest 2026-07-09T03-10-05-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central latest 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest 2026-07-09T03-38-54-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
```

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading/readiness gates
  -> mount GameCanvas runtime
  -> build renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, and debug state
  -> enter pointer-lock first-person navigation
  -> derive action from carried cube plus distance to anomaly
  -> local solo/host calls applyNetworkInteractionRequest
  -> local publish/no-op is still decided by object identity
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT with GameState-returning network rules
  -> request-sync/toggle-ready/cancel/default paths collapse to unchanged GameState
  -> sync held cubes to players
  -> advance ooze on authoritative cadence
  -> publish authoritative snapshot by implicit reason strings
  -> update Three world, minimap, HUD, completion routing, and runtime debug frames
```

## Target interaction loop

```txt
seeded fixture state
  -> CommandEnvelope
  -> CommandReason catalog
  -> interaction/network preflight
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> publishAuthoritativeState only from explicit decision
  -> final replicated snapshot summary
  -> GameCanvas result-projection splice
  -> DOM-free command replay fixture
```

## Domains in use

```txt
application-shell
next-client-runtime
react-game-surface
ui-screen-routing
settings-overlay
completion-routing
pause-state
readiness-state
session-lifecycle
room-identity
join-code-routing
peer-identity
peer-networking
host-transport
client-transport
network-message-protocol
host-message-ingress
client-message-egress
replicated-snapshot-protocol
full-sync-output
request-sync-recovery
seeded-maze-bootstrap
maze-cell-lookup
maze-pathing
cube-spawn-bootstrap
anomaly-sequence-bootstrap
sequence-slot-authority
ordered-sequence-validation
victory-completion
first-person-input
pointer-lock-control
keyboard-input
mouse-look-input
player-view-angles
player-movement-integration
maze-collision-resolution
camera-bob
local-pose-prediction
local-carry-state-sync
host-authority
local-authoritative-simulation
remote-authoritative-ingress
legacy-game-state-interaction-rules
legacy-game-state-network-rules
command-envelope-contract
command-source-normalization
command-reason-catalog
command-result-contract
command-decision-contract
publish-decision-snapshot
command-result-journal
interaction-preflight-diagnostics
player-pose-command-result
interaction-command-result
ooze-command-result
request-sync-command-result
ready-cancel-command-result
victory-command-result
command-seed-state-fixture
local-authority-command-consumer
host-authority-command-consumer
runtime-debug-command-projection
command-result-fixture-matrix
command-replay-fixture
render-world-snapshot-consumption
three-renderer
post-processing
maze-world-rendering
minimap-rendering
scene-dressing-descriptors
mesh-object-kit-catalog
procedural-texture-kit-family
static-smoke-validation
live-player-validation
replay-parity-validation
central-ledger-synchronization
```

## Services the kits offer

```txt
app/session service: mode, room, readiness, pause, completion
peer sync service: host/client transport, full sync, player update, try interact
maze bootstrap service: seed, maze generation, cell lookup, path build, cube spawn, sequence slots
first-person player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
legacy GameState interaction service: pickup, drop, place, remove, ordered completion
legacy GameState network service: player update, held-cube sync, interaction dispatch, request-sync no-op
command fixture seed service: planned canonical GameState seeds and expected row facts
command result envelope service: planned command id, source, status, reason, changed flag, events, diagnostics, legacy adapters
publish decision service: planned publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag
local authority result consumer service: planned local result journal and publish/skip behavior
host authority result consumer service: planned host result journal, request-sync recovery, rejected TRY_INTERACT skip, and accepted/victory publish behavior
diagnostics and replay service: runtime events, runtime frames, cadence, planned command readback, fixture parity
render service: renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
central ledger sync service: repo-local tracker, root .agent pointer, central repo-ledger, internal change log
```

## Kits identified

```txt
implemented-source:
  corridor-session-domain-kit
  peer-room-sync-domain-kit
  maze-snapshot-bootstrap-kit
  first-person-corridor-player-kit
  corridor-interaction-domain-kit
  ordered-anomaly-sequence-kit
  ooze-trail-domain-kit
  corridor-render-world-kit
  corridor-minimap-kit
  runtime-debug-frame-kit
  mesh-object-kit-catalog
  procedural-texture-kit-family

planned-next:
  command-envelope-contract-kit
  command-reason-catalog-kit
  command-result-envelope-kit
  command-decision-contract-kit
  publish-decision-snapshot-kit
  command-result-journal-kit
  command-seed-state-fixture-kit
  interaction-preflight-kit
  interaction-result-rules-kit
  network-result-rules-kit
  local-authority-result-consumer-kit
  host-authority-result-consumer-kit
  runtime-debug-command-projection-kit
  command-result-fixture-matrix-kit
  command-replay-fixture-kit
  central-ledger-sync-kit
```

## Main finding

The playable maze and visual surface are already strong enough for the next pass.

The current blocker is command authority proof. `interactionRules.ts` and `networkRules.ts` return `GameState` only, invalid branches silently return unchanged state, and `GameCanvas.tsx` uses object identity plus action strings to choose publish, skip, recovery, and victory paths.

The next implementation should create first-class command results and publish decisions before touching renderer extraction, PeerJS extraction, minimap extraction, post-processing, or new visual content.

## Next safe ledge

```txt
HorrorCorridor Oldest Ledger Command Fixture Catch-Up + Result Projection Acceptance Map
```

## Source targets for the next implementation

```txt
HorrorCorridor-V1/src/features/game-state/domain/commandTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/commandReasons.ts
HorrorCorridor-V1/src/features/game-state/domain/commandResults.ts
HorrorCorridor-V1/src/features/game-state/domain/publishDecisions.ts
HorrorCorridor-V1/src/features/game-state/domain/commandJournal.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/commandFixtureRows.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionPreflight.ts
HorrorCorridor-V1/src/features/game-state/domain/interactionResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/networkResultRules.ts
HorrorCorridor-V1/src/features/game-state/domain/localAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/game-state/domain/hostAuthorityCommandConsumer.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugCommandProjection.ts
HorrorCorridor-V1/scripts/horror-corridor-command-fixture.mjs
HorrorCorridor-V1/package.json
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
```

## Fixture acceptance rows

```txt
accepted pickup near loose cube
rejected pickup while already carrying
rejected pickup with no nearby cube
accepted drop while carrying
rejected drop without carried cube
accepted place near anomaly with carried cube
accepted place final anomaly slot as victory
rejected place too far from anomaly
rejected place with no free slot
accepted remove last anomaly cube
rejected remove wrong slot
publish-only request-sync recovery
skipped toggle-ready
skipped cancel
skipped unknown action
accepted player update
unchanged player update for missing player
accepted held cube sync
unchanged held-cube already synced
ooze tick spawn
ooze tick decay
ooze tick no-state-diff
victory ordered-sequence completion
local consumer skips rejected/no-op broadcast
local consumer publishes accepted changed/victory
host consumer skips rejected TRY_INTERACT broadcast
host consumer publishes request-sync recovery
runtime debug command decision projection is serializable
GameCanvas consumer splice preserves legacy snapshot shape
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: not run
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
node scripts/horror-corridor-command-fixture.mjs: not run because the script does not exist yet
browser route check: not run
live host/client multiplayer check: not run
pushed to main: yes
```
