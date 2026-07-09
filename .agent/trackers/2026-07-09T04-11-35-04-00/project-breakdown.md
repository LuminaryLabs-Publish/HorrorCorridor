# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-11-35-04-00`

## Selection result

The full accessible `LuminaryLabs-Publish` repo list was checked against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state.

No checked non-Cavalry repo was new, absent from the central ledger, missing sampled root `.agent/START_HERE.md`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

`HorrorCorridor` was selected as the oldest eligible central-reviewed repo in the fallback set. Its latest central review was still `2026-07-09T01-09-24-04-00`, while later central reviews existed for PhantomCommand, ZombieOrchard, TheUnmappedHouse, MyCozyIsland, AetherVale, PrehistoricRush, TheOpenAbove, and IntoTheMeadow.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/HorrorCorridor      selected / oldest eligible central review 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central 2026-07-09T02-11-07-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by standing rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-09T03-10-05-04-00
```

## Current product read

`HorrorCorridor` is a cooperative first-person horror maze under `HorrorCorridor-V1`.

The runtime is a Next/React client application that mounts a Three.js first-person maze, supports solo/host/join modes, publishes replicated snapshots, and captures runtime debug frames.

## Current interaction loop

```txt
open app
  -> start menu
  -> choose solo, host, or join
  -> create or join room identity
  -> complete loading and readiness gates
  -> mount GameCanvas runtime
  -> build renderer, camera, post-processing, maze world, minimap, pose refs, input refs, cadence state, and debug state
  -> enter pointer-lock first-person navigation
  -> keyboard and mouse update local input and view angle refs
  -> frame loop advances pose, collision, camera, minimap, renderer, debug frames, and cadence
  -> interact key derives pickup/drop/place/remove from carried cube state and distance to anomaly
  -> local solo/host applies GameState-returning interaction rules directly
  -> client sends TRY_INTERACT to host
  -> host applies PLAYER_UPDATE or TRY_INTERACT through GameState-returning network rules
  -> request-sync, toggle-ready, cancel, missing-player, invalid interaction, and unknown actions collapse to unchanged state or implicit recovery
  -> held cubes sync to player pose
  -> ordered sequence validation can set victory
  -> ooze advances on authority cadence
  -> publishAuthoritativeState builds replicated snapshots from implicit reason strings
  -> renderer, minimap, HUD, completion routing, PeerJS, and runtime debug consume latest snapshot
```

## Authority seam found

The active blocker is not renderer or visual fidelity.

The blocker is that the source authority still returns `GameState` only and leaves important command outcomes implicit.

```txt
GameCanvas local path:
  derived action string
  -> applyNetworkInteractionRequest(currentGameState, action)
  -> if nextState === currentGameState return silently
  -> else sync held cubes and publish resync

GameCanvas host path:
  PLAYER_UPDATE or TRY_INTERACT message
  -> applyNetworkPlayerUpdate or applyNetworkInteractionRequest
  -> sync held cubes
  -> publish resync or recovery
  -> maybe commit victory

networkRules:
  request-sync/toggle-ready/cancel/default -> unchanged GameState

interactionRules:
  invalid pickup/drop/place/remove branches -> unchanged GameState
```

## Target interaction-authority loop

```txt
CommandEnvelope
  -> CommandSource
  -> InteractionPreflightResult or NetworkCommandPreflightResult
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityCommandConsumer or HostAuthorityCommandConsumer
  -> optional snapshot publish
  -> optional recovery sync
  -> optional victory commit
  -> RuntimeDebugCommandProjection
  -> GameCanvas additive consumer splice
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

## Services offered by kits

```txt
app/session service: mode, room, readiness, pause, completion
peer sync service: host/client transport, full sync, player update, try interact, request-sync recovery
maze bootstrap service: seed, maze generation, cell lookup, path build, cube spawn, sequence slots
first-person player service: keyboard input, pointer lock, look delta, movement, collision, camera sync, local carry sync
legacy interaction service: pickup, drop, place, remove, ordered completion
legacy network service: player update, held-cube sync, interaction dispatch, request-sync no-op
interaction preflight service: playing-state, player, carry, nearby cube, anomaly distance, slot, stable reason
command result service: command id, source, status, reason, changed flag, events, diagnostics, legacy adapters
publish decision service: publish, skip, recovery, no-op, victory, snapshot reason, broadcast flag, completion flag
local authority consumer service: local result journal, rejected/no-op skip, accepted/victory publish
host authority consumer service: host result journal, request-sync recovery, rejected TRY_INTERACT skip, accepted/victory publish
runtime debug service: runtime events, runtime frames, cadence, command result projection, journal counts
render service: renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary, disposal
fixture service: canonical seed states, command rows, volatile normalization, snapshot parity
central ledger sync service: repo-local tracker, root .agent pointers, central ledger, internal change log
```

## Kits identified

```txt
corridor-session-domain-kit                         implemented-source
peer-room-sync-domain-kit                           implemented-source
maze-snapshot-bootstrap-kit                         implemented-source
first-person-corridor-player-kit                    implemented-source
corridor-interaction-domain-kit                     implemented-source
ordered-anomaly-sequence-kit                        implemented-source
ooze-trail-domain-kit                               implemented-source
corridor-render-world-kit                           implemented-source
corridor-minimap-kit                                implemented-source
runtime-debug-frame-kit                             implemented-source
mesh-object-kit-catalog                             implemented-source / visual catalog
procedural-texture-kit-family                       implemented-source / visual catalog
command-envelope-contract-kit                       planned-next
command-reason-catalog-kit                          planned-next
command-result-envelope-kit                         planned-next
command-decision-contract-kit                       planned-next
publish-decision-snapshot-kit                       planned-next
command-result-journal-kit                          planned-next
command-seed-state-fixture-kit                      planned-next
interaction-preflight-kit                           planned-next
interaction-result-rules-kit                        planned-next
network-result-rules-kit                            planned-next
local-authority-result-consumer-kit                 planned-next
host-authority-result-consumer-kit                  planned-next
runtime-debug-command-projection-kit                planned-next
command-result-fixture-matrix-kit                   planned-next
command-replay-fixture-kit                          planned-next
central-ledger-sync-kit                             documentation-source
```

## Next safe ledge

```txt
HorrorCorridor Command Authority Replay Fixture + GameCanvas Consumer Freeze
```

Build the pure command/result/decision fixture first, then add runtime debug projection, then splice `GameCanvas` to consume the decision output additively.

Do not start with renderer extraction, PeerJS extraction, minimap extraction, post-processing extraction, new maze content, or visual object-kit expansion.

## Validation performed

```txt
[done] Read accessible Publish repo list through GitHub connector.
[done] Read central ledger state for eligible Publish repos.
[done] Read HorrorCorridor root .agent state.
[done] Read GameCanvas runtime and authority seam.
[done] Read interactionRules silent no-op branches.
[done] Read networkRules unchanged-state branches.
[done] Read package validation scripts.
[done] Updated documentation only.
```

## Validation not performed

```txt
[not-run] npm install
[not-run] npm run lint
[not-run] npm run smoke:protokits
[not-run] npm run harness:horror-corridor
[not-run] node scripts/horror-corridor-command-fixture.mjs, because that script does not exist yet
[not-run] npm run validate:live-player:dev
[not-run] browser route check
[not-run] host/client multiplayer check
[not-run] runtime source edit
```
