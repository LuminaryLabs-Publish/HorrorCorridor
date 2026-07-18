# HorrorCorridor Natural Domain Composition

Status: canonical

## Public NexusEngine Ideal Sources

- https://github.com/LuminaryLabs-Dev/NexusEngine/blob/main/docs/ideal/domains.md
- https://github.com/LuminaryLabs-Dev/NexusEngine/blob/main/docs/ideal/kits.md
- https://github.com/LuminaryLabs-Dev/NexusEngine/blob/main/docs/ideal/services.md
- https://github.com/LuminaryLabs-Dev/NexusEngine/blob/main/docs/ideal/composition.md

Audited public head: `d41992636de2752f1ad9047b80701e6313f19b87` on 2026-07-17. HorrorCorridor pins that exact archive. The head differs from the preceding same-day audit only by correcting the foliage placement-recipe factory binding, which matters because this game installs the vegetation core.

## Naming Covenant

- A domain is a soft-bounded natural thing or lived system with its own state, meaning, reset, snapshot, inputs, outputs, and place in the composition.
- A plural domain owns a meaningful collection; its singular child owns one member only when that member needs independent truth.
- Domain names use recognizable subjects such as `Grove`, `Tree`, `Threshold`, `Relic`, `Lostness`, and `Shared World`.
- Domain names do not use implementation-shaped terms such as manager, registry, controller, adapter, renderer, pipeline, module, or proof.
- A kit name says what reusable behavior it installs. New local names prefer short verbs such as `grow-root-kit`, `age-stain-kit`, and `place-offering-kit`.
- Existing public NexusEngine kits keep their exact exported ids when reused.
- Services expose controlled verbs over domain state. Hosts own platform adaptation. Proofs validate the composition.
- Depth is earned by natural containment. A branch stops as soon as no independently meaningful child boundary remains.

## Mapping Method

Map top-down by repeatedly asking, “what natural subjects must exist inside this subject for it to be true?” Do not ask for technical subsystems or exhaustive sibling categories. A visual branch can legitimately be ten or more layers deep when every layer owns a narrower lived thing, as in `Overgrowth -> Grove -> Trees -> Tree -> Crown -> Boughs -> Bough -> Branches -> Branch -> Twigs -> Twig -> Buds -> Bud -> Leaf Cluster -> Leaves -> Leaf`.

At each boundary:

1. Keep it as a domain only if it owns coherent truth, lifecycle, reset, snapshot, and meaning.
2. Put reusable action in an atomic kit. One kit should perform one idempotent behavior against explicit domain inputs and outputs.
3. Require existing NexusEngine capabilities instead of recreating clocks, registries, transforms, objects, graphics, audio, simulation, persistence, or transport.
4. Expose controlled cross-domain verbs through services.
5. Leave platform realization in a host.
6. Stop when the next child would only name an implementation detail, value field, algorithm step, or arbitrary category.

The root and each top-level domain have one executable composition kit. Each branch kit requires its complete natural child-domain path set, records its target behavior-kit contracts, and provides one stable composition capability upward. It composes only behavior kits with live implementations, keeps contract-only work explicit, and does not become a manager. Atomic local kits may require several core capabilities, but they own only the HorrorCorridor rule joining those capabilities. For example, `repel-monster-with-beam-kit` requires spatial, graphics, interaction, and simulation capabilities, while only owning the rule that sustained beam contact repels a HorrorCorridor monster.

Do not create a new kit for an alias of a core capability, a one-off constant, a category folder, a React component, a Three.js draw call, or a behavior already owned by another local kit.

## Current Core-Kit Selection

The executable root installs 36 current NexusEngine cores:

| Concern | Installed core kits | HorrorCorridor use |
| --- | --- | --- |
| Boot and composition | `core-startup-domain`, `n-core-platform-kit`, `n-core-composition-kit` | Reach playable readiness and mount the five top-level compositions |
| Durable truth | `n-core-data-kit`, `n-core-transaction-ledger-kit`, `n-core-persistence-kit` | State, deterministic data, scare/collection history, restoration |
| World and place | `n-core-world-kit`, `n-core-scene-kit`, `n-core-spatial-kit`, `n-core-skybox-kit` | Corridor partitions, room lifecycle, bearings, zones, atmosphere descriptors |
| Objects and growth | `n-core-object-kit`, `core-object-shape-domain`, `core-object-fidelity-domain`, `n-core-vegetation-kit` | Ruin props, wound meshes, fidelity profiles, overgrowth species/instances |
| Embodied play | `n-core-input-kit`, `n-core-creature-kit`, `n-core-character-kit`, `n-core-player-kit`, `n-core-motion-kit`, `n-core-physics-kit` | Explorer possession, monsters, movement, collision intent |
| Runtime rules | `n-core-simulation-kit`, `n-core-interaction-kit`, `n-core-animation-kit` | Encounter pressure, response windows, beam contact, blackout/jumpscare intent |
| Presentation | `n-core-assets-kit`, `n-core-graphics-kit`, `n-core-camera-kit`, `core-camera-framing-kit`, `core-presentation-domain`, `core-presentation-output-kit`, `n-core-ui-kit`, `core-ui-scale-kit` | Renderer-neutral scene, camera, output, and overlay descriptors |
| Sound and sharing | `n-core-audio-kit`, `n-core-network-kit` | Directional monster signs and authoritative multiplayer snapshots |
| Proof | `n-core-diagnostics-kit`, `n-core-debug-kit`, `core-capture-domain` | State evidence, debug geometry/data, and browser captures |

Current cores deliberately not installed are `n-core-agent-kit`, `core-compute-domain`, `n-core-headless-editor-kit`, `n-core-mlnn-kit`, `n-core-policy-kit`, `n-core-graphics-reflection-kit`, `core-speech-domain`, and `n-core-utility-kit`. They do not own a current player-facing requirement. Reflection is a future candidate only when the render host consumes its contract for wet surfaces; mounting it unused would be false reuse.

## Natural Domain Tree

