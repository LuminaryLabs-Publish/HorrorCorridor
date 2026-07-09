# HorrorCorridor Command Consumer Freeze DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T04-19-00-04-00`

## Selection result

`HorrorCorridor` was selected after comparing the accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger. No new, untracked, undocumented, or root-agent-missing non-Cavalry repo was found. `HorrorCorridor` was the oldest eligible central-ledger fallback.

## Current architecture

```txt
Next app shell
  -> session/ui/runtime stores
  -> GameCanvas runtime
  -> seeded maze snapshot
  -> Three render world
  -> pointer-lock input
  -> GameState interaction/network rules
  -> PeerJS host/client transport
  -> replicated snapshot protocol
  -> runtime debug frames/events
```

## DSK/domain breakdown

```txt
application-shell-domain
  -> next-client-runtime-kit
  -> react-game-surface-kit
  -> ui-screen-routing-kit

session-domain
  -> corridor-session-domain-kit
  -> room-identity-kit
  -> readiness-state-kit
  -> completion-routing-kit

network-domain
  -> peer-room-sync-domain-kit
  -> host-transport-kit
  -> client-transport-kit
  -> replicated-snapshot-protocol-kit
  -> request-sync-recovery-kit

maze-domain
  -> maze-snapshot-bootstrap-kit
  -> maze-cell-lookup-kit
  -> maze-pathing-kit
  -> cube-spawn-bootstrap-kit
  -> anomaly-sequence-bootstrap-kit

player-domain
  -> first-person-corridor-player-kit
  -> pointer-lock-control-kit
  -> keyboard-input-kit
  -> mouse-look-input-kit
  -> movement-integration-kit
  -> maze-collision-resolution-kit

interaction-domain
  -> corridor-interaction-domain-kit
  -> ordered-anomaly-sequence-kit
  -> legacy-game-state-interaction-rules
  -> legacy-game-state-network-rules

planned-command-authority-domain
  -> command-envelope-contract-kit
  -> command-reason-catalog-kit
  -> command-result-envelope-kit
  -> command-decision-contract-kit
  -> publish-decision-snapshot-kit
  -> command-result-journal-kit
  -> interaction-preflight-kit
  -> interaction-result-rules-kit
  -> network-result-rules-kit
  -> local-authority-result-consumer-kit
  -> host-authority-result-consumer-kit
  -> command-result-fixture-matrix-kit
  -> command-replay-fixture-kit

render-domain
  -> corridor-render-world-kit
  -> corridor-minimap-kit
  -> post-processing-kit
  -> runtime-debug-frame-kit
  -> runtime-debug-command-projection-kit
```

## Services offered by current kits

```txt
session services: mode selection, room identity, join code, readiness, pause, completion.
network services: host/client transport, full sync, player updates, interaction requests, request-sync recovery.
maze services: seed, grid, cells, pathing, cube spawns, sequence slots, initial snapshots.
player services: keyboard input, pointer lock, mouse look, movement, collision, camera pose, local carry state.
interaction services: pickup, drop, anomaly placement, anomaly removal, ordered win validation.
render services: renderer, scene, camera, post-processing, maze world, minimap, scene dressing summary.
debug services: runtime events, runtime frames, frame export, planned command projection.
ledger services: root .agent docs, timestamped trackers, central repo-ledger entry, internal change log.
```

## Main architecture problem

The command authority seam exists but is not source-owned yet.

`GameCanvas` still calls `applyNetworkInteractionRequest`, compares object identity, and then decides whether to publish. `networkRules.ts` and `interactionRules.ts` still return `GameState` instead of `CommandResult`.

## Next source cut

```txt
CommandEnvelope
  -> CommandReason
  -> CommandResult
  -> PublishDecision
  -> CommandJournal
  -> LocalAuthorityCommandConsumer
  -> HostAuthorityCommandConsumer
  -> RuntimeDebugCommandProjection
  -> DOM-free fixture proof
  -> GameCanvas splice
```
