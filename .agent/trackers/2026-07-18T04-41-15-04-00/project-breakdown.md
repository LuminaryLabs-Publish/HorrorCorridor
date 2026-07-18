# HorrorCorridor Project Breakdown

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`  
**Run:** `2026-07-18T04-41-15-04-00`  
**Selection class:** runtime-ahead / root-agent census stale  
**Pre-audit documented head:** `0345cedf4359b4e4bc9463d34076eeb8f295f7e4`  
**Reviewed pre-audit repository head:** `c346c229afb186d519cfc14c97485ed4502e9f17`

## Summary

HorrorCorridor was selected as the only project worked in this run after the Publish inventory and central ledger were compared and the repository was found 12 commits ahead of its documented repo-local head.

The new commits substantially deepen the nested `HorrorCorridor-V1/.agent` architecture, domain-service coverage, live-player harness, proof corpus and product-direction documentation. The root `.agent` audit state still described only 29 application/runtime kit surfaces plus two browser-proof adapters. The current application-level canonical evidence instead reports:

```txt
474 installed runtime kits
  = 36 NexusEngine core kits
  + 359 generated natural-domain owner kits
  + 73 local descriptor kits
  + 6 top-level composition kits

405 registered domain/API paths
359 mutable natural-domain state owners
428 unique target behavior-kit contracts
132 classified closed
296 classified open
59 canonical domain services
4 platform hosts
6 proof surfaces
```

The main documentation finding is therefore a dual-authority problem: the root `.agent` folder is the required repository governance surface, while `HorrorCorridor-V1/.agent` has become the canonical product architecture and coverage surface. Both are valid, but no explicit source-generation-projection contract previously bound them together.

## Selection

```txt
Publish repositories discovered: 11
excluded: LuminaryLabs-Publish/TheCavalryOfRome
eligible repositories: 10
central HorrorCorridor ledger: present
root HorrorCorridor .agent: present
reviewed documented repo-local head: 0345cedf4359b4e4bc9463d34076eeb8f295f7e4
reviewed current pre-audit head: c346c229afb186d519cfc14c97485ed4502e9f17
comparison: ahead by 12 commits
selected: LuminaryLabs-Publish/HorrorCorridor
projects modified in this run: 1
```

## Interaction loop

```txt
entry
  -> solo, host or client route
  -> loading and session setup
  -> PeerJS or local transport admission

runtime composition
  -> install 36 NexusEngine core kits
  -> generate and install 359 natural-domain owner kits
  -> adapt and install 73 local descriptor kits
  -> install 6 top-level composition kits
  -> expose 405 registered paths
  -> initialize resettable/snapshot-capable natural state

expedition
  -> begin expedition
  -> enter and stream successive buildings
  -> move, look, listen and use the flashlight
  -> encounter monsters
  -> study or repel within the response window
  -> survive, collect Monster Index knowledge and increase score
  -> accept optional room offerings
  -> continue indefinitely or become caught
  -> restart, reconnect or return through the appropriate route

projection
  -> synchronize host frame into natural owners
  -> realize descriptors through Three.js, Web Audio, React and Canvas2D hosts
  -> render chamber, hunter signs, flashlight response, UI and recovery state

proof and governance
  -> run reset/replay, browser, success/loss, reconnect and visual proofs
  -> classify every target behavior contract
  -> project canonical application evidence into root .agent
  -> synchronize the central LuminaryLabs ledger
```

## Domain inventory

The authoritative natural-domain source is:

```txt
HorrorCorridor-V1/.agent/horror-corridor-domain-tree.md
```

The generated executable blueprint is:

```txt
HorrorCorridor-V1/src/engine/generated/horrorCorridorDomainBlueprint.json
```

The current natural composition contains the root plus five top-level product domains:

| Domain | Owned meaning |
|---|---|
| `n:horror-corridor` | Whole expedition composition and shared product identity |
| `n:horror-corridor:expedition` | phase, delve progress, fate, score, chronicle and Monster Index |
| `n:horror-corridor:corridor` | maze, buildings, chambers, ruin, ground, water, overgrowth, atmosphere and traces |
| `n:horror-corridor:party` | explorers, bodies, hands, carried things, memory, togetherness and signals |
| `n:horror-corridor:dread` | tension, hazards, haunting, hunter, approach, blackout, last chance and capture |
| `n:horror-corridor:shared-expedition` | authority, shared world, departure, stewardship, leaving, rejoining and chronicle |

The canonical tree identifies every one of the 359 installed natural-domain owners. Each executable owner kit is deterministically identified from its domain path:

```txt
kit id = domain path with ':' replaced by '-' + '-domain-kit'
```

Example:

```txt
n:horror-corridor:corridor:ground:surface:paving:concrete:slabs:slab
  -> n-horror-corridor-corridor-ground-surface-paving-concrete-slabs-slab-domain-kit
