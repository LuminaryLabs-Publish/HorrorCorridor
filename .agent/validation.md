# HorrorCorridor Validation

**Updated:** `2026-07-13T03-31-44-04-00`

## Summary

Source inspection confirms that the client commits provisional lobby state before host acknowledgement, has no shared join-input policy, attempt generation, bounded timeout, typed result or visible acceptance receipt, and that the local bridge can report connected after a one-way post. This audit does not prove an exploit or corrected behavior because runtime implementation and focused fixtures do not exist.

## Plan ledger

**Goal:** record exactly what source inspection proves and withhold client-join correctness claims until executable input, transport, cancellation, retry and visible-frame fixtures pass.

- [x] Compare the full Publish inventory and central ledger.
- [x] Verify central-ledger and root `.agent` coverage for all nine eligible repositories.
- [x] Select HorrorCorridor as the oldest eligible repository.
- [x] Inspect join form, client session mutation, client transport and lobby projection.
- [x] Preserve the 29-kit and service census.
- [x] Add the timestamped client-join audit family.
- [x] Refresh root documentation and machine registry.
- [ ] Run implementation, build and deployed-browser fixtures after the authority exists.

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
HorrorCorridor-V1/src/components/menus/JoinMenu.tsx
HorrorCorridor-V1/src/components/menus/LobbyScreen.tsx
HorrorCorridor-V1/src/components/game/GameShell.tsx
HorrorCorridor-V1/src/features/networking/peer/createClient.ts
HorrorCorridor current root .agent state
```

## Confirmed by inspection

```txt
join-code input maxlength: no
join-code input pattern: no
display-name maxlength or policy: no
host/client shared code schema: no
blank code rejected: no
blank code replaced with generated code: yes
provisional room committed before host acknowledgement: yes
provisional roster committed before host acknowledgement: yes
client lobby displayed before host acknowledgement: yes
Joined room overlay shown before host acknowledgement: yes
networking readiness true before admission: yes
join attempt ID: no
join attempt generation: no
PeerJS connect timeout: no
host-presence challenge/acknowledgement: no
room-admission acknowledgement: no
local bridge one-way post emits connection-open: yes
local bridge one-way post emits connected: yes
connectToHost boolean used as canonical admission result: no
typed JoinResult: no
cancellation receipt: no
retry predecessor quarantine: no
first accepted-lobby frame receipt: no
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
join-attempt audit: yes
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
PeerJS multiplayer test
local BroadcastChannel test
production server smoke
deployed-origin smoke
```

## Missing executable fixtures

```txt
valid shared join-code grammar
empty and invalid join-code rejection
oversized join-code rejection
invalid and oversized display-name rejection
PeerJS no-host timeout
local bridge no-host timeout
host rejection
room-full rejection
cancel before open
cancel while awaiting acknowledgement
retry generation fencing
late predecessor open/error/message rejection
Accepted atomic session commit
non-Accepted zero canonical store mutation
PeerJS/local-bridge result parity
pending join projection
accepted lobby projection
rejected and timed-out projection
first accepted-lobby frame
source/build/browser/deployed parity
```

## Claims intentionally withheld

No claim is made for validated join input, host presence, room membership, bounded timeout, exact cancellation, retry isolation, transport parity, visible-frame correlation or production readiness until the authority and fixtures exist and pass.
