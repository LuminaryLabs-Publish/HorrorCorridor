# Protocol Semantic Admission DSK Map

## Summary

The current protocol stack separates message construction and structural serialization, but it has no domain that owns semantic validity across envelope, payload, room, snapshot, actor and revision fields.

## Plan ledger

**Goal:** place one transport-independent authority between structural decode and every lobby, simulation or presentation mutation.

- [x] Map current producers, decoder and consumers.
- [x] Identify missing enum, range, identity and cross-field checks.
- [x] Preserve existing transport and local-bridge authority boundaries.
- [ ] Implement the parent DSK and fixtures.

## Current composition

```txt
protocol-message-construction-kit
  -> ProtocolMessage
protocol-serialization-kit
  -> JSON encode/decode
  -> protocol version check
  -> primitive/object/array shape check
PeerJS or local bridge
  -> peer/message
GameShell and GameCanvas consumers
  -> direct store/simulation/UI mutation
```

## Missing parent domain

```txt
corridor-protocol-semantic-admission-authority-domain
```

## Domain ownership

```txt
owns:
  exact enum membership
  optional field schema
  finite integer and range policies
  unique IDs and collection relations
  envelope/payload room identity
  room/snapshot equality and generation
  sender/actor/connection binding
  host identity relations
  snapshot/authoritative tick equality
  canonical admission result
  rejection observations and bounded journal
  first visible admitted-frame acknowledgement

does not own:
  PeerJS signalling
  BroadcastChannel capability admission
  game-rule execution
  renderer implementation
```

## Candidate DSK tree

```txt
corridor-protocol-semantic-admission-authority-domain
  protocol-candidate-id-kit
  protocol-exact-enum-schema-kit
  protocol-optional-field-schema-kit
  protocol-numeric-range-policy-kit
  protocol-collection-invariant-kit
  protocol-unique-identity-kit
  protocol-envelope-payload-relation-kit
  protocol-room-snapshot-consistency-kit
  protocol-actor-source-binding-kit
  protocol-tick-revision-consistency-kit
  protocol-semantic-admission-result-kit
  protocol-canonicalization-kit
  protocol-rejection-observation-kit
  protocol-admission-journal-kit
  first-protocol-admitted-frame-ack-kit
```

## Required order

```txt
transport candidate
  -> structural decode
  -> semantic plan
  -> source and revision admission
  -> atomic effect commit or zero mutation
  -> result/readback
  -> visible-frame acknowledgement
```

## Boundary

No runtime DSK was implemented in this documentation run.