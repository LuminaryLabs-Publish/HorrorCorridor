# HorrorCorridor Next Steps

**Updated:** `2026-07-12T12-21-38-04-00`

## Plan ledger

**Goal:** establish canonical identity, then implement explicit transport selection and acknowledged reachability before relying on lobby, start, snapshot or gameplay authority.

### Documentation

- [x] Add the transport-mode and reachability audit family.
- [x] Refresh root docs and machine registry.
- [x] Update central ledger and internal change log.

### Gate 1: canonical identity

- [ ] Define canonical member, peer, player, room and slot identities.
- [ ] Add monotonic roster revision and fingerprint.
- [ ] Bind every transport connection to one admitted actor.

### Gate 2: transport capability and policy

- [ ] Add a detached capability observation result.
- [ ] Define named `local-bridge` and `peerjs` modes.
- [ ] Choose preferred and fallback paths from policy, not API existence.
- [ ] Record transport mode ID and monotonic revision.
- [ ] Make local bridge opt-in for same-origin local testing.

### Gate 3: acknowledged reachability

- [ ] Add `ConnectSessionCommand` and connection-attempt ID.
- [ ] Add attempt generation, timeout, cancellation and supersession.
- [ ] Require host-presence or data-channel acknowledgement.
- [ ] Do not publish `connected` from packet submission alone.
- [ ] Return typed accepted, rejected, unreachable, timed-out, stale and failed results.

### Gate 4: fallback and retirement

- [ ] Prepare transport candidates outside live session state.
- [ ] Fall back from local bridge to PeerJS when policy allows.
- [ ] Prevent duplicate connection and message effects during switching.
- [ ] Retire rejected and predecessor channels, listeners and PeerJS connections.
- [ ] Publish transport switch and retirement results.

### Gate 5: protocol and lobby correlation

- [ ] Add transport mode/revision and connection attempt to protocol admission context.
- [ ] Require room, host, actor and connection convergence.
- [ ] Correlate lobby events, START_GAME and initial SYNC with the admitted path.
- [ ] Reject messages from stale transport generations.

### Gate 6: loading and run lifecycle

- [ ] Seal roster/readiness and admitted transport revision before start.
- [ ] Implement loading generation, cancellation and atomic commit.
- [ ] Quarantine late messages after exit, restart or transport replacement.

### Gate 7: visible proof

- [ ] Project truthful `connecting`, `connected`, `unreachable` and `fallback` states.
- [ ] Require a first accepted session message before multiplayer-ready status.
- [ ] Add first visible remote-player frame acknowledgement.
- [ ] Include transport mode/revision in debug frames and captures.

### Gate 8: fixture matrix

- [ ] Same-origin separate-tab local bridge fixture.
- [ ] Client-without-host false-connected fixture.
- [ ] Client-before-host-listener fixture.
- [ ] Separate-browser-profile PeerJS fixture.
- [ ] Cross-origin PeerJS fixture.
- [ ] Cross-device PeerJS fixture.
- [ ] Preferred-path failure and fallback fixture.
- [ ] Duplicate-delivery prevention fixture.
- [ ] Clean disconnect and reconnect fixture.

## Completion boundary

Do not claim working multiplayer until clients cannot report connected without an acknowledged host, cross-origin and cross-device sessions use an admitted PeerJS path, fallback is deterministic and duplicate-safe, all session messages cite the active transport revision and the first visible remote-player frame proves delivery.