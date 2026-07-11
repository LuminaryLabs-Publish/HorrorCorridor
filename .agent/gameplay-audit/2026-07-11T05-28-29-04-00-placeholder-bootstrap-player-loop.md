# HorrorCorridor Gameplay Audit: Placeholder Bootstrap Player Loop

**Timestamp:** `2026-07-11T05-28-29-04-00`

## Current loop

```txt
host clicks Add guest
  -> synthetic LobbyPlayer is created
  -> row is marked connected by default
  -> no network connection owns the id
  -> host may repeat and add more synthetic rows
  -> startPlay passes the mutable roster to bootstrap
  -> bootstrap maps every row into active players
  -> synthetic players spawn beside the local player
  -> they never publish movement or interaction commands
  -> they still occupy replicated player identity and render capacity
```

## Gameplay consequences

```txt
active player count can exceed real participant count
spawn offsets and player colors are consumed by non-participants
cube owner and held-player identity can reference an unowned player id
host readiness policy cannot distinguish slot reservations from participants
peer arrival creates another player instead of claiming the existing slot
peer departure leaves synthetic rows untouched
restart or re-entry can carry a polluted roster into another run
```

## Required gameplay policy

- `host-local` and `peer` members may become active players.
- `reserved-slot` members remain lobby-only until claimed.
- A start request seals only connected, admitted, uniquely bound members.
- Bootstrap returns a typed result containing admitted and rejected member rows.
- Rejected roster rows do not consume spawn offsets, colors or replicated IDs.
- Run identity retains the exact roster revision and fingerprint used at bootstrap.

## Required result

```txt
BootstrapRosterResult
  accepted
  rosterRevision
  rosterFingerprint
  admittedMembers[]
  rejectedMembers[]
  playerDescriptors[]
  reasonsByMemberId
```

## Proof matrix

```txt
host only -> one active player
host plus reserved slot -> one active player
host plus connected ready peer -> two active players
reserved slot claimed by peer -> two active players with one stable member identity
same peer connected twice -> one accepted member and one duplicate rejection
peer closes before start -> peer excluded or start rejected by declared policy
```