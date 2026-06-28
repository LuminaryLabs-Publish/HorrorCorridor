# HorrorCorridor V1 Parity Audit

## 1. Audit Summary

- Repo root check: `HorrorCorridor-V1` exists at the expected path.
- Audit artifact check: `docs/` did not exist before this pass; this document creates it.
- Build check: `npx tsc --noEmit` passed during this audit.
- Lint check: `npm run lint` passed during this audit.
- Strict parity result: the maze, interaction, movement/collision/look, host/client runtime bootstrap, render/world construction, logging/validation layer, and snapshot fidelity paths are implemented. No confirmed parity failure IDs remain open in this audit; the remaining items are architecture migration targets and unverified network/manual-play edges.
- Placeholder check: the remaining maze-domain scaffold exports were removed in this pass; no confirmed scaffold placeholders remain in the active maze/runtime path.
- Optional file check: `src/features/render/three/minimapRenderer.ts` is not present. Minimap rendering is implemented in `src/components/hud/Minimap.tsx` instead.
- Progress note (2026-03-23): Fixed `GAME-001` by removing unlock-propagation victory evaluation and validating prototype-style pickup/drop, anomaly place/remove, and exact-order win behavior with a direct harness.
- Progress note (2026-03-23): Partially fixed `NET-001` and `RUNTIME-001` by wiring `GameShell.tsx` to real host/client adapters and making `GameCanvas.tsx` hydrate from `authoritativeSnapshot` instead of generating the maze locally on mount. Typecheck and lint pass; direct harness confirms bootstrap shapes and transport factories, but browser-visible end-to-end multiplayer proof is still pending.
- Progress note (2026-03-23): Fixed `NET-002` by renaming the wire protocol to the prototype literals `START_GAME`, `PLAYER_UPDATE`, `TRY_INTERACT`, `SYNC`, and `LOBBY_EVENT`, then updating the protocol serializer checks and `GameShell.tsx` message routing to use the shared protocol enum. Typecheck and lint pass; old wire strings no longer appear under `src/`.
- Progress note (2026-03-23): Fixed `NET-001`, `RUNTIME-001`, and `UI-001` by adding a browser-local transport bridge in the peer adapters, surfacing the room code in the lobby/header, and tightening the shell/menu copy away from preview/debug language. Browser validation now shows a two-tab host/client session where the host roster increments to 2 and both tabs enter `PLAYING` after host start.
- Progress note (2026-03-23): Fixed `RENDER-001` and `RENDER-002` by splitting maze floors into main-vs-branch instanced layers and adding cube-specific point lights tied to cube visibility/state. Typecheck, lint, and a direct maze-world harness all passed.
- Progress note (2026-03-23): Partially fixed `DATA-001` and fixed `DATA-002`, `DATA-003`, and `OOZE-001` by adding numeric maze cell values to replicated snapshots, preserving player `color` / `pitch` through snapshot and network update paths, collapsing ooze entries to the prototype `{ x, z, y, rotY, scale }` shape, and making the runtime/minimap rebuild use those exact values. Typecheck, lint, and direct harnesses all passed.
- Progress note (2026-03-23): Fixed `MOVE-001` by removing keyboard-turn behavior and sprint/crouch movement modifiers from the hot path, restoring arrow-key strafe semantics, aligning pitch sign and delayed recenter behavior to the prototype, and trimming dead movement input fields from the `PLAYER_UPDATE` payload. Typecheck, lint, and focused movement/collision harnesses all passed; detached Playwright confirmed the app still launches, although the existing dev-server instance showed repeated HMR websocket errors that limited visible runtime interaction proof.
- Progress note (2026-03-23): Fixed `MOVE-002` by removing the pointer-lock requirement from runtime movement simulation while keeping mouse-look capture gated behind pointer lock. `GameCanvas.tsx` now advances host/client movement whenever the screen is `PLAYING`, `PointerLockGate.tsx` and `HUDOverlay.tsx` now describe capture as mouse-look only, and detached Playwright proved unlocked host movement with `pointerLocked: false`, `mode: "host-sim"`, `input.moveForward: 1`, and a changing local position while unlocked mouse movement still left yaw/pitch unchanged. Typecheck and lint passed.
- Progress note (2026-03-23): Fixed `PLACEHOLDER-001` and further narrowed `DATA-001` by removing maze-domain scaffold exports, dropping `MazeCellSnapshot.type` / `walkable` / `occupiedBy` from the replicated snapshot, removing stale maze occupancy bookkeeping from `interactionRules.ts`, and switching `GameCanvas.tsx` / `Minimap.tsx` / serializer validation to numeric cell values only. Typecheck, lint, and a direct snapshot harness all passed. Detached Playwright on a fresh recycled dev server also proved `START -> LOBBY_HOST -> PLAYING` without console errors beyond normal HMR connection logs.
- Progress note (2026-03-23): Further narrowed `DATA-001` and fixed new `DATA-004` by splitting replicated player/cube snapshot contracts away from richer runtime state. Replicated players now carry only `id`, `color`, `position`, `rotationY`, and `pitch`; replicated cubes now carry only `id`, `color`, `position`, prototype-style `state`, and `ownerId`. `GameCanvas.tsx`, `worldBuilder.ts`, and `Minimap.tsx` were updated to rebuild runtime-only fields locally and to render placed cubes as visible pedestal items again. Typecheck, lint, a direct contract/render harness, and detached Playwright `START -> LOBBY_HOST -> PLAYING` all passed.
- Progress note (2026-03-23): Added a bounded runtime frame logger for validation and fixed new `RUNTIME-002`. `GameCanvas.tsx` now records per-frame pose/input/snapshot state into a debug store, exposes extraction through `window.__HORROR_CORRIDOR_DEBUG__`, shows a gated HUD panel in `?debug=frames` mode, and no longer clears `authoritativeSnapshot` during its own cleanup. Typecheck, lint, a direct debug-store harness, and detached Playwright all passed; browser proof now shows the frame counter advancing and `extractState()` returning live frame data.
- Progress note (2026-03-23): Fixed `DATA-001` by removing runtime-only `CubeState` / `SequenceSlot` ownership from `src/types/shared.ts`, replacing the replicated anomaly payload with the smaller prototype-shaped `{ sequence, slots }` contract, rebuilding runtime sequence slots locally inside `GameCanvas.tsx`, and updating HUD/render/debug consumers to read the smaller anomaly projection. Typecheck, lint, a direct snapshot/serializer harness, and detached Playwright with `?debug=frames` all passed; browser-visible runtime state now exposes `anomaly.sequence` and `anomaly.slots` with no remaining replicated `sequenceSlots` field.
- Progress note (2026-03-23): Fixed `RENDER-003` by auditing the black viewport signal flow end-to-end and restoring prototype-oriented first-frame visibility. The renderer/canvas mount and frame loop were confirmed alive, but detached browser evidence showed the scene was being crushed to near-black by origin-centered point lights, missing player-follow light, darker standard-material/tone-mapping output, and non-prototype spawn yaw. `createInitialGameState.ts`, `createLights.ts`, `createMaterials.ts`, `createRenderer.ts`, `createScene.ts`, `worldBuilder.ts`, and `GameCanvas.tsx` were updated; typecheck and lint passed; detached Playwright now shows a readable corridor/floor/wall view in `PLAYING` before pointer lock. See `docs/HorrorCorridor-V1-Black-Viewport-Audit.md`.
- Progress note (2026-03-23): Fixed `FEEL-001` by moving the hot path back toward the prototype runtime model. `GameCanvas.tsx` now throttles host snapshot publishes and client player updates to `NETWORK_TICK_RATE = 50ms`, caps runtime-store UI syncs to `100ms`, keeps minimap drawing inside the runtime loop, and avoids per-frame snapshot rebuild churn in the normal host/client branches. `createCamera.ts`, `movement.ts`, `createLights.ts`, and `createRenderer.ts` were also retuned toward the prototype (`fov=75`, `eyeHeight=2`, stable ambient fill, `antialias: false`, pixel ratio cap `1`). Typecheck and lint passed, detached Playwright proved host publish cadence at `19-20/s`, client update cadence at `20/s`, unlocked movement in both paths, and unchanged unlocked yaw/pitch under mouse motion. See `docs/HorrorCorridor-V1-Prototype-Feel-Audit.md`.
- Progress note (2026-06-17): Fixed `ARCH-001` by replacing Horror-specific local protokit scaffolds with generic domain-service kits under `src/protokits`, moving HorrorCorridor values into `presets/horror-corridor-preset.ts`, and adding cumulative content packs for corridor, anomaly sequence, ooze decals, industrial props, and validation. `memory.md` now records the repo convention that kits stay generic and presets/content packs customize behavior. Typecheck, lint, and a direct kit-contract probe passed.
- Progress note (2026-06-17): Fixed `OOZE-002` by converting the ooze render instance from upright spheres to floor-aligned trail decals with double-sided, non-depth-writing material settings and debug `decalCount` reporting. Browser validation showed `decalCount` increasing with movement while `PLAYING` stayed in `host-sim`.
- Progress note (2026-06-17): Fixed `HUD-002` by making `PLAYING` canvas-first: the shell header, gameplay HUD, minimap, settings button, and pointer-lock chrome are hidden unless debug/settings are explicitly opened. `Q` now opens/closes the settings drawer before the player-input gate. Browser validation showed a full-viewport `1400x900` canvas, zero visible text with debug hidden, settings sliding from offscreen `x=1416` to onscreen `x=920`, and no console errors beyond normal HMR/React DevTools messages.
- Progress note (2026-06-19): Added `scripts/horror-corridor-live-player-harness.mjs`, the `npm run validate:live-player` command, and `docs/HorrorCorridor-Live-Player-Harness.md`. The harness is NexusSimulator-aligned but HorrorCorridor-owned: it boots the host path, reaches `PLAYING`, hides debug UI, verifies unlocked movement, captures a starting-scene screenshot, computes luminance, checks scene-dressing counts, and writes `docs/live-player-harness/latest/report.json`. It reports browser/tooling failures as `blocked` rather than treating missing screenshot proof as success.
- Progress note (2026-06-19): Partially advanced `SCENE-002` and fixed `VALIDATION-002` by adding a solo procedural test path, `solo-sim` runtime mode, procedural world-surface textures, alpha-clipped prop materials, table/crate descriptors, movement-driven camera shake, post-process overlay styling, and no-HUD icon chrome validation. The live-player harness now proves `playMode=solo`, `frameMode=solo-sim`, movement, no visible text, no bottom-left icon chrome, scene dressing counts, and readable luminance against a production server. `SCENE-002` remains Partially Fixed because visual review still finds primitive prop silhouettes, flat green palette, and weak focal/anomaly lighting.
- Progress note (2026-06-19): Added a hierarchical exploration module for the new overgrown broken-city direction. Future scene-generation work should move away from neon-green cyber styling and toward dark muddy terrain, alpha-clipped grass/weeds, roots, rubble, broken concrete/brick corridor tiles, rusted practical props, and dim practical lighting with only rare sickly anomaly accents. See `docs/hierarchical-exploration/modules/overgrown-terrain-corridor.json`.
- Progress note (2026-06-19): Further advanced `SCENE-002` by shifting the live render palette away from uniform green toward muddy/rust/broken-concrete materials, adding mud/moss/rust/crack texture descriptor kinds, adding `rusted-metal` preset/material support, strengthening spawn-visible roots/rubble/debris, and rebalancing warm fill/exposure until the production live-player harness passed again. `SCENE-002` remains Partially Fixed because the latest screenshot still shows pale slab-like prop panels that need stronger mesh/material-specific silhouettes.
- Progress note (2026-06-19): Added the smoke-first procedural content loop and staged loading scene. `/api/procedural-kit-smoke` generates maze + scene dressing descriptors outside the main play scene, `npm run smoke:protokits` starts a temporary dev server and validates prop/texture/light/material variety, and `GameShell` now routes through a centered `LOADING` screen before `PLAYING` for maze field, terrain raycast, object kits, PBR materials, and lighting pass. Added `floor-pipe` descriptor support while preserving the passing live-player harness.
- Progress note (2026-06-19): Further advanced `SCENE-002` by breaking up pale projected texture slabs. Scene texture descriptors now use smaller/darker wall/floor projections, lower residue probability, and generated irregular alpha masks; texture pulsing respects base opacity, and generated projection alpha textures are disposed with the scene-dressing layer. `npx tsc --noEmit`, `npm run lint`, `npm run build`, a production smoke API probe, `npm run validate:live-player`, and lighting-scout metrics passed. Human review keeps `SCENE-002` Partially Fixed because the scene still needs tighter corridor framing, stronger prop silhouettes, and better focal/anomaly landmarks.
- Process note (2026-06-19): Added the local `horror-visual-director` skill and routed the repo workflow through it for future lighting/material/camera/prop/decal/particle/HUD/procedural-world passes. This closes the process gap where kit/debug/render evidence could outrank player-view screenshots. It does not change `SCENE-002` status; it hardens how the next visual batch must be accepted.
- Progress note (2026-06-19): Added the first geometry-aware placement stack and wired it into live scene generation. New local kits now cover triangle surface anchors, socket graphs, footprint layouts, and scene bundles. `sceneDressingDescriptors.ts` now generates anchor/socket/layout/bundle data before fallback scatter, replacing the most obvious `%`-driven prop selection with clustered spawn landmarks, utility bays, and collapse pockets. `npm run smoke:protokits` passed with `anchorCount=160`, `socketCount=110`, `layoutCount=26`, `bundleCount=18`, `building-facade=14`, `brick-rubble-pile=10`, and `loose-floor-slab=12`. Fresh `npm run validate:live-player:dev` also passed with `movementDelta=8.3925`, `darkRatio=0.00196`, `lightRatio=0.7152`, no HUD chrome, and the same graph counts in live frame debug state. `SCENE-002` remains Partially Fixed because the placements are more coherent but the generated meshes still read as primitive kitbash geometry and the open-sky top frame remains too flat.
- Process note (2026-06-19): `.agent/` is now the repo-first operating surface. Future runs should begin by reviewing `.agent/start-here.md`, `workflow.md`, `intention.md`, `memory.md`, `goal.md`, `feedback.md`, and `change-log.md`, then re-open this audit. New visual/domain kits should be promoted through preview proof first, then smoke proof, then live-player proof.
- Progress note (2026-06-19): Strengthened local object-kit ownership and review coverage for the scene-dressing stack. Major building/prop families are now explicit kits, shared scene-object-kit helpers normalize their metadata/config, and `/api/procedural-kit-smoke` now returns `sceneObjectKitReview` coverage. `npm run smoke:protokits` passed with no uncovered prop kinds, no uncovered material families, and no missing shared triplanar/PBR shader-profile coverage. This improves architecture and promotion safety, but `SCENE-002` stays Partially Fixed because player-view mesh fidelity still needs stronger silhouettes and less primitive kitbash geometry.
- Progress note (2026-06-19): Added explicit `rock-cluster` and `corridor-lamp` object kits and wired lamps through the shared light descriptor path. `sceneDressingDescriptors.ts` now places `lamp-post` props along the long corridor and emits matching `prop` lights from those lamp anchors; it also adds a dedicated corridor rock pass so stone breakup is not left to floor-weight luck. `npx tsc --noEmit`, targeted ESLint, and `npm run smoke:protokits` passed with `lamp-post=8`, `rock-cluster=10`, `lightCount=28`, and clean `sceneObjectKitReview` coverage. Human-view status for this specific pass is still unverified because `npm run validate:live-player:dev` did not produce a fresh report artifact in this run.
- Process note (2026-06-19): Added `HorrorCorridor-Harness`, a repo-owned linear Codex CLI support tool for durable process and domain-kit vocabulary. `scripts/horror-corridor-harness.mjs` now reads `.agent/*`, `memory.md`, and `HorrorCorridor-Harness/domain-service-kit-source.json`, then generates `docs/HorrorCorridor-Harness-Guide.md` and `docs/HorrorCorridor-Harness-Manifest.json`. This does not change current scene parity directly, but it closes a workflow gap where stable kit/domain rules could otherwise remain trapped in chat instead of in repo-owned docs.
- Process note (2026-06-19): Added `.agent/live-agent.md` and wired the repo control plane around a cumulative live-agent model. Future long-duration game validation should now be treated as bounded episodes with screen review, tool action, verification, review, and evidence-based lesson promotion, rather than as a single capped pass. `npm run harness:horror-corridor -- check`, `npm run harness:horror-corridor`, and `node --check scripts/horror-corridor-harness.mjs` passed after the control-plane expansion. Repo-wide `npm run lint` did not complete in a reasonable window during this docs/process batch, so lint status for this pass remains inconclusive rather than assumed.
- Process note (2026-06-19): Added `scripts/horror-corridor-visual-match.mjs`, `npm run visual:match`, and `docs/visual-review/review-output.schema.json`. This creates the Codex CLI visual-match loop: prepare/register one reference image, capture current player-view screenshots through the live-player harness, score semantic visual differences with Codex, write retry/fix artifacts, and optionally run bounded Codex auto-fix attempts until the score reaches `90`. It follows the NexusDaydreamer-Codex registration pattern by requiring generated reference images to be submitted before they are trusted.
- Validation note (2026-06-19): Final CLI smoke validation passed for `node --check`, `npm run visual:match -- help`, dry-run prepare, mock accepted review, mock below-threshold retry artifacts, mock invalid-review blocking, `submit-reference --allow-existing`, `git diff --check`, `npx tsc --noEmit`, `npm run lint`, and `npm run smoke:protokits`. A bounded non-dry live-capture smoke also produced `starting-scene.png` and `movement-scene.png` at `docs/visual-review/runs/2026-06-19T22-19-23-759Z-final-live-capture-smoke`, but its live-player report still failed `luminanceReadable`. This keeps `SCENE-002` as the next visual target; the mock visual score is not accepted as human-view proof.
- Progress note (2026-06-19): Added the first human-context object-kit review room for `corridor-lamp`. `testing/object-kits/corridor-lamp/viewer.html` now presents five references, the current Three.js lamp render, camera and lighting modes, scale/corridor context, checklist, notes, and score fields in one browser surface; `npm run review:object-kit -- corridor-lamp` captures full review-room screenshots plus raw canvas support images. The production lamp mesh was also strengthened with base plates, rust bands, bracket/arm/head/cage/lens/cable detail, and `sceneDressingDescriptors.ts` now anchors lamp lights closer to the lamp head rather than the pole center. Static checks, smoke validation, mock accepted review, mock low-score retry artifacts, and review-room readability metrics passed. This improves object-kit promotion safety, but real Codex visual scoring was not invoked in this pass, so it is not yet a true isolated `>=90` human-review promotion.
- Progress note (2026-06-19): Extended the corridor lamp review harness with an 8-angle orbit comparison. The viewer now exposes `orbit-000` through `orbit-315` at 45 degree intervals, the CLI captures all orbit views as full review-room screenshots plus raw canvas images, the review schema requires `orbitComparison` and `referenceRanking`, and `validateReview` blocks promotion if any orbit angle scores below `90`. Mock accepted and mock failing browser-capture runs both produced 13 captures, with the failing run writing `retry-plan.json`.
- Progress note (2026-06-19): Generated and registered a high-quality rusted practical lamp PNG as the primary target reference. `testing/object-kits/corridor-lamp/references/reference-primary.png` is now shown above the supporting SVG reference cards in the review room, and `scripts/review-object-kit.mjs` supports `--reference-image <png>` to copy future generated/user-supplied references into that primary slot with metadata. The latest 13-shot mock capture includes the generated target beside the current render, making the visible delta obvious: the current lamp is still too thin/simple compared with the target's bolted base, corroded pole, angled arm, caged head, warm bulb, cable, and rusted PBR surface.
- Progress note (2026-06-19): Split `corridor-lamp-object-kit` into scoped local part-profile kits. The new files under `src/protokits/corridor-lamp-object-kit/parts/` define standalone kits and inline configs for foundation, pole, armature, lamp head, cable/conduit, fastener, material, light, and validation. The parent lamp kit now requires all nine part domains, `sceneObjectKitReview` reports their `partKitIds`, and `/api/procedural-kit-smoke` instantiates the full domain manifest and fails if any lamp part kit is missing. `npx tsc --noEmit` and `npm run smoke:protokits` passed with `domainManifest.kitCount=59` and `missingLampPartKitIds=[]`.

