# HorrorCorridor Next Steps

**Updated:** `2026-07-13T03-38-31-04-00`

## Summary

Insert a client join-attempt authority between raw join-form activation and all canonical session, lobby and readiness mutation. A requested room must remain a detached candidate until validated input, explicit transport selection, host-presence proof and a source-admitted room-membership acknowledgement produce one typed terminal result.

## Plan ledger

**Goal:** replace provisional joined-lobby mutation with validated input, bounded connection and acknowledgement deadlines, exact cancellation, retry fencing, atomic acceptance and visible-frame proof.

### Documentation

- [x] Audit `JoinMenu`, `GameShell`, `createClient`, lobby projection and cancellation.
- [x] Preserve the 29-kit inventory and complete domain map.
- [x] Define the parent DSK and candidate kits.
- [x] Add architecture, render, gameplay, interaction, join-attempt and deploy audits.
- [x] Add the timestamped central-reconciliation family.
- [x] Refresh root docs and machine registry.
- [x] Synchronize the repo ledger and internal change log.

### Gate 1: input policy

- [ ] Define one join-code grammar shared by host generation and client entry.
- [ ] Reject empty input rather than silently generating an unrelated code.
- [ ] Bound join-code length and allowed characters.
- [ ] Normalize and bound display names by code points and encoded size.
- [ ] Return typed input validation results with zero store mutation.

### Gate 2: attempt identity and state

- [ ] Allocate `JoinAttemptId` and monotonic generation.
- [ ] Represent Created, Validating, Connecting, AwaitingHost, AwaitingAdmission and terminal states.
- [ ] Allow only one terminal transition per attempt.
- [ ] Bind every transport callback and protocol candidate to the attempt generation.
- [ ] Quarantine duplicate and stale predecessor events.

### Gate 3: transport and acknowledgement

- [ ] Select PeerJS or local bridge under explicit policy.
- [ ] Add bounded transport-open, host-presence and room-admission deadlines.
- [ ] Require a challenge/acknowledgement handshake for both transports.
- [ ] Bind acknowledgement to client identity, host identity, room generation, capacity and roster revision.
- [ ] Never interpret a one-way local post or PeerJS signalling-open event as room admission.

### Gate 4: commit and rollback

- [ ] Return `Accepted`, `InvalidInput`, `RoomUnavailable`, `RoomFull`, `Rejected`, `TransportUnavailable`, `TimedOut`, `Cancelled`, `Stale`, `Duplicate` or `Failed`.
- [ ] Commit peer identity, room, roster and readiness atomically for `Accepted` only.
- [ ] Keep pending attempts out of canonical `room` and `lobbyPlayers`.
- [ ] Retire DataConnection, BroadcastChannel participation and callbacks exactly once for non-accepted results.
- [ ] Publish typed cancellation and rollback receipts.

### Gate 5: presentation

- [ ] Replace `Joined room` with a pending projection until acceptance.
- [ ] Do not set accepted networking readiness before host acknowledgement.
- [ ] Project rejection, timeout and cancellation without provisional room membership.
- [ ] Carry attempt ID, room manifest revision and roster revision into lobby presentation.
- [ ] Acknowledge the first visible frame citing the accepted join result.

### Gate 6: fixtures

- [ ] Valid host-generated code fixture.
- [ ] Empty, oversized and invalid-character code fixtures.
- [ ] Invalid and oversized display-name fixtures.
- [ ] PeerJS no-host and local-bridge no-host timeout fixtures.
- [ ] Host rejection and room-full fixtures.
- [ ] Cancel before open and cancel while awaiting acknowledgement fixtures.
- [ ] Retry and late predecessor acknowledgement fixtures.
- [ ] Accepted-result atomic commit and non-accepted zero-mutation fixtures.
- [ ] PeerJS/local-bridge parity fixture.
- [ ] First accepted-lobby visible-frame fixture.
- [ ] Source, production-build and deployed-origin parity.

## Dependency order

```txt
shared input policy
  -> join attempt identity and generation
  -> explicit transport selection
  -> bounded host-presence challenge
  -> source-admitted room-membership acknowledgement
  -> typed terminal result
  -> atomic commit or rollback
  -> accepted-lobby visible-frame acknowledgement
```

## Completion boundary

Do not claim valid room membership, bounded join behavior, exact cancellation, retry isolation, PeerJS/local-bridge parity or accepted visible-state correlation until the authority and fixture matrix pass on `main`.