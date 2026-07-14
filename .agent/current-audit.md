# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-14T04-38-29-04-00`  
**Branch:** `main`  
**Status:** `live-agent-browser-proof-provenance-retirement-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces spanning routing, sessions, PeerJS/local transport, deterministic maze bootstrap, movement, interactions, ooze, authoritative snapshots, Three.js rendering, bloom, minimap, diagnostics, cleanup and package validation. It also contains a recurring live-agent runner and a live-player browser-proof adapter.

The current boundary is proof provenance. The live-player harness can accept any HTTP response below 500, reuse a reachable CDP browser/context, load Playwright from an external NexusSimulator checkout, run undeclared Python/Pillow probes and publish screenshots without renderer-frame IDs or content hashes. The parent runner uses a blocking child process and records no terminal ownership receipts for child, browser or server retirement.

## Plan ledger

**Goal:** make every live-agent proof result cite one immutable source, server, browser, page, frame, action and artifact chain.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select HorrorCorridor as the oldest eligible entry.
- [x] Inspect package command wiring and both proof adapters.
- [x] Preserve all 29 implemented kits and services.
- [x] Document two proof adapters and their services.
- [x] Add the timestamped proof-provenance audit family.
- [x] Refresh root docs and registry.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
live-agent command
  -> create run directory and mutable manifest
  -> optionally spawn fixed-port dev server
  -> choose movement profile from prior episode gates
  -> synchronously spawn live-player child

live-player child
  -> accept HTTP endpoint
  -> resolve Playwright/browser/CDP opportunistically
  -> open or reuse context and create page
  -> enter playable run and admit debug bridge
  -> capture before state and screenshot
  -> inject bounded movement
  -> capture after state and screenshot
  -> execute Python/Pillow probes
  -> derive gates and write report.json

parent
  -> trust child exit status and optional report
  -> append JSONL and replace latest summary
  -> repeat
  -> observe signals only between blocking episodes
  -> best-effort close server
  -> write terminal run manifest
```

## Domains in use

```txt
repository and source revision identity
package, dependency and external-tool environment
Node child-process lifecycle
server port, endpoint admission and ownership
browser executable and CDP admission
context and page generation
route and playable-run admission
runtime debug bridge and renderer-frame observation
action profiles and keyboard injection
screenshot, canvas and visible-text observation
Python/Pillow image probes
proof gate and episode settlement
artifact hashing and manifest promotion
recurring scheduling, cancellation and retirement
source, build, deployment and central tracking
```

## Implemented kits and offered services

```txt
implemented kits: 29
proof adapters: 2
total implemented surfaces: 31
```

The 29 kits remain unchanged. They cover application routing, session state, runtime snapshots, UI projection, host/client transport, event bus, protocol construction/serialization, deterministic bootstrap, input, movement, network updates, interactions, anomaly and ooze rules, authoritative publication, animation, Three.js world/post-processing/minimap, diagnostics, cleanup and package validation.

The `live-agent-runner-adapter` offers recurring episode scheduling, adaptive action selection, child execution, JSONL history and latest-summary projection. The `live-player-browser-proof-adapter` offers server/browser admission, route control, debug readback, screenshots, image probes and proof gates.

## Source-backed findings

```txt
repository revision in evidence manifest: no
locked dependency/environment fingerprint: no
owned port/server proof: no
HTTP expected-app identity check: no
pre-existing CDP reuse: yes
browser executable/version fingerprint: no
isolated context required on CDP attach: no
external Playwright fallback: yes
Python/Pillow version manifest: no
software/hardware renderer classification: no
screenshot-to-frame correlation: no
artifact hashes: no
atomic immutable artifact manifest: no
mid-episode cancellation with spawnSync: no
terminal browser/server retirement receipts: no
source/build/deployed parity: no
```

## Required parent domain

```txt
corridor-live-agent-browser-proof-provenance-retirement-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-14T04-38-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T04-38-29-04-00.md
.agent/architecture-audit/2026-07-14T04-38-29-04-00-live-agent-browser-proof-provenance-dsk-map.md
.agent/render-audit/2026-07-14T04-38-29-04-00-browser-frame-artifact-coherence-gap.md
.agent/gameplay-audit/2026-07-14T04-38-29-04-00-adaptive-episode-action-loop.md
.agent/interaction-audit/2026-07-14T04-38-29-04-00-live-agent-command-result-map.md
.agent/live-agent-audit/2026-07-14T04-38-29-04-00-server-browser-artifact-provenance-contract.md
.agent/deploy-audit/2026-07-14T04-38-29-04-00-live-agent-proof-fixture-gate.md
.agent/central-sync-audit/2026-07-14T04-38-29-04-00-repo-ledger-live-agent-proof-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, scripts, package, dependency or deployment behavior changed.
