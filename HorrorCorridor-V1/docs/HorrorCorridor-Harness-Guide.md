# HorrorCorridor Harness Guide

Status: generated

## Purpose

Capture durable Codex-facing guidance for HorrorCorridor so kit definitions, domain ownership rules, and workflow expectations live in the repo instead of only in chat.

## Current Repo Control Surfaces

- `.agent/start-here.md`: Use this workspace to coordinate the HorrorCorridor long-running build toward a high-fidelity procedural horror corridor composed from NexusRealtime kits, public ProtoKits, and local HorrorCorridor ProtoKits.
- `.agent/workflow.md`: 1. Review `.agent/start-here.md`.
- `.agent/intention.md`: Build HorrorCorridor into a high-fidelity procedural cooperative horror corridor using NexusRealtime ecosystem ideas, public ProtoKits where they fit, and local HorrorCorridor ProtoKits where the public ecosystem lacks a needed domain.
- `.agent/live-agent.md`: Define how HorrorCorridor should use a long-duration in-game live agent that can observe the player view, choose actions, act through tools, review outcomes, and slowly accumulate durable lessons.
- `.agent/memory.md`: `.agent/` is the repo-local control plane. Every future run should start by reviewing `start-here.md`, `workflow.md`, `intention.md`, `live-agent.md`, `memory.md`, `goal.md`, `feedback.md`, and then `change-log.md` before broader repo exploration.
- `.agent/goal.md`: Upgrade the HorrorCorridor live-agent harness into a real sequential Luna judgment chain that accumulates bounded evidence over time.
- `.agent/feedback.md`: Track direct user corrections that should change how future HorrorCorridor runs are executed.
- `memory.md`: HorrorCorridor-V1 is a multiplayer first-person maze horror prototype port. The current priority is preserving prototype feel while incrementally moving runtime, rendering, validation, and content authoring into clearer multi-file architecture.

## Core Vocabulary

### Kit

A kit is a composable capability package. It can expose services, resources, events, systems, descriptor builders, install hooks, or validation helpers behind a stable manifest.

### Domain Service Kit

A domain-service kit is a generic domain owner with explicit `provides`, `requires`, metadata, and install surfaces. It should model a reusable problem space, not one game-specific constant set.

### Preset

A preset is where HorrorCorridor-specific tuning belongs. Grid size, palette, decal style, density, lighting mood, thresholds, and other game-specific values should be configured here instead of inside the generic kit.

### Content Pack

A content pack is cumulative content data layered on top of the generic kits and preset system. It adds prop families, lighting moods, decals, walkthrough rules, or other content without redefining the underlying domain contract.

### Preview Surface

A preview surface is an isolated proof scene or test page used to validate a visual or generation-heavy kit before promotion into the main corridor.

### Live Agent

A live agent is a cumulative episodic game operator. It may run indefinitely under supervision, but it still reviews the current screen, chooses bounded actions, executes through tools or harnesses, and verifies the result. The current implementation runs one read-only Luna judgment after each episode in the Codex priority service tier with low reasoning and no artificial inter-episode delay; every later judgment sees the original goal and the last three call outputs/reasoning summaries by default before selecting the next action.

### Reviewer Loop

A reviewer loop is separate from both the live agent and its in-loop sequential judge. It reads saved logs, structured judgments, reports, and screenshots after or beside the live run, then writes notes without mutating the live-agent episode log.

### Visual Match Loop

A visual match loop is a Codex CLI-driven reference-vs-current screenshot loop. It registers one reference image, captures current player-view screenshots, scores semantic visual deltas, and performs bounded auto-fix retries until the score reaches the configured promotion threshold.

### Luna Swarm Run

A Luna swarm run is a deterministic orchestration of many scoped Codex CLI change requests using `gpt-5.6-luna`. Every worker edits one isolated git worktree, the harness enforces declared paths and validation, and only a validated integration branch can advance to human review.

