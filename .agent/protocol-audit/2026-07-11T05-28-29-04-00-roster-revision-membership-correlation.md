# HorrorCorridor Protocol Audit: Roster Revision and Membership Correlation

**Timestamp:** `2026-07-11T05-28-29-04-00`

## Goal

Define the protocol identities required to carry one authoritative roster from lobby mutation through start bootstrap and client projection.

## Current protocol gap

The runtime has versioned envelopes and optional `requestId`, but lobby membership mutations are mostly local store calls. Lobby events carry room/player data without a roster revision, stable fingerprint, member kind, peer binding or typed result.

```txt
local roster mutation
  -> room.updatedAt changes
  -> optional LOBBY_EVENT broadcast
  -> receiver replaces room and players
  -> no monotonic roster revision
  -> no stale/duplicate/conflict policy
```

## Required envelope fields

```txt
protocolVersion
requestId
roomId
senderId
senderPeerId
rosterRevision
expectedRosterRevision
rosterFingerprint
membershipTransactionId
memberId
memberKind
peerId
slotId
resultStatus
reason
```

## Required messages

```txt
LOBBY_MEMBER_COMMAND
LOBBY_MEMBER_RESULT
LOBBY_ROSTER_SNAPSHOT
LOBBY_ROSTER_RESYNC_REQUEST
START_RUN_REQUEST
START_RUN_RESULT
START_GAME
SYNC
```

## Correlation rules

- Every accepted member mutation produces one new roster revision and fingerprint.
- Every result references its originating request ID and membership transaction ID.
- A client rejects stale roster snapshots and requests resynchronization on a revision gap.
- Duplicate accepted results are idempotent and do not increment revision again.
- `START_RUN_REQUEST` names the expected roster revision and fingerprint.
- `START_GAME` and initial `SYNC` carry the sealed roster revision, fingerprint and run-session identity.
- Bootstrap player descriptors identify the admitted member ID and bound peer ID.
- A client does not enter play until the correlated sealed roster and start transaction are admitted.

## Missing acceptance outcomes

```txt
accepted-next-revision
accepted-idempotent
rejected-stale-revision
rejected-revision-gap
rejected-fingerprint-conflict
rejected-sender-binding
rejected-duplicate-peer
rejected-placeholder-bootstrap
resync-required
```

## Fixture matrix

```txt
revision 4 command accepted -> revision 5 snapshot
revision 4 duplicate replay -> no-change at revision 5
revision 3 stale command -> explicit rejection
revision 7 received after revision 5 -> resync-required
same revision with different fingerprint -> conflict rejection
reserved slot row in sealed start roster -> start rejection
START_GAME and SYNC with different roster fingerprints -> client rejects
```