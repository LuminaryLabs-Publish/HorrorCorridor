# Settings Overlay Fixture Gate

**Timestamp:** `2026-07-14T10-40-05-04-00`

## Summary

Source structure cannot prove input suspension, pointer-lock transfer, accessible focus, preference persistence, or source/build/deployed parity. A browser fixture must exercise the full transaction.

## Plan ledger

**Goal:** define the executable evidence required before settings behavior is considered complete.

- [x] Define source, browser, build, and deployed gates.
- [x] Define failure cases.
- [ ] Implement and run fixtures on `main`.

## Required fixtures

```txt
open with Q while holding W
  -> movement stops in the same admitted settings generation

open while pointer locked
  -> pointer lock releases
  -> no look delta is consumed while open

press E/Space while open
  -> no interaction command is admitted

client open
  -> passive SYNC continues
  -> player update and interaction send stop

close
  -> stale held keys do not resume movement
  -> pointer lock requires a fresh gesture

apply preference
  -> one SettingsRevision reaches every declared consumer
  -> reload restores the accepted revision
  -> first visible frame cites the same revision

failure
  -> invalid value, persistence failure, stale session, route exit, and consumer rejection roll back deterministically

parity
  -> source dev server
  -> production build
  -> deployed origin
```

## Evidence manifest

```txt
repository SHA
package-lock hash
browser and renderer identity
viewport and DPR
SettingsSessionId
SettingsRevision
input and pointer-lock receipts
before/after player pose and network counters
frame IDs and screenshot hashes
cleanup receipts
```

## Validation boundary

No fixture was run and no production-readiness claim is made.