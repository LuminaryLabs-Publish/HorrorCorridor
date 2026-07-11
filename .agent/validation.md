# HorrorCorridor Validation

**Updated:** `2026-07-11T07-30-40-04-00`

## Plan ledger

**Goal:** separate source-backed actor-admission findings from executable multiplayer proof and record the exact validation boundary.

- [x] Compare the full Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor`.
- [x] Read the current root `.agent` state and prior network audits.
- [x] Read `GameShell`, `GameCanvas`, peer events, host transport, protocol types, serializers, message constructors and network rules.
- [x] Trace transport provenance into host dispatch.
- [x] Trace claimed player identity into movement and interaction mutation.
- [x] Trace accepted mutation into authoritative publication and render projection.
- [x] Inventory active domains, implemented kits and services.
- [x] Add timestamped actor-identity audits.
- [x] Refresh required root `.agent` documents.
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
central ledger synchronization: pending current-run synchronization
central internal change log: pending current-run synchronization
```

## Source inspection performed

```txt
full Publish inventory reviewed: yes
central ledger coverage compared: yes
nine eligible repositories tracked with root .agent: yes
TheCavalryOfRome excluded: yes
selected only HorrorCorridor: yes
transport remotePeerId and connectionId traced: yes
envelope senderId and roomId traced: yes
payload playerId and sequence traced: yes
structural decoder traced: yes
host dispatch traced: yes
movement and interaction mutation traced: yes
snapshot and render projection traced: yes
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
fixture:transport-actor-binding
fixture:sender-payload-consistency
fixture:connection-sequence-admission
fixture:request-deduplication
fixture:disconnect-retirement
fixture:multi-peer-impersonation
browser host-plus-two-clients actor smoke
```

## Required actor matrix

```txt
bound peer updates own player -> accepted once
bound peer interacts as own player -> accepted or domain no-change
sender mismatch -> rejected without mutation
payload player mismatch -> rejected without mutation
sender and payload disagree -> rejected
unknown connection -> rejected
retired connection -> rejected
wrong room -> rejected
wrong session or epoch -> rejected
duplicate request -> duplicate without mutation
stale sequence -> rejected
sequence gap -> stable policy result
duplicate active connection -> conflict result
rejected command advances no tick
rejected command publishes no gameplay SYNC
accepted command correlates to world minimap HUD and debug projection
```

## Runtime proof status

```txt
npm run build: not run
npm run lint: not run
npm run smoke:protokits: not run
npm run harness:horror-corridor: not run
browser smoke: not run
transport actor fixture: unavailable
sender/payload fixture: unavailable
sequence fixture: unavailable
request dedupe fixture: unavailable
multi-peer impersonation fixture: unavailable
```

No transport identity, actor admission, network safety, gameplay or rendering correctness claim is made by this documentation pass.