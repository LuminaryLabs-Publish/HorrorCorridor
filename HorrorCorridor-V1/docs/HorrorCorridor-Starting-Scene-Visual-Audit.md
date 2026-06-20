# HorrorCorridor Starting Scene Visual Audit

Status: active

## Target Reference

The generated target reference is an in-thread image/spec: first-person, no HUD, high-fidelity industrial horror corridor, readable damp floor, readable walls/ceiling, visible foreground and midground pipes/cables/vents/panels/debris, green fill lights, warm player-follow light, faint anomaly glow, soft fog, and clear route direction.

No durable local generated-image file was available from the image tool cache during the 2026-06-19 validation pass, so the auditable target is the explicit spec above plus the current player-view screenshot below.

## Current Capture

- Path: `docs/current-starting-scene.png`
- Browser: `http://localhost:3000/`
- State: `PLAYING`
- Canvas: `1400x900`
- Visible game text nodes: `0`
- Debug counters: `propCount=140`, `textureCount=260`, `lightCount=27`, `walkthroughCheckpointCount=8`
- Luminance audit: `65.3%` of pixels below luminance `15`; `0%` of pixels at or above luminance `35`

## Implementation Pass Evidence

- First tuning path: `docs/current-starting-scene-after-tuning.png`
  - Pixels below luminance `15`: `42.0%`
  - Pixels at or above luminance `35`: `19.5%`
- Spawn-prioritized dressing path: `docs/current-starting-scene-after-spawn-dressing.png`
  - Pixels below luminance `15`: `43.4%`
  - Pixels at or above luminance `35`: `26.9%`
- Cylinder prop pass path: `docs/current-starting-scene-after-cylinders.png`
  - Pixels below luminance `15`: `39.5%`
  - Pixels at or above luminance `35`: `29.4%`

## Current Result Assessment

- Fixed: the starting scene is no longer a near-black empty view.
- Fixed: the first view now shows visible wall/floor separation, route geometry, and spawn-adjacent world dressing.
- Fixed: pipes/cables are no longer represented only by box meshes.
- Still failing target fidelity: props remain primitive and low-detail compared with the target concept.
- Still failing target material richness: floor/wall textures read mostly as flat colors instead of high-fidelity damp concrete, painted metal, and grime.
- Still failing target composition: the route is readable but lacks a strong focal cue or anomaly glow in the starting view.

## Pedantic Differences

- Target has visible foreground props; current foreground is mostly empty floor.
- Target has readable midground dressing; current midground dressing is barely perceptible.
- Target has clear wall panels/pipes/cables; current walls read as large dark slabs.
- Target has visible floor grime/decal texture; current floor is a broad dark green plane with little material breakup.
- Target has multiple local light sources; current light sources exist in counters but do not visibly shape the frame.
- Target has a readable route cue; current path direction is only weakly implied by wall silhouettes.
- Target has atmospheric fog with depth; current fog/darkness flattens the middle distance.
- Target darkness is intentional and detailed; current darkness hides most content.
- Target has floor/wall/ceiling separation across foreground and midground; current separation exists but is too low-contrast.
- Target feels high-fidelity procedural; current still feels like a dark prototype with hidden generated content.

## Sequence-It Plan

1. Retune scene exposure without changing gameplay: fog, ambient, hemisphere, player-follow light.
2. Brighten core Lambert world materials slightly while keeping green-black horror mood.
3. Reduce visual safe radius for non-blocking scene dressing so spawn-adjacent props/decals/lights can appear.
4. Add a small spawn-readability cluster through descriptor generation, not hardcoded renderer one-offs.
5. Re-capture the starting scene and require measurable plus visible improvement.

## Simulate-It Outcome

- Pass 1 prediction: stronger local light and lower fog density make floor/wall separation readable, but props may remain invisible if placement avoids spawn.
- Review prediction: adding spawn-adjacent non-blocking descriptors is necessary because content counters alone do not guarantee visible content.
- Reconciled result: tune lighting/materials and descriptor placement together in one small pass.

## Audit-It Findings

- `Signal flow` is healthy, but `presentation` fails.
- The render validation flag `readableSpawnView` is too semantic; it detects sampled nearby walls but not visible brightness or content.
- The current scene-generation safe zone protects gameplay but overprotects visual dressing near spawn.
- Future hardening should add screenshot luminance and visible-geometry thresholds to the validation harness.

## Harness-It Proposal

- Harness name: `horror-corridor-live-player-harness`
- Class: Hybrid Harness
- Actor: NexusSimulator live-player runner plus Playwright browser capture.
- Purpose: repeatedly boot HorrorCorridor, start a host run, move/look like a player, capture screenshots and debug state, and gate visual readability.
- Inputs: route URL, action script, screenshot thresholds, debug extraction fields.
- Outputs: screenshots, debug JSON, luminance report, movement report, pass/fail gate report.
- Gates: boot reached, `PLAYING`, canvas mounted, movement works, visible text hidden, luminance threshold, visible scene-dressing threshold.
- First implementation should be local to this repo after the current visual tuning pass.

