# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-12T12-21-38-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client routes, deterministic maze bootstrap, authoritative snapshots, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

The current audit isolates transport-mode selection and reachability. In modern browsers the existence of `BroadcastChannel` automatically selects the local bridge, suppresses PeerJS connection paths and lets a client report `connected` without a host acknowledgement. This makes same-origin local testing look valid while cross-origin and cross-device multiplayer can remain unreachable.

## Plan ledger

**Goal:** preserve the full repository breakdown while defining one explicit transport-mode authority from capability observation through acknowledged reachability, fallback, message delivery and first visible multiplayer proof.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible synchronized repository.
- [x] Inspect host/client transport construction, connection, send, broadcast and status paths.
- [x] Identify the interaction loop, all domains, 29 implemented kits and offered services.
- [x] Add the transport-mode audit family and refresh root routing.
- [x] Update central tracking on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable multiplayer fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-12T12-21-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T12-21-38-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T12-21-38-04-00-transport-mode-reachability-dsk-map.md
.agent/render-audit/2026-07-12T12-21-38-04-00-connected-status-visible-session-gap.md
.agent/gameplay-audit/2026-07-12T12-21-38-04-00-local-bridge-replaces-network-loop.md
.agent/interaction-audit/2026-07-12T12-21-38-04-00-connect-attempt-path-admission-map.md
.agent/transport-mode-audit/2026-07-12T12-21-38-04-00-capability-policy-handshake-fallback-contract.md
.agent/deploy-audit/2026-07-12T12-21-38-04-00-multiplayer-transport-matrix-gate.md
```

Retain the loading-transition audit family at `2026-07-12T09-48-15-04-00` and all preceding identity, actor-binding, lobby-start, lifecycle, startup, readiness, render-surface, input, clock, snapshot, movement, interaction, outcome, randomness, delivery, pause and debug audits.

## Interaction loop

```txt
host route
  -> create PeerJS host and optional BroadcastChannel
  -> BroadcastChannel presence suppresses PeerJS connection listener

client route
  -> create PeerJS client and optional BroadcastChannel
  -> BroadcastChannel presence suppresses peer.connect
  -> post client-connect
  -> mark connected without acknowledgement

shared run
  -> lobby and protocol events update stores
  -> host starts run and publishes START_GAME/SYNC
  -> rendering begins only if the selected transport actually delivers them
```

## Current finding

```txt
capability and policy are fused
local bridge replaces rather than supplements PeerJS
client connection result is unacknowledged
false connected status is possible
cross-origin/device reachability is not proven
fallback is absent
transport mode/revision is absent from state and messages
first remote-player frame receipt is absent
```

## Required parent domain

```txt
corridor-transport-mode-reachability-authority-domain
```

## Required flow

```txt
ConnectSessionCommand
  -> observe capabilities
  -> select explicit preferred and fallback modes
  -> allocate attempt and transport generation
  -> prepare detached candidates
  -> require host or data-channel acknowledgement
  -> admit one path and retire others
  -> publish typed connection and delivery results
  -> correlate lobby, protocol and runtime state with transport revision
  -> acknowledge the first visible remote-player frame
```

## Census

```txt
source-backed kits: 29
planned transport-mode kits and fixtures: 28
```

The complete kit and service inventory is in `.agent/current-audit.md`, `.agent/kit-registry.json` and the current tracker.