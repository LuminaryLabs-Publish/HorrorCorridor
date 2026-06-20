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
- `.agent/goal.md`: Use the NexusRealtime ecosystem on branch family `0.0.2` to compose and build HorrorCorridor into a massive high-fidelity procedural world.
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

A live agent is a cumulative episodic game operator. It may run indefinitely under supervision, but it still reviews the current screen, chooses bounded actions, executes through tools or harnesses, verifies the result, and promotes only repeated durable lessons into repo memory or audits.

### Reviewer Loop

A reviewer loop is separate from the live agent. It reads saved logs, reports, and screenshots after or beside the live run, then writes notes without mutating the live-agent episode log.

### Visual Match Loop

A visual match loop is a Codex CLI-driven reference-vs-current screenshot loop. It registers one reference image, captures current player-view screenshots, scores semantic visual deltas, and performs bounded auto-fix retries until the score reaches the configured promotion threshold.

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

## Future Harness Directions

- Add a NexusSimulator-backed interaction plane for repeatable player validation.
- Build the live agent as an episodic long-run operator rather than a one-pass capped harness.
- Use `npm run visual:match` for screenshot-vs-reference review and bounded auto-fix loops before claiming visual acceptance.
- Expand per-kit preview surfaces before deeper main-scene promotion.
- Keep the harness linear and repo-owned rather than hiding core rules in external chat state.

## Command

```bash
cd /Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1 && npm run harness:horror-corridor
```

## Notes

- This document is generated by `scripts/horror-corridor-harness.mjs`.
- Refresh it whenever durable chat guidance changes the repo's process, kit vocabulary, or promotion rules.

