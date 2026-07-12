# Deploy audit: authoritative message-source fixture gate

**Timestamp:** `2026-07-12T16-29-56-04-00`

## Summary

Build success and ordinary multiplayer smoke tests cannot prove that clients reject host-class messages from the wrong peer, room or connection generation. Deployment readiness requires adversarial source-admission fixtures.

## Plan ledger

**Goal:** define the executable proof required before claiming that multiplayer state is authored only by the admitted current host.

- [x] Identify source-admission failure classes.
- [x] Define deterministic adapter fixtures.
- [x] Define real-browser same-origin and PeerJS cases.
- [x] Define visible-state parity checks.
- [x] Preserve zero-mutation rejection requirements.
- [ ] Implement and run the matrix on `main`.

## Required fixture matrix

```txt
valid current-host START_GAME -> accepted once
non-host START_GAME -> rejected, zero mutation
senderId/remotePeerId mismatch -> rejected
wrong-room START_GAME -> rejected
valid current-host SYNC -> accepted once
non-host forged SYNC -> rejected, predecessor snapshot retained
wrong-room SYNC -> rejected
stale predecessor-connection SYNC -> stale
older authority revision -> stale
same message ID twice -> duplicate, one commit
wrong-room LOBBY_EVENT -> rejected
local-bridge forged host message -> rejected
PeerJS forged host message -> rejected
reconnect then predecessor late message -> stale
accepted message -> first visible frame cites message and authority revision
source, dist and Pages -> equivalent results
```

## Required assertions

```txt
rejected mutation count = 0
room fingerprint unchanged
roster fingerprint unchanged
authoritative snapshot fingerprint unchanged
screen and readiness unchanged
no success observation emitted
bounded rejection observation emitted
accepted result cites current source and generation
first frame cites accepted message ID
```

## Environments

```txt
pure protocol-authority unit fixtures
transport adapter fixtures
same-origin BroadcastChannel browser smoke
PeerJS host/client browser smoke
production build smoke
GitHub Pages smoke
```

## Current validation status

```txt
runtime implementation: absent
unit fixtures: absent
browser adversarial fixtures: absent
Pages source-admission proof: absent
first-authoritative-frame proof: absent
```

## Non-claims

Do not claim trusted host authority, wrong-room isolation, reconnect message quarantine or multiplayer production readiness until this matrix passes on `main`.