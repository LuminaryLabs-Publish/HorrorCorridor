# Horror Corridor Expedition Room V2

Status: active generated build target

## Asset

- Image: `horror-corridor-expedition-room-v2.png`
- Size: 1672 x 941
- SHA-256: `5d82193a9c4343883746c9bae8c571bb8a4f16b2206aa3b20a67604d21fbfc91`
- Generator: built-in Codex image generation
- Purpose: production reference for the first ruined-building chamber and the reusable chamber-furnishing kit

## Visual Contract

- The room is a tight, naturally ruined industrial service chamber, not a broad street or generic warehouse.
- A dry-enough central walking lane remains obvious from entrance to the darker far threshold.
- Wet broken concrete, puddles, a drain, brick fall, roots, moss, and hanging growth layer the floor and boundaries without blocking the route.
- Shelving, crates, a dead generator, pipes, cable runs, chains, and a side work surface create believable former use.
- Most of the ceiling remains intact. One irregular collapse admits a restrained cold-green spill and vegetation.
- Small warm practical lights separate side discoveries from the sickly green depth cue.
- Foreground, side landmarks, far threshold, and optional offering space remain readable at gameplay brightness.
- Props sit against natural structural boundaries; they are not scattered as a category showcase.

## Generated Prompt

Use case: stylized-concept

Asset type: production environment reference for a real-time first-person horror game room

Primary request: create one highly detailed concept frame for a room inside the Horror Corridor Expedition: a ruined, overgrown industrial service building that feels like a dungeon-crawler chamber with one readable route forward and optional discoveries at the sides.

Scene: wet broken concrete, shallow puddles, cracked concrete and exposed brick, a collapsed ceiling edge, corroded shelving, utility crates, dead generator, loose cables, pipework, storm drain, hanging chains, rubble, moss, roots, vines, sparse grass, and a dark threshold leading deeper.

Composition: 16:9 first-person eye-level view from the entrance with strong foreground, midground, and background depth; a clear route slightly off-axis; playable side alcoves; no player body.

Lighting: very dark but readable, with narrow amber practical lights and flashlight falloff against a restrained anomalous green spill, wet highlights, and fog pockets.

Constraints: environment only, physically placed props, playable clearances, no text, no HUD, no people, no monster, no watermark, no neon cyberpunk, no pristine surfaces, no impossible geometry, and no uniform green wash.

## Build Translation

- `furnish-chamber-kit` owns the natural room composition and references this target id.
- Atomic object kits supply shelving, generator, drain, chain, barrels, fencing, door, crates, and work surfaces.
- Core NexusEngine data, simulation, world, graphics, resource, and runtime kits provide reusable behavior; the chamber kit only owns Horror Corridor composition.
- The Three render host realizes descriptors and performs no gameplay or world-authoring decisions.
