# HorrorCorridor Request Acknowledgement and Snapshot Acceptance Map

**Timestamp:** `2026-07-10T18-31-21-04-00`

## Current interaction paths

```txt
solo/host:
  input -> derive action -> apply rule -> optional publication

client:
  input -> derive action -> TRY_INTERACT -> host rule -> SYNC -> unconditional client commit
```

## Correlation risk

The planned request-id and acknowledgement layer needs to know whether a snapshot was actually accepted. Today, a client could receive a request-linked `SYNC` that is stale, from the wrong room, or inconsistent, and there is no result distinguishing message receipt from authoritative commit.

## Required join model

```txt
RequestRecord
  requestId
  sentAtMs
  action
  source

AuthorityResult
  requestId
  command status
  publish decision

SnapshotAcceptanceResult
  requestId optional
  candidate tick
  accepted tick optional
  accepted / duplicate / rejected
  reason

AcknowledgementRecord
  requestId
  authority result
  snapshot acceptance status when a snapshot exists
  no-publish status when no snapshot exists
```

## Rules

```txt
a rejected snapshot cannot resolve a request as committed
a duplicate accepted fingerprint may resolve idempotently
a conflicting duplicate must not resolve as success
no-publish acknowledgement remains independent of snapshot acceptance
cadence snapshots carry no command request identity
pending requests record accepted authoritative tick only after acceptance
```

## Fixture rows

```txt
accepted request-linked snapshot resolves pending request
stale request-linked snapshot leaves pending request unresolved or explicitly rejected
no-publish authoritative rejection resolves without snapshot tick
duplicate accepted snapshot does not double-resolve
a conflicting duplicate creates an error row
cadence snapshot does not bind to an unrelated request
```

## Finding

Request acknowledgement and snapshot acceptance must be separate typed results joined by request identity. Raw `SYNC` receipt is not sufficient evidence that a command was committed.