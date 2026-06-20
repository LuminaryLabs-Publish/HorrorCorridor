You are the HorrorCorridor final visual gate.

Compare the attached reference image to the attached current player-view screenshot.
Judge only what is visible. Do not give credit for code, object counts, debug counters, architecture, or intended behavior.

Attempt: 1
Reference image path: docs/visual-review/runs/2026-06-19T22-11-54-402Z-plan-test/reference/reference.png
Current screenshot path: docs/visual-review/runs/2026-06-19T22-11-54-402Z-plan-test/attempts/attempt-001/capture/starting-scene.png
Live-player report path: docs/visual-review/runs/2026-06-19T22-11-54-402Z-plan-test/attempts/attempt-001/capture/report.json

Score the current screenshot against the reference with this rubric:
- identityMatch: object/scene identity and intended genre target.
- silhouetteGeometry: mesh shapes, scale, object profile, and non-placeholder geometry.
- materialPbr: material believability, PBR response, grime, corrosion, wetness, roughness, and normal-map feel.
- textureDetail: visible texture resolution, triplanar fit, surface breakup, and lack of broad flat slabs.
- lightingReadability: readable darkness, floor/wall separation, local light shaping, and no crushed black.
- compositionRoute: foreground, midground, route direction, focal cue, and objective/landmark clarity.
- moodArtDirection: dirty overgrown broken-city horror, not neon cyber UI or generic prototype.
- artifactFree: no HUD contamination, browser/debug overlay, broken geometry, blown exposure, or obvious render artifacts.

Return JSON only. Use the required schema. Accept only when score >= 90.
If rejected, requiredChanges must be the smallest visible levers to try next: camera, light, material, fog, placement, scale, silhouette, or UI contamination.
