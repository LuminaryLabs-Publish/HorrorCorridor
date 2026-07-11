# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-11T18-11-21-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Branch:** `main`

## Summary

HorrorCorridor publishes complete replicated state through a host transport that exposes only aggregate send counts. The publication path builds the full snapshot twice, serializes the entire SYNC envelope, attempts one send per open connection and discards the aggregate result.

The current design cannot prove payload bounds, intended-recipient coverage, partial success, send failure classification, queue pressure, slow-peer isolation or delivery-to-frame convergence.

## Plan ledger

**Goal:** document the exact publication and fanout loop, inventory every active domain/kit/service, and define the DSK boundary needed for bounded payloads and per-peer delivery results.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs` tracking.
- [x] Confirm no eligible repository is new, ledger-missing or root-`.agent`-missing.
- [x] Detect newer repo-local grass-culling documentation in `TheOpenAbove` and avoid overlapping it.
- [x] Select only `LuminaryLabs-Publish/HorrorCorridor` as the oldest stable fallback.
- [x] Read current root `.agent` guidance and retained authority audits.
- [x] Read the active snapshot, serializer, host-transport and adapter contracts.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all implemented kits and their services.
- [x] Define the snapshot-delivery/backpressure parent domain and candidate kits.
- [x] Add architecture, render, gameplay, interaction, transport and deploy audits.
- [x] Refresh the required root `.agent` files.
- [x] Change no runtime source, package script, dependency or workflow.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0
nominal oldest central entry: TheOpenAbove @ 2026-07-11T16-30-25-04-00
newer repo-local TheOpenAbove grass-culling audit: 2026-07-11T18-06-51-04-00 and later commits
selected stable fallback: HorrorCorridor @ 2026-07-11T16-38-10-04-00
```

## Product interaction loop

```txt
title and mode selection
  -> lobby identity, readiness and deterministic start
  -> first-person input and local prediction
  -> client PLAYER_UPDATE stream
  -> host gameplay-state mutation
  -> authoritative snapshot publication
  -> full SYNC serialization and all-peer fanout
  -> client snapshot acceptance and replay
  -> world, minimap, HUD, completion and debug projection
```

## Current publication loop

```txt
publishAuthoritativeState
  -> tick += 1
  -> build full local snapshot
  -> create full SYNC message
       -> build full snapshot again
       -> clone room again
  -> JSON.stringify complete message
  -> iterate all connections
       -> if open, send
       -> increment sent count
  -> discard sent count
```

## Main finding

The host does not own a publication transaction. It owns a synchronous loop that can only report how many `send()` calls were attempted successfully according to a Boolean open check.

Missing evidence includes:

```txt
canonical payload identity
serialized byte count
maximum payload budget
full/delta selection
intended peer set
per-peer admission
pending byte and queue state
send duration
exception classification
partial-success result
retry/coalescing policy
slow-peer isolation
client acceptance acknowledgement
first visible frame receipt
```

## Domains in use

```txt
application shell and screen routing
UI loading pause completion settings and terminal projection
session room roster peer identity readiness and reset
lobby start bootstrap run identity and runtime readiness
PeerJS and BroadcastChannel transport
protocol envelopes serialization and structural admission
seeded maze and initial replicated state
snapshot construction publication acceptance and replay
snapshot payload budgeting identity and full-delta policy
per-peer send admission delivery result and backpressure
slow-peer isolation retry and disconnect policy
input prediction movement collision and camera
interaction target claims cube ownership and anomaly slots
fixed simulation ooze terminal and cadence systems
Three.js world post-processing minimap HUD debug and frame proof
cleanup validation build and Pages deployment
```

## Implemented kit inventory and services

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

Services cover routing, session/lobby state, peer transport, protocol construction and serialization, deterministic bootstrap, input/prediction, movement/collision, interaction, cube ownership, anomaly completion, ooze pressure, snapshot publication/replay, Three.js rendering, minimap/HUD/debug projection, cleanup, validation and deployment.

## Required parent domain

```txt
corridor-snapshot-delivery-backpressure-authority-domain
```

## Candidate kits

```txt
snapshot-publication-intent-kit
canonical-snapshot-payload-kit
snapshot-payload-byte-budget-kit
snapshot-payload-fingerprint-kit
snapshot-full-delta-policy-kit
snapshot-delivery-plan-kit
peer-send-capability-kit
peer-send-admission-kit
per-peer-backpressure-state-kit
per-peer-delivery-result-kit
snapshot-delivery-commit-kit
snapshot-delivery-retry-kit
slow-peer-isolation-kit
snapshot-delivery-journal-kit
snapshot-delivery-observation-kit
snapshot-delivery-fixture-kit
browser-slow-peer-smoke-kit
```

## Required flow

```txt
committed state revision
  -> publication intent
  -> one canonical payload build
  -> byte and fingerprint admission
  -> full/delta selection
  -> intended peer set
  -> per-peer capability/backpressure admission
  -> bounded send attempts
  -> complete per-peer result set
  -> partial-success commit
  -> bounded retry/coalescing/isolation policy
  -> accepted snapshot and first-frame acknowledgement
```

## Validation status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
network behavior changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
existing checks run: no
focused delivery fixtures: unavailable
browser slow-peer smoke: not run
```
