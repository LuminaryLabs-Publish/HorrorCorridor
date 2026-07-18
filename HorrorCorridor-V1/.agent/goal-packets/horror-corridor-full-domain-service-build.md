# HorrorCorridor Full Domain-Service Build

Status: active

## Objective

Turn the canonical Horror Corridor Expedition composition into a current-NexusEngine-aligned executable game whose complete journey works smoothly and whose first room visibly converges on the generated target.

## Requirements

- Maintain an evidence-backed mapping from every target domain and kit to reused NexusEngine core behavior, implemented local behavior, host/proof wiring, or an explicitly open implementation gap.
- Install one readable root composition for Expedition, Corridor, Party, Dread, and Shared Expedition rather than running unrelated local manifests beside the game. The ordered-cube Anomaly Rite is retired from the active graph.
- Use NexusEngine reset, snapshot, deterministic tick, sequence, surface, and service patterns for stateful behavior.
- Preserve the existing host-authoritative snapshot and smooth imperative frame loop while domain ownership moves behind kit/service boundaries.
- Build the generated room target through domain-owned descriptors and reusable object/material/light/ecology kits, not hardcoded one-off Three.js scene decoration.
- Validate each promoted slice through the smallest meaningful headless proof, then smoke, live-player, and screenshot comparison when player-visible.
- Continue one UX-facing feature at a time until traversal, discovery, carry, offering, completion, restart, session recovery, dread, and environment presentation work together cohesively.
- Make the primary journey entrance -> effectively endless ruined-building delve -> monster encounter -> room offer -> next building, scored by encounters survived rather than elapsed duration.
- Make Monster Index collection scare-earned: reveal on sight, learn through early survival, collect only after surviving the creature's full characteristic scare.
- Implement the first stalker through domain-owned spatial signs, flashlight-beam repulsion, exact three-second proximity blackout, sub-ten-second last chance, and jumpscare defeat.
- Compose the 36 selected cores from pinned NexusEngine public commit `d41992636de2752f1ad9047b80701e6313f19b87` instead of recreating neutral contracts locally; do not mount unrelated exported cores without a consuming flow.
- Keep React/HTML, `GameShell`, `GameCanvas`, Three.js, Web Audio, PeerJS, and persistence adapters thin; they forward and realize domain truth but do not decide gameplay outcomes.

## Visual Target

- `docs/visual-targets/horror-corridor-expedition-room-v2.png`
- `docs/visual-targets/horror-corridor-expedition-room-v2.md`

## Completion Evidence Required

- Complete target-to-runtime coverage ledger with no unexplained architecture nodes.
- Passing installed-composition, dependency, reset, snapshot, replay, and deterministic-tick proof.
- Passing build, lint, typecheck, and package/export checks.
- Passing procedural smoke and full expedition gameplay proof.
- Fresh spawn, movement, and look screenshots showing the target room qualities without HUD/debug contamination.
- Frame/cadence evidence demonstrating smooth play rather than only functional completion.
- Reconciled exports, docs, parity audit, `.agent` state, and durable repo memory.
- Persistent-browser live-agent proof that ends on authoritative jumpscare defeat rather than a duration or default episode count.

## Current Evidence

