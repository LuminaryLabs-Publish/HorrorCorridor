# Terminal Outcome Fixture Gate

**Timestamp:** `2026-07-11T13-20-45-04-00`

## Summary

The package has build, lint, ProtoKit, harness, visual, object-review and live-player commands, but no executable fixture proves victory/failure policy, terminal monotonicity, replicated convergence or first terminal-frame correlation.

## Plan ledger

**Goal:** define the fixture matrix required before terminal outcome correctness can be claimed or used as a deployment gate.

- [x] Inventory current package commands.
- [x] Identify missing terminal fixtures.
- [x] Define deterministic headless and browser cases.
- [x] Define required CI ordering.
- [ ] Implement fixtures and wire them into validation.

## Existing commands

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run review:object-kit
npm run validate:live-player
```

## Required headless fixtures

```txt
fixture:terminal-victory
fixture:terminal-failure
fixture:terminal-policy-version
fixture:terminal-simultaneous-predicates
fixture:terminal-duplicate
fixture:terminal-conflict
fixture:terminal-late-playing-snapshot
fixture:terminal-stale-epoch
fixture:terminal-loss-reorder-retry
fixture:terminal-client-acknowledgement
fixture:terminal-restart-handoff
fixture:terminal-title-exit-handoff
```

## Required browser fixtures

```txt
host and one client converge on victory
host and one client converge on failure
failure snapshot renders CompleteScreen failure
late playing snapshot does not reopen terminal run
first terminal frame carries run/epoch/outcome identity
restart creates a new admitted run epoch
quit to title retires transport and runtime once
```

## Required assertions

```txt
same policy input produces same result fingerprint
one run epoch accepts at most one terminal outcome
victory and failure both set room phase ending
client does not route failure to playing
terminal result is monotonic
publication rows expose zero/partial/full delivery
first terminal frame matches admitted outcome
restart and exit are idempotent
```

## Recommended validation order

```txt
npm run lint
npm run build
npm run fixture:terminal-outcome
npm run fixture:terminal-network
npm run fixture:terminal-frame
npm run validate:live-player
```

## Current status

```txt
terminal fixture scripts: unavailable
CI terminal gate: unavailable
browser multi-peer outcome smoke: unavailable
runtime correctness claim: not made
```
