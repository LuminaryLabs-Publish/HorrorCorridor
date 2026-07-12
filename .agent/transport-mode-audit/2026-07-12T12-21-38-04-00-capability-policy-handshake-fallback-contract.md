# Transport Capability, Policy, Handshake and Fallback Contract

## Summary

Transport capability observation is currently fused with policy. The existence of `BroadcastChannel` selects the local bridge, suppresses PeerJS, and allows unacknowledged connected status.

## Plan ledger

**Goal:** define one transport contract that distinguishes available adapters from the path admitted for a specific session.

- [x] Identify current capability checks.
- [x] Identify host/client path suppression.
- [x] Define handshake, fallback and retirement invariants.
- [ ] Implement and validate the contract.

## Capability result

```txt
broadcastChannelAvailable
peerJsAvailable
sameOriginLocalHostCandidate
remoteHostCandidate
signallingReachable
peerDataChannelSupported
```

Capability results do not select a transport.

## Policy result

```txt
preferred mode: local-bridge | peerjs
fallback order
handshake timeout
retry limit
same-origin restriction
remote-session requirement
```

## Handshake contract

```txt
client attempt ID
  -> host presence challenge
  -> host response with room, host and transport revision
  -> client acknowledgement
  -> canonical actor binding
  -> admitted connection result
```

A local bridge packet posted without a host response is not a connection.

## Fallback contract

```txt
preferred candidate fails or times out
  -> retire candidate generation
  -> start fallback candidate under successor generation
  -> prevent duplicate message delivery
  -> commit only one path
  -> publish switch result
```

## Retirement contract

```txt
close BroadcastChannel
close data channels
remove listeners
clear connection records
reject stale packets
publish retirement result
```

## Observability

Every status, lobby mutation, protocol message and multiplayer frame should identify transport mode, transport revision, connection attempt and canonical host/room identity.