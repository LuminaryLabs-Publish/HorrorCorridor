# Authored room kits

Each `kits/<room-id>/index.ts` is one independently importable, immutable object
assembly. Its `kit.json` declares the shared Room domain dependency. `index.ts`
registers all fifty in difficulty-major order; it does not own mutable progress.
Family recipes compose shared puzzle rules without duplicating the Room service.

```ts
import { createHorrorCorridorV2 } from "../../game";
const game = createHorrorCorridorV2({ worldMode: "composed", roomPuzzles: true });
game.start();
// snapshot().room: { title: "Missing Power", phase: "locked", carried: null, ... }
```

Concrete Room service interaction (world coordinates in the first place):

```ts
import { createRoomDomain } from "../../game/domains/room";
import { instanceAt } from "../../game/domains/corridor/places";
import { ROOM_DEFINITIONS } from ".";
const room = createRoomDomain(ROOM_DEFINITIONS);
room.observe(instanceAt(0));
room.interact({ x: -1.25, y: 1.68, z: 1 }, 0, Math.atan2(-0.48, 1));
// true; snapshot().carried === "CERAMIC FUSE"; exit remains locked.
room.interact({ x: 1.25, y: 1.68, z: 1 }, 0, Math.atan2(-0.48, 1));
// true; snapshot().phase === "opening"; carried === null.
for (let frame = 0; frame < 10; frame++) room.step(100);
// snapshot().phase === "open"; resolve() now permits forward passage.
const saved = JSON.parse(JSON.stringify(room.snapshot()));
room.reset(); room.load(saved, instanceAt(0));
// Restores the same open gate. Invalid values are rejected before Room mutates.
```

`createRoomDomain([...ROOM_DEFINITIONS, ROOM_DEFINITIONS[0]])` admits the duplicate
idempotently. A different definition under the same ID throws. Registry admission
does not duplicate installed systems. The game installs each unique room kit once
after its Room DSK through the existing Nexus kit graph.

The existing Nexus runtime clock, composition, Scene, Spatial and navigation
capabilities are reused. Room does not create another renderer, input sampler,
physics engine, event bus, network transport or persistence backend. Existing
adapters consume descriptors and dispatch semantic actions. `npm run proof:runtime`
checks installed kit IDs, solution witnesses, all reachable authored states,
exit gating, recovery and reset. See the active room checkpoint for player-view,
sound, physical-fidelity and native-platform limitations.
