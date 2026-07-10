# Local and Host Request Acknowledgement Loop

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T17-00-54-04-00`

## Local path

```txt
interact key
  -> derive action
  -> applyNetworkInteractionRequest
  -> identity comparison
  -> skip or publish
```

Local commands have no stable request identity and no explicit acknowledgement record.

## Client and host path

```txt
client interact key
  -> createInteractionRequestMessage without requestId
  -> host receives TRY_INTERACT
  -> applyNetworkInteractionRequest
  -> publishAuthoritativeState
  -> createFullSyncMessage without requestId
  -> client receives state but no command acknowledgement
```

## Risk after publish-parity correction

If host rejected/no-op commands stop publishing, the client will receive no response unless acknowledgement is separated from state replication.

## Required gameplay contract

```txt
one request id
one authority consumption
one typed result
one publish decision
one acknowledgement
zero or one acknowledged snapshot tick
```

Duplicate delivery must not produce duplicate pickup, placement, removal, victory, or rollback mutations.
