# Request Acknowledgement DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T17-00-54-04-00`

## Current architecture

```txt
input
  -> action derivation in GameCanvas
  -> local applyNetworkInteractionRequest
     or createInteractionRequestMessage
  -> host applyNetworkInteractionRequest
  -> publishAuthoritativeState
  -> createFullSyncMessage
  -> replicated snapshot
```

## Existing capability

```txt
ProtocolEnvelope.requestId?: string
InteractionRequestMessageInput.requestId?: string
FullSyncMessageInput.requestId?: string
```

## Missing ownership

```txt
request identity generation
pending request registration
authority result envelope
publish decision envelope
authoritative acknowledgement
duplicate request handling
timeout and expiry handling
request-to-snapshot correlation
```

## Proposed DSK composition

```txt
request-identity-kit
  -> command-envelope-contract-kit
  -> authority-command-consumer-kit
  -> publish-decision-contract-kit
  -> command-ack-protocol-kit
  -> pending-command-ledger-kit
  -> request-deduplication-kit
  -> runtime-debug-request-projection-kit
  -> request-ack-fixture-kit
```

## Contract rule

Acknowledgement is not equivalent to publication.

```txt
accepted + changed
  -> ack
  -> optional published snapshot with authoritative tick

rejected / skipped / no-op
  -> ack
  -> normally no new snapshot

recovery
  -> ack
  -> optional recovery snapshot

cadence publication
  -> snapshot
  -> no command request id
```

## Compatibility boundary

Keep existing version-1 protocol consumers working. Add request identity propagation first. If a dedicated command acknowledgement message is added, make it additive and retain SYNC for state replication.
