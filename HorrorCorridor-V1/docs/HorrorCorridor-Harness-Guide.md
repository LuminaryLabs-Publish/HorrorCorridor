# HorrorCorridor Harness Guide

Status: generated

## Purpose

Capture durable Codex-facing guidance for HorrorCorridor so kit definitions, domain ownership rules, and workflow expectations live in the repo instead of only in chat.

## Current Repo Control Surfaces

- `.agent/start-here.md`: Use this workspace to coordinate the HorrorCorridor long-running build toward a high-fidelity endless horror expedition composed from the current public NexusEngine core, natural HorrorCorridor domains, and the smallest necessary local kits.
- `.agent/workflow.md`: 1. Review `.agent/start-here.md`.
- `.agent/intention.md`: Build HorrorCorridor into a high-fidelity cooperative horror expedition by composing current NexusEngine cores, natural world domains, and local HorrorCorridor behavior/content kits only where the public core does not own the game-specific rule.
- `.agent/live-agent.md`: Define how HorrorCorridor should use a long-duration in-game live agent that can observe the player view, choose actions, act through tools, review outcomes, and slowly accumulate durable lessons.
- `.agent/memory.md`: `.agent/` is the repo-local control plane. Every future run should start by reviewing `start-here.md`, `workflow.md`, `intention.md`, `live-agent.md`, `memory.md`, `goal.md`, `feedback.md`, and then `change-log.md` before broader repo exploration.
- `.agent/goal.md`: Build the complete Horror Corridor Expedition domain-service composition against the current NexusEngine core-kit architecture, turn the canonical target tree into installed runtime behavior, and keep iterating until the whole expedition plays smoothly and the corridor environment visibly matches the generated room target.
- `.agent/feedback.md`: Track direct user corrections that should change how future HorrorCorridor runs are executed.
- `memory.md`: HorrorCorridor-V1 is a multiplayer first-person horror expedition prototype: a finite entrance opens into an effectively endless ruined-building delve where directional monster encounters, scare-earned collection, and room discoveries drive the run. The current priority is cohesive playable depth, natural domain ownership, and human-visible quality.

## Core Vocabulary

### Kit

A kit is a composable capability package. It can expose services, resources, events, systems, descriptor builders, install hooks, or validation helpers behind a stable manifest.

### Domain Service Kit

A domain-service kit installs one natural domain owner with explicit state meaning, lifecycle, reset, snapshot, `provides`, `requires`, services, metadata, and idempotent installation. It is not a category folder or a renamed manager.

### Natural Domain

A natural domain is a soft-bounded subject or lived system that owns coherent truth. Map it top-down by asking which natural subjects must exist inside the parent, and recurse only while each child owns narrower independent meaning.

### Composition Kit

A composition kit requires the complete natural child-domain branch, records its target behavior-kit contracts, and provides one stable branch capability to its parent. It installs only live implementations, never pretends contract-only behavior is mounted, and does not become a manager or duplicate child truth.

### Atomic Behavior Kit

An atomic behavior kit performs one reusable idempotent action over explicit inputs, outputs, and NexusEngine core requirements. Create it only for a HorrorCorridor rule the core does not already own.

### Thin Host

A thin host binds React, Three.js, Web Audio, PeerJS, storage, or browser input to domain services and descriptors. It may realize outcomes but never decide gameplay truth.

### Preset

A preset is where HorrorCorridor-specific tuning belongs. Grid size, palette, decal style, density, lighting mood, thresholds, and other game-specific values should be configured here instead of inside the generic kit.

### Content Pack

A content pack is cumulative content data layered on top of the generic kits and preset system. It adds prop families, lighting moods, decals, walkthrough rules, or other content without redefining the underlying domain contract.

### Preview Surface

A preview surface is an isolated proof scene or test page used to validate a visual or generation-heavy kit before promotion into the main corridor.

### Live Agent

