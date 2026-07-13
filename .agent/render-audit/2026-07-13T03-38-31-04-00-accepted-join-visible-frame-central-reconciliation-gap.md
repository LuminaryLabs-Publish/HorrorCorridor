# Accepted Join Visible-Frame Central Reconciliation Gap

**Timestamp:** `2026-07-13T03-38-31-04-00`

## Summary

The client lobby can render an accepted-looking room before the host is proven or the player is admitted. Presentation carries no join-attempt identity, canonical room revision, roster revision or frame acknowledgement.

## Plan ledger

**Goal:** require lobby presentation to distinguish pending from accepted state and prove the first frame derived from one accepted join result.

- [x] Trace provisional lobby projection.
- [x] Identify missing temporal and authority evidence.
- [x] Define the accepted-frame receipt.
- [ ] Implement and test the presentation contract.

## Current visible path

```txt
enterClientLobby()
  -> setRoom(provisionalRoom)
  -> setLobbyPlayers([client])
  -> setScreen(LOBBY_CLIENT)
  -> setOverlay(Joined room <code>)
  -> setReadiness(networking: true)
  -> lobby renders before HostJoinAck exists
```

## Missing evidence

```txt
JoinAttemptId
JoinAttemptGeneration
JoinResult status
canonical RoomManifestRevision
RosterRevision
ConnectionGeneration
accepted-at timestamp
render revision
first accepted visible-frame acknowledgement
```

## Required presentation states

```txt
Idle
Validating
Connecting
AwaitingHost
AwaitingAdmission
Accepted
Rejected
TimedOut
Cancelled
Failed
```

Only `Accepted` may project canonical room membership or the phrase `Joined room`.

## Required visible-frame receipt

```txt
JoinedLobbyFrameAck {
  joinAttemptId
  joinAttemptGeneration
  joinResultRevision
  roomId
  roomManifestRevision
  rosterRevision
  connectionGeneration
  renderRevision
  presentedAtMs
}
```

The receipt must reference the same accepted manifest installed in session state.

## Failure containment

```txt
non-accepted result
  -> no canonical room or roster projection
  -> no accepted networking readiness
  -> no Joined room copy
  -> explicit reason and retry path

stale predecessor frame
  -> rejected by join-attempt generation
```

## Required fixtures

```txt
pending state never says Joined room
unknown room reaches TimedOut or RoomUnavailable
local bridge without host never reaches Accepted
accepted result renders canonical host room and roster
cancelled attempt cannot later render accepted state
first accepted frame cites matching attempt and room revisions
```

## Validation boundary

No browser or deployed-frame fixture was run. The current audit proves only that visible state is committed before acknowledgement and lacks provenance.