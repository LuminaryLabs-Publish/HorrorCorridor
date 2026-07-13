# HorrorCorridor Validation

**Updated:** `2026-07-12T20-20-02-04-00`

## Summary

Source inspection confirms that the active same-origin local bridge has no runtime packet capability, generation, identity or connection-lease admission. It also confirms that local broadcast posts one untargeted packet per accepted connection and every client processes every copy. This audit does not prove runtime exploitation or corrected delivery because no implementation or focused fixtures exist.

## Plan ledger

**Goal:** record exactly what source inspection proves and withhold packet-safety and exact-once claims until executable browser fixtures pass.

- [x] Compare the full Publish inventory and central ledger.
- [x] Verify central-ledger and root `.agent` coverage for all nine eligible repositories.
- [x] Select HorrorCorridor as the oldest eligible repository.
- [x] Inspect host/client bridge, session, shared types, shell and package scripts.
- [x] Preserve the 29-kit and service census.
- [x] Add the timestamped local-bridge audit family.
- [x] Refresh root documentation and machine registry.
- [ ] Run deterministic, adversarial, multi-client, build and deployed fixtures after implementation exists.

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
HorrorCorridor current root .agent state
HorrorCorridor-V1/src/components/game/GameShell.tsx
HorrorCorridor-V1/src/features/game-state/store/sessionStore.ts
HorrorCorridor-V1/src/features/networking/peer/createHost.ts
HorrorCorridor-V1/src/features/networking/peer/createClient.ts
HorrorCorridor-V1/src/types/shared.ts
HorrorCorridor-V1/package.json
```

## Confirmed by inspection

```txt
host creates BroadcastChannel whenever the API exists
host PeerJS connection handler is skipped when localBridge exists
client creates the same channel from hostPeerId/join code
LocalBridgePacket is compile-time only
runtime handler validates only packet truthiness and kind
client-connect claims remotePeerId and connectionId
host admits claimed connection without capability or generation
GameShell maps remotePeerId directly to lobby player ID
client-message does not require a known local connection
client-message does not compare actor with connection owner
client-disconnect does not prove caller ownership
host broadcast posts once per local connection
host broadcast targetPeerId is null
client filters only non-null targetPeerId
all clients accept all null-target copies
N clients therefore produce N² message events per logical broadcast
no broadcast/frame acknowledgement exists
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
local-bridge audit: yes
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
multi-tab local bridge test
multi-client fanout test
PeerJS/local-bridge parity test
production server smoke
deployed-origin smoke
```

## Missing executable fixtures

```txt
valid connection accepted once
rogue same-origin publisher rejection
unknown-connection message rejection
actor/lease mismatch rejection
forged disconnect rejection
duplicate packet no-change
stale generation rejection
one-through-four-client exact-once fanout
START_GAME and initial SYNC exact-once application
first visible local-bridge frame acknowledgement
source/build/browser/deployed parity
```

## Claims intentionally withheld

No claim is made for local-bridge authentication, spoof resistance, connection ownership, exact-once fanout, linear delivery, PeerJS parity, visible-frame correlation or production readiness until the authority and fixtures exist and pass.