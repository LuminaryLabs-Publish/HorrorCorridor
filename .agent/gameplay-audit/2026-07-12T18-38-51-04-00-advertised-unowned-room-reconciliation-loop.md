# Advertised Unowned Room Reconciliation Loop

**Timestamp:** `2026-07-12T18-38-51-04-00`

## Summary

Host gameplay eligibility derives from optimistic room state rather than an accepted identity allocation result. A room can therefore appear ready for roster, readiness, loading, and start while the advertised host ID is unavailable.

## Plan ledger

**Goal:** block gameplay and lobby progression until one host identity manifest is accepted and current.

- [x] Trace host entry, lobby projection, readiness, and start.
- [x] Confirm no accepted-identity gate protects lobby or run bootstrap.
- [x] Preserve the room-identity parent authority.
- [ ] Add gameplay admission and collision/retry fixtures.

## Failure loop

```txt
candidate code C generated
  -> room and host identity C committed
  -> lobby advertises C
  -> networking readiness projected true
  -> PeerJS cannot acquire C
  -> generic error updates connection status only
  -> room C, roster, lobby, and host controls remain
  -> readiness or loading can continue against unowned C
```

## Gameplay consumers requiring accepted identity

```txt
lobby roster membership
host ready state
client join instructions
start eligibility
loading bootstrap inputs
START_GAME sender and hostPeerId
initial SYNC room identity
active-run reconnect claims
completion and return-to-lobby routing
```

## Required gameplay result

```txt
HostIdentityResult.Accepted
  -> enable joinable lobby, readiness, and start

Pending
  -> render allocation progress and block join/start

Collision or Unavailable
  -> retire candidate resources and retry or fail visibly

TimedOut, Cancelled, or Failed
  -> preserve predecessor or return to non-hosting state with zero advertised candidate
```

## Validation boundary

No gameplay source or multiplayer fixture changed. Joinability and start eligibility remain optimistic.