# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-11T09-29-07-04-00`

## Summary

HorrorCorridor is a cooperative first-person procedural maze with solo, host and client sessions, PeerJS and BroadcastChannel transport, client prediction, host snapshot publication, cube interactions, ordered anomaly completion, ooze pressure, Three.js rendering, bloom, minimap, HUD and bounded runtime debug readback.

This pass isolates a runtime readiness ownership defect. `GameShell` can mark simulation, rendering and input ready before `GameCanvas` creates their providers. On return to title, `resetRuntime()` clears readiness, then the unmounting `GameCanvas` cleanup can write `networking: true` back into the reset store because readiness has no session, generation or provider fence.

## Plan ledger

**Goal:** make runtime readiness a resource-backed lease owned by one runtime generation so stale setup or cleanup cannot publish false capability state.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `HorrorCorridor` under the oldest repo-local audit fallback.
- [x] Trace readiness writes through `GameShell`, `GameCanvas` and `runtimeStore`.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` state.
- [x] Push documentation directly to `main`.
- [x] Synchronize the central ledger and internal change log.
- [ ] Runtime implementation and executable fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-11T09-29-07-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
```

Then read:

```txt
.agent/turn-ledger/2026-07-11T09-29-07-04-00.md
.agent/architecture-audit/2026-07-11T09-29-07-04-00-runtime-readiness-lease-dsk-map.md
.agent/render-audit/2026-07-11T09-29-07-04-00-render-readiness-commit-gap.md
.agent/gameplay-audit/2026-07-11T09-29-07-04-00-reset-cleanup-readiness-loop.md
.agent/interaction-audit/2026-07-11T09-29-07-04-00-session-readiness-transition-map.md
.agent/runtime-readiness-audit/2026-07-11T09-29-07-04-00-provider-lease-generation-contract.md
.agent/deploy-audit/2026-07-11T09-29-07-04-00-runtime-readiness-fixture-gate.md
```

## Active interaction loop

```txt
title
  -> solo, host or client lobby/run admission
  -> GameShell predicts runtime readiness
  -> snapshot and route make GameCanvas mountable
  -> GameCanvas creates render, input, simulation and transport consumers
  -> GameCanvas patches readiness
  -> runtime advances and projects world/minimap/HUD/debug
  -> lobby/title exit resets or patches readiness
  -> GameCanvas unmount cleanup patches readiness again
```

## Current finding

```txt
RuntimeReadiness fields: simulation rendering networking input
session identity: absent
runtime generation: absent
provider identity: absent
resource proof: absent
revision: absent
typed transition result: absent
stale cleanup rejection: absent
```

Concrete stale-write path:

```txt
returnToStart
  -> resetRuntime() sets all readiness false
  -> old GameCanvas cleanup executes later
  -> patchReadiness({ networking: true })
  -> reset title state reports networking ready
```

Solo cleanup also reports networking ready despite no transport.

## Domains in use

```txt
application and screen routing
UI overlay pause completion and settings projection
session room roster peer identity readiness and connection state
runtime readiness provider leases and resource ownership
lobby identity readiness and start admission
PeerJS and BroadcastChannel transport
protocol construction serialization and message admission
seeded maze and gameplay bootstrap
input movement collision camera and prediction
cube interaction anomaly completion and ooze pressure
authoritative snapshot publication acceptance and replay
Three.js world post-processing minimap HUD and completion projection
RAF resize canvas lifecycle debug cleanup validation and deployment
```

## Implemented kits

```txt
corridor-application-shell-kit
corridor-session-domain-kit
runtime-store-snapshot-kit
ui-pause-projection-kit
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
horror-corridor-runtime-readiness-authority-domain
  -> runtime-session-identity-kit
  -> runtime-generation-kit
  -> readiness-capability-descriptor-kit
  -> readiness-provider-lease-kit
  -> resource-readiness-proof-kit
  -> readiness-commit-transaction-kit
  -> readiness-revocation-kit
  -> capability-specific provider adapters
  -> stale-cleanup-fence-kit
  -> readiness-transition-journal-kit
  -> readiness-debug-projection-kit
  -> runtime-readiness-fixture-kit
```

## Ordered safe ledges

```txt
1. Lobby Roster Identity and Peer Binding + Placeholder Admission Fixture Gate
2. Transport Actor Binding + Sender/Payload Admission Fixture Gate
3. Lobby Start Transaction Authority + Correlated START_GAME/SYNC Fixture Gate
4. Run Exit Commit + Session Epoch Message Admission Fixture Gate
4a. Runtime Readiness Lease + Generation-Fenced Cleanup Fixture Gate
5. Snapshot Acceptance Authority + Projection Transaction Fixture Gate
6. Host Movement Admission + Client Reconciliation Fixture Gate
7. Pause/Resume Authority + Input Suspension Convergence Fixture Gate
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Keep readiness distinct from lobby player ready state.
Do not mark a capability ready before its provider proves live resources.
Do not let old-generation cleanup mutate current readiness.
Do not claim runtime correctness without executable fixtures.
```