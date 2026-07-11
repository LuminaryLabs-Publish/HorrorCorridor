# HorrorCorridor Roster Authority Audit: Peer and Placeholder Binding Contract

**Timestamp:** `2026-07-11T05-28-29-04-00`

## Goal

Define the authoritative membership contract that prevents reserved lobby slots from masquerading as connected gameplay participants.

## Current defect

```txt
Add guest
  -> creates guest-player-* row
  -> connectionState defaults to connected
  -> no peer owns the row

peer connection opens
  -> lookup by remotePeerId misses guest-player-* row
  -> creates a second real-peer row

peer connection closes
  -> removes remotePeerId row
  -> reserved-looking guest row remains connected

start bootstrap
  -> consumes every row
  -> placeholder becomes an active replicated player
```

## Required member kinds

```txt
host-local
  local host identity
  no remote peer claim required
  may be bootstrap-admitted

peer
  exactly one authenticated peer binding
  may be bootstrap-admitted when connected and policy-approved

reserved-slot
  lobby capacity reservation only
  never connected
  never ready
  never bootstrap-admitted until explicitly claimed
```

## Required invariants

1. `playerId` is unique within the room.
2. `peerId` is unique within the room when present.
3. A peer member owns exactly one peer and one player identity.
4. A reserved slot owns no peer or player command authority.
5. Slot claim is atomic and preserves either the slot identity or a declared replacement mapping.
6. Disconnect changes the bound peer member, not an unrelated reserved slot.
7. Roster revision increments once per accepted semantic mutation.
8. Roster fingerprint is stable for equivalent ordered member records.
9. Bootstrap consumes only records with `admittedForBootstrap: true`.
10. All command and result rows are detached, bounded and JSON-safe.

## Required command results

```txt
ReserveSlotResult
ClaimSlotResult
JoinMemberResult
SetReadyResult
DisconnectMemberResult
RemoveMemberResult
SealRosterResult
```

Each result includes:

```txt
requestId
accepted | rejected | no-change
reason
roomId
memberId
slotId
peerId
beforeRevision
afterRevision
rosterFingerprint
```

## Stable reasons

```txt
accepted
already-reserved
already-bound
duplicate-peer-id
duplicate-player-id
unknown-slot
slot-not-reserved
slot-already-claimed
actor-not-host
sender-not-bound
stale-roster-revision
member-disconnected
member-not-bootstrap-eligible
no-semantic-change
```

## Proof gate

```txt
reserved slot cannot report connected
reserved slot cannot become ready
reserved slot cannot enter bootstrap
one peer claims at most one slot
one claimed slot creates exactly one peer member
peer close updates exactly the bound member
same command replay returns no-change without revision drift
sealed roster fingerprint matches bootstrap input
```