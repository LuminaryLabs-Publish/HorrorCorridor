# HorrorCorridor Validation

**Updated:** `2026-07-12T22-29-30-04-00`

## Summary

Source inspection confirms that rooms declare `maxPlayers: 4` while transport admission, placeholders, roster stores, protocol validation and bootstrap do not enforce the relationship between current players and capacity. This audit does not prove runtime overflow or corrected enforcement because no implementation or focused fixtures exist.

## Plan ledger

**Goal:** record exactly what source inspection proves and withhold capacity-safety claims until executable concurrency, protocol, bootstrap and visible-frame fixtures pass.

- [x] Compare the full Publish inventory and central ledger.
- [x] Verify central-ledger and root `.agent` coverage for all nine eligible repositories.
- [x] Select HorrorCorridor as the oldest eligible repository.
- [x] Inspect room creation, host transport, session store, lobby UI, serializers and bootstrap.
- [x] Preserve the 29-kit and service census.
- [x] Add the timestamped lobby-capacity audit family.
- [x] Refresh root documentation and machine registry.
- [ ] Run capacity, race, protocol, bootstrap, build and deployed fixtures after implementation exists.

## Change scope

```txt
runtime source changed: no
network behavior changed: no
gameplay behavior changed: no
render behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
documentation changed: yes
```

## Source inspection performed

```txt
complete LuminaryLabs-Publish repository inventory
central Publish repo ledger state
all nine eligible root .agent entrypoints
HorrorCorridor-V1/src/components/game/GameShell.tsx
HorrorCorridor-V1/src/components/menus/LobbyScreen.tsx
HorrorCorridor-V1/src/features/game-state/store/sessionStore.ts
HorrorCorridor-V1/src/features/game-state/domain/createInitialGameState.ts
HorrorCorridor-V1/src/features/networking/peer/createHost.ts
HorrorCorridor-V1/src/features/networking/protocol/serializers.ts
HorrorCorridor current root .agent state
```

## Confirmed by inspection

```txt
room creation declares maxPlayers = 4
active bootstrap room declares maxPlayers = 4
host connection-open handler checks capacity: no
local client-connect handler checks capacity: no
host Add guest path checks capacity: no
host Add guest button capacity-disabled: no
sessionStore roster setters check capacity: no
sessionStore upsert checks capacity: no
serializer checks maxPlayers is finite: yes
serializer checks players are structurally valid: yes
serializer checks players.length <= maxPlayers: no
bootstrap maps all input players: yes
bootstrap truncates or rejects excess players: no
lobby exposes players.length but not capacity/full state: yes
first capacity-consistent frame receipt: no
```

## Documentation checks

```txt
required root .agent files present: yes
new timestamped tracker: yes
new timestamped turn ledger: yes
architecture audit: yes
render audit: yes
gameplay audit: yes
interaction audit: yes
lobby-capacity audit: yes
deploy audit: yes
kit registry refreshed: yes
central ledger update: current run
central internal change log: current run
```

## Commands and runtime checks not performed

```txt
npm install
npm run lint
npm run build
npm run harness:horror-corridor
npm run validate:live-player:dev
browser launch
multi-client lobby test
concurrent final-slot test
protocol adversarial test
production server smoke
deployed-origin smoke
```

## Missing executable fixtures

```txt
first-through-fourth-member acceptance
fifth PeerJS member rejection
fifth local-bridge member rejection
placeholder capacity rejection
duplicate-member no-slot-consumption
cancelled-reservation release
concurrent final-slot winner
malformed capacity policy rejection
over-capacity START_GAME rejection
over-capacity SYNC rejection
over-capacity LOBBY_EVENT rejection
capacity-valid bootstrap
first capacity-consistent lobby frame
first capacity-consistent gameplay frame
source/build/browser/deployed parity
```

## Claims intentionally withheld

No claim is made for room-capacity enforcement, reservation atomicity, overflow resistance, protocol capacity integrity, capacity-valid bootstrap, visible-frame correlation or production readiness until the authority and fixtures exist and pass.
