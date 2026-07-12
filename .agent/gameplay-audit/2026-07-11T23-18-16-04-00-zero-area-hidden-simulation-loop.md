# HorrorCorridor Zero-Area Hidden Simulation Loop

**Timestamp:** `2026-07-11T23-18-16-04-00`

## Plan ledger

**Goal:** document the gameplay consequence when the render mount collapses or is temporarily measured at zero area while the active runtime continues.

- [x] Resize early-return behavior identified.
- [x] RAF simulation admission identified.
- [x] readiness and frame readback inspected.
- [ ] Runtime guard and browser fixture remain future work.

## Current loop

```txt
mount width or height becomes zero
  -> ResizeObserver or window resize callback
  -> resizeRenderer observes zero area
  -> resizeRenderer returns without a result
  -> no readiness change
  -> no surface failure or suspension state
  -> RAF continues
  -> host or solo simulation may continue
  -> client prediction and network sends may continue
  -> previous renderer/composer sizes remain retained
```

## Consequences

```txt
simulation can advance while the game has no current visible surface
input/network mutation can continue without a visible-frame acknowledgement
restored layout can present state advanced during the hidden interval
no debug frame distinguishes hidden, stale-surface or current-surface rendering
no policy decides whether zero area means suspend, retain or fail
```

## Required rule

Zero-area observation must produce an explicit result. Product policy must choose one of:

```txt
retain-last-surface-and-suspend-visible-frame-claims
suspend-simulation-and-input-until-surface-restores
commit-a-minimum-fallback-surface
fail-the-runtime-generation
```

The policy cannot remain an implicit early return.

## Required fixture

```txt
start active solo/host/client session
collapse mount to zero area
observe surface result and lifecycle policy
prove simulation/input/network behavior matches policy
restore mount
commit a new surface revision
prove first restored frame cites the new revision
```
