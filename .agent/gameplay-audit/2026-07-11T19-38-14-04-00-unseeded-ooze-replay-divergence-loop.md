# Gameplay Audit: Unseeded Ooze Replay Divergence Loop

**Timestamp:** `2026-07-11T19-38-14-04-00`

## Summary

Ooze pressure is authoritative gameplay state, but its spawn and decay decisions are not reproducible from run seed and command history.

## Plan ledger

**Goal:** document how ambient random values create replay, restore and host-migration divergence.

- [x] Trace ooze decay.
- [x] Trace ooze spawn.
- [x] Trace the host call site.
- [x] Trace replication.
- [x] Define deterministic acceptance criteria.
- [ ] Implement and test.

## Divergence loop

```txt
host simulation opportunity
  -> advanceOozeTrail without rng
  -> Math.random decides existing-item survival
  -> Math.random chooses new-item height
  -> Math.random chooses new-item rotation
  -> snapshot publishes final values
```

A replay starting from the same run seed and accepted inputs does not know the prior ambient PRNG state or value count. A restored host also cannot know the next result.

## Coupled risks

```txt
call-count sensitivity
cadence sensitivity
duplicate-step random consumption
failed-transaction random consumption
snapshot-restore next-value divergence
host-migration next-value divergence
non-reproducible bug reports
```

## Required gameplay contract

```txt
same run seed
+ same session epoch
+ same accepted fixed steps
+ same admitted player positions
+ same prior checkpoint
= same next ooze mutation and next checkpoint
```

Rejected, duplicate, paused or rolled-back steps must consume zero committed random values.