## 2. Severity Key

- `P0` = blocks parity or playability in a major way.
- `P1` = major mismatch that materially changes behavior or contract compatibility.
- `P2` = medium drift, approximation, or missing fidelity that should be fixed next.
- `P3` = low-priority drift, placeholder cleanup, or visual/copy mismatch.

## 3. Subsystem Audit

### Constants

- **Status:** Completed
- **Checks Performed:** Verified each prototype constant against `src/lib/constants.ts`.
- **Confirmed Items:** `GRID_SIZE=150`, `CELL_SIZE=5`, `WALL_HEIGHT=4`, `MOVE_SPEED=0.15`, `TURN_SPEED=0.04`, `MOUSE_SENSITIVITY=0.003`, `PLAYER_RADIUS=1.2`, `INTERACT_DIST=3.0`, `MAX_PITCH=15 * (Math.PI / 180)`, `MAX_OOZE=800`, `OOZE_SPACING=2.0`, `NETWORK_TICK_RATE=50`.
- **Failed Items:** None confirmed from the file.
- **Unverified Items:** Whether the extra tuning objects in `src/lib/constants.ts` are still desirable for the parity target.
- **Likely Files to Update:** `src/lib/constants.ts` only if the tuning objects should be simplified later.
- **Recommended Next Action:** Keep the prototype scalar constants as the hot-path source of truth and only keep the extra tuning objects if a later ECS extraction genuinely needs them.

### Local Domain Kits and Content Packs

- **Status:** Completed initial SDK and composition pass
- **Checks Performed:** Inspected `src/protokits`, verified old Horror-specific kits were replaced, verified generic domain-kit metadata/contracts, checked preset/content-pack ownership, ran a direct contract probe, and checked imports for leaked Horror constants/colors.
- **Confirmed Items:** `runtimeKit.ts` exposes a local runtime-kit manifest with `provides`, `requires`, `bindings`, resources, events, systems, and install hooks. `domainKit.ts` adds `defineHorrorDomainKit`, `extendHorrorDomainKit`, `createHorrorDomainToken`, `validateHorrorDomainKit`, and dependency validation. Generic kits now exist for `grid-maze`, `sequence-objective`, `inventory`, `spatial-interaction`, `trail-decal`, `scene-dressing`, `prop-descriptor`, `lighting-descriptor`, and `render-validation`. HorrorCorridor constants/colors are imported only by `presets/horror-corridor-preset.ts`, and the composition entrypoint creates deterministic generic kit/content-pack manifests.
- **Failed Items:** None confirmed in the local SDK/composition layer.
- **Unverified Items:** The prop, scene-dressing, lighting, and render-validation kits are descriptor/config services only right now; only trail decals have been wired into the live render presentation in this pass.
- **Likely Files to Update:** `src/protokits/domainKit.ts`, `src/protokits/runtimeKit.ts`, `src/protokits/horrorCorridorKits.ts`, `src/protokits/presets/horror-corridor-preset.ts`, `src/protokits/*-domain-kit/index.ts`.
- **Recommended Next Action:** Wire the descriptor kits one at a time into runtime/render owners, starting with scene dressing and prop descriptors, while keeping game-specific values in presets/content packs.

### Shared Types and Data Contracts

- **Status:** Completed
- **Checks Performed:** Checked `src/types/shared.ts`, `src/features/game-state/domain/gameTypes.ts`, `src/features/maze/domain/mazeTypes.ts`, `src/features/game-state/domain/createInitialGameState.ts`, `src/components/game/GameCanvas.tsx`, and `src/features/networking/protocol/serializers.ts`.
- **Confirmed Items:** The maze result shape is present as `grid`, `start`, `end`, `cubes`, `targetSequence`, `paths`; numeric maze cells `0..4` are preserved end-to-end in replicated snapshots via `MazeCellSnapshot.value`; maze snapshots carry only `id`, `grid`, and numeric `value`; replicated players carry only `id`, `color`, `position`, `rotationY`, and `pitch`; replicated cubes carry only `id`, `color`, `position`, `state`, and `ownerId`; the replicated anomaly contract is now the prototype-shaped `{ sequence, slots }`; ooze entries match the prototype world-space trail shape; and the live runtime rebuilds richer cube/slot/player state locally from the narrower snapshot.
- **Failed Items:** None confirmed after the anomaly contract split.
- **Unverified Items:** Whether any later scene/MVVM cleanup will choose to rename the replicated anomaly field without changing its payload shape.
- **Likely Files to Update:** `src/types/shared.ts`, `src/features/game-state/domain/gameTypes.ts`, `src/features/networking/protocol/syncSnapshot.ts`, `src/features/networking/protocol/serializers.ts`, `src/components/game/GameCanvas.tsx`, `src/components/hud/HUDOverlay.tsx` only if later architecture cleanup renames the ownership boundary.
- **Recommended Next Action:** Keep shared types transport-only and continue moving runtime-only structures deeper into the game-state/runtime layer.

### Maze Generation

