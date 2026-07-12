# Advertised Room and Host-Ownership Render Gap

**Timestamp:** `2026-07-12T18-31-01-04-00`

## Summary

The host lobby becomes visible before the requested PeerJS peer ID is admitted. The header and overlay can present a join code while host identity is still opening or has failed.

## Plan ledger

**Goal:** allow a visible `Hosting room` claim only after the matching room-identity generation owns its transport identity.

- [x] Trace join code into room, overlay and header projection.
- [x] Trace PeerJS open/error events.
- [x] Identify missing visible provenance.
- [ ] Bind lobby projection to an accepted identity manifest.
- [ ] Add first-hosting-frame acknowledgement.

## Current path

```txt
enterHostLobby
  -> set room and peer identity
  -> set screen LOBBY_HOST
  -> show `Hosting room <code>`
  -> mark networking readiness true
  -> create host transport
  -> wait for peer/open or peer/error
```

## Gap

The visible room code does not carry:

```txt
room identity generation
join-code reservation result
PeerJS ownership result
transport mode revision
host identity fingerprint
first valid-hosting frame receipt
```

A generic peer error does not automatically remove or replace the advertised code.

## Required render contract

```txt
HostIdentityResult.Accepted
  -> commit lobby projection descriptor
  -> render room code with identity generation and transport mode
  -> publish FirstHostingStateFrameAck

Pending or Failed
  -> show explicit pending/error state
  -> do not label the room as joinable
```

## Validation boundary

No browser or screenshot fixture was run. This is a source-backed projection gap, not a claim that a collision occurred in production.