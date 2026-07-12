# HorrorCorridor Active Gameplay HUD and Minimap Breakdown

**Timestamp:** `2026-07-12T02-49-19-04-00`

## Summary

This run audits the active gameplay presentation path. The minimap implementation is complete enough to draw maze cells, ooze, ground cubes, remote players and local heading, but the active `PLAYING` HUD branch never mounts the minimap canvas. `GameCanvas` therefore attempts a minimap draw every frame against a missing DOM consumer and silently performs no work.

## Plan ledger

**Goal:** make active-play HUD and minimap services reachable through one explicit presentation contract, with screen-policy admission, consumer leases, projection results and first-visible-frame proof.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` as the oldest eligible central-ledger entry.
- [x] Read the current root `.agent` state.
- [x] Trace `GameShell`, `HUDOverlay`, `GameCanvas` and `Minimap`.
- [x] Identify the product interaction loop.
- [x] Identify all active domains.
- [x] Reconcile all 29 implemented kits and their offered services.
- [x] Confirm the active-play minimap canvas is not mounted.
- [x] Define active HUD policy, surface leases, projection results and fixture gates.
- [x] Add timestamped architecture, render, gameplay, interaction, HUD/minimap and deploy audits.
- [x] Refresh required root `.agent` documents and machine registry.
- [x] Change documentation only.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable browser fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     2026-07-12T01-08-06-04-00 selected
PhantomCommand     2026-07-12T01-20-00-04-00
ZombieOrchard      2026-07-12T01-30-07-04-00
TheUnmappedHouse   2026-07-12T01-41-56-04-00
AetherVale         2026-07-12T01-58-43-04-00
MyCozyIsland       2026-07-12T02-10-14-04-00
PrehistoricRush    2026-07-12T02-21-55-04-00
TheOpenAbove       2026-07-12T02-29-50-04-00
IntoTheMeadow      2026-07-12T02-38-23-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/HorrorCorridor` was selected in the Publish organization.

## Product interaction loop

```txt
GameShell enters PLAYING
  -> GameCanvas owns the Three.js RAF
  -> HUDOverlay evaluates the current screen
  -> PLAYING branch mounts SettingsOverlay and FrameDebugPanel only
  -> Minimap canvas is absent
  -> each RAF queries document.getElementById("runtime-minimap")
  -> query returns null
  -> drawMinimapFrame exits without drawing
  -> world and post-processing still render
  -> completion changes screen to COMPLETED
  -> completed HUD branch finally mounts Minimap
  -> minimap becomes reachable only after the run has ended
```

## Main finding

`HUDOverlay` explicitly returns a minimal branch for `PLAYING` that excludes `Minimap`. The only `Minimap` mount is in the later completed-state branch. `GameCanvas` nevertheless searches for the minimap canvas and invokes `drawMinimapFrame` on every frame. The renderer treats a missing canvas as a normal no-op, so the service failure remains silent.

```txt
implemented minimap service: yes
active gameplay consumer mounted: no
per-frame minimap draw attempted: yes
missing consumer result: no
active-player visible minimap: no
completed-screen minimap mount: yes
```

## Required parent domain

```txt
corridor-active-gameplay-presentation-authority-domain
```

## Required transaction

```txt
PresentationFramePlan
  -> admit screen and gameplay phase
  -> resolve required HUD consumers
  -> acquire or validate HUD and minimap surface leases
  -> project world, HUD, minimap and debug inputs from one frame identity
  -> render each required consumer
  -> return typed projection results
  -> require acknowledgements from mandatory consumers
  -> commit one visible presentation frame
  -> journal missing, skipped, stale and failed consumers
```

## Output

```txt
.agent/trackers/2026-07-12T02-49-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T02-49-19-04-00.md
.agent/architecture-audit/2026-07-12T02-49-19-04-00-active-gameplay-presentation-dsk-map.md
.agent/render-audit/2026-07-12T02-49-19-04-00-missing-minimap-consumer-frame-gap.md
.agent/gameplay-audit/2026-07-12T02-49-19-04-00-playing-completed-hud-reachability-loop.md
.agent/interaction-audit/2026-07-12T02-49-19-04-00-presentation-consumer-admission-map.md
.agent/hud-minimap-audit/2026-07-12T02-49-19-04-00-active-play-surface-lease-contract.md
.agent/deploy-audit/2026-07-12T02-49-19-04-00-active-hud-minimap-fixture-gate.md
```

## Validation boundary

```txt
runtime source changed: no
render behavior changed: no
network behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
existing commands run: no
browser HUD/minimap fixture available: no
```