## Next Restart Focus

Because noticeable differences remain, the next loop should focus on prop/material fidelity:

1. Replace basic box props with a small local mesh-builder kit for pipes, vents, panels, cable bundles, and debris silhouettes.
2. Add procedural material map generation that visibly affects albedo/roughness/emissive variation, not just object counts.
3. Add screenshot-gated thresholds for visible prop coverage and midground landmark visibility.
4. Add a staged procedural loading scene so expensive maze, raymarch, descriptor, material, texture, and render setup work is inspectable before `PLAYING`.
5. Add first-person embodiment: movement-driven camera shake now, then bobbing hands as foreground objects in a later pass.
6. Keep solo procedural validation as the first proof path before multiplayer regression testing.

## Restart Loop - Prop/Material Fidelity Pass

- Target reference: generated in-thread on 2026-06-19. It shows a no-HUD first-person industrial horror corridor with readable floor/wall/ceiling separation, damp concrete/painted-metal material breakup, wall pipes, bundled cables, vents, panels, debris, green fill lights, warm player spill, fog depth, and a distant focal glow.
- Current pre-pass reference: `docs/current-starting-scene-after-cylinders.png`.
- Pedantic remaining differences before this pass:
  - Props were visible but mostly primitive boxes/cylinders.
  - Floor and wall materials had weak roughness/grime breakup.
  - Vents and panels lacked silhouette details such as slats, indicators, clamps, or bundled cable shapes.
  - Spawn foreground had limited floor debris even though the target has foreground dressing.
  - The local ProtoKit stack described fidelity intent but did not expose a prop/material fidelity capability.

### Sequence-It

1. Add a generic local `prop-material-fidelity-domain-kit` with mesh-profile, material-profile, and visible-content threshold services.
2. Move HorrorCorridor fidelity values into the preset and content-pack manifest.
3. Extract Three.js prop/material realization from `worldBuilder.ts` into a dedicated render module.
4. Replace primitive prop realization with richer grouped meshes: pipe clamps/brackets, cable bundles, vent slats, panel indicators, debris clusters, and pedestal dressing.
5. Strengthen spawn-adjacent floor dressing and brighter grime/decal descriptors.
6. Validate static correctness and attempt human-view browser capture.

### Simulate-It

- Pass 1 prediction: richer mesh groups and stronger texture variation should make generated content read less like block placeholders, while keeping gameplay collision unchanged because descriptors remain non-blocking.
- Review prediction: visual quality still cannot be accepted without a fresh screenshot; static checks can only prove code correctness and buildability.
- Reconciled result: the implementation should be marked architecture/code improved, with player-visible improvement unverified until browser capture works again.

### Audit-It

- Finding: `worldBuilder.ts` was carrying mesh/material construction that belongs in a render-owned scene-dressing builder.
- Hardening: `sceneDressingRenderer.ts` now owns Three.js mesh/material realization while descriptor generation stays data-oriented.
- Finding: the local kit manifest lacked a fidelity capability for prop/material profiles.
- Hardening: `prop-material-fidelity-domain-kit` now declares generic mesh-profile, material-profile, and visible-content-threshold services; HorrorCorridor-specific values live in `horror-corridor-preset.ts`.
- Finding: visual validation tooling is currently fragile.
- Hardening needed next: implement the proposed NexusSimulator/Playwright harness or an alternate screenshot backend because the current browser capture failed before visual acceptance could be proven.

### Implementation Evidence

- Added `src/protokits/prop-material-fidelity-domain-kit/index.ts`.
- Added `propMaterialFidelity` preset/config/content-pack wiring.
- Added `src/features/render/three/sceneDressingRenderer.ts`.
- Updated `worldBuilder.ts` to compose renderables instead of owning mesh/material realization.
- Updated `sceneDressingDescriptors.ts` to prioritize spawn-near floor dressing and brighter grime/wear projections.
- Removed network-dependent `next/font/google` usage so production build no longer depends on fetching Google Fonts.

### Validation Evidence

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed after local font fallback hardening.
- Harness validation:
  - `node --check scripts/horror-corridor-live-player-harness.mjs`: passed.
  - `npm run validate:live-player -- --dry-run`: passed.
  - `npm run validate:live-player -- --launch-cdp-chrome --cdp-port 9224`: passed.
  - Latest screenshot path: `docs/live-player-harness/latest/starting-scene.png`.
  - Launch mode: `cdp:http://127.0.0.1:9224`.
  - Movement delta: `8.2575` world units.
  - Visible text: `0` characters.
  - Luminance: `darkRatio=0.3879`, `lightRatio=0.3876`, average `25.6550`.
  - Scene dressing: `propCount=140`, `textureCount=260`, `lightCount=27`, `walkthroughCheckpointCount=8`.
  - Note: Playwright-launched Chromium/WebKit/Firefox paths still fail in this environment, but the self-launched CDP Chrome backend now provides current player-view proof.
