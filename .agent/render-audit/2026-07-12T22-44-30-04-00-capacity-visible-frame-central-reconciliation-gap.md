# Render Audit: Capacity Visible-Frame Central Reconciliation Gap

**Timestamp:** `2026-07-12T22-44-30-04-00`

## Summary

The lobby, Three.js world, HUD and minimap can present a roster and actor set that exceeds the room's declared four-player capacity. No visible frame cites a capacity revision, roster fingerprint or typed admission result.

## Plan ledger

**Goal:** require every lobby and gameplay frame to prove that its visible member count and actor set came from one committed capacity-valid roster.

- [x] Reconcile the current source-backed presentation gap.
- [x] Identify required frame evidence.
- [ ] Implement frame correlation and browser fixtures.

## Current projection path

```txt
unconstrained lobbyPlayers
  -> LobbyScreen renders players.length
  -> Start run maps all members into the snapshot
  -> render world creates/updates all actors
  -> minimap and HUD project the same successor state
  -> no capacity revision or frame receipt
```

## Missing evidence

```txt
room generation
roster revision
capacity revision
capacity fingerprint
committed member count
maxPlayers
remaining slots
full-state result
rendered actor count
first matching lobby frame
first matching gameplay frame
```

## Required frame receipt

```txt
CapacityVisibleFrameReceipt {
  frameId
  roomGeneration
  rosterRevision
  capacityRevision
  capacityFingerprint
  committedMemberCount
  maxPlayers
  renderedLobbyCount
  renderedActorCount
  surface
  presentedAtMs
}
```

## Acceptance conditions

```txt
renderedLobbyCount == committedMemberCount
renderedActorCount == committedMemberCount for active gameplay
committedMemberCount <= maxPlayers
receipt capacity fingerprint matches the admitted roster
rejected fifth-member requests produce no successor visible frame
```

## Validation boundary

No renderer or UI source changed. No visual capture, frame receipt or browser capacity fixture was run.