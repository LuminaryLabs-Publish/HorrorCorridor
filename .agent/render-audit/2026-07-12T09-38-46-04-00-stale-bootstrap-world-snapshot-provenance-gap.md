# Stale Bootstrap World/Snapshot Provenance Gap

**Timestamp:** `2026-07-12T09-38-46-04-00`

## Finding

`GameCanvas` initializes once. The first available snapshot is converted into a maze result and used to construct retained Three.js world resources. The local `initialized` guard prevents rebuilding those resources on later authoritative snapshot replacement.

## Divergence path

```txt
loading A commits snapshot A
  -> GameCanvas initializes
  -> maze/world A retained

loading B or stale A-late result commits snapshot B
  -> runtime authoritativeSnapshot becomes B
  -> GameCanvas does not rebuild retained maze/world
  -> camera, minimap and dynamic objects consume B
  -> static maze topology and world resources remain A
```

## Missing evidence

```txt
bootstrap generation on snapshot
world resource generation
world/snapshot compatibility predicate
stale snapshot rejection by run generation
world replacement transaction
first frame receipt citing run and resource generation
```

## Required render contract

```txt
committed RunBootstrapReceipt
  -> build candidate world resources for run generation
  -> validate world inventory and surface readiness
  -> atomically install matching world/snapshot generation
  -> render mandatory surfaces
  -> publish first visible frame receipt
  -> retire predecessor resources
```

No visible-frame or world/snapshot parity claim is valid until an executable overlapping-load fixture proves the retained world and accepted snapshot share one generation.
