# Connection Candidate to Roster Loop

**Timestamp:** `2026-07-17T20-41-29-04-00`

## Current loop

```txt
remote client creates DataConnection
  -> host receives candidate
  -> host emits connection-open immediately
  -> GameShell creates or reuses guest player
  -> guest enters room roster
  -> host broadcasts player-joined
  -> host may start deterministic game bootstrap with that roster
```

## Gameplay risk

A pending or failed connection can become a gameplay participant before the data channel is actually open. The accepted roster is later used by `createInitialGameState()`, so a premature guest can influence player count, spawn state, loading/start policy and authoritative snapshot membership.

This does not prove a player-facing incident. It proves that candidate observation, transport readiness and gameplay membership are not separate settlements.

## Required loop

```txt
candidate observed
  -> wait for mode-correct open evidence
  -> settle accepted/rejected/timed-out/cancelled/stale
  -> commit accepted player membership
  -> bootstrap only from accepted roster revision
```

## Required results

- `ConnectionOpenAdmissionResult`
- `ConnectionOpenSettlementResult`
- `LobbyMembershipCommitResult`
- `StartRosterRevisionResult`
- `FirstAcceptedPeerMessageAck`
- `FirstAcceptedGuestLobbyFrameAck`

## Claim boundary

No gameplay or roster behavior was changed. Browser failure and delayed-open fixtures remain unavailable.