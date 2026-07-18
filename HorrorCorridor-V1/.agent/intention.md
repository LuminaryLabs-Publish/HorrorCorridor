# Intention

Status: active

## Purpose

Build HorrorCorridor into a high-fidelity cooperative horror expedition by composing current NexusEngine cores, natural world domains, and local HorrorCorridor behavior/content kits only where the public core does not own the game-specific rule.

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
- Treat HorrorCorridor as a composition of natural state-and-meaning domains. Deepen only through genuine child ownership boundaries, then attach behavior kits, service bridges, host adapters, and proofs without mislabeling them as domains.
- Build the entire canonical composition into executable behavior against the current NexusEngine core-kit surface; the domain tree is a coverage contract, not a documentation-only endpoint.
- Use the generated room target under `docs/visual-targets/` as a player-view acceptance reference while preserving one-UX-feature-at-a-time implementation focus.
- Treat the finite entrance as the authored onboarding space, then continue as an effectively endless building-by-building horror delve whose run score is encounters survived.
- Make the Monster Index the collection loop: seeing reveals a monster, early repulsion teaches it, and surviving its full characteristic scare collects it.
- Make defeat monster-owned. The first stalker is heard before it is seen, is repelled by the flashlight beam, forces an exact three-second blackout at close range, then grants a final response window shorter than ten seconds before its jumpscare ends the run.
- Prefer the 36 selected cores from pinned NexusEngine commit `d41992636de2752f1ad9047b80701e6313f19b87` over local substitutes, and leave unrelated exported cores unmounted until a consuming player flow exists.
- Give each of the five active top-level HorrorCorridor domains one thin composition boundary so agents can work on stable natural branches while `GameShell`, `GameCanvas`, and browser HTML remain host assembly only.
- Keep the former ordered-cube Anomaly Rite retired from the active graph; compatibility fields are not product authority.
