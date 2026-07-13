# Protocol Semantic Fixture Gate

## Summary

Build and deployed-browser readiness must remain blocked until the same semantic-admission rules are proven across direct decoder use, PeerJS delivery and the local bridge.

## Plan ledger

**Goal:** establish executable evidence for exact enums, cross-field relations, ranges, zero-mutation rejection and visible-frame correlation.

- [x] Define the required fixture matrix.
- [x] Separate source inspection from executable proof.
- [ ] Implement fixtures.
- [ ] Run build, browser and deployed-origin checks.

## Required fixtures

```txt
valid START_GAME accepted
invalid room phase rejected
invalid connection state rejected
invalid app/game state rejected
invalid TRY_INTERACT action rejected
invalid SYNC reason rejected
numeric requestId rejected
negative/fractional tick and sequence rejected
out-of-range movement rejected
envelope/payload room mismatch rejected
payload/snapshot room mismatch rejected
authoritativeTick/snapshot.tick mismatch rejected
START_GAME host identity mismatch rejected
START_GAME maxPlayers mismatch rejected
LOBBY_EVENT roster mismatch rejected
duplicate player/cube/cell IDs rejected
unknown cube owner rejected
rejected message causes zero store mutation
rejected message causes zero route change
rejected message causes zero visible-frame revision
accepted message produces one semantic result and one visible-frame acknowledgement
PeerJS and local-bridge semantic parity
production build and deployed-origin parity
```

## Commands after implementation

```txt
npm install
npm run lint
npm run build
npm run harness:horror-corridor
npm run validate:live-player:dev
```

## Exit criteria

No protocol-integrity or production-readiness claim until all message types pass valid, invalid, stale, mismatch and visible-frame fixtures on `main`.