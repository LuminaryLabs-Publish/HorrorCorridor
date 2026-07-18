# HorrorCorridor Product Direction

## One Sentence

HorrorCorridor is an endless first-person horror expedition through ruined buildings where players survive monster encounters, deliberately endure each creature's unique scare to collect it, and lose only when a stalking monster completes its capture.

## What The Game Is

- A canvas-first horror maze with almost no persistent UI during play.
- A finite authored introduction that opens into an effectively endless dungeon-crawl of ruined horror buildings.
- A game about listening, orientation, risky curiosity, traces, and coordination rather than combat.
- A monster-collection game where a creature enters the Monster Index only after the player experiences its characteristic scare and survives the response.
- A replayable content platform where natural domains compose maze places, monster encounters, trails, room offers, props, lighting, validation, and future hazards.

## Core Player Fantasy

- You are dropped into a huge unnatural corridor built from broken concrete, brick, mud, roots, weeds, rubble, and dark service passages.
- You can barely see around you, but your movement leaves evidence behind.
- Every building can contain a monster encounter, discovery, or room offer.
- You listen for monsters outside your view and use the flashlight as a perceptual defense rather than a weapon.
- Letting a monster complete more of its scare is dangerous but necessary to understand and collect it.
- The corridor should feel abandoned, wet, overgrown, hostile, and increasingly authored through terrain, props, decals, lights, and event rules.

## Product Pillars

- `Readable Darkness`: the world is dark, but not visually broken. The player-follow light, floor/wall separation, and local props must keep navigation legible.
- `Broken-City Overgrowth`: the default art direction is not neon cyber or clean sci-fi. It is dirty terrain, grass, moss, roots, rubble, brick, broken concrete, rusted objects, and practical light.
- `Minimal UI`: active play should be immersive. Controls, status, and debug information belong in explicit overlays, not persistent HUD chrome.
- `Trace-Based Navigation`: ooze/decals, minimap/debug tools, and future world marks should help players understand where they have been.
- `Scare-Earned Collection`: monsters are collected by surviving their distinct scare rituals, not by fighting or trapping them.
- `Perceptual Defense`: positional sound reveals a stalking monster's direction; the player must turn and hold the flashlight beam on it to drive it away.
- `Endless Delve`: after the entrance, the run continues building by building with no duration victory. Encounters survived are the primary run score.
- `Dungeon-Crawl Offers`: rooms provide bounded discoveries and boons that change how long the expedition can survive.
- `Cumulative Content Kits`: new content should arrive as domain-oriented kits, presets, and content packs rather than one-off hardcoded features.
- `Validated Runtime`: every meaningful runtime or visual change should be checked through the browser and debug extraction surface.
- `Embodied First Person`: camera shake, movement bob, and future visible hands should make traversal feel physical without damaging readability.

## Encounter Loss Contract

- A stalking monster approaches from outside the current view and announces nearness through spatial sound.
- The flashlight beam repels it when the player finds and faces it.
- Reaching the player forces the flashlight off for exactly three seconds.
- When the light returns, the player has a final response window shorter than ten seconds.
- Repelling the creature during that last chance survives its full scare and marks it collected.
- Missing the window causes a jumpscare and ends the run.
- Random flicker may create warning and uncertainty, but darkness alone does not end the run.

## Current Product Shape

