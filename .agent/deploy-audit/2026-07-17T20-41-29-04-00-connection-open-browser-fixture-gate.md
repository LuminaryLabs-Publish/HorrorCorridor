# Connection Open Browser Fixture Gate

**Timestamp:** `2026-07-17T20-41-29-04-00`

## Required release gate

The source, production build and deployed origin must prove the same connection-open admission policy before multiplayer readiness is claimed.

## Fixture matrix

- Delay a real PeerJS DataConnection `open` event and confirm no guest is admitted early.
- Close a candidate before `open` and confirm no roster entry or joined broadcast occurs.
- Error a candidate before `open` and confirm bounded settlement.
- Emit `open` once and confirm exactly one roster commit.
- Emit duplicate `open` evidence and confirm idempotency.
- Replace the transport while a candidate is pending and reject stale evidence.
- Confirm the local BroadcastChannel bridge remains explicitly synchronous.
- Confirm the first accepted message and first guest lobby frame cite the same connection generation.
- Compare development source, production build and deployed Pages behavior.

## Current status

```txt
source inspection: complete
runtime fix: absent
unit fixture: absent
browser delayed-open fixture: absent
browser close-before-open fixture: absent
production build smoke: not run
deployed-origin smoke: not run
```

## Claim boundary

No artifact parity, deployed parity, connection-open correctness or production readiness is claimed.