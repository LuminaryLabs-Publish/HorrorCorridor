# HorrorCorridor Validation

**Updated:** `2026-07-11T16-38-10-04-00`

## Scope

Documentation-only audit of client movement update cadence, host packet admission, authoritative state mutation, ooze advancement timing, snapshot tick/publication, broadcast fanout, cadence diagnostics and rendered-frame correlation.

The preceding active-run disconnect audit remains retained and unchanged.

## Plan ledger

**Goal:** distinguish source-backed cadence behavior from unimplemented fixed-step, queue, publication-budget, backpressure and multi-peer proof.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Detect the newer repo-local `TheOpenAbove` audit and select only the next stable repository.
- [x] Read current HorrorCorridor root `.agent` state and retained disconnect/movement/snapshot audits.
- [x] Read `GameCanvas.tsx`, `networkRules.ts`, `syncSnapshot.ts`, `createHost.ts` and `package.json`.
- [x] Confirm client movement messages carry a sequence.
- [x] Confirm host movement application ignores that sequence.
- [x] Confirm every received movement update immediately publishes a full snapshot.
- [x] Confirm publication resets the timestamp used to admit ooze advancement.
- [x] Confirm snapshot tick increments per publication.
- [x] Confirm broadcast sent counts are returned but discarded.
- [x] Identify interaction loop, domains, implemented kits and services.
- [x] Define cadence, starvation, flood, delivery and frame fixture gates.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.
- [x] Push documentation directly to `main`.
- [ ] Implement and execute the fixture gates.

## Source-backed behavior

```txt
client:
  increments networkUpdateSequence
  writes payload.input.sequence
  sends absolute pose and velocity

host PLAYER_UPDATE callback:
  does not consume payload.input.sequence
  applies playerId and absolute pose immediately
  synchronizes held cubes
  calls publishAuthoritativeState immediately

publishAuthoritativeState:
  increments currentGameState.tick
  builds a full replicated snapshot
  broadcasts when host transport is active
  writes frameCadence.lastNetworkTickAtMs

host RAF:
  advances ooze only when recordedAtMs - lastNetworkTickAtMs reaches NETWORK_TICK_RATE

transport:
  broadcast returns number of sends
  publication caller does not retain or classify the result
```

## Proven clock alias

```txt
lastNetworkTickAtMs is used for:
  client outbound update cadence
  host publication age
  host periodic ooze/system admission
  debug network age
```

This proves a source-level starvation path:

```txt
continuous client updates
  -> continuous host publications
  -> repeated shared timestamp resets
  -> periodic ooze branch can remain inadmissible
```

It does not prove the exact browser traffic rate or practical duration of starvation under every environment. That requires executable fixtures.

## Existing package commands

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

These commands were not run because this connector pass did not provide a checked-out browser runtime. Existing broad harnesses do not replace focused cadence, flood, starvation, delivery and frame-correlation fixtures.

## Required pure fixtures

```txt
fixture:player-update-sequence-admission
fixture:movement-input-queue
fixture:latest-input-coalescing
fixture:fixed-simulation-clock
fixture:authoritative-system-step
fixture:snapshot-publication-cadence
fixture:per-peer-delivery-result
fixture:transport-backpressure-policy
```

## Required host and browser fixtures

```txt
fixture:host-cadence-baseline
fixture:host-cadence-one-client
fixture:host-cadence-multi-client
fixture:host-cadence-burst-coalescing
fixture:host-cadence-duplicate-reorder
fixture:host-cadence-flood-budget
fixture:host-cadence-ooze-starvation
fixture:snapshot-publication-budget
fixture:partial-delivery-result
fixture:cadence-frame-correlation
browser host plus normal and flood clients
```

## Required matrix

```txt
no clients -> expected fixed-step and ooze-step count
one normal client -> same fixed-step and ooze-step count
multiple normal clients -> same fixed-step and ooze-step count
burst inputs -> deterministic latest admitted input per step
duplicate sequence -> duplicate result, no extra mutation
older sequence -> stale result, no queue insertion
future gap -> configured typed result
flood peer -> bounded accepted rate, queue and publications
slow peer -> isolated delivery/backpressure result
continuous updates -> ooze continues advancing
committed step -> snapshot revision -> world/minimap/HUD/debug frame receipt
retired actor -> queue retired and future input rejected
```

## Change-state validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
render behavior changed: no
deployment changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Commands not run

```txt
npm install
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
browser multi-peer smoke
Pages smoke
```

## Runtime proof status

```txt
input sequence admission fixture: unavailable
fixed simulation fixture: unavailable
ooze starvation fixture: unavailable
publication budget fixture: unavailable
backpressure/delivery fixture: unavailable
cadence frame-correlation fixture: unavailable
browser flood smoke: not run
```

## Completion boundary

Do not claim host cadence, movement integrity, ooze timing, publication bounds, transport backpressure or frame correlation correctness until executable fixtures prove that peer count and packet rate cannot alter authoritative step frequency or suppress gameplay systems.
