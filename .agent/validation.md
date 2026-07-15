# HorrorCorridor Validation

**Updated:** `2026-07-15T16-39-06-04-00`  
**Scope:** documentation-only active gameplay HUD projection audit

## Summary

Source inspection confirms that accepted gameplay state is available to `HUDOverlay`, but its `PLAYING` branch returns only settings and debug surfaces. The objective, anomaly sequence, held item, player/session panels and minimap canvas are mounted by the later `COMPLETED` branch. `GameCanvas` still queries for the minimap canvas and submits draw work every frame, while `drawMinimapFrame()` returns immediately for a null canvas.

## Plan ledger

**Goal:** record exactly what was inspected and prevent unsupported HUD, minimap, visual or production claims.

- [x] Confirm the selected repository head matched its prior repo-local documentation head.
- [x] Inspect `GameShell.tsx` route and screen composition.
- [x] Inspect `GameCanvas.tsx` frame and minimap-draw ownership.
- [x] Inspect `HUDOverlay.tsx` PLAYING and COMPLETED branching.
- [x] Inspect `Minimap.tsx` null-canvas guard and canvas component.
- [x] Inspect `package.json` scripts and dependencies.
- [x] Inspect `.agent/kit-registry.json` inventory.
- [x] Search for active-run HUD and minimap mount fixtures.
- [x] Update only `.agent` documentation and central tracking.
- [ ] Run runtime and browser fixtures after implementation exists.

## Source evidence

```txt
HUDOverlay screen filter: PLAYING and COMPLETED
PLAYING early return: SettingsOverlay + FrameDebugPanel
PLAYING objective/sequence/held/player panels: absent
PLAYING Minimap component: absent
COMPLETED panels and Minimap: present
GameCanvas minimap lookup: every render frame
null canvas behavior: drawMinimapFrame returns
HudMountGeneration: absent
GameplayHudProjectionResult: absent
FirstPlayingHudFrameAck: absent
active-run HUD fixture: absent
```

## Change classification

```txt
documentation changed: yes
runtime TypeScript changed: no
network behavior changed: no
input behavior changed: no
gameplay changed: no
Three.js behavior changed: no
Canvas2D behavior changed: no
packages or dependencies changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no
```

## Commands and fixtures

```txt
npm install: not run
npm run lint: not run
npm run build: not run
desktop browser launch: not run
solo PLAYING HUD fixture: unavailable
host PLAYING HUD fixture: unavailable
client PLAYING HUD fixture: unavailable
settings/debug preservation fixture: unavailable
minimap mount/draw fixture: unavailable
FirstPlayingHudFrameAck fixture: unavailable
production-build HUD smoke: not run
deployed-origin HUD smoke: not run
```

## Claim boundary

No runtime repair, active gameplay HUD availability, minimap availability, visual correctness, browser parity, deployment parity or production readiness is claimed.