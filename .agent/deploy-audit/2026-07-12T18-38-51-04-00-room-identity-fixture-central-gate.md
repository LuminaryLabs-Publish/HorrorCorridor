# Room Identity Fixture Central Gate

**Timestamp:** `2026-07-12T18-38-51-04-00`

## Summary

Build success and static deployment do not prove that a displayed room code is globally owned, retry-safe, or consistent across PeerJS and the local BroadcastChannel bridge. Deployment readiness requires executable identity-allocation evidence.

## Plan ledger

**Goal:** block joinability and production-readiness claims until source, production-build, browser, and deployed identity fixtures agree.

- [x] Record the missing proof matrix.
- [x] Separate static deployment proof from multiplayer identity proof.
- [ ] Implement fixtures and capture artifacts.

## Required fixtures

```txt
first candidate accepted
forced PeerJS ID collision then retry accepted
unavailable ID with retry budget exhausted
allocation timeout
rapid cancel and restart
late predecessor open
late predecessor error
partial Peer created then local bridge fails
local bridge succeeds while PeerJS acquisition fails
accepted local-only mode disclosure
accepted PeerJS mode disclosure
manifest fingerprint parity across session, lobby, protocol, and frame
first accepted-hosting visible frame
source versus production-build parity
GitHub Pages multiplayer identity smoke
```

## Required evidence

```txt
command and terminal result
identity generation sequence
candidate and accepted manifests
resource acquisition and retirement receipts
bounded failure reason
lobby screen state
protocol identity fields
visible frame receipt
build commit SHA
artifact hash or capture reference
```

## Deployment gate

```txt
npm build passes
  != room identity authority proven

Pages loads
  != displayed join code globally owned

one successful manual room
  != collision, retry, cancellation, rollback, or stale-event safety
```

## Validation boundary

No build, browser, PeerJS collision, or Pages fixture was run. Deployment behavior was unchanged.