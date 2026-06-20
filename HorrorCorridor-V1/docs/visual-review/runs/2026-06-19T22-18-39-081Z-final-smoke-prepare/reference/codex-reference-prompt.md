Generate the required HorrorCorridor visual reference image.

Reference prompt:
Create one raster PNG reference image for HorrorCorridor's starting player-view scene.

Art direction:
- First-person horror corridor, no HUD, no UI, no browser chrome.
- Dirty overgrown broken-city corridor, not neon cyberpunk.
- Muddy dark terrain/floor, damp concrete, broken brick, rusted metal, moss, roots, rubble, and practical lamps.
- Subtle warm flashlight/player spill with very low ambient fill.
- Rare sickly anomaly accents only as distant hints.
- Strong readable floor/wall separation near camera.
- At least one midground route cue or landmark.
- Props should have real silhouettes: pipes, vents, cables, lamps, rocks, broken wall chunks, debris, and corroded fixtures.
- High-fidelity PBR feel: normal-map texture, roughness variation, grime, corrosion, wetness, and material-specific color.
- Darkness should shape attention, not hide the scene.

Camera:
- First-person eye height, wide but believable FOV.
- View forward into a corridor path, not a blank wall or empty floor.
- Cinematic but playable, showing what the player should understand in the first 3 seconds.

Hard requirements:
- Use the installed Codex imagegen skill in default built-in image_gen mode to create one raster PNG image.
- Do not use SVG, HTML, CSS, canvas mockups, placeholders, or text-only descriptions.
- Do not use direct OpenAI API code, OPENAI_API_KEY, or external SDK image calls from this repo.
- The reference step manifest is docs/visual-review/runs/2026-06-19T22-18-39-081Z-final-smoke-prepare/reference/manifest.json.
- The output is only accepted after it is registered through the repo submit command.
- After image generation succeeds, run this exact submit command:
  node scripts/horror-corridor-visual-match.mjs submit-reference --run-dir /Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/visual-review/runs/2026-06-19T22-18-39-081Z-final-smoke-prepare --image <path-to-new-image> --note generated-by-codex-imagegen
- Replace <path-to-new-image> with the concrete PNG path created by imagegen.
- The submit command will copy the image to reference/reference.png and write submission metadata.
- Return a concise final message listing the submitted reference image path.
