# Authoritative Message Visible-Frame Reconciliation Gap

**Timestamp:** `2026-07-12T16-39-35-04-00`

## Summary

Lobby, HUD, minimap and world rendering consume successor stores after host-class messages, but the frame contains no message-source, connection-generation or authority-revision receipt.

## Plan ledger

**Goal:** make every visible state transition traceable to one accepted authoritative message and prevent rejected or stale messages from producing a frame.

- [x] Trace accepted stores into visible consumers.
- [x] Identify missing message and authority provenance.
- [x] Define first-frame acknowledgement requirements.
- [ ] Implement render receipts and adversarial fixtures.

## Current gap

```txt
message decoded
  -> stores replaced
  -> React and Three.js consumers render
  -> no proof identifies the accepted source
```

Missing evidence:

```txt
messageId
authorityRevision
sessionEpoch
connectionGeneration
acceptedHostPeerId
acceptedRoomId
state predecessor fingerprint
state successor fingerprint
first visible frame ID
surface completion receipts
```

## Required proof

The first lobby or gameplay frame after an accepted message must cite the same message ID, host authority revision, session epoch, connection generation and successor-state fingerprint. Rejected, stale and duplicate messages must not advance any visible-state revision.