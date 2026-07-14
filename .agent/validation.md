# HorrorCorridor Validation

**Updated:** `2026-07-14T04-38-29-04-00`

## Summary

Source inspection confirms that the live-agent evidence chain is not revision-bound or hermetic. Server admission is HTTP-status based, browser/CDP admission is opportunistic, Playwright may come from an external checkout, image probes depend on undeclared Python/Pillow tooling, screenshots lack renderer-frame IDs and artifact hashes, and active child cancellation plus terminal cleanup receipts are absent.

## Plan ledger

**Goal:** record exactly what source inspection proves and withhold reproducibility claims until source, build and deployed-browser fixtures pass.

- [x] Compare all 11 Publish repositories against ten eligible central ledgers.
- [x] Confirm root `.agent` coverage and synchronization.
- [x] Select HorrorCorridor by the oldest eligible timestamp.
- [x] Inspect package scripts and both live-agent proof adapters.
- [x] Preserve the 29-kit census and document two proof adapters.
- [x] Add the timestamped proof-provenance audit family.
- [x] Refresh root documentation and machine registry.
- [ ] Run implementation, fault-injection, build and deployed-browser fixtures after the authority exists.

## Change scope

```txt
runtime source changed: no
network behavior changed: no
gameplay behavior changed: no
render behavior changed: no
live-agent scripts changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
documentation changed: yes
```

## Source inspection performed

```txt
full LuminaryLabs-Publish repository inventory
central Publish repo ledger state
root .agent state for HorrorCorridor
HorrorCorridor-V1/package.json
HorrorCorridor-V1/scripts/horror-corridor-live-agent.mjs
HorrorCorridor-V1/scripts/horror-corridor-live-player-harness.mjs
HorrorCorridor-V1/src/components/game/GameShell.tsx
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/src/features/debug/store/runtimeDebugStore.ts
```

## Confirmed by inspection

```txt
recurring live-agent command exists: yes
sample finite live-agent command exists: yes
repository commit recorded in run manifest: no
package/dependency fingerprint recorded: no
Playwright external fallback exists: yes
Python/Pillow probes exist: yes
Python/Pillow versions recorded: no
server port lease exists: no
spawned-server ownership proof exists: no
HTTP app identity validation exists: no
HTTP readiness accepts any status below 500: yes
reachable CDP reuse exists: yes
browser executable/version fingerprint exists: no
isolated CDP context required: no
launch candidates include --disable-gpu: yes
before/after debug and screenshots use one page: yes
screenshot-to-renderer-frame ID exists: no
artifact content hashes exist: no
atomic immutable evidence manifest exists: no
spawnSync child can be cancelled mid-episode: no
browser cleanup errors are promoted: no
server terminal exit/port-release receipt exists: no
```

## Documentation checks

```txt
required root .agent files present: yes
new timestamped tracker: yes
new timestamped turn ledger: yes
architecture audit: yes
render audit: yes
gameplay audit: yes
interaction audit: yes
live-agent system audit: yes
deploy audit: yes
central-sync audit: yes
kit registry refreshed: yes
central ledger update: current run
central internal change log: current run
```

## Commands and runtime checks not performed

```txt
npm install
npm run lint
npm run build
npm run live-agent:sample
npm run validate:live-player
npm run validate:live-player:dev
browser or CDP launch
Python/Pillow probe
source server proof
production server proof
deployed-origin proof
```

## Missing executable fixtures

```txt
foreign server and occupied-port rejection
exact repository/app endpoint identity
foreign and stale CDP rejection
isolated browser context
browser and tool version replacement
hardware/software renderer classification
frame-bound screenshot and debug-state capture
artifact hash mismatch
SIGINT during active episode
browser/server retirement failure
source/build/deployed parity
```

## Claims intentionally withheld

No claim is made for hermetic proof, exact source/environment identity, owned server or browser execution, renderer-frame artifact provenance, cancellable episodes, terminal cleanup or production readiness.
