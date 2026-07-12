# Room Identity Reservation, Ownership and Retry Contract

**Timestamp:** `2026-07-12T18-31-01-04-00`

## Summary

This contract defines the missing room identity aggregate that binds the human join code, logical room ID, host player, host peer and transport generation.

## Plan ledger

**Goal:** make identity allocation deterministic in ownership semantics, collision-safe and observable even when the candidate code remains randomly generated.

- [x] Define manifest fields.
- [x] Define reservation and ownership phases.
- [x] Define retry and retirement rules.
- [x] Define typed results and observations.
- [ ] Implement and validate.

## Manifest

```txt
RoomIdentityManifest
  sessionEpoch
  identityGeneration
  roomId
  joinCode
  hostPlayerId
  requestedHostPeerId
  admittedHostPeerId
  transportMode
  createdAtMs
  fingerprint
```

## Admission phases

```txt
Candidate
Reserved
AcquiringPeer
Accepted
Retiring
Retired
Failed
```

## Invariants

```txt
joinCode is normalized before reservation
one joinCode candidate belongs to one active identity generation
advertised hostPeerId equals admitted hostPeerId
room, lobby and transport consume the same manifest fingerprint
collision retires the candidate before retry
retry allocates a strictly newer generation
late open/error events from predecessors perform zero mutation
local bridge cannot mark identity accepted when PeerJS mode was required
```

## Typed results

```txt
HostIdentityResult.Accepted(manifest)
HostIdentityResult.Collision(candidate, reason)
HostIdentityResult.Unavailable(candidate, reason)
HostIdentityResult.TimedOut(candidate)
HostIdentityResult.Cancelled(candidate)
HostIdentityResult.Failed(candidate, reason)
```

## Observations

Store bounded candidate count, wait duration, selected transport mode, terminal reason and manifest fingerprint. Do not retain unbounded raw errors or session payloads.