- **Status:** Completed
- **Checks Performed:** Verified grid initialization, main corridor carve, branch seed creation, branch expansion, start/end marking, cube candidate discovery, dead-end detection, spawn selection inputs, cube building inputs, and BFS path output wiring.
- **Confirmed Items:** The maze generator returns the prototype-shaped result; the grid uses numeric values `0,1,2,3,4`; the 3-cell-wide main corridor carve is present; branch generation is present; start/end markers are written; candidate discovery uses branch cells; dead-end preference and fallback are present; the final result includes `grid`, `start`, `end`, `cubes`, `targetSequence`, and `paths`.
- **Failed Items:** None confirmed in the maze generation pipeline.
- **Unverified Items:** Exact visual shape parity of generated mazes across seeds, because the audit only inspected code and one sample summary.
- **Likely Files to Update:** `src/features/maze/domain/generateMaze.ts`, `src/features/maze/domain/cubePlacement.ts`, `src/features/maze/domain/mazePathing.ts`, `src/features/maze/domain/mazeTypes.ts`.
- **Recommended Next Action:** Keep maze generation frozen unless a later pass finds a gameplay regression or a seed-specific mismatch.

### Cube Placement and Sequence

- **Status:** Completed
- **Checks Performed:** Checked candidate ranking, dead-end preference, fallback behavior, cube spawn selection order, target sequence shuffle, and cube object creation.
- **Confirmed Items:** The three-color setup is present; `RED`, `GREEN`, and `BLUE` hex values match; target sequence generation exists; cube IDs follow `cube_COLOR`; world-space conversion uses `CELL_SIZE`; cubes start in ground state with `ownerId: null`.
- **Failed Items:** None confirmed inside the cube placement helpers.
- **Unverified Items:** Whether the exact prototype shuffle behavior is visually indistinguishable from the current seeded shuffle implementation.
- **Likely Files to Update:** `src/features/maze/domain/cubePlacement.ts`, `src/lib/colors.ts`, `src/lib/constants.ts`.
- **Recommended Next Action:** Leave these helpers alone unless a later parity check shows a target-sequence ordering mismatch.

### Path Generation

- **Status:** Completed
- **Checks Performed:** Verified BFS queue traversal, visited tracking, start-at-end behavior, cube world-to-grid conversion, non-wall traversal, and path map assembly.
- **Confirmed Items:** `buildPathsFromEndToCubeSpawns` performs BFS from the end cell to each cube; it converts cube world positions back to grid coordinates; it only traverses non-wall cells; it emits a path map keyed by cube id.
- **Failed Items:** None confirmed.
- **Unverified Items:** Exact prototype path shape on every seed.
- **Likely Files to Update:** `src/features/maze/domain/mazePathing.ts`, `src/features/maze/domain/mazeTypes.ts`.
- **Recommended Next Action:** Keep pathing as-is unless a later parity pass exposes a seed-specific divergence.

### Interaction Rules

- **Status:** Completed
- **Checks Performed:** Checked pickup, drop, anomaly placement, anomaly removal, and win triggering flow.
- **Confirmed Items:** Away from the anomaly, the nearest ground cube within interaction distance can be picked up; if the player is already holding a cube, it is dropped at the player position; near the anomaly, a held cube can be placed into the next empty slot; near the anomaly, empty-handed interaction removes the last placed cube.
- **Failed Items:** None confirmed after the `GAME-001` fix.
- **Unverified Items:** Whether any edge-case slot mutation differs on malformed or partially filled states.
- **Likely Files to Update:** `src/features/game-state/domain/interactionRules.ts`, `src/features/game-state/domain/winRules.ts`, `src/features/game-state/domain/gameTypes.ts`.
- **Recommended Next Action:** Keep the current interaction flow unless a later parity pass finds a malformed-state regression.

### Win Rules

- **Status:** Completed
- **Checks Performed:** Inspected slot evaluation and completion transition logic.
- **Confirmed Items:** The code now transitions to victory only when all sequence slots are occupied and their placed cube colors exactly match the target sequence order.
- **Failed Items:** None confirmed after the `GAME-001` fix.
- **Unverified Items:** Whether the current slot-state propagation produces the same player-visible result in every edge case.
- **Likely Files to Update:** `src/features/game-state/domain/winRules.ts`, `src/features/game-state/domain/interactionRules.ts`.
- **Recommended Next Action:** Leave the direct ordered comparison in place unless a later edge-case regression is discovered.

### Ooze System

- **Status:** Completed
- **Checks Performed:** Checked trail item shape, decay timing, probabilistic removal, scale shrink, spacing logic, max cap, and world-space rendering.
- **Confirmed Items:** Ooze entries are now prototype-shaped world-space trail items with `x`, `z`, `y`, `rotY`, and `scale`; decay runs on a 10-second interval; entries disappear probabilistically at 10%; surviving entries shrink by `0.75`; spawn spacing uses `OOZE_SPACING`; `MAX_OOZE` is enforced; ooze now renders as floor-aligned instanced decals rather than small upright spheres; and the debug frame logger reports `decalCount` alongside `oozeCount`.
- **Failed Items:** None confirmed in the current ooze path.
- **Unverified Items:** Exact visual opacity/brightness versus the one-file prototype.
- **Likely Files to Update:** `src/features/game-state/domain/oozeRules.ts`, `src/types/shared.ts`, `src/features/render/three/worldBuilder.ts` only if later visual tuning is needed.
- **Recommended Next Action:** Leave ooze logic alone unless a later visual pass shows the instanced presentation needs tuning.

### Movement and Look

- **Status:** Completed
- **Checks Performed:** Checked WASD, arrow keys, pointer-lock mouse look, pitch clamp, delayed pitch return, movement tuning, and collision regression behavior.
- **Confirmed Items:** WASD and arrow keys are present; arrow keys now mirror prototype strafe/forward semantics instead of turning; pointer lock mouse look is present; yaw uses the prototype mouse sign; pitch uses the prototype mouse sign; pitch is clamped; pitch returns toward zero only after inactivity; sprint/crouch modifiers and keyboard-turn behavior are gone from the movement hot path; movement uses the shared prototype constants; collision still blocks wall entry after the cleanup; unlocked `PLAYING` advances keyboard locomotion instead of staying stuck behind pointer-lock gating; and the active runtime now applies look/movement continuously while only syncing UI-facing store state at a capped cadence.
- **Failed Items:** None confirmed after the `MOVE-001` fix.
- **Unverified Items:** Exact locked-session feel in a full manual pointer-lock play pass.
- **Likely Files to Update:** `src/components/game/GameCanvas.tsx`, `src/components/game/PointerLockGate.tsx`, `src/components/hud/HUDOverlay.tsx` only if later playtesting finds another control-flow or copy mismatch.
- **Recommended Next Action:** Keep the runtime movement gate tied to `PLAYING`, not pointer lock, and only revisit player math if future manual playtesting exposes a feel regression.

### Collision

- **Status:** Completed
- **Checks Performed:** Verified grid-based collision and 4-corner radius testing.
- **Confirmed Items:** Collision uses maze grid cells, `PLAYER_RADIUS`, and a four-corner sample test. It is not using the old placeholder corridor model.
- **Failed Items:** None confirmed.
- **Unverified Items:** Exact corner-sample tightness versus the prototype’s feel.
- **Likely Files to Update:** `src/features/player/domain/collision.ts`, `src/features/player/domain/movement.ts`.
- **Recommended Next Action:** Keep collision in place unless playtesting shows the radius sample needs adjustment.

### Networking Protocol

- **Status:** Completed
- **Checks Performed:** Checked protocol message definitions, serializers, snapshot builder, and host/client transport adapters.
- **Confirmed Items:** Host start, player update, interaction request, full sync, and lobby events exist as typed messages; serialization and deserialization are present; host/client transport adapters exist; the wire names now use the prototype literals `START_GAME`, `PLAYER_UPDATE`, `TRY_INTERACT`, `SYNC`, and `LOBBY_EVENT`.
- **Failed Items:** None confirmed from the current repo.
- **Unverified Items:** Whether any external consumer outside this repo still expects the previous semantic aliases.
- **Likely Files to Update:** `src/features/networking/protocol/messageTypes.ts`, `src/features/networking/protocol/serializers.ts`, `src/features/networking/protocol/syncSnapshot.ts`.
- **Recommended Next Action:** Keep the protocol enum and message constructors in sync unless a future compatibility alias is explicitly required.

### Host/Client Flow

- **Status:** Completed
- **Checks Performed:** Looked for app-level calls to `createHost` / `createClient`, checked shell flow, and checked how room state is initialized.
- **Confirmed Items:** `GameShell.tsx` instantiates `createHost` / `createClient`, routes transport status changes into the session store, forwards host start / full sync messages into the room and runtime stores, and now exposes the room code in the visible shell. Browser validation on two tabs showed the host lobby player count increasing from 1 to 2 when the client joined the shared room code, and both tabs transitioned into `PLAYING` after host start.
- **Failed Items:** None confirmed in the browser-visible host/client path after the local bridge pass.
- **Unverified Items:** Cross-machine internet transport behavior through the underlying PeerJS path has not been separately exercised in this audit.
- **Likely Files to Update:** `src/components/game/GameShell.tsx`, `src/components/game/GameCanvas.tsx`, `src/features/networking/peer/createHost.ts`, `src/features/networking/peer/createClient.ts`, `src/features/networking/peer/peerEvents.ts`.
- **Recommended Next Action:** Keep the host/client session path stable and move on to the remaining render fidelity gaps.

### Render World Construction

- **Status:** Completed
- **Checks Performed:** Checked the generated maze world, static layer construction, lights, floors, walls, cubes, pedestals, guide path indicators, ooze instancing, player meshes, cleanup, and the live snapshot-to-world rebuild path.
- **Confirmed Items:** The placeholder corridor is no longer the active world; the world is built from the generated maze; walls are instanced; ceilings exist; the end anomaly light exists; cube meshes exist; cube-specific point lights exist; pedestal meshes exist; guide path indicators exist; ooze instancing exists; other player meshes exist; cleanup is implemented; the static floor is split into main-corridor and branch layers; the runtime snapshot path preserves branch-vs-main floor values instead of flattening them back into one generic walkable layer; placed cubes are once again rendered as visible pedestal items based on replicated cube `state`; the ambient rig no longer depends on origin-centered corridor lights; the world now owns a local player-follow light; the render path uses brighter prototype-oriented Lambert materials; decorative light pulsing is gone from the default play path; the camera/render defaults now match the prototype more closely (`fov=75`, `eyeHeight=2`, `antialias: false`, pixel ratio cap `1`); and detached Playwright now shows a readable `PLAYING` viewport before pointer lock instead of a near-black scene.
- **Failed Items:** None confirmed in the current render-world pass.
- **Unverified Items:** Exact manual pointer-lock play feel under live movement/look, even though the first visible frame now matches the prototype direction much more closely.
- **Likely Files to Update:** `src/features/render/three/worldBuilder.ts`, `src/features/render/three/createLights.ts`, `src/features/render/three/createMaterials.ts`, `src/features/render/three/createRenderer.ts`, `src/features/render/three/createScene.ts`, `src/features/game-state/domain/createInitialGameState.ts` only if a later screenshot or manual play pass finds remaining brightness drift.
- **Recommended Next Action:** Keep the current render visibility path stable and use the black-viewport audit artifact if any later render cleanup regresses the first-person view.

### Runtime Animation Loop

- **Status:** Completed
- **Checks Performed:** Checked requestAnimationFrame lifecycle, resize handling, pointer-lock handling, world updates, and teardown.
- **Confirmed Items:** The animation loop starts and stops cleanly, the renderer is resized correctly, camera updates are applied, and cleanup removes listeners and disposes Three.js resources. The runtime reconstructs the maze world from `authoritativeSnapshot`, no longer clears that snapshot during `GameCanvas.tsx` cleanup, detached browser validation shows a live advancing frame logger in `?debug=frames` mode with extractable per-frame state from `window.__HORROR_CORRIDOR_DEBUG__`, and the local player pose now flows into the world update so the render layer can own player-follow lighting without moving gameplay mutation into the render code. The host path now publishes authoritative snapshots at the prototype `50ms` tick instead of every frame, the client path now sends player updates at that same cadence, runtime-store pose/view/input sync is capped to `100ms`, and the debug export now exposes cadence counters for publish/update/UI-sync rates.
- **Failed Items:** None confirmed in the current runtime loop after the browser proof pass.
- **Unverified Items:** Exact locked pointer-look feel plus tick behavior on slower or remote network conditions.
- **Likely Files to Update:** `src/features/render/three/animationLoop.ts`, `src/components/game/GameCanvas.tsx`, `src/features/debug/store/runtimeDebugStore.ts`, `src/features/networking/peer/createHost.ts`, `src/features/networking/peer/createClient.ts`.
- **Recommended Next Action:** Use the new frame logger when validating future runtime and contract cleanup passes instead of relying on static UI snapshots alone.

### HUD

