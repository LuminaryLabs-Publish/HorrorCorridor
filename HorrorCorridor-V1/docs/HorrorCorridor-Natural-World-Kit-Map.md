# HorrorCorridor Natural World and Core-Kit Composition Map

Status: active architecture, agent-ownership, and no-duplicate-kit contract

This map turns the HorrorCorridor world into natural truth owners first, then attaches the smallest reusable behavior kits. It is intentionally not a taxonomy of code, render passes, managers, object parts, or feature categories. The complete generated graph remains in `.agent/horror-corridor-domain-tree.md`; this document is the readable ownership and composition spine.

## 1. Domain List

The game has one root composition and five top-level natural domains:

1. `Expedition` — the lived run from departure through continuing or being caught.
2. `Corridor` — the place being crossed: its ways, buildings, ruin, growth, atmosphere, and traces.
3. `Party` — the explorers who inhabit the run, alone or together.
4. `Dread` — the growing danger, hauntings, hunters, and encounters.
5. `Shared Expedition` — the same expedition when its truth must survive authority, leaving, and rejoining.

`Horror Corridor Expedition` is composition, not a sixth gameplay silo. It gathers the five domains into one executable game.

## 2. Subdomain List

The readable natural spine is:

```text
Horror Corridor Expedition
+-- Expedition
|   +-- Departure
|   |   +-- Entrance
|   |   `-- First Threshold
|   +-- Delve
|   |   +-- Wayfinding
|   |   |   +-- Known Ways
|   |   |   +-- Landmarks
|   |   |   `-- Doubt
|   |   +-- Discovery
|   |   `-- Journey Traces
|   +-- Fate
|   |   +-- Continuing
|   |   `-- Caught
|   `-- Chronicle
|       +-- Encounter Chronicle
|       `-- Monster Index
|           `-- Monster Record
|               +-- Sighting
|               +-- Scare Lesson
|               `-- Collection Mark
+-- Corridor
|   +-- Maze
|   |   +-- Ways
|   |   |   +-- Passages
|   |   |   `-- Junctions
|   |   +-- Places
|   |   |   +-- Entrance
|   |   |   +-- Buildings
|   |   |   |   `-- Building
|   |   |   |       +-- Threshold
|   |   |   |       `-- Rooms
|   |   |   |           `-- Room
|   |   |   |               `-- Offering
|   |   |   `-- Heart
|   |   `-- Regions
|   +-- Ground
|   |   +-- Surface
|   |   |   `-- Paving
|   |   |       `-- Concrete
|   |   |           `-- Slabs
|   |   |               `-- Slab
|   |   +-- Mud
|   |   +-- Water
|   |   |   +-- Standing Water
|   |   |   `-- Wet Ground
|   |   `-- Rubble
|   +-- Ruin
|   |   `-- Structure
|   |       +-- Walls
|   |       |   +-- Masonry
|   |       |   `-- Openings
|   |       +-- Ceilings
|   |       |   `-- Ceiling
|   |       |       +-- Shelter
|   |       |       `-- Openings
|   |       |           `-- Collapse
|   |       `-- Services
|   +-- Overgrowth
|   |   +-- Grove
|   |   |   `-- Trees
|   |   |       `-- Tree
|   |   |           +-- Roots
|   |   |           +-- Trunk
|   |   |           `-- Crown
|   |   |               `-- Boughs
|   |   |                   `-- Bough
|   |   |                       `-- Branches
|   |   |                           `-- Branch
|   |   |                               `-- Twigs
|   |   |                                   `-- Twig
|   |   |                                       `-- Buds
|   |   |                                           `-- Bud
|   |   |                                               `-- Leaf Cluster
|   |   |                                                   `-- Leaves
|   |   |                                                       `-- Leaf
|   |   |                                                           +-- Blade
|   |   |                                                           `-- Veins
|   |   |                                                               `-- Vein
|   |   |                                                                   +-- Xylem
|   |   |                                                                   `-- Phloem
|   |   +-- Vines
|   |   `-- Weeds
|   +-- Atmosphere
|   |   +-- Illumination
|   |   |   +-- Darkness
|   |   |   +-- Lamp Pools
|   |   |   `-- Flashlight Beam
|   |   `-- Acoustics
|   |       +-- Room Tone
|   |       +-- Echoes
|   |       `-- Footfalls
|   `-- Traces
|       +-- Footprints
|       +-- Disturbances
|       `-- Left Things
+-- Party
|   +-- Gathering
|   +-- Explorers
|   |   `-- Explorer
|   |       +-- Body
|   |       +-- Hands
|   |       +-- Carried Things
|   |       `-- View
|   +-- Togetherness
|   `-- Signals
+-- Dread
|   +-- Tension
|   +-- Lostness
|   +-- Isolation
|   +-- Hazards
|   +-- Haunting
|   `-- Hunter
|       +-- Creature
|       +-- Presence
|       |   +-- Signs
|       |   `-- Nearness
|       +-- Awareness
|       +-- Intent
|       +-- Territory
|       +-- Pursuit
|       `-- Encounter
|           +-- Approach
|           +-- Repulse
|           +-- Blackout
|           +-- Last Chance
|           `-- Capture
`-- Shared Expedition
    +-- Shared Departure
    +-- Shared Journey
    +-- Stewardship
    +-- Shared World
    +-- Rejoining
    |   +-- Separation
    |   +-- Return
    |   `-- Restored Place
    `-- Shared Chronicle
```

