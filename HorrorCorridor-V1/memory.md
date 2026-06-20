# HorrorCorridor Memory

## Purpose

HorrorCorridor-V1 is a multiplayer first-person maze horror prototype port. The current priority is preserving prototype feel while incrementally moving runtime, rendering, validation, and content authoring into clearer multi-file architecture.

## Product Direction

- HorrorCorridor should become a replayable cooperative first-person horror maze about getting lost, leaving traces, finding anomaly objects, and coordinating under limited information.
- The product identity is not a generic shooter or lobby demo. It is a tense corridor expedition: dark maze, readable local light, minimal UI, floor trails, strange props, anomaly sequences, and multiplayer pressure.
- Long-term work should add cumulative content through local domain kits and presets: maze variants, anomaly objectives, props, decals, lighting moods, validation rules, and future enemy/hazard systems.
- Each meaningful change should either improve prototype parity, strengthen the kit/content pipeline, improve the horror corridor atmosphere, or make the runtime easier to validate and extend.
- Product direction details live in `docs/HorrorCorridor-Product-Direction.md`.
- Lasting art-direction decision: avoid default neon-green cyber/cyber-city styling. The target should be dirty overgrown broken-city horror: muddy grass terrain, roots, moss, rubble, broken concrete/brick, rusted practical objects, warm player spill, dim natural/practical fill, and only rare sickly anomaly accents.

## Architecture Shape

- App screens and menus stay React-owned.
- The active game loop stays imperative and frame-local for movement, camera, render sync, networking cadence, and minimap drawing.
- Shared network snapshots stay small transport contracts; richer runtime-only state is rebuilt inside the game/runtime layer.
- `src/protokits` is a local domain-kit SDK. Kits are generic domain services with `provides`, `requires`, metadata, resources, events, systems, and install surfaces.
- HorrorCorridor-specific values live in `src/protokits/presets/horror-corridor-preset.ts` and content packs, not inside generic domain kits.
- Scene richness should be built through compositional local kits: grid fields, CPU raymarch sampling, object placement, procedural PBR-style materials, texture placement, lighting placement, walkthrough validation, and scene-generation manifests.
- The next terrain/world architecture should separate terrain, modular corridor tiles, wall modules, vegetation/grass objects, debris props, decals, and practical lights into generic local domain kits customized by HorrorCorridor presets.
- The first scene-generation render pass is descriptor-first and non-blocking: `worldBuilder.ts` creates a `maze-scene-dressing` group from preset-driven descriptors without adding collision or gameplay interaction.
- Prop/material fidelity is now a local domain capability: `prop-material-fidelity-domain-kit` declares generic mesh-profile, material-profile, and visible-content threshold services, while `sceneDressingRenderer.ts` owns Three.js mesh/material realization from descriptors.
- Geometry-aware placement is now a first-class local kit path: triangle surface sampling, socket graphs, footprint layouts, and scene bundles sit between raw raymarch hits/cells and final prop descriptors.

## Current Conventions