- Harness infrastructure pass:
  - Added `scripts/horror-corridor-live-player-harness.mjs`.
  - Added `npm run validate:live-player`.
  - Added `docs/HorrorCorridor-Live-Player-Harness.md`.
  - The harness writes `docs/live-player-harness/latest/report.json`, and it must report `passed` before this visual target is accepted.
  - `node --check scripts/horror-corridor-live-player-harness.mjs`: passed.
  - `npm run validate:live-player -- --dry-run`: passed and wrote the expected report shape.
  - `npm run validate:live-player`: passes through the default self-launched CDP Chrome backend.

### Target-vs-Actual Human-View Review

- Current actual screenshot: `docs/live-player-harness/latest/starting-scene.png`.
- Harness status: `passed` through CDP, with readable luminance and zero visible text.
- Human-view status: still `Partially Fixed`, not visually accepted.
- Target no-HUD mismatch: the current screenshot still shows a bottom-left compass/marker even though no text is visible.
- Fidelity mismatch: target expects detailed PBR-like concrete, painted metal, wet/grime breakup, emissive accents, and strong silhouettes; current scene still reads as flat colored slabs with low-detail props.
- Composition mismatch: target expects readable foreground, midground landmark, and route cue; current corridor route is visible but the upper half is mostly black and the midground focal cue is weak.
- Lighting mismatch: target expects visible green accent sources plus warm player spill; current luminance passes, but light sources do not clearly shape the frame.
- Prop/texture mismatch: target expects pipes/cables/vents/panels/debris to be visually dominant; current props exist but read as sparse primitive blocks/cylinders and decals are subtle.

### Status

- Code/architecture target: Partially Fixed.
- Visual target: Partially Fixed after this pass.
- Required next action: tune `SCENE-002` for higher-fidelity materials/props, stronger midground landmark lighting, richer upper-frame ceiling/wall dressing, and remove or explicitly gate the remaining compass marker for no-HUD play.

## Restart Loop - Solo Procedural Shader/Texturing Pass

- Date: 2026-06-19.
- Target: move from primitive flat dressing toward a high-fidelity procedural corridor using procedural surface textures, post-process atmosphere, alpha-clipped props, solo validation, and movement feel.

### Implemented

- Added a solo procedural test path from the start screen. It bypasses multiplayer transport and enters `PLAYING` with one local authoritative player.
- Added `solo-sim` debug frame mode so the live-player harness can prove non-multiplayer runtime simulation.
- Updated the live-player harness to prefer the solo path before falling back to host/lobby flow.
- Added bottom-left icon/widget no-HUD image validation so canvas-drawn compass/HUD chrome is caught separately from visible text.
- Fixed stale minimap canvas caching by re-reading the live DOM canvas each frame instead of keeping a detached cached ref.
- Added deterministic procedural texture maps for world floor, branch floor, walls, ceilings, trim, end wall, and pedestals.
- Added a post-process visual overlay for vignette, scanline, and subtle film/noise atmosphere.
- Added alpha-clipped procedural prop materials using deterministic alpha masks and `alphaTest`.
- Added new descriptor-driven floor entities: `table` and `crate`.
- Added movement-driven camera shake/bob tied to actual local velocity.
- Tracked future additions: staged procedural loading sections and bobbing first-person hands.

### Validation Evidence

- `node --check scripts/horror-corridor-live-player-harness.mjs`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- Live-player harness command:
  - `node scripts/horror-corridor-live-player-harness.mjs --start-server --launch-cdp-chrome --cdp-port 9224 --artifact-dir docs/live-player-harness/latest`
  - Status: failed visual luminance gate.
  - `playMode`: `solo`.
  - `latestFrame.mode`: `solo-sim`.
  - `movementDelta`: `0.45`.
  - `hiddenPlayUi`: passed.
  - `noHudIconChrome`: passed with `bottomLeftBrightPixels=0`.
  - Scene dressing counts: `propCount=140`, `textureCount=260`, `lightCount=27`, `walkthroughCheckpointCount=8`.
  - Luminance failed: `average=9.71`, `darkRatio=0.783`, `lightRatio=0.0053`.
  - Screenshot: `docs/live-player-harness/latest/starting-scene.png`.

### Human-View Result

- Fixed: non-multiplayer solo testing is now available and harness-visible.
- Fixed: the remaining bottom-left compass/marker is gone in the latest screenshot.
- Improved: floor/wall surfaces now show procedural noise/grime texture instead of flat untextured color.
- Improved: post-process scanline/noise atmosphere is visible.
- Improved: scene content is still descriptor-driven rather than hardcoded one-offs.
- Still failing: the scene remains too dark by metric and human view.
- Still failing: upper frame and midground remain under-authored.
- Still failing: newly added floor entities are not prominent enough in the current captured frame.
- Still missing: first-person hands that bob with movement/carry/interact state.