A live agent is a cumulative episodic game operator. It keeps one browser expedition alive, runs one low-reasoning priority Luna judgment at a time with no artificial delay, gives later calls bounded recent history, logs call timing, and ends normally only when the authoritative game reports caught.

### Reviewer Loop

A reviewer loop is separate from both the live agent and its in-loop sequential judge. It reads saved logs, structured judgments, reports, and screenshots after or beside the live run, then writes notes without mutating the live-agent episode log.

### Visual Match Loop

A visual match loop is a Codex CLI-driven reference-vs-current screenshot loop. It registers one reference image, captures current player-view screenshots, scores semantic visual deltas, and performs bounded auto-fix retries until the score reaches the configured promotion threshold.

### Luna Swarm Run

A Luna swarm run is a deterministic orchestration of many scoped Codex CLI change requests using `gpt-5.6-luna`. Every worker edits one isolated git worktree, the harness enforces declared paths and validation, and only a validated integration branch can advance to human review.

## Public Capability Rule

- Audit and pin the current public NexusEngine head before selecting core contracts.
- Install a NexusEngine core only when a current HorrorCorridor flow consumes it; do not mount capabilities for catalog completeness.
- Reuse a public capability when its contract matches cleanly. If it lacks the game-specific rule, create one atomic local kit that requires the core instead of duplicating it.
- Treat world, scene loading, spatial, objects, graphics, presentation, input, physics, audio, and networking as neutral core capability substrate rather than parallel HorrorCorridor domain taxonomies.

## Local Kit Rule

- Top-level local kits require their complete natural child-domain branch, compose installed atomic behavior kits, and keep unfinished behavior contracts explicit; they do not become managers.
- Atomic local kits own one reusable HorrorCorridor behavior with explicit core requirements.
- Do not bury HorrorCorridor-only values inside the generic kit implementation.
- Do not create a kit for an alias, one-off constant, category folder, React component, draw call, or behavior already owned elsewhere.
- Major visual families should stay explicit object/content kits with shared review coverage instead of anonymous descriptor branches.
- Use presets or content packs for tuning and placement, adapters for platform bindings, and proof harnesses for validation; none of those needs a gameplay kit.
- Create a local kit only after a consuming flow proves that one reusable HorrorCorridor verb or descriptor is still missing from the selected cores and existing local contracts.

## Promotion Path

1. preview proof
2. smoke proof
3. live-player proof
4. audit and memory update

## Conversation-Derived Directives

