# HorrorCorridor Validation

**Updated:** `2026-07-11T05-28-29-04-00`

## Plan ledger

**Goal:** distinguish source inspection from executable roster proof and record the exact validation boundary for this documentation-only pass.

- [x] Compare the full Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read the current root `.agent` state.
- [x] Read `GameShell`, `LobbyScreen`, `sessionStore`, shared types and bootstrap source.
- [x] Trace Add guest, peer open/close, ready mutation and bootstrap consumption.
- [x] Inventory active domains, implemented kits and services.
- [x] Add timestamped roster identity and peer-binding audits.
- [x] Refresh required root `.agent` documents.
- [x] Update the central ledger and internal change log.
- [x] Change no runtime source, script, dependency or deployment configuration.
- [x] Create no branch or pull request.
- [x] Push documentation directly to `main`.

## Documentation-only result

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
rendering changed: no
network behavior changed: no
deployment changed: no
branch created: no
pull request created: no
repo-local docs pushed to main: yes
central ledger synchronized on main: yes
central internal change log added on main: yes
```

## Source inspection performed

```txt
full Publish repository inventory reviewed: yes
central ledger coverage compared: yes
nine eligible repositories tracked with root .agent: yes
TheCavalryOfRome excluded: yes
selected only HorrorCorridor: yes
placeholder creation traced: yes
peer open and close traced: yes
roster mutation traced: yes
bootstrap player mapping traced: yes
world/minimap projection implication documented: yes
```

## Existing commands

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
npm run review:object-kit
```

These commands were not run because runtime source was not changed and the connector did not provide a checked-out browser runtime.

## Missing fixture gates

```txt
fixture:lobby-roster-identity
fixture:placeholder-admission
fixture:peer-slot-claim
fixture:roster-protocol-ordering
fixture:lobby-ready-authority
fixture:lobby-start-transaction
fixture:start-message-ordering
fixture:start-rollback
browser host/client roster smoke
browser host/client correlated-start smoke
```

## Required roster matrix

```txt
host only seals one admitted member
host plus reserved slot still seals one admitted member
reserved slot cannot report connected or ready
real peer join creates one peer member
peer slot claim leaves no duplicate row
same peer join replay is idempotent
duplicate player binding rejects
peer close changes exactly the bound member
stale revision rejects without mutation
revision gap requests resynchronization
sealed roster excludes reserved slots
bootstrap player count equals admitted real-member count
world, minimap, snapshot and debug share one roster fingerprint
```

## Runtime proof status

```txt
npm run build: not run
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
browser smoke: not run
roster identity fixture: unavailable
placeholder admission fixture: unavailable
peer-slot claim fixture: unavailable
roster protocol ordering fixture: unavailable
```

No roster, network, gameplay or rendering correctness claim is made by this documentation pass.