# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-12T20-20-02-04-00`  
**Branch:** `main`  
**Status:** `local-bridge-packet-admission-fanout-authority-audited`

## Summary

The repository retains a 29-kit browser runtime spanning application routing, sessions, lobby state, PeerJS, a same-origin `BroadcastChannel` bridge, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current boundary is local-bridge packet admission and exact-once fanout. The host and client derive a channel from the join code. Runtime handlers trust caller-supplied `remotePeerId`, `connectionId` and protocol messages without a session capability, connection lease, generation, packet ID or sequence. Host broadcast also posts one `targetPeerId = null` packet per local connection, while every client accepts every null-target packet.

## Plan ledger

**Goal:** admit local connection, message, disconnect and broadcast effects through one capability- and lease-backed authority before transport events or game state can consume them.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all nine eligible root `.agent` entrypoints through current tracking.
- [x] Select only HorrorCorridor as the oldest eligible central entry.
- [x] Read host/client local transport, session, protocol and UI source.
- [x] Preserve the complete interaction loop, domains and 29-kit service census.
- [x] Add the timestamped local-bridge audit family.
- [ ] Implement and prove the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/HorrorCorridor
selected central timestamp: 2026-07-12T18-38-51-04-00
```

## Complete interaction loop

```txt
browser route
  -> choose solo, host or client

local transport setup
  -> derive horrorridor:<joinCode> BroadcastChannel
  -> host suppresses PeerJS connection listener because localBridge exists
  -> client posts self-asserted client-connect
  -> host records connection and emits peer/connection-open
  -> GameShell maps remotePeerId to lobby player ID

local packet flow
  -> client posts self-asserted client-message or client-disconnect
  -> host forwards packet fields into peer events
  -> lobby/protocol/gameplay consumers mutate stores

local host publication
  -> iterate localConnections
  -> post one host-message per connection with targetPeerId null
  -> every client accepts every copy
  -> room, roster, snapshot, screens and readiness may be replaced repeatedly
  -> Three.js world, HUD, minimap and debug render successor state
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session room roster identity readiness and reset
room join-code host identity allocation
transport mode reachability and lifecycle
PeerJS signalling and DataConnection ownership
BroadcastChannel namespace and local transport
local packet schema capability generation and sequencing
connection lease actor binding and retirement
protocol construction serialization source admission and deduplication
lobby membership readiness start and bootstrap
runtime lifecycle clock cadence and frame scheduling
seeded maze topology and deterministic bootstrap
snapshot publication acceptance delivery and backpressure
keyboard pointer lock focus and input lifecycle
movement collision camera prediction and host admission
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

## Source-backed findings

```txt
BroadcastChannel created whenever API exists: yes
PeerJS host connection listener installed when localBridge exists: no
channel name includes join code only: yes
runtime LocalBridgePacket validation: no
session capability/token: no
session generation: no
packet ID or sequence: no
client-connect remotePeerId/connectionId self-asserted: yes
client-message requires known connection record: no
client-message actor/lease comparison: no
client-disconnect compares actor with stored owner: no
host broadcast posts once per local connection: yes
host broadcast targetPeerId: null
client accepts every null-target host packet: yes
N clients create N² client message events: yes
broadcast-to-visible-frame acknowledgement: no
```

## Concrete failure paths

### Same-origin forged member

```txt
publisher knows join code
  -> posts client-connect with chosen identity
  -> host records local connection
  -> GameShell admits chosen identity as connected lobby player
```

### Unknown-connection message

```txt
publisher posts client-message with arbitrary connectionId
  -> host does not require matching local connection record
  -> peer/message reaches protocol consumers
```

### Quadratic broadcast

```txt
N clients
  -> host emits N untargeted packets
  -> each client accepts N packets
  -> N² applications of one logical broadcast
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
  -> validate runtime schema
  -> validate room/session generation and capability
  -> admit packet ID and monotonic sequence
  -> resolve live connection lease and canonical actor
  -> validate kind-specific ownership
  -> reject unknown duplicate stale or mismatched packets
  -> publish one typed packet result
  -> commit at most one state effect
  -> create one logical broadcast intent
  -> derive intended recipients once
  -> deliver exactly once per recipient
  -> publish complete per-recipient results
  -> acknowledge first visible frame citing committed revision
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, package-script, dependency or deployment behavior changed.