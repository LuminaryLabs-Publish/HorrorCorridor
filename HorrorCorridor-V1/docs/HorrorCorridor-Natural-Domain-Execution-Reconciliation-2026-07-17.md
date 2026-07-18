# HorrorCorridor Natural Domain and Execution Reconciliation

Status: active architecture and implementation truth

## Outcome

The current HorrorCorridor composition is a deliberate natural-world deepening of the original 612-line objective, not a literal copy of its first domain names. The graph is internally synchronized and every current state owner is installed, resettable, and snapshot-capable. That does not mean every behavior is implemented.

| Surface | Domains | States | Kit mounts | Services | Hosts | Proofs |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Original objective | 107 | 327 | 160 | 6 | 4 | 4 |
| Current canonical composition | 358 children plus root | 1,085 | 433 / 428 unique | 59 | 4 | 6 |
| Current executable behavior | 359 state owners | 359 reset/snapshot owners | 132 closed / 296 open | partial | 4 adapters | 6 declared gates plus feature proofs |

`npm run domain:check` and `npm run domain:coverage:check` prove the current tree, generated blueprint, runtime evidence, and coverage ledger agree. `.agent/domain-service-coverage.md` remains the contract-by-contract truth surface.

## Natural Mapping Rule

- A domain is a recognizable world subject or lived system with coherent truth, meaning, reset, snapshot, inputs, outputs, and relationships.
- Deepen top-down by asking which natural subjects must exist inside the parent. Repeat only while a child owns independently meaningful truth.
- Stop when another layer would only name an algorithm, object part, category, manager, renderer, adapter, kit, service, or proof.
- Attach atomic behavior as a short verb-based kit. Expose controlled cross-domain operations as services. Keep browser, Three.js, Web Audio, PeerJS, and storage work in hosts.
- A leaf does not need a kit merely to look complete. A kit does not become a domain merely because its implementation has internal steps.
- Give each top-level natural branch one thin composition kit, then mount atomic child kits at the natural owner whose truth they change. Object, material, audio, camera, and scene-loading kits remain reusable capabilities; they do not become parallel world taxonomies.
- Before creating a local kit, ask which installed NexusEngine core capabilities already supply the neutral behavior. A local kit should only join those cores into one HorrorCorridor-specific verb or reusable descriptor contract.

The stable multi-agent ownership tree is:

