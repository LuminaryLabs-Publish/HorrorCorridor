# Correlated Start Commit Contract

**Timestamp:** `2026-07-11T11-39-11-04-00`

## Summary

START_GAME and initial SYNC describe one logical start but are independently constructed, independently broadcast and independently applied. Neither carries a mandatory shared transaction identity, run session, epoch, roster fingerprint or client acknowledgement.

## Plan ledger

**Goal:** define the minimum distributed commit contract that prevents half-started peers, stale-run activation and host/client roster divergence.

- [x] Compare START_GAME and SYNC payloads.
- [x] Trace host publication order and ignored send results.
- [x] Trace client application behavior.
- [x] Define correlation, acknowledgement and retry requirements.
- [ ] Implement protocol version upgrade and fixtures.

## Existing message pair

```txt
START_GAME
  hostPeerId
  room
  hostPlayer
  seed
  startedAtMs
  maxPlayers

SYNC
  snapshot
  room
  reason
  authoritativeTick
```

Shared envelope fields exist, but `requestId` is optional and the start path does not supply it. There is no mandatory logical start identity.

## Half-commit states

### START_GAME only

```txt
client room becomes active
client roster changes
host identity may update
client screen remains lobby
snapshot remains absent or old
```

### SYNC only

```txt
client accepts room and snapshot
client enters PLAYING
client readiness is marked true
no correlated START_GAME admission is required
```

### Host publication failure

```txt
host already entered PLAYING
broadcast count can be zero
result is ignored
no rollback or degraded policy is recorded
```

## Required start envelope identity

```txt
protocolVersion
startTransactionId
commandId
runSessionId
sessionEpoch
roomId
roomRevision
rosterRevision
rosterFingerprint
bootstrapFingerprint
seed
hostActorId
hostPeerId
issuedAtMs
expiresAtMs
```

## Publication options

### Preferred

Publish one `START_COMMIT` payload containing the complete room, sealed roster and initial snapshot.

### Compatible alternative

Retain START_GAME and SYNC, but require identical correlation fields and buffer both until the complete pair validates. Neither message alone may commit gameplay.

## Client admission result

```txt
ClientStartAdmissionResult {
  status: accepted | rejected | duplicate | stale | incomplete | conflict
  startTransactionId
  runSessionId
  sessionEpoch
  peerId
  rosterFingerprint
  bootstrapFingerprint
  reason
  committedAtMs
}
```

## Acknowledgement policy

The host must record per-peer send and acknowledgement rows. The product must explicitly choose one policy:

```txt
all admitted peers acknowledge before host gameplay
quorum acknowledges before host gameplay
host starts immediately but marks missing peers as not admitted
```

The current implicit policy is not acceptable because host state reports a complete start without recording who received it.

## Retry and dedupe

Retries must preserve `startTransactionId`. Repeated complete payloads should return duplicate/no-change after the first accepted commit. Conflicting payloads with the same transaction ID must be rejected and journaled.

## Epoch rule

Every accepted new run advances `sessionEpoch`. Messages from older epochs must be rejected before room, snapshot, UI, readiness or rendering mutation.
