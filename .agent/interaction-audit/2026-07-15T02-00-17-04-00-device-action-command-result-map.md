# Interaction Audit: Device Action Command/Result Map

**Timestamp:** `2026-07-15T02-00-17-04-00`

## Summary

Current browser producers mutate `PlayerInputState` directly and interaction is triggered inside the keyboard handler. A device-control authority should produce explicit normalized actions and results before movement or interaction consumers run.

## Plan ledger

**Goal:** map every required device action to one normalized command, one admitted producer and one observable result.

- [x] Map current desktop producers.
- [x] Map missing touch producers.
- [x] Define command/result envelopes.
- [x] Define deduplication and cancellation.
- [ ] Implement and wire consumers.

## Required command envelope

```txt
deviceActionCommandId
documentGeneration
routeGeneration
controlGeneration
controlProfileId
pointerOrKeyIdentity
inputMapRevision
action
phase: start | change | end | cancel
value
observedRuntimeRevision
timestamp
```

## Required result envelope

```txt
deviceActionResultId
deviceActionCommandId
status
reason
acceptedControlGeneration
acceptedInputRevision
normalizedAction
before/after button or axis state
consumer revision
first effect frame ID
```

## Action map

| Action | Current producer | Required admitted producers |
|---|---|---|
| forward/back | keyboard | keyboard, touch movement |
| left/right | keyboard | keyboard, touch movement |
| look X/Y | pointer-lock mouse | mouse, touch look |
| interact | keyboard `E` | keyboard, touch button |
| pause | keyboard `P` | keyboard, touch button |
| capture/release | pointer-lock controls | desktop capture, touch profile activation/cancel |

## Rejection reasons

```txt
unsupported-device-profile
incomplete-action-coverage
stale-control-generation
unknown-pointer
duplicate-action
gesture-owned-by-overlay
cancelled
route-retired
document-hidden
invalid-value
```

## Consumer rule

Every accepted producer updates `PlayerInputState`; no device-specific producer calls movement, camera, network or interaction state directly.
