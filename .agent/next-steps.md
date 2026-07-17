# HorrorCorridor Next Steps

**Updated:** `2026-07-17T09-17-19-04-00`

## Summary

The next implementation should add one bounded PeerJS signalling-reconnect authority while preserving existing active DataConnections until an explicit policy decides otherwise.

## Plan ledger

**Goal:** add the smallest reconnect command/result layer without restructuring protocol, gameplay, world rendering or the existing transport-mode work.

- [ ] Add `TransportGeneration`, `ReconnectAttemptId`, `ReconnectGeneration` and `TerminalIntentRevision`.
- [ ] Classify involuntary signalling loss, explicit disconnect, destroy and indeterminate closure.
- [ ] Observe active DataConnection liveness separately from signalling state.
- [ ] Add a reconnect method to the internal adapter boundary.
- [ ] Admit exactly one `peer.reconnect()` attempt per attempt generation.
- [ ] Add bounded retry count, backoff, deadline and cancellation.
- [ ] Reject stale open, disconnected, close and error events after route or transport replacement.
- [ ] Ensure explicit disconnect/destroy remains terminal.
- [ ] Preserve active data channels during signalling recovery unless product policy retires them.
- [ ] Separately prove host acceptance and client new-connection capability.
- [ ] Publish `SignallingDisconnectResult`.
- [ ] Publish `ReconnectAdmissionResult` and `ReconnectAttemptResult`.
- [ ] Publish `ReconnectSettlementResult` as recovered, failed, cancelled, timed-out, terminal or stale.
- [ ] Project bounded signalling and data-path states into the session store.
- [ ] Publish `FirstRecoveredMessageAck`.
- [ ] Publish `FirstRecoveredRemotePlayerFrameAck`.
- [ ] Add deterministic signalling-loss and reconnect-result injection.
- [ ] Test explicit disconnect during a pending attempt.
- [ ] Compare source, production build and deployed-origin behavior.

## Required implementation boundary

```txt
PeerJS adapter
  -> owns peer.reconnect invocation and raw event capture

signalling recovery authority
  -> owns classification, policy, attempt identity, retry and settlement

session projection
  -> consumes immutable signalling and data-path results

GameCanvas/HUD
  -> consumes matching recovered snapshot and frame proof
```

## Completion checklist

- [ ] `reconnecting` always has an admitted active attempt.
- [ ] Explicit disconnect cannot later project `reconnecting`.
- [ ] Existing active DataConnections remain observable and policy-bound.
- [ ] Retry work is bounded by count and deadline.
- [ ] Stale attempt events cannot mutate a replacement session.
- [ ] Recovery restores signalling capability or settles a terminal failure.
- [ ] Recovered messages and visible remote actors share matching revisions.
- [ ] Source, build and deployed fixtures pass on `main`.

## Completion gate

Do not claim signalling recovery or multiplayer continuity until the signalling-loss, explicit-close, stale-event, recovered-message and recovered-frame fixture matrix passes on `main`.