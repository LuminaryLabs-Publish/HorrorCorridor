# HorrorCorridor Endless Expedition Architecture

Status: active product and implementation contract

The operational domain-to-core-kit decision map is [HorrorCorridor-Natural-World-Kit-Map.md](./HorrorCorridor-Natural-World-Kit-Map.md). It is the agent ownership, no-duplicate-kit, adapter, proof, and promotion companion to this product contract.

## Product Contract

HorrorCorridor begins with a finite authored introduction, then opens into an effectively endless crawl through ruined horror buildings. The run score is the number of monster encounters survived. Buildings provide encounters, discoveries, and one room offer at a time. There is no duration victory and no arbitrary episode-count defeat.

The Monster Index is the collection game. Monsters are not captured through combat. A monster enters the Index only after the player deliberately experiences its characteristic scare and survives the correct response. Seeing a monster reveals it. Repelling it safely teaches part of its behavior. Surviving its full scare marks it collected.

The first complete encounter is a stalking monster:

1. It enters outside the player view and approaches while the player explores.
2. Positional footfalls, scrapes, knocks, or breathing communicate its bearing and nearness.
3. The player must listen, turn toward the sound, and hold the flashlight beam on the monster to drive it away.
4. Repelling it early survives the encounter but does not complete its collection ritual.
5. Letting it reach frightening proximity triggers its full scare: the flashlight is forced off for exactly three seconds.
6. The light returns with a final response window shorter than ten seconds.
7. Repelling it during that last chance survives the encounter and collects the monster.
8. Failing the last chance produces a player-visible jumpscare and ends the run.

Random flashlight flicker may warn and unsettle the player, but random darkness is not itself the loss condition. Defeat is owned by a monster encounter and its failed response.

## Player Flow

```text
authored entrance
  -> cross the first threshold
    -> enter endless delve
      -> enter a ruined building
        -> hear a monster before seeing it
          -> choose risk
            -> repel early
              -> survive, partially learn, continue
            -> allow the full scare
              -> three-second blackout
                -> find and repel during last chance
                  -> collect monster, survive, continue
                -> miss the response window
                  -> jumpscare, run ends
        -> receive or pass a room offer
          -> enter the next building
            -> repeat without a fixed run limit
```

## Natural Domain Shape

The map follows lived world boundaries. It does not create domains for reducers, timers, render passes, registries, managers, or file categories. A child exists only when it owns a narrower truth that can be reset, snapshotted, inspected, and changed independently.

```text
Horror Corridor Expedition
  Expedition
    Departure
    Delve
      Wayfinding
      Discovery
      Journey Traces
    Fate
    Chronicle
      Monster Index
        Monster Record
          Sighting
          Scare Lesson
          Collection Mark

  Corridor
    Maze
      Ways
      Places
        Entrance
        Passages
        Junctions
        Buildings
          Building
            Threshold
            Rooms
              Room
                Offering
        Heart
      Regions
    Ground
    Ruin
    Atmosphere
      Illumination
        Darkness
        Lamp Pools
        Flashlight Beam
      Acoustics
        Room Tone
        Echoes
        Footfalls

  Party
    Explorers
      Explorer
        Body
        Hands
        Carried Things
        View

  Dread
    Tension
    Lostness
    Isolation
    Haunting
    Hunter
      Creature
      Presence
        Signs
        Nearness
      Awareness
      Intent
      Territory
      Pursuit
      Encounter
        Approach
        Repulse
        Blackout
        Last Chance
        Capture

  Shared Expedition
    Shared Departure
    Shared Journey
    Stewardship
    Shared World
```

Important ownership boundaries:

