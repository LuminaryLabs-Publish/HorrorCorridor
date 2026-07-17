# HorrorCorridor Known Gaps

**Updated:** `2026-07-17T03-58-09-04-00`

## Summary

The highest current undocumented boundary is optional debug-preference storage fault isolation. Direct browser-storage calls can throw during runtime bootstrap or preference toggles, while no capability state, typed result, safe fallback or first-frame proof exists.

## Plan ledger

**Goal:** isolate host persistence without weakening the earlier debug capability/redaction boundary or changing gameplay truth.

- [ ] Host debug-preference storage adapter.
- [ ] Storage capability probe.
- [ ] Getter exception classification.
- [ ] Setter exception classification.
- [ ] Quota classification.
- [ ] Missing/unavailable storage classification.
- [ ] Malformed persisted-value rejection.
- [ ] Build-channel and schema scoping.
- [ ] Public-safe preference allowlist.
- [ ] In-memory fallback state.
- [ ] Memory-only write settlement.
- [ ] Stale result rejection after runtime replacement.
- [ ] Debug bootstrap fault isolation.
- [ ] Keyboard toggle fault isolation.
- [ ] Window debug API fault isolation.
- [ ] `DebugPreferenceCapabilityResult`.
- [ ] `DebugPreferenceReadResult`.
- [ ] `DebugPreferenceWriteResult`.
- [ ] `DebugBootstrapSettlementResult`.
- [ ] `FirstPlayableFrameAck`.
- [ ] `FirstDebugPreferenceStatusFrameAck`.
- [ ] Getter/setter denial fixtures.
- [ ] Quota and unavailable-storage fixtures.
- [ ] Malformed-value fixture.
- [ ] Source/build/deployed parity fixture.
- [ ] Retained runtime-fault, remote interpolation and all earlier authority gaps.

## Current coverage gap

```txt
debug preference keys: present
bounded debug frame/event buffers: present
query and stored activation inputs: present
localStorage reads: direct and unguarded
localStorage writes: direct and unguarded
storage capability result: absent
exception classification: absent
memory-only fallback result: absent
bootstrap isolation: absent
first playable frame acknowledgement: absent
storage-denial fixture: absent
```

## Failure paths

```txt
bootstrap read failure
  -> initializeRuntimeDebug throws
  -> runtime composition stops before renderer/world construction
  -> no typed result or safe default exists

active toggle write failure
  -> preference write throws inside Zustand action
  -> toggle has no durable or memory-only settlement
  -> no bounded status projection exists
```

## Required invariants

```txt
optional persistence cannot block gameplay boot
persisted values cannot elevate debug capability
failed durable writes retain accepted in-memory preferences
all host exceptions become typed bounded results
stale storage results cannot cross runtime/build/schema generations
source, build and deployed route use one fallback policy
```

## Retained gaps

All previous frame-fault, remote interpolation, pointer-lock, HUD, minimap, motion, audio, page lifecycle, settings, device-control, loading, host-start, WebGL recovery, session, transport, protocol, movement, interaction, debug capability, ooze determinism and deployment findings remain open.

## Do not claim

Do not claim storage-fault isolation, safe fallback, first-frame convergence, artifact parity, deployed parity or production readiness until implementation and browser fixtures pass on `main`.