- Start every future HorrorCorridor run from `.agent/`: review `start-here.md`, `workflow.md`, `intention.md`, `live-agent.md`, `memory.md`, `goal.md`, `feedback.md`, and then skim `change-log.md` before broader repo exploration.
- Use `npm run harness:horror-corridor` to refresh repo-owned Codex guidance whenever durable product, workflow, kit, or domain-service-kit rules are introduced through chat.
- Use `npm run visual:match` for reference-vs-current visual acceptance loops. It uses the live-player harness for current screenshots, Codex CLI for semantic scoring, and bounded Codex auto-fix attempts for scores below `90`.
- Visual reference generation should follow the NexusDaydreamer-Codex pattern: Codex/imagegen creates the raster image, then `submit-reference` registers it into the visual-match run folder before it is treated as a valid reference.
- Keep `PLAYING` canvas-first. Persistent directions/status HUD should stay hidden unless debug or settings is explicitly opened.
- Press `Q` to toggle the settings/control overlay while playing.
- Pointer capture is for mouse look only. Keyboard movement works in `PLAYING` without pointer lock.
- Use `window.__HORROR_CORRIDOR_DEBUG__.extractState()` and `?debug=frames` for runtime validation.
- Use Playwright/browser-visible checks for UI and render changes whenever practical.
- The repo’s intended long-duration game validator is a cumulative live agent: it should operate in bounded episodes that review the screen, choose actions, verify outcomes, and only promote lessons into durable memory after repeated evidence. The live loop and the reviewer loop are separate concerns: one produces artifacts, the other inspects them and writes notes.
- When making a meaningful feature, content, UX, or architecture change, keep the product direction document aligned so future batches compound toward the same game.
- Scene dressing debug proof should use `window.__HORROR_CORRIDOR_DEBUG__.extractState().latestFrame.sceneDressing` for prop/texture/light/walkthrough counts.
- The repo-owned vocabulary is: kits are composable capability packages; domain-service kits are generic domain owners with stable `provides`/`requires`, metadata, resources, systems, and install surfaces; presets and content packs provide HorrorCorridor-specific customization.
- For lighting, camera, props, decals, particles, fog, materials, HUD, or procedural-world work, invoke the local `horror-visual-director` skill as the top-level gate before accepting the pass.
- Visual scene-generation proof must include a player-view screenshot and luminance/readability judgment. Debug counts prove descriptor output only; they do not prove the scene looks good.
- Use `npm run validate:live-player` against a running app as the repo-local NexusSimulator-aligned live-player harness for starting-scene proof. Preferred local flow is `npm run build`, `npm run start -- --hostname 127.0.0.1 --port 3000`, then `npm run validate:live-player`.
- The live-player harness writes `starting-scene.png` before movement and `movement-scene.png` after `W` movement. Use the former for spawn composition/readability and the latter for locomotion regression proof.
- The global validation skills are now hardened to fail closed for dark/horror scene work: if screenshot/player-view proof is blocked, lighting/material/prop/camera fixes remain `Unverified` until visible proof is restored.
- Current visual target gap after `SCENE-002`: starting scene is readable, HUD-free, route-forward, no longer a uniform green wash, and no longer dominated by pale floor/wall projection slabs. It still reads too wide/warehouse-like, with blocky generated prop silhouettes and weak focal/anomaly landmarks. Next visual restart should prioritize a visual kit preview scene plus mesh-profile replacement while keeping the passing luminance/no-HUD gates.
- Current validation state after the CDP harness pass: `npm run validate:live-player` uses a self-launched headed Chrome CDP profile and passed with a current screenshot, movement proof, zero visible UI text, readable luminance, and scene-dressing counts. Headless Chromium/WebKit/Firefox launch remains unstable, but CDP validation is now the accepted local backend.
- Text-free is not the same as HUD-free. The 2026-06-19 screenshot still showed a bottom-left compass/marker, so no-HUD validation must include icon/widget checks in addition to visible text checks.
- Procedural-world iteration should support a solo test path that bypasses multiplayer transport; multiplayer remains available, but high-fidelity lighting/shader/content work should be validated in solo first.
- Planned first-person embodiment: add visible hands as bobbing foreground objects tied to movement/carry/interact state.
- Camera feel should include subtle movement-driven camera shake/bob while preserving stable idle and readable mouse look.
- Future procedural objects should be descriptor-driven, non-blocking until intentionally upgraded, alpha-clipped, and procedurally textured so tables, crates, panels, ducts, debris, and other props do not read as clean placeholder boxes.
- Future terrain objects should include alpha-clipped grass/weeds and root/vine strips spawned on top of muddy terrain through descriptor kits, not hardcoded renderer one-offs.
- ProtoKit/world visual effects must be implemented in the Three.js scene/render pipeline, not CSS overlays. Post exposure, bloom, vignette, grading, particles, fog, and shader effects belong to renderer-owned modules so screenshots and gameplay share the same visual truth.
- Keep the repo live-player luminance gate intact. If a darker material direction fails it, fix render/light/material response instead of weakening the harness threshold.
- Procedural content now follows a smoke-first loop: validate descriptor generation through `/api/procedural-kit-smoke` and `npm run smoke:protokits` before trusting it in the main HorrorCorridor play scene, then verify player-visible output with `npm run validate:live-player:dev`.
- The current graph-backed placement pass improves composition but not final asset fidelity. Future scene work should extend the anchor/socket/layout/bundle graph and replace primitive mesh profiles inside it, rather than adding more count-driven scatter on top.
- Staged procedural loading is a first-class app scene (`LOADING`) before `PLAYING`; current stages are maze field, terrain raycast, object kits, PBR materials, and lighting pass.
- New scene/domain kits should be previewed in isolated testing surfaces before main-scene promotion; use preview proof first, then smoke proof, then live-player proof.
- Object kits should be visually reviewed in human-context browser rooms before promotion. The corridor lamp path now uses `npm run review:object-kit -- corridor-lamp` to capture full review-room screenshots with a generated primary target image, supporting references, current Three.js render, camera/lighting modes, scale context, checklist, notes, raw canvas support captures, and an 8-angle orbit set for silhouette comparison.
- The corridor lamp object kit is composed from scoped local part-profile kits with their own inline configs: foundation, pole, armature, lamp head, cable/conduit, fastener, material, light, and validation. Future complex props should follow this pattern when the reference has distinct visible subsystems.
- Major world-object families should stay explicit local object kits. `npm run smoke:protokits` is now expected to prove generated prop-kind coverage plus matching material-family and shared triplanar/PBR shader-profile coverage before those kits are trusted in the main corridor.
- Practical corridor landmarks should be prop-plus-light systems when appropriate. Lamps should be explicit object kits whose illumination comes through the shared light descriptor path, not ad hoc mesh-only dressing.
- Public NexusRealtime or ProtoKit capabilities should be adopted when they match the domain cleanly. If they do not, add a new local generic domain-service kit in `src/protokits` and keep HorrorCorridor-specific values in presets/content packs instead of inside the generic kit.