- **Status:** Completed clean-play pass
- **Checks Performed:** Checked the playing HUD regions and content.
- **Confirmed Items:** Default `PLAYING` is now canvas-first: the shell header, top-left title/objective, sequence display, top-right status, held-item card, minimap, bottom controls hint, settings button, and pointer-lock chrome are hidden. The settings drawer still exists offscreen and opens/closes with `Q`; the frame logger remains gated through `?debug=frames`, the backquote toggle, or `window.__HORROR_CORRIDOR_DEBUG__.showOverlay()`. Pause and completed overlays still keep their menu UI.
- **Failed Items:** None confirmed after the clean-play pass.
- **Unverified Items:** Whether the no-HUD play style should also hide pause/completed shell chrome in a later UX pass.
- **Likely Files to Update:** `src/components/hud/HUDOverlay.tsx`, `src/components/hud/Minimap.tsx`, `src/components/game/GameShell.tsx`, `src/components/hud/FrameDebugPanel.tsx`.
- **Recommended Next Action:** Keep default `PLAYING` UI-free and only expose settings/debug/status when explicitly requested.

### Menus and Overlay Styling

- **Status:** Completed
- **Checks Performed:** Checked `StartMenu`, `JoinMenu`, `LobbyScreen`, `PauseMenu`, `CompleteScreen`, and the top-level shell copy.
- **Confirmed Items:** The color direction is green horror-terminal rather than a generic app dashboard; all required screen states are present; the shell header now shows room / mode / status instead of debug-style screen/flow chips; the menu and lobby copy no longer uses “local slice,” “preview run,” or “placeholder room action” language.
- **Failed Items:** None confirmed in the menu/overlay copy after the parity pass.
- **Unverified Items:** Exact typography and spacing match to the original prototype screenshot.
- **Likely Files to Update:** `src/components/game/GameShell.tsx`, `src/components/menus/StartMenu.tsx`, `src/components/menus/JoinMenu.tsx`, `src/components/menus/LobbyScreen.tsx`, `src/components/menus/PauseMenu.tsx`, `src/components/menus/CompleteScreen.tsx`, `src/app/globals.css`.
- **Recommended Next Action:** Keep the shell language stable and tighten visual fidelity later if needed.

### Minimap

- **Status:** Completed
- **Checks Performed:** Checked canvas-based rendering, visible entity categories, and local arrow rendering.
- **Confirmed Items:** The minimap draws nearby walkable cells, the end cell, ooze, ground cubes, other players, and the local player arrow; it preserves main-corridor versus branch coloring from `cell.value`; it uses each replicated player's `color`; it ignores held/placed cubes so only ground cubes appear, matching the prototype intent more closely; and its canvas is now redrawn imperatively from the runtime loop instead of through a React effect tied to snapshot/pose subscriptions.
- **Failed Items:** None confirmed from the code.
- **Unverified Items:** Exact scale, brightness, and stroke thickness compared to the prototype.
- **Likely Files to Update:** `src/components/hud/Minimap.tsx`.
- **Recommended Next Action:** Keep this implementation unless a visual comparison shows it needs tighter contrast.

### Global Styling

- **Status:** Mostly completed
- **Checks Performed:** Checked base colors, font setup, body background, and global canvas handling.
- **Confirmed Items:** The app uses a dark green terminal palette and the root styling is aligned with the horror-terminal direction.
- **Failed Items:** None confirmed from the stylesheet alone.
- **Unverified Items:** Exact spacing, glow, and legibility match to the prototype.
- **Likely Files to Update:** `src/app/globals.css`, `src/app/layout.tsx`.
- **Recommended Next Action:** Keep the style direction but compare against the prototype visually if exact fidelity matters.

### Cleanup and Lifecycle

- **Status:** Completed
- **Checks Performed:** Checked unmount cleanup, pointer-lock cleanup, resize listener cleanup, and Three.js disposal.
- **Confirmed Items:** The animation loop stops, listeners are removed, ResizeObserver is disconnected, the world is disposed, the renderer is disposed, and the canvas element is removed on unmount. `GameCanvas.tsx` cleanup no longer clears `authoritativeSnapshot`; that shared runtime state is now left to the shell/store reset paths, which avoids strict-mode remount breakage during validation.
- **Failed Items:** None confirmed.
- **Unverified Items:** Whether restart/re-entry sequencing should also reset any peer adapter state once networking is wired.
- **Likely Files to Update:** `src/components/game/GameCanvas.tsx`, `src/components/game/GameShell.tsx`, `src/features/render/three/worldBuilder.ts`, `src/features/render/three/animationLoop.ts`.
- **Recommended Next Action:** Keep renderer cleanup local to `GameCanvas.tsx` and keep authoritative snapshot resets owned by the shell/runtime stores.

### Build and Type Safety

- **Status:** Completed
- **Checks Performed:** Ran `npx tsc --noEmit` and `npm run lint`.
- **Confirmed Items:** Both checks passed at audit time.
- **Failed Items:** None from build or lint.
- **Unverified Items:** None in this category.
- **Likely Files to Update:** None required for build correctness right now.
- **Recommended Next Action:** Preserve the current build state while fixing the parity failures above.

## 4. Failure Point Register

### `NET-001`
- **Severity:** `P0`
- **Status:** Fixed
- **Subsystem:** Host/Client Flow
- **Exact check that failed:** The app should use the host/client transport adapters to create a live multiplayer session, but the shell previously fabricated local room data and did not prove a real browser-visible join flow.
- **What the prototype expects:** Host-authoritative bootstrap, visible room code sharing, live client join, and real transport-backed lobby/game start flow.
- **What the current repo does instead:** `GameShell.tsx` now creates real host/client transports, routes transport events into the stores, and broadcasts host start / full sync payloads. The peer adapters also include a browser-local bridge for same-origin tabs, which the visible browser validation path uses to prove the host/client session flow.
- **Evidence from current code:** `src/components/game/GameShell.tsx:65-360`, `src/components/game/GameCanvas.tsx:119-620`, `src/features/networking/peer/createHost.ts:1-320`, and `src/features/networking/peer/createClient.ts:1-260`. Browser validation on 2026-03-23 showed the host lobby player count increasing from 1 to 2 after the client joined the shared room code, and both tabs transitioned to `PLAYING` after host start. `npx tsc --noEmit` and `npm run lint` both pass.
- **Likely files to update:** `src/components/game/GameShell.tsx`, `src/components/game/GameCanvas.tsx`, `src/features/networking/peer/createHost.ts`, `src/features/networking/peer/createClient.ts`, `src/features/networking/peer/peerEvents.ts`, `src/features/networking/protocol/messageTypes.ts`.
- **Suggested fix direction:** Keep the browser-visible session path stable; only revisit the adapter layer if external machine-to-machine PeerJS behavior needs proof later.

### `NET-002`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** Networking Protocol
- **Exact check that failed:** The protocol contract does not preserve the prototype’s literal message names (`PLAYER_UPDATE`, `TRY_INTERACT`, `START_GAME`, `SYNC`).
- **What the prototype expects:** A small set of explicit host/client messages with the prototype names or a perfectly documented mapping that every caller uses consistently.
- **What the current repo does instead:** The protocol now uses a shared `PROTOCOL_MESSAGE_TYPES` enum with the prototype literals on the wire, and `GameShell.tsx` routes the messages using that enum.
- **Evidence from current code:** `src/features/networking/protocol/messageTypes.ts:13-129`, `src/features/networking/protocol/serializers.ts:1-191`, `src/features/networking/protocol/syncSnapshot.ts:1-145`, `src/components/game/GameShell.tsx:15-180`. `npx tsc --noEmit` and `npm run lint` pass, and `rg -n 'host/start|client/player-update|client/interaction-request|host/full-sync|host/lobby-event' src` returns no matches.
- **Likely files to update:** None required unless an external compatibility alias is needed later.
- **Suggested fix direction:** Keep the enum and serializer checks in sync if any new protocol message types are added.

### `RENDER-001`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** Render World Construction
- **Exact check that failed:** Main corridor floor and branch floor are not rendered distinctly.
- **What the prototype expects:** Numeric maze cells `1` and `2` should be visually distinguishable, with the main corridor and branches feeling different in the world.
- **What the current repo does instead:** `worldBuilder.ts` now splits floor instances into `maze-main-floor` and `maze-branch-floor` layers with distinct materials.
- **Evidence from current code:** `src/features/render/three/worldBuilder.ts:138-296` now counts `value === 1` separately from `value === 2 || value === 3 || value === 4`, builds two floor layers, and places each cell into the correct instanced layer. The harness output shows both `maze-main-floor` and `maze-branch-floor` children under `maze-static`, with `mainFloorCells: 553` and `branchFloorCells: 555` for seed `123`.
- **Likely files to update:** None for this parity item unless a later visual comparison finds the split too subtle.
- **Suggested fix direction:** Keep the split floor treatment; only retune material contrast if screenshot parity still looks off.

### `RENDER-002`
- **Severity:** `P2`
- **Status:** Fixed
- **Subsystem:** Render World Construction
- **Exact check that failed:** Cube-specific lighting is not present.
- **What the prototype expects:** Cube meshes should have their own light or glow contribution distinct from the world static lights.
- **What the current repo does instead:** Cubes now have their own point lights in a dedicated `maze-cube-lights` group, and those lights follow visibility/state updates.
- **Evidence from current code:** `src/features/render/three/worldBuilder.ts:334-430` creates one `PointLight` per cube, attaches them under `maze-cube-lights`, and keeps their color, position, visibility, and intensity synced to each cube. The harness output shows `cubeLightCount: 3` and `cubeCount: 3` for seed `123`.
- **Likely files to update:** `src/features/render/three/worldBuilder.ts` only if later visual comparison suggests the lights need tuning.
- **Suggested fix direction:** Keep the per-cube light group; only adjust the intensities or ranges if a screenshot pass shows the glow needs calibration.

### `RENDER-003`
- **Severity:** `P0`
- **Status:** Fixed
- **Subsystem:** Render World Construction / Runtime Animation Loop
- **Exact check that failed:** The browser-visible `PLAYING` viewport read as fully black even though the runtime was mounted and rendering.
- **What the prototype expects:** The first-person corridor should be visibly readable from the first frame, with local illumination near the player, a clear floor/wall split, and a sane starting yaw.
- **What the current repo does instead:** The render path now uses prototype-oriented visibility: initial spawn yaw is restored to `-Math.PI / 2`, origin-centered point lights were removed, the world owns a player-follow light, the lit materials use brighter Lambert shading closer to the prototype palette, and renderer/scene output no longer crush the image with the previous dark tone-mapping stack.
- **Evidence from current code:** `src/features/game-state/domain/createInitialGameState.ts`, `src/features/render/three/createLights.ts`, `src/features/render/three/createMaterials.ts`, `src/features/render/three/createRenderer.ts`, `src/features/render/three/createScene.ts`, `src/features/render/three/worldBuilder.ts`, and `src/components/game/GameCanvas.tsx`. Detached Playwright on 2026-03-23 with `?debug=frames` confirmed a mounted canvas (`1439 x 888` backing size), a live frame logger (`latestMode: "snapshot-replay"`), no console errors beyond HMR, and a visible corridor/floor/wall view before pointer lock. Before/after screenshots and the full signal-flow write-up were logged in `docs/HorrorCorridor-V1-Black-Viewport-Audit.md`.
- **Likely files to update:** None required for the fixed issue unless a later render cleanup regresses first-frame visibility.
- **Suggested fix direction:** Preserve player-follow lighting, prototype spawn yaw, and the simpler Lambert/no-tone-mapping visibility path unless a future render rewrite has equivalent browser proof.

### `GAME-001`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** Win Rules
- **Exact check that failed:** Exact-order completion is not implemented as the prototype’s direct `all slots filled -> compare colors to targetSequence` check.
- **What the prototype expects:** When all slots are filled, the placed cube colors should be compared to the target sequence as a whole.
- **What the current repo does instead:** The win rules now compare the occupied cube colors against the target order directly once every slot is filled; no unlock-propagation gate remains in the victory check.
- **Evidence from current code:** `src/features/game-state/domain/winRules.ts:15-96` and `src/features/game-state/domain/interactionRules.ts:227-267`.
- **Likely files to update:** `src/features/game-state/domain/winRules.ts`, `src/features/game-state/domain/interactionRules.ts`, `src/features/game-state/domain/gameTypes.ts` only if a later edge-case regression appears.
- **Suggested fix direction:** Keep the current direct ordered-color comparison and only adjust it if a malformed-state regression is discovered.