Depth is discovered, not manufactured. A domain deepens by asking which natural subjects are required to make it up, then asking the same question of each child. Some visual/world subjects can truthfully reach dozens of layers. A branch stops as soon as another child would only name an implementation step, shape primitive, collection, registry, renderer, adapter, or proof. One child is allowed when it is the only meaningful contained subject; several children are allowed when the world genuinely branches.

## 3. Domain Purpose

| Domain | Truth it owns | Truth it does not own |
| --- | --- | --- |
| Expedition | phase, delve progress, encounter score, fate, run history, Index knowledge | room meshes, monster steering, transport |
| Corridor | world identity, meaningful places, ground, ruin, growth, atmosphere, traces | Three.js objects, browser loading, encounter outcome |
| Party | explorer identity, embodiment, carried discoveries, coordination | keyboard listeners, camera renderer, PeerJS |
| Dread | fear pressure, hunter presence and intent, encounter response, capture | Web Audio nodes, flashlight shader, jumpscare DOM |
| Shared Expedition | authority, shared journey/world, departure, rejoining, recovered place | socket implementation, serialization format, storage API |

Every stateful domain must have coherent meaning, inputs, outputs, reset, snapshot, and inspectable relationships. A domain does not need its own kit merely to exist. A kit does not become a domain merely because it has several implementation steps.

## 4. Evidence From the Game

- The canonical graph contains 358 child domains plus the root, 1,085 owned truths, 433 kit mounts representing 428 unique contracts, 59 services, 4 hosts, 6 proofs, and maximum natural depth 24.
- The executable runtime mounts all 359 natural owners and proves full reset plus deterministic replay.
- The current runtime installs 36 consumed NexusEngine cores, 73 local descriptor/behavior kits, and 6 composition kits: 474 installs over 405 registered paths.
- The uninterrupted headed success proof crosses two buildings, survives two encounters, studies one monster, collects another through its full scare, claims one offer, and streams the furnished chamber into Building 3.
- The persistent Luna loss proof reaches the exact three-second blackout, last chance, jumpscare, and authoritative `caught` result without a time-limit defeat.
- Current behavior coverage is honest rather than inferred from installation: 132 contracts are closed and 296 remain open.
- The current chamber realizes 77 architectural surfaces, 36 props, 17 target textures, 9 mesh objects, 22 masonry relief patches/741 bricks, 6 wet surfaces/6 broken-light layers, a 26-part/240-triangle collapsed-ceiling object with 8 fracture paths and 10 edge fragments, 3 small collapse-rooted rubble clusters, natural wet-concrete state, and damp-spalled ceiling identity across 3 material surfaces, 2 generated textures, and `0.32` relief.

Evidence locations: `.agent/domain-service-coverage.md`, `docs/live-player-harness/latest/`, `docs/live-player-harness/floor-material-proof/`, `docs/live-player-harness/ceiling-overlap-proof/`, `docs/live-player-harness/ceiling-material-proof/`, `docs/live-player-harness/success-path-proof/`, `docs/live-player-harness/reconnect-recovery-proof/`, and `docs/HorrorCorridor-Live-Luna-Run-2026-07-17.md`.

