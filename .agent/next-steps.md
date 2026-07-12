# HorrorCorridor Next Steps

**Updated:** `2026-07-12T14-30-36-04-00`

## Plan ledger

**Goal:** establish canonical identity and admitted channels first, then make every terminal transport error produce one complete retirement, roster reconciliation and stale-event quarantine transaction before start or reconnect can proceed.

### Documentation

- [x] Add the transport-error retirement audit family.
- [x] Preserve the complete 29-kit inventory and domain map.
- [x] Refresh root docs and machine registry.
- [x] Synchronize central ledger and internal change log.

### Gate 1: canonical identity

- [ ] Define canonical member, peer, player, actor, room and slot identities.
- [ ] Separate transport peer IDs from gameplay player IDs.
- [ ] Add monotonic session epoch, transport revision, roster revision and fingerprint.
- [ ] Bind every active connection generation to one admitted actor.

### Gate 2: explicit transport mode and reachability

- [ ] Implement named `local-bridge` and `peerjs` modes.
- [ ] Choose preferred and fallback paths from policy, not API existence.
- [ ] Record transport mode ID and revision.
- [ ] Require acknowledged reachability before connection admission.

### Gate 3: connection candidates and actual open

- [ ] Add candidate ID and connection generation.
- [ ] Keep opening candidates outside the authoritative room roster.
- [ ] Remove unconditional host `emitConnectionOpen()` behavior.
- [ ] Admit membership only from actual open evidence.
- [ ] Add timeout, cancellation and stale-generation rejection.

### Gate 4: transport error envelope

- [ ] Give every error a stable ID.
- [ ] Distinguish `peer-signalling`, `peer-terminal`, `connection`, `local-bridge` and `codec-or-message` scopes.
- [ ] Include remote peer, connection ID and connection generation when applicable.
- [ ] Include session epoch, transport mode/revision and reconnect-attempt generation.
- [ ] Return typed terminal, retryable, stale, duplicate and rejected classifications.

### Gate 5: exactly-once connection retirement

- [ ] Admit one revisioned retirement command for a terminal connection error.
- [ ] Detach all predecessor callbacks.
- [ ] Remove host map or client active ownership before replacement.
- [ ] Close the connection exactly once.
- [ ] Treat later close as a duplicate retirement.
- [ ] Reject late open, message and error callbacks from the retired generation.

### Gate 6: roster and session reconciliation

- [ ] Choose explicit `remove`, `disconnected-slot` or bounded `grace-period` policy.
- [ ] Reconcile connection binding, room and `lobbyPlayers` atomically.
- [ ] Increment roster revision and fingerprint exactly once.
- [ ] Project truthful player and connection state.
- [ ] Recompute sealed start eligibility after retirement.

### Gate 7: peer signalling recovery

- [ ] Separate signalling loss from data-channel terminality.
- [ ] Preserve admitted data channels only under explicit policy.
- [ ] Allocate reconnect-attempt generations.
- [ ] Supersede prior attempts atomically.
- [ ] Reject predecessor attempt callbacks.

### Gate 8: lobby publication and visible proof

- [ ] Publish typed player-disconnected or player-left delivery results.
- [ ] Include error, retirement and roster revisions in debug observations.
- [ ] Add first visible error-state lobby frame acknowledgement.
- [ ] Ensure errored members are not projected as connected or start-eligible.

### Gate 9: sealed start

- [ ] Seal one roster revision before bootstrap.
- [ ] Require an admitted active binding for every remote participant.
- [ ] Reject start while any connection retirement is pending.
- [ ] Enforce all-ready policy.
- [ ] Require initial START_GAME and SYNC delivery/acknowledgement policy.
- [ ] Correlate the first shared gameplay frame with the sealed roster revision.

### Gate 10: fixture matrix

- [ ] Host connection error with no close.
- [ ] Client connection error with no close.
- [ ] Error followed by close.
- [ ] Error followed by late open.
- [ ] Peer signalling error with admitted channels.
- [ ] Peer terminal error with multiple channels.
- [ ] Replacement connection followed by predecessor close.
- [ ] Start while retirement is pending.
- [ ] Error during loading and active gameplay.
- [ ] Visible roster and first shared-frame parity.

## Completion boundary

Do not claim reliable multiplayer, reconnect safety or truthful lobby membership until transport errors are scoped and generation-bound, terminal connections retire exactly once, late callbacks cannot mutate successors, session/roster reconciliation is atomic, start uses a sealed eligible roster and browser fixtures prove the visible result.