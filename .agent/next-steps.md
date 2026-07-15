# HorrorCorridor Next Steps

**Updated:** `2026-07-15T16-39-06-04-00`

## Summary

The next implementation should separate gameplay HUD route policy from terminal presentation. `PLAYING` must mount the objective, anomaly progress, held-item, player-status and minimap surfaces before the first admitted world/HUD frame, while settings and debug remain additive overlays.

## Plan ledger

**Goal:** implement one complete active-run HUD lifecycle with explicit mount generations, minimap binding, projection results and browser parity proof.

- [ ] Define `GameplayHudReadModel`, `HudPolicyRevision` and `HudMountGeneration`.
- [ ] Define the required surface set for accepted `PLAYING` independently from `COMPLETED`.
- [ ] Refactor `HUDOverlay` so the active branch does not return before required surfaces mount.
- [ ] Project objective text during active play.
- [ ] Project anomaly required sequence and occupied slots during active play.
- [ ] Project held-item state during active play.
- [ ] Project local player, room and session status during active play.
- [ ] Mount one minimap canvas for the accepted HUD generation.
- [ ] Bind `GameCanvas` minimap draw work to the admitted canvas generation instead of an unversioned DOM lookup.
- [ ] Keep settings and debug overlays additive without replacing base HUD surfaces.
- [ ] Define pointer-event policy for passive HUD and interactive controls.
- [ ] Publish `GameplayHudProjectionResult` with required and mounted surface receipts.
- [ ] Publish `FirstPlayingHudFrameAck` tied to route, snapshot, HUD and world-frame revisions.
- [ ] Retire the HUD generation on completion, lobby and title transitions.
- [ ] Reject late minimap and HUD work after route retirement.
- [ ] Add solo, host and client active-run HUD fixtures.
- [ ] Add settings/debug preservation rows.
- [ ] Prove source, development, production-build and deployed-origin parity.

## Checkpoints

```txt
Checkpoint A
  entering PLAYING mounts all required surfaces

Checkpoint B
  runtime-minimap exists before the first admitted minimap draw

Checkpoint C
  objective, sequence, held item and player status match accepted state

Checkpoint D
  settings and debug toggles do not remove the base gameplay HUD

Checkpoint E
  world and HUD acknowledgements reference the same route and snapshot revisions

Checkpoint F
  completion and route exit retire the prior mount exactly once

Checkpoint G
  source, production build and deployed origin produce matching receipts
```

## Retained work

Previous minimap DPR, audio, lifecycle, loading, protocol, movement, device-control, render and deployment findings remain open. This HUD authority must compose with rather than replace those boundaries.

## Do not claim

Do not claim active-run HUD availability, minimap availability, visual correctness or production parity until the fixture matrix passes.