### `MOVE-001`
- **Severity:** `P2`
- **Status:** Fixed
- **Subsystem:** Movement and Look
- **Exact check that failed:** The movement curve is not a literal port of the prototype feel.
- **What the prototype expects:** The visible behavior should stay close to the prototype constants and movement feel, without adding unrelated modifiers.
- **What the current repo does instead:** The player-domain hot path now matches the prototype behavior much more closely: arrow keys map to strafe/forward movement, movement no longer carries sprint/crouch or keyboard-turn modifiers, and camera look recenters pitch only after the prototype inactivity delay.
- **Evidence from current code:** `src/features/player/domain/input.ts:1-118`, `src/features/player/domain/movement.ts:1-101`, `src/features/player/domain/cameraLook.ts:1-61`, `src/components/game/GameCanvas.tsx:178-378,649-737`, `src/features/networking/protocol/messageTypes.ts:45-64`, and `src/features/networking/protocol/serializers.ts:108-125`. Focused harness output on 2026-03-23 showed `ArrowLeft -> left`, `moveStrafe: -1`, one-frame left strafe delta `{ x: -0.15, z: 0 }`, delayed pitch recenter (`0.2` stays `0.2` before the 1000ms threshold and becomes `0.19` after), prototype pitch sign on mouse input (`pitchMouse: -0.03`), and unchanged wall blocking from `resolveMazeCollision`.
- **Likely files to update:** None required for this failure unless later human playtesting finds a feel mismatch that the current harnesses did not expose.
- **Suggested fix direction:** Keep movement/look ownership in the player domain and only retune if a later visible playtest finds a remaining feel discrepancy.

### `MOVE-002`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** Runtime Animation Loop / Movement and Look
- **Exact check that failed:** WASD locomotion only advanced while pointer lock was active, so unlocked `PLAYING` sessions showed `forward: 1` in the logger with no local pose change.
- **What the prototype expects:** Keyboard locomotion should work whenever the game is actively playing; pointer lock is for mouse look, not a hard prerequisite for moving.
- **What the current repo does instead:** `GameCanvas.tsx` now advances host/client simulation whenever the UI screen is `PLAYING`, while `mousemove` and look deltas remain gated by pointer lock. `PointerLockGate.tsx` and `HUDOverlay.tsx` now describe capture as mouse-look only.
- **Evidence from current code:** `src/components/game/GameCanvas.tsx`, `src/components/game/PointerLockGate.tsx`, and `src/components/hud/HUDOverlay.tsx`. Detached Playwright on 2026-03-23 showed unlocked `host-sim` frames, `pointerLocked: false`, `input.moveForward: 1`, a local pose change from `x: 383.35` to `x: 383.80`, unchanged yaw/pitch during unlocked mouse movement, and a `PAUSED` transition still stopping movement.
- **Likely files to update:** None required for the fixed issue unless future playtesting finds another lock-state control-flow regression.
- **Suggested fix direction:** Preserve the current split: `PLAYING` gates locomotion, pointer lock gates mouse look, and `PAUSED` still blocks simulation.

### `UI-001`
- **Severity:** `P2`
- **Subsystem:** Menus and Overlay Styling
- **Status:** Fixed
- **Exact check that failed:** The shell still read like a debug/preview app in places rather than a prototype horror-terminal.
- **What the prototype expects:** The shell and overlay copy should feel like game UI, not development scaffolding.
- **What the current repo does instead:** The top-level header now shows `Room`, `Mode`, and `Status` chips instead of `Screen` / `Flow` debug chips, and the menu copy no longer uses “local slice,” “preview run,” or “placeholder room action” language.
- **Evidence from current code:** `src/components/game/GameShell.tsx:251-270`, `src/components/menus/StartMenu.tsx:1-80`, `src/components/menus/JoinMenu.tsx:1-86`, `src/components/menus/LobbyScreen.tsx:1-120`, `src/components/menus/PauseMenu.tsx:1-60`, and `src/components/menus/CompleteScreen.tsx:1-60`. Browser validation on 2026-03-23 shows the updated shell copy on the visible screens.
- **Likely files to update:** `src/components/game/GameShell.tsx`, `src/components/menus/StartMenu.tsx`, `src/components/menus/JoinMenu.tsx`, `src/components/menus/LobbyScreen.tsx`, `src/components/menus/PauseMenu.tsx`, `src/components/menus/CompleteScreen.tsx`, `src/app/globals.css`.
- **Suggested fix direction:** Keep the shell language focused on in-world room/run terminology and only revisit styling if screenshot comparison shows remaining drift.

### `DATA-001`
- **Severity:** `P2`
- **Status:** Fixed
- **Subsystem:** Shared Types and Data Contracts
- **Exact check that failed:** Some runtime contracts are broader than the prototype and therefore exact contract parity is not proven.
- **What the prototype expects:** The strict replicated data model should stay as small as possible unless the prototype actually requires the extra fields.
- **What the current repo does instead:** Shared transport types now carry only replicated maze/player/cube/anomaly data, while runtime-only `CubeState` and `SequenceSlot` structures live in `gameTypes.ts` and are rebuilt locally inside `GameCanvas.tsx`.
- **Evidence from current code:** `src/types/shared.ts`, `src/features/game-state/domain/gameTypes.ts`, `src/features/networking/protocol/syncSnapshot.ts`, `src/features/networking/protocol/serializers.ts`, `src/components/game/GameCanvas.tsx`, `src/components/hud/HUDOverlay.tsx`, `src/components/hud/FrameDebugPanel.tsx`, and `src/features/debug/store/runtimeDebugStore.ts`. Direct harness output on 2026-03-23 showed snapshot keys `["anomaly","appState","cubes","gameId","gameState","maze","oozeLevel","oozeTrail","players","room","seed","tick","timestampMs"]`, `hasSequenceSlots: false`, `anomalyKeys: ["sequence","slots"]`, and serializer round-trip `syncHasAnomaly: true` / `syncHasSequenceSlots: false`. Detached Playwright with `?debug=frames` showed the live HUD and frame logger rendering `anomaly.sequence` / `anomaly.slots` with no remaining `sequenceSlots` field.
- **Likely files to update:** None required for parity. Future changes should preserve the transport/runtime split instead of re-expanding shared contracts.
- **Suggested fix direction:** Keep runtime-only slot workflow and cube metadata local to the game-state/runtime layer.

### `DATA-002`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** Shared Types and Data Contracts
- **Exact check that failed:** The replicated maze snapshot lost numeric `1` vs `2` cell semantics, so the live runtime could not preserve branch-floor versus main-corridor behavior.
- **What the prototype expects:** Numeric maze cell values `0,1,2,3,4` should survive into the runtime so rendering, minimap, and end/start markers stay faithful to the generator output.
- **What the current repo does instead:** `MazeCellSnapshot` now carries an explicit numeric `value`, the initial snapshot builder writes it, the serializer validates it, `GameCanvas.tsx` rebuilds the live maze grid from it, and `Minimap.tsx` colors cells from it.
- **Evidence from current code:** `src/types/shared.ts:14-18`, `src/features/game-state/domain/createInitialGameState.ts:45-49`, `src/features/networking/protocol/serializers.ts:38-45`, `src/components/game/GameCanvas.tsx:106-158`, and `src/components/hud/Minimap.tsx:89-104`. Direct harness output on 2026-03-23 showed replicated maze cells round-tripping with keys `["grid","id","value"]`, while runtime world/minimap consumers still preserved branch-versus-corridor counts and coloring from `cell.value`.
- **Likely files to update:** None required for this failure unless a later contract simplification removes `value` by mistake.
- **Suggested fix direction:** Keep `MazeCellSnapshot.value` mandatory in every snapshot and serializer path.

### `DATA-003`
- **Severity:** `P2`
- **Status:** Fixed
- **Subsystem:** Shared Types and Data Contracts
- **Exact check that failed:** The replicated player snapshot dropped prototype-relevant `color` / `pitch` and substituted unrelated fields, which broke parity in other-player rendering, minimap color, and player update semantics.
- **What the prototype expects:** The runtime should preserve per-player color and per-player pitch alongside world position and rotation so the live view can mirror the host-authored state.
- **What the current repo does instead:** `PlayerSnapshot` now includes `color` and `pitch`, initial game-state creation seeds those fields, network player updates carry `pitch`, serializers validate it, and the runtime/minimap consume the replicated player color and pitch values.
- **Evidence from current code:** `src/types/shared.ts:49-57`, `src/features/game-state/domain/createInitialGameState.ts:149-183`, `src/features/game-state/domain/networkRules.ts:15-21`, `src/features/networking/protocol/messageTypes.ts:57-64`, `src/features/networking/protocol/serializers.ts:58-66,108-129`, `src/components/game/GameCanvas.tsx:178-204, 375, 442, 742`, and `src/components/hud/Minimap.tsx:136-155`. Direct harness output on 2026-03-23 showed a sample player snapshot with `color: "#FF0055"` and `pitch: 0`, and a serialized `PLAYER_UPDATE` round-tripped `decodedPosePitch: 0.12`.
- **Likely files to update:** None required for this failure unless a later networking or runtime pass drops `pitch` or `color` again.
- **Suggested fix direction:** Keep `color` / `pitch` mandatory in replicated player state and validate them at the serializer boundary.

### `DATA-004`
- **Severity:** `P2`
- **Status:** Fixed
- **Subsystem:** Shared Types and Data Contracts / Render World Construction
- **Exact check that failed:** The replicated cube snapshot still mirrored runtime-only visibility/lock metadata instead of the prototype-style `state` / `ownerId` shape, which made render and minimap behavior depend on internal flags.
- **What the prototype expects:** Replicated cubes should look like the prototype cubes: identity, color, world position, cube state (`ground`, `held`, `placed`), and owner id when held. Render and minimap logic should derive visibility from that state.
- **What the current repo does instead:** The replicated snapshot now emits prototype-style cube state and owner id, `worldBuilder.ts` renders placed cubes as visible pedestal items based on that state, and `Minimap.tsx` only draws ground cubes.
- **Evidence from current code:** `src/types/shared.ts`, `src/features/networking/protocol/syncSnapshot.ts`, `src/features/networking/protocol/serializers.ts`, `src/features/render/three/worldBuilder.ts`, and `src/components/hud/Minimap.tsx`. Direct harness output on 2026-03-23 showed replicated cube keys `["color","id","ownerId","position","state"]`, plus `placedCubeVisible: true`, a non-ground pedestal `placedCubePosition`, and `placedLightIntensity: 1.25`.
- **Likely files to update:** None required unless later passes simplify sequence-slot placement or change pedestal layout.
- **Suggested fix direction:** Keep render/minimap behavior derived from replicated cube `state` instead of runtime-only booleans.

### `PLACEHOLDER-001`
- **Severity:** `P3`
- **Status:** Fixed
- **Subsystem:** Maze Domain Scaffolding
- **Exact check that failed:** Scaffold exports are still present in the maze domain.
- **What the prototype expects:** The final parity code should not keep obvious scaffold markers around unless they are needed.
- **What the current repo does instead:** The scaffold exports were removed from the maze domain, and no active imports reference them anymore.
- **Evidence from current code:** `src/features/maze/domain/mazeTypes.ts`, `src/features/maze/domain/mazePathing.ts`, and `src/features/maze/domain/cubePlacement.ts` no longer export the placeholder types. `rg -n "MazeTypesPlaceholder|MazePathingPlaceholder|CubePlacementPlaceholder" src` returns no matches.
- **Likely files to update:** None required for this failure unless later work reintroduces scaffold markers.
- **Suggested fix direction:** Keep the maze domain free of scaffold exports and only add new types when they own real behavior.

### `OOZE-001`
- **Severity:** `P3`
- **Status:** Fixed
- **Subsystem:** Ooze System
- **Exact check that failed:** The ooze trail contract is broader than the prototype trail item shape.
- **What the prototype expects:** Ooze entries should be world-space trail items with `x`, `z`, `y`, `rotY`, and `scale`.
- **What the current repo does instead:** Ooze trail entries now match the prototype shape exactly, and the decay/spawn logic still follows the 10-second / 10% removal / `0.75` shrink behavior from the prototype loop.
- **Evidence from current code:** `src/types/shared.ts:91-97` and `src/features/game-state/domain/oozeRules.ts:15-73`. Direct harness output on 2026-03-23 showed spawned trail keys `["x","z","y","rotY","scale"]` and a decayed trail item with `scale: 0.75`.
- **Likely files to update:** None required for this failure unless later work reintroduces non-prototype ooze metadata.
- **Suggested fix direction:** Keep the ooze contract flat and world-space.

