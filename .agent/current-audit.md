# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-17T09-17-19-04-00`  
**Branch:** `main`  
**Status:** `peer-signalling-reconnect-admission-settlement-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is PeerJS signalling recovery: host and client adapters handle `disconnected` by publishing `reconnecting`, while no reconnect command, attempt identity, retry policy, deadline, cancellation, stale-result rejection or recovery settlement exists.

## Plan ledger

**Goal:** make signalling recovery truthful and bounded without treating active DataConnections as failed merely because signalling is unavailable.

- [x] Compare the full Publish inventory, central ledgers and root `.agent` states.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect `createHost.ts`, `createClient.ts`, `peerTypes.ts` and `GameShell.tsx`.
- [x] Preserve all 29 kits, two adapters and offered services.
- [x] Confirm both adapters publish `reconnecting` on signalling disconnection.
- [x] Confirm neither adapter invokes or exposes an explicit reconnect attempt.
- [x] Confirm no attempt/result or recovered-frame proof exists.
- [x] Add and route the timestamped transport-reconnect audit family.
- [ ] Implement reconnect admission and explicit PeerJS recovery.
- [ ] Execute signalling-loss, terminal-close, build and deployed-origin fixtures.

## Current disconnect path

```txt
PeerJS disconnected
  -> currentStatus = reconnecting
  -> peer/status event
  -> GameShell maps to session reconnecting
  -> no peer.reconnect call
  -> no attempt budget, deadline or cancellation
  -> no settled recovered or failed result
  -> no first recovered message/frame acknowledgement
```

## Main finding

PeerJS separates signalling availability from active DataConnections. Existing connections may continue carrying gameplay while the peer cannot accept or create new connections. HorrorCorridor currently projects only one `reconnecting` label and does not own the policy needed to distinguish retained data-path operation, bounded recovery, terminal closure or failed recovery.

An explicit client disconnect also calls `peer.disconnect()` and writes `closed`, while the same PeerJS operation emits `disconnected`. No terminal-intent generation prevents a late status event from competing with closure state.

## Required authority

```txt
corridor-peer-signalling-reconnect-admission-settlement-authority-domain
```

## Required results

```txt
SignallingDisconnectResult
DataChannelLivenessResult
ReconnectAdmissionResult
ReconnectAttemptResult
ReconnectSettlementResult
RecoveredTransportProjectionResult
FirstRecoveredMessageAck
FirstRecoveredRemotePlayerFrameAck
```

## Claim boundary

Documentation only. No signalling-loss incident was reproduced and no reconnect implementation, continuity guarantee, recovered frame or deployment parity is claimed.