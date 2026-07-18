# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Timestamp:** `2026-07-17T09-17-19-04-00`  
**Source revision inspected:** `285b1ebc6dd654dcb623343585d1b6c2baa0d26b`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, deterministic maze bootstrap, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

The current audit isolates PeerJS signalling recovery. Both transport adapters publish `reconnecting` when the PeerJS `disconnected` event fires, but neither starts or exposes a reconnect attempt. No attempt identity, retry/backoff/deadline, terminal-intent arbitration, stale-result rejection, recovery result, recovered-message acknowledgement or first recovered remote-player frame acknowledgement exists.

## Plan ledger

**Goal:** preserve active data-channel continuity while making signalling loss, explicit closure, reconnect attempts, recovery settlement and the first recovered visible frame explicit.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Verify every eligible `main` head matches its documented repo-local head.
- [x] Select only HorrorCorridor by the oldest synchronized central timestamp.
- [x] Inspect `createHost.ts`, `createClient.ts`, `peerTypes.ts` and `GameShell.tsx`.
- [x] Identify the complete interaction loop, all active domains, all 29 kits, two adapters and offered services.
- [x] Define one parent signalling-reconnect authority and 20 coordinating surfaces.
- [x] Add a timestamped tracker, turn ledger and focused audit family.
- [x] Refresh required root `.agent` documents and the machine registry.
- [ ] Implement explicit reconnect admission, policy and settlement.
- [ ] Execute signalling-loss, explicit-disconnect, recovery, build and deployed-origin fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger missing: 0
root .agent missing: 0
new or undocumented: 0
runtime-ahead: 0

HorrorCorridor     2026-07-17T03-58-09-04-00 selected
ZombieOrchard      2026-07-17T04-41-15-04-00
TheUnmappedHouse   2026-07-17T05-03-18-04-00
TheOpenAbove       2026-07-17T05-41-10-04-00
PrehistoricRush    2026-07-17T06-23-59-04-00
PhantomCommand     2026-07-17T06-38-14-04-00
AetherVale         2026-07-17T07-02-59-04-00
TheLongHaul        2026-07-17T07-38-20-04-00
MyCozyIsland       2026-07-17T08-01-59-04-00
IntoTheMeadow      2026-07-17T08-45-46-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` is modified in the Publish organization.

## Complete interaction loop

```txt
page route
  -> choose solo, host or client
  -> create session and transport
  -> enter lobby
  -> host publishes initial snapshot
  -> GameCanvas starts input, simulation and presentation

active network path
  -> PeerJS signalling establishes peer identity and new data channels
  -> DataConnection carries protocol messages
  -> session store projects transport status
  -> snapshots drive gameplay and remote-player rendering

signalling disconnect
  -> PeerJS emits disconnected
  -> existing DataConnections may remain alive
  -> host/client adapter sets status to reconnecting
  -> GameShell maps reconnecting into session state
  -> no explicit peer.reconnect invocation
  -> no reconnect attempt, deadline, cancellation or result
  -> no recovered-message or recovered-frame acknowledgement

explicit client disconnect
  -> client calls peer.disconnect
  -> PeerJS disconnected event can also be emitted
  -> adapter separately writes closed
  -> no terminal-intent generation arbitrates late status events