- `Expedition` owns run phase, unbounded continuation, encounter score, and final resolution.
- `Delve` owns progress through buildings and the current destination, not wall meshes.
- `Corridor` and its place domains own world identity and authored/procedural place meaning.
- `Atmosphere/Illumination` owns light and darkness truth; it does not decide monster defeat.
- `Atmosphere/Acoustics` owns audible reach and spatial signs; it does not own browser audio nodes.
- `Hunter` owns the active monster's state, approach, and intent.
- `Hunter/Encounter` owns warning, beam response, blackout, last chance, and capture outcome.
- `Chronicle/Monster Index` owns learned and collected monster records. It does not own monster AI.
- Hosts realize descriptors in Three.js, Web Audio, React, PeerJS, and browser storage. Hosts do not decide gameplay outcomes.

## NexusEngine Core Reuse

The package version remains NexusEngine `0.0.3`, but HorrorCorridor pins the exact current public `main` commit `d41992636de2752f1ad9047b80701e6313f19b87`. That head includes the foliage placement-recipe binding fix needed by the installed vegetation core. The architecture follows the public ideal contracts for domains, kits, services, and composition.

The executable root installs 36 current core kits:

| Concern | NexusEngine owners | HorrorCorridor meaning |
| --- | --- | --- |
| Boot and composition | `core-startup-domain`, `n-core-platform-kit`, `n-core-composition-kit` | Playable readiness and the five top-level compositions |
| Durable truth | `n-core-data-kit`, `n-core-transaction-ledger-kit`, `n-core-persistence-kit` | Deterministic state, scare/collection history, restoration |
| World and place | `n-core-world-kit`, `n-core-scene-kit`, `n-core-spatial-kit`, `n-core-skybox-kit` | Corridor partitions, room lifecycle, monster bearings, atmosphere |
| Objects and growth | `n-core-object-kit`, `core-object-shape-domain`, `core-object-fidelity-domain`, `n-core-vegetation-kit` | Ruin props, wound meshes, fidelity profiles, overgrowth |
| Embodied play | `n-core-input-kit`, `n-core-creature-kit`, `n-core-character-kit`, `n-core-player-kit`, `n-core-motion-kit`, `n-core-physics-kit` | Explorer possession, monsters, movement, physical intent |
| Runtime rules | `n-core-simulation-kit`, `n-core-interaction-kit`, `n-core-animation-kit` | Pressure, response windows, beam contact, scare animation intent |
| Presentation | `n-core-assets-kit`, `n-core-graphics-kit`, `n-core-camera-kit`, `core-camera-framing-kit`, `core-presentation-domain`, `core-presentation-output-kit`, `n-core-ui-kit`, `core-ui-scale-kit` | Renderer-neutral visual, camera, output, and overlay contracts |
| Sound and sharing | `n-core-audio-kit`, `n-core-network-kit` | Directional signs and authoritative multiplayer state |
| Proof | `n-core-diagnostics-kit`, `n-core-debug-kit`, `core-capture-domain` | Evidence, inspection, and browser captures |

Not every exported core belongs in this game. `n-core-agent-kit`, `core-compute-domain`, `n-core-headless-editor-kit`, `n-core-mlnn-kit`, `n-core-policy-kit`, `n-core-graphics-reflection-kit`, `core-speech-domain`, and `n-core-utility-kit` remain uninstalled because no current player flow consumes them. The current puddles use a boundary-masked stylized broken-light layer; reflection becomes a candidate only when the render host adopts a real planar, probe, or screen-space wet-surface contract.

Core capabilities are never reimplemented locally merely to rename them. A local atomic kit is justified only when it installs one reusable HorrorCorridor rule over explicit core capabilities. `stage-stalker-approach-kit` joins creature, character, spatial, audio, simulation, and diagnostics state. `repel-monster-with-beam-kit` joins graphics, spatial, interaction, and simulation state. Neither creates a renderer, audio engine, clock, registry, or network transport.

## HorrorCorridor Composition Kits

Each top-level domain gets one readable executable composition kit. Each kit requires its complete natural child-domain branch, records the branch's target behavior contracts, and provides one stable composition capability to the root. These are small assembly boundaries, not giant managers.