### `RUNTIME-001`
- **Severity:** `P0`
- **Status:** Fixed
- **Subsystem:** Runtime Animation Loop / App Boot
- **Exact check that failed:** The runtime still built a local maze and local authoritative state on mount instead of consuming a host start or full sync payload.
- **What the prototype expects:** The visible game should reflect host-authored maze/player state rather than a locally synthesized preview world.
- **What the current repo does instead:** `GameCanvas.tsx` reconstructs `MazeResult` / `GameState` from `authoritativeSnapshot`, builds the world from that snapshot, and only host-side simulation mutates the authoritative snapshot locally. The browser-local bridge plus host start / sync flow now drives both tabs into `PLAYING` from the host-authored room state.
- **Evidence from current code:** `src/components/game/GameCanvas.tsx:119-620`, `src/features/networking/protocol/syncSnapshot.ts:1-180`, `src/features/networking/peer/createHost.ts:1-320`, and `src/features/networking/peer/createClient.ts:1-260`. `rg -n "generateMaze\\(" src/components/game/GameCanvas.tsx` no longer returns a local boot path. Browser validation on 2026-03-23 showed both tabs entering `PLAYING` after the host start payload, and `npx tsc --noEmit` / `npm run lint` both pass.
- **Likely files to update:** `src/components/game/GameCanvas.tsx`, `src/features/networking/protocol/syncSnapshot.ts`, `src/features/networking/peer/createHost.ts`, `src/features/networking/peer/createClient.ts`.
- **Suggested fix direction:** Keep the snapshot-driven runtime stable and only revisit it if later render or movement work breaks the authoritative state flow.

### `RUNTIME-002`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** Runtime Animation Loop / Validation Tooling
- **Exact check that failed:** `GameCanvas.tsx` cleanup cleared `authoritativeSnapshot`, which let React strict-mode remounts drop the runtime boot state before the second mount could initialize the renderer or frame loop.
- **What the prototype expects:** Runtime boot state should survive component remounts unless the shell explicitly resets the session; cleanup should release renderer resources, not erase shared authoritative state behind the shell’s back.
- **What the current repo does instead:** `GameCanvas.tsx` now leaves `authoritativeSnapshot` ownership to the shell/runtime stores, while a bounded frame logger records per-frame pose/input/snapshot state and exposes it via `window.__HORROR_CORRIDOR_DEBUG__` and a gated HUD panel.
- **Evidence from current code:** `src/components/game/GameCanvas.tsx`, `src/features/debug/store/runtimeDebugStore.ts`, and `src/components/hud/FrameDebugPanel.tsx`. Detached Playwright on 2026-03-23 with `?debug=frames` showed the logger panel advancing from `64 FRAMES` to `180 FRAMES`, a latest frame like `#650 / snapshot-replay`, and `window.__HORROR_CORRIDOR_DEBUG__.extractState()` returning `{ enabled: true, overlayVisible: true, frameCount: 180, latestFrame: 423 }` with no console errors.
- **Likely files to update:** `src/components/game/GameCanvas.tsx`, `src/components/game/GameShell.tsx`, `src/features/debug/store/runtimeDebugStore.ts`, `src/components/hud/FrameDebugPanel.tsx`.
- **Suggested fix direction:** Keep shell/store layers responsible for authoritative snapshot lifetime, and use the frame logger for future runtime validation instead of reintroducing ad hoc cleanup resets.

### `FEEL-001`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** Runtime Animation Loop / Render World Construction / HUD
- **Exact check that failed:** The V1 runtime felt less smooth than the one-file prototype because it still did too much work per frame in the hot path.
- **What the prototype expects:** A single imperative loop that moves the player every frame, throttles networking to `50ms`, keeps UI churn low, and uses a simpler camera/render surface.
- **What the current repo does instead:** `GameCanvas.tsx` now keeps local movement/look continuous while throttling host publishes and client updates to the prototype `NETWORK_TICK_RATE`, caps UI-facing store sync to `100ms`, and owns minimap drawing imperatively. The camera and renderer were also moved closer to prototype defaults: `fov=75`, `eyeHeight=2`, fixed ambient fill, `antialias: false`, and pixel ratio cap `1`.
- **Evidence from current code:** `src/components/game/GameCanvas.tsx`, `src/components/hud/Minimap.tsx`, `src/components/hud/HUDOverlay.tsx`, `src/features/debug/store/runtimeDebugStore.ts`, `src/components/hud/FrameDebugPanel.tsx`, `src/features/render/three/createCamera.ts`, `src/features/player/domain/movement.ts`, `src/features/render/three/createLights.ts`, and `src/features/render/three/createRenderer.ts`. Detached Playwright on 2026-03-23 showed host cadence `authoritativePublishesPerSecond: 19-20`, client cadence `clientUpdatesPerSecond: 20`, UI sync cadence `10`, unlocked host movement from `x: 377.5` to `x: 379.8985`, unlocked client movement from `x: 379.8985` to `x: 382.4455`, and unchanged unlocked yaw/pitch under mouse movement. Typecheck and lint passed. Full notes are in `docs/HorrorCorridor-V1-Prototype-Feel-Audit.md`.
- **Likely files to update:** None required for the fixed issue unless later ECS extraction reintroduces per-frame store or network churn.
- **Suggested fix direction:** Preserve the capped network/UI cadence and imperative minimap ownership while extracting the next runtime slice.

### `ARCH-001`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** Local Domain Kits and Content Packs
- **Exact check that failed:** Local protokits were named and configured as HorrorCorridor-specific modules, which made them poor reusable domain services.
- **What the target architecture expects:** Kits should expose generic domain capabilities and metadata, while HorrorCorridor-specific values live in presets/content packs.
- **What the current repo does instead:** `src/protokits` now exposes a local domain-kit SDK with token validation, dependency validation, generic domain kits, a HorrorCorridor preset, and cumulative content packs. Old `horror-maze-kit`, `horror-anomaly-kit`, `horror-ooze-trail-kit`, and `horror-runtime-kit` files were removed.
- **Evidence from current code:** `src/protokits/runtimeKit.ts`, `src/protokits/domainKit.ts`, `src/protokits/contentPack.ts`, `src/protokits/horrorCorridorKits.ts`, `src/protokits/presets/horror-corridor-preset.ts`, and the generic `src/protokits/*-domain-kit/index.ts` files. A direct Node/TypeScript probe validated duplicate kit id failure, malformed token failure, missing dependency failure, config-only customization, and deterministic manifests. `npx tsc --noEmit` and `npm run lint` pass.
- **Likely files to update:** `src/protokits/*`, plus runtime/render owner files only when a descriptor kit is being wired into live behavior.
- **Suggested fix direction:** Keep domain kits generic and push all game-specific values through presets/content packs.

### `SCENE-001`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** Local Domain Kits / Render World Construction / Scene Dressing
- **Exact check that failed:** Prop, scene-dressing, lighting, and render-validation kits were descriptor/config services only; the live corridor still had no seeded content placement pass.
- **What the target architecture expects:** Scene content should be generated through generic domain kits, customized by HorrorCorridor presets/content packs, and rendered as non-blocking descriptors before gameplay collision or interaction systems are added.
- **What the current repo does instead:** The local kit stack now includes `grid-field-domain-kit`, `raymarch-sampling-domain-kit`, `object-placement-domain-kit`, `procedural-pbr-material-domain-kit`, `texture-placement-domain-kit`, `lighting-placement-domain-kit`, `walkthrough-domain-kit`, and `scene-generation-domain-kit`. `worldBuilder.ts` now builds a `maze-scene-dressing` group from CPU-sampled descriptors: non-blocking props, projected decals/textures, local lights, and walkthrough checkpoints.
- **Evidence from current code:** `src/protokits/*-domain-kit/index.ts`, `src/protokits/presets/horror-corridor-preset.ts`, `src/protokits/horrorCorridorKits.ts`, `src/features/render/three/sceneDressingDescriptors.ts`, `src/features/render/three/worldBuilder.ts`, `src/features/debug/store/runtimeDebugStore.ts`, and `src/components/game/GameCanvas.tsx`. Browser validation on 2026-06-18 showed `sceneDressing: { propCount: 140, textureCount: 260, lightCount: 27, walkthroughCheckpointCount: 8 }`, all render-validation thresholds true, a `1400x900` canvas in `PLAYING`, `host-sim` movement from `x=377.5` to `x=383.4976`, ooze/decal count increasing from `1` to `3`, zero visible game text nodes with settings/debug hidden, no `runtime-minimap` element, and no console errors beyond React DevTools/HMR/Fast Refresh logs.
- **Likely files to update:** `src/features/render/three/sceneDressingDescriptors.ts`, `src/features/render/three/worldBuilder.ts`, `src/protokits/presets/horror-corridor-preset.ts`, and future dedicated render-system files if the scene layer grows.
- **Suggested fix direction:** Keep this layer visual-only until a specific collision/interaction pass adds prop occupancy and gameplay rules through explicit systems.

