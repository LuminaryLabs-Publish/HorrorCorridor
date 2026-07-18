# HorrorCorridor Ceiling Fracture and Settled Rubble Proof

Status: bounded UX subject fixed; full room parity remains partial

## Outcome

The collapsed chamber ceiling now reads as a localized ruin rather than only a set of large clean slabs. The retained player view adds eight dark aperture-radial fracture paths, ten small chipped edge fragments, and three low settled-rubble clusters tied to the collapse. The central route remains clear.

This closes one UX subject only: fine ceiling fracture and small settled rubble. It does not claim full parity with `docs/visual-targets/horror-corridor-expedition-room-v2.png`. The reference still has substantially richer surface materials and overall detail density.

## UX Intent

- Enter the chamber and understand that the ceiling failed here, not that unrelated panels were placed overhead.
- Read the opening, radiating damage, chipped edge, and fallen material as one event while moving.
- Keep the breach threatening and visually broken without cluttering the route or hiding the far threshold.
- Preserve the previously accepted wet concrete, water response, generator silhouette, wall/ceiling overlap, gameplay, restart, and recovery flows.

## Natural Ownership

| Natural owner | Truth added or clarified | Atomic contract closed |
| --- | --- | --- |
| `Corridor / Ruin / Structure / Ceilings / Ceiling` | localized collapse, span, height | `break-ceiling-kit` |
| `Corridor / Ruin / Structure / Ceilings / Ceiling / Openings` | breach bounds, sky exposure, settled falling debris | `open-ceiling-kit` |
| `Corridor / Ruin / Decay / Cracking` | aperture-radial paths, widths, inactive movement | `propagate-crack-kit` |
| `Corridor / Ground / Rubble / Fallen Masonry` | collapse-edge clusters, pile heights, source, settlement, passability | `collapse-masonry-kit` |

No natural domain was added. These owners already existed in the canonical graph and already named the world truths required by this change.

## Core and Local Kit Composition

The retained composition reuses the installed NexusEngine substrate:

- world/scene/spatial cores carry place and placement;
- object/shape/fidelity cores carry neutral object structure;
- assets/graphics/presentation/output cores carry renderer-neutral visual intent;
- diagnostics/debug/capture cores expose proof.

Existing local capabilities do the target-specific work:

- `wound-triangle-mesh-domain-kit` emits the existing indexed convex-slab primitive;
- `collapsed-ceiling-object-kit` composes the reusable damaged-ceiling object;
- `brick-rubble-object-kit` and `debris-scatter-object-kit` provide existing fallen-material families;
- `furnish-chamber-kit` places those capabilities around the authored breach;
- the HorrorCorridor preset owns counts, scale, clearance, sky exposure, and material tuning;
- the Three.js host only realizes descriptors.

No new production kit was needed. The missing work was composition and state publication through existing contracts, not a missing neutral capability or a new reusable object family.

## Retained Implementation

- `ceilingCollapse.ts` publishes one immutable `horror-corridor.ceiling-collapse/1` state packet.
- The collapsed-ceiling object grew from 10 parts / 112 triangles to 26 parts / 240 outward-CCW triangles.
- The descriptor reports eight fracture paths and ten edge fragments.
- The room adds three small collapse-rooted rubble clusters while keeping `2.2` meters of route clearance.
- Natural state records 42 estimated pieces, average pile height `0.302`, maximum pile height `0.52`, `edge-settled` masonry, and no active falling movement.
- `fracture-shadow` is registered in the existing procedural material inventory instead of creating a fracture material kit.
- The Nexus runtime publishes the same truth at Ceiling, Ceiling/Openings, Decay/Cracking, Ground/Rubble, and Fallen Masonry paths.
- The live-control camera now commits scripted yaw and pitch to the authoritative player snapshot before a persistent agent session is held.

## Rejected Iterations

- The first rubble placement was too large and competed with the route, so all three clusters were reduced to low edge settlement.
- Fracture seams using the same broken-brick family as the banks were technically present but visually weak, so the retained seams use a restrained dark fracture-shadow family.
- The new material initially failed material-family coverage; it was registered in the existing procedural PBR inventory rather than bypassing the smoke gate.
- The first second-pass proof exposed a live-control race: movement committed, but the scripted look could be replaced by the last authoritative snapshot when held. Acceptance waited until camera changes were authoritative and the proof reran cleanly.
- The reconnect regression exposed a presentation race where transport status could label a still-disconnected recovery as already recovering. The Recovery screen now derives its main phase from Shared Expedition recovery truth, and the 13-gate rerun passes.

## Player-View Proof

Dedicated report: `docs/live-player-harness/ceiling-fracture-proof/report.json`

- created `2026-07-18T00:26:17.899Z`;
- status `passed` with every standard, Nexus, clean-view, descriptor, and fracture/rubble gate true;
- movement `2.7000` meters;
- yaw delta `0.32` radians;
- final upward pitch `0.261799` radians;
- zero console errors and zero bottom-left HUD pixels in all three views;
- 36 room props, 9 mesh objects, 22 masonry relief patches, 741 bricks;
- 26 collapsed-ceiling parts, 8 fracture paths, 10 edge fragments, 3 rubble clusters;
- all 359 mutable natural owners reset and replay deterministically.

Readability support metrics:

| Frame | Dark | Readable | Mean | Edge |
| --- | ---: | ---: | ---: | ---: |
| generated target | 45.84% | 17.08% | 22.89 | 18.01% |
| retained spawn | 20.34% | 32.71% | 30.29 | 5.15% |
| retained post-movement | 18.40% | 32.13% | 30.65 | 5.88% |
| retained upward look | 17.81% | 37.82% | 32.23 | 5.38% |

Human-view judgment: **Fixed** for the bounded fracture/rubble subject. The fractures, chipped breach, and settled debris remain visible from the dedicated route and upward views without blocking play. Full-room status remains **Partially Fixed** because the target's surface richness and edge density are still much stronger.

## Regression Result

Passing after the retained change:

- production build, lint, TypeScript, ProtoKit smoke;
- canonical headed live-player path;
- floor-material, wet-response, ceiling-overlap, and ceiling-fracture profiles;
- uninterrupted early-repel/full-scare/offer/Building-3 success path;
- authoritative capture and solo restart;
- two-page disconnect, rejoin, restored place, and post-recovery movement;
- domain blueprint and generated coverage checks.

Coverage now records 132 closed and 296 open behavior contracts. Only the four contracts in this document were promoted.

## Next Single UX Subject

Ceiling surface material identity is next: make the retained connected collapse read as damp, cracked, layered masonry rather than broad flat-color polygons. Reuse the existing natural ceiling truth, procedural material capabilities, preset tuning, and host boundary; do not add a material taxonomy or alias core.
