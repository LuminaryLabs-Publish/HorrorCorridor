# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T15-01-33-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, client prediction, host snapshots, cube interactions, ordered anomaly completion, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded runtime debug readback.

This pass isolates an interaction-intent split. A client chooses an action from its local pose and snapshot, but `sendInteractionRequest()` sends no `cubeId`, `slotId`, target revision or observed snapshot tick. The host therefore substitutes an implicit target from current host state: nearest loose cube, first empty anomaly slot or last occupied anomaly slot.

## Plan ledger

**Goal:** preserve responsive cube interaction while making every pickup, drop, place and remove request identify one intended target, one observed state revision and one typed host result.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `HorrorCorridor` under the oldest eligible documented-selection rule after excluding a concurrently refreshed repo-local audit.
- [x] Trace local action inference, TRY_INTERACT construction, host target resolution, cube/slot mutation, snapshot publication and client readback.
- [x] Identify the interaction loop, domains, implemented kits and offered services.
- [x] Record stale-target substitution, silent no-op and missing result-correlation gaps.
- [x] Define explicit target claims, revisions, preflight, transaction, result, acknowledgement and fixture kits.
- [x] Add timestamped architecture and system-specific audits.
- [x] Change no runtime, dependency, package script, network behavior, rendering or deployment configuration.
- [x] Push documentation directly to `main`; create no branch or pull request.

## Read first

```txt
.agent/trackers/2026-07-11T15-01-33-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/turn-ledger/2026-07-11T15-01-33-04-00.md
.agent/architecture-audit/2026-07-11T15-01-33-04-00-interaction-target-intent-authority-dsk-map.md
.agent/render-audit/2026-07-11T15-01-33-04-00-interaction-result-snapshot-frame-gap.md
.agent/gameplay-audit/2026-07-11T15-01-33-04-00-client-intent-host-target-substitution-loop.md
.agent/interaction-audit/2026-07-11T15-01-33-04-00-cube-slot-claim-result-map.md
.agent/interaction-authority-audit/2026-07-11T15-01-33-04-00-explicit-target-claim-transaction-contract.md
.agent/deploy-audit/2026-07-11T15-01-33-04-00-interaction-target-fixture-gate.md
```

## Active interaction loop

```txt
local interact input
  -> derive action from local pose and latest visible snapshot
  -> create TRY_INTERACT with playerId and action
  -> omit cubeId, slotId, target revision and observed snapshot tick
  -> host receives request
  -> host resolves nearest cube, first empty slot or last occupied slot
  -> mutate or silently return the same state
  -> synchronize held cubes to player positions
  -> publish a full authoritative snapshot
  -> client infers acceptance or rejection from later replicated state
```

## Current finding

```txt
explicit cube target from client: absent
explicit slot target from client: absent
observed snapshot tick/revision: absent
interaction command ID: optional but not generated
host result envelope: absent
accepted/rejected/conflict reason: absent
claim/ownership revision: absent
duplicate/reorder policy: absent
first interaction frame proof: absent
```

Concrete target substitution:

```txt
two clients intend the same loose cube
  -> request A picks the cube
  -> request B has no cubeId
  -> host may pick a different nearby cube instead of rejecting stale intent

two clients intend the same empty anomaly slot
  -> request A fills the first empty slot
  -> request B has no slotId
  -> host fills the next empty slot instead of rejecting the stale claim

two clients intend to remove the same last occupied slot
  -> request A removes it
  -> request B has no slotId
  -> host may remove the new last occupied slot
```

## Domains in use

```txt
application and screen routing
UI loading pause completion settings and terminal projection
session room roster identity connection and readiness
lobby start run session epoch exit and runtime readiness
PeerJS and BroadcastChannel transport
protocol envelopes serialization request correlation and snapshots
seeded maze bootstrap
first-person input movement collision camera and prediction
interaction action inference target selection cube ownership and anomaly slots
held-cube synchronization and ordered anomaly completion
ooze pressure and terminal outcome evaluation
Three.js world bloom minimap HUD and interaction-frame projection
runtime cleanup validation and deployment
```

## Implemented kits

```txt
corridor-application-shell-kit
corridor-session-domain-kit
runtime-store-snapshot-kit
ui-pause-projection-kit
ui-completion-projection-kit
complete-screen-presentation-kit
lobby-screen-presentation-kit
peer-host-transport-kit
peer-client-transport-kit
peer-event-bus-kit
protocol-message-construction-kit
protocol-serialization-kit
maze-snapshot-bootstrap-kit
first-person-input-kit
movement-collision-camera-kit
network-player-update-kit
corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
snapshot-outcome-routing-kit
corridor-authoritative-publication-kit
corridor-animation-loop-kit
corridor-render-world-kit
corridor-post-processing-kit
corridor-minimap-kit
runtime-debug-frame-kit
runtime-resource-cleanup-kit
package-validation-kit
```

## Required composed domain

```txt
horror-corridor-interaction-target-authority-domain
  -> interaction-command-envelope-kit
  -> interaction-target-observation-kit
  -> cube-target-claim-kit
  -> anomaly-slot-claim-kit
  -> interaction-admission-kit
  -> interaction-preflight-kit
  -> interaction-transaction-kit
  -> interaction-result-kit
  -> interaction-idempotency-kit
  -> interaction-conflict-kit
  -> held-cube-ownership-revision-kit
  -> interaction-publication-kit
  -> interaction-client-acknowledgement-kit
  -> interaction-frame-correlation-kit
  -> interaction-journal-kit
  -> interaction-target-fixture-kit
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding
2. Transport Actor Binding and Message Admission
3. Lobby Start Transaction Authority
4. Run Exit Commit and Session Epoch
4a. Runtime Readiness Lease and Generation Fencing
5. Snapshot Acceptance Authority
5a. Interaction Target Intent and Cube/Slot Claim Authority
5b. Terminal Outcome Authority and Victory/Failure Convergence
6. Host Movement Admission and Client Reconciliation
7. Pause/Resume Authority
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not treat an action name as a complete interaction intent.
Do not substitute a different cube or slot after the observed target changed.
Do not infer command success only from a later full snapshot.
Do not publish an unchanged snapshot as if it were an accepted interaction result.
Do not claim interaction convergence without duplicate, reorder, contention, stale-target and first-frame fixtures.
```
