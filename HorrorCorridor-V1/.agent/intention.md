# Intention

Status: active

## Purpose

Build HorrorCorridor into a high-fidelity procedural cooperative horror corridor using NexusRealtime ecosystem ideas, public ProtoKits where they fit, and local HorrorCorridor ProtoKits where the public ecosystem lacks a needed domain.

## Posture

- Use `.agent/` as the first-read operating surface for every future run.
- Convert durable chat guidance into repo-owned harness docs instead of relying on conversation memory.
- Preserve prototype gameplay feel while moving content generation into composable kits.
- Favor human-visible lighting, composition, and atmosphere over metric-only validation.
- Keep active play canvas-first and minimal UI.
- Use local kits for HorrorCorridor-specific scene generation, lighting placement, materials, props, walkthrough validation, and future hazards.
- Require preview/test surfaces for new visual kits before promoting them into the main corridor scene.
- Use `HorrorCorridor-Harness` to restate what kits and domain-service kits mean in this repo whenever the operating model expands.
- Build toward a cumulative live-agent model that can review the game screen, choose actions, run bounded tool-driven episodes, and slowly promote durable lessons.
