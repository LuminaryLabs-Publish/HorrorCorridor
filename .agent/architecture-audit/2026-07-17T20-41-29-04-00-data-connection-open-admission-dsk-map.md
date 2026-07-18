# DataConnection Open Admission DSK Map

**Timestamp:** `2026-07-17T20-41-29-04-00`

## Current ownership

```txt
peer-host-transport-kit
  -> receives PeerJS DataConnection
  -> stores connection record
  -> attaches open/data/close/error listeners
  -> emits peer/connection-open

peer-event-bus-kit
  -> publishes transport evidence

corridor-session-domain-kit
  -> consumes connection-open as accepted membership
  -> updates room and roster

lobby-screen-presentation-kit
  -> projects roster
```

## Source-backed gap

The real PeerJS host path invokes its one-shot `emitConnectionOpen()` callback even when `connection.open` is false. The callback then suppresses the later actual open event. Admission, roster mutation and visible lobby projection therefore share no explicit result that proves the channel was open.

## Proposed parent domain

`corridor-peer-data-connection-open-admission-settlement-authority-domain`

## Proposed child kits

```txt
connection-candidate-identity-kit
connection-generation-kit
transport-mode-open-policy-kit
real-data-connection-open-observation-kit
local-bridge-ready-observation-kit
connection-open-admission-kit
connection-open-settlement-kit
connection-open-timeout-kit
connection-open-cancellation-kit
stale-connection-event-rejection-kit
connection-error-close-arbitration-kit
accepted-connection-roster-commit-kit
player-joined-publication-kit
connection-send-readiness-kit
first-accepted-peer-message-ack-kit
first-accepted-guest-lobby-frame-ack-kit
pending-connection-diagnostic-kit
peer-open-browser-fixture-kit
source-build-deployed-connection-parity-kit
```

## Command/result boundary

```txt
ConnectionCandidateObserved
  -> ConnectionOpenAdmissionCommand
  -> ConnectionOpenAdmissionResult

ConnectionOpenEvidence
  -> ConnectionOpenSettlementCommand
  -> ConnectionOpenSettlementResult

accepted result
  -> LobbyMembershipCommitCommand
  -> LobbyMembershipCommitResult
  -> FirstAcceptedPeerMessageAck
  -> FirstAcceptedGuestLobbyFrameAck
```

## Invariants

- Real PeerJS connections require actual `open` evidence.
- Local bridge readiness remains explicitly mode-owned.
- One connection generation settles once.
- Pending, closed, errored, replaced and stale candidates cannot enter the roster.
- `send` readiness and membership readiness cite the same accepted generation.
- A visible guest row cites the accepted membership commit.

## Claim boundary

This is proposed architecture. No runtime DSK, command, result, timeout or frame acknowledgement was implemented.