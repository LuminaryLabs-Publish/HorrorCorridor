# Project Breakdown: HorrorCorridor Authoritative Randomness and Replay

**Timestamp:** `2026-07-11T19-38-14-04-00`  
**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Branch:** `main`

## Summary

HorrorCorridor was selected after comparing the ten accessible Publish repositories with the central ledger and excluding `TheCavalryOfRome`. All nine eligible repositories were tracked and had root `.agent` state; `HorrorCorridor` had the oldest central update timestamp at selection time.

The repository uses a seeded deterministic RNG for maze topology, cube placement and anomaly sequence, but ongoing authoritative ooze simulation defaults to ambient `Math.random()`. The host replicates the resulting ooze values without retaining the random-stream checkpoint that produced them.

## Plan ledger

**Goal:** document the full product surface and define a deterministic random authority that makes ooze simulation replayable, restorable and transferable.

- [x] Enumerate the full Publish organization inventory.
- [x] Compare inventory against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger`.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select one repository only.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and services.
- [x] Trace seeded and ambient randomness.
- [x] Define the missing DSK/domain boundary.
- [x] Add architecture, render, gameplay, interaction, randomness and deploy audits.
- [x] Refresh required root `.agent` documents.
- [x] Push documentation directly to `main`.
- [ ] Runtime implementation remains future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

HorrorCorridor     2026-07-11T18-11-21-04-00 selected
PhantomCommand     2026-07-11T18-21-09-04-00
ZombieOrchard      2026-07-11T18-28-40-04-00
TheUnmappedHouse   2026-07-11T18-38-45-04-00
AetherVale         2026-07-11T18-48-21-04-00
IntoTheMeadow      2026-07-11T19-01-08-04-00
PrehistoricRush    2026-07-11T19-09-25-04-00
MyCozyIsland       2026-07-11T19-20-22-04-00
TheOpenAbove       2026-07-11T19-28-28-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
mode selection
  -> lobby and start
  -> seeded maze bootstrap
  -> pointer-lock movement and local prediction
  -> host command admission
  -> fixed gameplay mutation
  -> ooze decay/spawn random draws
  -> snapshot publication and peer delivery
  -> client acceptance
  -> world, minimap, HUD and debug rendering
```

## Domains in use

```txt
application and screen routing
session, room, roster, peer identity and readiness
lobby start and run lifecycle
PeerJS and BroadcastChannel transport
protocol envelopes and serialization
seeded maze and object bootstrap
authoritative simulation and randomness
movement, collision and camera
cube interaction and ordered anomaly
ooze pressure and terminal outcome
snapshot publication, acceptance and backpressure
Three.js world, bloom, minimap, HUD and debug
resource cleanup, validation and deployment
```

## Implemented kits and offered services

```txt
corridor-application-shell-kit
  routing, solo/host/client entry, loading, pause, completion, exits

corridor-session-domain-kit
  mode, identity, room, roster, connection, readiness, reset

runtime-store-snapshot-kit
  authoritative snapshot, local pose, view, input, readiness

ui-pause-projection-kit
ui-completion-projection-kit
complete-screen-presentation-kit
lobby-screen-presentation-kit
  UI state and interaction projection

peer-host-transport-kit
peer-client-transport-kit
peer-event-bus-kit
  peer lifecycle, broadcast/send, events, cleanup

protocol-message-construction-kit
protocol-serialization-kit
  typed envelopes, JSON encoding, shape/version admission

maze-snapshot-bootstrap-kit
seeded-maze-rng-kit
  run seed, maze, cube placement, sequence, initial state

first-person-input-kit
movement-collision-camera-kit
network-player-update-kit
  input, prediction, collision, camera and network pose

corridor-interaction-domain-kit
ordered-anomaly-sequence-kit
ooze-trail-domain-kit
snapshot-outcome-routing-kit
  gameplay commands, objective, pressure and outcome

corridor-authoritative-publication-kit
  snapshot tick, clone, SYNC and fanout

corridor-animation-loop-kit
corridor-render-world-kit
corridor-post-processing-kit
corridor-minimap-kit
runtime-debug-frame-kit
runtime-resource-cleanup-kit
  frame lifecycle, rendering, diagnostics and disposal

package-validation-kit
  build, lint, ProtoKit, harness, visual and live-player checks
```

## Main finding

```txt
seeded world generation
  -> deterministic

authoritative ooze simulation
  -> rng omitted
  -> Math.random
  -> no stream identity/checkpoint
  -> nondeterministic continuation
```

## Required parent domain

```txt
corridor-authoritative-randomness-replay-authority-domain
```

## Required evidence

```txt
same seed + same inputs + same steps = same ooze snapshot
checkpoint roundtrip preserves next draw
failed/duplicate steps preserve draw index
host migration preserves next draw
frame cites simulation and RNG revisions
```