## Restart Loop - Production Readability Rebalance

- Date: 2026-06-19.
- Target: make the true starting scene readable from a player perspective without accepting stale dev-server screenshots or post-movement wall-framing as starting-scene proof.

### Implemented

- Rebalanced the core render stack:
  - Raised ceiling, wall, floor, and branch-floor material response.
  - Reduced fog crush and set a dark green-gray background/fog floor.
  - Restored stronger player-follow/start lighting while avoiding the washed-out all-green pass.
  - Brightened generated prop material families enough to remain visible in the player-view frame.
- Updated the live-player harness:
  - `starting-scene.png` is now captured before movement.
  - `movement-scene.png` is captured after `W` movement for locomotion proof.
  - `npm run validate:live-player` now validates an already running app; `npm run validate:live-player:dev` retains the dev-server helper.

### Validation Evidence

- `node --check scripts/horror-corridor-live-player-harness.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- Production server validation command: `npm run validate:live-player`: passed.
- Latest artifacts:
  - `docs/live-player-harness/latest/starting-scene.png`
  - `docs/live-player-harness/latest/movement-scene.png`
  - `docs/live-player-harness/latest/report.json`
- Latest report:
  - `hiddenPlayUi=true`
  - `noHudIconChrome=true`
  - `movementDelta=8.2584`
  - `darkRatio=0`
  - `lightRatio=0.9668`
  - average luminance `52.4023`
  - scene dressing counts: `propCount=140`, `textureCount=260`, `lightCount=27`, `walkthroughCheckpointCount=8`

### Human-View Result

- Fixed: the current starting frame is readable, HUD-free, route-forward, and no longer black.
- Fixed: the harness now validates the actual starting frame rather than a post-movement wall-adjacent frame.
- Improved: upper-frame ceiling/wall separation is visible.
- Improved: movement proof remains separate and still passes.
- Still partially failing: the scene is too uniformly green compared with the target reference.
- Still partially failing: generated props read as pale primitive slabs rather than high-fidelity pipes, cables, vents, boxes, and debris.
- Still partially failing: focal/anomaly lighting remains weak.
- Required next action: tune prop mesh/material silhouette quality and add stronger authored/kit-driven focal lighting before considering `SCENE-002` visually fixed.
- Still missing: staged loading scene for procedural generation phases.

### Next Required Batch

1. Add a real render/post-processing pass that lifts exposure without flattening mood. CSS overlay alone is not enough.
2. Add foreground first-person hands as bobbing render objects tied to movement and held-object state.
3. Add stronger spawn/midground entity placement for tables/crates/debris so they appear in the captured route, not just descriptor counts.
4. Add staged procedural loading UI/scene: maze generation, raymarch sampling, descriptors, procedural materials/textures, render attach, and entering play.
5. Add stronger visual coverage gates for foreground entity visibility, not just prop counts.

## Restart Loop - Broken-City Palette and Readability Pass

- Date: 2026-06-19.
- Target reference: generated in-thread for this pass. It shows a no-HUD, first-person, dirty overgrown broken-city corridor with muddy floor, broken concrete/brick walls, rusted pipes/cables, rubble, roots/weeds, warm player spill, dim practical lights, rare sickly anomaly accents, and readable foreground/midground/focal content.
- Current pre-pass screenshot: `docs/live-player-harness/latest/starting-scene.png` from the prior production readability run.

### Current-vs-Target Delta

- Palette: previous screenshot was too uniformly green; target is muddy brown/rust/dirty concrete with rare green anomaly accents.
- Materials: previous floor/walls were readable but still looked like flat tinted slabs; target expects rough broken concrete, mud, rust, wet grime, and moss/root breakup.
- Props: previous props existed by count but read as pale primitive panels/blocks; target expects recognizable pipes, cables, vents, boxes, rubble, roots, and debris silhouettes.
- Lighting: previous frame passed luminance but lacked warm practical contrast and focal route lights; target expects warm player spill and visible practical pools.
- Decals/particles: previous bright plates/slime marks dominated in places; target expects integrated mud/moss/rust/grime projections.

### Sequence-It

1. Keep gameplay/runtime unchanged.
2. Move color/material tuning through render materials, scene descriptors, and HorrorCorridor preset values.
3. Convert wall/floor projections from green slime plates toward mud, moss, rust, crack, and grime descriptors.
4. Add rusted-metal material support and strengthen root/rubble spawn-side dressing.
5. Rebalance exposure, fog, ambient, player-follow, and start lights until the live-player luminance gate passes.
6. Human-review the screenshot and keep `SCENE-002` partial if props still read as primitive slabs.

### Simulate-It

- Pass 1 prediction: brown/rust materials improve semantic target alignment but may crush luminance.
- Review prediction: if luminance fails, raise warm fill/exposure rather than reverting to neon green.
- Reconciled result: target direction should become more broken-city and less cyber-green, but prop mesh quality will remain the next blocker.

### Audit-It

- Finding: descriptor counts were not enough; the player needed visible material direction and a screenshot gate.
- Hardening: the pass kept the live-player luminance gate intact and tuned to pass it instead of lowering the threshold.
- Finding: prop silhouettes still overuse flat panel/block geometry.
- Hardening needed next: replace panel/table/crate placeholder slabs with stronger grouped mesh profiles and material-specific geometry.

### Implemented

- `sceneDressingDescriptors.ts`
  - Added texture kinds for `mud`, `moss`, `rust`, and `crack`.
  - Shifted wall/floor projection colors toward muddy/rusty browns.
  - Reduced non-anomaly projection opacity so decals read more like grime than bright plates.
  - Allowed non-blocking root/debris dressing in the spawn-forward vicinity without adding gameplay collision.
  - Routed pipes/vents through a new `rusted-metal` material family.
- `sceneDressingRenderer.ts`
  - Added `rusted-metal` material response.
  - Warmer/browner material families replace the green-biased defaults.
  - Added a mixed-shape rubble builder so rubble is not only box fragments.
  - Lowered non-anomaly texture opacity caps.
- `createMaterials.ts`, `createLights.ts`, `createScene.ts`, `createRenderer.ts`, `worldBuilder.ts`
  - Shifted core world palette toward mud/rust/broken concrete.
  - Reduced neon ooze intensity.
  - Raised warm fill, start light, player-follow light, exposure, and fog background enough to pass the strict repo harness.
- `horror-corridor-preset.ts`
  - Added `rusted-metal` to the local preset material families.

### Validation Evidence

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- Production server validation:
  - `npm run validate:live-player`: passed.
  - `playMode=solo`
  - `latestFrame.mode=solo-sim`
  - `consoleErrors=[]`
  - `movementDelta=8.531999999999925`
  - `hiddenPlayUi=true`
  - `noHudIconChrome=true`
  - `propCount=140`
  - `textureCount=260`
  - `lightCount=27`
  - `average luminance=45.844157475608284`
  - `darkRatio=0.015671180230966072`
  - `lightRatio=0.5704972946942013`
- Independent lighting scout:
  - `PASS`
  - `dark=1.59%`
  - `readable=57.03%`
  - `mean=45.77`
  - `edge=13.81`

### Human-View Result

- Fixed: the current frame is no-HUD, readable, route-forward, and passes both the repo live-player luminance gate and the lighting scout metric.
- Improved: the palette is no longer a uniform neon/terminal green wash; it reads more like brown mud/rust/concrete with limited green accents.
- Improved: floor/wall/ceiling surfaces show more material texture and the route remains visible.
- Improved: root/rubble/debris dressing is more visible near the player path.
- Still partially failing: several wall/panel/table/crate objects still read as pale flat slabs rather than believable props.
- Still partially failing: the target overgrown/broken-city prop vocabulary is not rich enough yet; pipes/cables/vents/rubble need stronger silhouettes and scale variation.
- Still partially failing: focal/anomaly lighting exists but should become a clearer route landmark rather than only a distant glow.

### Status

- `SCENE-002`: Partially Fixed.
- `VALIDATION-002`: Fixed and still passing.
- Required next action: replace pale slab props with stronger mesh profiles/material-specific geometry, add more recognizable rusted practical fixtures and broken-wall/brick detail, and keep the current no-HUD/luminance gates passing.

## 2026-06-19 Smoke-First Loading And Pipe/Object Pass

### Intent

- Add an external smoke loop for procedural kit generation before main-game integration.
- Add visible loading steps so procedural generation is inspectable before `PLAYING`.
- Add more pipe/object descriptor variety while preserving the passing player-view gates.

### Implemented

- Added `/api/procedural-kit-smoke` to generate maze and scene dressing descriptors outside `GameCanvas`.
- Added `scripts/procedural-kit-smoke.mjs` and `npm run smoke:protokits` as the smoke-first validation entrypoint.
- Added a centered `LOADING` app scene with staged steps: maze field, terrain raycast, object kits, PBR materials, and lighting pass.
- Added `floor-pipe` descriptor support and kept pipe/vent materials routed through `rusted-metal` where appropriate.

### Validation Evidence

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run smoke:protokits`: passed.
  - `props=140`
  - `textures=260`
  - `lights=27`
  - `walkthrough=8`
  - material families included `rusted-metal`, `rubber-cable`, `painted-metal`, `muddy-grass`, `broken-rubble`, `damp-concrete`, and `root-fiber`.
