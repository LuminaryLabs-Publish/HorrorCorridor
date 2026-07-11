# Interaction Audit: Publication Plan and Delivery Result Map

**Timestamp:** `2026-07-11T18-11-21-04-00`

## Summary

The publication call currently has no command/result boundary. A reason string enters `publishAuthoritativeState()`, but no publication ID, payload result, peer admission result or delivery commit result leaves it.

## Plan ledger

**Goal:** define typed commands and results for publication preparation, peer admission and delivery commitment.

- [x] Map current publication input.
- [x] Map current aggregate transport output.
- [x] Identify missing identities and result stages.
- [x] Define target command/result flow.
- [ ] Implement after fixed simulation and snapshot identity exist.

## Current map

```txt
reason
  -> mutate tick/timestamp
  -> build snapshot
  -> build SYNC
  -> broadcast
  -> number
  -> number discarded
```

## Required command/result map

```txt
SnapshotPublicationCommand
  publication request ID
  run and epoch
  committed state revision
  reason and priority
  requested deadline

SnapshotPayloadResult
  publication ID
  schema revision
  bytes
  fingerprint
  full/delta mode
  baseline revision

PeerSendAdmissionResult
  connection, peer and actor identity
  admitted/deferred/skipped/rejected
  pending bytes and queue state
  reason

PeerDeliveryResult
  sent/closed/failed/timed-out/backpressured
  attempted bytes
  duration
  exception classification

SnapshotDeliveryCommitResult
  intended peer set
  complete peer row set
  partial-success classification
  retry/coalesce/isolate actions
  publication and state revision
```

## Required interaction guarantees

```txt
one command produces one publication identity
one intended peer produces one admission and one terminal result
all failures are classified
partial success is explicit
stale or superseded commands cannot send after retirement
client/frame acknowledgements reference the committed publication identity
```
