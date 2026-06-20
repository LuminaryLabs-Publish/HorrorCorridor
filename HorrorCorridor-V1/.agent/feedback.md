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

## Usage

- Move stable, lasting rules into `memory.md` and `.agent/memory.md`.
- Keep this file focused on direct user steering and remove stale feedback once it has been absorbed elsewhere.