- `npm run validate:live-player:dev`: passed.
  - `movementDelta=5.2514999999999645`
  - `darkRatio=0.025661454349735133`
  - `lightRatio=0.45963405191543205`
  - `propCount=140`
  - `textureCount=260`
  - `lightCount=27`
  - `consoleErrors=[]`
- Lighting scout metric: `PASS`, `dark=2.47%`, `readable=46.13%`, `mean=36.3`, `edge=13.54`.

### Human-View Result

- Fixed: procedural generation now has a repeatable smoke path before entering the main horror corridor runtime.
- Fixed: loading is a centered app scene instead of an invisible synchronous jump from menu to play.
- Improved: the player-view frame still reads as a dirty brown/rust corridor with visible props, pipes, debris, and terrain dressing.
- Still partial: props are more numerous and validated, but several object silhouettes still need a visual preview loop before main integration to stop pale slab-like objects from entering the play scene.

### Next Visual Loop

- Add a dedicated visual kit preview scene or route for generated props/materials.
- Use the preview to iterate tables, crates, wall panels, floor pipes, cables, rubble, roots, and broken-wall pieces before inserting them into the main corridor.
- Keep `npm run smoke:protokits` as the descriptor gate and `npm run validate:live-player:dev` as the player-view gate.

## 2026-06-19 Projection Slab Breakup Pass

