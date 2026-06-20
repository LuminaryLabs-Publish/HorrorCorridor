Implement the next smallest HorrorCorridor visual fix for the failed visual-match attempt.

Mandatory orientation:
- Start by reading `.agent/start-here.md`, `.agent/workflow.md`, `.agent/intention.md`, `.agent/live-agent.md`, `.agent/memory.md`, `.agent/goal.md`, `.agent/feedback.md`, and `.agent/change-log.md`.
- Re-open `docs/HorrorCorridor-V1-Parity-Audit.md` before editing.

Evidence:
- Reference image: docs/visual-review/runs/2026-06-19T22-11-37-303Z-mock-retry-3/reference/reference.png
- Current screenshot: docs/visual-review/runs/2026-06-19T22-11-37-303Z-mock-retry-3/attempts/attempt-001/capture/starting-scene.png
- Review JSON: docs/visual-review/runs/2026-06-19T22-11-37-303Z-mock-retry-3/attempts/attempt-001/review.json
- Retry plan: docs/visual-review/runs/2026-06-19T22-11-37-303Z-mock-retry-3/attempts/attempt-001/retry-plan.json
- Attempt: 1

Rules:
- Use the screenshot as player-visible truth.
- Apply one cohesive fix only.
- Prefer the smallest visible lever first: camera, light, material, fog, placement, scale, silhouette, or UI contamination.
- Do not run destructive git commands.
- Do not do broad rewrites or unrelated architecture migrations.
- Keep HorrorCorridor-specific tuning in presets/content packs when changing kit data.
- Do not claim success; this CLI will re-run screenshot capture and visual review after your patch.
- Run focused checks if practical and summarize exactly what changed.
