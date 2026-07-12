# HorrorCorridor Validation

**Updated:** `2026-07-12T14-22-01-04-00`

## Plan ledger

**Goal:** record exactly what source inspection proves and withhold lobby, start and multiplayer claims until executable connection-admission fixtures pass.

- [x] Compare the full Publish inventory and central ledger.
- [x] Verify root `.agent` state for all nine eligible repositories.
- [x] Inspect current HorrorCorridor audit routing and recent commits.
- [x] Inspect PeerJS host/client adapters, event contracts, session store, lobby UI and start bootstrap.
- [x] Trace candidate creation through visible roster mutation and initial run publication.
- [x] Refresh required root and timestamped documentation.
- [x] Update central tracking.
- [ ] Run browser and PeerJS event-order fixtures after implementation exists.

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
all nine central Publish repo ledgers
all nine eligible root .agent/START_HERE.md files
HorrorCorridor recent main commits
HorrorCorridor-V1/src/features/networking/peer/createHost.ts
HorrorCorridor-V1/src/features/networking/peer/createClient.ts
HorrorCorridor-V1/src/features/networking/peer/peerTypes.ts
HorrorCorridor-V1/src/features/networking/peer/peerEvents.ts
HorrorCorridor-V1/src/components/game/GameShell.tsx
HorrorCorridor-V1/src/features/game-state/store/sessionStore.ts
HorrorCorridor-V1/src/components/menus/LobbyScreen.tsx
HorrorCorridor-V1/package.json
```

## Confirmed by inspection

```txt
host inserts PeerJS DataConnection into the map before open proof
host installs an open callback and checks connection.open
host then invokes the connection-open emitter unconditionally
connection-open event carries no actual-open or generation evidence
GameShell adds a connected guest from that event
sessionStore updates lobbyPlayers and room.players together
player-joined publication can attempt to send while connection.open is false
connectionOpenEmitted can suppress the later true open callback
connection error does not remove the host connection map entry
GameShell removes roster members on connection-close but not peer/error
host Start run is always exposed by LobbyScreen
start bootstrap consumes current lobbyPlayers
START_GAME and SYNC publication skips unopened PeerJS connections
no roster revision, start eligibility result or first roster-frame acknowledgement exists
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
connection-admission audit: yes
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
same-origin multiplayer smoke
PeerJS delayed-open smoke
PeerJS never-open smoke
error-without-close smoke
host/client visible roster smoke
GitHub Pages smoke
```

## Missing executable fixtures

```txt
connection candidate open=false fixture
delayed-open fixture
never-open timeout fixture
error-without-close fixture
close-before-open fixture
duplicate-open fixture
start-during-opening fixture
start-after-roster-seal fixture
host/client roster parity fixture
first shared gameplay-frame roster fixture
```

## Claims intentionally withheld

No claim is made for truthful connected membership, ghost-free rosters, sealed start eligibility, host/client lobby parity, reliable initial run delivery or shared multiplayer-frame correctness until actual open admission and executable fixtures exist and pass.