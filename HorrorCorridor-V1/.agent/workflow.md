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
   - use the pinned current NexusEngine core capability first when it already owns the neutral contract; install only cores consumed by the selected flow
   - use a public NexusRealtime or ProtoKit capability if it matches remaining reusable behavior cleanly
   - otherwise create or extend a local generic domain-service kit in `src/protokits`
   - keep HorrorCorridor-specific values in presets and content packs, not inside the generic kit
   - do not recreate startup/platform, composition, data/ledger/persistence, world/scene/spatial/skybox, object/shape/fidelity/vegetation, player/creature/motion/physics, simulation/interaction/animation, presentation/UI, audio/network, or proof contracts under local names
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
- Keep one browser expedition alive across episodes; do not reload the run between Luna calls. End normally only when the authoritative game reports the monster's jumpscare defeat.

## Harness Surfaces

- `scripts/horror-corridor-harness.mjs` is the linear Codex CLI harness for turning durable chat direction into repo-owned docs.
- `scripts/horror-corridor-swarm.mjs` is the asynchronous Luna orchestrator for large change-request batches. Independent tasks require disjoint `allowedPaths`; every worker runs in an isolated worktree; only the harness owns locks, git commits, validation, and the integration branch.
- `scripts/horror-corridor-live-agent.mjs` is the long-duration supervisor that runs bounded live-player episodes and then makes one read-only Luna judgment call at a time. Each call receives the original goal, current episode, and a bounded window of recent call outputs/reasoning summaries before choosing the next action.
- `npm run validate:success-path` is the uninterrupted success-branch gate: early repel/study, later full-scare collection, claimed offer, Building 3, matching streamed-room identity, and standard player/runtime gates in one headed-Chrome expedition.
- `npm run validate:floor-material` is the bounded `Concrete / Slabs / Slab` gate: natural state publication, movement, downward-side look, three readable/HUD-free views, clean console, and Nexus reset/replay.
- `npm run validate:ceiling-fracture` is the bounded ceiling-collapse gate: natural Ceiling/Openings, Decay/Cracking, Ground/Rubble, and Fallen Masonry publication; movement plus authoritative upward-side look; three readable/HUD-free views; descriptor counts; clean console; and Nexus reset/replay.
- `npm run validate:ceiling-material` is the bounded ceiling-surface gate: exact natural Ceiling surface/descriptor agreement, 3 material surfaces, 2 generated textures, shallow relief, movement plus authoritative upward-side look, three readable/HUD-free views, clean console, and Nexus reset/replay.
- `scripts/review-live-agent-run.mjs` is the separate artifact reviewer that reads saved logs/screenshots and writes notes outside the live loop.
- `scripts/horror-corridor-visual-match.mjs` is the Codex CLI visual-match loop: generate/register one reference image, capture player-view screenshots, score semantic deltas with Codex, auto-fix below-90 results, and write inspectable attempt artifacts.
- `HorrorCorridor-Harness/domain-service-kit-source.json` is the conversation-derived vocabulary source for kit, domain-service-kit, preset, content-pack, and promotion rules.
- `docs/HorrorCorridor-Harness-Guide.md` and `docs/HorrorCorridor-Harness-Manifest.json` are generated artifacts. Refresh them instead of leaving important kit/process definitions trapped in chat.

## Luna Swarm Loop

1. Write one `horror-corridor.swarm-request.v1` batch with atomic tasks, dependencies, allowed paths, and validation commands.
2. Run `npm run harness:swarm -- check <request.json>` and fix every cycle or path overlap.
3. Run `npm run harness:swarm -- plan <request.json>` to inspect prompts and budgets without model calls.
4. Start live work only with `npm run harness:swarm -- run <request.json> --execute` from a clean base worktree.
5. Treat each Luna worker as a scoped implementation actor, never as a git owner or promoter.
6. Hold unknown or timed-out mutations; never replay them automatically.
7. Accept combined work only after integration validation passes on the generated integration branch.
8. Keep merging and pushing the default branch human-owned.

## Quality Gate

- Do not accept object counts, debug counters, or mounted canvases as proof of visual quality.
- A player-view screenshot must show readable foreground, midground, route/focal content, and visible world dressing.
- A state-only building number is not a visible building transition; the final success-path frame and `sceneDressing.referenceRoom.streamedBuildingNumber` must agree with the expedition.
- For visual target work, prefer the visual-match CLI over ad hoc screenshot review so reference images, current captures, Codex scores, retry plans, and fix attempts stay in one run folder.
- `horror-visual-director` is the repo-specific acceptance gate for lighting/material/camera/prop/decal/particle/world-generation work.
- Preview/test surfaces for new kits should exist before those kits are treated as trusted main-scene building blocks.
- Live-agent lesson promotion must be evidence-based. Do not turn one inconclusive or one-off episode into durable memory.
- When transport and natural recovery state disagree, Shared Expedition recovery truth owns the player-facing phase; connection status is supporting detail, not the heading decision.

## Recursive Domain Mapping Loop

1. Start from the `game-slice` composition or one accepted natural parent domain.
2. For each candidate child, require a coherent state-and-meaning boundary, independent reset/snapshot ownership, and a narrower truth that stays inside the parent.
3. Keep names as concise natural subjects. Reject names shaped like algorithms, mechanics, features, managers, modules, layers, adapters, proofs, kits, or services.
4. Recurse without an arbitrary depth cap, but never create children merely to make a branch deeper. A valid parent may be a leaf.
5. Attach reusable behavior as `kit:`, controlled operations as `service:`, platform glue as `host:`, and validation as `proof:`.
6. Use composition relationships when one natural domain needs another; do not duplicate ownership or let domains directly mutate neighboring truth.
7. Select one bounded high-value domain and its attached kits for implementation, validate the whole player flow, update the composition, and then choose the next branch.

## Thin Host Gate

- `GameShell.tsx`, `GameCanvas.tsx`, and game HTML may create/dispose composition, forward input/ticks, bind adapters, and render descriptors.
- Monster choice, approach, beam resolution, blackout, last chance, Index collection, room offers, encounter score, and defeat belong behind HorrorCorridor domain kits/services.
- A browser, Three.js, Web Audio, React, PeerJS, or storage adapter may realize an outcome but may never decide it.
- Use `docs/HorrorCorridor-Endless-Expedition-Architecture.md` as the ownership and core-kit reuse map.
