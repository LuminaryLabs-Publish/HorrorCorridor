# Connection Message Actor Admission Map

**Timestamp:** `2026-07-11T07-30-40-04-00`

## Plan ledger

**Goal:** route every inbound gameplay intent through one transport-aware admission service before domain dispatch.

- [x] Map connection event fields.
- [x] Map envelope and payload identity fields.
- [x] Map current host callbacks.
- [x] Define the intended admission sequence.
- [ ] Implement the sequence and fixtures.

## Current callback map

```txt
peer/message event
  remotePeerId
  connectionId
  message.senderId
  message.roomId
  message.requestId
  message.payload.playerId
       |
       v
GameCanvas type switch
       |
       +-> PLAYER_UPDATE -> applyNetworkPlayerUpdate(payload.playerId)
       |
       +-> TRY_INTERACT -> applyNetworkInteractionRequest(payload.playerId)
```

Only the message type controls dispatch. Transport actor identity, room identity, sender consistency, request identity and sequence ordering are not admitted.

## Target callback map

```txt
peer/message event
  -> envelope structural preflight
  -> connection is live
  -> room/session/epoch matches
  -> remote peer resolves to one admitted member
  -> member resolves to one gameplay player
  -> envelope sender matches bound player
  -> payload player matches bound player
  -> request and sequence are fresh
  -> typed admission result
  -> domain command dispatch
  -> typed mutation result
  -> optional authoritative publication
  -> bounded observation row
```

## Stable rejection reasons

```txt
unknown-connection
unbound-peer
reserved-slot
wrong-room
wrong-session
wrong-epoch
sender-mismatch
player-mismatch
duplicate-request
stale-sequence
sequence-gap
unsupported-message
invalid-phase
```

Browser callbacks should remain intent adapters. They must not decide actor ownership or mutate gameplay directly.