```text
horror-corridor-game-kit
  horror-expedition-kit
    begin-expedition-kit
    open-endless-delve-kit
    score-survived-encounter-kit
    resolve-expedition-kit
    remember-monster-scare-kit

  horror-corridor-world-kit
    shape-seeded-corridor-kit
    open-building-kit
    furnish-room-kit
    offer-room-boon-kit

  horror-party-kit
    embody-explorer-kit
    move-explorer-kit
    carry-discovery-kit

  horror-dread-kit
    stage-stalker-encounter-kit
    signal-monster-nearness-kit
    repel-monster-with-beam-kit
    force-monster-blackout-kit
    open-last-chance-kit
    resolve-monster-capture-kit

  horror-shared-expedition-kit
    replicate-expedition-kit
    preserve-host-truth-kit
    recover-shared-run-kit
```

Atomic local kits compose core capabilities rather than replacing them. For example, `stage-stalker-encounter-kit` uses core creature/character state, core spatial transforms, core audio descriptors, core simulation pressure, and core diagnostics. `repel-monster-with-beam-kit` bridges the Illumination and Hunter services through core interaction and spatial queries. Neither kit creates its own renderer, audio engine, clock, object registry, or network transport.

World, object, and presentation kits remain below these branch compositions. `n-core-world-kit`, `n-core-scene-kit`, `n-core-spatial-kit`, and `n-core-skybox-kit` cover neutral world and scene-loading contracts. Object, shape, fidelity, and vegetation cores cover neutral object realization. Asset, graphics, camera, presentation, output, and UI cores cover renderer-neutral presentation. Local object kits only describe reusable HorrorCorridor objects; `furnish-chamber-kit` only composes their placement; the Three.js host only realizes the resulting descriptors.

The former ordered-cube Anomaly Rite is retired from the active domain graph. Compatibility fields may remain in the old replicated snapshot until networking cleanup, but they do not own the current objective, receive player interaction, or appear as a top-level composition. Monster encounters, the Index, score, and optional room offers are the active progression.

## Thin Host Rule

`GameShell.tsx`, `GameCanvas.tsx`, and future game HTML are assembly hosts only.

They may:

- create and dispose the HorrorCorridor root composition
- forward browser input into the input service
- forward animation deltas into the engine tick
- bind Three.js, Web Audio, React, PeerJS, and storage adapters
- render snapshots and descriptors

They must not:

- choose monsters
- advance approach pressure
- decide whether the flashlight beam hit
- own blackout or last-chance clocks
- award Monster Index collection
- decide encounter victory or run defeat
- generate room offers inside JSX or renderer loops

The target host flow is:

```text
browser input -> input service -> HorrorCorridor domain kits -> authoritative snapshot
authoritative snapshot -> graphics/audio/UI descriptors -> browser host adapters
```

## Multi-Agent Ownership

The top-level domain composition is the stable work boundary for concurrent agents. An agent may deepen one natural branch and its kits without inventing a parallel game loop.

- Expedition agent: run phase, building progress, score, fate, chronicle.
- Corridor agent: world/building/room place truth and provider descriptors.
- Dread agent: monster state, signs, approach, beam response, blackout, capture.
- Party agent: explorer body, view, input intent, carried discoveries.
- Presentation agent: descriptor-to-Three/Web-Audio/React adapters only.
- Shared Expedition agent: replication, host authority, recovery.
- Proof agent: reset, snapshot, replay, browser, audio-state, and player-view evidence.

All agents target the same root composition and declared services. No agent should add gameplay decisions directly to the HTML, canvas host, renderer, audio adapter, or transport.

## Acceptance Flow

The first vertical slice is accepted only when a real player can:

1. leave the intro and enter the crawl
2. accumulate a survived-encounter score without a duration cap
3. hear a monster approach from a meaningful direction
4. turn and reveal it with the flashlight
5. repel it early and see an incomplete Index record
6. deliberately allow its full scare and observe a three-second blackout
7. repel it within the sub-ten-second last chance and collect it
8. fail a later last chance, receive a jumpscare, and end the run
9. begin another solo expedition through a fresh authoritative departure rather than a client lobby
10. lose a shared client connection, preserve the last place, rejoin the same authority, and continue moving
11. inspect the Monster Index only on demand, with no persistent play HUD
12. let the live agent continue across sequential calls until that same game-owned defeat state occurs

