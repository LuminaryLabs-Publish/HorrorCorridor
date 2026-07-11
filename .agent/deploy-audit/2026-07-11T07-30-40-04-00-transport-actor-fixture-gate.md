# Transport Actor Fixture Gate

**Timestamp:** `2026-07-11T07-30-40-04-00`

## Plan ledger

**Goal:** require deterministic proof that only the transport-bound actor can issue accepted gameplay commands.

- [x] Identify existing package validation commands.
- [x] Define the missing detached actor-admission fixtures.
- [x] Define a browser multi-peer smoke matrix.
- [ ] Add scripts and fixtures.
- [ ] Run them in CI before claiming actor authority.

## Missing commands

```txt
fixture:transport-actor-binding
fixture:sender-payload-consistency
fixture:connection-sequence-admission
fixture:request-deduplication
fixture:disconnect-retirement
fixture:multi-peer-impersonation
```

## Required deterministic matrix

```txt
bound peer updates its own player -> accepted once
bound peer interacts as its own player -> accepted or domain no-change
peer claims another player's senderId -> rejected
peer claims another payload.playerId -> rejected
senderId and payload.playerId disagree -> rejected
unknown connection -> rejected
retired connection -> rejected
wrong room -> rejected
wrong session epoch -> rejected
duplicate requestId -> duplicate without mutation
stale sequence -> rejected without mutation
sequence gap -> stable policy result
two connections claim one player -> conflict
rejected command advances no tick and publishes no gameplay SYNC
accepted mutation is visible in world, minimap and debug under the bound actor
```

## Existing commands

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
npm run review:object-kit
```

These commands do not currently prove transport actor ownership or semantic message admission.

## Release gate

Do not claim authoritative multiplayer command handling until detached actor fixtures and a browser host-plus-two-clients impersonation smoke pass with bounded JSON-safe results.