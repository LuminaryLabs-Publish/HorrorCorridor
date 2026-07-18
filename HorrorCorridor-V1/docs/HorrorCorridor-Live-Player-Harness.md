# HorrorCorridor Live Player Harness

Status: active

## Purpose

`scripts/horror-corridor-live-player-harness.mjs` is the repo-local live-player validation harness for HorrorCorridor. It is aligned with NexusSimulator's Playwright simtime vocabulary, but it stays local to this repo so HorrorCorridor-specific debug gates, screenshot thresholds, and scene-dressing checks can evolve with the game.

## Command

```bash
npm run validate:live-player
```

The default package script launches a headed Chrome CDP profile on port `9224` and attaches to it because local headless Chromium launches are unstable in this environment.
Run the app separately before invoking the default validation command. The preferred local flow is:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
npm run validate:live-player
```

Useful variants:

```bash
npm run validate:live-player -- --dry-run
npm run validate:live-player -- --url http://localhost:3000/?debug=frames
npm run validate:live-player:dev
npm run validate:ceiling-overlap
npm run validate:ceiling-fracture
npm run validate:ceiling-material
npm run validate:industrial-shelving
npm run validate:wet-reflection
npm run validate:floor-material
npm run validate:success-path
npm run validate:restart-after-caught
npm run validate:reconnect-recovery
npm run validate:live-player -- --browser-executable /path/to/chrome-or-headless-shell
npm run validate:live-player -- --browser-engine all
npm run validate:live-player -- --browser-engine webkit
npm run validate:live-player -- --launch-cdp-chrome --cdp-port 9225
npm run validate:live-player -- --cdp-url http://127.0.0.1:9222
npm run validate:live-player -- --center-crop-ratio 0.82
```

## Harness Class

- Class: hybrid harness.
- Agent boundary: local script controls a browser actor and reads HorrorCorridor debug state.
- NexusSimulator boundary: command shape mirrors `openPage`, `click`, `holdKey`, `assertCanvasExists`, `captureScreenshot`, and `assertGlobalState`.
- HorrorCorridor boundary: product-specific gates stay here because NexusSimulator does not know this game's debug schema or visual thresholds.
- Capture boundary: the harness tries CDP attach first when a reachable `--cdp-url` or default local CDP port exists, then falls back to Playwright browser engines.

## Flow

1. Open `/?debug=frames`.
2. Click `Create a room`.
3. Click `Start run`.
4. Enable debug extraction and hide the debug overlay.
5. Wait for the renderer warmup boundary and `latestFrame.screen === "PLAYING"`.
6. Capture `starting-scene.png` before action.
7. Execute the selected action profile and verify its movement, look, encounter, or expedition contract.
8. Capture any profile-specific intermediate artifact and the final `movement-scene.png`.
9. Compute center-cropped luminance and bottom-left HUD-chrome pixels for every captured player view with Python/Pillow.
10. Validate scene-dressing counts, natural-domain reset/replay, runtime composition, and profile-specific state through `window.__HORROR_CORRIDOR_DEBUG__.extractState()`.
11. Write a JSON report to the selected artifact directory.

Important profiles:

- `forward`: canonical spawn and movement regression.
- `ceiling-overlap`: bounded movement into the room, an intermediate route capture, then `+0.32` yaw / `+0.34` upward look to inspect the ceiling/wall boundary.
- `ceiling-fracture`: the same bounded route/upward view plus exact collapsed-ceiling descriptor counts and Nexus Ceiling/Openings, Decay/Cracking, Ground/Rubble, and Fallen Masonry state gates.
- `ceiling-material`: bounded movement, an intermediate material capture, then authoritative `+0.32` yaw / `+0.34` upward look plus exact Ceiling surface, material-surface, generated-texture, relief, readability, HUD, and Nexus gates.
- `industrial-shelving`: 260 ms bounded movement, an intermediate approach capture, then authoritative `+0.82` left look plus exact placed-rack, authored-part, stored-part, triangle-depth, readability, and HUD gates.
- `wet-reflection`: 600 ms bounded movement, intermediate wet-ground capture, then `+0.7` yaw / `-0.24` pitch for a downward-side view.
- `floor-material`: 350 ms bounded movement, an intermediate room-floor capture, then `+0.32` yaw / `-0.48` requested pitch (clamped to `-0.261799`) for a downward-side concrete view.
- `success-path`: one uninterrupted intro, early repel/study, full-scare survival/collection, room-offer claim, and Building 3 expedition.
- `restart-after-caught`: enter the first encounter, face away through blackout/last chance/capture, verify the terminal hero action, observe loading, then prove new attempt identities, fresh expedition/Index truth, and resumed movement.
- `reconnect-recovery` is a dedicated two-page headed harness: create host/client pages, enter one shared run, move the client, sever only its transport, verify preserved-place recovery UX while the host advances, click rejoin, correlate the host recovery snapshot, inspect Nexus Rejoining/Shared Chronicle, and prove client movement resumes.
- movement, turn, listen, beam, and claim profiles support the persistent live-agent lane.

## Gates

- `canvasMounted`: the largest canvas has a non-zero size.
- `playingReached`: debug frame reaches `PLAYING`.
- `actionObserved`: the chosen profile satisfies its movement/look/game-state contract; ordinary movement must change the local pose by at least `0.25` world units.
- `hiddenPlayUi`: body text is empty after entering `PLAYING` and hiding the debug overlay.
- `noHudIconChrome`: bottom-left bright pixels stay at or below `25` in player-view artifacts.
- `propCount`: scene dressing reports at least `48` props.
- `textureCount`: scene dressing reports at least `96` texture/decal descriptors.
- `lightCount`: scene dressing reports at least `8` lights.
- `luminanceReadable`: center-cropped screenshot has `darkRatio <= 0.55` and `lightRatio >= 0.15`.
- `nexusResetReplay`: every mutable natural owner resets and fixed-step replay matches both reset and fresh-runtime digests.
- `wetReflectionViewsHudFree` / `wetReflectionViewsReadable`: every spawn, intermediate, and downward-side wet artifact passes the HUD and luminance thresholds.
- `ceilingOverlapViewsHudFree` / `ceilingOverlapViewsReadable`: every spawn, route, and upward-look ceiling artifact passes the HUD and luminance thresholds.
- `ceilingFractureDescriptorPublished` / `ceilingFractureNexusPublished`: the room and Nexus runtime agree on localized collapse, breach bounds, radial fracture, chipped edge, route-clear rubble, and settled fallen-masonry truth.
- `ceilingFractureViewsHudFree` / `ceilingFractureViewsReadable`: every spawn, post-movement, and upward-look fracture artifact passes the HUD and luminance thresholds.
- `ceilingMaterialDescriptorPublished` / `ceilingMaterialNexusPublished`: the chamber descriptor and Nexus runtime agree on reinforced-concrete-and-brick construction, damp-spalled condition, aggregate/seam pattern, roughness, and relief.
- `ceilingMaterialViewsHudFree` / `ceilingMaterialViewsReadable`: every spawn, post-movement, and upward-look material artifact passes the HUD and luminance thresholds; the room must report at least 3 ceiling-material surfaces, 2 generated textures, and positive relief.
- `industrialShelvingCompositionPublished`: the live room must publish at least 2 rack placements, 80 authored parts, 36 stored-object parts, and 1,280 wound triangles.
- `industrialShelvingViewsHudFree` / `industrialShelvingViewsReadable`: every spawn, approach, left-look, and final shelving artifact passes the HUD and luminance thresholds.
- `floorMaterialDescriptorPublished` / `floorMaterialNexusPublished`: the scene and Nexus runtime expose matching natural `Concrete / Slabs / Slab` truth, including `settled-pour-field` alignment and `settlement-branching` cracks.
- `floorMaterialViewsHudFree` / `floorMaterialViewsReadable`: every spawn, moved, and downward-side concrete artifact passes the HUD and luminance thresholds.
- Shared recovery: all 13 identity, host-continuity, request-correlation, restored-place, Nexus-history, post-recovery movement, and clean-console gates must pass.

## Outputs

Default artifact folder:

```text
docs/live-player-harness/latest/
├── report.json
├── movement-scene.png
└── starting-scene.png
```

The wet profile also writes `reflection-after-movement.png` under `docs/live-player-harness/wet-reflection-proof/`. The floor profile writes `floor-material-after-movement.png` under `docs/live-player-harness/floor-material-proof/`. The structural ceiling profile writes `ceiling-route-after-movement.png` under `docs/live-player-harness/ceiling-overlap-proof/`; the fracture profile writes `ceiling-fracture-after-movement.png` under `docs/live-player-harness/ceiling-fracture-proof/`; the material profile writes `ceiling-material-after-movement.png` under `docs/live-player-harness/ceiling-material-proof/`. The shelving profile writes `industrial-shelving-after-approach.png` and `industrial-shelving-side-look.png` under `docs/live-player-harness/industrial-shelving-proof/`. The success profile records its complete transition trace inside `action.proof.steps` under `docs/live-player-harness/success-path-proof/`. The restart profile writes `caught-terminal.png`, `restart-loading.png`, `fresh-expedition.png`, and `fresh-expedition-moved.png` under `docs/live-player-harness/restart-after-caught-proof/`.

The reconnect harness writes `shared-expedition-start.png`, `client-disconnected.png`, `host-during-disconnect.png`, `client-recovering.png`, `client-restored.png`, and a millisecond event timeline under `docs/live-player-harness/reconnect-recovery-proof/`.

`report.json` records:

- browser launch mode or launch blocker;
- debug state before and after movement;
- movement, yaw, and pitch deltas;
- visible text sample;
- canvas size;
- scene-dressing summary;
- runtime/core/local/composition kit counts and reset/replay proof;
- per-view luminance and HUD-chrome summaries;
- profile-specific proof and intermediate artifacts;
- pass/fail/blocked status.

## Failure Policy

- `passed`: all gates pass and no console/page errors were captured.
- `failed`: browser ran but a game, screenshot, movement, UI, or visual gate failed. The command exits non-zero.
- `blocked`: browser launch, navigation, app boot, or harness infrastructure failed. The command exits non-zero.
- `dry-run`: no browser was launched; only the harness contract and thresholds were emitted.

Browser launch failure is not treated as visual success. The harness writes the blocker into `report.json` so future work can distinguish "game failed" from "local browser proof unavailable."

## Known Limits

- This harness uses CPU center-cropped screenshot luminance thresholds so browser chrome and non-game margins do not mask a dark player view. It does not perform semantic image comparison against the generated target scene; human/reference review remains a separate acceptance layer.
- Text and image HUD checks are both active, but the image check is intentionally bounded to the bottom-left region. New HUD locations need matching view checks.
- It proves same-origin two-page client recovery through the browser-local bridge. Cross-device and cross-network PeerJS recovery are not yet proven.
- It depends on Playwright from this repo or the local NexusSimulator checkout. If both are missing, it reports `blocked`.
- It can launch a headed Chrome CDP profile with `--launch-cdp-chrome`, or attach to an already-running debug browser with `--cdp-url`. This is the preferred workaround when local Playwright browser launching fails.
- Python/Pillow is used for luminance. If unavailable, the luminance gate fails until a JS image decoder or alternate capture backend is added.

## Latest Runs

- Canonical Chrome, created `2026-07-18T01:49:23.332Z` on fresh CDP port `9225`: passed with `movementDelta=6.7464`, zero console errors, zero bottom-left HUD pixels, 474 installs, 359 reset owners, matching deterministic replay, 36 room props, 2 shelving objects / 82 parts / 38 stored parts / 1,360 triangles, 26 ceiling parts, 8 fracture paths, 10 edge fragments, 3 rubble clusters, 3 ceiling-material surfaces, and 2 generated ceiling textures.
- Industrial-shelving profile, created `2026-07-18T01:40:37.983Z`: passed with `movementDelta=3.1230`, `yawDelta=0.82`, 2 racks / 82 parts / 38 stored parts / 1,360 triangles, four readable/HUD-free views, deterministic reset/replay, and zero console errors. Human inspection rejected the old eight-part stand and the first over-close 500 ms / `+1.12` proof before retaining this framing.
- Generator side-look profile, created `2026-07-17T21:09:00.821Z`: passed with `yawDelta=1.05`, zero console/HUD errors, and readable spawn/look crops. It proves the retained 27-part / 708-triangle generator at normal player scale.
- Wet profile, created `2026-07-18T01:11:37.170Z`: passed with `movementDelta=5.0571`, `yawDelta=0.7`, `pitchAfter=-0.259833`, and all three views readable/HUD-free. The room reports 4 standing-water patches, 2 wet-ground patches, 6 water surfaces, and 6 broken-reflection layers.
- Floor-material profile, created `2026-07-18T01:11:16.558Z`: passed with `movementDelta=2.9943`, `yawDelta=0.32`, `pitchAfter=-0.261799`, zero console errors, and readable/HUD-free spawn, moved, and downward-side views. Nexus state reports 1,610 concrete cells, 3,220 settled slab memberships, settlement-branching cracks, aggregate exposure `0.18`, and wetness `0.46`.
- Ceiling-overlap profile, created `2026-07-18T01:10:52.816Z`: passed with `movementDelta=2.9979`, `yawDelta=0.32`, `pitchAfter=0.261799`, and readable/HUD-free spawn, route, and upward-look views.
- Ceiling-fracture profile, created `2026-07-18T01:10:30.482Z`: passed with `movementDelta=2.9997`, authoritative `yawDelta=0.32`, `pitchAfter=0.261799`, zero console/HUD contamination, matching natural Nexus state, 26 ceiling parts, 8 fracture paths, 10 edge fragments, and 3 rubble clusters.
- Ceiling-material profile, created `2026-07-18T01:06:49.544Z`: passed with `movementDelta=2.2473`, authoritative `yawDelta=0.32`, `pitchAfter=0.261799`, exact Ceiling surface agreement, 3 material surfaces, 2 generated textures, `0.32` relief, three readable/HUD-free views, deterministic reset/replay, and zero console errors.
- Success profile, created `2026-07-18T01:12:00.470Z`: passed in `34,962 ms` with score 2, The Still Guest collected, Salt Chalk claimed, and a matching furnished Building 3.
- Restart profile, created `2026-07-18T01:12:57.231Z`: passed a real `caught -> COMPLETED -> LOADING -> PLAYING/intro` loop in `45,511 ms`; room/player identities changed, all run and Monster Index counters reset, fresh movement reached `4.05`, and every standard runtime/player gate passed with zero console errors.
- Shared recovery profile, created `2026-07-18T01:14:04.104Z`: passed in `20,008 ms`; host authority advanced from tick 39 to 54 while the client was disconnected, correlated recovery restored the exact host place at authoritative tick 59 with zero position disagreement, Nexus recorded all three recovery history states, post-recovery movement reached `2.25`, and all 13 gates passed with zero console errors.
- Human-view status is `Fixed` for the bounded generator and industrial-shelving silhouettes, structural ceiling overlap, fine ceiling fracture/settled rubble, wet-concrete floor, and ceiling-surface identity and `Partially Fixed` for the full room: wet highlights stay inside irregular water footprints, the generator reads as a functional ruined machine, the storage wall reads as loaded two-bay racks, the upper collapse is connected/chipped with fallen material, the floor reads as damaged damp concrete, and intact/collapsed ceiling surfaces share damp-spalled masonry identity, but true reflection, wall/prop surface wear, remaining props, and edge density remain below the V2 target.

## CDP Workaround

If the default package script needs a different port, run:

```bash
npm run validate:live-player -- --launch-cdp-chrome --cdp-port 9225
```

To attach to an already-running debug browser instead, run:

```bash
npm run validate:live-player -- --cdp-url http://127.0.0.1:9222
```
