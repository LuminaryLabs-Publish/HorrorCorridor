# HorrorCorridor Validation

**Updated:** `2026-07-17T09-17-19-04-00`  
**Scope:** documentation-only PeerJS signalling reconnect admission and settlement audit

## Summary

Source inspection confirms that host and client adapters handle PeerJS `disconnected` by changing status to `reconnecting`. Neither adapter invokes `peer.reconnect()`, exposes a reconnect operation, allocates an attempt identity, applies bounded retry policy, or publishes a recovery settlement. `GameShell` maps the status directly into session state.

PeerJS documentation distinguishes signalling loss from existing DataConnection loss and identifies `peer.reconnect()` as the explicit recovery operation. No signalling-loss browser fixture, recovered-message acknowledgement or recovered remote-player frame acknowledgement was found.

## Plan ledger

**Goal:** record exactly what was inspected and prevent unsupported reconnect, continuity, frame, parity or production claims.

- [x] Confirm HorrorCorridor remained the oldest eligible synchronized repository.
- [x] Inspect host and client signalling-disconnect handlers.
- [x] Inspect public transport adapter types.
- [x] Inspect session status mapping in `GameShell`.
- [x] Confirm no explicit reconnect command or attempt result exists.
- [x] Confirm no recovered-message or recovered-frame acknowledgement exists.
- [x] Search prior audits for an existing signalling-reconnect authority.
- [x] Update only `.agent` documentation and central tracking.
- [ ] Run runtime and browser fixtures after implementation exists.

## Source evidence

```txt
PeerTransportStatus reconnecting: present
host peer disconnected listener: present
client peer disconnected listener: present
host sets reconnecting: yes
client sets reconnecting: yes
peer.reconnect invocation: absent
public reconnect adapter method: absent
attempt identity/generation: absent
retry/backoff/deadline: absent
explicit-close arbitration: absent
ReconnectAdmissionResult: absent
ReconnectSettlementResult: absent
FirstRecoveredMessageAck: absent
FirstRecoveredRemotePlayerFrameAck: absent
signalling-loss browser fixture: absent
```

## Change classification

```txt
documentation changed: yes
runtime TypeScript changed: no
React or CSS changed: no
network behavior changed: no
input behavior changed: no
gameplay changed: no
Three.js behavior changed: no
Canvas2D behavior changed: no
packages or dependencies changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no
```

## Commands and fixtures

```txt
npm install: not run
npm run lint: not run
npm run build: not run
validate:live-player: not run
host signalling-loss fixture: unavailable
client signalling-loss fixture: unavailable
explicit-disconnect race fixture: unavailable
bounded retry fixture: unavailable
stale event fixture: unavailable
recovered message fixture: unavailable
recovered remote-player frame fixture: unavailable
production-build smoke: not run
deployed-origin smoke: not run
```

## Claim boundary

No reconnect correctness, multiplayer continuity, terminal-close correctness, recovered-message convergence, recovered-frame convergence, artifact parity, deployed parity or production readiness is claimed.