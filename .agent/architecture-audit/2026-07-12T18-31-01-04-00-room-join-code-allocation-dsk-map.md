# Room and Join-Code Allocation DSK Map

**Timestamp:** `2026-07-12T18-31-01-04-00`

## Summary

Room ID, visible join code, host player ID, host PeerJS ID and local-bridge channel identity are currently assembled through separate raw values. No single authority reserves and commits them as one generation.

## Plan ledger

**Goal:** define one domain transaction that makes the advertised room joinable before the lobby can claim hosting success.

- [x] Map current identity producers and consumers.
- [x] Identify allocation, reservation, ownership and retry gaps.
- [x] Define candidate kits and typed results.
- [ ] Implement the authority.
- [ ] Prove collision, retry and transport-mode parity.

## Current ownership map

```txt
GameShell
  -> makeRoomId()
  -> makeJoinCode()
  -> makeId(host-player)
  -> room store
  -> peer identity store
  -> lobby projection
  -> createHost(peerId = joinCode)

createHost
  -> new Peer(joinCode)
  -> BroadcastChannel(horrorcorridor:joinCode)
  -> peer/open or peer/error
```

## Required parent domain

```txt
corridor-room-join-code-allocation-authority-domain
```

## Candidate coordinating kits

```txt
room-id-kit
join-code-candidate-kit
join-code-entropy-policy-kit
join-code-normalization-kit
join-code-reservation-kit
peer-id-ownership-admission-kit
room-identity-manifest-kit
room-identity-generation-kit
room-identity-fingerprint-kit
host-identity-start-command-kit
host-identity-retry-policy-kit
identity-collision-result-kit
identity-error-classification-kit
local-bridge-identity-binding-kit
peerjs-identity-binding-kit
identity-observation-kit
identity-journal-kit
first-hosting-state-frame-ack-kit
join-code-collision-fixture-kit
peer-id-unavailable-fixture-kit
mode-parity-fixture-kit
```

## Required transaction

```txt
StartHostIdentityCommand
  -> allocate room identity generation
  -> generate normalized join-code candidate
  -> validate entropy and policy
  -> reserve candidate for the session
  -> attempt PeerJS peer-ID ownership
  -> bind local-bridge channel to the same generation
  -> commit roomId, joinCode, hostPeerId and hostPlayerId manifest
  -> publish HostIdentityResult
  -> expose lobby as joinable
  -> acknowledge first frame citing manifest fingerprint

collision or ownership failure
  -> retire candidate generation
  -> close partial Peer and BroadcastChannel resources
  -> retry under bounded policy or publish Failed
  -> never advertise the rejected code
```

## Result vocabulary

```txt
Allocated
Reserved
Accepted
Collision
Unavailable
TimedOut
Cancelled
Failed
```

## Boundary

This authority owns identity allocation and admission, not general transport message delivery or gameplay actor authority.