```text
Horror Corridor Expedition composition
+-- Expedition                 run phase, delve progress, score, fate, chronicle
+-- Corridor                   passages, buildings, rooms, ruin, ground, atmosphere
+-- Party                      explorers, bodies, hands, carried things, shared signals
+-- Dread                      tension, haunting, hunter, encounter and capture
+-- Shared Expedition          authority, shared world, leaving, rejoining, recovery
+-- browser-game-host          React, input, UI and storage adaptation
+-- three-world-host           descriptor realization and camera/render adaptation
+-- peer-transport-host        transport and serialization adaptation
`-- headless-proof-host        deterministic, browser and visual proof adaptation
```

## Original-to-Current Reconciliation

Most original names were normalized rather than omitted:

| Original objective | Current natural owner | Meaning preserved |
| --- | --- | --- |
| Journey | Delve | movement through successive buildings |
| Route Memory | Wayfinding | learned ways, landmarks, doubt and return knowledge |
| Journey Outcome | Fate | continuing, caught and final resolution |
| Run Chronicle | Chronicle | run, encounter and Monster Index history |
| Route Network | Ways | passages, junctions and building succession |
| Debris Field | Rubble | fallen material and obstruction truth |
| Standing Water | Water | depth, wetness, flow and reflection intent |
| Ecology | Overgrowth / Habitat | natural growth and environmental relationships |
| Lighting | Illumination | darkness, lamp pools and flashlight beam truth |
| Soundscape | Acoustics | room tone, echoes, footfalls and monster signs |
| Roster / Cohesion / Communication | Gathering / Togetherness / Signals | party membership and coordination |
| Threat | Hunter | creature, presence, awareness, intent and pursuit |
| Disturbance | Haunting | apparitions, whispers and shifting ways |
| Session | Shared Expedition | authority, shared state, leaving and rejoining |
| Connection Continuity | Rejoining | loss, recovery and restored place |

The genuine divergence is the original 12-domain ordered Anomaly objective branch. It was explicitly superseded by later product direction: monster encounters, scare-earned Monster Index collection, encounter score, and optional room offers now own progression. Old anomaly snapshot fields remain compatibility-only until networking cleanup. They are not evidence that the retired objective is still active.

## Core Kits Versus Local Kits

HorrorCorridor pins NexusEngine public commit `d41992636de2752f1ad9047b80701e6313f19b87` and installs 36 consumed cores.

| Neutral capability | Reused NexusEngine owners | HorrorCorridor-only composition |
| --- | --- | --- |
| startup and composition | startup, platform, composition cores | five top-level domain composition kits |
| durable truth | data, ledger, persistence cores | encounter, score, Index and room-offer records |
| world and space | world, scene, spatial, skybox cores | ruined-building places and streamed chamber descriptors |
| objects and growth | object, shape, fidelity, vegetation cores | broken-city presets, wound meshes and overgrowth placement |
| embodied play | input, creature, character, player, motion, physics cores | explorer and monster rules |
| runtime behavior | simulation, interaction, animation cores | approach, flashlight repulsion, blackout and capture |
| presentation | assets, graphics, camera, framing, output and UI cores | HorrorCorridor descriptors and minimal play UI |
| sound and sharing | audio and network cores | spatial monster cues and authoritative expedition snapshots |
| evidence | diagnostics, debug and capture cores | reset/replay, live-player, success/loss and visual gates |

The reusable split is intentional: world/scene/spatial/skybox cores own neutral place and loading contracts; object/shape/fidelity/vegetation cores own reusable object and growth contracts; assets/graphics/camera/presentation/output/UI cores own renderer-neutral presentation contracts. HorrorCorridor composition kits only connect those capabilities to ruined buildings, monster rules, room offers, and target-specific descriptors.

Local kits are justified only for one reusable HorrorCorridor behavior or descriptor contract that the core does not already own. Agent, compute, headless editor, MLNN, policy, graphics reflection, speech, and utility cores remain uninstalled because no current player flow consumes them. The current water layer is a masked stylized light response, not planar, probe, or screen-space reflection, so it does not consume the reflection core.

## Current Visual Slices

Target: `docs/visual-targets/horror-corridor-expedition-room-v2.png`.

### Masonry relief

The original failure was shader-colored brick boxes with almost no physical course depth. Existing `broken-brick` boundary and masonry descriptors now realize deterministic `InstancedMesh` courses in the Three.js host. Stagger, seeded omissions, depth jitter, small rotations, dark mortar backing, and restrained tint produce 22 relief patches and 741 instanced bricks across the current 77-surface architectural composition.

Rejected and removed during the masonry screenshot loop:

- a bright green fake threshold plane that read as a luminous wall;
- a dark two-plane threshold illusion that occluded the movement path;
- a 7.2-meter room compression that pushed the standard movement proof outside the authored room.

### Broken wet response

The next bounded failure was detached cyan/amber scratches floating over matte gray-brown floor patches. `water-surface-domain-kit` and `furnish-chamber-kit` already owned the correct reusable behavior and authored placement, so no new domain, alias kit, or Nexus reflection core was added.

The retained implementation:

- realizes 4 standing-water patches and 2 quieter wet-ground films as physical clearcoat materials;
- uses the same seeded irregular boundary for the water body and its full-footprint light-response mask;
- darkens and desaturates the water palette while keeping restrained warm/cold environmental cues;
- reports 6 water surfaces and 6 broken-reflection layers in live debug state;
- leaves `gather-puddles-kit` open because visual descriptors do not synchronize natural Water/Puddles runtime truth.

Rejected and removed during the wet screenshot loop:

- a 2-second movement proof that left the 14-meter authored chamber;
- broad high-opacity fragments that looked like glowing paint;
- an 800 ms variant whose moved frame failed the readability gate.

### Broken generator silhouette

The next bounded failure was a small amber rectangular hood that did not read as the ruined generator shown in the target. The existing ownership chain was already sufficient:

```text
Nexus object + object-shape + object-fidelity cores
  -> wound-triangle-mesh-domain-kit generic indexed primitives
    -> broken-generator-object-kit functional silhouette composition
      -> furnish-chamber-kit target-room placement and scale
        -> Three.js wound-mesh host realization