```

## Domains in use

```txt
application shell and route lifecycle
UI loading, pause, settings, completion and terminal projection
session mode, peer identity, room, roster, connection, readiness and reset
lobby identity, actor binding, readiness, start and bootstrap
PeerJS signalling, peer identity and DataConnection lifecycle
BroadcastChannel same-origin local bridge
transport mode selection, reachability and delivery
signalling disconnect classification and reconnect policy
protocol envelopes, serialization, semantic admission and sequence handling
deterministic maze topology, cube placement, target sequence and random streams
authoritative snapshot construction, publication, delivery and acceptance
keyboard, mouse, pointer lock, focus, visibility and input lifecycle
client prediction, host movement admission, collision and camera
cube interactions, anomaly sequence, ooze pressure and victory
RAF scheduling, frame execution, fault containment and cleanup
Three.js world, post-processing, bloom and resource retirement
Canvas2D minimap and HUD projection
runtime debug capture, preference persistence and diagnostics
validation, browser proof, build, deployment and central tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit         routing, solo/host/client entry, loading, pause, completion and exit
corridor-session-domain-kit            identity, room, roster, connection, readiness and reset
runtime-store-snapshot-kit             snapshot, pose, view, input flags and readiness
ui-pause-projection-kit                pause state, reason and overlay
ui-completion-projection-kit           terminal state, message, timestamp and routing
complete-screen-presentation-kit       outcome presentation, restart and title exit
lobby-screen-presentation-kit          room, roster, ready state and controls
peer-host-transport-kit                PeerJS host, BroadcastChannel bridge, connections, broadcast, send, disconnect and destroy
peer-client-transport-kit              PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect and destroy
peer-event-bus-kit                     typed transport events, subscription and cleanup
protocol-message-construction-kit      START_GAME, PLAYER_UPDATE, TRY_INTERACT, SYNC and LOBBY_EVENT
protocol-serialization-kit             encode, decode, protocol version and structural validation
maze-snapshot-bootstrap-kit            seed, maze, players, cubes, anomaly and initial snapshot
seeded-maze-rng-kit                    topology, placement and target sequence
first-person-input-kit                 keyboard, pointer lock, look and snapshots
movement-collision-camera-kit          movement, collision, eye pose, shake, roll and camera projection
network-player-update-kit              sequence, cadence, pose envelope and host consume
corridor-interaction-domain-kit        pickup, drop, place, remove and held-cube synchronization
ordered-anomaly-sequence-kit           ordered slots, validation and victory
ooze-trail-domain-kit                  spawn, decay, variation, spacing, capacity and pressure
snapshot-outcome-routing-kit           snapshot state to UI outcome
corridor-authoritative-publication-kit tick, clone, SYNC and broadcast
corridor-animation-loop-kit            RAF start, RAF stop, delta, elapsed and successor scheduling
corridor-render-world-kit              terrain, maze, objects, actors, lights, update and disposal
corridor-post-processing-kit           composer, bloom, resize, render and disposal
corridor-minimap-kit                   DPR sizing, maze, ooze, cubes, players and heading
runtime-debug-frame-kit                preference initialization, bounded capture, overlay, export and window API
runtime-resource-cleanup-kit           loop, subscriptions, listeners, observers and GPU cleanup
package-validation-kit                 build, lint, harness, visual and live-player checks
```

Implemented proof adapters:

```txt
live-agent-runner-adapter               episode scheduling, adaptive actions, child execution, JSONL history and summaries
live-player-browser-proof-adapter       server/browser admission, route control, debug readback, screenshots, probes and proof gates
```

```txt
implemented kits: 29
implemented adapters: 2
implemented surfaces: 31
planned signalling-reconnect surfaces: 20
```

## Source-backed finding

```txt
PeerTransportStatus includes reconnecting: yes
host disconnected listener: yes
client disconnected listener: yes
host listener starts reconnect attempt: no
client listener starts reconnect attempt: no
public host reconnect command: no
public client reconnect command: no
reconnect attempt ID or generation: no
retry/backoff/deadline policy: no
explicit-close versus reconnect arbitration: no
stale reconnect result rejection: no
recovery result: no
first recovered message acknowledgement: no
first recovered remote-player frame acknowledgement: no
```

PeerJS documents that the `disconnected` event means the peer lost signalling-server availability while existing peer-to-peer connections stay alive, and that reconnecting requires `peer.reconnect()`. The repository currently changes status only. This is a source-backed recovery-contract gap, not a reproduced disconnect incident.

## Required parent domain

```txt
corridor-peer-signalling-reconnect-admission-settlement-authority-domain
```

## Candidate coordinating surfaces

```txt
signalling-disconnect-classification-kit
data-channel-liveness-observation-kit
reconnect-policy-kit
reconnect-attempt-identity-kit
reconnect-generation-kit
reconnect-backoff-deadline-kit
reconnect-cancellation-kit
peer-reconnect-adapter-kit
stale-reconnect-result-rejection-kit
host-acceptance-readiness-kit
client-new-connection-readiness-kit
existing-data-channel-continuity-kit
explicit-disconnect-terminal-intent-kit
reconnect-status-settlement-kit
reconnect-failure-result-kit
recovered-transport-projection-kit
first-recovered-message-ack-kit
first-recovered-remote-player-frame-ack-kit
signalling-reconnect-browser-fixture-kit
source-build-deployed-reconnect-parity-kit
```

## Required transaction

```txt
SignallingDisconnectCommand
  -> bind transport, peer, room, session and route generations
  -> classify involuntary signalling loss versus explicit terminal closure
  -> observe existing DataConnection liveness
  -> publish SignallingDisconnectResult

ReconnectAdmissionCommand
  -> choose retry policy, attempt ID, deadline and cancellation scope
  -> invoke one explicit PeerJS reconnect attempt
  -> reject stale or duplicate attempts
  -> publish ReconnectAdmissionResult

ReconnectSettlementCommand
  -> require a matching PeerJS open/error/close result
  -> preserve or retire existing data channels by policy
  -> restore host acceptance and client connection creation capability
  -> publish ReconnectSettlementResult
  -> publish FirstRecoveredMessageAck
  -> publish FirstRecoveredRemotePlayerFrameAck
```

## Required repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-17T09-17-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-17T09-17-19-04-00.md
.agent/architecture-audit/2026-07-17T09-17-19-04-00-peer-signalling-reconnect-dsk-map.md
.agent/render-audit/2026-07-17T09-17-19-04-00-reconnecting-status-without-recovered-frame-gap.md
.agent/gameplay-audit/2026-07-17T09-17-19-04-00-signalling-disconnect-session-loop.md
.agent/interaction-audit/2026-07-17T09-17-19-04-00-reconnect-command-result-map.md
.agent/transport-reconnect-audit/2026-07-17T09-17-19-04-00-peer-signalling-recovery-contract.md
.agent/deploy-audit/2026-07-17T09-17-19-04-00-signalling-reconnect-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-17T09-17-19-04-00-oldest-selection-peer-reconnect-reconciliation.md
```

## Validation boundary

Documentation only. Runtime TypeScript, React, networking, gameplay, rendering, tests, packages, workflows and deployment are unchanged. No reconnect correctness, session continuity, first recovered frame, artifact parity, deployed parity or production readiness is claimed.