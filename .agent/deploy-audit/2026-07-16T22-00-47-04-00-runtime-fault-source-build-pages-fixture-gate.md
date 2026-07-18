# Runtime Fault Source, Build and Pages Fixture Gate

**Timestamp:** `2026-07-16T22-00-47-04-00`

## Summary

The repository has lint, build, harness, visual, live-agent and live-player scripts, but no fixture injects failures into individual frame phases or proves terminal retirement in source, production build and deployed-origin execution.

## Plan ledger

**Goal:** prove that every supported phase failure retires exactly one runtime generation and presents one recoverable terminal surface across all delivery forms.

- [x] Inventory available validation scripts.
- [x] Define required failure rows and receipts.
- [ ] Add deterministic phase injection hooks.
- [ ] Run source, build and deployed-origin matrices.

## Required fixture rows

| Row | Injected phase | Required proof |
|---|---|---|
| F01 | local movement | no later gameplay or render phase; terminal result |
| F02 | host publication | no duplicate snapshot; publication suspended |
| F03 | client send | no repeated send; input retired |
| F04 | runtime store projection | no stale UI mutation after retirement |
| F05 | camera projection | world/minimap/present skipped |
| F06 | world update | minimap and composer skipped; world ownership settled |
| F07 | minimap draw | composer skipped; matching fault surface shown |
| F08 | debug capture | composer policy explicit and deterministic |
| F09 | post-processing render | no successor frame; fault surface acknowledged |
| F10 | cleanup | partial cleanup receipt and bounded retry |
| F11 | duplicate fault | first result retained; duplicate rejected |
| F12 | late RAF callback | retired generation rejected |
| F13 | explicit restart | fresh generations and clean listeners |

## Required observations

```txt
RuntimeFrameFaultResult
failed phase
scheduler generation
frame revision
phase receipts
input retirement receipt
pointer-lock receipt
network suspension receipt
resource settlement receipt
fault surface revision
FirstFaultFrameAck
RuntimeRestartAdmissionResult
```

## Delivery matrix

```txt
source development server
production Next.js build
browser live-player harness
GitHub Pages or deployed public origin when applicable
```

## Current execution state

```txt
npm run lint: not run
npm run build: not run
validate:live-player: not run
phase-failure fixture: unavailable
fault-restart fixture: unavailable
production-build smoke: not run
deployed-origin smoke: not run
```

No deployment or crash-containment claim is made.