### Target Reference

- Generated in-thread for this restart loop: no-HUD first-person dirty overgrown broken-city horror corridor.
- Target qualities: tighter corridor framing, cracked damp concrete, muddy/mossy floor edges, roots/rubble/broken brick, rusted pipes with clamps, bundled cables, vent grilles, hinged wall boxes, warm player spill, dim amber practical lights, and rare sickly anomaly glow.
- Explicit avoid list: pale flat slabs, floor sticker rectangles, clean sci-fi panels, placeholder cubes, broad empty warehouse space, and UI/HUD.

### Current-vs-Target Delta Before This Pass

- Current was readable and no-HUD, but still looked like a broad low-ceiling warehouse rather than a tight broken corridor.
- Current had pale rectangular floor/wall projections that read as paper decals instead of grime, stains, cracks, moss, or rust.
- Current had shelf-like side objects and low-fidelity blocky prop clusters.
- Current had visible route direction, but the target expects stronger foreground/midground silhouettes and more believable material breakup.

### Sequence-It

1. Keep the passing movement/no-HUD/luminance gates intact.
2. Reduce generated wall and floor projection scale so stains stop reading as large rectangular planes.
3. Darken projection colors and opacity toward grime/mud/rust instead of pale highlights.
4. Add procedural alpha masks for projection planes so decals have irregular worn edges.
5. Preserve render ownership by keeping descriptor generation in `sceneDressingDescriptors.ts` and material realization in `sceneDressingRenderer.ts`.
6. Re-run static checks, production smoke API proof, live-player harness, and human-view screenshot review.

### Simulate-It

- Pass 1 prediction: smaller darker projections with irregular alpha should remove the obvious pale slab/sticker read while preserving corridor readability.
- Review prediction: luminance may drop because bright projection planes contributed to readable-pixel ratio.
- Reconciled result: fix projection readability first, then only tune lighting/material response if the live-player luminance gate fails. Do not lower the gate.

### Audit-It

- Finding: projection descriptors were too large, too rectangular, and too bright for the broken-city target.
- Hardening: projection planes now use generated alpha masks and lower opacity so descriptor counts cannot produce obvious flat placeholder slabs.
- Finding: animation was overriding texture opacity with a fixed bright pulse.
- Hardening: texture pulse now respects each material's base opacity.
- Finding: generated texture resources need explicit disposal.
- Hardening: projection alpha textures are now tracked on material userData and disposed by the scene-dressing layer.

### Implemented

- `sceneDressingDescriptors.ts`
  - Reduced wall anomaly-residue probability near spawn.
  - Reduced wall and floor projection scales.
  - Darkened wall/floor projection colors.
  - Lowered wall/floor projection opacity.
- `sceneDressingRenderer.ts`
  - Added deterministic irregular projection alpha textures.
  - Added `alphaMap` and `alphaTest` to scene texture planes.
  - Capped projection opacity lower for both anomaly and non-anomaly projections.
- `worldBuilder.ts`
  - Texture pulse now uses material `baseOpacity`.
  - Disposes generated projection alpha textures.

### Validation Evidence

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- Production smoke API probe against the fresh production server: passed.
  - `props=140`
  - `textures=260`
  - `lights=27`
  - `walkthrough=8`
  - `failures=[]`
