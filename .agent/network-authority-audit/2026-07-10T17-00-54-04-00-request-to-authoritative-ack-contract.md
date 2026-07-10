# Request to Authoritative Acknowledgement Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T17-00-54-04-00`

## Current network authority behavior

The host receives PLAYER_UPDATE and TRY_INTERACT messages, mutates or preserves `currentGameState`, and publishes a full sync. The inbound request identity is not propagated.

## Proposed authority record

```txt
requestId
source
playerId
action
receivedAtMs
authorityMode
resultStatus
resultReason
semanticChanged
publishDecision
ackStatus
acknowledgedAtMs
publishedTick | null
```

## Publication and acknowledgement matrix

```txt
accepted changed       ack yes  publish yes
accepted unchanged     ack yes  publish policy-driven
rejected               ack yes  publish no
skipped                ack yes  publish no
duplicate              ack yes  publish no
request-sync recovery  ack yes  publish optional recovery
cadence                 no command ack  publish yes
```

## Idempotency rule

The host must retain enough bounded request history to return a duplicate acknowledgement without reapplying the command.

## Transport rule

A SYNC may carry requestId when it is the state acknowledgement for a specific command. Cadence SYNC messages must omit requestId.
