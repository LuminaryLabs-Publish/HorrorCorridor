# Victory and Failure Convergence Loop

**Timestamp:** `2026-07-11T13-20-45-04-00`

## Summary

The gameplay model can complete the ordered anomaly and enter victory, but it cannot enter failure. Ooze is visual and pressure-like state only. The shared model and UI imply a two-outcome game while the executable authority implements one outcome.

## Plan ledger

**Goal:** describe the current gameplay loop and the exact missing defeat and terminal-latch behavior.

- [x] Trace anomaly completion.
- [x] Trace ooze advancement.
- [x] Trace local and replicated outcome handling.
- [x] Identify reversible victory behavior.
- [x] Define convergence requirements.
- [ ] Implement and test later.

## Current victory loop

```txt
player places cube
  -> interaction mutates cube/slot state
  -> validateOrderedSequenceCompletion
  -> exact ordered sequence complete
  -> gameState = victory
  -> room.phase = ending
  -> host publishes snapshot
  -> local/client UI enters COMPLETED
```

## Current failure loop

```txt
players move
  -> ooze trail spawns
  -> ooze trail may decay
  -> oozeLevel mirrors trail length
  -> MAX_OOZE limits additional trail items
  -> no defeat predicate runs
  -> gameState remains playing
```

## Divergence cases

```txt
failure snapshot arrives at client
  -> generic non-victory/non-paused branch
  -> screen becomes PLAYING

victory state is re-evaluated with incomplete slots
  -> validator changes gameState back to playing
  -> room.phase returns to active

completion UI supports failure
  -> no gameplay transition can supply it
```

## Required gameplay contract

```txt
explicit outcome policy
explicit victory proof
explicit defeat proof
single authoritative evaluator
single monotonic terminal latch
one terminal result per run epoch
same publication and UI path for victory and failure
late input and snapshots rejected after terminal commit
```

## Candidate defeat policies to choose explicitly

```txt
ooze pressure reaches a configured threshold
all admitted players are consumed or incapacitated
time limit expires
host-defined run failure command
connection policy terminates the run
```

No candidate should be inferred from `oozeLevel`; the product must select and version the actual rule.
