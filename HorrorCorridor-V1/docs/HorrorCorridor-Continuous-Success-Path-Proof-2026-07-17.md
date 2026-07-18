# HorrorCorridor Continuous Success-Path Proof

Status: passing functional and player-view proof; visual parity remains partial

## Result

One headed system-Chrome expedition completed the entire success branch without resetting the page, browser, game, or seed:

```text
intro
  -> Building 1 / Still Guest seen
  -> early flashlight repel
  -> Still Guest studied / score 1
  -> Building 2 / Rust Mother seen
  -> full scare reaches blackout
  -> last chance opens
  -> flashlight repel after the full scare
  -> Rust Mother collected / score 2
  -> Red Thread claimed
  -> Building 3 entered
```

The refreshed post-recovery-regression action profile, created `2026-07-17T23:56:39.556Z`, completed in `39,859 ms`. Its transition trace still proves that the authoritative encounter initializes the forced blackout at exactly `3,000 ms` before frame sampling. Monster and offer identities are seed-driven, so later valid runs may collect a different roster entry or boon while preserving the same transition contract.

## Evidence

- Structured report: `docs/live-player-harness/success-path-proof/report.json`
- Initial player frame: `docs/live-player-harness/success-path-proof/starting-scene.png`
- Building 3 player frame: `docs/live-player-harness/success-path-proof/movement-scene.png`
- Runtime composition: `474` installs, `36` NexusEngine core kits, `73` local descriptor/behavior kits, `6` composition kits, `359` mutable natural owners, deterministic reset/replay.
- Browser gates: canvas, play state, action, luminance, prop count, texture count, light count, hidden play UI, no HUD icon chrome, and reset/replay all passed.
- Console errors: none.
- Final state: `encountersSurvived=2`, `buildingNumber=3`, Rust Mother `collected`, Still Guest `studied`, Red Thread `claimed`.
- Final streamed room: `streamedBuildingNumber=3`, 77 architectural surfaces, 33 props, 17 target textures, 9 wound-mesh objects, 3 target-local lights, 22 relief patches, 741 instanced bricks, 4 standing-water patches, 2 wet-ground patches, 6 water surfaces, 6 broken-reflection layers, and 10 collapsed-ceiling parts. The placed broken generator uses the retained 27-part / 708-triangle open-frame descriptor; the collapsed ceiling uses 112 indexed triangles.

## Reproduce

```bash
npm run validate:success-path
```

The profile automatically enables the live-control URL, searches for an open route when collision blocks forward travel, aligns the beam from the authoritative monster bearing, and records every phase transition in `action.proof.steps`.

## Harness Corrections Captured During Proof

- Near-wall jitter no longer counts as usable route progress; the route search rotates through open directions and logs each batch.
- Turn-dependent profiles automatically enable the live-control surface and fail clearly if it is absent.
- A transition that lands on the polling deadline is rechecked before being classified as a timeout.
- The browser proof no longer disables GPU acceleration, avoiding SwiftShader stalls in the dense Three.js room.

## Human-View Boundary

The first successful functional run exposed a nearly black, sparse Building 3 because building succession existed only in state. The room provider now streams the furnished chamber to every new authoritative building origin and aligns its route to the entry yaw. The replacement Building 3 frame is readable, enclosed, furnished, overgrown, and locally lit.

This does not establish full parity with `docs/visual-targets/horror-corridor-expedition-room-v2.png`. Physical brick courses, mortar gaps, omissions, and jagged edges are visible—most clearly in `docs/live-player-harness/masonry-relief-look-proof/movement-scene.png`. The separate `wet-reflection-proof` shows footprint-bound broken-light response, `generator-silhouette-proof` shows the accepted generator, `ceiling-overlap-proof` shows the accepted connected structural collapse, and `floor-material-proof` shows the accepted damaged wet-concrete floor. Wall/prop/ceiling materials remain flatter, several other prop silhouettes remain primitive, the wet layer is not a true reflected environment, fine ceiling fracture/rubble is sparse, and overall edge density is lower.
