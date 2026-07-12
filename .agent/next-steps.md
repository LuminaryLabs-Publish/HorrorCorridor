# HorrorCorridor Next Steps

**Updated:** `2026-07-12T14-22-01-04-00`

## Plan ledger

**Goal:** establish canonical identity and transport mode first, then make actual data-channel open evidence the only path into connected roster membership and run bootstrap.

### Documentation

- [x] Add the data-channel roster-admission audit family.
- [x] Refresh root docs and machine registry.
- [x] Update central ledger and internal change log.

### Gate 1: canonical identity

- [ ] Define canonical member, peer, player, actor, room and slot identities.
- [ ] Separate transport peer IDs from gameplay player IDs.
- [ ] Add monotonic session epoch, roster revision and roster fingerprint.
- [ ] Bind every active transport connection to one admitted actor.

### Gate 2: explicit transport mode

- [ ] Implement named `local-bridge` and `peerjs` modes.
- [ ] Choose preferred and fallback paths from policy, not API existence.
- [ ] Record transport mode ID and monotonic revision.
- [ ] Require acknowledged reachability before any connection candidate can advance.

### Gate 3: connection candidates

- [ ] Add connection candidate ID and generation.
- [ ] Keep candidates outside the authoritative room roster.
- [ ] Track `created`, `opening`, `open-observed`, `rejected`, `errored`, `closed`, `superseded` and `retired` states.
- [ ] Add timeout, cancellation and stale-generation rejection.

### Gate 4: actual channel-open admission

- [ ] Remove unconditional host `emitConnectionOpen()` behavior.
- [ ] Emit open observation only from actual `DataConnection.open` evidence.
- [ ] Return typed accepted, rejected, stale, duplicate and failed admission results.
- [ ] Make error terminal even when no close event follows.
- [ ] Ensure duplicate open callbacks produce one admission only.

### Gate 5: actor binding and roster commit

- [ ] Validate remote identity claim before membership.
- [ ] Commit connection-to-actor binding and room membership atomically.
- [ ] Increment roster revision exactly once per accepted mutation.
- [ ] Publish roster fingerprint and predecessor revision.
- [ ] Preserve predecessor room state on failure.

### Gate 6: lobby publication and visible proof

- [ ] Return delivery results for player-joined and player-left publications.
- [ ] Do not project `connected` from candidate creation or packet submission.
- [ ] Distinguish connecting candidates from admitted connected members.
- [ ] Add first visible lobby-roster frame acknowledgement.
- [ ] Include roster and connection generations in debug frames.

### Gate 7: start eligibility

- [ ] Seal one roster revision before run bootstrap.
- [ ] Require an active admitted binding for every remote participant.
- [ ] Define and enforce an all-ready policy.
- [ ] Prevent placeholder guests from becoming gameplay actors unless a bot policy explicitly admits them.
- [ ] Require initial START_GAME and SYNC delivery/acknowledgement policy.
- [ ] Correlate the first shared gameplay frame with the sealed roster revision.

### Gate 8: disconnect and reconnect

- [ ] Retire candidate-only connections without mutating the roster.
- [ ] Apply one named remove-or-disconnect policy after admitted connection loss.
- [ ] Reconcile error-only terminal paths.
- [ ] Replace active bindings atomically on reconnect.
- [ ] Reject late events from retired connection generations.

### Gate 9: fixture matrix

- [ ] PeerJS candidate with `open=false` fixture.
- [ ] Delayed-open fixture.
- [ ] Never-open timeout fixture.
- [ ] Error-without-close fixture.
- [ ] Close-before-open fixture.
- [ ] Duplicate-open fixture.
- [ ] Start-during-opening fixture.
- [ ] Start-after-roster-seal fixture.
- [ ] Host/client visible roster parity fixture.
- [ ] First shared gameplay-frame roster fixture.

## Completion boundary

Do not claim a shared lobby or working multiplayer until actual data-channel open evidence gates membership, ghost members cannot enter bootstrap, errors always reconcile candidate and roster state, start uses a sealed eligible roster, host/client projections agree on one roster revision and the first visible gameplay frame cites that revision.