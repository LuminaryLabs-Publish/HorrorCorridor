# HorrorCorridor Known Gaps

**Updated:** `2026-07-16T22-00-47-04-00`

## Summary

The highest current undocumented boundary is terminal frame-fault containment. The frame callback can stop on an exception after partially mutating gameplay or presentation, while the runtime has no explicit failed state, exact retirement result or restart transaction.

## Plan ledger

**Goal:** prioritize exact runtime retirement while retaining every earlier networking, interpolation, input, lifecycle, rendering, motion, audio, determinism and deployment finding.

- [ ] Scheduler generation identity.
- [ ] Frame revision identity.
- [ ] Named phase boundaries.
- [ ] Started/completed/skipped/failed phase receipts.
- [ ] Normalized asynchronous exception classification.
- [ ] Exact-once terminal fault latch.
- [ ] Stale RAF callback rejection.
- [ ] Partial-frame mutation settlement.
- [ ] Held movement-state retirement.
- [ ] Look-delta and one-shot retirement.
- [ ] Pointer-lock release receipt.
- [ ] Host publication suspension.
- [ ] Client-send suspension.
- [ ] Transport subscription retirement.
- [ ] World-update retirement.
- [ ] Minimap-projection retirement.
- [ ] Post-processing retirement.
- [ ] Idempotent GPU resource settlement.
- [ ] Failed readiness projection.
- [ ] `RuntimeFrameFaultResult`.
- [ ] DOM-owned terminal fault surface.
- [ ] `FirstFaultFrameAck`.
- [ ] Explicit clean-restart or reload admission.
- [ ] Fresh generations after restart.
- [ ] Simulation-phase failure fixture.
- [ ] Publication/send failure fixture.
- [ ] World/minimap/post-processing failure fixtures.
- [ ] Duplicate-fault and stale-callback fixtures.
- [ ] Source/build/deployed parity fixture.
- [ ] Retained remote interpolation and all earlier authority gaps.

## Current coverage gap

```txt
RAF start and stop: present
delta and elapsed calculation: present
successor scheduling: present only after onFrame returns
frame try/catch: absent
scheduler generation: absent
named phase receipts: absent
terminal fault latch: absent
fault-owned cleanup: absent
input retirement on fault: absent
network suspension on fault: absent
fault surface: absent
explicit restart transaction: absent
```

## Failure path

```txt
frame phase mutates state
  -> later phase throws
  -> successor RAF is skipped
  -> loop.running remains true
  -> cleanupRuntime is not invoked
  -> controls and subscriptions can remain live
  -> previous or partially updated surfaces remain visible
  -> no result explains the failure or permits bounded recovery
```

## Required invariants

```txt
one scheduler generation owns one RAF chain
one terminal fault retires that generation exactly once
no retired callback mutates gameplay, networking or presentation
accepted authoritative mutations remain explicitly accounted for
held controls and pointer lock do not survive terminal failure
cleanup is idempotent
one terminal fault surface is presented and acknowledged
restart creates fresh runtime ownership
```

## Retained gaps

All previous remote interpolation, pointer-lock, HUD, minimap sizing, motion preference, audio, page lifecycle, settings, device-control, loading, host-start, WebGL recovery, session, transport, protocol, movement validation, interaction, terminal outcome, debug, ooze determinism and deployment findings remain open.

## Do not claim

Do not claim crash containment, clean restart, stale-callback safety, partial-frame integrity, resource retirement, artifact parity, deployed parity or production readiness until implementation and fixtures pass on `main`.