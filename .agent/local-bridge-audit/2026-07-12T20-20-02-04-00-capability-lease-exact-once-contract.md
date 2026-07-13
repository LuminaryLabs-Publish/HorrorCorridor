# Local Bridge Capability, Lease and Exact-Once Contract

**Timestamp:** `2026-07-12T20-20-02-04-00`

## Summary

The current `BroadcastChannel` path treats possession of a join code and the ability to publish on the same-origin channel as sufficient authority. This contract separates channel discovery from authorization, binds each connection to a session capability and requires exact-once fanout.

## Plan ledger

**Goal:** specify the normative local-bridge contract before runtime implementation.

- [x] Identify channel, connection, actor and fanout trust gaps.
- [x] Define lifecycle states and ownership rules.
- [x] Define exact-once delivery rules.
- [x] Define observations and proof requirements.
- [ ] Implement and fixture the contract.

## Trust model

```txt
join code
  purpose: discover a room/channel namespace
  authority: none

session capability
  purpose: authorize one client session and generation
  authority: connect and submit packets under policy

connection lease
  purpose: bind one connectionId to one canonical actor and capability
  authority: send and disconnect that connection

broadcast revision
  purpose: identify one logical host publication and recipient set
  authority: client deduplication and frame correlation
```

## Connection lifecycle

```txt
Observed
  -> SchemaValidated
  -> CapabilityAccepted
  -> ActorBound
  -> LeaseAccepted
  -> Open
  -> Retiring
  -> Retired

any predecessor
  -> Rejected | Stale | Superseded
```

## Packet contract

Every packet must carry:

```txt
protocolVersion
packetId
roomId
sessionGeneration
capabilityId or proof
connectionId
actorId
sequence
kind
sentAtMs
payload
```

Host admission must verify:

```txt
runtime schema
current room and generation
capability active and not revoked
packet ID not previously terminal
sequence monotonic for the lease
connection exists for message/disconnect
actor equals lease owner
kind allowed by capability and phase
payload protocol admitted separately
```

## Fanout contract

One of these implementations is acceptable:

```txt
A. one channel post per logical broadcast
   -> includes broadcastId and intended recipient set/policy
   -> each client admits at most once

B. one targeted channel post per intended recipient
   -> targetPeerId is always non-null
   -> each recipient receives one unique deliveryId
```

The current hybrid is forbidden:

```txt
one post per connection
  + targetPeerId = null
  + every client accepts every post
```

## Exact-once invariants

- A packet ID has one terminal result.
- A connection ID belongs to one live lease per generation.
- A capability can act only within its room, generation and policy.
- A message from an unknown connection is rejected.
- A disconnect must match the lease owner.
- A broadcast ID is applied at most once per intended client.
- Recipient delivery count is linear in recipient count, never quadratic.
- Late packets from retired generations are stale and cannot reopen state.
- All observations are detached, bounded and secret-free.
- The first visible frame cites the committed connection, packet or broadcast revision.

## Retirement

```txt
host restart
client disconnect
capability revocation
room close
transport replacement
runtime stop
```

Each terminal condition must revoke capabilities, retire leases, clear sequence state and reject later packets from the old generation.

## Observability

```txt
accepted/rejected/duplicate/stale packet counts
active capability and lease counts
current bridge generation
last packet result
last broadcast result
per-recipient delivery result
bounded rejection reasons
first visible frame acknowledgements
```

Secrets or capability material must never appear in exported debug frames.

## Completion boundary

Do not claim the local bridge is safe, equivalent to PeerJS or exact-once until adversarial same-origin, stale-generation and multi-client fanout fixtures pass in source, production and deployed browser environments.