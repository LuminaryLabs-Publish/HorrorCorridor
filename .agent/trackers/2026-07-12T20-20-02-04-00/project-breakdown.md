# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-12T20-20-02-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `local-bridge-packet-admission-fanout-authority-audited`

## Summary

HorrorCorridor uses a `BroadcastChannel` local bridge whenever that browser API exists. The channel name is derived only from the four-character join code, packet fields are trusted at runtime, and host broadcast loops emit one untargeted packet per local connection. Any same-origin context with the join code can claim a connection or submit a message, while every client processes every untargeted copy, producing quadratic fanout as the local roster grows.

## Plan ledger

**Goal:** define one generation-bound local-bridge packet authority so connection, message, disconnect and broadcast effects are admitted once, owned by one client lease, delivered once per intended recipient and correlated with the visible multiplayer frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` as the oldest eligible central entry.
- [x] Read the current root audit, gap order and machine registry.
- [x] Read `GameShell.tsx`, `createHost.ts`, `createClient.ts`, `sessionStore.ts`, shared types and package scripts.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Preserve all 29 implemented kits and offered services.
- [x] Define the local-bridge packet admission and fanout DSK boundary.
- [x] Add architecture, render, gameplay, interaction, local-bridge and deploy audits.
- [x] Refresh required root `.agent` files and machine registry.
- [x] Change no runtime source, dependency, package script or workflow.
- [ ] Implement packet admission, lease ownership, exact-once fanout and fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor:  2026-07-12T18-38-51-04-00 selected
ZombieOrchard:   2026-07-12T18-48-07-04-00
MyCozyIsland:    2026-07-12T19-00-22-04-00
TheUnmappedHouse:2026-07-12T19-11-01-04-00
AetherVale:      2026-07-12T19-21-29-04-00
TheOpenAbove:    2026-07-12T19-31-06-04-00
IntoTheMeadow:   2026-07-12T19-49-41-04-00
PhantomCommand:  2026-07-12T19-58-07-04-00
PrehistoricRush: 2026-07-12T20-10-25-04-00
```

## Complete interaction loop

```txt
choose host or client
  -> derive BroadcastChannel name from join code
  -> host and client create same-origin channel
  -> client posts client-connect with self-asserted remotePeerId and connectionId
  -> host trusts packet and emits peer/connection-open
  -> GameShell maps remotePeerId directly to a lobby player ID
  -> client posts client-message with self-asserted connection and protocol message
  -> host forwards packet directly to peer/message consumers
  -> lobby, start, gameplay and snapshot systems mutate
  -> host broadcast loops local connections
  -> posts one host-message per connection with targetPeerId = null
  -> every client accepts every copy
  -> UI, world, HUD, minimap and completion render successor stores
```

## Source-backed findings

### Local bridge replaces the PeerJS connection path

`createHost()` constructs a `BroadcastChannel` whenever the API exists. Its PeerJS `connection` listener is installed only when no local bridge exists. The local channel therefore becomes the active transport path in ordinary modern browsers.

### Packet shape is compile-time only

The `LocalBridgePacket` union is a TypeScript type. The runtime handler checks only that `event.data` is truthy and switches on `packet.kind`. It does not validate field types, channel generation, a capability, a session nonce, a packet ID, a sequence or a connection lease.

### Connection admission trusts claims

```txt
client-connect
  remotePeerId: caller supplied
  connectionId: caller supplied

host action
  -> localConnections.set(connectionId, record)
  -> peer/connection-open(remotePeerId, connectionId)
  -> GameShell upserts lobby player with id = remotePeerId
```

Any same-origin tab, iframe or script that knows the join code can publish the packet. The join code is a routing namespace, not an admission credential.

### Message admission does not require a connection record

For `client-message`, the host emits `peer/message` using the packet's claimed `remotePeerId`, `connectionId` and `message`. It does not first require `localConnections.get(connectionId)`, compare the owner peer ID or reject a stale generation.

### Disconnect ownership is incomplete

`client-disconnect` checks only whether the connection ID exists. It does not require the supplied `remotePeerId` to match the stored owner and has no caller capability or generation.

### Broadcast fanout multiplies deliveries

```txt
N accepted local connections
  -> host broadcast iterates N records
  -> posts N host-message packets
  -> every packet has targetPeerId = null
  -> every client receives and accepts all N packets
  -> N logical recipients produce N² client message events
```

