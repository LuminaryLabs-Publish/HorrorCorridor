# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-17T20-41-29-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible Publish repository after excluding `TheCavalryOfRome`

## Summary

The current Publish inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central ledger coverage, root `.agent` state and a `main` head matching the documented repo-local head. HorrorCorridor had the oldest eligible central timestamp (`2026-07-17T09-17-19-04-00`) and was the only repository selected.

The focused finding is in the real PeerJS host connection path. `createHost()` attaches an `open` listener and checks `connection.open`, but then invokes `emitConnectionOpen()` unconditionally. This can publish `peer/connection-open` before the DataConnection is open. The one-shot guard then prevents the later real `open` event from correcting the premature admission. `GameShell` consumes that event as an accepted guest, updates the room roster and broadcasts a join event.

## Interaction loop

```txt
start or join
  -> create session identity and room state
  -> create PeerJS host/client adapter or same-origin BroadcastChannel bridge
  -> establish signalling identity

host receives remote DataConnection
  -> store connection
  -> attach open/data/close/error listeners
  -> conditionally emit when connection.open is already true
  -> currently also emit unconditionally
  -> GameShell admits guest into roster
  -> host broadcasts player-joined lobby event

play
  -> deterministic maze bootstrap
  -> keyboard/pointer-lock input
  -> movement, collision and camera
  -> player updates and interaction requests
  -> host authoritative snapshots
  -> cube sequence, ooze pressure and victory
  -> Three.js frame, bloom, HUD and minimap projection

exit or replacement
  -> route settlement
  -> transport and runtime cleanup
  -> central documentation reconciliation
```

## Domains in use

- Application routing, loading, pause, completion and browser lifecycle.
- Session identity, room, roster, readiness, connection state and reset.
- PeerJS signalling, peer identity and DataConnection lifecycle.
- BroadcastChannel same-origin transport.
- Transport reachability, connection admission, delivery, reconnect and cleanup.
- Protocol construction, serialization, semantic admission and sequence handling.
- Deterministic maze bootstrap and seeded RNG.
- Authoritative snapshots, client prediction and remote actor projection.
- Keyboard, pointer lock, look and semantic player input.
- Movement, collision, camera, cube interaction, anomaly sequence, ooze and victory.
- RAF scheduling, runtime fault containment and resource retirement.
- Three.js world rendering, post-processing and Canvas2D minimap projection.
- HUD, lobby, settings, pause, completion and debug projection.
- Package validation, browser proof, Actions/Pages deployment and central governance.

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `corridor-application-shell-kit` | routing, solo/host/client entry, loading, pause, completion, exit |
| `corridor-session-domain-kit` | identity, room, roster, connection, readiness, reset |
| `runtime-store-snapshot-kit` | snapshot, pose, view, input flags, readiness |
| `ui-pause-projection-kit` | pause state, reason, overlay |
| `ui-completion-projection-kit` | terminal state, message, timestamp, routing |
| `complete-screen-presentation-kit` | outcome presentation, restart, title exit |
| `lobby-screen-presentation-kit` | room, roster, ready state, controls |
| `peer-host-transport-kit` | PeerJS host, BroadcastChannel bridge, connection records, broadcast, targeted send, disconnect, destroy |
| `peer-client-transport-kit` | PeerJS client, BroadcastChannel bridge, connect, send, status, disconnect, destroy |
| `peer-event-bus-kit` | typed transport events, subscription, cleanup |
| `protocol-message-construction-kit` | `START_GAME`, `PLAYER_UPDATE`, `TRY_INTERACT`, `SYNC`, `LOBBY_EVENT` |
| `protocol-serialization-kit` | encode, decode, protocol version, structural validation |
| `maze-snapshot-bootstrap-kit` | seed, maze, players, cubes, anomaly, initial snapshot |
| `seeded-maze-rng-kit` | topology, placement, target sequence |
| `first-person-input-kit` | keyboard, pointer lock, look, snapshots |
| `movement-collision-camera-kit` | movement, collision, eye pose, walk bob, roll, camera projection |
| `network-player-update-kit` | sequence, cadence, pose envelope, host consume |
| `corridor-interaction-domain-kit` | pickup, drop, place, remove, held-cube synchronization |
| `ordered-anomaly-sequence-kit` | ordered slots, validation, victory |
| `ooze-trail-domain-kit` | spawn, decay, variation, spacing, capacity, pressure |
| `snapshot-outcome-routing-kit` | snapshot state to UI outcome |
| `corridor-authoritative-publication-kit` | tick, clone, `SYNC`, broadcast |
| `corridor-animation-loop-kit` | RAF start, stop, delta, elapsed, successor scheduling |
| `corridor-render-world-kit` | terrain, maze, objects, actors, pulsing lights/materials, update, dispose |
| `corridor-post-processing-kit` | composer, bloom, resize, render, dispose |
| `corridor-minimap-kit` | canvas acquisition, DPR sizing, maze, ooze, cubes, remote players, local heading |
| `runtime-debug-frame-kit` | preference initialization, bounded capture, overlay, export, window API |
| `runtime-resource-cleanup-kit` | loop, subscriptions, listeners, observers, GPU cleanup |
| `package-validation-kit` | build, lint, harness, visual and live-player checks |

