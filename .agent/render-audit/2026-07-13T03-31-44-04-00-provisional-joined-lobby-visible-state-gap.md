# Provisional Joined Lobby Visible-State Gap

**Timestamp:** `2026-07-13T03-31-44-04-00`

## Summary

The client UI presents a room and a successful-sounding join state before any host acknowledgement proves that the room exists or that the client was admitted.

## Plan ledger

**Goal:** ensure visible client-lobby state cites an accepted join result rather than a provisional request.

- [x] Trace join-form submission into UI and session stores.
- [x] Trace connection status into lobby badges.
- [x] Identify missing join-attempt and visible-frame provenance.
- [ ] Add accepted, pending, rejected and timed-out presentation states.

## Current projection path

```txt
enterClientLobby()
  -> setRoom(provisionalRoom)
  -> setLobbyPlayers([provisionalClient])
  -> setScreen(LOBBY_CLIENT)
  -> overlay message: Joined room <code>
  -> set networking readiness true
  -> create transport and connect

LobbyScreen
  -> Room: requested code
  -> Status: shared transport status
  -> Players: provisional local roster
  -> Phase: lobby
```

The screen has no field for:

```txt
JoinAttemptId
join-attempt phase
host-presence proof
room-admission result
canonical room revision
canonical roster revision
rejection or timeout reason
first accepted-frame acknowledgement
```

## Visible contradiction

```txt
requested room does not exist
  -> requested code still appears as Room
  -> provisional client still appears in Players
  -> overlay already says Joined room
  -> local bridge may show Status: connected
  -> no host has accepted the client
```

## Required presentation contract

```txt
PendingJoinProjection
  cites JoinAttemptId and generation
  displays connecting without room-membership claims

AcceptedJoinProjection
  cites JoinResult.Accepted
  cites canonical room and roster revisions
  displays joined lobby only after atomic session commit

RejectedJoinProjection
  preserves zero canonical room mutation
  displays typed reason and retry action

FirstJoinedLobbyFrameAck
  cites JoinAttemptId
  cites canonical room manifest fingerprint
  cites roster revision
  cites rendered frame identity
```

## Withheld claim

No claim is made that the current client lobby proves room existence, host presence, member admission or transport parity.
