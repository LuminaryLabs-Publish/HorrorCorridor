# HorrorCorridor Known Gaps

**Updated:** `2026-07-17T20-41-29-04-00`

## Summary

The highest current focused boundary is real PeerJS DataConnection open admission. The host adapter can emit `peer/connection-open` while the channel is still pending, and downstream session/UI code treats that event as accepted membership.

## Plan ledger

**Goal:** add mode-correct connection-open settlement without weakening earlier signalling, protocol, lifecycle or frame-proof authorities.

- [ ] Connection candidate identity and generation.
- [ ] Explicit real-versus-local transport-mode policy.
- [ ] Actual real DataConnection open evidence.
- [ ] Pending connection state.
- [ ] Open deadline and timeout.
- [ ] Cancellation on route/transport replacement.
- [ ] Close-before-open settlement.
- [ ] Error-before-open settlement.
- [ ] Duplicate and stale event rejection.
- [ ] `ConnectionOpenAdmissionResult`.
- [ ] `ConnectionOpenSettlementResult`.
- [ ] `LobbyMembershipCommitResult`.
- [ ] `PlayerJoinedPublicationResult`.
- [ ] Send-readiness correlation.
- [ ] `FirstAcceptedPeerMessageAck`.
- [ ] `FirstAcceptedGuestLobbyFrameAck`.
- [ ] Delayed-open browser fixture.
- [ ] Close/error-before-open browser fixtures.
- [ ] Source/build/deployed connection parity fixture.
- [ ] Retain peer signalling reconnect and all earlier authority gaps.

## Current coverage gap

```txt
host candidate storage: present
host open listener: present
host already-open check: present
host unconditional open emission: present
client unconditional real-open emission: absent
connection generation: absent
pending result: absent
open admission result: absent
open settlement result: absent
open timeout: absent
close/error-before-open result: absent
stale replacement rejection: absent
roster commit result: absent
first accepted message acknowledgement: absent
first guest lobby frame acknowledgement: absent
browser delayed-open fixture: absent
```

## Failure paths

```txt
real connection remains pending
  -> host emits connection-open anyway
  -> guest enters roster and lobby
  -> later actual open event is suppressed

real connection closes or errors before open
  -> membership may already exist
  -> removal depends on later close handling
  -> no explicit rejected settlement exists

transport replaced while pending
  -> no connection generation exists
  -> late evidence has no stale-result gate
```

## Required invariants

```txt
real connection membership requires actual open evidence
local bridge readiness is explicitly mode-owned
one generation settles exactly once
pending/closed/errored/timed-out/stale candidates cannot enter the roster
send readiness and membership cite one accepted generation
a visible guest row cites an accepted roster commit
```

## Retained gaps

All previous signalling reconnect, debug-storage, frame-fault, remote interpolation, pointer-lock, HUD, minimap, motion, audio, page lifecycle, settings, device-control, loading, host-start, WebGL recovery, session, protocol, movement, interaction, ooze determinism and deployment findings remain open.

## Do not claim

Do not claim corrected connection admission, lobby membership correctness, accepted-message convergence, guest-frame convergence, artifact parity, deployed parity or production readiness until implementation and browser fixtures pass on `main`.