```

No shortened list in the root tracker supersedes the canonical tree. The canonical tree and generated blueprint are the exhaustive domain inventory.

## Service inventory

The canonical tree declares 59 controlled domain services. The exhaustive service list is carried by each domain's `services` array in:

```txt
HorrorCorridor-V1/.agent/horror-corridor-domain-tree.md
HorrorCorridor-V1/src/engine/generated/horrorCorridorDomainBlueprint.json
```

Representative top-level and cross-domain services include:

```txt
expedition-service
begin-expedition
read-delve
query-known-way
resolve-expedition
read-expedition-record
read-monster-index
world-service
query-maze
query-way
party-service
dread-service
shared-expedition-service
```

Runtime owner APIs expose controlled `snapshot`, `patch` and `reset` operations for their declared state while preserving each domain's declared service metadata. Platform adaptation remains outside the natural services.

## Kit inventory

### 36 installed NexusEngine core kits

```txt
core-startup-domain
n-core-platform-kit
n-core-composition-kit
n-core-data-kit
n-core-transaction-ledger-kit
n-core-persistence-kit
n-core-assets-kit
n-core-input-kit
n-core-spatial-kit
core-world-domain
n-core-scene-kit
n-core-physics-kit
n-core-motion-kit
n-core-simulation-kit
n-core-interaction-kit
n-core-graphics-kit
n-core-skybox-kit
n-core-camera-kit
core-camera-framing-kit
core-presentation-domain
core-presentation-output-kit
n-core-ui-kit
core-ui-scale-kit
n-core-animation-kit
n-core-audio-kit
n-core-network-kit
n-core-diagnostics-kit
n-core-debug-kit
core-capture-domain
n-core-creature-kit
n-core-character-kit
n-core-player-kit
n-core-object-kit
n-core-vegetation-kit
core-object-shape-domain
core-object-fidelity-domain
```

### 6 installed composition kits

```txt
horror-expedition-kit
horror-corridor-world-kit
horror-party-kit
horror-dread-kit
horror-shared-expedition-kit
horror-corridor-game-kit
```

These composition kits require their complete natural child-domain path sets and provide one stable capability upward. They do not imply that every attached behavior contract is implemented.

### 359 generated natural-domain owner kits

Every canonical natural domain has one generated state-owner DSK. These kits provide reset, snapshot, patch and revisioned state-change semantics. Their exhaustive IDs are derived from the canonical paths by the deterministic rule documented above.

### 73 local descriptor kits

The complete local descriptor-kit inventory is created by:

```txt
HorrorCorridor-V1/src/protokits/createHorrorCorridorDomainKits.ts
HorrorCorridor-V1/src/protokits/index.ts
```

It includes maze/grid, flashlight, inventory, chamber furnishing, materials, textures, terrain, water, lighting, overgrowth, placement, wound-mesh and reusable ruin-object kits. Notable currently consumed kits include:

```txt
grid-maze-domain-kit
grid-field-domain-kit
flashlight-domain-kit
furnish-chamber-kit
inventory-domain-kit
broken-city-wall-domain-kit
procedural-pbr-material-domain-kit
prop-material-fidelity-domain-kit
water-surface-domain-kit
overgrowth-object-domain-kit
grass-object-spawn-domain-kit
wound-triangle-mesh-domain-kit
collapsed-ceiling-object-kit
broken-generator-object-kit
industrial-shelving-object-kit
brick-rubble-object-kit
debris-scatter-object-kit
lighting-descriptor-domain-kit
lighting-placement-domain-kit
object-placement-domain-kit
```

The authoritative exact installed list is the runtime snapshot's `descriptorKitIds` array and the live-player proof evidence.

### 428 target behavior-kit contracts

The exhaustive behavior-contract inventory, owner mapping, classification, evidence and next action are recorded in:

```txt
HorrorCorridor-V1/.agent/domain-service-coverage.md
```

Current classification:

| Classification | Count | Meaning |
|---|---:|---|
| `contract-only` | 275 | natural owner exists; reusable behavior is not implemented |
| `host-wired` | 9 | behavior is provided by a platform host adapter |
| `implemented-gameplay` | 34 | current product behavior and proof exist |
| `installed-core` | 34 | target contract maps to an installed NexusEngine core capability |
| `installed-local` | 55 | target contract maps to installed local descriptor behavior |
| `legacy-cutover` | 12 | behavior exists but is not yet mounted behind the canonical owner |
| `public-candidate` | 9 | a public NexusEngine candidate exists but is not yet admitted |

The classification totals 428. Closed/open status remains `132 / 296`.

## Hosts and proof surfaces

### Hosts

```txt
browser-game-host
three-world-host
peer-transport-host
headless-proof-host
```

### Proof surfaces

The canonical graph declares six proof surfaces and the repository carries focused feature proofs for reset/replay, live play, endless success, caught loss, restart, reconnect, floor material, wet response, ceiling structure/fracture/material, generator silhouette and industrial shelving.

## Main finding

```txt
root .agent governance
  -> still reports 29 application/runtime surfaces + 2 proof adapters