```

No natural domain, alias kit, renderer-only generator branch, or new Nexus core was added. The generic wound-mesh owner gained explicit indexed cylinders along `x`, `y`, and `z`; the object kit composes those neutral primitives with existing boxes and trapezoids. The generator changed from 17 parts / 204 triangles to 27 parts / 708 outward-CCW triangles and now exposes two runners, braces, frame posts, a round generator drum, flywheel rim/face/hub/spokes, engine block and cooling fins, horizontal tank and bands, exhaust stack, controls, socket, and cable.

Rejected during the generator screenshot loop:

- the first full-room placement at `1.55` scale, which overfilled the left foreground;
- the smooth dark flywheel face, which read more like a boiler than a broken machine;
- treating the isolated `--no-codex` mock score as acceptance. Those isolated captures are comparison support only; player-view human inspection and the real headed proof decide promotion.

The retained room scale is `1.28`, the flywheel has visible spokes, and the main route remains unobstructed. Human-view status for this bounded subject is **Fixed** in spawn and side-look context. Material treatment remains intentionally open under the full-room visual goal.

### Natural ceiling and wall overlap

The next bounded failure was a mechanically layered upper boundary: broad parallel boxes floated over one another and left a rectangular sky opening. The natural owner remains `Corridor / Ruin / Structure / Ceilings / Ceiling / Openings / Collapse`; the visual need did not justify a new domain, scene loader, renderer, or ceiling alias core.

The retained ownership chain is:

```text
Nexus object + object-shape + object-fidelity cores
  -> wound-triangle-mesh-domain-kit generic convex-slab primitive
    -> collapsed-ceiling-object-kit reusable ruin-object descriptor
      -> furnish-chamber-kit target placement
        -> world/scene/spatial and graphics/presentation descriptors
          -> Three.js host realization
