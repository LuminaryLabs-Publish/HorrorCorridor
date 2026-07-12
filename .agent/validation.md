# HorrorCorridor Validation

**Updated:** `2026-07-12T18-31-01-04-00`

## Summary

Source inspection confirms that a four-character random join code is committed to room and lobby state before the requested PeerJS host identity is proven. This pass does not prove that a collision occurred in production and does not prove recovery behavior because reservation, retry and collision fixtures do not exist.

## Plan ledger

**Goal:** record exactly what the documentation audit proves and withhold joinability and collision-safety claims until executable fixtures pass.

- [x] Compare the full Publish inventory and central ledger.
- [x] Verify root `.agent` state for all nine eligible repositories.
- [x] Select HorrorCorridor as the oldest synchronized eligible repository.
- [x] Inspect `GameShell.tsx` host setup and `createHost.ts` transport identity lifecycle.
- [x] Preserve the 29-kit and service census.
- [x] Add the timestamped room-identity audit family.
- [x] Refresh root documentation and machine registry.
- [ ] Run deterministic collision and browser parity fixtures after implementation exists.

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
all eligible root .agent entrypoints
HorrorCorridor root audit state
HorrorCorridor-V1/src/components/game/GameShell.tsx
HorrorCorridor-V1/src/features/networking/peer/createHost.ts
HorrorCorridor-V1/package.json
```

## Confirmed by inspection

```txt
makeJoinCode uses Math.random and returns four base-36 characters
host uses join code as requested PeerJS peer ID
room and lobby UI are committed before peer/open
BroadcastChannel name is derived from the same join code
peer error is generic and has no collision-specific result
GameShell has no room-identity allocation failure branch
no candidate reservation or bounded retry generation exists
no canonical roomId/joinCode/peerId manifest exists
no first accepted-hosting frame acknowledgement exists
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
room-identity audit: yes
deploy audit: yes
kit registry refreshed: yes
central ledger update: current run
central internal change log: current run
```

## Commands and runtime checks not performed

```txt
npm install
npm run build
npm run lint
browser launch
PeerJS host-ID collision
unavailable-ID retry
late predecessor open/error
local-bridge versus PeerJS identity parity
GitHub Pages smoke
```

## Missing executable fixtures

```txt
first candidate acceptance
collision then retry acceptance
retry exhaustion
superseded attempt quarantine
partial resource cleanup
manifest fingerprint parity
first accepted-hosting visible frame
source, production build and deployed parity
```

## Claims intentionally withheld

No claim is made for globally joinable rooms, collision avoidance, retry correctness, identity rollback, local/PeerJS parity or visible hosting provenance until the authority and fixtures exist and pass.