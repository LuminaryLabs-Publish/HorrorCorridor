# HorrorCorridor Interaction Audit: Add Guest and Ready Roster Command Map

**Timestamp:** `2026-07-11T05-28-29-04-00`

## Current browser paths

```txt
host secondary action
  -> addGuestPlaceholder()
  -> makePlayer(random guest-player id, non-host, unready)
  -> default connectionState=connected
  -> upsertLobbyPlayer()
  -> no command envelope
  -> no admission result

client primary or secondary action
  -> toggleReady()
  -> find local player by peerIdentity.playerId
  -> invert ready locally
  -> upsertLobbyPlayer()
  -> no host request
  -> no authoritative publication

peer connection open
  -> search by remotePeerId
  -> create new guest when no exact id exists
  -> no slot-claim operation
```

## Missing commands

```txt
ReserveSlotCommand
ClaimSlotCommand
JoinMemberCommand
SetReadyCommand
DisconnectMemberCommand
RemoveSlotCommand
SealRosterCommand
```

Each command requires:

```txt
requestId
roomId
actorPlayerId
actorPeerId
expectedRosterRevision
memberId or slotId
desired state
```

## Required results

```txt
accepted
rejected
no-change
reason
beforeRevision
afterRevision
rosterFingerprint
changedMember
```

## Admission rules

- Only the host may create or remove reserved slots.
- Only a transport-authenticated peer may claim a slot or join as a peer member.
- A peer cannot claim multiple members.
- A member cannot bind multiple peers.
- Ready mutation is admitted by the host and published to all peers.
- Stale revisions reject without local optimistic authority unless a reconciliation policy is explicit.
- UI buttons derive enabled/disabled state from the latest authority observation.

## Main finding

The UI currently treats a convenience placeholder action as if it created a connected participant. Because there is no command/result boundary, the interaction layer cannot tell the user whether it reserved a slot, admitted a player, changed readiness, or failed.