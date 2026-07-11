# HorrorCorridor Validation

**Updated:** `2026-07-11T18-11-21-04-00`

## Scope

Documentation-only audit of authoritative snapshot construction, SYNC envelope construction, JSON serialization, host fanout, per-peer send admission, delivery results, payload budgeting, backpressure, slow-peer isolation and rendered-frame correlation.

The preceding host cadence, disconnect, movement, snapshot-acceptance, interaction, outcome and pause audits remain retained.

## Plan ledger

**Goal:** distinguish source-backed publication and transport behavior from unimplemented payload-budget, per-peer-result, backpressure and slow-peer proof.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Avoid overlapping the newer repo-local `TheOpenAbove` grass-culling audit.
- [x] Read current HorrorCorridor root `.agent` state.
- [x] Read `GameCanvas.tsx`, `syncSnapshot.ts`, `serializers.ts`, `createHost.ts` and `peerTypes.ts`.
- [x] Confirm local publication builds a complete replicated snapshot.
- [x] Confirm outbound SYNC construction builds the complete snapshot again.
- [x] Confirm the full envelope is serialized with `JSON.stringify()`.
- [x] Confirm host send checks only `connection.open` before `connection.send()`.
- [x] Confirm broadcast returns only an aggregate sent count.
- [x] Confirm the publication caller does not retain that result.
- [x] Identify the interaction loop, domains, implemented kits and services.
- [x] Define payload, delivery, backpressure, isolation and frame fixture gates.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.
- [x] Push documentation directly to `main`.
- [ ] Implement and execute the fixture gates.

## Source-backed behavior

```txt
GameCanvas.publishAuthoritativeState:
  increments tick
  builds a complete ReplicatedGameSnapshot
  stores the local snapshot
  calls createFullSyncMessage with GameState

createFullSyncMessage:
  rebuilds the complete ReplicatedGameSnapshot
  clones room again
  carries authoritativeTick and reason

serializeProtocolMessage:
  JSON.stringify(message)

createHost.sendMessage:
  rejects only when connection.open is false
  calls connection.send(serialized message)
  returns boolean

createHost.broadcast:
  iterates every connection
  counts successful boolean results
  returns aggregate sent number

GameCanvas publisher:
  does not capture the returned sent count
```

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

These commands were not run because this connector pass did not provide a checked-out runtime. Existing broad harnesses do not replace focused payload, partial-delivery, exception, backpressure and slow-peer fixtures.

## Required pure fixtures

```txt
fixture:snapshot-single-build
fixture:snapshot-payload-fingerprint
fixture:snapshot-payload-byte-budget
fixture:snapshot-full-delta-policy
fixture:peer-send-admission
fixture:per-peer-delivery-result
fixture:transport-backpressure-policy
fixture:snapshot-delivery-retry
fixture:slow-peer-isolation
```

## Required host and browser fixtures

```txt
fixture:delivery-intended-peer-set
fixture:delivery-all-open-peers
fixture:delivery-closed-peer
fixture:delivery-send-exception
fixture:delivery-partial-success
fixture:delivery-backpressured-peer
fixture:delivery-slow-peer-isolation
fixture:delivery-retry-coalescing-budget
fixture:delivery-publication-frame-correlation
browser host plus healthy, closed, failing and slow peers
Pages host plus slow-peer fanout smoke
```

## Required matrix

```txt
one publication -> one canonical payload build
same state revision -> same payload fingerprint
payload over budget -> typed rejection or alternate policy
all healthy peers -> one sent row per intended peer
closed peer -> closed/skipped row, healthy peers still sent
send exception -> failed row, remaining peers still attempted
slow peer -> backpressured row and healthy-peer isolation
partial success -> committed result with complete row set
newer publication -> stale queued payload coalesced or superseded
accepted delivery -> client snapshot -> first visible frame correlation
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
browser slow-peer smoke
Pages slow-peer smoke
```

## Runtime proof status

```txt
single-payload-build fixture: unavailable
payload-byte-budget fixture: unavailable
payload-fingerprint fixture: unavailable
per-peer delivery fixture: unavailable
send-exception fixture: unavailable
backpressure fixture: unavailable
slow-peer isolation fixture: unavailable
delivery/frame-correlation fixture: unavailable
browser slow-peer smoke: not run
```

## Completion boundary

Do not claim payload bounds, delivery completeness, partial-success handling, transport backpressure, slow-peer isolation or delivery-to-frame correlation until executable fixtures prove those properties.
