# HorrorCorridor Next Steps

**Updated:** `2026-07-17T03-58-09-04-00`

## Summary

The next implementation should isolate optional debug-preference persistence behind one host-storage capability boundary and allow renderer/world startup to continue with safe in-memory defaults whenever storage is denied or unavailable.

## Plan ledger

**Goal:** add the smallest storage adapter and result layer without restructuring gameplay, rendering or the existing debug capture schema.

- [ ] Add `DebugPreferenceSchemaVersion`, `RuntimeGeneration`, `BuildChannel` and `PreferenceRevision`.
- [ ] Introduce a browser storage adapter that never throws across its public boundary.
- [ ] Classify available, read-only, denied, unavailable, quota, malformed and indeterminate states.
- [ ] Make `initializeRuntimeDebug()` consume `DebugPreferenceReadResult` rather than direct `localStorage` reads.
- [ ] Keep safe in-memory defaults when reads fail.
- [ ] Ensure persisted values cannot elevate debug capability or data tier.
- [ ] Make `setEnabled` and `setOverlayVisible` update accepted in-memory state independently of durable persistence.
- [ ] Publish `DebugPreferenceWriteResult` as persisted, memory-only, unavailable or failed.
- [ ] Reuse the same command/result path for Backquote and the window debug API.
- [ ] Reject stale results after runtime, schema or build-channel replacement.
- [ ] Publish bounded readiness/diagnostic state without exposing privileged debug data.
- [ ] Publish `DebugBootstrapSettlementResult`.
- [ ] Publish `FirstPlayableFrameAck` after the first renderer frame.
- [ ] Publish `FirstDebugPreferenceStatusFrameAck` after the storage status is visible.
- [ ] Add deterministic getter/setter exception injection.
- [ ] Add quota, missing-storage and malformed-value fixtures.
- [ ] Compare source, production build and deployed-origin behavior.

## Required implementation boundary

```txt
browser debug preference adapter
  -> owns localStorage access and exception classification

runtime debug preference authority
  -> owns policy, validation, in-memory truth and results

GameCanvas bootstrap
  -> consumes settlement
  -> must continue when optional persistence fails

React/debug projection
  -> consumes immutable preference and storage status
```

## Completion checklist

- [ ] A storage getter exception cannot block renderer/world initialization.
- [ ] A storage setter exception cannot interrupt the active frame loop.
- [ ] Accepted in-memory preferences survive failed durable writes.
- [ ] Persisted values cannot elevate debug capability.
- [ ] Malformed values fall back safely.
- [ ] Stale storage results cannot mutate a replacement runtime.
- [ ] First playable frame and preference-status acknowledgements converge.
- [ ] Source, build and deployed fixtures pass on `main`.

## Completion gate

Do not claim storage-fault isolation or deployment parity until denied, unavailable, quota and malformed-value fixtures prove a playable first frame and bounded memory-only behavior on `main`.