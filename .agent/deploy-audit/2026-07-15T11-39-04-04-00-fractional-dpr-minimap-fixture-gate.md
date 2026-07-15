# HorrorCorridor Fractional-DPR Minimap Fixture Gate

**Timestamp:** `2026-07-15T11-39-04-04-00`

## Summary

Existing build, visual and live-player scripts do not prove minimap dimension-write stability or context-generation behavior across fractional DPR and browser zoom transitions.

## Plan ledger

**Goal:** require executable source, production-build and deployed-origin proof before claiming stable minimap resize behavior.

- [x] Inspect declared package scripts.
- [x] Identify missing minimap-specific fixture inputs and receipts.
- [x] Define source/build/deployed parity rows.
- [ ] Implement the fixture and attach artifacts.

## Required fixture command

```txt
npm run validate:minimap-surface
```

The exact script name may differ, but one deterministic entry point must produce machine-readable results.

## DPR matrix

```txt
0.90
1.00
1.10
1.25
1.333333
1.50
1.75
2.00
2.625
```

## Required rows

```txt
initial mount
unchanged frame sequence
DPR-only transition
CSS-size-only transition
combined DPR and CSS transition
browser zoom in
browser zoom out
route unmount
route remount
canvas element replacement
null snapshot
active snapshot
pause frame
completion frame
```

## Required assertions

```txt
physical dimensions are positive integers
one initial descriptor causes at most one width and one height write
unchanged frames cause zero dimension writes
changed descriptor causes exactly one resize transaction
context generation changes only with an admitted resize or surface replacement
logical drawing remains 168 x 168
frame result references the accepted descriptor
first resized frame acknowledgement matches the descriptor
retired surfaces reject late frames
```

## Required artifacts

```txt
JSON result ledger
DPR and viewport observations
dimension-write counters
context-generation counters
frame receipts
screenshots before and after resize
source revision
production build revision
published URL and revision
browser version
platform details
```

## Parity gate

```txt
source dev server
  -> all rows pass

production build
  -> all rows pass
  -> same descriptor fingerprints for the same inputs

published origin
  -> all rows pass
  -> visible-frame probes match accepted descriptors
```

## Failure policy

```txt
unsupported DPR observation
context acquisition failure
zero-sized surface
stale surface command
missing visible acknowledgement
source/build/deployed mismatch
```

Each failure must produce a typed result and preserve the last accepted surface when safe.

## Validation boundary

No fixture was available or run in this audit. Existing package scripts remain unchanged.