## 5. Core Kits Reused

HorrorCorridor pins NexusEngine commit `d41992636de2752f1ad9047b80701e6313f19b87` and reuses exactly the neutral capabilities consumed by a live player flow.

| Capability | Reused core kit IDs | Use here |
| --- | --- | --- |
| boot and composition | `core-startup-domain`, `n-core-platform-kit`, `n-core-composition-kit` | readiness, install order, root/branch composition |
| durable truth | `n-core-data-kit`, `n-core-transaction-ledger-kit`, `n-core-persistence-kit` | state, scare/Index history, restart and recovery |
| world and scene | `n-core-world-kit`, `n-core-scene-kit`, `n-core-spatial-kit`, `n-core-skybox-kit` | world identity, scene loading, placement, atmosphere boundary |
| objects and growth | `n-core-object-kit`, `core-object-shape-domain`, `core-object-fidelity-domain`, `n-core-vegetation-kit` | ruin objects, mesh descriptors, fidelity, overgrowth |
| embodied play | `n-core-input-kit`, `n-core-creature-kit`, `n-core-character-kit`, `n-core-player-kit`, `n-core-motion-kit`, `n-core-physics-kit` | explorer and monster embodiment/motion |
| runtime behavior | `n-core-simulation-kit`, `n-core-interaction-kit`, `n-core-animation-kit` | deterministic encounter pressure, beam contact, presentation intent |
| graphics and presentation | `n-core-assets-kit`, `n-core-graphics-kit`, `n-core-camera-kit`, `core-camera-framing-kit`, `core-presentation-domain`, `core-presentation-output-kit`, `n-core-ui-kit`, `core-ui-scale-kit` | renderer-neutral assets, graphics, view, output, overlays |
| sound and sharing | `n-core-audio-kit`, `n-core-network-kit` | directional sound descriptors and authoritative replication |
| evidence | `n-core-diagnostics-kit`, `n-core-debug-kit`, `core-capture-domain` | runtime inspection, replay evidence, captures |

Eight exported cores remain deliberately uninstalled because no current flow consumes them: `n-core-agent-kit`, `core-compute-domain`, `n-core-headless-editor-kit`, `n-core-mlnn-kit`, `n-core-policy-kit`, `n-core-graphics-reflection-kit`, `core-speech-domain`, and `n-core-utility-kit`. The wet layer is currently a bounded stylized light response, not a planar/probe/SSR reflection contract.

## 6. Kit Candidates

The decision order is strict:

1. If a NexusEngine core already owns the neutral capability, use it directly.
2. If the need is only target tuning, placement, palette, content, or a one-off value, use a preset/content pack; create no kit.
3. If the need binds React, HTML, Three.js, Web Audio, PeerJS, storage, or the browser, use an adapter/host; create no gameplay kit.
4. If the need only proves behavior, use a proof harness; create no production kit.
5. Only when a reusable HorrorCorridor verb or descriptor is still missing, add one atomic local kit with explicit core requirements.

Existing and valid atomic behavior candidates by branch:

| Branch | Atomic HorrorCorridor kits | Core capabilities composed |
| --- | --- | --- |
| Expedition | `begin-expedition-kit`, `open-endless-delve-kit`, `score-survived-encounter-kit`, `remember-monster-scare-kit`, `resolve-expedition-kit` | data, ledger, persistence, simulation |
| Corridor | `shape-seeded-corridor-kit`, `open-building-kit`, `furnish-room-kit`, `offer-room-boon-kit` | world, scene, spatial, object, vegetation |
| Party | `embody-explorer-kit`, `move-explorer-kit`, `carry-discovery-kit` | input, player, character, motion, physics, interaction |
| Dread | `stage-stalker-encounter-kit`, `signal-monster-nearness-kit`, `repel-monster-with-beam-kit`, `force-monster-blackout-kit`, `open-last-chance-kit`, `resolve-monster-capture-kit` | creature, character, spatial, audio, simulation, interaction, animation |
| Shared Expedition | `replicate-expedition-kit`, `preserve-host-truth-kit`, `recover-shared-run-kit` | network, data, ledger, persistence, diagnostics |

