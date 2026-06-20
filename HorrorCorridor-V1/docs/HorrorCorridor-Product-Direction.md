# HorrorCorridor Product Direction

## One Sentence

HorrorCorridor is a cooperative first-person maze horror game where players enter a hostile overgrown broken-city corridor, leave physical traces, recover anomaly objects, and complete unstable sequences before the space overwhelms them.

## What The Game Is

- A canvas-first horror maze with almost no persistent UI during play.
- A multiplayer expedition through dark corridors, branches, dead ends, and anomaly rooms.
- A game about orientation, memory, traces, and coordination more than combat.
- A replayable content platform where local domain kits compose maze rules, objectives, trails, props, lighting, validation, and future hazards.

## Core Player Fantasy

- You are dropped into a huge unnatural corridor built from broken concrete, brick, mud, roots, weeds, rubble, and dark service passages.
- You can barely see around you, but your movement leaves evidence behind.
- The maze contains colored anomaly objects and environmental clues.
- You must communicate, remember paths, recover objects, and place them in the right sequence.
- The corridor should feel abandoned, wet, overgrown, hostile, and increasingly authored through terrain, props, decals, lights, and event rules.

## Product Pillars

- `Readable Darkness`: the world is dark, but not visually broken. The player-follow light, floor/wall separation, and local props must keep navigation legible.
- `Broken-City Overgrowth`: the default art direction is not neon cyber or clean sci-fi. It is dirty terrain, grass, moss, roots, rubble, brick, broken concrete, rusted objects, and practical light.
- `Minimal UI`: active play should be immersive. Controls, status, and debug information belong in explicit overlays, not persistent HUD chrome.
- `Trace-Based Navigation`: ooze/decals, minimap/debug tools, and future world marks should help players understand where they have been.
- `Cooperative Anomaly Solving`: sequence objectives should require carrying, dropping, placing, and coordinating objects under maze pressure.
- `Cumulative Content Kits`: new content should arrive as domain-oriented kits, presets, and content packs rather than one-off hardcoded features.
- `Validated Runtime`: every meaningful runtime or visual change should be checked through the browser and debug extraction surface.
- `Embodied First Person`: camera shake, movement bob, and future visible hands should make traversal feel physical without damaging readability.

## Current Product Shape

- Players can host/join, enter a generated maze, move with keyboard controls, look with pointer capture, leave ooze decals, find cubes, and solve the anomaly sequence.
- The world is transitioning away from green terminal horror toward grounded broken-city overgrowth: dark fog, local player light, dirty terrain, wall/floor distinction, cube/anomaly accents, guide/path indicators, and clean first-person play.
- The local kit layer now supports generic domain services and HorrorCorridor-specific presets/content packs.

## Long-Term Direction

- Add scene dressing from content packs: muddy terrain, grass clumps, roots, moss, rubble, broken brick/concrete, pipes, vents, cables, panels, debris, stains, abandoned city props, and anomaly set pieces.
- Assemble the maze from procedural corridor tiles layered over terrain: straight corridors, corners, branches, dead ends, overgrown pockets, collapsed side paths, anomaly approaches, and landmark spaces.
- Generate scene dressing compositionally through local domain kits: grid fields, CPU raymarch sampling, object placement, procedural local PBR-style materials, projected texture placement, lighting placement, walkthrough checks, and render validation.
- Turn prop/lighting/trail descriptors into real render/runtime systems without bloating the frame loop. The first render pass should keep props visual-only and non-blocking until collision/interaction systems are intentionally added.
- Add staged procedural loading sections before `PLAYING`: maze generation, grid-field/raymarch sampling, descriptor generation, material/texture generation, render attach, and final player handoff.
- Use a solo procedural test path before multiplayer validation so world generation, post-processing, shaders, alpha-clipped props, and camera feel can be tuned without peer/session noise.
- Add foreground hands as movement-bobbing objects that reflect carry/interact state and make the first-person view feel embodied.
- Expand descriptor-driven props with alpha-clipped procedural texturing: grass, weeds, roots, tables, crates, ducts, panels, cables, rubble, debris, and anomaly set dressing should look worn, dirty, broken, and varied.
- Add more objective packs: multi-step anomalies, false sequences, keys, ritual objects, timed placements, and team-split tasks.
- Add corridor threats carefully: environmental hazards first, then optional entities if they support tension without turning the game into a shooter.
- Build validation packs that assert nonblank rendering, no default HUD in play, readable spawn view, prop/decal minimums, and stable runtime cadence.
- Keep the game multi-file and production-minded while preserving the prototype's immediacy.

## Change Rule

When a change affects gameplay, world content, UI, architecture, or validation, update this direction if the change introduces a lasting product decision. Do not let one-off implementation details become product direction unless they materially change what HorrorCorridor is.
