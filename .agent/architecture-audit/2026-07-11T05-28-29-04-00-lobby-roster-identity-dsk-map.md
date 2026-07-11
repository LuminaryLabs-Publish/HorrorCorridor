# HorrorCorridor Lobby Roster Identity DSK Map

**Timestamp:** `2026-07-11T05-28-29-04-00`

## Goal

Define the domain boundary that separates real participants, local host identity and reserved lobby slots before readiness or start admission.

## Current ownership

```txt
GameShell
  creates host, client and placeholder LobbyPlayer rows
  receives peer open/close events
  mutates the Zustand roster
  passes the live roster directly to bootstrap

sessionStore
  stores room.players and lobbyPlayers
  upserts and removes by player id
  has no revision, fingerprint or mutation result

createInitialGameState
  maps every input player into an active gameplay player
  cannot distinguish real peers from placeholders
```

## Required composed domain

```txt
horror-corridor-lobby-roster-authority-domain
  -> lobby-member-kind-kit
  -> lobby-peer-binding-kit
  -> lobby-slot-reservation-kit
  -> lobby-member-admission-kit
  -> lobby-member-claim-kit
  -> lobby-member-removal-kit
  -> lobby-roster-revision-kit
  -> lobby-roster-fingerprint-kit
  -> bootstrap-roster-filter-kit
  -> lobby-roster-projection-kit
  -> lobby-roster-authority-ledger-kit
  -> lobby-roster-fixture-kit
```

## Domain record

```txt
LobbyMemberRecord
  memberId
  memberKind
  peerId
  playerId
  slotId
  displayName
  host
  ready
  connectionState
  admittedForBootstrap
  joinedRevision
  lastChangedRevision
```

## Rules

- A real peer maps to exactly one member and one player identity.
- A reserved slot is never marked connected and never enters bootstrap.
- A peer may claim a reserved slot only through an explicit typed transaction.
- Duplicate peer IDs, duplicate player IDs and stale revisions reject without mutation.
- Peer close transitions or removes the bound real member, not an unrelated slot.
- Bootstrap consumes an immutable admitted-roster snapshot and its fingerprint.
- Every mutation returns accepted, rejected or no-change plus a stable reason.
- Browser projection consumes roster observations; it does not infer authority from labels.

## Output services

```txt
create reserved slot
claim reserved slot
bind peer to member
set ready state
remove or disconnect member
seal admitted roster
compute revision and fingerprint
project detached roster observation
publish bounded mutation/result rows
```

## Dependency

This boundary is required before the existing lobby-start transaction can truthfully seal a roster and correlate `START_GAME` with the initial `SYNC`.