- Standalone `npm run smoke:protokits`: failed in this environment with repeated dev-server `404` for `/api/procedural-kit-smoke`; production API proof confirms the route and descriptor generation are valid after build. The standalone smoke script should be hardened in a later validation-tooling pass.
- `npm run validate:live-player`: passed.
  - `playMode=solo`
  - `latestFrame.mode=solo-sim`
  - `consoleErrors=[]`
  - `movementDelta=5.5484999999998195`
  - `hiddenPlayUi=true`
  - `noHudIconChrome=true`
  - `propCount=140`
  - `textureCount=260`
  - `lightCount=27`
  - `average luminance=37.28456085876144`
  - `darkRatio=0.0190516321539522`
  - `lightRatio=0.503027534630747`
- Lighting scout metric:
  - Spawn: `PASS`, `dark=1.92%`, `readable=50.54%`, `mean=37.37`, `edge=14.52`
  - Movement: `PASS`, `dark=5.41%`, `readable=37.46%`, `mean=32.82`, `edge=14.89`

### Human-View Result

- Fixed: the obvious large pale floor sticker rectangles are substantially reduced.
- Fixed: route, floor, and wall readability still pass after darkening projections.
- Improved: wall/floor markings now read more like broken grime/rust/moss patches than uniform white planes.
- Still partial: the space remains wider and more warehouse-like than the generated target.
- Still partial: blocky crates/debris and shelf-like side props still need stronger authored mesh silhouettes.
- Still partial: midground focal/anomaly lighting is readable but not yet a strong landmark.

### Status

- `SCENE-002`: Partially Fixed.
- `VALIDATION-002`: Fixed and still passing.
- Required next action: build a visual kit preview route/scene so prop silhouettes can be inspected independently, then replace the remaining blocky shelves/crates/panels with stronger mesh profiles before main-scene integration.

## Visual Director Skill Gate Pass - 2026-06-19

### Visible Process Problem

- The visual workflow could still drift into accepting technical evidence, such as kit manifests, render counts, debug state, mounted canvases, or luminance metrics, before judging whether the player-view screenshot actually looked good.

### Implemented Guardrail

- Added the local `horror-visual-director` skill under `/Users/crimsonwheeler/.codex/skills/horror-visual-director/SKILL.md`.
- Patched the existing global `do-it`, `human-game-view-expert`, `lighting-balance-scout`, and `screenshot-review-scout` skills to route HorrorCorridor-style dark first-person visual work through that gate when available.
- Updated `memory.md`, `.agent/workflow.md`, `.agent/memory.md`, `.agent/change-log.md`, and `docs/HorrorCorridor-V1-Parity-Audit.md` so future visual batches start with target/current screenshots and current-vs-target deltas.

### Acceptance Impact

- `SCENE-002` remains `Partially Fixed`; no runtime visual claim changed in this pass.
- Future visual passes cannot be accepted from architecture, kit, descriptor, debug, or nonblank-render evidence alone.
- The next visual batch must invoke `horror-visual-director`, capture player-view proof, and explicitly decide `Fixed`, `Partially Fixed`, `Still Failing`, or `Unverified` from screenshot evidence.

## Small-Object And Procedural Texture Kit Pass - 2026-06-19

### Current Screenshot Objects Identified

- Green utility crate stacks along the floor and side walls.
- Small rubble piles and broken chunks near the player path.
- Loose flat slab/debris pieces on the floor.
- Long overhead service strips/duct rails.
- Wall patches/stains that should read as brick courses, rust streaks, moss/grime, and wet concrete instead of generic noise.
- Small warm/green light cues that should remain rare focal accents, not broad cyber styling.

### Implemented Object Kits

- `utility-crate-object-kit`
  - Produces stacked crate/storage descriptors.
  - Rendered as grouped crates with straps/rails.
- `brick-rubble-object-kit`
  - Produces broken brick/concrete pile descriptors.
  - Rendered as many rotated brick chunks with darker pieces.
- `loose-floor-slab-object-kit`
  - Produces loose terrain-projected slab descriptors.
  - Rendered as low cracked floor fragments.
- `ceiling-service-strip-object-kit`
  - Produces overhead service rail/strip descriptors.
  - Rendered as rails, conduits, hangers, and weak indicator cues.

### Implemented Texture Kits

- `brick-course-texture-kit`
  - Produces wall brick/mortar projection descriptors.
- `damp-mud-texture-kit`
  - Produces wet mud/floor projection descriptors.
- `rust-streak-texture-kit`
  - Produces vertical corrosion/rust projection descriptors.
- `moss-grime-texture-kit`
  - Produces organic moss/grime buildup descriptors.
- `wet-concrete-texture-kit`
  - Produces concrete stain/crack projection descriptors.

### Open-Sky / Cell-Shading Direction

- Added `open-sky-projection-domain-kit`.
- Added top-down projected `building-facade` descriptors.
- Added `broken-brick`, `painted-utility`, and `wet-concrete` material families.
- Increased generated surface texture resolution to reduce the previous blocky low-resolution noise.
- Added roofless/open-sky static-layer support and varied projected wall/building heights.

