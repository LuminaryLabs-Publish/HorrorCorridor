# Project Breakdown: HorrorCorridor Interaction Target Intent Authority

**Timestamp:** `2026-07-11T15-01-33-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

## Plan ledger

**Goal:** document the active cube-interaction path and define an explicit target-claim transaction so network delay, contention, duplicate delivery or reorder cannot silently substitute a different cube or anomaly slot.

- [x] Compare the full ten-repository Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `HorrorCorridor` under the oldest stable documented-selection rule.
- [x] Read current root `.agent` routing and prior identity, start, exit, snapshot, movement, pause and terminal audits.
- [x] Inspect `GameCanvas.tsx`, `networkRules.ts`, `interactionRules.ts` and `syncSnapshot.ts`.
- [x] Identify the product interaction loop.
- [x] Identify all active domains.
- [x] Identify all implemented kits and their services.
- [x] Trace pickup, drop, place, remove, held-cube synchronization and authoritative publication.
- [x] Record explicit-target omission and host-side target substitution.
- [x] Define the DSK/domain boundary and fixture gate.
- [x] Refresh all required root `.agent` files.
- [x] Push documentation to `main` only.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection result

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0
selected repository: LuminaryLabs-Publish/HorrorCorridor
other Publish repositories changed: none
```

## Interaction loop

```txt
interact input
  -> infer action from local pose and local snapshot
  -> send TRY_INTERACT action without cubeId or slotId
  -> host applies action against current host state
  -> implicit target resolution
  -> cube/slot mutation or silent no-op
  -> held-cube synchronization
  -> ordered-sequence evaluation
  -> full snapshot publication
  -> client infers result from later snapshot and rendered state
```

## Main finding

The protocol already permits `cubeId`, `slotId` and `targetCellId`, but the active caller does not send them. The host therefore chooses the nearest loose cube, first empty slot or last occupied slot at execution time. Under contention or delay, the accepted mutation can target a different object than the player observed.

## Domains

```txt
application and UI routing
session, roster, actor, run and readiness
PeerJS/BroadcastChannel transport
protocol and snapshot replication
input, movement and camera
interaction action inference and target resolution
cube ownership and held-position synchronization
anomaly slots and ordered completion
ooze and terminal outcome
Three.js world, minimap, HUD and debug projection
lifecycle, validation and deployment
```

## Implemented kit count

```txt
28 implemented kit responsibilities
16 proposed interaction-authority kit responsibilities
```

The complete kit/service inventory is maintained in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Required authority

```txt
observed target
  -> explicit claim
  -> actor/run/epoch/snapshot admission
  -> non-mutating preflight
  -> atomic cube/slot/ownership/sequence commit
  -> typed result
  -> result-linked snapshot
  -> client acknowledgement
  -> first visible frame receipt
```

## Output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-11T15-01-33-04-00.md
.agent/architecture-audit/2026-07-11T15-01-33-04-00-interaction-target-intent-authority-dsk-map.md
.agent/render-audit/2026-07-11T15-01-33-04-00-interaction-result-snapshot-frame-gap.md
.agent/gameplay-audit/2026-07-11T15-01-33-04-00-client-intent-host-target-substitution-loop.md
.agent/interaction-audit/2026-07-11T15-01-33-04-00-cube-slot-claim-result-map.md
.agent/interaction-authority-audit/2026-07-11T15-01-33-04-00-explicit-target-claim-transaction-contract.md
.agent/deploy-audit/2026-07-11T15-01-33-04-00-interaction-target-fixture-gate.md
```
