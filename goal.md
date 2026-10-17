# Goal

## Active native Quest milestone

Build one shared Nexus-authored game with a Rust gameplay runtime and Android
ARM64 OpenXR APK, preserving desktop play. Keep one game source on default
`main`; browser, Quest APK and future PCVR are build formats sharing the same
gameplay kits and content, not separate games. First prove one rendered corridor,
independent head/hand tracking and a complete flashlight encounter. PWA-first
delivery is superseded. This milestone is not implemented; the engine pin stays
unchanged until compatibility is proven. See
[`native-quest.md`](docs/sequence-overhaul/native-quest.md) for source evidence,
blockers and the repeatable `npm run native:inspect` preflight. Earlier milestone
reports below remain historical and do not establish native readiness.

## Active overhaul — 2026-09-10

Implement the complete `docs/sequence-overhaul/plan.md`, preserve original work and validate outcomes. The user authorized publishing the current root-app development baseline to main and creating a Drive handoff. Full release remains unfinished. `docs/sequence-overhaul/checkpoint.md` is the implementation/evidence record. Generated corridor extent does not satisfy the eight-hour campaign objective. Next: corridor continuity, residency and long-run validation.

The following requirements and status describe the prior V2 milestone. Historical passing reports must not be presented as fresh root-overhaul acceptance.

## Requirements

- Keep V1 runnable and unchanged as a reference.
- Ship V2 beside it as a Vite, React, Three.js, TypeScript game.
- Use the pinned public NexusEngine commit as explicit authoritative composition with no hidden core installation.
- Keep Expedition, Corridor, Party, Dread, and Shared Expedition state independently snapshotable and browser-free.
- Deliver the complete loop: explore, hear, repel, study, endure blackout, collect, claim an offering, cross buildings, get caught, restart, save, reload, host, disconnect, and recover.
- Keep gameplay outcomes in domains; adapters only translate browser, rendering, audio, persistence, and transport data.
- Prove player-view readability at spawn, after movement, and while looking left and right.
- Provide at least ten continuous minutes of blocker-free walkable content with meaningful district and set-piece variation.
- Build more than 120 indexed monster manifestations with actionable cues, movement, response, consequence, timing, and visual identity.
- Maintain an invariant branch harness beside a cumulative heuristic play timeline; increase review duration after each pass and delegate stalled stages to a bounded recovery agent.
- Make the stdio MCP server the bounded external authoring interface for catalog observation, context packets, focused preview, review lifecycle, cohesion, and milestone proof.
- Keep runtime TypeScript authoritative, persist authoring state and accepted evidence under `.agent/authoring/`, and prevent packet scope from silently expanding.

## Final Output

The player begins at a condemned service threshold, moves toward a visible route, hears a stalker from a direction, turns and holds the flashlight to study it, or lets its scare reach blackout and survives the last-chance response to collect it. A collected encounter opens an offering and the next building. Missing the response ends the run at a caught screen; restarting preserves the Monster Index. Solo and shared expeditions use the same authoritative domain snapshot.

Status: in progress. Accepted current slice: 1,920 authored meters across 12 districts, 124 monster manifestations across 34 families, six simulation-timed sensory warning motifs before visible pursuit, continuous corridor streaming, no offering teleport, binary authoritative multiplayer snapshot recovery, dual invariant/timeline live-review harnesses with honest replay accounting, and all 12 grounded set-piece identities. The stdio authoring MCP now resolves all 202 catalog entries, bounds work through durable packets, provides a sub-five-second warm focused preview, records evidence-gated lifecycle state, and separates focused, cohesion, and promotion proofs. Runtime, MCP contract, live WebAudio, networking/recovery, and human-view proofs pass. A subjective headphone mix pass remains; subsequent work should deepen encounter variation and long-route pacing rather than raw counts.
