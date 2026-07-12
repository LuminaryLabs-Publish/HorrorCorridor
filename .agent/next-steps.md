# HorrorCorridor Next Steps

**Updated:** `2026-07-12T16-39-35-04-00`

## Summary

Establish canonical connection and actor identity, then put a source-admission gate between structural protocol decoding and every host-authoritative client mutation. A decoded message must not be trusted merely because its type and payload are valid.

## Plan ledger

**Goal:** require current host peer, host player, room, session and connection-generation proof before `START_GAME`, `SYNC` or `LOBBY_EVENT` changes client state.

### Documentation

- [x] Add the authoritative message-source reconciliation audit family.
- [x] Preserve the complete 29-kit inventory and domain map.
- [x] Refresh root docs and machine registry.
- [x] Synchronize central ledger and internal change log.

### Gate 1: canonical identity and transport ownership

- [ ] Define canonical member, peer, player, actor, room and slot identities.
- [ ] Separate transport peer IDs from gameplay player IDs.
- [ ] Add monotonic session epoch, transport revision and connection generation.
- [ ] Bind every admitted connection generation to one actor and role.

### Gate 2: transport and connection admission

- [ ] Implement named `local-bridge` and `peerjs` modes.
- [ ] Require acknowledged reachability and actual channel-open evidence.
- [ ] Keep candidates outside authoritative membership until admitted.
- [ ] Retire terminal generations exactly once and quarantine late callbacks.

### Gate 3: message authority classification

- [ ] Classify `START_GAME`, `SYNC` and `LOBBY_EVENT` as host-only.
- [ ] Classify `PLAYER_UPDATE` and `TRY_INTERACT` as actor-bound client requests.
- [ ] Give every authoritative message a stable message ID.
- [ ] Add a monotonic host authority revision.

### Gate 4: source and room admission

- [ ] Compare `event.remotePeerId` with the admitted host peer.
- [ ] Compare `message.senderId` with the admitted host player.
- [ ] Compare `event.connectionId` and generation with current host ownership.
- [ ] Compare envelope room, payload room and active room.
- [ ] Compare session epoch, transport revision and authority revision.
- [ ] Return typed Accepted, Rejected, Stale and Duplicate results.
- [ ] Require every non-Accepted result to perform zero state mutation.

### Gate 5: atomic commit and observation

- [ ] Dispatch accepted messages through typed state commands.
- [ ] Commit room, roster, snapshot, route and readiness under one result revision.
- [ ] Record predecessor and successor fingerprints.
- [ ] Add bounded authority observations and journals.
- [ ] Avoid retaining unbounded snapshots or payloads.

### Gate 6: visible proof

- [ ] Add message ID and authority revision to committed presentation state.
- [ ] Acknowledge the first lobby or gameplay frame produced by the accepted message.
- [ ] Reject presentation acknowledgement if source revisions changed before render.
- [ ] Keep wrong-source, wrong-room and stale-message frames invisible.

### Gate 7: fixture matrix

- [ ] Valid current-host `START_GAME`, `SYNC` and `LOBBY_EVENT`.
- [ ] Non-host forged host-class messages.
- [ ] Sender-to-peer mismatch.
- [ ] Wrong envelope room and payload room.
- [ ] Stale predecessor message after reconnect.
- [ ] Duplicate message ID.
- [ ] Older authority revision.
- [ ] Local-bridge and PeerJS parity.
- [ ] Source, production build and Pages parity.
- [ ] First authoritative-message visible-frame receipt.

## Dependency order

```txt
canonical identities
  -> transport mode and reachability
  -> channel-open admission
  -> connection error retirement
  -> actor binding
  -> authoritative message-source admission
  -> snapshot and lobby state ordering
  -> sealed start and shared visible-frame proof
```

## Completion boundary

Do not claim trusted host authority, wrong-room isolation, reconnect message safety or authoritative visible state until source admission is implemented and the adversarial fixture matrix passes on `main`.