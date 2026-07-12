# Project breakdown: HorrorCorridor

**Timestamp:** `2026-07-12T16-29-56-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Status:** `authoritative-message-source-admission-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with solo, host and client routes, PeerJS and BroadcastChannel transports, deterministic maze bootstrap, authoritative snapshots, movement, cube/anomaly interactions, ooze pressure, Three.js rendering, bloom, minimap and diagnostics.

This breakdown isolates authoritative message-source admission. Clients accept shape-valid `START_GAME`, `SYNC` and `LOBBY_EVENT` messages and immediately replace room, roster, snapshot, route and readiness state without proving that the message came from the current admitted host connection, belongs to the active room or cites the current session and connection generation.

## Plan ledger

**Goal:** require every host-class protocol message to prove current host authority, transport and connection provenance, room membership and session generation before it can mutate client state or produce a visible frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` as the oldest eligible central-ledger entry.
- [x] Read current root audit state, transport events, protocol envelopes, serializers and `GameShell` consumers.
- [x] Identify the complete interaction loop.
- [x] Preserve all 29 implemented kits and their services.
- [x] Identify every active domain.
- [x] Trace `START_GAME`, `SYNC` and `LOBBY_EVENT` from connection event to visible state.
- [x] Define the DSK/domain boundary and fixture matrix.
- [x] Add architecture, render, gameplay, interaction, protocol-authority and deploy audits.
- [x] Refresh required root `.agent` files and machine registry.
- [ ] Implement and execute source-admission fixtures.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized root audit state: 0
selected: LuminaryLabs-Publish/HorrorCorridor
reason: oldest eligible central-ledger timestamp, 2026-07-12T14-30-36-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loop

```txt
host or local bridge publishes protocol message
  -> transport adapter deserializes shape-valid envelope
  -> peer/message carries remotePeerId and connectionId
  -> GameShell branches only on message.type
  -> START_GAME replaces room, roster, host identity and status
  -> SYNC replaces room, roster, authoritative snapshot, screen and readiness
  -> LOBBY_EVENT replaces room, roster and status
  -> visible lobby or gameplay frame reflects the accepted replacement
```

## Main finding

The transport event contains source evidence, but the consumer does not use it for host-class admission. No comparison binds:

```txt
event.remotePeerId <-> expected current host peer
event.connectionId <-> admitted current connection generation
message.senderId <-> expected host player identity
message.roomId <-> active room identity
payload.room.roomId <-> envelope roomId
message/session epoch <-> current session
message authority revision <-> latest accepted host state
```

A shape-valid message from the wrong peer, wrong room, predecessor connection or stale host generation can therefore replace client-authoritative state.

## Domains in use

```txt
application shell and screen routing
session, room, roster, identity, readiness and reset
loading and runtime lifecycle
browser clocks and simulation cadence
transport capability and mode selection
BroadcastChannel local bridge
PeerJS signalling and DataConnection transport
connection candidate, open, error, close, supersession and retirement
transport-to-actor identity binding
protocol construction, shape validation and serialization
authoritative message class, source, room and generation admission
maze bootstrap and seeded randomness
snapshot acceptance, publication and backpressure
input, movement, collision, camera and reconciliation
cube interaction, anomaly order, ooze pressure and outcomes
Three.js world, post-processing, minimap and diagnostics
validation, build, deployment and central audit tracking
```

## Implemented kits

The repository retains 29 implemented kit surfaces. Their complete names and offered services are preserved in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Required authority

```txt
corridor-authoritative-message-source-admission-authority-domain
```

## Validation boundary

Documentation only. Runtime, networking, gameplay, rendering, package scripts, dependencies and deployment were not changed. No forged-message, wrong-room, stale-host-generation or first-authoritative-frame fixture was run.