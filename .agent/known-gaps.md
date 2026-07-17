# HorrorCorridor Known Gaps

**Updated:** `2026-07-17T09-17-19-04-00`

## Summary

The highest current undocumented boundary is PeerJS signalling reconnect admission and settlement. Both adapters publish `reconnecting` after signalling loss without starting an explicit attempt or proving recovery.

## Plan ledger

**Goal:** add a bounded signalling-recovery contract without weakening earlier transport-mode, protocol, lifecycle or frame-proof authorities.

- [ ] Signalling-disconnect classification.
- [ ] Active DataConnection liveness result.
- [ ] Reconnect policy and attempt budget.
- [ ] `ReconnectAttemptId` and generation.
- [ ] Explicit PeerJS reconnect adapter.
- [ ] Retry backoff and deadline.
- [ ] Cancellation and terminal-intent arbitration.
- [ ] Stale event/result rejection.
- [ ] Host acceptance-readiness result.
- [ ] Client new-connection-readiness result.
- [ ] Existing-data-channel continuity policy.
- [ ] Explicit disconnect/destroy terminal settlement.
- [ ] `SignallingDisconnectResult`.
- [ ] `ReconnectAdmissionResult`.
- [ ] `ReconnectAttemptResult`.
- [ ] `ReconnectSettlementResult`.
- [ ] `FirstRecoveredMessageAck`.
- [ ] `FirstRecoveredRemotePlayerFrameAck`.
- [ ] Signalling-loss and explicit-close browser fixtures.
- [ ] Source/build/deployed reconnect parity fixture.
- [ ] Retained debug-storage, frame-fault and all earlier authority gaps.

## Current coverage gap

```txt
PeerTransportStatus reconnecting: present
host disconnected listener: present
client disconnected listener: present
explicit reconnect invocation: absent
public reconnect command: absent
attempt identity/generation: absent
retry budget/backoff/deadline: absent
terminal-intent arbitration: absent
stale event rejection: absent
recovery settlement result: absent
recovered message acknowledgement: absent
recovered remote-player frame acknowledgement: absent
browser reconnect fixture: absent
```

## Failure paths

```txt
involuntary signalling loss
  -> status changes to reconnecting
  -> no attempt starts
  -> status has no bounded settlement

explicit client disconnect
  -> peer.disconnect emits disconnected
  -> adapter also writes closed
  -> no terminal-intent generation orders competing events

route replacement during future retry
  -> no attempt generation exists
  -> late open/error/close evidence would have no stale-result gate
```

## Required invariants

```txt
reconnecting requires an admitted active attempt
signalling health and data-channel health remain separate
explicit closure is terminal for its transport generation
only matching events settle an attempt
retry work is bounded and cancellable
recovered status requires protocol and visible-frame proof
source, build and deployed routes use one policy
```

## Retained gaps

All previous debug-storage, frame-fault, remote interpolation, pointer-lock, HUD, minimap, motion, audio, page lifecycle, settings, device-control, loading, host-start, WebGL recovery, session, transport-mode, protocol, movement, interaction, ooze determinism and deployment findings remain open.

## Do not claim

Do not claim signalling recovery, multiplayer continuity, explicit-close correctness, first recovered frame, artifact parity, deployed parity or production readiness until implementation and browser fixtures pass on `main`.