## Public Capability Rule

- Use a public NexusRealtime or ProtoKit capability when it already matches the domain cleanly.
- If a public kit requires HorrorCorridor-specific constants or special cases to make sense, it is probably the wrong abstraction boundary for direct adoption.
- If the public ecosystem lacks the capability, create a local generic domain-service kit in `src/protokits` and customize it through presets/content packs.

## Local Kit Rule

- Local kits should still be generic domain services where practical.
- Do not bury HorrorCorridor-only values inside the generic kit implementation.
- Major visual families should stay explicit kits with shared review coverage instead of anonymous descriptor branches.

## Promotion Path

1. preview proof
2. smoke proof
3. live-player proof
4. audit and memory update

## Conversation-Derived Directives

- The repo should grow toward a high-fidelity procedural world composed from public NexusRealtime capabilities plus local HorrorCorridor ProtoKits where needed.
- Human-visible quality outranks metric-only proof for lighting, materials, composition, props, decals, fog, and world readability.
- The active game should stay canvas-first with minimal persistent UI.
- The harness/docs layer should capture durable chat intent so later runs do not have to reconstruct it from memory.
- The long-duration game validator should be a cumulative live agent with a screen-review loop, a bounded tool loop, and an evidence-based review loop.
- The reviewer that inspects logs and screenshots should remain separate from the running live-agent loop.
- Reference image generation should follow the NexusDaydreamer-Codex pattern: Codex/imagegen creates the raster output, then a repo submit command registers the image before the visual loop trusts it.
- Large implementation batches should use the Luna swarm harness with isolated worktrees, disjoint file scopes, bounded prediction concurrency, deterministic validation, and a human-owned default-branch promotion gate.

## Future Harness Directions

- Add a NexusSimulator-backed interaction plane for repeatable player validation.
- Extend the fast sequential live agent with more bounded action profiles and long-run convergence policies without raising prediction concurrency above one.
- Use `npm run visual:match` for screenshot-vs-reference review and bounded auto-fix loops before claiming visual acceptance.
- Expand per-kit preview surfaces before deeper main-scene promotion.
- Keep the guidance refresh chain linear and repo-owned; use the separate orchestrator harness when many worker workflows need dependency scheduling, isolation, and integration.

## Luna Swarm Orchestrator

- Model: `gpt-5.6-luna` with `medium` reasoning.
- Task concurrency: `8`; active predictions: `4`; validation concurrency: `2`.
- Every task uses an isolated worktree and branch, declared app-relative paths, structured output, deterministic validation, and artifact-backed decisions.
- The harness creates a validated integration branch only. Default-branch merge and push remain human-owned.

```bash
cd /Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1
npm run harness:swarm -- check HorrorCorridor-Harness/swarm-request.example.json
npm run harness:swarm -- plan HorrorCorridor-Harness/swarm-request.example.json
npm run harness:swarm -- run HorrorCorridor-Harness/my-swarm-request.json --execute
```

## Sequential Live Agent

- Every browser episode is followed by exactly one read-only Luna judgment with prediction concurrency fixed at one, low reasoning, and the Codex priority service tier.
- Each judgment sees the original goal, the current compact episode, and a bounded recent window of structured outputs and reasoning summaries.
- The judgment chooses the next action profile and records an over-time trend; malformed or missing output fails closed.
- There is no artificial delay between episodes; each call records duration plus the completion-to-next-start gap.
- Full prompts, provider events, structured judgments, screenshots, timing, logs, and loop state remain inspectable in the external run directory.

```bash
cd /Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1
npm run live-agent:sample
npm run review:live-agent -- <run-directory>
```

## Command

```bash
cd /Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1 && npm run harness:horror-corridor
```

## Notes

- This document is generated by `scripts/horror-corridor-harness.mjs`.
- Refresh it whenever durable chat guidance changes the repo's process, kit vocabulary, or promotion rules.

