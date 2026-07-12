# Accepted Room Identity Visible-Frame Gap

**Timestamp:** `2026-07-12T18-38-51-04-00`

## Summary

The lobby can render a join code before the host owns the matching PeerJS ID. No frame receipt proves that the visible code, session room, transport generation, and accepted host identity are the same committed manifest.

## Plan ledger

**Goal:** require every visible hosting state to cite one accepted room-identity generation and fingerprint.

- [x] Trace host setup through lobby projection.
- [x] Confirm room and overlay are committed before `peer/open`.
- [x] Confirm no visible-frame receipt exists.
- [ ] Implement accepted-manifest render admission and browser fixtures.

## Current render path

```txt
makeJoinCode()
  -> setRoom(roomState)
  -> setLobbyPlayers(...)
  -> setScreen(LOBBY_HOST)
  -> setOverlay("Hosting room CODE")
  -> render lobby
  -> createHost(peerId = CODE)
  -> later peer/open or peer/error
```

## Gap

```txt
visible join code: available
accepted PeerJS ownership evidence: not required
identity generation in render snapshot: absent
manifest fingerprint in UI: absent
Pending versus Accepted state: not explicit
failed candidate rollback frame: absent
first accepted-hosting frame receipt: absent
```

## Required render contract

```txt
LobbyRenderInput
  -> roomIdentityResult
  -> accepted manifest generation and fingerprint
  -> transport reachability state
  -> render Pending, Accepted, or Failed
  -> commit frame receipt only when rendered identity matches current manifest
```

## Required proof

```txt
candidate pending is not displayed as joinable
collision never leaves failed code visible as accepted
retry changes generation and code atomically
late predecessor open cannot alter successor frame
accepted PeerJS and local-only modes disclose their reachability class
frame receipt cites manifest fingerprint and render revision
```

## Validation boundary

No rendering code or browser fixture changed. Visible-hosting provenance remains unproven.