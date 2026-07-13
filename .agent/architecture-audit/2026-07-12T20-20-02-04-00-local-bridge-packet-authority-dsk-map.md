# Local Bridge Packet Admission and Fanout DSK Map

**Timestamp:** `2026-07-12T20-20-02-04-00`

## Summary

The local bridge currently combines channel discovery, connection claims, message forwarding, disconnects and fanout inside raw `BroadcastChannel` callbacks. The missing boundary is a composed authority that validates packet identity and ownership before transport events or gameplay consumers observe them.

## Plan ledger

**Goal:** separate untrusted browser-channel observation from admitted local transport state and exact-once recipient delivery.

- [x] Trace host and client channel creation.
- [x] Trace connect, message, disconnect and host-message packets.
- [x] Trace packet effects into roster, protocol and rendering.
- [x] Define the parent domain and kit boundaries.
- [ ] Implement the domain.
- [ ] Add deterministic and browser fixtures.

## Current coupling

```txt
BroadcastChannel event.data
  -> truthy check
  -> kind switch
  -> local connection map or peer event bus
  -> GameShell/session/runtime mutation
  -> host fanout loop
  -> client state replacement
  -> visible frame
```

## Required parent domain

```txt
corridor-local-bridge-packet-admission-fanout-authority-domain
```

## Domain composition

```txt
corridor-local-bridge-packet-admission-fanout-authority-domain
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
```

## Ownership boundaries

```txt
channel adapter
  owns: browser BroadcastChannel lifecycle and raw observations
  does not own: connection admission, actor identity, gameplay mutation

packet authority
  owns: schema, session generation, capability, packet ID, sequence, lease lookup
  does not own: lobby or gameplay rules

connection authority
  owns: lease creation, actor binding, disconnect ownership and retirement

fanout authority
  owns: logical broadcast ID, intended recipients, target plan, delivery results

session/gameplay consumers
  consume only admitted typed events and committed delivery revisions

render authority
  acknowledges the first frame produced from an admitted revision
```

## Required types

```txt
LocalBridgePacketEnvelope
  packetId
  kind
  roomId
  sessionGeneration
  connectionId
  actorId
  sequence
  capabilityProof
  sentAtMs
  payload

LocalConnectionLease
  leaseId
  roomId
  sessionGeneration
  connectionId
  actorId
  capabilityId
  status
  revision

LocalBridgePacketResult
  status: accepted | rejected | duplicate | stale | no-change
  reason
  packetId
  leaseId
  actorId
  stateChanged
  committedRevision

LocalBridgeBroadcastResult
  broadcastId
  intendedRecipients
  deliveredRecipients
  rejectedRecipients
  duplicateRecipients
  committedRevision
```

## Required flow

```txt
raw channel observation
  -> structural parse
  -> namespace/session/capability admission
  -> packet identity and sequence admission
  -> connection lease and actor resolution
  -> kind-specific ownership validation
  -> typed packet result
  -> optional state commit
  -> one logical broadcast intent
  -> deterministic recipient plan
  -> exact-once per-recipient delivery
  -> complete delivery result
  -> first visible frame acknowledgement
```

## Dependency order

```txt
room identity accepted
  -> local channel generation/capability
  -> connection lease admission
  -> actor binding
  -> message/disconnect admission
  -> exact-once fanout
  -> lobby/gameplay consumption
  -> visible-frame proof
```

## Rejected designs

```txt
join code as authentication
TypeScript union as runtime validation
connectionId existence as disconnect authorization
one untargeted post per connection
client-side best-effort dedup without broadcast identity
```

## Completion boundary

The local bridge is not authoritative until unknown publishers, stale generations, mismatched actors and duplicate fanout are rejected before state mutation and browser fixtures prove exact-once parity with PeerJS.