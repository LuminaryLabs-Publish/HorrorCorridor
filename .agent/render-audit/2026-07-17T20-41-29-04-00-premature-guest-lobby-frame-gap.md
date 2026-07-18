# Premature Guest Lobby Frame Gap

**Timestamp:** `2026-07-17T20-41-29-04-00`

## Visible path

```txt
host peer receives DataConnection candidate
  -> peer/connection-open event
  -> GameShell upserts guest
  -> room.players changes
  -> LobbyScreen renders guest row
```

## Gap

The host adapter can publish `peer/connection-open` before the real DataConnection reports `open`. The visible lobby can therefore show an admitted guest without a connection-open result, accepted generation, first message acknowledgement or send-readiness proof.

The later actual `open` event cannot repair the evidence chain because `connectionOpenEmitted` has already been set.

## Missing frame evidence

```txt
transport mode
connection ID and generation
candidate-observed timestamp
actual-open timestamp
admission result
roster commit revision
first accepted peer message
first lobby frame containing the guest
```

## Required proof

```txt
actual open evidence
  -> accepted connection generation
  -> roster commit
  -> first accepted message acknowledgement
  -> FirstAcceptedGuestLobbyFrameAck
```

## Claim boundary

No incorrect lobby frame was captured. The source-backed gap is the absence of connection-open proof behind the visible guest projection.