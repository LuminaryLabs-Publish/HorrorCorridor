# Architecture audit: client movement kinematic admission DSK map

**Timestamp:** `2026-07-14T20-58-46-04-00`

## Summary

Existing input, movement, collision, protocol and snapshot kits provide the raw capabilities, but no composed domain owns admission of client movement into host-authoritative state.

## Plan ledger

**Goal:** compose existing capabilities into one deterministic movement authority without replacing them.

- [x] Identify existing producers and consumers.
- [x] Identify missing identity, sequence, kinematic and settlement services.
- [x] Define atomic result and visible-frame boundaries.
- [ ] Implement the domain.

## Parent domain

```txt
corridor-client-movement-kinematic-admission-authority-domain
```

## Existing dependencies

```txt
first-person-input-kit
movement-collision-camera-kit
network-player-update-kit
peer-event-bus-kit
protocol-message-construction-kit
protocol-serialization-kit
corridor-session-domain-kit
corridor-interaction-domain-kit
corridor-authoritative-publication-kit
runtime-store-snapshot-kit
corridor-render-world-kit
corridor-minimap-kit
runtime-debug-frame-kit
```

## Required composition

```txt
corridor-client-movement-kinematic-admission-authority-domain
  -> movement-update-id-kit
  -> player-movement-revision-kit
  -> canonical-actor-binding-kit
  -> movement-session-generation-kit
  -> movement-sequence-admission-kit
  -> host-time-delta-budget-kit
  -> pose-value-admission-kit
  -> speed-acceleration-policy-kit
  -> rotation-pitch-policy-kit
  -> swept-maze-collision-kit
  -> maze-bounds-admission-kit
  -> reachable-pose-candidate-kit
  -> held-cube-movement-candidate-kit
  -> atomic-movement-settlement-kit
  -> movement-rejection-preservation-kit
  -> client-movement-result-kit
  -> authoritative-correction-kit
  -> prediction-reconciliation-kit
  -> movement-observation-journal-kit
  -> first-authoritative-movement-frame-ack-kit
  -> movement-fault-fixture-kit
  -> movement-artifact-parity-kit
```

## Transaction

```txt
peer/message PLAYER_UPDATE
  -> classify connection and session generation
  -> bind remote peer, senderId and playerId
  -> admit sequence and host-time interval
  -> validate pose and kinematic predicates
  -> sweep from prior accepted pose through maze collision
  -> prepare player and held-cube candidates
  -> atomically commit one PlayerMovementRevision
  -> publish authoritative snapshot and correction result
  -> acknowledge first matching world/minimap/debug frame
```

Rejected, stale, duplicate, impersonated or unreachable updates preserve the complete predecessor state.