```text
game-slice: Horror Corridor Expedition
+-- kit: horror-corridor-game-kit
+-- domain: Expedition
|   +-- state: current phase
|   +-- state: elapsed journey
|   +-- state: completion status
|   +-- state: encounters survived
|   +-- kit: n-core-composition-kit
|   +-- kit: n-core-data-kit
|   +-- kit: n-core-persistence-kit
|   +-- kit: n-core-simulation-kit
|   +-- kit: horror-expedition-kit
|   +-- kit: run-expedition-kit
|   +-- kit: continue-expedition-kit
|   +-- service: expedition-service
|   +-- domain: Departure
|   |   +-- state: chosen entrance
|   |   +-- state: gathered party
|   |   +-- state: chosen world seed
|   |   +-- state: departure time
|   |   +-- kit: begin-expedition-kit
|   |   `-- service: begin-expedition
|   +-- domain: Delve
|   |   +-- state: current depth
|   |   +-- state: farthest depth
|   |   +-- state: current destination
|   |   +-- state: current building
|   |   +-- state: buildings crossed
|   |   +-- kit: advance-delve-kit
|   |   +-- kit: open-endless-delve-kit
|   |   +-- service: read-delve
|   |   +-- domain: Wayfinding
|   |   |   +-- state: current heading
|   |   |   +-- state: route confidence
|   |   |   +-- state: return confidence
|   |   |   +-- kit: landmark-guidance-kit
|   |   |   +-- kit: choose-way-kit
|   |   |   +-- service: query-known-way
|   |   |   +-- domain: Known Places
|   |   |   |   +-- state: remembered places
|   |   |   |   +-- state: last-seen times
|   |   |   |   +-- state: place confidence
|   |   |   |   `-- kit: remember-place-kit
|   |   |   +-- domain: Known Ways
|   |   |   |   +-- state: remembered paths
|   |   |   |   +-- state: remembered blocks
|   |   |   |   +-- state: path confidence
|   |   |   |   `-- kit: remember-way-kit
|   |   |   `-- domain: Return Way
|   |   |       +-- state: origin
|   |   |       +-- state: current return path
|   |   |       +-- state: broken links
|   |   |       +-- state: uncertainty
|   |   |       `-- kit: trace-return-way-kit
|   |   +-- domain: Discovery
|   |   |   +-- state: newly found places
|   |   |   +-- state: newly found landmarks
|   |   |   +-- state: newly found relics
|   |   |   +-- kit: reveal-discovery-kit
|   |   |   +-- domain: Sightings
|   |   |   |   +-- state: sighted subjects
|   |   |   |   +-- state: sighting positions
|   |   |   |   +-- state: sighting times
|   |   |   |   `-- kit: record-sighting-kit
|   |   |   `-- domain: Understanding
|   |   |       +-- state: identified subjects
|   |   |       +-- state: unresolved subjects
|   |   |       +-- state: learned relationships
|   |   |       `-- kit: connect-discoveries-kit
|   |   `-- domain: Journey Traces
|   |       +-- state: personal trail
|   |       +-- state: shared trail
|   |       +-- state: trail ages
|   |       +-- kit: remember-trail-kit
|   |       +-- domain: Personal Trail
|   |       |   +-- state: owned marks
|   |       |   +-- state: continuity
|   |       |   +-- state: confidence
|   |       |   `-- kit: follow-personal-trail-kit
|   |       `-- domain: Shared Trail
|   |           +-- state: contributed marks
|   |           +-- state: shared continuity
|   |           +-- state: conflicting marks
|   |           `-- kit: reconcile-shared-trail-kit
|   +-- domain: Fate
|   |   +-- state: current resolution
|   |   +-- state: failure cause
|   |   +-- state: return status
|   |   +-- kit: resolve-expedition-kit
|   |   `-- service: resolve-expedition
|   `-- domain: Chronicle
|       +-- state: journey record
|       +-- state: party record
|       +-- state: relic record
|       +-- state: dread record
|       +-- state: outcome record
|       +-- kit: n-core-transaction-ledger-kit
|       +-- kit: record-expedition-kit
|       +-- service: read-expedition-record
|       `-- domain: Monster Index
|           +-- state: known monsters
|           +-- state: learned scares
|           +-- state: collected monsters
|           +-- kit: remember-monster-scare-kit
|           +-- service: read-monster-index
|           `-- domain: Monster Record
|               +-- state: monster identity
|               +-- state: encounter history
|               +-- state: scare understanding
|               +-- state: collection mark
|               +-- kit: keep-monster-record-kit
|               +-- domain: Sighting
|               |   +-- state: first sighting
|               |   +-- state: recent sighting
|               |   `-- kit: remember-monster-sighting-kit
|               +-- domain: Scare Lesson
|               |   +-- state: witnessed scare
|               |   +-- state: learned response
|               |   `-- kit: learn-from-monster-scare-kit
|               `-- domain: Collection Mark
|                   +-- state: earned at encounter
|                   +-- state: survived response
|                   `-- kit: mark-collected-monster-kit
+-- domain: Corridor
|   +-- state: world identity
|   +-- state: world seed
|   +-- state: active region
|   +-- kit: n-core-spatial-kit
|   +-- kit: n-core-scene-kit
|   +-- kit: n-core-physics-kit
|   +-- kit: n-core-object-kit
|   +-- kit: core-world-domain
|   +-- kit: horror-corridor-world-kit
|   +-- kit: shape-seeded-corridor-kit
|   +-- service: world-service
|   +-- domain: Maze
|   |   +-- state: topology
|   |   +-- state: entrance
|   |   +-- state: destination
|   |   +-- kit: route-field-kit
|   |   +-- kit: carve-corridor-maze-kit
|   |   +-- service: query-maze
|   |   +-- domain: Ways
|   |   |   +-- state: connected ways
|   |   |   +-- state: branching ways
|   |   |   +-- state: closed ways
|   |   |   +-- kit: weave-ways-kit
|   |   |   +-- service: query-way
|   |   |   +-- domain: Main Way
|   |   |   |   +-- state: route
|   |   |   |   +-- state: continuity
|   |   |   |   +-- state: destination reach
|   |   |   |   `-- kit: establish-main-way-kit
|   |   |   +-- domain: Side Ways
|   |   |   |   +-- state: branches
|   |   |   |   +-- state: branch depths
|   |   |   |   +-- state: reconnections
|   |   |   |   `-- kit: branch-side-ways-kit
|   |   |   +-- domain: Return Ways
|   |   |   |   +-- state: return routes
|   |   |   |   +-- state: return costs
|   |   |   |   +-- state: return continuity
|   |   |   |   `-- kit: preserve-return-way-kit
|   |   |   `-- domain: Closed Ways
|   |   |       +-- state: blocked routes
|   |   |       +-- state: block causes
|   |   |       +-- state: alternate routes
|   |   |       `-- kit: close-way-kit
|   |   +-- domain: Places
|   |   |   +-- state: known place identities
|   |   |   +-- state: place relationships
|   |   |   +-- kit: recognize-place-kit
|   |   |   +-- service: inspect-place
|   |   |   +-- domain: Entrance
|   |   |   |   +-- state: threshold
|   |   |   |   +-- state: arrival area
|   |   |   |   +-- state: return landmark
|   |   |   |   `-- kit: establish-entrance-kit
|   |   |   +-- domain: Passages
|   |   |   |   +-- state: passage membership
|   |   |   |   +-- state: passage continuity
|   |   |   |   +-- kit: lay-passage-kit
|   |   |   |   `-- domain: Passage
|   |   |   |       +-- state: span
|   |   |   |       +-- state: width
|   |   |   |       +-- state: height
|   |   |   |       +-- state: condition
|   |   |   |       `-- kit: shape-passage-kit
|   |   |   +-- domain: Junctions
|   |   |   |   +-- state: junction membership
|   |   |   |   +-- state: connected directions
|   |   |   |   +-- kit: join-passages-kit
|   |   |   |   `-- domain: Junction
|   |   |   |       +-- state: approaches
|   |   |   |       +-- state: exits
|   |   |   |       +-- state: visibility
|   |   |   |       `-- kit: resolve-junction-kit
|   |   |   +-- domain: Dead Ends
|   |   |   |   +-- state: dead-end membership
|   |   |   |   +-- state: terminal depth
|   |   |   |   +-- kit: finish-dead-end-kit
|   |   |   |   `-- domain: Dead End
|   |   |   |       +-- state: approach
|   |   |   |       +-- state: terminal wall
|   |   |   |       +-- state: concealed contents
|   |   |   |       `-- kit: dress-dead-end-kit
|   |   |   +-- domain: Thresholds
|   |   |   |   +-- state: threshold membership
|   |   |   |   +-- state: crossings
|   |   |   |   +-- kit: place-threshold-kit
|   |   |   |   `-- domain: Threshold
|   |   |   |       +-- state: near side
|   |   |   |       +-- state: far side
|   |   |   |       +-- state: passage status
|   |   |   |       +-- state: condition
|   |   |   |       `-- kit: resolve-threshold-kit
|   |   |   +-- domain: Buildings
|   |   |   |   +-- state: building membership
|   |   |   |   +-- state: building succession
|   |   |   |   +-- kit: open-building-kit
|   |   |   |   `-- domain: Building
|   |   |   |       +-- state: identity
|   |   |   |       +-- state: bounds
|   |   |   |       +-- state: entrances
|   |   |   |       +-- state: condition
|   |   |   |       +-- kit: shape-building-kit
|   |   |   |       `-- domain: Chambers
|   |   |   |           +-- state: chamber membership
|   |   |   |           +-- state: chamber roles
|   |   |   |           +-- kit: open-chamber-kit
|   |   |   |           `-- domain: Chamber
|   |   |   |               +-- state: bounds
|   |   |   |               +-- state: entrances
|   |   |   |               +-- state: contents
|   |   |   |               +-- state: atmosphere
|   |   |   |               +-- kit: furnish-chamber-kit
|   |   |   |               `-- domain: Offering
|   |   |   |                   +-- state: boon
|   |   |   |                   +-- state: claim status
|   |   |   |                   +-- state: consequence
|   |   |   |                   +-- kit: offer-room-boon-kit
|   |   |   |                   `-- service: claim-room-offer
|   |   |   `-- domain: Heart
|   |   |       +-- state: destination place
|   |   |       +-- state: arrival status
|   |   |       +-- state: return access
|   |   |       `-- kit: reveal-corridor-heart-kit
|   |   `-- domain: Regions
|   |       +-- state: region membership
|   |       +-- state: region adjacency
|   |       +-- kit: divide-corridor-regions-kit
|   |       +-- domain: Verge
|   |       |   +-- state: entrance reach
|   |       |   +-- state: safety residue
|   |       |   +-- state: route familiarity
|   |       |   `-- kit: shape-verge-kit
|   |       +-- domain: Depths
|   |       |   +-- state: depth bands
|   |       |   +-- state: route density
|   |       |   +-- state: dread pressure
|   |       |   `-- kit: deepen-corridor-kit
|   |       `-- domain: Inner Reach
|   |           +-- state: destination proximity
|   |           +-- state: restricted paths
|   |           +-- state: anomaly influence
|   |           `-- kit: shape-inner-reach-kit
|   +-- domain: Ground
|   |   +-- state: walkable surface
|   |   +-- state: wetness
|   |   +-- state: damage
|   |   +-- state: growth cover
|   |   +-- kit: terrain
|   |   +-- kit: surface-placement-kit
|   |   +-- kit: ground-contact-kit
|   |   +-- service: inspect-ground
|   |   +-- domain: Surface
|   |   |   +-- state: surface materials
|   |   |   +-- state: surface continuity
|   |   |   +-- state: surface grip
|   |   |   +-- kit: compose-ground-surface-kit
|   |   |   +-- domain: Paving
|   |   |   |   +-- state: paved areas
|   |   |   |   +-- state: missing areas
|   |   |   |   +-- state: settled areas
|   |   |   |   +-- kit: lay-broken-paving-kit
|   |   |   |   +-- domain: Concrete
|   |   |   |   |   +-- state: concrete areas
|   |   |   |   |   +-- state: aggregate exposure
|   |   |   |   |   +-- state: moisture
|   |   |   |   |   +-- kit: weather-concrete-kit
|   |   |   |   |   `-- domain: Slabs
|   |   |   |   |       +-- state: slab membership
|   |   |   |   |       +-- state: slab alignment
|   |   |   |   |       +-- kit: settle-slabs-kit
|   |   |   |   |       `-- domain: Slab
|   |   |   |   |           +-- state: body
|   |   |   |   |           +-- state: cracks
|   |   |   |   |           +-- state: displacement
|   |   |   |   |           +-- state: wetness
|   |   |   |   |           `-- kit: crack-slab-kit
|   |   |   |   `-- domain: Brickwork
|   |   |   |       +-- state: laid courses
|   |   |   |       +-- state: missing courses
|   |   |   |       +-- state: mortar condition
|   |   |   |       +-- kit: weather-brickwork-kit
|   |   |   |       `-- domain: Bricks
|   |   |   |           +-- state: brick membership
|   |   |   |           +-- state: course alignment
|   |   |   |           +-- kit: lay-bricks-kit
|   |   |   |           `-- domain: Brick
|   |   |   |               +-- state: body
|   |   |   |               +-- state: chips
|   |   |   |               +-- state: saturation
|   |   |   |               `-- kit: age-brick-kit
|   |   |   +-- domain: Earth
|   |   |   |   +-- state: exposed areas
|   |   |   |   +-- state: compaction
|   |   |   |   +-- state: moisture
|   |   |   |   `-- kit: expose-earth-kit
|   |   |   `-- domain: Mud
|   |   |       +-- state: muddy areas
|   |   |       +-- state: depth
|   |   |       +-- state: softness
|   |   |       +-- state: tracks
|   |   |       `-- kit: form-mud-kit
|   |   +-- domain: Rubble
|   |   |   +-- state: rubble areas
|   |   |   +-- state: pile heights
|   |   |   +-- state: passability
|   |   |   +-- kit: scatter-rubble-kit
|   |   |   +-- service: inspect-rubble
|   |   |   +-- domain: Fallen Masonry
|   |   |   |   +-- state: fallen masonry
|   |   |   |   +-- state: source structures
|   |   |   |   +-- state: settlement
|   |   |   |   +-- kit: collapse-masonry-kit
|   |   |   |   +-- domain: Fallen Bricks
|   |   |   |   |   +-- state: brick pieces
|   |   |   |   |   +-- state: distribution
|   |   |   |   |   `-- kit: scatter-bricks-kit
|   |   |   |   +-- domain: Fallen Stone
|   |   |   |   |   +-- state: stone pieces
|   |   |   |   |   +-- state: distribution
|   |   |   |   |   `-- kit: cluster-stone-kit
|   |   |   |   `-- domain: Broken Concrete
|   |   |   |       +-- state: concrete pieces
|   |   |   |       +-- state: exposed reinforcement
|   |   |   |       `-- kit: break-concrete-kit
|   |   |   +-- domain: Scrap
|   |   |   |   +-- state: metal pieces
|   |   |   |   +-- state: sharpness
|   |   |   |   +-- state: corrosion
|   |   |   |   `-- kit: scatter-scrap-kit
|   |   |   `-- domain: Loose Slabs
|   |   |       +-- state: slab pieces
|   |   |       +-- state: tilt
|   |   |       +-- state: stability
|   |   |       `-- kit: displace-slab-kit
|   |   `-- domain: Water
|   |       +-- state: water bodies
|   |       +-- state: total coverage
|   |       +-- state: drainage trend
|   |       +-- kit: water-surface-kit
|   |       +-- service: inspect-water
|   |       +-- domain: Puddles
|   |       |   +-- state: puddle membership
|   |       |   +-- state: pooled volume
|   |       |   +-- kit: gather-puddles-kit
|   |       |   `-- domain: Puddle
|   |       |       +-- state: footprint
|   |       |       +-- state: depth
|   |       |       +-- state: surface motion
|   |       |       +-- state: reflections
|   |       |       `-- kit: ripple-puddle-kit
|   |       +-- domain: Pools
|   |       |   +-- state: pool membership
|   |       |   +-- state: connected volume
|   |       |   +-- kit: gather-pools-kit
|   |       |   `-- domain: Pool
|   |       |       +-- state: bounds
|   |       |       +-- state: depth
|   |       |       +-- state: contamination
|   |       |       `-- kit: settle-pool-kit
|   |       `-- domain: Floodwater
|   |           +-- state: occupied places
|   |           +-- state: depth
|   |           +-- state: flow
|   |           +-- state: traversability
|   |           `-- kit: raise-floodwater-kit
|   +-- domain: Ruin
|   |   +-- state: structural age
|   |   +-- state: occupied places
|   |   +-- state: overall stability
|   |   +-- kit: age-ruin-kit
|   |   +-- service: inspect-ruin
|   |   +-- domain: Structure
|   |   |   +-- state: structural bodies
|   |   |   +-- state: load paths
|   |   |   +-- state: failed spans
|   |   |   +-- kit: assemble-ruin-structure-kit
|   |   |   +-- domain: Foundations
|   |   |   |   +-- state: foundation lines
|   |   |   |   +-- state: settlement
|   |   |   |   +-- state: exposure
|   |   |   |   `-- kit: settle-foundation-kit
|   |   |   +-- domain: Floors
|   |   |   |   +-- state: floor spans
|   |   |   |   +-- state: openings
|   |   |   |   +-- state: load condition
|   |   |   |   `-- kit: break-floor-kit
|   |   |   +-- domain: Walls
|   |   |   |   +-- state: wall membership
|   |   |   |   +-- state: wall continuity
|   |   |   |   +-- kit: raise-wall-kit
|   |   |   |   `-- domain: Wall
|   |   |   |       +-- state: span
|   |   |   |       +-- state: height
|   |   |   |       +-- state: stability
|   |   |   |       +-- kit: weather-wall-kit
|   |   |   |       +-- domain: Wall Face
|   |   |   |       |   +-- state: exposed material
|   |   |   |       |   +-- state: grime
|   |   |   |       |   +-- state: growth cover
|   |   |   |       |   `-- kit: stain-wall-face-kit
|   |   |   |       +-- domain: Wall Core
|   |   |   |       |   +-- state: masonry body
|   |   |   |       |   +-- state: voids
|   |   |   |       |   +-- state: reinforcement
|   |   |   |       |   `-- kit: fracture-wall-core-kit
|   |   |   |       `-- domain: Wall Wounds
|   |   |   |           +-- state: cracks
|   |   |   |           +-- state: holes
|   |   |   |           +-- state: spalls
|   |   |   |           `-- kit: widen-wall-wound-kit
|   |   |   +-- domain: Ceilings
|   |   |   |   +-- state: ceiling membership
|   |   |   |   +-- state: ceiling continuity
|   |   |   |   +-- kit: span-ceiling-kit
|   |   |   |   `-- domain: Ceiling
|   |   |   |       +-- state: span
|   |   |   |       +-- state: height
|   |   |   |       +-- state: stability
|   |   |   |       +-- state: surface
|   |   |   |       +-- kit: break-ceiling-kit
|   |   |   |       +-- domain: Openings
|   |   |   |       |   +-- state: opening bounds
|   |   |   |       |   +-- state: sky exposure
|   |   |   |       |   +-- state: falling debris
|   |   |   |       |   `-- kit: open-ceiling-kit
|   |   |   |       `-- domain: Supports
|   |   |   |           +-- state: beams
|   |   |   |           +-- state: service ribs
|   |   |   |           +-- state: remaining strength
|   |   |   |           `-- kit: expose-support-kit
|   |   |   `-- domain: Facades
|   |   |       +-- state: facade membership
|   |   |       +-- state: openings
|   |   |       +-- state: remaining identity
|   |   |       `-- kit: erode-facade-kit
|   |   +-- domain: Decay
|   |   |   +-- state: decay age
|   |   |   +-- state: active causes
|   |   |   +-- state: spread
|   |   |   +-- kit: combine-decay-kit
|   |   |   +-- domain: Damp
|   |   |   |   +-- state: wet surfaces
|   |   |   |   +-- state: saturation
|   |   |   |   +-- state: drying rate
|   |   |   |   `-- kit: spread-damp-kit
|   |   |   +-- domain: Cracking
|   |   |   |   +-- state: crack paths
|   |   |   |   +-- state: crack widths
|   |   |   |   +-- state: active movement
|   |   |   |   `-- kit: propagate-crack-kit
|   |   |   +-- domain: Spalling
|   |   |   |   +-- state: loosened faces
|   |   |   |   +-- state: fallen faces
|   |   |   |   +-- state: exposed cores
|   |   |   |   `-- kit: shed-surface-kit
|   |   |   `-- domain: Corrosion
|   |   |       +-- state: corroded metal
|   |   |       +-- state: corrosion depth
|   |   |       +-- state: lost strength
|   |   |       `-- kit: corrode-metal-kit
|   |   +-- domain: Utilities
|   |   |   +-- state: surviving utilities
|   |   |   +-- state: failed utilities
|   |   |   +-- state: cross-connections
|   |   |   +-- kit: age-utilities-kit
|   |   |   +-- service: inspect-utility
|   |   |   +-- domain: Electricity
|   |   |   |   +-- state: powered places
|   |   |   |   +-- state: failed places
|   |   |   |   +-- state: live circuits
|   |   |   |   +-- kit: carry-electricity-kit
|   |   |   |   +-- service: switch-power
|   |   |   |   +-- domain: Supply
|   |   |   |   |   +-- state: available sources
|   |   |   |   |   +-- state: active source
|   |   |   |   |   +-- state: reserve
|   |   |   |   |   +-- kit: select-power-source-kit
|   |   |   |   |   `-- domain: Generator
|   |   |   |   |       +-- state: body
|   |   |   |   |       +-- state: fuel
|   |   |   |   |       +-- state: output
|   |   |   |   |       +-- state: condition
|   |   |   |   |       `-- kit: broken-generator-kit
|   |   |   |   +-- domain: Circuits
|   |   |   |   |   +-- state: circuit membership
|   |   |   |   |   +-- state: circuit continuity
|   |   |   |   |   +-- kit: connect-circuit-kit
|   |   |   |   |   `-- domain: Circuit
|   |   |   |   |       +-- state: source
|   |   |   |   |       +-- state: loads
|   |   |   |   |       +-- state: faults
|   |   |   |   |       `-- kit: trip-circuit-kit
|   |   |   |   +-- domain: Wiring
|   |   |   |   |   +-- state: connected runs
|   |   |   |   |   +-- state: broken runs
|   |   |   |   |   +-- kit: route-wiring-kit
|   |   |   |   |   `-- domain: Cable
|   |   |   |   |       +-- state: path
|   |   |   |   |       +-- state: slack
|   |   |   |   |       +-- state: insulation
|   |   |   |   |       `-- kit: hang-cable-kit
|   |   |   |   `-- domain: Lamps
|   |   |   |       +-- state: lamp membership
|   |   |   |       +-- state: lit lamps
|   |   |   |       +-- state: failed lamps
|   |   |   |       +-- kit: place-practical-lamps-kit
|   |   |   |       `-- domain: Lamp
|   |   |   |           +-- state: body
|   |   |   |           +-- state: power
|   |   |   |           +-- state: warmth
|   |   |   |           +-- state: flicker
|   |   |   |           `-- kit: corridor-lamp-kit
|   |   |   +-- domain: Drainage
|   |   |   |   +-- state: drainage reach
|   |   |   |   +-- state: flow direction
|   |   |   |   +-- state: blocked reach
|   |   |   |   +-- kit: drain-water-kit
|   |   |   |   +-- service: query-drainage
|   |   |   |   +-- domain: Channels
|   |   |   |   |   +-- state: channel membership
|   |   |   |   |   +-- state: connected flow
|   |   |   |   |   +-- kit: carve-channel-kit
|   |   |   |   |   `-- domain: Channel
|   |   |   |   |       +-- state: path
|   |   |   |   |       +-- state: slope
|   |   |   |   |       +-- state: flow
|   |   |   |   |       `-- kit: carry-runoff-kit
|   |   |   |   +-- domain: Drains
|   |   |   |   |   +-- state: drain membership
|   |   |   |   |   +-- state: intake capacity
|   |   |   |   |   +-- kit: place-drain-kit
|   |   |   |   |   `-- domain: Drain
|   |   |   |   |       +-- state: mouth
|   |   |   |   |       +-- state: throat
|   |   |   |   |       +-- state: blockage
|   |   |   |   |       `-- kit: swallow-runoff-kit
|   |   |   |   +-- domain: Culverts
|   |   |   |   |   +-- state: culvert membership
|   |   |   |   |   +-- state: linked reaches
|   |   |   |   |   +-- kit: place-culvert-kit
|   |   |   |   |   `-- domain: Culvert
|   |   |   |   |       +-- state: span
|   |   |   |   |       +-- state: water level
|   |   |   |   |       +-- state: passability
|   |   |   |   |       `-- kit: fill-culvert-kit
|   |   |   |   `-- domain: Blockages
|   |   |   |       +-- state: blockage membership
|   |   |   |       +-- state: retained debris
|   |   |   |       +-- state: backed-up water
|   |   |   |       `-- kit: clog-drainage-kit
|   |   |   `-- domain: Ventilation
|   |   |       +-- state: air routes
|   |   |       +-- state: open routes
|   |   |       +-- state: stalled routes
|   |   |       +-- kit: move-corridor-air-kit
|   |   |       +-- service: query-air-route
|   |   |       +-- domain: Ducts
|   |   |       |   +-- state: duct membership
|   |   |       |   +-- state: duct continuity
|   |   |       |   +-- kit: route-ducts-kit
|   |   |       |   `-- domain: Duct
|   |   |       |       +-- state: span
|   |   |       |       +-- state: section
|   |   |       |       +-- state: obstruction
|   |   |       |       `-- kit: carry-air-kit
|   |   |       +-- domain: Vents
|   |   |       |   +-- state: vent membership
|   |   |       |   +-- state: open vents
|   |   |       |   +-- kit: place-vent-kit
|   |   |       |   `-- domain: Vent
|   |   |       |       +-- state: mouth
|   |   |       |       +-- state: airflow
|   |   |       |       +-- state: noise
|   |   |       |       `-- kit: breathe-vent-kit
|   |   |       `-- domain: Drafts
|   |   |           +-- state: draft paths
|   |   |           +-- state: direction
|   |   |           +-- state: strength
|   |   |           `-- kit: drift-draft-kit
|   |   +-- domain: Access
|   |   |   +-- state: open routes
|   |   |   +-- state: closed routes
|   |   |   +-- state: obstructed routes
|   |   |   +-- kit: resolve-access-kit
|   |   |   +-- service: resolve-access
|   |   |   +-- domain: Doors
|   |   |   |   +-- state: door membership
|   |   |   |   +-- state: open doors
|   |   |   |   +-- state: sealed doors
|   |   |   |   +-- kit: hang-doors-kit
|   |   |   |   `-- domain: Door
|   |   |   |       +-- state: threshold
|   |   |   |       +-- state: swing
|   |   |   |       +-- state: latch
|   |   |   |       +-- state: corrosion
|   |   |   |       `-- kit: rusted-door-kit
|   |   |   +-- domain: Fences
|   |   |   |   +-- state: fence membership
|   |   |   |   +-- state: fenced reaches
|   |   |   |   +-- kit: stretch-fence-kit
|   |   |   |   `-- domain: Fence
|   |   |   |       +-- state: span
|   |   |   |       +-- state: openings
|   |   |   |       +-- state: deformation
|   |   |   |       `-- kit: chain-link-fence-kit
|   |   |   `-- domain: Barricades
|   |   |       +-- state: barricade membership
|   |   |       +-- state: blocked thresholds
|   |   |       +-- state: stability
|   |   |       `-- kit: build-barricade-kit
|   |   `-- domain: Remnants
|   |       +-- state: remaining contents
|   |       +-- state: abandoned purpose
|   |       +-- state: disturbance
|   |       +-- kit: place-ruin-remnants-kit
|   |       +-- domain: Storage
|   |       |   +-- state: stored remains
|   |       |   +-- state: accessible remains
|   |       |   +-- kit: arrange-storage-kit
|   |       |   +-- domain: Shelves
|   |       |   |   +-- state: shelf membership
|   |       |   |   +-- state: occupied tiers
|   |       |   |   `-- kit: industrial-shelving-kit
|   |       |   +-- domain: Crates
|   |       |   |   +-- state: crate membership
|   |       |   |   +-- state: stacked crates
|   |       |   |   `-- kit: storage-crate-kit
|   |       |   `-- domain: Barrels
|   |       |       +-- state: barrel membership
|   |       |       +-- state: barrel clusters
|   |       |       `-- kit: cluster-barrels-kit
|   |       +-- domain: Workplaces
|   |       |   +-- state: work areas
|   |       |   +-- state: remaining equipment
|   |       |   +-- kit: arrange-workplace-kit
|   |       |   +-- domain: Tables
|   |       |   |   +-- state: table membership
|   |       |   |   +-- state: usable surfaces
|   |       |   |   `-- kit: corroded-table-kit
|   |       |   `-- domain: Service Equipment
|   |       |       +-- state: equipment membership
|   |       |       +-- state: remaining function
|   |       |       `-- kit: abandon-equipment-kit
|   |       `-- domain: Hanging Remains
|   |           +-- state: hanging objects
|   |           +-- state: anchor points
|   |           +-- state: sway
|   |           +-- kit: hang-remains-kit
|   |           +-- domain: Chains
|   |           |   +-- state: chain membership
|   |           |   +-- state: links
|   |           |   +-- state: tension
|   |           |   `-- kit: hanging-chain-kit
|   |           +-- domain: Hooks
|   |           |   +-- state: hook membership
|   |           |   +-- state: points
|   |           |   +-- state: load
|   |           |   `-- kit: hanging-hook-kit
|   |           `-- domain: Cloth
|   |               +-- state: cloth pieces
|   |               +-- state: tears
|   |               +-- state: wetness
|   |               `-- kit: torn-cloth-kit
|   +-- domain: Overgrowth
|   |   +-- state: ecological age
|   |   +-- state: moisture availability
|   |   +-- state: light exposure
|   |   +-- state: disturbance
|   |   +-- state: claimed surfaces
|   |   +-- state: total cover
|   |   +-- kit: n-core-vegetation-kit
|   |   +-- kit: forest-placement-kit
|   |   +-- kit: reclaim-surface-kit
|   |   +-- service: inspect-overgrowth
|   |   +-- domain: Habitat
|   |   |   +-- state: habitable surfaces
|   |   |   +-- state: carrying capacity
|   |   |   +-- state: active pressures
|   |   |   +-- kit: balance-habitat-kit
|   |   |   +-- domain: Moisture
|   |   |   |   +-- state: available water
|   |   |   |   +-- state: retention
|   |   |   |   +-- state: drying
|   |   |   |   `-- kit: feed-moisture-kit
|   |   |   +-- domain: Shade
|   |   |   |   +-- state: shaded places
|   |   |   |   +-- state: shade depth
|   |   |   |   +-- state: shade duration
|   |   |   |   `-- kit: cast-habitat-shade-kit
|   |   |   `-- domain: Disturbance
|   |   |       +-- state: disturbed places
|   |   |       +-- state: disturbance age
|   |   |       +-- state: recovery
|   |   |       `-- kit: recover-habitat-kit
|   |   +-- domain: Ground Growth
|   |   |   +-- state: covered ground
|   |   |   +-- state: cover density
|   |   |   +-- state: cover health
|   |   |   +-- kit: spread-ground-growth-kit
|   |   |   +-- domain: Grass
|   |   |   |   +-- state: grass reach
|   |   |   |   +-- state: grass health
|   |   |   |   +-- state: seed reserve
|   |   |   |   +-- kit: spread-grass-kit
|   |   |   |   +-- domain: Tufts
|   |   |   |   |   +-- state: tuft membership
|   |   |   |   |   +-- state: tuft spacing
|   |   |   |   |   +-- kit: gather-grass-tufts-kit
|   |   |   |   |   `-- domain: Tuft
|   |   |   |   |       +-- state: blade membership
|   |   |   |   |       +-- state: age
|   |   |   |   |       +-- state: health
|   |   |   |   |       +-- state: disturbance
|   |   |   |   |       +-- kit: grow-grass-tuft-kit
|   |   |   |   |       `-- domain: Blades
|   |   |   |   |           +-- state: blade membership
|   |   |   |   |           +-- state: blade spread
|   |   |   |   |           +-- kit: arrange-grass-blades-kit
|   |   |   |   |           `-- domain: Blade
|   |   |   |   |               +-- state: length
|   |   |   |   |               +-- state: bend
|   |   |   |   |               +-- state: moisture
|   |   |   |   |               +-- state: damage
|   |   |   |   |               `-- kit: grow-grass-blade-kit
|   |   |   |   `-- domain: Seed Heads
|   |   |   |       +-- state: seed-head membership
|   |   |   |       +-- state: maturity
|   |   |   |       +-- state: seed load
|   |   |   |       `-- kit: ripen-grass-seed-kit
|   |   |   +-- domain: Moss
|   |   |   |   +-- state: moss reach
|   |   |   |   +-- state: moisture
|   |   |   |   +-- state: health
|   |   |   |   +-- kit: spread-moss-kit
|   |   |   |   +-- domain: Patches
|   |   |   |   |   +-- state: patch membership
|   |   |   |   |   +-- state: overlap
|   |   |   |   |   +-- kit: gather-moss-patches-kit
|   |   |   |   |   `-- domain: Patch
|   |   |   |   |       +-- state: footprint
|   |   |   |   |       +-- state: coverage
|   |   |   |   |       +-- state: age
|   |   |   |   |       +-- kit: grow-moss-patch-kit
|   |   |   |   |       +-- domain: Heart
|   |   |   |   |       |   +-- state: established cover
|   |   |   |   |       |   +-- state: retained moisture
|   |   |   |   |       |   +-- state: density
|   |   |   |   |       |   `-- kit: thicken-moss-heart-kit
|   |   |   |   |       `-- domain: Edge
|   |   |   |   |           +-- state: frontier
|   |   |   |   |           +-- state: available surface
|   |   |   |   |           +-- state: growth direction
|   |   |   |   |           `-- kit: advance-moss-edge-kit
|   |   |   |   `-- domain: Spores
|   |   |   |       +-- state: spore reserve
|   |   |   |       +-- state: carried spores
|   |   |   |       +-- state: viable spores
|   |   |   |       `-- kit: shed-moss-spores-kit
|   |   |   `-- domain: Mold
|   |   |       +-- state: mold reach
|   |   |       +-- state: damp hosts
|   |   |       +-- state: spore load
|   |   |       +-- kit: spread-mold-kit
|   |   |       `-- domain: Colony
|   |   |           +-- state: body
|   |   |           +-- state: frontier
|   |   |           +-- state: age
|   |   |           +-- state: vitality
|   |   |           `-- kit: grow-mold-colony-kit
|   |   +-- domain: Creepers
|   |   |   +-- state: claimed surfaces
|   |   |   +-- state: total reach
|   |   |   +-- state: anchor places
|   |   |   +-- kit: spread-creepers-kit
|   |   |   +-- domain: Wild Roots
|   |   |   |   +-- state: root reach
|   |   |   |   +-- state: active tips
|   |   |   |   +-- state: cracked surfaces
|   |   |   |   +-- kit: push-wild-roots-kit
|   |   |   |   `-- domain: Root Mats
|   |   |   |       +-- state: mat membership
|   |   |   |       +-- state: mat overlap
|   |   |   |       +-- kit: weave-root-mats-kit
|   |   |   |       `-- domain: Root Mat
|   |   |   |           +-- state: footprint
|   |   |   |           +-- state: thickness
|   |   |   |           +-- state: active edge
|   |   |   |           `-- kit: thicken-root-mat-kit
|   |   |   `-- domain: Vines
|   |   |       +-- state: vine membership
|   |   |       +-- state: shared reach
|   |   |       +-- kit: spread-vines-kit
|   |   |       `-- domain: Vine
|   |   |           +-- state: origin
|   |   |           +-- state: reach
|   |   |           +-- state: health
|   |   |           +-- kit: grow-vine-kit
|   |   |           +-- domain: Stem
|   |   |           |   +-- state: path
|   |   |           |   +-- state: thickness
|   |   |           |   +-- state: flexibility
|   |   |           |   `-- kit: extend-vine-stem-kit
|   |   |           +-- domain: Anchors
|   |   |           |   +-- state: anchor membership
|   |   |           |   +-- state: attached surfaces
|   |   |           |   +-- state: grip
|   |   |           |   `-- kit: grip-vine-kit
|   |   |           `-- domain: Vine Leaves
|   |   |               +-- state: leaf membership
|   |   |               +-- state: light exposure
|   |   |               +-- state: health
|   |   |               `-- kit: grow-vine-leaves-kit
|   |   `-- domain: Grove
|   |       +-- state: tree membership
|   |       +-- state: spacing
|   |       +-- state: canopy cover
|   |       +-- state: shared resources
|   |       +-- kit: seed-grove-kit
|   |       +-- service: inspect-grove
|   |       `-- domain: Trees
|   |           +-- state: tree membership
|   |           +-- state: age spread
|   |           +-- state: health spread
|   |           +-- kit: balance-trees-kit
|   |           `-- domain: Tree
|   |               +-- state: age
|   |               +-- state: health
|   |               +-- state: water reserve
|   |               +-- state: energy reserve
|   |               +-- state: damage
|   |               +-- kit: grow-tree-kit
|   |               +-- kit: age-tree-kit
|   |               +-- service: inspect-tree
|   |               +-- domain: Roots
|   |               |   +-- state: root extent
|   |               |   +-- state: root health
|   |               |   +-- state: water intake
|   |               |   +-- state: anchorage
|   |               |   +-- kit: balance-root-system-kit
|   |               |   `-- domain: Root System
|   |               |       +-- state: root membership
|   |               |       +-- state: branching order
|   |               |       +-- state: shared flow
|   |               |       +-- kit: branch-root-system-kit
|   |               |       `-- domain: Root
|   |               |           +-- state: body
|   |               |           +-- state: age
|   |               |           +-- state: health
|   |               |           +-- state: branches
|   |               |           +-- state: flow
|   |               |           +-- kit: grow-root-kit
|   |               |           +-- domain: Root Tip
|   |               |           |   +-- state: heading
|   |               |           |   +-- state: growth rate
|   |               |           |   +-- state: obstacle contact
|   |               |           |   +-- kit: steer-root-tip-kit
|   |               |           |   +-- domain: Root Cap
|   |               |           |   |   +-- state: cap body
|   |               |           |   |   +-- state: wear
|   |               |           |   |   +-- state: soil contact
|   |               |           |   |   `-- kit: protect-root-tip-kit
|   |               |           |   `-- domain: Growth Zone
|   |               |           |       +-- state: zone length
|   |               |           |       +-- state: growth activity
|   |               |           |       +-- kit: extend-root-kit
|   |               |           |       +-- domain: Meristem
|   |               |           |       |   +-- state: dividing cells
|   |               |           |       |   +-- state: division rate
|   |               |           |       |   +-- state: damage
|   |               |           |       |   `-- kit: divide-root-cells-kit
|   |               |           |       +-- domain: Elongation Zone
|   |               |           |       |   +-- state: elongating cells
|   |               |           |       |   +-- state: extension rate
|   |               |           |       |   +-- state: water pressure
|   |               |           |       |   `-- kit: elongate-root-cells-kit
|   |               |           |       `-- domain: Maturation Zone
|   |               |           |           +-- state: mature tissue
|   |               |           |           +-- state: absorption reach
|   |               |           |           +-- kit: mature-root-tissue-kit
|   |               |           |           `-- domain: Root Hairs
|   |               |           |               +-- state: hair membership
|   |               |           |               +-- state: absorption area
|   |               |           |               +-- kit: sprout-root-hairs-kit
|   |               |           |               `-- domain: Root Hair
|   |               |           |                   +-- state: length
|   |               |           |                   +-- state: soil contact
|   |               |           |                   +-- state: water uptake
|   |               |           |                   `-- kit: absorb-through-root-hair-kit
|   |               |           +-- domain: Root Interior
|   |               |           |   +-- state: internal flow
|   |               |           |   +-- state: stored resources
|   |               |           |   +-- kit: carry-root-resources-kit
|   |               |           |   `-- domain: Vascular Core
|   |               |           |       +-- state: water flow
|   |               |           |       +-- state: sugar flow
|   |               |           |       +-- state: continuity
|   |               |           |       +-- kit: circulate-root-sap-kit
|   |               |           |       +-- domain: Xylem
|   |               |           |       |   +-- state: vessel continuity
|   |               |           |       |   +-- state: upward flow
|   |               |           |       |   +-- state: cavitation
|   |               |           |       |   `-- kit: lift-root-water-kit
|   |               |           |       `-- domain: Phloem
|   |               |           |           +-- state: sieve continuity
|   |               |           |           +-- state: sugar flow
|   |               |           |           +-- state: pressure
|   |               |           |           `-- kit: feed-root-kit
|   |               |           `-- domain: Root Skin
|   |               |               +-- state: outer tissue
|   |               |               +-- state: permeability
|   |               |               +-- state: wounds
|   |               |               `-- kit: seal-root-skin-kit
|   |               +-- domain: Trunk
|   |               |   +-- state: height
|   |               |   +-- state: girth
|   |               |   +-- state: lean
|   |               |   +-- state: strength
|   |               |   +-- kit: thicken-trunk-kit
|   |               |   +-- domain: Wood
|   |               |   |   +-- state: woody body
|   |               |   |   +-- state: moisture
|   |               |   |   +-- state: structural load
|   |               |   |   +-- kit: harden-wood-kit
|   |               |   |   +-- domain: Heartwood
|   |               |   |   |   +-- state: dead core
|   |               |   |   |   +-- state: density
|   |               |   |   |   +-- state: decay
|   |               |   |   |   `-- kit: preserve-heartwood-kit
|   |               |   |   +-- domain: Sapwood
|   |               |   |   |   +-- state: living rings
|   |               |   |   |   +-- state: water flow
|   |               |   |   |   +-- state: active width
|   |               |   |   |   +-- kit: carry-trunk-water-kit
|   |               |   |   |   `-- domain: Vessels
|   |               |   |   |       +-- state: vessel membership
|   |               |   |   |       +-- state: connected flow
|   |               |   |   |       +-- kit: connect-sapwood-vessels-kit
|   |               |   |   |       `-- domain: Vessel
|   |               |   |   |           +-- state: bore
|   |               |   |   |           +-- state: flow
|   |               |   |   |           +-- state: blockage
|   |               |   |   |           `-- kit: conduct-trunk-water-kit
|   |               |   |   `-- domain: Growth Rings
|   |               |   |       +-- state: ring membership
|   |               |   |       +-- state: annual history
|   |               |   |       +-- state: damage history
|   |               |   |       +-- kit: lay-growth-ring-kit
|   |               |   |       `-- domain: Ring
|   |               |   |           +-- state: year
|   |               |   |           +-- state: width
|   |               |   |           +-- state: density
|   |               |   |           +-- state: scars
|   |               |   |           `-- kit: record-growth-year-kit
|   |               |   +-- domain: Bark
|   |               |   |   +-- state: bark coverage
|   |               |   |   +-- state: thickness
|   |               |   |   +-- state: damage
|   |               |   |   +-- kit: grow-bark-kit
|   |               |   |   +-- domain: Inner Bark
|   |               |   |   |   +-- state: living tissue
|   |               |   |   |   +-- state: sugar flow
|   |               |   |   |   +-- state: wounds
|   |               |   |   |   `-- kit: feed-trunk-kit
|   |               |   |   `-- domain: Outer Bark
|   |               |   |       +-- state: protective plates
|   |               |   |       +-- state: fissures
|   |               |   |       +-- state: shedding
|   |               |   |       `-- kit: weather-bark-kit
|   |               |   `-- domain: Wounds
|   |               |       +-- state: wound membership
|   |               |       +-- state: open area
|   |               |       +-- state: healing
|   |               |       +-- kit: heal-tree-wound-kit
|   |               |       +-- domain: Scar
|   |               |       |   +-- state: sealed tissue
|   |               |       |   +-- state: age
|   |               |       |   +-- state: weakness
|   |               |       |   `-- kit: thicken-scar-kit
|   |               |       `-- domain: Rot Pocket
|   |               |           +-- state: occupied wood
|   |               |           +-- state: spread
|   |               |           +-- state: lost strength
|   |               |           `-- kit: spread-tree-rot-kit
|   |               `-- domain: Crown
|   |                   +-- state: crown reach
|   |                   +-- state: crown balance
|   |                   +-- state: light exposure
|   |                   +-- state: wind load
|   |                   +-- kit: balance-crown-kit
|   |                   +-- domain: Boughs
|   |                   |   +-- state: bough membership
|   |                   |   +-- state: bough distribution
|   |                   |   +-- kit: arrange-boughs-kit
|   |                   |   `-- domain: Bough
|   |                   |       +-- state: body
|   |                   |       +-- state: load
|   |                   |       +-- state: health
|   |                   |       +-- kit: grow-bough-kit
|   |                   |       `-- domain: Branches
|   |                   |           +-- state: branch membership
|   |                   |           +-- state: branch distribution
|   |                   |           +-- kit: arrange-branches-kit
|   |                   |           `-- domain: Branch
|   |                   |               +-- state: body
|   |                   |               +-- state: heading
|   |                   |               +-- state: health
|   |                   |               +-- state: growth record
|   |                   |               +-- kit: grow-branch-kit
|   |                   |               `-- domain: Twigs
|   |                   |                   +-- state: twig membership
|   |                   |                   +-- state: twig distribution
|   |                   |                   +-- kit: arrange-twigs-kit
|   |                   |                   `-- domain: Twig
|   |                   |                       +-- state: body
|   |                   |                       +-- state: heading
|   |                   |                       +-- state: health
|   |                   |                       +-- state: growth record
|   |                   |                       +-- kit: grow-twig-kit
|   |                   |                       `-- domain: Buds
|   |                   |                           +-- state: bud membership
|   |                   |                           +-- state: bud spacing
|   |                   |                           +-- kit: arrange-buds-kit
|   |                   |                           `-- domain: Bud
|   |                   |                               +-- state: age
|   |                   |                               +-- state: health
|   |                   |                               +-- state: dormancy
|   |                   |                               +-- state: stored resources
|   |                   |                               +-- kit: develop-bud-kit
|   |                   |                               `-- domain: Leaf Cluster
|   |                   |                                   +-- state: leaf membership
|   |                   |                                   +-- state: opening stage
|   |                   |                                   +-- state: cluster health
|   |                   |                                   +-- kit: open-leaf-cluster-kit
|   |                   |                                   `-- domain: Leaves
|   |                   |                                       +-- state: leaf membership
|   |                   |                                       +-- state: leaf spacing
|   |                   |                                       +-- state: shared light
|   |                   |                                       +-- kit: arrange-leaves-kit
|   |                   |                                       `-- domain: Leaf
|   |                   |                                           +-- state: age
|   |                   |                                           +-- state: health
|   |                   |                                           +-- state: water
|   |                   |                                           +-- state: sugar
|   |                   |                                           +-- state: damage
|   |                   |                                           +-- kit: unfurl-leaf-kit
|   |                   |                                           +-- kit: age-leaf-kit
|   |                   |                                           +-- service: inspect-leaf
|   |                   |                                           +-- domain: Stalk
|   |                   |                                           |   +-- state: length
|   |                   |                                           |   +-- state: angle
|   |                   |                                           |   +-- state: flexibility
|   |                   |                                           |   +-- state: flow
|   |                   |                                           |   `-- kit: orient-leaf-kit
|   |                   |                                           +-- domain: Blade
|   |                   |                                           |   +-- state: outline
|   |                   |                                           |   +-- state: area
|   |                   |                                           |   +-- state: curl
|   |                   |                                           |   +-- state: tears
|   |                   |                                           |   +-- kit: shape-leaf-blade-kit
|   |                   |                                           |   +-- domain: Veins
|   |                   |                                           |   |   +-- state: vein membership
|   |                   |                                           |   |   +-- state: connected flow
|   |                   |                                           |   |   +-- kit: connect-leaf-veins-kit
|   |                   |                                           |   |   +-- domain: Midrib
|   |                   |                                           |   |   |   +-- state: path
|   |                   |                                           |   |   |   +-- state: thickness
|   |                   |                                           |   |   |   +-- state: flow
|   |                   |                                           |   |   |   `-- kit: support-leaf-blade-kit
|   |                   |                                           |   |   `-- domain: Side Veins
|   |                   |                                           |   |       +-- state: vein membership
|   |                   |                                           |   |       +-- state: branching order
|   |                   |                                           |   |       +-- kit: branch-leaf-veins-kit
|   |                   |                                           |   |       `-- domain: Vein
|   |                   |                                           |   |           +-- state: path
|   |                   |                                           |   |           +-- state: diameter
|   |                   |                                           |   |           +-- state: flow
|   |                   |                                           |   |           +-- kit: circulate-leaf-sap-kit
|   |                   |                                           |   |           `-- domain: Vessels
|   |                   |                                           |   |               +-- state: vessel membership
|   |                   |                                           |   |               +-- state: exchange
|   |                   |                                           |   |               +-- kit: connect-leaf-vessels-kit
|   |                   |                                           |   |               +-- domain: Xylem
|   |                   |                                           |   |               |   +-- state: water flow
|   |                   |                                           |   |               |   +-- state: continuity
|   |                   |                                           |   |               |   +-- state: blockage
|   |                   |                                           |   |               |   `-- kit: hydrate-leaf-kit
|   |                   |                                           |   |               `-- domain: Phloem
|   |                   |                                           |   |                   +-- state: sugar flow
|   |                   |                                           |   |                   +-- state: continuity
|   |                   |                                           |   |                   +-- state: pressure
|   |                   |                                           |   |                   `-- kit: export-leaf-sugar-kit
|   |                   |                                           |   `-- domain: Surface
|   |                   |                                           |       +-- state: pigment
|   |                   |                                           |       +-- state: wetness
|   |                   |                                           |       +-- state: grime
|   |                   |                                           |       +-- state: decay
|   |                   |                                           |       +-- kit: weather-leaf-surface-kit
|   |                   |                                           |       +-- domain: Cuticle
|   |                   |                                           |       |   +-- state: wax coverage
|   |                   |                                           |       |   +-- state: permeability
|   |                   |                                           |       |   +-- state: abrasion
|   |                   |                                           |       |   `-- kit: seal-leaf-kit
|   |                   |                                           |       `-- domain: Pores
|   |                   |                                           |           +-- state: pore membership
|   |                   |                                           |           +-- state: open fraction
|   |                   |                                           |           +-- kit: balance-leaf-pores-kit
|   |                   |                                           |           `-- domain: Stoma
|   |                   |                                           |               +-- state: aperture
|   |                   |                                           |               +-- state: gas exchange
|   |                   |                                           |               +-- state: water loss
|   |                   |                                           |               +-- kit: breathe-through-stoma-kit
|   |                   |                                           |               `-- domain: Guard Cells
|   |                   |                                           |                   +-- state: cell pressure
|   |                   |                                           |                   +-- state: opening force
|   |                   |                                           |                   +-- state: stress
|   |                   |                                           |                   `-- kit: regulate-stoma-kit
|   |                   |                                           `-- domain: Leaf Life
|   |                   |                                               +-- state: emergence stage
|   |                   |                                               +-- state: growth stage
|   |                   |                                               +-- state: mature stage
|   |                   |                                               +-- state: senescence stage
|   |                   |                                               +-- state: damage history
|   |                   |                                               +-- kit: progress-leaf-life-kit
|   |                   |                                               +-- domain: Growth Memory
|   |                   |                                               |   +-- state: stage history
|   |                   |                                               |   +-- state: seasonal history
|   |                   |                                               |   +-- state: disturbance history
|   |                   |                                               |   `-- kit: remember-leaf-growth-kit
|   |                   |                                               `-- domain: Nourishment
|   |                   |                                                   +-- state: water balance
|   |                   |                                                   +-- state: sugar balance
|   |                   |                                                   +-- state: light intake
|   |                   |                                                   `-- kit: balance-leaf-resources-kit
|   |                   `-- domain: Canopy
|   |                       +-- state: total cover
|   |                       +-- state: gaps
|   |                       +-- state: layered depth
|   |                       +-- state: light interception
|   |                       `-- kit: shape-canopy-kit
|   +-- domain: Atmosphere
|   |   +-- state: ambient condition
|   |   +-- state: visibility
|   |   +-- state: acoustic reach
|   |   +-- kit: n-core-skybox-kit
|   |   +-- kit: blend-corridor-atmosphere-kit
|   |   +-- service: inspect-atmosphere
|   |   +-- domain: Air
|   |   |   +-- state: temperature
|   |   |   +-- state: humidity
|   |   |   +-- state: movement
|   |   |   +-- kit: move-corridor-air-kit
|   |   |   +-- domain: Dampness
|   |   |   |   +-- state: humidity
|   |   |   |   +-- state: condensation
|   |   |   |   +-- state: saturation
|   |   |   |   `-- kit: condense-damp-air-kit
|   |   |   +-- domain: Fog
|   |   |   |   +-- state: total body
|   |   |   |   +-- state: visibility loss
|   |   |   |   +-- state: persistence
|   |   |   |   +-- kit: form-fog-kit
|   |   |   |   +-- service: inspect-fog
|   |   |   |   +-- domain: Fog Banks
|   |   |   |   |   +-- state: bank membership
|   |   |   |   |   +-- state: overlap
|   |   |   |   |   +-- kit: gather-fog-banks-kit
|   |   |   |   |   `-- domain: Fog Bank
|   |   |   |   |       +-- state: body
|   |   |   |   |       +-- state: density
|   |   |   |   |       +-- state: color
|   |   |   |   |       +-- state: edge
|   |   |   |   |       `-- kit: shape-fog-bank-kit
|   |   |   |   +-- domain: Fog Drift
|   |   |   |   |   +-- state: direction
|   |   |   |   |   +-- state: speed
|   |   |   |   |   +-- state: turbulence
|   |   |   |   |   `-- kit: drift-fog-kit
|   |   |   |   `-- domain: Fog Wake
|   |   |   |       +-- state: disturbed paths
|   |   |   |       +-- state: dissipation
|   |   |   |       +-- state: history
|   |   |   |       `-- kit: remember-fog-wake-kit
|   |   |   `-- domain: Drafts
|   |   |       +-- state: draft paths
|   |   |       +-- state: direction
|   |   |       +-- state: strength
|   |   |       `-- kit: carry-draft-kit
|   |   +-- domain: Illumination
|   |   |   +-- state: ambient level
|   |   |   +-- state: route visibility
|   |   |   +-- state: landmark visibility
|   |   |   +-- state: contrast
|   |   |   +-- kit: reveal-with-light-kit
|   |   |   +-- service: query-visibility
|   |   |   +-- domain: Darkness
|   |   |   |   +-- state: dark places
|   |   |   |   +-- state: depth
|   |   |   |   +-- state: adaptation
|   |   |   |   `-- kit: settle-darkness-kit
|   |   |   +-- domain: Lamp Pools
|   |   |   |   +-- state: lit places
|   |   |   |   +-- state: warmth
|   |   |   |   +-- state: falloff
|   |   |   |   `-- kit: cast-practical-light-kit
|   |   |   +-- domain: Daylight Leaks
|   |   |   |   +-- state: openings
|   |   |   |   +-- state: cool reach
|   |   |   |   +-- state: time variation
|   |   |   |   `-- kit: leak-daylight-kit
|   |   |   +-- domain: Anomaly Glow
|   |   |   |   +-- state: glow sources
|   |   |   |   +-- state: sickly reach
|   |   |   |   +-- state: pulse
|   |   |   |   `-- kit: pulse-anomaly-glow-kit
|   |   |   +-- domain: Flashlight Beam
|   |   |   |   +-- state: origin
|   |   |   |   +-- state: direction
|   |   |   |   +-- state: reach
|   |   |   |   +-- state: interruption
|   |   |   |   +-- state: revealed subjects
|   |   |   |   +-- kit: cast-flashlight-beam-kit
|   |   |   |   `-- service: query-beam-contact
|   |   |   `-- domain: Sightlines
|   |   |       +-- state: visible routes
|   |   |       +-- state: occluded routes
|   |   |       +-- state: visible landmarks
|   |   |       `-- kit: preserve-sightline-kit
|   |   +-- domain: Acoustics
|   |   |   +-- state: sound reach
|   |   |   +-- state: reverberation
|   |   |   +-- state: obstruction
|   |   |   +-- kit: carry-spatial-sound-kit
|   |   |   +-- service: query-audibility
|   |   |   +-- domain: Room Tone
|   |   |   |   +-- state: ruin ambience
|   |   |   |   +-- state: water ambience
|   |   |   |   +-- state: wind ambience
|   |   |   |   `-- kit: sustain-room-tone-kit
|   |   |   +-- domain: Echoes
|   |   |   |   +-- state: echo paths
|   |   |   |   +-- state: delay
|   |   |   |   +-- state: decay
|   |   |   |   `-- kit: return-echo-kit
|   |   |   +-- domain: Footfalls
|   |   |   |   +-- state: recent steps
|   |   |   |   +-- state: surface response
|   |   |   |   +-- state: audible reach
|   |   |   |   `-- kit: sound-footfall-kit
|   |   |   `-- domain: Silence
|   |   |       +-- state: silent places
|   |   |       +-- state: duration
|   |   |       +-- state: contrast
|   |   |       `-- kit: hold-silence-kit
|   |   `-- domain: Landmarks
|   |       +-- state: landmark identities
|   |       +-- state: landmark positions
|   |       +-- state: landmark salience
|   |       +-- kit: landmark-guidance-kit
|   |       +-- service: query-landmark
|   |       +-- domain: Structural Signs
|   |       |   +-- state: prominent structures
|   |       |   +-- state: silhouettes
|   |       |   +-- state: visibility
|   |       |   `-- kit: establish-structural-sign-kit
|   |       +-- domain: Living Signs
|   |       |   +-- state: prominent growth
|   |       |   +-- state: silhouettes
|   |       |   +-- state: seasonal change
|   |       |   `-- kit: establish-living-sign-kit
|   |       +-- domain: Anomaly Signs
|   |       |   +-- state: glow signs
|   |       |   +-- state: disturbance signs
|   |       |   +-- state: reliability
|   |       |   `-- kit: reveal-anomaly-sign-kit
|   |       `-- domain: Trail Signs
|   |           +-- state: mark signs
|   |           +-- state: blood signs
|   |           +-- state: creature signs
|   |           `-- kit: read-trail-sign-kit
|   `-- domain: Traces
|       +-- state: trace ownership
|       +-- state: trace continuity
|       +-- state: trace age
|       +-- kit: preserve-world-traces-kit
|       +-- service: read-trace
|       +-- domain: Explorer Marks
|       |   +-- state: mark membership
|       |   +-- state: mark positions
|       |   +-- state: mark ages
|       |   +-- state: mark condition
|       |   +-- kit: leave-explorer-mark-kit
|       |   `-- domain: Mark
|       |       +-- state: author
|       |       +-- state: sign
|       |       +-- state: position
|       |       +-- state: age
|       |       `-- kit: age-explorer-mark-kit
|       +-- domain: Blood Trails
|       |   +-- state: trail membership
|       |   +-- state: trail continuity
|       |   +-- kit: lay-blood-trail-kit
|       |   `-- domain: Blood Trail
|       |       +-- state: origin
|       |       +-- state: continuity
|       |       +-- state: age
|       |       +-- kit: age-blood-trail-kit
|       |       `-- domain: Stains
|       |           +-- state: stain membership
|       |           +-- state: stain spacing
|       |           +-- kit: scatter-blood-stains-kit
|       |           `-- domain: Stain
|       |               +-- state: position
|       |               +-- state: shape
|       |               +-- state: wetness
|       |               +-- state: age
|       |               +-- state: condition
|       |               `-- kit: age-stain-kit
|       `-- domain: Creature Signs
|           +-- state: sign membership
|           +-- state: sign positions
|           +-- state: sign freshness
|           +-- state: sign certainty
|           `-- kit: leave-creature-sign-kit
+-- domain: Party
|   +-- state: party identity
|   +-- state: party readiness
|   +-- kit: n-core-character-kit
|   +-- kit: n-core-player-kit
|   +-- kit: n-core-motion-kit
|   +-- kit: horror-party-kit
|   +-- kit: keep-party-kit
|   +-- service: party-service
|   +-- domain: Gathering
|   |   +-- state: members
|   |   +-- state: roles
|   |   +-- state: connection presence
|   |   +-- state: readiness
|   |   +-- kit: gather-party-kit
|   |   `-- service: change-party-membership
|   +-- domain: Explorers
|   |   +-- state: explorer membership
|   |   +-- state: active explorers
|   |   +-- kit: keep-explorers-kit
|   |   `-- domain: Explorer
|   |       +-- state: identity
|   |       +-- state: role
|   |       +-- state: active status
|   |       +-- kit: sustain-explorer-kit
|   |       +-- service: inspect-explorer
|   |       +-- domain: Body
|   |       |   +-- state: position
|   |       |   +-- state: facing
|   |       |   +-- state: posture
|   |       |   +-- state: grounded status
|   |       |   +-- kit: character-movement-kit
|   |       |   +-- kit: first-person-body-kit
|   |       |   +-- service: move-explorer
|   |       |   +-- domain: Stance
|   |       |   |   +-- state: height
|   |       |   |   +-- state: balance
|   |       |   |   +-- state: movement freedom
|   |       |   |   `-- kit: settle-stance-kit
|   |       |   `-- domain: Footing
|   |       |       +-- state: contact surface
|   |       |       +-- state: grip
|   |       |       +-- state: stability
|   |       |       `-- kit: resolve-footing-kit
|   |       +-- domain: Gaze
|   |       |   +-- state: direction
|   |       |   +-- state: focus
|   |       |   +-- state: comfort
|   |       |   +-- state: occlusion
|   |       |   +-- kit: character-camera-kit
|   |       |   +-- kit: camera-occlusion-kit
|   |       |   `-- service: turn-gaze
|   |       +-- domain: Hands
|   |       |   +-- state: visible hands
|   |       |   +-- state: carry posture
|   |       |   +-- state: interaction posture
|   |       |   +-- kit: show-first-person-hands-kit
|   |       |   `-- kit: pose-carrying-hands-kit
|   |       +-- domain: Condition
|   |       |   +-- state: overall state
|   |       |   +-- state: worsening causes
|   |       |   +-- state: recovery causes
|   |       |   +-- kit: combine-explorer-condition-kit
|   |       |   +-- domain: Stress
|   |       |   |   +-- state: current stress
|   |       |   |   +-- state: stress trend
|   |       |   |   +-- state: stress history
|   |       |   |   `-- kit: raise-explorer-stress-kit
|   |       |   +-- domain: Exposure
|   |       |   |   +-- state: active exposures
|   |       |   |   +-- state: accumulated exposure
|   |       |   |   +-- state: recovery
|   |       |   |   `-- kit: accumulate-exposure-kit
|   |       |   +-- domain: Injury
|   |       |   |   +-- state: wounds
|   |       |   |   +-- state: impairment
|   |       |   |   +-- state: stability
|   |       |   |   `-- kit: resolve-injury-kit
|   |       |   `-- domain: Orientation
|   |       |       +-- state: heading confidence
|   |       |       +-- state: place confidence
|   |       |       +-- state: return confidence
|   |       |       `-- kit: update-orientation-kit
|   |       +-- domain: Carry
|   |       |   +-- state: carried subject
|   |       |   +-- state: carry capacity
|   |       |   +-- state: carry posture
|   |       |   +-- kit: single-carry-kit
|   |       |   +-- service: change-carry
|   |       |   +-- domain: Empty Hands
|   |       |   |   +-- state: availability
|   |       |   |   +-- state: interaction freedom
|   |       |   |   `-- kit: free-hands-kit
|   |       |   `-- domain: Held Relic
|   |       |       +-- state: relic identity
|   |       |       +-- state: grip
|   |       |       +-- state: visible presence
|   |       |       `-- kit: hold-relic-kit
|   |       +-- domain: Memory
|   |       |   +-- state: remembered world
|   |       |   +-- state: confidence
|   |       |   +-- state: forgetting
|   |       |   +-- kit: sustain-explorer-memory-kit
|   |       |   +-- service: recall-explorer-memory
|   |       |   +-- domain: Known Places
|   |       |   |   +-- state: places
|   |       |   |   +-- state: visit history
|   |       |   |   +-- state: confidence
|   |       |   |   `-- kit: remember-visited-place-kit
|   |       |   +-- domain: Known Ways
|   |       |   |   +-- state: ways
|   |       |   |   +-- state: traversal history
|   |       |   |   +-- state: confidence
|   |       |   |   `-- kit: remember-traveled-way-kit
|   |       |   +-- domain: Known Landmarks
|   |       |   |   +-- state: landmarks
|   |       |   |   +-- state: sighting history
|   |       |   |   +-- state: confidence
|   |       |   |   `-- kit: remember-landmark-kit
|   |       |   `-- domain: Personal Trail
|   |       |       +-- state: marks
|   |       |       +-- state: continuity
|   |       |       +-- state: age
|   |       |       `-- kit: remember-personal-trail-kit
|   |       `-- domain: Presence
|   |           +-- state: local presence
|   |           +-- state: remote presence
|   |           +-- state: visibility
|   |           +-- state: audibility
|   |           +-- kit: share-explorer-presence-kit
|   |           +-- domain: Visible Presence
|   |           |   +-- state: visible body
|   |           |   +-- state: occlusion
|   |           |   +-- state: distance
|   |           |   `-- kit: show-remote-explorer-kit
|   |           +-- domain: Audible Presence
|   |           |   +-- state: audible actions
|   |           |   +-- state: sound reach
|   |           |   +-- state: direction
|   |           |   `-- kit: sound-remote-explorer-kit
|   |           `-- domain: Remote Presence
|   |               +-- state: connection
|   |               +-- state: latest pose
|   |               +-- state: latest action
|   |               `-- kit: receive-remote-presence-kit
|   +-- domain: Togetherness
|   |   +-- state: party proximity
|   |   +-- state: party separation
|   |   +-- state: coordination
|   |   +-- state: shared knowledge
|   |   +-- kit: keep-party-together-kit
|   |   +-- service: inspect-togetherness
|   |   +-- domain: Nearness
|   |   |   +-- state: nearby pairs
|   |   |   +-- state: group center
|   |   |   +-- state: visual contact
|   |   |   `-- kit: measure-party-nearness-kit
|   |   +-- domain: Separation
|   |   |   +-- state: separated members
|   |   |   +-- state: separation distance
|   |   |   +-- state: separation duration
|   |   |   `-- kit: measure-party-separation-kit
|   |   +-- domain: Coordination
|   |   |   +-- state: shared intent
|   |   |   +-- state: assigned roles
|   |   |   +-- state: conflicting actions
|   |   |   `-- kit: coordinate-party-kit
|   |   `-- domain: Shared Knowledge
|   |       +-- state: shared places
|   |       +-- state: shared ways
|   |       +-- state: shared relic knowledge
|   |       `-- kit: share-party-knowledge-kit
|   `-- domain: Signals
|       +-- state: active signals
|       +-- state: signal authors
|       +-- state: signal meanings
|       +-- kit: exchange-party-signals-kit
|       +-- service: emit-party-signal
|       +-- domain: World Marks
|       |   +-- state: placed marks
|       |   +-- state: mark meanings
|       |   +-- state: mark ages
|       |   `-- kit: place-world-mark-kit
|       +-- domain: Carry Signals
|       |   +-- state: visible carried relics
|       |   +-- state: carry intentions
|       |   +-- state: acknowledgements
|       |   `-- kit: signal-carry-state-kit
|       `-- domain: Objective Signals
|           +-- state: search signals
|           +-- state: return signals
|           +-- state: offering signals
|           `-- kit: signal-objective-state-kit
+-- domain: Dread
|   +-- state: current pressure
|   +-- state: pressure trend
|   +-- kit: n-core-creature-kit
|   +-- kit: n-core-audio-kit
|   +-- kit: n-core-spatial-kit
|   +-- kit: n-core-interaction-kit
|   +-- kit: n-core-simulation-kit
|   +-- kit: n-core-graphics-kit
|   +-- kit: horror-dread-kit
|   +-- kit: resource-pressure-kit
|   +-- kit: raise-dread-kit
|   +-- service: dread-service
|   +-- domain: Tension
|   |   +-- state: current tension
|   |   +-- state: current movement
|   |   +-- state: history
|   |   +-- kit: pace-tension-kit
|   |   +-- service: read-tension
|   |   +-- domain: Baseline
|   |   |   +-- state: resting pressure
|   |   |   +-- state: environmental unease
|   |   |   +-- state: party unease
|   |   |   `-- kit: establish-dread-baseline-kit
|   |   +-- domain: Omens
|   |   |   +-- state: active omens
|   |   |   +-- state: perceived omens
|   |   |   +-- state: omen credibility
|   |   |   `-- kit: foreshadow-danger-kit
|   |   +-- domain: Escalation
|   |   |   +-- state: current rise
|   |   |   +-- state: rise causes
|   |   |   +-- state: peak approach
|   |   |   `-- kit: escalate-tension-kit
|   |   +-- domain: Reprieve
|   |   |   +-- state: current relief
|   |   |   +-- state: relief cause
|   |   |   +-- state: relief duration
|   |   |   `-- kit: release-tension-kit
|   |   `-- domain: Crescendo
|   |       +-- state: peak pressure
|   |       +-- state: peak cause
|   |       +-- state: resolution
|   |       `-- kit: crest-tension-kit
|   +-- domain: Lostness
|   |   +-- state: orientation confidence
|   |   +-- state: route uncertainty
|   |   +-- state: return uncertainty
|   |   +-- state: landmark doubt
|   |   +-- kit: deepen-lostness-kit
|   |   +-- service: read-lostness
|   |   +-- domain: Orientation
|   |   |   +-- state: believed heading
|   |   |   +-- state: actual heading
|   |   |   +-- state: mismatch
|   |   |   `-- kit: unsettle-orientation-kit
|   |   +-- domain: Way Doubt
|   |   |   +-- state: doubted ways
|   |   |   +-- state: conflicting evidence
|   |   |   +-- state: confidence loss
|   |   |   `-- kit: seed-way-doubt-kit
|   |   +-- domain: Return Doubt
|   |   |   +-- state: believed return way
|   |   |   +-- state: broken return links
|   |   |   +-- state: confidence loss
|   |   |   `-- kit: obscure-return-way-kit
|   |   `-- domain: Landmark Doubt
|   |       +-- state: doubted landmarks
|   |       +-- state: false matches
|   |       +-- state: confidence loss
|   |       `-- kit: blur-landmark-memory-kit
|   +-- domain: Isolation
|   |   +-- state: party separation
|   |   +-- state: visibility separation
|   |   +-- state: knowledge separation
|   |   +-- state: communication loss
|   |   +-- kit: deepen-isolation-kit
|   |   +-- service: read-isolation
|   |   +-- domain: Distance
|   |   |   +-- state: separated pairs
|   |   |   +-- state: distance
|   |   |   +-- state: duration
|   |   |   `-- kit: stretch-party-distance-kit
|   |   +-- domain: Occlusion
|   |   |   +-- state: hidden party members
|   |   |   +-- state: blocking geometry
|   |   |   +-- state: last visual contact
|   |   |   `-- kit: break-visual-contact-kit
|   |   +-- domain: Silence
|   |   |   +-- state: unheard party members
|   |   |   +-- state: silent duration
|   |   |   +-- state: last sound contact
|   |   |   `-- kit: break-audible-contact-kit
|   |   `-- domain: Knowledge Gap
|   |       +-- state: unshared discoveries
|   |       +-- state: conflicting knowledge
|   |       +-- state: unknown member intent
|   |       `-- kit: widen-knowledge-gap-kit
|   +-- domain: Hazards
|   |   +-- state: active hazards
|   |   +-- state: exposed explorers
|   |   +-- state: blocked places
|   |   +-- kit: hazard-field-kit
|   |   +-- service: inspect-hazard
|   |   +-- domain: Collapse
|   |   |   +-- state: unstable structures
|   |   |   +-- state: active collapse
|   |   |   +-- state: new obstruction
|   |   |   +-- kit: trigger-collapse-kit
|   |   |   +-- domain: Warning
|   |   |   |   +-- state: sounds
|   |   |   |   +-- state: falling dust
|   |   |   |   +-- state: visible movement
|   |   |   |   `-- kit: warn-collapse-kit
|   |   |   +-- domain: Fall
|   |   |   |   +-- state: falling pieces
|   |   |   |   +-- state: fall path
|   |   |   |   +-- state: impact
|   |   |   |   `-- kit: drop-collapse-debris-kit
|   |   |   `-- domain: Obstruction
|   |   |       +-- state: blocked span
|   |   |       +-- state: debris body
|   |   |       +-- state: passability
|   |   |       `-- kit: settle-collapse-obstruction-kit
|   |   +-- domain: Flood
|   |   |   +-- state: water body
|   |   |   +-- state: occupied places
|   |   |   +-- state: depth
|   |   |   +-- state: traversability
|   |   |   +-- kit: advance-flood-kit
|   |   |   +-- domain: Rise
|   |   |   |   +-- state: waterline
|   |   |   |   +-- state: rise rate
|   |   |   |   +-- state: source
|   |   |   |   `-- kit: raise-waterline-kit
|   |   |   +-- domain: Current
|   |   |   |   +-- state: direction
|   |   |   |   +-- state: strength
|   |   |   |   +-- state: carried debris
|   |   |   |   `-- kit: push-flood-current-kit
|   |   |   `-- domain: Passage
|   |   |       +-- state: passable spans
|   |   |       +-- state: dangerous spans
|   |   |       +-- state: closed spans
|   |   |       `-- kit: resolve-flood-passage-kit
|   |   `-- domain: Contamination
|   |       +-- state: contaminated places
|   |       +-- state: contaminated growth
|   |       +-- state: exposed explorers
|   |       +-- kit: spread-contamination-kit
|   |       +-- domain: Blight
|   |       |   +-- state: blighted growth
|   |       |   +-- state: spread
|   |       |   +-- state: severity
|   |       |   `-- kit: blight-overgrowth-kit
|   |       +-- domain: Exposure
|   |       |   +-- state: exposed explorers
|   |       |   +-- state: dose
|   |       |   +-- state: duration
|   |       |   `-- kit: accumulate-contamination-kit
|   |       `-- domain: Consequence
|   |           +-- state: active effects
|   |           +-- state: persistence
|   |           +-- state: recovery
|   |           `-- kit: resolve-contamination-kit
|   +-- domain: Haunting
|   |   +-- state: active hauntings
|   |   +-- state: witnessed hauntings
|   |   +-- state: haunting history
|   |   +-- kit: schedule-haunting-kit
|   |   +-- service: invoke-haunting
|   |   +-- domain: Apparitions
|   |   |   +-- state: false landmarks
|   |   |   +-- state: fog figures
|   |   |   +-- state: light figures
|   |   |   `-- kit: show-apparition-kit
|   |   +-- domain: Whispers
|   |   |   +-- state: phantom sounds
|   |   |   +-- state: false directions
|   |   |   +-- state: delayed echoes
|   |   |   `-- kit: cast-whisper-kit
|   |   `-- domain: Shifting Ways
|   |       +-- state: doubted routes
|   |       +-- state: false thresholds
|   |       +-- state: changed places
|   |       `-- kit: seem-to-shift-way-kit
|   `-- domain: Hunter
|       +-- state: presence
|       +-- state: intent
|       +-- state: pursuit
|       +-- kit: pursuit-pressure-kit
|       +-- kit: sustain-hunter-kit
|       +-- service: inspect-hunter
|       +-- domain: Creature
|       |   +-- state: identity
|       |   +-- state: body
|       |   +-- state: condition
|       |   +-- state: location
|       |   +-- kit: embody-hunter-kit
|       +-- domain: Presence
|       |   +-- state: direction
|       |   +-- state: distance
|       |   +-- state: pressure
|       |   +-- kit: approach-from-unseen-kit
|       |   +-- service: read-hunter-presence
|       |   +-- domain: Signs
|       |   |   +-- state: audible signs
|       |   |   +-- state: sign direction
|       |   |   +-- state: sign intensity
|       |   |   +-- kit: signal-monster-nearness-kit
|       |   |   `-- service: hear-monster-sign
|       |   `-- domain: Nearness
|       |       +-- state: current distance
|       |       +-- state: closest approach
|       |       +-- state: arrival status
|       |       `-- kit: close-hunter-distance-kit
|       +-- domain: Awareness
|       |   +-- state: awareness level
|       |   +-- state: known explorers
|       |   +-- state: last evidence
|       |   +-- kit: perceive-explorer-kit
|       |   +-- domain: Attention
|       |   |   +-- state: current focus
|       |   |   +-- state: competing stimuli
|       |   |   +-- state: persistence
|       |   |   `-- kit: turn-hunter-attention-kit
|       |   +-- domain: Certainty
|       |   |   +-- state: target certainty
|       |   |   +-- state: evidence weight
|       |   |   +-- state: decay
|       |   |   `-- kit: update-hunter-certainty-kit
|       |   `-- domain: Memory
|       |       +-- state: remembered explorers
|       |       +-- state: remembered places
|       |       +-- state: remembered trails
|       |       `-- kit: remember-hunter-evidence-kit
|       +-- domain: Intent
|       |   +-- state: current purpose
|       |   +-- state: chosen target
|       |   +-- state: commitment
|       |   +-- kit: choose-hunter-intent-kit
|       |   +-- domain: Stalking
|       |   |   +-- state: stalking target
|       |   |   +-- state: concealment
|       |   |   +-- state: approach
|       |   |   `-- kit: stalk-explorer-kit
|       |   +-- domain: Searching
|       |   |   +-- state: search places
|       |   |   +-- state: search route
|       |   |   +-- state: search progress
|       |   |   `-- kit: search-for-explorer-kit
|       |   `-- domain: Chasing
|       |       +-- state: chased explorer
|       |       +-- state: chase route
|       |       +-- state: closing speed
|       |       `-- kit: chase-explorer-kit
|       +-- domain: Territory
|       |   +-- state: claimed places
|       |   +-- state: patrol reach
|       |   +-- state: intrusion
|       |   +-- kit: defend-hunter-territory-kit
|       |   +-- domain: Lair
|       |   |   +-- state: place
|       |   |   +-- state: occupancy
|       |   |   +-- state: stored signs
|       |   |   `-- kit: establish-hunter-lair-kit
|       |   +-- domain: Patrol
|       |   |   +-- state: patrol ways
|       |   |   +-- state: current circuit
|       |   |   +-- state: interruptions
|       |   |   `-- kit: patrol-territory-kit
|       |   `-- domain: Intrusion
|       |       +-- state: intruding explorers
|       |       +-- state: intrusion depth
|       |       +-- state: response
|       |       `-- kit: answer-territory-intrusion-kit
|       +-- domain: Pursuit
|       |   +-- state: target
|       |   +-- state: pursuit path
|       |   +-- state: distance
|       |   +-- state: momentum
|       |   +-- kit: pursue-explorer-kit
|       |   `-- service: resolve-pursuit
|       `-- domain: Encounter
|           +-- state: participants
|           +-- state: place
|           +-- state: proximity
|           +-- state: beam contact
|           +-- state: outcome
|           +-- kit: resolve-hunter-encounter-kit
|           +-- service: resolve-encounter
|           +-- domain: Approach
|           |   +-- state: approach direction
|           |   +-- state: approach distance
|           |   +-- state: warning signs
|           |   `-- kit: stage-stalker-approach-kit
|           +-- domain: Repulse
|           |   +-- state: beam contact
|           |   +-- state: held exposure
|           |   +-- state: retreat distance
|           |   `-- kit: repel-monster-with-beam-kit
|           +-- domain: Blackout
|           |   +-- state: cause
|           |   +-- state: remaining darkness
|           |   +-- state: completed darkness
|           |   `-- kit: force-monster-blackout-kit
|           +-- domain: Last Chance
|           |   +-- state: remaining response
|           |   +-- state: restored beam
|           |   +-- state: response outcome
|           |   `-- kit: open-last-chance-kit
|           `-- domain: Capture
|               +-- state: capture status
|               +-- state: jumpscare
|               +-- state: expedition loss
|               `-- kit: resolve-monster-capture-kit
+-- domain: Shared Expedition
|   +-- state: session identity
|   +-- kit: n-core-network-kit
|   +-- kit: horror-shared-expedition-kit
|   +-- kit: peer-session-kit
|   +-- kit: sustain-shared-expedition-kit
|   +-- service: session-service
|   +-- domain: Shared Departure
|   |   +-- state: room identity
|   |   +-- state: membership
|   |   +-- state: readiness
|   |   +-- kit: gather-shared-party-kit
|   |   `-- service: join-gathering
|   +-- domain: Shared Journey
|   |   +-- state: lobby
|   |   +-- state: loading
|   |   +-- state: playing
|   |   +-- state: paused
|   |   +-- state: complete
|   |   +-- kit: lifecycle-progression-kit
|   |   `-- service: change-session-phase
|   +-- domain: Stewardship
|   |   +-- state: host truth
|   |   +-- state: participant views
|   |   +-- state: transfer readiness
|   |   +-- kit: steward-session-truth-kit
|   |   `-- service: resolve-session-truth
|   +-- domain: Shared World
|   |   +-- state: expedition view
|   |   +-- state: corridor view
|   |   +-- state: party view
|   |   +-- state: anomaly view
|   |   +-- state: dread view
|   |   +-- kit: share-world-snapshot-kit
|   |   +-- kit: reconcile-world-snapshot-kit
|   |   `-- service: read-shared-world
|   +-- domain: Rejoining
|   |   +-- state: connection
|   |   +-- state: disconnection
|   |   +-- state: recovery
|   |   +-- state: restored place
|   |   +-- kit: rejoin-party-kit
|   |   `-- service: restore-participant
|   `-- domain: Shared Chronicle
|       +-- state: snapshots
|       +-- state: event history
|       +-- state: recovery history
|       +-- kit: record-shared-session-kit
|       `-- service: read-session-record
+-- host: browser-game-host
|   +-- kit: core-startup-domain
|   +-- kit: n-core-platform-kit
|   +-- kit: n-core-input-kit
|   +-- kit: n-core-ui-kit
|   +-- kit: core-ui-scale-kit
|   +-- kit: core-presentation-domain
|   +-- kit: core-presentation-output-kit
|   +-- kit: input-intent-kit
|   +-- kit: pointer-lock-input-kit
|   +-- kit: menu-flow-kit
|   `-- kit: minimal-play-hud-kit
+-- host: three-world-host
|   +-- kit: n-core-assets-kit
|   +-- kit: n-core-graphics-kit
|   +-- kit: n-core-camera-kit
|   +-- kit: core-camera-framing-kit
|   +-- kit: core-object-shape-domain
|   +-- kit: core-object-fidelity-domain
|   +-- kit: render-descriptor-kit
|   +-- kit: terrain-shader-kit
|   +-- kit: procedural-material-kit
|   +-- kit: scene-bundle-kit
|   `-- kit: post-process-kit
+-- host: peerjs-transport-host
|   +-- kit: peer-transport-kit
|   +-- kit: protocol-serialization-kit
|   `-- kit: snapshot-transport-kit
+-- host: headless-proof-host
|   +-- kit: n-core-diagnostics-kit
|   +-- kit: n-core-debug-kit
|   +-- kit: core-capture-domain
|   +-- kit: render-validation-kit
|   +-- kit: object-review-kit
|   `-- kit: visual-match-kit
+-- proof: domain-blueprint-proof
+-- proof: protokit-smoke-proof
+-- proof: reset-snapshot-proof
+-- proof: live-player-proof
+-- proof: object-review-proof
`-- proof: visual-match-proof
```

## Top-Level Boundary Ledger

| Domain | Owns | Excludes |
| --- | --- | --- |
| Expedition | One run's departure, delve, wayfinding, discoveries, fate, score, and Monster Index chronicle | Corridor geography, explorer bodies, monster behavior, replication |
| Corridor | The maze, ways, places, ground, ruin, overgrowth, atmosphere, landmarks, room discoveries, and traces | Party identity, encounter rules, session authority |
| Party | Membership, explorers, bodies, memory, presence, togetherness, carried discoveries, and signals | World topology, encounter outcomes, transport |
| Dread | Tension, lostness, isolation, hazards, hauntings, and the hunter | Render technique, browser UI, transport |
| Shared Expedition | Shared departure, journey continuity, stewardship, shared-world truth, rejoining, and the shared chronicle | Gameplay rules, world meaning, renderer objects |