- Build a finite entrance followed by an effectively endless ruined-building delve scored by monster encounters survived.
- Make the Monster Index the collection game: seeing reveals, early repel teaches, and surviving the full characteristic scare collects.
- Map domains through deep natural containment rather than mechanical, categorical, renderer, or algorithm boundaries.
- Deepen a domain by asking which natural subjects make up the parent, then recurse only while each child owns independently meaningful truth; depth is discovered rather than targeted.
- Compose the 36 selected cores from pinned NexusEngine commit d41992636de2752f1ad9047b80701e6313f19b87 and create local kits only for missing HorrorCorridor rules.
- Give Expedition, Corridor, Party, Dread, and Shared Expedition one thin local composition kit each so concurrent agent lanes integrate through the same root and declared services.
- Keep React, Three.js, Web Audio, PeerJS, storage, and game HTML as thin assembly hosts that create, tick, synchronize, and render the root composition without deciding gameplay outcomes.
- Target one UX feature at a time while continuously preserving cohesion with previously completed features.
- For material work, natural world state owns material meaning, existing terrain or object descriptor kits translate it, presets supply target tuning, graphics and presentation cores carry it, and the render host only realizes it; do not create a parallel material taxonomy or core alias.
- Human-visible quality outranks metric-only proof for lighting, materials, composition, props, decals, fog, and world readability.
- The active game should stay canvas-first with minimal persistent UI.
- The harness/docs layer should capture durable chat intent so later runs do not have to reconstruct it from memory.
- The live agent should persist one expedition across sequential Luna calls and end normally only on authoritative caught, while logging call duration and gaps.
- Keep one uninterrupted success-path gate that proves early repel and study, later full-scare collection, a claimed offer, and visible entry into the next furnished building.
- Keep one authoritative solo restart gate that proves caught terminal, one restart hero action, visible loading, new attempt identities, fresh run and Monster Index truth, and resumed movement.
- Keep one headed two-page Shared Expedition recovery gate that proves preserved place, continued host authority, one correlated request-sync, restored room/game/seed/player truth, recovery history, readable reconnect states, and post-recovery movement.
- Let Shared Expedition recovery truth choose the player-facing lost versus recovering phase; lower-level transport status is supporting adapter detail and must not prematurely change the phase.
- Map ceiling damage through the existing natural Ceiling, Openings, Decay/Cracking, Ground/Rubble, and Fallen Masonry owners instead of inventing a broad mechanical damage category.
- Reuse the selected Nexus world, scene, spatial, object, shape, fidelity, graphics, presentation, and proof cores plus existing wound-mesh, ceiling-object, rubble/debris, furnishing, preset, and host capabilities for ceiling fracture and settlement; create no alias or production kit when those contracts already fit.
- Keep ceiling surface identity as state beneath the existing natural Ceiling owner. Let the preset tune damp-spalled concrete and brick, existing terrain/object material capabilities translate it, graphics/presentation cores carry it, and the Three host realize it; do not create a material taxonomy, ceiling-material domain, alias core, or new kit.
- Industrial shelving silhouette identity is fixed through the existing Storage/Shelves boundary and object/wound-mesh/furnishing/graphics/presentation paths. Keep its visible descriptor separate from the still-open industrial-shelving-kit behavior contract, and target shelving corrosion and wear as the next single UX feature without adding a material taxonomy, alias core, or duplicate kit.
- Persistent live-agent camera commands must commit yaw and pitch to the authoritative player snapshot before hold so later calls inspect the actual retained view.
- The reviewer that inspects logs and screenshots should remain separate from the running live-agent loop.
- Reference image generation should follow the NexusDaydreamer-Codex pattern: Codex/imagegen creates the raster output, then a repo submit command registers the image before the visual loop trusts it.
- Large implementation batches should use the Luna swarm harness with isolated worktrees, disjoint file scopes, bounded prediction concurrency, deterministic validation, and a human-owned default-branch promotion gate.

## Future Harness Directions

- Keep the current NexusSimulator-aligned CDP interaction plane passing as gameplay grows.
- Keep `npm run validate:success-path` passing and require the final expedition building number to match the streamed furnished-room building number.
- Keep `npm run validate:restart-after-caught` passing before changing completion, departure, runtime reset, or fresh-attempt behavior.
- Keep `npm run validate:reconnect-recovery` passing before changing client transport lifecycle, Rejoining state, snapshot correlation, Shared Chronicle recovery history, or recovery UI.
- Keep `npm run validate:floor-material` passing before changing Concrete, Slabs, Slab, entry framing, terrain material state, or terrain shader realization.
- Keep `npm run validate:ceiling-fracture` passing before changing the collapsed ceiling, breach, fracture paths, edge fragments, fallen masonry, rubble settlement, or authoritative scripted look behavior.
- Keep `npm run validate:ceiling-material` passing before changing Ceiling surface truth, damp-spalled masonry tuning, ceiling textures, ceiling-ruin shading, material relief, or the authoritative upward-look proof.
- Keep `npm run validate:industrial-shelving` passing before changing rack frame rhythm, stored forms, placement, wound-mesh materials, or the authoritative approach/side-look proof.
- Keep Playwright attached inside the parent live process to remove repeated CDP attachment and image-analysis startup costs without raising prediction concurrency above one.
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
- One browser expedition persists across calls and normal execution ends only when the authoritative game reports `caught`.
- The current real proof is `docs/live-agent/runs/2026-07-17T18-42-11-807Z` with seven Luna calls; see `docs/HorrorCorridor-Live-Luna-Run-2026-07-17.md`.
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