Object/content kits are reusable descriptors, not new world domains. The current ceiling chain is the model:

```text
Corridor / Ruin / Structure / Ceilings / Ceiling / Openings / Collapse
  owns the natural truth

Nexus object + object-shape + object-fidelity cores
  -> wound-triangle-mesh-domain-kit
    -> collapsed-ceiling-object-kit
      -> furnish-chamber-kit placement
        -> world/scene/spatial descriptors
          -> graphics/presentation descriptors
            -> Three.js host realization
```

`collapsed-ceiling-object-kit` exists because the target needed one reusable irregular ruin-object descriptor absent from the selected cores. It adds no ceiling gameplay domain, scene loader, renderer, material engine, or alias core. Its generic convex-slab primitive lives in the shared wound-mesh capability. The older `*-domain-kit` suffixes in the descriptor catalog are compatibility IDs; they do not make those catalogs natural domains.

The floor-material chain is the complementary no-new-kit model:

```text
Corridor / Ground / Surface / Paving / Concrete / Slabs / Slab
  owns concrete area, aggregate, moisture, settled membership, cracks, relief, and wetness

existing terrain-field + terrain-shader + wet-concrete descriptor capabilities
  -> Nexus assets / graphics / presentation cores
    -> Three.js host realization
      -> floor-material headed proof
```

The HorrorCorridor preset owns tuning. `settle-slabs-kit` and `crack-slab-kit` are behavior contracts over the natural state; no material taxonomy, reflection alias, scene-loading alias, or renderer-owned domain was added.

The ceiling-damage pass uses the same natural-first rule across several related owners without manufacturing a `ceiling-damage-system` category:

```text
Corridor / Ruin / Structure / Ceilings / Ceiling
  -> localized collapse and broken ceiling behavior

Corridor / Ruin / Structure / Ceilings / Ceiling / Openings
  -> breach bounds, sky exposure, settled falling debris

Corridor / Ruin / Decay / Cracking
  -> aperture-radial paths, widths, inactive movement

Corridor / Ground / Rubble / Fallen Masonry
  -> collapse-edge settlement, source, height, route clearance

existing Nexus world / scene / spatial + object / shape / fidelity
  -> existing wound-mesh, collapsed-ceiling, rubble, debris, and furnishing kits
    -> preset composition
      -> graphics / presentation descriptors
        -> Three.js host realization
          -> headed fracture/rubble proof
```

This closes `break-ceiling-kit`, `open-ceiling-kit`, `propagate-crack-kit`, and `collapse-masonry-kit`. It creates no new natural owner and no new production kit because every reusable capability and target contract already existed. A broad `damage`, `fracture system`, `rubble manager`, `ceiling renderer`, or material alias would duplicate either natural truth, an existing local capability, or the host.

Ceiling surface identity stays inside the same natural subject rather than becoming a material category tree:

```text
Corridor / Ruin / Structure / Ceilings / Ceiling
  -> surface
     owns construction, exposed material, damp-spalled condition,
     aggregate/seam pattern, roughness, and shallow relief

furnish-chamber-kit + HorrorCorridor preset
  -> existing terrain-shader and object-material capabilities
    -> existing wound-mesh / collapsed-ceiling descriptors
      -> Nexus assets / graphics / presentation cores
        -> Three.js host realization
          -> headed ceiling-material proof
```

This creates no new behavior contract or kit. `surface` is state because the ceiling's material condition is meaningful, inspectable, resettable world truth. Palette, scale, and response values remain preset tuning. Texture/shader translation remains existing reusable capability. Three.js texture allocation, shader uniforms, normals, and disposal remain host work. The structural crack network continues to belong to `Decay / Cracking` instead of being duplicated inside surface identity.

## 7. Composition Edges

```text
36 NexusEngine core kits
  -> 73 local atomic behavior/descriptor kits
    -> 359 natural state owners and their services
      -> horror-expedition-kit
      -> horror-corridor-world-kit
      -> horror-party-kit
      -> horror-dread-kit
      -> horror-shared-expedition-kit
        -> horror-corridor-game-kit
          -> browser / Three.js / Web Audio / PeerJS / storage hosts
```

