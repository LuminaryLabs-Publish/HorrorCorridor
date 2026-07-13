# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-13T17-40-04-04-00`  
**Branch:** `main`  
**Status:** `host-start-barrier-loading-generation-authority-audited`

## Summary

The repository retains a 29-kit browser runtime spanning routing, sessions, PeerJS/local transport, deterministic maze bootstrap, movement, interactions, ooze, snapshot publication, Three.js rendering, bloom, minimap, diagnostics and cleanup.

The current boundary is host lobby-to-run admission. `startPlay()` checks only host mode and room existence. It then awaits five frame/timer loading steps without an attempt identity or cancellation check, reads mutable lobby state, commits local playable state and sends separate `START_GAME` and `SYNC` broadcasts. The protocol contains no client preparation or commit acknowledgement, and no participant-visible-frame convergence result exists.

## Plan ledger

**Goal:** make one sealed roster, one loading generation, one initial snapshot and one terminal host/client start result authoritative.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select HorrorCorridor as the oldest eligible central entry.
- [x] Read host start, loading, client handling and protocol source.
- [x] Preserve all 29 implemented kits and services.
- [x] Add the timestamped host-start audit family.
- [x] Refresh root docs and registry.
- [ ] Implement and prove the authority.

## Complete interaction loop

```txt
host lobby
  -> Start click
  -> validate host mode and room existence only
  -> enter LOADING
  -> await five RAF-plus-timeout steps
  -> create initial game state from current room and roster
  -> commit host room roster snapshot UI and readiness
  -> broadcast START_GAME
  -> broadcast SYNC

client
  -> START_GAME updates room roster and host identity
  -> SYNC independently updates room roster snapshot UI and readiness
  -> no shared attempt identity or acknowledgement
```

## Domains in use

```txt
application shell and route lifecycle
session room roster identity connection readiness and reset
host start admission and sealed roster
loading identity cancellation timeout and supersession
PeerJS BroadcastChannel and protocol handling
START_GAME SYNC correlation and client acknowledgements
seeded maze and initial snapshot preparation
runtime snapshot pose input cadence and publication
UI lobby loading playing pause completion overlays and hints
first-person movement interaction anomaly and ooze gameplay
Three.js world post-processing minimap HUD and diagnostics
first coherent multiplayer frame proof
cleanup validation build Pages deployment and central tracking
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit
corridor-session-domain-kit
runtime-store-snapshot-kit
ui-pause-projection-kit
ui-completion-projection-kit
complete-screen-presentation-kit
lobby-screen-presentation-kit
peer-host-transport-kit
peer-client-transport-kit
peer-event-bus-kit
protocol-message-construction-kit
protocol-serialization-kit
maze-snapshot-bootstrap-kit
seeded-maze-rng-kit
first-person-input-kit
movement-collision-camera-kit
network-player-update-kit
corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
snapshot-outcome-routing-kit
corridor-authoritative-publication-kit
corridor-animation-loop-kit
corridor-render-world-kit
corridor-post-processing-kit
corridor-minimap-kit
runtime-debug-frame-kit
runtime-resource-cleanup-kit
package-validation-kit
```

Services cover route/session state, transport, protocol construction and validation, deterministic bootstrap, input and movement, interactions and outcomes, authoritative publication, RAF scheduling, Three.js projection, post-processing, minimap/HUD/debug, cleanup, validation and deployment. The per-kit service inventory is in the current tracker and machine registry.

## Source-backed findings

```txt
host and room checks: yes
all-ready and connected sealed roster gate: no
expected room/roster/transport revisions: no
start attempt and loading generation: no
cancellation after awaits: no
host commits before network convergence: yes
START_GAME and SYNC correlation: no
client prepare/commit acknowledgement: no
late or duplicate start quarantine: no
aggregate rollback: no
first coherent participant frame acknowledgement: no
```

## Required parent domain

```txt
corridor-host-start-barrier-loading-generation-authority-domain
```

## Current file family

```txt
.agent/trackers/2026-07-13T17-40-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T17-40-04-04-00.md
.agent/architecture-audit/2026-07-13T17-40-04-04-00-host-start-barrier-loading-generation-dsk-map.md
.agent/render-audit/2026-07-13T17-40-04-04-00-host-start-visible-frame-convergence-gap.md
.agent/gameplay-audit/2026-07-13T17-40-04-04-00-unsealed-lobby-start-loading-race-loop.md
.agent/interaction-audit/2026-07-13T17-40-04-04-00-host-start-command-client-ack-map.md
.agent/lobby-start-audit/2026-07-13T17-40-04-04-00-sealed-roster-loading-generation-contract.md
.agent/deploy-audit/2026-07-13T17-40-04-04-00-host-start-barrier-fixture-gate.md
.agent/central-sync-audit/2026-07-13T17-40-04-04-00-repo-ledger-host-start-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, networking, gameplay, rendering, package, dependency or deployment behavior changed.