The client filters only when `targetPeerId` is non-null. Consequently one logical `LOBBY_EVENT`, `START_GAME` or `SYNC` broadcast is replayed once per host connection on every client.

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session room roster identity readiness and reset
room/join-code/host identity allocation
transport mode and reachability
PeerJS signalling and DataConnection ownership
BroadcastChannel namespace and local transport
local packet schema admission capability and sequencing
connection lease and actor binding
protocol construction serialization and source admission
lobby membership readiness start and bootstrap
runtime lifecycle clocks and cadence
seeded maze topology and deterministic bootstrap
snapshot publication acceptance delivery and backpressure
input prediction movement collision and camera
cube interactions anomaly sequence and ooze pressure
Three.js world post-processing render surface and disposal
HUD minimap connection status debug and visible-frame proof
validation deployment and central audit tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit: routing, solo/host/client entry, loading, pause, completion, exit
corridor-session-domain-kit: identity, room, roster, connection, readiness, reset
runtime-store-snapshot-kit: snapshot, pose, view, input flags, readiness
ui-pause-projection-kit: pause state, reason, overlay
ui-completion-projection-kit: terminal state, message, timestamp, routing
complete-screen-presentation-kit: outcome presentation, restart, title exit
lobby-screen-presentation-kit: room, roster, ready state, controls
peer-host-transport-kit: PeerJS host, BroadcastChannel bridge, connection map, broadcast, targeted send, disconnect, destroy
peer-client-transport-kit: PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect, destroy
peer-event-bus-kit: typed transport events, subscription, cleanup
protocol-message-construction-kit: START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC, LOBBY_EVENT
protocol-serialization-kit: encode, decode, version, structural shape validation
maze-snapshot-bootstrap-kit: seed, maze, players, cubes, anomaly, initial snapshot
seeded-maze-rng-kit: topology, placement, target sequence
first-person-input-kit: keyboard, pointer lock, look, snapshots
movement-collision-camera-kit: movement, collision, eye pose, shake, camera
network-player-update-kit: sequence, cadence, pose envelope, host consume
corridor-interaction-domain-kit: pickup, drop, place, remove, held-cube synchronization
ordered-anomaly-sequence-kit: ordered slots, validation, victory
ooze-trail-domain-kit: spawn, decay, variation, spacing, capacity, pressure
snapshot-outcome-routing-kit: snapshot state to UI outcome
corridor-authoritative-publication-kit: tick, clone, SYNC, broadcast
corridor-animation-loop-kit: RAF start/stop, delta, elapsed, successor scheduling
corridor-render-world-kit: terrain, maze, objects, actors, lights, update, disposal
corridor-post-processing-kit: composer, bloom, sizing, render, disposal
corridor-minimap-kit: maze, players, cubes, ooze, heading
runtime-debug-frame-kit: activation, bounded capture, overlay, export
runtime-resource-cleanup-kit: loop, subscriptions, listeners, observers, GPU cleanup
package-validation-kit: build, lint, harness, visual, live-player checks
```

## Required parent domain

```txt
corridor-local-bridge-packet-admission-fanout-authority-domain
```

## Candidate kits

```txt
local-bridge-channel-namespace-kit
local-bridge-session-generation-kit
local-bridge-capability-token-kit
local-bridge-packet-schema-kit
local-bridge-packet-id-kit
local-bridge-connection-lease-kit
local-bridge-actor-binding-kit
local-bridge-source-admission-kit
local-bridge-sequence-ledger-kit
local-bridge-replay-dedup-kit
local-bridge-disconnect-admission-kit
local-bridge-broadcast-intent-kit
local-bridge-fanout-plan-kit
local-bridge-target-selection-kit
local-bridge-delivery-result-kit
local-bridge-commit-kit
local-bridge-rejection-observation-kit
local-bridge-journal-kit
first-local-bridge-frame-ack-kit
rogue-same-origin-publisher-fixture-kit
unknown-connection-message-fixture-kit
forged-disconnect-fixture-kit
multi-client-exact-once-fanout-fixture-kit
stale-generation-packet-fixture-kit
peerjs-local-bridge-parity-fixture-kit
```

## Required transaction

```txt
LocalBridgePacketCommand
  -> parse and validate runtime packet schema
  -> validate room/session generation and capability
  -> validate packet ID and monotonic sequence
  -> resolve the connection lease and canonical actor
  -> require message/disconnect ownership
  -> reject unknown, duplicate, stale or mismatched packets before event publication
  -> build one immutable broadcast intent
  -> derive one intended-recipient set
  -> post once with broadcast ID or post targeted once per recipient
  -> collect one terminal delivery result per intended recipient
  -> commit connection/message/disconnect effects atomically
  -> publish bounded observations and journal entries
  -> acknowledge the first visible frame citing packet/broadcast revision
```

## Required invariants

```txt
channel name is routing, not authorization
one accepted lease owns one connectionId and actor binding
unknown connection messages never reach peer/message
remotePeerId must equal the lease owner
only the lease owner can disconnect the lease
each packet has one generation, ID and terminal result
duplicate or stale packets cause no mutation
one logical broadcast reaches each intended client exactly once
client delivery never scales as N²
visible lobby/game frames cite the accepted packet or broadcast revision
```

## Validation boundary

```txt
runtime source changed: no
network behavior changed: no
gameplay behavior changed: no
render behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no

npm build/lint: not run
browser multiplayer smoke: not run
rogue-publisher fixture: unavailable
multi-client exact-once fixture: unavailable
stale-generation fixture: unavailable
PeerJS/local-bridge parity fixture: unavailable
```

No runtime packet-authenticity, exact-once fanout, spoof resistance, disconnect ownership, visible-frame correlation or deployment-readiness claim is made.