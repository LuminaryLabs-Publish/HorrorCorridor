# HorrorCorridor Validation

**Updated:** `2026-07-17T20-41-29-04-00`  
**Scope:** documentation-only PeerJS DataConnection open admission and settlement audit

## Summary

Source inspection confirms that the real host transport path attaches an `open` listener, checks `connection.open`, and then invokes its one-shot connection-open emitter unconditionally. The callback marks itself emitted, so the later actual `open` event supplies no new admission evidence. `GameShell` consumes the raw event by adding a guest to the room roster and broadcasting `player-joined`.

The real client path waits for the `open` event or an already-open connection. The BroadcastChannel path models synchronous local readiness and remains a separate transport mode.

## Plan ledger

**Goal:** record exactly what was inspected and prevent unsupported connection, roster, frame, parity or production claims.

- [x] Confirm HorrorCorridor was the oldest eligible synchronized repository.
- [x] Inspect host and client connection hooks.
- [x] Inspect session roster mutation and lobby event publication.
- [x] Confirm the unconditional host open emission.
- [x] Confirm no connection generation, pending result, timeout or settlement exists.
- [x] Confirm no first accepted message or first guest lobby frame acknowledgement exists.
- [x] Update only `.agent` documentation and central tracking.
- [ ] Run runtime and browser fixtures after implementation exists.

## Source evidence

```txt
host open listener: present
host already-open check: present
host unconditional emitConnectionOpen call: present
host one-shot emission guard: present
client unconditional real-open call: absent
GameShell roster upsert on raw connection-open: present
player-joined broadcast on raw connection-open: present
ConnectionOpenAdmissionResult: absent
ConnectionOpenSettlementResult: absent
connection timeout/cancellation: absent
stale replacement rejection: absent
FirstAcceptedPeerMessageAck: absent
FirstAcceptedGuestLobbyFrameAck: absent
browser delayed-open fixture: absent
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
delayed-open fixture: unavailable
close-before-open fixture: unavailable
error-before-open fixture: unavailable
duplicate-open fixture: unavailable
transport-replacement fixture: unavailable
first accepted message fixture: unavailable
first guest lobby frame fixture: unavailable
production-build smoke: not run
deployed-origin smoke: not run
```

## Claim boundary

No connection-open correctness, roster correctness, accepted-message convergence, guest-frame convergence, artifact parity, deployed parity or production readiness is claimed.