```

The shared wound-mesh seam now emits closed, positive-thickness convex slabs with explicit indexed top, bottom, and side faces. The initial accepted structural slice composed 10 parts / 112 outward-CCW triangles into six wall/shelter-rooted collapse banks, two inner fangs, and two embedded steel remnants. Its room manifest reported 77 architectural surfaces, 33 props, 9 mesh objects, and 10 collapsed-ceiling parts before the later fracture/rubble deepening.

Rejected and removed during the screenshot loop:

- box-fragment teeth and crossbars that made the ceiling denser but more mechanical;
- a dominant central wedge with exposed rectangular undersides;
- large parallel wedge panels that still appeared suspended;
- four-sided triangular prisms that read as hanging fingers instead of broken structure.

The retained three-view profile moves into the room, captures the route, then looks `0.32` radians sideways and `0.34` radians upward. All three views are readable and HUD-free; movement is `3.1329`, final pitch is `0.261799`, and there are zero console errors. Human-view status is **Fixed** for the bounded structural-overlap subject: the collapse now reads as one connected irregular opening rooted into the side walls and shelter. Fine fracture density, small rubble, surface damage, and material parity remain open under the full V2 goal.

### Fine ceiling fracture and settled rubble

The next selected failure was the remaining clean-polygon read: the connected collapse had correct broad structure but too little small-scale breakage, and fallen material did not visibly belong to the breach. Natural ownership already existed across `Ceiling`, `Ceiling / Openings`, `Decay / Cracking`, and `Ground / Rubble / Fallen Masonry`. The selected Nexus world/scene/spatial, object/shape/fidelity, graphics/presentation, and proof cores plus the existing wound-mesh, ceiling-object, rubble/debris, furnishing, and material capabilities already covered the reusable work.

No new domain, core, alias kit, production kit, renderer branch, or broad damage category was added. Pure `ceilingCollapse.ts` state now publishes localized stability, breach bounds, sky exposure, settled falling debris, aperture-radial crack paths and widths, collapse-edge rubble, pile heights, route clearance, fallen-material source, and edge settlement. `collapsed-ceiling-object-kit` now composes 26 parts / 240 outward-CCW triangles with 8 dark fracture paths and 10 chipped edge fragments. `furnish-chamber-kit` places 3 small collapse-rooted clusters using existing brick-rubble and debris capabilities.

Rejected during the screenshot and regression loop:

- oversized rubble that competed with the route;
- broken-brick fracture seams that were present but visually too weak;
- bypassing material-family coverage instead of registering `fracture-shadow` in the existing inventory;
- accepting a proof where a scripted camera change could be replaced by the last authoritative snapshot;
- accepting a reconnect regression where transport status prematurely changed the Recovery heading.

The retained `ceiling-fracture` profile passes movement `2.7000`, authoritative yaw delta `0.32`, upward pitch `0.261799`, all descriptor/Nexus gates, all three HUD-free/readable views, deterministic reset/replay, and zero console errors. Human-view status is **Fixed** for this bounded subject. Support edge metrics improve the ceiling read but remain roughly `5.15-5.88%` in current frames versus `18.01%` in the generated target, so full-room status remains **Partially Fixed**.

Evidence: `docs/HorrorCorridor-Ceiling-Fracture-Rubble-Proof-2026-07-17.md` and `docs/live-player-harness/ceiling-fracture-proof/`.

### Ceiling surface material identity

The next bounded failure was the uniform paper-like material shared by otherwise-correct ceiling geometry. Natural ownership already existed at `Corridor / Ruin / Structure / Ceilings / Ceiling`. One `surface` state now records reinforced-concrete-and-brick construction, damp concrete, exposed broken brick, damp-spalled condition, aggregate/seam pattern, mineral bloom, moss strength, roughness, and shallow relief. Structural crack truth remains under `Decay / Cracking`.

No new domain, Nexus core, alias kit, or production kit was added. `furnish-chamber-kit` and the HorrorCorridor preset feed existing terrain/object material capabilities, wound-mesh/collapsed-ceiling descriptors, Nexus assets/graphics/presentation cores, and the Three host. Intact shelters use deterministic damp-concrete texture/grain maps; collapsed pieces use the `ceiling-ruin` procedural material and shallow normal response.

Human review rejected three variants: large black floor-style contours that read like a topographic map, mottled shading that remained flat, and an intact-surface texture pass that left collapsed pieces visually disconnected. The retained three-view profile passes movement `2.2473`, authoritative yaw `0.32`, upward pitch `0.261799`, exact descriptor/Nexus agreement, 3 material surfaces, 2 generated textures, `surfaceRelief=0.32`, three readable/HUD-free views, reset/replay, and zero console errors.

Human-view status is **Fixed** for this bounded surface subject and **Partially Fixed** for the full room. Current edge density remains roughly `4.93-5.73%` versus `18.01%` in the generated target.

Evidence: `docs/HorrorCorridor-Ceiling-Material-Identity-Proof-2026-07-17.md` and `docs/live-player-harness/ceiling-material-proof/`.

Evidence:

- Spawn and movement: `docs/live-player-harness/latest/`
- Masonry side look: `docs/live-player-harness/masonry-relief-look-proof/`
- Wet spawn/movement/downward-side look: `docs/live-player-harness/wet-reflection-proof/`
- Generator spawn/side look: `docs/live-player-harness/generator-silhouette-proof/`
- Ceiling spawn/route/upward look: `docs/live-player-harness/ceiling-overlap-proof/`
- Fine fracture and settled rubble: `docs/live-player-harness/ceiling-fracture-proof/`
- Ceiling surface material: `docs/live-player-harness/ceiling-material-proof/`
- Generator isolated capture support: `testing/object-kits/broken-generator/runs/2026-07-17-after-silhouette/`
- Continuous Building 3 success: `docs/live-player-harness/success-path-proof/`
- Solo capture/restart: `docs/live-player-harness/restart-after-caught-proof/`
- Shared disconnect/recovery: `docs/live-player-harness/reconnect-recovery-proof/`
- Canonical report: created `2026-07-18T01:10:07.787Z`, passing with zero console errors, `movementDelta=6.0057`, readable/HUD-free spawn and moved views, 474 installs, 73 local descriptor/behavior kits, 22 relief patches, 741 bricks, 6 water surfaces, 6 broken-reflection layers, 36 props, 26 collapsed-ceiling parts, 8 fracture paths, 10 edge fragments, 3 rubble clusters, 3 ceiling-material surfaces, and 2 generated ceiling textures.
- Generator report: created `2026-07-17T21:09:00.821Z`, passing at `yawDelta=1.05`; spawn and side-look center crops average `27.62` and `26.58`, and both have zero bottom-left HUD pixels.
- Wet report: created `2026-07-18T01:11:37.170Z`, passing with `movementDelta=5.0571`, `yawDelta=0.7`, `pitchAfter=-0.259833`; all three views are HUD-free and pass the harness readability gates.
- Ceiling-overlap report: created `2026-07-18T01:10:52.816Z`, passing with `movementDelta=2.9979`, `yawDelta=0.32`, `pitchAfter=0.261799`; all three views are HUD-free and pass the harness readability gates.
- Ceiling-fracture report: created `2026-07-18T01:10:30.482Z`, passing with `movementDelta=2.9997`, authoritative `yawDelta=0.32`, `pitchAfter=0.261799`, 26 ceiling parts, 8 fracture paths, 10 edge fragments, 3 rubble clusters, and zero HUD/console contamination.
- Ceiling-material report: created `2026-07-18T01:06:49.544Z`, passing with `movementDelta=2.2473`, `yawDelta=0.32`, `pitchAfter=0.261799`, 3 material surfaces, 2 generated textures, `0.32` relief, and three readable/HUD-free views.
- Success report: created `2026-07-18T01:12:00.470Z`, passing in `34,962 ms` with score 2, The Still Guest collected, a claimed Salt Chalk offer, and matching Building 3 streamed room.
- Restart report: created `2026-07-18T01:12:57.231Z`, passing in `45,511 ms` from authoritative capture through the terminal hero action and visible loading into new room/player identities, fresh intro/score/Index truth, and `4.05` units of resumed movement.
- Shared recovery report: created `2026-07-18T01:14:04.104Z`, passing in `20,008 ms` across two headed pages. Host authority advances while the client is absent; correlated recovery restores the same room/game/seed/player with zero position disagreement; all 13 gates and all three human-visible recovery states pass.
- Lighting audit: canonical, generator, wet, ceiling, floor, and success frames pass without lowered thresholds. The refreshed canonical moved crop records `darkRatio=0.0180`, `lightRatio=0.7276`, and zero HUD pixels.

### Wet concrete floor identity

The next bounded failure was a generic, mechanically partitioned ground surface that did not read as damaged poured concrete. Natural ownership already existed at `Corridor / Ground / Surface / Paving / Concrete / Slabs / Slab`, and the selected Nexus world/scene/spatial plus assets/graphics/presentation cores already owned the neutral substrate. No new domain, core, alias kit, or renderer-owned gameplay rule was needed.

Pure `concretePaving.ts` state now publishes concrete area, aggregate exposure, moisture, `settled-pour-field` slab membership/alignment, a weathered body, `settlement-branching` cracks, displacement, relief, repairs, and wetness. The existing terrain shader and wet-concrete descriptor capabilities consume that truth; the Three.js host realizes it. The three-view headed proof passes all 18 gates with zero console errors and zero HUD pixels, movement `3.1329`, `yawDelta=0.32`, `pitchAfter=-0.261799`, and readable luminance in every frame. This promotes `settle-slabs-kit` and `crack-slab-kit`.

Rejected and removed during the floor loop: a reserved GLSL identifier, oversized dotted/rail patterns, a uniform mechanical grid, dominant looping fractures, an empty-dark entry view, and a proof route that exposed unrelated outdoor/cable content.

Evidence: `docs/HorrorCorridor-Floor-Material-Identity-Proof-2026-07-17.md` and `docs/live-player-harness/floor-material-proof/`.

Human-view status: **Fixed** for the bounded generator, industrial-shelving silhouette, structural ceiling-overlap, fine ceiling-fracture/settled-rubble, wet-concrete floor, and ceiling-surface subjects and **Partially Fixed** for the full V2 room. Physical brick depth, footprint-bound broken-light response, two recognizable functional prop silhouettes, a connected/chipped upper collapse, small fallen material, readable damaged concrete, and damp-spalled ceiling identity are visible. The wet layer remains a stylized masked response rather than a true reflected environment, and wall/prop surface identity, remaining prop silhouettes, and target edge/detail density remain substantially stronger in the reference.

## Shared Expedition Recovery Slice

`Shared Expedition / Rejoining` now owns a pure connection-loss transaction: preserved last-known place, correlated recovery request, restored authoritative place, and bounded recovery history. `Shared Chronicle` records the same `disconnected -> reconnecting -> restored` history. React, the transport adapters, and the renderer remain thin: they display the state, carry the request, and publish/apply host truth.

The headed two-page proof promotes `peer-session-kit`, `sustain-shared-expedition-kit`, `share-world-snapshot-kit`, `reconcile-world-snapshot-kit`, `rejoin-party-kit`, and `record-shared-session-kit`. Same-origin browser recovery is fixed for this slice; cross-device PeerJS behavior remains unverified.

## Next Highest-Quality Work

1. Resume visual convergence one bounded subject at a time, beginning with industrial shelving corrosion and wear identity, then other wall/prop material identity, remaining prop silhouettes, true reflection if a real consuming contract is selected, and overall edge density.
2. Continue closing the remaining 296 contracts one natural branch at a time; never count generic state installation as behavior completion.
3. Add cross-device PeerJS recovery proof only when that transport surface becomes the selected UX slice; reuse Rejoining truth rather than creating a second recovery model.
