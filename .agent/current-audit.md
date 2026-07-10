# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T17-00-54-04-00`

## Status

```txt
status: request-identity-authoritative-ack-fixture-gate-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo commit is recorded
```

## Selection

No eligible repository was new, ledger-missing, root-audit-missing, or otherwise undocumented. `HorrorCorridor` was selected as the oldest eligible documented fallback.

```txt
HorrorCorridor       selected / prior central activity 2026-07-10T15-36-42-04-00
PhantomCommand       tracked  / 2026-07-10T15-48-27-04-00
ZombieOrchard        tracked  / 2026-07-10T15-55-49-04-00
TheUnmappedHouse     tracked  / 2026-07-10T16-07-30-04-00
MyCozyIsland         tracked  / 2026-07-10T16-17-08-04-00
TheOpenAbove         tracked  / 2026-07-10T16-28-54-04-00
PrehistoricRush      tracked  / 2026-07-10T16-37-25-04-00
AetherVale           tracked  / 2026-07-10T16-48-42-04-00
IntoTheMeadow        tracked  / 2026-07-10T16-58-28-04-00
TheCavalryOfRome     excluded by rule
```

## Interaction loop

```txt
menu and session selection
  -> solo, host, or join
  -> room identity, readiness, and deterministic maze bootstrap
  -> GameCanvas initializes rendering, input, transport, cadence, and diagnostics
  -> pointer-lock movement updates local pose
  -> interact derives pickup, drop, place, or remove
  -> local authority applies a rule directly
  -> client sends TRY_INTERACT to host
  -> host applies the rule and publishes a SYNC snapshot
  -> client consumes the snapshot
  -> world, minimap, HUD, completion, and runtime debug update
```

## Domains in use

```txt
application shell and session lifecycle
PeerJS host/client transport
protocol envelopes and message routing
request identity fields
replicated snapshot construction
seeded maze, cube, and anomaly bootstrap
first-person input, movement, collision, camera, and prediction
interaction, network, ooze, and victory rules
local and host authority consumers
authoritative publication cadence
Three.js world, post-processing, minimap, and scene dressing
runtime debug frame and event storage
planned request generation, pending ledger, acknowledgement, deduplication, and fixture domains
```

## Kits and offered services

```txt
corridor-session-domain-kit
  mode selection, room identity, readiness, session entry
peer-room-sync-domain-kit
  host/client transport, START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, lobby events
maze-snapshot-bootstrap-kit
  deterministic maze, cell lookup, cube spawns, anomaly sequence and slots
first-person-corridor-player-kit
  pointer lock, keyboard and mouse input, movement, collision, camera, prediction
corridor-interaction-domain-kit
  pickup, drop, place, remove, carried-cube synchronization
ordered-anomaly-sequence-kit
  ordered slot validation, completion, victory, rollback
ooze-trail-domain-kit
  cadence, decay, spawn, spacing guard, capacity guard
corridor-authoritative-publication-kit
  snapshot tick, full-sync creation, transport broadcast, cadence counters
corridor-render-world-kit
  Three.js world, maze, cubes, players, anomaly, ooze, scene dressing
corridor-minimap-kit
  minimap geometry, player markers, object markers
runtime-debug-frame-kit
  bounded frame capture, bounded event capture, browser export, overlay preferences
```

## Required next-cut kits

```txt
request-identity-kit
  stable request ids for local and network commands
pending-command-ledger-kit
  register, acknowledge, expire, deduplicate, and summarize pending requests
command-ack-protocol-kit
  accepted, rejected, skipped, no-op, recovery, and duplicate acknowledgements independent of snapshot publication
authority-command-consumer-kit
  one local/host command path with explicit result and publish decision
request-deduplication-kit
  prevent duplicate mutation when a request is retried
runtime-debug-request-projection-kit
  request, result, decision, ack, snapshot tick, latency, and pending counters
request-ack-fixture-kit
  deterministic local, host, client, duplicate, timeout, publish, and no-publish rows
legacy-protocol-compatibility-kit
  preserve existing version-1 message and snapshot consumers during additive rollout
```

## Source findings

```txt
ProtocolEnvelope already defines optional requestId for every message.
createInteractionRequestMessage accepts requestId.
createFullSyncMessage accepts requestId.
sendInteractionRequest does not create or pass requestId.
sendPlayerUpdate uses input.sequence but does not pass requestId.
the host logs PLAYER_UPDATE requestId but does not retain it in the result or publication path.
the host interaction log omits requestId.
publishAuthoritativeState does not accept or forward requestId.
local authority commands have no equivalent stable request identity.
runtime debug event ids are random display ids, not command correlation ids.
a rejected or no-op client command will need an acknowledgement even when publication is skipped.
```

### Existing protocol capability

`ProtocolEnvelope` has an optional `requestId`. Both interaction request and full-sync builders accept it. The runtime can therefore propagate identity through existing envelopes before deciding whether a dedicated acknowledgement message is required.

### Missing runtime propagation

`sendInteractionRequest()` does not supply `requestId`, and `publishAuthoritativeState()` cannot echo one. The host therefore cannot tie a published snapshot tick back to the client request that caused it.

### No-publish acknowledgement problem

The planned publish-parity fix will skip rejected or unchanged host commands. A client still needs an authoritative answer. Snapshot publication cannot be the only acknowledgement channel because a deliberate no-publish decision would otherwise leave the request unresolved.

### Duplicate and retry ambiguity

There is no pending request ledger, duplicate request guard, acknowledgement status, expiry policy, or latency row. Retried client messages cannot be distinguished from new commands.

## Main finding

The blocker is request identity propagation and authoritative acknowledgement. Command results and publish decisions must be joined to a stable request identity, and acknowledgements must remain available when the authority deliberately does not publish a new snapshot.

## Next safe ledge

```txt
HorrorCorridor Request Identity Propagation + Authoritative Acknowledgement Fixture Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
npm run validate:live-player:dev: not run
browser smoke: not run
request acknowledgement fixture: unavailable
```