nested HorrorCorridor-V1/.agent canonical architecture
  -> reports 359 natural domains
  -> 428 target behavior contracts
  -> 59 services
  -> 474 installed runtime kits
  -> active proof and coverage evidence

missing boundary
  -> no explicit canonical-source admission result
  -> no generated-blueprint identity result
  -> no runtime-census result projected into root .agent
  -> no proof-evidence admission result tied to one generation
  -> no root-to-central settlement result
```

The 29-kit root registry was not false; it described a previous application-shell abstraction. It is no longer a complete runtime or product-architecture census.

## Required documentation authority

**Proposed, not implemented as runtime behavior:**

```txt
horror-corridor-domain-documentation-generation-authority-domain
```

```txt
CanonicalDomainSourceAdmissionCommand
  -> source path
  -> source SHA-256
  -> audited NexusEngine revision
  -> CanonicalDomainSourceAdmissionResult

DomainBlueprintGenerationCommand
  -> domain, state, kit, service, host and proof counts
  -> DomainBlueprintGenerationResult

RuntimeCompositionCensusCommand
  -> coreKitIds
  -> natural-domain owner IDs
  -> descriptorKitIds
  -> compositionKitIds
  -> registered paths
  -> RuntimeCompositionCensusResult

BehaviorCoverageClassificationCommand
  -> exact 428-contract ledger
  -> closed/open and classification counts
  -> BehaviorCoverageClassificationResult

ProofEvidenceAdmissionCommand
  -> proof id, created time, runtime generation and result digest
  -> ProofEvidenceAdmissionResult

RootAgentProjectionCommitCommand
  -> root .agent generation and source links
  -> RootAgentProjectionCommitResult

CentralLedgerCommitCommand
  -> repo head and root-agent generation
  -> CentralLedgerCommitResult
```

## Required invariants

```txt
one canonical natural-domain source per generation
one generated blueprint cites the canonical source hash
runtime census cites the same blueprint generation
coverage classification cites the same contract generation
proof evidence cites the runtime generation it exercised
root .agent cites the canonical source, blueprint, census and proof generation
central ledger cites the resulting repo-local documentation head
state-owner installation never implies behavior implementation
legacy application-shell inventory remains labeled as a partial abstraction
```

## Files added in this run

```txt
.agent/trackers/2026-07-18T04-41-15-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-18T04-41-15-04-00.md
.agent/architecture-audit/2026-07-18T04-41-15-04-00-natural-domain-execution-authority-dsk-map.md
.agent/render-audit/2026-07-18T04-41-15-04-00-proof-surface-generation-gap.md
.agent/gameplay-audit/2026-07-18T04-41-15-04-00-endless-expedition-domain-loop.md
.agent/interaction-audit/2026-07-18T04-41-15-04-00-domain-documentation-command-result-map.md
.agent/domain-governance-audit/2026-07-18T04-41-15-04-00-root-nested-canonical-contract.md
.agent/deploy-audit/2026-07-18T04-41-15-04-00-proof-artifact-generation-gate.md
.agent/central-sync-audit/2026-07-18T04-41-15-04-00-runtime-ahead-natural-domain-reconciliation.md
```

Required root files and `kit-registry.json` were refreshed. Runtime source, gameplay, rendering, transport, tests and deployment were not changed by this audit.

## Validation boundary

Source and existing proof artifacts were inspected through GitHub. The existing nested coverage ledger reports passing domain and coverage checks and cites live browser proof. Those commands were not rerun by this audit. No new runtime, visual, performance, networking, deployment or production-readiness claim is made.