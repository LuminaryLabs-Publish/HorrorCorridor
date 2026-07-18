# Natural World and Kit Mapping Handoff

Status: active agent contract

## User Direction Captured

- Map HorrorCorridor through worlded, natural containment rather than mechanical or categorical subsystems.
- Deepen top-down by asking which natural subjects make up the parent. Continue until the boundary is genuinely atomic; depth can be dozens of levels when the world truth supports it.
- Separate natural domains from reusable capability kits. A domain owns lived truth; a kit installs a reusable verb or descriptor; a service exposes controlled operations; a host adapts a platform; a proof validates.
- Audit the NexusEngine core before inventing local kits. World, scene loading, spatial, objects, graphics, presentation, input, physics, audio, and networking should reuse selected core capabilities.
- Give Expedition, Corridor, Party, Dread, and Shared Expedition one thin local composition kit each so multiple agents can work in unified natural lanes.
- Keep game HTML, React, Three.js, Web Audio, PeerJS, and storage as thin assemblers/adapters that ask the root composition for outcomes.

## No-Kit Decision

```text
neutral capability already exists in a consumed NexusEngine core
  -> use the core directly

target tuning, placement, palette, content, or one-off value
  -> use a preset/content pack

browser/React/Three/Web Audio/Peer/storage binding
  -> use an adapter/host

validation or evidence only
  -> use a proof harness

missing reusable HorrorCorridor verb or descriptor
  -> add one atomic local kit with explicit core requirements
```

## Unified Agent Lanes

```text
Horror Corridor Expedition
+-- Expedition          -> horror-expedition-kit
+-- Corridor            -> horror-corridor-world-kit
+-- Party               -> horror-party-kit
+-- Dread               -> horror-dread-kit
`-- Shared Expedition   -> horror-shared-expedition-kit
                         \
                          -> horror-corridor-game-kit
                               -> thin platform hosts
```

Agents deepen their own natural branch, attach atomic kits at the truth owner, and integrate through declared services and the shared root. They do not create parallel loops in HTML, render code, audio code, or transport.

## Current Composition Examples

The ceiling work did not create a ceiling gameplay domain or duplicate core. Natural truth stays at `Corridor / Ruin / Structure / Ceilings / Ceiling / Openings / Collapse`. Nexus object/shape/fidelity cores provide neutral ownership; the wound-mesh kit provides generic closed convex slabs; `collapsed-ceiling-object-kit` provides the one missing reusable ruin descriptor; `furnish-chamber-kit` places it; the Three host realizes it.

The floor-material work did not create a material taxonomy or duplicate graphics core. Natural truth stays at `Corridor / Ground / Surface / Paving / Concrete / Slabs / Slab`. Existing world/scene/spatial and graphics/presentation cores provide neutral substrate; the existing terrain shader and wet-concrete descriptor capabilities consume pure natural state; the HorrorCorridor preset supplies scale/palette/density; the Three host realizes it. Only the already-declared `settle-slabs-kit` and `crack-slab-kit` contracts moved from open to implemented.

## Durable Source

Read `docs/HorrorCorridor-Natural-World-Kit-Map.md` for the full ordered domain list, subdomains, purposes, evidence, 36-core inventory, kit candidates, composition edges, duplicate ledger, DSK boundaries, runtime/adapters/hosts/proofs, temporal ensemble, and promotion rules.