The five branch compositions expose stable capabilities to the root. Cross-branch behavior uses declared services, not imports into another branch's private state. The root only installs and coordinates; it does not become a giant manager.

## 8. Duplicate and Merge Ledger

| Proposed local surface | Decision | Correct owner |
| --- | --- | --- |
| local world, scene, spatial, or skybox alias | reject/merge | matching NexusEngine core |
| local object registry, shape engine, fidelity engine, or vegetation engine | reject/merge | Nexus object/shape/fidelity/vegetation cores |
| local graphics, camera, presentation, output, UI, or scale alias | reject/merge | presentation cores |
| local input, physics, motion, simulation, animation, or interaction engine | reject/merge | runtime cores |
| local audio engine or network engine | reject/merge | audio/network cores |
| local reflection core for current puddles | reject | current response is stylized; install reflection only with a real consuming contract |
| room-specific coordinates, colors, weights, or placement | no kit | HorrorCorridor preset/content pack |
| Three.js geometry/material binding | no gameplay kit | Three.js adapter |
| Web Audio nodes and panning | no gameplay kit | Web Audio adapter |
| PeerJS/storage/browser binding | no gameplay kit | platform adapter |
| screenshot, reset, or replay check | no production kit | proof harness |
| reusable missing HorrorCorridor verb/descriptor | keep one atomic kit | natural owner plus explicit core requirements |

Do not create an alias kit to make an agent lane look complete. Merge duplicate contracts into the reused core, an existing atomic kit, or the appropriate branch composition. Do not count a descriptor ID as a separate natural domain.

## 9. DSK Boundary Map

| Agent lane | Owns | Integrates through | Must not own |
| --- | --- | --- | --- |
| Expedition | phase, delve, score, fate, Chronicle/Index | expedition services and `horror-expedition-kit` | room realization, hunter logic |
| Corridor | places, buildings, ground, ruin, overgrowth, atmosphere | corridor services and `horror-corridor-world-kit` | browser rendering, encounter outcome |
| Party | explorers, body, view, carried discoveries | party services and `horror-party-kit` | browser input listeners, networking transport |
| Dread | hunter, signs, approach, response, capture | dread services and `horror-dread-kit` | Web Audio nodes, DOM jumpscare ownership |
| Shared Expedition | authority, shared world, leaving/rejoining | shared services and `horror-shared-expedition-kit` | PeerJS implementation details |
| Presentation | adapters only | descriptors/snapshots from the root | gameplay decisions |
| Proof | deterministic and human-view evidence | public services/debug surface | production authority |

Multiple agents may deepen different branches concurrently because they all target the same root, core contracts, service vocabulary, and proof ladder. Each lane owns one natural branch and its local files. Cross-lane changes require an explicit service/composition edge; agents do not create alternate game loops or mutate another branch through the host.

## 10. Runtime Layers

```text
Layer 1  pinned NexusEngine neutral capability substrate
Layer 2  HorrorCorridor natural state owners and services
Layer 3  atomic local behavior and reusable descriptor kits
Layer 4  five top-level HorrorCorridor branch compositions
Layer 5  horror-corridor-game-kit root composition
Layer 6  platform adapters and thin hosts
Layer 7  proof harnesses and promotion evidence
```

## 11. Adapter Layers

- Three.js converts graphics/object/scene descriptors into meshes, materials, lights, camera state, and disposal work.
- Web Audio converts audio descriptors into spatial cues and gain/pan behavior.
- PeerJS converts shared-expedition messages into transport events.
- Browser storage converts persistence requests into stored/recovered data.
- React converts UI/presentation output into menus, overlays, and on-demand Index views.

Adapters may optimize realization. They may not choose monsters, score encounters, collect Index entries, start blackout, award offers, or decide defeat.

## 12. Host-Support Layers

`GameShell.tsx`, `GameCanvas.tsx`, and game HTML are thin assemblers. They may create/dispose the root, forward input, tick the runtime, synchronize snapshots, and mount adapters. Every gameplay answer must come back from a domain service, composition kit, or core capability. The HTML never becomes a second game runtime.