### `SCENE-002`
- **Severity:** `P1`
- **Status:** Partially Fixed
- **Subsystem:** Render World Construction / Scene Dressing / Human-View Readability
- **Exact check that failed:** Generated props, decals, and lights existed in debug counters but the starting player view was still too dark and empty from a human perspective.
- **What the target expects:** The starting scene should read like a high-fidelity industrial horror corridor: readable floor/wall/ceiling separation, visible foreground and midground props, route direction, green accent lighting, material breakup, and no HUD.
- **What the current repo does instead:** The render tuning pass reduced fog density, raised ambient/hemisphere/player-follow lighting, brightened core world materials, allowed visual-only dressing closer to spawn, prioritized spawn-adjacent raymarch hits, added two spawn-local scene lights, brightened generated decals, and switched pipe/cable props from box meshes to cylinders. The scene is now readable and dressed, but still below target fidelity because props/materials remain primitive and flat.
- **Evidence from current code:** `src/features/render/three/createScene.ts`, `src/features/render/three/createLights.ts`, `src/features/render/three/createMaterials.ts`, `src/features/render/three/sceneDressingDescriptors.ts`, `src/features/render/three/worldBuilder.ts`, and `src/protokits/presets/horror-corridor-preset.ts`. Human-view screenshots and luminance notes are tracked in `docs/HorrorCorridor-Starting-Scene-Visual-Audit.md`. The baseline starting scene had `65.3%` of pixels below luminance `15` and `0%` at or above luminance `35`; the cylinder pass improved to `39.5%` below `15` and `29.4%` at or above `35`.
- **Likely files to update:** `src/features/render/three/sceneDressingDescriptors.ts`, `src/features/render/three/worldBuilder.ts`, `src/features/render/three/sceneDressingRenderer.ts`, `src/protokits/presets/horror-corridor-preset.ts`, and the live-player harness if screenshot gates need calibration.
- **Suggested fix direction:** Run `npm run validate:live-player` to capture the post-fidelity scene, then tune mesh/material readability from the fresh screenshot and luminance report. Do not mark this visually fixed from debug counts alone.
- **Progress note (2026-06-19):** Added `prop-material-fidelity-domain-kit`, preset/content-pack wiring, and `sceneDressingRenderer.ts` to realize existing prop descriptors as grouped pipes, cable bundles, vent slats, panel indicators, debris clusters, and pedestal dressing. `sceneDressingDescriptors.ts` now prioritizes spawn-near floor dressing and brighter grime/wear projections. `npx tsc --noEmit`, `npm run lint`, and `npm run build` passed. Human-view screenshot validation is still unverified because Playwright MCP, Node Playwright Chrome launch, and macOS `screencapture` all failed in this environment; see `docs/HorrorCorridor-Starting-Scene-Visual-Audit.md`.
- **Progress note (2026-06-19):** Added the repo-local NexusSimulator-aligned live-player harness and documented its gates in `docs/HorrorCorridor-Live-Player-Harness.md`. `node --check scripts/horror-corridor-live-player-harness.mjs`, `npm run validate:live-player -- --dry-run`, `npx tsc --noEmit`, and `npm run lint` pass.
- **Progress note (2026-06-19):** Fixed `VALIDATION-001` by adding and validating a self-launched headed Chrome CDP backend for `npm run validate:live-player`. The latest report at `docs/live-player-harness/latest/report.json` is `passed` with launch mode `cdp:http://127.0.0.1:9224`, movement delta `8.2575`, zero visible UI text, readable luminance (`darkRatio=0.3879`, `lightRatio=0.3876`), and scene dressing counts `props=140`, `textures=260`, `lights=27`, `walkthrough=8`. Headless Playwright browser launch remains unstable, but CDP is now the accepted local validation backend.
- **Progress note (2026-06-19):** Human-view review of `docs/live-player-harness/latest/starting-scene.png` keeps this item `Partially Fixed`: the scene is now readable, HUD-free, and route-forward, with a passing production live-player report (`darkRatio=0`, `lightRatio=0.9668`, average luminance `52.4023`, movement delta `8.2584`, `props=140`, `textures=260`, `lights=27`). It is not visually complete because the palette is still too uniformly green, prop silhouettes still read as pale primitive slabs, and focal/anomaly lighting is weak compared with the generated target.
- **Progress note (2026-06-19):** Updated the live-player harness to capture `starting-scene.png` before movement and `movement-scene.png` after movement. This fixed a validation flaw where the starting-scene artifact could be a post-movement wall-adjacent frame rather than the actual spawn view.
- **Progress note (2026-06-19):** Shifted the render stack toward the generated broken-city target: world materials now bias toward muddy/rust/broken concrete, scene projections include mud/moss/rust/crack descriptors, props can use `rusted-metal`, root/rubble/debris dressing is more visible, and warm fill/exposure was tuned until `npm run validate:live-player` passed against a fresh production server. Latest report: `playMode=solo`, `mode=solo-sim`, `hiddenPlayUi=true`, `noHudIconChrome=true`, `movementDelta=8.531999999999925`, `propCount=140`, `textureCount=260`, `lightCount=27`, `average=45.844157475608284`, `darkRatio=0.015671180230966072`, `lightRatio=0.5704972946942013`. Human review still keeps this item `Partially Fixed` because several panels/tables/crates read as pale slabs rather than believable broken-city props.
- **Progress note (2026-06-19):** Added `LOADING` as a staged app scene and added the external procedural smoke path. `npm run smoke:protokits` passed with `props=140`, `textures=260`, `lights=27`, rusted pipes/cables/vents, grass/root/rubble terrain objects, and seven material families before the same descriptor systems were verified in the main live-player run. Fresh `npm run validate:live-player:dev` passed with `movementDelta=5.2515`, `darkRatio=0.02566`, `lightRatio=0.45963`, `props=140`, `textures=260`, and `lights=27`. Status remains `Partially Fixed` because mesh-profile fidelity still needs stronger authored silhouettes.
- **Progress note (2026-06-19):** Projection slab breakup pass reduced the most obvious pale floor/wall sticker rectangles by darkening and shrinking texture descriptors, adding irregular projection alpha masks, and preserving base opacity during texture pulsing. Fresh production validation passed with `movementDelta=5.5485`, `darkRatio=0.01905`, `lightRatio=0.50303`, `propCount=140`, `textureCount=260`, `lightCount=27`, `hiddenPlayUi=true`, and `noHudIconChrome=true`. Lighting scout passed for both `starting-scene.png` and `movement-scene.png`. Status remains `Partially Fixed` because the space still reads too wide/warehouse-like and several prop silhouettes remain blocky.
- **Progress note (2026-06-19):** Added geometry-aware scene-generation kits and wired them into the live placement path. `triangle-surface-sampler`, `socket-graph`, `footprint-layout`, and `scene-bundle` kits are now part of the local domain manifest and preset pipeline. The current scene-dressing manifest now exposes `anchorCount`, `socketCount`, `layoutCount`, and `bundleCount`; smoke/live-player validation passed with `160/110/26/18`. Human-view review of the latest `starting-scene.png` shows a better clustered layout and less arbitrary scatter, but still keeps the item `Partially Fixed` because boxy prop silhouettes and a flat open-sky roofline still dominate the frame.
- **Progress note (2026-06-19):** Added explicit object-kit coverage around the current descriptor path. `src/protokits/horrorCorridorKits.ts` now installs first-class kits for wall panels, pipes, cables, vents, building facades, tables, storage crates, debris, overgrowth, and pedestal dressing, and `src/protokits/sceneObjectKitReview.ts` now verifies that every generated prop kind maps to supported material families and shared triplanar/PBR shader profiles. `npx tsc --noEmit`, targeted ESLint, and `npm run smoke:protokits` all passed with empty uncovered-coverage arrays. This lowers architecture drift and shading inconsistency risk, but it does not by itself solve the visible mesh-profile quality gap in player view.
- **Progress note (2026-06-19):** Added the visual-match CLI gate and ran a bounded live-capture smoke. The harness captured both `starting-scene.png` and `movement-scene.png`, confirmed the canvas was mounted, movement changed, no HUD chrome was visible, and prop/texture/light thresholds were met, but the capture report failed `luminanceReadable`. `SCENE-002` therefore remains `Partially Fixed` and should be driven by a real reference-vs-current Codex visual review rather than mock-score smoke acceptance.
- **Progress note (2026-06-19):** Added an isolated human-view review room for `corridor-lamp` and improved the production lamp renderer/light anchor. This creates the preview-proof lane that was missing for lamp work: the review room shows references, current render, lighting/angle context, scale/corridor context, checklist, notes, and score in one captured page. `node --check`, `npx tsc --noEmit`, `npm run lint`, `npm run smoke:protokits`, accepted mock review, below-threshold retry artifact generation, and a readability metric on `review-room-corridor-dark.png` passed. `SCENE-002` remains `Partially Fixed` because the lamp has not yet passed a real Codex/human `>=90` isolated review or been revalidated in the main starting scene.
- **Progress note (2026-06-19):** Extended the lamp preview proof to include 8-angle orbit comparison. `npm run review:object-kit -- corridor-lamp --mock-score 95 --no-codex` captured 13 views total: 5 primary review views and 8 orbit views. `npm run review:object-kit -- corridor-lamp --mock-score 42 --no-codex` also captured 13 views and wrote a retry plan. The schema now requires per-orbit scoring and reference ranking, so a lamp can no longer pass from one flattering angle if side/back silhouettes fail.
- **Progress note (2026-06-19):** Split the lamp object kit into nine local sub-kits with inline configs and descriptor ownership. This moves the target reference breakdown into enforceable domains: foundation/base, pole, armature, lamp head, cable/conduit, fasteners, material, light, and validation. Smoke validation now proves those part kits are present in the full domain manifest instead of only relying on the rendered `lamp-post` count.
- **Progress note (2026-06-20):** Added `wound-triangle-mesh-domain-kit` and 10 unpromoted mesh-generating object kits: rusted service door, chain-link fence, broken generator, concrete jersey barrier, storm drain culvert, collapsed signpost, industrial shelving, hanging chain hook, barrel cluster, and broken concrete stair. Each kit has inline mesh-profile config and emits explicit indexed descriptors with positions, indices, normals, UVs, material slots, bounds, sockets, and `outward-ccw` winding. `npm run smoke:protokits` now validates `descriptorCount=10`, zero mesh descriptor failures, full domain manifest coverage, and scene-object review material/shader coverage. `npm run review:object-kit -- rusted-service-door --mock-score 95 --no-codex` captured 13 human-view screenshots through the generic object review room. `SCENE-002` remains `Partially Fixed` because these kits are intentionally not promoted into live scene placement until real isolated review and player-view proof pass.

### `OOZE-002`
- **Severity:** `P2`
- **Status:** Fixed
- **Subsystem:** Ooze System / Render World Construction
- **Exact check that failed:** The moving-player trail was still visually represented by small raised instances, which made the floor slime/decal behavior appear inconsistent from the player view.
- **What the prototype expects:** The trail should read like floor ooze/decal marks left behind by movement.
- **What the current repo does instead:** `worldBuilder.ts` now uses flat instanced `PlaneGeometry` decals for ooze, and `createMaterials.ts` gives the ooze material double-sided, non-depth-writing, polygon-offset behavior to reduce floor z-fighting. The debug frame snapshot now reports `decalCount`.
- **Evidence from current code:** `src/features/render/three/worldBuilder.ts`, `src/features/render/three/createMaterials.ts`, `src/features/debug/store/runtimeDebugStore.ts`, `src/components/hud/FrameDebugPanel.tsx`, and `src/components/game/GameCanvas.tsx`. Browser validation showed `oozeCount` and `decalCount` increasing from `1` to `3` after held `W` movement, with `mode: "host-sim"`.
- **Likely files to update:** `src/features/render/three/worldBuilder.ts`, `src/features/render/three/createMaterials.ts`, and `src/protokits/trail-decal-domain-kit/index.ts` if the descriptor kit is wired more deeply later.
- **Suggested fix direction:** Preserve flat floor decals and tune only material opacity/scale if future screenshot review shows readability drift.

### `HUD-002`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** HUD / Menus and Overlay Styling
- **Exact check that failed:** The active `PLAYING` screen still showed shell header, gameplay HUD, minimap, settings button, and pointer-lock chrome even after the requested no-UI play direction.
- **What the target UX expects:** Active play should be canvas-first and UI-free by default, with controls/status available only through explicit overlays.
- **What the current repo does instead:** `GameShell.tsx` hides the app shell header in `PLAYING`, `HUDOverlay.tsx` renders only settings/debug overlays during `PLAYING`, `PointerLockGate.tsx` supports a chrome-free mode with click-to-capture, and `GameCanvas.tsx` handles `Q` before the player-input gate so the settings drawer opens and closes reliably.
- **Evidence from current code:** `src/components/game/GameShell.tsx`, `src/components/hud/HUDOverlay.tsx`, `src/components/game/PointerLockGate.tsx`, and `src/components/game/GameCanvas.tsx`. Browser validation showed a full-viewport canvas at `1400x900`, zero visible text with debug hidden, settings closed at `x=1416` / `aria-hidden=true`, settings open at `x=920` / `aria-hidden=false` after `Q`, and settings closed again after another `Q`.
- **Likely files to update:** `src/components/game/GameShell.tsx`, `src/components/hud/HUDOverlay.tsx`, `src/components/game/PointerLockGate.tsx`, and `src/components/hud/SettingsOverlay.tsx` if future UX asks for different overlay access.
- **Suggested fix direction:** Keep `PLAYING` clean by default; add future status/controls through explicit overlays rather than persistent HUD panels.

### `VALIDATION-001`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** Live Player Harness / Browser Capture
- **Exact check that failed:** `npm run validate:live-player -- --start-server` should reach the app and capture player-view evidence, but all local Playwright browser launch modes currently crash before navigation.
- **What the target validation expects:** The live-player harness should reliably open the app, start a host run, move the player, capture `starting-scene.png`, compute luminance, and write a pass/fail report from current player-view evidence.
- **What the current repo does instead:** The harness now launches a headed Chrome CDP profile and attaches through Playwright over CDP, avoiding the unstable headless launch path.
- **Evidence from current code/artifacts:** `scripts/horror-corridor-live-player-harness.mjs`, `docs/HorrorCorridor-Live-Player-Harness.md`, and `docs/live-player-harness/latest/report.json`.
- **Likely files to update:** `scripts/horror-corridor-live-player-harness.mjs`, or a future alternate backend that connects to the in-app browser/CDP instead of launching a new browser process.
- **Suggested fix direction:** Keep the CDP backend as the local validation path. Tune `SCENE-002` from the current `starting-scene.png` instead of reopening this blocker unless CDP regresses.

### `VALIDATION-002`
- **Severity:** `P2`
- **Status:** Fixed
- **Subsystem:** Live Player Harness / Human-View No-HUD Validation
- **Exact check that failed:** The live-player harness passed the `hiddenPlayUi` gate because there was no visible text, but screenshot review still showed a bottom-left compass/marker in active play.
- **What the target validation expects:** No-HUD play validation should catch icon-only or canvas-adjacent UI chrome, not only visible text nodes.
- **What the current repo does instead:** The harness now includes a bottom-left icon/widget image gate and the latest production solo screenshots pass it with `bottomLeftBrightPixels=0`; this validates the no-HUD player-view gate for the current capture.
- **Evidence from current code/artifacts:** `scripts/horror-corridor-live-player-harness.mjs` adds `noHudIconChrome`; `docs/live-player-harness/latest/report.json` shows `hiddenPlayUi: true`, `noHudIconChrome: true`, and zero bottom-left bright HUD pixels.
- **Likely files to update:** `scripts/horror-corridor-live-player-harness.mjs`, `src/components/hud/HUDOverlay.tsx`, and the component that owns the compass/marker if the marker should be removed rather than allowed through a settings/debug mode.
- **Suggested fix direction:** Keep the icon/widget gate. Expand it only if new non-text HUD artifacts appear.

### `VALIDATION-003`
- **Severity:** `P2`
- **Status:** Fixed
- **Subsystem:** Procedural Kit Smoke Validation
- **Exact check that failed:** `npm run smoke:protokits` should validate `/api/procedural-kit-smoke` through its own temporary server, but this run hit repeated dev-server `404` responses and failed with an HTML/JSON parse error.
- **What the target validation expects:** The smoke-first procedural descriptor gate should be repeatable as a standalone command and should fail with a clear route/server diagnostic when the API is unavailable.
- **What the current repo does now:** The standalone command is currently reliable in this environment and returns a structured JSON summary with passing descriptor thresholds and object-kit coverage.
- **Evidence from current run:** `npm run smoke:protokits` passed on 2026-06-19 with `ok=true`, `propCount=140`, `textureCount=260`, `lightCount=28`, `walkthroughCheckpointCount=8`, `anchorCount=160`, `socketCount=110`, `layoutCount=26`, `bundleCount=18`, and no uncovered prop kinds, material families, or missing shader profiles in `sceneObjectKitReview`.
- **Likely files to update:** `scripts/procedural-kit-smoke.mjs` and possibly `package.json` if the command should support production-server validation or a clearer fallback.
- **Suggested fix direction:** Keep this smoke gate in the required validation set for visual/procedural work and reopen only if the standalone route/server path regresses.

