# Natural Domain Depth Examples

Status: canonical

## Rule

A domain is a soft-bounded natural subject or lived system that owns coherent state and meaning. Recurse only when a child owns a narrower truth inside its parent. Behaviors become kits; controlled operations become services; adapters and proofs stay in the composition. Prefer recognizable subjects over storage or implementation labels, and name new behavior kits with short verbs.

## Living Tree

```text
domain: Overgrowth
`-- domain: Grove
    `-- domain: Trees
        `-- domain: Tree
            +-- domain: Roots
            +-- domain: Trunk
            `-- domain: Crown
                `-- domain: Boughs
                    `-- domain: Bough
                        `-- domain: Branches
                            `-- domain: Branch
                                `-- domain: Twigs
                                    `-- domain: Twig
                                        `-- domain: Buds
                                            `-- domain: Bud
                                                `-- domain: Leaf Cluster
                                                    `-- domain: Leaves
                                                        `-- domain: Leaf
                                                            +-- domain: Stalk
                                                            +-- domain: Blade
                                                            |   +-- domain: Veins
                                                            |   `-- domain: Surface
                                                            +-- domain: Leaf Life
                                                            +-- kit: unfurl-leaf-kit
                                                            +-- kit: age-leaf-kit
                                                            `-- service: inspect-leaf
```

## Corridor Fog

```text
domain: Corridor
`-- domain: Atmosphere
    `-- domain: Air
        `-- domain: Fog
            +-- domain: Fog Banks
            |   `-- domain: Fog Bank
            +-- domain: Fog Drift
            +-- domain: Fog Wake
            +-- kit: form-fog-kit
            +-- kit: drift-fog-kit
            `-- service: inspect-fog
```

## Rusted Door

```text
domain: Corridor
`-- domain: Ruin
    `-- domain: Access
        `-- domain: Doors
            `-- domain: Door
                +-- state: threshold
                +-- state: swing
                +-- state: latch
                +-- state: corrosion
                +-- kit: rusted-door-kit
                `-- service: resolve-access
```

The door is a natural object boundary because one door can own independent threshold, swing, latch, and corrosion truth. Its hinge mesh, latch animation, solver, and material realization remain kit or host internals.

## Blood Trail

```text
domain: Corridor
`-- domain: Traces
    `-- domain: Blood Trails
        `-- domain: Blood Trail
            `-- domain: Stains
                `-- domain: Stain
                    +-- state: position
                    +-- state: shape
                    +-- state: wetness
                    +-- state: age
                    +-- state: condition
                    +-- kit: age-stain-kit
                    `-- service: read-trace
```

## Hunter Awareness

```text
domain: Dread
`-- domain: Hunter
    +-- domain: Creature
    +-- domain: Awareness
    |   +-- domain: Attention
    |   +-- domain: Certainty
    |   `-- domain: Memory
    +-- domain: Intent
    +-- kit: perceive-explorer-kit
    +-- kit: choose-hunter-intent-kit
    `-- service: inspect-hunter
```

Perception and intent selection are reusable behaviors. Awareness, attention, certainty, and memory are natural truth owners.

## Torn Hanging Cloth

```text
domain: Corridor
`-- domain: Ruin
    `-- domain: Remnants
        `-- domain: Hanging Remains
            `-- domain: Cloth
                +-- state: cloth pieces
                +-- state: tears
                +-- state: wetness
                +-- kit: torn-cloth-kit
                `-- service: inspect-remnant
```

The cloth solver, stress propagation, constraints, vertices, and rendering are kit or host internals, not nested domains.

## Wet Concrete Floor

```text
domain: Corridor
`-- domain: Ground
    `-- domain: Surface
        `-- domain: Paving
            `-- domain: Concrete
                +-- state: concrete areas
                +-- state: aggregate exposure
                +-- state: moisture
                +-- kit: weather-concrete-kit
                `-- domain: Slabs
                    +-- state: slab membership
                    +-- state: slab alignment
                    +-- kit: settle-slabs-kit
                    `-- domain: Slab
                        +-- state: body
                        +-- state: cracks
                        +-- state: displacement
                        +-- state: wetness
                        `-- kit: crack-slab-kit
```

Concrete, its settled slab body, and one slab's damage are natural truth owners. Noise layers, shader functions, uniforms, aggregate dots, normal perturbation, renderer warmup, and screenshot gates are kit, host, or proof internals—not deeper domains.