## 13. Proof-Harness Layers

1. Descriptor/object preview validates one kit in isolation.
2. ProtoKit smoke validates contracts, geometry, materials, and generated manifests.
3. Reset/snapshot/replay proves all natural owners.
4. Headed live-player profiles prove movement, clean view, readability, and one UX subject.
5. Success and loss profiles prove continuous gameplay outcomes.
6. Coverage and docs reconcile installed behavior, open contracts, and agent ownership.

## 14. Composition Order

The executable installation order is deterministic:

```text
core kits
  -> adapted local descriptor/behavior kits
    -> root plus 358 child natural owners
      -> five branch composition kits
        -> root composition kit
          -> host adapters
```

Dependency validation must reject a kit whose `requires` capability is missing. Idempotent install, reset, snapshot, and replay remain promotion requirements for stateful behavior.

## 15. Temporal Ensemble

```text
startup
  -> staged loading
    -> authored entrance
      -> first threshold
        -> endless delve
          -> building entry
            -> exploration and directional signs
              -> early repel and study
              OR full scare -> 3-second blackout -> last chance
                 -> repel, collect, score, offer, next building
                 OR miss, jumpscare, caught
                   -> solo restart
                   OR shared rejoin and recovered place
```

This is one expedition timeline shared by all domains. A branch owns its truth during the relevant beat, while the root coordinates service results. Hosts only display and transmit the ensemble.

## 16. Merge and Promotion Notes

- Promote one UX feature at a time and keep previously proven features in regression checks.
- The completed structural ceiling slice connects the irregular collapse to wall and shelter boundaries; the later fracture/rubble slice adds radial breakage, chipped edges, and settled fallen material; the ceiling-material slice now gives intact and collapsed pieces a shared damp-spalled masonry identity.
- The completed floor slice closes wet damaged concrete identity only: `Concrete / Slabs / Slab` state now drives worn joins, fine settlement branching, aggregate, repairs, relief, and wetness through existing material capabilities. Wall/prop/ceiling materials and true reflection remain open.
- Solo restart and Shared Expedition rejoin/recovery are proven. Rejoining owns the preserved place and recovery history; PeerJS/BroadcastChannel, React, and `GameCanvas` only carry, present, or answer that truth.
- The recovery composition is `core network + persistence + transaction ledger -> peer-session/share/reconcile snapshot -> rejoin-party + record-shared-session -> sustain-shared-expedition`; it reuses the existing root and adds no transport-shaped natural domain.
- Before any new kit, record the consuming flow and the core capability audit. If either is absent, do not add the kit.
- Promote through preview -> smoke -> headed feature proof -> canonical/wet/success/loss regression as relevant -> coverage/docs reconciliation.
- Fine ceiling fracture and small settled rubble are a completed bounded subject. Exact Ceiling/Openings, Decay/Cracking, Ground/Rubble, and Fallen Masonry state drives 8 radial paths, 10 edge fragments, and 3 route-clear rubble clusters through existing object/material/placement capabilities.
- Ceiling surface material identity is a completed bounded subject. Exact `Ceiling / surface` truth drives damp concrete, exposed brick/aggregate, mineral bloom, moss-darkened moisture, roughness, and relief through existing composition/material/presentation paths. No domain, core, alias kit, or production kit was added. Full-room wall/prop material, reflection, silhouette, and detail parity remain open.
- Industrial shelving silhouette identity is a completed bounded subject. The existing `industrial-shelving-object-kit` now composes a 41-part / 680-triangle two-bay rack with 19 stored-object parts through existing wound-mesh, object, furnishing, graphics, and presentation paths; the room places two. No domain, core, alias kit, or production kit was added. The natural `Shelves` owner remains unchanged, and descriptor proof does not close the separate `industrial-shelving-kit` behavior contract.
- Keep the 296 open behavior contracts visible. Installation, descriptor output, or a passing screenshot does not silently close natural behavior.
- The next selected UX feature is industrial shelving corrosion and wear identity. Reuse the retained silhouette, existing object-material/preset capabilities, graphics/presentation substrate, and Three.js adapter; do not add a material taxonomy, alias core, or new kit unless the consuming player view demonstrates a missing reusable contract.