### `VALIDATION-004`
- **Severity:** `P1`
- **Status:** Fixed
- **Subsystem:** Visual Reference Review / Codex CLI Harness
- **Exact check that failed:** Visual passes had reference images, screenshots, reviewer judgment, and retry plans spread across chat, ad hoc docs, and manual commands.
- **What the target validation expects:** A single repo-owned loop should generate or register one reference image, capture the current player view, ask Codex CLI for semantic visual scoring, write retry artifacts, and optionally invoke bounded auto-fix attempts below the promotion score.
- **What the current repo does now:** `npm run visual:match` owns that flow. It writes run folders under `docs/visual-review/runs`, uses `submit-reference` to register reference images, invokes the live-player harness for current screenshots, validates review JSON against `docs/visual-review/review-output.schema.json`, and writes final reports.
- **Evidence from current run:** `node --check scripts/horror-corridor-visual-match.mjs` passed; `npm run visual:match -- help` passed; `prepare --dry-run`, accepted mock score, low-score retry artifact, invalid-review blocker, and manual `submit-reference --allow-existing` checks passed. A non-dry live-capture smoke against a started app wrote `starting-scene.png`, `movement-scene.png`, and `report.json`; the mock review accepted, but the capture report correctly preserved the underlying `luminanceReadable=false` signal for the next visual pass.
- **Likely files to update:** `scripts/horror-corridor-visual-match.mjs`, `docs/HorrorCorridor-Visual-Match-CLI.md`, and the review schema if the score rubric changes.
- **Suggested fix direction:** Use the visual-match loop before future `SCENE-002` fixes so visual acceptance is based on a reference image, fresh player-view screenshots, Codex semantic scoring, and inspectable retry artifacts.

## 5. Placeholder / Stub Register

- No confirmed active scaffold exports remain in the maze/runtime path after the 2026-03-23 cleanup pass.
- The scene-generation kits are now wired into live rendering as descriptor-driven, visual-only content. They are not collision or gameplay systems yet. Future passes should update this register if any descriptor becomes dead, misleading, or too render-specific for a generic domain kit.

## 6. Unverified Items

- Whether cross-machine PeerJS behavior outside the same-origin browser bridge is as stable as the validated local-tab flow.
- Whether the current frame logger needs export-to-file support, or whether the bounded in-memory buffer plus `window.__HORROR_CORRIDOR_DEBUG__.extractState()` is sufficient for future validation passes.
- Whether visual-only props should remain non-blocking forever or become collision/query components through a later object-occupancy kit.
- Whether procedural PBR-style material descriptors should grow real normal/roughness/metalness texture maps per material family or stay lightweight for runtime performance.
- Whether active pointer-lock movement/look in a manual session reveals any remaining visibility drift that the detached non-pointer-lock screenshot does not show.
- Whether the corridor lamp passes a real human/LLM isolated review at `>=90` using the new full review-room screenshots rather than the current mock-score validation path.
- Whether the 10 new mesh-generating object kits pass real human/LLM review at `>=90`; current proof is descriptor smoke plus one mock-score capture for `rusted-service-door`, not final visual promotion.

## 7. Build / Runtime Blockers

- Build blockers: none confirmed. TypeScript compilation and linting passed during this audit.
- Runtime/parity blocker: none confirmed. A fresh recycled dev server on `127.0.0.1:3006` now shows clean detached Playwright validation through `START -> LOBBY_HOST -> PLAYING`, a live advancing frame logger in `?debug=frames` mode, extractable frame state via `window.__HORROR_CORRIDOR_DEBUG__.extractState()`, a mounted non-zero canvas, a visibly readable corridor view before pointer lock, unlocked `host-sim` movement with `pointerLocked: false`, host publish cadence at `19-20/s`, client update cadence at `20/s`, and no console errors beyond normal HMR connection logs plus the known detached pointer-lock restriction.
- Current run validation on `http://localhost:3000/` also showed `START -> LOBBY_HOST -> PLAYING`, a full-viewport `1400x900` canvas in active play, zero visible text/UI with debug hidden, `Q` settings slide-in/out, `host-sim` movement from `x=377.5` to `x=383.8018`, and ooze/decal counts increasing from `1` to `3` after movement.
- Current live-player harness result: historical `docs/live-player-harness/latest/report.json` reports passed through the Chrome CDP backend, but the newest visual-match live-capture smoke at `docs/visual-review/runs/2026-06-19T22-19-23-759Z-final-live-capture-smoke/attempts/attempt-001/capture/report.json` reports `luminanceReadable=false` while still proving canvas mount, movement, no-HUD chrome, prop count, texture count, and light count.
- Current visual-proof blocker: no tooling blocker remains for this batch. `SCENE-002` remains `Partially Fixed` because the newest player-view capture still needs luminance/readability tuning and human-view review still finds the scene below target fidelity: broad warehouse-like framing, blocky prop silhouettes, shelf-like side dressing, and weak focal/anomaly route landmarks.
- Current object-kit review state: `corridor-lamp` now has a working human-context review-room harness with a generated primary target PNG, supporting references, full-page screenshots, raw canvas screenshots, 5 primary review views, and 8 orbit comparison views. Mock score paths are validated, but a real Codex visual review and main-scene promotion capture are still pending.

## 8. Highest-Leverage Fix Order

1. Run the real corridor-lamp object review: `npm run review:object-kit -- corridor-lamp` without mock scoring, inspect the full review-room screenshots, and only promote the lamp if `player-distance`, `corridor-dark`, and all 8 orbit views pass at `>=90`.
2. Run real isolated review for the new mesh-object kits starting with `rusted-service-door`, `broken-generator`, and `concrete-jersey-barrier`; only then wire passing kits into `sceneDressingDescriptors.ts` placement weights.
3. Continue `SCENE-002` through `npm run visual:match`: generate/register the current target reference, capture the fresh starting scene, score it against the reference, then let the bounded auto-fix loop target the first below-90 semantic failure.
4. Replace remaining blocky live props with promoted mesh-object profiles while preserving the shared triplanar/PBR shader path.
5. Improve the open-sky roofline and skyline breakup so the top half of frame no longer reads as a flat uniform cap over the corridor.
6. Add stronger kit-driven focal/anomaly lighting and route landmarks while preserving the passing no-HUD and luminance gates.
6. Strengthen foreground and midground prop material specificity so rusted metal, damp concrete, roots, moss, mud, and rubble read as distinct surfaces.
7. Add first-person bobbing hands as foreground render objects tied to movement/carry/interact state.
8. Keep `npm run smoke:protokits` in the required validation path and reopen `VALIDATION-003` only if the route/bootstrap reliability regresses.
9. Extract the visual scene-dressing layer into a dedicated render system/file if `worldBuilder.ts` grows further.
10. Start the next MVVM/scene cleanup pass so `GameShell.tsx` owns scene transitions more explicitly.
11. Add an object-occupancy/collision planning pass only after visual dressing placement is stable.

## 9. File Ownership Map for Parity Work

- Maze generation and maze contracts: `src/features/maze/domain/generateMaze.ts`, `src/features/maze/domain/cubePlacement.ts`, `src/features/maze/domain/mazePathing.ts`, `src/features/maze/domain/mazeTypes.ts`.
- Interaction and win logic: `src/features/game-state/domain/interactionRules.ts`, `src/features/game-state/domain/winRules.ts`, `src/features/game-state/domain/gameTypes.ts`.
- Ooze behavior: `src/features/game-state/domain/oozeRules.ts`, `src/types/shared.ts`, `src/features/render/three/worldBuilder.ts`.
- Movement and look: `src/features/player/domain/input.ts`, `src/features/player/domain/movement.ts`, `src/features/player/domain/cameraLook.ts`, `src/features/player/domain/collision.ts`. Current ownership is cleaner after removing dead keyboard-turn behavior and keeping recenter logic inside `cameraLook.ts`.
- Networking protocol and adapters: `src/features/networking/protocol/messageTypes.ts`, `src/features/networking/protocol/serializers.ts`, `src/features/networking/protocol/syncSnapshot.ts`, `src/features/networking/peer/createHost.ts`, `src/features/networking/peer/createClient.ts`, `src/features/networking/peer/peerEvents.ts`.
- Runtime and scene construction: `src/components/game/GameCanvas.tsx`, `src/components/game/PointerLockGate.tsx`, `src/components/hud/HUDOverlay.tsx`, `src/components/hud/Minimap.tsx`, `src/features/render/three/worldBuilder.ts`, `src/features/render/three/animationLoop.ts`, `src/features/render/three/createScene.ts`, `src/features/render/three/createLights.ts`, `src/features/render/three/createMaterials.ts`, `src/features/render/three/createRenderer.ts`, `src/features/render/three/createCamera.ts`, `src/features/game-state/domain/createInitialGameState.ts`, `src/features/player/domain/movement.ts`. The black-viewport fix depends on preserving prototype spawn yaw and render-owned player-follow lighting, and the feel pass depends on keeping network cadence throttled, minimap drawing imperative, and the render surface closer to the prototype.
- Runtime validation tooling: `src/features/debug/store/runtimeDebugStore.ts`, `src/components/hud/FrameDebugPanel.tsx`, `src/components/game/GameCanvas.tsx`. This layer owns bounded frame/event capture, the `window.__HORROR_CORRIDOR_DEBUG__` extraction API, and the gated on-screen logger overlay.
- Live-player validation harness: `scripts/horror-corridor-live-player-harness.mjs`, `docs/HorrorCorridor-Live-Player-Harness.md`, and `docs/live-player-harness/latest/report.json` after execution. This layer owns repeatable browser/player-view proof for starting-scene readability, movement, no-HUD play, luminance thresholds, and scene-dressing counts.
- Codex control harness: `scripts/horror-corridor-harness.mjs`, `HorrorCorridor-Harness/README.md`, `HorrorCorridor-Harness/domain-service-kit-source.json`, `docs/HorrorCorridor-Harness-Guide.md`, and `docs/HorrorCorridor-Harness-Manifest.json`. This layer owns repo-local Codex guidance for kit vocabulary, domain-service-kit rules, control surfaces, and promotion order when durable chat direction must be preserved beyond the current session.
- Live-agent control surface: `.agent/live-agent.md` plus the live-agent references in `.agent/start-here.md`, `.agent/workflow.md`, `.agent/intention.md`, `.agent/memory.md`, `.agent/feedback.md`, and `memory.md`. This layer owns the long-duration in-game agent contract: episodic screen review, bounded tool loops, review loops, and durable lesson promotion rules.
- Procedural kit smoke validation: `src/app/api/procedural-kit-smoke/route.ts`, `scripts/procedural-kit-smoke.mjs`, and `npm run smoke:protokits`. This layer validates descriptor generation, prop kinds, object-kit coverage, material families, texture kinds, lights, and walkthrough counts outside the main `GameCanvas` path before visual content is trusted in the game.
- Local domain kits and content packs: `src/protokits/runtimeKit.ts`, `src/protokits/domainKit.ts`, `src/protokits/contentPack.ts`, `src/protokits/horrorCorridorKits.ts`, `src/protokits/presets/horror-corridor-preset.ts`, `src/protokits/content-packs/index.ts`, and `src/protokits/*-domain-kit/index.ts`. This layer owns generic domain kit contracts and config/content-pack manifests; it must not own HorrorCorridor-specific constants outside the preset.
- Maze/runtime cleanup note: the maze domain no longer carries scaffold placeholder exports, and `GameCanvas.tsx` / `Minimap.tsx` now derive maze presentation directly from numeric cell values.
- Runtime contract split note: replicated players/cubes/anomaly are now narrower transport data, while `GameState` reconstructs richer runtime-only player/cube/slot fields locally.
- HUD, menus, and styling: `src/components/game/GameShell.tsx`, `src/components/hud/HUDOverlay.tsx`, `src/components/hud/Minimap.tsx`, `src/components/hud/SettingsOverlay.tsx`, `src/components/menus/StartMenu.tsx`, `src/components/menus/JoinMenu.tsx`, `src/components/menus/LobbyScreen.tsx`, `src/components/menus/PauseMenu.tsx`, `src/components/menus/CompleteScreen.tsx`, `src/app/globals.css`. Default `PLAYING` should stay UI-free unless settings/debug are explicitly opened.

## 10. Suggested Next Prompt

Next batch: start from `.agent/`, run real non-mock object reviews for `corridor-lamp`, `rusted-service-door`, `broken-generator`, and `concrete-jersey-barrier`, then promote only passing kits into live scene placement. After promotion, run `npm run smoke:protokits`, `npm run validate:live-player`, and `npm run visual:match` against the starting scene so `SCENE-002` remains driven by player-view proof rather than descriptor counts alone.
