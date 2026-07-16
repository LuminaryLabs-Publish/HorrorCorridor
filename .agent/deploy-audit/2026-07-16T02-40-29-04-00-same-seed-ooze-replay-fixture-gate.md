# HorrorCorridor Same-Seed Ooze Replay Fixture Gate

**Timestamp:** `2026-07-16T02-40-29-04-00`

## Summary

No executable fixture currently proves that ooze evolution is identical across same-seed runs, restore boundaries, production builds or deployed Pages. This gate defines the minimum evidence required before deterministic replay or parity claims.

## Plan ledger

**Goal:** prove exact ooze stream, snapshot and visible-frame equivalence across supported execution surfaces.

- [x] Define source-level deterministic cases.
- [x] Define restore and stream-isolation cases.
- [x] Define browser, build and deployment parity cases.
- [x] Define terminal proof receipts.
- [ ] Implement and run the fixture matrix.

## Fixture matrix

| Fixture | Required proof | Current status |
|---|---|---|
| same seed, same commands | identical draws, trail revisions and hashes | unavailable |
| same seed, repeated retry | identical initial stream state | unavailable |
| different seed | permitted deterministic divergence | unavailable |
| extra maze RNG draw | no ooze change | unavailable |
| extra audio/render random draw | no ooze change | unavailable |
| save and restore | exact next draw and hash | unavailable |
| pause and resume | no unclassified time or random consumption | unavailable |
| duplicate step command | no duplicate draws | unavailable |
| stale cursor | typed rejection and no mutation | unavailable |
| retired generation | typed rejection and no frame | unavailable |
| host/client snapshot | client renders accepted host trail | unavailable |
| world/minimap frame | matching trail and RNG revisions | unavailable |
| production build | matches source checkpoint hashes | not run |
| deployed Pages | matches production checkpoint hashes | not run |
| legacy snapshot | explicit migrate/reject classification | unavailable |

## Required artifacts

```txt
fixture manifest
seed and command packet
algorithm and derivation versions
ordered draw receipts
snapshot checkpoints
canonical ooze hashes
world-frame acknowledgement
minimap-frame acknowledgement
production artifact identity
deployed origin and release identity
```

## Pass conditions

```txt
all admitted steps terminate once
all same-seed checkpoints match
different-seed cases are repeatable
restore resumes at the exact cursor
stream isolation holds
source build and Pages hashes match
visible acknowledgements cite accepted step results
```

## Validation boundary

No npm command, browser harness, production build, deployed-origin smoke or replay fixture was run. This document defines a future gate only.