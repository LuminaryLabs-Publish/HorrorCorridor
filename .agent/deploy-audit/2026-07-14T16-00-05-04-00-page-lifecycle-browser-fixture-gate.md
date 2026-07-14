# Page Lifecycle Browser Fixture Gate

**Timestamp:** `2026-07-14T16-00-05-04-00`

## Summary

Existing package checks do not prove hide, freeze, BFCache, transport restoration or first resumed-frame behavior. Lifecycle readiness requires real-browser fixtures against source, production build and deployed origin.

## Plan ledger

**Goal:** define executable proof gates before lifecycle safety or deployment parity is claimed.

- [x] Identify current proof boundary.
- [x] Define source, build and deployed fixture rows.
- [ ] Implement and run the matrix.

## Required fixtures

```txt
1. hold W, hide page, release W while hidden, resume
2. pointer-locked hide and visible resume
3. client hide while host continues snapshots
4. host hide while clients remain connected
5. persisted pagehide/pageshow BFCache restore
6. non-persisted pagehide resource retirement
7. freeze/resume with active renderer and transport
8. repeated visibility events and duplicate resume rejection
9. transport disconnect during suspension
10. WebGL/context invalidation during suspension
11. stale predecessor RAF callback injection
12. stale predecessor transport callback injection
13. first resumed frame snapshot correlation
14. minimap/debug/frame revision convergence
15. source, production build and deployed-origin parity
```

## Required observations

```txt
lifecycleAttemptId
document/session/runtime/transport generations
held input before and after
pointer-lock state and receipt
RAF count and generation
client sends and host publishes while suspended
snapshot ticks received, buffered and adopted
renderer/context/viewport probe results
first resumed frame identity
resource and listener retirement receipts
```

## Pass boundary

A row passes only when one terminal lifecycle result exists, stale work is rejected, mandatory participants agree on the successor generation and the first visible frame carries the accepted snapshot identity.

## Validation boundary

No lifecycle browser fixture, production-build smoke or deployed-origin proof was run.