# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Updated:** `2026-07-17T09-17-19-04-00`  
**Status:** `peer-signalling-reconnect-admission-settlement-authority-audited`

## Summary

HorrorCorridor is a cooperative procedural first-person maze with deterministic solo/host/client sessions, PeerJS and BroadcastChannel transport, authoritative snapshots, client prediction, cube/anomaly interactions, ooze, Three.js rendering, post-processing, a Canvas2D minimap and browser-proof tooling.

The current audit isolates PeerJS signalling recovery. Host and client adapters publish `reconnecting` when the signalling connection is lost, but neither invokes nor exposes an explicit reconnect attempt. The UI/session status can therefore express recovery intent without attempt identity, retry policy, settlement, recovered-message proof or a matching recovered remote-player frame.

## Plan ledger

**Goal:** make signalling loss, active data-channel continuity, bounded reconnect attempts, explicit terminal closure and recovered-frame proof one authoritative transaction.

- [x] Compare all 11 Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented, root-agent-missing or runtime-ahead priority case.
- [x] Select only HorrorCorridor under the oldest synchronized rule.
- [x] Preserve the complete 29-kit and two-adapter inventory.
- [x] Add the timestamped peer signalling reconnect audit family.
- [x] Refresh root docs and the machine registry.
- [ ] Implement reconnect admission, attempt identity, bounded retry and settlement.
- [ ] Execute signalling-loss, explicit-close, recovery, build and deployed-origin fixtures.

## Read first

1. `.agent/current-audit.md`
2. `.agent/next-steps.md`
3. `.agent/known-gaps.md`
4. `.agent/validation.md`
5. `.agent/trackers/2026-07-17T09-17-19-04-00/project-breakdown.md`
6. `.agent/architecture-audit/2026-07-17T09-17-19-04-00-peer-signalling-reconnect-dsk-map.md`
7. `.agent/render-audit/2026-07-17T09-17-19-04-00-reconnecting-status-without-recovered-frame-gap.md`
8. `.agent/gameplay-audit/2026-07-17T09-17-19-04-00-signalling-disconnect-session-loop.md`
9. `.agent/interaction-audit/2026-07-17T09-17-19-04-00-reconnect-command-result-map.md`
10. `.agent/transport-reconnect-audit/2026-07-17T09-17-19-04-00-peer-signalling-recovery-contract.md`
11. `.agent/deploy-audit/2026-07-17T09-17-19-04-00-signalling-reconnect-browser-fixture-gate.md`
12. `.agent/central-sync-audit/2026-07-17T09-17-19-04-00-oldest-selection-peer-reconnect-reconciliation.md`

## Current authority boundary

```txt
corridor-peer-signalling-reconnect-admission-settlement-authority-domain
```

## Required transaction

```txt
SignallingDisconnectCommand
  -> classify involuntary loss versus explicit closure
  -> observe existing DataConnection liveness
  -> publish SignallingDisconnectResult

ReconnectAdmissionCommand
  -> allocate attempt identity and generation
  -> apply bounded retry, backoff, deadline and cancellation
  -> invoke one explicit PeerJS reconnect attempt
  -> publish ReconnectAdmissionResult

ReconnectSettlementCommand
  -> admit matching open, error or close evidence
  -> reject stale results
  -> publish ReconnectSettlementResult
  -> publish FirstRecoveredMessageAck
  -> publish FirstRecoveredRemotePlayerFrameAck
```

## Validation boundary

Documentation only. No signalling recovery, retry policy, session continuity, first recovered frame, artifact parity, deployed parity or production readiness is claimed.