- The active natural map contains 358 child domains, 1,085 states, 433 kit mounts/428 unique contracts, 59 services, 4 hosts, 6 proofs, and a maximum natural depth of 24. The generated coverage ledger is `.agent/domain-service-coverage.md`.
- `docs/live-player-harness/latest/report.json` passes installed composition, dependency order stability, snapshot, full mutable-domain reset, fixed-step replay after reset, fresh-runtime determinism, movement, clean-view, luminance, scene-density, and console gates.
- The current report proves 474 installs, 405 registered paths, 36 core kits, 73 local descriptor/behavior kits, 6 composition kits, and 359/359 mutable-domain reset with matching replay digests; the coverage ledger records 296 open behavior contracts.
- The target room is now realized through `furnish-chamber-kit` with 77 architectural surfaces, 36 composed props, 17 target textures, 9 wound-mesh objects, localized lighting, 22 masonry-relief patches, 741 instanced bricks, 6 wet surfaces/6 broken-light layers, and a 26-part / 240-triangle collapsed ceiling with 8 radial fracture paths, 10 edge fragments, 3 small settled-rubble clusters, 3 ceiling-material surfaces, 2 generated ceiling textures, and `0.32` shallow relief. Grounded route paving, organic enclosure, functional side clutter, physical brick relief, bounded wet response, structural ceiling overlap, fine fracture/rubble, and damp-spalled ceiling surface identity are accepted bounded slices; spawn/movement/look frames remain HUD-free and readable.
- `water-surface-domain-kit` owns terrain-bound standing-water material, ripple, and broken-reflection profiles. The renderer uses each irregular surface boundary as the reflection mask, removing detached cyan/amber scratches and containing a desaturated warm/cold response to the water footprint. `npm run validate:wet-reflection` passes across spawn, movement, and downward/side-look frames. This keeps `water-surface-kit` and `ripple-puddle-kit` closed without claiming `gather-puddles-kit` or natural Water/Puddles placement behavior.
- The broken-generator subject is accepted through existing ownership: Nexus object/shape/fidelity cores -> generic wound-mesh cylinders -> `broken-generator-object-kit` composition -> `furnish-chamber-kit` placement -> Three host realization. The final descriptor is 27 parts / 708 triangles and reads as an open-frame machine with flywheel, tank, engine, and exhaust in spawn and side-look frames. No new domain or alias kit was necessary.
- The bounded ceiling-fracture/rubble slice is accepted through existing natural Ceiling/Openings, Decay/Cracking, Ground/Rubble, and Fallen Masonry owners; existing object/shape/fidelity, wound-mesh, rubble/debris, furnished-room, material, and presentation capabilities; Nexus synchronization; and a three-view headed proof. It promotes `break-ceiling-kit`, `open-ceiling-kit`, `propagate-crack-kit`, and `collapse-masonry-kit` without adding a new domain, core, alias kit, or production kit. Human review still rejects full target parity: the floor, masonry relief, broken-light wet response, generator silhouette, structural ceiling, fracture/rubble, and ceiling surface are visible, but wall/prop materials remain flatter, remaining silhouettes remain coarse, no true reflected environment exists, and fine ruin density is lower than the target.
- The bounded ceiling-material slice is accepted through one `surface` state under the existing natural Ceiling owner, `furnish-chamber-kit` and preset tuning, existing terrain/object material capabilities, Nexus graphics/presentation cores, Three host realization, and a three-view headed proof. Map-like contour cracks, flat shader-only variation, and intact-only texture variation were rejected. The retained damp-concrete texture plus `ceiling-ruin` material gives intact and collapsed pieces a shared spalled masonry identity. No new domain, core, alias kit, or production kit was added.
- `docs/live-agent/runs/2026-07-17T18-42-11-807Z` proves seven real sequential Luna calls in one expedition, exact three-second monster blackout, last chance, jumpscare, and authoritative caught termination; `docs/HorrorCorridor-Live-Luna-Run-2026-07-17.md` records the timing chain.
- `docs/live-player-harness/success-path-proof/report.json` proves the continuous early-repel/full-scare-survival/collection/offer/Building-3 path with the expanded collapsed-ceiling/rubble room, one studied monster, one collected monster, a claimed room offer, and clean human-view gates.
- `docs/live-player-harness/restart-after-caught-proof/report.json` proves authoritative capture, the solo restart hero action, visible loading, new room/player identities, fresh run/Monster Index truth, resumed movement, clean human view, and deterministic 359-owner reset/replay in one headed flow.
- `docs/live-player-harness/reconnect-recovery-proof/report.json` proves two-page disconnect, preserved place, continued host authority, correlated authoritative recovery, Nexus recovery history, clean restored play, and post-recovery movement in one headed flow.
- This packet remains active because 296 contract-only/legacy/public-candidate behaviors, full target parity, streamed-room variation, cross-device transport proof, and final reconciliation are not complete. The next selected UX feature is industrial shelving silhouette identity.