## Browser-proof adapters

| Adapter | Offered services |
|---|---|
| `live-agent-runner-adapter` | episode scheduling, adaptive actions, child execution, JSONL history, latest summary |
| `live-player-browser-proof-adapter` | server/browser admission, route control, debug readback, screenshots, image probes, proof gates |

## Main finding

```txt
peer receives DataConnection
  -> emitConnectionOpen callback registered
  -> if connection.open, emit
  -> emit unconditionally even when connection.open is false
  -> connectionOpenEmitted becomes true
  -> later real open event is ignored by guard
  -> host roster and lobby projection treat pending channel as admitted
```

The client real-transport path does not contain the same unconditional call; it waits for the `open` event or an already-open connection. The local BroadcastChannel path intentionally models synchronous readiness and must remain a separate transport mode.

## Required authority

**Proposed, not implemented:**

`corridor-peer-data-connection-open-admission-settlement-authority-domain`

```txt
ConnectionCandidateObserved
  -> ConnectionOpenAdmissionCommand
  -> inspect transport mode, connection ID, peer ID and actual open evidence
  -> ConnectionOpenAdmissionResult

ConnectionOpenSettlementCommand
  -> accept only matching real open or admitted local-bridge readiness
  -> reject pending, closed, errored, replaced or stale candidates
  -> ConnectionOpenSettlementResult

LobbyMembershipCommitCommand
  -> mutate roster only from accepted connection result
  -> FirstAcceptedPeerMessageAck
  -> FirstAcceptedGuestLobbyFrameAck
```

## Proposed kit surfaces

1. `connection-candidate-identity-kit`
2. `connection-generation-kit`
3. `transport-mode-open-policy-kit`
4. `real-data-connection-open-observation-kit`
5. `local-bridge-ready-observation-kit`
6. `connection-open-admission-kit`
7. `connection-open-settlement-kit`
8. `connection-open-timeout-kit`
9. `connection-open-cancellation-kit`
10. `stale-connection-event-rejection-kit`
11. `connection-error-close-arbitration-kit`
12. `accepted-connection-roster-commit-kit`
13. `player-joined-publication-kit`
14. `connection-send-readiness-kit`
15. `first-accepted-peer-message-ack-kit`
16. `first-accepted-guest-lobby-frame-ack-kit`
17. `pending-connection-diagnostic-kit`
18. `peer-open-browser-fixture-kit`
19. `source-build-deployed-connection-parity-kit`

## Validation boundary

Documentation only. Runtime TypeScript, networking, roster behavior, rendering, tests, workflows and deployment were not changed. No premature-open incident was reproduced in a browser, and no corrected connection admission, timeout, accepted-message proof, lobby-frame proof or deployed parity is claimed.