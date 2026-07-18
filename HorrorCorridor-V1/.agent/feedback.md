# Feedback

Status: active

## Purpose

Track direct user corrections that should change how future HorrorCorridor runs are executed.

## Active Feedback

- Start every future run by reviewing `.agent/start-here.md`, `workflow.md`, `intention.md`, `memory.md`, `goal.md`, `feedback.md`, and then skimming `change-log.md`.
- Use `.agent/` as the live control surface for intentions, goals, and workflow before relying on chat history.
- When adding new scene or kit work, set up an isolated preview/testing path before trusting it in the main corridor.
- When chat introduces durable rules about kits, domain ownership, or operating flow, move them into repo docs through `HorrorCorridor-Harness` instead of leaving them only in conversation.
- The live agent should be more cumulative and long-duration: it should review the screen, choose actions, operate through a tool loop, review outcomes, and only slowly promote durable lessons.
- Keep domain maps natural and soft-bounded: domains own state and meaning; kits own behavior; services bridge operations; hosts and proofs remain composition attachments. See `feedback-packets/recursive-domain-depth.md`.
- Prefer recognizable natural subjects and lived systems for domain names. Replace storage- or implementation-shaped labels such as collection, registry, field, projection, manager, and adapter with the thing that actually owns the truth; name new behavior kits with short verbs that say what they do.
- Deepen a domain by asking which natural subjects are required to make up the parent, then repeat top-down until the boundary is atomic. Visual subjects may be ten or dozens of meaningful layers deep; do not flatten a leaf's growth, structure, and life into one mechanical category.
- Make top-level domain kits compose NexusEngine and child kits; keep atomic local kits focused on one HorrorCorridor behavior and do not create alias kits for capabilities the core already owns.
- Decide whether a kit is needed before naming one: core-owned neutral capability means reuse the core; tuning/placement/content means preset or content pack; browser/React/Three/Web Audio/Peer/storage binding means adapter; validation means proof; only a missing reusable HorrorCorridor verb or descriptor earns one atomic local kit.
- Treat world, scene loading, spatial, object, graphics, and presentation as NexusEngine capability substrate. Natural HorrorCorridor top-level domains own their own thin compositions, while game HTML only assembles the root and asks those kits/services for outcomes.
- Keep game HTML, React, Three.js, audio, and transport hosts assembly-only. They may realize descriptors, never decide monster, score, collection, blackout, offer, or defeat truth.
- Implement and judge one UX feature at a time—input feel, visual fidelity, gameplay systems, and so on—while continuously checking that completed features remain cohesive together.
- The bounded industrial shelving silhouette subject is accepted through the existing natural Storage/Shelves boundary, object descriptor, wound-mesh/object/furnishing capabilities, graphics/presentation cores, and Three host without a new domain, core, alias kit, or production kit. Do not mistake its visible descriptor for the still-open natural `industrial-shelving-kit` behavior contract. The current one-feature visual focus is shelving corrosion and wear identity; keep silhouette, ceiling/floor material, and all gameplay/recovery proofs in regression.

## Usage

- Move stable, lasting rules into `memory.md` and `.agent/memory.md`.
- Keep this file focused on direct user steering and remove stale feedback once it has been absorbed elsewhere.