## Current Proof Boundary

- The canonical active graph has 358 child domains, 1,085 owned truths, 433 kit mounts/428 unique contracts, 59 services, 4 hosts, 6 proofs, and maximum natural depth 24.
- The browser runtime installs 36 current NexusEngine cores, 73 local descriptor/behavior kits, 359 natural state owners, and 6 composition kits: 474 installs over 405 registered paths.
- Reset/replay proof resets all 359 owners to revision zero and reproduces the same fixed-step result after reset and on a fresh runtime.
- The current room manifest contains 77 architectural surfaces, 36 composed props, 17 target texture descriptors, 9 wound-mesh objects, and 3 target-local lights. Twenty-two broken-brick patches realize 741 deterministic instanced bricks. Four standing-water patches and two wet-ground films realize 6 footprint-bound broken-light layers. Two industrial racks contribute 82 parts / 1,360 indexed triangles / 38 stored-object parts. The collapsed-ceiling object contributes 26 parts / 240 indexed triangles, 8 fracture paths, 10 chipped edge fragments, and 3 small collapse-rooted rubble clusters. Three ceiling-material surfaces and two generated textures realize damp-spalled masonry with `0.32` relief. Fresh spawn, movement, floor/wet side-look, generator/shelving side-look, and ceiling fracture/material upward-look gates pass with no visible play UI and zero console errors.
- The neutral wound-mesh descriptor boundary supports explicit indexed cylinders on `x`, `y`, and `z`. `broken-generator-object-kit` composes those primitives into a 27-part / 708-triangle open-frame machine; `industrial-shelving-object-kit` composes them with existing boxes/trapezoids into a 41-part / 680-triangle two-bay rack with 19 stored forms. `furnish-chamber-kit` only supplies room placement/scale, and the Three host only realizes descriptors. This reuses installed object/shape/fidelity cores and introduces no natural domain, alias kit, or duplicate production kit.
- The headed-Chrome success proof runs intro, early repel/study, later full-scare survival/collection, room-offer claim, and Building 3 entry in one uninterrupted `34,962 ms` expedition. The retained seed collects The Still Guest and claims Salt Chalk; monster/offer identity may vary while the transition contract remains fixed. The seven-call real Luna run separately proves intro, directional approach, exact blackout, last chance, jumpscare, and authoritative loss in one persistent expedition.
- The headed-Chrome restart proof follows a real Still Guest capture into `COMPLETED`, presents one **Begin another expedition** hero action, visibly crosses `LOADING`, creates new room/player identities, restores phase/building/score/Index truth to a fresh intro, and proves `3.7602` units of movement. `beginSoloExpedition` owns the departure transaction; React only resets adapters and applies its authoritative bootstrap.
- The headed two-page Shared Expedition proof disconnects a moving client, preserves tick/place, keeps host authority advancing from tick 39 to 54, displays clear disconnect/recovering states, correlates one recovery request to authoritative tick 59, restores identical room/game/seed/player/place truth, records Rejoining and Shared Chronicle history, and proves `2.25` units of movement after recovery with zero console errors.
- The furnished chamber is streamed and reoriented at each authoritative building entry instead of cloning hundreds of meshes across the maze. Building 3 reports its own streamed origin and is visibly furnished in the final player frame.
- The slice is not fully accepted yet: 296 behavior contracts remain open; cross-device PeerJS recovery is unverified; and wall/prop surface wear, true reflection, remaining-object, and overall edge/detail fidelity remain below the V2 generated room reference. Solo restart, same-origin shared recovery, masonry relief, bounded broken-wet response, generator and industrial-shelving silhouettes, structural ceiling/wall overlap, fine fracture/rubble, wet-concrete floor identity, and damp-spalled ceiling identity are proven subjects, not full-game or full-room parity. Industrial shelving corrosion and wear identity is the next one-feature visual lane.
