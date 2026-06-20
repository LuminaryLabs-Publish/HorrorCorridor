# HorrorCorridor Visual Match CLI

Status: active

## Purpose

`scripts/horror-corridor-visual-match.mjs` is the repo-owned screenshot-vs-reference loop for HorrorCorridor visual work. It creates or registers one reference image, captures the current player view through the live-player harness, asks Codex CLI to score semantic visual differences, and optionally asks Codex CLI to apply bounded auto-fixes until the score reaches the promotion threshold.

## Commands

```bash
npm run visual:match -- prepare --target starting-scene --slug first-pass
npm run visual:match -- run --run-dir docs/visual-review/runs/<run-id>
```

Useful validation commands:

```bash
npm run visual:match -- prepare --target starting-scene --slug smoke-test --dry-run
npm run visual:match -- run --reference-image docs/reference-images/generated/starting-scene-target-2026-06-19.png --max-attempts 1 --mock-score 95 --dry-run
npm run visual:match -- run --reference-image docs/reference-images/generated/starting-scene-target-2026-06-19.png --max-attempts 1 --mock-score 42 --dry-run
```

## Reference Generation

The CLI follows the NexusDaydreamer-Codex pattern:

- Codex CLI is the image-generation boundary.
- `prepare` writes a reference prompt and a reference step manifest.
- Codex must use the installed imagegen skill to create one raster PNG.
- The generated image is only accepted after `submit-reference` registers it as `reference/reference.png`.
- `submit-reference` rejects old images by default; `--allow-existing` is only for manual reuse or tests.

## Match Loop

Each attempt writes:

- `capture/starting-scene.png`
- `capture/movement-scene.png`
- `capture/report.json`
- `review-prompt.md`
- `review.json`
- `retry-plan.json` when score is below threshold
- `fix-prompt.md`
- `fix-summary.md`
- `checks.json` when an auto-fix runs

The default threshold is `90`. Auto-fix uses Codex CLI in `workspace-write` mode and is capped to `maxAttempts` with a hard cap of `5`.

## Acceptance

Do not promote a visual pass from counters or code alone. Use the generated `final-report.md`, `review.json`, and screenshots. A pass is accepted only when the visual review returns `score >= 90` and the player-view screenshot is human-readable against the reference.
