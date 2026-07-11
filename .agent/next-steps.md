# HorrorCorridor Next Steps

**Updated:** `2026-07-11T07-30-40-04-00`

## Plan ledger

**Goal:** establish roster identity first, then bind every live transport connection to one canonical member and player before implementing additional multiplayer commands.

### Gate 1: roster identity and peer binding

- [ ] Replace ambiguous roster rows with canonical member records.
- [ ] Distinguish `host-local`, `peer` and `reserved-slot` membership.
- [ ] Add explicit peer, member, player and slot identities.
- [ ] Add monotonic roster revision and stable fingerprint.
- [ ] Ensure reserved slots never enter gameplay bootstrap.
- [ ] Add placeholder, peer-claim and disconnect fixtures.

### Gate 2: transport actor binding and message admission

- [ ] Add a canonical live connection record for `connectionId` and `remotePeerId`.
- [ ] Resolve the connection to one admitted member and gameplay player.
- [ ] Require envelope `senderId` to match the bound player.
- [ ] Require payload `playerId` to match the same bound player.
- [ ] Admit envelope `roomId`, run session ID and session epoch.
- [ ] Enforce monotonic PLAYER_UPDATE sequence per connection.
- [ ] Deduplicate request IDs before domain dispatch.
- [ ] Return typed accepted, rejected, duplicate, stale and no-change results.
- [ ] Reject unknown, retired, duplicate and reserved-slot bindings.
- [ ] Publish no gameplay snapshot for a rejected command.
- [ ] Add bounded actor-admission and rejection observations.
- [ ] Add `fixture:transport-actor-binding`.
- [ ] Add `fixture:sender-payload-consistency`.
- [ ] Add `fixture:connection-sequence-admission`.
- [ ] Add `fixture:request-deduplication`.
- [ ] Add `fixture:disconnect-retirement`.
- [ ] Add a browser host-plus-two-clients impersonation smoke.

### Gate 3: lobby readiness and start transaction

- [ ] Route readiness through the host and actor-admission layer.
- [ ] Seal one roster revision and fingerprint before bootstrap.
- [ ] Introduce start transaction ID, run session ID and epoch.
- [ ] Correlate START_GAME and initial SYNC.
- [ ] Commit or roll back exactly once.

### Gate 4: dependent runtime authority

- [ ] Add run-exit commit and epoch-based message quarantine.
- [ ] Add snapshot duplicate, stale, ordering and conflict policy.
- [ ] Add host movement validation and active client reconciliation.
- [ ] Add replicated pause/resume authority and atomic input suspension.

## Recommended actor DSKs

```txt
transport-connection-identity-kit
peer-player-binding-kit
inbound-envelope-preflight-kit
room-session-admission-kit
actor-claim-resolution-kit
sender-payload-consistency-kit
connection-sequence-ledger-kit
request-deduplication-kit
message-admission-result-kit
host-command-dispatch-kit
rejected-message-observation-kit
transport-identity-fixture-kit
```

## Required proof

```txt
one live connection resolves to one admitted player
bound peer can update only its own player
bound peer can interact only as its own player
sender mismatch rejects before mutation
payload player mismatch rejects before mutation
wrong room session or epoch rejects
retired connection rejects
same request replay is duplicate without mutation
stale sequence rejects
accepted mutation publishes at most once
rejected command advances no tick and changes no render projection
world minimap HUD and debug reflect only accepted actor-bound state
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

Those depend on canonical roster, actor and run-session identity.