- Players can host/join or enter solo, cross a finite introduction, and continue into an effectively endless ruined-building expedition.
- The first monster roster contains The Still Guest, The Wall Knocker, The Rust Mother, and The Breath Thief. Index knowledge advances from unknown to seen, studied, and collected according to the scare branch the player survives.
- Directional Web Audio signs, flashlight beam contact, exact three-second forced blackout, a sub-ten-second last chance, a visible jumpscare, and authoritative caught defeat are live.
- The generated V2 room target and current chamber proofs are saved under `docs/visual-targets/` and `docs/live-player-harness/`. Composition, enclosure, route, props, warm side light, and green depth are established. Broken masonry has 22 physical relief patches and 741 instanced bricks. Four standing-water and two wet-ground patches carry six footprint-bound broken-light layers; they improve wet response but are not true environment reflection. The broken generator reads as a distinct open-frame machine with flywheel, tank, engine, and exhaust. The left storage wall now reads as two loaded industrial racks totaling 82 authored parts, 38 stored-object parts, and 1,360 explicit triangles. A 26-part irregular collapsed-ceiling object roots the upper opening into the wall/shelter boundary with 8 radial fracture paths, 10 chipped edge fragments, and 3 small collapse-rooted rubble clusters. The walkable floor carries natural wet damaged concrete identity. The ceiling carries damp-spalled concrete/brick identity across intact and collapsed surfaces. Other wall/prop material richness, remaining primitive silhouettes, true reflection, and target-level edge density remain open; shelving corrosion and wear identity is the next one-feature visual subject.
- The furnished chamber now streams to each authoritative building entry and aligns to the entry heading, giving long runs a visible room succession without cloning the full mesh set throughout the maze. The continuous success proof ends inside a furnished Building 3.
- The local kit layer now mounts 36 current NexusEngine core kits, 73 HorrorCorridor descriptor/behavior kits, 6 executable composition kits, and the complete 359-owner natural state graph. Legacy cube/anomaly snapshot fields remain only for compatibility and do not receive normal endless-expedition interaction.
- The real sequential Luna proof is `docs/HorrorCorridor-Live-Luna-Run-2026-07-17.md`.
- The uninterrupted success proof is `docs/HorrorCorridor-Continuous-Success-Path-Proof-2026-07-17.md`.
- The bounded fracture/rubble proof and natural ownership digest is `docs/HorrorCorridor-Ceiling-Fracture-Rubble-Proof-2026-07-17.md`.
- The bounded ceiling-surface proof and no-new-kit ownership digest is `docs/HorrorCorridor-Ceiling-Material-Identity-Proof-2026-07-17.md`.
- The bounded shelving-silhouette proof and no-new-kit ownership digest is `docs/HorrorCorridor-Industrial-Shelving-Silhouette-Proof-2026-07-17.md`.

## Long-Term Direction

- Add scene dressing from content packs: muddy terrain, grass clumps, roots, moss, rubble, broken brick/concrete, pipes, vents, cables, panels, debris, stains, abandoned city props, and anomaly set pieces.
- Assemble the maze from procedural corridor tiles layered over terrain: straight corridors, corners, branches, dead ends, overgrown pockets, collapsed side paths, anomaly approaches, and landmark spaces.
- Generate scene dressing compositionally through local domain kits: grid fields, CPU raymarch sampling, object placement, procedural local PBR-style materials, projected texture placement, lighting placement, walkthrough checks, and render validation.
- Turn prop/lighting/trail descriptors into real render/runtime systems without bloating the frame loop. The first render pass should keep props visual-only and non-blocking until collision/interaction systems are intentionally added.
- Add staged procedural loading sections before `PLAYING`: maze generation, grid-field/raymarch sampling, descriptor generation, material/texture generation, render attach, and final player handoff.
- Use a solo procedural test path before multiplayer validation so world generation, post-processing, shaders, alpha-clipped props, and camera feel can be tuned without peer/session noise.
- Add foreground hands as movement-bobbing objects that reflect carry/interact state and make the first-person view feel embodied.
- Expand descriptor-driven props with alpha-clipped procedural texturing: grass, weeds, roots, tables, crates, ducts, panels, cables, rubble, debris, and anomaly set dressing should look worn, dirty, broken, and varied.
- Deepen the streamed building provider with multiple room identities and material/content variants while preserving its bounded one-room-at-a-time render cost.
- Build a roster of monsters with distinct sound signatures, approach behavior, full-scare rituals, collection requirements, and Index records.
- Keep the earlier anomaly sequence retired and outside the active domain graph unless a later explicit product decision redesigns it as optional expedition content.
- Build validation packs that assert nonblank rendering, no default HUD in play, readable spawn view, prop/decal minimums, and stable runtime cadence.
- Keep the game multi-file and production-minded while preserving the prototype's immediacy.

## Change Rule

When a change affects gameplay, world content, UI, architecture, or validation, update this direction if the change introduces a lasting product decision. Do not let one-off implementation details become product direction unless they materially change what HorrorCorridor is.

The detailed domain and NexusEngine reuse contract is [HorrorCorridor-Endless-Expedition-Architecture.md](./HorrorCorridor-Endless-Expedition-Architecture.md). The agent-ready natural-world, no-duplicate-kit, DSK, adapter, and proof map is [HorrorCorridor-Natural-World-Kit-Map.md](./HorrorCorridor-Natural-World-Kit-Map.md).
