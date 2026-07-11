# HorrorCorridor Next Steps

**Updated:** `2026-07-11T05-28-29-04-00`

## Plan ledger

**Goal:** make the lobby roster semantically authoritative before the existing ready/start transaction work seals it into a run.

### Gate 1: roster identity and peer binding

- [ ] Replace ambiguous `LobbyPlayer` rows with canonical `LobbyMemberRecord` data.
- [ ] Add `memberKind: host-local | peer | reserved-slot`.
- [ ] Add explicit `peerId`, `playerId`, `slotId` and `admittedForBootstrap` fields.
- [ ] Ensure reserved slots are never reported as connected or ready.
- [ ] Route Add guest through a typed `ReserveSlotCommand`.
- [ ] Route peer arrival through typed join or slot-claim admission.
- [ ] Enforce one peer, one member and one player identity.
- [ ] Add monotonic roster revision and stable roster fingerprint.
- [ ] Return accepted, rejected or no-change results with stable reasons.
- [ ] Publish authoritative roster observations to all peers.
- [ ] Filter bootstrap input to a sealed admitted-real-member roster.
- [ ] Return admitted and rejected member rows from bootstrap preflight.
- [ ] Add `fixture:lobby-roster-identity`.
- [ ] Add `fixture:placeholder-admission`.
- [ ] Add `fixture:peer-slot-claim`.
- [ ] Add `fixture:roster-protocol-ordering`.
- [ ] Add a browser host/client roster smoke.

### Gate 2: lobby readiness and start transaction

- [ ] Route client ready changes to the host instead of mutating local state.
- [ ] Admit readiness against actor binding and expected roster revision.
- [ ] Reject non-host, wrong-phase, stale-roster and unready start requests.
- [ ] Introduce `starting` as an explicit room phase.
- [ ] Seal the admitted roster revision and fingerprint before bootstrap.
- [ ] Generate `startTransactionId`, `runSessionId` and session epoch.
- [ ] Correlate `START_GAME` and initial `SYNC` with the same identities.
- [ ] Commit host and client PLAYING state exactly once.
- [ ] Roll back to the previous lobby observation on staged failure.
- [ ] Add deterministic message-ordering and rollback fixtures.

### Gate 3: dependent runtime authority

- [ ] Add run-exit commit and session-epoch message admission.
- [ ] Add snapshot duplicate, stale, ordering and conflict policy.
- [ ] Add host movement admission and active client reconciliation.
- [ ] Add replicated pause/resume authority and atomic input suspension.

## Recommended DSKs

```txt
lobby-member-kind-kit
lobby-peer-binding-kit
lobby-slot-reservation-kit
lobby-member-admission-kit
lobby-member-claim-kit
lobby-member-removal-kit
lobby-roster-revision-kit
lobby-roster-fingerprint-kit
bootstrap-roster-filter-kit
lobby-roster-projection-kit
lobby-roster-authority-ledger-kit
lobby-roster-fixture-kit
```

## Required proof

```txt
reserved slots never become active players
one real peer creates exactly one member and one player
peer claim does not leave a duplicate placeholder
peer disconnect changes exactly the bound member
same command replay does not drift revision
stale command rejects without mutation
sealed roster fingerprint matches bootstrap input
world, minimap, snapshot and debug output contain only admitted members
START_GAME and initial SYNC identify that same sealed roster
```

## Do not start with

```txt
movement rewrite
renderer replacement
new maze content
visual fidelity work
save system
pause convergence
```

Those depend on a stable roster and run-session identity.