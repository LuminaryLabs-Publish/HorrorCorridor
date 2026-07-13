# HorrorCorridor Next Steps

**Updated:** `2026-07-12T20-20-02-04-00`

## Summary

Place a packet-admission and exact-once fanout authority around the `BroadcastChannel` path. Channel discovery by join code must not authorize connection, message or disconnect effects, and one logical host broadcast must reach each intended client exactly once.

## Plan ledger

**Goal:** replace raw local packet trust with generation-bound capabilities, owned connection leases, typed results, exact-once fanout and visible-frame proof.

### Documentation

- [x] Audit host and client local bridge source.
- [x] Preserve the 29-kit inventory and complete domain map.
- [x] Define the parent DSK and candidate kits.
- [x] Add architecture, render, gameplay, interaction, local-bridge and deploy audits.
- [x] Refresh root docs and machine registry.

### Gate 1: packet envelope and generation

- [ ] Define a runtime-validated `LocalBridgePacketEnvelope`.
- [ ] Include protocol version, packet ID, room ID, session generation, connection ID, actor ID, sequence and timestamp.
- [ ] Allocate a new bridge generation on host creation/restart.
- [ ] Reject packets from predecessor generations before event publication.

### Gate 2: capability and connection lease

- [ ] Issue a scoped client capability after accepted room/transport admission.
- [ ] Treat the join code only as channel discovery.
- [ ] Create one `LocalConnectionLease` per accepted client.
- [ ] Bind capability, connection ID, canonical actor and generation.
- [ ] Reject unknown-connection messages.
- [ ] Require disconnect actor and capability to match the lease owner.

### Gate 3: packet identity and replay safety

- [ ] Add packet IDs and per-lease monotonic sequences.
- [ ] Return typed accepted, rejected, duplicate and stale results.
- [ ] Ensure duplicates and stale packets cause no roster, gameplay or snapshot mutation.
- [ ] Store bounded, secret-free observations and journals.

### Gate 4: exact-once fanout

- [ ] Build one logical broadcast intent with a unique broadcast ID.
- [ ] Derive the intended recipient set once.
- [ ] Either post one deduplicated broadcast or one non-null targeted delivery per recipient.
- [ ] Remove the current per-connection/null-target hybrid.
- [ ] Publish complete per-recipient delivery results.
- [ ] Guarantee linear recipient delivery counts.

### Gate 5: consumer and frame admission

- [ ] Allow GameShell and gameplay consumers to receive only admitted typed events.
- [ ] Carry packet/broadcast revision into room, roster and snapshot commits.
- [ ] Correlate the first visible lobby/game frame with the accepted revision.
- [ ] Expose rejection and duplicate counts without capability material.

### Gate 6: fixtures

- [ ] Valid connection accepted once.
- [ ] Rogue same-origin tab without capability rejected.
- [ ] Unknown-connection message rejected.
- [ ] Actor/lease mismatch rejected.
- [ ] Forged disconnect rejected.
- [ ] Duplicate and stale packet rejected with no mutation.
- [ ] One through four clients receive one delivery each per broadcast.
- [ ] START_GAME and initial SYNC apply once per client.
- [ ] Host restart fences old packets.
- [ ] PeerJS and local-bridge semantic parity.
- [ ] Source, production build and deployed browser parity.

## Dependency order

```txt
accepted room identity
  -> bridge generation and capability
  -> connection lease and actor binding
  -> packet identity/sequence admission
  -> message/disconnect ownership
  -> exact-once fanout
  -> state commit
  -> visible-frame acknowledgement
```

## Completion boundary

Do not claim the local bridge is authenticated, spoof-resistant, exact-once or PeerJS-equivalent until the authority and fixture matrix pass on `main`.