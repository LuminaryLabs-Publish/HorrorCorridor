# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-17T20-41-29-04-00`  
**Status:** `peer-data-connection-open-admission-settlement-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with deterministic solo/host/client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, client prediction, cube/anomaly interactions, ooze, Three.js rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

The current audit isolates DataConnection open admission. The real PeerJS host path attaches an `open` listener and checks `connection.open`, but then calls its one-shot `emitConnectionOpen()` function unconditionally. A pending channel can therefore enter the room roster and visible lobby before actual open evidence exists, while the later real `open` callback is suppressed by the guard.

## Plan ledger

**Goal:** separate connection-candidate observation, mode-correct open evidence, roster membership and visible lobby proof.

- [x] Compare all 11 Publish repositories and ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm no new, missing, root-agent-missing, undocumented or runtime-ahead priority case.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Preserve the complete 29-kit and two-adapter service inventory.
- [x] Confirm the host real-transport path emits connection-open unconditionally.
- [x] Confirm the client real-transport path waits for actual/already-open evidence.
- [x] Confirm `GameShell` turns the host event into roster membership and a joined broadcast.
- [x] Add and route the timestamped connection-open audit family.
- [ ] Implement connection-open admission, settlement, timeout and stale-event rejection.
- [ ] Execute delayed-open, close-before-open, error-before-open, replacement and deployed-origin fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-17T20-41-29-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-17T20-41-29-04-00-data-connection-open-admission-dsk-map.md`
7. `.agent/render-audit/2026-07-17T20-41-29-04-00-premature-guest-lobby-frame-gap.md`
8. `.agent/gameplay-audit/2026-07-17T20-41-29-04-00-connection-candidate-roster-loop.md`
9. `.agent/interaction-audit/2026-07-17T20-41-29-04-00-connection-open-command-result-map.md`
10. `.agent/transport-connection-audit/2026-07-17T20-41-29-04-00-peer-data-connection-open-contract.md`
11. `.agent/deploy-audit/2026-07-17T20-41-29-04-00-connection-open-browser-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-17T20-41-29-04-00-oldest-selection-connection-open-reconciliation.md`

## Current authority boundary

```txt
corridor-peer-data-connection-open-admission-settlement-authority-domain
```

## Required transaction

```txt
ConnectionCandidateObserved
  -> ConnectionOpenAdmissionCommand
  -> ConnectionOpenAdmissionResult

actual real open or admitted local-bridge readiness
  -> ConnectionOpenSettlementCommand
  -> ConnectionOpenSettlementResult

opened settlement
  -> LobbyMembershipCommitCommand
  -> LobbyMembershipCommitResult
  -> FirstAcceptedPeerMessageAck
  -> FirstAcceptedGuestLobbyFrameAck
```

## Validation boundary

Documentation only. No runtime fix, connection timeout, accepted-message proof, guest-frame proof, artifact parity, deployed parity or production readiness is claimed.