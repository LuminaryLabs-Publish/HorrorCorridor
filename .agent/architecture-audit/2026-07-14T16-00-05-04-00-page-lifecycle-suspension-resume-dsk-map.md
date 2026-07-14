# Page Lifecycle Suspension and Resume DSK Map

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-14T16-00-05-04-00`

## Summary

The current runtime composes gameplay, transport and rendering for an active page but has no composed domain owning browser suspension and restoration. React unmount cleanup is not equivalent to hidden-page, freeze or BFCache settlement.

## Plan ledger

**Goal:** define the smallest composed authority that can suspend local work, preserve accepted session truth and admit one resumed runtime generation.

- [x] Identify current lifecycle participants.
- [x] Preserve existing kit ownership.
- [x] Define commands, results, revisions and proof surfaces.
- [ ] Implement the authority without restructuring unrelated domains.

## Existing participant map

```txt
GameCanvas
  -> first-person-input-kit
  -> movement-collision-camera-kit
  -> network-player-update-kit
  -> corridor-interaction-domain-kit
  -> corridor-authoritative-publication-kit
  -> corridor-animation-loop-kit
  -> corridor-render-world-kit
  -> corridor-post-processing-kit
  -> corridor-minimap-kit
  -> runtime-debug-frame-kit
  -> runtime-resource-cleanup-kit

Host/client transport
  -> peer-host-transport-kit or peer-client-transport-kit
  -> peer-event-bus-kit
  -> protocol-message-construction-kit
  -> protocol-serialization-kit
```

## Missing parent domain

```txt
corridor-page-lifecycle-session-suspension-resume-authority-domain
```

## Coordinating kits

```txt
page-lifecycle-event-kit
  services: normalized visibility, pagehide, pageshow, freeze and resume events

document-generation-kit
  services: stable document generation and persisted-page identity

lifecycle-attempt-kit
  services: unique suspend/resume attempt identity and supersession

runtime-suspension-lease-kit
  services: accepted ownership lease across input, RAF, render and transport

held-input-retirement-kit
  services: clear movement, look, interaction and pause intent with receipt

pointer-lock-lifecycle-kit
  services: release, ownership result and fresh-gesture reacquisition policy

raf-suspension-kit
  services: stop one accepted RAF generation and prevent duplicates

render-clock-checkpoint-kit
  services: freeze elapsed-time policy and restart baseline

transport-liveness-policy-kit
  services: preserve, pause, close or reconnect transport by lifecycle class

host-publication-suspension-kit
  services: pause local authoritative publication while hidden when required

client-send-suspension-kit
  services: suppress player-originated updates and interaction requests

passive-snapshot-receive-kit
  services: accept or buffer authoritative snapshots under explicit budget

session-checkpoint-kit
  services: fingerprint room, snapshot, pose, input and outcome state

bfcache-classification-kit
  services: distinguish persisted page restore from ordinary navigation

participant-revalidation-kit
  services: renderer, world, transport, listener, viewport and store probes

stale-callback-rejection-kit
  services: reject callbacks from predecessor lifecycle generations

resume-candidate-kit
  services: detached successor participant set and restoration receipts

atomic-resume-adoption-kit
  services: adopt all mandatory participants or preserve predecessor state

lifecycle-result-kit
  services: typed suspend, restore, degrade and failure results

first-resumed-runtime-frame-ack-kit
  services: frame receipt bound to document, session and runtime generations

lifecycle-observation-journal-kit
  services: bounded lifecycle events, results and participant receipts

lifecycle-fixture-matrix-kit
  services: source, browser, BFCache, build and deployed proof cases
```

## Required transaction

```txt
PageLifecycleEvent
  -> bind DocumentGeneration + SessionGeneration + RuntimeGeneration
  -> classify hidden/pagehide/freeze/persisted-pageshow/normal-resume
  -> retire held input and local command admission
  -> acquire RuntimeSuspensionLease
  -> stop RAF and checkpoint render clock
  -> apply transport liveness policy
  -> preserve accepted authoritative snapshot
  -> prepare and probe resumed participants
  -> reject stale callbacks and superseded attempts
  -> atomically adopt one RuntimeGeneration
  -> publish PageLifecycleResult
  -> publish FirstResumedRuntimeFrameAck
```

## Dependency boundary

This authority composes existing input, transport, snapshot, render, debug and cleanup kits. It should not replace them or create a parallel game runtime.

## Validation boundary

No implementation or executable lifecycle proof exists in this documentation turn.