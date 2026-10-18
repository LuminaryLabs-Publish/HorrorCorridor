# Room kits — playable greybox contract

The active browser game composes one game-owned Room domain at
`n:horror-corridor-v2:room`. The installed Nexus pin has no public Room domain;
this does not invent an engine API or change that pin.

`src/content/rooms/kits/` contains 50 independently imported kits: ten families
at five difficulty levels. Each folder has an immutable authored definition,
manifest and README. Shared family recipes avoid copying service ownership.
The installed composition contains the Room DSK and all 50 explicit kit IDs.

## Ownership

- Room owns instance state, guarded interactions, reach/aim selection, exit locks,
  one-second gate release, save/load validation and reset.
- Corridor retains seeded place geometry, fixtures/collision and bounded residency.
- Composition passes movement through both collision contracts and records room
  completion in Expedition. It does not own puzzle state.
- The Three.js Room adapter realizes primitive cabinets, controls, carried items,
  nameplates, projected-shape diagrams, mirrors and gate animation. Audio consumes
  state changes and listening-room note descriptors; it never solves a puzzle.
- Solutions and rule predicates stay out of player snapshots. The exported
  designer witness exists for proof and is not shown as escape instructions.

## Route

| Family | Discover | Connect | Understand | Coordinate | Master |
| --- | --- | --- | --- | --- | --- |
| Fuse | Missing Power | Wrong Circuit | Limited Supply | Overload | Emergency Transfer |
| Shadow | Broken Circle | Two Halves | The Wrong Height | Moving Silhouette | Hidden Architecture |
| Boiler | Shut Valve | Leaking Branch | Shared Pressure | Knock in the Pipes | Cold Restart |
| Balance | Empty Counterweight | Unequal Objects | False Weight | Draining Weight | Three Platforms |
| Portraits | Fallen Portrait | Family Arrangement | Before the Fire | The Impostor | Rewritten History |
| Listening | The Calling Drawer | Answering Bells | The Interrupted Phrase | Borrowed Voices | Acoustic Passage |
| Clock | Missing Pendulum | Disconnected Hands | Different Speeds | The Striking Hour | The Stopped Minute |
| Mirror | Behind You | Around the Corner | Reflected Symbols | The Unreflected Guest | Two Versions |
| Mortuary | Unfinished Preparation | Swapped Tags | Missing Identity | The Breathing Drawer | The Unclaimed |
| Roots | Thirsty Roots | Follow the Light | Divided Growth | Sleeping Bloom | Living Lock |

The route introduces all ten easy families before revisiting harder versions.
It repeats the authored catalog after room 50; this is not 50 unique architectural
environments or a complete campaign. Each instance has separate progress.

## Play

Run the root app and choose Start Solo Corridor. WASD moves, mouse aims, E acts
on the focused nearby object, F controls the flashlight, and P pauses. Objects
highlight only within interaction reach. There is no solution panel. Missing
Power begins with a loose fuse, a matching socket and a cable leading to the
locked gate. Solving releases the gate physically; walking forward enters the
next room without teleporting.

Room gameplay is opt-in through `roomPuzzles` on the public runtime; the browser
enables it. Existing reference/composed runtime proofs remain available without
that option. Ordinary stalking is currently suppressed in the puzzle greybox
route so investigation cannot cause an unrelated capture. Tailored room threats
remain future work; this is not acceptance of the former level-four horror brief.

## Fidelity limits

These are discrete-interaction greyboxes, not finished escape-room content.
Several later designs currently use guarded control/record assemblies in place
of their fully physical counterparts. Pressure and weight logic are discrete;
shadows use projected diagrams; clock ratios and growth use explicit state
transitions. Physically simulated fluids, multi-platform weight transfer,
continuous clock synchronization, authored portraits, perception-driven mimics,
living bridges and a predatory bloom are not complete. Do not describe the
original 50-room design brief as fully realized from catalog or proof counts.

## Proof

`npm run proof:runtime` now checks all 50 designer witnesses, locked exits,
range rejection, completion, exactly-once release, snapshot roundtrip,
malformed-state rejection, reset, duplicate/conflicting admission and the
installed graph. It also retains the existing runtime proofs.

The finite rule-graph check covers 2,372 reachable states and verifies every
state has a route to completion. A production browser walkthrough solved the
first ten rooms (one per family), crossed their released gates and restored the
first open gate after save/reload. Reticle-based target selection was repaired
after that walkthrough exposed an overlapping-control failure in Behind You.
TypeScript, lint, production build and the Nexus proof also pass. Browser proof
uses semantic movement/aim/interact actions; it does not establish that an
unfamiliar player can discover every solution unaided.

Player-view captures and browser traversal are separate evidence. Local captures
live under ignored `artifacts/rooms/`. Only inspected scenarios can receive human
acceptance. Audible mix, VR ergonomics, native APK output and multiplayer room
authority remain separate unproven gates.
