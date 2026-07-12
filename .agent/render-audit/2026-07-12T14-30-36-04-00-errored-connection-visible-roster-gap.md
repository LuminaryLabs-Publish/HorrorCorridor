# Render Audit: Errored Connection Visible Roster Gap

**Timestamp:** `2026-07-12T14-30-36-04-00`

## Summary

The lobby renders `players` directly and labels each row only as ready or waiting. A connection-level error does not remove or mark the associated player because `peer/error` cannot identify the connection and `GameShell` does not reconcile membership from that event.

## Plan ledger

**Goal:** make every visible connection and roster state cite the accepted retirement and roster revisions that produced it.

- [x] Trace DataConnection error publication.
- [x] Trace session and room mutation paths.
- [x] Trace LobbyScreen player projection.
- [x] Identify missing connection-error status per member.
- [x] Define retirement-to-frame provenance.
- [ ] Implement and prove visible reconciliation.

## Current render path

```txt
sessionStore room/lobbyPlayers
  -> GameShell currentPlayers
  -> LobbyScreen players prop
  -> one row per player
  -> ready or waiting badge
```

`LobbyScreen` does not receive connection generation, error state, retirement revision, roster revision or a stale-member marker.

## Current failure path

```txt
admitted or prematurely admitted guest
  -> DataConnection emits error without close
  -> adapter emits peer/error
  -> GameShell performs no member mutation
  -> lobbyPlayers and room.players retain guest
  -> LobbyScreen continues to draw guest as waiting
  -> host can still see Start run as enabled
```

The header may display a transport-wide error status on the client, but the player rows remain unchanged. On the host, the connection-level error does not necessarily update the global status at all.

## Missing frame provenance

```txt
errorId
errorScope
connectionId
connectionGeneration
retirementRevision
rosterRevision
rosterFingerprint
startEligibilityRevision
renderFrameId
firstErrorStateFrameAck
```

## Required visible-state contract

```txt
accepted terminal connection error
  -> ConnectionRetirementResult
  -> RosterReconciliationResult
  -> committed session projection
  -> visible lobby frame
  -> FirstErrorStateFrameAck {
       errorId,
       connectionGeneration,
       retirementRevision,
       rosterRevision,
       rosterFingerprint,
       renderFrameId
     }
```

A stale or rejected error must produce no visible roster mutation. A terminal accepted error must not leave the member visibly connected or eligible for bootstrap unless a named disconnected/grace policy explicitly preserves the slot and projects that state.

## Acceptance boundary

No claim is made that visible player membership, connection status or Start-run eligibility currently reflects error-only terminal paths.