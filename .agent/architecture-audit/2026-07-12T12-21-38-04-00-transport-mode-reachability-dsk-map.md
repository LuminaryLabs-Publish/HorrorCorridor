# Transport Mode and Reachability DSK Map

## Summary

The host and client adapters currently combine two transports but do not compose them. `BroadcastChannel` capability silently selects the local bridge and disables the PeerJS path.

## Plan ledger

**Goal:** separate capability observation, transport policy, adapter construction, reachability admission, fallback and retirement into explicit composable kits.

- [x] Map current host and client adapter ownership.
- [x] Identify implicit mode selection and missing handshake.
- [x] Define the parent domain and coordinating kits.
- [ ] Implement and prove the domain.

## Current composition

```txt
GameShell
  -> peer-host-transport-kit
       -> PeerJS instance
       -> optional BroadcastChannel
       -> local bridge replaces PeerJS connection handling
  -> peer-client-transport-kit
       -> PeerJS instance
       -> optional BroadcastChannel
       -> local bridge replaces peer.connect
```

## Required parent domain

```txt
corridor-transport-mode-reachability-authority-domain
```

## Required subdomains

```txt
transport capability observation
transport mode policy
transport candidate lifecycle
host presence and connection handshake
reachability admission
fallback and path switching
connection and delivery results
transport status projection
transport observation and journaling
visible multiplayer proof
```

## Candidate kits

```txt
transport-capability-observation-kit
transport-mode-policy-kit
transport-mode-id-kit
transport-mode-revision-kit
transport-path-candidate-kit
local-bridge-adapter-kit
peerjs-data-channel-adapter-kit
transport-path-admission-kit
host-presence-handshake-kit
connection-attempt-id-kit
connection-attempt-generation-kit
connection-acknowledgement-kit
reachability-result-kit
transport-fallback-plan-kit
transport-switch-result-kit
transport-path-retirement-kit
transport-delivery-result-kit
transport-status-projection-kit
transport-mode-observation-kit
transport-mode-journal-kit
first-remote-player-frame-ack-kit
```

## Invariants

```txt
capability does not equal policy
connected requires acknowledged reachability
only one admitted transport generation owns mutation
fallback cannot duplicate connection or message effects
status identifies mode, attempt, generation and host
lobby and runtime messages cite the admitted path revision
visible remote-player frames cite the same revision
```

## Dependency order

```txt
identity and actor binding
  -> explicit transport mode policy
  -> reachability handshake
  -> protocol admission
  -> lobby start transaction
  -> runtime publication and visible-frame proof
```