# HorrorCorridor Domain Kits

Local domain-kit workspace for HorrorCorridor runtime systems.

The kits mirror the NexusRealtime `0.0.2` domain-service shape: generic domains expose capabilities, resources, events, systems, install APIs, dependency tokens, and metadata. HorrorCorridor-specific values live in presets and content packs.

Generic domains:

- `grid-maze-domain-kit`: grid cells, start/end markers, path lookup, spawn anchors.
- `grid-field-domain-kit`: occupancy, surface, and safe-zone fields derived from grid cells.
- `raymarch-sampling-domain-kit`: CPU surface-hit, sight-line, and corridor-openness samples.
- `inventory-domain-kit`: held item ownership and pickup/drop state.
- `spatial-interaction-domain-kit`: nearby targets and interaction events.
- `sequence-objective-domain-kit`: ordered slot requirements and completion.
- `trail-decal-domain-kit`: distance-spawned decals, decay, cap, descriptor output.
- `prop-descriptor-domain-kit`: prop asset/render descriptors.
- `object-placement-domain-kit`: seeded non-blocking prop placement descriptors.
- `procedural-pbr-material-domain-kit`: deterministic local PBR-style material descriptors and maps.
- `texture-placement-domain-kit`: projected grime, stain, wear, and anomaly-residue anchors.
- `lighting-descriptor-domain-kit`: ambient, point, follow, flicker, and mood descriptors.
- `lighting-placement-domain-kit`: scene-aware light placement descriptors.
- `scene-dressing-domain-kit`: seeded prop/decal placement rules.
- `walkthrough-domain-kit`: spawn, route, cube, and anomaly path validation descriptors.
- `scene-generation-domain-kit`: composition of props, textures, lights, walkthroughs, and validation.
- `render-validation-domain-kit`: render/debug assertions.
- `corridor-lamp-object-kit`: composed lamp object kit. It is intentionally split into scoped part-profile kits for foundation, pole, armature, lamp head, cable/conduit, fasteners, material, light, and validation so each visible reference feature has its own inline config and descriptor ownership.

Customization lives in `presets/horror-corridor-preset.ts`.

First live wiring: the render world consumes the preset-driven scene-generation descriptors to create a `maze-scene-dressing` group with non-blocking props, projected decals, local lights, and debug summary counts.

Migration rule: domain kits stay reusable; presets and content packs customize them for HorrorCorridor.
