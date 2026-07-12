# Room Identity Collision Fixture Gate

**Timestamp:** `2026-07-12T18-31-01-04-00`

## Summary

The build and browser proof surfaces do not currently force join-code collisions, unavailable PeerJS IDs, retry generations or local-bridge/PeerJS identity parity.

## Plan ledger

**Goal:** block room-identity readiness claims until deterministic collision and ownership fixtures pass across source, production build and deployed behavior.

- [x] Identify missing fixtures.
- [x] Define expected terminal results.
- [ ] Add deterministic candidate generator injection.
- [ ] Add fake PeerJS ownership outcomes.
- [ ] Add browser and Pages parity checks.

## Required fixtures

```txt
first candidate accepted
first candidate collision then second accepted
all candidates unavailable within retry budget
peer open arrives after candidate was superseded
peer error arrives after successor accepted
local bridge available but PeerJS ID unavailable
rapid host-start cancellation and retry
room/joinCode/peerId manifest fingerprint parity
first accepted-hosting frame acknowledgement
```

## Required assertions

```txt
rejected candidate is never advertised as joinable
partial Peer and BroadcastChannel resources are retired
retry generation is monotonic
late predecessor events perform zero mutation
Accepted exposes one canonical manifest
Failed exposes explicit recovery UI
source, production and deployed behavior agree
```

## Current validation

No runtime commands or browser fixtures were run during this documentation pass. The required fixture adapters do not yet exist.