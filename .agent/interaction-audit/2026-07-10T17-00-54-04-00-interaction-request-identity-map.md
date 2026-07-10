# Interaction Request Identity Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T17-00-54-04-00`

## Action derivation

GameCanvas derives one of:

```txt
pickup-cube
drop-cube
place-cube-at-anomaly
remove-cube-from-anomaly
```

The network contract also allows:

```txt
request-sync
toggle-ready
cancel
```

## Identity map

```txt
local interaction
  current: no requestId
  required: generated local requestId

client TRY_INTERACT
  current: builder supports requestId but caller omits it
  required: generated requestId registered as pending before send

host consumption
  current: inbound requestId not projected into result or publication
  required: preserve requestId through result, decision, ack, and optional SYNC

client completion
  current: snapshot arrival only
  required: resolve pending request from acknowledgement
```

## Reason map

Acknowledgements must distinguish accepted, rejected, no-op, skipped, recovery, duplicate, unsupported, and timed-out outcomes. Unchanged `GameState` is not an acknowledgement reason.
