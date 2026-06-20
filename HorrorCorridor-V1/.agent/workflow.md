# Workflow

Status: active

## Start of Every Run

1. Review `.agent/start-here.md`.
2. Review `.agent/workflow.md`, `.agent/intention.md`, `.agent/live-agent.md`, `.agent/memory.md`, `.agent/goal.md`, and `.agent/feedback.md`.
3. Skim `.agent/change-log.md` for the most recent handoff state.
4. If the chat added durable product/workflow/kit vocabulary, run `npm run harness:horror-corridor` so those rules move into repo-owned docs before implementation continues.
5. Re-open `docs/HorrorCorridor-V1-Parity-Audit.md`.
6. Only then inspect the repo files needed for the active batch.

## Loop

1. Confirm the active goal and current user feedback from `.agent`.
2. Generate or capture a target human-view reference when the batch is visual.
3. Capture the current browser scene with Playwright or the repo harness.
4. Compare target versus actual pedantically.
5. For visual work, route the pass through `horror-visual-director`, `human-game-view-expert`, `lighting-balance-scout`, and `screenshot-review-scout`.
6. Decide the capability owner before coding:
   - use a public NexusRealtime or ProtoKit capability if it already matches the domain cleanly
   - otherwise create or extend a local generic domain-service kit in `src/protokits`
   - keep HorrorCorridor-specific values in presets and content packs, not inside the generic kit
7. For new visual or generation-heavy kits, build or refresh an isolated preview surface before trusting the main corridor scene.
8. Implement one aligned batch with `do-it`.
9. Validate with static checks and human-view browser proof.
10. Promote kit work only in this order: preview proof -> smoke proof -> live-player proof -> audit/memory update.
11. Update `.agent` files, repo `memory.md`, the harness-generated docs, and the parity audit when the decision is durable.

## Live-Agent Loop

- Use `.agent/live-agent.md` when the batch involves long-duration in-game observation, action selection, or iterative exploration.
- The live agent may run indefinitely, but it must do so as explicit episodes:
  1. orient from `.agent`
  2. review the screen and current debug/runtime state
  3. choose a bounded action sequence
  4. execute through tools or harness actions
  5. verify the immediate result
  6. review the episode
  7. record candidate lessons
  8. promote only repeated durable lessons into `.agent/memory.md`, `memory.md`, `feedback.md`, or the parity audit
- One episode is evidence. Multiple consistent episodes are durable knowledge.
- Keep review work separate from the running live agent: the reviewer should consume saved logs, reports, and screenshots after or beside the live run, not inside the episode loop itself.

## Harness Surfaces

- `scripts/horror-corridor-harness.mjs` is the linear Codex CLI harness for turning durable chat direction into repo-owned docs.
- `scripts/horror-corridor-live-agent.mjs` is the long-duration supervisor that keeps launching bounded live-player episodes and writes cumulative logs plus per-episode artifacts.
- `scripts/review-live-agent-run.mjs` is the separate artifact reviewer that reads saved logs/screenshots and writes notes outside the live loop.
- `scripts/horror-corridor-visual-match.mjs` is the Codex CLI visual-match loop: generate/register one reference image, capture player-view screenshots, score semantic deltas with Codex, auto-fix below-90 results, and write inspectable attempt artifacts.
- `HorrorCorridor-Harness/domain-service-kit-source.json` is the conversation-derived vocabulary source for kit, domain-service-kit, preset, content-pack, and promotion rules.
- `docs/HorrorCorridor-Harness-Guide.md` and `docs/HorrorCorridor-Harness-Manifest.json` are generated artifacts. Refresh them instead of leaving important kit/process definitions trapped in chat.

## Quality Gate

- Do not accept object counts, debug counters, or mounted canvases as proof of visual quality.
- A player-view screenshot must show readable foreground, midground, route/focal content, and visible world dressing.
- For visual target work, prefer the visual-match CLI over ad hoc screenshot review so reference images, current captures, Codex scores, retry plans, and fix attempts stay in one run folder.
- `horror-visual-director` is the repo-specific acceptance gate for lighting/material/camera/prop/decal/particle/world-generation work.
- Preview/test surfaces for new kits should exist before those kits are treated as trusted main-scene building blocks.
- Live-agent lesson promotion must be evidence-based. Do not turn one inconclusive or one-off episode into durable memory.
