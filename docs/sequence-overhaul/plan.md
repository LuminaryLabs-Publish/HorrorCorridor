# HorrorCorridor — Nexus Domain and Sequence Overhaul

## 1. Summary

**Build one game from reusable, connected environment compositions, driven by Nexus domains and playable sequences.**

The player walks through places with their own identity, activities and threats. Difficulty determines which encounters are appropriate, how they develop and how much recovery follows. Greyboxes establish the gameplay. Finished models, animation, sound and particles replace their presentation without rewriting the underlying game.

The overhaul preserves the existing game in recoverable frozen references, migrates to one root Next.js host, and ends with a verified push to `main`.

This is a proposed implementation plan. No game files, branches or dependencies were changed during this research.

### What the Nexus research changes

HorrorCorridor currently uses an older NexusEngine commit:

`06305727778d579ca18309221e60c3e41bd066c7`

The public engine HEAD I inspected is:

`a74e8689d1a71c0b42236c009f0f4c46e9b89387`

That difference matters. Current Nexus uses semantic domain imports, a smaller default runtime and explicit ownership manifests. Old `createCore*` imports and the fixed 36/38-kit expectation cannot simply carry forward unchanged. The engine documents this as a breaking migration. [Nexus domain migration](https://github.com/LuminaryLabs-Dev/NexusEngine/blob/a74e8689d1a71c0b42236c009f0f4c46e9b89387/docs/migrations/0.0.4-domain-cutover.md)

### The four-layer model

I found the underlying capabilities you are describing. However, Nexus does **not** define four universal composition-node types. Its current composition tree accepts `domain` and `kit` nodes.

For this game, the useful four-layer architecture is:

| Layer | Responsibility | HorrorCorridor example |
|---|---|---|
| **Core capabilities** | Reusable engine behavior and contracts | Object placement, scene lifecycle, navigation, sequence execution |
| **Game domains and services** | Own game meaning, state and decisions | Corridor passage, Dread stalking, Expedition collection |
| **Environment compositions** | Assemble capabilities into playable places | Tavern, flooded laundry, mortuary |
| **Playable sequences** | Coordinate how the experience unfolds | Arrival, investigation, warning, confrontation, release |

These are architectural roles—not four new engine classes or a requirement to force every feature through four folders.

The Next.js host, concrete renderer, audio implementation and authoring tools sit around this graph. They do not become additional gameplay authorities.

### Three different graphs must stay distinct

- **Capability graph:** which domains and kits are installed, and what they require.
- **Spatial graph:** which environments, entrances and navigation regions connect.
- **Sequence graph:** which experiences are active, completed, interrupted or available next.

An environment can exist spatially before its encounter starts. A monster kit can be installed without spawning a monster. A sequence can wait for an environment to become ready without owning its meshes.

This distinction prevents the next version from becoming another giant controller.

---

## 2. Possible sequential plan

### 2.1 Establish the product contract before restructuring

**Outcome:** one explicit definition of the game that survives the overhaul.

**Owner:** Expedition for progression and fate; Dread for encounter consequences; the root composition for their coordination.

**Inputs:** the existing game, this conversation, the Drive Game Overview and the current source.

**Proposed work:**

- Preserve exploration, monster study, collection, offerings, continuous traversal, capture, restart and retained knowledge.
- Keep the approximately eight-hour campaign as the long-term content target.
- Keep endless exploration available after—or separately from—the authored campaign.
- Distinguish a successful frightening encounter from a terminal capture.
- Preserve the promise that standing still during the relevant darkness phase creates danger.
- Define monster-specific exceptions explicitly instead of letting instructions contradict each other.
- Do not introduce combat, crafting, stamina depletion or inventory management merely because other horror games use them.

The central loop remains:

**Enter a place → understand its clues → encounter its monster → choose a response → survive and learn → collect or study → continue.**

Walking connects decisions. It is not the whole activity.

**Important rule decision:** a monster that requires standing still must communicate when that response is safe. The current “stand-with-beam” behavior and “keep moving” survival rule need an explicit phase distinction.

**Output:** a concise gameplay contract with accepted rules, unresolved decisions and named owners.

**Gate:** every proposed system supports this loop. Nothing silently replaces collection with simple avoidance.

---

### 2.2 Freeze the old game as something genuinely recoverable

**Outcome:** the cleanup cannot destroy the only working copy or erase useful experiments.

**Owner:** repository migration and release workflow—not a gameplay domain.

A frozen state needs more than a save file. It needs the executable interpretation of that save.

Preserve:

- Exact Git commits and named frozen references.
- Dependency locks and the old Nexus package identity.
- Asset source locations, hashes and required binaries.
- Save schemas and representative saves.
- Fixed seeds and reproducible input sequences.
- Existing proof reports, accepted captures and recording references.
- Launch instructions and known platform requirements.
- Unique changes in other worktrees.

The repository currently has several older swarm worktrees. Their registration is visible, but their individual modification state was not audited in this planning pass.

**Proposed process:**

1. Inventory the primary checkout and every registered worktree.
2. Classify each worktree as incorporated, unique, abandoned-by-owner or unresolved.
3. Preserve uncommitted work without resetting or cleaning it.
4. Create an archive manifest linking each frozen reference to its assets and evidence.
5. Restore each required baseline in an isolated location.
6. Prove it launches before removing its old active location.

Keep separate identities for:

- **Frozen source revision:** the code and content definitions.
- **Runtime checkpoint:** a particular expedition state.
- **Presentation revision:** models, materials and effects.
- **Evidence revision:** the build a report actually tested.

**Gate:** restoration is demonstrated. “It is in Git somewhere” is not enough.

---

### 2.3 Prove the Nexus migration before changing gameplay

**Outcome:** a small current-Nexus runtime can reproduce the essential old behavior.

**Owner:** the game’s Nexus composition boundary.

The existing `createHorrorCorridorV2` is useful because it already separates runtime construction from the browser host. Retain that architectural boundary, even if the implementation and public name change.

Do not migrate engine APIs, rewrite movement, replace world generation and change monster rules in one undifferentiated commit.

**Migration order:**

1. Establish an exact candidate Nexus revision.
2. Inspect its generated public exports and manifests.
3. Map every currently used capability to its current owner.
4. Build a minimal headless composition.
5. Port one existing runtime scenario without intentional gameplay changes.
6. Compare semantic outcomes.
7. Only then begin the environment overhaul.

The inspected public HEAD is a candidate, not an automatically accepted dependency. Pin it only after the consumer proof passes. Do not depend on a moving `main` URL.

#### Core capabilities to reuse

| Need | Current semantic owner to inspect and consume |
|---|---|
| Clock and execution | Runtime lifecycle, realtime and sequence |
| Save envelopes and exact-once changes | Runtime persistence and transaction |
| Object identity and placement | Object and Spatial |
| Environment activation | World and Scene |
| Procedural layouts and connectors | World Generation |
| Navigation and A* | World Navigation |
| Player/monster entity contracts | Actor |
| Input and interaction requests | Interaction |
| Movement and physical queries | Simulation Motion and the proven physics/provider path |
| Visual, camera, audio and animation descriptions | Presentation |
| Assets and dependencies | Asset |
| Replication and diagnostics | Network and Diagnostics |
| Capability discovery and installation planning | Composition |

Current Nexus contains a public A* pathfinding kit requiring a navigation capability. That gives us a reusable pathfinding primitive; it does not automatically produce monster perception, valid environment navmeshes or believable pursuit. [Pathfinding implementation](https://github.com/LuminaryLabs-Dev/NexusEngine/blob/a74e8689d1a71c0b42236c009f0f4c46e9b89387/src/core-domains/world/navigation/pathfinding/kits/pathfinding-kit/index.js)

**Critical limitation:** the newer `n:physics` and `n:render` foundations describe portable contracts and lifecycle records. They do not, by themselves, supply a complete solver or GPU renderer. Concrete providers remain necessary. [Current Nexus architecture](https://github.com/LuminaryLabs-Dev/NexusEngine/blob/a74e8689d1a71c0b42236c009f0f4c46e9b89387/docs/CURRENT-ARCHITECTURE.md)

**Gate:** the installed graph runs, snapshots and resets without duplicate owners. Import success alone does not pass.

---

### 2.4 Make domain ownership real, not decorative

**Outcome:** kits install actual capabilities instead of merely wrapping a large existing controller.

The current `domainKits.ts` publishes five controller objects. Several entries in `behaviorKits.ts` mainly bind those controllers together. That is a starting point, but not the final depth of domain composition you want.

Retain five natural top-level owners:

- **Expedition:** the journey’s meaning, progression, knowledge and fate.
- **Corridor:** the places, passage and environmental conditions.
- **Party:** the explorer’s body, gaze, intentions and condition.
- **Dread:** threats, perception, response rules and encounter consequences.
- **Shared Expedition:** shared authority, presence and recovery.

Within them, split only where a real responsibility exists.

For example:

- A tavern’s visual sign is content, not necessarily a domain.
- Its cellar mechanism becomes a domain-owned capability if it has independent state and interaction rules.
- A navigation query is a service call, not a second monster brain.
- A room instance is data managed by an installed capability, not a reason to install the same kit again.

Each stateful local kit must declare:

- Stable identity and version.
- Owning domain and immediate parent.
- Owned state and forbidden responsibilities.
- Required capabilities and supplied capabilities.
- Commands, results and emitted events.
- Snapshot, reset and restore behavior.
- Duplicate-install behavior.
- Its focused proof.

A recipe only selects and configures capabilities. It does not create shadow state. This matches Nexus’s distinction between semantic owners, atomic behavior and composition data. [Nexus mental model](https://github.com/LuminaryLabs-Dev/NexusEngine/blob/a74e8689d1a71c0b42236c009f0f4c46e9b89387/docs/guide/chapters/02-mental-model.md)

**Gate:** every durable value has one writer. Other domains use IDs, service calls or events.

---

### 2.5 Build environments as compositions of places

**Outcome:** an environment is a reusable playable place—not a hard-coded mesh builder with gameplay attached.

Start with a shared environment-definition contract.

| Record | Required information |
|---|---|
| Identity | Definition ID, version, content hash, district and intended role |
| Space | Local origin, coordinate convention, bounds and floor heights |
| Connections | Entrance/exit transforms, dimensions, direction and compatibility |
| Traversal | Collision proxies, walkable regions, navigation links and clearance |
| Interactions | Stable anchors, verbs, local state and service bindings |
| Encounters | Spawn regions, warning anchors, approach routes and exclusions |
| Presentation | Greybox binding, model binding, material slots, audio and effect anchors |
| Pacing | Safe, investigative, threatening or recovery role |
| Streaming | Dependencies, preparation requirements and release conditions |

#### Keep definition and instance separate

The tavern definition can be reused. A particular tavern instance has its own:

- Instance ID.
- World transform.
- Resolved variation choices.
- Interaction state.
- Discovered clues.
- Encounter references.
- Visitation state.
- Content-version references.

The instance never modifies the shared definition.

#### Connector assembly rules

The Corridor passage service should:

1. Select a compatible next environment.
2. Align its entrance to the current exit.
3. Validate dimensions, floor continuity and traversal clearance.
4. Check geometry overlap and navigation connectivity.
5. Resolve deterministic variation.
6. Commit the instance and its connection.
7. Prepare its assets and collision before exposing the crossing.

Different environments can have different lengths. Stop using segment number alone as the primary meaning of progression.

The existing `districtForSegment()` advances districts in fixed segment groups. Replace that selection policy with an authored route grammar and resolved environment instances. Preserve deterministic behavior without preserving the old repetition pattern.

#### Failure behavior

When a candidate does not fit:

- Try a bounded set of deterministic alternatives.
- Use a tested neutral connector if appropriate.
- Record the rejected reason.
- Never publish a broken placement.
- Never silently teleport the player to make the seam work.

**Gate:** the player and a navigation agent can traverse every accepted connection.

---

### 2.6 Greybox complete places before producing final art

**Outcome:** a connected section already plays correctly with primitive geometry.

The first section should contain:

- Safe arrival.
- Maintenance passage.
- Tavern.
- A transition that changes sightlines.
- Flooded laundry.
- Recovery space.

These are not six equally sized boxes. Each proves a different spatial or gameplay requirement.

#### Safe arrival

Proves:

- Spawn clearance.
- Movement and camera scale.
- Forward orientation.
- Basic flashlight use.
- A threat-free baseline.

#### Maintenance passage

Proves:

- A narrow route without snagging.
- An inspectable mechanism.
- A warning sound with a meaningful direction.
- Connector alignment.

#### Tavern

Proves:

- A larger interior.
- Furniture that affects traversal.
- More than one sightline.
- A local clue or offering.
- A monster navigating around an obstacle.

#### Flooded laundry

Proves:

- Different environmental identity.
- An acoustic change.
- Occluded views through equipment.
- Safe treatment of water or wet-floor semantics.
- Reuse of the same encounter infrastructure in a different layout.

#### Recovery space

Proves:

- An understandable release of pressure.
- A chance to inspect the Index.
- Continuous passage onward.
- No accidental immediate respawn of a threat.

**Visual target:** correct scale, visible floor-wall separation, readable exits, grounded props and a recognizable monster proxy.

Use neutral materials and restrained lighting. Darkness comes in after the route works. Diagnostic colors belong in the authoring view; the normal player view must work without them.

**Gate:** the full loop works in greybox, including capture and recovery. A nice screenshot is insufficient.

---

### 2.7 Build sequence domains around playable outcomes

**Outcome:** the experience is composed from reusable sequence definitions rather than another monolithic update function.

Use two separate sequence purposes.

**Runtime sequences**

Coordinate the player’s experience using events, conditions and authoritative simulation time.

**Authoring sequences**

Coordinate finite content-building operations, previews and accepted results.

Nexus’s authoring sequence surface currently describes bounded linear execution. It is not an autonomous production planner. The surrounding authoring harness must decide what to build next and how to handle failed reviews. [Nexus Authoring](https://github.com/LuminaryLabs-Dev/NexusEngine/blob/a74e8689d1a71c0b42236c009f0f4c46e9b89387/AUTHORING.md)

#### Runtime sequence responsibilities

A playable sequence may:

- Request that an environment be prepared.
- Wait for an environment-entry event.
- Request an eligible encounter from Dread.
- Wait for a clue inspection or mechanism result.
- Observe an encounter resolution.
- Request progression or an offering through the owning service.
- Finish, cancel or transition to another sequence.

It must not:

- Write directly into another domain’s state.
- Set the Monster Index to collected.
- Move the player by changing a render object.
- Use a UI timer to determine capture.
- Award the same offering twice after reload.

#### Before, During and After

Use this as an authoring convention for each experience:

- **Before:** prerequisites, environment readiness, eligibility and recovery.
- **During:** player freedom, observations, interaction and threat.
- **After:** accepted outcome, cleanup, rewards and next availability.

The player is not forced to follow a cinematic timetable. Investigation can take longer. An optional room can be skipped. A warning only starts when its conditions are valid.

Nexus already provides sequence-node validation and execution surfaces. Game-specific nodes should translate their events into public domain commands rather than using generic state-writing nodes across domain boundaries. [Sequence implementation](https://github.com/LuminaryLabs-Dev/NexusEngine/blob/a74e8689d1a71c0b42236c009f0f4c46e9b89387/src/core-domains/runtime/sequence/runtime/sequence-node-kit.js)

#### Resume is a specific engineering gate

The inspected runtime exposes snapshots, but that does not establish complete mid-encounter restoration for this game.

Before depending on it, prove:

- Which node state can be restored.
- How subscriptions are rebuilt.
- How elapsed windows resume.
- How completed actions avoid executing again.
- How interrupted actions reconcile with domain receipts.

If exact continuation is unsupported, implement a game-owned checkpoint adapter over public APIs. Do not pretend a raw diagnostic snapshot is a complete save.

**Gate:** reload during warning, pursuit, blackout and reward processing produces the intended continuation without duplicate consequences.

---

### 2.8 Make difficulty select encounters intelligently

**Outcome:** difficulty changes pressure and variety while preserving understandable rules.

Separate the decisions:

- Expedition supplies selected difficulty and campaign progress.
- Corridor supplies the environment’s valid opportunities.
- Dread selects threats and encounter parameters.
- Sequence coordination determines when the encounter becomes eligible.
- Presentation expresses the result.

An encounter request should include:

- Environment instance and version.
- Difficulty profile.
- Progression band.
- Recently encountered families.
- Current recovery allowance.
- Player count where supported.
- Available anchors and navigation regions.
- Required response affordances.
- Deterministic selection seed.

#### Eligibility before randomness

First eliminate candidates that cannot work.

Examples:

- A pursuer too large for the available route.
- A stationary response without a safe stance area.
- A directional warning whose anchor cannot be distinguished.
- A water-associated encounter in a location without its required features.
- A threat that requires an interaction unavailable in this environment.

Then score eligible candidates for pacing, novelty and authored intent.

Only then make the seeded selection.

#### Difficulty controls

Tune bounded parameters such as:

- Warning length.
- Pursuit speed and search persistence.
- Frequency of encounter opportunities.
- Required response precision.
- Recovery spacing.
- Complexity of response combinations.

Do not use difficulty as permission to violate the basic fairness contract.

Start with one active lethal threat. Multiple simultaneous threats become eligible only when their response rules have been tested together. Never require the player to stand still and keep moving at the same time.

Do not silently introduce adaptive difficulty. If added later, expose its purpose and save its decisions.

**Gate:** fixed seeds reproduce selections, and every selected encounter has a valid response path.

---

### 2.9 Replace scalar pursuit with spatial stalking

**Outcome:** monsters occupy and move through the environment rather than merely reducing a distance number.

The current Dread implementation updates distance and bearing. Replace that model through a bounded migration:

1. Introduce monster entity pose and navigation identity.
2. Give the monster a perception result.
3. Let Dread choose a behavioral intention.
4. Ask navigation for a path.
5. Advance motion through the approved movement/collision provider.
6. Evaluate flashlight contact against actual spatial position.
7. Emit the resulting warning, repulsion or capture events.

Keep separate:

- **Perception:** what the monster can detect.
- **Intention:** what it wants to do.
- **Navigation:** how it can reach a position.
- **Motion:** how its body advances.
- **Encounter rules:** what that means for the player.

Start with one characteristic stalker:

- Waits outside the opening safe area.
- Signals its presence before attack.
- Searches around an occluder.
- Approaches using a real path.
- Reacts to the flashlight.
- Triggers blackout and last chance under the accepted rules.
- Releases pressure after resolution.

Pathfinding failure must not become an invisible attack. It should produce a controlled retry, search behavior or encounter cancellation according to the definition.

**Gate:** the player can observe the monster taking a valid route around an obstacle, losing contact and reacquiring appropriately.

---

### 2.10 Make model replacement a contract

**Outcome:** finished art replaces a greybox without changing gameplay accidentally.

Every replaceable assembly needs:

- Stable semantic identity.
- Defined dimensions and local origin.
- Named material slots.
- Interaction sockets.
- Audio and effect sockets.
- Animation bindings where required.
- A separate collision representation.
- A navigation envelope.
- A declared visual asset revision.

The visual model may be more detailed than the collision proxy. It must not introduce a visible opening the player cannot enter or hide an invisible barrier.

Replacing a model should not change:

- Save identity.
- Environment instance ID.
- Connector placement.
- Interaction target identity.
- Monster eligibility.
- Reward ownership.

If the art genuinely changes traversal, treat that as a new environment-definition revision with new navigation proof. It is not a cosmetic swap.

#### Particles and effects

Use local effect recipes consuming authoritative events:

- Dust from disturbed objects.
- Steam from machinery.
- Water drips and splashes.
- Electrical arcing.
- Breath or mist around a threat.
- Brief scare effects associated with an encounter.

Keep particle counts, GPU buffers and mesh handles out of gameplay saves. Preserve only meaningful effect events or timing references where replay needs them.

Use pooled emitters, bounded lifetime, distance culling and quality profiles. Gameplay must remain readable at reduced effects quality.

**Gate:** identical semantic inputs produce equivalent gameplay before and after the model swap.

---

### 2.11 Introduce the root Next.js host without moving gameplay into it

**Outcome:** one root application launches and hosts the game.

The host owns:

- Loading the game module.
- Canvas and browser lifecycle.
- Input attachment and pointer lock.
- Audio unlock.
- Resize and fullscreen.
- Pause/resume policy.
- Settings and player-facing menus.
- Error and recovery presentation.
- Starting and disposing the runtime.

It does not own:

- Monster selection.
- Capture timing.
- Environment generation.
- Collection decisions.
- Offering rewards.
- Campaign progression.

Reuse the existing `BrowserGame.tsx` behavior where appropriate, but remove Vite-specific assumptions during the host migration.

Keep the game behind a client-only boundary. Browser globals must not execute during server rendering. The normal game remains an interactive browser runtime, not a collection of server-rendered gameplay routes. [Next.js client-only loading](https://nextjs.org/docs/app/guides/lazy-loading)

Retain one fixed-step driver. Do not tick Nexus once through the old host and again through a new sequence integration.

Prepare explicit behavior for tab suspension. A long browser pause must not become a huge simulation jump and immediate death on return.

**Gate:** repeated navigation, mount/unmount and development remounts do not duplicate runtimes, listeners, audio contexts or animation loops.

---

### 2.12 Preserve one authoring workflow

**Outcome:** workers can build one environment or encounter without loading the entire campaign.

Reuse the existing authoring MCP and packet lifecycle.

Each packet should contain:

- Player outcome.
- Owning domain.
- Environment or encounter target.
- Direct dependencies.
- Immediate neighboring sequence beats.
- Relevant accepted updates.
- Exact allowed files.
- Evidence requirements.
- One current fix plan.

Keep two preview modes clearly named:

- **Visual fixture:** inspect geometry, materials, silhouettes and model bindings.
- **Playable slice:** run the real runtime from a validated checkpoint or scenario.

A visual fixture cannot claim gameplay success. A headless scenario cannot claim good sound or lighting.

Authoring source and shipping content also need one authority each:

- TypeScript remains authoritative for game rules and current runtime descriptors.
- Where Nexus Authoring is adopted for editable geometry or assemblies, its Project document becomes the source authority for that asset.
- Published runtime packets are derived outputs, not a second hand-edited catalog.
- The authoring metadata overlay stores intent and evidence—not duplicate gameplay values.

**Gate:** one environment can move from specification to greybox, playable proof and art replacement without editing the central renderer or duplicating the harness.

---

### 2.13 Expand into the full campaign

**Outcome:** the modular system produces an authored journey, not random rooms forever.

Use the existing district identities as source material. The following grouping is a proposal, not established story canon:

| Campaign movement | Existing identities to develop | Primary progression purpose |
|---|---|---|
| Arrival | Service Spine | Learn movement, warnings and safe response |
| Shuttered commerce | Night Market | Investigation and first meaningful collection choices |
| Care and confinement | Charity Ward | Occlusion, local mechanisms and deceptive safety |
| Below the flood | Flood Line | Environmental identity and acoustic uncertainty |
| Ritual machinery | Pilgrim Mile, Boiler Parish | Learned rules under increased pressure |
| Buried records | Records Below | Discovery, interpretation and encounter variation |
| Exhausted habitation | Last Platform, Sleeping Shift | Longer connected sequences and recovery decisions |
| Final descent | Provision Tombs, Cold Delivery, Unmarked Return | Mastery, campaign resolution and endless continuation |

Budget approximately eight hours of first-time play across the completed campaign. Measure actual time spent exploring, interacting, responding and discovering.

Do not count:

- Repeated failed attempts as new content.
- Long mandatory empty walks.
- Loading time.
- Replayed harness prefixes.
- Cosmetic monster variants as distinct decisions.

Retain the 124-manifestation inventory, but review variety at the family and encounter level. Every family needs a recognizable cue, characteristic scare, actionable response and collection meaning.

**Gate:** the content map demonstrates what changes from one campaign movement to the next, and playtests confirm that distinction.

---

## 3. Outcome state

The following is a **semantic ownership and composition tree**. It is deliberately deeper than a folder inventory.

`[Core]` means an engine capability to verify and reuse.

`[Local]` means game-owned implementation.

`[Recipe]` means authored composition data.

`[Provider]` means a replaceable concrete implementation.
`[Derived]` means generated output, not a second source of truth.

```text
HorrorCorridor
|
+-- Product contract
|   |
|   +-- Player purpose
|   |   +-- Explore unsettling connected places
|   |   +-- Understand characteristic monster warnings
|   |   +-- Choose study or risk full collection
|   |   +-- Survive without being caught
|   |   `-- Carry knowledge into the next expedition
|   |
|   +-- Campaign
|   |   +-- Authored progression toward approximately eight hours
|   |   +-- Optional investigation and collection opportunities
|   |   +-- A defined campaign resolution
|   |   `-- Endless continuation using accepted environment grammar
|   |
|   `-- Non-negotiable distinctions
|       +-- Scare experience is not automatically capture
|       +-- Collection count is not encounter variety
|       +-- Route length is not enjoyable playtime
|       +-- Visual fixture is not authoritative gameplay
|       `-- Sequence completion is not proof of player satisfaction
|
+-- Layer 1: Nexus Core capabilities
|   |
|   +-- Runtime [Core]
|   |   +-- Lifecycle
|   |   |   +-- Installation
|   |   |   +-- Startup
|   |   |   `-- Shutdown
|   |   +-- Realtime
|   |   |   +-- One authoritative simulation clock
|   |   |   +-- Fixed-step execution
|   |   |   `-- Ordered event processing
|   |   +-- Sequence execution
|   |   |   +-- Node definitions and validation
|   |   |   +-- Event and condition completion
|   |   |   +-- Bounded timed windows
|   |   |   `-- Observable execution state
|   |   +-- Transaction
|   |   |   +-- Operation identity
|   |   |   +-- Accepted result receipts
|   |   |   `-- Duplicate-operation handling
|   |   `-- Persistence contracts
|   |       +-- Portable records
|   |       +-- Versioned envelopes
|   |       `-- Host-backed storage
|   |
|   +-- Composition [Core]
|   |   +-- Trusted registry metadata
|   |   +-- Semantic owner identities
|   |   +-- Capability requirements and providers
|   |   +-- Dependency and topology validation
|   |   +-- Exact source and configuration plan
|   |   `-- Accepted installation receipt
|   |
|   +-- World and spatial capabilities [Core]
|   |   +-- Object
|   |   |   +-- Identity and intrinsic description
|   |   |   +-- Placement references
|   |   |   `-- Geometry and shape contracts
|   |   +-- Spatial
|   |   |   +-- Transforms and coordinate spaces
|   |   |   +-- Bounds and zones
|   |   |   `-- Spatial queries
|   |   +-- World
|   |   |   +-- World and cell identity
|   |   |   +-- Finite active regions
|   |   |   `-- Deterministic assembly records
|   |   +-- Scene
|   |   |   +-- Scene definition and lifecycle
|   |   |   +-- Accepted transitions
|   |   |   `-- Host-neutral binding records
|   |   +-- Generation
|   |   |   +-- Seeded selection primitives
|   |   |   +-- Generic regions and connectors
|   |   |   `-- Walkability descriptions
|   |   `-- Navigation
|   |       +-- Portable navigation representation
|   |       +-- A* query service
|   |       +-- Path success/failure results
|   |       `-- Route and landmark queries
|   |
|   +-- Actor, interaction and simulation [Core]
|   |   +-- Actor identities
|   |   +-- Player and creature contracts
|   |   +-- Semantic input
|   |   +-- Interaction requests
|   |   +-- Motion descriptions
|   |   `-- Verified physical query/provider boundary
|   |
|   +-- Presentation and assets [Core]
|   |   +-- Asset identity and dependencies
|   |   +-- Graphics descriptors
|   |   +-- Camera descriptors
|   |   +-- Animation descriptions
|   |   +-- Audio descriptions
|   |   +-- UI and output policy
|   |   `-- Render contracts only where a provider consumes them
|   |
|   `-- Infrastructure [Core]
|       +-- Network contracts
|       +-- Diagnostics
|       +-- Host capability contracts
|       `-- Optional authoring capabilities outside shipping gameplay
|
+-- Layer 2: HorrorCorridor domains and their local kits
|   |
|   +-- Expedition [Local]
|   |   |
|   |   +-- Journey
|   |   |   +-- Campaign position
|   |   |   +-- Discovered routes
|   |   |   +-- Objective outcomes
|   |   |   `-- Journey Progress Kit
|   |   |       +-- Accept environment-entry receipts
|   |   |       +-- Accept completed local objectives
|   |   |       `-- Expose progression without moving the player
|   |   |
|   |   +-- Knowledge
|   |   |   +-- Monster Index
|   |   |   |   +-- Stable family and manifestation identities
|   |   |   |   +-- Observed warnings
|   |   |   |   +-- Study results
|   |   |   |   `-- Collection results
|   |   |   +-- Chronicle
|   |   |   |   +-- Discoveries
|   |   |   |   `-- Significant expedition outcomes
|   |   |   `-- Encounter Knowledge Kit
|   |   |       +-- Consume Dread result receipts
|   |   |       +-- Apply each result once
|   |   |       `-- Retain accepted knowledge across restart
|   |   |
|   |   +-- Offerings
|   |   |   +-- Eligibility and reward meaning
|   |   |   +-- Accepted player choice
|   |   |   `-- Offering Reward Kit
|   |   |       +-- Validate claim receipt
|   |   |       +-- Apply consequence once
|   |   |       `-- Publish resulting progression
|   |   |
|   |   +-- Fate
|   |   |   +-- Active run
|   |   |   +-- Captured run
|   |   |   +-- Campaign completion
|   |   |   `-- Run Recovery Kit
|   |   |       +-- Define restart destination
|   |   |       +-- Preserve promised knowledge
|   |   |       `-- Request restoration through public services
|   |   |
|   |   `-- Difficulty
|   |       +-- Selected profile
|   |       +-- Progression band
|   |       `-- Difficulty Context Kit
|   |           +-- Supply encounter context
|   |           `-- Never spawn monsters itself
|   |
|   +-- Corridor [Local]
|   |   |
|   |   +-- Passage
|   |   |   +-- Route grammar
|   |   |   |   +-- Allowed environment neighbors
|   |   |   |   +-- Main-route continuity
|   |   |   |   +-- Optional investigation branches
|   |   |   |   `-- Recovery placement constraints
|   |   |   +-- Environment connections
|   |   |   |   +-- Entrance and exit sockets
|   |   |   |   +-- Alignment transforms
|   |   |   |   +-- Floor and clearance checks
|   |   |   |   `-- Navigation seam checks
|   |   |   `-- Passage Assembly Kit
|   |   |       +-- Resolve seeded candidates
|   |   |       +-- Reject incompatible placements
|   |   |       +-- Commit accepted instance graph
|   |   |       `-- Preserve choices across reload
|   |   |
|   |   +-- Places
|   |   |   +-- Environment definitions
|   |   |   |   +-- Stable identity and version
|   |   |   |   +-- District and spatial role
|   |   |   |   +-- Required capability references
|   |   |   |   `-- Presentation binding references
|   |   |   +-- Environment instances
|   |   |   |   +-- Unique instance identity
|   |   |   |   +-- Resolved variation
|   |   |   |   +-- Local interaction state
|   |   |   |   `-- Encounter and visitation references
|   |   |   `-- Place Residency Kit
|   |   |       +-- Prepare upcoming place
|   |   |       +-- Activate accepted place
|   |   |       +-- Retain occupied or threatened places
|   |   |       +-- Snapshot dormant place state
|   |   |       `-- Release presentation and navigation resources
|   |   |
|   |   +-- Traversal
|   |   |   +-- Walkable surfaces
|   |   |   +-- Collision proxy references
|   |   |   +-- Navigation regions and cross-place links
|   |   |   `-- Traversal Query Kit
|   |   |       +-- Request physical query results
|   |   |       +-- Validate candidate movement
|   |   |       `-- Supply route availability to Dread
|   |   |
|   |   +-- Local mechanisms
|   |   |   +-- Inspectable clues
|   |   |   +-- Operable fixtures
|   |   |   +-- Offering sites
|   |   |   `-- Place Interaction Kit
|   |   |       +-- Validate target and range
|   |   |       +-- Change local mechanism state
|   |   |       `-- Emit accepted interaction receipt
|   |   |
|   |   `-- Environmental conditions
|   |       +-- Illumination and beam contact
|   |       +-- Acoustic regions and warning anchors
|   |       +-- Environmental effect descriptions
|   |       `-- Condition services
|   |           +-- Publish spatial facts
|   |           `-- Never decide study, collection or capture
|   |
|   +-- Party [Local]
|   |   +-- Explorer identity
|   |   +-- Body
|   |   |   +-- Movement intent
|   |   |   +-- Accepted pose
|   |   |   `-- Explorer Motion Kit
|   |   +-- Gaze
|   |   |   +-- Look intent
|   |   |   +-- View direction
|   |   |   `-- Explorer Gaze Kit
|   |   +-- Flashlight
|   |   |   +-- Activation intent
|   |   |   +-- Aim
|   |   |   `-- Flashlight Intent Kit
|   |   `-- Condition
|   |       +-- Accepted restrictions
|   |       +-- Recovery state
|   |       `-- No independent capture decision
|   |
|   +-- Dread [Local]
|   |   |
|   |   +-- Encounter eligibility
|   |   |   +-- Difficulty compatibility
|   |   |   +-- Environment affordances
|   |   |   +-- Opening protection
|   |   |   +-- Recent-family exclusions
|   |   |   +-- Recovery allowance
|   |   |   `-- Encounter Selection Kit
|   |   |
|   |   +-- Monster presence
|   |   |   +-- Entity identity
|   |   |   +-- Spawn anchor
|   |   |   +-- Physical extent
|   |   |   `-- Grounded Spawn Kit
|   |   |
|   |   +-- Perception
|   |   |   +-- Relevant player observations
|   |   |   +-- Last known position
|   |   |   +-- Lost-contact state
|   |   |   `-- Threat Perception Kit
|   |   |
|   |   +-- Stalking
|   |   |   +-- Search intention
|   |   |   +-- Approach intention
|   |   |   +-- Path request and revision
|   |   |   +-- Reacquisition
|   |   |   `-- Stalker Pursuit Kit
|   |   |       +-- Consume navigation results
|   |   |       +-- Request movement
|   |   |       `-- Handle unavailable routes without teleporting
|   |   |
|   |   +-- Characteristic scare
|   |   |   +-- Warning pattern
|   |   |   +-- Response rule
|   |   |   +-- Exposure requirement
|   |   |   `-- Monster Response Kit
|   |   |
|   |   +-- Darkness
|   |   |   +-- Forced-blackout state
|   |   |   +-- Last-chance window
|   |   |   +-- Movement-sensitive danger
|   |   |   `-- Darkness Response Kit
|   |   |
|   |   `-- Encounter outcome
|   |       +-- Studied
|   |       +-- Collected
|   |       +-- Captured
|   |       +-- Cancelled with reason
|   |       `-- Encounter Resolution Kit
|   |           +-- Publish one terminal result
|   |           `-- Leave Index and rewards to Expedition
|   |
|   `-- Shared Expedition [Local]
|       +-- Session identity and presence
|       +-- Host-authoritative input acceptance
|       +-- Versioned snapshot publication
|       +-- Content/engine compatibility handshake
|       +-- Disconnect and reconnect state
|       `-- Shared Recovery Kit
|           +-- Restore acknowledged authority
|           `-- Never maintain a second gameplay simulation authority
|
+-- Layer 3: Environment compositions [Recipe]
|   |
|   +-- Safe arrival
|   |   +-- Threshold assembly
|   |   |   +-- Floor and walls
|   |   |   +-- Spawn clearance
|   |   |   `-- Visible exit
|   |   +-- Light and acoustic bindings
|   |   +-- Introductory interaction
|   |   `-- No-threat eligibility profile
|   |
|   +-- Maintenance passage
|   |   +-- Passage shell
|   |   +-- Recessed service bay
|   |   |   +-- Machinery assembly
|   |   |   +-- Inspectable control
|   |   |   `-- Sound and effect anchors
|   |   +-- Continuous navigation strip
|   |   `-- Warning-compatible encounter anchors
|   |
|   +-- Tavern
|   |   +-- Entry threshold
|   |   |   +-- Connector frame
|   |   |   +-- Readable initial view
|   |   |   `-- Safe standing clearance
|   |   +-- Public room
|   |   |   +-- Walking loop around furniture
|   |   |   +-- Counter and seating assemblies
|   |   |   +-- Sightline-breaking partitions
|   |   |   `-- Monster-valid approach route
|   |   +-- Service area
|   |   |   +-- Local mechanism
|   |   |   +-- Investigative clue
|   |   |   `-- Optional offering site
|   |   +-- Warning arrangement
|   |   |   +-- Sound-source anchor
|   |   |   +-- Initial occlusion
|   |   |   `-- Reveal position
|   |   `-- Departure threshold
|   |       +-- Main-route exit
|   |       `-- Next-environment connector
|   |
|   +-- Flooded laundry
|   |   +-- Raised entry
|   |   +-- Equipment aisles
|   |   |   +-- Washer assemblies
|   |   |   +-- Linen occluders
|   |   |   `-- Traversable pursuit route
|   |   +-- Wet-floor region
|   |   |   +-- Surface description
|   |   |   +-- Audio/effect bindings
|   |   |   `-- Explicit gameplay effect only if specified
|   |   +-- Drain and machinery warning anchors
|   |   `-- Continuous exit
|   |
|   +-- Recovery place
|   |   +-- Readable shelter
|   |   +-- Reduced threat eligibility
|   |   +-- Index review opportunity
|   |   `-- Unblocked onward passage
|   |
|   `-- Later accepted place families
|       +-- Nursery and clinic
|       +-- Shrine and boiler chapel
|       +-- Archive and ticket hall
|       +-- Dormitory and platform
|       `-- Mortuary and final-descent spaces
|
+-- Layer 4: Playable sequence compositions
|   |
|   +-- Expedition sequence
|   |   +-- Begin or resume
|   |   +-- Opening experience
|   |   +-- Connected campaign sections
|   |   +-- Campaign resolution
|   |   `-- Endless continuation
|   |
|   +-- Environment passage sequence
|   |   +-- Before
|   |   |   +-- Resolve accepted next instance
|   |   |   +-- Prepare collision and navigation
|   |   |   +-- Prepare minimum presentation
|   |   |   `-- Wait for readiness receipt
|   |   +-- During
|   |   |   +-- Observe player crossing
|   |   |   +-- Activate local opportunities
|   |   |   `-- Preserve movement continuity
|   |   `-- After
|   |       +-- Record visitation
|   |       +-- Make next passage available
|   |       `-- Release only unneeded previous resources
|   |
|   +-- Tavern experience sequence
|   |   +-- Before
|   |   |   +-- Tavern ready
|   |   |   +-- Opening protection satisfied
|   |   |   `-- Suitable encounter available
|   |   +-- During
|   |   |   +-- Enter and orient
|   |   |   +-- Investigate optional local clue
|   |   |   +-- Hear characteristic warning
|   |   |   +-- Observe spatial approach
|   |   |   `-- Respond
|   |   |       +-- Repel early -> studied result
|   |   |       +-- Endure scare -> possible collection
|   |   |       `-- Fail response -> capture result
|   |   `-- After
|   |       +-- Observe authoritative result receipt
|   |       +-- Request eligible reward handling
|   |       +-- Restore recovery allowance
|   |       `-- Continue or enter run recovery
|   |
|   +-- Run recovery sequence
|   |   +-- Capture acknowledged
|   |   +-- Presentation completes or is skipped by policy
|   |   +-- Restart requested
|   |   +-- Checkpoint and Index restored
|   |   `-- Player regains control
|   |
|   `-- Sequence execution safeguards
|       +-- Stable definition and execution IDs
|       +-- Correlated domain events
|       +-- Exactly-once consequences
|       +-- Cancellation and failure cleanup
|       +-- Bounded active sequence window
|       `-- Verified checkpoint/resume mapping
|
+-- Concrete realization boundaries
|   |
|   +-- Three.js scene provider [Provider]
|   |   +-- Greybox geometry bindings
|   |   +-- Finished-model bindings
|   |   +-- Animation realization
|   |   +-- Material and lighting realization
|   |   `-- Pooled particle realization
|   |
|   +-- Audio provider [Provider]
|   |   +-- Audio unlock and device lifecycle
|   |   +-- Spatial cue realization
|   |   +-- Environmental mix
|   |   `-- Bounded voice and effect budgets
|   |
|   +-- Movement/collision provider [Provider]
|   +-- Asset loader and cache [Provider]
|   +-- IndexedDB persistence [Provider]
|   `-- Peer transport [Provider]
|
+-- Root Next.js application
|   +-- Launch and continue
|   +-- Settings and accessibility
|   +-- Client-only game boundary
|   +-- Loading and startup failure
|   +-- Pointer lock, audio unlock and fullscreen
|   +-- Pause and browser-suspension handling
|   `-- Runtime disposal
|
+-- Authoring and proof
|   +-- Existing stdio authoring MCP
|   +-- Runtime-derived content catalog
|   +-- Bounded implementation packets
|   +-- Visual fixture preview
|   +-- Real-runtime playable preview
|   +-- Greybox/model parity review
|   +-- Focused semantic proof
|   +-- Neighboring-section cohesion review
|   +-- Campaign and long-session proof
|   `-- Build-identified evidence and review decisions
|
`-- Preservation and release
    +-- Frozen V1/V2 references
    +-- Unique-worktree inventory
    +-- Asset and dependency archive manifest
    +-- Restore proof
    +-- Reviewed cleanup manifest
    +-- Root-app migration evidence
    +-- Release candidate
    `-- Verified integration and push to main
```

### Physical repository layout

Implement that semantic tree under one root application:

- `app/` — thin Next.js routes and layout.
- `src/game/domains/` — the five natural game owners and their local kits.
- `src/game/composition/` — installation recipes and coordination bindings.
- `src/game/sequences/` — authored experience definitions and node bindings.
- `src/content/environments/` — place definitions and compositions.
- `src/content/monsters/` — family and manifestation definitions.
- `src/content/campaign/` — progression and sequence selections.
- `src/presentation/` — greybox/model bindings and presentation recipes.
- `src/providers/` — concrete graphics, audio, collision, storage and transport.
- `src/authoring/` — authoring integration and preview surfaces.
- `tools/authoring-mcp/` — the existing external authoring workflow.
- `scripts/` — migrated proof and review entrypoints.
- `docs/` — technical contracts, migration records and evidence indexes.
- `.agent/` — active objectives, bounded packets and execution history.
- `public/assets/` — shipping assets or their approved distribution layout.

Do not mirror every conceptual branch as an empty directory. Add files where state, behavior, content or a public contract actually exists.

### Registry and instance nuance

The current Nexus composition validator rejects duplicate placements of the same registered kit and requires kit nodes to sit under their declared domain owner.

Therefore:

- Install the environment-instance capability once.
- Create many tavern or passage instances as records.
- Do not install `tavern-kit` repeatedly just because several taverns appear.
- Do not nest Core Object under the tavern’s game domain to make a diagram look natural.
- Keep Core ownership intact and connect the tavern composition through capability references.

The deep tree above expresses meaningful relationships. The engine installation tree must also satisfy the actual registry rules. [Composition-tree validation](https://github.com/LuminaryLabs-Dev/NexusEngine/blob/a74e8689d1a71c0b42236c009f0f4c46e9b89387/src/core-domains/composition/kits/composition-registry-kit/composition-tree.js)

---

## 4. Definition of done checklist

### Preservation and migration

- [ ] Frozen V1/V2 references restore with their required dependencies and assets.
- [ ] Unique worktree changes are classified and preserved.
- [ ] The chosen Nexus revision is exact and consumer-validated.
- [ ] Every migrated import uses a supported public surface.
- [ ] No duplicate default runtime, sequence driver or gameplay owner is installed.
- [ ] Cleanup removes only reviewed, recoverable, superseded active files.

### Domain and sequence behavior

- [ ] Every durable state field has one declared owner.
- [ ] Cross-domain actions use public commands, events or capability APIs.
- [ ] Composition recipes do not keep shadow gameplay state.
- [ ] Sequence actions validate their prerequisites.
- [ ] Sequence cancellation releases subscriptions and temporary resources.
- [ ] Save/resume works during warning, pursuit, blackout, reward and recovery.
- [ ] Repeated events cannot duplicate collection or offerings.

### Environment assembly

- [ ] Environment definitions and instances have separate stable identities.
- [ ] Connectors align with valid floor height, clearance and navigation.
- [ ] Generated candidates cannot publish intersecting or unreachable routes.
- [ ] Failed assembly uses a bounded recovery path.
- [ ] Streaming never removes a place containing an active player or relevant threat.
- [ ] Reload preserves resolved environment and encounter choices.

### Gameplay

- [ ] The connected greybox section supports the complete exploration loop.
- [ ] Monsters use real spatial positions and obstacle-aware paths.
- [ ] Warnings precede valid attacks.
- [ ] Difficulty cannot select an impossible response combination.
- [ ] Study, collection and capture are visibly different outcomes.
- [ ] The movement/flashlight rule is understandable in each phase.
- [ ] The campaign provides measured meaningful play, not padding.
- [ ] Monster-family review demonstrates behavioral variety beyond cosmetic variants.

### Presentation and host

- [ ] Greybox/model replacement preserves semantic gameplay.
- [ ] Collision and navigation remain consistent with visible geometry.
- [ ] Spawn, movement and left/right views are readable without debug UI.
- [ ] Particle and audio quality reductions do not remove essential warnings.
- [ ] Browser suspension does not create an unfair simulation jump.
- [ ] Repeated host mounting and disposal do not leak resources.
- [ ] The root Next.js application can launch, resume, pause and recover the game.

### Proof and release

- [ ] Focused, cohesion and milestone evidence identify the tested build.
- [ ] Historical reports remain distinguishable from current passes.
- [ ] Shared-play scope is explicitly defined and tested.
- [ ] Human visual and headphone reviews cover the accepted experience.
- [ ] Required automated checks pass on the final integration candidate.
- [ ] The final commit is present on the actual remote default branch.

---

## 5. Final phase — validation and push to main

### 5.1 Baseline and restore verification

Before restructuring:

1. Record repository, branch, commit and worktree state.
2. Verify archived source and asset hashes.
3. Restore the frozen baseline independently.
4. Run its documented launch path.
5. Retain a compact restoration report.

**Failure handling:** do not clean the old active files until restoration succeeds. Missing assets or uncommitted changes are preservation work, not reasons to discard the baseline.

### 5.2 Installed-composition verification

Use the selected Nexus package’s public validation surfaces.

Check:

- Domain parents and registry identity.
- Missing capabilities.
- Duplicate providers.
- Dependency cycles.
- Unsupported statuses.
- Exact executable source identities.
- Repeated installation.
- Snapshot and reset boundaries.

Exercise the installed APIs, not only direct helper functions.

The existing 36/38-core assertion must become an assertion against the accepted capability manifest for the new version. An old number is not architectural correctness.

**Failure handling:** resolve the capability mismatch before dependent gameplay work continues. Do not hide missing providers behind no-op implementations.

### 5.3 Spatial and generation verification

Run deterministic environment assembly across a representative seed and difficulty matrix.

For each result:

- Traverse every accepted main-route connection.
- Verify optional branches can be entered and exited.
- Check player and monster clearance separately.
- Confirm no spawn overlaps or navigation islands.
- Exercise rejected candidates and fallback connectors.
- Save, unload, reload and compare resolved instance identity.

Use the actual movement/collision provider in addition to graph-level checks.

**Failure handling:** retain the smallest failing seed, environment pair and connector combination as the repair target.

### 5.4 Sequence and recovery verification

Test each sequence boundary:

- Before the environment is ready.
- At first entry.
- During optional investigation.
- During warning.
- During pursuit.
- At blackout entry and exit.
- During last chance.
- Immediately before and after collection.
- During offering claim.
- During capture and restart.

Interrupt with pause, reload or cancellation where allowed.

Verify:

- No lost or duplicated result.
- No rerolled encounter.
- No doubled clock advancement.
- No stale subscription.
- No retained input after control is released.
- No reward applied before its authoritative receipt.

**Failure handling:** distinguish a runtime-resume limitation from a game-rule defect. Repair the correct owner.

### 5.5 Greybox and model parity

For an accepted environment:

1. Run fixed inputs using the greybox binding.
2. Record semantic results.
3. Replace presentation with the finished asset binding.
4. Repeat the same inputs.
5. Compare movement, collision, interactions, encounters and saves.
6. Review the resulting player views.

Use Playwright and the existing semantic harness for execution.

Use `human-game-view-expert`, `lighting-balance-scout` and `screenshot-review-scout` for:

- Initial spawn.
- Forward movement.
- Look left.
- Look right.
- Warning-source orientation.
- Monster approach.
- Blackout.
- Recovery.
- The environment exit.

Require foreground separation, route midground, focal content, grounded scenery and a readable monster silhouette.

**Failure handling:** an art revision that changes traversal returns to spatial review. It does not pass as a cosmetic update.

### 5.6 Audio, performance and long-session review

A human headphone review must judge:

- Cue direction.
- Warning recognition.
- Loudness.
- Repetition fatigue.
- Threat identity.
- The transition between apprehension and release.

Automated audio scheduling traces remain supporting evidence.

Choose a minimum-spec device and explicit quality targets before final asset production. Measure:

- Frame-time distribution.
- Simulation cost.
- Navigation-query cost.
- Asset preparation stalls.
- Active environment count.
- Particle and audio-voice budgets.
- Memory growth.
- Repeated load/unload behavior.

For long play, distinguish unique content coverage from replayed prefixes. The existing timeline review should extend coverage while preserving its honest accounting.

**Failure handling:** lower cosmetic cost before sacrificing collision, warnings or authoritative outcomes.

### 5.7 Root-host and shared-play checks

Adapt the existing commands to the new root package while preserving recognizable entrypoints:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run proof:runtime`
- `npm run harness:content-routing`
- `npm run proof:authoring-mcp`
- `npm run proof:live`
- `npm run proof:legacy`
- `npm run review:timeline`

These commands already exist in the V2 workflow, except where their root wiring must be migrated. This plan does not claim the future root scripts are implemented.

Also verify:

- Browser-only modules are excluded from server execution.
- Direct loading of the game route works.
- Assets resolve in the production build.
- Mount/dispose leaves no duplicate loops.
- Save failures leave the previous valid save intact.
- Host/client content versions agree.
- Reconnect restores the agreed authority.
- A mirrored host snapshot is not presented as independent cooperative control.

Keep any Node-only authoring MCP process separate from player-facing Next.js routes.

### 5.8 Campaign acceptance and cleanup

Complete campaign playtests before calling the eight-hour experience ready.

Record:

- Time to understand the opening.
- First warning recognition.
- First study and first collection.
- Confusing or unfair captures.
- Repeated environments and responses.
- Interesting optional discoveries.
- Recovery quality.
- Actual chapter durations.
- Desire to continue.

Then reconcile the repository:

- Update the existing technical README, `goal.md` and `memory.md`.
- Reconcile stale goal-matrix entries with current evidence.
- Preserve JSONL history while updating the active objective.
- Update the canonical Drive documents with readable results and links.
- Keep raw video and large backups out of ordinary Git commits unless deliberately managed.
- Review the cleanup manifest file by file.
- Remove old active roots only after replacement and restore gates pass.
- Preserve old worktrees until their unique work is accounted for.

A visually finished section can pass before the whole campaign. That does not make the entire game complete.

### 5.9 Integrate and push to `main`

The repository currently reports `main` as its remote default branch. Recheck that immediately before integration.

The final release sequence is:

1. Finish work on a dedicated `codex/` overhaul branch.
2. Review the complete diff, including deletions, assets, configuration and lockfiles.
3. Confirm no secrets, private recordings or unintended archives are staged.
4. Synchronize with the latest remote default branch.
5. Resolve overlaps through reviewed composition or content decisions.
6. Re-run required checks against the exact integration candidate.
7. Commit the accepted implementation and documentation.
8. Integrate through the repository’s allowed branch-protection process.
9. Push the accepted result to `main` without force-pushing.
10. Verify the remote commit and required CI results.

If pushing triggers an existing deployment workflow, inspect that effect before executing it. A push and a separate production deployment are not interchangeable approvals.

**The plan ends when the validated overhaul is on remote `main`, its commit is verified, and the preserved previous game remains recoverable.**
