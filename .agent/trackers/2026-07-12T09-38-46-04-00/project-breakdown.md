# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-12T09-38-46-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Scope:** documentation-only repository breakdown

## Plan ledger

**Goal:** identify the next unowned authority boundary and document a safe loading transition from route action to committed run and first visible frame.

- [x] Compare the full ten-repository Publish inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all eligible repositories with the central ledger.
- [x] Confirm no eligible repository is new, ledger-missing or root-`.agent`-missing.
- [x] Select only `HorrorCorridor` from the oldest central timestamp.
- [x] Review current `.agent` state and recent main commits.
- [x] Trace loading, solo start, host start, menu admission and runtime world initialization.
- [x] Identify the full interaction loop, domains, 29 implemented kits and services.
- [x] Define a loading-generation DSK/domain boundary.
- [x] Add architecture, render, gameplay, interaction, loading-transition and deploy audits.
- [x] Refresh root `.agent` state and kit registry.
- [x] Change no runtime source.
- [x] Use `main` only and create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
HorrorCorridor     2026-07-12T07-41-06-04-00 selected
ZombieOrchard      2026-07-12T07-51-04-04-00
MyCozyIsland       2026-07-12T08:00:16-04:00
TheUnmappedHouse   2026-07-12T08-10-36-04-00
AetherVale         2026-07-12T08-31-49-04-00
PrehistoricRush    2026-07-12T09-01-44-04-00
TheOpenAbove       2026-07-12T09-02-10-04-00
IntoTheMeadow      2026-07-12T09-21-40-04-00
PhantomCommand     2026-07-12T09-28-05-04-00
TheCavalryOfRome   excluded
```

## Main finding

The pre-run loading path is asynchronous but has no owner identity. It crosses ten async callbacks, then mutates several global stores and may emit two authoritative transport messages. Inputs are not sealed before the wait and results are not rejected if the route, session, lobby or component lifetime changed.

## Required parent domain

```txt
corridor-loading-transition-generation-authority-domain
```

## Output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-12T09-38-46-04-00.md
.agent/architecture-audit/2026-07-12T09-38-46-04-00-loading-transition-generation-dsk-map.md
.agent/render-audit/2026-07-12T09-38-46-04-00-stale-bootstrap-world-snapshot-provenance-gap.md
.agent/gameplay-audit/2026-07-12T09-38-46-04-00-overlapping-loading-stale-run-commit-loop.md
.agent/interaction-audit/2026-07-12T09-38-46-04-00-start-cancel-commit-admission-map.md
.agent/loading-transition-audit/2026-07-12T09-38-46-04-00-generation-cancellation-atomic-commit-contract.md
.agent/deploy-audit/2026-07-12T09-38-46-04-00-loading-race-fixture-gate.md
```