### Validation Evidence

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run smoke:protokits`: passed.
  - `building-facade=36`
  - `utility-crate-stack=4`
  - `brick-rubble-pile=2`
  - `loose-floor-slab=4`
  - `ceiling-service-strip=8`
  - `brick-course=35`
  - `damp-mud=56`
  - `rust-streak=32`
  - `moss-grime=44`
  - `wet-concrete=55`
- Live-player command:
  - `node scripts/horror-corridor-live-player-harness.mjs --start-server --launch-cdp-chrome --cdp-port 9231 --artifact-dir docs/live-player-harness/latest`
  - Status: `passed`.
  - `playMode=solo`
  - `latestFrame.mode=solo-sim`
  - `movementDelta=8.683199999999886`
  - `hiddenPlayUi=true`
  - `noHudIconChrome=true`
  - `consoleErrors=[]`
  - `propCount=140`
  - `textureCount=260`
  - `lightCount=27`
  - `average luminance=36.790810429567905`
  - `darkRatio=0.019686647214904204`
  - `lightRatio=0.4890513016628424`
- Lighting scout metric:
  - Spawn: `PASS`, `dark=1.91%`, `readable=49.06%`, `mean=36.81`, `edge=14.24`
  - Movement: `PASS`, `dark=8.59%`, `readable=28.03%`, `mean=30.06`, `edge=13.63`

### Human-View Result

- Fixed: small object descriptor generation is no longer generic-only; each visible object family has a local kit and renderer path.
- Fixed: texture descriptor generation now tracks specific procedural texture families instead of generic grime/stain only.
- Improved: crate stacks, rubble, slabs, ceiling strips, and wall texture families are more explicit in the player frame.
- Improved: the scene remains readable and no-HUD after the added detail.
- Still partial: the corridor still reads like an enclosed internal grid with a low overhead plane rather than a true top-down projected open-sky terrain/building scene.
- Still partial: crate stacks and floor objects are better but still need stronger authored silhouettes and less box repetition.
- Still partial: the visible route lacks a strong anomaly/focal landmark.

### Status

- `SCENE-002`: Partially Fixed.
- `VALIDATION-002`: Fixed and still passing.
- Required next action: split static world generation into terrain/open-sky building footprints instead of relying on wall-cell instancing, then tune object silhouettes in a dedicated visual kit preview before increasing object counts.

## Surface-Anchor And Bundle Placement Pass - 2026-06-19

### Current problem

- The corridor still overused cell-center jitter and count-driven prop selection, so the scene read like random primitive scatter even after earlier material and lighting work.

### Implemented

- Added local domain kits for:
  - `triangle-surface-sampler-domain-kit`
  - `socket-graph-domain-kit`
  - `footprint-layout-domain-kit`
  - `scene-bundle-domain-kit`
- Extended the HorrorCorridor preset/content-pack pipeline so those kits are configured through the preset instead of hardcoded into the render layer.
- Added a geometry-aware placement graph in `sceneDressingDescriptors.ts`:
  - sampled wall/floor/ceiling surface anchors
  - built socket nodes and local neighbor graph
  - solved non-overlapping footprint layouts
  - emitted clustered scene bundles before fallback scatter
- Replaced the most obvious `%`-driven prop selection with grouped spawn landmarks, utility bays, and collapse pockets.
- Extended smoke/debug/live-player outputs with `anchorCount`, `socketCount`, `layoutCount`, and `bundleCount`.

### Validation

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run smoke:protokits`: passed.
  - `anchorCount=160`
  - `socketCount=110`
  - `layoutCount=26`
  - `bundleCount=18`
  - `building-facade=14`
  - `brick-rubble-pile=10`
  - `loose-floor-slab=12`
- `npm run validate:live-player:dev`: passed.
  - `playMode=solo`
  - `mode=solo-sim`
  - `movementDelta=8.3925`
  - `propCount=140`
  - `textureCount=260`
  - `lightCount=27`
  - `anchorCount=160`
  - `socketCount=110`
  - `layoutCount=26`
  - `bundleCount=18`
  - `darkRatio=0.00196`
  - `lightRatio=0.7152`
  - `hiddenPlayUi=true`
  - `noHudIconChrome=true`

### Human-View Result

- Improved: the visible scene now reads as repeated clustered service/collapse placements rather than only isolated props.
- Improved: spawn-side wall/floor dressing has clearer local composition and stronger route-side grouping.
- Still partial: the generated objects are still visibly primitive kitbash meshes.
- Still partial: the top roofline/open-sky cap remains too flat and uniform.

### Status

- `SCENE-002`: Partially Fixed.
- Required next action: add a dedicated visual kit preview route/scene for the new anchor/socket/layout/bundle pipeline, then replace the remaining grouped primitive silhouettes with stronger authored mesh profiles before increasing density further.
