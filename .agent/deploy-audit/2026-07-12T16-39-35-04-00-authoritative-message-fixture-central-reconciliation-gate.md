# Authoritative Message Fixture Central Reconciliation Gate

**Timestamp:** `2026-07-12T16-39-35-04-00`

## Summary

Current build and deployment surfaces do not prove that wrong-source, wrong-room, stale or duplicate host-class messages are rejected consistently across local bridge, PeerJS, production build and GitHub Pages.

## Plan ledger

**Goal:** block trusted-multiplayer and deployment-readiness claims until deterministic and browser adversarial fixtures prove message-source admission.

- [x] Identify the missing fixture matrix.
- [x] Separate source inspection from runtime proof.
- [x] Define local, production and Pages parity gates.
- [ ] Implement and run the fixtures.

## Required fixtures

```txt
valid current-host START_GAME acceptance
valid current-host SYNC acceptance
valid current-host LOBBY_EVENT acceptance
non-host forged START_GAME rejection
non-host forged SYNC rejection
sender-to-peer mismatch rejection
wrong envelope room rejection
wrong payload room rejection
stale connection-generation rejection
stale session-epoch rejection
older authority-revision rejection
duplicate message result
local-bridge and PeerJS parity
first accepted-message visible-frame receipt
rejected-message zero-frame mutation
source, production build and Pages parity
```

## Gate

No deployment-readiness, trusted-host, wrong-room-isolation, reconnect-safety or authoritative-visible-state claim is valid until the complete matrix passes and produces durable artifacts.