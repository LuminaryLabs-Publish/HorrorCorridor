# HorrorCorridor Validation

**Updated:** `2026-07-11T05-28-29-04-00`

## Plan ledger

**Goal:** separate source inspection from executable roster proof and record the exact validation boundary for this documentation-only pass.

- [x] Compare the complete accessible Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read the current root `.agent` audit state.
- [x] Read `GameShell`, `LobbyScreen`, `sessionStore`, shared types and bootstrap source.
- [x] Trace Add guest, peer open/close, ready mutation and bootstrap consumption.
- [x] Inventory active domains, implemented kits and services.
- [x] Add timestamped roster identity and peer-binding audits.
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
central ledger synchronization: pending final synchronization
```

## Source inspection performed

```txt
full Publish repository inventory reviewed: yes
central ledger coverage compared: yes
nine eligible repositories tracked with root .agent: yes
TheCavalryOfRome excluded: yes
selected only HorrorCorridor: yes
placeholder creation traced: yes
peer open and peer close traced: yes
roster store mutation traced: yes
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

These commands were not run because runtime source was not changed and the connector environment did not provide a checked-out browser runtime.

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

## Required roster fixture matrix

```txt
host only seals one admitted member
host plus reserved slot still seals one admitted member
reserved slot cannot report connected or ready
real peer join creates one peer member
real peer claim removes or transforms one slot without duplicate membership
same peer join replay is idempotent
same player id with another peer rejects
peer close changes exactly the bound member
stale roster revision rejects without mutation
revision gap requests resynchronization
sealed roster excludes reserved slots
bootstrap player count equals admitted real-member count
world, minimap, snapshot and debug share the sealed roster fingerprint
```

## Required start fixture matrix

```txt
client ready reaches host and all peers
host plus ready client starts successfully
unready client rejects start
double start accepts exactly once
bootstrap failure restores the same lobby revision
START_GAME and SYNC carry the same roster fingerprint and run identity
missing or conflicting start messages do not enter PLAYING
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